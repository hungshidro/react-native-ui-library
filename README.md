# react-native-ui-library

a library made my hungshidro

## Installation

```sh
npm install @hungshidro/react-native-ui-library
```

## Usage

```js
import { createColorWrapper } from '@hungshidro/react-native-ui-library';

// ...

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

const { ColorProvider, setThemeColor, useColorTheme } =
  createColorWrapper(config);

const TestComponent = () => {
  const color = useColorTheme();

  return (
    <View
      style={{
        backgroundColor: color?.background,
      }}
    >
      <Text style={{ color: color?.color }}>
        background color: {color?.background}
      </Text>
    </View>
  );
};

return (
  <ColorProvider>
    <TestComponent />
  </ColorProvider>
);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
