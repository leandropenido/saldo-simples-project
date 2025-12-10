import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import Header from "../components/Header";
import Body from "../components/Body";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { getUser } from "../global/User";

export default function CadastroEntrada({ navigation }) {
  const { userId, userToken, isLogged } = getUser();

  useEffect(() => {
    if (!isLogged) {
      navigation.replace("BlankPage");
    }
  }, [isLogged, navigation]);

  if (!isLogged) {
    return null;
  }

  const [entradas, setEntradas] = useState([{ categoria: "", valor: "" }]);

  const canSave = entradas.every(
    (entrada) => entrada.categoria.length > 0 && entrada.valor > 0
  );
  const postData = async (userData) => {
    return await fetch("http://.../api/Receita/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
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

  const createEntrada = async () => {
    for (const entrada of entradas) {
      if (!canSave) {
        Alert.alert(
          "Campos obrigatórios",
          "Preencha todos os campos corretamente."
        );
        return;
      }
      const entradasObj = {
        userId,
        origemReceita: entrada.categoria,
        valor: Number(entrada.valor),
      };
      const result = await postData(entradasObj);
      if (result.success) {
        Alert.alert("Sucesso", "Cadastro de entrada realizado com sucesso!");
        navigation.navigate("Despesa");
      } else if (result.status) {
        Alert.alert("Tente novamente!", "Dados inválidos!");
      } else {
        Alert.alert("Erro", "Falha ao cadastrar entrada!");
      }
    }
  };
  const atualizarCampo = (index, campo, valor) => {
    const novas = [...entradas];
    novas[index][campo] = valor;
    setEntradas(novas);
  };

  const adicionarLinha = () => {
    if(entradas.length >= 10) {
      Alert.alert('Atenção', 'Favor cadastrar apenas 10 entradas por vez');
      return;
    } 
    setEntradas([...entradas, { categoria: "", valor: "" }]);
  };

  const removerLinha = (index) => {
    if (entradas.length === 1) return; // não deixa apagar a última
    const novas = entradas.filter((_, i) => i !== index);
    setEntradas(novas);
  };

  return (
    <Container>
      <Header /* title="Cadastro de Orçamento" */ />
      <Body>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Cadastrar Entradas</Text>

          <View style={styles.card}>
            {entradas.map((item, index) => (
              <View key={index} style={styles.linha}>
                <TextInput
                  style={[styles.input, styles.categoria]}
                  value={item.categoria}
                  onChangeText={(t) => atualizarCampo(index, "categoria", t)}
                  placeholder="Salário, Freelancer..."
                  placeholderTextColor="#444"
                />

                {/* Campo de valor com placeholder à esquerda e número à direita */}
                <View style={styles.valorBox}>
                  {!item.valor && (
                    <Text style={styles.placeholderValor}>Valor</Text>
                  )}
                  <TextInput
                    style={styles.valorInput}
                    keyboardType="numeric"
                    value={String(item.valor)}
                    onChangeText={(t) => atualizarCampo(index, "valor", Number(t))}
                  />
                </View>
                <TouchableOpacity
                  style={styles.botaoRemover}
                  onPress={() => removerLinha(index)}
                >
                  <Text style={styles.botaoRemoverTexto}>-</Text>
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity style={styles.botaoAdd} onPress={adicionarLinha}>
              <Text style={styles.botaoAddTexto}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoSalvar} onPress={createEntrada}>
              <Text style={styles.textoBotaoSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Body>

      {/* Se quiser que o ícone de cifrão do Footer leve a esta tela, passe uma prop */}
      <Footer /* onPressCifrao={() => navigation.navigate('Orcamento')} */ />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f1f1ee",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 28,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 12,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10 },
      android: { elevation: 3 },
    }),
  },

  linha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#d7d7d7",
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 40,
    borderRadius: 10,
    color: "#000",
    borderWidth: 1,
    borderColor: "#cfcfcf",
    fontSize: 14.5,
  },

  categoria: {
    flex: 1,
    marginRight: 8,
    minWidth: 0,
    flexShrink: 1,
  },

  // —— Campo de valor (container + placeholder + input) ——
  valorBox: {
    width: 110,
    height: 40,
    backgroundColor: "#d7d7d7",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cfcfcf",
    justifyContent: "center",
    position: "relative",
  },
  placeholderValor: {
    position: "absolute",
    left: 10,
    color: "#444",
    fontSize: 14,
  },
  valorInput: {
    flex: 1,
    textAlign: "right",
    paddingRight: 10,
    paddingLeft: 10,
    color: "#000",
    fontSize: 14,
  },

  botaoAdd: {
    alignSelf: "center",
    marginTop: 6,
    marginBottom: 6,
  },
  botaoAddTexto: {
    fontSize: 28,
    color: "#1e8e3e",
    fontWeight: "bold",
  },
  botaoRemover: {
    width: 20,
    alignSelf: "center",
    marginTop: 6,
    marginBottom: 6,
  },
  botaoRemoverTexto: {
    fontSize: 48,
    paddingLeft: 3,
    color: "#FF5252",
    fontWeight: "bold",
  },
  botaoSalvar: {
    backgroundColor: "#48BF91",
    borderRadius: 12,
    marginTop: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  textoBotaoSalvar: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
