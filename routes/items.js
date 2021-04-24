const express = require('express');
const router = express.Router();
const Item = require("../models/Item")


router.get("/", (req, res) => {
    res.send("hellooll")
})

router.post("/", async (req, res) => {
    const item = new Item({
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        code: req.body.code
    });

    try {
        const savedItem = await item.save()
        res.json(savedItem)
    } catch (err) {
        res.json(err)
    }
});



module.exports = router