import type { V2_MetaFunction } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loader() {
  await new Promise<Response>((resolve, reject) => {
    const controller = new AbortController();

    const req = new Request("https://dev.com/slow", {
      method: "POST",
      body: JSON.stringify({ a: 1 }),
    });

    sleep(1000)
      .then(() => controller.abort())
      .catch(reject);
    fetch(req, { signal: controller.signal }).then(resolve).catch(reject);
  })
    //
    .then((res) => res.json())
    .catch(console.error);

  return null;
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
