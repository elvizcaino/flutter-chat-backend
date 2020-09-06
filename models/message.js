const { Schema, model } = require("mongoose");


const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

MessageSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();

    //object.uid = _id;
    return object;
});

module.exports = model("Message", MessageSchema);