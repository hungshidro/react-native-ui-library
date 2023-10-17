/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  createColorWrapper,
  multiply,
  // useColorTheme,
} from 'react-native-ui-library';

const config = {
  dark: {
    background: 'black',
    color: 'white',
  },
  light: {
    background: 'blue',
    color: 'white',
  },
};

const colorProvider = createColorWrapper(config);
const { ColorProvider, setThemeColor, useColorTheme } = colorProvider;

const TestComponent = () => {
  const color = useColorTheme();
  console.log(color?.background);
  React.useEffect(() => {
    console.log('RENDER');
  }, []);
  return (
    <View
      style={{
        backgroundColor: color?.background,
      }}
    >
      <Text style={{ color: color?.color }}>gdfg: {color?.background}</Text>
    </View>
  );
};

const insideConfig = {
  dark: {
    background: 'black',
    color: 'white',
  },
  light: {
    background: 'blue',
    color: 'yellow',
  },
};
const provider = createColorWrapper(insideConfig, 'themeInside');
const {
  ColorProvider: InsideProvider,
  setThemeColor: setThemeInside,
  useColorTheme: useThemeInside,
} = provider;

const TestInsideComponent = () => {
  const colorInside = useThemeInside();
  return (
    <View
      style={{
        backgroundColor: colorInside?.background,
      }}
    >
      <Text style={{ color: colorInside?.color }}>
        gdfg: {colorInside?.background}
      </Text>
    </View>
  );
};
const InsideComponent = () => {
  return (
    <InsideProvider>
      <TouchableOpacity
        onPress={() => {
          setThemeInside((prev) => {
            if (prev === 'dark') return 'light';
            else return 'dark';
          });
        }}
        style={{
          height: 50,
          width: 50,
          marginTop: 50,
        }}
      >
        <TestInsideComponent />
      </TouchableOpacity>
    </InsideProvider>
  );
};

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
        }}
        onPress={() => {
          setThemeColor((prev) => {
            if (prev === 'dark') return 'light';
            else return 'dark';
          });
        }}
      >
        <Text>jdhfkjg</Text>
      </TouchableOpacity>
      <ColorProvider>
        <TestComponent />
        <InsideComponent />
      </ColorProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
