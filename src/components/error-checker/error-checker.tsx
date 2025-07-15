import { Component } from 'react';
import { Button } from '../button/button';

export class ErrorChecker extends Component {
  handleClick() {
    throw new Error('Error from button');
  }

  render() {
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
