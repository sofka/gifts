import "normalize.css";
import Home from "./routes/Home";
import { Routes, Route } from "react-router-dom";
import WishList from "./routes/WishList";
import { changingInput } from "./listeners";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    changingInput();
  });

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishList/:id" element={<WishList />} />
        <Route path="/wishList" element={<WishList />} />
      </Routes>
    </div>
  );
}

export default App;
