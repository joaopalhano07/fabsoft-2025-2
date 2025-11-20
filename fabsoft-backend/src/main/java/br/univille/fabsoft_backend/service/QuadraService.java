package br.univille.fabsoft_backend.service;
import java.util.List;

import br.univille.fabsoft_backend.entity.Quadra;

public interface QuadraService {
        List<Quadra> getAll();
    Quadra save(Quadra quadra);
    Quadra update(long id, Quadra quadra) throws Exception ;
    Quadra delete(long id) throws Exception ;
    Quadra getById(long id);
}
