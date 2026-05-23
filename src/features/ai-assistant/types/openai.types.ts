export interface OpenAIRequest {
  fieldContext: string;
  fieldName: string;
  language: string;
}

export type OpenAIErrorType =
  | 'timeout'
  | 'unauthorized'
  | 'rate_limit'
  | 'network'
  | 'unknown';

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
