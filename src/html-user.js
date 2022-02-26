const { getItemHTMLTemplate, getHTMLTemplate } = require("./utils");

function getUserProfileContent(config, items) {
    const { username, hostname } = config;
    const body = `<ul class="h-feed">${items
        .map((item) => getItemHTMLTemplate({ ...config, item }))
        .join("\n")}</ul>`;
    return getHTMLTemplate({ ...config, title: username, body });
}

module.exports = {
    getUserProfileContent,
};
