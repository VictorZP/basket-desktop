import * as React from "react";
// import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const App = () => {
	return (
		<div>
			<h1>Start App!</h1>
		</div>
	);
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
