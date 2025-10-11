import React from 'react';
import { StyleSheet, Image} from 'react-native';
import { Appbar, Button } from 'react-native-paper';


const Footer = () => {
  return (
  
      <Appbar style={styles.footer}>
        <Appbar.Action style={styles.icon} icon="home" onPress={() => {}} />
        <Appbar.Action style={styles.icon} icon="currency-usd" onPress={() => {}} />
        <Appbar.Action style={styles.icon} icon="download" onPress={() => {}} />
        <Appbar.Action style={styles.icon} icon="account" onPress={() => {}} />
      </Appbar>
  );
};
//  

const styles = StyleSheet.create({
  icon:{
    backgroundColor: '#ccc'
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-around',
    backgroundColor: '#F0F0EC'
  }
});

export default Footer;