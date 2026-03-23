import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import api from "../services/api";

export default function SaeListScreen({ navigation }) {
  const [saes, setSaes] = useState([]);
  const [semestre, setSemestre] = useState("");
  const [annee, setAnnee] = useState("");
  const [domaine, setDomaine] = useState("");

  const loadSaes = async (url = "/saes") => {
    try {
      const response = await api.get(url);
      setSaes(response.data);
    } catch (error) {
      console.log("Erreur chargement SAE :", error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSaes();
    }, [])
  );

  const applyFilters = () => {
    if (semestre) {
      loadSaes(`/saes?semestre=${semestre}`);
      return;
    }
    if (annee) {
      loadSaes(`/saes?annee=${annee}`);
      return;
    }
    if (domaine) {
      loadSaes(`/saes?domaine=${domaine}`);
      return;
    }
    loadSaes();
  };

  const resetFilters = () => {
    setSemestre("");
    setAnnee("");
    setDomaine("");
    loadSaes();
  };

  const sortByNote = () => {
    loadSaes("/saes?sort=note");
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={() => navigation.navigate("DetailSAE", { id: item.id })}
    >
      <View style={styles.cardTop}>
        <View style={styles.codeBadge}>
          <Text style={styles.codeBadgeText}>{item.code}</Text>
        </View>
        <View style={styles.noteBadge}>
          <Text style={styles.noteBadgeText}>★ {item.note ?? 0}</Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>{item.titre}</Text>
      <Text style={styles.cardSubtitle}>
        {item.annee} • Semestre {item.semestre}
      </Text>

      <View style={styles.domainChip}>
        <Text style={styles.domainChipText}>{item.domaine}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <LinearGradient
        colors={["#0f172a", "#1d4ed8", "#3b82f6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Catalogue des SAE</Text>
        <Text style={styles.headerSubtitle}>
          Recherche, filtre et classe les projets MMI.
        </Text>
      </LinearGradient>

      <View style={styles.panel}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          <TextInput
            placeholder="Semestre"
            placeholderTextColor="#94a3b8"
            value={semestre}
            onChangeText={setSemestre}
            style={styles.inputSmall}
          />
          <TextInput
            placeholder="Année"
            placeholderTextColor="#94a3b8"
            value={annee}
            onChangeText={setAnnee}
            style={styles.inputSmall}
          />
          <TextInput
            placeholder="Domaine"
            placeholderTextColor="#94a3b8"
            value={domaine}
            onChangeText={setDomaine}
            style={styles.inputMedium}
          />
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionsRow}
        >
          <TouchableOpacity style={styles.primaryAction} onPress={applyFilters}>
            <Text style={styles.primaryActionText}>Filtrer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryAction} onPress={sortByNote}>
            <Text style={styles.secondaryActionText}>Classer par note</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.lightAction} onPress={resetFilters}>
            <Text style={styles.lightActionText}>Réinitialiser</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <FlatList
        contentContainerStyle={styles.listContent}
        data={saes}
        keyExtractor={(item, index) => `sae-${item.id ?? index}-${item.code ?? ""}`}
        renderItem={renderCard}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Aucune SAE trouvée</Text>
            <Text style={styles.emptyText}>
              Essaie un autre filtre ou ajoute une nouvelle SAE.
            </Text>
          </View>
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
  header: {
    paddingTop: 22,
    paddingBottom: 22,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 6,
  },
  headerSubtitle: {
    color: "#dbeafe",
    fontSize: 14,
  },
  panel: {
    marginTop: -8,
    marginHorizontal: 16,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  filtersRow: {
    gap: 10,
    paddingRight: 6,
  },
  inputSmall: {
    width: 110,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#dbeafe",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#0f172a",
  },
  inputMedium: {
    width: 150,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#dbeafe",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#0f172a",
  },
  actionsRow: {
    gap: 10,
    marginTop: 14,
    paddingRight: 6,
  },
  primaryAction: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  primaryActionText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  secondaryAction: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  secondaryActionText: {
    color: "#1d4ed8",
    fontWeight: "800",
  },
  lightAction: {
    backgroundColor: "#eef4ff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  lightActionText: {
    color: "#334155",
    fontWeight: "700",
  },
  listContent: {
    padding: 16,
    paddingTop: 18,
    paddingBottom: 28,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    alignItems: "center",
  },
  codeBadge: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  codeBadgeText: {
    color: "#1d4ed8",
    fontWeight: "800",
    fontSize: 12,
  },
  noteBadge: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  noteBadgeText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8,
  },
  cardSubtitle: {
    color: "#64748b",
    marginBottom: 12,
  },
  domainChip: {
    alignSelf: "flex-start",
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  domainChipText: {
    color: "#0369a1",
    fontWeight: "700",
  },
  emptyBox: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 8,
  },
  emptyText: {
    color: "#64748b",
    textAlign: "center",
  },
});