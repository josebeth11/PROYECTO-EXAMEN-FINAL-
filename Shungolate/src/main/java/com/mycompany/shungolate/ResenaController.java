/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.shungolate;

/**
 *
 * @author joseb
 */



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/resenas")
public class ResenaController {

    @Autowired
    private ResenaRepository resenaRepository;

    @GetMapping
    public List<Resena> getAllResenas() {
        return resenaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resena> getResenaById(@PathVariable Long id) {
        Optional<Resena> resena = resenaRepository.findById(id);
        if (resena.isPresent()) {
            return ResponseEntity.ok(resena.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Resena createResena(@RequestBody Resena resena) {
        return resenaRepository.save(resena);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resena> updateResena(@PathVariable Long id, @RequestBody Resena resenaDetails) {
        Optional<Resena> resena = resenaRepository.findById(id);
        if (resena.isPresent()) {
            Resena resenaToUpdate = resena.get();
            resenaToUpdate.setUsuario(resenaDetails.getUsuario());
            resenaToUpdate.setProducto(resenaDetails.getProducto());
            resenaToUpdate.setRating(resenaDetails.getRating());
            resenaToUpdate.setComentario(resenaDetails.getComentario());
            return ResponseEntity.ok(resenaRepository.save(resenaToUpdate));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteResena(@PathVariable Long id) {
        Optional<Resena> resena = resenaRepository.findById(id);
        if (resena.isPresent()) {
            resenaRepository.delete(resena.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

