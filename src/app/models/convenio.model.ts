import { Atividade } from './atividade.model';

export class Convenio extends Atividade{
    instituicao: String;
    descricao: string;
    parcelas: number;
    dataRecebimento: string;
}