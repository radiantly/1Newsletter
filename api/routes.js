const { User } = require("./models");

module.exports = function (fastify, opts, done) {
  fastify.post("/email", async (req, res) => {
    console.log(req.body);
    // const body = req.body;
    // console.log("to: ", body.to);
    // console.log("cc: ", body.cc);
    // console.log("from: ", body.from);
    // console.log("subject: ", body.subject);

    // console.log("html: ", body.html);
    // console.log("text: ", body.text);
    // console.log("attachments: ", body.attachments);
    // console.log("attachment-info: ", body['attachment-info']);
    // console.log("content-ids: ", body['content-ids']);

    // if (req.files.length > 0) {
    //   // Log file data
    //   console.log(req.files);
    // } else {
    //   console.log("No files...");
    // }

    return res.status(200).send();
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

    return reply.status(200).send({ message: "Success! Logging you in.." });
  });
  done();
};
