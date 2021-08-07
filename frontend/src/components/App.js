import "../styles/App.css";
import sendingEmail from "../assets/sending-email.svg";
import { useState } from "react";
import { Login, Register } from "./LandingForms";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [isLogin, setLogin] = useState(true);

  const switchFormHandler = (e) => {
    e.preventDefault();
    setLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Array.from(e.target.elements).reduce((data, elem) => {
      if (elem.name) data[elem.name] = elem.value;
      return data;
    }, {});
    data["login"] = isLogin;
    const response = await fetch(`/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const { message } = await response.json();
    if (response.status !== 200) {
      if (message) toast.error(message);
    }
    console.info(response);
  };

  return (
    <div class="container">
      <form class="box" onSubmit={handleSubmit}>
        <h1>1Newsletter</h1>
        <p class="desc">
          Keeping your mailbox clean of newsletters has never been easier.
        </p>
        {isLogin ? (
          <Login switchFormHandler={switchFormHandler} />
        ) : (
          <Register switchFormHandler={switchFormHandler} />
        )}
      </form>
      <div class="imgbox">
        <img src={sendingEmail} alt="1Newsletter" class="emailimg" />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
