import "../styles/App.css";
import sendingEmail from "../assets/sending-email.svg";
import { useState } from "react";
import { Login, Register } from "./LandingForms";

const App = () => {
  const [isLogin, setLogin] = useState(true);

  const switchFormHandler = (e) => {
    e.preventDefault();
    setLogin(!isLogin);
  };

  return (
    <div class="container">
      <form class="box">
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
    </div>
  );
};

export default App;
