import React from 'react'; // createContext
import {
  // ScrollView, FlatList,
  View,
  type ScrollViewProps,
  type FlatListProps,
} from 'react-native';

type Props<T> =
  | ({
      componentType: 'ScrollView';
    } & ScrollViewProps)
  | ({
      componentType: 'Flastlist';
    } & FlatListProps<T>);

// const DropDownContext = createContext<ScrollView | FlatList | null>(null);

export const DropDownProvider = <T extends any>(props: Props<T>) => {
  const {} = props;
  return <View />;
};
