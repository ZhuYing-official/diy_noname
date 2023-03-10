'use strict';
//-------------------------------------------------------
//明世隐
let guaList = ['大吉','中吉','小吉','小凶','中凶','大凶'];
let gua1 = false;
let gua2 = false;
let gua3 = false;
let gua4 = false;
let gua5 = false;
let gua6 = false;

//李信
function removeRenjie(player){
	if(player.hasSkill('pozhu')){
		player.removeSkill('pozhu');
	}
	if(player.hasSkill('olqingyi')){
		player.removeSkill('olqingyi');
	}
	if(player.hasSkill('rexuanhuo')){
		player.removeSkill('rexuanhuo');
	}
};
function removeTongyu(player){
	if(player.hasSkill('reshuishi')){
		player.removeSkill('reshuishi');
	}
	if(player.hasSkill('lingce')){
		player.removeSkill('lingce');
	}
	if(player.hasSkill('dinghan')){
		player.removeSkill('dinghan');
	}
};
function removeKuangbao(player){
	if(player.hasSkill('drlt_jieying')){
		player.removeSkill('drlt_jieying');
	}
	if(player.hasSkill('shencai')){
		player.removeSkill('shencai');
	}
	if(player.hasSkill('drlt_poxi')){
		player.removeSkill('drlt_poxi');
	}
};
function hok_remove(player, arrays){
	if(arrays.includes('renjie')){
		removeRenjie(player);
	}
	if(arrays.includes('tongyu')){
		removeTongyu(player);
	}
	if(arrays.includes('kuangbao')){
		removeKuangbao(player);
	}
};
// 孙悟空
function shengbangJudge(trigger, player, result){
	'step 0'
	player.judge(function(card){
		if(get.color(card)=='red'){
			trigger.num*=2;
			return 1.5;
		}
		return -1.5;
	}).judge2=function(result){
		return result.bool;
	};

	'step 1'
	if (result.bool){
		return true;
	} else{
		return false;
	}
}
//-------------------------------------------------------------
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'happy',
		connect:true,
		characterSort:{
			happy:{
				correction_history:['cuishi'],
				honor_of_kings:['hok_daji','hok_lixin','hok_makeboluo','hok_mingshiyin','hok_sunwukong'],
				happy_kings:['shen_caozhi','shen_dongzhuo','shen_lusu'],
			},
		},
		character:{
			// 崔氏
			cuishi:['female','wei',3,['reluoshen','pianwan','huayi',]],
			// 妲己
			hok_daji:['female','qun',3,['hok_meixin','hok_huhuo']],
			// 李信
			hok_lixin:['male','shen',4,['hok_wangming','hok_dengshen',],['qun']],
			// 马可波罗
			hok_makeboluo:['male','qun',3,['hok_zuolun','hok_danyu']],
			// 明世隐
			hok_mingshiyin:['male','shu',4,['hok_taigua','hok_minggua','hok_biangua']],
			// 孙悟空
			hok_sunwukong:['male','shen',4,['hok_qitian','hok_shengbang','hok_naogong'],['qun']],
			// 神曹植
			shen_caozhi:['male','shen',3,['caigao','badou','qibu','chengshi'],['wei']],
			// 神董卓
			shen_dongzhuo:['male','shen',5,['cannue','xiehan','huidu'],['qun']],
			// 神鲁肃
			shen_lusu:['male','shen',4,['diying','fusheng','chiyan','lianmeng'],['wu']],
		},
		characterIntro:{
			cuishi:'崔妃（？-？），清河郡东武城县（今河北故城）人，崔妃出身河北高门士族清河崔氏，崔妃的叔叔为名士崔琰。之后出嫁权臣曹操之子曹植为妻。因衣装过于华美，曹操登台看到后，认为她违反了穿着朴素的禁令，回家后崔妃就被赐死了。',
			hok_lixin:'炽心化寒剑，冰霜作铁衣，一人一兽化作比这些更冷冽锋利的存在，终破开风雪，终行至峰顶，终向这万仞寒山，挥出劈天裂地的一剑。心火重燃，山海可照。',
			hok_mingshiyin:'揣测来事，见疑决之，卜者将今宵焰火尽入卦象——这宴游之日，千灯夺魁终选将至之时，幕后操控者却将众人与长安视为掌中棋子，布下注定惊动长安的谜局……',
			shen_caozhi:'字子建，沛国谯人，三国曹魏著名文学家，建安文学代表人物。魏武帝曹操之子，魏文帝曹丕之弟，生前曾为陈王，去世后谥号“思”，因此又称陈思王。南朝宋文学家谢灵运更有“天下才有一石，曹子建独占八斗”的评价。王士祯尝论汉魏以来二千年间诗家堪称“仙才”者，曹植、李白、苏轼三人耳。',
			shen_dongzhuo:'字仲颖，陇西临洮人。东汉末年少帝、献帝时权臣，西凉军阀。官至太师、郿侯。其为人残忍嗜杀，倒行逆施，招致群雄联合讨伐，但联合军在董卓迁都长安不久后瓦解。后被其亲信吕布所杀。',
		},
		characterReplace:{
			// shen_zhangliao:['shen_zhangliao','ol_zhangliao'],
		},
		characterFilter:{
			shen_diaochan:function(mode){
				return mode=='identity'||mode=='doudizhu'||mode=='single'||(mode=='versus'&&_status.mode!='standard'&&_status.mode!='three');
			},
		},
		skill:{
			// 崔氏
			huayi:{
				forced:true,
				audio:2,
				trigger: {
					player: 'phaseJieshu',
				},
				filter: function(event, player){
					let flag = true;
					if(player.countCards('h', {suit:'heart'})===0){
						flag = false;
					}
					if(flag && player.countCards('h', {suit:'diamond'})===0){
						flag = false;
					}
					if(flag && player.countCards('h', {suit:'club'})===0){
						flag = false;
					}
					if(flag && player.countCards('h', {suit:'spade'})===0){
						flag = false;
					}
					return !player.isEmpty(2) && flag;
				},
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'water',
				derivation: 'shenfu',
				content: function(){
					player.awakenSkill(event.name);
					player.maxHp=3;
					player.removeSkill('reluoshen');
					player.addSkill('shenfu');
				}
			},
			pianwan:{
				mod:{
					aiValue:function(player,card,num){
						if(get.name(card)!='shan'&&get.suit(card)!='club') return;
						var cards=player.getCards('h',function(card){
							return get.name(card)=='shan'||get.suit(card)=='club';
						});
						cards.sort(function(a,b){
							return (get.name(b)=='shan'?1:2)-(get.name(a)=='shan'?1:2);
						});
						var geti=function(){
							if(cards.contains(card)){
								return cards.indexOf(card);
							}
							return cards.length;
						};
						if(get.name(card)=='shan') return Math.min(num,[6,4,3][Math.min(geti(),2)])*0.6;
						return Math.max(num,[6.5,4,3][Math.min(geti(),2)]);
					},
					aiUseful:function(){
						return lib.skill.qingguo.mod.aiValue.apply(this,arguments);
					},
				},
				enable:['chooseToRespond','chooseToUse'],
				filterCard:function(card){
					return get.suit(card)=='club';
				},
				viewAs:{name:'shan'},
				viewAsFilter:function(player){
					if(!player.countCards('h',{suit:'club'})) return false;
				},
				position:'h',
				prompt:'弃置一张梅花手牌当闪使用或打出',
				check:function(){return 1},
				onuse: function(result, player){
					player.discard(result.cards);
				},
				ai:{
					order:3,
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countCards('h',{suit:'club'})) return false;
					},
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6
						}
					}
				}
			},
			//将梅花手牌视为闪打出
			/*
			pianwan:{
				mod:{
					aiValue:function(player,card,num){
						if(get.name(card)!='shan'&&get.suit(card)!='club') return;
						var cards=player.getCards('h',function(card){
							return get.name(card)=='shan'||get.suit(card)=='club';
						});
						cards.sort(function(a,b){
							return (get.name(b)=='shan'?1:2)-(get.name(a)=='shan'?1:2);
						});
						var geti=function(){
							if(cards.contains(card)){
								return cards.indexOf(card);
							}
							return cards.length;
						};
						if(get.name(card)=='shan') return Math.min(num,[6,4,3][Math.min(geti(),2)])*0.6;
						return Math.max(num,[6.5,4,3][Math.min(geti(),2)]);
					},
					aiUseful:function(){
						return lib.skill.qingguo.mod.aiValue.apply(this,arguments);
					},
				},
				audio:2,
				enable:['chooseToRespond','chooseToUse'],
				filterCard:function(card){
					return get.suit(card)=='club';
				},
				viewAs:{name:'shan'},
				viewAsFilter:function(player){
					if(!player.countCards('h',{suit:'club'})) return false;
				},
				position:'h',
				prompt:'弃置一张梅花手牌当闪使用或打出',
				check:function(){return 1},
				ai:{
					order:3,
					respondShan:true,
					skillTagFilter:function(player){
						if(!player.countCards('h',{suit:'club'})) return false;
					},
					effect:{
						target:function(card,player,target,current){
							if(get.tag(card,'respondShan')&&current<0) return 0.6
						}
					}
				}
			},
			*/

			// 妲己
			hok_meixin:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				marktext:'魅',
				intro:{
					name:'魅心',
					content: 'mark',
				},
				filter:function(event,player){
					return player.countCards('h',{color:'red'})>0;
				},
				enable:'chooseToUse',
				filterCard:function(card){
					return get.color(card)=='red';
				},
				position:'h',
				viewAs:{name:'lebu'},
				prompt:'将一张红色手牌当乐不思蜀使用',
				onuse: function(result, player){
					if(player.countMark('hok_meixin')<3){
						player.addMark('hok_meixin',1);
					}
				},
				check:function(card){return 6-get.value(card)},
				ai:{
					threaten:1.5
				}
			},
			hok_huhuo:{
				audio:2,
				unique: true,
				limited: true,
				enable:'phaseUse',
				skillAnimation:true,
				animationColor:'orange',
				filter:function(event,player){
					return player.countMark('hok_meixin')>=3;
				},
				content:function(){
					'step 0'
					player.awakenSkill('hok_huhuo');
					event.huhuoCards=player.getCards('h');
					'step 1'
					if(event.huhuoCards!=undefined){
						player.discard(event.huhuoCards);
					}
					player.chooseTarget('为狐火减少一个目标',function(card,player,target){
						return player.inRange(target);
					}).set('targets',trigger.targets).set('ai',function(target){
						if(target==player){
							return false;
						}
						return get.attitude(_status.event.player,target);
					});
					'step 2'
					for(var i=0;i<3;i++){
						event.huhuoList=game.filterPlayer(function(target){
							return player.inRange(target)&&!target.isDead()&&target!=player;
						});
						if(result.bool){
							event.huhuoList.splice(event.huhuoList.indexOf(result.targets[0]), 1);
						}
						huhuoTarget = event.huhuoList.randomGet();
						player.line(huhuoTarget,'fire');
						huhuoTarget.damage('fire');
					}
				},
			},
			// 李信
			hok_wangming:{
				audio:2,
				marktext:'王',
				unique:true,
				trigger:{
					source:'damageSource',
					player:['damageEnd','enterGame'],
					global:'phaseBefore',
				},
				forced:true,
				filter:function(event){
					return (event.name!='damage'&&(event.name!='phase'||game.phaseNumber==0))||event.num>0; 
				},
				content:function(){
					player.addMark('hok_wangming',trigger.name=='damage'?1:2);
					var list=[];
					var zhu=get.zhu(player);
					if(zhu&&zhu!=player&&zhu.skills){
						for(var i=0;i<zhu.skills.length;i++){
							if(lib.skill[zhu.skills[i]]&&lib.skill[zhu.skills[i]].zhuSkill){
								list.push(zhu.skills[i]);
							}
						}
					}
					player.addAdditionalSkill('weidi',list);
					player.storage.zhuSkill_weidi=list;
					game.broadcastAll(function(list){
						game.expandSkills(list);
						for(var i of list){
							var info=lib.skill[i];
							if(!info) continue;
							if(!info.audioname2) info.audioname2={};
							info.audioname2.yuanshu='weidi';
						}
					},list);
				},
				intro:{
					name:'王命',
					content: 'mark',
				},
				ai:{
					maixie:true,
					maixie_hp:true,
					threaten:function(player,target){
						if(target.hp==1) return 3.5;
						return 1;
					},
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(!target.hasSkill('hok_tongkuang')){
									return [0.5, 0.7];
								}
								return [0.5, 0.6];
							}
						}
					}
				}
			},
			hok_dengshen:{
				audio:2,
				trigger:{player:'phaseBegin'},
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'water',
				derivation: ['hok_tongkuang','pozhu','olqingyi','rexuanhuo','reshuishi','lingce','dinghan','shencai','drlt_jieying','drlt_poxi'],
				filter:function(event,player){
					return player.countMark('hok_wangming')>=3;
				},
				content:function(){
					player.removeMark('hok_wangming',2);
					player.syncStorage('hok_wangming');
					player.awakenSkill(event.name);
					player.addSkill('hok_tongkuang');
					player.addSkill('rexuanhuo');
				},
			},
			hok_tongkuang:{
				audio:2,
				// trigger: {player:'phaseDiscardBefore'},
				trigger: {player:'phaseJudgeBefore'},
				forced:true,
				filter:function(event,player){
					return player.countMark('hok_wangming')>=2;
				},
				// enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					player.chooseControl('人杰','统御','狂暴').set('prompt','选择一个路线');
					'step 1'
					switch (result.control) {
						case '统御':
							player.addTempSkill('hok_tongkuang_tongyu');
							break;
						case '狂暴':
							player.addTempSkill('hok_tongkuang_kuangbao');
							break;
						default:
							player.addTempSkill('hok_tongkuang_renjie');
					}
				},
				subSkill:{
					renjie:{
						audio:2,
						// trigger:{player:'phaseDiscardBegin'},
						// trigger:{player:'phaseUse'},
						// frequent:true,
						// forced:true,
						enable:'phaseUse',
						usable:1,
						content:function(){
							event.lx = ['olqingyi','pozhu','rexuanhuo'];
							if(player.hasSkill('pozhu')){
								event.lx.splice(event.lx.indexOf('pozhu'),1)
							}
							if(player.hasSkill('olqingyi')){
								event.lx.splice(event.lx.indexOf('olqingyi'),1)
							}
							if(player.hasSkill('rexuanhuo')){
								event.lx.splice(event.lx.indexOf('rexuanhuo'),1)
							}
							'step 0'
							player.chooseControl(event.lx).set('prompt','选择获得一个技能');
							'step 1'
							hok_remove(player, ['tongyu','kuangbao']);
							player.addSkillLog(result.control);
							player.removeMark('hok_wangming',2);
							player.syncStorage('hok_wangming');
						}
					},
					tongyu:{
						audio:2,
						// trigger:{player:'phaseDiscardBegin'},
						// trigger:{player:'phaseUse'},
						// frequent:true,
						// forced:true,
						enable:'phaseUse',
						usable:1,
						content:function(){
							event.lx = ['reshuishi','lingce','dinghan'];
							if(player.hasSkill('reshuishi')){
								event.lx.splice(event.lx.indexOf('reshuishi'),1)
							}
							if(player.hasSkill('lingce')){
								event.lx.splice(event.lx.indexOf('lingce'),1)
							}
							if(player.hasSkill('dinghan')){
								event.lx.splice(event.lx.indexOf('dinghan'),1)
							}
							'step 0'
							player.chooseControl(event.lx).set('prompt','选择获得一个技能');
							'step 1'
							hok_remove(player, ['renjie','kuangbao']);
							player.addSkillLog(result.control);
							player.removeMark('hok_wangming',2);
							player.syncStorage('hok_wangming');
						},
					},
					kuangbao:{
						audio:2,
						// trigger:{player:'phaseDiscardBegin'},
						// trigger:{player:'phaseUse'},
						// frequent:true,
						// forced:true,
						enable:'phaseUse',
						usable:1,
						content:function(){
							event.lx = ['shencai','drlt_jieying','drlt_poxi'];
							if(player.hasSkill('drlt_jieying')){
								event.lx.splice(event.lx.indexOf('drlt_jieying'),1)
							}
							if(player.hasSkill('shencai')){
								event.lx.splice(event.lx.indexOf('shencai'),1)
							}
							if(player.hasSkill('drlt_poxi')){
								event.lx.splice(event.lx.indexOf('drlt_poxi'),1)
							}
							'step 0'
							player.chooseControl(event.lx).set('prompt','选择获得一个技能');
							'step 1'
							hok_remove(player, ['tongyu','renjie']);
							player.addSkillLog(result.control);
							player.removeMark('hok_wangming',2);
							player.syncStorage('hok_wangming');
						}
					}
				},
			},
			// 明世隐
			hok_taigua:{
				audio: 2,
				enable:'phaseUse',
				usable:1,
				filterTarget:function(card,player,target){
					if(target.hp>=target.maxHp) return false;
					if(target==player) return false;
					return true;
				},
				content: function(){
					'step 0'
					player.removeSkill('hok_minggua2');
					'step 1'
					player.damage();
					'step 2'
					player.line(target,'green');
					target.recover();
					player.addSkill('hok_minggua2');
				},
				ai:{
					order: get.order({name:'wanjian'})-1,
					result:{
						target:function(player,target){
							if(target.hp==1) return 5;
							return 1;
						}
					},
					threaten:1,
				}
			},
			hok_minggua:{
				auto: 2,
				forced: true,
				group: 'hok_minggua2',
				trigger:{
					player: 'damageBegin2',
				},
				content:function(){
					'step 0'
					var r = Math.random();
					var tar = trigger.player;
					var cards=tar.getCards('hej');
					
					var str=get.translation(trigger.source)+'占卜结果为：';
					if(r<0.01){
						// 1
						str+='大凶';
					} else if(r<0.21){
						// 2
						str+='中凶';
					} else if(r<0.5){
						// 3
						str+='小凶';
					} else if(r<0.79){
						// 4
						str+='小吉';
					} else if(r<0.99){
						// 5
						str+='中吉';
					} else{
						str+='大吉';
					}
					// event.dialog=ui.create.dialog(str);
					player.popup(str);
					game.log(str);
					
					if(r<0.01){
						// 1
						if(!gua1){
							tar.die();
							trigger.cancel();
						}
					} else if(r<0.21){
						// 2
						if(!gua2){
							trigger.num++;
							if(cards.length>0){
								tar.discard(cards.randomGet());
							}
						}
					} else if(r<0.5){
						// 3
						if(!gua3){
							if(cards.length>0){
								tar.discard(cards.randomGet());
							}
						}
					} else if(r<0.79){
						// 4
						if(!gua4){
							tar.draw();
						}
					} else if(r<0.99){
						// 5
						if(!gua5){
							trigger.cancel();
							tar.recover(trigger.num);
							tar.draw();
						}
					} else{
						if(!gua6){
							trigger.cancel();
							tar.recover((tar.maxHp-tar.hp));
							tar.draw(4);
						}
					}
					var source = trigger.source;
					if(source){
						if(source.hasSkill('hok_biangua')){
							if(source.countMark('hok_biangua2')<8){
								source.addMark('hok_biangua2', 1);
							}
						}
						if(tar.hasSkill('hok_biangua')){
							if(tar.countMark('hok_biangua2')<8){
								tar.addMark('hok_biangua2', 1);
							}
						}
					}

					'step 1'
					game.delay(0.5);
					// event.dialog.close();
				},
			},
			hok_minggua2:{
				auto: 2,
				forced: true,
				trigger:{
					source: 'damageBegin2',
				},
				content:function(){
					'step 0'
					var r = Math.random();
					var tar = trigger.player;
					var cards=tar.getCards('hej');
					
					var str=get.translation(player)+'占卜结果为：';
					if(r<0.01){
						// 1
						str+='大吉';
					} else if(r<0.21){
						// 2
						str+='中吉';
					} else if(r<0.5){
						// 3
						str+='小吉';
					} else if(r<0.79){
						// 4
						str+='小凶';
					} else if(r<0.99){
						// 5
						str+='中凶';
					} else{
						str+='大凶';
					}
 					// event.dialog=ui.create.dialog(str);
					player.popup(str);
					game.delay(0.5);
					game.log(str);

					if(r<0.01){
						// 1
						if(!gua1){
							tar.die();
							trigger.cancel();
						}
					} else if(r<0.21){
						// 2
						if(!gua2){
							trigger.num++;
							if(cards.length>0){
								tar.discard(cards.randomGet());
							}
						}
					} else if(r<0.5){
						// 3
						if(!gua3){
							if(cards.length>0){
								tar.discard(cards.randomGet());
							}
						}
					} else if(r<0.79){
						// 4
						if(!gua4){
							tar.draw();
						}
					} else if(r<0.99){
						// 5
						if(!gua5){
							trigger.cancel();
							tar.recover(trigger.num);
							tar.draw();
						}
					} else{
						if(!gua6){
							trigger.cancel();
							tar.recover((tar.maxHp-tar.hp));
							tar.draw(4);
						}
					}
					if(player.hasSkill('hok_biangua')){
						if(player.countMark('hok_biangua2')<8){
							player.addMark('hok_biangua2', 1);
						}
					}
					if(tar.hasSkill('hok_biangua')){
						if(tar.countMark('hok_biangua2')<8){
							tar.addMark('hok_biangua2', 1);
						}
					}
					'step 1'
					game.delay(0.5);
					// event.dialog.close();
				},
			},
			hok_biangua:{
				global: ['hok_biangua2','hok_biangua3'],
				audio:2,
				filter: function(event, player){
					let tar = game.filterPlayer(function(target){
						return target.hasSkill('hok_biangua');
					})[0];
					return tar.isAlive();
				}
			},
			hok_biangua2:{
				audio: 2,
				mark: true,
				marktext: '卦',
				frequent: true,
				intro:{
					name: '卦象',
					content: 'mark',
				},
			},
			hok_biangua3:{
				audio: 2,
				enable:'phaseUse',
				filter: function(event, player){
					let tar = game.filterPlayer(function(target){
						return target.hasSkill('hok_biangua');
					})[0];
					if(tar){
						return tar.countMark('hok_biangua2')>7;
					}
					return false;
				},
				content: function(){
					'step 0'
					if(gua1){
						guaList.splice(guaList.indexOf('大吉'), 1);
					} else if(gua2){
						guaList.splice(guaList.indexOf('中吉'), 1);
					} else if(gua3){
						guaList.splice(guaList.indexOf('小吉'), 1);
					} else if(gua4){
						guaList.splice(guaList.indexOf('小凶'), 1);
					} else if(gua5){
						guaList.splice(guaList.indexOf('中凶'), 1);
					} else if(gua6){
						guaList.splice(guaList.indexOf('大凶'), 1);
					} else{
						return;
					}

					'step 1'
					let target = game.filterPlayer(function(target){
						return target.hasSkill('hok_biangua');
					})[0];
					player.chooseControl(guaList,'cancel2').set('ai', function(target){
						let r = Math.random()*guaList.length;
						return guaList[Math.floor(r)];
					});
					'step 2'
					switch (result.control){
						case '大吉':
							gua1 = true;
							break;
							case '中吉':
							gua2 = true;
							break;
							case '小吉':
							gua3 = true;
							break;
							case '小凶':
							gua4 = true;
							break;
							case '中凶':
							gua5 = true;
							break;
							case '大凶':
							gua6 = true;
							break;
						default:
						}
					var str=get.translation(player)+'选择了：'+result.control;
					event.dialog=ui.create.dialog(str);
					game.log(str);
					if(!player.hasSkill('hok_biangua')){
						game.filterPlayer(function(target){
							return target.hasSkill('hok_biangua');
						})[0].removeMark('hok_biangua2', 8);
					} else{
						player.removeMark('hok_biangua2', 8);
					}
					'step 3'
					game.delay(1);
					event.dialog.close();
				},
				ai:{
					order:function(){
						return get.order({name:'sha'})+1;
					},
					result:{player:1},
				},
			},
			// 马可波罗
			hok_zuolun:{
				audio:2,
				marktext:'轮',
				intro:{
					name:'左轮',
					content: 'mark',
				},
				forced:true,
				group:['hok_zuolun_effect'],
				trigger:{
					source:'damageSource',
				},
				filter:function(event){
					return event.num>0; 
				},
				content:function(){
					if(trigger.player.countMark('hok_zuolun')<2){
						trigger.player.addMark('hok_zuolun', 1);
					}
				},
			},
			hok_zuolun_effect:{
				audio:2,
				forced:true,
				trigger:{
					global:['damageBefore'],
				},
				filter:function(event,player){
					return event.name=='damage';
				},
				content:function(){
					if(trigger.player.countMark('hok_zuolun')>=2 && trigger.source.hasSkill('hok_zuolun')){
						trigger.cancel();
						trigger.player.loseHp(trigger.num);
					}
				},
				ai:{
					jueqing:true
				},
			},
			hok_danyu:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('hs')>=4;
				},
				content:function(){
					'step 0'
					event.danyuCards=player.getCards('hs');
					'step 1'
					player.chooseTarget(get.prompt('hok_danyu'),'选择至多三名其他角色，对这些角色造成随机1~2次1点雷电伤害',[1,3],function(card,player,target){
						return player!=target;
					}).set('ai',target=>{
						var player=_status.event.player;
						return get.damageEffect(target,player,player,'thunder');
					});
					'step 2'
					if(event.danyuCards!=undefined){
						player.discard(event.danyuCards);
					}
					// if(!player.isTurnedOver()){
					// 	player.turnOver();
					// }
					if(result.bool){
						var targets=result.targets;
						targets.sortBySeat();
						player.logSkill('hok_danyu',targets);
						for(var target of targets){
							var r = Math.floor(Math.random()*2)+1;
							for(var dan=0;dan<r;dan++){
								target.damage(1,'thunder');
							}
						}
					}
				}
			},
			// 孙悟空
			hok_qitian:{
				audio:2,
				forced:true,
				trigger:{
					player:['chooseToRespond','chooseToUse'],
				},
				mod:{
					cardname:function(card,player){
						if(['trick','delay'].contains(lib.card[card.name].type)) return 'sha';
					},
					cardnature:function(card,player){
						if(['trick','delay'].contains(lib.card[card.name].type)&&get.color(card)=='red') return 'fire';
						if(['trick','delay'].contains(lib.card[card.name].type)&&get.color(card)=='black') return 'thunder';
					},
					targetInRange:function(card,player){
						if(card.name=='sha'&&(card.nature=='fire'||card.nature=='thunder')) return true;
					},
				},
			},
			hok_shengbang:{
				audio:2,
				locked:true,
				trigger:{
					source:'damageBefore',
				},
				filter:function(event, player){
					return event.num>0&&player.countCards('hes')>0;
				},
				content:function(){
					'step 0'
					player.chooseToDiscard('hes');
					'step 1'
					if(result.bool){
						shengbangJudge(trigger, player, result);
					}
				},
			},
			hok_naogong:{
				audio:2,
				unique: true,
				limited: true,
				enable:'phaseUse',
				skillAnimation:true,
				animationColor:'metal',
				filter:function(event,player){
					return player.countCards('hs')>=3;
				},
				content:function(){
					player.awakenSkill('hok_naogong');
					player.addTempSkill('hok_naogong_effect');
					player.addTempSkill('hok_naogong_discard');
				},
				subSkill:{
					effect:{
						audio:2,
						forced:true,
						onremove:true,
						mod:{
							cardUsable:function(card,player,num){
								if(card.name=='sha') return 3;
							}
						},
					},
					discard:{
						trigger:{player:'phaseUseEnd'},
						forced:true,
						onremove:true,
						filter:function(event,player){
							return player.countCards('hs')>0;
						},
						content:function(){
							'step 0'
							event.naogongCards=player.getCards('hs');
							'step 1'
							if(event.naogongCards!=undefined){
								player.discard(event.naogongCards);
							}
						},
					},
				}
			},

			// 神曹植
			caigao: {
				audio: 'reluoying',
				forced: true,
				unique: true,
				derivation: 'caigao_rewrite',
				group: 'caigao_rewrite',
				trigger: {global: 'gainEnd'},
				filter: function(event, player){
					return player!=event.player&&event.player!=_status.currentPhase&&!player.storage.caigao_rewrite==true;
				},
				content: function(){
					'step 0'
					player.chooseControl('红色', '黑色').set('prompt', '猜测判定牌颜色').set('ai', function(event){
						switch(Math.floor(Math.random()*5)){
							case 0: case 2: case 4: return '红色';
							case 1: case 3: return '黑色';
						}
					});
					'step 1'
					event.guess = (result.control==='红色'?'red':'black');
					'step 2'
					player.judge(function(card){
						if(get.color(card)==event.guess) return 1.5;
						return -1.5;
					}).judge2=function(result){
						return result.bool;
					};
					'step 3'
					if (result.bool){
						player.popup('猜对');
						var card=get.cardPile(function(card){
							return get.suit(card,'club')=='club';
						}) 
						if(card){
							player.gain(card,'gain2');
						}
					} else{
						player.popup('猜错');
						return false;
					}
				},
				subSkill: {
					rewrite:{
						audio:'reluoying',
						forced:true,
						trigger: {global: 'gainEnd'},
						filter: function(event, player){
							return player!=event.player&&event.player!=_status.currentPhase&&player.storage.caigao_rewrite==true;
						},
						content: function(){
							var card=get.cardPile(function(card){
								return get.suit(card,'club')=='club';
							}) 
							if(card){
								player.gain(card,'gain2');
							}
						},
					}
				},
			},
			badou: {
				audio:'rejiushi',
				unique: true,
				group:['badou2','badou3'],
				frequent: true,
				trigger:{player:['useCard','respond']},
				filter:function(event,player){
					return event.card.name=='jiu';
				},
				content: function(){
					var card=get.cardPile(function(card){
						var t = get.type(card,'trick')
						return t=='trick' && t!='delay';
					});
					if(card){
						player.gain(card,'gain2');
					}
				},
			},
			badou2: {
				audio:'rejiushi',
				usable:1,
				enable:['chooseToRespond','chooseToUse'],
				viewAs: {
					name: 'jiu',
				},
				selectCard: 1,
				position: 'h',
				viewAsFilter: function(player){
					return player.countCards('h', {suit: 'club'});
				},
				filterCard: function(card){
					return get.suit(card)=='club';
				},
				prompt: '将一张梅花手牌当酒使用或打出',
			},
			badou3: {
				audio:'rejiushi',
				mod:{
					cardname:function(card,player,name){
						if(card.name=='zhuge'&&card.suit=='club') return 'jiu';
					},
					suit:function(card){
						if(card.name=='zhuge'&&card.suit=='club') return 'none';
					},
					cardUsable:function(card,player,num){
						if(card.name=='jiu'&&card.suit=='none') return Infinity;
					},
				},
				trigger:{player:'useCard'},
				forced:true,
				filter:function(event,player){
					return event.card.name=='zhuge'&&get.suit(event.card)=='club';
				},
				prompt: '将一张梅花诸葛连弩当无色酒使用(无色酒无次数限制)',
				onuse: function(result, player){
					var card=get.cardPile(function(card){
						var t = get.type(card,'trick')
						return t=='trick' && t!='delay';
					});
					if(card){
						player.gain(card,'gain2');
					}
				},
			},
			qibu: {
				audio:2,
				unique: true,
				mark: true,
				marktext: '步',
				frequent: true,
				intro:{
					name: '七步',
					content: 'mark',
				},
				trigger: {player: 'useCard'},
				filter: function(event, player){
					let flag = false;
					flag = (get.type(event.card)=='trick'&&event.card.isCard);
					return (flag && player.countMark('qibu')<7);
				},
				content:function(){
					player.addMark('qibu', 1);
				},
			},
			chengshi: {
				audio:2,
				trigger:{global:'phaseJieshuEnd'},
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'water',
				filter: function(event,player){
					return player.countMark('qibu')>=7;
				},
				content:function(){
					'step 0'
					player.awakenSkill(event.name);
					player.removeSkill('qibu');
					player.recover();
					player.addSkill('douqi');
					player.storage.caigao_rewrite=true;

					'step 1'
					player.chooseTarget('令一名角色回复一点体力并获得“豆”标记').set('ai',function(card,player,target){
						if(target==player){
							return false;
						}
						var att = get.attitude(_status.event.player,target);
						var valueDou = 0;
						if(att>0){
							if(target.isDamaged()){
								valueDou+=2;
							}
							if(target.group=='wei'){
								valueDou+=1;
							}
							valueDou+=1;
							if(valueDou > 1){
								return true;
							}
						}
						return false;
					});
						
					'step 2'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						target.storage.douqi=player;
						target.recover();
						target.addSkill('douqi');
					}
				},
			},
			douqi: {
				forced: true,
				mark: true,
				marktext: '豆',
				intro:{
					name: '豆萁',
					content: '手牌上限+1',
				},
				mod:{
					maxHandcard:function(player,num){
						return 1+num;
					}
				},
			},

			// 神董卓
			cannue:{
				audio:2,
				forced:true,
				unique:true,
				group: ['cannue2','cannue3','cannue4'],
				marktext:'虐',
				trigger:{
					source:'damageSource',
				},
				filter:function(event, player){
					return event.num>0 && player.countMark('cannue')<9; 
				},
				intro:{
					name:'残虐',
					content: 'mark',
				},
				content:function(){
					player.addMark('cannue',(trigger.num+player.countMark('cannue')>6?6-player.countMark('cannue'):trigger.num));
				},
			},
			cannue2:{
				audio:2,
				forced:true,
				unique:true,
				mod:{
					cardname:function(card,player,name){
						if(card.name=='wugu') return 'nanman';
					},
				},
				trigger:{player:'useCard'},
				filter:function(event,player){
					return event.card.name=='wugu';
				},
				prompt: '[五谷丰登]视为[南蛮入侵]',
			},
			cannue3:{
				audio:2,
				forced:true,
				unique:true,
				mod:{
					cardname:function(card,player,name){
						if(card.name=='taoyuan') return 'wanjian';
					},
				},
				trigger:{player:'useCard'},
				filter:function(event,player){
					return event.card.name=='taoyuan';
				},
				prompt: '[桃园结义]视为[万箭齐发]',
			},
			cannue4:{
				audio:2,
				audioname:['re_dongzhuo','ol_dongzhuo'],
				trigger:{player:'useCardToPlayered',target:'useCardToTargeted'},
				forced:true,
				filter:function(event,player){
					return event.card.name == 'sha';
				},
				check:function(event,player){
					return player==event.player;
				},
				content:function(){
					var id=(player==trigger.player?trigger.target:player).playerid;
					var map=trigger.getParent().customArgs;
					if(!map[id]) map[id]={};
					if(typeof map[id].shanRequired=='number'){
						map[id].shanRequired++;
					}
					else{
						map[id].shanRequired=2;
					}
				},
				ai:{
					directHit_ai:true,
					skillTagFilter:function(player,tag,arg){
						if(arg.card.name!='sha'||arg.target.countCards('h','shan')>1) return false;
					},
				},
			},
			xiehan:{
				audio:2,
				forced: true,
				group: ['xiehan2','xiehan3'],
				trigger: {global: 'drawBegin'},
				filter: function(event, player){
					return player!=event.player&&event.player!=_status.currentPhase&&event.num>1;
				},
				content: function(){
					trigger.num--;
				},
				ai:{
					threaten:1.2
				}
			},
			xiehan2:{
				audio:2,
				forced: true,
				trigger:{global:'dieAfter'},
				filter: function(event, player){
					return player.countMark('cannue')>=1;
				},
				content:function(){
					player.removeMark('cannue',1);
					player.syncStorage('cannue');
					player.gainMaxHp();
					player.draw();
					// player.recover();
				},
				ai:{
					threaten:1.5
				}
			},
			xiehan3:{
				audio:2,
				forced: true,
				trigger:{global:'phaseUseBegin'},
				filter:function(event,player){
					return event.player.isAlive()&&event.player.hasUseTarget({name:'jiu'},null,true);
				},
				direct:true,
				preHidden:true,
				content:function(){
					"step 0"
					var controlOne = '1.摸一张牌，神董卓对你造成一点伤害，视为使用了一张【酒】';

					trigger.player.chooseToDiscard('hes','1.弃置1张牌 或 2.摸一张牌，神董卓对你造成一点伤害，视为使用了一张【酒】').set('ai',function(card){
						if(ui.selected.cards.length>=_status.event.getParent().num) return -1;
						if(_status.event.res>=0) return 6-get.value(card);
						if(get.type(card)!='basic'){
							return 10-get.value(card);
						}
						return 8-get.value(card);
					});
					"step 1"
					if(!result.bool){
						trigger.player.draw();
						trigger.player.damage();
						trigger.player.chooseUseTarget({name:'jiu'},true,'noTargetDelay','nodelayx');
					}
				},
				ai:{
					threaten:2,
				}
			},
			huidu:{
				audio:2,
				forced:true,
				unique:true,
				trigger:{player:'phaseJieshuEnd'},
				juexingji:true,
				skillAnimation:true,
				animationColor:'metal',
				filter: function(event,player){
					return player.countMark('cannue')>=6;
				},
				content:function(){
					player.awakenSkill(event.name);
					player.removeMark('cannue', 6);
					
					var cards=[];
					while(cards.length<70){
						var card=get.cardPile2(function(card){
							var info=get.info(card,false);
							return !info.notarget && get.type2(card,'trick')=='trick';
						});
						if(card) {
							cards.push(card);
							game.cardsGotoOrdering([card]);
							card.remove();
						}
						else break;
					}
					if(!cards.length) event.finish();
					else{
						event.cards=cards;
						// game.cardsGotoOrdering(cards);
						
						for(var i of cards){
							var info=lib.card[i.name];
							var list=game.filterPlayer(function(target){
								return !target.isDead();
							});
							var source = list.randomGet();
							var list2 = Array.from(list);
							list2.splice(list2.indexOf(source),1);
							var target=list2.randomGet();
							if(info.selectTarget!=undefined){
								if(Array.isArray(info.selectTarget)){
									if(info.selectTarget[0]<0) {
										if(i.name == 'shandian'){
											source.useCard(i, source);
										}else{
											source.useCard(i);
										}
										// game.log(source,'使用了',i.name);
									} else{
										var targets = [];
										targets.push(target);
										list2.splice(list2.indexOf(target),1);
										var target2=list2.randomGet();
										targets.push(target2);
										source.useCard(i,targets);
										// game.log(source,'对',target,'、',target2,'使用了',i.name);
									}
									game.delay(0.3);
								}
								else if(info.selectTarget<0) {
									switch (i.name){
									case 'wuzhong':
									case 'shandian':
										source.useCard(i, source);
										// game.log(source,'对自己使用了',i.name);
										game.delay(0.3);
										break;
									case 'wugu':
										if(source != player){
											source.useCard(i, list);
											// game.log(source,'对',list,'使用了',i.name);
										} else {
											var wunan = i;
											wunan.name = 'nanman';
											source.useCard(wunan, list2);
											// game.log(source,'对',list2,'使用了',i.name);
										}
										game.delay(0.3);
										break;
									case 'taoyuan':
										if(source != player){
											source.useCard(i, list);
											// game.log(source,'对',list,'使用了',i.name);
										} else {
											var taowan = i;
											taowan.name = 'wanjian';
											source.useCard(taowan, list2);
											// game.log(source,'对',list2,'使用了',i.name);
										}
										game.delay(0.3);
										break;
									default:
										source.useCard(i, list2);
										// game.log(source,'对',list2,'使用了',i.name);
										game.delay(0.3);
									}
								}
								else if(i.name == 'jiedao'){
									list2.splice(list2.indexOf(target),1);
									var target2=list2.randomGet();
									var targets = [];
									targets.push(target);
									targets.push(target2);
									source.useCard(i,targets);
									// game.log(source,'对',target,'使用了',i.name);
									game.delay(0.3);
								}
								else{
									source.useCard(i,target);
									// game.log(source,'对',target,'使用了',i.name);
									game.delay(0.3);
								}
							}
						}
					}

					player.loseMaxHp(5);
					game.log('毁都使用了',cards.length,'张锦囊牌，如下：',cards);
				},
			},

			// 神鲁肃
			diying:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				content:function(){
					'step 0'
					player.chooseTarget('选择一名角色获得〖弘德〗〖弼政〗〖博图〗〖诫训〗〖缔盟〗〖决堰〗中的一个，直到其回合结束。').set('ai',function(target){
						var att = get.attitude(_status.event.player,target);
						if(att>0){
							return true;
						}
						if(target==player){
							return true;
						}
						return false;
					});
						
					'step 1'
					if(result.bool){
						var list=['hongde','bizheng','rebotu','jiexun','oldimeng','drlt_jueyan'];
						var diyingSkill = list.randomGet();
						var target=result.targets[0];
						if(!target.hasSkill(diyingSkill)){
							target.addTempSkill(diyingSkill,{player:'phaseAfter'});
							target.popup('获得技能');
							target.popup(diyingSkill);
						} else{
							target.popup('已有技能');
							target.popup(diyingSkill);
						}
					}
				},
			},
			fusheng:{
				audio:2,
				trigger:{target:'useCardToBefore'},
				forced:true,
				priority:15,
				filter:function(event,player){
					return event.card&&event.card.name=='sha'&&event.card.suit=='heart';
				},
				content:function(){
					trigger.cancel();
				},
				ai:{
					target:function(card,player,target){
						if(card&&card.name=='sha'&&card.suit=='heart') return 'zerotarget';
					},
				},
			},
			chiyan:{
				audio:2,
				trigger:{player:'phaseDiscardEnd'},
				direct:true,
				filter:function(event,player){
					var cards=[];
					player.getHistory('lose',function(evt){
						if(evt.type=='discard'&&evt.getParent('phaseDiscard')==event) cards.addArray(evt.cards2);
					});
					return cards.length>1;
				},
				content:function(){
					"step 0"
					player.chooseTarget(get.prompt('chiyan'),'选择一名其他角色，对其造成1点火属性伤害').set('ai',target=>{
						var player=_status.event.player;
						return get.damageEffect(target,player,player,'fire');
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						target.damage(1,'fire');
					}
				},
				ai:{
					expose:0.2,
					threaten:2
				}
			},
			lianmeng:{
				audio:2,
				enable:'phaseUse',
				usable:1,
				filter:function(event,player){
					return player.countCards('h')>=2;
				},
				content:function(){
					'step 0'
					player.chooseCardTarget({
						prompt:'请选择【联盟】的牌和目标',
						prompt2:'将两张手牌交给一名其他角色，然后你摸三张牌',
						selectCard:2,
						filterCard:true,
						filterTarget:lib.filter.notMe,
						ai1:function(card){
							if(get.tag(card,'recover')&&!game.hasPlayer(function(current){
								return get.attitude(current,player)>0&&!current.hasSkillTag('nogain');
							})) return 0;
							return 1/Math.max(0.1,get.value(card));
						},
						ai2:function(target){
							var player=_status.event.player,att=get.attitude(player,target);
							if(target.hasSkillTag('nogain')) att/=9;
							return 4+att;
						},
					});
					'step 1'
					if(result.bool){
						var target=result.targets[0];
						player.line(target,'green');
						player.give(result.cards,target);
						player.draw(3);
					}
				}
			},
		},
		dynamicTranslate:{
			/*
			nzry_longnu:function(player){
				if(player.hasSkill('nzry_longnu_2')) return '转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。<span class="legendtext">阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。</span>';
				if(player.hasSkill('nzry_longnu_1')) return '转换技，锁定技，<span class="legendtext">阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。</span>阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。';
				if(player.storage.nzry_longnu==true) return '转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。<span class="bluetext">阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。</span>';
				return '转换技，锁定技，<span class="bluetext">阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。</span>阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。';
			},
			*/
		},
		characterTitle:{
			// g绿 b蓝 r红 p粉
			cuishi:'#b捞得一评级:3.6',
			hok_daji:'#b捞得一评级:3.7',
			hok_lixin:'#r捞得一评级:4.2',
			hok_makeboluo:'#b捞得一评级:3.9',
			hok_mingshiyin:'#r耀世圣手评级:4.1',
			hok_sunwukong:'#b捞得一评级:3.8',
			shen_caozhi:'#r捞得一评级:4.2',
			shen_dongzhuo:'#r捞得一评级:4.2',
			shen_lusu:'#r捞得一评级:4.2',
		},
		translate:{
			// 崔氏
			cuishi:'崔氏',
			pianwan:'翩婉',
			pianwan_info:'锁定技，在你的回合外你可以弃置手牌中的一张梅花牌视为打出一张梅花闪。',
			huayi:'华衣',
			huayi_info:'觉醒技，结束阶段时，当你的手牌花色有四种且装备防具时，崔氏获得技能[神赋]，失去技能[洛神]，体力上限改为3。',
			// 妲己
			hok_daji:'妲己',
			hok_meixin:'魅心',
			hok_meixin_info:'出牌阶段限一次，你可以将一张红色手牌当做【乐不思蜀】使用，当你使用魅心且你的魅心标记不大于3，你获得1枚“魅心”标记。',
			hok_huhuo:'狐火',
			hok_huhuo_info:'限定技，出牌阶段，当你的“魅心”标记大于3，你可以弃置所有手牌对攻击范围内的目标随机造成3点火焰伤害，你可以减少其中一个目标。',
			// 李信
			hok_lixin:'李信',
			hok_wangming:'王命',
			hok_wangming_info:'锁定技，游戏开始时，你获得2枚「王」标记，你视为拥有当前主公的主公技；锁定技，当你造成/受到伤害后，你获得一枚「王」标记。',
			hok_dengshen:'登神',
			hok_dengshen_info:'觉醒技，准备阶段，若你武将牌上的「王」数不小于3，则你弃置2枚「王」，获得技能[统狂]、[眩惑]。',
			hok_tongkuang:'统狂',
			hok_tongkuang_info:'判断阶段，你选择[人杰]、[统御]、[狂暴]路线中的一个，失去其他路线的技能；出牌阶段，你可以弃置2枚「王」标记，获得该路线的一个技能。（人杰：[破竹][清议][眩惑]；统御：[慧识][灵策][定汉]；狂暴：[神裁][劫营][魄袭]。）',
			hok_tongkuang_renjie:'人杰',
			hok_tongkuang_tongyu:'统御',
			hok_tongkuang_kuangbao:'狂暴',
			// 马克波罗
			hok_makeboluo:'马克波罗',
			hok_zuolun:'左轮',
			hok_zuolun_info:'锁定技，当你对其他角色造成伤害且该角色“破防”标记不超过2时，该角色获得1枚“破防”标记，破防标记为2时受到你的伤害视为体力流失。',
			hok_danyu:'弹雨',
			hok_danyu_info:'出牌阶段限1次，你可以弃置全部手牌（至少4张），选择1至3名目标，对其造成1~2次1点雷电伤害。',
			// 明世隐
			hok_mingshiyin:'明世隐',
			hok_taigua:'泰卦',
			hok_taigua_info:'出牌阶段限一次，你对自己造成1点伤害，然后令一名其他角色回复1点体力。',
			hok_minggua:'命卦',
			hok_minggua_info:'锁定技，当你造成/受到伤害时，进行一次占卜，根据卦象获得以下效果：<br/>\
				1.大吉/大凶：受到伤害的角色死亡；<br/>\
				2.中吉/中凶：伤害加一，且受到伤害的角色随机弃置一张牌；<br/>\
				3.小吉/小凶：受到伤害的角色随机弃置一张牌；<br/>\
				4.小凶/小吉：受到伤害的角色摸一张牌；<br/>\
				5.中凶/中吉：受到伤害的角色将此伤害改为回复体力并摸一张牌；<br/>\
				6.大凶/大吉：受到伤害的角色回复体力至体力上限并摸四张牌',
			hok_biangua:'变卦',
			hok_biangua3:'变卦',
			hok_biangua_info:'当你发动命卦后，获得1个“卦”标记；出牌阶段当前回合角色可以弃置你的8个“卦”标记将你卦象中的一种效果移除。',
			// 孙悟空
			hok_sunwukong:'孙悟空',
			hok_qitian:'齐天',
			hok_qitian_info:'锁定技，你的属性杀无距离限制，红色锦囊牌视为火杀，黑色锦囊牌视为雷杀。',
			hok_shengbang:'圣棒',
			hok_shengbang_info:'锁定技，当你的杀造成伤害时，你可以弃置一张牌进行判定，若为红色，伤害×2',
			hok_naogong:'闹宫',
			hok_naogong_info:'限定技，出牌阶段当你的手牌区数量不小于3时，令你的杀的次数为3，出牌阶段结束时弃置所有手牌。',
			// 神曹植
			shen_caozhi:'神曹植',
			caigao:'才高',
			caigao_info:'锁定技，当其他角色于回合外获得牌时，你进行判定，你猜测此判定牌的颜色，猜中后你获得一张梅花牌。',
			caigao_rewrite:'才高·觉醒',
			caigao_rewrite_info:'锁定技，当其他角色于回合外获得牌时，你获得一张梅花牌。',
			badou:'八斗',
			badou2:'八斗',
			badou3:'八斗',
			badou_info:'你手牌中的梅花牌可以视为酒，每名角色的回合限一次。当你使用酒时，你获得一张普通锦囊牌。你的梅花诸葛连弩视为无色酒，无次数限制，当你使用无色酒时，你额外获得一张普通锦囊牌。',
			qibu:'七步',
			qibu_info:'当你使用普通锦囊牌时，你的“七步”标记不超过7，获得标记“七步”。',
			chengshi:'成诗',
			chengshi_info:'觉醒技，一名角色回合结束时，当你的“七步”标记为7时，你回复1点体力并且获得“豆”标记，你可以选择一名其他角色获得相同的效果。',
			// 神董卓
			shen_dongzhuo:'神董卓',
			cannue:'残虐',
			cannue_info:'锁定技，你的[五谷丰登]视为[南蛮入侵]，你的[桃园结义]视为[万箭齐发]。当你你的“残虐”标记小于9，你造成1点伤害后，获得1枚“残虐”标记。你对其他角色、其他角色对你使用【杀】时,都需连续多使用一张【闪】才能抵消。',
			xiehan:'挟汉',
			xiehan_info:'锁定技，当其他角色于回合外每次摸牌的数量大于1，你令其此次摸牌数-1。当一名角色死亡后，你的“残虐”标记不小于1，你失去1枚“残虐”，你增加一点体力上限。一名角色出牌阶段开始时，该角色选择一项：1.摸一张牌，视为使用了一张【酒】，你对其（包括自己）造成一点伤害；2.弃置一张牌。',
			huidu:'毁都',
			huidu_info:'觉醒技，你的回合结束时，当你的“残虐”标记不小于6时，你失去6枚“残虐”，将视为使用牌堆中全部锦囊牌，每一张牌的使用者与目标随机选择，最后你减少5点体力上限。',
			// 神鲁肃
			shen_lusu:'神鲁肃',
			diying:'帝迎',
			diying_info:'出牌阶段限一次，你选择一名角色，令其获得〖弘德〗〖弼政〗〖博图〗〖诫训〗〖缔盟〗〖决堰〗中的一个，直到其回合结束。',
			fusheng:'赴圣',
			fusheng_info:'锁定技，红桃杀对你无效。',
			chiyan:'赤炎',
			chiyan_info:'弃牌阶段结束时，若你于此阶段内弃置过两张或更多的牌，则你可以视为对一名角色造成一点火属性伤害。',
			lianmeng:'联盟',
			lianmeng_info:'出牌阶段限一次，你可以选择两张手牌交给一名其他角色，你摸三张牌。',

			
			correction_history:'正史',
			honor_of_kings:'王者荣耀',
			happy_kings:'娱乐神将',
		},
	};
});
