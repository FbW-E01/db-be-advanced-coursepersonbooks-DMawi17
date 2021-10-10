import mongoose from "mongoose";
import faker from "faker";
import dotenv from "dotenv";
import { User, Course, Book } from "./model.js";

const { connect, connection } = mongoose;
dotenv.config();

try {
    await connect(process.env.MONGODB_URI);
    const users = Array(21)
        .fill()
        .map((u) => ({
            name: faker.name.findName(),
            email: faker.internet.email(),
            role: faker.name.jobType(),
        }));
    await User.create(users);

    const books = Array(7)
        .fill()
        .map((u) => ({
            title: faker.lorem.words(),
        }));
    await Book.create(books);

    const coursesArr = ["MongoDB", "Express", "React", "NodeJs"];
    const courses = coursesArr.map((course) => ({
        title: `${course}`,
    }));
    await Course.create(courses);
} catch (err) {
    console.error(err);
} finally {
    connection.close();
}
