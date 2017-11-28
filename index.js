// start up app:
// npm run electron

const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;

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
  // garbage collect
  addWindow.on('closed', () => addWindow = null);
}

// listen for event (from add.html)
ipcMain.on('todo:add', (event, todo) => {
  // send to mainWindow
  mainWindow.webContents.send('todo:add', todo);
  // close add window
  addWindow.close();
});


// listen for button clicks (from main.html): 
ipcMain.on('refresh:button', (event, todo) => {
  mainWindow.reload();
});
ipcMain.on('devTools:button', (event, todo) => {
  mainWindow.toggleDevTools();
});




// menu template
const menuTemplate = [
{
	label: 'File', // single menu bar drop down item
	submenu: [
		{ 
      label: 'New Todo',
      accelerator: process.platform === 'darwin' ? 'Command+N' : 'Ctrl+N', // Hot Keys: if mac, else pc
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

 // if mac
if (process.platform === 'darwin') {
  menuTemplate.unshift({}); // add empty object so 'Electron' menu doesn't dissappear on mac
}

// if not in production environment
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer',
      submenu: [
        { role: 'reload'}, // electron preset role
        { 
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) { // currently selected window
            focusedWindow.toggleDevTools();
          }
        }
      ]
  });
}

// 'production'
// 'development'
// 'staging'
// 'test'










