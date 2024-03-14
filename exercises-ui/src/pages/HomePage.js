import React from 'react';
import { Link } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setMovieToEdit}) {

    const [movies, setMovies] = useState([]);

    const navigate = useNavigate();

    const onDelete = async _id => {
        const response = await fetch(`/movies/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            setMovies(movies.filter(movie => movie._id !== _id));
        } else {
            console.error(`Failed to delete movie with _id = ${_id}, 
            status code = ${response.status}`);
        }
    };

    const onEdit = movie => {
        setMovieToEdit(movie)
        navigate("/edit-movie");
    };

    const loadMovies = async movie => {
        const response = await fetch('/movies');
        const movies = await response.json();
        setMovies(movies);
    }

    useEffect(() => {
        loadMovies();
    }, [])

    return (
        <>
            <h2>List of Movies</h2>
            <MovieList movies={movies} onDelete = {onDelete} onEdit = {onEdit} ></MovieList>
            <Link to="/add-movie">Add a movie</Link>
        </>
    );
}

export default HomePage;