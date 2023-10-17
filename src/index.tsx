import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-ui-library' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const UiLibrary = NativeModules.UiLibrary
  ? NativeModules.UiLibrary
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return UiLibrary.multiply(a, b);
}

export type {
  ColorProviderProps,
  ColorConfig,
  KeyPath,
} from './providers/ColorProvider/ColorProvider';

export { createColorWrapper } from './providers/ColorProvider/ColorWrapper';
