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
            <div>
                <label htmlFor="name">Enter Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter name here"
                    value={name}
                    onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="reps">Enter Reps:</label>
                <input
                    id="reps"
                    name="reps"
                    type="number"
                    placeholder="Enter reps here"
                    value={reps}
                    onChange={e => setReps(e.target.value)} />
            </div>
            <div>
                <label htmlFor="weight">Enter Weight:</label>
                <input
                    id="weight"
                    name="weight"
                    type="number"
                    placeholder="Enter weight here"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
            </div>
            <div>
                <label htmlFor="unit">Enter Unit (kgs/lbs):</label>
                <select
                    id="unit"
                    name="unit"
                    value=""
                    onChange={e => setUnit(e.target.value)} >
                        <option value="">--Choose Unit--</option>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                </select>
            </div>
            <div>
                <label htmlFor="date">Enter Date (MM-DD-YY):</label>
                <input
                    id="date"
                    name="date"
                    type="text"
                    placeholder="Enter MM-DD-YY here"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
            </div>
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;