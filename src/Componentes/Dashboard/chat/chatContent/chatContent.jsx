import React, { Component, createRef } from "react";
import "./chatContent.css";
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';
import Axios from "axios";
import Avatar from "../chatList/Avatar";
import ChatItem from "./chatItem";
import Michelle from "../../../../assets/ChatAssets/estudiante.jpg";
import IA from "../../../../assets/ChatAssets/Asistente.png";
import preguntas from "./response preguntas.json";

export default class ChatContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      msg: "",
      currentQuestionIndex: 0,
      questions: preguntas.result,
      answers: {},
      input_dimensions: [],
    };
    this.messagesEndRef = createRef();
    this.welcomeMessageShown = false;
  }

  componentDidMount() {
    this.scrollToBottom();

    if (!this.welcomeMessageShown) {
      this.showWelcomeMessage();
      this.welcomeMessageShown = true;
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (this.state.msg !== "") {
          this.handleOptionSelect(this.state.msg, null);
        }
      }
    });

    // Realiza la solicitud GET a la API para obtener las preguntas
    Axios.get("https://educalogroapi.onrender.com/api/v1/model/questions")
      .then((response) => {
        // Actualiza el estado con las preguntas obtenidas
        this.setState({
          questions: response.data.result,
        });
      })
      .catch((error) => {
        console.error("Error al obtener las preguntas:", error);
      });
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  showWelcomeMessage = () => {
    this.setState(
      (prevState) => ({
        chat: [
          ...prevState.chat,
          {
            key: prevState.chat.length + 1,
            image: IA,
            type: "other",
            msg:
              "Hola! Soy Acadia, tu asistente de hoy. Estoy aquí para ayudarte a responder el cuestionario de nuestra aplicación.",
          },
          {
            key: prevState.chat.length + 2,
            image: IA,
            type: "other",
            msg:
              "Por favor, responde 'Sí' si estás de acuerdo en compartir información personal con fines académicos y para completar el cuestionario. Si no estás de acuerdo, simplemente responde 'No'",
            options: ["si", "no"],
          },
        ],
      }),
      () => {
        this.scrollToBottom();
      }
    );
  };

  showGoodbyeMessage = () => {
    this.setState(
      (prevState) => ({
        chat: [
          ...prevState.chat,
          {
            key: prevState.chat.length + 1,
            image: IA,
            type: "other",
            msg:
              "Entendido, respetamos tu decisión. Si en algún momento decides cambiar de opinión o necesitas ayuda, recuerda que estamos aquí para asistirte. ¡Gracias y ten un maravilloso día!",
          },
        ],
      }),
      () => {
        this.scrollToBottom();
      }
    );
  };

  showCurrentQuestion = () => {
    const { questions, currentQuestionIndex } = this.state;
    if (currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const isQuestionInChat = this.state.chat.some(
        (item) =>
          item.msg === currentQuestion.conversation_text &&
          item.type === "other"
      );

      if (!isQuestionInChat) {
        this.setState(
          (prevState) => {
            const questionToAdd = {
              key: prevState.chat.length + 1,
              image: IA,
              type: "other",
              msg: currentQuestion.conversation_text,
              options: currentQuestion.valid_options,
              questionId: currentQuestion.model_question_id,
              dimensionId: currentQuestion.dimension_id,
            };

            if (currentQuestion.dimension_id !== null) {
              return {
                chat: [...prevState.chat, questionToAdd],
              };
            } else {
              return {
                chat: [...prevState.chat, questionToAdd],
              };
            }
          },
          () => {
            this.scrollToBottom();
          }
        );
      }
    }
  };

  handleFileSave = (fileName, content) => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    saveAs(blob, fileName);
  };

  handleOptionSelect = (selectedOption, questionId, dimensionId) => {
    const { answers, currentQuestionIndex } = this.state;

    if (currentQuestionIndex === 0 && this.state.chat.length <= 2) {
      if (selectedOption.toLowerCase() === "si") {
        this.setState(
          (prevState) => ({
            chat: [
              ...prevState.chat,
              {
                key: prevState.chat.length + 1,
                image: Michelle,
                type: "user",
                msg: selectedOption,
              },
            ],
          }),
          () => {
            this.showCurrentQuestion();
            this.scrollToBottom();
          }
        );
      } else if (selectedOption.toLowerCase() === "no") {
        this.showGoodbyeMessage();
      }
    } else {
      this.setState(
        (prevState) => {
          const updatedAnswers = { ...answers };

          if (dimensionId !== null) {
            // Check if the dimension is already in answers
            updatedAnswers.input_dimensions =
              updatedAnswers.input_dimensions || [];

            const dimensionIndex = updatedAnswers.input_dimensions.findIndex(
              (dim) => dim.dimension_id === dimensionId
            );

            if (dimensionIndex !== -1) {
              const questionIndex = updatedAnswers.input_dimensions[
                dimensionIndex
              ].input_dimension_responses.findIndex(
                (response) => response.question_id === questionId
              );

              if (questionIndex !== -1) {
                // Update the existing response
                updatedAnswers.input_dimensions[
                  dimensionIndex
                ].input_dimension_responses[
                  questionIndex
                ].value = selectedOption;
              } else {
                // Add a new response
                updatedAnswers.input_dimensions[
                  dimensionIndex
                ].input_dimension_responses.push({
                  question_id: questionId,
                  value: selectedOption,
                });
              }
            } else {
              // If the dimension is not present, add a new dimension
              updatedAnswers.input_dimensions.push({
                dimension_id: dimensionId,
                input_dimension_responses: [
                  {
                    question_id: questionId,
                    value: selectedOption,
                  },
                ],
              });
            }
          } else {
            // If dimensionId is null, it's a user response
            updatedAnswers.input_user_data_responses =
              updatedAnswers.input_user_data_responses || [];

            const userQuestionIndex = updatedAnswers.input_user_data_responses.findIndex(
              (response) => response.question_id === questionId
            );

            if (userQuestionIndex !== -1) {
              // Update the existing response
              updatedAnswers.input_user_data_responses[
                userQuestionIndex
              ].value = selectedOption;
            } else {
              // Add a new response
              updatedAnswers.input_user_data_responses.push({
                question_id: questionId,
                value: selectedOption,
              });
            }
          }

          return {
            chat: [
              ...prevState.chat,
              {
                key: prevState.chat.length + 1,
                image: Michelle,
                type: "user",
                msg: selectedOption,
                questionId: questionId,
                dimensionId: dimensionId || null,
              },
            ],
            answers: updatedAnswers,
            currentQuestionIndex: currentQuestionIndex + 1,
          };
        },
        () => {
          this.scrollToBottom();
          if (currentQuestionIndex < this.state.questions.length - 1) {
            this.showCurrentQuestion();
          } else {
            const jsonContent = {
              user_id: 100,
              timestamp: "2023-09-15",
              data_usage_consent: "Sí",
              input_user_data_responses: this.state.answers
                .input_user_data_responses,
              input_dimensions: this.state.answers.input_dimensions,
            };
            // console.log(JSON.stringify(jsonContent, null, 2));
            Axios.post(
              "https://educalogroapi.onrender.com/api/v1/model/obtainreport/calculate",
              jsonContent
            )
              .then((response) => {
                const serverResponse = response.data;

                // Guardar la respuesta en un archivo JSON local
                this.handleFileSave("serverResponse.json", serverResponse);
                console.log("Respuesta guardada en serverResponse.json");
              })
              .catch((error) => {
                console.error("Error al hacer la solicitud POST:", error);
              });
          }
        }
      );
    }
  };

  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };

  render() {
    const { chat } = this.state;

    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar isOnline="active" image={IA} />
              <p>Red de Apoyo UN</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {chat.map((item) => (
              <ChatItem
                key={item.key}
                user={item.type}
                msg={item.msg}
                image={item.image}
                options={item.options}
                onOptionSelect={(option) =>
                  this.handleOptionSelect(
                    option,
                    item.questionId,
                    item.dimensionId
                  )
                }
              />
            ))}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
