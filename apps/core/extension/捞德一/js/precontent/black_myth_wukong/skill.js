import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';

/** @type { importCharacterConfig['skill'] } */
const skills = {
	// 天命人
	wukong_tianming: {
		derivation: ['wukong_dingshenfa', 'wukong_anshenfa', 'wukong_jinzifa', 'wukong_juxingsanqi', 'wukong_tongtoutiebi', 'wukong_shenwaishenfa', 'wukong_jiuminghaomao'],
		trigger: { global: 'phaseBefore', player: 'enterGame' },
		forced: true,
		unique: true,
		filter: function (event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0);
		},
		content() {
			'step 0'
			let skills = [['wukong_dingshenfa', 'wukong_anshenfa', 'wukong_jinzifa'], ['wukong_juxingsanqi', 'wukong_tongtoutiebi'], ['wukong_shenwaishenfa', 'wukong_jiuminghaomao']];
			let switchToAuto = function () {
				_status.imchoosing = false;
				event._result = {
					bool: true,
					skills: [],
				};
				try {
					let randomNum = Math.random() * 3;
					if (randomNum < 1) {
						event._result.skills = ['wukong_jinzifa', 'wukong_jiuminghaomao']
					} else {
						randomNum = Math.floor(Math.random() * 8);
						switch (randomNum) {
							case 0:
								event._result.skills = ['wukong_dingshenfa', 'wukong_juxingsanqi', 'wukong_shenwaishenfa'];
								break;
							case 1:
								event._result.skills = ['wukong_dingshenfa', 'wukong_juxingsanqi', 'wukong_jiuminghaomao'];
								break;
							case 2:
								event._result.skills = ['wukong_dingshenfa', 'wukong_tongtoutiebi', 'wukong_shenwaishenfa'];
								break;
							case 3:
								event._result.skills = ['wukong_dingshenfa', 'wukong_tongtoutiebi', 'wukong_jiuminghaomao'];
								break;
							case 4:
								event._result.skills = ['wukong_anshenfa', 'wukong_juxingsanqi', 'wukong_shenwaishenfa'];
								break;
							case 5:
								event._result.skills = ['wukong_anshenfa', 'wukong_juxingsanqi', 'wukong_jiuminghaomao'];
								break;
							case 6:
								event._result.skills = ['wukong_anshenfa', 'wukong_tongtoutiebi', 'wukong_shenwaishenfa'];
								break;
							case 7:
								event._result.skills = ['wukong_anshenfa', 'wukong_tongtoutiebi', 'wukong_jiuminghaomao'];
								break;
							default:
						}
					}
				} catch (e) { alert(e.message) }
				if (event.dialog) event.dialog.close();
				if (event.control) event.control.close();
			};
			let chooseButton = function (skills) {
				let event = _status.event;
				if (!event._result) event._result = {};
				event._result.skills = [];
				let rSkill = event._result.skills;
				let dialog = ui.create.dialog('请选择每行获得的一个技能<br>（【禁字法】与【救命毫毛】外的其他技能冲突）', 'hidden');
				event.dialog = dialog;
				for (let i = 0; i < skills.length; i++) {
					let table = document.createElement('div');
					table.classList.add('add-setting');
					table.style.margin = '0';
					table.style.width = '100%';
					table.style.position = 'relative';
					for (let j = 0; j < skills[i].length; j++) {
						let td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
						td.link = skills[i][j];
						table.appendChild(td);
						td.innerHTML = '<span>' + get.translation(skills[i][j]) + '</span>';
						td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
							if (_status.dragged) return;
							if (_status.justdragged) return;
							_status.tempNoButton = true;
							setTimeout(function () {
								_status.tempNoButton = false;
							}, 500);
							let link = this.link;
							if (!this.classList.contains('bluebg')) {
								if (rSkill.length >= 1) {
									if (rSkill.length == 1 && rSkill.includes('wukong_jiuminghaomao')) {

									} else if (skills[i][j] == 'wukong_jinzifa') {
										return;
									}
									if (rSkill.includes('wukong_dingshenfa') || rSkill.includes('wukong_anshenfa')) {
										if (i == 0) return;
									}
									if (rSkill.includes('wukong_juxingsanqi') || rSkill.includes('wukong_tongtoutiebi')) {
										if (i == 1) return;
									}
									if (rSkill.includes('wukong_shenwaishenfa') || rSkill.includes('wukong_jiuminghaomao')) {
										if (i == 2) return;
									}
								}
								if (rSkill.includes('wukong_jinzifa')) {
									if (skills[i][j] != 'wukong_jiuminghaomao')
										return;
								}
								if (rSkill.length >= 3) return;
								rSkill.add(link);
								this.classList.add('bluebg');
							}
							else {
								this.classList.remove('bluebg');
								rSkill.remove(link);
							}
						});
					}
					dialog.content.appendChild(table);
				}
				dialog.add('　　');
				dialog.open();

				event.switchToAuto = function () {
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing = false;
				};
				event.control = ui.create.control('ok', function (link) {
					event.dialog.close();
					event.control.close();
					game.resume();
					_status.imchoosing = false;
				});
				for (let i = 0; i < event.dialog.buttons.length; i++) {
					event.dialog.buttons[i].classList.add('selectable');
				}
				game.pause();
				game.countChoose();
			};
			if (event.isMine()) {
				chooseButton(skills);
			}
			else if (event.isOnline()) {
				event.player.send(chooseButton, skills);
				event.player.wait();
				game.pause();
			}
			else {
				switchToAuto();
			}
			'step 1'
			let map = event.result || result;
			if (map?.skills?.length) player.addSkills(map.skills);
		},
	},
	wukong_dingshenfa: {
		trigger: { player: 'phaseBegin' },
		frequent: true,
		async content(content, trigger, player) {
			const result = await player.chooseTarget('请选择【定身法】的目标', '令其本回合的下一张牌无效',
				function (card, player, target) {
					return player != target;
				},).set('ai', function (target) {
					return 1 - get.attitude(get.player(), target);
				}).forResult();
			if (result.bool) {
				result.targets[0].addTempSkill('wukong_dingshenfa_effect');
			}
		},
		subSkill: {
			effect: {
				forced: true,
				mark: true,
				marktext: '定',
				intro: {
					name: '定身',
					content: '本回合使用的下一张牌无效',
				},
				trigger: {
					player: 'useCard',
				},
				async content(event, trigger, player) {
					trigger.all_excluded = true;
					trigger.targets.length = 0;
					player.removeSkill('wukong_dingshenfa_effect');
				}
			}
		},
	},
	wukong_anshenfa: {
		trigger: { player: 'phaseBegin' },
		frequent: true,
		content() {
			if (player.countCards('j'))
				player.discardPlayerCard(player, 'j');
			else
				player.draw();
		}
	},
	wukong_jinzifa: {
		trigger: { global: 'phaseBefore', player: 'enterGame' },
		forced: true,
		unique: true,
		filter: function (event, player) {
			return (event.name != 'phase' || game.phaseNumber == 0);
		},
		content() {
			// player.gainMaxHp();
			// player.recover();
		},
		group: ['wukong_jinzifa_yingzi', 'wukong_jinzifa_paoxiao'],
		subSkill: {
			yingzi: {
				trigger: { player: 'phaseDrawBegin2' },
				forced: true,
				filter(event, player) {
					return !event.numFixed;
				},
				async content(event, trigger, player) {
					trigger.num++;
				},
			},
			paoxiao: {
				mod: {
					cardUsable(card, player, num) {
						if (get.name(card, player) == 'sha') return num + 1;
					},
				},
				forced: true,
				usable: 1,
				trigger: { source: 'damageBegin1' },
				filter(event, player) {
					return event.card && event.card.name == 'sha' && event.notLink();
				},
				content() {
					trigger.num++;
				},
			}
		},
	},
	wukong_juxingsanqi: {
		trigger: { target: 'useCardToBefore' },
		filter(event, player) {
			return !player.hasSkill('wukong_juxingsanqi_round') && event.getParent('useCard').cards.some(card => {
				return get.tag(card, 'damage');
			});
		},
		content() {
			'step 0'
			trigger.cancel();
			'step 1'
			player.addTempSkill('wukong_juxingsanqi_round', 'roundStart');
			player.addTempSkill('wukong_juxingsanqi_tieji', { player: 'phaseEnd' });
			'step 2'
			player.chooseToUse(function (card, player, event) {
				if (get.name(card) != 'sha') return false;
				return lib.filter.filterCard.apply(this, arguments);
			}, '是否对' + get.translation(trigger.player) + '使用一张杀').set('filterTarget', function (card, player, target) {
				return target == trigger.player;
			});
		},
		subSkill: {
			round: { charlotte: true },
			tieji: {
				mark: true,
				intro: {
					name: '聚形散气',
					content: '下一张【杀】不可被响应',
				},
				forced: true,
				trigger: { player: 'useCardToPlayered' },
				check(event, player) {
					return get.attitude(player, event.target) <= 0;
				},
				filter(event, player) {
					return event.card.name == 'sha';
				},
				logTarget: 'target',
				preHidden: true,
				content() {
					trigger.getParent().directHit.add(trigger.target);
					player.removeSkill('wukong_juxingsanqi_tieji');
				},
				ai: {
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						if (get.attitude(player, arg.target) > 0 || arg.card.name != 'sha') return false;
					},
				},
			},
		}
	},
	wukong_tongtoutiebi: {
		trigger: {
			player: ['useCard', 'respond'],
		},
		usable: 1,
		filter(event, player) {
			if (!event.respondTo) return false;
			return event.getParent('useCard').cards.some(card => {
				return get.tag(card, 'damage');
			});
		},
		frequent: true,
		content() {
			var card = get.cardPile(function (card) {
				return card.name == 'sha';
			});
			if (card) player.gain(card, 'gain2');
		},
	},
	wukong_shenwaishenfa: {
		unique: true,
		enable: 'phaseUse',
		mark: true,
		marktext: '毛',
		limited: true,
		skillAnimation: true,
		animationColor: 'thunder',
		content() {
			'step 0'
			player.awakenSkill('wukong_shenwaishenfa');
			'step 1'
			player.addTempSkill('wukong_shenwaishenfa_effect');
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
						if (hs * 2 >= ts) return hs;
					}
					return 0;
				},
			},
		},
		subSkill: {
			effect: {
				mark: true,
				marktext: '毛',
				intro: {
					name: '身外神法',
					content: '已发动',
				},
				trigger: { player: 'useCardToPlayered' },
				filter(event, player) {
					if (!event.isFirstTarget) return false;
					if (event.getParent(3).name == 'wukong_pigun_effect') return true;
					if (event.getParent(3).name == 'wukong_ligun_effect') return true;
					if (event.getParent(3).name == 'wukong_chuogun_effect') return true;
					return _status.currentPhase == player && event.cards.some(card => {
						return get.tag(card, 'damage');
					});
				},
				forced: true,
				async content(event, trigger, player) {
					trigger.getParent().effectCount += 1;
				},
			},
		},
	},
	wukong_jiuminghaomao: {
		unique: true,
		trigger: { player: 'dying' },
		mark: true,
		marktext: '毫',
		limited: true,
		skillAnimation: true,
		animationColor: 'thunder',
		content() {
			'step 0'
			player.awakenSkill('wukong_jiuminghaomao');
			'step 1'
			player.recover(player.maxHp - player.hp);
			'step 2'
			let roundNumber = game.roundNumber;
			let randomNum = Math.floor(Math.random() * roundNumber);
			if (randomNum < 1) {
				player.restoreSkill('wukong_jiuminghaomao');
				game.log(player, '复原了技能', '#g【救命毫毛】', '（本次几率为：1/', roundNumber, '）');
			}
		},
	},
	wukong_gunshi: {
		marktext: '势',
		intro: {
			name: '棍势',
			content: 'mark',
		},
		trigger: { source: 'damageSource' },
		forced: true,
		locked: false,
		filter(event, player) {
			if (player.countMark('wukong_gunshi') >= 4) return false;
			if (event.getParent(4).name == 'wukong_pigun_effect' || event.getParent(4).skill == 'wukong_pigun_effect')
				return false;
			if (event.getParent(2).name == 'wukong_ligun_effect' || event.getParent(2).skill == 'wukong_ligun_effect')
				return false;
			if (event.getParent().name == 'wukong_ligun_buff') {
				return true;
			}
			if (event.getParent(4).name == 'wukong_chuogun_effect' || event.getParent(4).skill == 'wukong_chuogun_effect')
				return false;
			if (event.getParent(4).name == 'wukong_chuogun_buff' || event.getParent(4).skill == 'wukong_chuogun_buff')
				return false;
			return event.card && event.card.name == 'sha' && event.num > 0;
		},
		content() {
			player.addMark('wukong_gunshi', 1);
		},
		group: ['wukong_gunshi_1', 'wukong_gunshi_2'],
		subSkill: {
			1: {
				enable: 'phaseUse',
				usable: 3,
				content() {
					'step 0'
					try {
						let cards = player.getCards('h', 'sha'),
							list = [];
						if (cards.length) {
							player.discard(cards);
							if (player.storage.gunshi1Num == undefined) {
								player.storage.gunshi1Num = 0;
							}
							player.storage.gunshi1Num += cards.length;
						}
						// player.addMark('wukong_gunshi', cards.length);
						if (player.hasSkill('wukong_pigun')) list.push('wukong_pigun');
						if (player.hasSkill('wukong_ligun')) list.push('wukong_ligun');
						if (player.hasSkill('wukong_chuogun')) list.push('wukong_chuogun');
						player.chooseControl(list).set('prompt', '选择1个“棍法”').set('ai', function () {
							return 'wukong_pigun';
						});
					} catch (e) { alert(e.message) }
					'step 1'
					if (result.control) {
						player.storage.wukong_gunfa = result.control;
						if (!player.hasSkill('wukong_gunfa')) {
							player.addSkill('wukong_gunfa');
						}
						player.addTip('wukong_gunfa', get.translation(player.storage.wukong_gunfa));
					}
				},
				ai: {
					order: 2,
					result: {
						player(player) {
							if (!player.hasSkill('wukong_gunfa')) {
								return 1;
							}
							if (player.hasSkill('wukong_gunfa') && (player.countCards('h', { name: 'sha' }) == 0)) {
								return 0;
							}
							return player.countMark('wukong_gunshi') < 4 ? 1 : 0;
						},
					},
				},
			},
			2: {
				trigger: { player: 'phaseEnd' },
				forced: true,
				filter(event, player) {
					if (player.countMark('wukong_gunshi') >= 4) return false;
					if (!player.storage.gunshi1Num) return false;
					return true;
				},
				content() {
					'step 0'
					if (player.countMark('wukong_gunshi') + player.storage.gunshi1Num >= 4) {
						player.addMark('wukong_gunshi', 4 - player.countMark('wukong_gunshi'));
					} else {
						player.addMark('wukong_gunshi', player.storage.gunshi1Num);
					}
					'step 1'
					player.storage.gunshi1Num = 0;
				},
			},
			lose: {
				trigger: { global: 'phaseUseEnd' },
				filter(event, player) {
					return player.countMark('wukong_gunshi') > 0;
				},
				forced: true,
				content() {
					player.removeMark('wukong_gunshi', 1);
				},
			},
		}
	},
	wukong_gunfa: {
		init(player) {
			if (!player.storage.wukong_gunfa) {
				player.storage.wukong_gunfa = 'wukong_pigun';
			}
		},
		intro: {
			name: '棍法',
			content(storage, player) {
				return '当前棍法为：' + get.translation(player.storage.wukong_gunfa);
			},
		},
	},
	wukong_pigun: {
		derivation: 'wukong_pigun_notes',
		trigger: { player: 'phaseUseBegin' },
		usable: 1,
		filter(event, player) {
			return player.storage.wukong_gunfa == 'wukong_pigun';
		},
		prompt2: '将“劈棍”切换为其他“棍法”',
		content() {
			'step 0'
			try {
				let list = [];
				// if (player.hasSkill('wukong_pigun')) list.push('wukong_pigun');
				if (player.hasSkill('wukong_ligun')) list.push('wukong_ligun');
				if (player.hasSkill('wukong_chuogun')) list.push('wukong_chuogun');
				player.chooseControl(list, 'cancel2').set('prompt', '选择切换的“棍法”').set('ai', function () {
					return 'wukong_pigun';
				});
			} catch (e) { alert(e.message) }
			'step 1'
			if (result.control && result.control != 'cancel2') {
				player.storage.wukong_gunfa = result.control;
				if (!player.hasSkill('wukong_gunfa')) {
					player.addSkill('wukong_gunfa');
				}
				player.addTip('wukong_gunfa', get.translation(player.storage.wukong_gunfa));
			}
		},
		group: ['wukong_pigun_effect', 'wukong_pigun_qieshou'],
		subSkill: {
			effect: {
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					return player.countMark('wukong_gunshi') > 0 && player.storage.wukong_gunfa == 'wukong_pigun';
				},
				async content(event, trigger, player) {
					player.storage.gunshiNum = player.countMark('wukong_gunshi');
					switch (player.storage.gunshiNum) {
						case 1:
							const result1 = await player.chooseUseTarget({ name: 'sha', nature: 'thunder' }, false).forResult();
							if (result1.bool) {
								await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
								player.storage.gunshiNum = 0;
							}
							break;
						case 2:
							const result2 = await player.chooseUseTarget({ name: 'sha', nature: 'thunder' }, false).forResult();
							if (result2.bool) {
								await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
								player.storage.gunshiNum = 0;
								if (game.hasPlayer2(function (current) {
									return current.getHistory('damage', function (evt) {
										return evt.getParent(4) == event;
									}).length > 0
								})
								) {
									result2.targets.forEach(target => {
										let cards = target.getCards('he', function (card) {
											return lib.filter.cardDiscardable(card, target, 'wukong_pigun_effect');
										});
										if (cards.length > 0) target.discard(cards.randomGet());
									});
								}
							}
							break;
						case 3:
							const result3 = await player
								.chooseTarget('选择雷杀的目标', function (card, player, target) {
									return target != player && player.inRange(target) && player.canUse({ name: 'sha', nature: 'thunder' }, target, false);
								})
								.set('ai', function (target) {
									let player = get.player(),
										card = { name: 'sha', nature: 'thunder' };
									return get.effect(target, card, player, player);
								})
								.forResult();
							if (result3.bool) {
								await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
								player.storage.gunshiNum = 0;
								const targets = result3.targets;
								let directHit = [];
								directHit.addArray(targets);
								const result33 = await player.useCard({ name: 'sha', nature: 'thunder' }, targets, false).set('directHit', directHit).forResult();
								if (result33.bool) {
									if (game.hasPlayer2(function (current) {
										return current.getHistory('damage', function (evt) {
											return evt.getParent(3) == event;
										}).length > 0
									})
									) {
										targets.forEach(target => {
											let cards = target.getCards('he', function (card) {
												return lib.filter.cardDiscardable(card, target, 'wukong_pigun_effect');
											});
											if (cards.length > 0) target.discard(cards.randomGet());
										});
									}
								}
							}
							break;
						case 4:
							const result4 = await player
								.chooseTarget('选择雷杀的目标', function (card, player, target) {
									return target != player && player.inRange(target) && player.canUse({ name: 'sha', nature: 'thunder' }, target, false);
								})
								.set('ai', function (target) {
									let player = get.player(),
										card = { name: 'sha', nature: 'thunder' };
									return get.effect(target, card, player, player);
								})
								.forResult();
							if (result4.bool) {
								await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
								player.storage.gunshiNum = 0;
								const targets = result4.targets;
								let directHit = [],
									baseDamage = 2;
								directHit.addArray(targets);
								const result44 = await player.useCard({ name: 'sha', nature: 'thunder' }, targets, false).set('directHit', directHit).set('baseDamage', baseDamage).forResult();
								if (result44.bool) {
									if (game.hasPlayer2(function (current) {
										return current.getHistory('damage', function (evt) {
											return evt.getParent(3) == event;
										}).length > 0
									})
									) {
										targets.forEach(target => {
											let cards = target.getCards('he', function (card) {
												return lib.filter.cardDiscardable(card, target, 'wukong_pigun_effect');
											});
											if (cards.length > 0) target.discard(cards.randomGet());
										});
									}
								}
							}
							break;
						default:
					}
				},
				ai: {
					order: () => get.order({ name: 'sha' }) - 0.1,
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
				},
			},
			qieshou: {
				trigger: { global: 'phaseUseBefore' },
				prompt2: '其他角色出牌阶段开始前，你可以选择是否发动“识破斩棍”。若你发动“识破斩棍”，你于其出牌阶段结束时，失去1枚“棍势”标记；当其于出牌阶段对你使用伤害牌时，你令此效果无效，然后你可以对使用者使用1张雷【杀】，其结束出牌阶段。',
				filter(event, player) {
					return player != event.player && player.countMark('wukong_gunshi') > 0 && player.storage.wukong_gunfa == 'wukong_pigun';
				},
				check(event, player) {
					if (get.attitude(player, event.player) < -2 && player.countMark('wukong_gunshi') > 1) {
						return event.player.inRange(player);
					}
					return false;
				},
				content() {
					player.addTempSkill('wukong_gunshi_lose');
					trigger.player.addTempSkill('wukong_pigun_debuff');
				},
			},
			debuff: {
				trigger: { player: 'useCard' },
				filter(event, player) {
					return _status.currentPhase == player && event.targets.some(i => i.hasSkill('wukong_gunshi_lose')) && event.cards.some(card => {
						return get.tag(card, 'damage');
					});
				},
				forced: true,
				async content(event, trigger, player) {
					const targets = await trigger.targets.filter(target => target.hasSkill('wukong_gunshi_lose'));
					if (targets) {
						trigger.targets.length = 0;
						trigger.all_excluded = true;

						for (let target of targets) {
							const result = await target.chooseControl('ok', 'cancel2').set('prompt', '是否视为对' + get.translation(player) + '使用一张雷杀').forResult();
							if (result.control != 'cancel2') {
								target.useCard({ name: 'sha', nature: 'thunder' }, player);
							}
						}
						let evt = event.getParent('phaseUse');
						if (evt?.player == player) evt.skipped = true;
					}
				},
			}
		},
	},
	wukong_ligun: {
		derivation: 'wukong_ligun_notes',
		trigger: { player: 'phaseUseBegin' },
		usable: 1,
		filter(event, player) {
			return player.storage.wukong_gunfa == 'wukong_ligun';
		},
		prompt2: '将“立棍”切换为其他“棍法”',
		content() {
			'step 0'
			try {
				let list = [];
				if (player.hasSkill('wukong_pigun')) list.push('wukong_pigun');
				// if (player.hasSkill('wukong_ligun')) list.push('wukong_ligun');
				if (player.hasSkill('wukong_chuogun')) list.push('wukong_chuogun');
				player.chooseControl(list, 'cancel2').set('prompt', '选择切换的“棍法”').set('ai', function () {
					return 'wukong_pigun';
				});
			} catch (e) { alert(e.message) }
			'step 1'
			if (result.control && result.control != 'cancel2') {
				player.storage.wukong_gunfa = result.control;
				if (!player.hasSkill('wukong_gunfa')) {
					player.addSkill('wukong_gunfa');
				}
				player.addTip('wukong_gunfa', get.translation(player.storage.wukong_gunfa));
			}
		},
		group: ['wukong_ligun_effect', 'wukong_ligun_qieshou'],
		subSkill: {
			effect: {
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					return player.countMark('wukong_gunshi') > 0 && player.storage.wukong_gunfa == 'wukong_ligun';
				},
				async content(event, trigger, player) {
					player.storage.gunshiNum = player.countMark('wukong_gunshi');
					if (player.storage.gunshiNum >= 1) player.addSkill('wukong_ligun_1');
					if (player.storage.gunshiNum >= 2) player.addSkill('wukong_ligun_2');
					if (player.storage.gunshiNum >= 3) player.addSkill('wukong_ligun_3');
					if (player.storage.gunshiNum >= 4) player.addSkill('wukong_ligun_4');
					player.removeMark('wukong_gunshi', player.storage.gunshiNum);
				},
			},
			1: {
				mark: true,
				intro: {
					name: '立棍',
					content(storage, player) {
						let str = '立棍的下一张【杀】不可被响应';
						if (player.hasSkill('wukong_ligun_2')) str += '且无距离限制';
						if (player.hasSkill('wukong_ligun_3')) str += '，此【杀】无视目标角色的防具';
						if (player.hasSkill('wukong_ligun_4')) str += '，且伤害+1';
						return str;
					},
				},
				forced: true,
				priority: 11,
				trigger: { player: 'useCardToPlayered' },
				check(event, player) {
					return get.attitude(player, event.target) <= 0;
				},
				filter(event, player) {
					return event.card.name == 'sha' && player.storage.wukong_gunfa == 'wukong_ligun';
				},
				logTarget: 'target',
				preHidden: true,
				content() {
					'step 0'
					trigger.getParent().directHit.add(trigger.target);
					trigger.getParent().skill = 'wukong_ligun_effect';
					'step 1'
					player.removeSkill('wukong_ligun_1');
					if (player.hasSkill('wukong_ligun_2')) player.removeSkill('wukong_ligun_2');
				},
				ai: {
					directHit_ai: true,
					skillTagFilter(player, tag, arg) {
						if (get.attitude(player, arg.target) > 0 || arg.card.name != 'sha') return false;
					},
				},
			},
			2: {
				mod: {
					targetInRange(card, player) {
						if (get.name(card, player) == 'sha' && player.storage.wukong_gunfa == 'wukong_ligun') return true;
					},
				},
			},
			3: {
				trigger: { player: 'useCardToPlayered' },
				filter(event, player) {
					if (event.card.name != 'sha') return false;
					return player.getHistory('useCard', function (evt) {
						return evt.card.name == 'sha';
					}).indexOf(event.getParent()) == 0 && player.storage.wukong_gunfa == 'wukong_ligun';
				},
				forced: true,
				priority: 13,
				logTarget: 'targets',
				content() {
					for (var target of trigger.targets) {
						target.addTempSkill('qinggang2');
						target.storage.qinggang2.add(trigger.card);
					}
					player.removeSkill('wukong_ligun_3');
				},
			},
			4: {
				trigger: { source: 'damageBegin1' },
				forced: true,
				priority: 14,
				filter(event, player) {
					return event.card && event.card.name == 'sha' && event.notLink() && player.storage.wukong_gunfa == 'wukong_ligun';
				},
				content() {
					trigger.num++;
					player.removeSkill('wukong_ligun_4');
				},
			},
			qieshou: {
				trigger: { global: 'phaseUseBefore' },
				prompt2: '其他角色出牌阶段开始前，你可以选择是否发动“云海天地倾”。若你发动“云海天地倾”，你于其出牌阶段结束时，失去1枚“棍势”标记；在其出牌阶段你受到伤害时：若伤害大于1，令伤害-1；然后你对伤害来源造成一点伤害并获得一点棍势',
				filter(event, player) {
					return player != event.player && player.countMark('wukong_gunshi') > 0 && player.storage.wukong_gunfa == 'wukong_ligun';
				},
				content() {
					player.addTempSkill('wukong_gunshi_lose');
					player.addTempSkill('wukong_ligun_buff');
				},
			},
			buff: {
				trigger: { player: 'damageBegin4' },
				filter: function (event, player) {
					return event.source;
				},
				prompt2: '云海天地倾：若伤害大于1，令伤害-1；然后你对伤害来源造成一点伤害并获得一点棍势',
				content: function () {
					if (trigger.num > 1)
						trigger.num -= 1;
					trigger.source.damage();
				},
			}
		},
	},
	wukong_chuogun: {
		derivation: 'wukong_chuogun_notes',
		trigger: { player: 'phaseUseBegin' },
		usable: 1,
		filter(event, player) {
			return player.storage.wukong_gunfa == 'wukong_chuogun';
		},
		prompt2: '将“戳棍”切换为其他“棍法”',
		content() {
			'step 0'
			try {
				let list = [];
				if (player.hasSkill('wukong_pigun')) list.push('wukong_pigun');
				if (player.hasSkill('wukong_ligun')) list.push('wukong_ligun');
				// if (player.hasSkill('wukong_chuogun')) list.push('wukong_chuogun');
				player.chooseControl(list, 'cancel2').set('prompt', '选择切换的“棍法”').set('ai', function () {
					return 'wukong_pigun';
				});
			} catch (e) { alert(e.message) }
			'step 1'
			if (result.control && result.control != 'cancel2') {
				player.storage.wukong_gunfa = result.control;
				if (!player.hasSkill('wukong_gunfa')) {
					player.addSkill('wukong_gunfa');
				}
				player.addTip('wukong_gunfa', get.translation(player.storage.wukong_gunfa));
			}
		},
		group: ['wukong_chuogun_effect', 'wukong_chuogun_qieshou'],
		subSkill: {
			effect: {
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					if (player.countMark('wukong_gunshi') == 1) {
						if (!lib.filter.cardUsable({ name: 'sha' }, player)) {
							return false;
						}
					}
					return player.countMark('wukong_gunshi') > 0 && player.storage.wukong_gunfa == 'wukong_chuogun';
				},
				async content(event, trigger, player) {
					player.storage.gunshiNum = player.countMark('wukong_gunshi');
					switch (player.storage.gunshiNum) {
						case 1:
							{
								const result1 = await player.chooseUseTarget({ name: 'sha', nature: 'thunder' }, true, 'nodistance').forResult();
								if (result1.bool) {
									await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
									player.storage.gunshiNum = 0;
								}
								break;
							}
						case 2:
							{
								const result2 = await player.chooseUseTarget({ name: 'sha', nature: 'thunder' }, false, 'nodistance').forResult();
								if (result2.bool) {
									await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
									player.storage.gunshiNum = 0;
								}
								break;
							}
						case 3:
							{
								const result3 = await player.chooseTarget('选择雷杀的目标', function (card, player, target) {
									return target != player && player.canUse({ name: 'sha', nature: 'thunder' }, target, false);
								})
									.set('ai', target => {
										const player = get.player(),
											card = { name: 'cha', nature: 'thunder' };
										return get.effect(target, card, player, player);
									})
									.forResult();
								if (result3.bool) {
									await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
									player.storage.gunshiNum = 0;
									const targets = result3.targets;
									let directHit = [];
									directHit.addArray(targets);
									player.useCard({ name: 'sha', nature: 'thunder' }, targets, false).set('directHit', directHit).forResult();
								}
								break;
							}
						case 4:
							{
								const result4 = await player.chooseTarget('选择雷杀的目标', function (card, player, target) {
									return target != player && player.canUse({ name: 'sha', nature: 'thunder' }, target, false);
								})
									.set('ai', target => {
										const player = get.player(),
											card = { name: 'cha', nature: 'thunder' };
										return get.effect(target, card, player, player);
									})
									.forResult();
								if (result4.bool) {
									await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
									player.storage.gunshiNum = 0;
									const targets = result4.targets;
									let directHit = [],
										baseDamage = 2;
									directHit.addArray(targets);
									player.useCard({ name: 'sha', nature: 'thunder' }, targets, false).set('directHit', directHit).set('baseDamage', baseDamage).forResult();
								}
								break;
							}
						default:
					}
				},
			},
			qieshou: {
				trigger: { global: 'phaseUseBefore' },
				prompt2: '其他角色出牌阶段开始前，你可以选择是否发动“退寸进尺”。若你发动“退寸进尺”，你于其出牌阶段结束时，失去1枚“棍势”标记；在其出牌阶段你成为伤害牌目标时（限1次），取消对你的效果，然后你可以对伤害来源使用【戳棍】。',
				filter(event, player) {
					return player != event.player && player.countMark('wukong_gunshi') > 0 && player.storage.wukong_gunfa == 'wukong_chuogun';
				},
				content() {
					player.addTempSkill('wukong_gunshi_lose');
					player.addTempSkill('wukong_chuogun_buff');
				},
			},
			buff: {
				trigger: { target: 'useCardToBefore' },
				filter: function (event, player) {
					return event.player && event.cards.some(card => {
						return get.tag(card, 'damage');
					});
				},
				prompt2: '退寸进尺：取消对你的效果，然后你可以对伤害来源使用【戳棍】',
				content: function () {
					'step 0'
					trigger.cancel();
					'step 1'
					if (player.countMark('wukong_gunshi') > 0 && player.storage.wukong_gunfa == 'wukong_chuogun') {
						try {
							lib.skill['wukong_chuogun_buff'].content_effect(event, trigger, player);
						} catch (e) { alert(e.message) }
					}
					'step 2'
					player.storage.gunshiNum = 0;
					player.removeSkill('wukong_chuogun_buff');
				},
				async content_effect(event, trigger, player) {
					player.storage.gunshiNum = player.countMark('wukong_gunshi');
					let directHit = [];
					switch (player.storage.gunshiNum) {
						case 1:
							const result1 = await player.useCard({ name: 'sha', nature: 'thunder' }, trigger.player, true).forResult();
							if (result1.bool) {
								player.removeMark('wukong_gunshi', player.storage.gunshiNum);
							}
							break;
						case 2:
							const result2 = await player.useCard({ name: 'sha', nature: 'thunder' }, trigger.player, false).forResult();
							if (result2.bool) {
								player.removeMark('wukong_gunshi', player.storage.gunshiNum);
							}
							break;
						case 3:
							directHit.addArray([trigger.player]);
							const result3 = await player.useCard({ name: 'sha', nature: 'thunder' }, trigger.player, false).set('directHit', directHit).forResult();
							if (result3.bool) {
								player.removeMark('wukong_gunshi', player.storage.gunshiNum);
							}
							break;
						case 4:
							let baseDamage = 2;
							directHit.addArray([trigger.player]);
							const result4 = await player.useCard({ name: 'sha', nature: 'thunder' }, trigger.player, false).set('directHit', directHit).set('baseDamage', baseDamage).forResult();
							if (result4.bool) {
								await player.removeMark('wukong_gunshi', player.storage.gunshiNum);
							}
							break;
						default:
					}
				},
			}
		},
	},
	wukong_: {},


	// others

};

export default skills;
