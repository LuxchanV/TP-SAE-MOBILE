package com.mmi.meaux.saeapi.entity;

import jakarta.persistence.*;

@Entity
public class ImageSae {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sae_id")
    private Sae sae;

    private String imageUrl;
    private String altText;

    public ImageSae() {
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getAltText() {
        return altText;
    }

    public void setAltText(String altText) {
        this.altText = altText;
    }
}