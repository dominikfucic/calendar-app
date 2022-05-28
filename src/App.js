import React, { useState, useEffect, createContext } from "react";
import { format } from "date-fns";
import Calendar from "./components/Calendar/Calendar";
import { useNavigate, Routes, Route } from "react-router-dom";
import "./App.css";
import AppHeader from "./components/AppHeader/AppHeader";
import Modal from "./components/Modal/Modal";

export const DateContext = createContext(null);
export const ModalContext = createContext(null);

function App() {
  const [date, setDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const urlDate = format(date, "yyyy-MM");
    navigate(urlDate);
  }, [date]);

  return (
    <div className="App">
      <DateContext.Provider value={{ date, setDate }}>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
        <AppHeader />
        <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path=":date" element={<Calendar />} />
          </Routes>
        </ModalContext.Provider>
      </DateContext.Provider>
    </div>
  );
}

export default App;
