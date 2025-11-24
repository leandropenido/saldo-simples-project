import React , {useEffect }from "react";
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
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

  useEffect(() => {
    if (!isLogged) {
      navigation.replace("BlankPage");
    }
  }, [isLogged, navigation]);

  if (!isLogged) {
    return null;
  }

  const despesas = [
    { nome: "Contas", atual: 1100, total: 1100, cor: "#E53935" },
    { nome: "Comida", atual: 190, total: 400, cor: "#FB8C00" },
    { nome: "Entretenimento", atual: 210, total: 300, cor: "#410287" },
    { nome: "Transporte", atual: 150, total: 400, cor: "#74FF73" },
  ];

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
