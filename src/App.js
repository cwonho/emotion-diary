import React, { useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import New from "./pages/New";
import Edit from "./pages/Edit";

const reducer = (state, action) => {
	let newState = [];
	switch (action.type) {
		case "INIT": {
			return action.data;
		}
		case "CREATE": {
			newState = [action.data, ...state];
			break;
		}
		case "EDIT": {
			newState = state.map((item) =>
				item.id === action.data.targetId ? { ...action.data } : item
			);
			break;
		}
		case "DELETE": {
			newState = state.filter((item) => item.id !== action.targetId);
			break;
		}
		default:
			return state;
	}
	return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
	const [list, dispatch] = useReducer(reducer, []);

	const listId = useRef(0);

	const onCreate = (date, content, emotion) => {
		dispatch({
			type: "CREATE",
			data: {
				id: listId.currentdate,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});

		listId.current += 1;
	};

	const onEdit = (targetId, date, content, emotion) => {
		dispatch({
			type: "EDIT",
			data: {
				id: targetId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
	};

	const onDelete = (targetId) => {
		dispatch({ type: "DELETE", targetId });
	};

	return (
		<DiaryStateContext.Provider value={list}>
			<DiaryDispatchContext.Provider value={{ onCreate, onDelete, onEdit }}>
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
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}

export default App;
