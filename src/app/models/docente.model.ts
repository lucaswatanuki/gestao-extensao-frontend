import { Usuario } from "./usuario.model";

export class Docente extends Usuario{
    autorizado: boolean;
    totalHoras: number;
}