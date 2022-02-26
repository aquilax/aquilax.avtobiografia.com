var fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const getItemId = (item) =>
    crypto.createHash("md5").update(item.content).digest("hex");

const regexLine = /\* ([\d\-\s:]{19})\s(.+)/;

const root = path.resolve(`${process.cwd()}`);
const contentDir = path.resolve(`${root}/content`);

const parseContent = (content) =>
    content.replace(
        /\[([^\]]+)\]\(([^\)]+)\)/,
        '<a href="$2" rel="nofollow noopener noreferrer">$1</a>'
    );

const getFilename = (date) => date.replace(/[^\dZ]/g, "-");

var stdinBuffer = fs.readFileSync(0);

const lines = stdinBuffer
    .toString()
    .split("\n")
    .filter((a) => Boolean(a.trim()));

lines
    .flatMap((line) => {
        const m = regexLine.exec(line);
        if (m === null) {
            return [];
        }
        const item = {
            source: {
                name: "vimwiki",
                url: "https://wiki.bazadanni.com/quotelog/",
            },
            lang: "en",
            published: new Date(m[1]).toISOString(),
            content: parseContent(m[2]),
        };
        return [{ ...item, id: getItemId(item) }];
    })
    .forEach((entry) => {
        filename = `${contentDir}/${getFilename(entry.published)}.json`;
        fs.writeFileSync(filename, JSON.stringify(entry, null, 2));
    });
