import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


//309d8883

const API_URL = 'https://www.omdbapi.com?apikey=309d8883';


const Types = ["movie", "series", "episode"];

const App = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        searchMovies("");
        //console.log(process.env.REACT_APP_OMDB);
    }, []);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    const searchMoviesByType = async (type, title) => {
        const response = await fetch(`${API_URL}&s=${title}&type=${type}`);
        const data = await response.json();

        setMovies(data.Search);
    };



    return (
        <div className="app">
            <h1>MovieLand</h1>
            <div>
                {Types.map((type, index) => (
                    <Button
                        className="btn"
                        variant="outline-light"
                        onClick={(e) => {
                            searchMoviesByType(e.target.value, searchTerm);
                        }
                        }
                        key={index}
                        value={type}

                    >{type}</Button>
                ))}
                
            </div>
            <div className="search">
                <input
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        searchMovies(e.target.value);
                    }
                    }
                    placeholder="Search for movies"
                />
                <img
                    src={SearchIcon}
                    alt="search"

                />
            </div>

            {movies?.length > 0 ? (
                <div className="container">
                    {movies.map((movie, index) => (
                        <MovieCard
                            movie={movie}
                            key={index} />
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    );
};

export default App;