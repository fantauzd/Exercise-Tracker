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
            <div>
                <label htmlFor="name">Enter Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="reps">Enter Reps:</label>
                <input
                    id="reps"
                    name="reps"
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
            </div>
            <div>
                <label htmlFor="weight">Enter Weight:</label>
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
            </div>
            <div>
                <label htmlFor="unit">Enter Unit:</label>
                <input
                    id="unit"
                    name="unit"
                    type="text"
                    value={unit}
                    onChange={e => setUnit(e.target.value)} />
            </div>
            <div>
                <label htmlFor="date">Enter Date (MM-DD-YY):</label>
                <input
                    id="date"
                    name="date"
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
            </div>
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;