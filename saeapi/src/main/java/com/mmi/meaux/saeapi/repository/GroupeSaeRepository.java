package com.mmi.meaux.saeapi.repository;

import com.mmi.meaux.saeapi.entity.GroupeSae;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupeSaeRepository extends JpaRepository<GroupeSae, Long> {
    List<GroupeSae> findBySaeId(Long saeId);
    List<GroupeSae> findByGroupeId(Long groupeId);
}