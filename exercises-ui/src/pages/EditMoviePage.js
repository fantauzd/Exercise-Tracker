import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditMoviePage = ({movieToEdit}) => {

    const [title, setTitle] = useState(movieToEdit.title);
    const [year, setYear] = useState(movieToEdit.year);
    const [language, setLanguage] = useState(movieToEdit.language);

    const navigate = useNavigate();

    const editMovie = async () => {
        const response = await fetch(`/movies/${movieToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({title: title, year: year, language: language}),
            headers: {
                'Content-Type': 'application/JSON'
            },
        });
        if(response.status === 200) {
            alert('Movie has been updated!');
        } else {
            alert('Failed to edit movie.');
            console.log(`Failed to edit movie, status code = ${response.status}`);
        }
        navigate("/");
    };

    return (
        <div>
            <h1>Edit Movie</h1>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)} />
            <input
                type="number"
                value={year}
                onChange={e => setYear(e.target.value)} />
            <input
                type="text"
                value={language}
                onChange={e => setLanguage(e.target.value)} />
            <button
                onClick={editMovie}
            >Save</button>
        </div>
    );
}

export default EditMoviePage;