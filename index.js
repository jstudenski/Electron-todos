// start up app:
// npm run electron

const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;

//initialize variables
let mainWindow;
let addWindow;

// when the app is ready:
app.on('ready', () => {
	// assign window to variable
	mainWindow = new BrowserWindow({}); // set window config here
	// load main.html file
	mainWindow.loadURL(`file://${__dirname}/main.html`);
  // when main window is closed, close everything
  mainWindow.on('closed', () => app.quit());


	// buildFronTemplate helper
	const mainMenu = Menu.buildFromTemplate(menuTemplate);
	// create menu from build
	Menu.setApplicationMenu(mainMenu);
});

// function to be called by 'New Todo' menu button
function createAddWindow() {
  // create new widow
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    backgroundColor: '#f8f8f8',
    title: 'Add New Todo'
  });
  // populate window with add.html
  addWindow.loadURL(`file://${__dirname}/add.html`);
}


// menu template
const menuTemplate = [
{
	label: 'File', // single menu bar drop down item
	submenu: [
		{ 
      label: 'New Todo',
      click() { createAddWindow(); }
    },
		{  
      label: 'Quit',
      accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q', // Hot Keys: if mac, else pc
      click() {
        app.quit(); // quit application
      }
		}
	]
}
];

if (process.platform === 'darwin') { // if mac
  menuTemplate.unshift({}); // add empty object so 'Electron' menu doesn't dissappear on mac
}

