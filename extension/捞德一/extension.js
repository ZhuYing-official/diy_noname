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
		// 'hok_houyi', 'hok_wangzhaojun', 'hok_lan', 'hok_yase', 'hok_mozi',
		'hok_houyi', 'hok_wangzhaojun',
	];
	//加载
	var dialog = ui.create.dialog(
		'<span class="text center">' +
		'本扩展像名字一样捞德一，轻喷' +
		'<br>' +
		'<a href="https://github.com/">点击前往《捞德一》扩展Github仓库</a>' +
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

	// 移动扩展图片素材到本体
	game.getFileList('extension/捞德一/image', (folders, files) => {
		if (folders) {
			const fs = require('fs');
			fs.cp('resources/app/extension/捞德一/image', 'resources/app/image', { recursive: true }, (err) => {
				if (err) {
					alert(err);
				}
			});
		}
	});
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
			'<br><a href="https://github.com/">点击前往《捞德一》扩展Github仓库</a>' +
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