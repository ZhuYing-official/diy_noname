'use strict';
//-------------------------------------------------------
//李信
function removeRenjie(player){
	if(player.hasSkill('xinfu_lingren')){
		player.removeSkill('xinfu_lingren');
	}
	if(player.hasSkill('xinshanjia')){
		player.removeSkill('xinshanjia');
	}
	if(player.hasSkill('reyingzi')){
		player.removeSkill('reyingzi');
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
	if(player.hasSkill('xunshi')){
		player.removeSkill('xunshi');
	}
};
function lx_remove(player, arrays){
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
//-------------------------------------------------------------
game.import('character',function(lib,game,ui,get,ai,_status){
	return {
		name:'happy',
		connect:true,
		characterSort:{
			happy:{
				correction_history:['cuishi'],
				honor_of_kings:['hok_lixin'],
				our_kings:['shen_caozhi'],
			},
		},
		character:{
			// 崔氏
			cuishi:['female','wei',3,['reluoshen','pianwan','huayi',]],
			// 神李信
			hok_lixin:['male','shen',5,['lx_wangming','lx_dengshen',],['qun']],
			// 神曹植
			shen_caozhi:['male','shen',3,['caigao','badou','qibu','chengshi'],['wei']],
		},
		characterIntro:{
			cuishi:'崔妃（？-？），清河郡东武城县（今河北故城）人，崔妃出身河北高门士族清河崔氏，崔妃的叔叔为名士崔琰。之后出嫁权臣曹操之子曹植为妻。因衣装过于华美，曹操登台看到后，认为她违反了穿着朴素的禁令，回家后崔妃就被赐死了。',
			hok_lixin:'炽心化寒剑，冰霜作铁衣，一人一兽化作比这些更冷冽锋利的存在，终破开风雪，终行至峰顶，终向这万仞寒山，挥出劈天裂地的一剑。心火重燃，山海可照。',
			shen_caozhi:'字子建，沛国谯人，三国曹魏著名文学家，建安文学代表人物。魏武帝曹操之子，魏文帝曹丕之弟，生前曾为陈王，去世后谥号“思”，因此又称陈思王。南朝宋文学家谢灵运更有“天下才有一石，曹子建独占八斗”的评价。王士祯尝论汉魏以来二千年间诗家堪称“仙才”者，曹植、李白、苏轼三人耳。',
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
			// pianwan:{
			// 	mod:{
			// 		aiValue:function(player,card,num){
			// 			if(get.name(card)!='shan'&&get.suit(card)!='club') return;
			// 			var cards=player.getCards('h',function(card){
			// 				return get.name(card)=='shan'||get.suit(card)=='club';
			// 			});
			// 			cards.sort(function(a,b){
			// 				return (get.name(b)=='shan'?1:2)-(get.name(a)=='shan'?1:2);
			// 			});
			// 			var geti=function(){
			// 				if(cards.contains(card)){
			// 					return cards.indexOf(card);
			// 				}
			// 				return cards.length;
			// 			};
			// 			if(get.name(card)=='shan') return Math.min(num,[6,4,3][Math.min(geti(),2)])*0.6;
			// 			return Math.max(num,[6.5,4,3][Math.min(geti(),2)]);
			// 		},
			// 		aiUseful:function(){
			// 			return lib.skill.qingguo.mod.aiValue.apply(this,arguments);
			// 		},
			// 	},
			// 	audio:2,
			// 	enable:['chooseToRespond','chooseToUse'],
			// 	filterCard:function(card){
			// 		return get.suit(card)=='club';
			// 	},
			// 	viewAs:{name:'shan'},
			// 	viewAsFilter:function(player){
			// 		if(!player.countCards('h',{suit:'club'})) return false;
			// 	},
			// 	position:'h',
			// 	prompt:'弃置一张梅花手牌当闪使用或打出',
			// 	check:function(){return 1},
			// 	ai:{
			// 		order:3,
			// 		respondShan:true,
			// 		skillTagFilter:function(player){
			// 			if(!player.countCards('h',{suit:'club'})) return false;
			// 		},
			// 		effect:{
			// 			target:function(card,player,target,current){
			// 				if(get.tag(card,'respondShan')&&current<0) return 0.6
			// 			}
			// 		}
			// 	}
			// },
			// 神李信
			lx_wangming:{
				audio:2,
				marktext:'王',
				unique:true,
				trigger:{
					player:['damageEnd','enterGame'],
					global:'phaseBefore',
				},
				forced:true,
				filter:function(event){
					return (event.name!='damage'&&(event.name!='phase'||game.phaseNumber==0))||event.num>0; 
				},
				content:function(){
					player.addMark('lx_wangming',trigger.name=='damage'?1:2);
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
						if(target.hp==1) return 2.5;
						return 1;
					},
					effect:{
						target:function(card,player,target){
							if(get.tag(card,'damage')){
								if(player.hasSkillTag('jueqing',false,target)) return [1,-2];
								if(target.hp==1) return 0.8;
								return [0.5, 0.8];
							}
						}
					}
				}
			},
			lx_dengshen:{
				audio:2,
				trigger:{player:'phaseBegin'},
				forced:true,
				unique:true,
				juexingji:true,
				skillAnimation:true,
				animationColor:'water',
				derivation: ['lx_tongkuang','xinfu_lingren','xinshanjia','reyingzi','reshuishi','lingce','dinghan','drlt_jieying','shencai','xunshi'],
				filter:function(event,player){
					return player.countMark('lx_wangming')>=3;
				},
				content:function(){
					player.removeMark('lx_wangming',2);
					player.syncStorage('lx_wangming');
					player.awakenSkill(event.name);
					player.addSkill('lx_tongkuang');
					player.addSkill('reyingzi');
				},
			},
			lx_tongkuang:{
				audio:2,
				trigger: {player:'phaseDiscardBefore'},
				filter:function(event,player){
					return player.countMark('lx_wangming')>=1;
				},
				usable:1,
				forced:true,
				content:function(){
					'step 0'
					player.chooseControl('人杰','统御','狂暴').set('prompt','选择一个路线');
					'step 1'
					switch (result.control) {
						case '统御':
							player.addTempSkill('lx_tongkuang_tongyu');
							break;
						case '狂暴':
							player.addTempSkill('lx_tongkuang_kuangbao');
							break;
						default:
							player.addTempSkill('lx_tongkuang_renjie');
					}
				},
				subSkill:{
					renjie:{
						audio:2,
						trigger:{player:'phaseDiscardBegin'},
						frequent:true,
						content:function(){
							event.lx = ['xinfu_lingren','xinshanjia','reyingzi'];
							if(player.hasSkill('xinfu_lingren')){
								event.lx.splice(event.lx.indexOf('xinfu_lingren'),1)
							}
							if(player.hasSkill('xinshanjia')){
								event.lx.splice(event.lx.indexOf('xinshanjia'),1)
							}
							if(player.hasSkill('reyingzi')){
								event.lx.splice(event.lx.indexOf('reyingzi'),1)
							}
							'step 0'
							player.chooseControl(event.lx).set('prompt','选择获得一个技能');
							'step 1'
							lx_remove(player, ['tongyu','kuangbao']);
							player.addSkillLog(result.control);
							player.removeMark('lx_wangming',1);
							player.syncStorage('lx_wangming');
						}
					},
					tongyu:{
						audio:2,
						trigger:{player:'phaseJieshuBegin'},
						frequent:true,
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
							lx_remove(player, ['renjie','kuangbao']);
							player.addSkillLog(result.control);
							player.removeMark('lx_wangming',1);
							player.syncStorage('lx_wangming');
						},
					},
					kuangbao:{
						audio:2,
						trigger:{player:'phaseJieshuBegin'},
						frequent:true,
						content:function(){
							event.lx = ['drlt_jieying','shencai','xunshi'];
							if(player.hasSkill('drlt_jieying')){
								event.lx.splice(event.lx.indexOf('drlt_jieying'),1)
							}
							if(player.hasSkill('shencai')){
								event.lx.splice(event.lx.indexOf('shencai'),1)
							}
							if(player.hasSkill('xunshi')){
								event.lx.splice(event.lx.indexOf('xunshi'),1)
							}
							'step 0'
							player.chooseControl(event.lx).set('prompt','选择获得一个技能');
							'step 1'
							lx_remove(player, ['tongyu','renjie']);
							player.addSkillLog(result.control);
							player.removeMark('lx_wangming',1);
							player.syncStorage('lx_wangming');
						}
					}
				}
			},
			// 神曹植
			caigao: {
				audio: '',
				forced: true,
				derivation: 'caigao_rewrite',
				group: 'caigao_rewrite',
				trigger: {global: 'gainEnd'},
				filter: function(event, player){
					return player!=event.player&&event.player!=_status.currentPhase&&!player.storage.caigao_rewrite==true;
				},
				content: function(){
					'step 0'
					player.chooseControl('红色', '黑色').set('prompt', '猜测判定牌颜色').set('ai',function(event){
						switch(Math.floor(Math.random()*3)){
							case 0: case 2: return '红色';
							case 1: return '黑色';
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
						audio:'',
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
					player.chooseTarget('令一名角色回复一点体力并获得“豆”标记').set('ai',function(target){
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
		translate:{
			// 崔氏
			cuishi:'崔氏',
			pianwan:'翩婉',
			pianwan_info:'锁定技，在你的回合外你可以弃置手牌中的一张梅花牌视为打出一张梅花闪。',
			huayi:'华衣',
			huayi_info:'觉醒技，结束阶段时，当你的手牌花色有四种且装备防具时，崔氏获得技能[神赋]，失去技能[洛神]，体力上限改为3。',
			// 神李信
			hok_lixin:'李信',
			lx_wangming:'王命',
			lx_wangming_info:'锁定技，游戏开始时，你获得2枚「王」标记，你视为拥有当前主公的主公技；锁定技，当你造成/受到1点伤害后，你获得一枚「王」标记。',
			lx_dengshen:'登神',
			lx_dengshen_info:'觉醒技，准备阶段，若你武将牌上的「王」数不小于3，则你弃置2枚「王」，获得技能[统狂]、[英姿]。',
			lx_tongkuang:'统狂',
			lx_tongkuang_info:'锁定技，弃牌阶段前，你可以弃置一枚「王」标记，选择[人杰]、[统御]、[狂暴]路线中的一个，然后获得该路线的一个技能，并失去其他路线的技能。（人杰：[缮甲][凌人][英姿]；统御：[慧识][灵策][定汉]；狂暴：[劫营][神裁][巡使]。）',
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
			cannue_info:'锁定技，当你造成1点伤害后，你获得1枚“残虐”标记。你对其他角色、其他角色对你使用【杀】时,都需连续多使用一张【闪】才能抵消。',
			huidu:'毁都',
			huidu_info:'觉醒技，你的回合结束时，当你的“残虐”标记为6时，将视为使用牌堆中15张带伤害标签的牌，每一张牌的使用者与目标随机选择。',
			
			
			// _info:'觉醒技，一名角色回合结束时，当你的“七步”标记为7时，你可以发动成诗，将视为使用牌堆中7张锦囊牌，每一张牌的使用者与目标随机选择。',
			/*
			content:function(){
					player.awakenSkill(event.name);
					
					var cards=[];
					// var cc=get.cardPile2(function(card){
					// 	var info=get.info(card,false);
					// 	return !info.notarget && get.type2(card,'trick')=='trick';
					// });
					// while(cc)
					while(cards.length<70){
						var card=get.cardPile2(function(card){
							for(var i of cards){
								if(i.name==card.name) return false;
							}
							var info=get.info(card,false);
							return !info.notarget && get.type2(card,'trick')=='trick';
						});
						if(card) {
							cards.push(card);
							game.cardsGotoOrdering([card]);
							game.log('=======',card);
						}
						else break;
					}
					if(!cards.length) event.finish();
					else{
						event.cards=cards;
						game.log(cards.length,'  ',cards);
						// game.cardsGotoOrdering(cards);
						
						for(var i of cards){
							var info=lib.card[i.name];
							var list=game.filterPlayer(function(target){
								return !target.isDead();
							});
							var source = list.randomGet();
							var list2 = Array.from(list);
							list2.splice(list2.indexOf(source),1);
							// game.log('来源: ',list);
							// game.log('目标: ',list2);
							// game.log(i, '目标: ',info.selectTarget);
							var target=list2.randomGet();
							if(info.selectTarget!=undefined){
								if(Array.isArray(info.selectTarget)){
									if(info.selectTarget[0]<0) {
										source.useCard(i,'nowuxie');
										game.log(source,'使用了',i.name);
										game.delay(0.5);
									}
									var targets = [];
									targets.push(target);
									list2.splice(list2.indexOf(target),1);
									var target2=list2.randomGet();
									targets.push(target2);
									source.useCard(i,'nowuxie',targets);
									game.log(source,'对',target,'、',target2,'使用了',i.name);
									game.delay(0.5);
								}
								else if(info.selectTarget<0) {
									if(i.name == 'wuzhong'){
										source.useCard(i,'nowuxie', source);
										game.log(source,'对自己使用了',i.name);
										game.delay(0.5);
									}else if(i.name == 'wugu'){
										source.useCard(i,'nowuxie', list);
										game.log(source,'对',list,'使用了',i.name);
										game.delay(0.5);
									}else{
										source.useCard(i,'nowuxie', list2);
										game.log(source,'对',list2,'使用了',i.name);
										game.delay(0.5);
									}
								}
								else if(i.name == 'jiedao'){
									target2 = list.randomGet();
									var targets = [];
									targets.push(target);
									targets.push(target2);
									source.useCard(i,'nowuxie',targets);
									game.log(source,'对',target,'使用了',i.name);
									game.delay(0.5);
								}
								else{
									source.useCard(i,'nowuxie',target);
									game.log(source,'对',target,'使用了',i.name);
									game.delay(0.5);
								}
							}
						}
					}
				},
				*/
			
			correction_history:'正史',
			honor_of_kings:'王者荣耀',
			our_kings:'众选神将',
		},
	};
});
