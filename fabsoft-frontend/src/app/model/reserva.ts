import { Modal } from "bootstrap";
import { StatusReserva } from "../../status-reserva.enum";
import { Quadra } from "./quadra";
import { ModalidadeEsportiva } from "./modalidadeEsportiva";
import { Cliente } from "./cliente";

export class Reserva {
    id:number;
    dataHoraInicio:Date;
    dataHoraFim:Date;
    valorTotal:number;
    status: StatusReserva;
    quadra: Quadra | number;
    modalidadeEsportiva: ModalidadeEsportiva | number;
    cliente: Cliente | number;
}
