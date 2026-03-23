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

export default function GroupesScreen() {
  const [groupes, setGroupes] = useState([]);
  const [nom, setNom] = useState("");
  const [promo, setPromo] = useState("");

  const loadGroupes = async () => {
    try {
      const response = await api.get("/groupes");
      setGroupes(response.data);
    } catch (error) {
      console.log("Erreur chargement groupes :", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadGroupes();
    }, [])
  );

  const createGroupe = async () => {
    if (!nom.trim() || !promo.trim()) {
      Alert.alert("Erreur", "Remplis le nom et la promo du groupe.");
      return;
    }

    try {
      await api.post("/groupes", {
        nom,
        promo,
      });

      setNom("");
      setPromo("");
      loadGroupes();
      Alert.alert("Succès", "Groupe ajouté");
    } catch (error) {
      console.log("Erreur ajout groupe :", error.message);
      Alert.alert("Erreur", "Impossible d'ajouter le groupe");
    }
  };

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#0f172a", "#1d4ed8", "#60a5fa"]}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>Groupes</Text>
        <Text style={styles.heroSubtitle}>
          Ajoute et consulte les groupes auteurs des SAÉ.
        </Text>
      </LinearGradient>

      <View style={styles.formCard}>
        <TextInput
          placeholder="Nom du groupe"
          placeholderTextColor="#94a3b8"
          value={nom}
          onChangeText={setNom}
          style={styles.input}
        />
        <TextInput
          placeholder="Promo (ex: MMI3 2025-2026)"
          placeholderTextColor="#94a3b8"
          value={promo}
          onChangeText={setPromo}
          style={styles.input}
        />

        <TouchableOpacity style={styles.addButton} onPress={createGroupe}>
          <Text style={styles.addButtonText}>Ajouter le groupe</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={groupes}
        keyExtractor={(item, index) => `groupe-${item.id ?? index}`}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nom}</Text>
            <Text style={styles.cardText}>{item.promo}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun groupe enregistré.</Text>
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
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    marginTop: 20,
  },
});