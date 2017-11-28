// npm run todos

const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;


// define mainWindow variable
let mainWindow;

// when the app is ready:
app.on('ready', () => {
	// assign window to variable
	mainWindow = new BrowserWindow({}); // set window config here
	// load main.html file
	mainWindow.loadURL(`file://${__dirname}/main.html`);
	// buildFronTemplate helper
	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	// create menu from build
	Menu.setApplicationMenu(mainMenu);

});

// menu template
const menuTemplate = [
//{}, // empty object so Electron doesn't dissappear (mac)
{
	label: 'File', // single menu bar drop down item
	submenu: [
		{ label: 'New Todo'}
	]
}
];
