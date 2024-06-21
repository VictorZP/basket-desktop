const generateStateObject = (list) => {
	return list.reduce(
		(obj, item) => ({
			...obj,
			[`${item.replaceAll(" ", "-")}-panel`]: false,
		}),
		{}
	);
};

export default generateStateObject;
