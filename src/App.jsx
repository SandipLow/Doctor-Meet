import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./pages/join"
import Meet from "./pages/meet"

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Join />} />
          <Route path="meet" element={<Meet />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
