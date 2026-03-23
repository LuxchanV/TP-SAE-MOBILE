package com.mmi.meaux.saeapi.controller;

import com.mmi.meaux.saeapi.entity.Ue;
import com.mmi.meaux.saeapi.repository.UeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ues")
public class UeController {

    private final UeRepository ueRepository;

    public UeController(UeRepository ueRepository) {
        this.ueRepository = ueRepository;
    }

    @GetMapping
    public List<Ue> getAllUes() {
        return ueRepository.findAll();
    }

    @PostMapping
    public Ue createUe(@RequestBody Ue ue) {
        return ueRepository.save(ue);
    }
}