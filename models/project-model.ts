import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  details: { type: String, required: false },
  repoLink: { type: String, required: false },
  images: { type: [String], required: true },
  techStack: { type: [String], required: true },
  tags: { type: [String], required: false },
  devPhase: {
    startDate: { type: Date, required: false },
    endDate: { type: Date, required: false },
    status: { type: String, required: false },
  },
  postedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
