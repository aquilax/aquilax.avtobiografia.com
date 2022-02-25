const { getItemHTMLTemplate, getHTMLTemplate } = require("./utils");

function getUserProfileContent(config, items) {
    const { username, hostname } = config;
    const body = `<section class="h-feed">${items
        .map((item) => getItemHTMLTemplate({ username, hostname, item }))
        .join("\n")}</section>`;
    return getHTMLTemplate({ ...config, title: username, body });
}

module.exports = {
    getUserProfileContent,
};
