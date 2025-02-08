import { Contract } from "ethers/contract";
import { WindowWithEthereum } from "../types";

export const windowWithEthereum = window as unknown as WindowWithEthereum;

export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS;
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`);
}

export const TOKEN_ABI = [
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
];

export type DummyToken = Contract & {
  symbol: () => Promise<string>;
  balanceOf: (address: string) => Promise<bigint>;
  transfer: (to: string, amount: number) => Promise<void>;
};
