import type { UseFormReturn } from 'react-hook-form';

import { useCallback, useEffect } from 'react';

import type { ApplicationFormData } from '../types/application.types';

const FORM_STORAGE_KEY = 'social-support-form-data';
const STEP_STORAGE_KEY = 'social-support-current-step';

export const loadSavedFormData = (): Partial<ApplicationFormData> | null => {
  try {
    const saved = localStorage.getItem(FORM_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const useFormPersistence = (
  methods: UseFormReturn<ApplicationFormData>,
) => {
  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((data) => {
      try {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
      } catch {
        console.error('Failed to save form data to LocalStorage');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(FORM_STORAGE_KEY);
    localStorage.removeItem(STEP_STORAGE_KEY);
  }, []);

  return { clearSavedData };
};
