const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    // status should be a single string, not an array
    // type: [String],
    status: {
        type: String,
        required: true
    },
    // skills should be an array of strings
    // type: String
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            discipline: {
                type: String,
                required: true
            },
            // ❌ Incorrect usage: string: Date
            // string: Date,
            from: {
                type: Date,
                required: true
            },
            // string: Date
            to: {
                type: Date
            },
            // string: Boolean,
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        // x is unclear – rename to twitter for clarity
        // x: {
        //     type: String
        // },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// ❌ Non-standard and redundant
// module.exports =Profile= mongoose.model('profile', ProfileSchema);

module.exports = mongoose.model('profile', ProfileSchema);
