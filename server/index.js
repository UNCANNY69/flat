const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Flatmodel = require('./models/Flat');

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Flat", { useNewUrlParser: true });

app.post("/insert", async (req, res) => {
    const POSTED_BY = req.body.POSTED_BY;
    const UNDER_CONSTRUCTION = req.body.UNDER_CONSTRUCTION;
    const BHK_NO = req.body.BHK_NO;
    const SQUARE_FT = req.body.SQUARE_FT;
    const ADDRESS = req.body.ADDRESS;
    const TARGET_PRICE = req.body.TARGET_PRICE;
    const City = req.body.City;
    const data = new Flatmodel({
        POSTED_BY: POSTED_BY,
        UNDER_CONSTRUCTION: UNDER_CONSTRUCTION,
        BHK_NO: BHK_NO,
        SQUARE_FT: SQUARE_FT,
        ADDRESS: ADDRESS,
        TARGET_PRICE: TARGET_PRICE,
        City: City
    })
    try {
        data.save();
        res.send("inserted data");
    } catch (error) {
        console.error(error);
    }
});

app.put("/update", async (req, res) => {
    // const POSTED_BY = req.body.newPOSTED_BY;
    // const UNDER_CONSTRUCTION = req.body.UNDER_CONSTRUCTION;
    // const BHK_NO = req.body.BHK_NO;
    // const SQUARE_FT = req.body.SQUARE_FT;
    // const ADDRESS = req.body.ADDRESS;
    const TARGET_PRICE = req.body.newTarget_price;
    // const City = req.body.City;
    const id = req.body.id;
    try {
        await Flatmodel.findById(id, (err, updated) => {
           updated.TARGET_PRICE = TARGET_PRICE;
           updated.save();
           res.send("updtae");
        })
    } catch (err) {
        console.error(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await Flatmodel.findByIdAndRemove(id).exec();
    res.send(id);
})

app.get("/read", async (req, res) => {
     Flatmodel.find({}, (err, result) => { //{$where:{POSTED_BY: "User_id"}
        if (err) {
            res.send(err)
        }
        return res.send(result)
    });
});

app.listen(3001, () => {
    console.log('listening on 3001..')
});