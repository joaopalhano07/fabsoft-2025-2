package br.univille.fabsoft_backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.univille.fabsoft_backend.entity.Reserva;
import br.univille.fabsoft_backend.repository.ReservaRepository;
import br.univille.fabsoft_backend.service.ReservaService;

@Service
public class ReservaServiceImpl 
    implements ReservaService{

    @Autowired
    private ReservaRepository repository;

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