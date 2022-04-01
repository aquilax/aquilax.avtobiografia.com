var fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const getItemId = (item) =>
    crypto.createHash("md5").update(item.content).digest("hex");

const root = path.resolve(`${process.cwd()}`);
const contentDir = path.resolve(`${root}/content`);

const parseContent = (r) =>
    `New repository: <a href="${r.html_url}" rel="nofollow noopener noreferrer">${r.full_name}</a> - ${r.description}`;

const getFilename = (date) => date.replace(/[^\dZ]/g, "-");

const fileName = process.argv[2];
const rawData = fs.readFileSync(fileName);
const repositories = JSON.parse(rawData);

repositories

    .filter((r) => !r.fork && !r.archived && !r.private)
    .map((r) => {
        const item = {
            source: {
                name: "github",
                url: r.html_url,
            },
            lang: "en",
            published: new Date(r.created_at).toISOString(),
            content: parseContent(r),
        };
        return { ...item, id: getItemId(item) };
    })
    .forEach((entry) => {
        filename = `${contentDir}/${getFilename(entry.published)}.json`;
        fs.writeFileSync(filename, JSON.stringify(entry, null, 2));
    });
