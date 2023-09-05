document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movieList");
    const createMovie = document.getElementById("createMovie");
    const updateMovie = document.getElementById("updateMovie");
    const deleteMovie = document.getElementById("deleteMovie");


    //function to fetch and display movies
    function displayMovies() {
        fetch("https://localhost:7150/api/movies")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(movies => {
                movieList.innerHTML = ""; //clear previous list
                movies.forEach(movie => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `MovieId: ${movie.movieId}, Name: ${movie.name}, Genre: ${movie.genre}, Rating:${movie.rating}, ReleaseDate: ${movie.releaseDate}`;
                    movieList.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error("Fetch error:", error);
                movieList.innerHTML = "Error fetching tasks";
            });
    }

    //Event listener for create movie form submission
    createMovie.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const genre = document.getElementById("genre").value;
        const rating = document.getElementById("rating").value;
        const releaseDate = document.getElementById("releaseDate").value;

        fetch("https://localhost:7150/api/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, genre, rating, releaseDate })
        })
            .then(response => {
                if (!reponse.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //Clear form fields after successful creation
                document.getElementById("name").value = "";
                document.getElementById("genre").value = "";
                document.getElementById("rating").value = "";
                document.getElementById("releaseDate").value = "";

                //Refresh the movie list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error: ", error);
            });
    });

    //Update Task
    updateMovie.addEventListener("submit", (e) => {
        e.preventDefault();
        const movieId = document.getElementById("movieId").value;
        const newname = document.getElementById("newname").value;
        const newgenre = document.getElementById("newgenre").value;
        const newrating = document.getElementById("newrating").value;
        const newreleaseDate = document.getElementById("newreleaseDate").value;

        fetch(`https://localhost:7150/api/movies/${movieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ MovieId: movieId, Name: newname, Genre: newgenre, Rating: newrating, ReleaseDate: newreleaseDate })
        })
            .then(response => {
                if (!reponse.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //Clear form fields after successful creation
                document.getElementById("movieId").value = "";
                document.getElementById("newname").value = "";
                document.getElementById("newgenre").value = "";
                document.getElementById("newrating").value = "";
                document.getElementById("newreleaseDate").value = "";

                //Refresh the task list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error: ", error);
            });
    });

    //Delete Task
    deleteMovie.addEventListener("submit", (e) => {
        e.preventDefault();
        const deleteMovieId = document.getElementById("deleteMovieId").value;

        fetch(`https://localhost:7150/api/movies/${deleteMovieId}`, {
            method: "DELETE",
        })
            .then(response => {
                if (!reponse.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(() => {
                //Clear form fields after successful creation
                document.getElementById("deleteMovieId").value = "";

                //Refresh the task list
                displayMovies();
            })
            .catch(error => {
                console.error("Fetch error: ", error);
            });
    });
    //Initial display of tasks when the page loads
    displayMovies();
});