const isProduction = process.env.NODE_ENV === "production";
const fastify = require("fastify")({ logger: !isProduction });
const { FASTIFY_SECRET, PORT } = require("./config");

fastify.register(require("fastify-secure-session"), {
  secret: FASTIFY_SECRET,
  cookie: {
    path: "/",
    httpOnly: isProduction,
  },
});

fastify.register(require("fastify-multipart"), {
  attachFieldsToBody: true,
});
fastify.register(require("./routes"), { prefix: "/api" });

fastify.listen(PORT);
