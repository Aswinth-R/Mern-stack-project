import mongoose,{Schema} from "mongoose";

const postSchema = new Schema ({
    name: {
        type: String,
        required: [true,'Please enter name'],
        trim: true
    },
    description: {
        type: String,
        required: [true,'Please enter description'],
        trim: true
    },

    age: {
        type: Number,
        required: [true,'Please enter age'],
        min: 1,
        max: 150
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    },
    {
    timestamps: true
    })

    const Post = mongoose.model("Post", postSchema);

export {
    Post
}