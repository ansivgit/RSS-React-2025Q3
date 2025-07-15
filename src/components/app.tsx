import { Component } from 'react';
import { Loader } from './loader/loader';
import { Result } from './result/result';
import { Search } from './search/search';
import { UniversityService } from '../services/university-api';
import type { University } from '../types';

import './app.scss';
import { ErrorBoundary } from './error-boundary/error-boundary';

type AppProps = unknown;
type AppState = {
  universityService: UniversityService;
  country: string;
  data: University[];
  isLoading: boolean;
  hasError: boolean;
};

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      universityService: new UniversityService(),
      country: '',
      data: [],
      isLoading: true,
      hasError: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async handleSearchChange(country: string) {
    const universities =
      await this.state.universityService.getUniversities(country);

    this.setState({ country });
    this.setState({
      data: universities,
    });
  }

  async getUniversitiesList(): Promise<University[] | []> {
    const universities = await this.state.universityService.getUniversities(
      this.state.country
    );

    this.setState({
      isLoading: false,
    });

    return universities;
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
    return (
      <div className="app container text-center d-grid gap-3">
        <ErrorBoundary>
          <div className="row">
            <Search
              country={this.state.country}
              onInputChange={this.handleSearchChange}
            />
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <Result data={this.state.data} />
            )}
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}
