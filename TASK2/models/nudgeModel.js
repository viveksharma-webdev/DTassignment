const mongoose = reqire('mongoose');

const nudgeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60,
    },
    eventOrArticle: {
        type: String,
        required: true,
        enum: ['Event', 'Article'], 
    },
    description: {
        type: String,
        required: true,
    },
    scheduledOn: {
        type: Date,
        required: true,
    },
    timings: {
        from: {
            type: String, 
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
    },
    invitationText: {
        type: String,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image', 
    },
})

module.expoerts = mongoose.model("nudge",nudgeSchema);