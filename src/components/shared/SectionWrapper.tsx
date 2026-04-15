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
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-28">
        {children}
      </div>
    </section>
  );
}
