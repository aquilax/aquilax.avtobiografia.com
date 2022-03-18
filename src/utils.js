const getUserJsonFeedUrl = ({ username, hostname }) =>
    `https://${hostname}/@${username}/feed.json`;

const getUserHtmlProfileUrl = ({ hostname, username }) =>
    `https://${hostname}/@${username}`;

const getItemHtmlUrl = ({ hostname, username, id }) =>
    `https://${hostname}/@${username}/item/${id}.html`;

const getImageUrl = ({ hostname, username, image }) =>
    `https://${hostname}/image/${username}/${image}`;

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
    <style>
        body{font-family: Verdana, Geneva, Tahoma, sans-serif; background: #cece;}
        header{background: #fff; padding: .4em}
        .wrapper{max-width:40em; margin:0 auto;}
        ul.h-feed{padding: 0}
        ul.h-feed li{list-style:none; border-bottom: 1px solid #cecece; margin-bottom: 1em; padding: .4em; background:#fff}
        ul.h-feed li .row{display:flex; gap: 1em}
        ul.h-feed li .row p{margin-top:0}
        .row p {overflow: hidden; text-overflow: ellipsis; line-height:1.4em}
        .meta {font-size:.8em}
    </style>
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

function getItemHTMLTemplate({ username, hostname, image, item }) {
    const publishedDate = new Date(item.published).toISOString();
    const humanDate = publishedDate.substring(0, 10);
    const content = item.content;

    return `
    <li class="h-entry" id="post-id-${item.id}">
        <div class="row">
            <div class="author u-author h-card">
                <a href="${getUserHtmlProfileUrl({
                    username,
                    hostname,
                })}" class="u-url">
                    <img class="u-photo p-name" src="${getImageUrl({
                        username,
                        hostname,
                        image,
                    })}" width="48" alt="${username}"/>
                </a>
            </div>
            <p lang=${item.lang}>${content}</p>
        </div>
        <div class="meta">
            <a rel="self" class="h-card u-url u-uid p-name" href="${getUserHtmlProfileUrl(
                {
                    username,
                    hostname,
                }
            )}">@${username}</a>
            |
            <a class="u-url" href="${getItemHtmlUrl({
                hostname,
                username,
                id: item.id,
            })}">
                <time datetime="${publishedDate}" class="dt-published">${humanDate}</time>
            </a>
            |
            #<a href="${item.source.url}" rel="nofollow noopener noreferrer">${
        item.source.name
    }</a>
        </div>
    </li>`;
}

module.exports = {
    getUserUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/index.json`,
    getOutboxUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/outbox/index.json`,
    getOutboxItemsUrl: ({ username, hostname, pageNum }) =>
        `https://${hostname}/users/${username}/outbox/${pageNum}.json`,
    getProfileItemsUrl: ({ username, hostname, pageNum }) =>
        `https://${hostname}/@${username}/${pageNum}.html`,
    getInboxUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/inbox/index.json`,
    getFollowersUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/followers/index.json`,
    getFollowingUrl: ({ username, hostname }) =>
        `https://${hostname}/users/${username}/following/index.json`,
    getImageUrl,
    getUserHtmlProfileUrl,
    getHTMLTemplate,
    getItemHTMLTemplate,
    getUserJsonFeedUrl,
    getItemHtmlUrl,
};
