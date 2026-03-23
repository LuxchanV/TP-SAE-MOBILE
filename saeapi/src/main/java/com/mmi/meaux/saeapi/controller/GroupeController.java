package com.mmi.meaux.saeapi.controller;

import com.mmi.meaux.saeapi.entity.Groupe;
import com.mmi.meaux.saeapi.repository.GroupeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groupes")
public class GroupeController {

    private final GroupeRepository groupeRepository;

    public GroupeController(GroupeRepository groupeRepository) {
        this.groupeRepository = groupeRepository;
    }

    @GetMapping
    public List<Groupe> getAllGroupes() {
        return groupeRepository.findAll();
    }

    @PostMapping
    public Groupe createGroupe(@RequestBody Groupe groupe) {
        return groupeRepository.save(groupe);
    }
}