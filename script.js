$(document).ready(
	$("#searchForm").on("submit", (e) => {
		e.preventDefault();
		let searchText = $("#searchBar").val();
		getMovies(searchText);
	})
);

function getMovies(search) {
	$.ajax({
		method: "GET",
		url: "http://www.omdbapi.com/?apikey=422f59fb&s=" + search,
		dataType: "json",
	}).done((data) => {
		console.log(data.Search);
		let movies = data.Search;
		let output = "";
		$.each(movies, (i, movie) => {
			output += `
			<div class="movie">
				<div class="movieDetails">
					<a href="movie.html" onclick="movieSelected('${movie.imdbID}')" class="btn-primary">More Details</a>
					<img
						src="${movie.Poster}"
						alt="${movie.Title}"
					/>
				</div>
				<div class="text">
					<h3>${movie.Title}</h3>
					<p>${movie.Year}</p>
				</div>
			</div>`;
		});
		$("#movies").html(output);
		window.scrollTo({
			top: 368,
			left: 0,
			behavior: "smooth",
		});
	});
}

function movieSelected(movieID) {
	sessionStorage.setItem("movieID", movieID);
	window.location = "movie.html";
	return false;
}

function getMovie() {
	let id = sessionStorage.getItem("movieID");
	let xhr = new XMLHttpRequest();
	xhr.open("GET", `http://www.omdbapi.com/?apikey=422f59fb&i=${id}`, true);
	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let movie = JSON.parse(this.responseText);
			let output = `
			<div class="box">
				<div class="firstRow">
					<img
						src="${movie.Poster}"
						alt="${movie.Title}"
					/>
					<ul>
						<li><span>Released</span><br />${movie.Released}</li>
						<li>
							<span>Runtime</span><br />
							${movie.Runtime}
						</li>
						<li>
							<span>Genre</span><br />
							${movie.Genre}
						</li>
						<li>
							<span>Box Office</span><br />
							${movie.BoxOffice}
						</li>
						<li>
							<span>Actors</span><br />
							${movie.Actors}
						</li>
						<li><span>Language</span><br />${movie.Language}</li>
						<li><span>Country</span><br />${movie.Country}</li>
						<li>
							<span>Awards</span><br />${movie.Awards}
						</li>
						<li>
							<span>IMDB Rating</span><br />${movie.imdbRating}<span class="soft">
								/ 10</span
							>
						</li>
					</ul>
				</div>
				<div class="secondRow">
					<h3>Plot</h3>
					<p>
						${movie.Plot}
					</p>
					<a
						href="https://www.imdb.com/title/${id}"
						target="_blank"
						class="btn-primary"
						>Details</a
					>
				</div>
			</div>`;
			$(".movieBox").append(output);
		}
	};

	xhr.send();
}

// using jquery
/* function getMovie() {
	let id = sessionStorage.getItem("movieID");
	$.ajax({
		method: "GET",
		url: "http://www.omdbapi.com/?apikey=422f59fb&i=" + id,
		dataType: "json",
	}).done((data) => {
		console.log(data);
		let movie = data;
		let output = `
			<div class="box">
				<div class="firstRow">
					<img
						src="${movie.Poster}"
						alt="${movie.Title}"
					/>
					<ul>
						<li><span>Released</span><br />${movie.Released}</li>
						<li>
							<span>Runtime</span><br />
							${movie.Runtime}
						</li>
						<li>
							<span>Genre</span><br />
							${movie.Genre}
						</li>
						<li>
							<span>Box Office</span><br />
							${movie.BoxOffice}
						</li>
						<li>
							<span>Actors</span><br />
							${movie.Actors}
						</li>
						<li><span>Language</span><br />${movie.Language}</li>
						<li><span>Country</span><br />${movie.Country}</li>
						<li>
							<span>Awards</span><br />${movie.Awards}
						</li>
						<li>
							<span>IMDB Rating</span><br />${movie.imdbRating}<span class="soft">
								/ 10</span
							>
						</li>
					</ul>
				</div>
				<div class="secondRow">
					<h3>Plot</h3>
					<p>
						${movie.Plot}
					</p>
					<a
						href="https://www.imdb.com/title/${id}"
						target="_blank"
						class="btn-primary"
						>Details</a
					>
				</div>
			</div>`;
		$(".movieBox").append(output);
	});
}
 */
