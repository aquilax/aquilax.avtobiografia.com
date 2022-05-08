const fs = require("fs");
const path = require("path");
const { getUserContent } = require("./user");
const { getWebFingerContent } = require("./webfinger");
const { getOutboxContent, getOutboxItemsContent } = require("./outbox");
const {
    getUserProfileContent,
    getUserProfileContentPaginated,
} = require("./html-user");
const { getUserFeedContent } = require("./feed-user");
const { getHostMetaContent } = require("./host-meta");
const { getItemHTMLContent } = require("./html-item");
const { getUserTwTxtFeedContent } = require("./feed-twttxt");
const { getUserJF2FeedContent } = require("./jf2feed-user");
const { getSitemapContent } = require("./feed-sitemap");

const config = {
    username: "aquilax",
    hostname: "aquilax.avtobiografia.com",
    profilePage: "http://www.avtobiografia.com/",
    summary: "Fighting entropy",
    bio: "Bio",
    image: "avatar.jpg",
    language: "en",
    publicKeyPem:
        "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4wKicIqgIrW0QVHOn9kb\nItsMevLFO1ky63gU2FWErGECH4Vg7DLnQyo+7M2qoV3WSnpkBNeBYDzC3Zb6q95Q\nREk3kmcTLjeQEaSN5fvEqpWzAcL+n3Y/lfXGBZO/XXAgw0uMWDXBYyEqQ0HST8F3\n13B6E0DSZmUa6H+ouYC7azMCrU13jnPaf5MvEK9GXvtbRLlLJ4sCMaOOZTBXdx1O\nJZIRQJIT7HraDonUJvFe5cJ4tRR7ElmnEGkd1A1R5AYL2AuMTsr+DIB4IjSCpXYg\n1+/+HrcMpiwvdsLwIgbB9keWAAkjlylkzttmupod+BZOdfxios69y7MEFiLkFvyb\nDQIDAQAB\n-----END PUBLIC KEY-----\n",
    itemsPerPage: 100,
};

const root = path.resolve(`${process.cwd()}`);
const contentDir = path.resolve(`${root}/content`);
const publicDir = path.resolve(`${root}/public`);
const wellKnownDir = path.resolve(`${publicDir}/.well-known`);
const userDir = path.resolve(`${publicDir}/users/${config.username}`);
const outboxDir = path.resolve(`${userDir}/outbox`);
const userProfileDir = path.resolve(`${publicDir}/@${config.username}`);
const userProfileItemsDir = path.resolve(
    `${publicDir}/@${config.username}/item`
);

function mustCreateDirectories(directories) {
    directories.forEach((d) => {
        if (!fs.existsSync(d)) {
            fs.mkdirSync(d, { recursive: true });
        }
    });
}

// https://stackoverflow.com/a/44108826/17734
function chunk(arr, n) {
    var r = Array(Math.ceil(arr.length / n)).fill();
    return r.map((e, i) => arr.slice(i * n, i * n + n));
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
    userProfileItemsDir,
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

pages = chunk(content, config.itemsPerPage);
pages.forEach((items, pageNum) => {
    fs.writeFileSync(
        `${outboxDir}/${pageNum}.json`,
        JSON.stringify(
            getOutboxItemsContent(config, items, content.length, pageNum),
            null,
            2
        )
    );
});

// ActivityStream Outbox
fs.writeFileSync(
    `${outboxDir}/index.json`,
    JSON.stringify(getOutboxContent(config, content), null, 2)
);

// Profile HTML Home page
fs.writeFileSync(
    `${userProfileDir}/all.html`,
    getUserProfileContent(config, content)
);

pages.forEach((items, pageNum) => {
    const fileName =
        pageNum === 0
            ? `${userProfileDir}/index.html`
            : `${userProfileDir}/${pageNum}.html`;
    fs.writeFileSync(
        fileName,
        getUserProfileContentPaginated(config, items, content.length, pageNum)
    );
});

// Items HTML pages
content.forEach((item) => {
    fs.writeFileSync(
        `${userProfileItemsDir}/${item.id}.html`,
        getItemHTMLContent(config, item)
    );
});

// JSON Feed
fs.writeFileSync(
    `${userProfileDir}/feed.json`,
    JSON.stringify(getUserFeedContent(config, content), null, 2)
);

// JF2 Feed
fs.writeFileSync(
    `${userProfileDir}/jf2feed.json`,
    JSON.stringify(getUserJF2FeedContent(config, content), null, 2)
);

// TWTXT feed
fs.writeFileSync(
    `${userProfileDir}/twtxt.txt`,
    getUserTwTxtFeedContent(config, content)
);

// sitemap.xml
fs.writeFileSync(
    `${publicDir}/sitemap.xml`,
    getSitemapContent(config, content)
);
