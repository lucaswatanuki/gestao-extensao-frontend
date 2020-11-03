export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    profiles: string[];
    password: string;
    cpf: string;
    rf: string;
    endereco: string;

 
    constructor(name: string, username: string, 
        email: string, password: string,
        cpf: string, rf: string, endereco: string) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.endereco = endereco;
        this.rf = rf;
    }
}