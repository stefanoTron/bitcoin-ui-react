export interface SatsIconProps {
  /** Icon size in pixels or CSS length (e.g. '1em'). Default: 16 */
  size?: number | string;
  /** Symbol color. Default: '#000000' */
  color?: string;
  /** Background circle color. Default: 'transparent' */
  backgroundColor?: string;
  /** Accessibility label. Default: 'Satoshis' */
  alt?: string;
  /** Apply a tilt rotation to the icon. Default: false */
  tilted?: boolean;
}
