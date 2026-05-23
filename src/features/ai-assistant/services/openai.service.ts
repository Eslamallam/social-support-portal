import axios from 'axios';

import { openAIClient } from '@/shared/api';
import { env } from '@/shared/config/env';

import type {
  OpenAIErrorType,
  OpenAIRequest,
  OpenAIResponse,
} from '../types/openai.types';

const buildSystemPrompt = (language: string): string => {
  if (language === 'ar') {
    return 'أنت مساعد مفيد يساعد المواطنين في كتابة وصف واضح وصادق لوضعهم المالي لطلب المساعدة الحكومية. اكتب بأسلوب محترم ومختصر وواقعي.';
  }
  return 'You are a helpful assistant that helps citizens write clear and honest descriptions of their financial situation for a government assistance application. Keep responses concise, empathetic, and factual. Maximum 150 words.';
};

export const generateSuggestion = async ({
  fieldContext,
  fieldName: _fieldName,
  language,
}: OpenAIRequest): Promise<string> => {
  const response = await openAIClient.post<OpenAIResponse>(
    '/chat/completions',
    {
      model: env.openAI.model,
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(language),
        },
        {
          role: 'user',
          content: fieldContext,
        },
      ],
      max_tokens: env.openAI.maxTokens,
      temperature: env.openAI.temperature,
    },
  );

  return response.data.choices[0].message.content;
};

export const getOpenAIErrorType = (error: unknown): OpenAIErrorType => {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') return 'timeout';
    if (error.response?.status === 401) return 'unauthorized';
    if (error.response?.status === 429) return 'rate_limit';
    if (!error.response) return 'network';
  }
  return 'unknown';
};
