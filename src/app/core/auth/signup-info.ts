export class SignUpInfo {
    nome: string;
    username: string;
    email: string;
    profiles: string[];
    senha: string;
    cpf: string;
    rf: string;
    endereco: string;
    telefone: string;

    // tslint:disable-next-line: max-line-length
    constructor(nome: string, username: string, email: string, password: string, cpf: string, rf: string, endereco: string, telefone: string) {
        this.nome = nome;
        this.username = username;
        this.email = email;
        this.senha = password;
        this.cpf = cpf;
        this.rf = rf;
        this.endereco = endereco;
        this.telefone = telefone;
    }
}