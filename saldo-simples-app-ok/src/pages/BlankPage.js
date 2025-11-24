import { ScrollView ,Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import Body from '../components/Body';
import Container from '../components/Container';
import Footer from '../components/Footer';


import HomePageCarousel from '../components/HomePageCarousel';


function BlankPage({ navigation }) {
  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={{paddingBottom: 5}}>
        <Body>
        <Text style={styles.title}>Algo deu errado...</Text>
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
});

export default BlankPage;