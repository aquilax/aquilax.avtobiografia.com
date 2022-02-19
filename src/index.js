const fs = require("fs");
const path = require("path");
const { getUserContent } = require("./user");
const { getWebFingerContent } = require("./webfinger");
const { getOutboxContent } = require("./outbox");

const config = {
    username: "aquilax",
    hostname: "aquilax.avtobiografia.com",
    summary: "Fighting entropy",
    bio: "Bio",
    image: "https://media.mastodon.cloud/accounts/avatars/000/024/381/original/91be69129cb50bc7.jpg",
    publicKeyPem:
        "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4wKicIqgIrW0QVHOn9kb\nItsMevLFO1ky63gU2FWErGECH4Vg7DLnQyo+7M2qoV3WSnpkBNeBYDzC3Zb6q95Q\nREk3kmcTLjeQEaSN5fvEqpWzAcL+n3Y/lfXGBZO/XXAgw0uMWDXBYyEqQ0HST8F3\n13B6E0DSZmUa6H+ouYC7azMCrU13jnPaf5MvEK9GXvtbRLlLJ4sCMaOOZTBXdx1O\nJZIRQJIT7HraDonUJvFe5cJ4tRR7ElmnEGkd1A1R5AYL2AuMTsr+DIB4IjSCpXYg\n1+/+HrcMpiwvdsLwIgbB9keWAAkjlylkzttmupod+BZOdfxios69y7MEFiLkFvyb\nDQIDAQAB\n-----END PUBLIC KEY-----\n",
};

const root = path.resolve(`${process.cwd()}`);
const contentDir = path.resolve(`${root}/content`);
const publicDir = path.resolve(`${root}/public`);
const webFingerDir = path.resolve(`${publicDir}/.well-known`);
const userDir = path.resolve(`${publicDir}/users/aquilax`);
const outboxDir = path.resolve(`${userDir}/outbox`);

function mustCreateDirectories(directories) {
    directories.forEach((d) => {
        if (!fs.existsSync(d)) {
            fs.mkdirSync(d, { recursive: true });
        }
    });
}

const fileNames = fs.readdirSync(contentDir);

const content = [];
for (const fileName of fileNames) {
    const file = fs.readFileSync(`${contentDir}/${fileName}`, "utf8");
    content.push({ fileName, ...JSON.parse(file) });
}

mustCreateDirectories([publicDir, userDir, webFingerDir, outboxDir]);

fs.writeFileSync(
    `${webFingerDir}/webfinger`,
    JSON.stringify(getWebFingerContent(config), null, 2)
);

fs.writeFileSync(
    `${userDir}/index.json`,
    JSON.stringify(getUserContent(config), null, 2)
);

fs.writeFileSync(
    `${outboxDir}/index.json`,
    JSON.stringify(getOutboxContent(config, content), null, 2)
);
