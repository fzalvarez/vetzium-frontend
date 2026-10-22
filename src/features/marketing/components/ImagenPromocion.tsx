import { GiftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Imagen de la promoción o, si no tiene, un recuadro con ícono. */
export function ImagenPromocion({ src, alt, className }: { src: string | null; alt: string; className?: string }) {
  return src ? (
    <img src={src} alt={alt} className={cn("rounded-lg object-cover", className)} />
  ) : (
    <div className={cn("flex items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10", className)} aria-label={alt}>
      <GiftIcon className="size-1/2 max-h-10 max-w-10 text-brand-300 dark:text-brand-500/60" aria-hidden />
    </div>
  );
}
