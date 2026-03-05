const useMotionValue = (initial: number) => {
  const value = {
    _current: initial,
    set: (v: number) => {
      value._current = v;
    },
  };
  return value;
};

const useSpring = (motionValue: any) => ({
  on: (_event: string, callback: (v: number) => void) => {
    callback(motionValue._current);
    return () => {};
  },
});

const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const motion = {
  div: ({ children, initial, animate, exit, transition, ...rest }: any) => <div {...rest}>{children}</div>,
  span: ({ children, initial, animate, exit, transition, ...rest }: any) => <span {...rest}>{children}</span>,
};

const useReducedMotion = () => false;

export { useMotionValue, useSpring, useReducedMotion, AnimatePresence, motion };
