const express = require('express');
const router = express.Router();
const Item = require("../models/Item")


router.get("/discount/all", async (req, res) => {
    try {
        const items = await Item.find()

        let itemsObj = []
        items.forEach(item => {
            const discountPrice = calculateDiscountPrice(item)

            const afterItem = {
                Discountcode: item.code,
                DiscountPrice: discountPrice,
                ItemID: item.id,
                ItemName: item.name,
                ItemPrice: item.price
            }
            itemsObj.push(afterItem)
        });

        res.json(itemsObj)
    } catch (err) {
        res.json(err)
    }
})

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

//calculate discount price for specific item
router.get("/discount/:itemId", async (req, res) => {
    try {
        const query = { "id": req.params.itemId };
        const item = await Item.findOne(query)
        const discountPrice = calculateDiscountPrice(item)

        const afterItem = {
            Discountcode: item.code,
            DiscountPrice: discountPrice,
            ItemID: item.id,
            ItemName: item.name,
            ItemPrice: item.price
        }

        res.json(afterItem)
    } catch (err) {
        res.json(err)
    }
});




//function to calculate discount price
const calculateDiscountPrice = (item) => {

    let discountPrice;
    console.log(item.code)
    switch (item.code) {
        case "A01":
            discountPrice = item.price * 80 / 100
            break;
        case "A02":
            discountPrice = item.price * 70 / 100
            break;
        case "A03":
            discountPrice = item.price * 60 / 100
            break;
        default:
            break;
    }

    return discountPrice

}





module.exports = router