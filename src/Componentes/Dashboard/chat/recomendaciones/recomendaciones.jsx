import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./recomendaciones.css";
import Nav from "../nav/nav";
import recomendaciones_1 from "../../../../assets/RecomendationsAssets/Recomendaciones_1.png";
import weak_dimension from "../../../../assets/RecomendationsAssets/homework.png";
import response from "./serverResponse.json";

function WealDimensionModal(props) {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.onHide}></Modal.Header>
      <Modal.Body className="main">
        <div className="dimension_weak">
          <div className="info_dimension">
            <img src={weak_dimension} alt="" />
            <h4>{props.name}</h4>
            <p>{props.description}</p>
          </div>
          <div className="mejoras">
            <h4>Para lograr mejoras, te recomendamos...</h4>
            <div className="recomendaciones">
              <ul>
                {props.recomendaciones.map((recomendacion, index) => (
                  <li key={index}>{recomendacion}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Listo</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Recomendaciones = () => {
  function displayCurrentDate() {
    const currentDate = new Date();
    const formattedDate = currentDate.toDateString();

    // Actualiza el contenido de algún elemento HTML con la fecha actual
    const dateElement = document.getElementById("current-date");
    if (dateElement) {
      dateElement.textContent = formattedDate;
    }
  }

  // Actualiza la fecha cada segundo (1000 milisegundos)
  setInterval(displayCurrentDate, 1000);

  const [modalShows, setModalShows] = React.useState(Array(3).fill(false));
  const [selectedDimension, setSelectedDimension] = React.useState(null);

  const handleModalShow = (index, dimension) => {
    const newModalShows = modalShows.map((show, i) =>
      i === index ? true : show
    );
    setModalShows(newModalShows);
    setSelectedDimension(dimension);
  };

  const respuesta = response.result;
  const strongest_dimension = respuesta.strongest_dimensions;
  const weakest_dimension = respuesta.weakest_dimensions;

  return (
    <div id="c_body">
      <div className="__main">
        <Nav />
        <div className="content">
          <div className="main_recomendacion">
            <div className="text_l">
              <div className="titulo">
                <h2>¡Aquí estan tus resultados!</h2>
                <p id="current-date"></p>
              </div>
              <div className="promedio">
                <div className="num_prom">
                  <h3>{respuesta.score_range}</h3>
                </div>
                <div className="text">
                  <p>
                    Su promedio se encuentra en el siguiente rango {respuesta.success_probability}
                  </p>
                </div>
                <div className="img_prom">
                  <img src={recomendaciones_1} alt="recomendaciones_1" />
                </div>
              </div>
              <div className="dimensiones_mejorar">
                <h3>Debes mejorar en:</h3>
                <div className="dimensiones">
                  {weakest_dimension.map((dimension, index) => (
                    <div className="cat_mejora" key={index}>
                      <Button
                        variant="secondary"
                        onClick={() => handleModalShow(index, dimension)}
                      >
                        <img src={weak_dimension} alt="" />
                      </Button>
                      <WealDimensionModal
                        name={dimension.dimension_name}
                        description={dimension.dimension_description}
                        recomendaciones={dimension.recommendations}
                        show={modalShows[index]}
                        onHide={() =>
                          setModalShows((prevShows) =>
                            prevShows.map((show, i) =>
                              i === index ? false : show
                            )
                          )
                        }
                      />
                      <p>{dimension.dimension_name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text_r">
              <h3>Tu dimension más fuerte es:</h3>
              <img src={weak_dimension} alt="" />
              <h3 className="name_dim">
                {strongest_dimension[0].dimension_name}
              </h3>
              <p>{strongest_dimension[0].dimension_description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recomendaciones;
