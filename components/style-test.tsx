export function StyleTest() {
  return (
    <div className="p-4 m-4 bg-red-500 text-white rounded-lg border-2 border-blue-500">
      <h2 className="text-xl font-bold mb-2">Test des styles Tailwind</h2>
      <p className="text-sm">Si tu vois ce texte en blanc sur fond rouge avec une bordure bleue, Tailwind fonctionne !</p>
      <div className="mt-4 p-2 bg-background text-foreground rounded">
        <p>Test des variables CSS personnalisées</p>
      </div>
    </div>
  )
}