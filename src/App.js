import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Roles } from "./pages/Roles";
import { Dashboard } from "./containers/Dashboard";
import "./App.css";
import { useUser } from "./hooks/useUser";
import { Policies } from "./pages/Policies";
import { Policy } from "./pages/Policy";

// Rotes Login, Roles
function App() {
  const { user } = useUser();
  return (
    <mian className="app">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          {user && user.token ? (
            <Route path="/" element={<Dashboard />}>
              <Route path="/roles" element={<Roles />} />
              <Route path="/roles/:id" element={<Roles />} />
              <Route path="/policies" element={<Policies />} />
              <Route path="/policies/create" element={<Policy />} />
              <Route path="/policies/:id" element={<Policy />} />
              <Route path="" element={<Navigate to="policies" replace />} />
              <Route path="/*" element={<Navigate to="login" replace />} />
            </Route>
          ) : (
            <>
              <Route path="/" element={<Navigate to="login" replace />} />
              <Route path="/*" element={<Navigate to="login" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </mian>
  );
}

export default App;
