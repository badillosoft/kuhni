async function getUsers(query) {
    return /* ... */;
}

function handler() {

}

function IOUsuarios(socket) {
    socket.on("users", async (protocol, callback) => {
        const { query } = protocol;

        callback(await getUsers(query));
    });
}

function APIUsuarios(router) {
    router.get("/users", async (req, res) => {
        const { query } = req.body;

        res.send(await getUsers(query));
    });
}

function IOUsuarios(socket) {
    iofy(socket)
    .channel("users")
    .protocol(({ query }) => {
        return await getUsers(query);
    })
    .done();
}

function APIUsuarios(router) {
    restify(router)
    .channel("/users")
    .protocol(({ query }) => {
        return await getUsers(query);
    })
    .done();
}

function Usuarios(controller, ...params) {
    // const controllers = {
    //     "io": iofy,
    //     "rest": restify
    // };

    return cfy(controller, ...params)
        .channel("/users")
        .protocol(({ query }) => {
            return await getUsers(query);
        })
        .done();
}