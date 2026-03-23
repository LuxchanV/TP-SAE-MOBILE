package com.mmi.meaux.saeapi.controller;

import com.mmi.meaux.saeapi.entity.Sae;
import com.mmi.meaux.saeapi.entity.SaeUe;
import com.mmi.meaux.saeapi.entity.Ue;
import com.mmi.meaux.saeapi.repository.SaeRepository;
import com.mmi.meaux.saeapi.repository.SaeUeRepository;
import com.mmi.meaux.saeapi.repository.UeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sae-ues")
public class SaeUeController {

    private final SaeUeRepository saeUeRepository;
    private final SaeRepository saeRepository;
    private final UeRepository ueRepository;

    public SaeUeController(SaeUeRepository saeUeRepository,
                           SaeRepository saeRepository,
                           UeRepository ueRepository) {
        this.saeUeRepository = saeUeRepository;
        this.saeRepository = saeRepository;
        this.ueRepository = ueRepository;
    }

    @GetMapping
    public List<SaeUe> getAllSaeUes() {
        return saeUeRepository.findAll();
    }

    @GetMapping("/sae/{saeId}")
    public List<SaeUe> getBySaeId(@PathVariable Long saeId) {
        return saeUeRepository.findBySaeId(saeId);
    }

    @PostMapping
    public SaeUe createSaeUe(@RequestParam Long saeId, @RequestParam Long ueId) {
        Sae sae = saeRepository.findById(saeId).orElseThrow();
        Ue ue = ueRepository.findById(ueId).orElseThrow();

        SaeUe saeUe = new SaeUe();
        saeUe.setSae(sae);
        saeUe.setUe(ue);

        return saeUeRepository.save(saeUe);
    }
}