import { Component } from 'react';
import { UniversityService } from '../services/university-api';
import { Search } from './search/search';
import { Result } from './result/result';
import type { University } from '../types';

import './app.scss';

export default class App extends Component {
  state = {
    universityService: new UniversityService(),
    country: '',
    data: [],
    hasError: false,
  };

  async getUniversitiesList(): Promise<University[] | []> {
    return await this.state.universityService.getUniversities(
      this.state.country
    );
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  async componentDidMount() {
    this.setState({
      data: await this.getUniversitiesList(),
    });
  }

  render() {
    if (this.state.hasError) {
      console.log('error: ', this.state.hasError);
    }

    return (
      <div className="container text-center d-grid gap-3">
        <div className="row">
          <Search />
          <Result data={this.state.data} />
        </div>
      </div>
    );
  }
}
