const api = require('mikronode');

const connection = new api('192.168.0.103', 'admin', '');

connection.connect(function (conn) {

    console.log("connected");

    conn.closeOnDone(true);

    const chan = conn.openChannel();

    chan.write('/ip/address/print', function () {
        console.log("print");

        chan.on('done', function (data) {

            const parsed = api.parseItems(data);

            parsed.forEach(function (item) {
                console.log('Interface/IP: ' + item.interface + "/" + item.address);
            });

            // chan.close();
            // conn.close();

        });
    });
});
setTimeout(() => {}, 1000);