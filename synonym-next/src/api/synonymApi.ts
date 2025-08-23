import { SearchSynonymResponse } from './types/SearchSynonymResponse';
import { GetSynonymResponse } from './types/GetSynonymResponse';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const synonymApi = {
  // Search synonyms starting with prefix
  async searchSynonyms(searchTerm: string): Promise<SearchSynonymResponse> {
    const response = await fetch(`${API_BASE_URL}/synonym/search/${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // Get synonyms for a specific word
  async getSynonym(searchTerm: string): Promise<GetSynonymResponse> {
    const response = await fetch(`${API_BASE_URL}/synonym/${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Create new synonyms
  async createSynonym(word: string, synonyms: string[]): Promise<GetSynonymResponse> {
    const response = await fetch(`${API_BASE_URL}/synonym`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, synonyms }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Add synonyms to an existing word
  async addSynonymsToWord(word: string, synonyms: string[]): Promise<GetSynonymResponse> {
    const response = await fetch(`${API_BASE_URL}/synonym/${word}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ synonyms }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Get a random word
  async getRandomSynonym(): Promise<GetSynonymResponse> {
    const response = await fetch(`${API_BASE_URL}/synonym/random`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
