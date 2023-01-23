const EmotionItem = ({ id, img, description, onClick, isSelected }) => {
	return (
		<div
			onClick={() => onClick(id)}
			className={[
				"emotionItem",
				isSelected ? `emotionItem_on_${id}` : "emotionItem_off",
			].join(" ")}
		>
			<img src={img} alt={`emotion${id}`} />
			<span>{description}</span>
		</div>
	);
};

export default EmotionItem;
