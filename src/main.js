const { join } = require("path");
const chalk = require("chalk");
const prod = require("micro");
const dev = require("micro-dev/lib/serve");

/**
 * @callback callback
 * @param {function} server - https://nodejs.org/api/net.html#net_class_net_server
 */
const cb = server => {
  const { address, port } = server.address();
  console.log(chalk.green(`Micro is running on http://${address === "::" ? "localhost" : address}:${port}`));
};

/**
 * @param {string} file - Relative path to entry point.
 * @param {Object} options
 * @param {boolean} [options.isDevelopment=false] - If true runs micro-dev.
 * @param {string} [options.host="::"] - Hostname or IP to listen on.
 * @param {number} [options.port=3000] - Port to listen on.
 * @param {callback} options.callback - Callback function called by https://nodejs.org/api/net.html#net_server_listen
 */
module.exports = (file, { isDevelopment = false, host = "::", port = 3000, callback = cb } = {}) => {
  if (typeof file !== "string" || file.trim() === "") {
    throw new Error("file is required");
  }

  const path = join(process.cwd(), file);

  if (isDevelopment) {
    dev(path, { _: {}, host, port });
  } else {
    const handler = require(path);
    const server = prod(handler.default || handler);
    server.listen(port, host, () => typeof callback === "function" && callback(server));
  }
};
