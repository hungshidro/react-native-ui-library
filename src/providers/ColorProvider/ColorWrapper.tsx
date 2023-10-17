import React, { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ColorProvider } from './ColorProvider';
import {
  type ColorConfig,
  type KeyPath,
  type ColorProviderProps,
} from './ColorProvider';
import {
  type ColorProviderRef,
  type ColorProviderRefObject,
} from '../../types';
import { COLOR_STORAGE_KEY } from '../../contants';

type SetThemeKeyParams<T> = T | ((prevThme: T) => T);

type ColorProviderRefArray = {
  id: string;
  ref: ColorProviderRefObject<any, any>;
};

const listRef: ColorProviderRefArray[] = [];

const getRef = (id: string) => {
  const targetRef = listRef.find((ref) => ref.id === id);
  if (targetRef?.ref?.current) return targetRef.ref.current;
  else return null;
};

/**
 *
 * @param config pass color config to the Provider, it will be used to set the color theme,
 * it should be an object with key as theme name and value as color config,
 * @example eg:
 * ```ts
 * const config = {
 *  dark: {
 *    background: 'black',
 *  },
 *  light: {
 *    background: 'white',
 *  }
 * }
 * ```
 * @param storageKey pass storage key to the Provider, it will be used to store the color theme in the storage, this should be set if you are using multiple color providers in your app
 * @returns
 */

export const createColorWrapper = <
  T extends ColorConfig<K>,
  K extends object,
  L extends keyof T = keyof T
>(
  config: T,
  storageKey: string = COLOR_STORAGE_KEY
) => {
  let indexRef = 0;
  let crrTheme: KeyPath<T> = Object.keys(config)[0] as KeyPath<T>;
  const context = React.createContext('dark');
  context.displayName = storageKey;

  /**
   * use this function to set the color theme
   *
   * @param themeKey pass the theme key to set the color theme, theme key should be one of the keys of the config object
   */
  const setThemeColor = (theme: SetThemeKeyParams<KeyPath<T>>) => {
    let themeKey: KeyPath<T>;

    if (typeof theme === 'function') themeKey = theme(crrTheme);
    else themeKey = theme;

    crrTheme = themeKey;
    console.log(indexRef, storageKey);
    getRef(storageKey)?._setTheme(themeKey);
  };

  const ColorContainer = (
    props: Omit<
      ColorProviderProps<T, K>,
      'config' | 'colorContext' | 'storageKey'
    >
  ) => {
    const getInitialTheme = async () => {
      if (AsyncStorage) {
        const theme = await AsyncStorage.getItem(storageKey);
        theme && setThemeColor(theme as KeyPath<T>);
      }
    };

    useEffect(() => {
      getInitialTheme();
    }, []);

    const setRef = useCallback((ref: ColorProviderRef<T, K> | null) => {
      if (ref) {
        const newRef = {
          id: storageKey,
          ref: {
            current: ref,
          },
        };
        listRef.push(newRef);
        indexRef = listRef.length - 1;
        console.log('indexRef', indexRef, storageKey, listRef);
      }
    }, []);
    return (
      <ColorProvider
        config={config}
        colorContext={context}
        storageKey={storageKey}
        {...props}
        ref={setRef}
      />
    );
  };

  /**
   *
   * @returns color theme object of the current color theme
   */
  const useColorTheme = (): T[L] => {
    const color = React.useContext(context);
    const colorTheme = config[color] as T[L];
    return colorTheme ? colorTheme : ({} as T[L]);
  };

  return {
    /**
     * ColorProvider is a wrapper component that should be used to wrap the root component of your app
     * Each ColorProvider should have a unique storage key, if you are using multiple color providers in your app then you should create multiple ColorProviders with different storage keys
     */
    ColorProvider: ColorContainer,
    setThemeColor,
    useColorTheme,
  };
};
