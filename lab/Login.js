function IOLogin(socket) {
    socket.on("login", async (protocol, callback) => {
        const { user, password } = protocol;

        const token = await db.login(user, password);

        if (!token) {
            callback({ error: true, message: `Invalid credentials (${user})` })
            return;
        }

        callback({ error: null, result: { user, token } });
    });
}

function APILogin(router) {
    router.post("/login", async (req, res) => {
        const { user, password } = req.body;

        const token = await db.login(user, password);

        if (!token) {
            res.send({ error: true, message: `Invalid credentials (${user})` })
            return;
        }

        res.send({ error: null, result: { user, token } });
    });
}

function Login(handler, ...params) {
    return handler === "io" ? IOLogin(...params) : APILogin(...params);
}

// Login("io", socket)
// Login("api", router)