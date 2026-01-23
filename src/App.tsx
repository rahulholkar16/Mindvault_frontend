import { Route, Routes } from "react-router";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div> Hello World </div>} />
      <Route path="/login" element={<div> Hello Login </div>} />
    </Routes>
  )
}

export default App;
