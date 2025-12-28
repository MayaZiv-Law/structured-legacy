import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', inquiry: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        inquiry_type: form.inquiry,
        message: form.message,
        preferred_language: language,
      });
      if (error) throw error;
      toast({ title: language === 'he' ? 'הודעה נשלחה' : 'Message Sent', description: t('contact.form.success') });
      setForm({ name: '', email: '', phone: '', inquiry: '', message: '' });
    } catch {
      toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="pt-32 pb-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className={cn("max-w-4xl mb-16", isRTL && "font-hebrew text-right mr-auto")}>
            <div className="w-16 h-1 bg-accent mb-8" />
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground">{t('contact.subtitle')}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-16">
            <form onSubmit={handleSubmit} className={cn("space-y-6", isRTL && "font-hebrew")}>
              <div><label className="block text-sm font-medium mb-2">{t('contact.form.name')}</label><Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className={cn(isRTL && "text-right")} /></div>
              <div><label className="block text-sm font-medium mb-2">{t('contact.form.email')}</label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className={cn(isRTL && "text-right")} /></div>
              <div><label className="block text-sm font-medium mb-2">{t('contact.form.phone')}</label><Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={cn(isRTL && "text-right")} /></div>
              <div><label className="block text-sm font-medium mb-2">{t('contact.form.inquiry')}</label>
                <Select value={form.inquiry} onValueChange={v => setForm({...form, inquiry: v})}>
                  <SelectTrigger><SelectValue placeholder={t('contact.form.inquiry')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate">{t('contact.inquiry.realEstate')}</SelectItem>
                    <SelectItem value="taxation">{t('contact.inquiry.taxation')}</SelectItem>
                    <SelectItem value="estate">{t('contact.inquiry.estate')}</SelectItem>
                    <SelectItem value="other">{t('contact.inquiry.other')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><label className="block text-sm font-medium mb-2">{t('contact.form.message')}</label><Textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={5} className={cn(isRTL && "text-right")} /></div>
              <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"><Send className="h-4 w-4 mr-2" />{t('contact.form.submit')}</Button>
            </form>
            <div className={cn("space-y-8", isRTL && "font-hebrew text-right")}>
              <div className="bg-card p-8 rounded-sm border border-border">
                <h3 className="font-display font-semibold text-lg mb-6">{t('footer.contact')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4"><MapPin className="h-5 w-5 text-accent mt-1" /><span>{isRTL ? 'רוטשילד 45, תל אביב' : '45 Rothschild Blvd, Tel Aviv'}</span></div>
                  <div className="flex items-center gap-4"><Phone className="h-5 w-5 text-accent" /><a href="tel:+97236123456" className="hover:text-accent">+972-3-612-3456</a></div>
                  <div className="flex items-center gap-4"><Mail className="h-5 w-5 text-accent" /><a href="mailto:info@mayaziv.law" className="hover:text-accent">info@mayaziv.law</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;