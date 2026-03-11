import type { ReactNode } from "react";

import { Button } from "@components/ui/Button";
import { Typography } from "@components/ui/Typography";
import { Component } from "react";

import styles from "./ErrorBoundary.module.scss";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error): void {
    this.setState({ error, hasError: true });
  }

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.content}>
              <Typography variant="h1" align="center">
                Something Went Wrong
              </Typography>

              <Typography variant="body" align="center" color="secondary">
                {this.state.error?.message || "An unexpected error occurred"}
              </Typography>

              <div className={styles.actions}>
                <Button onClick={this.handleReload} variant="primary">
                  Reload Page
                </Button>

                <Button onClick={this.handleGoHome} variant="secondary">
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
