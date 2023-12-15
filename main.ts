class Cliente {
  private _nome: string;
  private _cpf: string;
  private _telefone: string;
  private _contas: IConta[];

  constructor(nome: string, cpf: string, telefone: string) {
    this._nome = nome;
    this._cpf = cpf;
    this._telefone = telefone;
    this._contas = [];
  }

  get nome(): string {
    return this._nome;
  }

  get cpf(): string {
    return this._cpf;
  }

  get telefone(): string {
    return this._telefone;
  }

  get contas(): IConta[] {
    return this._contas;
  }

  public adicionarConta(conta: IConta): void {
    this._contas.push(conta);
  }
}

interface IConta {
  depositar(valor: number): void;
  sacar(valor: number): void;
  transferir(valor: number, contaDestino: IConta): void;
}

abstract class Conta implements IConta {
  private _id: string;
  private _saldo: number;

  constructor(id: string) {
    this._id = id;
    this._saldo = 0;
  }

  get id(): string {
    return this._id;
  }

  get saldo(): number {
    return this._saldo;
  }

  public depositar(valor: number): void {
    if (valor > 0) {
      this._saldo = this._saldo + valor;
    }
  }

  public sacar(valor: number) {
    if (valor > 0 && valor <= this._saldo) {
      this._saldo = this._saldo - valor;
    }
  }

  public transferir(valor: number, contaDestino: IConta): void {
    this.sacar(valor);
    contaDestino.depositar(valor);
  }

  // abstract sacar(valor: number): void;

  // abstract depositar(valor: number): void;
}

class ContaCorrente extends Conta {
  public sacar(valor: number): void {
    let acrescimo = (1 / 100) * valor;
    let valorTotal = valor + acrescimo;
    super.sacar(valorTotal);
  }
}

class ContaPoupanca extends Conta {
  public depositar(valor: number): void {
    let acrescimo = (1 / 100) * valor;
    let valorTotal = valor + acrescimo;
    super.depositar(valorTotal);
  }
}

let cliente = new Cliente("Paulo Vanderley", "98796321457", "(00) 9736-4585");
let contaCorrente = new ContaCorrente("c0001");
let contaPoupanca = new ContaPoupanca("p0001");

cliente.adicionarConta(contaCorrente);
cliente.adicionarConta(contaPoupanca);

console.log(cliente);
