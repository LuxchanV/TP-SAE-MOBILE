package com.mmi.meaux.saeapi.entity;

import jakarta.persistence.*;

@Entity
public class GroupeSae {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "groupe_id")
    private Groupe groupe;

    @ManyToOne
    @JoinColumn(name = "sae_id")
    private Sae sae;

    private Double noteMin;
    private Double noteMax;
    private Double noteObtenue;

    public GroupeSae() {
    }

    public Long getId() {
        return id;
    }

    public Groupe getGroupe() {
        return groupe;
    }

    public void setGroupe(Groupe groupe) {
        this.groupe = groupe;
    }

    public Sae getSae() {
        return sae;
    }

    public void setSae(Sae sae) {
        this.sae = sae;
    }

    public Double getNoteMin() {
        return noteMin;
    }

    public void setNoteMin(Double noteMin) {
        this.noteMin = noteMin;
    }

    public Double getNoteMax() {
        return noteMax;
    }

    public void setNoteMax(Double noteMax) {
        this.noteMax = noteMax;
    }

    public Double getNoteObtenue() {
        return noteObtenue;
    }

    public void setNoteObtenue(Double noteObtenue) {
        this.noteObtenue = noteObtenue;
    }
}