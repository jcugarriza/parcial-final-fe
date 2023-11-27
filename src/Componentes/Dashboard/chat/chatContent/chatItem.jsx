import React, { Component } from "react";
import Avatar from "../chatList/Avatar";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: new Date(), // Guarda la hora actual en el estado inicial
    };
  }

  componentDidMount() {
    // Actualiza la hora cada minuto
    this.intervalID = setInterval(() => this.tick(), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      currentTime: new Date(), // Actualiza la hora actual en el estado
    });
  }

  handleOptionClick = (option) => {
    if (this.props.onOptionSelect) {
      this.props.onOptionSelect(option);
    }
  };

  render() {
    const { msg, options, user, image } = this.props;
    const { currentTime } = this.state;

    // Formatea la hora actual en el formato deseado
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${user ? user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">
            {msg}
            {Array.isArray(options) && options.length > 0 ? (
              <div className="chat__options">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="chat__option"
                    onClick={() => this.handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="chat__meta">
            <span>Send {formattedTime}</span>
          </div>
        </div>
        <Avatar isOnline="active" image={image} />
      </div>
    );
  }
}
