import mongoose from "mongoose";
import dotenv from "dotenv";

const { connect, Schema, model } = mongoose;

// connection
dotenv.config();
await connect(process.env.MONGODB_URI);

// schema
const BookSchema = Schema({
    title: String,
    courses: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const CourseSchema = Schema({
    title: String,
});

// model
const Book = model("Book", BookSchema);
const Course = model("Course", CourseSchema);

// data
const course1 = await Course.create({
    title: "MongoDB",
});

const course2 = await Course.create({
    title: "Node.js",
});

const course3 = await Course.create({
    title: "Express",
});

const course4 = await Course.create({
    title: "JavaScript",
});

const course5 = await Course.create({
    title: "React",
});

const book = await Book.create({
    title: "MERN Cook book",
    courses: [course1._id, course2._id, course3._id, course4._id, course5._id],
});

const updatedBook = await Book.findOne().populate("courses");
console.log(updatedBook);
