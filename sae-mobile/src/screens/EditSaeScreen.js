import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../services/api";

export default function EditSaeScreen({ route, navigation }) {
  const { id } = route.params;

  const [code, setCode] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [annee, setAnnee] = useState("");
  const [semestre, setSemestre] = useState("");
  const [parcours, setParcours] = useState("");
  const [domaine, setDomaine] = useState("");

  useEffect(() => {
    loadSae();
  }, []);

  const loadSae = async () => {
    try {
      const response = await api.get(`/saes/${id}`);
      const sae = response.data;

      setCode(sae.code || "");
      setTitre(sae.titre || "");
      setDescription(sae.description || "");
      setAnnee(sae.annee || "");
      setSemestre(String(sae.semestre || ""));
      setParcours(sae.parcours || "");
      setDomaine(sae.domaine || "");
    } catch (error) {
      console.log("Erreur chargement SAE :", error.message);
    }
  };

  const updateSae = async () => {
    try {
      await api.put(`/saes/${id}`, {
        code,
        titre,
        description,
        annee,
        semestre: Number(semestre),
        parcours,
        domaine,
        competences: "",
        ressourcesHumaines: "",
        dateDebut: "2026-03-01",
        dateFin: "2026-03-20",
        note: 0,
        tauxReussite: 0,
        siteUrl: "",
        repoUrl: "",
      });

      Alert.alert("Succès", "SAE modifiée");
      navigation.goBack();
    } catch (error) {
      console.log("Erreur modification SAE :", error.message);
      Alert.alert("Erreur", "Impossible de modifier la SAE");
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <LinearGradient
        colors={["#0f172a", "#1d4ed8", "#60a5fa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroTitle}>Modifier la SAE</Text>
        <Text style={styles.heroSubtitle}>
          Mets à jour les informations principales du projet.
        </Text>
      </LinearGradient>

      <View style={styles.formCard}>
        <TextInput
          placeholder="Code"
          placeholderTextColor="#94a3b8"
          value={code}
          onChangeText={setCode}
          style={styles.input}
        />
        <TextInput
          placeholder="Titre"
          placeholderTextColor="#94a3b8"
          value={titre}
          onChangeText={setTitre}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="#94a3b8"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textarea]}
          multiline
        />
        <TextInput
          placeholder="Année"
          placeholderTextColor="#94a3b8"
          value={annee}
          onChangeText={setAnnee}
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
        <TextInput
          placeholder="Domaine"
          placeholderTextColor="#94a3b8"
          value={domaine}
          onChangeText={setDomaine}
          style={styles.input}
        />

        <TouchableOpacity style={styles.saveButton} onPress={updateSae}>
          <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
        </TouchableOpacity>
      </View>
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
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
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
  textarea: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 4,
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
});