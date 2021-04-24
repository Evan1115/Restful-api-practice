const express = require('express');
const router = express.Router();
const Item = require("../models/Item")


router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.json(err);
    }
});

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

//specific route
router.get("/:itemId", async (req, res) => {
    try {
        const query = { "id": req.params.itemId };
        const item = await Item.findOne(query)
        res.json(item)
    } catch (err) {
        res.json(err)
    }
})



module.exports = router