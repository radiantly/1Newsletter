module.exports = function (fastify, opts, done) {
  fastify.post("/email", async (req, res) => {
    const body = req.body;
    console.log("to: ", body.to);
    console.log("cc: ", body.cc);
    console.log("from: ", body.from);
    console.log("subject: ", body.subject);

    console.log("html: ", body.html);
    console.log("text: ", body.text);
    // console.log("attachments: ", body.attachments);
    // console.log("attachment-info: ", body['attachment-info']);
    // console.log("content-ids: ", body['content-ids']);

    if (req.files.length > 0) {
      // Log file data
      console.log(req.files);
    } else {
      console.log("No files...");
    }

    return res.status(200).send();
  });
  done();
};
