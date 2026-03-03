import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: String,
    level: { type: Number, min: 0, max: 100 },
}, { timestamps: true });

export default mongoose.model('Skill', SkillSchema);
