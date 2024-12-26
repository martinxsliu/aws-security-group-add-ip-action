const core = require("@actions/core");
const { EC2Client } = require("@aws-sdk/client-ec2");

const region = core.getInput("aws-region", { required: true });
const accessKeyId = core.getInput("aws-access-key-id", { required: true });
const secretAccessKey = core.getInput("aws-secret-access-key", { required: true });
const sessionToken = core.getInput("aws-session-token", { required: false });

const groupIds = core
  .getInput("aws-security-group-id", { required: true })
  .split(",")
  .map((item) => item.trim());
const port = parseInt(core.getInput("port", { required: false }));

const toPortInput = core.getInput("to-port", { required: false });
const toPort = toPortInput.length > 0 ? parseInt(toPortInput) : false;

const description = core.getInput("description", { required: false });
const protocol = core.getInput("protocol", { required: false });

const ec2 = new EC2Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
    sessionToken,
  },
});
core.info(`EC2 client created for region ${region}`);

module.exports = {
  region,
  accessKeyId,
  secretAccessKey,
  groupIds,
  port,
  toPort,
  protocol,
  description,
  ec2,
};
