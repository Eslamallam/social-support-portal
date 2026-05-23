import { useTranslation } from 'react-i18next';

import { useEffect, useState } from 'react';

import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {
  dialogTitleStackSx,
  dotsContainerSx,
  getDotSx,
  loadingContainerSx,
  sparkleIconSx,
  suggestionHintSx,
  thinkingMessageSx,
} from './AISuggestionModal.styles';

const THINKING_MESSAGES_KEYS = [
  'aiAssistant.thinking.analyzing',
  'aiAssistant.thinking.writing',
  'aiAssistant.thinking.refining',
  'aiAssistant.thinking.almostDone',
];

interface AISuggestionModalProps {
  open: boolean;
  isLoading: boolean;
  suggestion: string;
  onAccept: (text: string) => void;
  onDiscard: () => void;
}

export const AISuggestionModal = ({
  open,
  isLoading,
  suggestion,
  onAccept,
  onDiscard,
}: AISuggestionModalProps) => {
  const { t } = useTranslation();
  const [prevSuggestion, setPrevSuggestion] = useState(suggestion);
  const [editedSuggestion, setEditedSuggestion] = useState(suggestion);
  const [messageIndex, setMessageIndex] = useState(0);

  if (prevSuggestion !== suggestion) {
    setPrevSuggestion(suggestion);
    setEditedSuggestion(suggestion);
  }

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % THINKING_MESSAGES_KEYS.length);
    }, 2000);

    return () => {
      clearInterval(interval);
      setMessageIndex(0);
    };
  }, [isLoading]);

  return (
    <Dialog
      open={open}
      onClose={onDiscard}
      maxWidth="sm"
      fullWidth
      aria-labelledby="ai-suggestion-title"
    >
      <DialogTitle id="ai-suggestion-title">
        <Stack sx={dialogTitleStackSx}>
          <AutoAwesomeOutlined color="primary" fontSize="small" />
          <span>{t('aiAssistant.title')}</span>
        </Stack>
      </DialogTitle>

      {isLoading && (
        <DialogContent>
          <Stack sx={loadingContainerSx}>
            <AutoAwesomeOutlined sx={sparkleIconSx} />
            <Typography
              variant="body1"
              color="text.secondary"
              sx={thinkingMessageSx}
            >
              {t(THINKING_MESSAGES_KEYS[messageIndex])}
            </Typography>
            <Stack sx={dotsContainerSx}>
              {[0, 1, 2].map((dot) => (
                <Typography key={dot} component="span" sx={getDotSx(dot)} />
              ))}
            </Stack>
          </Stack>
        </DialogContent>
      )}

      {suggestion && !isLoading && (
        <DialogContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={suggestionHintSx}
          >
            {t('aiAssistant.suggestionHint')}
          </Typography>
          <TextField
            multiline
            rows={6}
            value={editedSuggestion}
            onChange={(e) => setEditedSuggestion(e.target.value)}
            fullWidth
            aria-label={t('aiAssistant.editSuggestion')}
          />
        </DialogContent>
      )}

      <DialogActions>
        <Button
          onClick={onDiscard}
          color="inherit"
          aria-label={t('aiAssistant.discard')}
        >
          {t('aiAssistant.discard')}
        </Button>
        {suggestion && !isLoading && (
          <Button
            onClick={() => onAccept(editedSuggestion)}
            variant="contained"
            startIcon={<AutoAwesomeOutlined />}
            aria-label={t('aiAssistant.accept')}
          >
            {t('aiAssistant.accept')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
