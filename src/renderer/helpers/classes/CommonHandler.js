class CommonHandler {
	getCyberSelectOptions(cyberList) {
		return cyberList?.map((el) => {
			return {
				value: el?.id,
				label: el?.cyberName,
				id: el?.id,
			};
		});
	}
}

export default new CommonHandler();
