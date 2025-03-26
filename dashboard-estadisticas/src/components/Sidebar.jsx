import { useContext } from "react";
import CitySelector from "./CitySelector";
import HourRangeSelector from "./HourRangeSelector";
import { DashboardContext } from "../context/DashboardContext";
import { exportToCSV } from "../utils/exportToCSV";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation();

  const applyRange = (array) => array.slice(startHour, endHour + 1);

  const handleExportCSV = () => {
    const range = `${startHour}-${endHour}`;
    const headers = ["Hora", "Temperatura (°C)", "Precipitación (mm)", "Viento (km/h)", "Nubes (%)"];
    const rows = applyRange(labels).map((label, i) => [
      label,
      applyRange(temps)[i],
      applyRange(precip)[i],
      applyRange(wind)[i],
      applyRange(clouds)[i],
    ]);
    exportToCSV(`clima-${selectedCity}-${selectedDate}-${range}.csv`, headers, rows);
  };

  const handleExportImage = async () => {
    const element = document.getElementById("charts-section");
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `clima-${selectedCity}-${selectedDate}.png`;
    link.click();
  };

  const handleExportPDF = async () => {
    const element = document.getElementById("charts-section");
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 10, pageWidth, pageHeight);
    pdf.save(`clima-${selectedCity}-${selectedDate}.pdf`);
  };

  return (
    <aside className="w-full md:w-64 h-full md:h-auto p-4 md:p-6 space-y-6 overflow-y-auto">
      <div className="space-y-4">
        <CitySelector selectedCity={selectedCity} onChange={setSelectedCity} />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("filters.date")}
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
        <p className="text-sm text-gray-700 dark:text-gray-300">{t("export.title")}</p>

        <button onClick={handleExportCSV} className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          {t("export.csv")} 📥
        </button>

        <button onClick={handleExportImage} className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          {t("export.image")} 📸
        </button>

        <button onClick={handleExportPDF} className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          {t("export.pdf")} 🧾
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;