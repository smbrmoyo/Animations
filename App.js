/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

const App: () => Node = () => {
  const value = useState(new Animated.ValueXY(0))[0];

  const pan = useState(new Animated.ValueXY())[0];

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx), pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  )[0];

  function moveBall() {
    Animated.timing(value, {
      toValue: 300,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  console.log(pan.getLayout());
  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            transform: [
              {
                translateX: pan.x,
              },
              {
                translateY: pan.y,
              },
            ],
            borderRadius: 100 / 2,
            backgroundColor: 'grey',
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

export default App;
