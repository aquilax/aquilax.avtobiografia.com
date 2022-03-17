var fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const getItemId = (item) =>
    crypto.createHash("md5").update(item.content).digest("hex");

const root = path.resolve(`${process.cwd()}`);
const contentDir = path.resolve(`${root}/content`);

const parseContent = (t) =>
    `❤️ track: <a href="${t.external_urls.spotify}" rel="nofollow noopener noreferrer">${t.name}</a>`;

const getFilename = (date) => date.replace(/[^\dZ]/g, "-");

const fileName = process.argv[2];
const rawData = fs.readFileSync(fileName);
const tracks = JSON.parse(rawData);

tracks.items
    .map((t) => {
        const item = {
            source: {
                name: "spotify",
                url: t.track.external_urls.spotify,
            },
            lang: "en",
            published: new Date(t.added_at).toISOString(),
            content: parseContent(t.track),
        };
        return { ...item, id: getItemId(item) };
    })
    .forEach((entry) => {
        filename = `${contentDir}/${getFilename(entry.published)}.json`;
        fs.writeFileSync(filename, JSON.stringify(entry, null, 2));
    });
