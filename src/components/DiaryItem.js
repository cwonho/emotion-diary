import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({ id, content, emotion, date }) => {
	const navigate = useNavigate();
	const strDate = new Date(parseInt(date)).toLocaleDateString();

	const goDetail = () => {
		navigate(`/detail/${id}`);
	};

	const goEdit = () => {
		navigate(`/edit/${id}`);
	};

	return (
		<div className="diaryItem">
			<div
				className={[
					"emotion_img_wrapper",
					`emotion_img_wrapper_${emotion}`,
				].join(" ")}
				onClick={goDetail}
			>
				<img src={`./assets/emotion${emotion}.png`} alt={`emotion${emotion}`} />
			</div>
			<div className="info_wrapper" onClick={goDetail}>
				<div className="diary_date">{strDate}</div>
				<div className="diary_content_preview">{content.slice(0, 25)}</div>
			</div>
			<div className="btn_wrapper">
				<Button text={"수정하기"} onClick={goEdit} />
			</div>
		</div>
	);
};

export default DiaryItem;
