import { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState("Barcelona");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(23);

  const handleHourChange = (type, value) => {
    if (type === "start") setStartHour(Number(value));
    if (type === "end") setEndHour(Number(value));
  };

  return (
    <DashboardContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        selectedDate,
        setSelectedDate,
        startHour,
        endHour,
        handleHourChange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
