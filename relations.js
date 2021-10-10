import { User, Course, Book } from "./model.js";

const startRelations = async () => {
    try {
        // ***
        const usersFound = await User.find();
        const coursesFound = await Course.find();
        const booksFound = await Book.find();

        // A user can have many courses
        await User.updateMany(
            { courses: [] },
            { $set: { courses: [...coursesFound] } }
        );

        // A course can have many users
        await Course.updateMany(
            { users: [] },
            { $set: { users: [...usersFound] } }
        );

        // A course can have many books
        await Course.updateMany(
            { books: [] },
            { $set: { books: [...booksFound] } }
        );

        // A book can have many courses
        await Book.updateMany(
            { courses: [] },
            { $set: { courses: [...coursesFound] } }
        );
    } catch (err) {
        console.error(err);
    }
};

export default startRelations;
