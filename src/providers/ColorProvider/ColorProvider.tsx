import React, { Component } from 'react';
import { type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR_STORAGE_KEY } from '../../contants';

export type ColorProviderProps<T extends ColorConfig<K>, K extends object> = {
  config: T;
  children?: React.ReactElement | ReactNode;
  defaultTheme?: KeyPath<T>;
  colorContext: React.Context<string>;
  storageKey?: string;
};

type State = {
  theme: string;
};

export type ColorConfig<T extends any> = Record<string, T>;

export type KeyPath<T, K extends keyof T = keyof T> = K extends string | number
  ? `${K}` | never
  : never;

export class ColorProvider<
  T extends ColorConfig<K>,
  K extends object
> extends Component<ColorProviderProps<T, K>, State> {
  constructor(props: ColorProviderProps<T, K>) {
    super(props);
    this.state = {
      theme: Object.keys(this.props.config)[0] ?? this.props.defaultTheme ?? '',
    };
  }

  config = this.props.config;

  _setTheme = (themeKey: KeyPath<T>) => {
    const { storageKey = COLOR_STORAGE_KEY } = this.props;
    if (this.props.config[themeKey]) {
      this.setState({ theme: themeKey }, () => {
        AsyncStorage.setItem(storageKey, themeKey);
      });
    }
  };

  render() {
    return (
      <this.props.colorContext.Provider value={this.state.theme}>
        {this.props.children}
      </this.props.colorContext.Provider>
    );
  }
}
