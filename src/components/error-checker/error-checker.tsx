import { Component } from 'react';
import { Alert } from '../alert/alert';
import { Button } from '../button/button';
import { ALERT_TEXT } from '../../constants';

type CheckerProps = unknown;
export class ErrorChecker extends Component<
  CheckerProps,
  { hasError: boolean }
> {
  constructor(props: CheckerProps) {
    super(props);

    this.state = {
      hasError: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ hasError: true });
    throw new Error('Error from button');
  }

  render() {
    if (this.state.hasError) {
      return <Alert text={ALERT_TEXT.ERROR} color="danger" />;
    }

    return (
      <div className="d-grid gap-2 d-md-flex mb-3">
        <div className="col-6 mx-auto d-grid gap-2">
          <Button
            text="Check Error"
            color="warning"
            onClick={this.handleClick}
          />
        </div>
      </div>
    );
  }
}
