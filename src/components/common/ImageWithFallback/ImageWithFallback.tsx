'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src: string; // The source path of the primary image.
  alt: string; // The alternative text for the image, used for accessibility.
  width: number; // The width of the image in pixels.
  height: number; // The height of the image in pixels.
  fallbackImage?: string; // An optional path to the fallback image to be used if the primary image fails to load.
  className?: string; // An optional additional CSS class for custom styling.
}

/**
 * A Next.js Image component with a fallback mechanism in case the primary image fails to load.
 * @returns An image element with fallback support, rendered using Next.js's Image component.
 */
export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fallbackImage = '/img/fallback-image.png',
  className
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);

  const handleError = () => {
    setImgSrc(fallbackImage);
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
};
