import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import DiaryItem from "./DiaryItem";

const sortOptionList = [
	{ value: "latest", name: "최신순" },
	{ value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
	{ value: "all", name: "전부다" },
	{ value: "good", name: "좋은 감정만" },
	{ value: "bad", name: "안좋은 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
	return (
		<select
			className="controlMenu"
			value={value}
			onChange={(e) => onChange(e.target.value)}
		>
			{optionList.map((item, idx) => (
				<option key={idx} value={item.value}>
					{item.name}
				</option>
			))}
		</select>
	);
};

const DiaryList = ({ diaryList }) => {
	const [sortType, setSortType] = useState("latest");
	const [emotionFilter, setEmotionFilter] = useState("all");

	const navigate = useNavigate();

	const goNew = () => {
		navigate("/new");
	};

	const filterCallBack = (item) => {
		if (emotionFilter === "good") {
			return parseInt(item.emotion) <= 3;
		} else return parseInt(item.emotion) > 3;
	};

	const getProcessedDiaryList = () => {
		const compare = (a, b) => {
			if (sortType === "latest") {
				return parseInt(b.date) - parseInt(a.date);
			} else {
				return parseInt(a.date) - parseInt(b.date);
			}
		};

		const copyList = JSON.parse(JSON.stringify(diaryList));

		const filteredList =
			emotionFilter === "all"
				? copyList
				: copyList.filter((item) => filterCallBack(item));

		const sortedList = filteredList.sort(compare);

		return sortedList;
	};

	return (
		<div className="diaryList">
			<div className="menu_wrapper">
				<div className="left_col">
					<ControlMenu
						value={sortType}
						onChange={setSortType}
						optionList={sortOptionList}
					/>
					<ControlMenu
						value={emotionFilter}
						onChange={setEmotionFilter}
						optionList={filterOptionList}
					/>
				</div>
				<div className="right_col">
					<Button type={"positive"} text={"새 일기쓰기"} onClick={goNew} />
				</div>
			</div>
			{getProcessedDiaryList().map((item) => (
				<DiaryItem key={item.id} {...item} />
			))}
		</div>
	);
};

DiaryList.defaultProps = {
	diaryList: [],
};

export default DiaryList;
