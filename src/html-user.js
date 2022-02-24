const {
    getUserHtmlProfileUrl,
    getItemHtmlUrl,
    getHTMLTemplate,
} = require("./utils");

function getUserProfileContent(config, items) {
    const { username, hostname } = config;
    const body = `<section class="h-feed">${items
        .map((item) => {
            const publishedDate = new Date(item.published).toISOString();
            const content = item.content;
            return `
    <hr/>
    <div class="h-entry">
        <p>${content}</p>
        <a rel="self" class="h-card u-url u-uid p-name" href="${getUserHtmlProfileUrl(
            {
                username,
                hostname,
            }
        )}">@${username}</a>
        <a class="u-url" href="${getItemHtmlUrl({
            hostname,
            username,
            id: item.id,
        })}">
            <time datetime="${publishedDate}" class="dt-published">${publishedDate.substring(
                0,
                10
            )}</time>
        </a>
    </div>
`;
        })
        .join("\n")}</section>`;
    return getHTMLTemplate({ ...config, title: username, body });
}

module.exports = {
    getUserProfileContent,
};
