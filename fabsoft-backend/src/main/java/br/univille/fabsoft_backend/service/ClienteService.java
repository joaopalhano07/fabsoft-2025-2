package br.univille.fabsoft_backend.service;

import java.util.List;

import br.univille.fabsoft_backend.entity.Cliente;

public interface ClienteService {
    List<Cliente> getAll();
    Cliente save(Cliente cliente);
    Cliente update(long id, Cliente cliente) throws Exception ;
    Cliente delete(long id) throws Exception ;
}
