package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Cliente;
import br.univille.fabsoft_backend.repository.ClienteRepository;
import br.univille.fabsoft_backend.service.ClienteService;

@Service
public class ClienteServiceImpl 
    implements ClienteService{

    @Autowired
    private ClienteRepository repository;

    @Override
    public List<Cliente> getAll() {
        return repository.findAll();
    }

}