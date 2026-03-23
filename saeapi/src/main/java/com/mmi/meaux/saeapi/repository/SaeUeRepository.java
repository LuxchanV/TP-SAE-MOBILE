package com.mmi.meaux.saeapi.repository;

import com.mmi.meaux.saeapi.entity.SaeUe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaeUeRepository extends JpaRepository<SaeUe, Long> {
    List<SaeUe> findBySaeId(Long saeId);
}