const { getUserHtmlProfileUrl, getUserJsonFeedUrl } = require("./utils");

function getUserProfileContent(config, items) {
    const { username, hostname, language } = config;
    return `<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width initial-scale=1">
    <title>${username}</title>
    <link rel="alternate" title="${username}" type="application/feed+json" href="${getUserJsonFeedUrl(
        { username, hostname }
    )}" />
</head>
<body>
    <h1>
        ${username}
        <small>
            @${username}@${hostname}
        </small>
    </h1>
    <section class="h-feed">${items
        .map((item) => {
            const publishedDate = new Date(item.published).toISOString();
            const content = item.content;
            return `
    <hr/>
    <div class="h-entry">
        <p>${content}</p>
        <a rel="self" href="${getUserHtmlProfileUrl({
            username,
            hostname,
        })}">@${username}</a>
        <time datetime="${publishedDate}" class="dt-published">${publishedDate.substring(
                0,
                10
            )}</time>
    </div>
`;
        })
        .join("\n")}</section>
</body>
</html>`;
}

module.exports = {
    getUserProfileContent,
};
