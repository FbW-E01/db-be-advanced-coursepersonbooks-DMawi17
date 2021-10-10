import mongoose from "mongoose";
import dotenv from "dotenv";

const { connect, Schema, model } = mongoose;

dotenv.config();
await connect(process.env.MONGODB_URI);

// schema
const UserSchema = Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ["Teacher", "Student"],
        default: "Student",
    },
});

const CourseSchema = Schema({
    title: String,
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// model
const User = model("User", UserSchema);
const Course = model("Course", CourseSchema);

// data
const user1 = await User.create({
    name: "Maybelle",
    email: "Destin.Graham25@gmail.com",
    role: "Teacher",
});

const user2 = await User.create({
    name: "Fred",
    email: "jane.doe5@gmail.com",
});

const user3 = await User.create({
    name: "Rebeka",
    email: "Vernie58@yahoo.com",
});

const user4 = await User.create({
    name: "Milton",
    email: "Nasir_Kihn@hotmail.com",
    role: "Teacher",
});

const user5 = await User.create({
    name: "Daren",
    email: "Deborah_Flatley70@yahoo.com",
});

const course = await Course.create({
    title: "JavaScript",
    users: [user1._id, user2._id, user3._id, user4._id, user5._id],
});

const updatedCourse = await Course.findOne().populate("users");
console.log(updatedCourse);
