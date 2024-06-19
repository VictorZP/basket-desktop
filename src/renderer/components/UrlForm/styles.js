const mainBox = (isShown) => {
	return { mt: 2, display: !isShown ? "none" : "inline-block" };
};

const formBox = { display: "flex", width: "968px" };

const formInnerBox = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	ml: 2,
};

const button = { alignSelf: "start" };

export const styles = { mainBox, formBox, formInnerBox, button };
