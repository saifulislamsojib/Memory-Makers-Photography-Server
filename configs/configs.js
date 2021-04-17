require('dotenv').config();

module.exports = {
    type: "service_account",
    project_id: "memory-makers-photography",
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: `-----BEGIN PRIVATE KEY-----\n${process.env.PRIVATE_KEY}\n${process.env.PRIVATE_KEY_TOW}\n${process.env.PRIVATE_KEY_THREE}\n${process.env.PRIVATE_KEY_FOUR}\n${process.env.PRIVATE_KEY_FIVE}\n${process.env.PRIVATE_KEY_SIX}\n${process.env.PRIVATE_KEY_SEVEN}\n${process.env.PRIVATE_KEY_EIGHT}\n${process.env.PRIVATE_KEY_NINE}\n${process.env.PRIVATE_KEY_TEN}\ngW1Go9G5bBJBvb2tArAi/WBpAmcw+A0BztxT6BpE7nYe6QzcVf+EpWcbtHsHHoTx\nf+/aeh2I5Rj2jnHWLvYHfX9WLLYl3EJ4brr3tAPllQKBgQDjxCDiCCAGPl4VLzHG\nlCwYN3JSZm2XMqezVu5rffKsnsvGgPahoIIMDHqTvQKdrXAGI8pDvPeuJMeWFoRO\nQtC3438ybxLT5VrlgJZ4TOt6rJ9S4bpwR2A7ddxXi7mpUQgH4uvUEeC5bgfhCE8t\nqH1LrmlJAKTdrGg9iETaUP9yFQKBgQDEBKHjWPN89yzXvcPZ1yrKG5SXxvFHAZ80\ndxx0N5W+MJcsrxg1QxHgLYUrj3fEItdleU064xx8XSNRnabk/H+S5p1uWM6PyYN0\ns7Mx2TRZxKCjfRIF5pdXRVHoPD5GSyYmZqGNvKO0VPUUvbpJBkQ+o1cBjsLXCikl\nH4oXiltVdQKBgQCmsluSsnmluC2peYIHoVhoXORJ1Hduyn8cbYpPl71tg0cGwEpB\nXrTvVo675ACvIEm15KnbS8lGZdrBSTeKA7K4c0MbyVlRRjJxd9worbtGbGKrCVQn\nasXOnuMmG7hFaG3lP7pz2qXLcPFJTIiOlRsmsb6S1GrVZqJgLoSd99wNRQKBgDPO\naZ71vnyzszVd4Sps9NEv0uj+WnyC0DoElQ+eNURsATh9Gm/RRyMxxLWLmILNFpKq\nKaA7sCaqUxBaE2cH2QvRSaCFdiqIfubUK7MsDer/zdkH0ECg/jTBjHFNosPfTrjt\nfRtB1R5vKcsOjfKI5naLow41VgeRluhJ2qx4E8WVAoGATYDA1A0z+5G+QysL+u3o\nFhQi5VQuYSLRA0B2kxHf3XonbwdcXM0zxoYEYidLsvv0o9j1/HIvyiIQDxzSq5aO\n9Ms4c5r0e6CLAae5TjnEoPoM0f3pRzRyQlB1wD+/NJhslZQgrRyAv4+l5kb5Z3ME\nBUuA/cjGondridxXVR+5zWA=\n-----END PRIVATE KEY-----\n`,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.CLIENT_CERT_URL
};