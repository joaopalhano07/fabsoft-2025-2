package br.univille.fabsoft_backend.controller;

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
import br.univille.fabsoft_backend.service.QuadraService;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1/quadras")
public class QuadraController {

    @Autowired
    private QuadraService service;

    @GetMapping
    public ResponseEntity<List<Quadra>> getQuadras(){
        
        var listaQuadras = service.getAll();

        return new ResponseEntity<List<Quadra>>(listaQuadras,
            HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Quadra> save(@Valid @RequestBody Quadra quadra, BindingResult result){
        if(quadra == null){
            return ResponseEntity.badRequest().build();
        }
        if (result.hasErrors()) {
            HttpHeaders headers = new HttpHeaders();
            String errorMessages = result.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(" "));
            headers.add("Erro", errorMessages);
            return new ResponseEntity<Quadra>(quadra,headers,HttpStatus.BAD_REQUEST);
        }
        if (quadra.getId() == 0){
            quadra = service.save(quadra);
            return new ResponseEntity<Quadra>(quadra, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping ("/{id}")
    public ResponseEntity<Quadra> 
        update(@RequestBody Quadra quadra,
            @PathVariable long id){
        
        if(id <= 0 || quadra == null){
            return ResponseEntity.badRequest().build();
        }
        try {
            quadra = service.update(id, quadra);
        return new ResponseEntity<Quadra>(quadra, 
            HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<Quadra> 
        delete(@PathVariable long id) {
                if(id <= 0){
            return ResponseEntity.badRequest().build();
        }
         try {
            var quadra = service.delete(id);
            return new ResponseEntity<Quadra>(quadra, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quadra>
            getQuadraById(@PathVariable long id){

            var quadra = service.getById(id);
            if(quadra == null)
                    return ResponseEntity.noContent().build();

            return new 
                ResponseEntity(quadra, HttpStatus.OK);

    }
}