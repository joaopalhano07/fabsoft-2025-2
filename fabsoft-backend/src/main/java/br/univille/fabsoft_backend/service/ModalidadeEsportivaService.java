package br.univille.fabsoft_backend.service;
import java.util.List;

import br.univille.fabsoft_backend.entity.ModalidadeEsportiva;

public interface ModalidadeEsportivaService {
        List<ModalidadeEsportiva> getAll();
    ModalidadeEsportiva save(ModalidadeEsportiva modalidadeEsportiva);
    ModalidadeEsportiva update(long id, ModalidadeEsportiva modalidadeEsportiva) throws Exception ;
    ModalidadeEsportiva delete(long id) throws Exception ;
}
