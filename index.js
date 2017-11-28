// npm run todos

const electron = require('electron');
const { app, BrowserWindow } = electron;

// define mainWindow variable
let mainWindow;

// when the app is ready:
app.on('ready', () => {
	// assign window to variable
	mainWindow = new BrowserWindow({}); // set window config here
	// load main.html file
	mainWindow.loadURL(`file://${__dirname}/main.html`);
});
