import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../chatList/chatList";
import ChatContent from "../chatContent/chatContent";
import UserProfile from "../userProfile/userProfile";

export default class ChatBody extends Component {
  render() {
    return (
      <div className="main__chatbody">
        <ChatContent />
      </div>
    );
  }
}