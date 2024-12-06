import { Route, Routes } from "react-router-dom";
import MessageContext from "./components/contexts/message/MessageContext.jsx";
import MessageToast from "./components/contexts/message/MessageToast";
import useMessageContext from "./components/contexts/message/useMessageContext.mjs";
import ErrorPage from "./components/errors/Error404Page";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import Game from "./components/game/Game";

/**
 * Main component of the application that manages the routing and the state of the user.
 */
const App = () => {
  const { message, setError, setInfo, setWarning, setMessage } =
    useMessageContext();

  return (
    <ErrorBoundary>
      <MessageContext.Provider
        value={{ message, setMessage, setInfo, setError, setWarning }}
      >
        <MessageToast />
        <Routes>
          <Route index element={<Game />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </MessageContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
