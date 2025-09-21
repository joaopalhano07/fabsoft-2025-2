package br.univille.fabsoft_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.univille.fabsoft_backend.entity.ModalidadeEsportiva;

@Repository
public interface ModalidadeEsportivaRepository
    extends JpaRepository<ModalidadeEsportiva, Long> {
}
