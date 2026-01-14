import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { SEO } from '@/components/SEO';

const Contact = () => {
  const { t, isRTL, language } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', inquiry: '', message: '' });
  const [consentGiven, setConsentGiven] = useState(false);

  const heroAnim = useScrollAnimation();
  const formAnim = useScrollAnimation();

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
      setConsentGiven(false);
    } catch {
      toast({ title: 'Error', description: 'Failed to send message', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SEO
        titleEn="Contact Maya Ziv Law | Schedule a Consultation"
        titleHe="צור קשר | משרד מאיה זיו עו״ד"
        descriptionEn="Contact Maya Ziv Law for legal consultation on real estate, taxation, estate planning, and cross-border matters in Israel."
        descriptionHe="צרו קשר עם משרד מאיה זיו לייעוץ משפטי בנדל״ן, מיסוי, תכנון עיזבון ועסקאות בינלאומיות בישראל."
        path="/contact"
      />
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={heroAnim.ref} className={cn("max-w-4xl transition-all duration-700", isRTL && "font-hebrew text-right mr-auto", heroAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="w-16 h-1 bg-accent mb-8" />
            <h1 className="text-4xl sm:text-5xl font-display font-semibold text-foreground mb-6">{t('contact.title')}</h1>
            <p className="text-xl text-muted-foreground">{t('contact.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={formAnim.ref} className={cn("grid lg:grid-cols-5 overflow-hidden rounded-lg shadow-lg transition-all duration-700", formAnim.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8")}>
            <div className="lg:col-span-3 bg-card p-8 lg:p-12">
            <div className={cn(isRTL && "font-hebrew text-right")}>
                <h2 className="text-4xl font-display font-semibold text-foreground mb-4">{language === 'he' ? 'האינטרסים שלך ראויים לתשומת לב אישית' : "Your Interests Deserve Personal Attention"}</h2>
                <p className="text-lg text-muted-foreground mb-8">{language === 'he' ? 'מלאו את הטופס הקצר כדי שנוכל ליצור איתכם קשר בהקדם האפשרי ולהתחיל לתכנן את הפתרון המשפטי המתאים לכם.' : 'Please fill out this brief questionnaire so that we can contact you as soon as possible to begin planning the right legal solution for you.'}</p>
              </div>
              <form onSubmit={handleSubmit} className={cn("space-y-5", isRTL && "font-hebrew")}>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">{t('contact.form.name')}</label>
                  <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} required className={cn("border-border/50 focus:border-accent", isRTL && "text-right")} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">{t('contact.form.email')}</label>
                    <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required className={cn("border-border/50 focus:border-accent", isRTL && "text-right")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-muted-foreground">{t('contact.form.phone')}</label>
                    <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={cn("border-border/50 focus:border-accent", isRTL && "text-right")} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">{t('contact.form.inquiry')}</label>
                  <Select value={form.inquiry} onValueChange={v => setForm({...form, inquiry: v})}>
                    <SelectTrigger className="border-border/50 focus:border-accent"><SelectValue placeholder={t('contact.form.inquiry')} /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">{t('contact.inquiry.realEstate')}</SelectItem>
                      <SelectItem value="taxation">{t('contact.inquiry.taxation')}</SelectItem>
                      <SelectItem value="estate">{t('contact.inquiry.estate')}</SelectItem>
                      <SelectItem value="other">{t('contact.inquiry.other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">{t('contact.form.message')}</label>
                  <Textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} required rows={4} className={cn("border-border/50 focus:border-accent resize-none", isRTL && "text-right")} />
                </div>
                
                {/* Consent Checkbox - Amendment 13 Compliance */}
                <div className={cn("flex items-start gap-3", isRTL && "flex-row-reverse")}>
                  <Checkbox 
                    id="consent" 
                    checked={consentGiven}
                    onCheckedChange={(checked) => setConsentGiven(checked === true)}
                    className="mt-1"
                  />
                  <label 
                    htmlFor="consent" 
                    className={cn("text-sm text-muted-foreground leading-relaxed cursor-pointer", isRTL && "text-right")}
                  >
                    {language === 'he' ? (
                      <>
                        אני מסכים/ה לאיסוף ושימוש בפרטים שלי בהתאם ל
                        <Link to="/privacy" className="text-accent hover:underline mx-1">מדיניות הפרטיות</Link>
                        ול
                        <Link to="/terms" className="text-accent hover:underline mx-1">תנאי השימוש</Link>
                        של האתר. ידוע לי כי אוכל לחזור בי מהסכמה זו בכל עת.
                      </>
                    ) : (
                      <>
                        I agree to the collection and use of my information in accordance with the
                        <Link to="/privacy" className="text-accent hover:underline mx-1">Privacy Policy</Link>
                        and
                        <Link to="/terms" className="text-accent hover:underline mx-1">Terms of Service</Link>.
                        I understand I may withdraw this consent at any time.
                      </>
                    )}
                  </label>
                </div>

                <Button type="submit" disabled={loading || !consentGiven} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base font-medium disabled:opacity-50">{t('contact.form.submit')}</Button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-muted/50 p-8 lg:p-12 flex flex-col justify-center">
              <div className={cn(isRTL && "font-hebrew text-right")}>
                <h2 className="text-4xl font-display font-semibold text-foreground mb-8">{language === 'he' ? 'פרטי התקשרות' : 'Contact info'}</h2>
                <div className="space-y-6">
                  <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                    <Mail className="h-5 w-5 text-accent shrink-0" />
                    <a href="mailto:info@mayaziv-law.com" className="text-foreground hover:text-accent transition-colors">info@mayaziv-law.com</a>
                  </div>
                  <div className={cn("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                    <Phone className="h-5 w-5 text-accent shrink-0" />
                    <a href="tel:+972544943597" className="text-foreground hover:text-accent transition-colors">+972.544943597</a>
                  </div>
                  <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                    <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-foreground">{isRTL ? 'משה סנה 18, תל אביב' : '18 Moshe Sneh, Tel Aviv Israel'}</span>
                  </div>
                </div>
                <div className={cn("flex gap-4 mt-10", isRTL && "flex-row-reverse")}>
                  <a href="https://wa.me/972544943597" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-colors" aria-label="WhatsApp">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-foreground hover:text-accent hover:border-accent transition-colors" aria-label="LinkedIn">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
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
