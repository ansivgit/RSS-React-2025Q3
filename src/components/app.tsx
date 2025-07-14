import { Component } from 'react';
import { UniversityService } from '../services/university-api';
import { Search } from './search/search';
import { Result } from './result/result';
import type { University } from '../types';

import './app.scss';

type AppProps = unknown;
type AppState = {
  universityService: UniversityService;
  country: string;
  data: University[];
  hasError: boolean;
};

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      universityService: new UniversityService(),
      country: '',
      data: [],
      hasError: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async handleSearchChange(country: string) {
    console.log('from search', this, country);
    const universities =
      await this.state.universityService.getUniversities(country);

    this.setState({ country });
    this.setState({
      data: universities,
    });

    if (!universities) {
      console.log('not found');
    }
    console.log('from search2', this, universities);
  }

  async getUniversitiesList(): Promise<University[] | []> {
    console.log('get data', this.state.country);

    const universities = await this.state.universityService.getUniversities(
      this.state.country
    );

    console.log('5555', universities);

    return universities;
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  async componentDidMount() {
    console.log('did mount', this);
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
          <Search
            country={this.state.country}
            onInputChange={this.handleSearchChange}
          />
          <Result data={this.state.data} />
        </div>
      </div>
    );
  }
}
