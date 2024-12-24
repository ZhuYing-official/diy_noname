import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';

/** @type { importCharacterConfig['skill'] } */
const skills = {
	// 扩展用
	// 强化主公
	_Enhance_zhu: {
		charlotte: true,
		ruleSkill: true,
		forceDie: true,
		trigger: { global: 'gameStart', player: 'enterGame' },
		filter(event, player) {
			if (!lib.config.extension_捞德一_Enhance_zhu) {
				return false;
			}
			var zhu = get.zhu(player);
			if (zhu) {
				if (player.isZhu) {
					return true;
				}
			}
			return false;
		},
		firstDo: true,
		direct: true,
		priority: -Infinity,
		lasrDo: true,
		content() {
			let laoSkills = ['hengzheng', 'jizhen', 'batu', 'shengxi', 'ciqiu', 'geju', 'junxing', 'moukui', 'tianming'],
				laoRandom = Math.floor(Math.random() * 12),
				zhuskill = laoSkills[laoRandom > 8 ? 8 : laoRandom];
			player.addSkill(zhuskill);
		},
	},

	// 曹芳
	lao_shouwei: {
		trigger: { player: 'damageAfter' },
		frequent: true,
		filter(event, player) {
			return (event.num > 0);
		},
		content() {
			var drawX = Math.floor(_status.currentPhase.getHp() / 2);
			player.draw(drawX > 2 ? 2 : drawX);
			player.addSkill('lao_shouwei_effect');
		},
		subSkill: {
			effect: {
				forced: true,
				trigger: { global: 'phaseAfter' },
				content() {
					var drawY = trigger.player.getDamagedHp();
					player.draw(drawY > 3 ? 3 : drawY);
					player.removeSkill('lao_shouwei_effect');
				}
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
					if (get.tag(card, 'damage')) return [1, 0.55];
				}
			}
		}
	},
	lao_shengbai: {
		skillAnimation: true,
		animationColor: 'thunder',
		trigger: { player: 'dying' },
		zhuSkill: true,
		filter(event, player) {
			if (player.hp > 0) return false;
			if (!player.hasZhuSkill('lao_shengbai')) return false;
			return game.hasPlayer(current => current != player && current.group == 'wei');
		},
		mark: true,
		unique: true,
		limited: true,
		content() {
			'step 0'
			player.awakenSkill('lao_shengbai');
			var targets = game.filterPlayer();
			targets.remove(player);
			event.targets = targets;
			event.damages = [];
			event.lao_shengbai_target = trigger.source;
			'step 1'
			if (event.targets.length) {
				var current = event.targets.shift();
				if (current.group == 'wei' && current.isIn() && event.lao_shengbai_target.isIn()) {
					event.current = current;
					current.chooseBool('是否受到1点伤害，视为对' + get.translation(event.lao_shengbai_target) + '使用杀？').set('ai', function () {
						return get.effect(event.lao_shengbai_target, { name: 'sha' }, current, current) > 1;
					});
				}
				else {
					event.redo();
				}
			}
			else {
				event.goto(3);
			}
			'step 2'
			if (result.bool) {
				event.damages.push(event.current);
				event.current.useCard({ name: 'sha', isCard: true }, event.lao_shengbai_target, false);
			}
			if (event.targets.length) {
				event.goto(1);
			}
			'step 3'
			if (event.damages.length) {
				var next = game.createEvent('lao_shengbai_next');
				trigger.after.push(next);
				next.targets = event.damages;
				next.setContent(function () {
					for (var target of targets) {
						target.damage();
					}
				});
			}
		}
	},
	// 曹奂
	lao_zunqian: {
		trigger: { target: 'useCardToTargeted' },
		check(event, player) {
			var cards = player.getCards('h');
			if (cards.length <= 2) {
				for (var i = 0; i < cards.length; i++) {
					if (cards[i].name == 'shan' || cards[i].name == 'tao') return false;
				}
			}
			return true;
		},
		filter(event, player) {
			return event.card.name == 'sha';
		},
		content() {
			'step 0'
			player.chooseToDiscard(2, true, 'he');
			player.draw(2);
			var players = game.filterPlayer();
			players.sort(function (a, b) {
				return b.countCards('h') - a.countCards('h');
			});
			if (players[0].countCards('h') > players[1].countCards('h') && players[0] != player) {
				players[0].chooseBool(get.prompt2('lao_zunqian'));
				event.player = players[0];
			}
			else {
				event.finish();
			}
			'step 1'
			if (result.bool) {
				player.chooseToDiscard(2, true, 'he');
				player.draw(2);
			}
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (card.name == 'sha') return [1, 0.5];
				}
			}
		}
	},
	lao_yishan: {
		trigger: { player: 'damageAfter' },
		frequent: true,
		filter(event, player) {
			return (event.num > 0) && player.countCards('h', function (card) {
				return card.name == 'sha';
			}) > 0;
		},
		content() {
			'step 0'
			player.chooseBool(get.prompt2('lao_yishan', trigger.source));
			'step 1'
			if (result.bool) {
				var cards = player.getCards('h', function (card) {
					return card.name == 'sha';
				});
				if (cards.length > 0) player.discard(cards);
				trigger.source.draw(cards.length);
				player.draw(cards.length + 1);
			}
		},
	},
	lao_chongjia: {
		skillAnimation: true,
		animationColor: 'thunder',
		unique: true,
		juexingji: true,
		zhuSkill: true,
		keepSkill: true,
		derivation: ['olgongjie', 'twzhuiting'],
		trigger: { player: 'phaseZhunbeiBegin' },
		forced: true,
		filter(event, player) {
			if (!player.hasZhuSkill('lao_chongjia')) return false;
			return player.isMinHp();
		},
		content() {
			'step 0'
			player.awakenSkill('lao_chongjia');
			player.gainMaxHp();
			'step 1'
			if (player.hp < 3) player.recover(3 - player.hp);
			player.addSkillLog('olgongjie');
			player.addSkillLog('twzhuiting');
			'step 2'
			if (player.isZhu2()) event.trigger('zhuUpdate');
		}
	},
	// 曹宇
	lao_renlun: {
		trigger: { player: 'damageAfter' },
		frequent: true,
		filter(event) {
			return (event.num > 0)
		},
		content() {
			'step 0'
			player.draw(2);
			'step 1'
			if (!player.countCards('h')) event.finish();
			else player.showHandcards();
			'step 2'
			player.chooseCardTarget({
				filterCard(card) {
					var num = 0;
					for (var i = 0; i < ui.selected.cards.length; i++) {
						num += get.number(ui.selected.cards[i]);
					}
					return get.number(card) + num <= 13;
				},
				selectCard() {
					var num = 0;
					for (var i = 0; i < ui.selected.cards.length; i++) {
						num += get.number(ui.selected.cards[i]);
					}
					if (num == 13) return ui.selected.cards.length;
					return ui.selected.cards.length + 2;
				},
				filterTarget(card, player, target) {
					return player != target;
				},
				ai1(card) {
					var player = _status.event.player;
					if (player.maxHp - player.hp == 1 && card.name == 'du') return 30;
					var check = _status.event.check;
					if (check < 1) return 0;
					if (player.hp > 1 && check < 2) return 0;
					return get.unuseful(card) + 9;
				},
				ai2(target) {
					var att = get.attitude(_status.event.player, target);
					if (ui.selected.cards.length == 1 && ui.selected.cards[0].name == 'du') return 1 - att;
					return att - 2;
				},
				prompt: '令一名其他角色获得点数之和等于13的牌',
			}).set('check', check);
			'step 3'
			if (result.bool) {
				player.give(result.cards, result.targets[0]);
				player.line(result.targets, 'green');
			}
		},
		ai: {
			maixie: true,
			maixie_hp: true,
			effect: {
				target(card, player, target) {
					if (get.tag(card, 'damage')) {
						if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
						if (!target.hasFriend()) return;
						var num = 1;
						if (get.attitude(player, target) > 0) {
							if (player.needsToDiscard()) {
								num = 0.7;
							}
							else {
								num = 0.5;
							}
						}
						if (target.hp >= 4) return [1, num * 2];
						if (target.hp == 3) return [1, num * 1.5];
						if (target.hp == 2) return [1, num * 0.5];
					}
				}
			}
		}
	},
	lao_gongci: {
		trigger: { player: 'phaseDiscardBegin' },
		filter(event, player) {
			return player.countCards('h') > player.getHandcardLimit() - 1;
		},
		content() {
			'step 0'
			player.chooseTarget('恭辞：你可以选择一名其他角色，然后令你本回合手牌上限-1，你此阶段弃置的牌在进入弃牌堆前其获得其中不同花色的牌。', function (card, player, target) {
				return target != player;
			}).set('ai', function (target) {
				var att = get.attitude(_status.event.player, target);
				if (att < 0) {
					return att;
				}
				else if (att > 0) {
					if (target.hasSkill('remingjian') || target.hasSkill('xinfu_falu')) {
						return att;
					}
					return att / target.countCards('h');
				}
				else {
					return att / 100;
				}
			}).set('enemy', get.value(event.togive[0], player, 'raw') < 0);
			'step 1'
			if (result.bool) {
				player.addTempSkill('lao_gongci_effect');
				result.targets[0].addTempSkill('lao_gongci_gain');
			}
		},
		subSkill: {
			effect: {
				mod: {
					maxHandcard(player, num) {
						return num - 1;
					},
				},
			},
			gain: {
				trigger: { global: 'loseAfter' },
				filter(event, player) {
					var evt = event.getParent(3);
					return event.type == 'discard' && evt.name == 'phaseDiscard' && evt.player == event.player && evt.player != player && event.cards2 && event.cards2.filterInD('d').length > 0;
				},
				locked: false,
				forced: true,
				content() {
					'step 0'
					event.cards = trigger.cards2.filterInD('d');
					'step 1'
					var next = player.chooseCardButton('选择获得不同花色的牌', event.cards, [1, event.cards.length]).set('ai', function (button) {
						return get.value(button.link, player);
					}).set('filterButton', function (button) {
						for (var i = 0; i < ui.selected.buttons.length; i++) {
							if (get.suit(ui.selected.buttons[i].link) == get.suit(button.link)) return false;
						}
						return true;
					});
					'step 2'
					if (result.bool) {
						player.gain(result.links, 'gain2', 'log');
					}
				},
			}
		},
	},
	// 崔氏
	lao_huashang: {
		forced: true,
		audio: 2,
		trigger: {
			player: 'phaseJieshu',
		},
		mod: {
			maxHandcard(player, num) {
				return (3 > player.hp) ? 3 : player.hp;
			},
		},
		filter(event, player) {
			let flag = 4;
			if (player.countCards('h', { suit: 'heart' }) === 0) {
				flag -= 1;
			}
			if (flag && player.countCards('h', { suit: 'diamond' }) === 0) {
				flag -= 1;
			}
			if (flag && player.countCards('h', { suit: 'club' }) === 0) {
				flag -= 1;
			}
			if (flag && player.countCards('h', { suit: 'spade' }) === 0) {
				flag -= 1;
			}
			return !player.isEmpty(2) && flag >= 3;
		},
		unique: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: 'water',
		derivation: 'shenfu',
		content() {
			player.awakenSkill(event.name);
			player.maxHp = 3;
			player.removeSkill('reluoshen');
			player.addSkill('shenfu');
		}
	},
	lao_pianwan: {
		audio: 'reqingguo',
		mod: {
			aiValue(player, card, num) {
				if (get.name(card) != 'shan' && get.suit(card) != 'club') return;
				var cards = player.getCards('h', function (card) {
					return get.name(card) == 'shan' || get.suit(card) == 'club';
				});
				cards.sort(function (a, b) {
					return (get.name(b) == 'shan' ? 1 : 2) - (get.name(a) == 'shan' ? 1 : 2);
				});
				var geti = function () {
					if (cards.contains(card)) {
						return cards.indexOf(card);
					}
					return cards.length;
				};
				if (get.name(card) == 'shan') return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6;
				return Math.max(num, [6.5, 4, 3][Math.min(geti(), 2)]);
			},
			aiUseful() {
				return lib.skill.qingguo.mod.aiValue.apply(this, arguments);
			},
		},
		enable: ['chooseToRespond', 'chooseToUse'],
		filterCard(card) {
			return get.suit(card) == 'club';
		},
		viewAs: { name: 'shan' },
		viewAsFilter(player) {
			if (!player.countCards('h', { suit: 'club' })) return false;
		},
		position: 'h',
		prompt: '弃置一张梅花手牌当闪使用或打出',
		check() { return 1 },
		onuse(result, player) {
			player.discard(result.cards);
		},
		ai: {
			order: 3,
			respondShan: true,
			skillTagFilter(player) {
				if (!player.countCards('h', { suit: 'club' })) return false;
			},
			effect: {
				target(card, player, target, current) {
					if (get.tag(card, 'respondShan') && current < 0) return 0.6
				}
			}
		}
	},
	// 刘琮
	lao_tunquan: {
		audio: 2,
		skillAnimation: true,
		animationColor: 'gray',
		trigger: { player: 'phaseZhunbeiBegin' },
		forced: true,
		unique: true,
		juexingji: true,
		filter(event, player) {
			for (var i = 0; i < game.players.length; i++) {
				var name = game.players[i].name1;
				while (name.indexOf('_') != -1) {
					name = name.slice(name.indexOf('_') + 1);
				}
				if (name.indexOf('caocao') == 0) {
					return true;
				}
			}
			return false;
		},
		content() {
			player.awakenSkill('lao_tunquan');
			player.storage.lao_quxiang_rewrite = true;
		}
	},
	lao_quxiang: {
		audio: 2,
		derivation: 'lao_quxiang_rewrite',
		group: 'lao_quxiang_rewrite',
		usable: 1,
		trigger: { player: 'damageBegin2' },
		filter(event, player) {
			return player.countCards('h') > 0 && !player.storage.lao_quxiang_rewrite == true;
		},
		content() {
			'step 0'
			player.line(trigger.source, 'green');
			player.storage.lao_quxiangCards = player.getCards('h');
			player.give(player.storage.lao_quxiangCards, trigger.source);
			trigger.cancel();
			'step 1'
			var repayCards = player.storage.lao_quxiangCards.length > 1 ? 2 : 1;
			var str = '交给' + get.translation(player) + repayCards + '张手牌';
			trigger.source.chooseCard('h', repayCards, true, str);
			'step 2'
			if (result.cards) {
				trigger.source.give(result.cards, player);
			}
		},
		subSkill: {
			rewrite: {
				audio: 2,
				usable: 1,
				trigger: { player: 'damageBegin4' },
				filter(event, player) {
					return player.countCards('h') > 0 && player.storage.lao_quxiang_rewrite == true;
				},
				content() {
					'step 0'
					player.line(trigger.source, 'green');
					player.give(player.getCards('h'), trigger.source);
					trigger.cancel();
					'step 1'
					var str = '交给' + get.translation(player) + '一张手牌';
					trigger.source.chooseCard('h', true, str);
					'step 2'
					if (result.cards) {
						trigger.source.give(result.cards, player);
					}
				},
			},
		},
	},
	// 土安
	lao_tengbing: {
		trigger: {
			global: 'phaseBefore',
			player: 'enterGame',
		},
		forced: true,
		filter(event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0) && player.hasEquipableSlot(2) && !player.getEquips('tengjia').length;
		},
		content() {
			var cards = [];
			for (var i = 1; i <= 13; i++) {
				cards.push(game.createCard2('sha', i % 2 ? 'heart' : 'diamond', i, 'fire'));
			}
			game.broadcastAll(function () {
				lib.inpile.add('sha');
			});
			game.cardsGotoPile(cards, () => {
				return ui.cardPile.childNodes[get.rand(0, ui.cardPile.childNodes.length - 1)];
			});

			var card = game.createCard2('tengjia', 'spade', 1 + Math.floor(Math.random() * 13));
			player.$gain2(card, false);
			game.delayx();
			player.equip(card);
		},
		mod: {
			canBeGained(card, source, player) {
				if (player.getEquips('tengjia').contains(card)) return false;
			},
			canBeDiscarded(card, source, player) {
				if (player.getEquips('tengjia').contains(card)) return false;
			},
			canBeReplaced(card, player) {
				if (player.getEquips('tengjia').contains(card)) return false;
			},
			cardname(card) {
				if (get.subtype(card, false) == 'equip2') return 'nanman';
			},
			cardnature(card) {
				if (get.subtypes(card, false).contains('equip2')) return false;
			},
			cardDiscardable(card, player) {
				if (player.getEquips('tengjia').contains(card)) return false;
			},
			cardEnabled2(card, player) {
				if (player.getEquips('tengjia').contains(card)) return false;
			},
		},
		group: ['lao_tengbing_blocker'],
		subSkill: {
			blocker: {
				trigger: { player: ['loseBefore', 'disableEquipBefore'] },
				forced: true,
				filter(event, player) {
					if (event.name == 'disableEquip') return (event.slots.contains('equip2'));
					var cards = player.getEquips('tengjia');
					return event.cards.some(card => cards.contains(card));
				},
				content() {
					if (trigger.name == 'lose') {
						trigger.cards.removeArray(player.getEquips('tengjia'));
					}
					else {
						while (trigger.slots.contains('equip2')) trigger.slots.remove('equip2');
					}
				},
			},
		},
	},
	lao_ranwang: {
		trigger: { player: 'damageBegin4' },
		filter(event, player) {
			return event.hasNature('fire');
		},
		forced: true,
		check() {
			return false;
		},
		content() {
			if (trigger.num > 1) {
				trigger.num--;
			}
			player.loseMaxHp();
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (card.name == 'sha') {
						if (game.hasNature(card, 'fire') || player.hasSkill('zhuque_skill')) return 2;
					}
					if (get.tag(card, 'fireDamage') && current < 0) return 2;
				}
			}
		},
	},
	// 奚泥
	lao_ranyong: {
		trigger: { player: 'damageBegin4' },
		filter(event, player) {
			return event.hasNature('fire');
		},
		forced: true,
		check() {
			return false;
		},
		content() {
			if (trigger.num > 1) {
				trigger.num--;
			}
			if (player.isMaxHp()) {
				trigger.num++;
			} else {
				for (let target of game.players) {
					if (target.isMaxHp() && target != player) {
						trigger.source.line(target);
						target.damage('fire', trigger.source);
						// target.damage('fire');
					}
				}
			}
		},
		ai: {
			effect: {
				target(card, player, target, current) {
					if (player.isMaxHp()) {
						if (card.name == 'sha') {
							if (game.hasNature(card, 'fire') || player.hasSkill('zhuque_skill')) return 2;
						}
						if (get.tag(card, 'fireDamage') && current < 0) return 2;
					} else {
						if (card.name == 'sha') {
							if (game.hasNature(card, 'fire') || player.hasSkill('zhuque_skill')) return 1.3;
						}
						if (get.tag(card, 'fireDamage') && current < 0) return 1.3;
					}
				}
			}
		},
	},
	// 阎行
	lao_mengjue: {
		trigger: {
			player: 'phaseUseBegin',
		},
		filter() {
			return game.hasPlayer(target => {
				return target.getExpansions('lao_mengjue_init').length;
			})
		},
		forced: true,
		async content(event, trigger, player) {
			const mengjuePlayer = await game.filterPlayer(current => {
				return current.getExpansions('lao_mengjue_init').length;
			})[0];
			player.removeSkill('lao_mengjue');
			const { result: { bool: chooseResultBool, targets: chooseTargetResultTargets } } = await player.chooseTarget(true, get.prompt2('lao_mengjue')).set('ai', function (target) {
				var player = _status.event.player;
				return get.attitude(player, target) < 0;
			});
			if (!chooseResultBool) {
				return;
			}
			event.target = chooseTargetResultTargets[0];
			player.logSkill('lao_mengjue', event.target);
			var dialog = ui.create.dialog('猛决', [mengjuePlayer.getExpansions('lao_mengjue_init'), 'blank'], 'hidden');
			const { result: { bool: chooseButtonResultBool, links: chooseButtonResultLinks } } = await event.target.chooseButton(dialog, true);
			if (!chooseButtonResultBool) {
				return;
			}
			await event.target.showCards(chooseButtonResultLinks[0], '猛决');
			if (chooseButtonResultLinks[0].name == 'juedou') {
				event.target.loseHp(event.target.hp);
				mengjuePlayer.loseToDiscardpile(mengjuePlayer.getExpansions('lao_mengjue_init').filter(i => i.name == 'sha'));
			} else {
				event.target.addSkill('lao_mengjue');
			}
			if (event.target != player) {
				event.target.useCard(chooseButtonResultLinks[0], player);
			} else {
				mengjuePlayer.loseToDiscardpile(chooseButtonResultLinks[0]);
				if (chooseButtonResultLinks[0].name != 'juedou') {
					var next = game.createEvent('lao_mengjue_result');
					next.player = player;
					next.setContent(lib.skill.lao_mengjue.content_2);
				}
			}
		},
		async content_2(event, trigger, player) {
			const mengjuePlayer = await game.filterPlayer(current => {
				return current.getExpansions('lao_mengjue_init').length;
			})[0];
			player.removeSkill('lao_mengjue');
			const { result: { bool: chooseResultBool, targets: chooseTargetResultTargets } } = await player.chooseTarget(true, get.prompt2('lao_mengjue')).set('ai', function (target) {
				var player = _status.event.player;
				return get.attitude(player, target) < 0;
			});
			if (!chooseResultBool) {
				return;
			}
			event.target = chooseTargetResultTargets[0];
			player.logSkill('lao_mengjue', event.target);
			var dialog = ui.create.dialog('猛决', [mengjuePlayer.getExpansions('lao_mengjue_init'), 'blank'], 'hidden');
			const { result: { bool: chooseButtonResultBool, links: chooseButtonResultLinks } } = await event.target.chooseButton(dialog, true);
			if (!chooseButtonResultBool) {
				return;
			}
			await event.target.showCards(chooseButtonResultLinks[0], '猛决');
			if (chooseButtonResultLinks[0].name == 'juedou') {
				event.target.loseHp(event.target.hp);
				mengjuePlayer.loseToDiscardpile(mengjuePlayer.getExpansions('lao_mengjue_init').filter(i => i.name == 'sha'));
			} else {
				event.target.addSkill('lao_mengjue');
			}
			if (event.target != player) {
				event.target.useCard(chooseButtonResultLinks[0], player);
			} else {
				mengjuePlayer.loseToDiscardpile(chooseButtonResultLinks[0]);
			}
		},
		group: 'lao_mengjue_init',
		subSkill: {
			init: {
				trigger: {
					global: 'phaseBefore',
					player: 'enterGame',
				},
				forced: true,
				locked: false,
				filter(event, player) {
					return (event.name != 'phase' || game.phaseNumber == 0);
				},
				content() {
					player.storage.cards = [];
					for (let i = 0; i < 5; i++) {
						// let card = get.cardPile(function (card) {
						// 	return card.name == 'sha' && !player.storage.cards.includes(card);
						// });
						let cardRandom = Math.random() * 8;
						let cardSuit = cardRandom < 2 ? (cardRandom < 1 ? 'heart' : 'diamond') : (cardRandom < 6 ? 'club' : 'spade');
						let cardNum = 1 + Math.floor(Math.random() * 13);
						let cardNature = null;
						if (cardRandom < 2) {
							cardNature = Math.random() * 2 < 1 ? 'fire' : null;
						} else {
							cardNature = Math.random() * 3 < 1 ? 'thunder' : null;
						}
						let card = game.createCard('sha', cardSuit, cardNum, cardNature);
						if (card) player.storage.cards.push(card);
					}
					// let card = get.cardPile(function (card) {
					// 	return card.name == 'juedou';
					// });
					let cardRandom = Math.random() * 4;
					let cardSuit = cardRandom < 2 ? (cardRandom < 1 ? 'heart' : 'diamond') : (cardRandom < 3 ? 'club' : 'spade');
					let cardNum = 1 + Math.floor(Math.random() * 13);
					let card = game.createCard('juedou', cardSuit, cardNum);
					if (card) player.storage.cards.push(card);
					player.storage.cards.randomSort();
					player.addToExpansion(player.storage.cards, 'draw').gaintag.add('lao_mengjue_init');
				},
				intro: {
					markcount: 'expansion',
					mark(dialog, content, player) {
						var content = player.getExpansions('lao_mengjue_init');
						// return '还有' + get.cnNumber(content.length) + '张牌';
						return `<div class='text center'><span class=thundertext>杀：` + (content.length - 1) + `张</span><br><span class=firetext>决斗：1张</span></div>`;
					},
				},
			}
		},
	},
	lao_sudi: {
		unique: true,
		mark: true,
		skillAnimation: true,
		animationColor: 'gray',
		limited: true,
		intro: {
			content: 'limited'
		},
		enable: 'phaseUse',
		filter(event, player) {
			return player.hasEnabledSlot(1);
		},
		filterTarget(card, player, target) {
			return target != player && target.maxHp <= player.maxHp;
		},
		content() {
			player.awakenSkill('lao_sudi');
			player.disableEquip(1);
			player.addSkill('lao_sudi_wusheng');
			target.clearSkills();
			target.addSkill('lao_mengjue');
			var next = game.createEvent('lao_mengjue_result');
			next.player = target;
			next.setContent(lib.skill.lao_mengjue_init.content);
		},
		subSkill: {
			wusheng: {
				forced: true,
				enable: ['chooseToRespond', 'chooseToUse'],
				filterCard(card, player) {
					if (get.zhu(player, 'shouyue')) return true;
					return get.subtype(card) == 'equip1';
				},
				position: 'hes',
				viewAs: { name: 'sha' },
				viewAsFilter(player) {
					if (get.zhu(player, 'shouyue')) {
						if (!player.countCards('hes')) return false;
					}
					else {
						if (!player.countCards('hes', { subtype: 'equip1' })) return false;
					}
				},
				prompt: '将一张武器牌当杀使用或打出',
				check(card) {
					const val = get.value(card);
					if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
					return 5 - val;
				},
				ai: {
					skillTagFilter(player) {
						if (get.zhu(player, 'shouyue')) {
							if (!player.countCards('hes')) return false;
						}
						else {
							if (!player.countCards('hes', { subtype: 'equip1' })) return false;
						}
					},
					respondSha: true,
				}
			}
		},
		ai: {
			expose: 0.3,
		}
	},
	lao_duanmao: {
		forced: true,
		shaRelated: true,
		preHidden: true,
		trigger: {
			target: 'useCardToTargeted',
		},
		filter(event, player) {
			return event.card.name == 'sha';
		},
		content() {
			player.draw();
			if (!player.hasEnabledSlot(1)) {
				player.chooseToUse(function (card, player, event) {
					if (get.name(card) != 'sha') return false;
					return lib.filter.filterCard.apply(this, arguments);
				}, get.prompt2('lao_duanmao')).set('filterTarget', function (card, player, target) {
					return target == trigger.player;
				});
			}
		},
		subSkill: {
			1: {
				mod: {
					cardUsable(card, player, num) {
						if (card.name == 'sha') return num + 1;
					},
				},
			}
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (card.name == 'sha') return [1, 0.6];
				},
			}
		}
	},
	// SP王朗
	lao_yayu: {
		trigger: { player: 'phaseBegin' },
		filter(event, player) {
			return player.countCards('h') > 0;
		},
		locked: false,
		forced: true,
		*content(event, map) {
			var player = map.player;
			var result = yield player.chooseTarget(get.prompt('lao_yayu'), '', (card, player, target) => {
				return player.canCompare(target);
			}).set('ai', target => {
				var player = _status.event.player;
				return -get.attitude(player, target);
			});
			if (result.bool) {
				var target = result.targets[0];
				player.logSkill('lao_yayu', target);
				var result2 = yield player.chooseToCompare(target);
				if (!result2.tie) {
					var players = [player, target];
					if (result2.bool) players.reverse();
					var win_cards = players[1].getCards('hs');
					if (win_cards != undefined) {
						players[1].discard(win_cards);
					}

					players[0].addTempSkill('fengyin', { player: 'phaseEnd' });
					var lose_num = Math.floor(players[0].countCards('h') / 2);
					if (lose_num > 0) {
						players[0].chooseToDiscard(lose_num, 'h', true);
					}
				} else {
					players[0].addTempSkill('fengyin', { player: 'phaseEnd' });
					var lose_num0 = Math.floor(players[0].countCards('h') / 2);
					if (lose_num0 > 0) {
						players[0].chooseToDiscard(lose_num0, 'h', true);
					}
					players[1].addTempSkill('fengyin', { player: 'phaseEnd' });
					var lose_num1 = Math.floor(players[0].countCards('h') / 2);
					if (lose_num1 > 0) {
						players[0].chooseToDiscard(lose_num1, 'h', true);
					}
				}
			}
		},
		ai: {
			threaten: 0.25,
		}
	},
	lao_shanshi: {
		trigger: { player: 'phaseDrawBegin2' },
		forced: true,
		filter(event, player) {
			return !event.numFixed;
		},
		check(event, player) {
			return (player.countCards('h') + 2 + event.num) <= 5 || game.hasPlayer(function (target) {
				return player !== target && !game.hasPlayer(function (current) {
					return current !== player && current !== target && current.countCards('h') < target.countCards('h');
				}) && get.attitude(player, target) > 0;
			});
		},
		content() {
			trigger.num += 2;
			player.addTempSkill('lao_shanshi_give', 'phaseDrawAfter');
		},
		subSkill: {
			give: {
				trigger: { player: 'phaseDrawEnd' },
				forced: true,
				charlotte: true,
				popup: false,
				filter(event, player) {
					return player.countCards('h') > 5;
				},
				content() {
					'step 0'
					var targets = game.filterPlayer(function (target) {
						return target != player && !game.hasPlayer(function (current) {
							return current != player && current != target && current.countCards('h') < target.countCards('h');
						});
					}), num = Math.floor(player.countCards('h') / 2);
					player.chooseCardTarget({
						position: 'h',
						filterCard: true,
						filterTarget(card, player, target) {
							return _status.event.targets.includes(target);
						},
						targets: targets,
						selectTarget: targets.length == 1 ? -1 : 1,
						selectCard: num,
						prompt: '将' + get.cnNumber(num) + '张手牌交给一名手牌数最少的其他角色',
						forced: true,
						ai1(card) {
							var goon = false, player = _status.event.player;
							for (var i of _status.event.targets) {
								if (get.attitude(i, player) > 0 && get.attitude(player, i) > 0) goon = true; break;
							}
							if (goon) {
								if (!player.hasValueTarget(card) || card.name == 'sha' && player.countCards('h', function (cardx) {
									return cardx.name == 'sha' && !ui.selected.cards.includes(cardx);
								}) > player.getCardUsable('sha')) return 2;
								return Math.max(2, get.value(card) / 4);
							}
							return 1 / Math.max(1, get.value(card));
						},
						ai2(target) {
							return get.attitude(_status.event.player, target);
						},
					});
					'step 1'
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, 'green');
						player.give(result.cards, target);
						player.markAuto('lao_shanshi_help', [target]);
						player.addTempSkill('lao_shanshi_help', { player: 'phaseBeginStart' });
					}
				},
			},
			help: {
				trigger: { target: 'useCardToTargeted' },
				direct: true,
				charlotte: true,
				onremove: true,
				filter(event, player) {
					if (!player.storage.lao_shanshi_help || !player.storage.lao_shanshi_help.length) return false;
					if (event.card.name != 'sha' && get.type(event.card) != 'trick') return false;
					for (var i of player.storage.lao_shanshi_help) {
						if (i.countCards('h') > 0) return true;
					}
					return false;
				},
				content() {
					'step 0'
					if (!event.targets) event.targets = player.storage.lao_shanshi_help.slice(0).sortBySeat();
					event.target = event.targets.shift();
					event.target.chooseCard('h', '好施：是否将一张手牌交给' + get.translation(player) + '？').set('ai', function (card) {
						var player = _status.event.player, target = _status.event.getTrigger().player;
						if (!_status.event.goon) {
							if (get.value(card, player) < 0 || get.value(card, target) < 0) return 1;
							return 0;
						}
						var cardx = _status.event.getTrigger().card;
						if (card.name == 'shan' && get.tag(cardx, 'respondShan') && target.countCards('h', 'shan') < player.countCards('h', 'shan')) return 2;
						if (card.name == 'sha' && (cardx.name == 'juedou' || get.tag(card, 'respondSha') && (target.countCards('h', 'sha') < player.countCards('h', 'sha')))) return 2;
						if (get.value(card, target) > get.value(card, player) || target.getUseValue(card) > player.getUseValue(card)) return 1;
						if (player.hasSkillTag('noh')) return 0.5 / Math.max(1, get.value(card, player));
						return 0;
					}).set('goon', get.attitude(event.target, player) > 0);
					'step 1'
					if (result.bool) {
						target.logSkill('lao_shanshi_help', player);
						target.give(result.cards, player);
					}
					if (targets.length) event.goto(0);
				},
			},
		},
	},
	// 陈寿
	lao_zhuzhi: {
		forced: true,
		getList: function () {
			const list = Object.keys(lib.characterPack.MiNikill).concat(_status.extra_pingjianList || []);
			return list.filter(i => !get.character(i, 4) || !get.character(i, 4).includes('unseen'));
		},
		Mbaby_characterlist: true,
		trigger: {
			global: ['phaseBefore', 'dying'],
			player: 'enterGame',
		},
		filter(event, player) {
			if (event.name == 'phase') {
				return game.phaseNumber == 0;
			}
			return true;
		},
		content: function () {
			'step 0'
			var allList = ((!_status.connectMode && lib.config.extension_活动武将_PingJianName) ? lib.config.extension_活动武将_PingJianName : lib.skill.lao_zhuzhi.getList()).filter(i => lib.character[i]);
			var list = [], skills = [], map = [];
			allList.randomSort();
			for (var i = 0; i < allList.length; i++) {
				var name = allList[i];
				var skills2 = lib.character[name][3];
				for (var j = 0; j < skills2.length; j++) {
					if (player.getStorage('lao_zhuzhi').includes(skills2[j])) continue;
					if (skills2[j] == 'lao_zhuzhi') continue;
					if (skills.includes(skills2[j])) {
						list.add(name);
						if (!map[name]) map[name] = [];
						map[name].push(skills2[j]);
						skills.add(skills2[j]);
						continue;
					}
					var list2 = [skills2[j]];
					game.expandSkills(list2);
					for (var k = 0; k < list2.length; k++) {
						var info = lib.skill[list2[k]];
						if (info.silent || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill
							|| (info.zhuSkill && !player.isZhu2()) || info.groupSkill || (info.priority && typeof info.priority == 'number') || info.firstDo || info.lastDo) continue;
						if (/*info.init||info.onChooseToUse||*/info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) continue;
						if (info.init) info.init(player, list2[k]);
						list.add(name);
						if (!map[name]) map[name] = [];
						map[name].push(skills2[j]);
						skills.add(skills2[j]);
						break;
					}
				}
				if (list.length > 2) break;
			}
			if (skills.length) player.chooseControl(skills, 'cancel2').set('dialog', ['请选择获得的技能', [list, 'character']]);
			else event.finish();
			'step 1'
			if (result.control != 'cancel2') {
				'step 0'
				player.markAuto('lao_zhuzhi', [result.control]);
				player.addSkill(result.control);
				player.loseMaxHp();
				'step 1'
				event.skillslist = player.getSkills(null, false, false).filter(function (i) {
					var info = get.info(i);
					if (info.silent || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill
						|| (info.zhuSkill && !player.isZhu2()) || info.groupSkill || (info.priority && typeof info.priority == 'number') || info.firstDo || info.lastDo) return false;
					if (info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) return false;

					return info && !info.charlotte;
				});
				if (event.skillslist.length > 4) {
					var next = game.createEvent('laoroguelike_insert');
					next.player = player;
					next.event = event;
					next.setContent(lib.skill.lao_zhuzhi.contentx);
				}
			} else {
				event.finish();
			}
		},
		contentx: function () {
			'step 0'
			event.skillslist = player.getSkills(null, false, false).filter(function (i) {
				var info = get.info(i);
				if (info.silent || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill
					|| (info.zhuSkill && !player.isZhu2()) || info.groupSkill || (info.priority && typeof info.priority == 'number') || info.firstDo || info.lastDo) return false;
				if (info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) return false;

				return info && !info.charlotte;
			});
			player.chooseControl(event.skillslist).set('prompt', '失去' + get.translation(player) + '武将牌上的一个技能');
			'step 1'
			player.removeSkill(result.control);
		},
	},

	// 神曹植
	lao_caigao: {
		audio: 'reluoying',
		forced: true,
		unique: true,
		derivation: 'lao_caigao_rewrite',
		group: 'lao_caigao_rewrite',
		trigger: { global: 'gainEnd' },
		filter(event, player) {
			return player != event.player && event.player != _status.currentPhase && !player.storage.lao_caigao_rewrite == true;
		},
		content() {
			'step 0'
			if (player.getHistory('gain', function (evt) {
				return evt.getParent().name == 'lao_caigao';
			}).length >= 3) {
				event.finish();
			} else {
				player.chooseControl('红色', '黑色').set('prompt', '猜测判定牌颜色').set('ai', function (event) {
					switch (Math.floor(Math.random() * 5)) {
						case 0: case 2: case 4: return '红色';
						case 1: case 3: return '黑色';
					}
				});
			}
			'step 1'
			event.guess = (result.control === '红色' ? 'red' : 'black');
			'step 2'
			player.judge(function (card) {
				if (get.color(card) == event.guess) return 1.5;
				return -1.5;
			}).judge2 = function (result) {
				return result.bool;
			};
			'step 3'
			if (result.bool) {
				player.popup('猜对');
				var card = get.cardPile(function (card) {
					return get.suit(card) == 'club';
				})
				if (card) {
					player.gain(card, 'gain2');
				}
			} else {
				player.popup('猜错');
				return false;
			}
		},
		subSkill: {
			rewrite: {
				audio: 'reluoying',
				forced: true,
				trigger: { global: 'gainEnd' },
				filter(event, player) {
					return player != event.player && event.player != _status.currentPhase && player.storage.lao_caigao_rewrite == true;
				},
				content() {
					if (player.getHistory('gain', function (evt) {
						return evt.getParent().name == 'lao_caigao_rewrite';
					}).length >= 3) {
						event.finish();
					} else {
						var card = get.cardPile(function (card) {
							return get.suit(card) == 'club';
						})
						if (card) {
							player.gain(card, 'gain2');
						}
					}
				},
			}
		},
	},
	lao_badou: {
		audio: 'rejiushi',
		unique: true,
		group: ['lao_badou2', 'lao_badou3'],
		frequent: true,
		trigger: { player: ['useCard', 'respond'] },
		filter(event, player) {
			return event.card.name == 'jiu';
		},
		content() {
			var card = get.cardPile(function (card) {
				var t = get.type(card, 'trick')
				return t == 'trick' && t != 'delay';
			});
			if (card) {
				player.gain(card, 'gain2');
			}
		},
	},
	lao_badou2: {
		audio: 'rejiushi',
		usable: 1,
		enable: ['chooseToRespond', 'chooseToUse'],
		viewAs: {
			name: 'jiu',
		},
		selectCard: 1,
		position: 'h',
		viewAsFilter(player) {
			return player.countCards('h', { suit: 'club' });
		},
		filterCard(card) {
			return get.suit(card) == 'club';
		},
		prompt: '将一张梅花手牌当酒使用或打出',
	},
	lao_badou3: {
		audio: 'rejiushi',
		mod: {
			cardname(card, player, name) {
				if (card.name == 'zhuge') return 'jiu';
			},
			suit(card) {
				if (card.name == 'zhuge') return 'none';
			},
			cardUsable(card, player, num) {
				if (card.name == 'jiu' && card.suit == 'none') return Infinity;
			},
		},
		trigger: { player: 'useCard' },
		forced: true,
		filter(event, player) {
			return event.card.name == 'zhuge';
		},
		prompt: '将一张诸葛连弩当无色酒使用(无色酒无次数限制)',
		onuse(result, player) {
			var card = get.cardPile(function (card) {
				var t = get.type(card, 'trick')
				return t == 'trick' && t != 'delay';
			});
			if (card) {
				player.gain(card, 'gain2');
			}
		},
	},
	lao_qibu: {
		unique: true,
		mark: true,
		marktext: '步',
		frequent: true,
		intro: {
			name: '七步',
			content: 'mark',
		},
		trigger: { player: 'useCard' },
		filter(event, player) {
			let flag = false;
			flag = (get.type(event.card) == 'trick' && event.card.isCard);
			return (flag && player.countMark('lao_qibu') < 7);
		},
		content() {
			player.addMark('lao_qibu', 1);
		},
	},
	lao_chengshi: {
		audio: 'chengzhang',
		trigger: { global: 'phaseUseEnd' },
		forced: true,
		unique: true,
		juexingji: true,
		skillAnimation: true,
		animationColor: 'water',
		filter(event, player) {
			return player.countMark('lao_qibu') >= 7;
		},
		content() {
			'step 0'
			player.awakenSkill(event.name);
			player.removeSkill('lao_qibu');
			player.recover();
			player.addSkill('douqi');
			player.storage.lao_caigao_rewrite = true;

			'step 1'
			var maxValueDou = 0;
			game.filterPlayer(function (target) {
				if (target == player) {
					return false;
				}
				var att = get.attitude(_status.event.player, target);
				var valueDou = 0;
				if (att > 0) {
					if (target.isDamaged()) {
						valueDou += 2;
					}
					if (target.group == 'wei') {
						valueDou += 1;
					}
					valueDou += 1;
					if (valueDou > maxValueDou) {
						maxValueDou = valueDou;
					}
				}
				return false;
			});
			player.chooseTarget('令一名角色回复一点体力并获得“豆”标记', function (card, player, target) {
				return player != target;
			}).set('ai', function (target, targets) {
				if (target == player) {
					return false;
				}
				var att = get.attitude(_status.event.player, target);
				var valueDou = 0;
				if (att > 0) {
					valueDou += 1;
					if (target.isDamaged()) {
						valueDou += 2;
					}
					if (target.group == 'wei') {
						valueDou += 1;
					}
					if (valueDou == maxValueDou) {
						return true;
					}
				}
				return false;
			});

			'step 2'
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, 'green');
				target.storage.douqi = player;
				target.recover();
				target.addSkill('douqi');
			}
		},
	},
	douqi: {
		forced: true,
		mark: true,
		marktext: '豆',
		intro: {
			name: '豆萁',
			content: '手牌上限+1',
		},
		mod: {
			maxHandcard(player, num) {
				return 1 + num;
			}
		},
	},
	// 神董卓
	lao_cannue: {
		audio: 'olbaonue',
		forced: true,
		group: ['lao_cannue2', 'lao_cannue3', 'lao_cannue4'],
		marktext: '虐',
		trigger: {
			source: 'damageSource',
		},
		filter(event, player) {
			return event.num > 0 && player.countMark('lao_cannue') < 9;
		},
		intro: {
			name: '残虐',
			content: 'mark',
		},
		content() {
			player.addMark('lao_cannue', (trigger.num + player.countMark('lao_cannue') > 9 ? 9 - player.countMark('lao_cannue') : trigger.num));
		},
		ai: {
			threaten: 1,
		}
	},
	lao_cannue2: {
		audio: 2,
		forced: true,
		unique: true,
		mod: {
			cardname(card, player, name) {
				if (card.name == 'wugu') return 'nanman';
			},
		},
		trigger: { player: 'useCard' },
		filter(event, player) {
			return event.card.name == 'wugu';
		},
		prompt: '[五谷丰登]视为[南蛮入侵]',
	},
	lao_cannue3: {
		audio: 2,
		forced: true,
		unique: true,
		mod: {
			cardname(card, player, name) {
				if (card.name == 'taoyuan') return 'wanjian';
			},
		},
		trigger: { player: 'useCard' },
		filter(event, player) {
			return event.card.name == 'taoyuan';
		},
		prompt: '[桃园结义]视为[万箭齐发]',
	},
	lao_cannue4: {
		audio: 2,
		trigger: { player: 'useCardToPlayered', target: 'useCardToTargeted' },
		forced: true,
		filter(event, player) {
			return event.card.name == 'sha';
		},
		check(event, player) {
			return player == event.player;
		},
		content() {
			var id = (player == trigger.player ? trigger.target : player).playerid;
			var map = trigger.getParent().customArgs;
			if (!map[id]) map[id] = {};
			if (typeof map[id].shanRequired == 'number') {
				map[id].shanRequired++;
			}
			else {
				map[id].shanRequired = 2;
			}
		},
		ai: {
			directHit_ai: true,
			skillTagFilter(player, tag, arg) {
				if (arg.card.name != 'sha' || arg.target.countCards('h', 'shan') > 1) return false;
			},
		},
	},
	lao_xiehan: {
		forced: true,
		group: ['lao_xiehan2', 'lao_xiehan3'],
		trigger: { global: 'drawBegin' },
		filter(event, player) {
			return player != event.player && event.player != _status.currentPhase && event.num > 1;
		},
		content() {
			trigger.num--;
		},
		ai: {
			threaten: 1.2
		}
	},
	lao_xiehan2: {
		forced: true,
		trigger: { global: 'dieAfter' },
		filter(event, player) {
			return player.countMark('lao_cannue') >= 1;
		},
		content() {
			player.removeMark('lao_cannue', 1);
			// player.syncStorage('lao_cannue');
			player.gainMaxHp();
			player.draw(2);
			// player.recover();
		},
		ai: {
			threaten: 1.5
		}
	},
	lao_xiehan3: {
		forced: true,
		trigger: { global: 'phaseUseBefore' },
		filter(event, player) {
			return event.player.isAlive() && event.player.hasUseTarget({ name: 'jiu' }, null, true);
		},
		direct: true,
		preHidden: true,
		content() {
			'step 0'
			var controlOne = '1.摸一张牌，神董卓对你造成一点伤害，视为使用了一张【酒】';

			trigger.player.chooseToDiscard('hes', '1.弃置1张牌 或 2.摸一张牌，神董卓对你造成一点伤害，视为使用了一张【酒】').set('ai', function (card) {
				if (ui.selected.cards.length >= _status.event.getParent().num) return -1;
				if (get.damageEffect(trigger.player) > -1 && trigger.player.countCards('hs', 'sha')) return false;
				if (_status.event.res >= 0) return 6 - get.value(card);
				if (get.type(card) != 'basic') {
					return 10 - get.value(card);
				}
				return 8 - get.value(card);
			});
			'step 1'
			if (!result.bool) {
				trigger.player.draw();
				trigger.player.damage();
				trigger.player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay', 'nodelayx');
			}
		},
		ai: {
			threaten: 0,
			effect: {
				target(event, player, target) {
					if (get.tag(event, 'damage')) {
						if (player.hasSkillTag('jueqing', false, target)) return [0, -1];
						if (player.hp == 1) return [0, -1.5];
						if (player.hasSkill('lao_cannue', false, target) && player.hasSkill('lao_xiehan', false, target)) {
							if (player.hp == 2) return [0, -0.5];
							return [0, 2];
						}
						return [0, -1];
					}
				}
			}
		}
	},
	lao_huidu: {
		audio: 'olbaonue',
		forced: true,
		unique: true,
		trigger: { player: 'phaseJieshuEnd' },
		juexingji: true,
		skillAnimation: true,
		animationColor: 'metal',
		filter(event, player) {
			return player.countMark('lao_cannue') >= 6;
		},
		content() {
			'step 0'
			player.awakenSkill(event.name);
			player.removeMark('lao_cannue', 6);

			'step 1'
			var cards = [];
			while (cards.length < 70) {
				var card = get.cardPile(function (card) {
					var info = get.info(card, false);
					return !info.notarget && get.type2(card, 'trick') == 'trick';
				});
				if (card) {
					cards.push(card);
					game.cardsGotoOrdering([card]);
					card.remove();
				}
				else break;
			}
			if (!cards.length) event.finish();
			else {
				event.cards = cards;
				// game.cardsGotoOrdering(cards);

				for (var i of cards) {
					var info = lib.card[i.name];
					var list = game.filterPlayer(function (target) {
						return !target.isDead();
					});
					var source = list.randomGet();
					var list2 = Array.from(list);
					list2.splice(list2.indexOf(source), 1);
					var target = list2.randomGet();
					if (info.selectTarget != undefined) {
						if (Array.isArray(info.selectTarget)) {
							if (info.selectTarget[0] < 0) {
								if (i.name == 'shandian') {
									source.useCard(i, source);
								} else {
									source.useCard(i);
								}
								// game.log(source,'使用了',i.name);
							} else {
								var targets = [];
								targets.push(target);
								list2.splice(list2.indexOf(target), 1);
								var target2 = list2.randomGet();
								targets.push(target2);
								source.useCard(i, targets);
							}
							game.delay(0.3);
						}
						else if (info.selectTarget < 0) {
							switch (i.name) {
								case 'wuzhong':
								case 'shandian':
									source.useCard(i, source);
									game.delay(0.3);
									break;
								case 'wugu':
									if (source != player) {
										source.useCard(i, list);
									} else {
										var wunan = i;
										wunan.name = 'nanman';
										source.useCard(wunan, list2);
									}
									game.delay(0.3);
									break;
								case 'taoyuan':
									if (source != player) {
										source.useCard(i, list);
									} else {
										var taowan = i;
										taowan.name = 'wanjian';
										source.useCard(taowan, list2);
									}
									game.delay(0.3);
									break;
								default:
									source.useCard(i, list2);
									game.delay(0.3);
							}
						}
						else if (i.name == 'jiedao') {
							list2.splice(list2.indexOf(target), 1);
							var target2 = list2.randomGet();
							var targets = [];
							targets.push(target);
							targets.push(target2);
							source.useCard(i, targets);
							game.delay(0.3);
						}
						else {
							source.useCard(i, target);
							game.delay(0.3);
						}
					}
				}
			}
			game.log('毁都使用了', cards.length, '张锦囊牌，如下：', cards);

			'step 2'
			let huiduMaxhp = 4;
			let cannueNum = player.countMark('lao_cannue');
			if (cannueNum >= huiduMaxhp * 2)
				event.finish();
			if (cannueNum >= 2) {
				let reducedCannueNum = Math.floor(cannueNum / 2);
				player.removeMark('lao_cannue', reducedCannueNum * 2);
				huiduMaxhp -= reducedCannueNum;
			}
			player.loseMaxHp(huiduMaxhp);
		},
	},
	// 神鲁肃
	diying: {
		audio: 'olhaoshi',
		enable: 'phaseUse',
		usable: 1,
		content() {
			'step 0'
			player.chooseTarget('选择一名角色获得〖弘德〗〖弼政〗〖博图〗〖诫训〗〖缔盟〗〖决堰〗中的一个，直到其回合结束。').set('ai', function (target) {
				var att = get.attitude(_status.event.player, target);
				if (att > 0) {
					return true;
				} else if (target == player) {
					return true;
				} else {
					return false;
				}
			});

			'step 1'
			if (result.bool) {
				var list = ['hongde', 'bizheng', 'rebotu', 'jiexun', 'oldimeng', 'drlt_jueyan'];
				var diyingSkill = list.randomGet();
				var target = result.targets[0];
				if (!target.hasSkill(diyingSkill)) {
					target.addTempSkill(diyingSkill, { player: 'phaseAfter' });
					target.popup('获得技能');
					target.popup(diyingSkill);
				} else {
					target.popup('已有技能');
					target.popup(diyingSkill);
				}
			}
		},
		ai: {
			order: 10,
			result: {
				player(player, target) {
					return 5;
				}
			},
			threaten: 1,
		}
	},
	lao_fusheng: {
		trigger: { target: 'useCardToBefore' },
		forced: true,
		priority: 15,
		filter(event, player) {
			return event.card && event.card.name == 'sha' && event.card.suit == 'heart';
		},
		content() {
			trigger.cancel();
		},
		ai: {
			effect: {
				target(card, player, target) {
					if (card && card.name == 'sha' && card.suit == 'heart') return 'zerotarget';
				},
			}
		},
	},
	lao_chiyan: {
		trigger: { player: 'phaseDiscardEnd' },
		direct: true,
		filter(event, player) {
			var cards = [];
			player.getHistory('lose', function (evt) {
				if (evt.type == 'discard' && evt.getParent('phaseDiscard') == event) cards.addArray(evt.cards2);
			});
			return cards.length >= 2;
		},
		content() {
			'step 0'
			player.chooseTarget(get.prompt('lao_chiyan'), '对一名其他角色造成1点火属性伤害').set('ai', target => {
				var player = _status.event.player;
				return get.damageEffect(target, player, player, 'fire');
			});
			'step 1'
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, 'fire');
				target.damage(1, 'fire');
			}
		},
		ai: {
			expose: 0.2,
			threaten: 2
		}
	},
	lao_lianmeng: {
		audio: 'oldimeng',
		enable: 'phaseUse',
		usable: 1,
		filterCard: true,
		selectCard: 2,
		discard: false,
		lose: false,
		delay: 0,
		filterTarget(card, player, target) {
			return player != target;
		},
		filter(event, player) {
			return player.countCards('h') >= 2;
		},
		check(card) {
			if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') return 0;
			if (!ui.selected.cards.length && card.name == 'du') return 20;
			var player = get.owner(card);
			if (ui.selected.cards.length >= Math.max(2, player.countCards('h') - player.hp)) return 0;
			if (player.hp == player.maxHp || player.countCards('h') <= 1) {
				var players = game.filterPlayer();
				for (var i = 0; i < players.length; i++) {
					if (players[i].hasSkill('haoshi') &&
						!players[i].isTurnedOver() &&
						!players[i].hasJudge('lebu') &&
						get.attitude(player, players[i]) >= 3 &&
						get.attitude(players[i], player) >= 3) {
						return 11 - get.value(card);
					}
				}
				if (player.countCards('h') > player.hp) return 10 - get.value(card);
				if (player.countCards('h') >= 2) return 8 - get.value(card);
			}
			return 10 - get.value(card);
		},
		content() {
			// player.line(target, 'green');
			player.give(cards, target);
			player.draw(3);
		},
		ai: {
			order(skill, player) {
				if (player.hp < player.maxHp && player.countCards('h') > 1) {
					return 10;
				}
				return 4;
			},
			result: {
				target(player, target) {
					if (target.hasSkillTag('nogain')) return 0;
					if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
						if (target.hasSkillTag('nodu')) return 0;
						return -10;
					}
					if (target.hasJudge('lebu')) return 0;
					var nh = target.countCards('h');
					var np = player.countCards('h');
					if (player.hp == player.maxHp || player.countCards('h') <= 1) {
						if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
					}
					return Math.max(1, 5 - nh);
				}
			},
			effect: {
				target(card, player, target) {
					if (player == target && get.type(card) == 'equip') {
						if (player.countCards('e', { subtype: get.subtype(card) })) {
							if (game.hasPlayer(function (current) {
								return current != player && get.attitude(player, current) > 0;
							})) {
								return 0;
							}
						}
					}
				}
			},
			threaten: 0.8
		},
	},
	// 神徐盛
	kuijun: {
		audio: 'decadepojun',
		trigger: { player: 'useCardToPlayered' },
		direct: true,
		filter(event, player) {
			return event.card.name == 'sha' && event.target.countCards('h') > 0;
		},
		content() {
			'step 0'
			trigger.target.addTempSkill('fengyin');
			player.chooseCardTarget({
				position: 'hes',
				filterCard: true,
				filterTarget: trigger.target,
				prompt: '将一张牌交给目标角色',
				ai1(card) {
					var goon = false, player = _status.event.player;
					if (get.attitude(trigger.target, player) < 0 && get.attitude(player, trigger.target) < 0) {
						var cards = trigger.target.getCards('h');
						if (cards.length + 1 > player.hp) {
							goon = true;
						}
					}
					if (goon) {
						return get.suit(card, false) == get.suit(trigger.card, false) && (8 - get.value(card)) > 0;
					}
					return false;
				},
				ai2(target) {
					return -get.attitude(_status.event.player, target);
				},
			});
			'step 1'
			if (result.bool) {
				var target = result.targets[0];
				player.line(target, 'green');
				player.give(result.cards, target);
			}
			'step 2'
			trigger.target.showHandcards();
			var cards = trigger.target.getCards('h');
			if (cards.length > player.hp) {
				trigger.directHit.add(trigger.target);
			}
		},
		group: ['kuijun_effect', 'kuijun_double'],
		ai: {
			unequip_ai: true,
			directHit_ai: true,
			threaten: 0.5,
			skillTagFilter(player, tag, arg) {
				if (get.attitude(player, arg.target) > 0) return false;
				if (tag == 'directHit_ai') return player.hp < arg.target.countCards('h');
				return false;
			}
		},
		subSkill: {
			double: {
				trigger: { player: 'useCard2' },
				filter(event, player) {
					if (event.card.name != 'sha') return false;
					return game.hasPlayer(function (current) {
						return !event.targets.contains(current) && current.getEquips(2).length > 0 && current != player;
					});
				},
				direct: true,
				content() {
					'step 0'
					player.chooseTarget(get.prompt('kuijun'), '为' + get.translation(trigger.card) + '增加一个目标', function (card, player, target) {
						return !_status.event.sourcex.contains(target) && target.getEquips(2).length > 0 && player != target;
					}).set('sourcex', trigger.targets).set('ai', function (target) {
						var player = _status.event.player;
						return get.effect(target, _status.event.card, player, player);
					}).set('card', trigger.card);
					'step 1'
					if (result.bool) {
						if (!event.isMine() && !event.isOnline()) game.delayx();
						event.target = result.targets[0];
					}
					else {
						event.finish();
					}
					'step 2'
					player.logSkill('kuijun', event.target);
					trigger.targets.push(event.target);
				},
				ai: {
					effect: {
						player(card, player, target, current, isLink) {
							if (!isLink && card.name == 'sha') {
								if (player._kuijuntmp) return;
								player._kuijuntmp = true;
								if (get.effect(target, card, player, player) <= 0) {
									delete player._kuijuntmp;
									return;
								}
								if (game.hasPlayer(function (current) {
									return current != target && current.getEquips(2).length > 0 &&
										player.canUse(card, current) && get.effect(current, card, player, player) > 0;
								})) {
									delete player._kuijuntmp;
									return [1, 1];
								}
								delete player._kuijuntmp;
							}
						}
					}
				}
			},
			effect: {
				audio: 'repojun',
				trigger: { source: 'damageBegin1' },
				forced: true,
				locked: false,
				logTarget: 'player',
				filter(event, player) {
					var target = event.player;
					return event.getParent().name == 'sha' && target.countCards('h') > 0;
				},
				content() {
					var cards = trigger.player.getCards('h');
					for (let i = 0; i < cards.length; i++) {
						if (get.suit(cards[i], false) == get.suit(trigger.card, false)) {
							if (trigger.num < trigger.player.maxHp) {
								trigger.num++;
							}
						}
					}
				},
			}
		},
	},

	// others

};

export default skills;
