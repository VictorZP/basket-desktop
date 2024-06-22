import React from "react";
import PropTypes from "prop-types";

import { Box, TextField } from "@mui/material";

const TEXT = {
	LABEL: "Поиск",
};

const SearchInput = ({ value, idType, handleSearchFilter }) => {
	return (
		<Box sx={{ maxWidth: "200px", mt: 2, mb: 2, ml: 3 }}>
			<TextField
				id={`${idType}-search`}
				name={`${idType}-search`}
				label={TEXT.LABEL}
				size="small"
				onChange={handleSearchFilter}
				value={value}
			/>
		</Box>
	);
};

SearchInput.propTypes = {
	value: PropTypes.string.isRequired,
	idType: PropTypes.string.isRequired,
	handleSearchFilter: PropTypes.func.isRequired,
};

export default SearchInput;
