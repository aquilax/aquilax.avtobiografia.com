const { getOutboxUrl, getFollowersUrl, getOutboxItemsUrl } = require("./utils");

function getItem(item, config) {
    const { username, hostname } = config;
    const itemId = item.id;
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

function getOutboxItemsContent(config, items, totalItems, pageNum) {
    const { username, hostname } = config;
    const lastPageIndex = Math.floor(totalItems / config.itemsPerPage);
    const pagination = {};
    if (pageNum !== lastPageIndex) {
        pagination.next = getOutboxItemsUrl({
            username,
            hostname,
            pageNum: pageNum + 1,
        });
    }
    if (pageNum !== 0) {
        pagination.prev = getOutboxItemsUrl({
            username,
            hostname,
            pageNum: pageNum - 1,
        });
    }
    if (lastPageIndex !== 0) {
        pagination.first = getOutboxItemsUrl({
            username,
            hostname,
            pageNum: 0,
        });
        pagination.last = getOutboxItemsUrl({
            username,
            hostname,
            pageNum: lastPageIndex,
        });
        pagination.current = getOutboxItemsUrl({
            username,
            hostname,
            pageNum: pageNum,
        });
    }
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
        id: getOutboxItemsUrl({ username, hostname, pageNum }),
        type: "OrderedCollectionPage",
        partOf: getOutboxUrl({ username, hostname }),
        ...pagination,
        orderedItems: [items.map((i) => getItem(i, config))],
    };
}

function getOutboxContent(config, items) {
    const lastPageIndex = Math.floor(items.length / config.itemsPerPage);
    return {
        "@context": "https://www.w3.org/ns/activitystreams",
        id: getOutboxUrl(config),
        type: "OrderedCollection",
        totalItems: items.length,
        first: getOutboxItemsUrl({ ...config, pageNum: 0 }),
        last: getOutboxItemsUrl({ ...config, pageNum: lastPageIndex }),
    };
}

module.exports = {
    getOutboxItemsContent,
    getOutboxContent,
};
