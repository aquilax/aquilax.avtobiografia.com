function getWebFingerContent({ username, hostname }) {
  return {
    subject: `acct:${username}@${hostname}`,
    aliases: [`${hostname}/users/${username}`],
    links: [
      {
        rel: "http://webfinger.net/rel/profile-page",
        type: "text/html",
        href: `https://${hostname}/@${username}`,
      },
      {
        rel: "self",
        type: "application/activity+json",
        href: `https://${hostname}/users/${username}`,
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
