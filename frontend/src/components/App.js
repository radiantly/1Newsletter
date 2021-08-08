import "../styles/App.css";
import sendingEmail from "../assets/sending-email.svg";
import { useEffect, useState } from "react";
import { Login, Register } from "./LandingForms";
import toast, { Toaster } from "react-hot-toast";
import { Switch, Route } from "react-router-dom";
import Mail from "./Mail.js";

const App = () => {
  const [username, setUsername] = useState("example");
  const [isLogin, setLogin] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [mails, setMails] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      const response = await fetch("/api/mails");
      if (response.status === 403) {
        setLoggedIn(false);
        toast.error("Please login.");
        return;
      }
      setMails(await response.json());
    })();
  }, [isLoggedIn]);

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
    const { message, userinfo } = await response.json();
    if (message) toast[response.status === 200 ? "success" : "error"](message);
    console.info(response);

    if (response.status === 200) {
      setUsername(userinfo.username);
      setLoggedIn(true);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    setLoggedIn(false);
  };

  const listEmails = () => {
    if (!mails.length) return <p>No mails yet!</p>;
    return mails.map(({ uuid, fromName, subject }) => (
      <li key={uuid}>
        {fromName} | <a href={`/mails/${uuid}`}>{subject}</a>
      </li>
    ));
  };

  const getPageContent = () =>
    isLoggedIn ? (
      <>
        <div className="dash-container">
          <a href="/" className="logout" onClick={logout}>
            Logout
          </a>
          <h1>1Newsletter</h1>
          <p className="desc">This is your personal 1newsletter email:</p>
          <input
            className="input"
            type="email"
            value={`${username}@1newsletter.tech`}
            readOnly
          />
          <div className="emails">
            <h2>Emails received this week</h2>
            <ul>{listEmails()}</ul>
          </div>
        </div>
        <div class="trivia">
          <h2>How does this work?</h2>
          <p>
            1. When subscribing to a newsletter, use your{" "}
            <em>1newsletter.tech</em> email.
          </p>
          <p>
            2. On Sunday, you will receive a single email that consists of links
            to all the emails you've received over the week.
          </p>
        </div>
      </>
    ) : (
      <>
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
      </>
    );

  return (
    <div class="container">
      <Switch>
        <Route exact path="/">
          {getPageContent()}
        </Route>
        <Route path="/mails/:uuid">
          <Mail />
        </Route>
      </Switch>
      <Toaster />
    </div>
  );
};

export default App;
