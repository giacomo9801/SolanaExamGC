import { Keypair, Connection, PublicKey } from "@solana/web3.js";

import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

import wallet from "./wallet.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("Bwm9iq7dAjXQGDFd9erFHbzNWjgCXXrwg3d346NfY7m2");
const fromAta = new PublicKey("DB7U2dqyURiRgLDHjWYn5C4Z8F5UrnkLNtQv8xEDbkgy");

const to = Keypair.generate();
console.log("To: ", to.publicKey.toBase58());

(async () => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    to.publicKey
  );

  const toAta = tokenAccount.address;
  console.log("Associated Token Account: ", toAta.toBase58());

  const amountToAta = tokenAccount.amount;
  console.log("Quantità in ATA: ", amountToAta.toString());

  const amount = 10e5;

  await transfer(connection, keypair, fromAta, toAta, keypair, amount);

  console.log(
    "Trasferiti",
    amount,
    "From",
    fromAta.toBase58(),
    "To",
    toAta.toBase58()
  );
})();
