console.log("require.main:", require.main ? require.main.filename : "undefined");
console.log("process.mainModule:", process.mainModule ? process.mainModule.filename : "undefined");

const { app } = require('electron');
const WindowManager = require('./Scripts/WindowManager.js');

console.log("WindowManager:", WindowManager); // ตรวจสอบว่า `WindowManager` ถูกโหลดจริงหรือไม่

// ตรวจสอบให้แน่ใจว่า WindowManager ถูกสร้างเมื่อ Electron พร้อมใช้งาน
let windowManager;

app.on('ready', () => {
    console.log("Creating WindowManager...");
    windowManager = new WindowManager();
    console.log("windowManager:", windowManager);
    windowManager.createUI();
});

// When all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

//--- When use self-signing certificate must be uncomment this line below. ---
app.commandLine.appendSwitch("ignore-certificate-errors");

//-----------------------

// In main process.
const { ipcMain } = require('electron');

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg); // prints "ping"
  event.reply('asynchronous-reply', 'pong');
});

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg); // prints "ping"
  event.returnValue = 'pong';
});
