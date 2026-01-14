import { useState, useEffect } from "react";
import { Accessibility, Plus, Minus, Type, Eye, Link2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const AccessibilityWidget = () => {
  const { language } = useLanguage();
  const isRTL = language === "he";
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);

  const content = {
    en: {
      title: "Accessibility",
      fontSize: "Font Size",
      reset: "Reset",
      highContrast: "High Contrast",
      highlightLinks: "Highlight Links",
    },
    he: {
      title: "נגישות",
      fontSize: "גודל גופן",
      reset: "איפוס",
      highContrast: "ניגודיות גבוהה",
      highlightLinks: "הדגשת קישורים",
    },
  };

  const t = content[language];

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  useEffect(() => {
    if (highlightLinks) {
      document.documentElement.classList.add("highlight-links");
    } else {
      document.documentElement.classList.remove("highlight-links");
    }
  }, [highlightLinks]);

  const increaseFontSize = () => {
    if (fontSize < 150) setFontSize((prev) => prev + 10);
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) setFontSize((prev) => prev - 10);
  };

  const resetAll = () => {
    setFontSize(100);
    setHighContrast(false);
    setHighlightLinks(false);
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 z-50 p-3 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 transition-all duration-300",
          isRTL ? "left-6" : "right-6"
        )}
        aria-label={t.title}
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div
            className={cn(
              "fixed bottom-20 z-50 w-72 bg-background border border-border rounded-lg shadow-xl p-4",
              isRTL ? "left-6" : "right-6"
            )}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Accessibility className="h-5 w-5 text-accent" />
                {t.title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <label className="text-sm text-muted-foreground mb-2 block flex items-center gap-2">
                <Type className="h-4 w-4" />
                {t.fontSize}: {fontSize}%
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  className="flex-1"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  className="flex-1"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* High Contrast */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors",
                highContrast
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              <Eye className="h-4 w-4" />
              <span className="text-sm">{t.highContrast}</span>
            </button>

            {/* Highlight Links */}
            <button
              onClick={() => setHighlightLinks(!highlightLinks)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg mb-4 transition-colors",
                highlightLinks
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              <Link2 className="h-4 w-4" />
              <span className="text-sm">{t.highlightLinks}</span>
            </button>

            {/* Reset Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={resetAll}
              className="w-full"
            >
              {t.reset}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default AccessibilityWidget;
