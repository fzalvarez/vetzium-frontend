import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: Omit<React.ComponentProps<"input">, "type">) {
  return (
    <input
      type="checkbox"
      className={cn(
        "size-4 rounded border-gray-300 accent-brand-500 cursor-pointer align-middle disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Checkbox };
