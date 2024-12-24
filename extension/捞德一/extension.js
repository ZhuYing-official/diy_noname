import { lib, game, ui, get, ai, _status } from '../../noname.js';
import { config } from './js/config.js';
import { precontent } from './js/precontent/index.js';
import { content } from './js/content/index.js';
import { help } from './js/help.js';

lib.init.css(lib.assetURL + 'extension/捞德一', 'extension');

//更新公告
game.laoShowNewPack = function () {
	//更新告示
	var Lao_update = [
		'/setPlayer/',
		'新增<捞德一>、<王者荣耀>武将包',
		'',
		'To be continued...',
	];
	//更新武将
	var Lao_players = [
		'hok_houyi', 'hok_wangzhaojun', 'hok_lan', 'hok_yase', 'hok_mozi',
	];
	//加载
	var dialog = ui.create.dialog(
		'<span class="text center">' +
		'本扩展像名字一样捞德一，轻喷' +
		'<br>' +
		'<a href="https://github.com/ZhuYing-official/diy_noname/tree/diy/extension/%E6%8D%9E%E5%BE%B7%E4%B8%80">点击前往《捞德一》扩展Github仓库</a>' +
		'<br>' +
		'捞德一 ' + lib.extensionPack.捞德一.version + ' 更新内容' +
		'</span>', 'hidden');
	for (var i = 0; i < Lao_update.length; i++) {
		if (Lao_update[i] == '/setPlayer/') {
			if (Lao_players.length) dialog.addSmall([Lao_players, 'character']);
		}
		else {
			var li = document.createElement('li');
			li.innerHTML = Lao_update[i];
			li.style.textAlign = 'left';
			dialog.content.appendChild(li);
		}
	}
	dialog.open();
	var hidden = false;
	if (!ui.auto.classList.contains('hidden')) {
		ui.auto.hide();
		hidden = true;
	}
	game.pause();
	var control = ui.create.control('确定', function () {
		dialog.close();
		control.close();
		if (hidden) ui.auto.show();
		game.resume();
	});

	if (/Android/i.test(navigator.userAgent)) {
		// Android环境

		// 假设你要在应用的私有文档目录中创建一个名为"myNewFolder"的文件夹
		var folderName = "myNewFolder";
		var docsDir = "_documents/";

		// 解析文档目录的路径
		plus.io.resolveLocalFileSystemURL(docsDir, function (rootDir) {
			// 在文档目录中创建新文件夹
			rootDir.getDirectory(folderName, { create: true, exclusive: false }, function (newFolder) {
				// 获取新文件夹的路径
				newFolder.toURL(function (path) {
					// 在这里，你可以通过控制台输出路径，或者将路径传递给前端页面
					alert('新文件夹的路径是: ' + path);

					// 如果你想在页面上显示路径，你可以使用uniapp的数据绑定机制
					// 例如，假设你有一个名为"folderPath"的data属性，你可以这样设置它：
					// that.setData({
					//     folderPath: path
					// });
					// 然后在页面上通过{{folderPath}}来显示路径
				}, function (error) {
					alert('获取文件夹路径失败: ' + error.message);
				});
			}, function (error) {
				alert('创建文件夹失败: ' + error.message);
			});
		}, function (error) {
			alert('解析文档目录路径失败: ' + error.message);
		});

		// var sourcePath = 'resources/app/extension/捞德一/image'; // 源文件夹路径
		// var targetPath = 'resources/app/image'; // 目标文件夹路径

		// plus.io.resolveLocalFileSystemURL(sourcePath, function (entry) {
		// 	plus.io.resolveLocalFileSystemURL(targetPath, function (root) {
		// 		entry.copyTo(root, 'w', function (res) {
		// 			alert('复制目录成功');
		// 			alert(res);
		// 		}, function (err) {
		// 			alert('复制目录失败:');
		// 			alert(err);
		// 		});
		// 	}, function (err) {
		// 		alert('获取目标目录失败:');
		// 		alert(err);
		// 	});
		// }, function (err) {
		// 	alert('获取源目录失败:');
		// 	alert(err);
		// });

	} else if (typeof module !== 'undefined' && module.exports && typeof require === 'function') {
		//Node.js环境
		const fs = require('fs');
		// 移动扩展图片素材到本体
		if (fs.existsSync('resources/app/extension/捞德一/image')) {
			fs.cp('resources/app/extension/捞德一/image', 'resources/app/image', { recursive: true }, (err) => {
				if (err) {
					alert(err);
				}
			});
		};
	} else {
		alert('其他环境，反馈请联系扩展作者捞德一');
	}
};

let extensionPackage = {
	name: "捞德一",
	editable: false,
	content: content,
	precontent: precontent,
	config: config,
	help: help,
	package: {
		intro: '本扩展像名字一样捞德一，轻喷' +
			'<br><a href="https://github.com/ZhuYing-official/diy_noname/tree/diy/extension/%E6%8D%9E%E5%BE%B7%E4%B8%80">点击前往《捞德一》扩展Github仓库</a>' +
			'<br>' +
			'本扩展完全免费，仅供交流学习使用。' +
			'<br>' +
			'扩展中图片素材来自于网络，部分来自于《三国杀》官方网站、游戏《三国志》官方网站、《王者荣耀》官方网站，版权归上述来源所有。' +
			'<br>' +
			'如有侵权请联系删除。QQ：1097764480' +
			'',
		author: '捞德一',
		diskURL: '',
		forumURL: '',
		version: '0.0.1',
		//壹、贰、叁、肆、伍、陆、柒、捌、玖、拾
	},
	files: {}
};

export let type = 'extension';
export default extensionPackage;