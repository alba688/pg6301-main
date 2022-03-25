import {useLoading} from "./useLoading";
import React from "react";

function MovieCard({movie: {title, plot, poster}}) {
    return (
        <>
            <h3>{title}</h3>
            {poster && <img src={poster} width={100} alt={"Movie poster"}/>}
            <div>{plot}</div>
        </>
    );
}

export function ListMovies() {
    const {loading, error, data} = useLoading(async () =>
        fetchJSON("/api/movies")
    );

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

    return (
        <div>
            <h1>Movies in the database</h1>
            {data.map((movie) => (
                <MovieCard key={movie.title} movie={movie}/>
            ))}
        </div>
    );
}