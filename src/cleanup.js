const core = require("@actions/core");
const publicIp = require("public-ip");
const { RevokeSecurityGroupIngressCommand } = require("@aws-sdk/client-ec2");

const config = require("./config");

async function run() {
  try {
    const myPublicIp = await publicIp.v4();

    for (const groupId of config.groupIds) {
      await config.ec2.send(
        new RevokeSecurityGroupIngressCommand({
          GroupId: groupId,
          CidrIp: `${myPublicIp}/32`,
          IpProtocol: config.protocol,
          FromPort: config.port,
          ToPort: config.toPort !== false ? config.toPort : config.port,
        })
      );
    }

    core.info(`The IP ${myPublicIp} is removed`);
  } catch (error) {
    core.info(error.message);
  }
}

run();
