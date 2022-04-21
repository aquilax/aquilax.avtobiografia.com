const {
    getUserHtmlProfileUrl,
    getItemHtmlUrl,
    getImageUrl,
} = require("./utils");

function getUserJF2FeedContent(config, content) {
    const { username, hostname, image } = config;

    return {
        type: "feed",
        name: username,
        url: getUserHtmlProfileUrl({ hostname, username }),
        author: {
            type: "card",
            name: username,
            url: getUserHtmlProfileUrl({ hostname, username }),
            photo: getImageUrl({ username, hostname, image }),
        },
        children: content.map((i) => ({
            type: "entry",
            uid: i.id,
            url: getItemHtmlUrl({ hostname, username, id: i.id }),
            content: {
                html: i.content,
            },
            published: i.published,
            lang: i.lang,
        })),
    };
}

module.exports = {
    getUserJF2FeedContent,
};
