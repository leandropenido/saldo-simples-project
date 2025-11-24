import React from 'react';
import { StyleSheet, Image} from 'react-native';
import { Appbar, Button } from 'react-native-paper';


const Header = () => {
  return (
  
      <Appbar.Header style={styles.header} >
        <Appbar.Content title={
        <Image
          source={require('../assets/logo-saldo-simples.png')}
          style={styles.img}
        />
         }
      />
        <Appbar.Action icon='menu' size={34} onPress={() => {}} />
      </Appbar.Header>
  );
};
//  

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: '#F0F0EC',
    // flexDirection: 'column',
    // flexWrap: 'wrap',
  },
  img:  {
    flex: 1,
    resizeMode: 'cover',
    height: 100,
    width: 150,
  },
});

export default Header;