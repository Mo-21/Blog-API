import Login from "./Sign-in";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
