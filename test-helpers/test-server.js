const axios = require("axios");
const spawn = require("child_process").spawn;
const getPort = require("get-port");

// TEST_ENV contains env variables for test server
const TEST_ENV = {
  PORT: undefined, // assigned at runtime
  MONGODB_URI: "mongodb://localhost:27017",
  MONGODB_DB: "cashflowz-test"
};

// Util funciton that starts a test server w/ a given set of env variables
// and returns a promise that resolves to ChildProcess of the server once
// it is reachable at its base URL
function spawnServer(env) {
  return new Promise((resolve, reject) => {
    const server = spawn("node", ["src/main"], { env });

    // Pipe test server's stdout and stderr to our main proccess so we
    // can see console.logs and errors of server when running tests
    server.stdout.pipe(process.stdout);
    server.stderr.pipe(process.stderr);

    server.on("error", reject);

    // wait for server to be reachable
    return waitForURLReachable(`https://localhost:${env.PORT}`)
      .then(() => resolve(server))
      .catch(reject);
  });
}

// waitForURLReachable is a util function that tries to GET a URL until it
// succeeds. It will throw an error if it cannot reach URL with the provided
// opts.timeout (default: 1000ms)
async function waitForURLReachable(url, { timeout = 1000 } = {}) {
  const timeoutThreshold = Date.now() + timeout;

  while (true) {
    try {
      await axios.get(url);

      return true;
    } catch (err) {
      if (Date.now() > timeoutThreshold) {
        throw new Error(`URL ${url} is not reachable after ${timeout}ms`);
      }

      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}

exports.useInTest = function() {
  before(async function startTestServer() {
    // Test server's env variable should be set to TEST_ENV as declared
    // at the top of the file, but:
    // 1. Assign PATH to the user's path so `node` binary can be found
    // 2. Assign PORT to a random free port
    const env = Object.assign({}, TEST_ENV, {
      PATH: process.env.PATH,
      PORT: await getPort()
    });

    // Use our util function to spawn test server
    const testServer = await spawnServer(env);

    // Create an axios instance that is configured to use the test server as its
    // base URL and expose it as 'this.api'. This allows us to easily make
    // requests like 'this.api.get('/login')' from within test files
    const api = axios.create({ baseURL: `https://localhost:${env.PORT}` });

    this.testServer = testServer;
    this.api = api;
  });

  after(function stopTestServer() {
    // After all tests, stop the test server
    this.testServer.kill();

    // and wait for it to shut down
    return new Promise(resolve => this.testServer.on("close", () => resolve()));
  });
};
