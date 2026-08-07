import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileContactBar } from "@/components/MobileContactBar";

export function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col pb-20 md:pb-0">
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}
