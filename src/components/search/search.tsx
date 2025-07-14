import { Component } from 'react';
import { Button } from '../button/button';

type SearchProps = {
  country: string;
  onInputChange: (country: string) => void;
};
export class Search extends Component<SearchProps, { country: string }> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { country: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ country: e.target.value });
  }

  render() {
    return (
      <div className="d-grid gap-2 d-md-flex mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Enter country name"
            aria-label="Enter country name"
            onChange={this.handleChange}
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <Button
            text="Search"
            onClick={() => this.props.onInputChange(this.state.country)}
          />
        </div>
      </div>
    );
  }
}
