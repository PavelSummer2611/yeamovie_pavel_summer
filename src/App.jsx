import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SearchResults from "./pages/SearchResults/SearchResults";
import Layout from "./components/Layout/Layout";
import MoviePage from "./pages/MoviePage/MoviePage";
import Popular from "./pages/Popular/Popular";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<Home />} />
						<Route path="/search_results" element={<SearchResults />} />
						<Route path="/movie/:id" element={<MoviePage />} />
						<Route path="/popular/:category" element={<Popular />} />
					</Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
