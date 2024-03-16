import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Use this app to track your exercises and view past workouts!</p>
      </header>
      <Router>
        <div className="App-header">
		<Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />}/>
          <Route path="/add-exercise" element={<AddExercisePage />}/>
          <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit} />}/>
		  </Routes>
          </div>
      </Router>
      <footer>
        <p>© 2024 Dominic Fantauzzo</p>
      </footer>
    </div>
  );
}

export default App;