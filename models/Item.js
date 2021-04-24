const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    code: String
});

module.exports = mongoose.model("Items", ItemSchema);