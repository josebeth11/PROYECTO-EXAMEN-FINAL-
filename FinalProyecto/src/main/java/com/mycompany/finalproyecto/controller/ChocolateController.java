/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */


/**
 *
 * @author joseb
 */


package com.mycompany.finalproyecto.controller;

import com.mycompany.finalproyecto.model.Chocolate;
import com.mycompany.finalproyecto.repository.ChocolateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chocolates")
public class ChocolateController {

    @Autowired
    private ChocolateRepository chocolateRepository;

    @GetMapping
    public List<Chocolate> getAllChocolates() {
        return chocolateRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chocolate> getChocolateById(@PathVariable Long id) {
        return chocolateRepository.findById(id)
                .map(chocolate -> new ResponseEntity<>(chocolate, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public Chocolate createChocolate(@RequestBody Chocolate chocolate) {
        return chocolateRepository.save(chocolate);
    }
}
