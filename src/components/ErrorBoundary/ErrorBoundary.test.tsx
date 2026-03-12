import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ErrorBoundary } from "./ErrorBoundary";

function ThrowingComponent({ message }: { message: string }): never {
  throw new Error(message);
}

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => {
  jest.restoreAllMocks();
});

describe("ErrorBoundary", () => {
  test("renders children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Hello</div>
      </ErrorBoundary>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("renders ReactNode fallback when error occurs", () => {
    render(
      <ErrorBoundary fallback={<div data-testid="fallback">Something went wrong</div>}>
        <ThrowingComponent message="test error" />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  test("renders function fallback with error when error occurs", () => {
    render(
      <ErrorBoundary fallback={(error) => <div data-testid="fallback">{error.message}</div>}>
        <ThrowingComponent message="custom error" />
      </ErrorBoundary>,
    );
    expect(screen.getByTestId("fallback")).toBeInTheDocument();
    expect(screen.getByText("custom error")).toBeInTheDocument();
  });

  test("renders nothing when error occurs and no fallback provided", () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowingComponent message="silent error" />
      </ErrorBoundary>,
    );
    expect(container.innerHTML).toBe("");
  });

  test("calls onError when error occurs", () => {
    const onError = jest.fn();
    render(
      <ErrorBoundary onError={onError} fallback={<div>Error</div>}>
        <ThrowingComponent message="callback test" />
      </ErrorBoundary>,
    );
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onError.mock.calls[0][0].message).toBe("callback test");
    expect(onError.mock.calls[0][1]).toHaveProperty("componentStack");
  });
});
