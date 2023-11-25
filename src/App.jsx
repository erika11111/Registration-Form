import Login from "./Login/Login";
import Register from "./Register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="login/" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
