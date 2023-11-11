// import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateEmp from "./pages/CreateEmp.jsx";
import DeleteEmp from "./pages/DeleteEmp.jsx";
import ShowEmp from "./pages/ShowEmp.jsx";
import ShowHierarchy from "./pages/ShowHierarchy.jsx";
import UpdateEmp from "./pages/UpdateEmp.jsx";
import UpdateSupEmp from "./pages/UpdateSupEmp.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/emp/create" element={<CreateEmp />} />
      <Route path="/emp/find/:id" element={<ShowEmp />} />
      <Route path="/emp/viewchain" element={<ShowHierarchy />} />
      <Route path="/emp/update/:id" element={<UpdateEmp />} />
      <Route path="/emp/super/:id" element={<UpdateSupEmp />} />
      <Route path="/emp/delete/:id" element={<DeleteEmp />} />
    </Routes>
  );
};

export default App;
