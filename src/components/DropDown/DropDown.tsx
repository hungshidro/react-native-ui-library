import React, { Component } from 'react';
import { View } from 'react-native';

type Props<T> = {
  data: T[];
  renderItem: (value: {
    item: T;
    index: number;
    isSelected: boolean;
  }) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
};

type State = {
  visible: boolean;
  x: number;
  y: number;
  xLayout: number;
  yLayour: number;
  width: number;
  height: number;
};

export class DropDown<T extends any> extends Component<Props<T>, State> {
  constructor(props: Props<T>) {
    super(props);
    this.state = {
      visible: false,
      height: 0,
      width: 0,
      x: 0,
      y: 0,
      xLayout: 0,
      yLayour: 0,
    };
  }

  render(): React.ReactNode {
    return (
      <View
        ref={(ref) => {
          ref?.measureInWindow((x, y, width, height) => {
            this.setState({ x, y, width, height });
          });
          ref?.measureLayout(ref, (x, y) => {
            this.setState({ xLayout: x, yLayour: y });
          });
        }}
      />
    );
  }
}
