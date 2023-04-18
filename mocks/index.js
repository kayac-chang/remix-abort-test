const { setupServer } = require("msw/node");
const { rest } = require("msw");

const server = setupServer(
  rest.post("https://dev.com/slow", (req, res, ctx) => {
    return res(
      ctx.delay(10_000),
      ctx.status(200),
      ctx.json({
        message: "Slow response",
      })
    );
  })
);

server.listen({ onUnhandledRequest: "bypass" });
console.info("🔶 Mock server running");

process.once("SIGINT", () => server.close());
process.once("SIGTERM", () => server.close());
