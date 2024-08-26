'use client';

import classNames from 'classnames';
import styles from './Icon.module.scss';
import ImageWithFallback from '../ImageWithFallback';

interface IconProps {
  iconId: string; // The identifier of the icon, used to generate the source path as `/icons/${iconId}.svg`.
  width: number; // The width of the icon in pixels.
  height: number; // The height of the icon in pixels.
  size?: 'xsmall' | 'small' | 'normal' | 'large'; // An optional parameter to adjust the icon's visual size.
  className?: string; // An optional additional CSS class for custom styling.
}

/**
 * A reusable Icon component for rendering SVG icons using Next.js's Image component.
 * @returns An SVG icon element rendered as an image with customizable size and styling.
 */
export default function Icon({
  iconId,
  width,
  height,
  size,
  className
}: IconProps) {
  const iconClass = classNames(
    styles.icon,
    {
      [styles[size || 'normal']]: size,
    },
    className
  );

  return (
    <ImageWithFallback
      src={`/icons/${iconId}.svg`}
      alt={iconId}
      width={width}
      height={height}
      className={iconClass}
    />
  );
};
