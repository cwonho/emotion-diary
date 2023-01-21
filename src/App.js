import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import New from "./pages/New";
import Edit from "./pages/Edit";

import Button from "./components/Button";
import Header from "./components/Header";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Header
					headText={"App"}
					leftChild={
						<Button
							text={"왼쪽 버튼"}
							onClick={() => {
								alert("왼쪽 클릭");
							}}
						/>
					}
					rightChild={
						<Button
							text={"오른쪽 버튼"}
							onClick={() => {
								alert("오른쪽 클릭");
							}}
						/>
					}
				/>

				<h2>App.js</h2>

				<Button
					type={"positive"}
					text={"Positive"}
					onClick={() => {
						alert("onClick 확인!");
					}}
				/>
				<Button
					type={"negative"}
					text={"Negative"}
					onClick={() => {
						alert("onClick 확인!");
					}}
				/>
				<Button
					type={"default"}
					text={"Default"}
					onClick={() => {
						alert("onClick 확인!");
					}}
				/>

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
