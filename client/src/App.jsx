import { AuthProvider } from "./contexts/AuthContext";
import Auth from "./pages/Auth";
function App() {
  return (
    <AuthProvider>
      <Auth />
    </AuthProvider>
  );
}

export default App;
