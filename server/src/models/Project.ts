import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    stack: [String],
    liveUrl: String,
    githubUrl: String,
    status: { type: String, enum: ['LIVE', 'CLASSIFIED', 'COMPLETED', 'ARCHIVED'], default: 'LIVE' },
    image: String,
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
