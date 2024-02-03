const express = require("express");
const path = require("path");

console.log(__dirname);
const clientPath = path.join(__dirname, "/../Client/dist");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(clientPath));
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
