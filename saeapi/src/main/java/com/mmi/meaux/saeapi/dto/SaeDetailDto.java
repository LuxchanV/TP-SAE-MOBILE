package com.mmi.meaux.saeapi.dto;

import com.mmi.meaux.saeapi.entity.GroupeSae;
import com.mmi.meaux.saeapi.entity.ImageSae;
import com.mmi.meaux.saeapi.entity.Sae;
import com.mmi.meaux.saeapi.entity.Ue;

import java.util.List;

public class SaeDetailDto {
    private Sae sae;
    private List<Ue> ues;
    private List<GroupeSae> groupes;
    private List<ImageSae> images;

    public Sae getSae() {
        return sae;
    }

    public void setSae(Sae sae) {
        this.sae = sae;
    }

    public List<Ue> getUes() {
        return ues;
    }

    public void setUes(List<Ue> ues) {
        this.ues = ues;
    }

    public List<GroupeSae> getGroupes() {
        return groupes;
    }

    public void setGroupes(List<GroupeSae> groupes) {
        this.groupes = groupes;
    }

    public List<ImageSae> getImages() {
        return images;
    }

    public void setImages(List<ImageSae> images) {
        this.images = images;
    }
}