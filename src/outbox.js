const { getOutboxUrl, getFollowersUrl, getOutboxItemsUrl } = require("./utils");
const crypto = require("crypto");

function getItemId(item) {
    return crypto.createHash("md5").update(item.content).digest("hex");
}

function getItem(item, config) {
    const { username, hostname } = config;
    const itemId = getItemId(item);
    const itemSensitive = item.sensitive || false;
    const publishedDate = new Date(item.published).toISOString();
    const content = item.content;

    return {
        id: `https://${hostname}/users/${username}/statuses/${itemId}/activity`,
        type: "Create",
        actor: "https://mastodon.cloud/users/aquilax",
        published: publishedDate,
        to: ["https://www.w3.org/ns/activitystreams#Public"],
        cc: [getFollowersUrl({ hostname, username })],
        object: {
            id: `https://${hostname}/users/${username}/statuses/${itemId}`,
            type: "Note",
            summary: null,
            inReplyTo: null,
            published: publishedDate,
            url: `https://${hostname}/@${username}/${itemId}`,
            attributedTo: `https://${hostname}/users/${username}`,
            to: ["https://www.w3.org/ns/activitystreams#Public"],
            cc: [getFollowersUrl({ hostname, username })],
            sensitive: itemSensitive,
            atomUri: `https://${hostname}/users/${username}/statuses/${itemId}`,
            inReplyToAtomUri: null,
            conversation: `tag:${hostname},${publishedDate}:objectId=c-${itemId}:objectType=Conversation`,
            content: content,
            contentMap: { en: content },
            attachment: [],
            tag: [],
            replies: null,
        },
    };
}

function getOutboxItemsContent(config, items) {
    const { username, hostname } = config;

    return {
        "@context": [
            "https://www.w3.org/ns/activitystreams",
            {
                ostatus: "http://ostatus.org#",
                atomUri: "ostatus:atomUri",
                inReplyToAtomUri: "ostatus:inReplyToAtomUri",
                conversation: "ostatus:conversation",
                sensitive: "as:sensitive",
                toot: "http://joinmastodon.org/ns#",
                votersCount: "toot:votersCount",
                blurhash: "toot:blurhash",
                focalPoint: {
                    "@container": "@list",
                    "@id": "toot:focalPoint",
                },
                Hashtag: "as:Hashtag",
            },
        ],
        id: getOutboxItemsUrl({ username, hostname }),
        type: "OrderedCollectionPage",
        partOf: getOutboxUrl({ username, hostname }),
        orderedItems: [items.map((i) => getItem(i, config))],
    };
}

function getOutboxContent(config, items) {
    return {
        "@context": "https://www.w3.org/ns/activitystreams",
        id: getOutboxUrl(config),
        type: "OrderedCollection",
        totalItems: items.length,
        first: getOutboxItemsUrl(config),
    };
}

module.exports = {
    getOutboxItemsContent,
    getOutboxContent,
};
