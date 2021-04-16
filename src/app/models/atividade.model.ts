export class Atividade {
    id: number;
    projeto: string;
    coordenador: string;
    horaSemanal: number;
    horaMensal: number;
    prazo: number;
    valorBruto: number;
    dataCriacao: Date;
    dataInicio: Date;
    dataFim: Date;
    docente: string;
    horasAprovadas: number;
    horasSolicitadas: number;
    observacao: string;
    autorizado: boolean;
    tipoAtividade: string;
    revisao: string;
}