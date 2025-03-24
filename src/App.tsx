import "./App.css";
import CryptoList from "./components/CryptoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chat from "./components/Chat";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
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
