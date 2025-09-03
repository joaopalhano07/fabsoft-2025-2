package br.univille.fabsoft_backend.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataHoraInicio;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dataHoraFim;
    private Double valorTotal;
    private StatusReserva Status;
    @ManyToOne
    private ModalidadeEsportiva modalidadeEsportiva;

    public ModalidadeEsportiva getModalidadeEsportiva() {
        return modalidadeEsportiva;
    }
    public void setModalidadeEsportiva(ModalidadeEsportiva modalidadeEsportiva) {
        this.modalidadeEsportiva = modalidadeEsportiva;
    }
    public StatusReserva getStatus() {
        return Status;
    }
    public void setStatus(StatusReserva status) {
        Status = status;
    }
    public enum StatusReserva{
        Confirmada,
        Pendente,
        Cancelada
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public Date getDataHoraInicio() {
        return dataHoraInicio;
    }
    public void setDataHoraInicio(Date dataHoraInicio) {
        this.dataHoraInicio = dataHoraInicio;
    }
    public Date getDataHoraFim() {
        return dataHoraFim;
    }
    public void setDataHoraFim(Date dataHoraFim) {
        this.dataHoraFim = dataHoraFim;
    }
    public Double getValorTotal() {
        return valorTotal;
    }
    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }
}
