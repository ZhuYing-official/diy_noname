import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';

/** @type { importCharacterConfig['skill'] } */
const skills = {
	// 王者公共技
	hok_yinshen: {
		charlotte: true,
		locked: false,
		forced: true,
		marktext: '隐',
		intro: {
			name: '隐身',
			content: '不能成为【杀】和目标数为1的锦囊牌的目标',
		},
		mod: {
			targetEnabled(card, player, target) {
				if (card.name == 'sha') {
					return false;
				}
				if (card.name == 'wuzhong' || card.name == 'lebu' || card.name == 'bingliang' || card.name == 'shandian'
					|| card.name == 'guohe' || card.name == 'shunshou' || card.name == 'juedou' || card.name == 'huogong'
					|| card.name == 'qizhengxiangsheng' || card.name == 'hpp_qizhengxiangsheng') {
					return false;
				}
			}
		},
		trigger: { player: ['useCardAfter', 'respond'] },
		filter(event) {
			return (get.type(event.card) == 'trick' || get.type(event.card) == 'delay' || event.card.name == 'sha');
		},
		content() {
			player.removeMark('hok_yinshen', 1);
			player.removeSkill('hok_yinshen');
		},
	},
	hok_temp_hp: {
		charlotte: true,
		marktext: '体',
		intro: {
			name: '临时体力',
			content: 'mark',
		},
		forced: true,
		trigger: { player: ['damageEnd', 'loseHpEnd'] },
		content() {
			'step 0'
			event.num = trigger.num;
			'step 1'
			player.removeMark('hok_temp_hp', 1);
			'step 2'
			player.loseMaxHp();
			event.num--;
			'step 3'
			if (event.num == 0 || !player.hasMark('hok_temp_hp')) {
				event.finish();
			}
			'step 4'
			event.goto(1);
		}
	},

	// A
	// 安琪拉
	hok_huoqiu: {
		usable: 1,
		enable: 'phaseUse',
		enable: ['chooseToRespond', 'chooseToUse'],
		mod: {
			targetInRange(card, player) {
				if (card.name == 'sha' && card.nature == 'fire') return true;
			},
		},
		filterCard(card) {
			return lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay';
		},
		viewAs: { name: 'sha', nature: 'fire' },
		viewAsFilter(player) {
			if (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })) {
				return false;
			}
		},
		position: 'h',
		prompt: '将一张锦囊当火【杀】使用或打出',
		check(card) {
			const val = get.value(card);
			if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
			return 6 - val;
		},
		group: 'hok_huoqiu_damage',
		ai: {
			order() {
				return get.order({ name: 'sha' }) + 0.5;
			},
		},
		subSkill: {
			damage: {
				forced: true,
				locked: false,
				trigger: { source: 'damageBegin1' },
				filter(event) {
					return event.card && event.card.name == 'sha' && event.hasNature('fire');
				},
				mod: {
					aiOrder(player, card, num) {
						if (get.itemtype(card) == 'card' && card.name == 'sha' && card.nature) return num + 0.5;
					},
				},
				content() {
					trigger.num++;
				},
			},
		},
	},
	hok_hunhuo: {
		usable: 1,
		enable: 'phaseUse',
		filterTarget(card, player, target) {
			return target != player && target.inRangeOf(player) && target.countCards('h') > 0;
		},
		async content(event, trigger, player) {
			let hunhuoNum = 0;
			const judgeEvent = event.target.judge(card => {
				hunhuoNum = Math.floor(get.number(card) / 5);
				if (hunhuoNum >= 1) {
					return 2;
				} else {
					return -2;
				}
			});
			judgeEvent.judge2 = result => result.bool;
			const { result: { judge } } = await judgeEvent;
			if (judge < 2) {
				return;
			}
			player.line(event.target);
			event.target.chooseToDiscard('h', hunhuoNum, true);
		},
		ai: {
			order: 9.1,
			result: {
				target(player, target) {
					if (target.countCards('h') == 0) {
						return 0;
					}
					return -1;
				},
			}
		}
	},
	hok_chihui: {
		usable: 1,
		enable: 'phaseUse',
		filter(event, player) {
			return game.hasPlayer(function (current) {
				return current.countCards('h') == 0 && current != player;
			});
		},
		filterTarget(card, player, target) {
			return target != player && target.countCards('h') == 0;
		},
		content() {
			player.logSkill('hok_chihui', target);
			target.damage('fire');
			target.damage('fire');
		},
		ai: {
			order: 5.5,
			result: {
				target(player, target) {
					return Math.sign(get.damageEffect(target, player, target, 'fire'));
				},
			},
		}
	},
	// 艾琳
	hok_lingwu: {
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		forced: true,
		filter(event, player) {
			return game.phaseNumber == 0;
		},
		content() {
			player.expandEquip(1);
			var card = get.cardPile(function (card) {
				return get.subtype(card) == 'equip1';
			});
			player.$gain2(card, false);
			game.delayx();
			player.equip(card);
		},
	},
	hok_yewu: {
		derivation: 'hok_yueguishengfang',
		usable: 1,
		enable: 'phaseUse',
		filterTarget(card, player, target) {
			return player != target && target.getCards('h').length != 0;
		},
		content() {
			if (player.countMark('hok_yueguishengfang') < 18) {
				player.addMark('hok_yueguishengfang', 2);
			}
			var cards = target.getCards('h', function (card) {
				return lib.filter.cardDiscardable(card, player, 'hok_yewu');
			});
			if (cards.length > 0) target.discard(cards.randomGet());
		},
		ai: {
			result: {
				target(player, target) {
					return -1;
				}
			},
			threaten: 1,
			order: 9,
			expose: 0.2,
		}
	},
	hok_xuanwu: {
		derivation: 'hok_yueguishengfang',
		locked: false,
		forced: true,
		trigger: {
			player: ['useCardAfter', 'respondAfter'],
		},
		filter(event, player) {
			if (player.hasSkill('hok_xuanwu_turn')) {
				return false;
			}
			return event.card && event.card.name == 'sha';
		},
		content() {
			if (player.countMark('hok_yueguishengfang') < 18) {
				player.addMark('hok_yueguishengfang', 1);
			}
			if (player.getHistory('gain', function (evt) {
				return evt.getParent(2).name == 'hok_xuanwu';
			}).length < 3) {
				player.draw();
			}
		},
		subSkill: {
			turn: { charlotte: true },
		}
	},
	hok_yueguishengfang: {
		marktext: '月',
		intro: {
			name: '月桂',
			content: 'mark',
		},
		usable: 1,
		enable: 'phaseUse',
		filter(event, player) {
			return player.countMark('hok_yueguishengfang') >= 6;
		},
		content() {
			'step 0'
			event.sum = Math.floor(player.countMark('hok_yueguishengfang') / 3);
			event.num = 0;
			player.addSkill('hok_xuanwu_turn');
			'step 1'
			event.num++;
			player.chooseUseTarget({
				name: 'sha',
				nature: 'thunder',
				isCard: true,
			}, '请选择雷【杀】的目标（' + event.num + '/' + event.sum + '）', false);
			'step 2'
			if (result.bool) {
				player.removeMark('hok_yueguishengfang', 3);
			}
			'step 3'
			if (result.bool && event.num < event.sum) {
				event.goto(1);
			}
			'step 4'
			player.removeSkill('hok_xuanwu_turn');
		},
		ai: {
			order() {
				return get.order({
					name: 'sha',
					nature: 'thunder',
					isCard: true,
				});
			},
			result: {
				player(player) {
					if (player.hasValueTarget({
						name: 'sha',
						nature: 'thunder',
						isCard: true,
					})) return 1;
					return 0;
				},
			},
		},
	},
	// 敖隐
	hok_zhanghuo: {
		trigger: { player: 'useCardToPlayered' },
		forced: true,
		locked: false,
		usable: 1,
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		filter(event, player) {
			return event.card.name == 'sha' && event.card.nature == null;
		},
		content() {
			game.setNature(trigger.card, 'fire');
		},
		ai: {
			order() {
				return get.order({ name: 'sha' }) + Math.random() * 0.5;
			},
		},
		group: 'hok_zhanghuo_effect',
		subSkill: {
			effect: {
				forced: true,
				locked: false,
				trigger: { source: 'damageBegin1' },
				filter(event) {
					return event.card && event.card.name == 'sha' && event.hasNature('fire');
				},
				mod: {
					aiOrder(player, card, num) {
						if (get.itemtype(card) == 'card' && card.name == 'sha' && card.nature) return num + 0.1 + Math.random() * 0.4;
					},
				},
				content() {
					trigger.num++;
				},
			},
		},
	},
	hok_siyu: {
		trigger: { player: 'useCardToPlayered' },
		forced: true,
		locked: false,
		usable: 1,
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		filter(event, player) {
			return event.card.name == 'sha' && event.card.nature == null;
		},
		content() {
			game.setNature(trigger.card, 'thunder');
		},
		ai: {
			order() {
				return get.order({ name: 'sha' }) + Math.random() * 0.5;
			},
		},
		group: 'hok_siyu_effect',
		subSkill: {
			effect: {
				forced: true,
				locked: false,
				trigger: { source: 'damageBegin1' },
				filter(event) {
					return event.card && event.card.name == 'sha' && event.hasNature('thunder');
				},
				mod: {
					aiOrder(player, card, num) {
						if (get.itemtype(card) == 'card' && card.name == 'sha' && card.nature) return num + 0.1 + Math.random() * 0.4;
					},
				},
				content() {
					if (trigger.num > 0) {
						player.recover();
					}
				},
			},
		},
	},
	hok_jiafeng: {
		trigger: { player: 'useCardToPlayered' },
		forced: true,
		locked: false,
		usable: 1,
		check(event, player) {
			return get.attitude(player, event.target) <= 0;
		},
		filter(event, player) {
			return event.card.name == 'sha' && event.card.nature == null;
		},
		mod: {
			aiOrder(player, card, num) {
				if (get.itemtype(card) == 'card' && card.name == 'sha' && card.nature) return num + 0.1 + Math.random() * 0.4;
			},
		},
		content() {
			game.setNature(trigger.card, 'ice');
			trigger.getParent().directHit.add(trigger.target);
		},
		ai: {
			directHit_ai: true,
			order() {
				return get.order({ name: 'sha' }) + Math.random() * 0.5;
			},
		},
	},
	hok_qiongxuan: {
		skillAnimation: true,
		animationColor: 'wood',
		unique: true,
		mark: true,
		limited: true,
		trigger: { player: 'damageBegin4' },
		check(event, player) {
			if (player.hasJudge('lebu')) {
				return 0;
			}
			if (player.hp == 2) {
				return 1;
			}
			if (player.countCards('h', 'sha') == 0) {
				return 0;
			}
			return 1;
		},
		content() {
			player.awakenSkill('hok_qiongxuan');
			player.turnOver();
			player.addTempSkill('hok_qiongxuan_effect', { player: 'phaseBeginStart' });
			player.addSkill('hok_qiongxuan_video');
		},
		subSkill: {
			effect: {
				forced: true,
				firstDo: true,
				mark: true,
				intro: {
					name: '穷玄',
					content: '不能成为牌的目标',
				},
				mod: {
					targetEnabled(card, player, target) {
						return false;
					},
				}
			},
			video: {
				trigger: { player: 'phaseBefore' },
				forced: true,
				firstDo: true,
				content() {
					player.turnOver(false);
					player.removeSkill('hok_qiongxuan_video');
					player.addSkill('hok_qiongxuan_wushuang');
				},
			},
			wushuang: {
				mod: {
					selectTarget(card, player, range) {
						if (card.name == 'sha' && range[1] != -1) range[1]++;
					},
					cardUsable(card, player, num) {
						if (card.name == 'sha') return num + 1;
					},
					attackRange(player, num) {
						return num + 1;
					},
				},
				trigger: { player: 'phaseEnd' },
				forced: true,
				content() {
					player.removeSkill('hok_qiongxuan_wushuang');
				},
			},
		},
	},

	// B
	// 百里守约
	hok_miaozhun: {
		derivation: 'hok_yinshen',
		trigger: { player: 'phaseJieshuBegin' },
		forced: true,
		locked: false,
		filter(event, player) {
			if (player.countMark('hok_yinshen')) {
				return false;
			}
			if (player.getHistory('skipped').contains('phaseUse')) return true;
			var history = player.getHistory('useCard').concat(player.getHistory('respond'));
			for (var i = 0; i < history.length; i++) {
				if ((history[i].card.name == 'sha' || get.type(history[i].card) == 'trick' || get.type(history[i].card) == 'delay') && history[i].isPhaseUsing()) {
					return false;
				}
			}
			return true;
		},
		content() {
			player.addMark('hok_yinshen', 1);
			player.addSkill('hok_yinshen');
		},
		group: 'hok_miaozhun_effect',
		subSkill: {
			effect: {
				mod: {
					attackRange(player, num) {
						return num + 2;
					},
				}
			},
		},
	},
	hok_miyan: {
		derivation: 'hok_yinshen',
		usable: 1,
		enable: 'phaseUse',
		filterTarget: lib.filter.notMe,
		content() {
			if (target.hasMark('hok_yinshen')) {
				target.removeMark('hok_yinshen', 1);
				target.removeSkill('hok_yinshen');
			}
			target.chooseToDiscard('h', true).set('ai', function (card) {
				return 6 - get.value(card);
			});
		},
		ai: {
			result: {
				target(player, target) {
					return -1;
				}
			},
			threaten: 1,
			order: 9,
			expose: 0.2,
		}
	},
	hok_kuangju: {
		trigger: { player: 'phaseUseBegin' },
		filter(event, player) {
			return game.hasPlayer(target => player.canUse({ name: 'sha' }, target, false, true)) && player.getCards('hs', function (card) {
				return get.type(card) == 'basic';
			}).length > 0;
		},
		content() {
			'step 0';
			player.chooseToDiscard([1, player.getCards('h', function (card) {
				return get.type(card) == 'basic';
			}).length], 'hs', '弃置X张基本牌，视为使用一张伤害为X的【杀】（不可以触发酒）。', { type: 'basic' })
				.set('ai', (card) => 1 / (get.value(card) || 0.5));
			'step 1';
			if (result.bool) {
				var sum = result.cards.length;
				if (sum > 0) {
					player.storage.hok_kuangju = sum;
				}
			}
			'step 2'
			if (result.bool) {
				player.chooseUseTarget('sha', true, false);
			}
		},
		group: 'hok_kuangju_effect',
		subSkill: {
			effect: {
				forced: true,
				locked: false,
				trigger: { source: 'damageBegin1' },
				filter(event, player) {
					return player.storage.hok_kuangju > 0;
				},
				content() {
					'step 0'
					trigger.num = player.storage.hok_kuangju;
					'step 1'
					player.storage.hok_kuangju = 0;
				},
			}
		}
	},
	// 百里玄策
	hok_rexue: {
		trigger: { source: 'dieAfter' },
		forced: true,
		locked: false,
		content() {
			player.draw(2);
		},
	},
	hok_yangou: {
		derivation: 'hok_yangou_lock',
		usable: 1,
		enable: 'phaseUse',
		filterTarget: lib.filter.notMe,
		content() {
			'step 0'
			target.judge(function (card) {
				if (get.number(card) > 4) return 2;
				return -2;
			}).judge2 = function (result) {
				return result.bool;
			};
			'step 1'
			if (result.bool) {
				target.addTempSkill('hok_yangou_effect');
			}
		},
		group: ['hok_yangou_lock'],
		subSkill: {
			effect: {
				charlotte: true,
				mark: true,
				intro: {
					name: '魇钩',
					content: '不能使用和打出【闪】',
				},
				mod: {
					cardEnabled2(card, player) {
						if (card.name == 'shan') return false;
					},
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (get.tag(card, 'damage')) return [0, -999999];
						},
					},
				},
			},
			lock: {
				usable: 1,
				enable: 'phaseUse',
				changeSeat: true,
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return current.hasSkill('hok_yangou_effect');
					});
				},
				content() {
					var target = game.filterPlayer(function (current) {
						return current.hasSkill('hok_yangou_effect');
					})[0];
					var playerSeatNum = player.getSeatNum();
					var targetSeatNum = target.getSeatNum();
					var farthestSeatNum = (playerSeatNum + game.countPlayer() / 2) % game.countPlayer();
					var swapPlayer = player;
					if ((playerSeatNum < farthestSeatNum && (targetSeatNum < playerSeatNum || targetSeatNum > farthestSeatNum)) || (playerSeatNum > farthestSeatNum && (targetSeatNum < playerSeatNum && targetSeatNum > farthestSeatNum))) {
						swapPlayer = player.next;
					}
					// if (farthestSeatNum % 1 != 0 && targetSeatNum == farthestSeatNum + 0.5) {
					// swapPlayer = player.next;
					// }
					// game.swapSeat(target, swapPlayer, null, true);
					game.broadcastAll(function (target1, target2) {
						game.swapSeat(target1, target2, null, true);
					}, target, swapPlayer);
					var equip3 = target.getCards('e', { subtype: 'equip3' })
					if (equip3) {
						target.discard(equip3).discarder = player;
					}
				},
				ai: {
					result: { player: 1 },
					order: 11,
				}
			},
		},
		ai: {
			result: { target: -1 },
			threaten: 1.5,
			order: 11.5,
		}
	},
	hok_lianshan: {
		derivation: 'hok_yangou_lock',
		usable: 1,
		enable: 'phaseUse',
		filterTarget(card, player, target) {
			if (target == player) {
				return false;
			}
			return get.distance(player, target) <= 1 || target.hasSkill('hok_yangou_effect');
		},
		content() {
			if (target.hasSkill('hok_yangou_effect')) {
				player.addTempSkill('hok_lianshan_effect');

				var playerSeatNum = player.getSeatNum();
				player.storage.hok_seat = player.next;
				var targetSeatNum = target.getSeatNum();
				var farthestSeatNum = (targetSeatNum + game.countPlayer() / 2) % game.countPlayer();
				var swapPlayer = target;
				if ((targetSeatNum < farthestSeatNum && (playerSeatNum < targetSeatNum || playerSeatNum > farthestSeatNum)) || (targetSeatNum > farthestSeatNum && (playerSeatNum < targetSeatNum && playerSeatNum > farthestSeatNum))) {
					swapPlayer = target.next;
				}
				game.broadcastAll(function (target1, target2) {
					game.swapSeat(target1, target2, null, true);
				}, player, swapPlayer);
				target.damage('nocard');
			} else {
				if (game.hasPlayer(current => {
					return current.hasSkill('hok_yangou_effect');
				})) {
					var tar = game.filterPlayer(current => {
						return current.hasSkill('hok_yangou_effect');
					})[0];
					tar.removeSkill('hok_yangou_effect');
				}
				target.addTempSkill('hok_yangou_effect');
			}
		},
		subSkill: {
			effect: {
				forced: true,
				trigger: { player: 'phaseEnd' },
				content() {
					game.broadcastAll(function (target1, target2) {
						game.swapSeat(target1, target2, null, true);
					}, player, player.storage.hok_seat);
				}
			}
		},
		ai: {
			result: {
				target(player, target) {
					return -1;
				}
			},
			threaten: 1.5,
			order: 11.1,
			expose: 0.3,
		}
	},

	// D
	// 妲己
	hok_meixin: {
		enable: 'phaseUse',
		usable: 1,
		marktext: '魅',
		intro: {
			name: '魅心',
			content: 'mark',
		},
		filter(event, player) {
			return player.countCards('h', { color: 'red' }) > 0;
		},
		enable: 'chooseToUse',
		filterCard(card) {
			return get.color(card) == 'red';
		},
		position: 'h',
		viewAs: { name: 'lebu' },
		prompt: '将一张红色手牌当乐不思蜀使用',
		onuse(result, player) {
			if (player.countMark('hok_meixin') < 4) {
				player.addMark('hok_meixin', 1);
			}
		},
		check(card) {
			return 7 - get.value(card);
		},
		ai: {
			result: {
				target(player, target) {
					return get.effect(target, { name: 'lebu' }, player, target);
				}
			},
			order: 9,
		}
	},
	hok_huhuo: {
		audio: 2,
		enable: 'phaseUse',
		usable: 1,
		skillAnimation: true,
		animationColor: 'orange',
		filter(event, player) {
			return player.countMark('hok_meixin') >= 3;
		},
		content() {
			'step 0'
			player.removeMark('hok_meixin', 3);
			'step 1'
			player.chooseTarget('为狐火减少1~3个目标', [1, 3], function (card, player, target) {
				return player.inRange(target);
			}).set('ai', function (target) {
				if (target == player || !player.inRange(target)) {
					return false;
				}
				return get.attitude(_status.event.player, target);
			});
			'step 2'
			event.huhuoList = game.filterPlayer(function (target) {
				return player.inRange(target) && !target.isDead() && target != player;
			});
			event.huhuoDamage = (event.huhuoList.length > 4 ? 5 : 3);
			if (result.bool) {
				for (var i = 0; i < result.targets.length; i++) {
					// event.huhuoList.splice(event.huhuoList.indexOf(result.targets[0]), 1);
					event.huhuoList.splice(event.huhuoList.indexOf(result.targets[i]), 1);
				}
			}
			'step 3'
			for (var i = 0; i < event.huhuoDamage; i++) {
				huhuoTarget = event.huhuoList.randomGet();
				player.line(huhuoTarget, 'fire');
				huhuoTarget.damage('fire');
			}
		},
		ai: {
			order: 1,
			expose: 0.2,
			result: {
				player(player) {
					var list = game.filterPlayer(function (target) {
						return player.inRange(target) && !target.isDead() && target != player && get.attitude(_status.event.player, target) < 0 ? true : false;
					});
					if (list.length >= 1) {
						return 1;
					}
					return 0;
				}
			},
			// effect: {
			// 	target(card, player, target) {
			// 		if (player == target && (get.subtype(card) == 'equip1' || get.subtype(card) == 'equip4')) {
			// 			if (get.equipValue(card) < 5) return 0;
			// 		}
			// 		if (!target.isEmpty(1)) return;
			// 		return 1;
			// 	}
			// }
		},
	},
	// 大司命
	hok_mingge: {
		marktext: '鸣',
		intro: {
			name: '鸣戈',
			content: 'mark',
		},
		trigger: { source: 'damageSource' },
		forced: true,
		filter(event, player) {
			return event.num > 0;
		},
		content() {
			if (!trigger.player.hasMark('hok_mingge')) {
				trigger.player.addMark('hok_mingge');
			} else {
				var cards = trigger.player.getCards('h', function (card) {
					return lib.filter.cardDiscardable(card, trigger.player, 'hok_mingge');
				});
				if (cards.length > 0) trigger.player.discard(cards.randomGets(2));
			}
			player.storage.clears = player.storage.clears.filter(element => element !== trigger.player);
		},
		group: ['hok_mingge_effect', 'hok_mingge_record', 'hok_mingge_clear'],
		subSkill: {
			effect: {
				mod: {
					attackRange(player, num) {
						if (player.storage._xuanji) return num;
						return num + 1;
					},
				}
			},
			record: {
				trigger: { player: 'phaseBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					return game.hasPlayer((current) => {
						return current.countMark('hok_mingge');
					});
				},
				content() {
					player.storage.clears = game.filterPlayer((current) => {
						return current.countMark('hok_mingge');
					});
				},
			},
			clear: {
				trigger: { player: 'phaseEnd' },
				forced: true,
				locked: false,
				filter(event, player) {
					if (player.storage.clears != undefined) {
						return player.storage.clears.length > 0;
					}
					return false;
				},
				content() {
					'step 0'
					player.storage.clears.forEach((element) => {
						if (element.hasMark('hok_mingge')) {
							element.removeMark('hok_mingge', 1);
						}
					})
					'step 1'
					player.storage.clears = [];
				},
			}
		}
	},
	hok_hungui: {
		trigger: { source: 'damageSource' },
		filter(event, player) {
			return event.card && event.card.name == 'sha' && event.player.hp == 1;
		},
		content() {
			player.line(trigger.player, { color: [255, 255, 0] });
			trigger.player.die();
			player.draw(2);
		},
	},
	// 东皇太一
	hok_rishi: {
		marktext: '蚀',
		intro: {
			name: '日蚀',
			content: 'mark',
		},
		trigger: { player: 'phaseZhunbeiBegin' },
		forced: true,
		locked: false,
		filter(event, player) {
			if (player.countMark('hok_rishi') < 3) {
				return true;
			}
			return false;
		},
		content() {
			player.addMark('hok_rishi', 1);
		},
		group: 'hok_rishi_biyue',
		subSkill: {
			biyue: {
				trigger: { player: 'phaseJieshuBegin' },
				frequent: true,
				preHidden: true,
				filter(event, player) {
					return player.countMark('hok_rishi') != 0;
				},
				async content(event, trigger, player) {
					if (player.countMark('hok_rishi') < 3) {
						player.draw();
					} else {
						player.draw(2);
					}
				},
			},
		},
	},
	hok_duoqi: {
		enable: 'phaseUse',
		usable: 1,
		skillAnimation: true,
		animationColor: 'water',
		filter(event, player) {
			if (player.countMark('hok_rishi') == 3) {
				return true;
			}
			return false;
		},
		filterTarget(card, player, target) {
			return target != player;
		},
		content() {
			player.storage.hok_duoqi = true;
			player.addSkill('hok_duoqi_effect');
			player.addSkill('fengyin');
			player.addMark('hok_duoqi_effect');

			target.addSkill('hok_duoqi_effect');
			target.addSkill('fengyin');
			target.addMark('hok_duoqi_effect');

			player.removeMark('hok_rishi', 3);
			target.damage();
		},
		ai: {
			order: 1,
			result: {
				target(player, target) {
					return -1;
				}
			}
		},
		subSkill: {
			effect: {
				marktext: '堕契',
				intro: {
					name: '堕契',
					content: '锁定技。你的回合开始时你跳过本回合。你不能使用和打出牌。你非锁定技失效。当另一名“堕契”角色受到伤害后，你受到等量的伤害。',
				},
				forced: true,
				trigger: { player: 'phaseBegin' },
				content() {
					trigger.cancel();
					if (player.storage.hok_duoqi) {
						let targets = game.filterPlayer(current => current.hasSkill('hok_duoqi_effect'));
						for (let target of targets) {
							target.removeSkill('hok_duoqi_effect');
							target.removeMark('hok_duoqi_effect');
							target.removeSkill('fengyin');
						}
						player.storage.hok_duoqi = false;
					} else {
						player.storage.hok_duoqi = true;
					}
				},
				group: ['hok_duoqi_xiongluan', 'hok_duoqi_xianfu'],
			},
			xiongluan: {
				mod: {
					cardEnabled2(card, player) {
						if (get.position(card) == 'h' || get.position(card) == 'e' || get.position(card) == 's') return false;
					},
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (get.tag(card, 'damage')) return [0, -999999];
						},
					},
				},
				charlotte: true,
			},
			xianfu: {
				charlotte: true,
				trigger: { player: 'damageEnd' },
				forced: true,
				filter(event, player) {
					if (event.num <= 0 || event.getParent().name == 'hok_duoqi_xianfu' || event.getParent().name == 'hok_duoqi') return false;
					if (event.name == 'damage') return true;
					return player.isDamaged();
				},
				content() {
					let targets = game.filterPlayer(current => {
						return current != player && current.hasSkill('hok_duoqi_xianfu');
					});
					for (var target of targets) {
						target.damage(trigger.num, 'nosource');
					}
				},
			},
		}
	},
	// 朵莉亚
	hok_renyu: {
		trigger: { player: 'damageBegin4' },
		filter(event) {
			return event.hasNature('fire');
		},
		forced: true,
		content() {
			trigger.cancel();
		},
		ai: {
			nofire: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'fireDamage')) return 'zerotarget';
				},
			},
		},
	},
	hok_huange: {
		derivation: 'hok_yinshen',
		usable: 1,
		enable: 'phaseUse',
		content() {
			'step 0'
			player.chooseTarget(get.prompt2('hok_huange')).set('ai', target => {
				var player = _status.event.player;
				if (get.attitude(player, target) < 0) return get.effect(target, { name: 'guohe' }, player, player);
				return 0;
			});
			'step 1'
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill('hok_huange', target);
				player.line(target);
				if (target.hasMark('hok_yinshen')) {
					target.removeMark('hok_yinshen', 1);
					target.removeSkill('hok_yinshen');
				}
				if (get.distance(player, target) <= 1) {
					target.chooseToDiscard('h', true).set('ai', function (card) {
						return 6 - get.value(card);
					});
				}
			}
			else event.finish();
		},
		ai: {
			threaten: 1,
			order: 9,
			expose: 0.2,
			result: {
				player: 1,
			},
		}
	},
	hok_zhulang: {
		enable: 'phaseUse',
		usable: 1,
		content() {
			'step 0'
			player.chooseTarget(get.prompt2('hok_zhulang')).set('ai', target => {
				var player = _status.event.player;
				if (get.attitude(player, target) > 0) return get.effect(target, { name: 'kaihua' }, player, player);
				return 0;
			});
			'step 1'
			if (result.bool) {
				player.logSkill('hok_zhulang', result.targets);
				event.hok_zhulang_target = result.targets[0];
				player.line(event.hok_zhulang_target, 'green');
				event.hok_zhulang_target.recover();
				event.hok_zhulang_target.draw(1);
			}
			else event.finish();
			'step 2'
			event.hok_zhulang_target.chooseToDiscard(1, 'he', true);
		},
		ai: {
			order: 3,
			result: {
				player: 1,
			},
		},
	},
	hok_tianlai: {
		trigger: { player: 'phaseUseBegin' },
		filter(event, player) {
			return player.countCards('hs') > 1;
		},
		direct: true,
		content() {
			'step 0'
			var maxThreaten = 0;
			game.filterPlayer(function (target) {
				var att = get.attitude(_status.event.player, target);
				if (att > 0) {
					if (get.threaten(target) > maxThreaten) {
						maxThreaten = get.threaten(target);
					}
				}
				return false;
			});
			player.chooseCardTarget({
				prompt: get.prompt2('hok_tianlai'),
				filterCard: lib.filter.cardDiscardable,
				selectCard: 2,
				position: 'hs',
				filterTarget: true,
				complexSelect: true,
				selectTarget: 1,
				ai1: function (card) {
					return 8 - get.value(card);
				},
				ai2: function (target) {
					var player = _status.event.player,
						att = get.attitude(player, target);
					if (att > 0 && maxThreaten == get.threaten(target)) return att;
					return -1;
				},
			});
			'step 1'
			if (result.bool) {
				var cards = result.cards,
					target = result.targets[0];
				player.logSkill('hok_tianlai', target);
				player.line(target, 'green');
				target.addSkill('hok_tianlai_effect');
				if (cards && cards.length) {
					player.discard(cards);
				}
			}
		},
		subSkill: {
			effect: {
				trigger: { player: ['useSkillAfter', 'logSkill'] },
				enable: 1,
				filter(event, player) {
					if (lib.skill[event.skill].equipSkill == true) return false;
					if (event.skill != 'hok_tianlai') return true;
					return false;
				},
				content() {
					'step 0'
					player.removeSkill('hok_tianlai_effect');
					'step 1'
					var skillsLength = player.getHistory('useSkill').length;
					if (skillsLength >= 2) {
						var nextSkill = player.getHistory('useSkill')[skillsLength - 2].skill;
						let nextSkillName = nextSkill.toString();
						if (nextSkillName != 'hok_tianlai' && nextSkillName != 'hok_tianlai_effect' && nextSkillName != 'hok_minghui' && nextSkillName != 'miniyoulong') {
							player.useSkill(nextSkill);
						} else if (nextSkillName == 'hok_minghui') {
							player.addTempSkill('hok_minghuitianlai');
						}
					}
				},
			}
		},

	},

	// G
	// 高渐离
	hok_aige: {
		marktext: '歌',
		intro: {
			name: '哀歌',
			content: 'mark',
		},
		trigger: { player: 'useCardAfter' },
		frequent: true,
		preHidden: true,
		filter(event) {
			return get.tag(event.card, 'damage') || event.card.name == 'sha';
		},
		content() {
			if (player.countMark('hok_aige') < 5) {
				player.addMark('hok_aige');
			}
		},
		group: ['hok_aige_effect', 'hok_aige_gongqing'],
		subSkill: {
			effect: {
				trigger: { player: 'useCard2' },
				forced: true,
				filter(event, player) {
					return player.countMark('hok_aige') >= 3 && event.card.name == 'sha';
				},
				content() {
					player.removeMark('hok_aige', 3);
					trigger.baseDamage += 1;
				},
			},
			gongqing: {
				trigger: { player: 'damageBegin4' },
				frequent: true,
				filter(event, player, name) {
					if (!event.source) return false;
					event.hok_aige_gongqing = game.filterPlayer(function (target) {
						return player.inRange(target) && !target.isDead() && target != player;
					});
					if (event.num < event.hok_aige_gongqing.length) return event.num > 1;
					return false;
				},
				preHidden: true,
				content() {
					var range = trigger.source.getAttackRange();
					event.hok_aige_gongqing = game.filterPlayer(function (target) {
						return player.inRange(target) && !target.isDead() && target != player;
					});
					if (range < event.hok_aige_gongqing.length && trigger.num > 1) trigger.num -= 1;
				},
				ai: {
					filterDamage: true,
					skillTagFilter(player, tag, arg) {
						if (arg && arg.player) {
							if (arg.player.hasSkillTag('jueqing', false, player)) return false;
							if (arg.player.getAttackRange() < 3) return true;
						}
						return false;
					}
				},
			}
		},
	},
	hok_kuangge: {
		usable: 1,
		enable: 'phaseUse',
		enable: ['chooseToRespond', 'chooseToUse'],
		filterCard(card) {
			return lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay';
		},
		viewAs: { name: 'sha' },
		viewAsFilter(player) {
			if (!player.countCards('hs', { type: 'trick' }) && !player.countCards('hs', { type: 'delay' })) {
				return false;
			}
		},
		position: 'hs',
		prompt: '将一张锦囊当【杀】使用或打出',
		check(card) {
			const val = get.value(card);
			if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
			return 5.5 - val;
		},
		ai: {
			respondSha: true,
		},
	},
	hok_lige: {
		enable: 'phaseUse',
		filter(event, player) {
			return game.hasPlayer(target => player.canUse({ name: 'sha', nature: 'fire' }, target)) && player.countCards('hes', card => lib.skill.hok_lige.filterCard(card, player));
		},
		position: 'hes',
		filterCard(card, player) {
			return get.type(card) == 'equip' && (get.subtype(card) == 'equip2' || get.subtype(card) == 'equip3');
		},
		filterTarget(card, player, target) {
			return player.canUse({ name: 'sha', nature: 'fire', isCard: true }, target);
		},
		usable: 1,
		check: (card) => 8 - get.value(card),
		prompt: '弃置一张防具牌或防具马，视为对一名其他角色使用一张不计入次数的火【杀】',
		content() {
			'step 0'
			player.useCard({ name: 'sha', nature: 'fire', isCard: true }, target);
			player.addSkill('hok_lige_paoxiao');
			'step 1'
			var next = player.chooseToUse();
			next.set(
				'openskilldialog',
				`###${get.prompt('hok_kuangge')}###`
			);
			next.set('norestore', true);
			next.set('_backupevent', 'hok_kuangge');
			next.set('addCount', false);
			next.set('custom', {
				add: {},
				replace: { window() { } },
			});
			next.backup('hok_kuangge');
			'step 2'
			player.removeSkill('hok_lige_paoxiao');
		},
		subSkill: {
			paoxiao: {
				mod: {
					cardUsable(card, player, num) {
						if (card.name == 'sha') return Infinity;
					}
				},
			},
		},
	},
	hok_moyin: {
		enable: 'phaseUse',
		unique: true,
		limited: true,
		skillAnimation: true,
		animationColor: 'thunder',
		filter(event, player) {
			return player.countCards('hes');
		},
		content() {
			player.awakenSkill('hok_moyin');
			player.addTempSkill('hok_moyin_aige');
		},
		subSkill: {
			aige: {
				trigger: { player: 'useCard' },
				filter(event, player) {
					if (get.tag(event.card, 'damage') || event.card.name == 'sha')
						return lib.skill.hok_moyin_aige.logTarget(event, player).length;
					return false;
				},
				logTarget(event, player) {
					return game.filterPlayer(current => {
						return current != player && current.inRangeOf(player);
					});
				},
				forced: true,
				content() {
					'step 0'
					event.targets = lib.skill.hok_moyin_aige.logTarget(trigger, player).sortBySeat();
					'step 1'
					var target = event.targets.shift();
					event.target = target;
					target.chooseToDiscard('h', '魔音：弃置一张手牌，或失去1点体力').set('ai', card => {
						var player = _status.event.player;
						if (card.name == 'tao' || card.name == 'jiu') return 0;
						if (player.hasSkill('zhaxiang') && player.hp > 1) return 0;
						return 6 - get.value(card);
					});
					'step 2'
					if (!result.bool) target.loseHp();
					if (event.targets.length) event.goto(1);
				},
			},
		},
	},

	// H
	// 海诺
	hok_mingren: {
		marktext: '命',
		intro: {
			name: '命刃',
			content: 'mark',
		},
		trigger: { source: 'damageSource' },
		forced: true,
		filter(event, player) {
			return event.num > 0;
		},
		content() {
			if (!trigger.player.hasMark('hok_mingren') && trigger.player != player) {
				trigger.player.addMark('hok_mingren');
			}
			player.storage.clears = player.storage.clears.filter(element => element !== trigger.player);
		},
		group: ['hok_mingren_record', 'hok_mingren_clear'],
		subSkill: {
			record: {
				trigger: { player: 'phaseBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					return game.hasPlayer((current) => {
						return current.countMark('hok_mingren');
					});
				},
				content() {
					player.storage.clears = game.filterPlayer((current) => {
						return current.countMark('hok_mingren');
					});
				},
			},
			clear: {
				trigger: { player: 'phaseEnd' },
				forced: true,
				locked: false,
				filter(event, player) {
					if (player.storage.clears != undefined) {
						return player.storage.clears.length > 0;
					}
					return false;
				},
				content() {
					'step 0'
					player.storage.clears.forEach((element) => {
						if (element.hasMark('hok_mingren')) {
							element.removeMark('hok_mingren', 1);
						}
					})
					'step 1'
					player.storage.clears = [];
				},
			}
		}
	},
	hok_zhuimang: {
		trigger: { player: 'useCard2' },
		filter(event, player) {
			if (event.card.name != 'sha') return false;
			if (player.storage._xuanji) return false;
			return game.hasPlayer(function (current) {
				return !event.targets.contains(current) && current.hasMark('hok_mingren') && current != player;
			});
		},
		direct: true,
		content() {
			'step 0'
			player.chooseTarget(get.prompt('hok_zhuimang'), '为' + get.translation(trigger.card) + '增加任意个目标', function (card, player, target) {
				return !_status.event.sourcex.contains(target) && target.hasMark('hok_mingren') && player != target;
			}, [1, Infinity]
			).set('sourcex', trigger.targets).set('ai', function (target) {
				var player = _status.event.player;
				return get.effect(target, _status.event.card, player, player);
			}).set('card', trigger.card);
			'step 1'
			if (result.bool) {
				if (!event.isMine() && !event.isOnline()) game.delayx();
				event.targets = result.targets;
			}
			else {
				event.finish();
			}
			'step 2'
			player.logSkill('hok_zhuimang', event.targets);
			player.line(event.targets, 'fire');
			trigger.targets.addArray(event.targets);
		},
		ai: {
			effect: {
				player(card, player, target, current, isLink) {
					if (!isLink && card.name == 'sha') {
						if (player._double) return;
						player._double = true;
						if (get.effect(target, card, player, player) <= 0) {
							delete player._double;
							return;
						}
						if (game.hasPlayer(function (current) {
							return current != target && current.hasMark('hok_mingren') &&
								player.canUse(card, current) && get.effect(current, card, player, player) > 0;
						})) {
							delete player._double;
							return [1, 1];
						}
						delete player._double;
					}
				}
			}
		},
		group: 'hok_zhuimang_effect',
		subSkill: {
			effect: {
				mod: {
					attackRange(player, num) {
						if (player.storage._xuanji) return num;
						return num + 2;
					},
				}
			},
		},
	},
	hok_xuanji: {
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			if (!player.storage._xuanji) return false;
			return game.hasPlayer((current) => {
				return current != player && current.inRangeOf(player);
			});
		},
		content() {
			'step 0';
			if (game.hasPlayer((current) => {
				return current != player && current.hasSkill('hok_minghuitianlai_effect') && current.inRangeOf(player);
			})) {
				player.chooseTarget(
					'对攻击范围内的一名其他角色造成1点伤害',
					function (card, player, target) {
						return target != player && target.hasSkill('hok_minghuitianlai_effect') && target.inRangeOf(player);
					}
				).set('ai', function (target) {
					var player = _status.event.player;
					return get.damageEffect(target, player, player);
				});
			} else {
				player.chooseTarget(
					'对攻击范围内的一名其他角色造成1点伤害',
					function (card, player, target) {
						return target != player && target.inRangeOf(player);
					}
				).set('ai', function (target) {
					var player = _status.event.player;
					return get.damageEffect(target, player, player);
				});
			}
			'step 1';
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, 'fire');
				if (target.hasSkill('hok_minghuitianlai_effect')) {
					target.damage(2);
				} else {
					target.damage();
				}
				if (target.hasMark('hok_mingren')) {
					player.recover();
				}
			} else event.finish();
		},
	},
	hok_xingyou: {
		derivation: ['hok_zhuimang', 'hok_xuanji'],
		enable: 'phaseUse',
		usable: 1,
		init(player) {
			player.storage._xuanji = false;
		},
		mark: true,
		intro: {
			name: '行游',
			content(storage, player) {
				if (!player.storage.hok_xingyou) return;
				return '行游记录体力：' + player.storage.hok_xingyou;
			}
		},
		filter(event, player) {
			return player.countCards('h');
		},
		filterCard: lib.filter.cardDiscardable,
		selectCard: 1,
		check(card) {
			var player = _status.event.player;
			if (get.position(card) == 'h' && !player.countCards('h', 'du')) return 1;
			return 6 - get.value(card);
		},
		position: 'h',
		content() {
			'step 0'
			player.discard(cards);
			'step 1'
			if (!player.storage._xuanji) {
				player.storage._xuanji = true;
				player.storage.hok_xingyou = player.hp;
				player.gainMaxHp();
				player.recover();
			} else {
				player.storage._xuanji = false;
				player.loseMaxHp();
				player.draw();
			}
		},
		ai: {
			order: 1,
			result: { player: 1 },
		},
	},
	hok_minghui: {
		derivation: ['hok_minghuitianlai'],
		unique: true,
		mark: true,
		skillAnimation: true,
		animationColor: 'water',
		limited: true,
		enable: 'phaseUse',
		filter(event, player) {
			if (player.storage.hok_xingyou && player.storage.hok_xingyou > player.hp) return true;
			return false;
		},
		content() {
			player.awakenSkill('hok_minghui');
			player.recover(player.storage.hok_xingyou - player.hp);
		},
		intro: {
			content: 'limited',
		},
		ai: {
			order: 13,
			result: {
				player(player) {
					if (player.hp < 2) {
						return 1;
					}
					return 0;
				}
			},
		},
	},
	hok_minghuitianlai: {
		unique: true,
		mark: true,
		intro: {
			content: 'limited',
		},
		skillAnimation: true,
		animationColor: 'thunder',
		limited: true,
		enable: 'phaseUse',
		filterTarget(card, player, target) {
			return target != player && target.inRangeOf(player);
		},
		content() {
			player.awakenSkill('hok_minghuitianlai');
			target.addTempSkill('hok_minghuitianlai_effect');
		},
		ai: {
			order: 13,
			result: {
				target(player, target) {
					if (game.hasPlayer((current) => {
						return current != player && current.hasSkill('hok_minghuitianlai_effect') && current.inRangeOf(player);
					})) {
						return -get.damageEffect(target, player, player);
					} else {
						return -get.damageEffect(target, player, player);
					}
				},
			},
		},
		subSkill: {
			effect: {
				charlotte: true,
				mark: true,
				intro: {
					name: '命回·天籁',
					content: '不能使用和打出牌',
				},
				mod: {
					cardEnabled2(card, player) {
						return false;
					},
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (get.tag(card, 'damage')) return [0, -999999];
						},
					},
				},
			},
		},
	},
	// 后羿
	hok_chengjiesheji: {
		marktext: '羿',
		intro: {
			name: '惩戒射击',
			content: 'mark',
		},
		trigger: { source: 'damageBefore' },
		frequent: true,
		preHidden: true,
		filter(event, player) {
			if (!event.card || event.card.name != 'sha') return false;
			return event.num > 0;
		},
		content() {
			if (player.countMark('hok_chengjiesheji') < 3) {
				player.addMark('hok_chengjiesheji');
			}
		},
		group: ['hok_chengjiesheji_effect', 'hok_chengjiesheji_attackrange'],
		subSkill: {
			effect: {
				trigger: { player: 'useCard2' },
				forced: true,
				filter(event, player) {
					return player.countMark('hok_chengjiesheji') >= 3 && event.card.name == 'sha';
				},
				content() {
					player.removeMark('hok_chengjiesheji', 3);
					trigger.baseDamage += 1;
				},
			},
			attackrange: {
				mod: {
					attackRange(player, num) {
						return num + 2;
					},
				}
			},
		},
	},
	hok_duochongjianshi: {
		mod: {
			selectTarget(card, player, range) {
				if (card.name == 'sha' && range[1] != -1) range[1]++;
			},
		},
	},
	hok_luoriyuhui: {
		derivation: 'hok_yinshen',
		usable: 1,
		enable: 'phaseUse',
		filterTarget(card, player, target) {
			return target != player && target.inRangeOf(player);
		},
		content() {
			if (target.hasMark('hok_yinshen')) {
				target.removeMark('hok_yinshen', 1);
				target.removeSkill('hok_yinshen');
			}
			var cards = target.getCards('he', function (card) {
				return lib.filter.cardDiscardable(card, target, 'hok_luoriyuhui');
			});
			if (cards.length > 0) target.discard(cards.randomGet());
		},
		ai: {
			result: {
				target(player, target) {
					return -1;
				}
			},
			threaten: 1,
			order: 9,
			expose: 0.2,
		}
	},
	hok_zhuorizhishi: {
		enable: 'phaseUse',
		unique: true,
		limited: true,
		skillAnimation: true,
		animationColor: 'metal',
		content() {
			'step 0'
			player.awakenSkill('hok_zhuorizhishi');
			'step 1'
			player.chooseTarget(get.prompt2('hok_zhuorizhishi'), function (card, player, target) {
				return player != target && player.inRange(target);
			}).set('ai', function (target) {
				if (target == player || !player.inRange(target)) {
					return false;
				}
				return get.attitude(_status.event.player, target) < -1;
			});
			'step 2'
			if (result.bool) {
				var target = result.targets[0];
				target.turnOver();
				target.chooseToDiscard('he', Math.ceil(get.distance(target, player) / 2), true);
			}
		},
		ai: {
			order: 10,
			expose: 0.2,
			result: {
				player(player) {
					var list = game.filterPlayer(function (target) {
						return player.inRange(target) && !target.isDead() && target != player && get.attitude(_status.event.player, target) < -1 ? true : false;
					});
					if (list.length >= 1) {
						return 1;
					}
					return 0;
				}
			},
		},
	},

	// L
	// 澜
	hok_polang: {
		trigger: {
			player: 'phaseUseBegin',
		},
		direct: true,
		content: function () {
			'step 0';
			player.chooseControl('获得【杀】', '获得【闪】', 'cancel2').set('prompt', get.prompt2('hok_polang')).set('ai', function () {
				if (player.hasCard({ name: 'shan' })) {
					return '获得【杀】';
				} else {
					return '获得【闪】';
				}
			});
			'step 1'
			if (result.control != 'cancel2') {
				player.logSkill('hok_polang');
				if (result.control == '获得【杀】') {
					let card = get.cardPile(function (card) {
						return card.name == 'sha';
					});
					if (card) player.gain(card, 'gain2');
				}
				else {
					let card = get.cardPile(function (card) {
						return card.name == 'shan';
					});
					if (card) player.gain(card, 'gain2');
				}
			}
			else event.finish();
		},
	},
	hok_duankong: {
		trigger: { source: 'damageSource' },
		forced: true,
		filter(event, player) {
			return event.card.name == 'sha' && (get.distance(player, event.player) <= 1) && player.isDamaged();
		},
		async content(event, trigger, player) {
			await player.recover();
		},
		mod: {
			cardUsableTarget(card, player, target) {
				if (!player.isPhaseUsing()) return;
				if (card.name == 'sha' && (get.distance(player, target) <= 1) && !player.getStorage('hok_duankong_mark').includes(target)) return true;
			},
		},
		group: ['hok_duankong_load'],
		subSkill: {
			load: {
				trigger: { player: 'useCard1' },
				filter: function (event, player) {
					if (!player.isPhaseUsing()) return false;
					return event.card.name == 'sha' && event.targets && event.targets.some(target => !player.getStorage('hok_duankong_mark').includes(target));
				},
				forced: true,
				popup: false,
				firstDo: true,
				content: function () {
					player.markAuto(
						'hok_duankong_mark',
						trigger.targets.filter(target => !player.getStorage('hok_duankong_mark').includes(target))
					);
					player.addTempSkill('hok_duankong_mark', 'phaseUseAfter');
				},
			},
			mark: {
				onremove: true,
				mark: 'character',
				intro: { content: '已对$使用杀' },
			},
		},
	},
	hok_chujue: {
		unique: true,
		skillAnimation: true,
		animationColor: 'wood',
		limited: true,
		enable: 'phaseUse',
		content() {
			'step 0'
			player.awakenSkill('hok_chujue');
			'step 1'
			player.chooseTarget(get.prompt2('hok_chujue'), function (card, player, target) {
				return player != target && player.inRange(target);
			}).set('ai', function (target) {
				if (target == player || !player.inRange(target)) {
					return false;
				}
				return get.attitude(_status.event.player, target) < -1;
			});
			'step 2'
			if (result.bool) {
				var target = result.targets[0];
				if (target.countDiscardableCards(player, 'he')) {
					player.line(target);
					player.discardPlayerCard('he', target, true);
				}
				if (target.countDiscardableCards(player, 'he')) {
					player.line(target);
					player.discardPlayerCard('he', target, true);
				}
				game.broadcastAll(
					function (target1, target2) {
						game.swapSeat(target1, target2, null, true);
					},
					player,
					target.getNext()
				);
			}
		},
		ai: {
			order: 10,
			expose: 0.2,
			result: {
				player(player) {
					var list = game.filterPlayer(function (target) {
						return player.inRange(target) && !target.isDead() && target != player && get.attitude(_status.event.player, target) < -1 ? true : false;
					});
					if (list.length >= 1) {
						return 1;
					}
					return 0;
				}
			},
		},
	},
	// 兰陵王
	hok_yinni: {
		derivation: 'hok_yinshen',
		trigger: { player: 'phaseBegin' },
		forced: true,
		locked: false,
		filter(event, player) {
			if (player.countMark('hok_yinshen')) {
				return false;
			}
			return true;
		},
		content() {
			player.addMark('hok_yinshen', 1);
			player.addSkill('hok_yinshen');
		},
		group: 'hok_yinni_effect',
		subSkill: {
			effect: {
				forced: true,
				locked: false,
				trigger: {
					player: 'useCardToPlayered',
				},
				filter(event, player) {
					return event.card.name == 'sha' && player.countMark('hok_yinshen');
				},
				content() {
					trigger.getParent().directHit.add(trigger.target);
				},
			},
		},
	},
	hok_yingshi: {
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(target => player.canUse({ name: 'sha' }, target, false, true)) && player.getCards('h', 'sha').length > 0;
		},
		filterCard(card) {
			return card.name == 'sha';
		},
		filterTarget(card, player, target) {
			return player.canUse({ name: 'sha', isCard: true }, target, false, true);
		},
		check: (card) => 5.5 - get.value(card),
		prompt: '弃置一张【杀】，视为对场上的一名角色使用一张无距离限制的【杀】，若此【杀】造成伤害，目标角色获得标记“影蚀”，失去一张【闪】',
		content() {
			'step 0'
			game.log(target.getCards('h'))
			player.useCard({ name: 'sha', isCard: true }, target, true);
			'step 1'
			let bool = game.hasPlayer2(function (current) {
				return current.getHistory('damage', function (evt) {
					return evt.getParent('hok_yingshi') == event;
				}).length > 0
			});
			if (bool) {
				target.addMark('hok_yingshi_boom')
				target.addSkill('hok_yingshi_boom')
				var cards = target.getCards('h', function (card) {
					return card.name == 'shan' && lib.filter.cardDiscardable(card, target, 'hok_yingshi');
				});
				if (cards.length > 0) target.discard(cards.randomGet());
			}
		},
		ai: {
			order() {
				return 10;
			},
			result: {
				target(player, target) {
					return get.effect(target, { name: 'sha' }, player, target);
				}
			},
		},
		subSkill: {
			boom: {
				forced: true,
				locked: false,
				marktext: '蚀',
				intro: {
					name: '影蚀',
					content: '回合结束时，受到1点来自“影蚀”角色的伤害',
				},
				trigger: { player: 'phaseEnd' },
				content() {
					player.storage.source.line(player);
					player.damage(player.storage.source);
					player.removeMark('hok_yingshi_boom');
					player.removeSkill('hok_yingshi_boom');
				},
				init(player) {
					player.storage.source = _status.currentPhase;
				},
			},
		},
	},
	hok_anxi: {
		enable: 'phaseUse',
		unique: true,
		limited: true,
		skillAnimation: true,
		animationColor: 'thunder',
		filter(event, player) {
			return game.hasPlayer(target => player.canUse({ name: 'sha' }, target)) && player.getCards('h', 'sha').length > 0;
		},
		filterCard(card) {
			return card.name == 'sha';
		},
		filterTarget(card, player, target) {
			return player.canUse({ name: 'sha', isCard: true }, target);
		},
		check: (card) => 6 - get.value(card),
		prompt: '弃置一张【杀】，视为对场上的一名角色使用了一张不计入次数的【杀】，此【杀】造成的伤害+1。',
		content() {
			player.awakenSkill('hok_anxi');
			player.useCard({ name: 'sha', isCard: true }, target).set('oncard', card => {
				_status.event.baseDamage = 2;
			});
		},
		ai: {
			order() {
				return get.order({
					name: 'juedou',
					isCard: true,
				}) + 0.1;
			},

			result: {
				target(player, target) {
					return get.effect(target, { name: 'sha' }, player, target);
				}
			},
		},
	},
	// 李信
	hok_guangan: {
		enable: 'phaseUse',
		usable: 1,
		marktext: '信',
		intro: {
			name: '信',
			content: 'mark',
		},
		filter(event, player) {
			if (player.countCards('hes') < 2) {
				return false;
			}
			if (player.storage.hok_tongkuang == '统御' || player.storage.hok_tongkuang == '狂暴') {
				return true;
			}
			return false;
		},
		content() {
			'step 0'
			player.chooseToDiscard(2, 'hes');
			'step 1'
			if (result.bool) {
				if (player.storage.hok_tongkuang == '统御') {
					if (player.hasSkill('hok_liehua')) {
						player.removeSkill('hok_liehua');
					}
					if (player.hasSkill('hok_guangzhan')) {
						player.removeSkill('hok_guangzhan');
					}
					player.addSkill('hok_baochong');
					player.addSkill('hok_cansi');
					player.storage.hok_tongkuang = '狂暴';
					player.popup('狂暴');
				}
				else if (player.storage.hok_tongkuang == '狂暴') {
					if (player.hasSkill('hok_baochong')) {
						player.removeSkill('hok_baochong');
					}
					if (player.hasSkill('hok_cansi')) {
						player.removeSkill('hok_cansi');
					}
					player.addSkill('hok_liehua');
					player.addSkill('hok_guangzhan');
					player.storage.hok_tongkuang = '统御';
					player.popup('统御');
				}
			}
		},
		group: 'hok_guangan_1',
		subSkill: {
			1: {
				trigger: { player: 'phaseBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					if (player.countMark('hok_guangan') < 3) {
						return true;
					}
					return false;
				},
				content() {
					player.addMark('hok_guangan', 1);
				}
			}
		}
	},
	hok_huiren: {
		trigger: { source: 'damageSource' },
		forced: true,
		filter(event, player) {
			return event.num > 0;
		},
		content() {
			player.addMark('hok_guangan', 1);
		},
	},
	hok_qiangzhan: {
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(target => player.canUse({ name: 'sha' }, target, false)) && player.countCards('h');
		},
		filterCard: true,
		filterTarget(card, player, target) {
			return player.canUse({ name: 'sha', isCard: true }, target, false);
		},
		check: (card) => 5 - get.value(card),
		prompt: '弃置一张手牌，视为对场上的一名角色使用了一张【杀】（无视距离且不计入次数）',
		content() {
			player.useCard({ name: 'sha', isCard: true }, target, false);
		},
		ai: {
			order() {
				return get.order({
					name: 'sha',
					isCard: true,
				});
			},
			result: {
				player(player) {
					if (player.hasValueTarget({
						name: 'sha',
						isCard: true,
					})) return 1.5;
					return 0.5;
				},
			},
		},
	},
	hok_tongkuang: {
		unique: true,
		limited: true,
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'gray',
		derivation: ['hok_tongyu_faq', 'hok_kuangbao_faq'],
		filter(event, player) {
			return player.countMark('hok_guangan') >= 3;
		},
		content() {
			'step 0'
			player.awakenSkill('hok_tongkuang');
			player.removeSkill('hok_huiren');
			player.removeSkill('hok_qiangzhan');
			'step 1'
			player.chooseControl('统御', '狂暴').set('prompt', '统狂：请选择一项').set('choiceList', [
				'统御<br/>\
				烈华：出牌阶段开始前，你可以跳过出牌阶段，下回合出牌阶段开始时视为使用2张雷杀。<br/>\
				光斩：你的攻击范围+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并跳过出牌阶段，下回合开始时弃置你判定区的牌并选择攻击范围内至多2名其他角色，对每名目标角色造成2点雷电伤害。',
				'狂暴<br/>\
				暴冲：出牌阶段开始前，你可以跳过出牌阶段和弃牌阶段，下回合开始时弃置你判定区的牌并回复1点体力。<br/>\
				残撕：摸牌阶段，你的摸牌数+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并选择攻击范围的其他角色，弃置其2张牌，令你本回合杀的次数+1。'
			]).set('ai', function () {
				return '统御';
			});
			'step 2'
			player.storage.hok_tongkuang = result.control;
			if (player.storage.hok_tongkuang == '统御') {
				player.addSkill('hok_liehua');
				player.addSkill('hok_guangzhan');
				player.popup('统御');
			}
			else {
				player.addSkill('hok_baochong');
				player.addSkill('hok_cansi');
				player.popup('狂暴');
			}
		},
		ai: {
			order: 3,
			result: {
				player: 1,
			},
		}
	},
	hok_liehua: {
		trigger: { player: 'phaseUseBefore' },
		filter(event, player) {
			return !player.hasSkill('hok_liehua_effect') && !player.hasSkill('hok_guangzhan_effect');
		},
		content() {
			trigger.cancel();
			player.addSkill('hok_liehua_effect');
		},
		check(event, player) {
			if (player.countMark('hok_guangan') >= 3) {
				return false;
			}
			let cards = player.getCards('h');
			let sumValue = 0;
			for (let i = 0; i < cards.length; i++) {
				sumValue += get.value(cards[i]);
			}
			if (player.hp > cards.length) {
				return true;
			}
			if (sumValue / cards.length > 7) {
				return false;
			}
			if (player.hp >= cards.length - 2 && sumValue / cards.length <= 5) {
				return true;
			}
			return false;
		},
		subSkill: {
			effect: {
				trigger: { player: 'phaseUseBegin' },
				forced: true,
				locked: false,
				content() {
					'step 0'
					event.num = 0;
					'step 1'
					event.num++;
					player.chooseUseTarget({
						name: 'sha',
						nature: 'thunder',
						isCard: true,
					}, '请选择雷【杀】的目标（' + event.num + '/2）', false);
					'step 2'
					if (result.bool && event.num < 2) event.goto(1);
				},
				group: ['hok_liehua_1', 'hok_liehua_2'],
			},
			1: {
				trigger: { player: 'phaseZhunbeiBegin' },
				forced: true,
				locked: false,
				content() {
					player.storage.hok_liehua_on = true;
				}
			},
			2: {
				trigger: { player: 'phaseJieshuBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					return player.storage.hok_liehua_on;
				},
				content() {
					player.storage.hok_liehua_on = false;
					player.removeSkill('hok_liehua_effect');
				}
			}
		}
	},
	hok_guangzhan: {
		trigger: { player: 'phaseUseBefore' },
		filter(event, player) {
			if (player.hasSkill('hok_liehua_effect') || player.hasSkill('hok_guangzhan_effect')) {
				return false;
			}
			return player.countMark('hok_guangan') >= 3;
		},
		content() {
			trigger.cancel();
			player.removeMark('hok_guangan', 3);
			player.addSkill('hok_guangzhan_effect');
		},
		group: ['hok_guangzhan_attack'],
		subSkill: {
			effect: {
				trigger: { player: 'phaseBegin' },
				forced: true,
				locked: false,
				content() {
					'step 0'
					player.discard(player.getCards('j'));
					player.chooseTarget(get.prompt('hok_guangzhan'), '选择攻击范围内至多2名其他角色，依次对这些角色造成2点雷电伤害', [1, 2], function (card, player, target) {
						return player.inRange(target);
					}).set('ai', target => {
						var player = _status.event.player;
						if (target == player || !player.inRange(target)) {
							return false;
						}
						return get.damageEffect(target, player, player, 'thunder') * Math.sqrt(2);
					});
					'step 1'
					if (result.bool) {
						var targets = result.targets;
						targets.sortBySeat();
						player.logSkill('hok_guangzhan', targets);
						for (var target of targets) {
							target.damage(2, 'thunder');
						}
					}
				},
				group: ['hok_guangzhan_1', 'hok_guangzhan_2'],
			},
			1: {
				trigger: { player: 'phaseZhunbeiBegin' },
				forced: true,
				locked: false,
				content() {
					player.storage.hok_guangzhan_on = true;
				}
			},
			2: {
				trigger: { player: 'phaseJieshuBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					return player.storage.hok_guangzhan_on;
				},
				content() {
					player.storage.hok_guangzhan_on = false;
					player.removeSkill('hok_guangzhan_effect');
				}
			},
			attack: {
				mod: {
					attackRange(player, num) {
						return num + 1;
					},
				}
			}
		}
	},
	hok_baochong: {
		trigger: { player: 'phaseUseBefore' },
		filter(event, player) {
			return !player.hasSkill('hok_baochong_effect');
		},
		content() {
			trigger.cancel();
			player.skip('phaseDiscard');
			player.addTempSkill('hok_baochong_effect', { player: 'phaseZhunbeiBegin' });
		},
		subSkill: {
			effect: {
				trigger: { player: 'phaseBegin' },
				forced: true,
				locked: false,
				content() {
					player.discard(player.getCards('j'));
					player.recover();
				}
			}
		}
	},
	hok_cansi: {
		trigger: { player: 'phaseUseBefore' },
		filter(event, player) {
			if (player.hasSkill('hok_baochong_effect')) {
				return false;
			}
			return player.countMark('hok_guangan') >= 3;
		},
		content() {
			'step 0'
			player.removeMark('hok_guangan', 3);
			'step 1'
			player.chooseTarget('选择一名其他角色，弃置其2张牌', function (card, player, target) {
				return player.inRange(target);
			}).set('ai', function (target) {
				if (target == player || !player.inRange(target)) {
					return false;
				}
				return get.attitude(_status.event.player, target);
			});
			'step 2'
			if (result.bool) {
				var target = result.targets[0];
				player.discardPlayerCard(target, 'h', [1, 2], true);
			}
			player.addTempSkill('hok_cansi_effect');
		},
		group: ['hok_cansi_yingzi'],
		subSkill: {
			effect: {
				forced: true,
				locked: false,
				mod: {
					cardUsable(card, player, num) {
						if (card.name == 'sha') return num + 1;
					}
				},
			},
			yingzi: {
				trigger: { player: 'phaseDrawBegin2' },
				forced: true,
				locked: false,
				filter(event, player) {
					return !event.numFixed;
				},
				content() {
					trigger.num++;
				},
				ai: {
					threaten: 1.3
				}
			},
		}
	},

	// M
	// 马可波罗
	hok_zuolun: {
		audio: 2,
		marktext: '轮',
		intro: {
			name: '左轮',
			content: 'mark',
		},
		forced: true,
		group: ['hok_zuolun_effect'],
		trigger: {
			source: 'damageSource',
		},
		filter(event) {
			return event.num > 0;
		},
		content() {
			if (trigger.player.countMark('hok_zuolun') < 2) {
				trigger.player.addMark('hok_zuolun', 1);
			}
		},
	},
	hok_zuolun_effect: {
		audio: 2,
		forced: true,
		trigger: {
			global: ['damageBefore'],
		},
		filter(event, player) {
			return event.name == 'damage';
		},
		content() {
			if (trigger.player.countMark('hok_zuolun') >= 2 && trigger.source.hasSkill('hok_zuolun')) {
				trigger.cancel();
				trigger.player.loseHp(trigger.num);
			}
		},
		ai: {
			jueqing: true
		},
	},
	hok_qianglin: {
		audio: 2,
		usable: 1,
		trigger: { player: 'useCard' },
		filter(event, player) {
			return event.card.name == 'sha' && player.countCards('h', 'sha') >= 1 && player.isPhaseUsing();
		},
		content() {
			'step 0'
			player.chooseToDiscard(true, 1, 'h', '弃置一张杀，视为对该角色使用两张【雷杀】（不可以触发酒）。', { name: 'sha' });
			player.addSkill('hok_qianglin_draw');
			'step 1'
			trigger.cancel();
			// player.chooseUseTarget({ name: 'sha', nature: 'thunder' }, '视为使用两张【雷杀】');
			for (target of trigger.targets) {
				player.useCard({ name: 'sha', nature: 'thunder' }, target);
				player.useCard({ name: 'sha', nature: 'thunder' }, target);
			}
			'step 2'
			// 'step 3'
			player.removeSkill('hok_qianglin_draw');
		},
		group: ['hok_qianglin_begin'],
		subSkill: {
			draw: {
				trigger: {
					global: ['damageEnd', 'loseHpEnd'],
				},
				forced: true,
				// usable: 1,
				content() {
					player.draw();
				},
			},
			begin: {
				frequent: true,
				trigger: { player: 'phaseUseBegin' },
				content() {
					var card = get.cardPile(function (cardx) {
						return cardx.name == 'sha';
					});
					if (card) player.gain(card, 'gain2', 'log');
				},
			}
		},
		ai: {
			order() {
				return get.order({ name: 'sha' }) - 0.1;
			},
			expose: 0.2,
			threaten: 2,
			result: {
				player(player) {
					var qianglin = game.filterPlayer(function (target) {
						return get.attitude(_status.event.player, target) < 0;
					});
					return qianglin.length > 0 ? 1 : 0;
				},
			},
		},
	},
	hok_danyu: {
		audio: 2,
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return player.countCards('hs') >= 4;
		},
		filterTarget: lib.filter.notMe,
		selectTarget: [1, 3],
		multitarget: true,
		multiline: true,
		content() {
			'step 0'
			event.danyuCards = player.getCards('hs');
			'step 1'
			if (event.danyuCards != undefined) {
				player.discard(event.danyuCards);
			}
			targets.sortBySeat();
			'step 2'
			for (var target of targets) {
				var r = Math.floor(Math.random() * 2) + 1;
				for (var dan = 0; dan < r; dan++) {
					target.damage(1, 'thunder');
				}
			}
		},
		ai: {
			order() {
				return get.order({ name: 'sha' }) + 0.1;
			},
			expose: 0.2,
			threaten: 2,
			result: {
				target(player, target) {
					var residualBlood = false;
					var list = game.filterPlayer(function (target) {
						var att = get.attitude(_status.event.player, target) <= -1;
						if (att && target.hp <= 2) {
							residualBlood = true;
						}
						return target != player && att || player.hp <= 2;
					});
					if (list.length >= 3 && residualBlood) {
						if (get.attitude(player, target) <= -1) {
							return -1;
						}
					}
					return 0;
				},
			},
		},
	},
	// 明世隐
	hok_lingua: {
		enable: 'phaseUse',
		usable: 1,
		filterTarget: lib.filter.notMe,
		content() {
			player.removeSkill('hok_lingua2');
			player.logSkill('hok_lingua');
			player.line('hok_lingua', target);
			player.storage.hok_lingua2 = target;
			player.addSkill('hok_lingua2');
			if (player.hasSkill('hok_lingua_2') || player.hasSkill('hok_lingua_4')) {
				player.popup('目标弃牌');
			} else {
				player.popup('目标摸牌');
			}
		},
		group: ['hok_lingua_yang', 'hok_lingua_yin'],
		subSkill: {
			yang: {
				trigger: { player: 'logSkill' },
				filter(event, player) {
					if (event.skill != 'hok_lingua') return false;
					return player.storage.hok_lingua1;
				},
				forced: true,
				locked: false,
				content() {
					'step 0'
					if (player.hasSkill('hok_lingua_3')) {
						player.removeSkill('hok_lingua_3');
					}
					if (player.hasSkill('hok_lingua_4')) {
						player.removeSkill('hok_lingua_4');
					}
					player.chooseControl('选项一', '选项二').set('prompt', '临卦：请选择一项').set('choiceList', [
						'目标角色造成伤害后摸1张牌',
						'目标角色造成伤害后随机弃置1张手牌'
					]).set('ai', function () {
						if (get.attitude(player, target) > 0) {
							return '选项一';
						} else {
							return '选项二';
						}
					});
					'step 1'
					if (result.control == '选项一') {
						player.addSkill('hok_lingua_3');
						game.log('目标角色造成伤害后摸1张牌');
						player.popup('目标摸牌');
					}
					else {
						player.addSkill('hok_lingua_4');
						game.log('目标角色造成伤害后随机弃置1张手牌');
						player.popup('目标弃牌');
					}
				}
			},
			yin: {
				trigger: { player: 'logSkill' },
				filter(event, player) {
					if (event.skill != 'hok_lingua') return false;
					return player.storage.hok_lingua1 != true;
				},
				forced: true,
				locked: false,
				content() {
					'step 0'
					if (player.hasSkill('hok_lingua_1')) {
						player.removeSkill('hok_lingua_1');
					}
					if (player.hasSkill('hok_lingua_2')) {
						player.removeSkill('hok_lingua_2');
					}
					player.chooseControl('选项一', '选项二').set('prompt', '临卦：请选择一项').set('choiceList', [
						'你的回合结束时，目标角色摸1张牌',
						'你的回合结束时，目标角色弃置1张牌'
					]).set('ai', function () {
						if (get.attitude(player, target) > 0) {
							return '选项一';
						} else {
							return '选项二';
						}
					});
					'step 1'
					if (result.control == '选项一') {
						player.addSkill('hok_lingua_1');
						game.log(get.translation(player.name) + '回合结束时，目标角色摸1张牌');
						player.popup('目标摸牌');
					}
					else {
						player.addSkill('hok_lingua_2');
						game.log(get.translation(player.name) + '回合结束时，目标角色弃置1张牌');
						player.popup('目标弃牌');
					}
				}
			},
			1: {
				trigger: { player: 'phaseJieshuBegin' },
				forced: true,
				locked: false,
				// charlotte: true,
				content() {
					player.storage.hok_lingua2.draw(1);
				}
			},
			2: {
				trigger: { player: 'phaseJieshuBegin' },
				forced: true,
				locked: false,
				// charlotte: true,
				content() {
					player.storage.hok_lingua2.chooseToDiscard('hes', '弃置1张牌').set('ai', function (card) {
						return 8 - get.value(card);
					});
				}
			},
			3: {
				trigger: { global: 'damageSource' },
				forced: true,
				locked: false,
				// charlotte: true,
				filter(event, player) {
					return event.source == player.storage.hok_lingua2;
				},
				content() {
					player.storage.hok_lingua2.draw(1);
				}
			},
			4: {
				trigger: { global: 'damageSource' },
				forced: true,
				locked: false,
				// charlotte: true,
				filter(event, player) {
					return event.source == player.storage.hok_lingua2;
				},
				content() {
					var cards = player.storage.hok_lingua2.getCards('h', function (card) {
						return lib.filter.cardDiscardable(card, player, 'hok_lingua');
					});
					if (cards.length > 0) player.storage.hok_lingua2.discard(cards.randomGet());
				}
			},
		},
		ai: {
			result: {
				target(player, target) {
					if (target.hasSkillTag('nogain')) return 0;
					if (player.countCards('h') == player.countCards('h', 'du')) return -1;
					if (target.hasJudge('lebu')) return 0;
					if (get.threaten(target) > 3) return get.threaten(target);
					return -1;
				},
			},
			order: 9,
			threaten: 3,
			expose: 0.2,
		}
	},
	hok_lingua2: {
		charlotte: true,
		onremove: true,
		mark: 'character',
		intro: { content: '临卦：$' },
	},
	hok_shigua: {
		enable: 'phaseUse',
		popup: false,
		content() {
			player.logSkill('hok_shigua');
			player.storage.hok_lingua1 = (player.storage.hok_lingua1 == true ? true : false);
			player.storage.hok_shigua = player.storage.hok_lingua1;
		},
		group: ['hok_shigua_yang', 'hok_shigua_yin'],
		subSkill: {
			yang: {
				trigger: { player: 'logSkill' },
				filter(event, player) {
					if (event.skill != 'hok_shigua') return false;
					return player.storage.hok_shigua != true;
				},
				forced: true,
				locked: false,
				popup: false,
				content() {
					'step 0'
					player.storage.hok_lingua1 = true;
					if (player.hasSkill('hok_lingua_1')) {
						player.removeSkill('hok_lingua_1');
					}
					if (player.hasSkill('hok_lingua_2')) {
						player.removeSkill('hok_lingua_2');
					}
					player.chooseControl('选项一', '选项二').set('prompt', '临卦：请选择一项').set('choiceList', [
						'目标角色造成伤害后摸1张牌',
						'目标角色造成伤害后随机弃置1张手牌'
					]).set('ai', function () {
						if (get.attitude(player, target) > 0) {
							return '选项一';
						} else {
							return '选项二';
						}
					});
					'step 1'
					if (result.control == '选项一') {
						player.addSkill('hok_lingua_3');
						game.log('目标角色造成伤害后摸1张牌');
					}
					else {
						player.addSkill('hok_lingua_4');
						game.log('目标角色造成伤害后随机弃置1张手牌');
					}
				}
			},
			yin: {
				trigger: { player: 'logSkill' },
				filter(event, player) {
					if (event.skill != 'hok_shigua') return false;
					return player.storage.hok_shigua;
				},
				forced: true,
				locked: false,
				popup: false,
				content() {
					'step 0'
					player.storage.hok_lingua1 = false;
					if (player.hasSkill('hok_lingua_3')) {
						player.removeSkill('hok_lingua_3');
					}
					if (player.hasSkill('hok_lingua_4')) {
						player.removeSkill('hok_lingua_4');
					}
					player.chooseControl('选项一', '选项二').set('prompt', '临卦：请选择一项').set('choiceList', [
						'你的回合结束时，目标角色摸1张牌',
						'你的回合结束时，目标角色弃置1张牌'
					]).set('ai', function () {
						if (get.attitude(player, target) > 0) {
							return '选项一';
						} else {
							return '选项二';
						}
					});
					'step 1'
					if (result.control == '选项一') {
						player.addSkill('hok_lingua_1');
						game.log(get.translation(player.name) + '回合结束时，目标角色摸1张牌');
					}
					else {
						player.addSkill('hok_lingua_2');
						game.log(get.translation(player.name) + '回合结束时，目标角色弃置1张牌');
					}
				}
			},
		},
		ai: {
			result: {
				target(player, target) {
					if (get.threaten(target) > 5 && !player.storage.hok_lingua1) {
						return 1;
					}
					if (get.threaten(target) <= 5 && player.storage.hok_lingua1) {
						return 1;
					}
					return 0;
				},
			},
			order: 7,
		}
	},
	hok_taigua: {
		unique: true,
		limited: true,
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'soil',
		filter(event, player) {
			if (game.hasPlayer(function (current) {
				return current == player.storage.hok_lingua2;
			})) {
				return true;
			}
			return false;
		},
		content() {
			'step 0'
			player.awakenSkill('hok_taigua');
			if (player.hp <= 2) {
				player.loseHp(player.hp - 1);
			} else {
				player.loseHp(2);
			}
			'step 1'
			player.chooseControl('回复', '受伤').set('prompt', '请选择一种效果').set('ai', function (card) {
				if (get.attitude(player, player.storage.hok_lingua2) > 0 && get.recoverEffect(player.storage.hok_lingua2, player, player) > 0) {
					return '回复';
				}
				return '受伤';
			});
			'step 2'
			if (result.control == '回复') {
				player.storage.hok_lingua2.recover(2);
			} else {
				player.storage.hok_lingua2.damage(2);
			}
			player.addSkill('hok_taigua_recover');
		},
		subSkill: {
			recover: {
				charlotte: true,
				forced: true,
				locked: false,
				trigger: { player: 'phaseBegin' },
				content() {
					player.recover();
					player.removeSkill('hok_taigua_recover');
				}
			}
		},
		ai: {
			order: 8,
			result: {
				player(player) {
					let target = player.storage.hok_lingua2
					if (get.attitude(player, target) > 0) {
						if (target.hp == 1) return 5;
						if (target.maxHp - target.hp > 2 && player.hp <= 2) return 5;
						if (target.maxHp - target.hp >= 2 && player.hp == 1) return 5;
					} else {
						if (target.hp > 2 && player.hp <= 2) return 2;
						if (target.hp > 2 && player.hp == 1) return 3;
						if (target.hp <= 2) return 2;
					}
					return 0;
				}
			},
			threaten: 3,
		}
	},
	// 芈月
	hok_shengxue: {
		trigger: { source: 'damageSource' },
		forced: true,
		locked: false,
		filter(event, player) {
			return event.num > 0;
		},
		marktext: '蝠',
		intro: {
			name: '蝠',
			content: 'mark',
		},
		content() {
			if (player.isDamaged()) {
				player.recover(trigger.num);
			}
			if (player.countMark('hok_shengxue') < 4) {
				player.addMark('hok_shengxue', 1);
			}
		},
	},
	hok_anlian: {
		enable: 'phaseUse',
		usable: 1,
		filterTarget: lib.filter.notMe,
		content() {
			'step 0'
			player.removeSkill('hok_anlian2');
			'step 1'
			player.line('hok_anlian', target);
			player.addSkill('hok_anlian_effect');
			player.storage.hok_anlian2 = target;
			player.addSkill('hok_anlian2');
		},
		subSkill: {
			effect: {
				trigger: { player: 'phaseJieshuBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					return !player.storage.hok_anlian2.isDead();
				},
				content() {
					if (player.storage.hok_anlian2.countGainableCards(player, 'he') > 0) {
						player.gainPlayerCard(player.storage.hok_anlian2, 'he', true);
					}
					if (player.countMark('hok_shengxue') < 4) {
						player.addMark('hok_shengxue', 1);
					}
				}
			},
		},
		ai: {
			result: {
				target(player, target) {
					return -2;
				}
			},
			order: 9,
		}
	},
	hok_anlian2: {
		charlotte: true,
		onremove: true,
		mark: 'character',
		intro: { content: '暗链：$' },
	},
	hok_anyue: {
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'fire',
		filter(event, player) {
			return player.countMark('hok_shengxue') == 4;
		},
		content() {
			'step 0'
			player.removeMark('hok_shengxue', 4);
			'step 1'
			player.turnOver();
			player.addTempSkill('hok_anyue_effect', { player: 'phaseBeginStart' });
			player.addSkill('hok_anyue_video');
		},
		subSkill: {
			effect: {
				forced: true,
				firstDo: true,
				mark: true,
				intro: {
					name: '暗月',
					content: '不能成为牌的目标',
				},
				mod: {
					targetEnabled(card, player, target) {
						return false;
					}
				}
			},
			video: {
				trigger: { player: 'phaseBefore' },
				forced: true,
				firstDo: true,
				content() {
					player.turnOver(false);
					player.removeSkill('hok_anyue_video');
				}
			}
		},
		ai: {
			order: 1,
			result: {
				player: 1,
			},
		}
	},
	// 墨子
	hok_jianaifeigong: {
		marktext: '墨',
		intro: {
			name: '兼爱',
			content: 'mark',
		},
		frequent: true,
		trigger: { source: 'damageEnd' },
		filter(event, player) {
			return event.num > 0 && player.hujia < 3;
		},
		content() {
			player.changeHujia(1, null, true);
		},
		group: ['hok_jianaifeigong_loseHujia',],
		subSkill: {
			loseHujia: {
				forced: true,
				trigger: { player: 'phaseBegin' },
				filter(event, player) {
					return player.hujia > 0;
				},
				content() {
					let hasMark = player.countMark('hok_jianaifeigong');
					if (hasMark < 3) {
						if (hasMark + player.hujia > 3) {
							player.addMark('hok_jianaifeigong', 3 - hasMark);
						} else {
							player.addMark('hok_jianaifeigong', player.hujia);
						}
					}
					player.changeHujia(-player.hujia);
				},
			},
		},
	},
	hok_jipao: {
		trigger: {
			player: 'phaseUseBegin',
		},
		direct: true,
		content: function () {
			'step 0';
			var card = get.cardPile(function (card) {
				return card.name == 'sha' && card.nature == 'thunder';
			});
			if (card) player.gain(card, 'gain2');
			'step 1';
			player.chooseToUse({ name: 'sha' }, get.prompt2('hok_jipao')).set('targetRequired', true).set('complexSelect', true).set('filterTarget', lib.filter.targetEnabled);
			'step 2'
			if (game.hasPlayer2(function (current) {
				return current.getHistory('damage', function (evt) {
					return evt.getParent(4) == event;
				}).length > 0
			})
			) {
				result.targets.forEach(target => {
					if (target.countDiscardableCards(target, 'he')) {
						target.chooseToDiscard('he', 2, true).set('ai', function (card) {
							return 6 - get.value(card);
						});
					}
				});
			}
		},
	},
	hok_moshouchenggui: {
		trigger: {
			player: 'phaseUseBegin',
		},
		skillAnimation: true,
		animationColor: 'wood',
		frequent: true,
		filter(event, player) {
			return player.countMark('hok_jianaifeigong') >= 3;
		},
		content() {
			'step 0'
			player.chooseTarget(get.prompt2('hok_moshouchenggui'), function (card, player, target) {
				return player != target && player.inRange(target);
			}).set('ai', target => {
				var player = _status.event.player;
				if (target == player || !player.inRange(target)) {
					return false;
				}
				if (get.attitude(player, target) < 0) return get.effect(target, { name: 'guohe' }, player, player) + get.damageEffect(target, player, player, 'thunder');
				return 0;
			});
			'step 1'
			if (result.bool) {
				var target = result.targets[0];
				player.removeMark('hok_jianaifeigong', 3);
				player.logSkill('hok_moshouchenggui', target);
				player.line(target);
				target.damage();
				target.turnOver();
				trigger.cancel();
			}
			else event.finish();
		},
		ai: {
			threaten: 1,
			order: 4,
			expose: 0.2,
			result: {
				player: 1,
			},
		}
	},

	// S
	// 司空震
	hok_tianlei: {
		zhuSkill: true,
		trigger: { global: 'phaseBefore', player: 'enterGame' },
		forced: true,
		unique: true,
		filter: function (event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0) && player.hasZhuSkill('hok_tianlei');
		},
		content: function () {
			var num = game.countPlayer(function (current) {
				return current.group == 'qun';
			});
			if (num) player.addMark('hok_tianlei', num);
		},
		marktext: '雷',
		intro: {
			name2: '天雷',
			content: 'mark',
		},
		group: ['hok_tianlei_shandian', 'hok_tianlei_wulie'],
		subSkill: {
			shandian: {
				forced: true,
				zhuSkill: true,
				trigger: { player: 'phaseBegin' },
				filter(event, player) {
					return player.getCards('j', 'shandian');
				},
				content() {
					let cardRandom = Math.random() * 8;
					let cardSuit = cardRandom < 4 ? 'heart' : 'spade';
					let cardNum = 1 + Math.floor(Math.random() * 13);
					let cardShandian = game.createCard('shandian', cardSuit, cardNum);
					player.chooseUseTarget(cardShandian, true);
				},
			},
			wulie: {
				forced: true,
				trigger: { player: 'damageBefore' },
				filter(event) {
					if (event.nature == 'thunder') return event.player.countMark('hok_tianlei') > 0;
					return false;
				},
				content() {
					trigger.cancel();
					player.removeMark('hok_tianlei', 1);
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'thunderDamage') && target.countMark('hok_tianlei') > 0) return [1, 0.65];
						}
					},
					threaten: 0.5
				},
			}
		},
	},
	hok_benlei: {
		forced: true,
		trigger: { source: 'damageBefore' },
		content() {
			if (trigger.card.nature == null) {
				game.setNature(trigger, 'thunder');
			}
			if (get.distance(player, trigger.player) <= 1) {
				player.changeHujia(1, null, true);
			}
		},
		group: ['hok_benlei_loseHujia', 'hok_benlei_paoxiao'],
		subSkill: {
			loseHujia: {
				forced: true,
				trigger: { player: 'phaseBegin' },
				filter(event, player) {
					return player.hujia > 0;
				},
				content() {
					player.changeHujia(-player.hujia);
				},
			},
			paoxiao: {
				mod: {
					cardUsable(card, player, num) {
						if (card.name == 'sha') return num + 1;
					}
				},
			},
		},
	},
	hok_leitingwanjun: {
		unique: true,
		limited: true,
		marktext: '霆',
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'gray',
		content() {
			player.awakenSkill('hok_leitingwanjun');
			player.addTempSkill('hok_leitingwanjun_effect');
		},
		ai: {
			order: 12,
			result: {
				player(player) {
					if (player.hp == 1) return 1;
					var demages = player.getCards('h').filter(item => get.tag(item, 'damage'));
					if (demages.length < 2) return 0;
					var card = player.getCards('h', 'sha')[0];
					if (!lib.filter.cardEnabled(card, player)) return 0;
					if (!lib.filter.cardUsable(card, player)) return 0;
					if (player.isDamaged() && game.hasPlayer(function (current) {
						return get.damageEffect(current, player, player, 'thunder') > 0;
					})) {
						return 1;
					}
					return 0;
				}
			}
		},
		subSkill: {
			effect: {
				forced: true,
				locked: false,
				trigger: { source: 'damageBegin1' },
				filter(event, player) {
					return event.hasNature('thunder');
				},
				content() {
					trigger.num++;
				},
				group: 'hok_leitingwanjun_effect2',
			},
			effect2: {
				trigger: { source: 'damageSource' },
				forced: true,
				locked: false,
				filter(event, player) {
					return event.num > 0 && event.hasNature('thunder');
				},
				content() {
					if (player.isDamaged()) {
						player.recover(Math.floor(trigger.num / 2));
					}
				},
			}
		},
	},
	// 孙悟空
	hok_qitian: {
		mod: {
			// 	cardname(card, player) {
			// 		if (['trick', 'delay'].contains(lib.card[card.name].type)) return 'sha';
			// 	},
			// 	cardnature(card, player) {
			// 		if (['trick', 'delay'].contains(lib.card[card.name].type) && get.color(card) == 'red') return 'fire';
			// 		if (['trick', 'delay'].contains(lib.card[card.name].type) && get.color(card) == 'black') return 'thunder';
			// 	},
			targetInRange(card, player) {
				if (card.name == 'sha' && (card.nature == 'fire' || card.nature == 'thunder')) return true;
			},
		},
		group: ['hok_qitian_sha', 'hok_qitian_shan'],
		subSkill: {
			// fire: {
			// 	enable: ['chooseToRespond', 'chooseToUse'],
			// 	filterCard(card) {
			// 		return ((lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay') && get.color(card) == 'red');
			// 	},
			// 	viewAs: { name: 'sha', nature: 'fire' },
			// 	viewAsFilter(player) {
			// 		if ((!player.countCards('h', { suit: 'heart' }) && !player.countCards('h', { suit: 'diamond' }))
			// 			|| (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' }))) {
			// 			return false;
			// 		}
			// 	},
			// 	position: 'h',
			// 	prompt: '将一张红色锦囊当火杀使用或打出',
			// },
			sha: {
				enable: ['chooseToRespond', 'chooseToUse'],
				filterCard(card) {
					return lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay';
				},
				position: 'he',
				viewAs(cards, player) {
					for (let card of cards) {
						if (get.color(card) == 'red') {
							return { name: 'sha', nature: 'fire' };
						} else if (get.color(card) == 'black') {
							return { name: 'sha', nature: 'thunder' };
						} else {
							return { name: 'sha', nature: 'stab' };
						}
					}
				},
				viewAsFilter(player) {
					if (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })) {
						return false;
					}
				},
				prompt: '红色锦囊当火杀、黑色锦囊当雷杀使用或打出',
				check(card) {
					var val = get.value(card);
					if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
					return 5 - val;
				},
				ai: {
					respondSha: true,
					skillTagFilter(player) {
						if (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })) return false;
					},
				},
			},
			shan: {
				enable: ['chooseToRespond', 'chooseToUse'],
				filterCard(card) {
					return ((lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay') && get.color(card) == 'red')
						|| (card.name == 'sha', card.nature == 'fire');
				},
				viewAs: { name: 'shan' },
				viewAsFilter(player) {
					if ((!player.countCards('h', { suit: 'heart' }) && !player.countCards('h', { suit: 'diamond' })
						|| !player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' }))
						&& !player.countCards('h', { name: 'sha', nature: 'fire' })) {
						return false;
					}
				},
				position: 'h',
				prompt: '将一张火杀当闪使用或打出',
				check() { return 1 },
				ai: {
					order: 3,
					respondShan: true,
					skillTagFilter(player) {
						if (!player.countCards('h', { suit: 'heart' }) && !player.countCards('h', { suit: 'diamond' })
							&& !player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })
							&& !player.countCards('h', { name: 'sha', nature: 'fire' })) {
							return false;
						}
					},
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'respondShan') && current < 0) return 0.6
						}
					}
				}
			}
		}
	},
	hok_shengbang: {
		audio: 2,
		locked: true,
		trigger: {
			source: 'damageBefore',
		},
		filter(event, player) {
			if (!event.card || event.card.name != 'sha') return false;
			return event.num > 0 && player.countCards('hes') > 0;
		},
		content() {
			'step 0'
			player.storage.shengbangJudge = false;
			player.chooseToDiscard('hes').set('goon', get.damageEffect(trigger.player, player, player) > 0)
				.set('ai', function (card) {
					if (player.getStat('skill').hok_naogong == 1 && player.countCards('hs') > 1) {
						return 9 - get.value(card);
					}
					return 0;
				});
			'step 1'
			if (result.bool) {
				player.judge(function (card) {
					if (get.color(card) == 'red') {
						player.storage.shengbangJudge = true;
						return 1.5;
					} else {
						player.storage.shengbangJudge = false;
						return -1.5;
					}
				}).judge2 = function (result) {
					return result.bool;
				};
			}
			'step 2'
			if (player.storage.shengbangJudge) {
				trigger.num *= 2;
				if (trigger.num >= 3) {
					trigger.num = 3;
				}
			} else {
				player.draw(2);
			}
		},
	},
	hok_houmao: {
		audio: 2,
		unique: true,
		mark: true,
		skillAnimation: true,
		animationColor: 'metal',
		limited: true,
		trigger: { player: 'phaseZhunbeiBegin' },
		init(player) {
			player.storage.hok_houmao = false;
		},
		filter(event, player) {
			if (player.storage.hok_houmao) return false;
			if (typeof player.storage.hok_houmao2 == 'number') {
				return player.hp < player.storage.hok_houmao2;
			}
			return player.countCards('j') > 0;
		},
		check(event, player) {
			if (player.hp <= 1) return true;
			return player.hp < player.storage.hok_houmao2 - 1;
		},
		content() {
			player.awakenSkill('hok_houmao');
			player.recover(player.storage.hok_houmao2 - player.hp);
			player.discard(player.getCards('j'));
			var card = get.cardPile(function (card) {
				switch (Math.floor(Math.random() * 2)) {
					case 0: return get.name(card, 'leisha') == 'leisha';
					case 1: return get.name(card, 'huosha') == 'huosha';
				}
			})
			if (card) {
				player.gain(card, 'gain2');
			}
			player.storage.hok_houmao = true;
		},
		intro: {
			mark(dialog, content, player) {
				if (player.storage.hok_houmao) return;
				if (typeof player.storage.hok_houmao2 != 'number') {
					return '上回合体力：无';
				}
				return '上回合体力：' + player.storage.hok_houmao2;
			},
			content: 'limited'
		},
		group: ['hok_houmao2'],
	},
	hok_houmao2: {
		trigger: { player: 'phaseJieshuBegin' },
		priority: -10,
		silent: true,
		content() {
			player.storage.hok_houmao2 = player.hp;
			game.broadcast(function (player) {
				player.storage.hok_houmao2 = player.hp;
			}, player);
			game.addVideo('storage', player, ['hok_houmao2', player.storage.hok_houmao2]);
		},
		intro: {
			content(storage, player) {
				if (player.storage.hok_houmao) return;
				return '上回合体力：' + storage;
			}
		}
	},
	hok_naogong: {
		audio: 2,
		unique: true,
		limited: true,
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'metal',
		content() {
			player.awakenSkill('hok_naogong');
			player.addTempSkill('hok_naogong_effect');
			// player.addTempSkill('hok_naogong_discard');
		},
		ai: {
			order() {
				return get.order({ name: 'sha' }) - 0.1;
			},
			expose: 0.2,
			result: {
				player(player) {
					if (player.getEquip(1) != undefined && player.getEquip(1).name == 'zhuge') {
						return 0;
					}
					var qitianTrick = (player.countCards('hs', { type: 'basic' }) - player.countCards('hs', { name: 'sha' })
						- player.countCards('hs', { name: 'shan' })
						- player.countCards('hs', { name: 'tao' })
						- player.countCards('hs', { name: 'jiu' }));
					var natureSha = player.countCards('hs', { type: 'trick' })
						+ qitianTrick;
					if (player.hp < 2 && natureSha >= 1) return 1;
					if (player.countCards('hs') >= 3 && natureSha >= 2 && game.hasPlayer(function (current) {
						return get.effect(current, { name: 'sha' }, player, player) > 0;
					})) {
						return 1;
					}
					return 0;
				}
			}
		},
		subSkill: {
			effect: {
				audio: 2,
				forced: true,
				onremove: true,
				mod: {
					cardUsable(card, player, num) {
						if (card.name == 'sha') return 3;
					}
				},
			},
			discard: {
				trigger: { player: 'phaseUseEnd' },
				forced: true,
				onremove: true,
				filter(event, player) {
					return player.countCards('hs') > 0;
				},
				content() {
					'step 0'
					event.naogongCards = player.getCards('hs');
					'step 1'
					if (event.naogongCards != undefined) {
						player.discard(event.naogongCards);
					}
				},
			},
		}
	},

	// W
	// 王昭君
	hok_bingfeng: {
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		forced: true,
		filter(event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0) && player.hasEquipableSlot(1) && !player.getEquips('hok_ningbingzhixi').length;
		},
		content() {
			var card = game.createCard2('hok_ningbingzhixi', 'club', 2);
			player.$gain2(card, false);
			game.delayx();
			player.equip(card);
		},
		mod: {
			canBeGained(card, source, player) {
				if (player.getEquips('hok_ningbingzhixi').contains(card)) return false;
			},
			canBeDiscarded(card, source, player) {
				if (player.getEquips('hok_ningbingzhixi').contains(card)) return false;
			},
			canBeReplaced(card, player) {
				if (player.getEquips('hok_ningbingzhixi').contains(card)) return false;
			},
			cardname(card) {
				if (get.subtype(card, false) == 'equip1') return 'shan';
			},
			cardnature(card) {
				if (get.subtypes(card, false).contains('equip1')) return false;
			},
			cardDiscardable(card, player) {
				if (player.getEquips('hok_ningbingzhixi').contains(card)) return false;
			},
			cardEnabled2(card, player) {
				if (player.getEquips('hok_ningbingzhixi').contains(card)) return false;
			},
		},
		group: ['hok_bingfeng_blocker'],
		subSkill: {
			blocker: {
				trigger: { player: ['loseBefore', 'disableEquipBefore'] },
				forced: true,
				filter(event, player) {
					if (event.name == 'disableEquip') return (event.slots.contains('equip1'));
					var cards = player.getEquips('hok_ningbingzhixi');
					return event.cards.some(card => cards.contains(card));
				},
				content() {
					if (trigger.name == 'lose') {
						trigger.cards.removeArray(player.getEquips('hok_ningbingzhixi'));
					}
					else {
						while (trigger.slots.contains('equip1')) trigger.slots.remove('equip1');
					}
				},
			},
		},
	},
	hok_diaoling: {
		usable: 1,
		enable: 'phaseUse',
		filterTarget: lib.filter.notMe,
		content() {
			player.useCard({ name: 'sha', nature: 'ice' }, target, false);
		},
		ai: {
			order: 4,
			result: {
				target(player, target) {
					return get.effect(target, { name: 'sha', nature: 'ice' }, player, player);
				},
			},
		}
	},
	hok_hanshuang: {
		filter(event, player) {
			return player.countCards('hs', (card => card.name == 'sha' && get.nature(card))) > 0;
		},
		enable: 'chooseToUse',
		filterCard(card) {
			return card.name == 'sha' && get.nature(card);
		},
		position: 'hs',
		viewAs: { name: 'lebu' },
		prompt: '将一张属性【杀】当乐不思蜀使用',
		check(card) {
			return 6 - get.value(card);
		},
		mod: {
			cardUsable(card, player, num) {
				if (card.name == 'sha' && get.nature(card)) return Infinity;
			},
		},
	},
	// 武则天
	hok_dihui: {
		unique: true,
		mark: true,
		marktext: '曌',
		intro: {
			name: '曌',
			content: 'mark',
		},
		forced: true,
		trigger: { player: ['phaseUseBegin', 'hok_dihui_shaAfter', 'hok_diweiAfter', 'hok_shaduoAfter', 'useCardAfter'] },
		derivation: ['hok_dihui_strengthen'],
		content() {
			if (player.countMark('hok_dihui') >= 2) {
				player.removeMark('hok_dihui', 2);
				player.addTempSkill('hok_dihui_strengthen', 'phaseUseAfter');
			}
			else if (!player.hasSkill('hok_dihui_sha')) {
				player.addTempSkill('hok_dihui_sha', 'phaseUseAfter');
			};
		},
		ai: {
			threaten: 1.0,
		},
		subSkill: {
			sha: {
				usable: 1,
				enable: 'phaseUse',
				// filterTarget: true,
				filterCard: true,
				selectCard: 1,
				viewAs: { name: 'sha', isCard: true },
				onuse(result, player) {
					player.addMark('hok_dihui', 1);
				},
				check(card) {
					return 6 - get.value(card);
				},
				ai: {
					order() {
						return get.order({ name: 'sha' }) + 0.1;
					},
					order: 6,
				}
			},
			strengthen: {
				enable: 'phaseUse',
				group: 'hok_dihui_hanbing',
				filterTarget: true,
				content() {
					'step 0'
					player.useCard({ name: 'sha', isCard: true }, target, false);
					'step 1'
					player.removeSkill('hok_dihui_strengthen');
				},
				ai: {
					order: 4,
					result: {
						target(player, target) {
							return -1;
						},
					},
				}
			},
			hanbing: {
				trigger: { source: 'damageBegin2' },
				forced: true,
				filter(event) {
					return event.card.name == 'sha';
				},
				content() {
					if (trigger.player.countDiscardableCards(trigger.player, 'he')) {
						var cards = trigger.player.getCards('he', (card) => lib.filter.cardDiscardable(card, trigger.player, 'hok_dihui_strengthen'));
						if (cards.length) trigger.player.discard(cards.randomGet());
					}
				}
			}
		}
	},
	hok_diwei: {
		derivation: ['feiying'],
		usable: 1,
		enable: 'phaseUse',
		filterCard: true,
		selectCard: 1,
		changeSeat: true,
		content() {
			'step 0'
			player.chooseControl('选择1名与你座位相邻的角色，令其与同方向下一个角色交换位置', '直到你的下个回合，你获得技能“飞影”').set('ai', function (event, player) {
				return '直到你的下个回合，你获得技能“飞影”';
			});
			'step 1'
			player.discard(cards);
			event.feiying = false;
			switch (result.control) {
				case '选择1名与你座位相邻的角色，令其与同方向下一个角色交换位置':
					break;
				case '直到你的下个回合，你获得技能“飞影”':
					event.feiying = true;
					break;
				default:
			}
			'step 2'
			player.addMark('hok_dihui', 1);
			if (event.feiying) {
				player.addTempSkill('feiying', { player: 'phaseBefore' });
				event.finish();
			}
			'step 3'
			player.chooseTarget('选择1名与你座位相邻的角色，令其与同方向下一个角色交换位置', function (card, player, target) {
				return target == player.next || target == player.previous;
			}).set('ai', function (target) {
				if (target == player) {
					return false;
				}
				return get.attitude(_status.event.player, target);
			});
			'step 4'
			var target = result.targets[0];
			var targetSwap = target.next == player ? target.previous : target.next;
			game.broadcastAll(function (target1, target2) {
				game.swapSeat(target1, target2);
			}, target, targetSwap);
			target.chooseToDiscard('h', true);
		},
		check(card) {
			return (5 - get.value(card)) && _status.event.player.countCards('h') > 2;
		},
		ai: {
			order() {
				return get.order({ name: 'tao' }) - 0.3;
			},
			result: {
				player: 1
			},
		}
	},
	hok_shaduo: {
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'metal',
		limited: true,
		filter(event, player) {
			return game.roundNumber >= 4;
		},
		content() {
			'step 0'
			player.awakenSkill('hok_shaduo');
			player.addTempSkill('hok_shaduo_hanbing');
			player.addMark('hok_dihui', 1);
			'step 1'
			var targets = game.filterPlayer(function (current) {
				return current.isAlive() && current != player;
			})
			player.useCard({ name: 'sha', isCard: true }, targets, false);
			'step 2'
			player.removeSkill('hok_shaduo_hanbing');
		},
		ai: {
			order: 1,
			result: {
				player(player) {
					var targets = game.filterPlayer(function (current) {
						return player.canUse('wanjian', current);
					});
					var num = 0;
					for (var i = 0; i < targets.length; i++) {
						var eff = get.sgn(get.effect(targets[i], { name: 'wanjian' }, player, player));
						if (targets[i].hp == 1) {
							eff *= 1.5;
						}
						num += eff;
						if (get.attitude(player, targets[1]) <= 0) {
							num += targets[1].countCards('hs') > 2 ? -0.5 : 1;
						} else {
							num += targets[1].countCards('hs') > 2 ? 0.5 : -1;
						}
					}
					if (!player.needsToDiscard(-1)) {
						if (targets.length >= 7) {
							if (num < 2) return 0;
						}
						else if (targets.length >= 5) {
							if (num < 1.5) return 0;
						}
					}
					return num;
				}
			}
		},
		subSkill: {
			hanbing: {
				trigger: { source: 'damageBegin2' },
				forced: true,
				filter(event) {
					return event.card.name == 'sha';
				},
				content() {
					if (trigger.player.countDiscardableCards(trigger.player, 'he')) {
						var cards = trigger.player.getCards('he', (card) => lib.filter.cardDiscardable(card, trigger.player, 'hok_dihui_strengthen'));
						if (cards.length) trigger.player.discard(cards.randomGet());
						if (cards.length) trigger.player.discard(cards.randomGet());
					}
				},
			}
		}
	},
	hok_nvdi: {
		trigger: { player: 'phaseJieshuBegin' },
		zhuSkill: true,
		frequent: true,
		filter(event, player) {
			if (!player.hasZhuSkill('hok_nvdi')) return false;
			if (player.getHistory('skipped').contains('phaseUse')) return true;
			var history = player.getHistory('useCard').concat(player.getHistory('respond'));
			for (var i = 0; i < history.length; i++) {
				if ((history[i].card.name == 'sha' || get.type(history[i].card) == 'trick') && history[i].isPhaseUsing()) {
					return false;
				}
			}
			return true;
		},
		content() {
			var num = game.countPlayer(function (current) {
				return current.group == 'qun';
			});
			if (num) {
				player.draw(num);
			}
		},
	},

	// Y
	// 瑶
	hok_shangui: {
		derivation: 'hok_yinshen',
		usable: 1,
		enable: 'phaseUse',
		filterTarget: lib.filter.notMe,
		content() {
			if (target.hasMark('hok_yinshen')) {
				target.removeMark('hok_yinshen', 1);
				target.removeSkill('hok_yinshen');
			}
			var cards = target.getCards('h', function (card) {
				return lib.filter.cardDiscardable(card, target, 'hok_shangui');
			});
			if (cards.length > 0) target.discard(cards.randomGet());
		},
		ai: {
			result: {
				target(player, target) {
					return -1;
				}
			},
			threaten: 1,
			order: 9,
			expose: 0.2,
		}
	},
	hok_bailu: {
		derivation: 'hok_temp_hp',
		usable: 1,
		enable: 'phaseUse',
		filter(event, player) {
			if (player.hasSkill('hok_bailu_round')) {
				return false;
			}
			if (!game.hasPlayer(function (current) {
				return current.countMark('hok_bailu_2');
			})) {
				player.removeSkill('hok_bailu_effect');
				return true;
			} else return false;
		},
		filterTarget: lib.filter.notMe,
		content() {
			player.addTempSkill('hok_bailu_round', 'roundStart');
			player.addSkill('hok_bailu_effect');
			target.addMark('hok_bailu_2', 1);
			target.addSkill('hok_bailu_2');
			target.maxHp += 2;
			target.recover(2);
			target.addMark('hok_temp_hp', 2);
			target.addSkill('hok_temp_hp');
		},
		group: 'hok_bailu_remove',
		subSkill: {
			round: { charlotte: true },
			round2: {
				group: 'hok_bailu_round',
				trigger: { player: 'phaseEnd' },
				forced: true,
				content() {
					player.removeSkill('hok_bailu_round2')
				}
			},
			effect: {
				forced: true,
				firstDo: true,
				mark: true,
				intro: {
					name: '鹿灵',
					content: '不能成为牌的目标，且不能使用杀和锦囊牌',
				},
				mod: {
					targetEnabled(card, player, target) {
						if (card.name != 'tao' || card.name != 'jiu') {
							return false;
						}
					},
					cardEnabled(card) {
						if (card.name == 'sha' || get.type(card) == 'trick' || get.type(card) == 'delay') return false;
					}
				}
			},
			2: {
				marktext: '鹿',
				intro: {
					name: '白鹿',
					content: 'mark',
				},
				forced: true,
				trigger: { player: 'damageAfter' },
				filter(event, player) {
					return player.countMark('hok_temp_hp') == 0;
				},
				content() {
					'step 0'
					player.removeMark('hok_bailu_2', 1);
					'step 1'
					player.removeSkill('hok_temp_hp');
					var hok_luling = game.filterPlayer(function (current) {
						return current.hasSkill('hok_bailu_effect');
					})[0];
					hok_luling.removeSkill('hok_bailu_effect');
					hok_luling.addSkill('hok_bailu_round2');
					'step 2'
					player.removeSkill('hok_bailu_2');
				}
			},
			remove: {
				usable: 1,
				enable: 'phaseUse',
				filter(event, player) {
					if (player.hasSkill('hok_bailu_round')) {
						return false;
					}
					return game.hasPlayer(function (current) {
						return current.countMark('hok_bailu_2');
					});
				},
				content() {
					'step 0'
					player.addTempSkill('hok_bailu_round', 'roundStart');
					player.draw(2);
					player.storage.hok_bailu_target = game.filterPlayer(current => {
						return current.countMark('hok_bailu_2');
					})[0];
					'step 1'
					player.storage.hok_bailu_target.removeMark('hok_bailu_2', 1);
					player.storage.hok_bailu_target.loseHp(player.storage.hok_bailu_target.countMark('hok_temp_hp'));
					'step 2'
					player.storage.hok_bailu_target.loseMaxHp(player.storage.hok_bailu_target.countMark('hok_temp_hp'));
					'step 3'
					player.storage.hok_bailu_target.removeMark('hok_temp_hp', player.storage.hok_bailu_target.countMark('hok_temp_hp'));
					player.storage.hok_bailu_target.removeSkill('hok_temp_hp');
					player.removeSkill('hok_bailu_effect');
					player.storage.hok_bailu_target.removeSkill('hok_bailu_2');
				},
			}
		},
		ai: {
			result: {
				target(player, target) {
					if (get.attitude(player, target) > 0) return 1;
					return 0;
				},
			},
			order: 3,
			threaten: 1,
			expose: 0.25,
		}
	},
	// 亚瑟
	hok_shengguang: {
		marktext: '圣',
		intro: {
			name: '圣光',
			content: 'mark',
		},
		trigger: { player: 'phaseBegin', },
		frequent: true,
		content() {
			player.recover();
			if (player.countMark('hok_shengguang') < 3) {
				player.addMark('hok_shengguang', 1);
			}
		},
	},
	hok_shidun: {
		init(player, skill) {
			if (!player.storage.hok_shidun) player.storage.hok_shidun = [];
		},
		trigger: {
			source: 'damageSource',
		},
		filter(event, player) {
			if (player.storage.hok_shidun.length) return false;
			if (!event.card || event.card.name != 'sha') return false;
			return event.player.isIn() && _status.currentPhase == player && event.num > 0;
		},
		check(event, player) {
			if (get.attitude(_status.event.player, event.player) >= 0) return false;
			return true;
		},
		bannedList: ['bifa', 'buqu', 'gzbuqu', 'songci', 'funan', 'xinfu_guhuo', 'reguhuo', 'huashen', 'rehuashen', 'old_guhuo', 'shouxi', 'xinpojun', 'taoluan', 'xintaoluan', 'yinbing', 'xinfu_yingshi', 'zhenwei', 'zhengnan', 'xinzhengnan', 'zhoufu'],
		logTarget: 'player',
		content() {
			'step 0';
			var list = [];
			var listm = [];
			var listv = [];
			if (trigger.player.name1 != undefined) listm = lib.character[trigger.player.name1][3];
			else listm = lib.character[trigger.player.name][3];
			if (trigger.player.name2 != undefined) listv = lib.character[trigger.player.name2][3];
			listm = listm.concat(listv);
			var func = function (skill) {
				var info = get.info(skill);
				if (!info || info.charlotte || info.persevereSkill || info.hiddenSkill || info.zhuSkill || info.juexingji || info.limited || info.dutySkill || (info.unique && !info.gainable) || lib.skill.hok_shidun.bannedList.includes(skill)) return false;
				return true;
			};
			for (var i = 0; i < listm.length; i++) {
				if (func(listm[i])) list.add(listm[i]);
			}
			event.skills = list;
			'step 1';
			if (event.skills.length > 0) {
				player
					.chooseControl(event.skills)
					.set('prompt', '请选择令其失效的技能')
					.set('ai', function () {
						return event.skills.randomGet();
					});
			} else event.finish();
			'step 2';
			player.storage.hok_shidun = [result.control];
			player.storage.hok_shidun_player = trigger.player;
			trigger.player.storage.hok_shidun = [result.control];
			trigger.player.addTempSkill('hok_shidun_banned', { player: 'phaseAfter' });
		},
		group: ['hok_shidun_clear'],
		subSkill: {
			clear: {
				trigger: { global: ['phaseAfter', 'dieAfter'] },
				filter(event, player) {
					if (!player.storage.hok_shidun_player || !player.storage.hok_shidun) return false;
					return player.storage.hok_shidun_player == event.player && player.storage.hok_shidun.length;
				},
				silent: true,
				forced: true,
				popup: false,
				content() {
					player.removeSkills(player.storage.hok_shidun[0]);
					delete player.storage.hok_shidun_player;
					player.storage.hok_shidun = [];
				},
			},
			banned: {
				init(player, skill) {
					player.disableSkill(skill, player.storage.hok_shidun);
				},
				onremove(player, skill) {
					player.enableSkill(skill);
				},
				locked: true,
				mark: true,
				charlotte: true,
				intro: {
					content(storage, player, skill) {
						var list = [];
						for (var i in player.disabledSkills) {
							if (player.disabledSkills[i].includes(skill)) list.push(i);
						}
						if (list.length) {
							var str = '失效技能：';
							for (var i = 0; i < list.length; i++) {
								if (lib.translate[list[i] + '_info']) str += get.translation(list[i]) + '、';
							}
							return str.slice(0, str.length - 1);
						}
					},
				},
			},
		},
	},
	hok_huixuan: {
		trigger: { global: 'cardsDiscardAfter' },
		filter(event, player) {
			if (
				!player.getPrevious() ||
				!event.cards.filterInD('d').some(card => {
					return get.tag(card, 'damage') && player.canUse(card, player.getPrevious());
				})
			)
				return false;
			if (
				!player.getNext() ||
				!event.cards.filterInD('d').some(card => {
					return get.tag(card, 'damage') && player.canUse(card, player.getNext());
				})
			)
				return false;
			if (player.getNext() == player.getPrevious()) return false;
			const evt = event.getParent();
			if (evt.name != 'orderingDiscard') return false;
			const evtx = evt.relatedEvent || evt.getParent();
			return player.hasHistory('useCard', evtxx => {
				if (evtxx.getParent().name === 'hok_huixuan') return false;
				if (evtxx.targets.length > 1) return false;
				if (evtxx.targets[0] != player.getPrevious() && evtxx.targets[0] != player.getNext()) return false;
				return evtx.getParent() == (evtxx.relatedEvent || evtxx.getParent()) && get.tag(evtxx.card, 'damage');
			});
		},
		async cost(event, trigger, player) {
			const evtx = event.getParent(4).relatedEvent || event.getParent(5);
			if (evtx.targets) {
				const target = ((evtx.targets[0] == player.getPrevious()) ? player.getNext() : player.getPrevious());
				const cards = trigger.cards.filterInD('d').filter(card => get.tag(card, 'damage'));
				event.result = await player
					.chooseButton([get.prompt2('hok_huixuan', target), cards])
					.set('filterButton', button => {
						const player = get.player(),
							target = get.event().target;
						return player.canUse(button.link, target);
					})
					.set('target', target)
					.set('ai', button => {
						const player = get.player(),
							target = get.event().target;
						return get.effect(target, button.link, player, player);
					})
					.forResult();
				if (event.result.bool) {
					event.result.cards = event.result.links;
				}
			}
		},
		logTarget(event, player) {
			const evtx = event.getParent().relatedEvent || event.getParent(2);
			const target = ((evtx.targets[0] == player.getPrevious()) ? player.getNext() : player.getPrevious());
			return target;
		},
		async content(event, trigger, player) {
			player.$gain2(event.cards, false);
			await game.delayx();
			const useCardEvent = player.useCard(event.cards[0], event.targets[0], false);
			await useCardEvent;
		},
		onremove(player, skill) {
			const cards = player.getExpansions(skill);
			if (cards.length) player.loseToDiscardpile(cards);
		},
	},
	hok_shengjiancaijue: {
		enable: 'phaseUse',
		useable: 1,
		direct: true,
		filter(event, player) {
			if (player.countMark('hok_shengguang') == 3) {
				return true;
			}
			return false;
		},
		content() {
			'step 0'
			player.chooseTarget(get.prompt2('hok_shengjiancaijue'), function (card, player, target) {
				return player != target && player.inRange(target);
			}).set('ai', target => {
				var player = _status.event.player;
				if (target == player || !player.inRange(target)) {
					return 0;
				}
				if (get.attitude(player, target) < 0) return get.effect(target, { name: 'guohe' }, player, player) + get.damageEffect(target, player, player, 'thunder');
				return 0;
			});
			'step 1'
			if (result.bool) {
				var target = result.targets[0];
				player.removeMark('hok_shengguang', 3);
				player.logSkill('hok_shengjiancaijue', target);
				player.line(target);
				let num = target.getDamagedHp() - 1;
				if (num > 0) {
					target.damage(num, 'thunder');
				} else {
					target.damage('thunder', 'unreal');
				}
				var cards = target.getCards('h', function (card) {
					return lib.filter.cardDiscardable(card, target, 'hok_ningbingzhixi_skill');
				});
				if (cards.length > 0) target.discard(cards.randomGet());
			}
			else event.finish();
		},
		ai: {
			threaten: 1,
			order: get.order({ name: 'sha' }) - 0.2,
			expose: 0.2,
			result: {
				player: 1,
			},
		}
	},
	hok_wangzhe: {
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		zhuSkill: true,
		frequent: true,
		preHidden: true,
		global: 'hok_wangzhe_global',
		filter(event, player) {
			if (!player.hasZhuSkill('hok_wangzhe')) return false;
			if (event.name != 'phase' || game.phaseNumber == 0)
				return player.countMark('hok_shengguang') < 3;
			return false;
		},
		content() {
			player.addMark('hok_shengguang', 1);
		},
		group: ['hok_wangzhe_global'],
		subSkill: {
			global: {
				trigger: { player: 'phaseUseEnd' },
				filter(event, player) {
					var zhuplayer = game.filterPlayer(current => {
						return current.hasZhuSkill('hok_wangzhe', player);
					})[0];
					if (zhuplayer) {
						return player.group == 'qun' && player.countCards('he') > 0 && !player.hasZhuSkill('hok_wangzhe') && zhuplayer.isDamaged();
					}
					return false;
				},
				direct: true,
				content() {
					'step 0'
					event.hok_wangzheplayer = game.filterPlayer(current => {
						return current.hasZhuSkill('hok_wangzhe', player);
					})[0];
					player.chooseToDiscard('he', '是否弃置一张牌，令' + get.translation(event.hok_wangzheplayer) + '回复1点体力？').set('ai', function (card) {
						if (get.attitude(player, event.hok_wangzheplayer) < 1) return 0;
						if (event.hok_wangzheplayer.isDamaged()) {
							return 7 - get.value(card);
						}
						return 0;
					});
					'step 1'
					if (result.bool) {
						player.logSkill('hok_wangzhe_global');
						player.line(event.hok_wangzheplayer, 'green');
						event.hok_wangzheplayer.recover();
					}
					else event.finish();
				}
			},
		},
	},

	// SP
	// SP李信
	hok_wangming: {
		audio: 2,
		marktext: '王',
		unique: true,
		trigger: {
			source: 'damageSource',
			player: ['damageEnd', 'enterGame'],
			global: 'phaseBefore',
		},
		forced: true,
		filter(event) {
			return (event.name != 'damage' && (event.name != 'phase' || game.phaseNumber == 0)) || event.num > 0;
		},
		content() {
			if (player.countMark('hok_wangming') < 7) {
				player.addMark('hok_wangming', trigger.name == 'damage' ? 1 : 4);
			}
			if (trigger.name != 'damage') {
				var list = [];
				var zhu = get.zhu(player);
				if (zhu && zhu != player && zhu.skills) {
					for (var i = 0; i < zhu.skills.length; i++) {
						if (lib.skill[zhu.skills[i]] && lib.skill[zhu.skills[i]].zhuSkill) {
							list.push(zhu.skills[i]);
						}
					}
				}
				player.addAdditionalSkill('weidi', list);
				player.storage.zhuSkill_weidi = list;
				game.broadcastAll(function (list) {
					game.expandSkills(list);
					for (var i of list) {
						var info = lib.skill[i];
						if (!info) continue;
						if (!info.audioname2) info.audioname2 = {};
						info.audioname2.yuanshu = 'weidi';
					}
				}, list);
			}
		},
		intro: {
			name: '王命',
			content: 'mark',
		},
	},
	hok_dengshen: {
		audio: 2,
		trigger: { player: 'phaseBegin' },
		forced: true,
		unique: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: 'water',
		derivation: ['hok_sptongkuang', 'pozhu', 'olqingyi', 'xinfu_zuilun', 'reshuishi', 'lingce', 'dinghan', 'shencai', 'drlt_jieying', 'drlt_poxi'],
		filter(event, player) {
			return player.countMark('hok_wangming') >= 5;
		},
		content() {
			player.awakenSkill(event.name);
			player.addSkill('hok_sptongkuang');
			player.addSkill('xinfu_zuilun');
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			threaten(player, target) {
				if (target.hp == 1) return 3.5;
				return 1;
			},
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
					return 0.8;
				}
			}
		}
	},
	hok_sptongkuang: {
		audio: 2,
		trigger: { player: 'phaseJudgeBefore' },
		forced: true,
		filter(event, player) {
			return player.countMark('hok_wangming') >= 0;
		},
		usable: 1,
		content() {
			'step 0'
			player.chooseControl('人杰', '统御', '狂暴').set('prompt', '选择一个路线');
			'step 1'
			switch (result.control) {
				case '统御':
					player.addTempSkill('hok_sptongkuang_tongyu');
					lib.skill.hok_sptongkuang.hok_remove(player, ['renjie', 'kuangbao']);
					break;
				case '狂暴':
					player.addTempSkill('hok_sptongkuang_kuangbao');
					lib.skill.hok_sptongkuang.hok_remove(player, ['tongyu', 'renjie']);
					break;
				default:
					player.addTempSkill('hok_sptongkuang_renjie');
					lib.skill.hok_sptongkuang.hok_remove(player, ['tongyu', 'kuangbao']);
			}
		},
		removeRenjie(player) {
			if (player.hasSkill('pozhu')) {
				player.removeSkill('pozhu');
			}
			if (player.hasSkill('olqingyi')) {
				player.removeSkill('olqingyi');
			}
			if (player.hasSkill('xinfu_zuilun')) {
				player.removeSkill('xinfu_zuilun');
			}
		},
		removeTongyu(player) {
			if (player.hasSkill('reshuishi')) {
				player.removeSkill('reshuishi');
			}
			if (player.hasSkill('lingce')) {
				player.removeSkill('lingce');
			}
			if (player.hasSkill('dinghan')) {
				player.removeSkill('dinghan');
			}
		},
		removeKuangbao(player) {
			if (player.hasSkill('drlt_jieying')) {
				player.removeSkill('drlt_jieying');
			}
			if (player.hasSkill('shencai')) {
				player.removeSkill('shencai');
			}
			if (player.hasSkill('drlt_poxi')) {
				player.removeSkill('drlt_poxi');
			}
		},
		hok_remove(player, arrays) {
			if (arrays.includes('renjie')) {
				lib.skill.hok_sptongkuang.removeRenjie(player);
			}
			if (arrays.includes('tongyu')) {
				lib.skill.hok_sptongkuang.removeTongyu(player);
			}
			if (arrays.includes('kuangbao')) {
				lib.skill.hok_sptongkuang.removeKuangbao(player);
			}
		},
		subSkill: {
			renjie: {
				audio: 2,
				trigger: { player: 'phaseDiscardBegin' },
				forced: true,
				filter(event, player) {
					return player.countMark('hok_wangming') >= 5;
				},
				usable: 1,
				content() {
					event.lx = ['olqingyi', 'pozhu', 'xinfu_zuilun'];
					if (player.hasSkill('pozhu')) {
						event.lx.splice(event.lx.indexOf('pozhu'), 1)
					}
					if (player.hasSkill('olqingyi')) {
						event.lx.splice(event.lx.indexOf('olqingyi'), 1)
					}
					if (player.hasSkill('xinfu_zuilun')) {
						event.lx.splice(event.lx.indexOf('xinfu_zuilun'), 1)
					}
					'step 0'
					player.chooseControl(event.lx).set('prompt', '选择获得一个技能');
					'step 1'
					player.addSkillLog(result.control);
					player.removeMark('hok_wangming', 5);
					player.syncStorage('hok_wangming');
				}
			},
			tongyu: {
				audio: 2,
				trigger: { player: 'phaseDiscardBegin' },
				forced: true,
				filter(event, player) {
					return player.countMark('hok_wangming') >= 5;
				},
				usable: 1,
				content() {
					event.lx = ['reshuishi', 'lingce', 'dinghan'];
					if (player.hasSkill('reshuishi')) {
						event.lx.splice(event.lx.indexOf('reshuishi'), 1)
					}
					if (player.hasSkill('lingce')) {
						event.lx.splice(event.lx.indexOf('lingce'), 1)
					}
					if (player.hasSkill('dinghan')) {
						event.lx.splice(event.lx.indexOf('dinghan'), 1)
					}
					'step 0'
					player.chooseControl(event.lx).set('prompt', '选择获得一个技能');
					'step 1'
					player.addSkillLog(result.control);
					player.removeMark('hok_wangming', 5);
					player.syncStorage('hok_wangming');
				},
			},
			kuangbao: {
				audio: 2,
				trigger: { player: 'phaseDiscardBegin' },
				forced: true,
				filter(event, player) {
					return player.countMark('hok_wangming') >= 5;
				},
				usable: 1,
				content() {
					event.lx = ['shencai', 'drlt_jieying', 'drlt_poxi'];
					if (player.hasSkill('drlt_jieying')) {
						event.lx.splice(event.lx.indexOf('drlt_jieying'), 1)
					}
					if (player.hasSkill('shencai')) {
						event.lx.splice(event.lx.indexOf('shencai'), 1)
					}
					if (player.hasSkill('drlt_poxi')) {
						event.lx.splice(event.lx.indexOf('drlt_poxi'), 1)
					}
					'step 0'
					player.chooseControl(event.lx).set('prompt', '选择获得一个技能');
					'step 1'
					player.addSkillLog(result.control);
					player.removeMark('hok_wangming', 5);
					player.syncStorage('hok_wangming');
				}
			}
		},
	},
	// SP明世隐
	hok_sptaigua: {
		enable: 'phaseUse',
		usable: 2,
		filterTarget(card, player, target) {
			if (target.hp >= target.maxHp) return false;
			// if(target==player) return false;
			return true;
		},
		content() {
			player.damage();
			player.line(target, 'green');
			target.recover();
		},
		ai: {
			order: 2,
			result: {
				target(player, target) {
					if (target.hp == 1 && get.zhu(player) != player) return 5;
					if (target.hp < player.hp) return 5;
					if (player == target && player.countCards('h') > player.hp && player.hp != 1) return 5;
					return 0;
				}
			},
			threaten: 1,
		}
	},
	hok_minggua: {
		forced: true,
		group: ['hok_minggua_2', 'hok_minggua_3'],
		trigger: {
			player: 'damageBegin2',
		},
		init(player) {
			if (!player.storage.guaList) {
				player.storage.guaList = ['大吉', '中吉', '小吉', '小凶', '中凶', '大凶'];
				player.storage.gua1 = false,
					player.storage.gua2 = false,
					player.storage.gua3 = false,
					player.storage.gua4 = false,
					player.storage.gua5 = false,
					player.storage.gua6 = false;
			}
		},
		mark: true,
		intro: {
			content(storage, player) {
				if (player.storage.gua1 && player.storage.guaList.indexOf('大吉') >= 0) {
					player.storage.guaList.splice(player.storage.guaList.indexOf('大吉'), 1);
				}
				if (player.storage.gua2 && player.storage.guaList.indexOf('中吉') >= 0) {
					player.storage.guaList.splice(player.storage.guaList.indexOf('中吉'), 1);
				}
				if (player.storage.gua3 && player.storage.guaList.indexOf('小吉') >= 0) {
					player.storage.guaList.splice(player.storage.guaList.indexOf('小吉'), 1);
				}
				if (player.storage.gua4 && player.storage.guaList.indexOf('小凶') >= 0) {
					player.storage.guaList.splice(player.storage.guaList.indexOf('小凶'), 1);
				}
				if (player.storage.gua5 && player.storage.guaList.indexOf('中凶') >= 0) {
					player.storage.guaList.splice(player.storage.guaList.indexOf('中凶'), 1);
				}
				if (player.storage.gua6 && player.storage.guaList.indexOf('大凶') >= 0) {
					player.storage.guaList.splice(player.storage.guaList.indexOf('大凶'), 1);
				}
				return `<div class='text center'><span class=thundertext>` + player.storage.guaList + `</span></div>`;
			},
		},
		content() {
			var r = Math.random();
			var tar = trigger.player;
			var cards = tar.getCards('hej');

			var str = '';
			if (r < 0.05) {
				// 1
				str += '大凶';
			} else if (r < 0.2) {
				// 2
				str += '中凶';
			} else if (r < 0.5) {
				// 3
				str += '小凶';
			} else if (r < 0.8) {
				// 4
				str += '小吉';
			} else if (r < 0.95) {
				// 5
				str += '中吉';
			} else {
				str += '大吉';
			}
			player.popup(str);
			game.log(str);

			if (r < 0.05) {
				// 1
				if (!player.storage.gua6) {
					tar.die();
					trigger.cancel();
				}
			} else if (r < 0.2) {
				// 2
				if (!player.storage.gua5) {
					trigger.num++;
					if (cards.length > 0) {
						tar.discard(cards.randomGet());
					}
				}
			} else if (r < 0.5) {
				// 3
				if (!player.storage.gua4) {
					if (cards.length > 0) {
						tar.discard(cards.randomGet());
					}
				}
			} else if (r < 0.8) {
				// 4
				if (!player.storage.gua3) {
					tar.draw();
				}
			} else if (r < 0.95) {
				// 5
				if (!player.storage.gua2) {
					trigger.cancel();
					tar.recover(trigger.num);
					tar.draw();
				}
			} else {
				if (!player.storage.gua1) {
					trigger.cancel();
					tar.recover((tar.maxHp - tar.hp));
					tar.draw(4);
				}
			}
			var source = trigger.source;
			if (source) {
				if (tar.hasSkill('hok_biangua')) {
					if (tar.countMark('hok_biangua2') < 8) {
						tar.addMark('hok_biangua2', 1);
					}
				}
			}
		},
		subSkill: {
			2: {
				forced: true,
				trigger: {
					source: 'damageBegin2',
				},
				filter(event, player) {
					return event.getParent().name != 'hok_sptaigua';
				},
				content() {
					var r = Math.random();
					var tar = trigger.player;
					var cards = tar.getCards('hej');

					var str = '';
					if (r < 0.05) {
						// 1
						str += '大吉';
					} else if (r < 0.2) {
						// 2
						str += '中吉';
					} else if (r < 0.5) {
						// 3
						str += '小吉';
					} else if (r < 0.8) {
						// 4
						str += '小凶';
					} else if (r < 0.95) {
						// 5
						str += '中凶';
					} else {
						str += '大凶';
					}
					player.popup(str);
					game.delay(0.5);
					game.log(str);

					if (r < 0.05) {
						// 1
						if (!player.storage.gua1) {
							tar.die();
							trigger.cancel();
						}
					} else if (r < 0.2) {
						// 2
						if (!player.storage.gua2) {
							trigger.num++;
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.5) {
						// 3
						if (!player.storage.gua3) {
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.8) {
						// 4
						if (!player.storage.gua4) {
							tar.draw();
						}
					} else if (r < 0.95) {
						// 5
						if (!player.storage.gua5) {
							trigger.cancel();
							tar.recover(trigger.num);
							tar.draw();
						}
					} else {
						if (!player.storage.gua6) {
							trigger.cancel();
							tar.recover((tar.maxHp - tar.hp));
							tar.draw(4);
						}
					}
					if (player.hasSkill('hok_biangua')) {
						if (player.countMark('hok_biangua2') < 8) {
							player.addMark('hok_biangua2', 1);
						}
					}
				},
			},
			3: {
				forceDie: true,
				trigger: { player: 'die' },
				skillAnimation: true,
				animationColor: 'gray',
				direct: true,
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return current.maxHp >= player.maxHp;
					});
				},
				content() {
					'step 0'
					if (player.storage.gua1 && player.storage.guaList.indexOf('大吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('大吉'), 1);
					}
					if (player.storage.gua2 && player.storage.guaList.indexOf('中吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('中吉'), 1);
					}
					if (player.storage.gua3 && player.storage.guaList.indexOf('小吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('小吉'), 1);
					}
					if (player.storage.gua4 && player.storage.guaList.indexOf('小凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('小凶'), 1);
					}
					if (player.storage.gua5 && player.storage.guaList.indexOf('中凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('中凶'), 1);
					}
					if (player.storage.gua6 && player.storage.guaList.indexOf('大凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('大凶'), 1);
					} else {
						return;
					}
					'step 1'
					player.chooseControl(player.storage.guaList, 'cancel2').set('ai', function (event, player) {
						var goodGua = !player.storage.gua1 + !player.storage.gua2 + !player.storage.gua3;
						var badGua = !player.storage.gua4 + !player.storage.gua5 + !player.storage.gua6;
						if (goodGua <= badGua) {
							if (goodGua == 0) {
								return '取消';
							}
							return player.storage.guaList[0];
						} else {
							if (badGua == 0) {
								return '取消';
							}
							return player.storage.guaList[player.storage.guaList.length - 1];
						}
					});
					'step 2'
					switch (result.control) {
						case '大吉':
							player.storage.gua1 = true;
							break;
						case '中吉':
							player.storage.gua2 = true;
							break;
						case '小吉':
							player.storage.gua3 = true;
							break;
						case '小凶':
							player.storage.gua4 = true;
							break;
						case '中凶':
							player.storage.gua5 = true;
							break;
						case '大凶':
							player.storage.gua6 = true;
							break;
						default:
					}
					result.control = result.control == 'cancel2' ? '取消' : result.control;
					var str = get.translation(player) + '选择了：#y' + result.control;
					// event.dialog = ui.create.dialog(str);
					player.popup(result.control);
					game.log(str);
					player.markSkill('hok_minggua');
					'step 3'
					player.chooseTarget(get.prompt('hok_minggua'), '令一名体力上限大于等于你的其他角色获得〖命卦〗', function (card, player, target) {
						return target.maxHp >= player.maxHp;
					}).set('forceDie', true).set('ai', function (target) {
						var goodGua = (player.storage.gua1 ? 0 : 1) + (player.storage.gua2 ? 0 : 1) + (player.storage.gua3 ? 0 : 1);
						var badGua = (player.storage.gua4 ? 0 : 1) + (player.storage.gua5 ? 0 : 1) + (player.storage.gua6 ? 0 : 1);
						if (get.attitude(_status.event.player, target) > 0 && goodGua > badGua) {
							return 5;
						}
						if (get.attitude(_status.event.player, target) <= 0 && goodGua > badGua) {
							return 0;
						}
						if (get.attitude(_status.event.player, target) > 0 && goodGua <= badGua) {
							return 0;
						}
						return 2;
					});
					'step 4'
					if (result.bool) {
						var target = result.targets[0];
						event.target = target;
						player.logSkill('hok_minggua', target);
					}
					else event.finish();
					'step 5'
					target.storage.guaList = player.storage.guaList;
					target.storage.gua1 = player.storage.gua1,
						target.storage.gua2 = player.storage.gua2,
						target.storage.gua3 = player.storage.gua3,
						target.storage.gua4 = player.storage.gua4,
						target.storage.gua5 = player.storage.gua5,
						target.storage.gua6 = player.storage.gua6;
					target.addSkillLog('hok_minggua');
				},
			},
		}
	},
	hok_biangua: {
		global: ['hok_biangua2', 'hok_biangua3'],
		filter(event, player) {
			let tar = game.filterPlayer(function (target) {
				return target.hasSkill('hok_biangua');
			})[0];
			return tar.isAlive();
		}
	},
	hok_biangua2: {
		mark: true,
		marktext: '卦',
		frequent: true,
		intro: {
			name: '卦象',
			content: 'mark',
		},
	},
	hok_biangua3: {
		usable: 1,
		enable: 'phaseUse',
		filter(event, player) {
			let tar = game.filterPlayer(function (target) {
				return target.hasSkill('hok_biangua');
			})[0];
			if (tar) {
				return tar.countMark('hok_biangua2') > 7 && player.storage.guaList.length > 0;
			}
			return false;
		},
		content() {
			'step 0'
			if (player.storage.gua1 && player.storage.guaList.indexOf('大吉') >= 0) {
				player.storage.guaList.splice(player.storage.guaList.indexOf('大吉'), 1);
			}
			if (player.storage.gua2 && player.storage.guaList.indexOf('中吉') >= 0) {
				player.storage.guaList.splice(player.storage.guaList.indexOf('中吉'), 1);
			}
			if (player.storage.gua3 && player.storage.guaList.indexOf('小吉') >= 0) {
				player.storage.guaList.splice(player.storage.guaList.indexOf('小吉'), 1);
			}
			if (player.storage.gua4 && player.storage.guaList.indexOf('小凶') >= 0) {
				player.storage.guaList.splice(player.storage.guaList.indexOf('小凶'), 1);
			}
			if (player.storage.gua5 && player.storage.guaList.indexOf('中凶') >= 0) {
				player.storage.guaList.splice(player.storage.guaList.indexOf('中凶'), 1);
			}
			if (player.storage.gua6 && player.storage.guaList.indexOf('大凶') >= 0) {
				player.storage.guaList.splice(player.storage.guaList.indexOf('大凶'), 1);
			} else {
				return;
			}

			'step 1'
			event.guaTarget = game.filterPlayer(function (target) {
				return target.hasSkill('hok_biangua');
			})[0];
			player.chooseControl(player.storage.guaList, 'cancel2').set('ai', function (event, player) {
				var goodGua = !player.storage.gua1 + !player.storage.gua2 + !player.storage.gua3;
				var badGua = !player.storage.gua4 + !player.storage.gua5 + !player.storage.gua6;
				if (get.attitude(_status.event.player, event.guaTarget) <= 0) {
					if (goodGua == 0) {
						return '取消';
					}
					return player.storage.guaList[0];
				} else {
					if (badGua == 0) {
						return '取消';
					}
					return player.storage.guaList[player.storage.guaList.length - 1];
				}
			});
			'step 2'
			switch (result.control) {
				case '大吉':
					player.storage.gua1 = true;
					break;
				case '中吉':
					player.storage.gua2 = true;
					break;
				case '小吉':
					player.storage.gua3 = true;
					break;
				case '小凶':
					player.storage.gua4 = true;
					break;
				case '中凶':
					player.storage.gua5 = true;
					break;
				case '大凶':
					player.storage.gua6 = true;
					break;
				default:
			}
			result.control = result.control == 'cancel2' ? '取消' : result.control;
			var str = get.translation(player) + '选择了：#y' + result.control;
			// event.dialog = ui.create.dialog(str);
			player.popup(result.control);
			game.log(str);
			if (!player.hasSkill('hok_biangua')) {
				var guaPlayer = game.filterPlayer(function (target) {
					return target.hasSkill('hok_biangua');
				})[0];
				guaPlayer.removeMark('hok_biangua2', 8);
				guaPlayer.markSkill('hok_minggua');
			} else {
				player.removeMark('hok_biangua2', 8);
				player.markSkill('hok_minggua');
			}
			'step 3'
			game.delay(1);
			// event.dialog.close();
		},
		ai: {
			order() {
				return get.order({ name: 'sha' }) + 1;
			},
			result: { player: 1 },
		},
	},

	// others

};

export default skills;
