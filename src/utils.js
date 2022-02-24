const getUserJsonFeedUrl = ({ username, hostname }) =>
    `https://${hostname}/@${username}/feed.json`;

function getHTMLTemplate({
    language,
    username,
    profilePage,
    hostname,
    body,
    title,
}) {
    return `<!DOCTYPE html>
<html lang="${language}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width initial-scale=1">
    <title>${title}</title>
    <link rel="me" href="${profilePage}" />
    <link rel="alternate" title="${username}" type="application/feed+json" href="${getUserJsonFeedUrl(
        { username, hostname }
    )}" />
</head>
<body>
    <header>
        <h1>${username}<small>@${username}@${hostname}</small></h1>
    </header>
    ${body}
</body>
</html>`;
}

module.exports = {
    getUserUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/index.json`,
    getOutboxUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/outbox/index.json`,
    getOutboxItemsUrl: ({ username, hostname, pageNum }) =>
        `https://${hostname}/users/${username}/outbox/${pageNum}.json`,
    getInboxUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/inbox/index.json`,
    getFollowersUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/followers/index.json`,
    getFollowingUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/following/index.json`,
    getImageUrl: ({ hostname, username, image }) =>
        `https://${hostname}/image/${username}/${image}`,
    getUserHtmlProfileUrl: ({ hostname, username }) =>
        `https://${hostname}/@${username}`,
    getItemHtmlUrl: ({ hostname, username, id }) =>
        `https://${hostname}/@${username}/${id}.html`,
    getHTMLTemplate,
    getUserJsonFeedUrl,
};
