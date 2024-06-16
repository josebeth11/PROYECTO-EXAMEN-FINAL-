/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

/**
 *
 * @author joseb
 */


package com.mycompany.finalproyecto.repository;

import com.mycompany.finalproyecto.model.Chocolate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChocolateRepository extends JpaRepository<Chocolate, Long> {}


