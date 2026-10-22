import * as React from "react";
import { cn } from "@/lib/utils";

const campoCls = cn(
  "flex h-10 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 outline-none transition-all",
  "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-invalid:border-error-500 aria-invalid:ring-error-500/20",
  "dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
);

function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input data-slot="input" className={cn(campoCls, className)} {...props} />;
}

/** Select nativo con el mismo estilo que Input. */
function SelectNativo({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select data-slot="select" className={cn(campoCls, "cursor-pointer", className)} {...props}>
      {children}
    </select>
  );
}

/** Texto de varias líneas con el mismo estilo que Input. */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(campoCls, "h-auto min-h-24 py-2", className)} {...props} />;
}

export { Input, SelectNativo, Textarea };
