//Creazione di un nuovo wallet
import { Keypair } from "@solana/web3.js";

const keypair = Keypair.generate();
console.log(`Nuovo Wallet Generato: ${keypair.publicKey.toBase58()} \n\n Per salvare il tuo wallet, copia e incolla il seguente JSON in un file: [${keypair.secretKey}]`)
