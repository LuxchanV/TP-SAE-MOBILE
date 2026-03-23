import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../services/api";

export default function SaeDetailScreen({ route }) {
  const { id } = route.params;
  const [details, setDetails] = useState(null);

  const loadDetails = async () => {
    try {
      const response = await api.get(`/saes/${id}/details`);
      setDetails(response.data);
    } catch (error) {
      console.log("Erreur détail SAE :", error.message);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const openLink = async (url) => {
    if (!url) return;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log("Erreur ouverture lien :", error.message);
    }
  };

  if (!details) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  const { sae, ues, groupes, images } = details;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <LinearGradient
        colors={["#0f172a", "#1d4ed8", "#60a5fa"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}
      >
        <View style={styles.topRow}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeBadgeText}>{sae.code}</Text>
          </View>
          <View style={styles.noteBadge}>
            <Text style={styles.noteBadgeText}>★ {sae.note ?? 0}</Text>
          </View>
        </View>

        <Text style={styles.heroTitle}>{sae.titre}</Text>
        <Text style={styles.heroSubtitle}>{sae.description}</Text>
      </LinearGradient>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Informations générales</Text>

        <View style={styles.rowWrap}>
          <View style={styles.infoChip}>
            <Text style={styles.infoChipLabel}>Année</Text>
            <Text style={styles.infoChipValue}>{sae.annee || "-"}</Text>
          </View>

          <View style={styles.infoChip}>
            <Text style={styles.infoChipLabel}>Semestre</Text>
            <Text style={styles.infoChipValue}>{sae.semestre || "-"}</Text>
          </View>

          <View style={styles.infoChip}>
            <Text style={styles.infoChipLabel}>Parcours</Text>
            <Text style={styles.infoChipValue}>{sae.parcours || "-"}</Text>
          </View>

          <View style={styles.infoChip}>
            <Text style={styles.infoChipLabel}>Domaine</Text>
            <Text style={styles.infoChipValue}>{sae.domaine || "-"}</Text>
          </View>
        </View>

        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Taux de réussite</Text>
          <Text style={styles.metaValue}>{sae.tauxReussite ?? 0}%</Text>
        </View>

        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Compétences</Text>
          <Text style={styles.metaText}>{sae.competences || "-"}</Text>
        </View>

        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Ressources humaines</Text>
          <Text style={styles.metaText}>{sae.ressourcesHumaines || "-"}</Text>
        </View>

        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Date début</Text>
          <Text style={styles.metaText}>{sae.dateDebut || "-"}</Text>
        </View>

        <View style={styles.metaBox}>
          <Text style={styles.metaLabel}>Date fin</Text>
          <Text style={styles.metaText}>{sae.dateFin || "-"}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Liens utiles</Text>

        <TouchableOpacity
          style={[styles.linkButton, !sae.siteUrl && styles.linkButtonDisabled]}
          disabled={!sae.siteUrl}
          onPress={() => openLink(sae.siteUrl)}
        >
          <Text style={styles.linkButtonText}>
            {sae.siteUrl ? "Ouvrir le site de la SAE" : "Aucun site disponible"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.linkButtonAlt, !sae.repoUrl && styles.linkButtonDisabled]}
          disabled={!sae.repoUrl}
          onPress={() => openLink(sae.repoUrl)}
        >
          <Text style={styles.linkButtonAltText}>
            {sae.repoUrl ? "Ouvrir la production / le code" : "Aucun repo disponible"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>UE liées</Text>
        {ues && ues.length > 0 ? (
          ues.map((ue, index) => (
            <View key={`ue-${ue.id ?? index}-${ue.code ?? ""}`} style={styles.listCard}>
              <Text style={styles.listCardTitle}>{ue.code}</Text>
              <Text style={styles.listCardText}>{ue.libelle}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Aucune UE liée</Text>
        )}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Groupes liés</Text>
        {groupes && groupes.length > 0 ? (
          groupes.map((g, index) => (
            <View
              key={`groupe-${g.id ?? index}-${g.groupe?.id ?? ""}`}
              style={styles.listCard}
            >
              <Text style={styles.listCardTitle}>{g.groupe?.nom || "Groupe"}</Text>
              <Text style={styles.listCardText}>Note obtenue : {g.noteObtenue ?? "-"}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Aucun groupe lié</Text>
        )}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Galerie</Text>
        {images && images.length > 0 ? (
          images.map((img, index) => (
            <View
              key={`image-${img.id ?? index}-${img.imageUrl ?? ""}`}
              style={styles.imageBlock}
            >
              <Text style={styles.imageTitle}>{img.altText || "Illustration SAE"}</Text>
              <Image source={{ uri: img.imageUrl }} style={styles.image} />
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Aucune image</Text>
        )}
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
  loadingContainer: {
    flex: 1,
    backgroundColor: "#f8fbff",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
  hero: {
    margin: 16,
    borderRadius: 26,
    padding: 18,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  codeBadge: {
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  codeBadgeText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 12,
  },
  noteBadge: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  noteBadgeText: {
    color: "#1d4ed8",
    fontWeight: "800",
    fontSize: 12,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  heroSubtitle: {
    color: "#e0f2fe",
    fontSize: 14,
    lineHeight: 21,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 22,
    padding: 16,
    shadowColor: "#0f172a",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 14,
  },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  infoChip: {
    backgroundColor: "#eff6ff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    minWidth: "47%",
  },
  infoChipLabel: {
    fontSize: 12,
    color: "#1d4ed8",
    fontWeight: "700",
    marginBottom: 4,
  },
  infoChipValue: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "800",
  },
  metaBox: {
    marginBottom: 12,
    backgroundColor: "#f8fbff",
    borderRadius: 16,
    padding: 14,
  },
  metaLabel: {
    fontSize: 13,
    color: "#1d4ed8",
    fontWeight: "800",
    marginBottom: 6,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  metaText: {
    color: "#334155",
    lineHeight: 20,
  },
  linkButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  linkButtonText: {
    color: "#ffffff",
    fontWeight: "800",
  },
  linkButtonAlt: {
    backgroundColor: "#dbeafe",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  linkButtonAltText: {
    color: "#1d4ed8",
    fontWeight: "800",
  },
  linkButtonDisabled: {
    opacity: 0.5,
  },
  listCard: {
    backgroundColor: "#f8fbff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },
  listCardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },
  listCardText: {
    color: "#475569",
  },
  emptyText: {
    color: "#64748b",
  },
  imageBlock: {
    marginBottom: 14,
  },
  imageTitle: {
    color: "#0f172a",
    fontWeight: "700",
    marginBottom: 8,
  },
  image: {
    width: "100%",
    height: 210,
    borderRadius: 18,
  },
});