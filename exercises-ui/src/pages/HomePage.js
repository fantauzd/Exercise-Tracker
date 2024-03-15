import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setExerciseToEdit}) {

    const [exercises, setExercises] = useState([]);

    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            setExercises(exercises.filter(exercise => exercise._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, 
            status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        navigate("/edit-exercise");
    };

    const loadExercises = async exercise => {
        const response = await fetch('/exercises');
        const exercises = await response.json();
        setExercises(exercises);
    }

    useEffect(() => {
        loadExercises();
    }, [])

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete = {onDelete} onEdit = {onEdit} ></ExerciseList>
            <Link to="/add-exercise">Add an exercise</Link>
        </>
    );
}

export default HomePage;