import React, { useState, useEffect } from 'react';
import { Alert,StyleSheet, ScrollView, Text } from 'react-native';

import { Button, TextInput } from 'react-native-paper';
import Header from '../components/Header';
import Body from '../components/Body';
import Container from '../components/Container';
import Footer from '../components/Footer';
import {getUser} from '../global/User';

const COLORS = {
  primary: '#26C24C', // verde do logo
  navy: '#1E2B3C', // azul do texto do logo
  bg: '#F7F8FA',
  label: '#111827',
  hint: '#6B7280',
};


export default function RegisterPage({ navigation }) {
  
  const { userId, userToken, isLogged } = getUser();
  
    useEffect(() => {
      if (isLogged) {
        navigation.replace('BlankPage');
      }
    }, [isLogged, navigation]);
  
    if (isLogged) {
      return null;
    }
  
  const [name, setName] = useState('');
  const [cpf, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const postData = async (userData) => {
    return await fetch('http://192.168.100.100:5107/api/Users', { method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
      })
      .then(response => {
        if (!response.ok) {
          return {success: false, status: response.status};
        }
        return response.json().then(data => ({success: true, data}));
        
      })
      .catch(err => console.log(err));
  }

  
  
  const handleSubmit = async () => {
    const cpfValido = cpf.replace(/\D/g, '').length === 11;
    const formOk = name && cpfValido && email && senha;
    if (!formOk) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha todos os campos corretamente.'
     );
      return;
    }

    const usrObj = {
      userName : name,
      email,
      cpf,
      senhaString: senha,
    }
    // navegação depois do cadastro
    const result = await postData(usrObj);
    if(result.success){
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate("Home");
    } else if (result.status) {
      Alert.alert('Tente novamente!', 'Algum dado em uso' );
    } else {
      Alert.alert('Erro', 'Falha ao cadastrar!');
    }

  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 5 }}>
        <Body>
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>
            Preencha seus dados para continuar
          </Text>

          <Text style={styles.label}>Nome:</Text>
          <TextInput
            label="Nome Completo"
            value={name}
            onChangeText={setName}
            style={styles.input}
            mode="outlined"
            theme={{ roundness: 16 }}
          />

          <Text style={styles.label}>CPF:</Text>
          <TextInput
            mode="outlined"
            placeholder="000.000.000-00"
            value={cpf}
            onChangeText={setCPF}
            style={styles.input}
            keyboardType="numeric"
            theme={{ roundness: 16 }}
          />

          <Text style={styles.label}>Email:</Text>
          <TextInput
            mode="outlined"
            placeholder="Ex: saldo@gmail.com"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            theme={{ roundness: 16 }}
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput
            mode="outlined"
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
            style={styles.input}
            keyboardType="default"
            theme={{ roundness: 16 }}
            right={
              <TextInput.Icon icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)} 
              />
            }
          />

          <Button
            mode="contained"
            style={[styles.button, { borderRadius: 16, overflow: 'hidden' }]} // <<< arredonda
            contentStyle={{ height: 52 }} // <<< altura
            textColor="#fff" // <<< cor do texto
            uppercase={false}
            onPress={handleSubmit}
          >
            Cadastrar
          </Button>

          <Text style={styles.footer}>
            Já possui uma conta?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation?.navigate?.('Login')}>
              Fazer login
            </Text>
          </Text>
        </Body>
      </ScrollView>
      <Footer />
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.navy,
  },
  subtitle: {
    textAlign: 'center',
    color: COLORS.hint,
    marginBottom: 20,
  },
  label: {
    color: COLORS.label,
    paddingHorizontal: 20,
    marginBottom: 2,
    marginTop: 8,
  },
  input: {
    paddingHorizontal: 20,
  },
  button: {
    width: '40%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#48BF91',
  },
  footer: {
    textAlign: 'center',
    color: COLORS.hint,
    marginTop: 14,
  },
  link: {
    color: '#48BF91',
    fontWeight: '700',
  },
});
