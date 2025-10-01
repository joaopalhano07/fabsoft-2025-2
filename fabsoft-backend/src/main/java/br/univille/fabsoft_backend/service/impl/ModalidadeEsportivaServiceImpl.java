package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.ModalidadeEsportiva;
import br.univille.fabsoft_backend.repository.ModalidadeEsportivaRepository;
import br.univille.fabsoft_backend.service.ModalidadeEsportivaService;

@Service
public class ModalidadeEsportivaServiceImpl 
    implements ModalidadeEsportivaService{

    @Autowired
    private ModalidadeEsportivaRepository repository;

    @Override
    public List<ModalidadeEsportiva> getAll() {
        return repository.findAll();
    }

    @Override
    public ModalidadeEsportiva save(ModalidadeEsportiva modalidadeEsportiva) {
        return repository.save(modalidadeEsportiva);
    }

    @Override
    public ModalidadeEsportiva update(long id, ModalidadeEsportiva modalidadeEsportiva) 
        throws Exception {
        
        var modalidadeEsportivaAntiga = repository.getById(id);
        if(modalidadeEsportivaAntiga == null){
            throw new Exception("modalidade Esportiva Inexistente");
    }

        modalidadeEsportivaAntiga.setNome(modalidadeEsportiva.getNome());
        repository.save(modalidadeEsportivaAntiga);
        return modalidadeEsportivaAntiga;

    }

    @Override
    public ModalidadeEsportiva delete(long id) throws Exception {
        var modalidadeEsportivaAntigo = repository.getById(id);
        if(modalidadeEsportivaAntigo == null){
            throw new Exception("modalidade Esportiva Inexistente");
    }
        repository.delete(modalidadeEsportivaAntigo);
        return modalidadeEsportivaAntigo;
    }
}