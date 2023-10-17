import { type ColorConfig, type ColorProvider } from '../providers';

export type FunctionParams<T extends (...args: any[]) => any> = T extends (
  ...args: infer K
) => any
  ? K
  : never;

export type ColorProviderRefObject<
  T extends ColorConfig<K>,
  K extends object
> = {
  current: ColorProviderRef<T, K>;
};

export type ColorProviderRef<
  T extends ColorConfig<K>,
  K extends object
> = ColorProvider<T, K>;
