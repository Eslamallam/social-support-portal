import { useCallback, useState } from 'react';

import {
  generateSuggestion,
  getOpenAIErrorType,
} from '../services/openai.service';
import type { OpenAIErrorType } from '../types/openai.types';

interface LastRequest {
  fieldContext: string;
  fieldName: string;
  language: string;
}

export const useAIAssistant = () => {
  const [suggestion, setSuggestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<OpenAIErrorType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastRequest, setLastRequest] = useState<LastRequest | null>(null);

  const requestSuggestion = useCallback(
    async (
      fieldContext: string,
      fieldName: string,
      language: string,
    ): Promise<{ error: OpenAIErrorType | null }> => {
      setLastRequest({ fieldContext, fieldName, language });
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

  const regenerate = useCallback(async (): Promise<{
    error: OpenAIErrorType | null;
  }> => {
    if (!lastRequest) return { error: 'unknown' };
    return requestSuggestion(
      lastRequest.fieldContext,
      lastRequest.fieldName,
      lastRequest.language,
    );
  }, [lastRequest, requestSuggestion]);

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
    regenerate,
    closeModal,
  };
};
