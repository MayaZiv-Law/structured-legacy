import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAllArticles, useDeleteArticle } from '@/hooks/useArticles';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, Eye, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ArticlesList = () => {
  const { data: articles, isLoading } = useAllArticles();
  const deleteArticle = useDeleteArticle();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteArticle.mutateAsync(deleteId);
      toast.success('המאמר נמחק בהצלחה');
    } catch (error) {
      toast.error('שגיאה במחיקת המאמר');
    }
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-display font-semibold text-foreground">ניהול מאמרים</h1>
              <p className="text-muted-foreground">צור, ערוך ומחק מאמרים לבלוג</p>
            </div>
          </div>
          <Button asChild>
            <Link to="/admin/articles/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              מאמר חדש
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">כותרת</TableHead>
                  <TableHead className="text-right">קטגוריה</TableHead>
                  <TableHead className="text-right">סטטוס</TableHead>
                  <TableHead className="text-right">תאריך פרסום</TableHead>
                  <TableHead className="text-right">פעולות</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles?.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium text-right">
                      <div>
                        <p className="font-hebrew">{article.title_he}</p>
                        <p className="text-sm text-muted-foreground">{article.title_en}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{article.category_he}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={article.is_published ? 'default' : 'outline'}>
                        {article.is_published ? 'פורסם' : 'טיוטה'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {article.published_at 
                        ? new Date(article.published_at).toLocaleDateString('he-IL')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/insights/${article.slug}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild>
                          <Link to={`/admin/articles/${article.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setDeleteId(article.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {(!articles || articles.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      אין מאמרים עדיין. צור את המאמר הראשון שלך!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right font-hebrew">מחיקת מאמר</AlertDialogTitle>
            <AlertDialogDescription className="text-right font-hebrew">
              האם אתה בטוח שברצונך למחוק את המאמר? פעולה זו לא ניתנת לביטול.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row-reverse gap-2">
            <AlertDialogCancel>ביטול</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              מחק
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticlesList;
