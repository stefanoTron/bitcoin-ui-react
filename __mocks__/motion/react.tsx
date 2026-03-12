interface MockMotionValue {
  _current: number;
  set: (v: number) => void;
}

const useMotionValue = (initial: number): MockMotionValue => {
  const value: MockMotionValue = {
    _current: initial,
    set: (v: number) => {
      value._current = v;
    },
  };
  return value;
};

const useSpring = (motionValue: MockMotionValue) => ({
  on: (_event: string, callback: (v: number) => void) => {
    callback(motionValue._current);
    return () => {};
  },
});

interface MockMotionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const motion = {
  div: ({ children, initial, animate, exit, transition, ...rest }: MockMotionProps) => <div {...rest}>{children}</div>,
  span: ({ children, initial, animate, exit, transition, ...rest }: MockMotionProps) => (
    <span {...rest}>{children}</span>
  ),
};

const useReducedMotion = () => false;

export { useMotionValue, useSpring, useReducedMotion, AnimatePresence, motion };
