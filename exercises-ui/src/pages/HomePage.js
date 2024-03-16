import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import barbell from "../barbell.svg";

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
    };

    useEffect(() => {
        loadExercises();
    }, []);


    return (
        <>
            <Link to="/add-exercise">
                <img src={barbell} alt="" />
            </Link>
            <div id="list">
                <h2>List of Exercises</h2>
                <ExerciseList exercises={exercises} onDelete = {onDelete} onEdit = {onEdit} ></ExerciseList>
                <Link id="addLink" to="/add-exercise">Add a new exercise</Link>
            </div>
        </>
    );
}

export default HomePage;