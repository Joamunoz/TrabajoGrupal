const JSHashes = require('jshashes'); // Importar la librería JSHashes para generar hashes
const { v4: uuidv4 } = require('uuid'); // Importar la función uuidv4 de la librería uuid para generar identificadores UUID

class Transaction {
  constructor(token, from, to) {
    this.token = token; // Token a transferir
    this.from = from; // Dirección del remitente
    this.to = to; // Dirección del destinatario
    this.id = 'Tx-' + uuidv4(); // Generar un identificador único para la transacción
    this.hash = ''; // Hash de la transacción (se calculará posteriormente)
  }

  calculateHash() {
    const md5 = new JSHashes.MD5(); // Instanciar el algoritmo de hash MD5
    return md5.hex(this.id + this.token + this.from + this.to); // Calcular el hash de la transacción
  }

  computeHash() {
    this.hash = this.calculateHash(); // Calcular y asignar el hash de la transacción
  }
}

class Block {
  constructor(transactions, previousHash) {
    this.transactions = transactions; // Transacciones incluidas en el bloque
    this.previousHash = previousHash; // Hash del bloque anterior
    this.timestamp = new Date().getTime(); // Marca de tiempo actual
    this.hash = ''; // Hash del bloque (se calculará posteriormente)
  }

  calculateHash() {
    const sha256 = new JSHashes.SHA256(); // Instanciar el algoritmo de hash SHA256
    return sha256.hex(this.previousHash + this.timestamp + JSON.stringify(this.transactions)); // Calcular el hash del bloque
  }

  computeHash() {
    this.hash = this.calculateHash(); // Calcular y asignar el hash del bloque
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]; // Inicializar la cadena de bloques con el bloque génesis
  }

  createGenesisBlock() {
    return new Block([], ''); // Crear el bloque génesis con una lista vacía de transacciones y un hash vacío
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]; // Obtener el último bloque de la cadena
  }

  addBlock(newBlock) {
    newBlock.computeHash(); // Calcular el hash del nuevo bloque
    this.chain.push(newBlock); // Agregar el nuevo bloque a la cadena
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]; // Bloque actual
      const previousBlock = this.chain[i - 1]; // Bloque anterior

      if (currentBlock.hash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.hash) {
        return false; // Si el hash actual no coincide con el calculado o el hash del bloque anterior es incorrecto, la cadena no es válida
      }
    }

    return true; // La cadena es válida
  }
}

const blockchain = new Blockchain(); // Crear una instancia de la cadena de bloques

const token = 'TKN-6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'; // Token de ejemplo
const transaction = new Transaction(token, 'A-from', 'A-to'); // Crear una nueva transacción
transaction.computeHash(); // Calcular el hash de la transacción

console.log(transaction); // Imprimir la transacción
console.log(blockchain); // Imprimir la cadena de bloques

// FIN
