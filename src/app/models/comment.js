const mongoose = require("../../common/database")();

const commentSchema = mongoose.Schema({
        rating:{
            type:Number,
            default:5,
        },
        full_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        prd_id: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model("Comment", commentSchema, "comments");
module.exports = CommentModel;
