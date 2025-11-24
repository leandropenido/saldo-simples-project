import { ScrollView ,Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';

import Header from '../components/Header';
import Body from '../components/Body';
import Container from '../components/Container';
import Footer from '../components/Footer';


import HomePageCarousel from '../components/HomePageCarousel';


function HomePage({ navigation }) {
 
  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={{paddingBottom: 5}}>
        <Body>
        <Text style={styles.title}>Bem-{'\n'}Vindo</Text>
          <HomePageCarousel />
          <Text style={{ textAlign: 'justify', paddingTop: 50}}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
            delectus eveniet unde eos dolorem tenetur nostrum illum ex possimus
            laboriosam voluptatibus nisi impedit, eum exercitationem, sit, vitae
            dolore maiores nam.
          </Text>

          <Button mode="contained" style={styles.bttn} icon="account"
          contentStyle={{height: 52}} onPress={() => {navigation.navigate('Register')}}>
            Registre-se
          </Button>
      </Body>
      </ScrollView>
      <Footer />
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 48,
    fontFamily: 'Roboto',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10
  },
  bttn: {
    borderRadius: 16,
overflow: 'hidden',
    width: '40%',
    alignSelf: 'center',
    backgroundColor: '#48BF91',
    marginTop: 10
  },
});

export default HomePage;