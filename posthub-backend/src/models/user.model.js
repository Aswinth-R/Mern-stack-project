import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, 'Please enter username'],
        lowercase: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        lowercase: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxlength: 30
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: 6,
        maxlength: 50
    },
    role: {
     type: String,
     default: "user"
    }

},{ timestamps: true });

// before saving any password we need to hash it
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);

});

// compare the passwords
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;  // this was authenticate model