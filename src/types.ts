import { ethers } from "ethers";

export type WindowWithEthereum = Window & {
  ethereum: ethers.Eip1193Provider;
};
