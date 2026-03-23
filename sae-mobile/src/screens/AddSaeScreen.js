import React, { useEffect, useMemo, useState } from "react";
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

const ANNEE_OPTIONS = ["MMI1", "MMI2", "MMI3"];

const PARCOURS_OPTIONS = [
  "DWeb-DI",
  "Création Numérique",
  "Stratégie UX",
];

const DOMAINE_OPTIONS = [
  "Développement",
  "Création",
  "DI",
  "3D",
  "Audiovisuel",
  "Communication",
];

const SEMESTRES_BY_ANNEE = {
  MMI1: [1, 2],
  MMI2: [3, 4],
  MMI3: [5, 6],
};

const SAE_CODES_BY_SEMESTRE = {
  1: ["SAE-101", "SAE-103", "SAE-104"],
  2: ["SAE-202", "SAE-203"],
  3: ["SAE-304", "SAE-305"],
  4: ["SAE-401", "SAE-402", "SAE-403"],
  5: ["SAE-501", "SAE-502"],
  6: ["SAE-601", "SAE-602"],
};

export default function AddSaeScreen({ navigation }) {
  const [groupes, setGroupes] = useState([]);
  const [ues, setUes] = useState([]);

  const [selectedGroupeId, setSelectedGroupeId] = useState(null);
  const [selectedUeIds, setSelectedUeIds] = useState([]);

  const [code, setCode] = useState("");
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [annee, setAnnee] = useState("");
  const [semestre, setSemestre] = useState("");
  const [parcours, setParcours] = useState("");
  const [domaine, setDomaine] = useState("");
  const [competences, setCompetences] = useState("");
  const [ressourcesHumaines, setRessourcesHumaines] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [note, setNote] = useState("");
  const [tauxReussite, setTauxReussite] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [repoUrl, setRepoUrl] = useState("");

  const [imageUrl1, setImageUrl1] = useState("");
  const [imageAlt1, setImageAlt1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageAlt2, setImageAlt2] = useState("");

  useEffect(() => {
    loadGroupes();
    loadUes();
  }, []);

  const loadGroupes = async () => {
    try {
      const response = await api.get("/groupes");
      setGroupes(response.data);
    } catch (error) {
      console.log("Erreur chargement groupes :", error.message);
    }
  };

  const loadUes = async () => {
    try {
      const response = await api.get("/ues");
      setUes(response.data);
    } catch (error) {
      console.log("Erreur chargement UE :", error.message);
    }
  };

  const semestreOptions = useMemo(() => {
    return annee ? SEMESTRES_BY_ANNEE[annee] || [] : [];
  }, [annee]);

  const saeCodeOptions = useMemo(() => {
    return semestre ? SAE_CODES_BY_SEMESTRE[Number(semestre)] || [] : [];
  }, [semestre]);

  const filteredUes = useMemo(() => {
    let result = [...ues];

    if (semestre) {
      result = result.filter((ue) => ue.semestre === Number(semestre));
    }

    if (parcours) {
      result = result.filter((ue) => !ue.parcours || ue.parcours === parcours);
    }

    return result;
  }, [ues, semestre, parcours]);

  const toggleUe = (id) => {
    setSelectedUeIds((prev) =>
      prev.includes(id) ? prev.filter((ueId) => ueId !== id) : [...prev, id]
    );
  };

  const handleSelectAnnee = (value) => {
    setAnnee(value);
    setSemestre("");
    setCode("");
    setSelectedUeIds([]);
  };

  const handleSelectSemestre = (value) => {
    setSemestre(String(value));
    setCode("");
    setSelectedUeIds([]);
  };

  const resetForm = () => {
    setCode("");
    setTitre("");
    setDescription("");
    setAnnee("");
    setSemestre("");
    setParcours("");
    setDomaine("");
    setCompetences("");
    setRessourcesHumaines("");
    setDateDebut("");
    setDateFin("");
    setNote("");
    setTauxReussite("");
    setSiteUrl("");
    setRepoUrl("");
    setSelectedGroupeId(null);
    setSelectedUeIds([]);
    setImageUrl1("");
    setImageAlt1("");
    setImageUrl2("");
    setImageAlt2("");
  };

  const saveSae = async () => {
    if (!code.trim() || !titre.trim()) {
      Alert.alert("Erreur", "Le code SAE et le titre sont obligatoires.");
      return;
    }

    if (!annee || !semestre) {
      Alert.alert("Erreur", "Choisis l'année et le semestre.");
      return;
    }

    if (!selectedGroupeId) {
      Alert.alert("Erreur", "Choisis un groupe auteur.");
      return;
    }

    try {
      const saeResponse = await api.post("/saes", {
        code,
        titre,
        description,
        annee,
        semestre: Number(semestre),
        parcours,
        domaine,
        competences,
        ressourcesHumaines,
        dateDebut: dateDebut || null,
        dateFin: dateFin || null,
        note: Number(note) || 0,
        tauxReussite: Number(tauxReussite) || 0,
        siteUrl,
        repoUrl,
      });

      const saeId = saeResponse.data.id;

      await api.post(
        `/groupe-saes?groupeId=${selectedGroupeId}&saeId=${saeId}&noteMin=0&noteMax=20&noteObtenue=${Number(note) || 0}`
      );

      for (const ueId of selectedUeIds) {
        await api.post(`/sae-ues?saeId=${saeId}&ueId=${ueId}`);
      }

      if (imageUrl1.trim()) {
        await api.post(`/images?saeId=${saeId}`, {
          imageUrl: imageUrl1,
          altText: imageAlt1 || "Illustration SAE",
        });
      }

      if (imageUrl2.trim()) {
        await api.post(`/images?saeId=${saeId}`, {
          imageUrl: imageUrl2,
          altText: imageAlt2 || "Illustration SAE",
        });
      }

      Alert.alert("Succès", "SAE complète ajoutée");
      resetForm();
      navigation.navigate("ListeSAE");
    } catch (error) {
      console.log("Erreur ajout SAE complète :", error?.response?.data || error.message);
      Alert.alert("Erreur", "Impossible d'ajouter la SAE complète");
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
        <Text style={styles.heroTitle}>Nouvelle SAE complète</Text>
        <Text style={styles.heroSubtitle}>
          Choisis les infos principales, le groupe, les UE et les images.
        </Text>
      </LinearGradient>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Informations principales</Text>

        <Text style={styles.label}>Année</Text>
        <View style={styles.choiceWrap}>
          {ANNEE_OPTIONS.map((item) => {
            const selected = annee === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.choiceChip, selected && styles.choiceChipSelected]}
                onPress={() => handleSelectAnnee(item)}
              >
                <Text
                  style={[
                    styles.choiceChipText,
                    selected && styles.choiceChipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Semestre</Text>
        <View style={styles.choiceWrap}>
          {semestreOptions.map((item) => {
            const selected = Number(semestre) === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.choiceChip, selected && styles.choiceChipSelected]}
                onPress={() => handleSelectSemestre(item)}
              >
                <Text
                  style={[
                    styles.choiceChipText,
                    selected && styles.choiceChipTextSelected,
                  ]}
                >
                  S{item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Code SAE</Text>
        <View style={styles.choiceWrap}>
          {saeCodeOptions.map((item) => {
            const selected = code === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.choiceChip, selected && styles.choiceChipSelected]}
                onPress={() => setCode(item)}
              >
                <Text
                  style={[
                    styles.choiceChipText,
                    selected && styles.choiceChipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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

        <Text style={styles.label}>Parcours</Text>
        <View style={styles.choiceWrap}>
          {PARCOURS_OPTIONS.map((item) => {
            const selected = parcours === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.choiceChip, selected && styles.choiceChipSelected]}
                onPress={() => setParcours(item)}
              >
                <Text
                  style={[
                    styles.choiceChipText,
                    selected && styles.choiceChipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Domaine</Text>
        <View style={styles.choiceWrap}>
          {DOMAINE_OPTIONS.map((item) => {
            const selected = domaine === item;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.choiceChip, selected && styles.choiceChipSelected]}
                onPress={() => setDomaine(item)}
              >
                <Text
                  style={[
                    styles.choiceChipText,
                    selected && styles.choiceChipTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Contenu pédagogique</Text>

        <TextInput
          placeholder="Compétences"
          placeholderTextColor="#94a3b8"
          value={competences}
          onChangeText={setCompetences}
          style={[styles.input, styles.textarea]}
          multiline
        />

        <TextInput
          placeholder="Ressources humaines"
          placeholderTextColor="#94a3b8"
          value={ressourcesHumaines}
          onChangeText={setRessourcesHumaines}
          style={styles.input}
        />

        <TextInput
          placeholder="Date début (YYYY-MM-DD)"
          placeholderTextColor="#94a3b8"
          value={dateDebut}
          onChangeText={setDateDebut}
          style={styles.input}
        />

        <TextInput
          placeholder="Date fin (YYYY-MM-DD)"
          placeholderTextColor="#94a3b8"
          value={dateFin}
          onChangeText={setDateFin}
          style={styles.input}
        />

        <TextInput
          placeholder="Note obtenue"
          placeholderTextColor="#94a3b8"
          value={note}
          onChangeText={setNote}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Taux de réussite"
          placeholderTextColor="#94a3b8"
          value={tauxReussite}
          onChangeText={setTauxReussite}
          style={styles.input}
          keyboardType="numeric"
        />

        <TextInput
          placeholder="Lien site"
          placeholderTextColor="#94a3b8"
          value={siteUrl}
          onChangeText={setSiteUrl}
          style={styles.input}
        />

        <TextInput
          placeholder="Lien code / repo"
          placeholderTextColor="#94a3b8"
          value={repoUrl}
          onChangeText={setRepoUrl}
          style={styles.input}
        />

        <Text style={styles.sectionTitle}>Choisir un groupe auteur</Text>
        <View style={styles.choiceWrap}>
          {groupes.map((groupe) => {
            const selected = selectedGroupeId === groupe.id;
            return (
              <TouchableOpacity
                key={groupe.id}
                style={[styles.choiceChip, selected && styles.choiceChipSelected]}
                onPress={() => setSelectedGroupeId(groupe.id)}
              >
                <Text
                  style={[
                    styles.choiceChipText,
                    selected && styles.choiceChipTextSelected,
                  ]}
                >
                  {groupe.nom}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Choisir une ou plusieurs UE</Text>
        <View style={styles.choiceWrap}>
          {filteredUes.map((ue) => {
            const selected = selectedUeIds.includes(ue.id);
            return (
              <TouchableOpacity
                key={ue.id}
                style={[styles.choiceChip, selected && styles.choiceChipSelected]}
                onPress={() => toggleUe(ue.id)}
              >
                <Text
                  style={[
                    styles.choiceChipText,
                    selected && styles.choiceChipTextSelected,
                  ]}
                >
                  {ue.code}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Images du projet</Text>

        <TextInput
          placeholder="URL image 1"
          placeholderTextColor="#94a3b8"
          value={imageUrl1}
          onChangeText={setImageUrl1}
          style={styles.input}
        />
        <TextInput
          placeholder="Texte alternatif image 1"
          placeholderTextColor="#94a3b8"
          value={imageAlt1}
          onChangeText={setImageAlt1}
          style={styles.input}
        />
        <TextInput
          placeholder="URL image 2"
          placeholderTextColor="#94a3b8"
          value={imageUrl2}
          onChangeText={setImageUrl2}
          style={styles.input}
        />
        <TextInput
          placeholder="Texte alternatif image 2"
          placeholderTextColor="#94a3b8"
          value={imageAlt2}
          onChangeText={setImageAlt2}
          style={styles.input}
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveSae}>
          <Text style={styles.saveButtonText}>Créer la SAE complète</Text>
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
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 12,
    marginTop: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1d4ed8",
    marginBottom: 8,
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
  choiceWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  choiceChip: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },
  choiceChipSelected: {
    backgroundColor: "#2563eb",
  },
  choiceChipText: {
    color: "#1d4ed8",
    fontWeight: "700",
  },
  choiceChipTextSelected: {
    color: "#ffffff",
  },
  saveButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 16,
  },
});