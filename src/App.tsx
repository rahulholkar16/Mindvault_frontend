import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import Navbar from "./components/Navbar";

const App = () => {
  return (
      <>
          <Navbar />
          <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<div> Hello Login </div>} />
          </Routes>
      </>
  );
}

export default App;
