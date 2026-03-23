package com.mmi.meaux.saeapi.controller;

import com.mmi.meaux.saeapi.entity.ImageSae;
import com.mmi.meaux.saeapi.entity.Sae;
import com.mmi.meaux.saeapi.repository.ImageSaeRepository;
import com.mmi.meaux.saeapi.repository.SaeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageSaeController {

    private final ImageSaeRepository imageSaeRepository;
    private final SaeRepository saeRepository;

    public ImageSaeController(ImageSaeRepository imageSaeRepository, SaeRepository saeRepository) {
        this.imageSaeRepository = imageSaeRepository;
        this.saeRepository = saeRepository;
    }

    @GetMapping
    public List<ImageSae> getAllImages() {
        return imageSaeRepository.findAll();
    }

    @GetMapping("/sae/{saeId}")
    public List<ImageSae> getImagesBySaeId(@PathVariable Long saeId) {
        return imageSaeRepository.findBySaeId(saeId);
    }

    @PostMapping
    public ImageSae createImage(@RequestParam Long saeId, @RequestBody ImageSae imageSae) {
        Sae sae = saeRepository.findById(saeId).orElseThrow();
        imageSae.setSae(sae);
        return imageSaeRepository.save(imageSae);
    }
}