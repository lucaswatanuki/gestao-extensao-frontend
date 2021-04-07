import { Atividade } from './atividade.model';

export class Convenio extends Atividade{
    instituicao: string;
    descricao: string;
    tipoAtividadeSimultanea: string;
}