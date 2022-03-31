// https://twtxt.readthedocs.io/en/latest/index.html
const {
    getImageUrl,
    getUserHtmlProfileUrl,
    getTwTxtFeedUrl,
} = require("./utils");

function itemToTwTxt(item) {
    return `${item.published}\t${item.content
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/\n/, " ")
        .trim()}`;
}

function getUserTwTxtFeedContent(config, content) {
    const { username } = config;
    const header = [
        `# nick = ${username}`,
        `# avatar = ${getImageUrl(config)}`,
        `# url = ${getTwTxtFeedUrl(config)}`,
        `# link = HTML Feed ${getUserHtmlProfileUrl(config)}`,
    ];
    return [...header, "", ...content.map(itemToTwTxt)].join("\n");
}

module.exports = {
    getUserTwTxtFeedContent,
};
