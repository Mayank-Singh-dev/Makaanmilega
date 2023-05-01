import React from "react";
import { CreateContainer, Header, MainContainer } from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-screen flex flex-col">
        <Header />
        <main className="mt-16 md:mt-24 p-8 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<ProtectedRoute><CreateContainer /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
