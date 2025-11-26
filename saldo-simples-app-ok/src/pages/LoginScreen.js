import React, { useEffect } from "react";
import { Alert, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button, Avatar } from "react-native-paper";

import Header from "../components/Header";
import Body from "../components/Body";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { getUser, setUser } from "../global/User";

function LoginScreen({ navigation }) {
  const { userId, userToken, isLogged } = getUser();
 
   useEffect(() => {
     if (isLogged) {
       navigation.replace('BlankPage');
     }
   }, [isLogged, navigation]);
 
   if (isLogged) {
     return null;
   }

  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const postData = async (userData) => {
    return await fetch("http://192.168.100.100:5107/api/Users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          return { success: false, status: response.status };
        }
        return response.json().then((data) => ({ success: true, data }));
      })
      .catch((err) => console.log(err));
  };

  const handleLogin = async () => {
    const formOk = usuario && senha;
    if (!formOk) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha todos os campos corretamente."
      );
      return;
    }

    const usrObj = {
      email: usuario,
      password: senha,
    };
    // navegação depois do cadastro
    const result = await postData(usrObj);
    console.log(result.data.user.id);
    if (result.success) {
      console.log('ok!');
      Alert.alert(
        "Sucesso",
        "Login realizado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              setUser(result.data.user.id, result.data.token);
              navigation.navigate("Home");
            },
          },
        ],
        { cancelable: false }
      );
    } else if (result.status) {
      Alert.alert("Tente novamente!", "Usuário ou senha inválidos!");
    } else {
      Alert.alert("Erro", "Falha ao logar!");
    }
  };
  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 5 }}>
        <Body>
          <Avatar.Image
            size={100}
            source={require("../assets/avatar.jpg")}
            style={styles.avatar}
          />

          <TextInput
            label="Usuario"
            value={usuario}
            onChangeText={setUsuario}
            style={styles.input}
            keyboardType="email-address"
            mode="outlined"
            theme={{ roundness: 16 }}
          />

          <TextInput
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            secureTextEntry
            mode="outlined"
            theme={{ roundness: 16 }}
          />

          <Button
            mode="contained"
            style={{
              borderRadius: 16,
              overflow: "hidden",
              width: "40%",
              alignSelf: "center",
              marginTop: 10,
              backgroundColor: "#48BF91",
            }}
            contentStyle={{ height: 52 }}
            textColor="#fff"
            uppercase={false}
            onPress={handleLogin}
          >
            Login
          </Button>
        </Body>
      </ScrollView>
      <Footer />
    </Container>
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginTop: 20,
    marginBottom: 30,
    alignSelf: "center",
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default LoginScreen;

// import * as React from 'react';
// import { View, StyleSheet, Image } from 'react-native';
// import { TextInput, Avatar } from 'react-native-paper';
// import { Button } from 'react-native-paper';

// const LoginScreen = () => {

//   return (

//     <View style={styles.container}>

//       <TextInput
//         label = "Usuario"
//         value={usuario}
//         onChangeText={setUsuario}
//         style={styles.input}
//         keyboardType="email-address"
//         mode="outlined"
//       />

//       <TextInput
//       label = "Senha"
//       value={senha}
//       onChangeText={setSenha}
//       style={styles.input}
//       secureTextEntry
//       mode="outlined"
//       />

//       <Button
//        mode="contained"
//        onPress={() => console.log('Entrar')}
//       textColor="white"
//       style={[styles.button, { backgroundColor: '#2a7e19' }]}
// >
//   Entrar
// </Button>

//     </View>

//   );

// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, alignItems:'center'},

//  avatar: {
//     marginBottom: 30,
//   },

//   input: {
//     marginBottom: 15
//       },

//   buttonContainer: {
//     alignItems: 'center',
//     marginTop:10,
//   },

//   button: {
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 40,
//     width: '50%',

//   },
// });

// export default LoginScreen;
