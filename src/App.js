import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/create" element={<PrivateRoute />}>
          <Route exact path="" element={<Create />} />
        </Route>
        <Route path="/edit/:id" element={<PrivateRoute />}>
          <Route exact path="" element={<Edit />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
