import type { Ref } from "react";

export interface BitcoinIconProps {
  /** Icon size in pixels or CSS length (e.g. '1em'). Default: 16 */
  size?: number | string;
  /** Symbol color. Default: '#ffffff' */
  color?: string;
  /** Background circle color. Default: '#f7931a' */
  backgroundColor?: string;
  /** Accessibility label. Default: 'Bitcoin' */
  alt?: string;
  /** Hide from screen readers when used decoratively. Default: false */
  decorative?: boolean;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles applied to the SVG element. */
  style?: React.CSSProperties;
  /** Ref forwarded to the SVG element. */
  ref?: Ref<SVGSVGElement>;
}
