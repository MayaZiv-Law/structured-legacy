import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticleById, useCreateArticle, useUpdateArticle, uploadArticleImage, ArticleInsert, ArticleUpdate } from '@/hooks/useArticles';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Loader2, Upload, Eye } from 'lucide-react';
import { toast } from 'sonner';

const ArticleEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const { data: existingArticle, isLoading: loadingArticle } = useArticleById(
    isNew ? undefined : id
  );
  
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();

  const [formData, setFormData] = useState({
    slug: '',
    title_en: '',
    title_he: '',
    excerpt_en: '',
    excerpt_he: '',
    content_en: '',
    content_he: '',
    category_en: '',
    category_he: '',
    author_en: 'Adv. Maya Ziv',
    author_he: 'עו"ד מאיה זיו',
    read_time_en: '5 min read',
    read_time_he: '5 דקות קריאה',
    image_url: '',
    is_published: false,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Load existing article data
  useEffect(() => {
    if (existingArticle && !isNew) {
      setFormData({
        slug: existingArticle.slug,
        title_en: existingArticle.title_en,
        title_he: existingArticle.title_he,
        excerpt_en: existingArticle.excerpt_en,
        excerpt_he: existingArticle.excerpt_he,
        content_en: existingArticle.content_en.join('\n\n'),
        content_he: existingArticle.content_he.join('\n\n'),
        category_en: existingArticle.category_en,
        category_he: existingArticle.category_he,
        author_en: existingArticle.author_en,
        author_he: existingArticle.author_he,
        read_time_en: existingArticle.read_time_en,
        read_time_he: existingArticle.read_time_he,
        image_url: existingArticle.image_url || '',
        is_published: existingArticle.is_published,
      });
    }
  }, [existingArticle, isNew]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadArticleImage(file);
      setFormData(prev => ({ ...prev, image_url: url }));
      toast.success('התמונה הועלתה בהצלחה');
    } catch (error) {
      toast.error('שגיאה בהעלאת התמונה');
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.slug || !formData.title_en || !formData.title_he) {
      toast.error('נא למלא את כל השדות הנדרשים');
      return;
    }

    setSaving(true);
    
    try {
      const articleData = {
        slug: formData.slug,
        title_en: formData.title_en,
        title_he: formData.title_he,
        excerpt_en: formData.excerpt_en,
        excerpt_he: formData.excerpt_he,
        content_en: formData.content_en.split('\n\n').filter(p => p.trim()),
        content_he: formData.content_he.split('\n\n').filter(p => p.trim()),
        category_en: formData.category_en,
        category_he: formData.category_he,
        author_en: formData.author_en,
        author_he: formData.author_he,
        read_time_en: formData.read_time_en,
        read_time_he: formData.read_time_he,
        image_url: formData.image_url || null,
        is_published: formData.is_published,
        published_at: formData.is_published ? new Date().toISOString() : null,
      };

      if (isNew) {
        await createArticle.mutateAsync(articleData as ArticleInsert);
        toast.success('המאמר נוצר בהצלחה');
      } else {
        await updateArticle.mutateAsync({ 
          id: id!, 
          updates: articleData as ArticleUpdate 
        });
        toast.success('המאמר עודכן בהצלחה');
      }
      
      navigate('/admin/articles');
    } catch (error: any) {
      toast.error(error.message || 'שגיאה בשמירת המאמר');
    }
    
    setSaving(false);
  };

  const generateSlug = () => {
    const slug = formData.title_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  if (!isNew && loadingArticle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/admin/articles">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-3xl font-display font-semibold text-foreground font-hebrew">
                {isNew ? 'מאמר חדש' : 'עריכת מאמר'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {!isNew && formData.slug && (
                <Button variant="outline" asChild>
                  <Link to={`/insights/${formData.slug}`} target="_blank" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    צפייה
                  </Link>
                </Button>
              )}
              <Button type="submit" disabled={saving} className="flex items-center gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                שמור
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="hebrew" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="hebrew">עברית</TabsTrigger>
                  <TabsTrigger value="english">English</TabsTrigger>
                </TabsList>
                
                <TabsContent value="hebrew" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title_he" className="font-hebrew">כותרת *</Label>
                    <Input
                      id="title_he"
                      value={formData.title_he}
                      onChange={(e) => setFormData(prev => ({ ...prev, title_he: e.target.value }))}
                      className="text-right font-hebrew"
                      dir="rtl"
                      placeholder="כותרת המאמר בעברית"
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt_he" className="font-hebrew">תקציר</Label>
                    <Textarea
                      id="excerpt_he"
                      value={formData.excerpt_he}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt_he: e.target.value }))}
                      className="text-right font-hebrew"
                      dir="rtl"
                      rows={3}
                      placeholder="תקציר קצר של המאמר"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content_he" className="font-hebrew">תוכן</Label>
                    <p className="text-xs text-muted-foreground mb-2 font-hebrew">
                      הפרד פסקאות בשורה ריקה. השתמש ב-## לכותרות, ב-- לרשימות
                    </p>
                    <Textarea
                      id="content_he"
                      value={formData.content_he}
                      onChange={(e) => setFormData(prev => ({ ...prev, content_he: e.target.value }))}
                      className="text-right font-hebrew min-h-[300px]"
                      dir="rtl"
                      placeholder="תוכן המאמר..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category_he" className="font-hebrew">קטגוריה</Label>
                      <Input
                        id="category_he"
                        value={formData.category_he}
                        onChange={(e) => setFormData(prev => ({ ...prev, category_he: e.target.value }))}
                        className="text-right font-hebrew"
                        dir="rtl"
                        placeholder='לדוגמה: נדל"ן'
                      />
                    </div>
                    <div>
                      <Label htmlFor="author_he" className="font-hebrew">מחבר</Label>
                      <Input
                        id="author_he"
                        value={formData.author_he}
                        onChange={(e) => setFormData(prev => ({ ...prev, author_he: e.target.value }))}
                        className="text-right font-hebrew"
                        dir="rtl"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="read_time_he" className="font-hebrew">זמן קריאה</Label>
                    <Input
                      id="read_time_he"
                      value={formData.read_time_he}
                      onChange={(e) => setFormData(prev => ({ ...prev, read_time_he: e.target.value }))}
                      className="text-right font-hebrew"
                      dir="rtl"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="english" className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title_en">Title *</Label>
                    <Input
                      id="title_en"
                      value={formData.title_en}
                      onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                      placeholder="Article title in English"
                    />
                  </div>
                  <div>
                    <Label htmlFor="excerpt_en">Excerpt</Label>
                    <Textarea
                      id="excerpt_en"
                      value={formData.excerpt_en}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt_en: e.target.value }))}
                      rows={3}
                      placeholder="Brief summary of the article"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content_en">Content</Label>
                    <p className="text-xs text-muted-foreground mb-2">
                      Separate paragraphs with empty lines. Use ## for headings, - for lists
                    </p>
                    <Textarea
                      id="content_en"
                      value={formData.content_en}
                      onChange={(e) => setFormData(prev => ({ ...prev, content_en: e.target.value }))}
                      className="min-h-[300px]"
                      placeholder="Article content..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category_en">Category</Label>
                      <Input
                        id="category_en"
                        value={formData.category_en}
                        onChange={(e) => setFormData(prev => ({ ...prev, category_en: e.target.value }))}
                        placeholder="e.g., Real Estate"
                      />
                    </div>
                    <div>
                      <Label htmlFor="author_en">Author</Label>
                      <Input
                        id="author_en"
                        value={formData.author_en}
                        onChange={(e) => setFormData(prev => ({ ...prev, author_en: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="read_time_en">Read Time</Label>
                    <Input
                      id="read_time_en"
                      value={formData.read_time_en}
                      onChange={(e) => setFormData(prev => ({ ...prev, read_time_en: e.target.value }))}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                <h3 className="font-display font-semibold text-foreground font-hebrew">הגדרות</h3>
                
                <div>
                  <Label htmlFor="slug" className="font-hebrew">Slug (URL) *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="article-url-slug"
                    />
                    <Button type="button" variant="outline" onClick={generateSlug}>
                      צור
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    /insights/{formData.slug || 'slug'}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="is_published" className="font-hebrew">פורסם</Label>
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_published: checked }))}
                  />
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-6 space-y-4">
                <h3 className="font-display font-semibold text-foreground font-hebrew">תמונה ראשית</h3>
                
                {formData.image_url && (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={formData.image_url} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <Label htmlFor="image" className="cursor-pointer">
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-accent transition-colors">
                      {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-muted-foreground" />
                      ) : (
                        <>
                          <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground font-hebrew">העלה תמונה</p>
                        </>
                      )}
                    </div>
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>

                <div>
                  <Label htmlFor="image_url" className="font-hebrew">או הכנס URL</Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArticleEditor;
