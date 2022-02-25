const { getHTMLTemplate, getItemHTMLTemplate } = require("./utils");

function getItemHTMLContent(config, item) {
    const { username, hostname } = config;
    const body = `<section>${getItemHTMLTemplate({
        username,
        hostname,
        item,
    })}</section>`;
    return getHTMLTemplate({
        ...config,
        title: item.id,
        body,
    });
}

module.exports = {
    getItemHTMLContent,
};
