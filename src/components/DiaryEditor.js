import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const getStringDate = (date) => {
	return date.toISOString().slice(0, 10);
};

const emotionList = [
	{
		id: 1,
		img: "./assets/emotion1.png",
		description: "완전좋음",
	},
	{
		id: 2,
		img: "./assets/emotion2.png",
		description: "좋음",
	},
	{
		id: 3,
		img: "./assets/emotion3.png",
		description: "그럭저럭",
	},
	{
		id: 4,
		img: "./assets/emotion4.png",
		description: "나쁨",
	},
	{
		id: 5,
		img: "./assets/emotion5.png",
		description: "끔찍함",
	},
];

const DiaryEditor = () => {
	const [date, setDate] = useState(getStringDate(new Date()));
	const [emotion, setEmotion] = useState(3);
	const [content, setContent] = useState("");

	const contentRef = useRef();

	const navigate = useNavigate();

	const { onCreate } = useContext(DiaryDispatchContext);

	const goBack = () => {
		navigate(-1);
	};

	const handleEmotionClick = (emotion) => {
		setEmotion(emotion);
	};

	const handleSubmit = () => {
		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}

		onCreate(date, content, emotion);
		navigate("/", { replace: true });
	};

	return (
		<div className="diaryEditor">
			<Header
				headText={"새로운 일기 쓰기"}
				leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
			/>
			<div>
				<section>
					<h4>오늘은 언제인가요?</h4>
					<div className="input_box">
						<input
							className="input_date"
							value={date}
							onChange={(e) => setDate(e.target.value)}
							type="date"
						/>
					</div>
				</section>
				<section>
					<h4>오늘의 감정</h4>
					<div className="emotion_list_wrapper">
						{emotionList.map((item) => (
							<EmotionItem
								key={item.id}
								{...item}
								onClick={handleEmotionClick}
								isSelected={item.id === emotion}
							/>
						))}
					</div>
				</section>
				<section>
					<h4>오늘의 일기</h4>
					<div className="text_input_wrapper">
						<textarea
							placeholder="오늘은 어땠나요?"
							ref={contentRef}
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
				</section>
				<section>
					<div className="control_box">
						<Button text={"취소하기"} onClick={() => navigate(-1)} />
						<Button
							type={"positive"}
							text={"작성완료"}
							onClick={handleSubmit}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default DiaryEditor;