# 🌤️ Weather Dashboard

Un panel interactivo que muestra estadísticas meteorológicas por ciudad, fecha y franja horaria. Los usuarios pueden visualizar datos como temperatura, precipitación, viento y nubosidad, con opción de exportar los resultados a CSV, PDF o imagen.

## 🖼️ Vista previa

![Dashboard Screenshot](./screenshot.png) <!-- Cambia esto si tienes una imagen -->

---

## 🚀 Características

- 🌍 Selector de idioma (Español / Inglés) con `react-i18next`
- 🏙️ Filtro por ciudad (predefinidas con coordenadas)
- 📅 Selector de fecha
- 🕒 Selector de rango horario personalizado
- 📊 Gráficas con datos meteorológicos:
  - Temperatura
  - Precipitación
  - Viento
  - Nubosidad
- 📥 Exportación:
  - CSV
  - Imagen (PNG)
  - PDF
- 🌙 Soporte para modo claro y oscuro
- ✅ Diseño responsive para móvil, tablet y escritorio

---

## 🛠️ Tecnologías usadas

- **React** + **Vite**
- **Tailwind CSS** para el diseño
- **Chart.js** para las gráficas
- **i18next** para la internacionalización
- **html2canvas** + **jsPDF** para la exportación
- **Open-Meteo API** para obtener datos climáticos
- **Context API** para el estado global

---

## 📦 Instalación

```bash
git clone https://github.com/tu-usuario/weather-dashboard.git
cd weather-dashboard
npm install
npm run dev


✨ Autor

Desarrollado Buski87 — Fullstack Web Developer.

📝 Licencia

Este proyecto está bajo la Licencia MIT.