const mongoose = require("../../common/database")();

const colorSchema = new mongoose.Schema({

    while:{
        type: Boolean,
        default: false,
    },
    black:{
        type: Boolean,
        default: false,
    },
    yellow:{
        type: Boolean,
        default: false,
    },
    red:{
        type: Boolean,
        default: false,
    },
    blue:{
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true,
});

const ColorModel = mongoose.model("Color", colorSchema, "colors");
module.exports = ColorModel;