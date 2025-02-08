import { Provider } from "ethers";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Home } from "./pages/home";
import { Transfer } from "./pages/transfer";
import { useWalletStore } from "./store/wallet";
import { windowWithEthereum } from "./utils/token";

export function App() {
  const location = useLocation();
  const walletStore = useWalletStore();
  const modal = location.state?.modal;

  useEffect(() => {
    if (!walletStore.isConnected) {
      return;
    }

    const provider = windowWithEthereum.ethereum as unknown as Provider;

    function reconnect() {
      walletStore.onConnect();
    }

    provider.on("accountsChanged", reconnect);

    return () => {
      provider.off("accountsChanged", reconnect);
    };
  }, [walletStore]);

  return (
    <>
      <Routes location={modal ?? location}>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="transfer" element={<Transfer />} />
        </Route>
      </Routes>

      {modal && (
        <Routes>
          <Route path="transfer" element={<Transfer />} />
        </Routes>
      )}

      <Toaster richColors />
    </>
  );
}
