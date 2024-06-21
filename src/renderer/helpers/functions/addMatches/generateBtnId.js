const generateBtnId = (cyber) => {
	return `${cyber.replaceAll(" ", "-")}-btn`;
};

export default generateBtnId;
