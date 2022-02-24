const { getUserUrl, getImageUrl } = require("./utils");

function getWebFingerContent({ username, hostname, image }) {
    return {
        subject: `acct:${username}@${hostname}`,
        aliases: [],
        links: [
            {
                rel: "self",
                type: "application/activity+json",
                href: getUserUrl({ hostname, username }),
            },
            {
                rel: "http://webfinger.net/rel/profile-page",
                type: "text/html",
                href: `https://${hostname}/@${username}`,
            },
            {
                rel: "http://webfinger.net/rel/avatar",
                href: getImageUrl(hostname, username, image),
            },
            {
                rel: "http://ostatus.org/schema/1.0/subscribe",
                template: `https://${hostname}/authorize_interaction?uri={uri}`,
            },
        ],
    };
}

module.exports = {
    getWebFingerContent: getWebFingerContent,
};
