const core = require("@actions/core");
const { EC2Client } = require("@aws-sdk/client-ec2");

const region = core.getInput("aws-region", { required: false });
const accessKeyId = core.getInput("aws-access-key-id", { required: false });
const secretAccessKey = core.getInput("aws-secret-access-key", { required: false });
const sessionToken = core.getInput("aws-session-token", { required: false });

const config = {};
if (region) {
  config.region = region;
}
if (accessKeyId && secretAccessKey) {
  config.credentials = {
    accessKeyId,
    secretAccessKey,
  };
  if (sessionToken) {
    config.credentials.sessionToken = sessionToken;
  }
}

const groupIds = core
  .getInput("aws-security-group-id", { required: true })
  .split(",")
  .map((item) => item.trim());
const port = parseInt(core.getInput("port", { required: false }));

const toPortInput = core.getInput("to-port", { required: false });
const toPort = toPortInput.length > 0 ? parseInt(toPortInput) : false;

const description = core.getInput("description", { required: false });
const protocol = core.getInput("protocol", { required: false });

const ec2 = new EC2Client(config);
core.info(`EC2 client created for region ${region}`);

module.exports = {
  groupIds,
  port,
  toPort,
  protocol,
  description,
  ec2,
};
