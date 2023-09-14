import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Confirmation from "./components/Confirmation";
import Register from "./components/Register/Register";


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />}/>
        <Route path='confirmation' element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;