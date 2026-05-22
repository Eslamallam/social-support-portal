import axios from 'axios';

import { env } from '@/shared/config/env';

export const openAIClient = axios.create({
  baseURL: env.openAI.apiBaseUrl,
  timeout: env.openAI.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

openAIClient.interceptors.request.use((config) => {
  if (!env.openAI.apiKey) {
    throw new Error('OpenAI API key is not configured');
  }
  config.headers.Authorization = `Bearer ${env.openAI.apiKey}`;
  return config;
});

openAIClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('OpenAI API error:', error.response?.status, error.message);
    return Promise.reject(error);
  },
);
