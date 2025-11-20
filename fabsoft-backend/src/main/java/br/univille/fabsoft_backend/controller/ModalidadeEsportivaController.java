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

import br.univille.fabsoft_backend.entity.ModalidadeEsportiva;
import br.univille.fabsoft_backend.service.ModalidadeEsportivaService;
import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/v1/modalidades")
public class ModalidadeEsportivaController {

    @Autowired
    private ModalidadeEsportivaService service;

    @GetMapping
    public ResponseEntity<List<ModalidadeEsportiva>> getModalideEsportiva(){
        
        var listaModalidades = service.getAll();

        return new ResponseEntity<List<ModalidadeEsportiva>>(listaModalidades,
            HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ModalidadeEsportiva> save(@Valid @RequestBody ModalidadeEsportiva modalidadeEsportiva, BindingResult result){
        if(modalidadeEsportiva == null){
            return ResponseEntity.badRequest().build();
        }
        if (result.hasErrors()) {
            HttpHeaders headers = new HttpHeaders();
            String errorMessages = result.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage())
                    .collect(Collectors.joining(" "));
            headers.add("Erro", errorMessages);
            return new ResponseEntity<ModalidadeEsportiva>(modalidadeEsportiva,headers,HttpStatus.BAD_REQUEST);
        }
        if (modalidadeEsportiva.getId() == 0){
            modalidadeEsportiva = service.save(modalidadeEsportiva);
            return new ResponseEntity<ModalidadeEsportiva>(modalidadeEsportiva, HttpStatus.OK);
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping ("/{id}")
    public ResponseEntity<ModalidadeEsportiva> 
        update(@RequestBody ModalidadeEsportiva modalidadeEsportiva,
            @PathVariable long id){
        
        if(id <= 0 || modalidadeEsportiva == null){
            return ResponseEntity.badRequest().build();
        }
        try {
            modalidadeEsportiva = service.update(id, modalidadeEsportiva);
        return new ResponseEntity<ModalidadeEsportiva>(modalidadeEsportiva, 
            HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping ("/{id}")
    public ResponseEntity<ModalidadeEsportiva> 
        delete(@PathVariable long id) {
                if(id <= 0){
            return ResponseEntity.badRequest().build();
        }
         try {
            var modalidadeEsportiva = service.delete(id);
            return new ResponseEntity<ModalidadeEsportiva>(modalidadeEsportiva, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModalidadeEsportiva>
            getModalidadeById(@PathVariable long id){

            var modalidadeEsportiva = service.getById(id);
            if(modalidadeEsportiva == null)
                    return ResponseEntity.noContent().build();

            return new 
                ResponseEntity(modalidadeEsportiva, HttpStatus.OK);
    }
}