import { ERROR_TYPE } from './enum';

export const error = (errorType: ERROR_TYPE) => {
  switch (errorType) {
    case ERROR_TYPE.USE_COLOR_THEME_OUTSIDE_COLOR_PROVIDER:
      return new Error(`using useColorTheme outside of ColorProvider.`);
    case ERROR_TYPE.STORAGE_KEY_DUPLICATE:
      return new Error(
        `You have been using 2 providers with the same storage key. Please use a different storage key for each provider.`
      );
    case ERROR_TYPE.THEME_KEY_NOT_FOUND:
      return new Error('invalid theme key.');
    default:
      return new Error(`Unknown error type: ${errorType}`);
  }
};
