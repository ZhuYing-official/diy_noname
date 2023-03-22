game.import("extension", function (lib, game, ui, get, ai, _status) {
	return {
		name: "欢乐三国杀", content: function (config, pack) {
		}, precontent: function (ext) {
			if (ext.enable) {
				game.import("character", function () {
					var happykill = {
						name: "happykill",
						connect: true,
						characterSort:{
                            happykill:{
                                biao_zhu:['hpp_caocao','hpp_liubei','hpp_sunquan'],
                                biao_hu:[],
                                biao_meng:[],
                                biao_jiao:[],
                                biao_wei:[],
                                biao_mou:[],
                                feng_xiao:[],
                                feng_li:[],
                                feng_zhi:[],
                                feng_xian:[],
                                lin_zhi:[],
                                lin_man:[],
                                lin_xiong:[],
                                huo_zhong:[],
                                huo_yi:[],
                                huo_bi:[],
                                shan_zhen:[],
                                shan_si:[],
                                shan_liang:[],
                                shan_ce:[],
                                shan_ji:[],
                                ming_shu:[],
                                ming_ru:[],
                                ming_cao:[],
                                ming_han:[],
                                ming_qi:[],
                                xian_sp:[],
                                xian_jin:[],
                                shen_wei:[],
                                shen_shu:[],
                                shen_wu:[],
                                shen_qun:[],
                            },
                        },
                        character:{
                            // 欢乐曹操
                            hpp_caocao: ["male", "wei", 4, ["new_rejianxiong", "rehujia"], ['zhu']],
                            // 欢乐刘备
                            hpp_liubei: ['male', 'shu', 4, ['rerende', 'hljijiang'], ['zhu']],
                            // 欢乐孙权
                            hpp_sunquan: ['male', 'wu', 4, ['rezhiheng', 'hljiuyuan'], ['zhu']],
                        },
                        characterIntro:{
                        },
                        characterReplace:{
                        },
                        characterFilter:{
                        },
                        skill:{
                            
                            
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
                            hpp_caocao:'#b捞得一评级:3.4',
                        },
                        translate:{
                            hpp_caocao:'曹操',
                            hpp_liubei:'刘备',
                            hpp_sunquan:'孙权',
                            
                            biao_zhu:'标·主',
                            biao_hu:'标·虎',
                            biao_meng:'标·猛',
                            biao_jiao:'标·娇',
                            biao_wei:'标·威',
                            biao_mou:'标·谋',
                            feng_xiao:'风·骁',
                            feng_li:'风·离',
                            feng_zhi:'风·志',
                            feng_xian:'风·仙',
                            lin_zhi:'林·智',
                            lin_man:'林·蛮',
                            lin_xiong:'林·雄',
                            huo_zhong:'火·忠',
                            huo_yi:'火·义',
                            huo_bi:'火·愎',
                            shan_zhen:'山·贞',
                            shan_si:'山·嗣',
                            shan_liang:'山·良',
                            shan_ce:'山·策',
                            shan_ji:'山·继',
                            ming_shu:'名·淑',
                            ming_ru:'名·儒',
                            ming_cao:'名·曹',
                            ming_han:'名·悍',
                            ming_qi:'名·奇',
                            xian_sp:'限·SP',
                            xian_jin:'限·锦',
                            shen_wei:'神·魏',
                            shen_shu:'神·蜀',
                            shen_wu:'神·吴',
                            shen_qun:'神·群',
                        },
					};
					if (lib.device || lib.node) {
                        for (var i in happykill.character) {
                            happykill.character[i][4].push('ext:欢乐三国杀/image/character/' + i + '.jpg');
                        }
                    }
                    else {
                        for (var i in happykill.character) {
                            happykill.character[i][4].push('db:extension-欢乐三国杀/image/character:' + i + '.jpg');
                        }
                    }
					return happykill;
				});
				lib.config.all.characters.push("happykill");
				if (!lib.config.characters.contains("happykill")) lib.config.characters.push("happykill");
				lib.translate["happykill_character_config"] = "欢乐三国杀";
			}
		}, help: {}, config: {}, package: {
			character: {
				character: {},
				translate: {}
			},
			card: {
				card: {},
				translate: {},
				list: []
			},
			skill: {
				skill: {},
				translate: {}
			},
			intro: "",
			author: "欢乐三国杀(搬运:捞得一)",
			diskURL: "",
			forumURL: "",
			version: "1.0",
		}, files: { "character": [], "card": [], "skill": [] }
	}
})