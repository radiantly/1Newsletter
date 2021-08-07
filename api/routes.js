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
    const { username, email, password, confirm_password, login } = request.body;

    if (typeof username !== "string" || !/^[a-z0-9._]{3,16}$/i.test(username))
      return reply.status(400).send({
        message:
          "Please enter a alphanumeric username consisting of 3-16 characters.",
      });

    if (typeof password !== "string")
      return reply.status(400).send({
        message: "Please enter a password.",
      });

    if (!login) {
      if (typeof email !== "string" || !/^[^@]+@[^@]+\.[a-z]+$/i.test(email))
        return reply.status(400).send({
          message: "Please enter a valid email.",
        });

      if (password !== confirm_password)
        return reply.status(400).send({
          message: "Passwords do not match.",
        });
    }

    if (username)
      reply.status(200).send({ message: "Success! Logging you in.." });
  });
  done();
};
