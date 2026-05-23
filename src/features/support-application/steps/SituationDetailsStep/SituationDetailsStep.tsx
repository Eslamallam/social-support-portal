import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import {
  AISuggestionModal,
  FIELD_PROMPTS_AR,
  FIELD_PROMPTS_EN,
  useAIAssistant,
} from '@/features/ai-assistant';

import { SituationTextField } from '../../components/SituationTextField';
import { useApplicationForm } from '../../hooks/useApplicationForm';

export const SituationDetailsStep = () => {
  const { t, i18n } = useTranslation();
  const { setValue } = useApplicationForm();
  const { enqueueSnackbar } = useSnackbar();

  const [activeField, setActiveField] = useState<string | null>(null);

  const {
    suggestion,
    isLoading,
    isModalOpen,
    requestSuggestion,
    regenerate,
    closeModal,
  } = useAIAssistant();

  const handleAIAssist = (fieldName: string, currentValue: string) => {
    setActiveField(fieldName);

    const fieldPrompts =
      i18n.language === 'ar' ? FIELD_PROMPTS_AR : FIELD_PROMPTS_EN;
    const prompt = currentValue.trim()
      ? `I have started writing: "${currentValue}". Please help me improve and expand this for a government assistance application.`
      : (fieldPrompts[fieldName] ??
        `Help me write a clear description for the "${fieldName.split('.').pop() ?? fieldName}" section of a government financial assistance application.`);

    void requestSuggestion(prompt, fieldName, i18n.language).then(
      ({ error }) => {
        if (error) {
          enqueueSnackbar(t(`aiAssistant.errors.${error}`), {
            variant: 'error',
          });
        }
      },
    );
  };

  const handleAccept = (text: string) => {
    if (activeField) {
      setValue(activeField as never, text as never, {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });
    }
    closeModal();
    setActiveField(null);
  };

  const handleRegenerate = () => {
    void regenerate().then(({ error }) => {
      if (error) {
        enqueueSnackbar(t(`aiAssistant.errors.${error}`), {
          variant: 'error',
        });
      }
    });
  };

  const handleDiscard = () => {
    closeModal();
    setActiveField(null);
  };

  return (
    <>
      <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
        {t('steps.situationDetails')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {t('situation.subtitle')}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <SituationTextField
            name="situation.financialSituation"
            label={t('situation.financialSituation')}
            onAIAssist={(val) =>
              handleAIAssist('situation.financialSituation', val)
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SituationTextField
            name="situation.employmentCircumstances"
            label={t('situation.employmentCircumstances')}
            onAIAssist={(val) =>
              handleAIAssist('situation.employmentCircumstances', val)
            }
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SituationTextField
            name="situation.reasonForApplying"
            label={t('situation.reasonForApplying')}
            onAIAssist={(val) =>
              handleAIAssist('situation.reasonForApplying', val)
            }
          />
        </Grid>
      </Grid>

      <AISuggestionModal
        open={isModalOpen}
        isLoading={isLoading}
        suggestion={suggestion}
        onAccept={handleAccept}
        onDiscard={handleDiscard}
        onRegenerate={handleRegenerate}
      />
    </>
  );
};
