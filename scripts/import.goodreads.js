var fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const getItemId = (item) =>
    crypto.createHash("md5").update(item.content).digest("hex");

const root = path.resolve(`${process.cwd()}`);
const contentDir = path.resolve(`${root}/content`);

const parseContent = (r) =>
    `📚 Finished reading <a href="${r.link}" rel="nofollow noopener noreferrer">${r.title}</a> by ${r.author}`;

const getFilename = (date) => date.replace(/[^\dZ]/g, "-");

const fileName = process.argv[2];
const rawData = fs.readFileSync(fileName);
const books = JSON.parse(rawData);

Object.values(books)
    .flatMap((b) => b)
    .map((b) => {
        const item = {
            source: {
                name: "goodreads",
                url: b.link,
            },
            lang: "en",
            published: new Date(b.marked_as_read).toISOString(),
            content: parseContent(b),
        };
        return { ...item, id: getItemId(item) };
    })
    .forEach((entry) => {
        filename = `${contentDir}/${getFilename(entry.published)}.json`;
        fs.writeFileSync(filename, JSON.stringify(entry, null, 2));
    });
