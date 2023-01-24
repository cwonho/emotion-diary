export const getStringDate = (date) => {
	let offset = date.getTimezoneOffset() * 60000;
	let dateOffset = new Date(date.getTime() - offset);
	return dateOffset.toISOString().slice(0, 10);
};
