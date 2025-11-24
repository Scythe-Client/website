import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  shortDescription: string;
  content: string;
  backgroundImage?: string;
  tag?: string;
  author: string;
  readTime: string;
}

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    backgroundImage: { type: String, default: "" },
    tag: { type: String, default: "Announcement" },
    author: { type: String, required: true },
    readTime: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
