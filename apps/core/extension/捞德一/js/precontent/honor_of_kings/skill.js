import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';
const skills = {
	// 王者公共技
	hok_bukexuanzhong: {
		trigger: {
			player: 'damageBegin4',
		},
		charlotte: true,
		forced: true,
		content() {
			trigger.cancel();
		},
		mark: true,
		firstDo: true,
		intro: {
			content: '不能成为牌的目标，防止受到的所有伤害',
		},
		mod: {
			targetEnabled(card, player, target) {
				return false;
			},
		},
		ai: {
			nofire: true,
			nothunder: true,
			nodamage: true,
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'damage')) {
						return 'zeroplayertarget';
					}
				},
			},
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
	hok_zhimang: {
		trigger: {
			player: 'useCardToBefore',
			target: 'useCardToBefore'
		},
		forced: true,
		locked: false,
		filter: function (event, player, name) {
			// 检查是否是【杀】或单目标锦囊伤害牌
			if (name === 'player') {
				return event.card.name === 'sha';
			}
			return get.type(event.card) === 'trick' &&
				get.tag(event.card, 'damage') &&
				event.targets.length === 1;
		},
		async content(event, trigger, player) {
			// 如果是玩家使用【杀】，标记无法造成伤害
			if (event.triggername === 'useCardToBefore' && trigger.player === player) {
				trigger.card.storage.hok_zhimang = true;
			}
			// 如果是单目标锦囊伤害牌，随机指定目标
			else {
				// 获取所有合法目标
				const targets = game.filterPlayer(target => {
					return lib.filter.targetEnabled(trigger.card, player, target);
				});

				// 随机选择一个目标
				if (targets.length > 0) {
					const randomTarget = targets.randomGet();
					// 替换原有目标
					trigger.targets = [randomTarget];
				}
			}
			player.removeSkill('hok_zhimang');
		},
		mod: {
			cardDamage: function (card, player, target, num) {
				// 检查是否是被标记的【杀】
				if (card.storage && card.storage.hok_zhimang) {
					return 0;
				}
			}
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					// AI评估：如果使用的是【杀】，伤害为0
					if (card.name === 'sha' && card.storage && card.storage.hok_zhimang) {
						return [0, 0];
					}
				}
			}
		}
	},

	// A
	// 安琪拉
	hok_huoqiu: {
		usable: 1,
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
					const att = get.sgn(get.attitude(player, target));
					return att * get.damageEffect(target, player, player, 'fire');;
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
		derivation: 'hok_bukexuanzhong',
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
			player.addTempSkill('hok_bukexuanzhong', { player: 'phaseBeginStart' });
			player.addSkill('hok_qiongxuan_video');
		},
		subSkill: {
			// effect: {
			// 	forced: true,
			// 	firstDo: true,
			// 	mark: true,
			// 	intro: {
			// 		name: '穷玄',
			// 		content: '不能成为牌的目标',
			// 	},
			// 	mod: {
			// 		targetEnabled(card, player, target) {
			// 			return false;
			// 		},
			// 	}
			// },
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
			'step 3'
			player.storage.hok_kuangju = 0;
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
	// 扁鹊
	hok_eyi: {
		audio: 'eyi',
		forced: true,
		trigger: {
			source: 'damageSource',
		},
		filter(event, player) {
			return event.num > 0 && (event.hasNature() || get.type(event.card) == 'trick');
		},
		async content(event, trigger, player) {
			const target = trigger.player;
			if (!target || !target.isIn()) return;

			await target.addMark('hok_eyi_mark', 1);
			await target.addSkill('hok_eyi_start');
		},
		// group: ['hok_eyi_limit'],
		subSkill: {
			mark: {
				marktext: '☠',
				intro: {
					content: '拥有"恶医"标记的角色每个出牌阶段开始时需弃置X张牌（X为"恶医"数量/2）',
				},
			},
			start: {
				trigger: {
					player: 'phaseBegin',
				},
				filter(event, player) {
					return player.countMark('hok_eyi_mark') > 0;
				},
				async content(event, trigger, player) {
					const num = Math.floor(player.countMark('hok_eyi_mark') / 2);
					if (num > 0) {
						await player.chooseToDiscard(num, 'h', true);
					}
				},
			},
		},
	},
	hok_eyi_limit: {
		skillAnimation: true,
		animationColor: 'water',
		unique: true,
		mark: true,
		limited: true,
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			return game.hasPlayer(target => target.isIn() && target.hp < target.maxHp);
		},
		filterTarget(card, player, target) {
			return target.isIn() && target.hp < target.maxHp;
		},
		async content(event, trigger, player) {
			player.awakenSkill('hok_eyi_limit');
			const target = event.targets[0];
			await target.recoverTo(target.maxHp);
		},
		ai: {
			order: 10,
			result: {
				target(player, target) {
					return target.maxHp - target.hp;
				},
			},
		},
	},
	hok_jinyao: {
		enable: 'phaseUse',
		usable: 2,
		filterCard: (card, player) => {
			return get.color(card) === 'black';
		},
		filter: (event, player) => {
			return player.countCards('h', { color: 'black' }) > 0;
		},
		position: 'hs',
		viewAs: { name: 'sha', nature: 'thunder' },
		filterTarget: (card, player, target) => {
			return player.canUse({ name: 'sha', nature: 'thunder' }, target);
		},
		check: (card) => {
			return 7 - get.value(card);
		},
		prompt: '将一张黑色手牌当雷【杀】使用',
		mod: {
			cardUsable(card, player, num) {
				if (card.name === 'sha') return 2;
			},
		},
		async content(event, trigger, player) {
			const { result } = event;
			if (!result.bool) return;

			// 等待杀的使用结算完成
			await result.card?.forResult();

			// 检查是否造成伤害
			if (result.targets?.[0]?.isDamaged()) {
				await result.targets[0].chooseToDiscard(1, 'he', true);
			}
		},
		ai: {
			order: 8,
			respondSha: true,
			skillTagFilter: (player, tag, arg) => {
				if (tag !== 'respondSha') return false;
				return player.countCards('h', { color: 'black' }) > 0;
			},
			result: {
				target: (player, target) => {
					if (player.hasSkill('jueqing')) return -1.5;
					return -1;
				},
			},
		},
	},
	hok_mingzai: {
		enable: 'phaseUse',
		usable: 1,
		filter: function (event, player) {
			return player.countCards('h', { color: 'red' }) >= 2;
		},
		selectTarget: -1, // 选择所有角色
		content: async function (event, trigger, player) {
			// 1. 弃置2张红色手牌
			const result = await player.chooseToDiscard('h', 2, { color: 'red' }).forResult();
			if (!result.bool) return;

			// 2. 对每个角色分别计算伤害
			for (const p of game.players) {
				console.log(p.name, '的恶医标记数量:', p.countMark('hok_eyi_mark'));
				if (p == player) continue; // 跳过自己

				// 获取该角色身上的"恶医"标记数量
				const markCount = p.countMark('hok_eyi_mark');
				if (markCount <= 0) continue;

				// 移除该角色所有的"恶医"标记
				p.removeMark('hok_eyi_mark', markCount);

				// 计算伤害值（标记数量/2，向下取整）
				const damage = Math.floor(markCount / 2);
				if (damage <= 0) continue;

				// 3. 对该角色造成伤害
				await p.damage(damage, 'thunder', player);
				if (p.hp < damage) {
					// 体力值小于伤害值，直接死亡
					await p.die({ source: player });
				}
			}
		},
		ai: {
			order: 5,
			result: {
				player: function (player) {
					// AI评估：检查场上是否有角色有"恶医"标记
					const hasMarks = game.players.some(p => p.countMark('hok_eyi') > 0);
					if (hasMarks && player.countCards('h', { color: 'red' }) >= 2) return 1;
					return 0;
				},
				target: function (player, target) {
					// 对敌人有利，对己方不利
					if (target.isEnemyOf(player)) return 1;
					return -1;
				}
			}
		}
	},

	// D
	// 妲己
	hok_meixin: {
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
		init(player) {
			player.storage.clears = [];
		},
		content() {
			if (!trigger.player.hasMark('hok_mingge')) {
				trigger.player.addMark('hok_mingge');
			} else {
				var cards = trigger.player.getCards('he', function (card) {
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
				target.addTempSkill('hok_tianlai_effect');
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
		ai: {
			order: 13,
			result: {
				player(player) {
					let list = game.filterPlayer(function (target) {
						return player.inRange(target) && !target.isDead() && target != player && get.attitude(_status.event.player, target) < 0 ? true : false;
					});
					for (let target of list) {
						let shaBool = false;
						let hs = player.countCards('h', card => {
							if (!get.tag(card, 'damage') || get.effect(target, card, player, player) <= 0) return 0;
							if (shaBool) return 0;
							else if (get.name(card, player) === 'sha') {
								shaBool = true;
								if (target.getEquip('bagua')) return 0.5;
								if (target.getEquip('rewrite_bagua')) return 0.25;
							}
							return 1;
						}),
							ts =
								target.hp +
								target.hujia +
								game.countPlayer(current => {
									if (get.attitude(current, target) > 0) return current.countCards('hs') / 8;
									return 0;
								});
						if (hs >= ts) return hs;
					}
					return 0;
				},
			},
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
		init(player) {
			player.storage.clears = [];
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
		filterTarget(card, player, target) {
			return target != player && target.inRangeOf(player);
		},
		async content(event, trigger, player) {
			player.awakenSkill('hok_zhuorizhishi');
			var target = event.target;
			target.turnOver();
			target.chooseToDiscard('he', Math.ceil(get.distance(target, player) / 2), true);
		},
		ai: {
			order: 10,
			expose: 0.2,
			result: {
				target(player, target) {
					if (target.countCards('h') == 0) {
						return 0;
					}
					return -1;
				},
			},
		},
	},

	// J
	// 姜子牙
	hok_fengshen: {
		trigger: { player: 'phaseZhunbeiBegin' },
		forced: true,
		locked: false,
		filter(event, player) {
			return true;
		},
		async content(event, trigger, player) {
			// 选择目标
			const result = await player.chooseTarget(get.prompt('hok_fengshen'), '选择一名角色进行判定', (card, player, target) => {
				return true;
			}).set('ai', target => {
				// 优先对体力不满的队友使用
				if (get.attitude(player, target) > 0 && target.hp < target.maxHp) {
					return 2;
				}
				if (get.attitude(player, target) > 0) {
					return 1;
				}
				if (player == target) {
					return 0.5;
				}
				// 其次对敌人使用（可能造成负面效果）
				if (get.attitude(player, target) < 0) {
					return -1;
				}
				return 0;
			}).forResult();

			if (!result.bool) return;

			const target = result.targets[0];
			player.logSkill('hok_fengshen', target);
			player.line(target);

			// 进行判定
			const judgeEvent = await target.judge(card => {
				return get.color(card) == 'red' ? 1 : -1;
			});
			judgeEvent.judge2 = result => result.bool;

			const { result: { judge } } = await judgeEvent;

			// 根据判定结果执行不同效果
			if (judge > 0) {
				// 红色：增加体力上限并回复体力
				await target.gainMaxHp();
				await target.recover();
			} else {
				// 黑色：摸1张牌，手牌上限+1
				await target.draw(1);
				target.addTempSkill('hok_fengshen_maxHandcard', 'roundStart');
			}
		},
		ai: {
			order: 8,
			result: {
				target(player, target) {
					// 优先对体力不满的队友使用
					if (get.attitude(player, target) > 0 && target.hp < target.maxHp) {
						return 2;
					}
					if (get.attitude(player, target) > 0) {
						return 1;
					}
					if (player == target) {
						return 0.5;
					}
					// 其次对敌人使用（可能造成负面效果）
					if (get.attitude(player, target) < 0) {
						return -1;
					}
					return 0;
				}
			}
		},
		subSkill: {
			maxHandcard: {
				mod: {
					maxHandcard(player, num) {
						return num + 1;
					}
				}
			}
		}
	},
	hok_shenfa: {
		enable: 'phaseUse',
		usable: 1,
		filterCard: true,
		position: 'h',
		selectCard: 1, filterTarget(card, player, target) {
			return target != player && player.inRange(target);
		},
		async content(event, trigger, player) {
			const target = event.target;
			// 弃置一张手牌
			await player.discard(event.cards);

			// 目标进行判定
			const judgeEvent = await target.judge(card => {
				if (get.suit(card) == 'diamond') return -1.5;
				if (get.suit(card) == 'spade') return -3;
				if (get.suit(card) == 'club') return -2;
				return 0;
			});
			judgeEvent.judge2 = result => result.bool;

			const { result: { judge, card } } = await judgeEvent;

			// 根据判定结果执行不同效果
			if (get.suit(card) == 'diamond') {
				// 方块：受到雷电伤害
				target.damage('thunder', player);
			} else if (get.suit(card) == 'club') {
				// 黑桃：弃置两张牌
				await target.chooseToDiscard(2, 'he', true);
			} else if (get.suit(card) == 'spade') {
				// 梅花：翻面
				await target.turnOver();
			}
		},
		ai: {
			order: 7,
			result: {
				target(player, target) {
					// 对敌人使用，优先选择手牌较多的角色
					if (get.attitude(player, target) < 0) {
						const discardEffect = -Math.min(2, target.countCards('he')) * 0.5;
						const turnOverEffect = target.isTurnedOver() ? 0 : -2;
						return discardEffect + turnOverEffect;
					}
					// 对队友使用收益为负
					return -1;
				}
			},
			check(card) {
				// 优先弃置价值较低的牌
				return 6 - get.value(card);
			}
		}
	},
	hok_tianrenfaze: {
		enable: 'phaseUse',
		unique: true,
		limited: true,
		skillAnimation: true,
		animationColor: 'thunder',
		filter(event, player) {
			return game.roundNumber >= 4;
		},
		filterTarget: lib.filter.notMe,
		async content(event, trigger, player) {
			player.awakenSkill('hok_tianrenfaze');
			const target = event.target;

			// 视为使用3次雷杀
			for (let i = 0; i < 3; i++) {
				// 第3次雷杀伤害+1
				if (i == 2) {
					await player.useCard({
						name: 'sha',
						nature: 'thunder',
						isCard: true
					}, target).set('oncard', card => {
						_status.event.baseDamage = 2;
					});
				} else {
					await player.useCard({
						name: 'sha',
						nature: 'thunder',
						isCard: true
					}, target);
				}
			}
		},
		ai: {
			order: 5,
			result: {
				target(player, target) {
					// 优先对敌人使用，尤其是体力较低的角色
					if (get.attitude(player, target) < 0) {
						let damage = 3;
						if (target.hp <= 2) damage += 1;
						return -damage;
					}
					// 对队友使用收益为负
					return -3;
				}
			}
		}
	},
	hok_tiandiao: {
		zhuSkill: true,
		usable: 2,
		trigger: { global: 'judge' },
		filter: function (event, player) {
			if (player.getStat('skill').hok_tiandiao >= 2) return false;
			return ui.cardPile.childNodes.length > 0;
		},
		content: async function (event, trigger, player) {
			const card = get.cards()[0];
			player.showCards([card], get.translation(player) + '发动了【天钓】');

			const result = await player.chooseBool(
				'是否使用【天钓】替换判定牌？',
				'判定牌：' + get.translation(card)
			).set('ai', () => {
				// 计算新判定牌对判定玩家的收益
				const currentCardEffect = get.effect(trigger.player, card, player, player);
				// 计算原判定牌对判定玩家的收益
				const newCardEffect = get.effect(trigger.player, trigger.player.judging[0], player, player);
				// 判断是否为队友
				const isAlly = get.attitude(player, trigger.player) > 0;
				// 如果是队友，希望收益更高；如果是敌人，希望收益更低
				const decision = isAlly ? (newCardEffect > currentCardEffect) : (newCardEffect < currentCardEffect);
				return decision;
			}).forResult();

			if (result.bool) {
				trigger.player.judging[0] = card;
				trigger.orderingCards.addArray([card]);
				await game.delay(2);
			} else {
				ui.cardPile.insertBefore(card, ui.cardPile.firstChild);
			}
		},
		ai: {
			expose: 0.2,
			threaten: 1.5,
			rejudge: true,
			tag: { rejudge: 1 }
		}
	},
	// 金蝉
	hok_jinlan: {
		trigger: {
			target: 'useCardToBefore',
		},
		filter: function (event, player) {
			// 检查是否是乐不思蜀或兵粮寸断
			if (!['lebu', 'bingliang'].includes(event.card.name)) return false;
			// 检查是否是玩家自己成为目标
			if (event.player === player) return false;
			// 检查是否是每轮限1次
			// if (player.getStat('skill').hok_jinlan >= 1) return false;
			return true;
		},
		usable: 1,
		round: true,
		check: function (event, player) {
			// AI判断：总是取消负面效果
			return true;
		},
		content: async function (event, trigger, player) {
			// 取消牌的效果
			trigger.cancel();
		},
		ai: {
			order: 5,
			result: {
				player: 1,
			},
		},
	},
	hok_jingu: {
		enable: 'phaseUse',
		usable: 1,
		filterCard: function (card) {
			return get.type(card) != 'basic';
		},
		filterTarget: function (card, player, target) {
			return target != player;
		},
		filter(event, player) {
			return player.countCards('hs', card => get.type(card) !== 'basic') > 0;
		},
		selectTarget: 1,
		content: async function (event, trigger, player) {
			// 添加"箍"标记
			// await target.addMark('hok_jingu_effect');
			// 添加临时技能，直到玩家下个回合开始
			event.target.storage.hok_jingu_source = player;
			await event.target.addTempSkill('hok_jingu_effect', { player: 'phaseBegin' });
		},
		ai: {
			order: 5,
			result: {
				target: -1,
				player: 1,
			},
		},
		subSkill: {
			effect: {
				mod: {
					globalTo: function (from, to) {
						if (from.hasMark('hok_jingu')) {
							return 1;
						}
					},
				},
				mark: true,
				marktext: '箍',
				intro: {
					name: '紧箍',
					content: function (storage, player) {
						// 获取施加"箍"效果的角色
						const source = player.storage.hok_jingu_source;
						return `与其他角色的距离视为1，且不能响应${get.translation(source)}使用的【杀】`;
					},
				},
				trigger: {
					target: 'useCardToPlayered',
				},
				filter: function (event, player) {
					if (!event.player.hasSkill('hok_jingu')) return false;
					return event.card.name == 'sha';
				},
				forced: true,
				popup: false,
				content: async function (event, trigger, player) {
					// 使杀不可被响应
					trigger.directHit.add(trigger.target);
				},
			},
		},
	},
	hok_zhangyin: {
		enable: 'phaseUse',
		usable: 1,
		filterCard: true,
		selectCard: 2,
		filterTarget: lib.filter.notMe,
		selectTarget: 1,
		content: async function (event, trigger, player) {
			const target = event.target;
			// 令目标摸至2张牌
			// const num = 2 - target.countCards('h');
			// if (num > 0) {
			await target.draw(2);
			// }

			// 令目标弃置2张手牌
			const result = await target.chooseToDiscard('h', 2, true)
				.set('ai', card => {
					// 获取玩家手牌
					const handcards = player.getCards('h');
					// 统计各颜色的牌数
					const colorCount = {};
					handcards.forEach(c => {
						const color = get.color(c);
						colorCount[color] = (colorCount[color] || 0) + 1;
					});
					// 优先弃置颜色相同的牌
					const cardColor = get.color(card);
					if (colorCount[cardColor] >= 2) {
						return 10; // 高优先级
					}
					// 否则按牌值弃置
					return 7 - get.value(card);
				}).forResult();
			const cards = result.cards || [];
			// 计算弃置牌的颜色数量
			const colors = new Set();
			cards.forEach(card => {
				colors.add(get.color(card));
			});

			// 造成雷电伤害
			if (colors.size > 0) {
				for (let i = 0; i < colors.size; i++) {
					await target.damage('thunder');
				}
			}
		},
		ai: {
			order: 5,
			result: {
				target: -1,
				player: 1,
			},
		},
	},
	hok_due: {
		zhuSkill: true,
		trigger: {
			player: 'damageBegin',
		},
		filter: function (event, player) {
			if (player.countCards('he') <= 0) return false;
			if (event.num <= 1) return false;
			if (!player.hasZhuSkill('hok_due', event.source)) return false;
			return true;
		},
		check: function (event, player) {
			if (event.num > 1 && player.countCards('he') > 0) return true;
			return false;
		},
		content: async function (event, trigger, player) {
			const target = trigger.source;
			if (!target) return;

			// 弃置一张牌
			const result = await player.chooseToDiscard('he', true).forResult();

			if (result.bool) {
				// 将伤害改为1
				trigger.num = 1;

				// 添加日志
				game.log(player, '发动了', '#g【hok_due】', '，将', trigger.source, '受到的伤害改为1');
			}
		},
		ai: {
			threaten: 1.5,
		},
	},

	// K
	// 凯
	hok_xiuluo: {
		marktext: '铠',
		intro: {
			name: '铠',
			content: (storage, player) => {
				const count = player.countMark('hok_xiuluo');
				return `手牌上限+${count}`;
			},
		},
		enable: 'phaseUse',
		usable: 1,
		filterCard: true,
		selectCard: [1, 2],
		position: 'h',
		filter: (event, player) => {
			// 检查玩家是否有手牌
			if (player.countCards('h') <= 0) return false;
			return true;
		},
		prompt: '将至多2张手牌置于你的武将牌上，称为"铠"',
		async content(event, trigger, player) {
			// 将选中的牌作为"铠"标记
			const cards = event.cards;
			player.addMark('hok_xiuluo', cards.length + 1);
			// 显示动画效果
			player.$gain2(cards, false);
			game.delayx();
			// 将牌移出游戏
			await player.addToExpansion(cards, 'giveAuto', player).set('giver', player).set('log', false);
		},
		ai: {
			order: 7,
			result: {
				player: (player) => {
					// 根据当前手牌数量和"铠"标记数量决定是否发动
					const handCards = player.countCards('h');
					const armorCount = player.countMark('hok_xiuluo');
					// 手牌较多时保留手牌，手牌较少时可以发动
					if (handCards > 4) return 1;
					if (handCards > 2 && armorCount < 2) return 0.5;
					return 0;
				}
			},
			expose: 0.2,
		},
		mod: {
			maxHandcard: (player, num) => {
				return num + player.countMark('hok_xiuluo');
			}
		},
		group: ['hok_xiuluo_remove', 'hok_xiuluo_reset'],
		subSkill: {
			remove: {
				trigger: {
					player: 'phaseEnd',
				},
				forced: true,
				async content(event, trigger, player) {
					// 回合结束时，将"铠"标记对应的牌弃置
					const armorCount = player.countMark('hok_xiuluo');
					if (armorCount > 0) {
						const cards = player.getExpansions('hok_xiuluo');
						if (cards.length > 0) {
							await player.loseToDiscardpile(cards);
							player.removeMark('hok_xiuluo', armorCount);
						}
					}
				}
			},
			reset: {
				trigger: {
					player: 'phaseBegin',
				},
				forced: true,
				silent: true,
				content: function () {
					// 回合开始时，重置已放置的牌数
					player.storage.hok_xiuluo_placed = 0;
				}
			}
		}
	},
	hok_jiren: {
		trigger: { player: 'useCard' },
		filter: (event, player) => {
			return event.card.name == 'sha' && player.countMark('hok_xiuluo') > 0;
		},
		async content(event, trigger, player) {
			// 移去一张"铠"
			player.removeMark('hok_xiuluo', 1);
			// 摸1张牌
			await player.draw();
		},
		ai: {
			expose: 0.3,
		}
	},
	hok_moqu: {
		enable: 'phaseUse',
		usable: 1,
		skillAnimation: true,
		animationColor: 'thunder',
		filter: (event, player) => {
			return player.countMark('hok_xiuluo') >= 4;
		},
		prompt: '移去4枚"铠"，召唤"魔铠"直到你下个回合开始',
		async content(event, trigger, player) {
			// 移去4枚"铠"
			player.removeMark('hok_xiuluo', 4);
			// 添加魔铠效果
			player.addTempSkill('hok_moqu_effect', { player: 'phaseBeginStart' });
			// 显示动画效果
			player.popup('魔铠');
			game.log(player, '召唤了魔铠');
		},
		ai: {
			order: 8,
			result: {
				player: (player) => {
					// 根据当前局势决定是否召唤魔铠
					const armorCount = player.countMark('hok_xiuluo');
					if (armorCount >= 4) {
						// 体力较低时优先召唤
						if (player.hp <= 2) return 1.5;
						// 有多个敌人时优先召唤
						const enemies = game.filterPlayer(current => get.attitude(player, current) < 0);
						if (enemies.length >= 2) return 1.2;
						return 1;
					}
					return 0;
				}
			},
			expose: 0.4,
		},
		subSkill: {
			effect: {
				mark: true,
				marktext: '魔',
				intro: {
					name: '魔铠',
					content: '你的【杀】造成的伤害+1，你受到的伤害-1',
				},
				trigger: {
					source: 'damageBegin1',
					player: 'damageBegin4',
				},
				forced: true,
				async content(event, trigger, player) {
					if (event.triggername == 'damageBegin1' && trigger.card && trigger.card.name == 'sha' && trigger.source == player) {
						// 杀造成的伤害+1
						trigger.num++;
					} else if (event.triggername == 'damageBegin4' && trigger.player == player) {
						// 受到的伤害-1
						if (trigger.num > 0) trigger.num--;
					}
				},
				ai: {
					threaten: 1.5,
					effect: {
						target: (card, player, target) => {
							// 当玩家受到伤害时，减少伤害值
							if (get.tag(card, 'damage') && player == target) {
								return [0.5, 0.5];
							}
						}
					}
				}
			}
		}
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
		filterTarget(card, player, target) {
			return target != player && target.inRangeOf(player);
		},
		async content(event, trigger, player) {
			player.awakenSkill('hok_chujue');
			var target = event.target;
			if (target.countDiscardableCards(player, 'he')) {
				player.line(target);
				player.discardPlayerCard('he', target, true);
			}
			if (target.countDiscardableCards(player, 'he')) {
				player.line(target);
				player.discardPlayerCard('he', target, true);
			}
			if (target.getNext() != player) {
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
				_status.event.addCount = false;
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
			if (player.countCards('hes') < 1) {
				return false;
			}
			if (player.storage.hok_tongkuang == '统御' || player.storage.hok_tongkuang == '狂暴') {
				return true;
			}
			return false;
		},
		filterCard: true, // 允许弃置任意一张牌
		selectCard: 1, // 只弃置一张牌
		position: 'hes', // 可以弃置手牌或装备牌
		check(card) {
			return 6 - get.value(card); // 优先弃置价值较低的牌
		},
		async content(event, trigger, player) {
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
				}) + 0.5;
			},
			result: {
				target(player, target) {
					return -get.effect(target, { name: 'sha' }, player, player);
				},
			},
		},
	},
	// hok_tongkuang: {
	// 	unique: true,
	// 	limited: true,
	// 	enable: ['phaseUse', 'phaseUseBefore'],
	// 	skillAnimation: true,
	// 	animationColor: 'gray',
	// 	derivation: ['hok_tongyu_faq', 'hok_kuangbao_faq'],
	// 	filter(event, player) {
	// 		return player.countMark('hok_guangan') >= 3;
	// 	},
	// 	content() {
	// 		'step 0'
	// 		player.awakenSkill('hok_tongkuang');
	// 		player.removeSkill('hok_huiren');
	// 		player.removeSkill('hok_qiangzhan');
	// 		'step 1'
	// 		player.chooseControl('统御', '狂暴').set('prompt', '统狂：请选择一项').set('choiceList', [
	// 			'统御<br/>\
	// 			烈华：出牌阶段开始前，你可以跳过出牌阶段，下回合出牌阶段开始时视为使用2张雷杀。<br/>\
	// 			光斩：你的攻击范围+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并跳过出牌阶段，下回合开始时弃置你判定区的牌并选择攻击范围内至多2名其他角色，对每名目标角色造成2点雷电伤害。',
	// 			'狂暴<br/>\
	// 			暴冲：出牌阶段开始前，你可以跳过出牌阶段和弃牌阶段，下回合开始时弃置你判定区的牌并回复1点体力。<br/>\
	// 			残撕：摸牌阶段，你的摸牌数+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并选择攻击范围的其他角色，弃置其2张牌，令你本回合杀的次数+1。'
	// 		]).set('ai', function () {
	// 			return '统御';
	// 		});
	// 		'step 2'
	// 		player.storage.hok_tongkuang = result.control;
	// 		if (player.storage.hok_tongkuang == '统御') {
	// 			player.addSkill('hok_liehua');
	// 			player.addSkill('hok_guangzhan');
	// 			player.popup('统御');
	// 		}
	// 		else {
	// 			player.addSkill('hok_baochong');
	// 			player.addSkill('hok_cansi');
	// 			player.popup('狂暴');
	// 		}
	// 	},
	// 	ai: {
	// 		order: 3,
	// 		result: {
	// 			player: 1,
	// 		},
	// 	}
	// },
	hok_tongkuang: {
		unique: true,
		limited: true,
		skillAnimation: true,
		animationColor: 'gray',
		derivation: ['hok_tongyu_faq', 'hok_kuangbao_faq'],
		trigger: { player: 'phaseUseBefore' },
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
            光斩：你的攻击范围+1。出牌阶段开始前，若你的"信"标记大于等于3，你可以弃置3枚"信"标记并跳过出牌阶段，下回合开始时弃置你判定区的牌并选择攻击范围内至多2名其他角色，对每名目标角色造成2点雷电伤害。',
				'狂暴<br/>\
            暴冲：出牌阶段开始前，你可以跳过出牌阶段和弃牌阶段，下回合开始时弃置你判定区的牌并回复1点体力。<br/>\
            残撕：摸牌阶段，你的摸牌数+1。出牌阶段开始前，若你的"信"标记大于等于3，你可以弃置3枚"信"标记并选择攻击范围的其他角色，弃置其2张牌，令你本回合杀的次数+1。'
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
		group: 'hok_tongkuang_phaseUse',
		ai: {
			order: 3,
			result: {
				player: 1,
			},
		},
		subSkill: {
			phaseUse: {
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'gray',
				enable: 'phaseUse',
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
                    光斩：你的攻击范围+1。出牌阶段开始前，若你的"信"标记大于等于3，你可以弃置3枚"信"标记并跳过出牌阶段，下回合开始时弃置你判定区的牌并选择攻击范围内至多2名其他角色，对每名目标角色造成2点雷电伤害。',
						'狂暴<br/>\
                    暴冲：出牌阶段开始前，你可以跳过出牌阶段和弃牌阶段，下回合开始时弃置你判定区的牌并回复1点体力。<br/>\
                    残撕：摸牌阶段，你的摸牌数+1。出牌阶段开始前，若你的"信"标记大于等于3，你可以弃置3枚"信"标记并选择攻击范围的其他角色，弃置其2张牌，令你本回合杀的次数+1。'
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
			}
		}
	},
	// hok_liehua: {
	// 	trigger: { player: 'phaseUseBefore' },
	// 	filter(event, player) {
	// 		return !player.hasSkill('hok_liehua_effect') && !player.hasSkill('hok_guangzhan_effect');
	// 	},
	// 	content() {
	// 		trigger.cancel();
	// 		player.addSkill('hok_liehua_effect');
	// 	},
	// 	check(event, player) {
	// 		if (player.countMark('hok_guangan') >= 3) {
	// 			return false;
	// 		}
	// 		let cards = player.getCards('h');
	// 		let sumValue = 0;
	// 		for (let i = 0; i < cards.length; i++) {
	// 			sumValue += get.value(cards[i]);
	// 		}
	// 		if (player.hp > cards.length) {
	// 			return true;
	// 		}
	// 		if (sumValue / cards.length > 7) {
	// 			return false;
	// 		}
	// 		if (player.hp >= cards.length - 2 && sumValue / cards.length <= 5) {
	// 			return true;
	// 		}
	// 		return false;
	// 	},
	// 	subSkill: {
	// 		effect: {
	// 			trigger: { player: 'phaseUseBegin' },
	// 			forced: true,
	// 			locked: false,
	// 			content() {
	// 				'step 0'
	// 				event.num = 0;
	// 				player.recover();
	// 				'step 1'
	// 				event.num++;
	// 				player.chooseUseTarget({
	// 					name: 'sha',
	// 					nature: 'thunder',
	// 					isCard: true,
	// 				}, '请选择雷【杀】的目标（' + event.num + '/2）', false);
	// 				'step 2'
	// 				if (result.bool && event.num < 2) event.goto(1);
	// 			},
	// 			group: ['hok_liehua_1', 'hok_liehua_2'],
	// 		},
	// 		1: {
	// 			trigger: { player: 'phaseZhunbeiBegin' },
	// 			forced: true,
	// 			locked: false,
	// 			content() {
	// 				player.storage.hok_liehua_on = true;
	// 			}
	// 		},
	// 		2: {
	// 			trigger: { player: 'phaseJieshuBegin' },
	// 			forced: true,
	// 			locked: false,
	// 			filter(event, player) {
	// 				return player.storage.hok_liehua_on;
	// 			},
	// 			content() {
	// 				player.storage.hok_liehua_on = false;
	// 				player.removeSkill('hok_liehua_effect');
	// 			}
	// 		}
	// 	}
	// },
	hok_liehua: {
		trigger: { player: 'phaseUseBefore' },
		filter(event, player) {
			return !player.hasSkill('hok_liehua_effect') && !player.hasSkill('hok_guangzhan_effect');
		},
		async content(event, trigger, player) {
			// 跳过出牌阶段
			trigger.cancel();
			// 添加效果技能
			player.addSkill('hok_liehua_effect');
			// 添加标记，用于下回合触发
			player.addTempSkill('hok_liehua_mark');
		},
		subSkill: {
			effect: {
				trigger: { player: 'phaseUseBegin' },
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					// 视为使用2张雷杀
					for (let i = 0; i < 2; i++) {
						await player.chooseUseTarget({
							name: 'sha',
							nature: 'thunder',
							isCard: true,
						}, '请选择雷【杀】的目标（' + (i + 1) + '/2）', false);
					}
					// 回复1点体力
					await player.recover();
				},
			},
			mark: {
				trigger: { player: 'phaseUseBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					return true;
				},
				async content(event, trigger, player) {
					// 移除标记
					player.removeSkill('hok_liehua_mark');
					// 添加效果技能
					player.addSkill('hok_liehua_effect');
				},
			},
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
	// hok_baochong: {
	// 	trigger: { player: 'phaseUseBefore' },
	// 	filter(event, player) {
	// 		return !player.hasSkill('hok_baochong_effect') && game.hasPlayer(target => player.canUse({ name: 'sha' }, target, false)) && player.countCards('h');
	// 	},
	// 	prompt: '跳过出牌阶段和弃牌阶段视为使用一张【杀】，下回合开始时弃置你判定区的牌并回复1点体力',
	// 	content() {
	// 		player.useCard({ name: 'sha' }, target, false);
	// 		trigger.cancel();
	// 		player.skip('phaseDiscard');
	// 		player.addTempSkill('hok_baochong_effect', { player: 'phaseZhunbeiBegin' });
	// 	},
	// 	subSkill: {
	// 		effect: {
	// 			trigger: { player: 'phaseBegin' },
	// 			forced: true,
	// 			locked: false,
	// 			content() {
	// 				player.discard(player.getCards('j'));
	// 				player.recover();
	// 			}
	// 		}
	// 	}
	// },
	// hok_cansi: {
	// 	trigger: { player: 'phaseUseBefore' },
	// 	filter(event, player) {
	// 		if (player.hasSkill('hok_baochong_effect')) {
	// 			return false;
	// 		}
	// 		return player.countMark('hok_guangan') >= 3;
	// 	},
	// 	content() {
	// 		'step 0'
	// 		player.removeMark('hok_guangan', 3);
	// 		'step 1'
	// 		player.chooseTarget('选择一名其他角色，弃置其2张牌', function (card, player, target) {
	// 			return player.inRange(target);
	// 		}).set('ai', function (target) {
	// 			if (target == player || !player.inRange(target)) {
	// 				return false;
	// 			}
	// 			return get.attitude(_status.event.player, target);
	// 		});
	// 		'step 2'
	// 		if (result.bool) {
	// 			var target = result.targets[0];
	// 			player.discardPlayerCard(target, 'hes', [1, 2], true);
	// 		}
	// 		player.addTempSkill('hok_cansi_effect');
	// 	},
	// 	group: ['hok_cansi_yingzi'],
	// 	subSkill: {
	// 		effect: {
	// 			forced: true,
	// 			locked: false,
	// 			mod: {
	// 				cardUsable(card, player, num) {
	// 					if (card.name == 'sha') return num + 1;
	// 				}
	// 			},
	// 		},
	// 		yingzi: {
	// 			trigger: { player: 'phaseDrawBegin2' },
	// 			forced: true,
	// 			locked: false,
	// 			filter(event, player) {
	// 				return !event.numFixed;
	// 			},
	// 			content() {
	// 				trigger.num++;
	// 			},
	// 			ai: {
	// 				threaten: 1.3
	// 			}
	// 		},
	// 	}
	// },
	hok_baochong: {
		trigger: { player: 'phaseUseBefore' },
		filter(event, player) {
			return !player.hasSkill('hok_baochong_effect') &&
				game.hasPlayer(target => player.canUse({ name: 'sha' }, target, false)) &&
				player.countCards('h');
		},
		async content(event, trigger, player) {
			// 使用chooseTarget选择目标
			const result = await player.chooseTarget(function (card, player, target) {
				return player.canUse({ name: 'sha' }, target, false) && target.inRangeOf(player);
			}, '选择一名目标使用【杀】').set('ai', function (target) {
				var player = _status.event.player;
				return get.damageEffect(target, player, player);
			}).forResult();

			if (result.bool) {
				const target = result.targets[0];
				player.logSkill('hok_baochong', target);
				await player.useCard({ name: 'sha' }, target, false);
				trigger.cancel();
				player.skip('phaseDiscard');
				player.addTempSkill('hok_baochong_effect', { player: 'phaseZhunbeiBegin' });
			}
		},
		subSkill: {
			effect: {
				trigger: { player: 'phaseBegin' },
				forced: true,
				locked: false,
				async content(event, trigger, player) {
					await player.discard(player.getCards('j'));
					await player.recover();
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
		async content(event, trigger, player) {
			// 移除标记
			player.removeMark('hok_guangan', 3);

			// 选择目标
			const result = await player.chooseTarget('选择攻击范围内的一名其他角色，弃置其2张牌', function (card, player, target) {
				return player.inRange(target);
			}).set('ai', function (target) {
				if (target == player || !player.inRange(target)) {
					return false;
				}
				return get.attitude(_status.event.player, target);
			}).forResult();

			if (result.bool) {
				const target = result.targets[0];
				// 弃置目标2张牌
				await player.discardPlayerCard(target, 'hes', [1, 2], true);
				// 添加临时技能
				player.addTempSkill('hok_cansi_effect');
			}
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
	// 卢雅那
	hok_shehuan: {
		trigger: {
			player: 'useCardAfter',
			// target: 'useCardAfter'
		},
		forced: true,
		filter: function (event, player, name) {
			// 检查是否是伤害牌
			return get.tag(event.card, 'damage');
		},
		async content(event, trigger, player) {
			if (player.countMark('hok_shehuan_effect') < 3) {
				player.addMark('hok_shehuan_effect', 1);
			}
			player.draw();
			// 检查是否已经获得过标记
			if (!player.hasSkill('hok_shehuan_effect')) {
				// 获得标记
				player.addTempSkill('hok_shehuan_effect', { player: 'phaseEnd' });
				player.addTempSkill('hok_shehuan_clear', { player: 'phaseEnd' });
			}
		},
		subSkill: {
			effect: {
				mark: true,
				marktext: '环',
				intro: {
					name: '蛇环',
					content: 'mark',
				},
				usable: 1,
				trigger: { player: 'useCardToPlayered' },
				filter(event, player) {
					// 仅在玩家使用【杀】指定第一个目标时触发，且玩家拥有"蛇环"标记
					return event.card.name === 'sha' && event.isFirstTarget && player.countMark('hok_shehuan_effect') > 0;
				},
				direct: true,
				async content(event, trigger, player) {
					// 构建选项
					const choices = ['令此【杀】伤害+1', '额外指定一名目标'];
					const result = await player.chooseControl(choices.concat('cancel2'))
						.set('prompt', '蛇环：请选择一项')
						.set('ai', () => {
							// AI逻辑：简单判断，若目标手牌较少可能更容易命中，选增伤；否则选多目标
							if (trigger.target.countCards('h') <= 1) return choices[0];
							return choices[1];
						}).forResult();

					if (result.control === 'cancel2') return;

					// 消耗"蛇环"标记
					player.removeSkill('hok_shehuan_effect');
					player.removeMark('hok_shehuan_effect', 1);
					player.logSkill('hok_shehuan_effect', trigger.targets);

					if (result.control === choices[0]) {
						// 选项1：令此【杀】伤害+1
						trigger.getParent().baseDamage++;
					} else {
						// 选项2：额外指定一名目标
						// 获取当前【杀】的合法额外目标
						const targets = game.filterPlayer(current => {
							return current !== player && !trigger.targets.includes(current) &&
								lib.filter.targetEnabled(trigger.card, player, current);
						});

						if (targets.length > 0) {
							const selectResult = await player.chooseTarget(
								'请选择额外的一名【杀】的目标',
								(card, player, target) => targets.includes(target)
							).set('ai', target => {
								return get.effect(target, trigger.card, player, player);
							}).forResult();

							if (selectResult.bool) {
								trigger.targets.addArray(selectResult.targets);
								// 绘制连线特效
								player.line(selectResult.targets, 'green');
							}
						}
					}
				}
			},
			clear: {
				trigger: { player: 'phaseDiscardAfter' },
				forced: true,
				locked: false,
				content() {
					player.removeMark('hok_shehuan_effect', player.countMark('hok_shehuan_effect'));
				}
			},
		},
	},
	// hok_sheya: {
	// 	enable: 'phaseUse',
	// 	usable: 1,
	// 	filter(event, player) {
	// 		return player.countMark('hok_shehuan_effect') > 0;
	// 	},
	// 	async content(event, trigger, player) {
	// 		// 弃一枚"蛇环"标记
	// 		player.removeMark('hok_shehuan_effect', 1);

	// 		// 本回合【杀】无视距离且不可被响应
	// 		player.addTempSkill('hok_sheya_effect', 'phaseUseAfter');
	// 	},
	// 	ai: {
	// 		order: 5,
	// 		result: {
	// 			target(player, target) {
	// 				return get.damageEffect(target, player, null, player);
	// 			}
	// 		}
	// 	},
	// 	subSkill: {
	// 		effect: {
	// 			forced: true,
	// 			locked: false,
	// 			trigger: { player: 'useCardToPlayered' },
	// 			check(event, player) {
	// 				return get.attitude(player, event.target) <= 0;
	// 			},
	// 			filter(event, player) {
	// 				return event.card.name == 'sha';
	// 			},
	// 			preHidden: true,
	// 			content() {
	// 				trigger.getParent().directHit.add(trigger.target);
	// 			},
	// 			ai: {
	// 				directHit_ai: true,
	// 				skillTagFilter(player, tag, arg) {
	// 					if (get.attitude(player, arg.target) > 0 || arg.card.name != 'sha') return false;
	// 				},
	// 			},
	// 			mod: {
	// 				targetInRange(card, player, target) {
	// 					if (card.name === 'sha') return true;
	// 				},
	// 			}
	// 		},
	// 	},
	// },
	hok_shefen: {
		enable: 'phaseUse',
		usable: 1,
		filter(event, player) {
			// 拥有至少2枚"蛇环"标记才可发动
			return player.countMark('hok_shehuan_effect') >= 2;
		},
		filterTarget: lib.filter.notMe,
		async content(event, trigger, player) {
			// 弃2枚"蛇环"标记
			player.removeMark('hok_shehuan_effect', 2);

			// 视为使用不计入次数的火【杀】
			const useRe = await player.useCard({ name: 'sha', nature: 'fire', isCard: true }, event.target, false).forResult();

			// 若此【杀】使用成功且造成伤害
			if (useRe && useRe.bool) {
				const target = event.target;
				// 目标获得"致盲"标记直到其回合结束
				target.addTempSkill('hok_zhimang');
				// 本回合你使用的【杀】造成伤害后，其随机弃置一张手牌
				player.addTempSkill('hok_shefen_effect', 'phaseAfter');
			}
		},
		ai: {
			order: 5,
			result: {
				target(player, target) {
					return get.damageEffect(target, player, player, 'fire');
				}
			}
		},
		subSkill: {
			effect: {
				trigger: { player: 'damageEnd' },
				direct: true,
				filter(event, player) {
					// 仅当使用【杀】造成伤害时触发
					return event.card && event.card.name === 'sha';
				},
				async content(event, trigger, player) {
					const target = trigger.player;
					// 受伤角色随机弃置一张手牌
					if (target.countCards('h') > 0) {
						target.discard(target.getCards('h').randomGet());
					}
				}
			},
		},
	},

	// M
	// 马可波罗
	hok_zuolun: {
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
			if (event.card.name != 'sha') return false;
			return event.num > 0;
		},
		content() {
			player.draw();
			if (trigger.player.countMark('hok_zuolun') < 2) {
				trigger.player.addMark('hok_zuolun', 1);
			}
		},
	},
	hok_zuolun_effect: {
		forced: true,
		trigger: {
			global: ['damageBefore'],
		},
		filter(event, player) {
			return event.name == 'damage';
		},
		content() {
			if (trigger.player.countMark('hok_zuolun') >= 2 && trigger.source && trigger.source.hasSkill('hok_zuolun')) {
				trigger.cancel();
				trigger.player.loseHp(trigger.num);
				trigger.source.draw();
			}
		},
		ai: {
			jueqing: true,
			skillTagFilter(player, tag, arg) {
				if (tag == 'jueqing') {
					return arg && arg.player && arg.player.countMark('hok_zuolun') >= 2 &&
						arg.source && arg.source.hasSkill('hok_zuolun');
				}
				return false;
			}
		},
	},
	hok_qianglin: {
		usable: 1,
		trigger: { player: 'useCard' },
		filter(event, player) {
			return event.card.isCard && event.card.name == 'sha' && player.countCards('h', 'sha') >= 1 && player.isPhaseUsing() && player.countCards('h', { name: 'sha' }) > 0;
		},
		content() {
			'step 0'
			player.chooseToDiscard(true, 1, 'h', '弃置一张杀，视为对该角色使用两张【雷杀】（不可以触发酒）。', { name: 'sha' });
			// player.addSkill('hok_qianglin_draw');
			'step 1'
			trigger.cancel();
			for (target of trigger.targets) {
				if (target.isIn()) player.useCard({ name: 'sha', nature: 'thunder' }, target);
				if (target.isIn()) player.useCard({ name: 'sha', nature: 'thunder' }, target);
			}
			// 'step 2'
			// player.removeSkill('hok_qianglin_draw');
		},
		// group: ['hok_qianglin_begin'],
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
						if (target == _status.event.player) return 0;
						return get.attitude(_status.event.player, target) < 0;
					});
					return qianglin.length > 0 ? 1 : 0;
				},
			},
		},
	},
	hok_danyu: {
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
				var r = (Math.random() < 0.5) ? 2 : 1;
				for (var dan = 0; dan < r; dan++) {
					if (target.isIn()) player.useCard({ name: 'sha', nature: 'thunder' }, target, false);
					// target.damage(1, 'thunder');
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
		filterTarget(card, player, target) {
			return target != player && (get.distance(player, target) <= 2);
		},
		content() {
			// 清理旧目标
			if (player.storage.hok_lingua2) {
				const oldTarget = player.storage.hok_lingua2;
				if (oldTarget.hasSkill('hok_lingua_effect')) {
					oldTarget.removeSkill('hok_lingua_effect');
				}
				// if (oldTarget.hasMark('hok_lingua_effect')) {
				// 	oldTarget.removeMark('hok_lingua_effect', oldTarget.countMark('hok_lingua_effect'));
				// }
			}
			player.removeSkill('hok_lingua2');

			// 设置新目标
			player.logSkill('hok_lingua');
			player.line('hok_lingua', target);
			player.storage.hok_lingua2 = target;
			player.addSkill('hok_lingua2');
			target.addSkill('hok_lingua_effect');
			// target.addMark('hok_lingua_effect');
		},
		group: ['hok_lingua_listen', 'hok_gua_clear'],
		subSkill: {
			effect: {
				usable: 2,
				mark: true,
				marktext: '临',
				intro: {
					name: '临卦',
					content: 'mark',
				},
				trigger: { source: 'damageSource' },
				forced: true,
				locked: false,
				filter(event, player) {
					return event.num > 0;
				},
				content() {
					player.draw(2);
				}
			},
			listen: {
				trigger: {
					global: ['phaseBegin', 'changeSeat', 'equipAfter', 'loseAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
				},
				silent: true,
				forced: true,
				firstDo: true,
				popup: false,
				filter(event, player) {
					// 检查是否有目标
					if (!player.storage.hok_lingua2) return false;

					// 检查触发技能的角色是否是 player 或 player.storage.hok_lingua2
					if (event.player !== player && event.player !== player.storage.hok_lingua2) {
						return false;
					}

					// 检查目标是否死亡或距离超过2
					const target = player.storage.hok_lingua2;
					if (target.isDead() || !(get.distance(player, target) <= 2)) {
						return true;
					}

					// 如果目标状态正常，则不需要触发
					return false;
				},
				content(event) {
					const target = player.storage.hok_lingua2;
					if (!target) return;

					// 移除目标技能效果
					if (target.hasSkill('hok_lingua_effect')) {
						target.removeSkill('hok_lingua_effect');
					}
					// 清除目标标记
					// if (target.hasMark('hok_lingua_effect')) {
					// 	target.removeMark('hok_lingua_effect', target.countMark('hok_lingua_effect'));
					// }
					// 清理绑定
					delete player.storage.hok_lingua2;
				}
			}
		},
		ai: {
			result: {
				target(player, target) {
					// 只选择队友
					if (get.attitude(player, target) <= 0) return 0;
					// 避免因中毒等导致无法获益的情况
					const hand = player.countCards('h');
					const du = player.countCards('h', 'du');
					if (hand === du) return -1;
					// 评估目标的输出能力
					let score = 0;
					// 如果目标手牌较少，给予额外分数
					if (target.countCards('h') < 3) score += 1;
					// 如果目标有输出技能，给予额外分数
					if (target.hasSkillTag('damage')) score += 2;
					// 基础分数
					score += get.attitude(player, target);
					return score;
				},
			},
			order: 9,
			threaten: 3,
			expose: 0.2,
		},
	},
	hok_lingua2: {
		charlotte: true,
		onremove: true,
		mark: 'character',
		intro: { content: '临卦：$' },
	},
	// 师卦
	hok_shigua: {
		enable: 'phaseUse',
		usable: 1,
		filterTarget(card, player, target) {
			return target != player && (get.distance(player, target) <= 2);
		},
		content() {
			// 清理旧目标
			if (player.storage.hok_shigua2) {
				const oldTarget = player.storage.hok_shigua2;
				if (oldTarget.hasSkill('hok_shigua_effect')) {
					oldTarget.removeSkill('hok_shigua_effect');
				}
				// if (oldTarget.hasMark('hok_shigua_effect')) {
				// 	oldTarget.removeMark('hok_shigua_effect', oldTarget.countMark('hok_shigua_effect'));
				// }
			}
			player.removeSkill('hok_shigua2');

			// 设置新目标
			player.logSkill('hok_shigua');
			player.line('hok_shigua', target);
			player.storage.hok_shigua2 = target;
			player.addSkill('hok_shigua2');
			target.addSkill('hok_shigua_effect');
			// target.addMark('hok_shigua_effect');
		},
		group: ['hok_shigua_listen', 'hok_gua_clear'], // 添加hok_gua_clear到group
		subSkill: {
			effect: {
				mark: true,
				marktext: '师',
				intro: {
					name: '师卦',
					content: 'mark',
				},
				trigger: { player: 'phaseJieshuBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					return game.hasPlayer(current => {
						return current.storage.hok_shigua2 == player;
					});
				},
				content() {
					const source = game.findPlayer(current => {
						return current.storage.hok_shigua2 == player;
					});
					if (!source.storage.hok_shigua2) return;
					source.storage.hok_shigua2.chooseToDiscard('hes', '师卦：你的回合结束时，弃置1张牌。').set('ai', function (card) {
						return 8 - get.value(card);
					});
				}
			},
			listen: {
				trigger: {
					global: ['phaseBegin', 'changeSeat', 'equipAfter', 'loseAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
				},
				silent: true,
				forced: true,
				firstDo: true,
				popup: false,
				filter(event, player) {
					// 检查是否有目标
					if (!player.storage.hok_shigua2) return false;

					// 检查触发技能的角色是否是 player 或 player.storage.hok_shigua2
					if (event.player !== player && event.player !== player.storage.hok_shigua2) {
						return false;
					}

					// 检查目标是否死亡或距离超过2
					const target = player.storage.hok_shigua2;
					if (target.isDead() || !(get.distance(player, target) <= 2)) {
						return true;
					}

					// 如果目标状态正常，则不需要触发
					return false;
				},
				content(event) {
					const target = player.storage.hok_shigua2;
					if (!target) return;

					// 移除目标技能效果
					if (target.hasSkill('hok_shigua_effect')) {
						target.removeSkill('hok_shigua_effect');
					}
					// 清除目标标记
					// if (target.hasMark('hok_shigua_effect')) {
					// 	target.removeMark('hok_shigua_effect', target.countMark('hok_shigua_effect'));
					// }
					// 清理绑定
					delete player.storage.hok_shigua2;
				}
			}
		},
		ai: {
			result: {
				target(player, target) {
					// 仅选择敌方目标
					if (get.attitude(player, target) >= 0) return 0;
					// 计算可弃置牌数；若为0也返回很低的分数（仍可选但优先级极低）
					const discardable = target.countCards('he');
					let score = discardable > 0 ? discardable : 0.1;
					// 如果目标手牌较少，给予额外分数
					if (discardable < 3) score += 2;
					// 如果目标体力较低，给予额外分数
					if (target.hp <= 1) score += 2;
					// 如果目标有重要装备，给予额外分数
					if (target.getEquip(1) || target.getEquip(2) || target.getEquip(3)) score += 1;
					// 基础分数
					score += get.threaten(target) || 0;
					score += -get.attitude(player, target); // 对立关系
					return -score;
				},
			},
			order: 9,
			threaten: 3,
			expose: 0.2,
		},
	},
	hok_shigua2: {
		charlotte: true,
		onremove: true,
		mark: 'character',
		intro: { content: '师卦：$' },
	},
	hok_gua_clear: {
		trigger: {
			player: 'dieBefore',
		},
		silent: true,
		forced: true,
		firstDo: true,
		popup: false,
		content(event) {
			// 清理临卦效果
			if (player.storage.hok_lingua2) {
				const target = player.storage.hok_lingua2;
				if (target.hasSkill('hok_lingua_effect')) {
					target.removeSkill('hok_lingua_effect');
				}
				// if (target.hasMark('hok_lingua_effect')) {
				// 	target.removeMark('hok_lingua_effect', target.countMark('hok_lingua_effect'));
				// }
				delete player.storage.hok_lingua2;
			}

			// 清理师卦效果
			if (player.storage.hok_shigua2) {
				const target = player.storage.hok_shigua2;
				if (target.hasSkill('hok_shigua_effect')) {
					target.removeSkill('hok_shigua_effect');
				}
				if (target.hasMark('hok_shigua_effect')) {
					target.removeMark('hok_shigua_effect', target.countMark('hok_shigua_effect'));
				}
				delete player.storage.hok_shigua2;
			}
		}
	},
	hok_taigua: {
		enable: 'phaseUse',
		usable: 1,
		chargeSkill: 2,
		group: ['hok_taigua_charge', 'hok_taigua_gain'],
		filter(event, player) {
			return player.countCharge && player.countCharge() >= 2 &&
				(player.storage.hok_shigua2 || player.storage.hok_lingua2);
		},
		content() {
			// 消耗2点蓄力点
			player.removeCharge(2);
			const shigua = player.storage && player.storage.hok_shigua2;
			const lingua = player.storage && player.storage.hok_lingua2;
			// 检查目标是否存在
			const hasShigua = shigua && shigua.isIn();
			const hasLingua = lingua && lingua.isIn();
			// 如果只有一个目标存在，玩家失去1点体力
			if ((hasShigua && !hasLingua) || (!hasShigua && hasLingua)) {
				player.loseHp(1);
			}
			// 对师卦目标造成1点伤害（如果存在）
			if (hasShigua) {
				shigua.damage(1);
			}
			// 临卦目标回复1点体力（如果存在）
			if (hasLingua) {
				lingua.recover(1);
			}
		},
		subSkill: {
			charge: {
				trigger: {
					global: ['phaseBefore'],
					player: 'enterGame',
				},
				forced: true,
				filter(event, player, name) {
					if (!player.countCharge) return false;
					if (!player.countCharge(true)) return false;
					return (name != 'phaseBefore' || game.phaseNumber == 0);
				},
				content() {
					player.addCharge();
				}
			},
			gain: {
				trigger: {
					source: 'damageSource',
					global: 'dieAfter'
				},
				forced: true,
				silent: true,
				popup: false,
				firstDo: true,
				filter(event, player) {
					// 任何造成伤害时都触发
					if (event.name === 'damage') {
						return event.num > 0;
					}
					// 检查死亡事件是否由hok_taigua造成的伤害导致
					if (event.name === 'die') {
						const damageEvent = event.getParent('damage');
						if (!damageEvent) return false;
						// 检查伤害来源是否是当前玩家
						if (damageEvent.source !== player) return false;
						// 检查伤害是否由hok_taigua造成
						return damageEvent.getParent().name === 'hok_taigua';
					}
					return false;
				},
				content() {
					// 处理死亡事件
					if (trigger.name === 'die') {
						// 额外获得1点蓄力值
						player.addCharge(1);
						return;
					}
					// 处理伤害事件
					// 检查是否是使用hok_taigua技能造成的伤害
					if (trigger.getParent().name === 'hok_taigua') {
						// 不在这里处理，等待死亡事件
						return;
					} else {
						// 造成伤害时获得1点蓄力值
						player.addCharge(1);
					}
				}
			}
		},
		ai: {
			order: 8,
			result: {
				player(player) {
					if (!player.countCharge || player.countCharge() < 2) return 0;
					const shigua = player.storage.hok_shigua2;
					const lingua = player.storage.hok_lingua2;
					// 优先在能回复友方或令敌方受伤的场合使用
					let score = 0;
					if (lingua && get.attitude(player, lingua) > 0 && lingua.hp < lingua.maxHp) score += 5;
					if (shigua && get.attitude(player, shigua) < 0) score += 4;
					// 若任一目标缺失，使用代价为自己失去1血，降低优先级
					if ((shigua && !lingua) || (!shigua && lingua)) score -= 3;
					return score;
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
			return event.card && event.card.name == 'sha' && event.num > 0;
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
		marktext: '链',
		mark: true,
		intro: {
			name: '暗链',
			content(storage, player) {
				const targets = player.storage.hok_anlian_targets || [];
				if (!targets.length) return '未标记任何角色';
				return `已标记角色：${targets.map(target => get.translation(target)).join('、')}`;
			},
		},
		filterTarget(card, player, target) {
			if (player === target) return false;
			if (ui.selected.targets.length) {
				const lastTarget = ui.selected.targets[ui.selected.targets.length - 1];
				return target.next === lastTarget || target.previous === lastTarget;
			}
			return true;
		},
		selectTarget: [1, 5],
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			// 清除旧标记
			const oldTargets = player.storage.hok_anlian_targets || [];
			for (const oldTarget of oldTargets) {
				if (oldTarget?.isIn()) {
					oldTarget.removeMark('hok_anlian_targets', 1);
				}
			}

			// 设置新标记
			player.storage.hok_anlian_targets = event.targets;
			for (const target of event.targets) {
				target.addMark('hok_anlian_targets', 1);
				target.storage.hok_anlian_source = player;
			}

			player.updateMarks();
		},
		ai: {
			order: 5,
			result: {
				player: function (player) {
					// 只要选中了目标，玩家收益就是正的
					return 1;
				},
				target: function (player, target) {
					// 如果已经选择了目标
					if (ui.selected.targets.length > 0) {
						const lastTarget = ui.selected.targets[ui.selected.targets.length - 1];
						// 检查是否相邻
						if (target === lastTarget.next || target === lastTarget.previous) {
							// 相邻且是敌人，价值高
							return get.attitude(player, target) < 0 ? -2 : 0;
						}
						// 关键修改：如果不相邻，返回负值而不是 0
						// 告诉 AI "我不想要这个目标"，而不是 "这个目标无效"
						return 1;
					}
					// 选择第一个目标
					let attitude = get.attitude(player, target);
					if (attitude < 0) {
						// 敌方角色，价值极高
						let value = (-attitude * (10 - target.countCards('h'))) / (target.hp || 1) + 1;
						return -value;
					}
					// 友方角色
					return 1;
				},
			},
		},
		group: ['hok_anlian_effect'],
		subSkill: {
			targets: {
				marktext: '链',
				intro: {
					name: '暗链',
					content(storage, player) {
						const source = player.storage.hok_anlian_source;
						return source ? `已被${get.translation(source)}标记` : '已被标记';
					},
				},
			},
			effect: {
				trigger: { player: 'phaseEnd' },
				forced: true,
				async content(event, trigger, player) {
					const targets = player.storage.hok_anlian_targets || [];
					for (const target of targets) {
						if (target.isIn()) {
							await target.chooseToDiscard('he', 1, true);
						}
					}
					if (player.countMark('hok_shengxue') < 4) {
						player.addMark('hok_shengxue', 1);
					}
				}
			}
		}
	},
	hok_anyue: {
		derivation: 'hok_bukexuanzhong',
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'fire',
		filter(event, player) {
			return player.countMark('hok_shengxue') == 4;
		},
		async content(event, trigger, player) {
			// 移除4枚"蝠"标记
			player.removeMark('hok_shengxue', 4);
			// 对"暗链"目标造成1点伤害
			const targets = player.storage.hok_anlian_targets || [];
			for (const target of targets) {
				if (target.isIn()) {
					player.line(target, 'fire');
					target.damage('thunder', player);
				}
			}
			// 令自己不可选中直到下回合开始
			player.turnOver();
			player.addTempSkill('hok_bukexuanzhong', { player: 'phaseBeginStart' });
			player.addSkill('hok_anyue_video');
		},
		subSkill: {
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
				player(player) {
					// 检查是否有"暗链"目标
					const targets = player.storage.hok_anlian_targets || [];
					if (targets.length === 0) return 0;
					// 评估对目标的伤害效果
					let score = 0;
					for (const target of targets) {
						if (target.isIn()) {
							score += get.damageEffect(target, player, player);
						}
					}
					// 考虑不可选中效果的价值
					score += player.hp <= 2 ? 3 : 1;
					return score;
				}
			}
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
		// frequent: true,
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
	// 少司缘
	hok_liangyuan: {
		enable: 'phaseUse',
		usable: 1,
		filterTarget: true,
		selectTarget: 2,
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			// 按座位顺序排列目标
			event.targets.sortBySeat();
			// 存储两个目标的选择结果
			const results = [];
			// 让每个目标选择
			for (const target of event.targets) {
				const result = await target.chooseControl('回复1点体力', '摸2张牌')
					.set('prompt', '请选择一项')
					.set('ai', () => {
						const player = _status.event.player;
						// 使用get.effect计算两种选择的收益
						const recoverValue = get.effect(player, { name: 'recover' }, player, player);
						const drawValue = get.effect(player, { name: 'draw', num: 2 }, player, player);
						// 选择收益更大的选项
						return recoverValue >= drawValue ? '回复1点体力' : '摸2张牌';
					})
					.forResult();
				// 执行选择的效果
				if (result.control == '回复1点体力') {
					await target.recover();
				} else {
					await target.draw(2);
				}
				results.push(result.control);
			}
			// 如果两个目标选择了相同的选项，玩家摸1张牌
			if (results[0] === results[1]) {
				await player.draw();
			}
		},
		ai: {
			order: 8,
			result: {
				player(player) {
					return 1;
				},
				target(player, target) {
					// 计算目标选择"回复体力"的收益
					const recoverValue = get.effect(target, { name: 'recover' }, player, player);
					// 计算目标选择"摸牌"的收益
					const drawValue = get.effect(target, { name: 'draw', num: 2 }, player, player);
					// 如果是队友，计算其选择"回复体力"或"摸牌"的最大收益
					if (get.attitude(player, target) > 0) {
						return Math.max(recoverValue, drawValue);
					}
					// 如果是敌人，计算其选择"回复体力"或"摸牌"的最小收益（即对敌人最不利的选择）
					if (get.attitude(player, target) < 0) {
						// 需要考虑目标可能从正面效果中获得的收益
						// 如果目标从正面效果中获得的收益大于0，则不选择
						const minNegativeValue = Math.min(recoverValue, drawValue);
						// return minNegativeValue > 0 ? -1 : minNegativeValue;
						return -minNegativeValue;
					}
					// 如果是中立角色，返回-1
					return -1;
				}
			}
		}
	},
	hok_yuanyuan: {
		enable: 'phaseUse',
		usable: 1,
		filterTarget: true,
		selectTarget: 2,
		multitarget: true,
		multiline: true,
		async content(event, trigger, player) {
			// 按座位顺序排列目标
			event.targets.sortBySeat();
			// 存储两个目标的选择结果
			const results = [];
			// 让每个目标选择
			for (const target of event.targets) {
				const result = await target.chooseControl('失去1点体力', '弃置2张牌')
					.set('prompt', '请选择一项')
					.set('ai', () => {
						const player = _status.event.player;
						// 检查目标是否能够弃置两张牌
						const canDiscard = player.countCards('he') >= 2;
						// 如果无法弃置两张牌，只能选择失去1点体力
						if (!canDiscard) {
							return '失去1点体力'; // 1 代表"失去1点体力"选项
						} else {
							// 使用get.effect计算两种选择的收益
							const loseHpValue = get.effect(player, { name: 'losehp' }, player, player);
							const discardValue = get.effect(player, { name: 'guohe_copy2' }, player, player);
							// 选择收益更大的选项（即损失更小的选项）
							return loseHpValue > discardValue ? '失去1点体力' : '弃置2张牌';
						}
					})
					.forResult();
				// 执行选择的效果
				if (result.control == '失去1点体力') {
					await target.loseHp();
				} else {
					const result = await target.chooseToDiscard(2, true, 'he');
				}
				results.push(result.control);
			}
			// 如果两个目标选择了相同的选项，玩家摸1张牌
			if (results[0] === results[1]) {
				await player.draw();
			}
		},
		ai: {
			order: 9,
			result: {
				player(player) {
					return 1;
				},
				target(player, target) {
					// 计算目标选择"失去体力"的收益
					const loseHpValue = get.effect(target, { name: 'losehp' }, player, player);
					// 计算目标选择"弃牌"的收益
					const discardValue = get.effect(target, { name: 'guohe_copy2' }, player, player);
					// 如果是队友，计算其选择"失去体力"或"弃牌"的最大收益
					if (get.attitude(player, target) > 0) {
						return Math.max(loseHpValue, discardValue);
					}
					// 如果是敌人，计算其选择"失去体力"或"弃牌"的最小收益（即对敌人最不利的选择）
					if (get.attitude(player, target) < 0) {
						// 需要考虑目标可能从负面效果中获得的收益
						// 例如黄盖从失去体力中获得收益，邓艾从弃牌中获得收益
						// 如果目标从负面效果中获得的收益大于0，则不选择
						const minNegativeValue = Math.min(loseHpValue, discardValue);
						return minNegativeValue > 0 ? -1 : minNegativeValue;
					}
					// 如果是中立角色，返回0
					return 0;
				},
			},
		},
	},
	// 司空震
	hok_tianlei: {
		zhuSkill: true,
		trigger: { global: 'phaseBefore', player: 'enterGame' },
		forced: true,
		unique: true,
		filter(event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0) && player.hasZhuSkill('hok_tianlei');
		},
		content() {
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
			if (trigger.card && trigger.card.nature == null) {
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
					var damages = player.getCards('h').filter(item => get.tag(item, 'damage'));
					var canDamage = damages.length;
					var cards = player.getCards('h', 'sha');
					for (let card of cards) {
						if (!lib.filter.cardEnabled(card, player)) canDamage--;
						if (!lib.filter.cardUsable(card, player)) canDamage--;
					}
					if (canDamage < 1) return 0;
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
	// hok_qitian: {
	// 	enable: ['chooseToRespond', 'chooseToUse'],
	// 	position: 'hes',
	// 	viewAs(cards) {
	// 		var nature = null;
	// 		switch (get.color(cards[0])) {
	// 			case 'red':
	// 				nature = 'fire';
	// 				break;
	// 			case 'black':
	// 				nature = 'thunder';
	// 				break;
	// 			default:
	// 				nature = 'stab';
	// 		}
	// 		if (nature) {
	// 			return { name: 'sha', nature: nature };
	// 		}
	// 		return null;
	// 	},
	// 	prompt: '红色锦囊当火杀、黑色锦囊当雷杀使用或打出',
	// 	filterCard(card, player, event) {
	// 		event = event || _status.event;
	// 		var filter = event._backup.filterCard;
	// 		var name = get.color(card, player);
	// 		if (lib.card[card.name].type != 'trick' && lib.card[card.name].type != 'delay') return false;
	// 		if (name == 'red' && filter({ name: 'sha', cards: [card], nature: 'fire' }, player, event)) {
	// 			return true;
	// 		}
	// 		if (name == 'black' && filter({ name: 'sha', cards: [card], nature: 'thunder' }, player, event)) {
	// 			return true;
	// 		}
	// 		return false;
	// 	},
	// 	filter(event, player) {
	// 		var filter = event.filterCard;
	// 		if (filter(get.autoViewAs({ name: 'sha', nature: 'fire' }, 'unsure'), player, event) && player.countCards('hes', card => (get.type(card) == 'trick' || get.type(card) == 'delay') && get.color(card) == 'red')) {
	// 			return true;
	// 		}
	// 		if (filter(get.autoViewAs({ name: 'sha', nature: 'thunder' }, 'unsure'), player, event) && player.countCards('hes', card => (get.type(card) == 'trick' || get.type(card) == 'delay') && get.color(card) == 'black')) {
	// 			return true;
	// 		}
	// 		return false;
	// 	},
	// 	check(card) {
	// 		var val = get.value(card);
	// 		if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
	// 		return 5 - val;
	// 	},
	// 	ai: {
	// 		respondSha: true,
	// 		skillTagFilter(player) {
	// 			if (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })) return false;
	// 		},
	// 	},
	// 	group: ['hok_qitian_sha'],
	// 	subSkill: {
	// 		sha: {
	// 			mod: {
	// 				targetInRange(card, player) {
	// 					if (card.name == 'sha' && (card.nature == 'fire' || card.nature == 'thunder')) return true;
	// 				},
	// 			},
	// 		},
	// 	}
	// },
	// hok_shengbang: {
	// 	locked: true,
	// 	trigger: {
	// 		source: 'damageBefore',
	// 	},
	// 	filter(event, player) {
	// 		if (!event.card || event.card.name != 'sha') return false;
	// 		return event.num > 0;
	// 	},
	// 	content() {
	// 		'step 0'
	// 		player.storage.shengbangJudge = false;
	// 		'step 1'
	// 		player.judge(function (card) {
	// 			if (get.color(card) == 'red') {
	// 				player.storage.shengbangJudge = true;
	// 				return 1.5;
	// 			} else {
	// 				player.storage.shengbangJudge = false;
	// 				return -1.5;
	// 			}
	// 		}).judge2 = function (result) {
	// 			return result.bool;
	// 		};
	// 		'step 2'
	// 		if (player.storage.shengbangJudge) {
	// 			trigger.num *= 2;
	// 			if (trigger.num >= 3) {
	// 				trigger.num = 3;
	// 			}
	// 		} else {
	// 			player.draw();
	// 		}
	// 	},
	// },
	// hok_houmao: {
	// 	unique: true,
	// 	mark: true,
	// 	skillAnimation: true,
	// 	animationColor: 'metal',
	// 	limited: true,
	// 	trigger: { player: 'phaseZhunbeiBegin' },
	// 	init(player) {
	// 		player.storage.hok_houmao = false;
	// 	},
	// 	filter(event, player) {
	// 		if (player.storage.hok_houmao) return false;
	// 		if (typeof player.storage.hok_houmao2 == 'number') {
	// 			return player.hp < player.storage.hok_houmao2;
	// 		}
	// 		return player.countCards('j') > 0;
	// 	},
	// 	check(event, player) {
	// 		if (player.hp <= 1) return true;
	// 		return player.hp < player.storage.hok_houmao2 - 1;
	// 	},
	// 	content() {
	// 		player.awakenSkill('hok_houmao');
	// 		player.recover(player.storage.hok_houmao2 - player.hp);
	// 		player.discard(player.getCards('j'));
	// 		var card = get.cardPile(function (card) {
	// 			switch (Math.floor(Math.random() * 2)) {
	// 				case 0: return get.name(card, 'leisha') == 'leisha';
	// 				case 1: return get.name(card, 'huosha') == 'huosha';
	// 			}
	// 		})
	// 		if (card) {
	// 			player.gain(card, 'gain2');
	// 		}
	// 		player.storage.hok_houmao = true;
	// 	},
	// 	intro: {
	// 		mark(dialog, content, player) {
	// 			if (player.storage.hok_houmao) return;
	// 			if (typeof player.storage.hok_houmao2 != 'number') {
	// 				return '上回合体力：无';
	// 			}
	// 			return '上回合体力：' + player.storage.hok_houmao2;
	// 		},
	// 		content: 'limited'
	// 	},
	// 	group: ['hok_houmao2'],
	// },
	// hok_houmao2: {
	// 	trigger: { player: 'phaseJieshuBegin' },
	// 	priority: -10,
	// 	silent: true,
	// 	content() {
	// 		player.storage.hok_houmao2 = player.hp;
	// 		game.broadcast(function (player) {
	// 			player.storage.hok_houmao2 = player.hp;
	// 		}, player);
	// 		game.addVideo('storage', player, ['hok_houmao2', player.storage.hok_houmao2]);
	// 	},
	// 	intro: {
	// 		content(storage, player) {
	// 			if (player.storage.hok_houmao) return;
	// 			return '上回合体力：' + storage;
	// 		}
	// 	}
	// },
	// hok_naogong: {

	// 	unique: true,
	// 	limited: true,
	// 	enable: 'phaseUse',
	// 	skillAnimation: true,
	// 	animationColor: 'metal',
	// 	content() {
	// 		player.awakenSkill('hok_naogong');
	// 		player.addTempSkill('hok_naogong_effect');
	// 		// player.addTempSkill('hok_naogong_discard');
	// 	},
	// 	ai: {
	// 		order() {
	// 			return get.order({ name: 'sha' }) - 0.1;
	// 		},
	// 		expose: 0.2,
	// 		result: {
	// 			player(player) {
	// 				if (player.getEquip(1) != undefined && player.getEquip(1).name == 'zhuge') {
	// 					return 0;
	// 				}
	// 				var qitianTrick = (player.countCards('hs', { type: 'basic' }) - player.countCards('hs', { name: 'sha' })
	// 					- player.countCards('hs', { name: 'shan' })
	// 					- player.countCards('hs', { name: 'tao' })
	// 					- player.countCards('hs', { name: 'jiu' }));
	// 				var natureSha = player.countCards('hs', { type: 'trick' })
	// 					+ qitianTrick;
	// 				if (player.hp < 2 && natureSha >= 1) return 1;
	// 				if (player.countCards('hs') >= 3 && natureSha >= 2 && game.hasPlayer(function (current) {
	// 					return get.effect(current, { name: 'sha' }, player, player) > 0;
	// 				})) {
	// 					return 1;
	// 				}
	// 				return 0;
	// 			}
	// 		}
	// 	},
	// 	subSkill: {
	// 		effect: {

	// 			forced: true,
	// 			onremove: true,
	// 			mod: {
	// 				cardUsable(card, player, num) {
	// 					if (card.name == 'sha') return 3;
	// 				}
	// 			},
	// 		},
	// 		discard: {
	// 			trigger: { player: 'phaseUseEnd' },
	// 			forced: true,
	// 			onremove: true,
	// 			filter(event, player) {
	// 				return player.countCards('hs') > 0;
	// 			},
	// 			content() {
	// 				'step 0'
	// 				event.naogongCards = player.getCards('hs');
	// 				'step 1'
	// 				if (event.naogongCards != undefined) {
	// 					player.discard(event.naogongCards);
	// 				}
	// 			},
	// 		},
	// 	}
	// },
	hok_shengbang: {
		locked: true,
		trigger: {
			source: 'damageBefore',
		},
		filter(event, player) {
			if (!event.card || event.card.name != 'sha') return false;
			return event.num > 0;
		},
		async content(event, trigger, player) {
			// 进行判定
			const judgeEvent = await player.judge(card => {
				if (get.color(card) == 'red') {
					return 1.5;
				} else {
					return -1.5;
				}
			});
			judgeEvent.judge2 = result => result.bool;

			const { result: { judge } } = await judgeEvent;

			// 根据判定结果执行效果
			if (judge > 0) {
				// 红色判定：伤害×2（最大为3）
				trigger.num = Math.min(trigger.num * 2, 3);
			} else {
				// 黑色判定：摸1张牌
				await player.draw();
			}
		},
		group: 'hok_shengbang_range',
		subSkill: {
			range: {
				trigger: {
					player: 'useCard'
				},
				filter(event, player) {
					return event.player == player && get.type(event.card) != 'basic';
				},
				silent: true,
				content() {
					// 添加临时技能增加攻击范围
					player.addTempSkill('hok_shengbang_buff');
				},
			},
			buff: {
				mod: {
					attackRange(player, num) {
						return num + 2;
					}
				}
			}
		}
	},
	hok_hushen: {
		trigger: {
			target: 'useCardToPlayered',
		},
		filter(event, player) {
			return event.player !== player && event.card && player.countCards('hs', card => get.type(card) !== 'basic') > 0;
		},
		check(event, player) {
			if (get.attitude(player, event.player) >= 0) return false;
			return get.effect(player, event.card, event.player, player) < 0;
		},
		usable: 1,
		round: true,
		async content(event, trigger, player) {
			// 弃置一张牌
			const {
				cards: [card],
			} = await player
				.chooseToDiscard('hs', card => get.type(card) !== 'basic', true, get.translation(trigger.card) + '对你生效，是否弃置一张非基本牌令其无效？')
				.forResult();

			if (!card) return;

			// 令该牌对玩家无效
			trigger.excluded.add(player);

			// 摸1张牌
			await player.draw(1);
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (target.countCards('he', card => get.type(card) !== 'basic') > 0 && get.attitude(target, player) < 0) {
						if (get.tag(card, 'damage')) return [1, 0.6, 1, 0.5];
					}
				},
			},
		},
	},
	hok_douzhan: {
		enable: 'phaseUse',
		usable: 1,
		filterCard: card => get.type(card) !== 'basic',
		position: 'hs',
		filterTarget: (card, player, target) => player !== target && player.canUse({ name: 'sha' }, target, false) && player.inRange(target),
		selectCard: 1,
		filter(event, player) {
			return player.countCards('hs', card => get.type(card) !== 'basic') > 0;
		},
		check: card => 7 - get.value(card),
		async content(event, trigger, player) {
			const target = event.target;
			const card = event.cards[0];

			// 视为使用一张不计入次数的杀
			const useCardEvent = await player.useCard({ name: 'sha', isCard: true, cardid: card.cardid }, target).set('addCount', false).set('noanimate', true);

			// 检查事件是否存在
			if (!useCardEvent) {
				return;
			}

			// 获取结果
			const result = await useCardEvent.forResult();

			// 若此杀未造成伤害，摸一张牌
			if (result && !result.bool) {
				await player.draw();
			}
		},
		ai: {
			order: 5,
			result: {
				target: (player, target) => {
					const eff = get.effect(target, { name: 'sha' }, player);
					if (eff >= 0) return eff;
					return -1;
				},
				player: 1,
			},
		},
	},
	hok_ruyijingu: {
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'metal',
		limited: true,
		filterTarget: lib.filter.notMe,
		selectTarget: 1,
		line: 'fire',
		async content(event, trigger, player) {
			player.awakenSkill('hok_ruyijingu');
			// 视为使用一张不计入次数的【杀】
			const useResult = await player.useCard({
				name: 'sha',
				isCard: true,
			}, event.targets[0], false);

			// 判断是否造成伤害
			if (useResult?.damaged) {
				const target = event.targets[0];
				// 弃置防具和坐骑区内的所有牌
				const cards = target.getCards('e', card => {
					const subtype = get.subtype(card);
					return subtype === 'equip2' || subtype === 'equip3' || subtype === 'equip4';
				});

				if (cards.length > 0) {
					await target.discard(cards);
				}
			}
		},
		ai: {
			order: 5,
			result: {
				target(player, target) {
					if (get.attitude(player, target) >= 0) return 0;
					let eff = get.effect(target, { name: 'sha' }, player, target);
					if (eff < 0) {
						// 若目标有防具或坐骑，负面效果加重
						const es = target.getCards('e', card => {
							const subtype = get.subtype(card);
							return subtype === 'equip2' || subtype === 'equip3' || subtype === 'equip4';
						});
						if (es.length > 0) eff *= 1.5;
					}
					return eff;
				},
			},
		},
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
			order: 3,
			result: {
				target(player, target) {
					const att = get.sgn(get.attitude(player, target));
					return att * get.damageEffect(target, player, player, 'ice');;
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
				if (get.tag(history[i].card, 'damage') && history[i].isPhaseUsing()) {
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

	// X
	// 项羽
	hok_pofu: {
		enable: 'phaseUse',
		usable: 1,
		filterTarget(card, player, target) {
			return target != player && player.inRange(target);
		},
		filter(event, player) {
			// 检查玩家是否还能出杀
			return player.getCardUsable({ name: 'sha' }) > 0;
		},
		async content(event, trigger, player) {
			let target = event.target;
			// 对目标使用杀
			await player.useCard({ name: 'sha', isCard: true }, target);
			// 检查是否造成伤害
			let damageEvent = event.getParent('useCard').relatedEvent;
			if (damageEvent && damageEvent.name == 'damage' && damageEvent.num > 0) {
				// 目标弃置1张手牌
				await target.chooseToDiscard('h', 1, true);
				// 若目标体力值大于玩家，玩家摸2张牌
				if (target.hp > player.hp) {
					await player.draw(2);
				}
			}
		},
		ai: {
			order: 7,
			result: {
				target(player, target) {
					// 基础杀的收益
					let shaEffect = get.effect(target, { name: 'sha' }, player, player);
					// 弃牌收益（对目标是负面）
					let discardEffect = -get.effect(target, { name: 'guohe' }, player, target);
					// 摸牌收益（若目标体力大于玩家）
					let drawEffect = target.hp > player.hp ? 2 : 0;
					return -(shaEffect + discardEffect + drawEffect);
				}
			},
			threaten: 1.5,
			// 添加skillTag，使AI优先使用技能
			skillTagFilter(player, tag) {
				if (tag == 'damage') {
					return true;
				}
				return false;
			}
		}
	},
	hok_bawangzhan: {
		derivation: 'wushuang',
		enable: 'phaseUse',
		usable: 1,
		filterCard(card, player) {
			return player.countCards('h') >= 3;
		},
		selectCard: 3,
		filterTarget(card, player, target) {
			return target != player && player.canUse({ name: 'sha' }, target);
		},
		async content(event, trigger, player) {
			let target = event.target;
			// 判断条件并设置效果
			let extraDamage = (player.maxHp - player.hp >= 2) ? 1 : 0;
			// 添加"无双"效果：目标需要两张【闪】才能抵消
			await player.addTempSkill('hok_bawangzhan_wushuang', { player: 'phaseUseAfter' });

			// 使用杀并添加效果
			await player.useCard({ name: 'sha', isCard: true }, target).set('oncard', card => {
				// 若玩家已损失体力值大于等于2，伤害+1
				if (extraDamage > 0) {
					_status.event.baseDamage = 1 + extraDamage;
				}
			});
		},
		ai: {
			order: 5,
			result: {
				target(player, target) {
					// 基础杀的收益
					let shaEffect = get.effect(target, { name: 'sha' }, player, player);
					// 若玩家已损失体力值大于等于2，伤害+1
					if (player.maxHp - player.hp >= 2) {
						shaEffect *= 1.5;
					}
					// 添加"无双"效果的AI评估
					shaEffect *= 1.2;
					// 考虑弃置3张牌的代价
					shaEffect -= 1;
					return -shaEffect;
				}
			},
			threaten: 1.8
		},
		subSkill: {
			wushuang: {
				trigger: { player: "useCardToPlayered" },
				forced: true,
				filter(event, player) {
					return event.card.name == "sha" && !event.getParent().directHit.includes(event.target);
				},
				logTarget: "target",
				async content(event, trigger, player) {
					const id = trigger.target.playerid;
					const map = trigger.getParent().customArgs;
					if (!map[id]) {
						map[id] = {};
					}
					if (typeof map[id].shanRequired == "number") {
						map[id].shanRequired++;
					} else {
						map[id].shanRequired = 2;
					}
				},
			}
		}
	},
	hok_xianzhen: {
		enable: 'phaseUse',
		usable: 1,
		zhuSkill: true,
		filter(event, player) {
			// 主公技，且手牌数小于体力上限
			return player.hasZhuSkill('hok_xianzhen') &&
				player.countCards('h') < player.maxHp &&
				game.hasPlayer(target => target != player && target.group == 'qun');
		},
		filterTarget(card, player, target) {
			return target != player && target.group == 'qun';
		},
		async content(event, trigger, player) {
			let target = event.target;
			// 玩家失去1点体力
			await player.loseHp();
			// 目标摸2张牌
			await target.draw(2);
			// 目标交给玩家2张牌
			const cards = await target.chooseToGive(player, 2, true);
			if (cards) {
				await target.give(cards, player);
			}
		},
		ai: {
			order: 4,
			result: {
				target(player, target) {
					// 摸2张牌的收益
					let draw = get.effect(target, { name: 'draw', num: 2 }, player, target);
					// 给玩家2张牌的收益（对目标是负面）
					let give = -get.effect(target, { name: 'guohe', num: 2 }, player, target);
					return draw + give;
				},
				player(player) {
					// 失去1点体力的代价
					let loseHp = -1;
					// 获得2张牌的收益
					let gain = 2;
					return loseHp + gain;
				}
			},
			threaten: 1.2
		}
	},
	// 心魔六耳
	hok_xinmo: {
		locked: true,
		trigger: {
			source: 'damageBefore',
		},
		filter(event, player) {
			// 确保是杀造成的伤害
			if (!event.card || event.card.name != 'sha') return false;
			return event.num > 0;
		},
		async content(event, trigger, player) {
			// 进行判定
			const judgeEvent = await player.judge(card => {
				if (get.color(card) == 'red') {
					return 1.5;
				} else {
					return -1.5;
				}
			});
			judgeEvent.judge2 = result => result.bool;

			const { result: { judge } } = await judgeEvent;

			// 根据判定结果执行效果
			if (judge > 0) {
				// 红色判定：伤害×2（最大为3）
				trigger.num = Math.min(trigger.num * 2, 3);
			} else {
				// 黑色判定：摸1张牌
				await player.draw();
			}
		},
		group: 'hok_xinmo_range',
		subSkill: {
			range: {
				trigger: {
					player: 'useCard'
				},
				filter(event, player) {
					// 确保是玩家使用的牌
					return event.player == player;
				},
				silent: true,
				content() {
					// 添加临时技能增加攻击范围
					player.addTempSkill('hok_xinmo_buff');
				},
			},
			buff: {
				mod: {
					attackRange(player, num) {
						return num + 1;
					}
				}
			}
		}
	},
	hok_chenmie: {
		enable: 'phaseUse',
		usable: 1,
		filterCard(card) {
			return get.type(card) !== 'basic';
		},
		position: 'hs',
		filterTarget: (card, player, target) => player !== target && player.canUse({ name: 'sha' }, target, false) && player.inRange(target),
		selectCard: 1,
		filter(event, player) {
			return player.countCards('hs', card => get.type(card) !== 'basic') > 0;
		},
		check(card) {
			return 7 - get.value(card);
		},
		async content(event, trigger, player) {
			const { target } = event;
			const card = event.cards[0];

			player.addTempSkill('hok_chenmie_recover', 'useCardAfter');

			// 视为使用一张不计入次数的杀
			const useCardEvent = await player.useCard({ name: 'sha', isCard: true, cardid: card.cardid }, target).set('addCount', false).set('noanimate', true);
			// 检查事件是否存在
			if (!useCardEvent) {
				return;
			}
		},
		ai: {
			order: 5,
			result: {
				target(player, target) {
					return get.effect(target, { name: 'sha' }, player);
				},
			},
		},
		subSkill: {
			recover: {
				trigger: { source: 'damageEnd' },
				forced: true,
				filter(event, player) {
					// 检查是否是由【杀】造成的伤害
					if (!event.card || event.card.name !== 'sha') {
						return false;
					}
					// 检查伤害值是否大于1
					return event.num > 1;
				},
				async content(event, trigger, player) {
					// 回复1点体力
					await player.recover(1);
				}
			}
		}
	},
	hok_chongxiao: {
		trigger: {
			target: 'useCardToBefore',
		},
		filter: function (event, player) {
			// 排除自己使用的牌
			if (event.player === player) return false;
			return event.card.isCard;
		},
		usable: 1,
		round: true,
		check: function (event, player) {
			// 基础AI判断：当牌可能造成伤害时发动
			if (get.effect(player, event.card, event.player, player) < 0) return true;
			return false;
		},
		content: async function (event, trigger, player) {
			// 令该牌对玩家无效
			trigger.cancel();
			// 摸1张牌
			// await player.draw();
		},
		ai: {
			order: 5,
			result: {
				player: 1,
			},
		}
	},
	hok_jufen: {
		enable: 'phaseUse',
		skillAnimation: true,
		animationColor: 'metal',
		limited: true,
		filter: function (event, player) {
			return player.hasSkill('hok_jufen');
		},
		filterTarget: function (card, player, target) {
			return target != player;
		},
		selectTarget: 1,
		content: async function (event, trigger, player) {
			// 记录技能已使用
			player.awakenSkill('hok_jufen');

			// 对所有其他角色使用不计入次数的杀
			const targets = game.filterPlayer(target => target != player);
			for (const target of targets) {
				await player.useCard({ name: 'sha', isCard: true }, target);
			}

			// 对选择的目标使用不可被响应的杀
			await player.useCard({
				name: 'sha',
				isCard: true,
				notrigger: ['hok_xinmo']
			}, event.targets[0]);

			// 设置不可被响应
			event.targets[0].addTempSkill('hok_jufen_sha', 'useCardToAfter');
		},
		ai: {
			order: 10,
			result: {
				target: -1,
				player: 1,
			},
		},
		subSkill: {
			sha: {
				trigger: {
					player: 'useCardToPlayered',
				},
				filter: function (event, player) {
					return event.card.name == 'sha' && event.getParent().name == 'hok_jufen';
				},
				forced: true,
				popup: false,
				content: function () {
					trigger.directHit.addArray(game.players);
				},
			},
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
			if (player.isDamaged()) {
				player.recover();
			} else {
				if (player.countMark('hok_shengguang') < 3) {
					player.addMark('hok_shengguang', 1);
				}
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
		usable: 1,
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
			order: () => get.order({ name: 'sha' }) - 0.2,
			expose: 0.2,
			result: {
				player(player) {
					return game.hasPlayer((current) => {
						return player != current && player.inRange(current) && get.attitude(player, current) < 0;
					}) ? 1 : 0;
				},
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
	// 虞姬
	hok_chuge: {
		enable: 'phaseUse',
		usable: 1,
		filterCard: true,
		position: 'h',
		selectCard: 1,
		filter(event, player) {
			return player.countCards('h') > 0;
		},
		check: function (card) {
			return 7 - get.value(card);
		},
		content: async function (event, trigger, player) {
			await player.discard(event.cards);
			player.addTempSkill('hok_chuge_effect');
			player.markSkill('hok_chuge_effect');
		},
		ai: {
			order: 8,
			result: {
				player: function (player) {
					if (player.countCards('h', { type: 'basic' }) > 0) return 1;
					return 0;
				}
			}
		},
		subSkill: {
			effect: {
				charlotte: true,
				trigger: { player: 'useCardToPlayered' },
				filter(event, player) {
					if (!_status.currentPhase || player != _status.currentPhase) return false;
					if (event.card.name != 'sha' || !event.isFirstTarget) return false;
					return true;
				},
				forced: true,
				logTarget: 'targets',
				content: async function (event, trigger, player) {
					for (var target of trigger.targets) {
						target.addTempSkill('qinggang2');
						target.storage.qinggang2.add(trigger.card);
						player.addTempSkill('hok_chuge_damage', 'phaseUseAfter');
						player.storage.hok_chuge_damage = true;
					}
					player.unmarkSkill('hok_chuge_effect');
					player.removeSkill('hok_chuge_effect');
				},
				ai: {
					unequip_ai: true,
					effect: {
						target: function (card, player, target, current) {
							if (card.name == 'sha') {
								return [1, 1.5];
							}
						}
					}
				},
			},
			damage: {
				trigger: { source: 'damageBegin1' },
				forced: true,
				filter(event, player) {
					return event.card && event.card.name == 'sha' && player.storage.hok_chuge_damage;
				},
				content: function () {
					trigger.num++;
					player.storage.hok_chuge_damage = false;
				},
			},
			// 风护
			hok_fenghu: {
				trigger: {
					player: 'useCardToTargeted',
				},
				filter: function (event, player) {
				}
			},
		}
	},
	hok_fengyou: {
		trigger: {
			target: 'useCardToTargeted',
		},
		usable: 1,
		filter: function (event, player) {
			if (!player.countCards('h') || event.targets.length != 1 || event.player == event.target) return false;
			if (event.card.name != 'sha' || event.card.nature) return false;
			return event.target === player || event.cards.someInD();
		},
		async cost(event, trigger, player) {
			var next = player.chooseToDiscard('h'), prompt;
			event.target = trigger.player;
			prompt = '令' + get.translation(trigger.card) + '对你无效';
			next.set('goon', -get.effect(player, trigger.card, trigger.player, player));
			next.set('prompt', get.prompt('hok_fengyou', event.target));
			next.set('prompt2', prompt)
			next.set('ai', function (card) {
				return _status.event.goon - get.value(card);
			});
			next.set('logSkill', ['hok_fengyou', event.target]);
			event.result = await next.forResult();
		},
		popup: false,
		content() {
			trigger.excluded.add(player);
			player.draw();
		},
	},
	hok_zhenqianwu: {
		trigger: {
			player: 'phaseUseBegin',
		},
		forced: true,
		unique: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: 'metal',
		derivation: ['hok_fengge'],
		chargeSkill: 4,
		filter: function (event, player) {
			if (player.hasSkill('hok_fengge')) return false;
			return player.countCharge && player.countCharge() >= 4;
		},
		content: async function (event, trigger, player) {
			player.removeCharge(4);
			player.awakenSkill(event.name);
			await player.addSkills('hok_fengge');
		},
		group: ['hok_zhenqianwu_charge'],
		subSkill: {
			charge: {
				trigger: {
					source: 'damageSource',
					player: 'damageEnd',
				},
				forced: true,
				filter: function (event, player) {
					if (player.hasSkill('hok_fengge')) return false;
					return event.num > 0 && player.countCharge() < 4;
				},
				content: function () {
					const currentCharge = player.countCharge();
					const addAmount = Math.min(trigger.num, 4 - currentCharge);
					player.addCharge(addAmount);
				},
			},
		},
		ai: {
			combo: 'hok_fengge'
		}
	},
	hok_fengge: {
		locked: true,
		mod: {
			cardUsable(card, player, num) {
				if (get.name(card, player) == 'sha') return num + 1;
			},
		},
		trigger: {
			player: 'useCardToPlayered',
		},
		filter: function (event, player) {
			return event.card.name == 'sha' && event.target.countCards('h') < player.countCards('h');
		},
		forced: true,
		content: async function (event, trigger, player) {
			trigger.getParent().baseDamage++;
		},
		ai: {
			effect: {
				target: function (card, player, target) {
					if (card.name == 'sha' && target.countCards('h') < player.countCards('h')) {
						return [1, -1];
					}
				}
			}
		}
	},

	// Z
	// 猪八戒
	hok_wushang: {
		forced: true,
		unique: true,
		marktext: '血',
		intro: {
			name: '残血',
			content: 'mark',
		},
		trigger: {
			player: "damageEnd",
			source: "damageEnd",
		},
		// 根据触发时机动态获取受伤害的数值
		async content(event, trigger, player) {
			const num = trigger.num;
			if (num <= 0) return;

			// 触发时机为受到伤害后
			if (event.triggername === "damageEnd" && trigger.player === player) {
				player.addMark("hok_wushang", num);
				// 持续到下个回合结束，添加临时标记以便清理
				if (!player.storage.hok_wushang_cleanup) {
					player.storage.hok_wushang_cleanup = true;
					// 添加下回合结束时的清除逻辑
					const skill = lib.skill.hok_wushang;
					if (!skill._markCleaning) {
						skill._markCleaning = true;
						lib.skill.hok_wushang_cleanup = {
							trigger: { player: "phaseEnd" },
							direct: true,
							popup: false,
							async content(event, trigger, player) {
								player.removeMark("hok_wushang", player.countMark("hok_wushang"));
								delete player.storage.hok_wushang_cleanup;
							},
						};
					}
					player.addSkill("hok_wushang_cleanup");
				}
			}
			// 触发时机为造成伤害后
			else {
				const markNum = player.countMark("hok_wushang");
				const removeNum = Math.min(num, markNum);
				if (removeNum > 0) {
					player.removeMark("hok_wushang", removeNum);
					await player.recover(removeNum);
				}
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, "damage")) {
						if (!target.hasMark("hok_wushang")) return [1, 0.6];
					}
				},
			},
		},
	},
	hok_routan: {
		enable: "phaseUse",
		usable: 1,
		filterCard: card => get.type(card) !== 'basic',
		filterTarget: true,
		filter(event, player) {
			return player.countCards('hs', card => get.type(card) !== 'basic') > 0;
		},
		async content(event, trigger, player) {
			const target = event.target;
			// 对目标造成1点伤害
			await target.damage(1);

			// 若目标存活，令其选择一项
			if (target.isIn()) {
				const result = await target.chooseControl('选项一', '选项二', () => {
					// AI 优先交牌保闪，除非手牌很充裕
					if (target.countCards('he') > 2) return 1;
					return 0;
				}).set('choiceList', [
					`将1张手牌交给${get.translation(player)}`,
					'本回合不能使用或打出【闪】',
				]).forResult();

				if (result && result.control === '选项一') {
					// 选项一：将1张牌交给玩家
					if (target.countCards('he') > 0) {
						await target.chooseToGive(player, 1, true, 'h');
					}
				} else {
					// 选项二：本回合不能使用或打出【闪】
					target.addTempSkill('hok_routan_block', 'phaseAfter');
				}

			}
		},
		ai: {
			order: 6,
			result: {
				target: -1.5,
			},
		},
	},
	// 配合选项二的临时技能
	hok_routan_block: {
		mark: true,
		marktext: '禁',
		intro: {
			content: '本回合不能使用或打出【闪】',
		},
		mod: {
			cardEnabled(card) {
				if (card.name === 'shan') return false;
			},
			cardRespondable(card) {
				if (card.name === 'shan') return false;
			},
		},
	},


	// SP
	// SP李信
	hok_wangming: {
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
