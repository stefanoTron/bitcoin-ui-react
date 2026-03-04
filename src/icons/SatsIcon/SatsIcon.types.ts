import type { Ref } from "react";

export interface SatsIconProps {
  /** Icon size in pixels or CSS length (e.g. '1em'). Default: 16 */
  size?: number | string;
  /** Symbol color. Default: '#000000' */
  color?: string;
  /** Background circle color. Default: 'transparent' */
  backgroundColor?: string;
  /** Accessibility label. Default: 'Satoshis' */
  alt?: string;
  /** Hide from screen readers when used decoratively. Default: false */
  decorative?: boolean;
  /** Apply a tilt rotation to the icon. Default: false */
  tilted?: boolean;
  /** CSS class name. */
  className?: string;
  /** Additional inline styles applied to the SVG element. */
  style?: React.CSSProperties;
  /** Ref forwarded to the SVG element. */
  ref?: Ref<SVGSVGElement>;
}
