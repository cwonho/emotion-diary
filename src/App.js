import React, {
	useEffect,
	useReducer,
	useRef,
	useCallback,
	useMemo,
} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
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
				item.id === action.data.id ? action.data : item
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

	localStorage.setItem("diaryList", JSON.stringify(newState));
	return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
	const [list, dispatch] = useReducer(reducer, []);

	const listId = useRef(0);

	useEffect(() => {
		const localData = localStorage.getItem("diaryList");
		if (localData) {
			const diaryList = JSON.parse(localData).sort(
				(a, b) => parseInt(b.id) - parseInt(a.id)
			);

			if (diaryList.length >= 1) {
				listId.current = parseInt(diaryList[0].id) + 1;

				dispatch({ type: "INIT", data: diaryList });
			}
		}
	}, []);

	// CREATE
	const onCreate = useCallback((date, content, emotion) => {
		dispatch({
			type: "CREATE",
			data: {
				id: listId.current,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});

		listId.current += 1;
	}, []);

	// EDIT
	const onEdit = useCallback((targetId, date, content, emotion) => {
		dispatch({
			type: "EDIT",
			data: {
				id: targetId,
				date: new Date(date).getTime(),
				content,
				emotion,
			},
		});
	}, []);

	// DELETE
	const onDelete = useCallback((targetId) => {
		dispatch({ type: "DELETE", targetId });
	}, []);

	const memoizedDispatches = useMemo(() => {
		return { onCreate, onEdit, onDelete };
	}, []);

	return (
		<DiaryStateContext.Provider value={list}>
			<DiaryDispatchContext.Provider value={memoizedDispatches}>
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
};

export default App;
