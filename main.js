const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const fs = require('fs');
const path = require('path');

let win;

// 更改数据文件存放路径（from 诗笺）
function createDir(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
	}
}

function setPath(path1, path2) {
	app.getPath(path1);
	createDir(path2);
	app.setPath(path1, path2);
}

// 将无名杀的数据放到客户端安装包目录中，即游戏目录/UserData内，做到删除后无残留，但会加长写入游戏设置的时间
setPath('userData', path.join(__dirname, 'UserData'));

// 获取单实例锁（from 诗笺）
// const gotTheLock = app.requestSingleInstanceLock();
// if (!gotTheLock) {
// 	// 如果获取失败，说明已经有实例在运行了，直接退出
// 	app.quit();
// }

function createWindow() {
    win = new BrowserWindow({width: 960, height: 660, title:'无名杀'});
    win.loadURL(`file://${__dirname}/app.html`);
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
