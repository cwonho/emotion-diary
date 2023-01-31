import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Button from "./Button";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";
import { getStringDate } from "../utils/date.js";
import { emotionList } from "../utils/emotion.js";

const DiaryEditor = ({ isEdit, originData }) => {
	const [date, setDate] = useState(getStringDate(new Date()));
	const [emotion, setEmotion] = useState(3);
	const [content, setContent] = useState("");

	const contentRef = useRef();

	const navigate = useNavigate();

	const { onCreate, onEdit, onDelete } = useContext(DiaryDispatchContext);

	const goBack = useCallback(() => {
		navigate(-1);
	}, []);

	const handleEmotionClick = useCallback((emotion) => {
		setEmotion(emotion);
	}, []);

	const handleSubmit = () => {
		if (content.length < 1) {
			contentRef.current.focus();
			return;
		}

		if (
			window.confirm(
				isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
			)
		) {
			if (!isEdit) {
				onCreate(date, content, emotion);
				navigate("/", { replace: true });
			} else {
				onEdit(originData.id, date, content, emotion);
				navigate(`/detail/${originData.id}`, { replace: true });
			}
		}
	};

	const handleDelete = useCallback(() => {
		if (window.confirm("일기를 삭제하시겠습니까?")) {
			onDelete(originData.id);
			navigate("/", { replace: true });
		}
	}, []);

	useEffect(() => {
		if (isEdit) {
			setDate(getStringDate(new Date(parseInt(originData.date))));
			setEmotion(originData.emotion);
			setContent(originData.content);
		}
	}, [isEdit, originData]);

	return (
		<div className="diaryEditor">
			<Header
				headText={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
				leftChild={<Button text={"< 뒤로가기"} onClick={goBack} />}
				rightChild={
					isEdit && (
						<Button
							type={"negative"}
							text={"삭제하기"}
							onClick={handleDelete}
						/>
					)
				}
			/>
			<div>
				<section>
					<h4>📅 오늘은 언제인가요?</h4>
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
					<h4>👏🏼 오늘의 감정</h4>
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
					<h4>📝 오늘의 일기</h4>
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
						<Button text={"취소하기"} onClick={goBack} />
						<Button
							type={"positive"}
							text={isEdit ? "수정완료" : "작성완료"}
							onClick={handleSubmit}
						/>
					</div>
				</section>
			</div>
		</div>
	);
};

export default DiaryEditor;
