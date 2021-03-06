const {
    getUserHtmlProfileUrl,
    getUserJsonFeedUrl,
    getItemHtmlUrl,
} = require("./utils");

function getUserFeedContent(config, content) {
    const { username, hostname, language } = config;

    return {
        version: "https://jsonfeed.org/version/1.1",
        title: username,
        language: language,
        home_page_url: getUserHtmlProfileUrl({ hostname, username }),
        feed_url: getUserJsonFeedUrl({ username, hostname }),
        authors: {
            name: username,
            url: getUserHtmlProfileUrl({ hostname, username }),
        },
        items: content.map((i) => ({
            id: i.id,
            content_html: i.content,
            url: getItemHtmlUrl({ hostname, username, id: i.id }),
            date_published: i.published,
            language: i.lang,
        })),
    };
}

module.exports = {
    getUserFeedContent,
};
