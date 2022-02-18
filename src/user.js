function getUserContent({ username, hostname, ...config }) {
  return {
    "@context": [
      "https://www.w3.org/ns/activitystreams",
      "https://w3id.org/security/v1",
      {
        manuallyApprovesFollowers: "as:manuallyApprovesFollowers",
        toot: "http://joinmastodon.org/ns#",
        featured: {
          "@id": "toot:featured",
          "@type": "@id",
        },
        featuredTags: {
          "@id": "toot:featuredTags",
          "@type": "@id",
        },
        alsoKnownAs: {
          "@id": "as:alsoKnownAs",
          "@type": "@id",
        },
        movedTo: {
          "@id": "as:movedTo",
          "@type": "@id",
        },
        schema: "http://schema.org#",
        PropertyValue: "schema:PropertyValue",
        value: "schema:value",
        IdentityProof: "toot:IdentityProof",
        discoverable: "toot:discoverable",
        Device: "toot:Device",
        Ed25519Signature: "toot:Ed25519Signature",
        Ed25519Key: "toot:Ed25519Key",
        Curve25519Key: "toot:Curve25519Key",
        EncryptedMessage: "toot:EncryptedMessage",
        publicKeyBase64: "toot:publicKeyBase64",
        deviceId: "toot:deviceId",
        claim: {
          "@type": "@id",
          "@id": "toot:claim",
        },
        fingerprintKey: {
          "@type": "@id",
          "@id": "toot:fingerprintKey",
        },
        identityKey: {
          "@type": "@id",
          "@id": "toot:identityKey",
        },
        devices: {
          "@type": "@id",
          "@id": "toot:devices",
        },
        messageFranking: "toot:messageFranking",
        messageType: "toot:messageType",
        cipherText: "toot:cipherText",
        suspended: "toot:suspended",
        focalPoint: {
          "@container": "@list",
          "@id": "toot:focalPoint",
        },
      },
    ],
    id: `https://${hostname}/users/${username}`,
    type: "Person",
    following: "https://${hostname}/users/${username}/following",
    followers: "https://${hostname}/users/${username}/followers",
    inbox: "https://${hostname}/users/${username}/inbox",
    outbox: "https://${hostname}/users/${username}/outbox",
    featured: "https://${hostname}/users/${username}/collections/featured",
    featuredTags: "https://${hostname}/users/${username}/collections/tags",
    preferredUsername: username,
    name: username,
    summary: config.summary,
    url: `https://${hostname}/@${username}`,
    manuallyApprovesFollowers: false,
    discoverable: true,
    devices: `https://${hostname}/users/${username}/collections/devices`,
    publicKey: {
      id: `https://${hostname}/users/${username}#main-key`,
      owner: `https://${hostname}/users/${username}`,
      publicKeyPem: config.publicKeyPem,
    },
    tag: [],
    attachment: [
      {
        type: "PropertyValue",
        name: "Bio",
        value: config.bio,
      },
    ],
    endpoints: {
      sharedInbox: `https://${hostname}/inbox`,
    },
    icon: {
      type: "Image",
      mediaType: "image/jpeg",
      url: config.image,
    },
    image: {
      type: "Image",
      mediaType: "image/jpeg",
      url: config.image,
    },
  };
}

module.exports = {
  getUserContent: getUserContent,
};
