import { useCallback, useState } from 'react';

import {
  generateSuggestion,
  getOpenAIErrorType,
} from '../services/openai.service';
import type { OpenAIErrorType } from '../types/openai.types';

export const useAIAssistant = () => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<OpenAIErrorType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const requestSuggestion = useCallback(
    async (
      fieldContext: string,
      fieldName: string,
      language: string,
    ): Promise<{ error: OpenAIErrorType | null }> => {
      setIsLoading(true);
      setError(null);
      setSuggestion('');
      setIsModalOpen(true);

      try {
        const result = await generateSuggestion({
          fieldContext,
          fieldName,
          language,
        });
        setSuggestion(result);
        return { error: null };
      } catch (err) {
        const errorType = getOpenAIErrorType(err);
        setError(errorType);
        setIsModalOpen(false);
        return { error: errorType };
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSuggestion('');
    setError(null);
  }, []);

  return {
    suggestion,
    isLoading,
    error,
    isModalOpen,
    requestSuggestion,
    closeModal,
  };
};
