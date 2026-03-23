package com.mmi.meaux.saeapi.controller;

import com.mmi.meaux.saeapi.dto.SaeDetailDto;
import com.mmi.meaux.saeapi.entity.Sae;
import com.mmi.meaux.saeapi.entity.SaeUe;
import com.mmi.meaux.saeapi.entity.Ue;
import com.mmi.meaux.saeapi.repository.GroupeSaeRepository;
import com.mmi.meaux.saeapi.repository.ImageSaeRepository;
import com.mmi.meaux.saeapi.repository.SaeRepository;
import com.mmi.meaux.saeapi.repository.SaeUeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saes")
public class SaeController {

    private final SaeRepository saeRepository;
    private final SaeUeRepository saeUeRepository;
    private final GroupeSaeRepository groupeSaeRepository;
    private final ImageSaeRepository imageSaeRepository;

    public SaeController(SaeRepository saeRepository,
                         SaeUeRepository saeUeRepository,
                         GroupeSaeRepository groupeSaeRepository,
                         ImageSaeRepository imageSaeRepository) {
        this.saeRepository = saeRepository;
        this.saeUeRepository = saeUeRepository;
        this.groupeSaeRepository = groupeSaeRepository;
        this.imageSaeRepository = imageSaeRepository;
    }

    @GetMapping
    public List<Sae> getSaes(
            @RequestParam(required = false) Integer semestre,
            @RequestParam(required = false) String annee,
            @RequestParam(required = false) String domaine,
            @RequestParam(required = false) String sort
    ) {
        if (semestre != null) {
            return saeRepository.findBySemestre(semestre);
        }

        if (annee != null) {
            return saeRepository.findByAnnee(annee);
        }

        if (domaine != null) {
            return saeRepository.findByDomaine(domaine);
        }

        if ("note".equalsIgnoreCase(sort)) {
            return saeRepository.findAllByOrderByNoteDesc();
        }

        return saeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Sae getSaeById(@PathVariable Long id) {
        return findSaeOrThrow(id);
    }

    @GetMapping("/{id}/details")
    public SaeDetailDto getSaeDetails(@PathVariable Long id) {
        Sae sae = findSaeOrThrow(id);

        List<Ue> ues = saeUeRepository.findBySaeId(id)
                .stream()
                .map(SaeUe::getUe)
                .toList();

        SaeDetailDto dto = new SaeDetailDto();
        dto.setSae(sae);
        dto.setUes(ues);
        dto.setGroupes(groupeSaeRepository.findBySaeId(id));
        dto.setImages(imageSaeRepository.findBySaeId(id));

        return dto;
    }

    @PostMapping
    public Sae createSae(@RequestBody Sae sae) {
        return saeRepository.save(sae);
    }

    @PutMapping("/{id}")
    public Sae updateSae(@PathVariable Long id, @RequestBody Sae updatedSae) {
        Sae sae = findSaeOrThrow(id);

        sae.setCode(updatedSae.getCode());
        sae.setTitre(updatedSae.getTitre());
        sae.setDescription(updatedSae.getDescription());
        sae.setAnnee(updatedSae.getAnnee());
        sae.setSemestre(updatedSae.getSemestre());
        sae.setParcours(updatedSae.getParcours());
        sae.setDomaine(updatedSae.getDomaine());
        sae.setCompetences(updatedSae.getCompetences());
        sae.setRessourcesHumaines(updatedSae.getRessourcesHumaines());
        sae.setDateDebut(updatedSae.getDateDebut());
        sae.setDateFin(updatedSae.getDateFin());
        sae.setNote(updatedSae.getNote());
        sae.setTauxReussite(updatedSae.getTauxReussite());
        sae.setSiteUrl(updatedSae.getSiteUrl());
        sae.setRepoUrl(updatedSae.getRepoUrl());

        return saeRepository.save(sae);
    }

    @DeleteMapping("/{id}")
    public void deleteSae(@PathVariable Long id) {
        saeRepository.deleteById(id);
    }

    private Sae findSaeOrThrow(Long id) {
        return saeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("SAE introuvable avec l'id : " + id));
    }
}