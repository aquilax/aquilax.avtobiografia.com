const { getHTMLTemplate, getItemHTMLTemplate } = require("./utils");

function getItemHTMLContent(config, item) {
    const body = `<ul class="h-feed">${getItemHTMLTemplate({
        ...config,
        item,
    })}</ul>`;
    return getHTMLTemplate({
        ...config,
        title: item.id,
        body,
    });
}

module.exports = {
    getItemHTMLContent,
};
