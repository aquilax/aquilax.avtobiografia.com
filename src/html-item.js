const { getHTMLTemplate } = require("./utils");

function getItemHTMLContent(config, item) {
    const { username, hostname, language } = config;
    const body = `<section>${item.content}</section>`;
    return getHTMLTemplate({
        ...config,
        title: item.id,
        body,
    });
}

module.exports = {
    getItemHTMLContent,
};
