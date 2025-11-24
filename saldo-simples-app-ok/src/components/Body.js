import React from 'react';

import {StyleSheet, View} from 'react-native';

const Body = ({children}) => {
  return <View style={styles.body}>{children}</View>
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#F0F0EC',
    margin: 5,
  },
});

export default Body;