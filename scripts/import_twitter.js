var fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const getItemId = (item) =>
    crypto.createHash("md5").update(item.content).digest("hex");

const root = path.resolve(`${process.cwd()}`);
const contentDir = path.resolve(`${root}/content`);

urlRegex = /(https?:\/\/[^\s]+)/g;

const parseContent = (content) =>
    content.replace(
        urlRegex,
        (url) =>
            `<a href="${url}" rel="nofollow noopener noreferrer">${url}</a>`
    );

const getFilename = (date) => date.replace(/[^\dZ]/g, "-");

const fixLanguage = (lang) => (["ru", "und"].includes(lang) ? "bg" : lang);

const fileName = process.argv[2];
const rawData = fs.readFileSync(fileName);
const tweets = JSON.parse(rawData);

const username = "aquilax";

tweets
    .filter((t) => !t.tweet.retweeted && !t.tweet.full_text.startsWith("RT @"))
    .map((t) => {
        item = {
            source: {
                name: "twitter",
                url: `https://twitter.com/${username}/status/${t.tweet.id_str}`,
            },
            lang: fixLanguage(t.tweet.lang),
            published: new Date(t.tweet.created_at).toISOString(),
            content: parseContent(t.tweet.full_text),
        };
        return { ...item, id: getItemId(item) };
    })
    .forEach((entry) => {
        filename = `${contentDir}/${getFilename(entry.published)}.json`;
        fs.writeFileSync(filename, JSON.stringify(entry, null, 2));
    });
