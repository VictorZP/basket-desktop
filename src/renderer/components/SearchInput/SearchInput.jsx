import React from "react";
import PropTypes from "prop-types";

import { Box, TextField } from "@mui/material";

const TEXT = {
	LABEL: "Поиск",
};

const SearchInput = ({ idType, handleSearchFilter }) => {
	return (
		<Box sx={{ maxWidth: "200px", mt: 2, mb: 2, ml: 3 }}>
			<TextField
				id={`${idType}-search`}
				name={`${idType}-search`}
				label={TEXT.LABEL}
				size="small"
				onChange={handleSearchFilter}
			/>
		</Box>
	);
};

SearchInput.propTypes = {
	idType: PropTypes.string.isRequired,
	handleSearchFilter: PropTypes.func.isRequired,
};

export default SearchInput;
