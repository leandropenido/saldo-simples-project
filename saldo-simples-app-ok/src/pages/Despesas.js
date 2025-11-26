import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button, ProgressBar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Container from "../components/Container";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import { getUser } from "../global/User";

const Despesas = ({ navigation }) => {
  const { userId, userToken, isLogged } = getUser();
  const [despesas, setDespesas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLogged) {
      showDespesa();
    } 
    else navigation.navigate('BlankPage')
  }, [isLogged, navigation]);

  if (!isLogged) {
    return null;
  }
  const getOrcamentoData = async () => {
    return await fetch(`http://192.168.100.100:5107/api/Orcamento/user/${userId}`, {
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

  async function showDespesa() {
    const resultado = await getOrcamentoData();
    if (!resultado.success) {
      Alert.alert("Erro", "Não foi possivel carregar os dados!");
      return;
    }

    const cores = ["#E53935","#FB8C00","#410287","#74FF73",]
    const nomes = ["Contas", "Comida", "Entretenimento", "Transporte"];
    const listas = []
    let i = 0
    
    for (let dado of resultado.data) {
      listas.push(
        {
          nome: nomes[i],
          atual: dado.saldo ?? 0,
          total: dado.meta ?? 0,
          cor: cores[i],
        }
      )
      i++;
      if (i >= 4) {
        break;
      }

    }
    setDespesas(listas);
    setLoading(false);
  }

  const totalGasto = despesas.reduce((acc, item) => acc + item.atual, 0);
  const totalDisponivel = despesas.reduce((acc, item) => acc + item.total, 0);
  const saldoRestante = totalDisponivel - totalGasto;

  const formatarMoeda = (valor) =>
    "R$" + valor.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={{ paddingBottom: 5 }}>
        <Body>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 1,
            }}
          >
            <Text style={styles.title}> Gráfico de Despesas </Text>
            <Text style={styles.subtitle}>
              {" "}
              {formatarMoeda(totalGasto)} / {formatarMoeda(totalDisponivel)}
            </Text>

            {/* Container dos gráficos */}
            <View style={styles.chartContainer}>
              {despesas.map((item, index) => {
                const progresso = item.total > 0 ? item.atual / item.total : 0;
                return (
                  <View key={index} style={styles.expenseBlock}>
                    <Text style={styles.chartText}>{item.nome}</Text>
                    <ProgressBar
                      progress={progresso}
                      color={item.cor}
                      style={styles.progressBar}
                    />
                    <Text style={styles.valueText}>
                      {formatarMoeda(item.atual)} / {formatarMoeda(item.total)}
                    </Text>
                  </View>
                );
              })}

              <View style={styles.saldoRow}>
                <Text style={styles.subtitle}>
                  Saldo Restante: {formatarMoeda(saldoRestante)}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={styles.gerenciarText}
                    onPress={() => navigation.navigate("Orcamento")}
                  >
                    Gerenciar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Button
              mode="contained"
              style={{
                backgroundColor: "#48BF91",
                marginTop: 10,
              }}
              onPress={() => navigation.navigate("CadastroDespesa")}
            >
              + Adicionar Despesa
            </Button>
          </View>
        </Body>
      </ScrollView>
      <Footer />
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: "center",
    paddingTop: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 5,
    fontSize: 16,
  },
  chartContainer: {
    marginTop: 30,
    width: "85%",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 20,
    elevation: 3, // sombra no Android
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  expenseBlock: {
    marginBottom: 25,
  },
  chartText: {
    textAlign: "center",
    color: "#555",
  },
  progressBar: {
    height: 20,
    borderRadius: 5,
  },
  valueText: {
    textAlign: "center",
    marginTop: 5,
    color: "#333",
  },
  saldoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  gerenciarText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default Despesas;
