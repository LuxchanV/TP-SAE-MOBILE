import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <StatusBar barStyle="light-content" />

      <LinearGradient
        colors={["#0f172a", "#1d4ed8", "#60a5fa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.badge}>MMI • Mobile • SAE</Text>
        <Text style={styles.title}>Application SAE MMI</Text>
        <Text style={styles.subtitle}>
          Gère les SAÉ, les groupes, les UE et les projets dans une interface claire.
        </Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fonctionnalités</Text>
        <Text style={styles.cardText}>• Consultation des SAÉ</Text>
        <Text style={styles.cardText}>• Ajout de SAÉ complètes</Text>
        <Text style={styles.cardText}>• Groupes auteurs</Text>
        <Text style={styles.cardText}>• UE liées</Text>
        <Text style={styles.cardText}>• Galerie images</Text>
        <Text style={styles.cardText}>• Tri par note</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("ListeSAE")}
      >
        <Text style={styles.primaryButtonText}>Voir les SAE</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("AjoutSAE")}
      >
        <Text style={styles.secondaryButtonText}>Ajouter une SAE complète</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Groupes")}
      >
        <Text style={styles.secondaryButtonText}>Gérer les groupes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Ues")}
      >
        <Text style={styles.secondaryButtonText}>Gérer les UE</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  content: {
    paddingBottom: 30,
  },
  hero: {
    margin: 16,
    borderRadius: 28,
    paddingTop: 48,
    paddingBottom: 30,
    paddingHorizontal: 22,
  },
  badge: {
    color: "#dbeafe",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  title: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    color: "#e0f2fe",
    fontSize: 15,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 18,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: "#334155",
    marginBottom: 8,
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
    backgroundColor: "#e0ecff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: "#1d4ed8",
    fontSize: 16,
    fontWeight: "800",
  },
});