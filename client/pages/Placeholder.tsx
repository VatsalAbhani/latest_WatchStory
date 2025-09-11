export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="ws-container py-24">
      <h1 className="font-title text-4xl">{title}</h1>
      {description && <p className="text-offwhite/70 mt-3 max-w-2xl">{description}</p>}
      <p className="text-offwhite/60 mt-6">This page is a placeholder. Ask to generate full content next.</p>
    </div>
  );
}
