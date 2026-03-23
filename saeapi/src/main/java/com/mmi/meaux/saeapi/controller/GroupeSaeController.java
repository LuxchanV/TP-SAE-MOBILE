package com.mmi.meaux.saeapi.controller;

import com.mmi.meaux.saeapi.entity.Groupe;
import com.mmi.meaux.saeapi.entity.GroupeSae;
import com.mmi.meaux.saeapi.entity.Sae;
import com.mmi.meaux.saeapi.repository.GroupeRepository;
import com.mmi.meaux.saeapi.repository.GroupeSaeRepository;
import com.mmi.meaux.saeapi.repository.SaeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groupe-saes")
public class GroupeSaeController {

    private final GroupeSaeRepository groupeSaeRepository;
    private final GroupeRepository groupeRepository;
    private final SaeRepository saeRepository;

    public GroupeSaeController(GroupeSaeRepository groupeSaeRepository,
                               GroupeRepository groupeRepository,
                               SaeRepository saeRepository) {
        this.groupeSaeRepository = groupeSaeRepository;
        this.groupeRepository = groupeRepository;
        this.saeRepository = saeRepository;
    }

    @GetMapping
    public List<GroupeSae> getAll() {
        return groupeSaeRepository.findAll();
    }

    @GetMapping("/sae/{saeId}")
    public List<GroupeSae> getBySaeId(@PathVariable Long saeId) {
        return groupeSaeRepository.findBySaeId(saeId);
    }

    @PostMapping
    public GroupeSae create(
            @RequestParam Long groupeId,
            @RequestParam Long saeId,
            @RequestParam Double noteMin,
            @RequestParam Double noteMax,
            @RequestParam Double noteObtenue
    ) {
        Groupe groupe = groupeRepository.findById(groupeId).orElseThrow();
        Sae sae = saeRepository.findById(saeId).orElseThrow();

        GroupeSae groupeSae = new GroupeSae();
        groupeSae.setGroupe(groupe);
        groupeSae.setSae(sae);
        groupeSae.setNoteMin(noteMin);
        groupeSae.setNoteMax(noteMax);
        groupeSae.setNoteObtenue(noteObtenue);

        return groupeSaeRepository.save(groupeSae);
    }
}