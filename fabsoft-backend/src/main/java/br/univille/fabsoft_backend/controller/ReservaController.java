package br.univille.fabsoft_backend.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.univille.fabsoft_backend.entity.Quadra;
import br.univille.fabsoft_backend.entity.Reserva;
import br.univille.fabsoft_backend.entity.Reserva.StatusReserva;
import br.univille.fabsoft_backend.service.ReservaService;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1/reservas")
public class ReservaController {

    @Autowired
    private ReservaService service;

    @GetMapping
    public ResponseEntity<List<Reserva>> getReservas(){
        
        var listaReservas = service.getAll();

        return new ResponseEntity<List<Reserva>>(listaReservas,
            HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Reserva> save(@Valid @RequestBody Reserva reserva, BindingResult result){
        if(reserva == null){
            return ResponseEntity.badRequest().build();
        }
        if (result.hasErrors()) {
            HttpHeaders headers = new HttpHeaders();
            String errorMessages = result.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(" "));
            headers.add("Erro", errorMessages);
            return new ResponseEntity<Reserva>(reserva,headers,HttpStatus.BAD_REQUEST);
        }
        if (reserva.getId() == 0){
            reserva = service.save(reserva);
            return new ResponseEntity<Reserva>(reserva, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping ("/{id}")
    public ResponseEntity<Reserva> 
        update(@RequestBody Reserva reserva,
            @PathVariable long id){
        
        if(id <= 0 || reserva == null){
            return ResponseEntity.badRequest().build();
        }
        try {
            reserva = service.update(id, reserva);
        return new ResponseEntity<Reserva>(reserva, 
            HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Reserva> 
        delete(@PathVariable long id) {
                if(id <= 0){
            return ResponseEntity.badRequest().build();
        }
         try {
            var reserva = service.delete(id);
            return new ResponseEntity<Reserva>(reserva, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva>
            getReservaById(@PathVariable long id){

            var reserva = service.getById(id);
            if(reserva == null)
                    return ResponseEntity.noContent().build();

            return new 
                ResponseEntity(reserva, HttpStatus.OK);
    }
}