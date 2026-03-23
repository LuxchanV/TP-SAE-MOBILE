package com.mmi.meaux.saeapi.entity;

import jakarta.persistence.*;

@Entity
public class SaeUe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sae_id")
    private Sae sae;

    @ManyToOne
    @JoinColumn(name = "ue_id")
    private Ue ue;

    public SaeUe() {
    }

    public Long getId() {
        return id;
    }

    public Sae getSae() {
        return sae;
    }

    public void setSae(Sae sae) {
        this.sae = sae;
    }

    public Ue getUe() {
        return ue;
    }

    public void setUe(Ue ue) {
        this.ue = ue;
    }
}