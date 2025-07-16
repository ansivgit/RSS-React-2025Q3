import { type ReactNode, type ErrorInfo, Component } from 'react';
import { Alert } from '../alert/alert';
import { ALERT_TEXT } from '../../constants';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error:', error, info);

    this.setState({
      hasError: true,
      error,
    });
  }

  render() {
    if (this.state.hasError) {
      return <Alert text={ALERT_TEXT.ERROR} color="danger" />;
    }

    return this.props.children;
  }
}
