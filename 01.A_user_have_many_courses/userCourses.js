import mongoose from "mongoose";
import dotenv from "dotenv";

const { connect, Schema, model } = mongoose;

dotenv.config();
connect(process.env.MONGODB_URI);

const UserSchema = Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ["Teacher", "Student"],
        default: "Student",
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});
const CourseSchema = Schema({
    title: String,
});

const User = model("User", UserSchema);
const Course = model("Course", CourseSchema);

const course1 = await Course.create({
    title: "JavaScript",
});
const course2 = await Course.create({
    title: "HTML",
});
const course3 = await Course.create({
    title: "CSS",
});
const course4 = await Course.create({
    title: "NodeJs",
});
const course5 = await Course.create({
    title: "REACT",
});

const user = await User.create({
    name: "Maybelle",
    email: "Destin.Graham25@gmail.com",
    role: "Teacher",
    courses: [course1._id, course2._id, course3._id, course4._id, course5._id],
});

const updatedUser = await User.findOne().populate("courses");
console.log(updatedUser);
