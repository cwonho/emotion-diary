import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import New from "./pages/New";
import Edit from "./pages/Edit";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/detail/:id" element={<Detail />} />
					<Route path="/new" element={<New />} />
					<Route path="/edit" element={<Edit />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
