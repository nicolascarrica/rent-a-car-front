
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Cars } from "../pages/Cars";

export function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
    </Routes>
  )
}
