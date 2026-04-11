import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index.tsx";
import Products from "./pages/Products.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Customize from "./pages/Customize.tsx";
import Contact from "./pages/Contact.tsx";
import About from "./pages/About.tsx";
import Blog from "./pages/Blog.tsx";
import Account from "./pages/Account.tsx";
import Community from "./pages/Community.tsx";
import SizeFinder from "./pages/SizeFinder.tsx";
import Compare from "./pages/Compare.tsx";
import Warranty from "./pages/Warranty.tsx";
import FAQ from "./pages/FAQ.tsx";
import Shipping from "./pages/Shipping.tsx";
import Careers from "./pages/Careers.tsx";
import Press from "./pages/Press.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnnouncementBar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/customize" element={<Customize />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:articleId" element={<Blog />} />
            <Route path="/account" element={<Account />} />
            <Route path="/community" element={<Community />} />
            <Route path="/size-finder" element={<SizeFinder />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
