import { useContext } from "react";
import CitySelector from "./CitySelector";
import HourRangeSelector from "./HourRangeSelector";
import { DashboardContext } from "../context/DashboardContext";
import { exportToCSV } from "../utils/exportToCSV";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Sidebar = ({ labels, temps, precip, wind, clouds }) => {
  const {
    selectedCity,
    setSelectedCity,
    selectedDate,
    setSelectedDate,
    startHour,
    endHour,
    handleHourChange,
  } = useContext(DashboardContext);

  const applyRange = (array) => array.slice(startHour, endHour + 1);

  const handleExportCSV = () => {
    const range = startHour + "-" + endHour;
    const headers = [
      "Hora",
      "Temperatura (°C)",
      "Precipitación (mm)",
      "Viento (km/h)",
      "Nubes (%)",
    ];
    const rows = applyRange(labels).map((label, i) => [
      label,
      applyRange(temps)[i],
      applyRange(precip)[i],
      applyRange(wind)[i],
      applyRange(clouds)[i],
    ]);
    exportToCSV(
      `clima-${selectedCity}-${selectedDate}-${range}.csv`,
      headers,
      rows
    );
  };

  const handleExportImage = async () => {
    const element = document.getElementById("charts-section");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = `clima-${selectedCity}-${selectedDate}.png`;
    link.click();
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("charts-section");
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, pageWidth, pageHeight);
    pdf.save(`clima-${selectedCity}-${selectedDate}.pdf`);
  };

  return (
    <aside className="w-72 bg-white dark:bg-gray-900 h-screen p-6 border-r border-gray-200 dark:border-gray-700 space-y-6 overflow-y-auto">
      <nav>
        <ul className="space-y-4 text-gray-700 dark:text-gray-300">
          <li className="hover:text-blue-500 cursor-pointer font-semibold">Filtros</li>
        </ul>
      </nav>

      <div className="space-y-4">
        <CitySelector selectedCity={selectedCity} onChange={setSelectedCity} />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Fecha:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <HourRangeSelector
          startHour={startHour}
          endHour={endHour}
          onChange={handleHourChange}
        />
      </div>

      <div className="space-y-2 pt-4 border-t border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-700 dark:text-gray-300">Exportar datos:</p>
        <button
          onClick={handleExportCSV}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Descargar CSV 📥
        </button>
        <button
          onClick={handleExportImage}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Imagen de gráficas 📸
        </button>
        <button
          onClick={handleExportPDF}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          PDF con gráficas 🧾
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
