import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center select-none justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-brand-500/30 dark:focus-visible:ring-brand-400/30",
  {
    variants: {
      variant: {
        default:
          "bg-brand-500 text-white hover:bg-brand-600 active:scale-[0.98] shadow-theme-xs",
        outline:
          "border border-gray-300 bg-white text-gray-700 hover:bg-brand-50 hover:border-brand-500 hover:text-brand-600 dark:border-gray-700 dark:bg-transparent dark:text-gray-100 dark:hover:bg-white/5 dark:hover:border-brand-400 dark:hover:text-brand-400",
        ghost:
          "text-gray-600 hover:bg-brand-50 hover:text-brand-600 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-brand-400",
        // Color con significado: rojo = eliminar/quitar/anular; verde = concretar algo
        // positivo (emitir, cobrar, finalizar); amarillo = llamar la atención. El texto
        // sobre amarillo va oscuro: el blanco no tiene contraste suficiente.
        destructive:
          "bg-error-600 text-white hover:bg-error-700 active:scale-[0.98] shadow-theme-xs dark:hover:bg-error-500",
        success:
          "bg-success-700 text-white hover:bg-success-800 active:scale-[0.98] shadow-theme-xs dark:bg-success-600 dark:hover:bg-success-700",
        warning:
          "bg-warning-400 text-gray-900 hover:bg-warning-500 active:scale-[0.98] shadow-theme-xs",
        "destructive-outline":
          "border border-error-300 bg-white text-error-600 hover:bg-error-50 hover:border-error-500 dark:border-error-500/40 dark:bg-transparent dark:text-error-400 dark:hover:bg-error-500/10",
        "success-outline":
          "border border-success-300 bg-white text-success-700 hover:bg-success-50 hover:border-success-500 dark:border-success-500/40 dark:bg-transparent dark:text-success-400 dark:hover:bg-success-500/10",
        "destructive-ghost":
          "text-error-500 hover:bg-error-50 hover:text-error-600 dark:text-error-400 dark:hover:bg-error-500/10",
        link: "text-brand-600 underline-offset-4 hover:underline dark:text-brand-400",
      },
      size: {
        default: "h-10 px-4 py-2.5",
        sm: "h-8 px-3 text-[13px]",
        lg: "h-12 px-6 text-base",
        icon: "size-9",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  if (asChild) {
    return (
      <Slot
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </Slot>
    );
  }

  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoaderIcon className="size-4 animate-spin" />}
      {children}
    </button>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- convención shadcn: variantes junto al componente
export { Button, buttonVariants };
