const fastify = require("fastify")({ logger: true });

fastify.register(require("./routes"), { prefix: "/api" });

fastify.listen(5000);
