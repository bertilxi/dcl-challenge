import { create } from "zustand";
import { WindowWithEthereum } from "../types";
import { ethers } from "ethers";
import { isErrorWithMessage } from "../utils/error";

const windowWithEthereum = window as unknown as WindowWithEthereum;

export const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS;
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable VITE_TOKEN_ADDRESS`);
}

export const TOKEN_ABI = [
  "function symbol() view returns (string)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount)",
];

type DummyToken = ethers.Contract & {
  symbol: () => Promise<string>;
  balanceOf: (address: string) => Promise<bigint>;
  transfer: (to: string, amount: number) => Promise<void>;
};

interface WalletStore {
  address: string;
  balance: bigint;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  onConnect: () => void;
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: "",
  balance: 0n,
  isConnecting: false,
  isConnected: false,
  error: null,
  onConnect: async () => {
    set({ isConnecting: true });

    try {
      const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        signer,
      ) as DummyToken;
      const balance = await contract.balanceOf(address);

      return set({
        isConnecting: false,
        isConnected: true,
        address,
        balance,
      });
    } catch (error) {
      set({
        isConnecting: false,
        isConnected: false,
        error: isErrorWithMessage(error) ? error.message : "Unknown error",
      });
    }
  },
}));
