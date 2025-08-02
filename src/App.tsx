import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import FoodWiseGuide from "@/components/FoodWiseGuide";

// Pages
import IntroPage from "./pages/IntroPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LearnMore from "./pages/LearnMore";
import Mission from "./pages/Mission";
import Facts from "./pages/Facts";
import Upload from "./pages/Upload";
import Recipes from "./pages/Recipes";
import Donate from "./pages/Donate";
import Impact from "./pages/Impact";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<IntroPage />} />
                <Route path="/intro" element={<IntroPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/learn-more" element={<LearnMore />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/facts" element={<Facts />} />
                <Route path="/food-waste-facts" element={<Facts />} />
                
                {/* Protected Routes */}
                <Route path="/home" element={<ProtectedRoute />}>
                  <Route index element={<Home />} />
                </Route>
                <Route path="/dashboard" element={<ProtectedRoute />}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="/upload" element={<ProtectedRoute />}>
                  <Route index element={<Upload />} />
                </Route>
                <Route path="/recipes" element={<ProtectedRoute />}>
                  <Route index element={<Recipes />} />
                </Route>
                <Route path="/donate" element={<ProtectedRoute />}>
                  <Route index element={<Donate />} />
                </Route>
                <Route path="/carbon-impact" element={<ProtectedRoute />}>
                  <Route index element={<Impact />} />
                </Route>
                <Route path="/impact" element={<ProtectedRoute />}>
                  <Route index element={<Impact />} />
                </Route>
                <Route path="/pricing" element={<Pricing />} />
                  <Route index element={<Pricing />} />
                <Route path="/profile" element={<ProtectedRoute />}>
                  <Route index element={<Profile />} />
                </Route>
                
                {/* Fallback */}
                <Route path="/index" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              
              {/* Global AI Assistant - appears on all pages */}
              <FoodWiseGuide />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;