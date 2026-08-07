import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/SiteLayout";
import { AboutPage } from "@/app/AboutPage";
import { ContactPage } from "@/app/ContactPage";
import { HomePage } from "@/app/HomePage";
import { NotFound } from "@/app/NotFound";
import { PortfolioPage } from "@/app/PortfolioPage";
import { PrivacyPage } from "@/app/PrivacyPage";
import { ServicePage } from "@/app/ServicePage";
import { isLocale } from "@/lib/i18n";

function LocaleGate() {
  const { locale } = useParams();
  if (!isLocale(locale)) {
    return <Navigate to="/th" replace />;
  }
  return <SiteLayout />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/th" replace />} />
      <Route path="/:locale" element={<LocaleGate />}>
        <Route index element={<HomePage />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path=":slug" element={<ServicePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<Navigate to="/th" replace />} />
    </Routes>
  );
}
