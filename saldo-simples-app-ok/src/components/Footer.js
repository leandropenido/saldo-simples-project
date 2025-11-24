import React from 'react';
import { StyleSheet, Image} from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Footer = () => {
  const navigation = useNavigation();
  return (
  <SafeAreaView>
      <Appbar style={styles.footer}>
        <Appbar.Action style={styles.icon} icon="home" onPress={() => navigation.navigate('Home')} />
      <Appbar.Action style={styles.icon} icon="currency-usd" onPress={() => navigation.navigate('CadastroEntrada')}/>
        <Appbar.Action style={styles.icon} icon="finance" onPress={() => navigation.navigate('Despesa')} />
        <Appbar.Action style={styles.icon} icon="account" onPress={() => navigation.navigate('Login')} />
      </Appbar>
  </SafeAreaView>
  );
};
//  size={1.5}

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