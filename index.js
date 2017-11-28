// npm run electron

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
{
	label: 'File', // single menu bar drop down item
	submenu: [
		{ label: 'New Todo' },
		{  
      label: 'Quit',
      accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q', // Hot Keys: if mac, else pc
      click() {
        app.quit();
      }
		}
	]
}
];

if (process.platform === 'darwin') { // if mac
  menuTemplate.unshift({}); // add empty object so 'Electron' menu doesn't dissappear on mac
}

