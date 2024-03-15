import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate()

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
            method: 'POST', 
            body: JSON.stringify(newExercise), 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert('Successfully added the exercise');
        } else {
            alert('Failed to add exercise');
            console.log(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Add Exercise</h1>
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
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;