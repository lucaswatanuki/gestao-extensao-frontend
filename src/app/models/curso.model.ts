import { Atividade } from './atividade.model';
export class CursoExtensao extends Atividade {
    participacao: string;
    disciplinas: string[];
    cargaHorariaTotal: number;
    valorBrutoHoraAula: number;
    valorBrutoTotalAula: number;
    valorBrutoOutrasAtividades: number;
    periodo: number;
}