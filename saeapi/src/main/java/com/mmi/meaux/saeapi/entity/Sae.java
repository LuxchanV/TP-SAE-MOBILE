package com.mmi.meaux.saeapi.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Sae {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private String titre;

    @Column(length = 2000)
    private String description;

    private String annee;
    private Integer semestre;
    private String parcours;
    private String domaine;

    @Column(length = 1000)
    private String competences;

    @Column(length = 1000)
    private String ressourcesHumaines;

    private LocalDate dateDebut;
    private LocalDate dateFin;

    private Double note;
    private Double tauxReussite;

    private String siteUrl;
    private String repoUrl;

    public Sae() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public Integer getSemestre() {
        return semestre;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }

    public String getParcours() {
        return parcours;
    }

    public void setParcours(String parcours) {
        this.parcours = parcours;
    }

    public String getDomaine() {
        return domaine;
    }

    public void setDomaine(String domaine) {
        this.domaine = domaine;
    }

    public String getCompetences() {
        return competences;
    }

    public void setCompetences(String competences) {
        this.competences = competences;
    }

    public String getRessourcesHumaines() {
        return ressourcesHumaines;
    }

    public void setRessourcesHumaines(String ressourcesHumaines) {
        this.ressourcesHumaines = ressourcesHumaines;
    }

    public LocalDate getDateDebut() {
        return dateDebut;
    }

    public void setDateDebut(LocalDate dateDebut) {
        this.dateDebut = dateDebut;
    }

    public LocalDate getDateFin() {
        return dateFin;
    }

    public void setDateFin(LocalDate dateFin) {
        this.dateFin = dateFin;
    }

    public Double getNote() {
        return note;
    }

    public void setNote(Double note) {
        this.note = note;
    }

    public Double getTauxReussite() {
        return tauxReussite;
    }

    public void setTauxReussite(Double tauxReussite) {
        this.tauxReussite = tauxReussite;
    }

    public String getSiteUrl() {
        return siteUrl;
    }

    public void setSiteUrl(String siteUrl) {
        this.siteUrl = siteUrl;
    }

    public String getRepoUrl() {
        return repoUrl;
    }

    public void setRepoUrl(String repoUrl) {
        this.repoUrl = repoUrl;
    }
}