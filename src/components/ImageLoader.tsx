import { cn } from "@/lib/utils";
import { useState } from "react";

const ImageLoader = ({
  pic,
  className,
  profile,
}: {
  pic: string;
  className?: string;
  profile?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn("size-[98%]", {
        "size-[500px] relative rounded-lg overflow-hidden h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] isolate":
          !profile,
      })}
    >
      {isLoading && (
        <div className="inset-0 bg-neutral-800 absolute z-[-1] animate-pulse" />
      )}
      <img
        src={pic}
        alt={`pic-${pic}`}
        height={500}
        width={500}
        className={cn(
          "object-cover size-full pointer-events-none opacity-0 transition-opacity",
          className,
          {
            "visible pointer-events-auto opacity-100": !isLoading,
          }
        )}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export default ImageLoader;
