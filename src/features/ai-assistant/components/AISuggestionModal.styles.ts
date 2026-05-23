import type { SxProps, Theme } from '@mui/material/styles';

export const dialogTitleStackSx: SxProps<Theme> = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
};

export const loadingContainerSx: SxProps<Theme> = {
  alignItems: 'center',
  py: 5,
  gap: 3,
};

export const sparkleIconSx: SxProps<Theme> = {
  fontSize: 56,
  color: 'primary.main',
  animation: 'pulse 1.5s ease-in-out infinite',
  '@keyframes pulse': {
    '0%': { opacity: 1, transform: 'scale(1)' },
    '50%': { opacity: 0.4, transform: 'scale(1.3)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
};

export const thinkingMessageSx: SxProps<Theme> = {
  transition: 'opacity 0.5s ease',
  textAlign: 'center',
};

export const dotsContainerSx: SxProps<Theme> = {
  flexDirection: 'row',
  gap: 0.8,
  alignItems: 'center',
};

export const getDotSx = (index: number): SxProps<Theme> => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  bgcolor: 'primary.main',
  display: 'inline-block',
  animation: 'bounce 1.2s ease-in-out infinite',
  animationDelay: `${index * 0.2}s`,
  '@keyframes bounce': {
    '0%, 100%': { opacity: 0.3, transform: 'translateY(0)' },
    '50%': { opacity: 1, transform: 'translateY(-6px)' },
  },
});

export const suggestionHintSx: SxProps<Theme> = {
  mb: 2,
};
