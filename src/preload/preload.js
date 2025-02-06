// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const ipcRenderer = window.require("electron").ipcRenderer;

window.addEventListener("contextmenu", (e) => {
	e.preventDefault();
	ipcRenderer.send("show-context-menu");
});
