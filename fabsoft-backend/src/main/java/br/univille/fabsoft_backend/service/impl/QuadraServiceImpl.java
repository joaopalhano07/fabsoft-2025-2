package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Quadra;
import br.univille.fabsoft_backend.repository.QuadraRepository;
import br.univille.fabsoft_backend.service.QuadraService;

@Service
public class QuadraServiceImpl 
    implements QuadraService{

    @Autowired
    private QuadraRepository repository;

    @Override
    public List<Quadra> getAll() {
        return repository.findAll();
    }

    @Override
    public Quadra save(Quadra quadra) {
        return repository.save(quadra);
    }

    @Override
    public Quadra update(long id, Quadra quadra) 
        throws Exception {
        
        var quadraAntiga = repository.getById(id);
        if(quadraAntiga == null){
            throw new Exception("Reserva Inexistente");
    }

        quadraAntiga.setNome(quadra.getNome());
        repository.save(quadraAntiga);
        return quadraAntiga;

    }

    @Override
    public Quadra delete(long id) throws Exception {
        var clienteAntigo = repository.getById(id);
        if(clienteAntigo == null){
            throw new Exception("Cliente Inexistente");
    }
        repository.delete(clienteAntigo);
        return clienteAntigo;
    }
}