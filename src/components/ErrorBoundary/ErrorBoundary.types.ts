import type { ErrorInfo, ReactNode } from "react";

export interface ErrorBoundaryProps {
  /** The component tree to wrap. */
  children: ReactNode;
  /** Rendered when an error is caught. Can be a static node or a function that receives the error. */
  fallback?: ReactNode | ((error: Error) => ReactNode);
  /** Called when an error is caught, with the error and React error info. */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export interface ErrorBoundaryState {
  error: Error | null;
}
