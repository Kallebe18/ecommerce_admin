import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./hooks/useAuth";
import { AppRoutes } from "./routes";
import theme from "./theme";
import "./global.css";
import { ResponseInterceptor } from "./components/ResponseInterceptor";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <AppRoutes />
        <Toaster />
        <ResponseInterceptor />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
