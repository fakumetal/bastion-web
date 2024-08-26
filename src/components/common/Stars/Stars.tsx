'use client';

import React from 'react';
import { Icon } from '..';
import styles from './Stars.module.scss';

interface StarsProps {
  amount: number; // The number of golden stars to display, should be between 0 and 5.
  size?: 'xsmall' | 'small' | 'normal' | 'large'; // An optional parameter to adjust the icon's visual size.
}

export default function Stars({ amount, size = 'normal' }: StarsProps) {
  const totalStars = 5; // The total number of stars to display

  // Generate an array of 5 elements where each index represents a star.
  const stars = Array.from({ length: totalStars }, (_, index) => (
    <Icon
      key={index}
      iconId={index < amount ? 'golden-star' : 'gray-star'} // Use gold for filled stars, gray for empty stars
      width={20} // Adjust width as needed
      height={20} // Adjust height as needed
      size={size}
    />
  ));

  return <div className={styles.container}>{stars}</div>;
}
