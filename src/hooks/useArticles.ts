import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Article {
  id: string;
  slug: string;
  title_en: string;
  title_he: string;
  excerpt_en: string;
  excerpt_he: string;
  content_en: string[];
  content_he: string[];
  category_en: string;
  category_he: string;
  author_en: string;
  author_he: string;
  read_time_en: string;
  read_time_he: string;
  image_url: string | null;
  published_at: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>;
export type ArticleUpdate = Partial<ArticleInsert>;

// Fetch all published articles
export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  });
};

// Fetch all articles (including unpublished - for admin)
export const useAllArticles = () => {
  return useQuery({
    queryKey: ['articles', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Article[];
    },
  });
};

// Fetch a single article by slug
export const useArticle = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Article | null;
    },
    enabled: !!slug,
  });
};

// Fetch a single article by ID (for admin editing)
export const useArticleById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['article', 'id', id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data as Article | null;
    },
    enabled: !!id,
  });
};

// Fetch latest published articles
export const useLatestArticles = (limit: number = 3) => {
  return useQuery({
    queryKey: ['articles', 'latest', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data as Article[];
    },
  });
};

// Create article mutation
export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (article: ArticleInsert) => {
      const { data, error } = await supabase
        .from('articles')
        .insert(article)
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Update article mutation
export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ArticleUpdate }) => {
      const { data, error } = await supabase
        .from('articles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Article;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', data.slug] });
    },
  });
};

// Delete article mutation
export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};

// Upload article image
export const uploadArticleImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { error } = await supabase.storage
    .from('article-images')
    .upload(fileName, file);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from('article-images')
    .getPublicUrl(fileName);

  return urlData.publicUrl;
};
