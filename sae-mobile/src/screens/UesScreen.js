import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../services/api";

export default function UesScreen() {
  const [ues, setUes] = useState([]);
  const [code, setCode] = useState("");
  const [libelle, setLibelle] = useState("");
  const [semestre, setSemestre] = useState("");
  const [parcours, setParcours] = useState("");

  const loadUes = async () => {
    try {
      const response = await api.get("/ues");
      setUes(response.data);
    } catch (error) {
      console.log("Erreur chargement UE :", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadUes();
    }, [])
  );

  const createUe = async () => {
    if (!code.trim() || !libelle.trim()) {
      Alert.alert("Erreur", "Remplis au moins le code et le libellé.");
      return;
    }

    try {
      await api.post("/ues", {
        code,
        libelle,
        semestre: Number(semestre) || 0,
        parcours,
      });

      setCode("");
      setLibelle("");
      setSemestre("");
      setParcours("");
      loadUes();
      Alert.alert("Succès", "UE ajoutée");
    } catch (error) {
      console.log("Erreur ajout UE :", error.message);
      Alert.alert("Erreur", "Impossible d'ajouter l'UE");
    }
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#0f172a", "#1d4ed8", "#60a5fa"]}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>UE</Text>
        <Text style={styles.heroSubtitle}>
          Ajoute et consulte les UE liées aux SAÉ.
        </Text>
      </LinearGradient>

      <View style={styles.formCard}>
        <TextInput
          placeholder="Code UE"
          placeholderTextColor="#94a3b8"
          value={code}
          onChangeText={setCode}
          style={styles.input}
        />
        <TextInput
          placeholder="Libellé"
          placeholderTextColor="#94a3b8"
          value={libelle}
          onChangeText={setLibelle}
          style={styles.input}
        />
        <TextInput
          placeholder="Semestre"
          placeholderTextColor="#94a3b8"
          value={semestre}
          onChangeText={setSemestre}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Parcours"
          placeholderTextColor="#94a3b8"
          value={parcours}
          onChangeText={setParcours}
          style={styles.input}
        />

        <TouchableOpacity style={styles.addButton} onPress={createUe}>
          <Text style={styles.addButtonText}>Ajouter l'UE</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={ues}
        keyExtractor={(item, index) => `ue-${item.id ?? index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.code}</Text>
            <Text style={styles.cardText}>{item.libelle}</Text>
            <Text style={styles.cardMeta}>
              Semestre {item.semestre} • {item.parcours}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucune UE enregistrée.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  hero: {
    margin: 16,
    borderRadius: 24,
    padding: 18,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "#dbeafe",
    lineHeight: 20,
  },
  formCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
  },
  input: {
    backgroundColor: "#f8fbff",
    borderWidth: 1,
    borderColor: "#dbeafe",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    color: "#0f172a",
  },
  addButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 6,
  },
  cardText: {
    color: "#475569",
    marginBottom: 6,
  },
  cardMeta: {
    color: "#1d4ed8",
    fontWeight: "700",
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 20,
  },
});