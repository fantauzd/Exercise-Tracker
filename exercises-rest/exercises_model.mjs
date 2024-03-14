import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);


// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true},  // only kgs and lbs allowed, restrict in controller (if instructed)
    date: { type: String, required: true}   // mongoose date schema in undesirable format (YYYY-MM_DD) so we use string
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

/** 
 * Create an exercise
 * @param {String} name
 * @param {Number} year
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns A promise. Resolves to JavaScript object for the document created
 *          by calling save.
*/
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

/**
 * Find an exercise in our database based on an id
 * @param {String} _id
 * @returns {Object} The MongoDB results from the query
 */
const findExerciseByID = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

/**
 * Find Exercis(s) in our database based on a filter parameter
 * @param {Object} filter
 * @returns {Object} The MongoDB results from the query
 */
const findExercises = async () => {
    const query = Exercise.find({});
    return query.exec();
}

/**
 * Replace a Exercise in our database. Receives the id of the movie to be updated
 * and an object with the parameters that should be replaced, and the new values
 * @param {Object} filter
 * @param {String} name
 * @param {Number} year
 * @param {Number} weight
 * @param {String} unit
 * @param {String} date
 * @returns {Number} 1 if updated and 0 if not found
 */
const replaceExercise = async(id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: id}, {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result.modifiedCount;
}

/**
 * Delete an exercise by id
 * @param {String} id 
 * @returns {Number} The number of items delete (1 if found, 0 otherwise)
 */
const deleteById = async (id) => {
    const result = await Exercise.deleteOne({_id: id});
    return result.deletedCount;
}

export {createExercise, findExercises, findExerciseByID, replaceExercise, deleteById};