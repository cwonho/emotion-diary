import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../utils/date.js";
import { emotionList } from "../utils/emotion.js";
import Button from "../components/Button";
import Header from "../components/Header";

const Detail = () => {
	const [diary, setDiary] = useState();

	const { id } = useParams();
	const navigate = useNavigate();

	const diaryList = useContext(DiaryStateContext);

	useEffect(() => {
		if (diaryList.length >= 1) {
			const targetDiary = diaryList.find(
				(item) => parseInt(item.id) === parseInt(id)
			);
			if (targetDiary) {
				setDiary(targetDiary);
			} else {
				alert("없는 일기입니다.");
				navigate("/", { replace: true });
			}
		}
	}, [id, diaryList]);

	useEffect(() => {
		const titleElement = document.getElementsByTagName("title")[0];
		titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
	}, []);

	if (!diary) {
		return <div className="diaryPage">로딩중입니다...</div>;
	} else {
		const currEmotionData = emotionList.find(
			(item) => parseInt(item.id) === parseInt(diary.emotion)
		);

		return (
			<div className="diaryPage">
				<Header
					headText={`${getStringDate(new Date(diary.date))} 기록`}
					leftChild={
						<Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />
					}
					rightChild={
						<Button
							text={"수정하기"}
							onClick={() => navigate(`/edit/${diary.id}`)}
						/>
					}
				/>
				<article>
					<section>
						<h4>오늘의 감정</h4>
						<div
							className={[
								"diary_img_wrapper",
								`diary_img_wrapper_${diary.emotion}`,
							].join(" ")}
						>
							<img src={currEmotionData.img} alt={`emotion${id}`} />
							<div className="emotion_description">
								{currEmotionData.description}
							</div>
						</div>
					</section>
					<section>
						<h4>오늘의 일기</h4>
						<div className="diary_content_wrapper">
							<p>{diary.content}</p>
						</div>
					</section>
				</article>
			</div>
		);
	}
};

export default Detail;
