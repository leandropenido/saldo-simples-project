

import {  Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';

import Header from '../components/Header';
import Body from '../components/Body';
import Container from '../components/Container';
import Footer from '../components/Footer'



function HomePage({navigation}) {

  return (
    <Container>
      <Header />
      <Body>
        <Text style={styles.title}>Bem-{'\n'}Vindo</Text>
        <Text style={{ textAlign: 'justify', padding: 5, marginTop: 10 }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
          delectus eveniet unde eos dolorem tenetur nostrum illum ex possimus
          laboriosam voluptatibus nisi impedit, eum exercitationem, sit, vitae
          dolore maiores nam.
        </Text>
       

        <Button
          mode="contained"
          style={{
            width: '40%',
            alignSelf: 'center',
            marginTop: 10,
            backgroundColor: '#48BF91',
          }}
          icon="account">
          Registre-se
        </Button>
        <Footer />
      </Body>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomePage;