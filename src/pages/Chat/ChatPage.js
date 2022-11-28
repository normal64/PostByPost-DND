import react, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/ChatPage.scss";
import "../../styles/Chat.scss";
import "../../styles/Messages.scss";
import "../../styles/AddMessageForm.scss";
import "../../styles/Message.scss";
import { store } from "../../index";
import { addNewMessage } from "../../components/actions";
import { useSelector } from "react-redux";
//const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
//const ws = new WebSocket("wss://ws.bitmex.com/realtime")
const ws = new WebSocket("ws://62.217.177.149/ws");

export const ChatPage = () => {
  return (
    <div className="chat-page-container">
      <h1>CHatpage </h1>
      <Chat />
      <Messages />
      <AddMessageForm />
    </div>
  );
};

const Chat = () => {
  return <div className="chat">Chat </div>;
};

const Messages = () => {
  const [messagesfromStore, setMessagesfromStore] = useState([]);
  const messagesFromStore = useSelector((state) => state.chatReducer.messages);

  console.log("rerender happened", messagesFromStore);
  useEffect(() => {
    ws.addEventListener("message", (e) => {
      // console.log("updating store with message",messagesFromStore[messagesFromStore.length - 1]);
      // console.log(e.data);
      // if(messagesFromStore[messagesFromStore.length - 1] == e.data){
      //   return
      // }

      store.dispatch(addNewMessage(e.data));
      //setMessages(messagesFromStore);
    });

    return () => {};
  }, []);
  return (
    <div className="messages">
      {messagesFromStore.map((m) => (
        <Message key={m} message={m} />
      ))}
      {/* {messages.map((m) => (
        <Message key={m} message={m} />
      ))} */}
    </div>
  );
};
const Message = ({ message }) => {
  const messageTemp = {
    url: "https://scontent-waw1-1.xx.fbcdn.net/v/t1.18169-9/251033_153393434731567_5599454_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=de6eea&_nc_ohc=x2k29-nH0l4AX91mO4G&tn=Y_CPUYquyRuer7tS&_nc_ht=scontent-waw1-1.xx&oh=00_AfAH5zf96lDcWmf_QA3cU-VMPKmgNqGM9WsMJinQk9XwaA&oe=6395A790",
    author: "Denis Seksov",
    text: "Hello biatch",
  };
  return (
    <div className="message-container">
      <div className="user-info">
        <img src={messageTemp.url} alt="user-avatar" />
        <b>{messageTemp.author}</b>
      </div>

      <br />

      <div className="message-text-container">
        <p className="p-container-message">{message}</p>
      </div>

      <hr />
    </div>
  );
};
const AddMessageForm = () => {
  const [message, setMessage] = useState("");
  const openInNewTab = (url) => {
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    };
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify("Hello from Lambda!"),
    };
    fetch(url + message)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    return response;
  };

  return (
    <div className="enter-text-container">
      <div className="input-container">
        <input
          className="input-message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="button-send-message"
          onClick={() => openInNewTab("http://62.217.177.149/push/")}
        >
          <i className="fa-regular fa-paper-plane"></i>
        </button>
        {/* test to make message send */}
        {/* <a href="#" onClick={(e) => onSendMessageClick(e)}>
          request
        </a> */}
      </div>
    </div>
  );
};
