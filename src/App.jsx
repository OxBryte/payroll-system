import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./route";
import { WalletConnection } from "./Provider";
import "@solana/wallet-adapter-react-ui/styles.css";

function App() {
  return (
    <WalletConnection>
      <RouterProvider router={router} />
    </WalletConnection>
  );
}

export default App;
