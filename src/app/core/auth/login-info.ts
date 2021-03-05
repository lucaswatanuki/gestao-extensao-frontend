export class AuthLoginInfo {
    matricula: string;
    password: string;
 
    constructor(matricula: string, password: string) {
        this.matricula = matricula;
        this.password = password;
    }
}