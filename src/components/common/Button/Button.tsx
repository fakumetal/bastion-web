'use client';

import { ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'success' | 'info' | 'transparent';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant?: ButtonVariant; // Specifies the visual style of the button.
  buttonSize?: 'small' | 'medium' | 'large'; // Adjusts the size of the button. Can be 'small', 'medium' or 'large'.
  rounded?: boolean; // If true, renders the button with rounded corners.
  outline?: boolean; // If true, renders the button with an outline style (no background color).
  disabled?: boolean; // If true, disables the button, preventing user interaction.
  className?: string; // An optional additional CSS class for custom styling.
  type?: 'button' | 'submit' | 'reset' | undefined; // The type of the button. Defaults to 'button'.
  onClick?: () => void; // Function to be called when the button is clicked.
  children: ReactNode; // The content to be displayed inside the button.
}

/**
 * A reusable Button component that supports various styles and sizes.
 * @returns A styled button element with customizable styles and behaviors.
 */
export default function Button({
  variant = 'primary',
  buttonSize = 'medium',
  outline = false,
  rounded = false,
  disabled = false,
  className,
  type = 'button',
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        styles.button,
        styles[variant],
        {
          [styles.outline]: outline,
          [styles.rounded]: rounded,
          [styles.disabled]: disabled,
          [styles[buttonSize]]: buttonSize,
        },
        className
      )}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
