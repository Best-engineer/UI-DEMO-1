import theme from '../theme.json';

export type Theme = typeof theme;

export const linearTheme = theme;

// 테마 값에 접근하기 위한 헬퍼 함수들
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = theme.colors;
  for (const key of keys) {
    value = value?.[key];
  }
  return value || '';
};

export const getSpacing = (key: string): string => {
  return (theme.spacing as any)[key] || '';
};

export const getBorderRadius = (key: string): string => {
  return theme.borderRadius[key as keyof typeof theme.borderRadius] || '';
};

export const getShadow = (key: string): string => {
  return theme.shadows[key as keyof typeof theme.shadows] || '';
};

export const getZIndex = (key: string): number => {
  return parseInt(theme.zIndex[key as keyof typeof theme.zIndex] || '1');
};

