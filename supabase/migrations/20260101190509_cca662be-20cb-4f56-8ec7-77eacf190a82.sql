-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles - only admins can view roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Remove the overly permissive policy on articles
DROP POLICY IF EXISTS "Allow all operations for now" ON public.articles;

-- Add authenticated-only policies for articles management
CREATE POLICY "Admins can insert articles"
ON public.articles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update articles"
ON public.articles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete articles"
ON public.articles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Update storage policies for article-images bucket
DROP POLICY IF EXISTS "Anyone can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update article images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete article images" ON storage.objects;

-- Authenticated admins can upload images
CREATE POLICY "Admins can upload article images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin'));

-- Authenticated admins can update images
CREATE POLICY "Admins can update article images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin'));

-- Authenticated admins can delete images
CREATE POLICY "Admins can delete article images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'article-images' AND public.has_role(auth.uid(), 'admin'));