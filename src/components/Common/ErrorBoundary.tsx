import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(err: Error) {
    return {
      hasError: true,
      error: err,
    };
  }

  componentDidCatch(err: Error, errInfo: React.ErrorInfo): void {
    console.log(`error :: ${err}`);
    console.log(`errInfo :: ${errInfo}`);
  }

  render() {
    if (this.state.hasError) {
      return <div>Global Error...!</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
