const fs = require("fs");
const path = require("path");
const { getUserContent } = require("./user");
const { getWebFingerContent } = require("./webfinger");
const { getOutboxContent, getOutboxItemsContent } = require("./outbox");
const { getUserProfileContent } = require("./html-user");
const { getHostMetaContent } = require("./host-meta");

const config = {
    username: "aquilax",
    hostname: "aquilax.avtobiografia.com",
    summary: "Fighting entropy",
    bio: "Bio",
    image: "avatar.jpg",
    publicKeyPem:
        "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4wKicIqgIrW0QVHOn9kb\nItsMevLFO1ky63gU2FWErGECH4Vg7DLnQyo+7M2qoV3WSnpkBNeBYDzC3Zb6q95Q\nREk3kmcTLjeQEaSN5fvEqpWzAcL+n3Y/lfXGBZO/XXAgw0uMWDXBYyEqQ0HST8F3\n13B6E0DSZmUa6H+ouYC7azMCrU13jnPaf5MvEK9GXvtbRLlLJ4sCMaOOZTBXdx1O\nJZIRQJIT7HraDonUJvFe5cJ4tRR7ElmnEGkd1A1R5AYL2AuMTsr+DIB4IjSCpXYg\n1+/+HrcMpiwvdsLwIgbB9keWAAkjlylkzttmupod+BZOdfxios69y7MEFiLkFvyb\nDQIDAQAB\n-----END PUBLIC KEY-----\n",
};

const root = path.resolve(`${process.cwd()}`);
const contentDir = path.resolve(`${root}/content`);
const publicDir = path.resolve(`${root}/public`);
const wellKnownDir = path.resolve(`${publicDir}/.well-known`);
const userDir = path.resolve(`${publicDir}/users/${config.username}`);
const outboxDir = path.resolve(`${userDir}/outbox`);
const userProfileDir = path.resolve(`${publicDir}/@${config.username}`);

function mustCreateDirectories(directories) {
    directories.forEach((d) => {
        if (!fs.existsSync(d)) {
            fs.mkdirSync(d, { recursive: true });
        }
    });
}

const fileNames = fs.readdirSync(contentDir);

const files = [];
for (const fileName of fileNames) {
    const file = fs.readFileSync(`${contentDir}/${fileName}`, "utf8");
    files.push({ fileName, ...JSON.parse(file) });
}

content = files.sort((a, b) => (a.published < b.published ? 1 : -1));

mustCreateDirectories([
    publicDir,
    userDir,
    wellKnownDir,
    outboxDir,
    userProfileDir,
]);

fs.writeFileSync(
    `${wellKnownDir}/webfinger`,
    JSON.stringify(getWebFingerContent(config), null, 2)
);

fs.writeFileSync(`${wellKnownDir}/host-meta`, getHostMetaContent(config));

fs.writeFileSync(
    `${userDir}/index.json`,
    JSON.stringify(getUserContent(config), null, 2)
);

fs.writeFileSync(
    `${outboxDir}/index.json`,
    JSON.stringify(getOutboxContent(config, content), null, 2)
);

fs.writeFileSync(
    `${outboxDir}/all.json`,
    JSON.stringify(getOutboxItemsContent(config, content), null, 2)
);

fs.writeFileSync(
    `${userProfileDir}/index.html`,
    getUserProfileContent(config, content)
);
