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

 
    constructor(nome: string, username: string, 
        email: string, password: string,
        cpf: string, rf: string, endereco: string, telefone: string) {
        this.nome = nome;
        this.username = username;
        this.email = email;
        this.senha = password;
        this.cpf = cpf;
        this.endereco = endereco;
        this.rf = rf;
        this.telefone = telefone;
    }
}