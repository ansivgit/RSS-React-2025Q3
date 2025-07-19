import { Component } from 'react';
import { ErrorChecker } from './error-checker/error-checker';
import { ErrorBoundary } from './error-boundary/error-boundary';
import { Loader } from './loader/loader';
import { Result } from './result/result';
import { Search } from './search/search';
import { LStorageService, UniversityService } from '../services';
import type { University } from '../types';

import './app.scss';

type AppProps = unknown;
type AppState = {
  universityService: UniversityService;
  country: string;
  data: University[];
  isLoading: boolean;
  hasError: boolean;
};

export default class App extends Component<AppProps, AppState> {
  lStorageService: LStorageService;

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
    this.lStorageService = new LStorageService();
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

  async handleSearchChange(country: string) {
    const universities =
      await this.state.universityService.getUniversities(country);

    this.setState({ country });
    this.setState({
      data: universities,
    });

    this.lStorageService.setCountry(country);
    this.lStorageService.setUniversities(universities);
  }

  async componentDidMount() {
    const country = this.lStorageService.getCountry();
    const universities = this.lStorageService.getUniversities();

    if (country) {
      this.setState({ country });
    }

    if (universities) {
      this.setState({
        data: universities,
        isLoading: false,
      });
    } else {
      this.setState({
        data: await this.getUniversitiesList(),
      });
    }
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
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
            <ErrorChecker />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}
