import { useState, useEffect, useContext } from "react";
import { DiaryStateContext } from "../App";

import Header from "./../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

const Home = () => {
	const diaryList = useContext(DiaryStateContext);

	const [monthList, setMonthList] = useState([]);
	const [currDate, setCurrDate] = useState(new Date());

	const headText = `${currDate.getFullYear()}년 ${currDate.getMonth() + 1}월`;

	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = "감정 일기장";
	}, []);

	useEffect(() => {
		if (diaryList.length >= 1) {
			const firstDay = new Date(
				currDate.getFullYear(),
				currDate.getMonth(),
				1
			).getTime();

			const lastDay = new Date(
				currDate.getFullYear(),
				currDate.getMonth() + 1,
				0,
				23,
				59,
				59
			).getTime();

			setMonthList(
				diaryList.filter(
					(item) => firstDay <= item.date && item.date <= lastDay
				)
			);
		}
	}, [diaryList, currDate]);

	const increaseMonth = () => {
		setCurrDate(
			new Date(
				currDate.getFullYear(),
				currDate.getMonth() + 1,
				currDate.getDate()
			)
		);
	};

	const decreaseMonth = () => {
		setCurrDate(
			new Date(
				currDate.getFullYear(),
				currDate.getMonth() - 1,
				currDate.getDate()
			)
		);
	};

	return (
		<div>
			<Header
				headText={headText}
				leftChild={<Button text={"<"} onClick={decreaseMonth} />}
				rightChild={<Button text={">"} onClick={increaseMonth} />}
			/>
			<DiaryList diaryList={monthList} />
		</div>
	);
};

export default Home;
