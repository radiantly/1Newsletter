import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/Mail.css";

const Mail = () => {
  const { uuid } = useParams();
  const [mail, setMail] = useState(undefined);

  useEffect(() => {
    fetch(`/api/mail/${uuid}`).then((response) => {
      if (response.status !== 200) return setMail(null);
      response.json().then((mail) => setMail(mail));
    });
  }, [uuid]);

  const renderMail = () => {
    if (mail === undefined) return <p>Loading...</p>;
    if (mail === null) return <p>404 Mail not found</p>;
    return (
      <div
        class="mail-content"
        dangerouslySetInnerHTML={{ __html: mail.body }}
      ></div>
    );
  };

  return (
    <div class="mail-container">
      <Link to="/">Home</Link>
      {renderMail()}
    </div>
  );
};

export default Mail;
