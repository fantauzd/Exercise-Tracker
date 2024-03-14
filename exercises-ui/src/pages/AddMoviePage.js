import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddMoviePage = () => {

    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [language, setLanguage] = useState('');

    const navigate = useNavigate()

    const addMovie = async () => {
        const newMovie = {title, year, language};
        const response = await fetch('/movies', {
            method: 'POST', 
            body: JSON.stringify(newMovie), 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201) {
            alert('Successfully added the movie');
        } else {
            alert('Failed to add movie');
            console.log(`Failed to add movie, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Add Movie</h1>
            <input
                type="text"
                placeholder="Enter title here"
                value={title}
                onChange={e => setTitle(e.target.value)} />
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