import { Atividade } from './atividade.model';
export class Regencia extends Atividade {
    nivel: string;
    curso: string;
    disciplinaParticipacao: string;
    totalHorasMinistradas: number;
    totalHorasOutrasAtividades: number;
    valorBrutoHora: number;
    valorBrutoTotal: number;
    instituicao: string;
    diasTrabalhadosUnicamp: string;
    diasTrabalhadosOutraInstituicao: string;
    responsavel: boolean;
    unicoDocente: boolean;
}
