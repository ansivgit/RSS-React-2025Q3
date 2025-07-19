import { describe, expect, it } from 'vitest';
import { LStorageService } from './ls-service';
import { MOCK_UNIVERSITIES } from '../__tests__/constants';

const mockLsProps = {
  country: 'test-country',
  universities: MOCK_UNIVERSITIES,
};

describe('Local storage service', () => {
  const { country, universities } = mockLsProps;
  const service = new LStorageService();

  it('should set and get country', () => {
    service.setCountry(country);
    expect(localStorage.getItem('country')).toBe(country);
    expect(service.getCountry()).toBe(country);
  });

  it('should set and get universities', () => {
    service.setUniversities(universities);

    expect(localStorage.getItem('universities')).toBe(
      JSON.stringify(universities)
    );
    expect(service.getUniversities()).toEqual(universities);
  });

  it('getUniversities method should return null if no data in local storage', () => {
    const universitiesFromLs: string | null =
      localStorage.getItem('universities');

    if (universitiesFromLs) {
      localStorage.removeItem('universities');
      expect(service.getUniversities()).toBeNull();
      localStorage.setItem('universities', universitiesFromLs);
    } else {
      expect(service.getUniversities()).toBeNull();
    }
  });
});
