package com.mmi.meaux.saeapi.repository;

import com.mmi.meaux.saeapi.entity.Sae;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaeRepository extends JpaRepository<Sae, Long> {
    List<Sae> findBySemestre(Integer semestre);
    List<Sae> findByAnnee(String annee);
    List<Sae> findByDomaine(String domaine);
    List<Sae> findAllByOrderByNoteDesc();
}