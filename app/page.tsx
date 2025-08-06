"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { getUserPreferences, setUserPreferences } from "./lib/userPreferences";

// Lazy load AudienceSelector with loading fallback
const AudienceSelector = dynamic(() => import("./components/AudienceSelector"), {
  loading: () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-[#1A1F3C] rounded-2xl p-8 border border-[#007CF0]/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007CF0] mx-auto mb-4"></div>
        <p className="text-white text-center">Chargement...</p>
      </div>
    </div>
  ),
  ssr: false
});

// Loading component for better UX
const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0] flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#007CF0] mx-auto mb-4"></div>
      <p className="text-white text-lg">Chargement...</p>
      <div className="mt-4 flex justify-center space-x-1">
        <div className="w-2 h-2 bg-[#007CF0] rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-[#00C48C] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-[#007CF0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const router = useRouter();
  const [showAudienceSelector, setShowAudienceSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prefetch likely routes based on user behavior
    const prefetchRoutes = () => {
      router.prefetch('/entreprise');
      router.prefetch('/formation');
      router.prefetch('/particuliers');
    };

    // Check if user has already selected an audience
    const preferences = getUserPreferences();
    
    if (preferences && preferences.audience) {
      // Prefetch the user's preferred route first
      router.prefetch(`/${preferences.audience}`);
      // Then redirect
      router.push(`/${preferences.audience}`);
    } else {
      // Show audience selector if no preference is stored
      setShowAudienceSelector(true);
      // Prefetch all routes since we don't know user preference
      prefetchRoutes();
    }
    
    setIsLoading(false);
  }, [router]);

  const handleAudienceSelect = (audience: 'entreprise' | 'formation' | 'particuliers') => {
    // Save the user's preference
    setUserPreferences(audience);
    
    // Hide the selector
    setShowAudienceSelector(false);
    
    // Redirect to the selected page
    router.push(`/${audience}`);
  };

  const handleCloseSelector = () => {
    // If user closes without selecting, default to entreprise
    setUserPreferences('entreprise');
    setShowAudienceSelector(false);
    router.push('/entreprise');
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0A0F2C] via-[#1A1F3C] to-[#007CF0]">
      <Suspense fallback={<LoadingScreen />}>
        {showAudienceSelector && (
          <AudienceSelector
            isOpen={showAudienceSelector}
            onSelect={handleAudienceSelect}
            onClose={handleCloseSelector}
          />
        )}
      </Suspense>
    </main>
  );
}