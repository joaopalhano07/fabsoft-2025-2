package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Cliente;
import br.univille.fabsoft_backend.entity.ModalidadeEsportiva;
import br.univille.fabsoft_backend.entity.Quadra;
import br.univille.fabsoft_backend.entity.Reserva;
import br.univille.fabsoft_backend.repository.ClienteRepository;
import br.univille.fabsoft_backend.repository.ModalidadeEsportivaRepository;
import br.univille.fabsoft_backend.repository.QuadraRepository;
import br.univille.fabsoft_backend.repository.ReservaRepository;
import br.univille.fabsoft_backend.service.ReservaService;

@Service
public class ReservaServiceImpl 
    implements ReservaService{

    @Autowired
    private ReservaRepository repository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private QuadraRepository quadraRepository;

    @Autowired
    private ModalidadeEsportivaRepository modalidadeEsportivaRepository;

    @Override
    public List<Reserva> getAll() {
        return repository.findAll();
    }

    @Override
    public Reserva save(Reserva reserva) {
        return repository.save(reserva);
    }

    @Override
    public Reserva update(long id, Reserva reserva) 
        throws Exception {
        
        var reservaAntiga = repository.getById(id);
        if(reservaAntiga == null){
            throw new Exception("Reserva Inexistente");
    }

        reservaAntiga.setDataHoraInicio(reserva.getDataHoraInicio());
        reservaAntiga.setDataHoraFim(reserva.getDataHoraFim());
        reservaAntiga.setValorTotal(reserva.getValorTotal());
        reservaAntiga.setStatus(reserva.getStatus());
            if (reserva.getQuadra() != null && reserva.getQuadra().getId() != 0) {
        Quadra quadra = quadraRepository.findById(reserva.getQuadra().getId())
            .orElseThrow(() -> new Exception("A Quadra com o ID informado não existe: " + reserva.getQuadra().getId()));
        reservaAntiga.setQuadra(quadra);
    }
    if (reserva.getCliente() != null && reserva.getCliente().getId() != 0) {
        Cliente cliente = clienteRepository.findById(reserva.getCliente().getId())
            .orElseThrow(() -> new Exception("O Cliente com o ID informado não existe: " + reserva.getCliente().getId()));
        reservaAntiga.setCliente(cliente);
    }
    if (reserva.getModalidadeEsportiva() != null && reserva.getModalidadeEsportiva().getId() != 0) {
        ModalidadeEsportiva modalidade = modalidadeEsportivaRepository.findById(reserva.getModalidadeEsportiva().getId())
            .orElseThrow(() -> new Exception("A Modalidade Esportiva com o ID informado não existe: " + reserva.getModalidadeEsportiva().getId()));
        reservaAntiga.setModalidadeEsportiva(modalidade);
    }
        repository.save(reservaAntiga);
        return reservaAntiga;

    }

    @Override
    public Reserva delete(long id) throws Exception {
        var reservaAntiga = repository.getById(id);
        if(reservaAntiga == null){
            throw new Exception("Reserva Inexistente");
    }
        repository.delete(reservaAntiga);
        return reservaAntiga;
    }
}