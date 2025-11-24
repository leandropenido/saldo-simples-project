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
import { Picker } from "@react-native-picker/picker";

import Header from "../components/Header";
import Body from "../components/Body";
import Container from "../components/Container";
import Footer from "../components/Footer";
import { getUser } from "../global/User";
import { Categorias } from "../global/Categorias";

const quantidadeCategorias = Object.values(Categorias).length;

export default function CadastroOrcamento({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const { userId, userToken } = getUser();
  const [isDataLoaded, setIsDataLoaded] = useState(false);  

  const [linhas, setLinhas] = useState([{ categoria: 0, meta: "" }]);

  const atualizarCampo = (index, campo, meta) => {
    const novo = [...linhas];
    novo[index][campo] = meta;
    setLinhas(novo);
  };
  const removerLinha = (index) => {
    if (linhas.length === 1) return; // não deixa apagar a última
    const novas = linhas.filter((_, i) => i !== index);
    setLinhas(novas);
  };

  const canSave = linhas.every(
    (linha) => linha.categoria > 0 && linha.meta > 0
  );

  const getDespesaData = async () => {
    return await fetch("http://192.168.0.221:5107/api/Despesa/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return { success: false, status: response.status };
        }
        return response.json().then((data) => ({ success: true, data }));
      })
      .catch((err) => console.log(err));
  };

  const sumDespesasByCathegory = async () => {
    const despesasReturned = await getDespesaData();

    if (!despesasReturned.success) {
      return ;
    }
    const despesasSum = despesasReturned.data.reduce((acc, currentDespesa) => {
      
      
      const categoryId = currentDespesa.categoria;

      const value = Number(currentDespesa.valor) || 0;

      if (categoryId) {
        acc[categoryId] = (acc[categoryId] || 0) + value;
      }
      
      return acc;
    }, {});

    return despesasSum;
  };

  const getOrcamentoData = async () => {
    return await fetch("http://192.168.0.221:5107/api/Orcamento/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return { success: false, status: response.status };
        }
        return response.json().then((data) => ({ success: true, data }));
      })
      .catch((err) => console.log(err));
  };

  const loadData = async () => {
    setIsLoading(true);
    const orcamentoReturned = await getOrcamentoData();

    let orcamentoLoaded = false;

    if (orcamentoReturned.success && orcamentoReturned.data) {
      orcamentoLoaded =true;
      const loadedLines = orcamentoReturned.data.map((orcamento) => {
        return {
          categoria: orcamento.categoria,
          saldo: orcamento.saldo,
          meta:Number(orcamento.meta),
        };
      });
      if (loadedLines.length > 0) {
        setLinhas(loadedLines);
      } else setLinhas([{ categoria: 0, meta: "" }]);
    }
    setIsLoading(false);
    return orcamentoLoaded;
  };
  // const despesaCadastradaVar = await getDespesaData();

  useEffect(() => {
    const initLoading = async () => {
      const res = await loadData();
      setIsDataLoaded(res);
    }

    initLoading();
  }, []);

  const postData = async (userData) => {
    return await fetch("http://192.168.0.221:5107/api/Orcamento/", {
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

  const putData = async (userData) => {
    return await fetch("http://192.168.0.221:5107/api/Orcamento/", {
      method: "PUT",
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
  const createOrcamento = async () => {
    const despesas = await sumDespesasByCathegory();

    for (const linha of linhas) {
      if (!canSave) {
        Alert.alert(
          "Campos obrigatórios",
          "Preencha todos os campos corretamente."
        );
        return;
      }

      const saldo = despesas?.[linha.categoria] ?? 0;

      const orcamentoObj = {
        userId,
        saldo,
        meta: Number(linha.meta),
        categoria: linha.categoria,
      };
      let result;
      if (isDataLoaded) {
        result = await putData(orcamentoObj);
      } else {
        result = await postData(orcamentoObj);
      }
      if (result.success) {
        Alert.alert("Sucesso", "Cadastro de orçamento realizado com sucesso!");
        navigation.navigate("Despesa");
      } else if (result.status) {
        Alert.alert("Tente novamente!", "Dados inválidos!");
      } else {
        Alert.alert("Erro", "Falha ao cadastrar orçamento!");
      }
    }
  };

  const usadas = linhas.map((l) => l.categoria).filter(Boolean);

  const adicionarLinha = () => {
    const ultimaLinha = linhas[linhas.length - 1];
    const canSaveUltima = ultimaLinha.categoria > 0 && ultimaLinha.meta > 0;
    if (!canSaveUltima) {
      Alert.alert(
        "Por favor, preencha a linha atual antes de adicionar uma nova."
      );
      return;
    } else if (usadas.length >= quantidadeCategorias) {
      Alert.alert("Atenção!", "Não pode adicionar mais de uma categoria!");
      return;
    }
    setLinhas([...linhas, { categoria: 0, meta: "" }]);
  };

  if (isLoading) {
    return (
      <Container>
        <Header />
        <ScrollView contentContainerStyle={{ paddingBottom: 5 }}>
          <Body>
            <Text style={styles.title}>Carregando...</Text>
          </Body>
        </ScrollView>
        <Footer />
      </Container>
    );
  }
  return (
    <Container>
      <Header /* title="Cadastro de Orçamento" */ />
      <Body>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.titulo}>Cadastrar orçamento</Text>

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
                  {Object.entries(Categorias).map(([label, valor]) => (
                    <Picker.Item
                      label={label}
                      value={valor}
                      key={valor}
                      enabled={
                        !usadas.includes(valor) || valor === item.categoria
                      }
                    />
                  ))}
                </Picker>

                {/* Campo de valor com placeholder à esquerda e número à direita */}
                <View style={styles.valorBox}>
                  {!item.meta && (
                    <Text style={styles.placeholderValor}>Valor</Text>
                  )}
                  <TextInput
                    style={styles.valorInput}
                    keyboardType="numeric"
                    value={String(item.meta)}
                    onChangeText={(t) =>
                      atualizarCampo(index, "meta", Number(t))
                    }
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

            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={createOrcamento}
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
  title: {
    fontSize: 48,
    fontFamily: "Roboto",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
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
