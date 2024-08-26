import { ReactNode } from "react";
import classNames from "classnames";

import styles from "./Typography.module.scss";

type TypographyVariantType =
  | "title"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "normal";

interface TypographyProps {
  variant: TypographyVariantType;
  className?: string;
  children: ReactNode;
}

export default function Typography({
  variant,
  className,
  children,
}: TypographyProps) {
  return (
    <span className={classNames(styles[variant], className)}>{children}</span>
  );
}
