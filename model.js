import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = Schema({
    name: String,
    email: String,
    role: String,
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const CourseSchema = Schema({
    title: String,
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    books: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});

const BookSchema = Schema({
    title: String,
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const User = model("User", UserSchema);
const Course = model("Course", CourseSchema);
const Book = model("Book", BookSchema);

export { User, Course, Book };
