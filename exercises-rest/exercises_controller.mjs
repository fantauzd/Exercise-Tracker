import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';
import { body, oneOf } from 'express-validator';
import { validationResult } from 'express-validator';

const PORT = process.env.PORT;

const app = express();

app.use(express.json());


/**
*
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}


export const postValidator = [
    body('name', 'Name empty').not().isEmpty(),
    body('name', 'name invalid').isString(),
    body('reps', 'reps invalid').isInt({min: 1}),
    body('weight', 'weight invalid').isInt({min: 1}),
    oneOf([body('unit').equals("kgs"), body('unit').equals("lbs")]),
    body('date', 'date invalid').custom((value) => {
        const format = /^\d\d-\d\d-\d\d$/;
        return format.test(value);
    })
]


/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', postValidator, (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            .then(exercise => {
                // res.setHeader('content-type', 'application/JSON');
                res.status(201).json(exercise);
            })
            // In case of an error, send back status code 400
            .catch(error => {
                console.error(error);
                res.status(400).json({ Error: 'Request failed' });
            });
    } else {
        // Not specifying cause of error to meet assignment requirements
        res.status(400).json({Error: "Invalid request"}); 
    }  
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseByID(exerciseId)
        .then(exercise => { 
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: "Not Found" });
            }         
         })
        .catch(error => {
            // This response covers all errors with the request and is used when id is too short/long
            res.status(404).json({ Error: "Not Found" });
        });
});

/**
 * Retrieve all exercises. 
 * All exercises are returned as JSON in an array.
 */
app.get('/exercises', (req, res) => {
    exercises.findExercises()
        .then(exercise => {
            res.status(200).send(exercise);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request failed' });
        });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, weight, unit, date to the values provided in the body.
 */
app.put('/exercises/:_id', postValidator, (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date})
            } else {
                res.status(404).json({ Error: "Not Found" });
            }
        })
        .catch(error => {
            // This response covers all errors with the request and is used when id is too short/long
            console.error(error);
            res.status(404).json({ Error: "Not Found" });
        });
    } else {
        res.status(400).json({ Error: "Invalid Request" });
    }

});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Not Found" });
            }
        })
        .catch(error => {
            // This response covers all errors with the request and is used when id is too short/long
            console.error(error);
            res.status(404).json({ Error: "Not Found" });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});