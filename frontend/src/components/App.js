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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Array.from(e.target.elements).reduce((data, elem) => {
      if (elem.name) data[elem.name] = elem.value;
      return data;
    }, {});
    console.info(data);
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
    </div>
  );
};

export default App;
