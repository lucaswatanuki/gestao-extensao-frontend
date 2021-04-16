import { Atividade } from './atividade.model';
export class Regencia extends Atividade {
    nivel: string;
    curso: string;
    disciplinaParticipacao: string;
    cargaHoraTotalMinistrada: number;
    cargaHorariaTotalDedicada: number;
    valorBrutoHoraAula: number;
    valorBrutoTotalAula: number;
    valorBrutoOutraAtividade: number;
    instituicao: string;
    diasTrabalhadosUnicamp: string;
    diasTrabalhadosOutraInstituicao: string;
    responsavel: boolean;
    unicoDocente: boolean;
}
