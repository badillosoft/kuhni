function IOProducts(socket) {
    socket.on("products", /* ... */);
}

function ConfigurableIOProducts(channel, access, /* ... */) {
    return socket => {
        socket.on(channel, /* ... access */);
    };
}

IOProducts(socket); // "products", access

ConfigurableIOProducts("kuhni@products", accessKuhni)(socket);

