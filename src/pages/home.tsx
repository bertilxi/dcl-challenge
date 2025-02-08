import {
  Button,
  Card,
  Center,
  CenterProps,
  Footer,
  Header,
  Navbar,
  Page,
  PageProps,
} from "decentraland-ui";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router";
import { useWalletStore } from "../store/wallet";

const AppPage = Page as unknown as FC<PropsWithChildren<PageProps>>;
const AppCenter = Center as unknown as FC<PropsWithChildren<CenterProps>>;

export function Home() {
  const walletStore = useWalletStore();

  return (
    <>
      <Navbar activePage="Wallet" />
      <AppPage className="App">
        <AppCenter>
          {!walletStore.isConnected ? (
            <>
              <Button
                primary
                onClick={walletStore.onConnect}
                loading={walletStore.isConnecting}
              >
                Connect
              </Button>
              {walletStore.error ? (
                <p className="error">{walletStore.error}</p>
              ) : null}
            </>
          ) : (
            <Card>
              <Header>Wallet</Header>
              <p>
                <strong>Address:</strong>&nbsp;
                {walletStore.address.slice(0, 6) +
                  "..." +
                  walletStore.address.slice(-4)}
              </p>
              <p>
                <strong>Balance:</strong>&nbsp;
                <span>{walletStore.balance.toString()} DUMMY </span>{" "}
                <Link to="/transfer" state={{ modal: location.toString() }}>
                  <Button basic>Transfer</Button>
                </Link>
              </p>
            </Card>
          )}
        </AppCenter>
      </AppPage>
      <Footer />
    </>
  );
}
