const execute = (filePath, ...args) => {
  args.unshift(filePath);
  return new Promise((resolve, reject) => {
    let response = "";
    const spawn = require("child_process").spawn;
    const process = spawn("python3", args);
    process.stdout.on("data", data => {
      response += data;
    });
    process.on('close', _ => {
      resolve(response);
    });
    process.stderr.on("data", error => {
      console.log("error", error.toString());
      reject(error);
    })
  })
};

exports.executor = { execute };
