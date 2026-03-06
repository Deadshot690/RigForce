import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Builder from "./pages/Builder";
import React, { Suspense } from "react";
const BuilderBuild = React.lazy(() => import("./pages/BuilderBuild"));
const BuilderBudget = React.lazy(() => import("./pages/BuilderBudget"));
const BuilderCompare = React.lazy(() => import("./pages/BuilderCompare"));
const BuilderSaved = React.lazy(() => import("./pages/BuilderSaved"));
import Home from "./pages/Home";
import Features from "./pages/Features";
import AboutUs from "./pages/AboutUs";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/build" element={<Builder />}>
              <Route index element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BuilderBuild />
                </Suspense>
              } />
              <Route path="budget" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BuilderBudget />
                </Suspense>
              } />
              <Route path="compare" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BuilderCompare />
                </Suspense>
              } />
              <Route path="saved" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BuilderSaved />
                </Suspense>
              } />
            </Route>
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<AboutUs />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
