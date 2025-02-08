import { ethers, parseUnits } from "ethers";
import { create } from "zustand";
import { isErrorWithMessage } from "../utils/error";
import {
  DummyToken,
  TOKEN_ABI,
  TOKEN_ADDRESS,
  windowWithEthereum,
} from "../utils/token";

interface WalletStore {
  address: string;
  balance: bigint;
  isConnecting: boolean;
  isConnected: boolean;
  isSending: boolean;
  error: string | null;
  onConnect: () => Promise<void>;
  transfer: ({
    address,
    amount,
  }: {
    address: string;
    amount: number;
  }) => Promise<void>;
}

export const useWalletStore = create<WalletStore>((set) => ({
  address: "",
  balance: 0n,
  isConnecting: false,
  isConnected: false,
  isSending: false,
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
      return set({
        isConnecting: false,
        isConnected: false,
        error: isErrorWithMessage(error) ? error.message : "Unknown error",
      });
    }
  },
  transfer: async ({ address, amount }) => {
    set({ isSending: true });
    try {
      const provider = new ethers.BrowserProvider(windowWithEthereum.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        signer,
      ) as DummyToken;

      const data = contract.interface.encodeFunctionData("transfer", [
        address,
        amount,
      ]);

      const tx = await signer.sendTransaction({
        to: TOKEN_ADDRESS,
        from: signer.address,
        value: parseUnits("0.00", "ether"),
        data,
      });

      await tx.wait();

      useWalletStore.getState().onConnect();

      return set({
        isSending: false,
      });
    } catch (error) {
      set({
        isSending: false,
        error: isErrorWithMessage(error) ? error.message : "Unknown error",
      });
    }
  },
}));
