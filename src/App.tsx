import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import { LanguageRouter, RedirectToLang, LegacyRedirect } from "@/components/LanguageRouter";
import Index from "./pages/Index";

// Lazy load all non-critical pages
const About = lazy(() => import("./pages/About"));
const RealEstate = lazy(() => import("./pages/RealEstate"));
const Taxation = lazy(() => import("./pages/Taxation"));
const EstatePlanning = lazy(() => import("./pages/EstatePlanning"));
const OlimResidents = lazy(() => import("./pages/OlimResidents"));
const Commercial = lazy(() => import("./pages/Commercial"));
const Insights = lazy(() => import("./pages/Insights"));
const Article = lazy(() => import("./pages/Article"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ArticlesList = lazy(() => import("./pages/admin/ArticlesList"));
const ArticleEditor = lazy(() => import("./pages/admin/ArticleEditor"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));

const queryClient = new QueryClient();

// Minimal loading fallback that doesn't affect layout
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Root redirect */}
              <Route path="/" element={<RedirectToLang />} />
              
              {/* Language-prefixed routes */}
              <Route path="/:lang" element={<LanguageRouter><Index /></LanguageRouter>} />
              <Route path="/:lang/about" element={<LanguageRouter><About /></LanguageRouter>} />
              <Route path="/:lang/real-estate" element={<LanguageRouter><RealEstate /></LanguageRouter>} />
              <Route path="/:lang/taxation" element={<LanguageRouter><Taxation /></LanguageRouter>} />
              <Route path="/:lang/estate-planning" element={<LanguageRouter><EstatePlanning /></LanguageRouter>} />
              <Route path="/:lang/olim-residents" element={<LanguageRouter><OlimResidents /></LanguageRouter>} />
              <Route path="/:lang/commercial" element={<LanguageRouter><Commercial /></LanguageRouter>} />
              <Route path="/:lang/insights" element={<LanguageRouter><Insights /></LanguageRouter>} />
              <Route path="/:lang/insights/:slug" element={<LanguageRouter><Article /></LanguageRouter>} />
              <Route path="/:lang/contact" element={<LanguageRouter><Contact /></LanguageRouter>} />
              <Route path="/:lang/privacy" element={<LanguageRouter><Privacy /></LanguageRouter>} />
              <Route path="/:lang/terms" element={<LanguageRouter><Terms /></LanguageRouter>} />
              
              {/* Admin routes - no language prefix */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/articles" element={<ProtectedRoute><ArticlesList /></ProtectedRoute>} />
              <Route path="/admin/articles/new" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
              <Route path="/admin/articles/:id" element={<ProtectedRoute><ArticleEditor /></ProtectedRoute>} />
              
              {/* Legacy redirects - old routes without language prefix */}
              <Route path="/about" element={<LegacyRedirect />} />
              <Route path="/real-estate" element={<LegacyRedirect />} />
              <Route path="/taxation" element={<LegacyRedirect />} />
              <Route path="/estate-planning" element={<LegacyRedirect />} />
              <Route path="/olim-residents" element={<LegacyRedirect />} />
              <Route path="/commercial" element={<LegacyRedirect />} />
              <Route path="/insights" element={<LegacyRedirect />} />
              <Route path="/insights/:slug" element={<LegacyRedirect />} />
              <Route path="/contact" element={<LegacyRedirect />} />
              <Route path="/privacy" element={<LegacyRedirect />} />
              <Route path="/terms" element={<LegacyRedirect />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
