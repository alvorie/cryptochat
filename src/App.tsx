import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CryptoList from "./components/CryptoList";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import Chat from "./components/Chat";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  const [count, setCount] = useState(0);
  const queryClient = new QueryClient();

  return (
    <div className="main-container">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <div>
            <CryptoList />
          </div>
          <Chat></Chat>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
