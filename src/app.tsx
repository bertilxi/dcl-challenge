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

const AppPage = Page as unknown as FC<PropsWithChildren<PageProps>>;
const AppCenter = Center as unknown as FC<PropsWithChildren<CenterProps>>;

const isConnected = false;
const isConnecting = false;
const address = "0x0000000000000000000000000000000000000000";
const balance = 0;
const error = null;

function onConnect() {
  console.log("onConnect");
}

export function App() {
  return (
    <>
      <Navbar activePage="Wallet" />
      <AppPage className="App">
        <AppCenter>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : (
            <Card>
              <Header>Wallet</Header>
              <p>
                <strong>Address:</strong>&nbsp;
                {address.slice(0, 6) + "..." + address.slice(-4)}
              </p>
              <p>
                <strong>Balance:</strong>&nbsp;
                <span>{balance.toString()} DUMMY </span>{" "}
                <Link to="/transfer" state={{ modal: location }}>
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
