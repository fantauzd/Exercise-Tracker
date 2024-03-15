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
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={year}
                placeholder="Enter year here"
                onChange={e => setYear(e.target.value)} />
            <input
                type="text"
                placeholder="Enter language here"
                value={language}
                onChange={e => setLanguage(e.target.value)} />
            <button
                onClick={addMovie}
            >Add</button>
        </div>
    );
}

export default AddMoviePage;