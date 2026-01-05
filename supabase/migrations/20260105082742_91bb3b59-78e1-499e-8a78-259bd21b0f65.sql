-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.articles;

-- Recreate with explicit public access (includes anonymous users)
CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
TO public
USING (is_published = true);