import { Atividade } from './atividade.model';
export class CursoExtensao extends Atividade {
    participacao: string;
    disciplinas: string[];
    valorBrutoHora: number;
    valorBrutoTotal: number;
    totalHorasOutrasAtividades: number;
    totalHorasMinistradas: number;
    periodo: number;
    nomeCurso: string;
    instituicaoVinculada: string;
}
