package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Perfil;
import br.univille.fabsoft_backend.repository.PerfilRepository;
import br.univille.fabsoft_backend.service.ClienteService;

@Service
public class ClienteServiceImpl 
    implements ClienteService{

    @Autowired
    private PerfilRepository repository;

    @Override
    public List<Perfil> getAll() {
        return repository.findAll();
    }

}