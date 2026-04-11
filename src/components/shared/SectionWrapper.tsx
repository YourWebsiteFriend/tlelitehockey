import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("w-full bg-black", className)}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        {children}
      </div>
    </section>
  );
}
