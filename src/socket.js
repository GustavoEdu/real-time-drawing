module.exports = io => {
    let data = []
    let users = 0;
    io.on("connection", socket => {
        for(data_element of data) {
            io.emit("show_drawing", data_element);
        }

        users++;
        io.emit("users", users);

        socket.on("delete", () => {
            data = [];
            io.emit("show_drawing", null);
        });
        socket.on("drawing", drawing => {
            data.push(drawing);
            io.emit("show_drawing", drawing);
        });

        socket.on("disconnect", () => {
            users--;
            io.emit("users", users);
        });
    });
}