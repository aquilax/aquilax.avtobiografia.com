const { getItemHtmlUrl } = require("./utils");

function getSitemapContent(config, content) {
    const { username, hostname } = config;

    const getItemMarkup = (item) =>
        `<url><loc>${getItemHtmlUrl({
            hostname,
            username,
            id: item.id,
        })}</loc><lastmod>${new Date(item.published)
            .toISOString()
            .substring(0, 10)}</lastmod></url>`;

    return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${content.map(getItemMarkup).join("")}
  </urlset>`;
}

module.exports = {
    getSitemapContent,
};
