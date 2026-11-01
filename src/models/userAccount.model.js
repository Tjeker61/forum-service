import {Schema, model} from 'mongoose';
import {ADMIN, MODERATOR, USER} from '../configuration/constants.js';
import bcrypt from "bcrypt";

const userAccountSchema = new Schema({
    _id: {
        type: String,
        required: true,
        alias: 'login'
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    roles: {
        type: [{
            type: String,
            enum: [ADMIN, MODERATOR, USER],
            uppercase: true
        }],
        default: [USER]
    }
}, {
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            ret.login = doc._id;
            delete ret._id;
            delete ret.password;
        }
    }
});

userAccountSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
})

userAccountSchema.methods.comparePassword = async function(plainText) {
    return bcrypt.compare(plainText, this.password);
}

export default model('UserAccount', userAccountSchema, 'users');
