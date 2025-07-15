import type { University } from '../types';

export class LStorageService {
  setCountry(country: string): void {
    localStorage.setItem('country', country);
  }

  setUniversities(data: University[]): void {
    localStorage.setItem('universities', JSON.stringify(data));
  }

  getCountry(): string | null {
    return localStorage.getItem('country');
  }

  getUniversities(): University[] | null {
    const data = localStorage.getItem('universities');

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }
}
