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
@RequestMapping("/carrito")
public class CarritoController {

    @Autowired
    private CarritoRepository carritoRepository;

    @GetMapping
    public List<Carrito> getAllCarritos() {
        return carritoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carrito> getCarritoById(@PathVariable Long id) {
        Optional<Carrito> carrito = carritoRepository.findById(id);
        if (carrito.isPresent()) {
            return ResponseEntity.ok(carrito.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Carrito createCarrito(@RequestBody Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carrito> updateCarrito(@PathVariable Long id, @RequestBody Carrito carritoDetails) {
        Optional<Carrito> carrito = carritoRepository.findById(id);
        if (carrito.isPresent()) {
            Carrito carritoToUpdate = carrito.get();
            carritoToUpdate.setUsuario(carritoDetails.getUsuario());
            carritoToUpdate.setProducto(carritoDetails.getProducto());
            carritoToUpdate.setCantidad(carritoDetails.getCantidad());
            return ResponseEntity.ok(carritoRepository.save(carritoToUpdate));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarrito(@PathVariable Long id) {
        Optional<Carrito> carrito = carritoRepository.findById(id);
        if (carrito.isPresent()) {
            carritoRepository.delete(carrito.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

