import mongoose from "mongoose";
import dotenv from "dotenv";

const { connect, Schema, model } = mongoose;

// connection
dotenv.config();
await connect(process.env.MONGODB_URI);

// schema
const BookSchema = Schema({
    title: String,
});

const CourseSchema = Schema({
    title: String,
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

// model
const Book = model("Book", BookSchema);
const Course = model("Course", CourseSchema);

// data
const book1 = await Book.create({
    title: "MongoDB The Definitive Guide",
});

const book2 = await Book.create({
    title: "Node.js Web Development",
});

const book3 = await Book.create({
    title: "MongoDB, Express, Angular, and Node.js Fundamentals",
});

const book4 = await Book.create({
    title: "JavaScript The Definitive Guide",
});

const book5 = await Book.create({
    title: "React Native Cookbook",
});

const course = await Course.create({
    title: "Full-Stack Web Development Course",
    books: [book1._id, book2._id, book3._id, book4._id, book5._id],
});

const updatedCourse = await Course.findOne().populate("books");
console.log(updatedCourse);
