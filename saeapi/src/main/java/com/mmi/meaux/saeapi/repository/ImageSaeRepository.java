package com.mmi.meaux.saeapi.repository;

import com.mmi.meaux.saeapi.entity.ImageSae;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageSaeRepository extends JpaRepository<ImageSae, Long> {
    List<ImageSae> findBySaeId(Long saeId);
}