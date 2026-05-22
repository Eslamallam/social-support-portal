export const env = {
  openAI: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
    apiBaseUrl: import.meta.env.VITE_OPENAI_API_BASE_URL as string,
    model: 'gpt-3.5-turbo',
    maxTokens: 200,
    temperature: 0.7,
    timeout: 15000,
  },
  app: {
    name: (import.meta.env.VITE_APP_NAME as string) ?? 'Social Support Portal',
  },
} as const;

export const validateEnv = (): void => {
  if (!env.openAI.apiKey) {
    console.warn(
      'Warning: VITE_OPENAI_API_KEY is not set. AI assistance will not work.',
    );
  }
};
