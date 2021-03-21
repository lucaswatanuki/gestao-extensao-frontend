import { Atividade } from './atividade.model';
export class CursoExtensao extends Atividade {
    participacao: string;
    disciplinas: string[];
    cargaHorariaTotal: number;
    valorBrutoHoraAula: number;
    valorBrutoTotalAula: number;
    valorBrutoOutrasAtividade: number;
    periodo: number;
    nomeCurso: string;
}
