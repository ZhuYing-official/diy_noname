import { lib, game, ui, get, ai, _status } from '../../../../noname.js'
import lao_noname from './lao_noname/index.js'

export function content(config, pack) {
	//更新公告
	var version = lib.config.extension_捞德一_version;
	if (!version || version != lib.extensionPack.捞德一.version) {
		lib.game.showChangeLog = function () {
			game.saveConfig('extension_捞德一_version', lib.extensionPack.捞德一.version);
			game.laoShowNewPack();
			lib.init.onfree();
		};
	}

	var week = new Date().getDay();
	switch (week) {
		case 0:
			lib.config.connect_nickname = '捞德日';
			break;
		case 1:
			lib.config.connect_nickname = '捞德一';
			break;
		case 2:
			lib.config.connect_nickname = '捞德二';
			break;
		case 3:
			lib.config.connect_nickname = '捞德三';
			break;
		case 4:
			lib.config.connect_nickname = '捞德四';
			break;
		case 5:
			lib.config.connect_nickname = '捞德五';
			break;
		case 6:
			lib.config.connect_nickname = '捞德六';
			break;
		default:
			lib.config.connect_nickname = '捞德一';
	}
	game.saveConfig("connect_nickname", lib.config.connect_nickname);
	game.saveConfig("connect_nickname", lib.config.connect_nickname, "connect");

	//联机名称
	if (/^\u635e\u5fb7[\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u65e5]{1}$/.test(lib.config.connect_nickname)) {
		//检查公告
		lib.extensionMenu['extension_捞德一'].checkNew = {
			name: '检查更新公告',
			clear: true,
			onclick(bool) {
				game.laoShowNewPack();
			},
		};
	}

	// 本体修改
	lao_noname();

	//设置稀有度
	if (lib.rank) {
		//设置评级
		var rank = {
			rarity: {
				//传说
				legend: [
					// 捞德一
					'lao_sp_chenshou',

					'shen_caozhi',
					'shen_dongzhuo',
					'shen_lusu',
					'shen_xusheng',

					// 王者荣耀
					'hok_aoyin',
					'hok_sunwukong',

					'hok_sp_lixin',
					'hok_sp_mingshiyin',

					// 黑猴
					'wukong_tianmingren',
				],
				//史诗
				epic: [
					// 捞德一
					'lao_caofang',
					'lao_caoyu',
					'lao_cuishi',
					'lao_tuanxini',
					'lao_tuan',
					'lao_xini',
					'lao_yanxing',
					'lao_sp_wanglang',

					// 王者荣耀
					'hok_anqila',
					'hok_ailin',
					'hok_bailishouyue',
					'hok_bailixuance',
					'hok_daji',
					'hok_dasiming',
					'hok_donghuangtaiyi',
					'hok_duoliya',
					'hok_gaojianli',
					'hok_hainuo',
					'hok_houyi',
					'hok_lan',
					'hok_lanlingwang',
					'hok_lixin',
					'hok_makeboluo',
					'hok_mingshiyin',
					'hok_miyue',
					'hok_mozi',
					'hok_sikongzhen',
					'hok_wangzhaojun',
					'hok_wuzetian',
					'hok_yao',
					'hok_yase',
				],
				//稀有
				rare: [
					// 捞德一
					'lao_caohuan',
					'lao_liucong',
				],
				//普通
				// common: [
				// ],
				//平凡
				junk: [
					//捞德一

				],
			},
			//出场率
			s: [
			],
			ap: [
				// 捞德一
				'lao_sp_chenshou',

				'shen_caozhi',
				'shen_dongzhuo',
				'shen_lusu',
				'shen_xusheng',
				// 王者荣耀
				'hok_sp_lixin',
				'hok_sp_mingshiyin',
				'hok_aoyin',
				'hok_sunwukong',

				// 黑猴
				'wukong_tianmingren',
			],
			a: [
				// 捞德一
				'lao_caofang',
				'lao_caoyu',
				'lao_cuishi',
				'lao_tuanxini',
				'lao_tuan',
				'lao_xini',
				'lao_yanxing',
				'lao_sp_wanglang',

				// 王者荣耀
				'hok_anqila',
				'hok_ailin',
				'hok_bailishouyue',
				'hok_bailixuance',
				'hok_daji',
				'hok_dasiming',
				'hok_donghuangtaiyi',
				'hok_duoliya',
				'hok_gaojianli',
				'hok_hainuo',
				'hok_houyi',
				'hok_lan',
				'hok_lanlingwang',
				'hok_lixin',
				'hok_makeboluo',
				'hok_mingshiyin',
				'hok_miyue',
				'hok_mozi',
				'hok_sikongzhen',
				'hok_wangzhaojun',
				'hok_wuzetian',
				'hok_yao',
				'hok_yase',
			],
			am: [
				// 捞德一
				'lao_caohuan',
				'lao_liucong',
			],
			bp: [
			],
			b: [
			],
			bm: [
			],
			c: [
			],
			d: [
			],
		};
		//总置
		var addRank = function (rank) {
			if (!lib.rank) return;
			for (var i in rank) {
				if (i == 'rarity') {
					for (var j in rank[i]) {
						try {
							Array.prototype.push.apply(lib.rank[i][j], rank[i][j]);
						} catch (e) {
							alert(e.message)
						}
					}
				} else {
					try {
						Array.prototype.push.apply(lib.rank[i], rank[i]);
					} catch (e) {
						alert(e.message)
					}
				}
			}
		};
		addRank(rank);
	}
}