module.exports = {
    getHostMetaContent: ({
        hostname,
    }) => `<?xml version="1.0" encoding="UTF-8"?>
    <XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
      <Link rel="lrdd" template="https://${hostname}/.well-known/webfinger?resource={uri}"/>
    </XRD>
    `,
};
