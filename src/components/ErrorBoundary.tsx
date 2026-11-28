'use client';

import React, { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  /**
   * Optional label shown in the error UI (e.g. "3D Scene").
   * Helps distinguish which boundary caught the error.
   */
  label?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorMessage: error?.message ?? 'An unexpected error occurred.',
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Replace with Sentry / Datadog when you add observability:
    // Sentry.captureException(error, { extra: { componentStack: info.componentStack } });
    console.error(`[ErrorBoundary${this.props.label ? ` — ${this.props.label}` : ''}]`, error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div
          role="alert"
          aria-label={`Error in ${this.props.label ?? 'component'}`}
          style={{ display: 'none' }} // Silent: don't show layout break to users for non-critical UI (e.g. 3D hero)
        />
      );
    }

    return this.props.children;
  }
}

/**
 * Visible fallback for critical sections where we want users to know something failed.
 * Use this for forms and content areas, not decorative 3D/animation components.
 */
export function VisibleErrorFallback({ label }: { label?: string }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 py-12 text-center text-sm text-[var(--text-muted)]"
    >
      <span className="font-mono-tech text-xs uppercase tracking-widest opacity-50">
        {label ?? 'Component'} failed to load
      </span>
      <p className="max-w-xs">
        Something went wrong here. Please refresh the page or{' '}
        <a href="/contact" className="underline underline-offset-2 hover:text-[var(--accent-orange)]">
          contact us
        </a>{' '}
        if the issue persists.
      </p>
    </div>
  );
}

export default ErrorBoundary;
