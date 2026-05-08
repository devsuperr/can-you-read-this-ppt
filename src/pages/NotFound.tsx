import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-gold-400 mb-4">Mosaic</div>
        <h1 className="font-display text-4xl md:text-5xl font-light mb-4">Page not built yet</h1>
        <p className="text-slate-400 leading-relaxed mb-8">
          This corner of the studio hasn't been generated. Head back home — the portfolio is
          waiting.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-full bg-gold-400 text-ink-950 font-semibold hover:bg-gold-300 transition"
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
}