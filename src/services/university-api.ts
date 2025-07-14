import type { University } from '../types';

export class UniversityService {
  _APIBASE = 'http://universities.hipolabs.com/search';

  async getUniversities(country: string): Promise<University[]> {
    const url = `${this._APIBASE}?country=${country}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return res.json();
  }
}
