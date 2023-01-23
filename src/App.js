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

const dummyData = [
	{ id: 1, emotion: 1, content: "오늘의 일기 1번", date: 1674330313749 },
	{ id: 2, emotion: 2, content: "오늘의 일기 2번", date: 1674330313750 },
	{ id: 3, emotion: 3, content: "오늘의 일기 3번", date: 1674330313751 },
	{ id: 4, emotion: 4, content: "오늘의 일기 4번", date: 1674330313752 },
	{ id: 5, emotion: 5, content: "오늘의 일기 5번", date: 1674330313753 },
];

function App() {
	const [list, dispatch] = useReducer(reducer, dummyData);

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
							<Route path="/edit/:id" element={<Edit />} />
						</Routes>
					</div>
				</BrowserRouter>
			</DiaryDispatchContext.Provider>
		</DiaryStateContext.Provider>
	);
}

export default App;
