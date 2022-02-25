const getUserJsonFeedUrl = ({ username, hostname }) =>
    `https://${hostname}/@${username}/feed.json`;

const getUserHtmlProfileUrl = ({ hostname, username }) =>
    `https://${hostname}/@${username}`;

const getItemHtmlUrl = ({ hostname, username, id }) =>
    `https://${hostname}/@${username}/${id}.html`;

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
    <style>.wrapper{max-width:40em; margin:0 auto; line-height: 1.2em}</style>
</head>
<body>
    <div class="wrapper">
        <header>
            <h1>
                <a href="${getUserHtmlProfileUrl({ hostname, username })}">
                    ${username}
                </a>
            </h1>
            <small>@${username}@${hostname}</small>
        </header>
        ${body}
    <div class="wrapper">
</body>
</html>`;
}

function getItemHTMLTemplate({ username, hostname, item }) {
    const publishedDate = new Date(item.published).toISOString();
    const humanDate = publishedDate.substring(0, 10);
    const content = item.content;

    return `<hr/>
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
            <time datetime="${publishedDate}" class="dt-published">${humanDate}</time>
        </a>
    </div>
`;
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
    getUserHtmlProfileUrl,
    getHTMLTemplate,
    getItemHTMLTemplate,
    getUserJsonFeedUrl,
    getItemHtmlUrl,
};
