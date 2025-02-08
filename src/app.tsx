import { Route, Routes, useLocation } from "react-router";
import { Home } from "./pages/home";
import { Transfer } from "./pages/transfer";

export function App() {
  const location = useLocation();
  const modal = location.state?.modal;

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
    </>
  );
}
