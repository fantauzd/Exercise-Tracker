import React from 'react';
import {MdDeleteForever, MdEdit} from 'react-icons/md';

function Movie({ movie, onDelete, onEdit }) {
    return (
        <tr>
            <td>{movie.title}</td>
            <td>{movie.year}</td>
            <td>{movie.language}</td>
            <td><MdEdit onClick ={() => onEdit(movie)}/></td>
            <td><MdDeleteForever onClick={() => onDelete(movie._id)}/> </td>
        </tr>
    );
}

export default Movie;