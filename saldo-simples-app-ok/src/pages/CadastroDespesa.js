import React, { useEffect, useState } from "react";
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
import { Checkbox, TouchableRipple } from "react-native-paper";

import { Picker } from "@react-native-picker/picker";

import Header from "../components/Header";
import Body from "../components/Body";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { getUser } from "../global/User";
import {Categorias} from '../global/Categorias';

export default function CadastroDeDespesasScreen({ navigation }) {
  const { userId, userToken } = getUser();

  const [linhas, setLinhas] = useState([
    { categoria: 0, valor: '', recorrente: false },
  ]);
  const atualizarCampo = (index, campo, valor) => {
    const novo = [...linhas];
    novo[index][campo] = valor;
    setLinhas(novo);
  };
  const removerLinha = (index) => {
    if (linhas.length === 1) return; // não deixa apagar a última
    const novas = linhas.filter((_, i) => i !== index);
    setLinhas(novas);
  };
  const canSave = linhas.every(
    (linha) => linha.categoria > 0 && linha.valor > 0
  );
  const postData = async (userData) => {
    return await fetch(`http://192.168.100.100:5107/api/Despesa/user/${userId}`, {
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

  const createDespesa = async () => {
    for (const linha of linhas) {
      if (!canSave) {
        Alert.alert(
          "Campos obrigatórios",
          "Preencha todos os campos corretamente."
        );
        return;
      }
      const despesaObj = {
        categoria: linha.categoria,
        valor: Number(linha.valor),
        recorrente: linha.recorrente,
      };
      const result = await postData(despesaObj);
      console.log(result);
      console.log(despesaObj);
      if (result.success) {
        Alert.alert("Sucesso", "Cadastro de despesa realizado com sucesso!");
        navigation.navigate("Despesa");
      } else if (result.status) {
        Alert.alert("Tente novamente!", "Dados inválidos!");
      } else {
        Alert.alert("Erro", "Falha ao cadastrar despesa!");
      }
    }

    // navegação depois do cadastro
  };
  const adicionarLinha = () => {
    const ultimaLinha = linhas[linhas.length - 1];
    const canSaveUltima = ultimaLinha.categoria > 0 && ultimaLinha.valor > 0;
    if (!canSaveUltima) {
      Alert.alert(
        "Por favor, preencha a linha atual antes de adicionar uma nova."
      );
      return;
    }
    setLinhas([...linhas, { categoria: 0, valor: '', recorrente: false }]);
  };

  return (
    <Container>
      <Header /* title="Cadastro de Orçamento" */ />
      <Body>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Cadastrar Despesa</Text>

          <View style={styles.card}>
            {linhas.map((item, index) => (
              <View key={index} style={styles.linha} theme={{ roundness: 16 }}>
                <Picker
                  style={[styles.input, styles.categoria]}
                  placeholderTextColor="#444"
                  selectedValue={item.categoria}
                  onValueChange={(itemValue) =>
                    atualizarCampo(index, "categoria", Number(itemValue))
                  }
                >
                  <Picker.Item label="Selecione..." value={0} />
                  {Object.entries(Categorias).map(([label, value]) => (
                    <Picker.Item
                      label={label}
                      value={value}
                      key={value}
                    />
                  ))}
                </Picker>

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
                <View>
                  <Text>Recorrente</Text>
                  <Checkbox.Item
                    status={item.recorrente ? "checked" : "unchecked"}
                    onPress={() =>
                      atualizarCampo(index, "recorrente", !item.recorrente)
                    }
                  />
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.botaoAdd} onPress={adicionarLinha}>
              <Text style={styles.botaoAddTexto}>+</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={createDespesa}
            >
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
      android: { elevation: 3 },
    }),
  },

  linha: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  input: {
    height: 60,
    width: 80,
    borderRadius: 10,
    backgroundColor: "#d7d7d7",
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#000",
    borderWidth: 1,
    borderColor: "#cfcfcf",
  },

  categoria: {
    flex: 1,
    marginRight: 8,
    minWidth: 0,
  },

  // —— Campo de valor (container + placeholder + input) ——
  valorBox: {
    width: 110,
    height: 60,
    backgroundColor: "#d7d7d7",
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
