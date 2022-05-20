const {
    getUserHtmlProfileUrl,
    getUserAtomFeedUrl,
    getItemHtmlUrl,
    escapeHtml,
} = require("./utils");

function getUserAtomFeedContent(config, content) {
    const { username, hostname, language } = config;
    const lastPublished = content
        .map((c) => c.published)
        .sort()
        .pop();

    return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
	<title>${username}</title>
	<id>${getUserHtmlProfileUrl({ hostname, username })}</id>
	<link rel="alternate" href="${getUserHtmlProfileUrl({ hostname, username })}"/>
	<link href="${getUserAtomFeedUrl({ username, hostname })}" rel="self"/>
	<updated>${lastPublished}</updated>
	<author>
		<name>${username}</name>
	</author>
${content
    .map((i) => {
        const url = getItemHtmlUrl({
            hostname,
            username,
            id: i.id,
        });
        return `	<entry>
		<title>${i.published}</title>
		<link rel="alternate" type="text/html" href="${url}"/>
		<id>${url}</id>
		<published>${i.published}</published>
		<updated>${i.published}</updated>
		<content type="html">${escapeHtml(i.content)}</content>
	</entry>`;
    })
    .join("\n")}

</feed>`;
}
module.exports = {
    getUserAtomFeedContent,
};
