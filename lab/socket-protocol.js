// Crear una librería para transmitir mensajes entre nodos socket

// API Socket

const io = socket_io();

io.on("connection", socket => {

    socket.on("login", async (protocol, callback) => {
        const { user, password } = protocol;

        const token = await db.login(user, password);

        if (!token) {
            callback({ error: true, message: `Invalid credentials (${user})` })
            return;
        }

        callback({ error: null, result: { user, token } });
    });

    socket.on("products", async (protocol, callback) => {
        const { query, token } = protocol;

        const response = await access(token);

        if (response.deny) {
            await response.deny(callback);
            return;
        }

        const products = await db.products(query);

        callback({ result: products});
    });

});

// WEB
socket.emit("login", { user, password }, response => {
    if (response.error) {
        console.log(response.message);
        return;
    }
    console.log(response.result.token);
});

socket.emit("products", { query: { nombre: { $startsWidth: "coca" } }, token }, response => {
    if (response.error) {
        console.log(response.message);
        return;
    }
    console.log(response.result.products);
});