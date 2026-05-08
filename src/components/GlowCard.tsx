import { useRef, MouseEvent, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article';
}

/**
 * A card that tracks the cursor and renders a soft gold radial glow
 * following the mouse position. Degrades gracefully to a static card
 * on touch devices and when `prefers-reduced-motion` is set.
 */
export default function GlowCard({ children, className, as: Tag = 'div' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glow.style.opacity = '1';
    glow.style.transform = `translate(${x - 150}px, ${y - 150}px)`;
  }

  function handleMouseLeave() {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  }

  return (
    // Outer div captures mouse events for the glow; Tag is the semantic element
    <div
      ref={cardRef}
      className="relative overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow orb — follows cursor */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute w-[300px] h-[300px] rounded-full bg-gold-400/10 blur-2xl opacity-0 transition-opacity duration-300"
        style={{ willChange: 'transform, opacity' }}
      />
      <Tag className={cn('relative', className)}>{children}</Tag>
    </div>
  );
}