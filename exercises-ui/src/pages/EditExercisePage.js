import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({name: name, reps: reps, weight: weight, unit: unit, date: date}),
            headers: {
                'Content-Type': 'application/JSON'
            },
        });
        if(response.status === 200) {
            alert('Exercise has been updated!');
        } else {
            alert('Failed to edit exercise.');
            console.log(`Failed to edit exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Edit Movie</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <label for="units">Choose a unit:</label>
            <select
                id="units" 
                name="units"
                value={unit}
                onChange={e => setUnit.target.value}>
                <option value="kgs">kgs</option>
                <option value="lbs">lbs</option>
            </select>
            <label for="date">Use MM-DD-YY format:</label>
            <input
                id="date"
                name="date"
                type="test"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;