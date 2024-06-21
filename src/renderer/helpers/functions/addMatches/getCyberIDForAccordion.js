const getCyberIDForAccordion = (cyber) => {
	return `${cyber.replaceAll(" ", "-")}-panel`;
};

export default getCyberIDForAccordion;
