import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UniversityService } from './university-api';
import type { University } from '../types';

import { API_BASE } from '../constants';
import { MOCK_UNIVERSITIES } from '../__tests__/constants';

const global = window;
const mockResponse: University[] = MOCK_UNIVERSITIES;
const mockCountries = {
  test: 'Test-country',
  empty: 'Empty-country',
  nonExist: 'Nonexist-country',
};

describe('UniversityService', () => {
  let service: UniversityService;

  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  beforeEach(() => {
    service = new UniversityService();
    mockFetch.mockClear();
    vi.resetAllMocks();
  });

  describe('getUniversities', () => {
    it('should fetch universities for a given country', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const country = mockCountries.test;
      const result = await service.getUniversities(country);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE}?country=${country}`);
    });

    it('should throw an error when response is not ok', async () => {
      const errorStatus = 404;
      const country = mockCountries.nonExist;

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: errorStatus,
      });

      await expect(service.getUniversities(country)).rejects.toThrow(
        `Could not fetch ${API_BASE}?country=${country}, received ${errorStatus}`
      );
    });

    it('should handle network errors', async () => {
      const errorMessage = 'Network error';
      const country = mockCountries.test;

      mockFetch.mockRejectedValueOnce(new Error(errorMessage));

      await expect(service.getUniversities(country)).rejects.toThrow(
        errorMessage
      );
    });

    it('should handle invalid JSON responses', async () => {
      const errorMessage = 'Unexpected token < in JSON at position 0';
      const country = mockCountries.test;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new SyntaxError(errorMessage)),
      });

      await expect(service.getUniversities(country)).rejects.toThrow(
        errorMessage
      );
    });

    it('should URL encode the country parameter', async () => {
      const mockResponse: University[] = [];
      const country = 'United States';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await service.getUniversities(country);

      expect(mockFetch).toHaveBeenCalledWith(`${API_BASE}?country=${country}`);
    });

    it('should return empty array for country with no universities', async () => {
      const mockResponse: University[] = [];
      const country = mockCountries.empty;

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await service.getUniversities(country);
      expect(result).toEqual([]);
    });
  });
});
