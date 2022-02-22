const crypto = require("crypto");

function getItemId(item) {
    return crypto.createHash("md5").update(item.content).digest("hex");
}

function prepareItem(item) {
    return { id: getItemId(item), ...item };
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
    getUserJsonFeedUrl: ({ username, hostname }) =>
        `https://${hostname}/@${username}/feed.json`,

    prepareItem,
};
