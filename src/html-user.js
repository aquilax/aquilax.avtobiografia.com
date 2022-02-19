function getUserProfileContent(config, items) {
    const { username, hostname } = config;
    return `<!DOCTYPE html>
<html>
<head>
    <title>${username}</title>
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
        <div class="dt-published">${publishedDate}</div>
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
