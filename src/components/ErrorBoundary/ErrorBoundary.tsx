import { Component, type ErrorInfo, type ReactNode } from "react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./ErrorBoundary.types";

/**
 * Catches render errors in child components and displays a fallback UI.
 *
 * Wrap any bitcoin-ui-react component tree with `<ErrorBoundary>` to prevent
 * a single component error from crashing the entire application.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.error) {
      const { fallback } = this.props;
      if (typeof fallback === "function") return fallback(this.state.error);
      if (fallback !== undefined) return fallback;
      return null;
    }
    return this.props.children;
  }
}
