import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GuetsBook from "./pages/GuetsBook";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<GuetsBook />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
