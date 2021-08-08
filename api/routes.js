const { User, Mail } = require("./models");

module.exports = function (fastify, opts, done) {
  fastify.post("/email", async (request, reply) => {
    // console.log(request.body);
    const {
      to: { value: to },
      from: { value: from },
      html,
      subject,
      text,
    } = request.body;

    const username = to.replace(/@.*$/, "");

    Mail.add(
      username,
      from,
      subject?.value || "No subject provided",
      html?.value || text?.value || "No email body."
    );

    console.info("Email received!");

    return reply.send();
  });

  fastify.get("/mails", async (request, reply) => {
    const data = request.session.get("data");
    if (!data)
      return reply.status(403).send({ message: "Please login to continue" });

    const user = await User.byEmail(data.email);
    const mails = await user.mails;
    return reply.send(
      mails.map((mail) => ({
        subject: mail.subject,
        uuid: mail.uuid,
        fromName: mail.fromName,
      }))
    );
  });

  fastify.get("/mail/:uuid", async (request, reply) => {
    const { uuid } = request.params;
    const mail = await Mail.findByPk(uuid);
    if (!mail) return reply.status(404).send({ message: "Mail not found" });
    return reply.send(mail);
  });

  fastify.post("/login", async (request, reply) => {
    let user;
    const { username, email, password, confirm_password, login } = request.body;

    if (typeof email !== "string" || !/^[^@]+@[^@]+\.[a-z]+$/i.test(email))
      return reply.status(400).send({
        message: "Please enter a valid email.",
      });

    if (typeof password !== "string" && password.length >= 2)
      return reply.status(400).send({
        message: "Please enter a password of 2 or more characters.",
      });

    if (!login) {
      if (typeof username !== "string" || !/^[a-z0-9._]{2,16}$/i.test(username))
        return reply.status(400).send({
          message:
            "Please enter an alphanumeric username consisting of 2-16 characters.",
        });

      if (password !== confirm_password)
        return reply.status(400).send({
          message: "Passwords do not match.",
        });

      if ((await User.byEmail(email)) !== null)
        return reply
          .status(400)
          .send({ message: "A user with this email already exists." });

      if ((await User.byUsername(username)) !== null)
        return reply
          .status(400)
          .send({ message: "A user with this username already exists." });

      user = await User.add(email, username, password);
    } else {
      user = await User.byEmail(email);
      if (user === null)
        return reply
          .status(404)
          .send({ message: "A user with the specified email does not exist." });

      if (!(await user.verify(password)))
        return reply
          .status(403)
          .send({ message: "The password specified is incorrect." });
    }

    request.session.set("data", {
      username,
      email,
    });

    return reply.send({
      message: "Success! Logging you in..",
      userinfo: {
        username: user.username,
        email: user.email,
      },
    });
  });

  done();
};
