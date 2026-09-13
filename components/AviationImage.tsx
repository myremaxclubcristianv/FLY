import React from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "../lib/utils";
import { PlaceholderImage } from "./shared/PlaceholderImage";

export interface AviationImageProps extends ImageProps {
  fallbackTitle?: string;
  fallbackCode?: string;
  provenance?: string;
  caption?: string;
  aspectRatio?: "square" | "video" | "wide" | "auto";
  containerClassName?: string;
}

export function AviationImage({
  src,
  alt,
  className,
  containerClassName,
  fallbackTitle,
  fallbackCode = "AIR // AVIATION VISUAL",
  provenance,
  caption,
  aspectRatio = "auto",
  fill = true,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: AviationImageProps) {
  if (!src) {
    return (
      <PlaceholderImage
        title={fallbackTitle || (typeof alt === "string" ? alt : "AIR Visual Asset")}
        code={fallbackCode}
        aspectRatio={aspectRatio}
        className={cn(className, containerClassName)}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden group w-full h-full", containerClassName)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding={priority ? "sync" : "async"}
        sizes={sizes}
        className={cn("object-cover transition-opacity duration-300", className)}
        {...props}
      />
      {provenance && (
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md px-2 py-0.5 text-[9px] font-data text-white/80 border border-white/10 z-10 select-none">
          {provenance}
        </div>
      )}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 text-xs font-mono text-white/90 z-10">
          {caption}
        </div>
      )}
    </div>
  );
}

export default AviationImage;
