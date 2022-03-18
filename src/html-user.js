const {
    getItemHTMLTemplate,
    getHTMLTemplate,
    getProfileItemsUrl,
} = require("./utils");

function getUserProfileContent(config, items) {
    const { username, hostname } = config;
    const body = `<ul class="h-feed">${items
        .map((item) => getItemHTMLTemplate({ ...config, item }))
        .join("\n")}</ul>`;
    return getHTMLTemplate({ ...config, title: username, body });
}

function getPagination(config, totalItems, pageNum) {
    const { username, hostname } = config;
    const lastPageIndex = Math.floor(totalItems / config.itemsPerPage);
    const result = [];
    if (pageNum !== 0) {
        if (pageNum == 1) {
            result.push(
                `<a rel="prev" href="${getProfileItemsUrl({
                    username,
                    hostname,
                    pageNum: "index",
                })}">&laquo; Previous</a>`
            );
        } else {
            result.push(
                `<a rel="prev" href="${getProfileItemsUrl({
                    username,
                    hostname,
                    pageNum: pageNum - 1,
                })}">&laquo; Previous</a>`
            );
        }
    }
    if (pageNum !== lastPageIndex) {
        result.push(
            `<a rel="next" href="${getProfileItemsUrl({
                username,
                hostname,
                pageNum: pageNum + 1,
            })}">Next &raquo;</a>`
        );
    }
    return result.join(" | ");
}

function getUserProfileContentPaginated(
    config,
    items,
    totalItems,
    currentPage
) {
    const { username, hostname } = config;
    const body = `<ul class="h-feed">${items
        .map((item) => getItemHTMLTemplate({ ...config, item }))
        .join("\n")}</ul>${getPagination(config, totalItems, currentPage)}`;
    return getHTMLTemplate({ ...config, title: username, body });
}

module.exports = {
    getUserProfileContent,
    getUserProfileContentPaginated,
};
