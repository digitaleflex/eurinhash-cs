export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner animé */}
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-muted animate-spin border-t-accent"></div>
          <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent border-t-accent/30 animate-ping"></div>
        </div>
        
        {/* Texte de chargement */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground animate-pulse">
            Chargement en cours...
          </p>
        </div>
        
        {/* Barre de progression simulée */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-accent rounded-full animate-[loading-bar_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
}