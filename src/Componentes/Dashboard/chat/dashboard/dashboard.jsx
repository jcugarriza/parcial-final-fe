import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {useNavigate} from 'react-router-dom';
import "./dashboard.css";
import dashboard_1 from "../../../../assets/DashboardAssets/Notes.png";

const Dashboard = () => {

  const navigateTo = useNavigate();
  const goToAsistente= () => {
    navigateTo("/asistente");
  };

  const [date, setDate] = useState(new Date());
  
  // Supongamos que tienes un arreglo de eventos con fechas
  const eventos = [
    { fecha: new Date(2023, 10, 1), titulo: "Evento 1" },
    { fecha: new Date(2023, 10, 1), titulo: "Evento 2" },
    { fecha: new Date(2023, 10, 1), titulo: "Evento 3" },
  ];

  // Función para obtener eventos programados para una fecha específica
  const getEventosParaFecha = (fecha) => {
    const fechaString = fecha.toISOString().split("T")[0];
    return eventos.filter(
      (e) => e.fecha.toISOString().split("T")[0] === fechaString
    );
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="dash">
      <div className="left-content">
        <div className="msn-bienvenida">
          <h4>Bienvenido(a), Cliente</h4>
          <img src={dashboard_1} alt="" />
        </div>
        <div className="empieza-aqui">
          <p>
            ¡Aprovecha al máximo tu educación con nuestra aplicación! <br />
            Inicia tu camino hacia el éxito académico.
          </p>
          <button onClick={goToAsistente}>Empieza aquí</button>
        </div>
      </div>
      <div className="right-content">
        <h3>Calendario académico</h3>
        <Calendar value={date} onChange={handleDateChange} />
        <div className="eventos-lista">
          <h2>Eventos para el {date.toLocaleDateString()}</h2>
          <ul>
            {getEventosParaFecha(date).map((evento, index) => (
              <li key={index}>{evento.titulo}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
