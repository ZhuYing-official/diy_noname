game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "欢乐三国杀", content: function (config, pack) {
            //评级
            //评级
            if (lib.rank) {
                var rank = {
                    rarity: {
                        //传说
                        legend: [
                            'hpp_shen_luxun',
                            'hpp_shen_zhangjiao',

                            'hpp_caocao',
                            'hpp_ganning',
                            'hpp_guanyu',
                            'hpp_huanggai',
                            'hpp_huangzhong',
                            'hpp_liubei',
                            'hpp_machao',
                            'hpp_sunquan',
                            'hpp_xiahoudun',
                            'hpp_xuzhu',
                            'hpp_zhangfei',
                            'hpp_zhangliao',
                            'hpp_zhaoyun',
                        ],
                        //史诗
                        epic: [
                        ],
                        //稀有
                        rare: [
                        ],
                        //普通
                        common: [

                        ],
                        //平凡
                        junk: [

                        ],
                    },
                };
                for (var name of Object.keys(lib.characterPack['happykill'])) {
                    if (!Object.keys(rank.rarity).some(rarity => rank.rarity[rarity].contains(name))) {
                        rank.rarity.junk.push(name);
                    }
                }
                var addRank = function (rank) {
                    if (!lib.rank) return;
                    for (var i in rank) {
                        if (i == 'rarity') continue;
                        lib.rank[i].addArray(rank[i]);
                    }
                    if (rank.rarity && lib.rank.rarity) {
                        for (var i in rank.rarity) {
                            if (lib.rank.rarity[i] === undefined) {
                                lib.rank.rarity[i] = [];
                            }
                            lib.rank.rarity[i].addArray(rank.rarity[i]);
                        }
                    }
                };
                addRank(rank);
            }
        }, precontent: function (ext) {
            if (ext.enable) {
                game.import("character", function () {
                    var happykill = {
                        name: "happykill",
                        connect: true,
                        characterSort: {
                            happykill: {
                                biao_zhu: ['hpp_caocao', 'hpp_liubei', 'hpp_sunquan'],
                                biao_hu: ['hpp_guanyu', 'hpp_zhangfei', 'hpp_zhaoyun', 'hpp_machao', 'hpp_huangzhong'],
                                biao_meng: ['hpp_xuzhu', 'hpp_huanggai', 'hpp_xiahoudun', 'hpp_zhangliao', 'hpp_ganning'],
                                biao_jiao: ['hpp_daqiao', 'hpp_xiaoqiao', 'hpp_diaochan', 'hpp_sunshangxiang', 'hpp_zhenji'],
                                biao_wei: ['hpp_huaxiong', 'hpp_liaohua', 'hpp_pangde', 'hpp_huatuo', 'hpp_lvbu'],
                                biao_mou: ['hpp_lvmeng', 'hpp_simayi', 'hpp_guojia', 'hpp_zhugeliang', 'hpp_pangtong'],
                                feng_xiao: ['hpp_caoren', 'hpp_guohuai', 'hpp_weiyan', 'hpp_xiahouyuan'],
                                feng_li: ['hpp_liubiao', 'hpp_caifuren',],
                                feng_zhi: ['hpp_sunce', 'hpp_zhoutai', 'hpp_zhouyu',],
                                feng_xian: ['hpp_zhangjiao', 'hpp_yuji', 'hpp_zuoci'],
                                lin_zhi: ['hpp_zhangsong', 'hpp_zhongyao', 'hpp_masu', 'hpp_huangyueying', 'hpp_luxun', 'hpp_lusu', 'hpp_jiaxu'],
                                lin_man: ['hpp_shamoke', 'hpp_zhurong', 'hpp_menghuo',],
                                lin_xiong: ['hpp_sunliang', 'hpp_sunjian', 'hpp_gongsunzan', 'hpp_dongzhuo', 'hpp_liuyan'],
                                huo_zhong: ['hpp_zhangzhaozhanghong', 'hpp_wangping', 'hpp_dianwei', 'hpp_jiangwei', 'hpp_xunyu', 'hpp_dongyun', 'hpp_zumao'],
                                huo_yi: ['hpp_taishici', 'hpp_luji', 'hpp_lingtong', 'hpp_xusheng', 'hpp_gaoshun', 'hpp_zhuran', 'hpp_zhuzhi',],
                                huo_bi: ['hpp_zhonghui', 'hpp_liuxie', 'hpp_panfeng', 'hpp_quyi', 'hpp_yanliangwenchou', 'hpp_yuanshao', 'hpp_xuyou', 'hpp_yuanshu'],
                                shan_zhen: ['hpp_fuhuanghou', 'hpp_mayunlu', 'hpp_xuhsi', 'hpp_dufuren', 'hpp_caiwenji', 'hpp_wangyi', 'hpp_zhangchunhua', 'hpp_bulianshi'],
                                shan_si: ['hpp_liushan', 'hpp_zhugezhan', 'hpp_gaunping', 'hpp_liufen', 'hpp_zhangxingcai', 'hpp_gaunyinpin', 'hpp_zhaoxiang'],
                                shan_liang: ['hpp_xuhuang', 'hpp_dengai', 'hpp_zhanghe', 'hpp_yujin', 'hpp_lidian'],
                                shan_ce: ['hpp_wolongzhuge', 'hpp_xunyou', 'hpp_jianyong', 'hpp_buzhi', 'hpp_yangxiu'],
                                shan_ji: ['hpp_lukang', 'hpp_zhugeguo', 'hpp_sunhao', 'hpp_zhugeke', 'hpp_luyusheng',],
                                ming_shu: ['hpp_zhoufei', 'hpp_wuguotai', 'hpp_sunluban', 'hpp_xiahoushi', 'hpp_wuxian', 'hpp_guohuanghou', 'hpp_xinxianying', 'hpp_dongbai', 'hpp_sunluyu'],
                                ming_ru: ['hpp_fazheng', 'hpp_chengong', 'hpp_liru', 'hpp_jushou', 'hpp_zhugejin', 'hpp_qinmi', 'hpp_xushu', 'hpp_liuzhang'],
                                ming_cao: ['hpp_caopi', 'hpp_caozhi', 'hpp_caozhang', 'hpp_caocong', 'hpp_caozhen', 'hpp_caorui', 'hpp_caoxiu', 'hpp_caoang', 'hpp_caoying'],
                                ming_han: ['hpp_haozhao', 'hpp_zhangxiu', 'hpp_madai', 'hpp_chenpu', 'hpp_handang', 'hpp_wuyi', 'hpp_xurong', 'hpp_lijue', 'hpp_chunyuqiong'],
                                ming_qi: ['hpp_xizhicai', 'hpp_zhangliang', 'hpp_zhangbao', 'hpp_beimihu'],
                                xian_sp: ['hpp_sp_jiangwei', 'hpp_sp_haungyueying', 'hpp_sp_taishici', 'hpp_sp_machao', 'hpp_sp_daqiao', 'hpp_sp_zhaoyun', 'hpp_sp_sunshangxiang', 'hpp_sp_caiwenji', 'hpp_sp_xiaoqiao', 'hpp_sp_diaochan'],
                                xian_sp2: ['hpp_sp_pangde'],
                                xian_jin: ['hpp_guansuo', 'hpp_baosanniang', 'hpp_liuzan', 'hpp_guozhao', 'hpp_panshu', 'hpp_lvlingqi', 'hpp_zhangchangpu', 'hpp_zhangqiying', 'hpp_puyuan', 'hpp_xushao'],
                                shen_wei: ['hpp_shen_caocao', 'hpp_shen_simayi', 'hpp_shen_zhangliao', 'hpp_shen_dianwei', 'hpp_shen_guojia'],
                                shen_shu: ['hpp_shen_guanyu', 'hpp_shen_zhugeliang', 'hpp_shen_zhaoyun', 'hpp_shen_liubei'],
                                shen_wu: ['hpp_shen_lvmeng', 'hpp_shen_zhouyu', 'hpp_shen_luxun', 'hpp_shen_ganning', 'hpp_shen_sunquan', 'hpp_shen_sunce'],
                                shen_qun: ['hpp_shen_lvbu', 'hpp_shen_huatuo', 'hpp_shen_zhenji', 'hpp_shen_zhangjiao'],
                            },
                        },
                        character: {
                            // 欢乐曹操
                            hpp_caocao: ["male", "wei", 4, ["hpp_jianxiong", "hpp_hujia"], ['zhu']],
                            // 欢乐甘宁
                            hpp_ganning: ['male', 'wu', 4, ['hpp_qixi', 'hpp_fenwei'], []],
                            // 欢乐关羽
                            hpp_guanyu: ['male', 'shu', 4, ['hpp_wusheng'], []],
                            // 欢乐黄盖
                            hpp_huanggai: ['male', 'wu', 4, ['kurou', 'hpp_zhaxiang'], []],
                            // 欢乐黄忠
                            hpp_huangzhong: ['male', 'shu', 4, ['hpp_liegong'], []],
                            // 欢乐刘备
                            hpp_liubei: ['male', 'shu', 4, ['hpp_rende', 'hpp_jijiang'], ['zhu']],
                            // 欢乐马超
                            hpp_machao: ['male', 'shu', 4, ['hpp_yuma', 'hpp_tieji'], []],
                            // 欢乐孙权
                            hpp_sunquan: ['male', 'wu', 4, ['hpp_zhiheng', 'hpp_jiuyuan'], ['zhu']],
                            // 欢乐夏侯惇
                            hpp_xiahoudun: ['male', 'wei', 4, ['reganglie', 'hpp_qingjian'], []],
                            // 欢乐许诸
                            hpp_xuzhu: ['male', 'wei', 4, ['hpp_luoyi', 'hpp_huchi'], []],
                            // 欢乐张飞
                            hpp_zhangfei: ['male', 'shu', 4, ['new_repaoxiao', 'hpp_tishen'], []],
                            // 欢乐张辽
                            hpp_zhangliao: ['male', 'wei', 4, ['new_retuxi', 'hpp_zhengbing'], []],
                            // 欢乐赵云
                            hpp_zhaoyun: ['male', 'shu', 4, ['ollongdan', 'hpp_yajiao'], []],

                            // 神陆逊
                            hpp_shen_luxun: ["male", "shen", 4, ["hpp_junlue", "hpp_cuike", "hpp_zhanhuo"], ["wu"]],
                            // 神张角
                            hpp_shen_zhangjiao: ['male', 'shen', 3, ['hpp_yizhao', 'hpp_sanshou', 'hpp_sijun', 'hpp_tianjie'], ['qun']],
                        },
                        characterIntro: {
                            hpp_shen_luxun: '本名陆议，字伯言，吴郡吴县人。历任东吴大都督、丞相。吴大帝孙权兄孙策之婿，世代为江东大族。以谦逊之书麻痹关羽，夺取荆州，又有火烧连营大破蜀军。',
                            hpp_shen_zhangjiao: '乱世的开始，黄巾起义军首领，太平道创始人。张角早年信奉黄老学说，对在汉代十分流行的谶纬之学也深有研究，对民间医术 、巫术也很熟悉。',
                        },
                        characterReplace: {
                            caocao: ['hpp_caocao', 're_caocao', 'caocao'],
                            ganning: ['hpp_ganning', 're_ganning', 'ganning'],
                            guanyu: ['hpp_guanyu', 're_guanyu', 'guanyu'],
                            huanggai: ['hpp_huanggai', 're_huanggai', 'huanggai'],
                            huangzhong: ['hpp_huangzhong', 're_huangzhong', 'huangzhong'],
                            machao: ['hpp_machao', 're_machao', 'machao'],
                            liubei: ['hpp_liubei', 're_liubei', 'liubei'],
                            sunquan: ['hpp_sunquan', 're_sunquan', 'sunquan'],
                            xiahoudun: ['hpp_xiahoudun', 're_xiahoudun', 'xin_xiahoudun', 'xiahoudun'],
                            xuzhu: ['hpp_xuzhu', 're_xuzhu', 'xuzhu'],
                            zhangfei: ['hpp_zhangfei', 're_zhangfei', 'tw_zhangfei', 'xin_zhangfei', 'old_zhangfei', 'zhangfei'],
                            zhangliao: ['hpp_zhangliao', 're_zhangliao', 'zhangliao'],
                            zhaoyun: ['hpp_zhaoyun', 're_zhaoyun', 'old_zhaoyun', 'zhaoyun'],

                            shen_luxun: ['hpp_shen_luxun', 'shen_luxun'],
                            shen_zhangjiao: ['hpp_shen_zhangjiao', 'shen_zhangjiao'],
                        },
                        characterFilter: {
                        },
                        skill: {
                            // 曹操
                            hpp_jianxiong: {
                                audio: "rejianxiong",
                                audioname: ['shen_caopi'],
                                trigger: {
                                    player: "damageEnd",
                                },
                                content: function () {
                                    'step 0'
                                    event.count = trigger.num;
                                    'step 1'
                                    event.count--;
                                    player.chooseControl('摸一张牌并获得造成伤害的牌', '摸两张').set('prompt').set('ai', function (event, player) {
                                        var value = 0;
                                        if (get.itemtype(trigger.cards) == 'cards' && get.position(trigger.cards[0], true) == 'o') {
                                            for (i of trigger.cards) {
                                                value += get.value(i);
                                            }
                                        }
                                        if (value > 3) {
                                            return '摸一张牌并获得造成伤害的牌';
                                        } else {
                                            return '摸两张';
                                        }
                                    });
                                    "step 2"
                                    if (result.control == '摸一张牌并获得造成伤害的牌') {
                                        if (get.itemtype(trigger.cards) == 'cards' && get.position(trigger.cards[0], true) == 'o') {
                                            player.gain(trigger.cards, "gain2");
                                        }
                                        player.draw('nodelay');
                                    } else {
                                        player.draw(2, 'nodelay');
                                    }
                                    'step 3'
                                    if (event.count > 0) {
                                        event.goto(1);
                                    }
                                },
                                ai: {
                                    maixie: true,
                                    "maixie_hp": true,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
                                            if (get.tag(card, 'damage') && player != target) {
                                                var cards = card.cards, evt = _status.event;
                                                if (evt.player == target && card.name == 'damage' && evt.getParent().type == 'card') cards = evt.getParent().cards.filterInD();
                                                if (target.hp <= 1) return;
                                                if (get.itemtype(cards) != 'cards') return;
                                                for (var i of cards) {
                                                    if (get.name(i, target) == 'tao') return [1, 5];
                                                }
                                                if (get.value(cards, target) >= (7 + target.getDamagedHp())) return [1, 3];
                                                return [1, 0.6];
                                            }
                                        },
                                    },
                                },
                            },
                            hpp_hujia: {
                                audio: 'hujia',
                                inherit: 'hujia',
                                filter: function (event, player) {
                                    if (event.responded) return false;
                                    if (player.storage.hujiaing) return false;
                                    if (!player.hasZhuSkill('hpp_hujia')) return false;
                                    if (!event.filterCard({ name: 'shan' }, player, event)) return false;
                                    return game.hasPlayer(function (current) {
                                        return current != player && current.group == 'wei';
                                    });
                                },
                                ai: {
                                    respondShan: true,
                                    skillTagFilter: function (player) {
                                        if (player.storage.hujiaing) return false;
                                        if (!player.hasZhuSkill('hpp_hujia')) return false;
                                        return game.hasPlayer(function (current) {
                                            return current != player && current.group == 'wei';
                                        });
                                    },
                                },
                                group: 'hpp_hujia_draw',
                                subSkill: {
                                    draw: {
                                        trigger: { global: ['useCard', 'respond'] },
                                        usable: 1,
                                        direct: true,
                                        filter: function (event, player) {
                                            return event.getParent(2).name == 'hpp_hujia' && event.card.name == 'shan' && event.player != player &&
                                                event.player.group == 'wei' && event.player.isIn() && player.hasZhuSkill('hpp_hujia');
                                        },
                                        content: function () {
                                            'step 0'
                                            trigger.player.chooseBool('护驾：是否令' + get.translation(player) + '摸一张牌？').set('ai', function () {
                                                var evt = _status.event;
                                                return get.attitude(evt.player, evt.getParent().player) > 0;
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                player.logSkill('hpp_hujia');
                                                trigger.player.line(player, 'fire');
                                                player.draw();
                                            }
                                            else player.storage.counttrigger.hpp_hujia_draw--;
                                        },
                                    },
                                },
                            },

                            // 甘宁
                            hpp_qixi: {
                                group: 'qixi',
                                audio: 'qixi',
                                trigger: { player: 'phaseUseBegin' },
                                direct: true,
                                filter: function (event, player) {
                                    return game.hasPlayer(function (target) {
                                        return target.countDiscardableCards(player, 'he');
                                    });
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_qixi'), '弃置一名角色的一张牌', function (card, player, target) {
                                        return target.countDiscardableCards(player, 'he');
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        return get.effect(target, { name: 'guohe_copy2' }, player, player);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_qixi', result.targets);
                                        player.discardPlayerCard(result.targets[0], 'he', true);
                                    }
                                },
                            },
                            hpp_fenwei: {
                                audio: 'fenwei',
                                skillAnimation: true,
                                animationColor: 'wood',
                                unique: true,
                                mark: true,
                                limited: true,
                                trigger: { global: 'useCardToPlayered' },
                                filter: function (event, player) {
                                    if (event.getParent().triggeredTargets3.length > 1) return false;
                                    if (get.type(event.card) != 'trick') return false;
                                    if (get.info(event.card).multitarget) return false;
                                    if (event.targets.length < 2) return false;
                                    return true;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_fenwei'), '令' + get.translation(trigger.card) + '对任意名角色无效', [1, trigger.targets.length], function (card, player, target) {
                                        return _status.event.targets.contains(target);
                                    }).set('ai', function (target) {
                                        var trigger = _status.event.getTrigger();
                                        return -get.effect(target, trigger.card, trigger.player, _status.event.player);
                                    }).set('targets', trigger.targets);
                                    'step 1'
                                    if (result.bool) {
                                        player.addSkill('hpp_fenwei_huifu');
                                        player.logSkill('hpp_fenwei', result.targets);
                                        player.awakenSkill('hpp_fenwei');
                                        trigger.getParent().excluded.addArray(result.targets);
                                    }
                                    else event.finish();
                                    'step 2'
                                    player.draw();
                                },
                                subSkill: {
                                    huifu: {
                                        charlotte: true,
                                        trigger: {
                                            player: 'loseAfter',
                                            global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
                                        },
                                        filter: function (event, player) {
                                            if (player.countCards('h')) return false;
                                            if (!player.awakenedSkills.contains('hpp_fenwei')) return false;
                                            var evt = event.getl(player);
                                            return evt && evt.player == player && evt.hs && evt.hs.length > 0;
                                        },
                                        direct: true,
                                        firstDo: true,
                                        content: function () {
                                            player.removeSkill('hpp_fenwei_huifu');
                                            player.restoreSkill('hpp_fenwei');
                                            game.log(player, '复原了技能', '#g【奋威】');
                                        },
                                    },
                                },
                            },

                            // 关羽
                            hpp_wusheng: {
                                frequent: true,
                                audio: 'wusheng',
                                group: 'hpp_wusheng_damage',
                                audioname2: { hpp_guansuo: 'wusheng_guansuo' },
                                trigger: { player: 'phaseZhunbeiBegin' },
                                content: function () {
                                    var card = get.cardPile(function (cardx) {
                                        return cardx.name == 'sha' && get.color(cardx) == 'red';
                                    });
                                    if (card) player.gain(card, 'gain2', 'log');
                                },
                                subSkill: {
                                    damage: {
                                        audio: 'wusheng',
                                        audioname2: { hpp_guansuo: 'wusheng_guansuo' },
                                        trigger: { source: 'damageBegin1' },
                                        filter: function (event) {
                                            return event.card && event.card.name == 'sha' && get.color(event.card) == 'red' && event.notLink();
                                        },
                                        mod: {
                                            aiOrder: function (player, card, num) {
                                                if (get.itemtype(card) == 'card' && card.name == 'sha' && get.color(card) == 'red') return num + 0.1;
                                            },
                                        },
                                        content: function () {
                                            trigger.num++;
                                        },
                                    },
                                },
                            },

                            // 黄盖
                            hpp_zhaxiang: {
                                mod: {
                                    targetInRange: function (card, player, target, now) {
                                        if (card.name == 'sha' && get.color(card) == 'red') return true;
                                    },
                                    cardUsable: function (card, player, num) {
                                        if (card.name == 'sha') return num + 1;
                                    }
                                },
                                audio: 'zhaxiang',
                                trigger: { player: 'useCard' },
                                forced: true,
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && get.color(event.card) == 'red';
                                },
                                content: function () {
                                    trigger.directHit.addArray(game.players);
                                },
                                ai: {
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        return arg.card.name == 'sha' && get.color(arg.card) == 'red';
                                    },
                                },
                            },

                            // 黄忠
                            hpp_liegong: {
                                mod: {
                                    targetInRange: function (card, player, target) {
                                        if (card.name == 'sha') return true;
                                    },
                                },
                                shaRelated: true,
                                audio: 'liegong',
                                trigger: { player: 'useCardToPlayered' },
                                check: function (event, player) {
                                    return get.attitude(player, event.target) <= 0;
                                },
                                forced: true,
                                locked: false,
                                logTarget: 'target',
                                filter: function (event, player) {
                                    if (event.card.name != 'sha') return false;
                                    return event.target.countCards('h') <= player.countCards('h') || event.target.hp >= player.hp;
                                },
                                preHidden: true,
                                content: function () {
                                    if (trigger.target.countCards('h') <= player.countCards('h')) trigger.getParent().directHit.push(trigger.target);
                                    if (trigger.target.hp >= player.hp) {
                                        var id = trigger.target.playerid;
                                        var map = trigger.getParent().customArgs;
                                        if (!map[id]) map[id] = {};
                                        if (typeof map[id].extraDamage != 'number') {
                                            map[id].extraDamage = 0;
                                        }
                                        map[id].extraDamage++;
                                    }
                                },
                                ai: {
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (arg.card.name != 'sha') return false;
                                        return arg.target.countCards('h') <= player.countCards('h');
                                    },
                                },
                            },

                            // 刘备
                            hpp_rende: {
                                audio: 2,
                                audioname: ['gz_jun_liubei', 'shen_caopi'],
                                enable: 'phaseUse',
                                filterCard: true,
                                selectCard: [1, Infinity],
                                discard: false,
                                lose: false,
                                delay: false,
                                group: 'hpp_rende_draw',
                                filterTarget: function (card, player, target) {
                                    if (player.storage.hpp_rende2 && player.storage.hpp_rende2.contains(target)) return false;
                                    return player != target;
                                },
                                onremove: ['hpp_rende', 'hpp_rende2'],
                                check: function (card) {
                                    if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') return 0;
                                    if (!ui.selected.cards.length && card.name == 'du') return 20;
                                    var player = get.owner(card);
                                    if (ui.selected.cards.length >= Math.max(2, player.countCards('h') - player.hp)) return 0;
                                    if (player.hp == player.maxHp || player.storage.hpp_rende < 0 || player.countCards('h') <= 1) {
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
                                        if (player.countCards('h') > 2) return 6 - get.value(card);
                                        return -1;
                                    }
                                    return 10 - get.value(card);
                                },
                                content: function () {
                                    'step 0'
                                    var evt = _status.event.getParent('phaseUse');
                                    if (evt && evt.name == 'phaseUse' && !evt.hpp_rende) {
                                        var next = game.createEvent('hpp_rende_clear');
                                        _status.event.next.remove(next);
                                        evt.after.push(next);
                                        evt.hpp_rende = true;
                                        next.player = player;
                                        next.setContent(lib.skill.hpp_rende1.content);
                                    }
                                    if (!Array.isArray(player.storage.hpp_rende2)) {
                                        player.storage.hpp_rende2 = [];
                                    }
                                    player.storage.hpp_rende2.push(target);
                                    player.give(cards, target);
                                    if (cards.length > 0) {
                                        player.addTempSkill('hpp_rende_effect', { player: 'phaseBefore' });
                                        target.storage.hpp_rende_disable_mark = player;
                                        target.addSkill('hpp_rende_disable');
                                        target.addSkill('hpp_rende_disable_mark');
                                    }
                                    if (typeof player.storage.hpp_rende != 'number') {
                                        player.storage.hpp_rende = 0;
                                    }
                                    if (player.storage.hpp_rende >= 0) {
                                        player.storage.hpp_rende += cards.length;
                                        if (player.storage.hpp_rende >= 2) {
                                            var list = [];
                                            if (lib.filter.cardUsable({ name: 'sha' }, player, event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                return player.canUse('sha', current);
                                            })) {
                                                list.push(['基本', '', 'sha']);
                                            }
                                            for (var i of lib.inpile_nature) {
                                                if (lib.filter.cardUsable({ name: 'sha', nature: i }, player, event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                    return player.canUse({ name: 'sha', nature: i }, current);
                                                })) {
                                                    list.push(['基本', '', 'sha', i]);
                                                }
                                            }
                                            if (lib.filter.cardUsable({ name: 'tao' }, player, event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                return player.canUse('tao', current);
                                            })) {
                                                list.push(['基本', '', 'tao']);
                                            }
                                            if (lib.filter.cardUsable({ name: 'jiu' }, player, event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                return player.canUse('jiu', current);
                                            })) {
                                                list.push(['基本', '', 'jiu']);
                                            }
                                            for (var i of lib.inpile) {
                                                if (get.type(i) == 'trick') {
                                                    if (lib.filter.filterCard({ name: i }, player, _status.event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                        return player.canUse(i, current);
                                                    })) {
                                                        list.push(['锦囊', '', i]);
                                                    }
                                                }
                                            }
                                            if (list.length) {
                                                player.chooseButton(['是否视为使用一张基本或普通锦囊牌？', [list, 'vcard']]).set('ai', function (button) {
                                                    var player = _status.event.player;
                                                    var card = { name: button.link[2], nature: button.link[3] };
                                                    if (card.name == 'tao') {
                                                        if (player.hp == 1 || (player.hp == 2 && !player.hasShan()) || player.needsToDiscard()) {
                                                            return 5;
                                                        }
                                                        return 1;
                                                    }
                                                    if (card.name == 'sha') {
                                                        if (game.hasPlayer(function (current) {
                                                            return player.canUse(card, current) && get.effect(current, card, player, player) > 0
                                                        })) {
                                                            if (card.nature == 'fire') return 2.95;
                                                            if (card.nature == 'thunder' || card.nature == 'ice') return 2.92;
                                                            return 2.9;
                                                        }
                                                        return 0;
                                                    }
                                                    if (card.name == 'jiu') {
                                                        return 0.5;
                                                    }
                                                    return _status.event.player.getUseValue({ name: card.name, isCard: true });;
                                                });
                                            }
                                            else {
                                                event.finish();
                                            }
                                            player.storage.hpp_rende = -1;
                                        }
                                        else {
                                            event.finish();
                                        }
                                    }
                                    else {
                                        event.finish();
                                    }
                                    'step 1'
                                    if (result && result.bool && result.links[0]) {
                                        var card = { name: result.links[0][2], nature: result.links[0][3] };
                                        player.chooseUseTarget(card, true);
                                    }
                                },
                                ai: {
                                    fireAttack: true,
                                    order: function (skill, player) {
                                        if (player.hp < player.maxHp && player.storage.hpp_rende < 2 && player.countCards('h') > 1) {
                                            return 10;
                                        }
                                        return 4;
                                    },
                                    result: {
                                        target: function (player, target) {
                                            if (target.hasSkillTag('nogain')) return 0;
                                            if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                                                if (target.hasSkillTag('nodu')) return 0;
                                                return -10;
                                            }
                                            if (target.hasJudge('lebu')) return 0;
                                            var nh = target.countCards('h');
                                            var np = player.countCards('h');
                                            if (player.hp == player.maxHp || player.storage.hpp_rende < 0 || player.countCards('h') <= 1) {
                                                if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
                                            }
                                            return Math.max(1, 5 - nh);
                                        }
                                    },
                                    effect: {
                                        target: function (card, player, target) {
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
                                subSkill: {
                                    draw: {
                                        trigger: { global: ['useCard', 'respond'] },
                                        usable: 1,
                                        direct: true,
                                        filter: function (event, player) {
                                            return event.card.name == 'sha' && player != _status.currentPhase && event.player != player && event.player.group == 'shu' && player.hasZhuSkill('hpp_rende');
                                        },
                                        content: function () {
                                            'step 0'
                                            trigger.player.chooseBool('仁德：是否令' + get.translation(player) + '摸一张牌？').set('ai', function () {
                                                var evt = _status.event;
                                                return get.attitude(evt.player, evt.getParent().player) > 0;
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                player.logSkill('hpp_rende');
                                                trigger.player.line(player, 'fire');
                                                player.draw();
                                            }
                                            else player.storage.counttrigger.rehujia_draw--;
                                        },
                                    },
                                    effect: {
                                        forced: true,
                                    },
                                    disable: {
                                        // group:'hpp_rende_disable_mark',
                                        mod: {
                                            playerEnabled: function (card, player, target) {
                                                if (card.name == 'sha' && get.color(card) == 'red' && target.hasSkill('hpp_rende_effect')) {
                                                    return false;
                                                }
                                            },
                                        },
                                        intro: {
                                            content: "你无法对$使用红色【杀】直到$的下回合开始",
                                        },
                                    },
                                    disable_mark: {
                                        mark: 'character',
                                        intro: {
                                            content: '你无法对$使用红色【杀】直到$的下回合开始',
                                        },
                                        onremove: function (player) {
                                            delete player.storage.hpp_rende_disable_mark;
                                            player.removeSkill('hpp_rende_disable');
                                        },
                                        trigger: { global: 'phaseBeginStart' },
                                        firstDo: true,
                                        charlotte: true,
                                        silent: true,
                                        filter: function (event, player) {
                                            return event.player == player.storage.hpp_rende_disable_mark;
                                        },
                                        content: function () {
                                            player.removeSkill('hpp_rende_disable_mark');
                                        }
                                    }
                                }
                            },
                            hpp_rende1: {
                                trigger: { player: 'phaseUseBegin' },
                                silent: true,
                                content: function () {
                                    player.storage.hpp_rende = 0;
                                    player.storage.hpp_rende2 = [];
                                }
                            },
                            hpp_jijiang: {
                                unique: true,
                                audio: 'jijiang1',
                                group: 'hpp_jijiang1',
                                zhuSkill: true,
                                filter: function (event, player) {
                                    if (!player.hasZhuSkill('hpp_jijiang') || !game.hasPlayer(function (current) {
                                        return current != player && current.group == 'shu';
                                    })) return false;
                                    return !event.hpp_jijiang && (event.type != 'phase' || !player.hasSkill('hpp_jijiang3'));
                                },
                                enable: ['chooseToUse', 'chooseToRespond'],
                                viewAs: { name: 'sha' },
                                filterCard: function () { return false },
                                selectCard: -1,
                                ai: {
                                    order: function () {
                                        return get.order({ name: 'sha' }) + 0.3;
                                    },
                                    respondSha: true,
                                    skillTagFilter: function (player) {
                                        if (!player.hasZhuSkill('hpp_jijiang') || !game.hasPlayer(function (current) {
                                            return current != player && current.group == 'shu';
                                        })) return false;
                                    },
                                },
                            },
                            hpp_jijiang1: {
                                audio: 'jijiang1',
                                audioname: ['liushan', 're_liubei', 're_liushan', 'ol_liushan'],
                                trigger: { player: ['useCardBegin', 'respondBegin'] },
                                logTarget: 'targets',
                                filter: function (event, player) {
                                    return event.skill == 'hpp_jijiang';
                                },
                                forced: true,
                                content: function () {
                                    'step 0'
                                    delete trigger.skill;
                                    trigger.getParent().set('hpp_jijiang', true);
                                    'step 1'
                                    if (event.current == undefined) event.current = player.next;
                                    if (event.current == player) {
                                        player.addTempSkill('hpp_jijiang3');
                                        event.finish();
                                        trigger.cancel();
                                        trigger.getParent().goto(0);
                                    }
                                    else if (event.current.group == 'shu') {
                                        var next = event.current.chooseToRespond('是否替' + get.translation(player) + '打出一张杀？', { name: 'sha' });
                                        next.set('ai', function () {
                                            var event = _status.event;
                                            return (get.attitude(event.player, event.source) - 2);
                                        });
                                        next.set('source', player);
                                        next.set('hpp_jijiang', true);
                                        next.set('skillwarn', '替' + get.translation(player) + '打出一张杀');
                                        next.noOrdering = true;
                                        next.autochoose = lib.filter.autoRespondSha;
                                    }
                                    else {
                                        event.current = event.current.next;
                                        event.redo();
                                    }
                                    'step 2'
                                    if (result.bool) {
                                        game.asyncDraw([player, event.current]);
                                        event.finish();
                                        trigger.card = result.card;
                                        trigger.cards = result.cards;
                                        trigger.throw = false;
                                        if (typeof event.current.ai.shown == 'number' && event.current.ai.shown < 0.95) {
                                            event.current.ai.shown += 0.3;
                                            if (event.current.ai.shown > 0.95) event.current.ai.shown = 0.95;
                                        }
                                    }
                                    else {
                                        event.current = event.current.next;
                                        event.goto(1);
                                    }
                                }
                            },
                            hpp_jijiang3: {
                                trigger: { global: ['useCardAfter', 'useSkillAfter', 'phaseAfter'] },
                                silent: true,
                                charlotte: true,
                                filter: function (event) {
                                    return event.skill != 'hpp_jijiang' && event.skill != 'qinwang';
                                },
                                content: function () {
                                    player.removeSkill('hpp_jijiang3');
                                },
                            },

                            // 马超
                            hpp_yuma: {
                                group: 'mashu',
                                trigger: {
                                    player: 'loseAfter',
                                    global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
                                },
                                filter: function (event, player) {
                                    var evt = event.getl(player);
                                    if (!evt || evt.player != player || !evt.es || !evt.es.length) return false;
                                    for (var card of evt.es) {
                                        if (get.type(card) == 'equip' && ['equip3', 'equip4', 'equip6'].contains(get.subtype(card))) return true;
                                    }
                                    return false;
                                },
                                forced: true,
                                content: function () {
                                    var list = [], evt = trigger.getl(player);
                                    for (var card of evt.es) {
                                        if (get.type(card) == 'equip' && ['equip3', 'equip4', 'equip6'].contains(get.subtype(card))) list.push(card);
                                    }
                                    player.draw(2 * list.length);
                                },
                            },
                            hpp_tieji: {
                                audio: 'retieji',
                                shaRelated: true,
                                trigger: { player: 'useCardToPlayered' },
                                check: function (event, player) {
                                    return get.attitude(player, event.target) < 0;
                                },
                                filter: function (event, player) {
                                    return event.card.name == 'sha';
                                },
                                logTarget: 'target',
                                preHidden: true,
                                content: function () {
                                    'step 0'
                                    trigger.target.addTempSkill('fengyin');
                                    player.judge(function (card) {
                                        if (get.color(card) == 'red') return 2;
                                        return -1;
                                    }).judge2 = function (result) {
                                        return result.bool;
                                    };
                                    'step 1'
                                    if (result.bool) trigger.getParent().directHit.add(trigger.target);
                                    else player.draw(2);
                                },
                                ai: {
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (get.attitude(player, arg.target) > 0 || arg.card.name != 'sha' || !ui.cardPile.firstChild || get.color(ui.cardPile.firstChild, player) != 'red') return false;
                                    },
                                },
                            },

                            // 孙权
                            hpp_zhiheng: {
                                audio: 2,
                                audioname: ['shen_caopi'],
                                enable: 'phaseUse',
                                usable: 3,
                                filter: function (event, player) {
                                    if (player.getStat('skill').hpp_zhiheng == 1) {
                                        return !player.storage.zhihengDelay;
                                    } else if (player.getStat('skill').hpp_zhiheng == 2) {
                                        return !player.storage.zhihengNotBasic;
                                    } else {
                                        player.storage.zhihengDelay = false;
                                        player.storage.zhihengNotBasic = false;
                                    }
                                    return true;
                                },
                                position: 'he',
                                filterCard: lib.filter.cardDiscardable,
                                discard: false,
                                lose: false,
                                delay: false,
                                selectCard: [1, Infinity],
                                check: function (card) {
                                    var player = _status.event.player;
                                    if (get.position(card) == 'h' && !player.countCards('h', 'du') && (player.hp > 2 || !player.countCards('h', function (card) {
                                        return get.value(card) >= 8;
                                    }))) {
                                        return 1;
                                    }
                                    return 6 - get.value(card)
                                },
                                content: function () {
                                    'step 0'
                                    player.discard(cards);
                                    event.num = 1;
                                    var hs = player.getCards('h');
                                    if (!hs.length) event.num = 0;
                                    for (var i = 0; i < hs.length; i++) {
                                        if (!cards.contains(hs[i])) {
                                            event.num = 0; break;
                                        }
                                    }
                                    'step 1'
                                    player.draw(event.num + cards.length);
                                    'step 2'
                                    if (player.getStat('skill').hpp_zhiheng != undefined) {
                                        if (player.getStat('skill').hpp_zhiheng == 1) {
                                            player.storage.zhihengDelay = false;
                                            player.storage.zhihengNotBasic = false;
                                            for (i of result) {
                                                if (get.type(i) == 'delay') {
                                                    player.storage.zhihengDelay = true;
                                                    player.storage.zhihengNotBasic = false;
                                                }
                                            }
                                        } else if (player.getStat('skill').hpp_zhiheng == 2) {
                                            player.storage.zhihengDelay = false;
                                            player.storage.zhihengNotBasic = false;
                                            for (i of result) {
                                                if (get.type(i) != 'basic') {
                                                    player.storage.zhihengNotBasic = true;
                                                    player.storage.zhihengDelay = false;
                                                }
                                            }
                                        }
                                    }
                                },
                                subSkill: {
                                },
                                ai: {
                                    order: 1,
                                    result: {
                                        player: 1
                                    },
                                    threaten: 1.55
                                },
                            },
                            hpp_jiuyuan: {
                                group: 'hpp_jiuyuan_tao',
                                audio: 'rejiuyuan',
                                zhuSkill: true,
                                trigger: { global: 'recoverBefore' },
                                direct: true,
                                filter: function (event, player) {
                                    return event.player.group == 'wu' && event.getParent().name != 'hpp_jiuyuan' && player != event.player
                                        && player.hasZhuSkill('hpp_jiuyuan', event.player) && event.player == _status.currentPhase;
                                },
                                content: function () {
                                    'step 0'
                                    trigger.player.chooseBool('是否对' + get.translation(player) + '发动【救援】？', '改为令其回复1点体力，然后你摸一张牌').set('ai', function () {
                                        var evt = _status.event;
                                        return get.attitude(evt.player, evt.getParent().player) > 0;
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_jiuyuan');
                                        trigger.player.line(player, 'green');
                                        trigger.cancel();
                                        player.recover();
                                        trigger.player.draw();
                                    }
                                },
                                subSkill: {
                                    tao: {
                                        audio: 'rejiuyuan',
                                        trigger: { target: 'taoBegin' },
                                        forced: true,
                                        filter: function (event, player) {
                                            if (event.player == player) return false;
                                            if (!player.hasZhuSkill('hpp_jiuyuan')) return false;
                                            if (event.player.group != 'wu') return false;
                                            if (!player.isDying()) return false;
                                            return true;
                                        },
                                        content: function () {
                                            trigger.baseDamage++;
                                        },
                                    },
                                },
                            },

                            // 夏侯惇
                            hpp_qingjian: {
                                audio: 'qingjian',
                                trigger: { player: 'gainAfter' },
                                direct: true,
                                usable: 1,
                                filter: function (event, player) {
                                    if (event.parent.parent.name == 'phaseDraw') return false;
                                    return event.cards && event.cards.length > 0
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseCardTarget({
                                        position: 'he',
                                        filterCard: true,
                                        selectCard: [1, Infinity],
                                        filterTarget: lib.filter.notMe,
                                        ai1: function (card) {
                                            if (get.attitude(_status.event.player, _status.currentPhase) < 0 && _status.currentPhase.needsToDiscard() && card.name != 'du') return -1;
                                            for (var i = 0; i < ui.selected.cards.length; i++) {
                                                if (get.type(ui.selected.cards[i]) == get.type(card) || (ui.selected.cards[i].name == 'du' && card.name != 'du')) return -1;
                                            };
                                            if (card.name == 'du') return 20;
                                            return (_status.event.player.countCards('h') - _status.event.player.hp);
                                        },
                                        ai2: function (target) {
                                            if (get.attitude(_status.event.player, _status.currentPhase) < 0) return -1;
                                            var att = get.attitude(_status.event.player, target);
                                            if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                                                if (target.hasSkillTag('nodu')) return 0;
                                                return 1 - att;
                                            }
                                            if (target.countCards('h') > _status.event.player.countCards('h')) return 0;
                                            return att - 4;
                                        },
                                        prompt: get.prompt2('hpp_qingjian'),
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0], cards = result.cards;
                                        player.logSkill('hpp_qingjian', target);
                                        target.gain(cards, player, 'giveAuto');
                                        player.draw();
                                    }
                                    else player.storage.counttrigger.hpp_qingjian--;
                                },
                                ai: { expose: 0.3 },
                            },

                            // 许诸
                            hpp_luoyi: {
                                audio: 2,
                                trigger: { player: 'phaseDrawBegin2' },
                                check: function (event, player) {
                                    if (player.countCards('h') < 3) return false;
                                    if (!player.hasSha()) return false;
                                    return game.hasPlayer(function (current) {
                                        return get.attitude(player, current) < 0 && player.canUse('sha', current);
                                    });
                                },
                                preHidden: true,
                                filter: function (event, player) {
                                    return !event.numFixed && event.num > 0;
                                },
                                content: function () {
                                    player.addTempSkill('hpp_luoyi2');
                                    trigger.num--;
                                }
                            },
                            hpp_luoyi2: {
                                trigger: { source: 'damageBegin1' },
                                filter: function (event) {
                                    return event.card && (event.card.name == 'sha' || event.card.name == 'juedou') && event.notLink();
                                },
                                forced: true,
                                content: function () {
                                    trigger.num++;
                                },
                                ai: {
                                    damageBonus: true
                                }
                            },
                            hpp_huchi: {
                                group: ['hpp_huchi_miss', 'hpp_huchi_draw'],
                                audio: 2,
                                trigger: { player: 'phaseJieshuBegin' },
                                frequent: true,
                                prompt: '是否发动【虎痴】，将手牌摸至两张？',
                                filter: function (event, player) {
                                    return player.countCards('h') < 2;
                                },
                                content: function () {
                                    player.drawTo(2);
                                },
                                marktext: '痴',
                                intro: { name: '虎痴', name2: '痴', content: 'mark' },
                                subSkill: {
                                    miss: {
                                        shaRelated: true,
                                        audio: 'hpp_huchi',
                                        trigger: { player: 'shaMiss' },
                                        forced: true,
                                        locked: false,
                                        content: function () {
                                            player.addMark('hpp_huchi', 1);
                                        },
                                    },
                                    draw: {
                                        audio: 'hpp_huchi',
                                        enable: 'phaseUse',
                                        filter: function (event, player) {
                                            return player.countMark('hpp_huchi');
                                        },
                                        usable: 1,
                                        content: function () {
                                            var num = player.countMark('hpp_huchi');
                                            player.removeMark('hpp_huchi', num);
                                            player.draw(num);
                                        },
                                        ai: {
                                            order: 1,
                                            result: { player: 1 },
                                        },
                                    },
                                },
                            },

                            // 张飞
                            hpp_tishen: {
                                group: 'hpp_tishen_effect',
                                audio: 'retishen',
                                trigger: { target: 'shaUnhirt' },
                                filter: function (event, player) {
                                    if (player.isPhaseUsing()) return false;
                                    if (get.itemtype(event.cards) != 'cards') return false;
                                    for (var i = 0; i < event.cards.length; i++) {
                                        if (event.cards[i].isInPile()) {
                                            return true;
                                        }
                                    }
                                    return false;
                                },
                                frequent: true,
                                content: function () {
                                    var list = [];
                                    for (var i = 0; i < trigger.cards.length; i++) {
                                        if (trigger.cards[i].isInPile()) {
                                            list.push(trigger.cards[i]);
                                        }
                                    }
                                    player.gain(list, 'gain2');
                                },
                                subSkill: {
                                    effect: {
                                        audio: 'retishen',
                                        trigger: { player: 'shaMiss' },
                                        filter: function (event, player) {
                                            return player.isPhaseUsing();
                                        },
                                        frequent: true,
                                        content: function () {
                                            trigger.card.hpp_tishen_effect = true;
                                            player.addTempSkill('hpp_tishen_effect2', 'phaseUseAfter');
                                        },
                                    },
                                    effect2: {
                                        group: ['hpp_tishen_effect3', 'hpp_tishen_effect4'],
                                        audio: 'retishen',
                                        trigger: { player: 'useCardToPlayered' },
                                        forced: true,
                                        filter: function (event, player) {
                                            return event.card.hpp_tishen_effect2;
                                        },
                                        logTarget: 'target',
                                        content: function () {
                                            var target = trigger.target;
                                            trigger.directHit.add(target);
                                            var id = target.playerid;
                                            var map = trigger.customArgs;
                                            if (!map[id]) map[id] = {};
                                            if (!map[id].extraDamage) map[id].extraDamage = 0;
                                            map[id].extraDamage++;
                                        },
                                    },
                                    effect3: {
                                        charlotte: true,
                                        trigger: { player: 'useCardAfter' },
                                        filter: function (event, player) {
                                            return event.card.hpp_tishen_effect2;
                                        },
                                        direct: true,
                                        lastDo: true,
                                        content: function () {
                                            player.removeSkill('hpp_tishen_effect2');
                                        },
                                    },
                                    effect4: {
                                        charlotte: true,
                                        trigger: { player: 'useCard1' },
                                        filter: function (event, player) {
                                            if (!event.card || event.card.name != 'sha') return false;
                                            if (event.card.hpp_tishen_effect) return false;
                                            return true;
                                        },
                                        direct: true,
                                        firstDo: true,
                                        content: function () {
                                            trigger.card.hpp_tishen_effect2 = true;
                                        },
                                    },
                                },
                            },

                            // 张辽
                            hpp_zhengbing: {
                                mod: {
                                    ignoredHandcard: function (card, player) {
                                        if (card.hasGaintag('hpp_zhengbing')) return true;
                                    },
                                    cardDiscardable: function (card, player, name) {
                                        if (name == 'phaseDiscard' && card.hasGaintag('hpp_zhengbing')) return false;
                                    },
                                },
                                group: 'hpp_zhengbing_mark',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('h', function (card) {
                                        return card.hasGaintag('hpp_zhengbing');
                                    });
                                },
                                filterCard: function (card) {
                                    return card.hasGaintag('hpp_zhengbing');
                                },
                                check: function (card) {
                                    return 7 - get.value(card);
                                },
                                prepare: function (cards, player) {
                                    player.$throw(cards, 1000);
                                    game.log(player, '将', cards, '置入了弃牌堆');
                                },
                                discard: false,
                                loseTo: 'discardPile',
                                visible: true,
                                delay: 0.5,
                                content: function () {
                                    player.draw(player.countCards('h', function (card) {
                                        return card.hasGaintag('hpp_zhengbing');
                                    }) ? 1 : 2);
                                },
                                ai: {
                                    order: 10,
                                    result: { player: 1 },
                                },
                                subSkill: {
                                    mark: {
                                        charlotte: true,
                                        trigger: { player: 'gainBegin' },
                                        filter: function (event, player) {
                                            return lib.translate[event.getParent(3).name] == '突袭';
                                        },
                                        direct: true,
                                        firstDo: true,
                                        content: function () {
                                            trigger.gaintag.add('hpp_zhengbing');
                                        },
                                    },
                                },
                            },

                            // 赵云
                            hpp_yajiao: {
                                group: 'hpp_yajiao_count',
                                audio: 'reyajiao',
                                trigger: { player: ['respond', 'useCard'] },
                                frequent: true,
                                filter: function (event, player) {
                                    return player != _status.currentPhase && get.itemtype(event.cards) == 'cards';
                                },
                                content: function () {
                                    'step 0'
                                    var card = get.cards()[0];
                                    event.card = card;
                                    player.showCards(card, get.translation(player) + '发动了【涯角】');
                                    player.chooseTarget('是否令一名角色获得' + get.translation(card) + '？').set('ai', function (target) {
                                        var att = get.attitude(_status.event.player, target);
                                        if (_status.event.du) {
                                            if (target.hasSkillTag('nodu')) return 0;
                                            return -att;
                                        }
                                        if (att > 0) return att + Math.max(0, 5 - target.countCards('h'));
                                        return att;
                                    }).set('du', event.card.name == 'du');
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.line(target);
                                        target.gain(card, 'gain2');
                                    }
                                    else {
                                        player.$throw(card, 1000);
                                        game.delayx();
                                        game.cardsDiscard(card);
                                        game.log(card, '进入了弃牌堆');
                                    }
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (get.tag(card, 'respond') && target.countCards('h') > 1) return [1, 0.2];
                                        },
                                    },
                                },
                                subSkill: {
                                    count: {
                                        trigger: { player: ['useCardAfter', 'respondAfter'] },
                                        forced: true,
                                        popup: false,
                                        filter: function (event, player) {
                                            return lib.translate[event.skill] == '龙胆' && player == _status.currentPhase;
                                        },
                                        content: function () {
                                            player.addTempSkill('hpp_yajiao_draw');
                                        },
                                    },
                                    draw: {
                                        audio: 'reyajiao',
                                        trigger: { player: 'phaseJieshuBegin' },
                                        forced: true,
                                        charlotte: true,
                                        onremove: true,
                                        content: function () {
                                            player.draw();
                                        },
                                    },
                                },
                            },

                            // 神陆逊
                            hpp_junlue: {
                                audio: 2,
                                //marktext:"军",
                                intro: {
                                    content: '当前有#个标记',
                                },
                                //mark:true,
                                trigger: {
                                    player: "damageAfter",
                                    source: "damageSource",
                                },
                                forced: true,
                                content: function () {
                                    player.addMark('hpp_junlue', trigger.num);
                                },
                            },
                            hpp_cuike: {
                                audio: 2,
                                trigger: {
                                    player: "phaseUseBegin",
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    if (player.countMark('hpp_junlue') % 2 == 1) {
                                        player.chooseTarget('是否发动【摧克】，对一名角色造成一点伤害？').ai = function (target) {
                                            return -get.attitude(player, target);
                                        };
                                    }
                                    else {
                                        player.chooseTarget('是否发动【摧克】，横置一名角色并弃置其区域内的一张牌？').ai = function (target) {
                                            return -get.attitude(player, target);
                                        };
                                    }
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_cuike', result.targets);
                                        if (player.countMark('hpp_junlue') % 2 == 1) {
                                            result.targets[0].damage();
                                        }
                                        else {
                                            result.targets[0].link(true);
                                            player.discardPlayerCard(result.targets[0], 1, 'hej', true);
                                        };
                                    };
                                    'step 2'
                                    if (player.countMark('hpp_junlue') > 7) {
                                        player.chooseBool().set('ai', function () {
                                            return true;
                                        }).set('prompt', '是否弃置所有“军略”标记并对所有其他角色造成一点伤害？');
                                    } else {
                                        event.finish();
                                    };
                                    'step 3'
                                    if (result.bool) {
                                        var players = game.players.slice(0).sortBySeat();
                                        player.line(players);
                                        player.removeMark('hpp_junlue', player.countMark('hpp_junlue'));
                                        for (var i = 0; i < players.length; i++) {
                                            if (players[i] != player) players[i].damage();
                                        };
                                    };
                                },
                            },
                            hpp_zhanhuo: {
                                audio: 2,
                                limited: true,
                                init: function (player) {
                                    player.storage.hpp_zhanhuo = false;
                                },
                                intro: {
                                    content: "limited",
                                },
                                unique: true,
                                mark: true,
                                skillAnimation: true,
                                animationColor: 'metal',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return !player.storage.hpp_zhanhuo && player.countMark('hpp_junlue') > 0;
                                },
                                check: function (event, player) {
                                    var num = game.countPlayer(function (current) { return get.attitude(player, current) < 0 && current.isLinked() });
                                    return player.storage.hpp_junlue >= num && num == game.countPlayer(function (current) { return get.attitude(player, current) < 0 });
                                },
                                filterTarget: function (card, player, target) {
                                    return target.isLinked();
                                },
                                selectTarget: function () {
                                    return [1, _status.event.player.countMark('hpp_junlue')];
                                },
                                multiline: true,
                                multitarget: true,
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_zhanhuo');
                                    player.storage.hpp_zhanhuo = true;
                                    'step 1'
                                    player.removeMark('hpp_junlue', player.countMark('hpp_junlue'));
                                    for (var i = 0; i < targets.length; i++) {
                                        targets[i].discard(targets[i].getCards('e'));
                                    }
                                    player.chooseTarget(true, '对一名目标角色造成1点火焰伤害', function (card, player, target) {
                                        return _status.event.targets.contains(target);
                                    }).set('targets', targets).ai = function () { return 1 };
                                    'step 2'
                                    if (result.bool) {
                                        result.targets[0].damage('fire', 'nocard');
                                    }
                                },
                                ai: {
                                    order: 1,
                                    fireAttack: true,
                                    result: {
                                        target: function (player, target) {
                                            if (target.hasSkillTag('nofire')) return 0;
                                            if (lib.config.mode == 'versus') return -1;
                                            if (player.hasUnknown()) return 0;
                                            return get.damageEffect(target, player) - target.countCards('e');
                                        }
                                    }
                                }
                            },

                            // 神张角
                            hpp_yizhao: {
                                audio: 2,
                                trigger: {
                                    player: ['useCard', 'respond']
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return typeof get.number(event.card) == 'number';
                                },
                                marktext: '黄',
                                intro: {
                                    name: '黄(异兆/肆军)',
                                    name2: '黄',
                                    content: 'mark',
                                    markcount: function (storage, player) {
                                        return storage.toString().slice(-2);
                                    },
                                },
                                content: function () {
                                    'step 0'
                                    event.num = player.countMark('hpp_yizhao');
                                    player.addMark('hpp_yizhao', get.number(trigger.card));
                                    'step 1'
                                    var num = Math.floor(num / 10) % 10, num2 = Math.floor(player.countMark('hpp_yizhao') / 10) % 10;
                                    if (num != num2) {
                                        var card = get.cardPile2(card => {
                                            return get.number(card, false) == num2;
                                        });
                                        if (card) player.gain(card, 'gain2');
                                    }
                                },
                                mod: {
                                    aiOrder: function (player, card, num) {
                                        if ((get.number(card) + player.countMark('hpp_yizhao')) % 10 > 10) return num + 10;
                                    },
                                },
                                ai: {
                                    threaten: 1.5,
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 0.1];
                                        }
                                    }
                                }
                            },
                            hpp_sanshou: {
                                audio: 2,
                                trigger: { player: 'damageBegin4' },
                                check: function (event, player) {
                                    return get.damageEffect(player, event.source, event.source, event.nature) <= 0;
                                },
                                content: function () {
                                    'step 0'
                                    var cards = game.cardsGotoOrdering(get.cards(3)).cards;
                                    event.cards = cards;
                                    player.showCards(cards, get.translation(player) + '发动了【三首】');
                                    'step 1'
                                    var types = [];
                                    types.addArray(game.getGlobalHistory('useCard').map(evt => get.type2(evt.card)));
                                    if (cards.filter(card => !types.contains(get.type2(card))).length) {
                                        trigger.cancel();
                                    }
                                    game.delayx();
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (card.name == 'shandian' || card.name == 'fulei') return [0, 0.1];
                                            if (!get.tag(card, 'damage')) return;
                                            var types = [], bool = 0;
                                            types.addArray(game.getGlobalHistory('useCard').map(evt => get.type2(evt.card)));
                                            if (!types.contains(get.type2(card))) bool = 1;
                                            if (types.length < 2) return Math.min(1, 0.4 + (types.length + bool) * 0.2);
                                        }
                                    }
                                },
                            },
                            hpp_sijun: {
                                audio: 2,
                                trigger: { player: 'phaseZhunbeiBegin' },
                                filter: function (event, player) {
                                    return player.countMark('hpp_yizhao') > ui.cardPile.childNodes.length;
                                },
                                check: () => true,
                                content: function () {
                                    'step 0'
                                    player.removeMark('hpp_yizhao', player.countMark('hpp_yizhao'));
                                    var cards = get.cards(ui.cardPile.childElementCount + 1);
                                    for (var i = 0; i < cards.length; i++) {
                                        ui.cardPile.insertBefore(cards[i], ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
                                    }
                                    game.updateRoundNumber();
                                    'step 1'
                                    var pile = Array.from(ui.cardPile.childNodes);
                                    if (pile.length < 3) return;
                                    var bool = false, max = Math.pow(2, Math.min(100, pile.length)), index;
                                    for (var i = 0; i < max; i++) {
                                        var num = 0;
                                        index = i.toString(2);
                                        while (index.length < pile.length) {
                                            index = ('0' + index);
                                        }
                                        for (var k = 0; k < index.length; k++) {
                                            if (index[k] == '1') num += get.number(pile[k]);
                                            if (num > 36) break;
                                        }
                                        if (num == 36) {
                                            bool = true;
                                            break;
                                        }
                                    }
                                    if (bool) {
                                        var cards = [];
                                        for (var k = 0; k < index.length; k++) {
                                            if (index[k] == '1') cards.push(pile[k]);
                                        }
                                        player.gain(cards, 'gain2');
                                    }
                                }
                            },
                            hpp_tianjie: {
                                audio: 2,
                                trigger: { global: 'phaseEnd' },
                                direct: true,
                                filter: function (event, player) {
                                    return player.hasSkill('hpp_tianjie_shuffled');
                                },
                                group: 'hpp_tianjie_effect',
                                skillAnimation: true,
                                animationColor: 'metal',
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_tianjie'), '选择至多三名其他角色，依次对这些角色造成X点雷电伤害（X为其手牌中【闪】的数量，至少为1）', [1, 3]).set('ai', target => {
                                        var player = _status.event.player;
                                        return get.damageEffect(target, player, player, 'thunder') * Math.sqrt(Math.max(1, target.countCards('h', 'shan')));
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var targets = result.targets;
                                        targets.sortBySeat();
                                        player.logSkill('hpp_tianjie', targets);
                                        for (var target of targets) {
                                            var num = Math.max(1, target.countCards('h', 'shan'));
                                            target.damage(num, 'thunder');
                                        }
                                    }
                                },
                                subSkill: {
                                    effect: {
                                        trigger: { global: 'washCard' },
                                        forced: true,
                                        silent: true,
                                        charlotte: true,
                                        content: function () {
                                            player.addTempSkill('hpp_tianjie_shuffled');
                                        },
                                    },
                                    shuffled: { charlotte: true },
                                }
                            },
                        },
                        dynamicTranslate: {
                        },
                        characterTitle: {
                            // g绿 b蓝 r红 p粉
                            hpp_caocao: '#r捞德一评级:4.1',
                            hpp_ganning: '#r捞德一评级:4.2',
                            hpp_guanyu: '#r捞德一评级:4.2',
                            hpp_huanggai: '#r捞德一评级:4.3',
                            hpp_huangzhong: '#r捞德一评级:4.0',
                            hpp_liubei: '#r捞德一评级:4.2',
                            hpp_machao: '#r捞德一评级:4.2',
                            hpp_sunquan: '#r捞德一评级:4.3',
                            hpp_xiahoudun: '#r捞德一评级4.0',
                            hpp_xuzhu: '#r捞德一评级4.0',
                            hpp_zhangfei: '#r捞德一评级:4.2',
                            hpp_zhangliao: '#r捞德一评级:4.2',
                            hpp_zhaoyun: '#r捞德一评级:4.0',
                            hpp_shen_luxun: '#r捞德一评级:4.1',
                            hpp_shen_zhangjiao: '#r捞德一评级4.5',
                        },
                        translate: {
                            hpp_caocao: '曹操',
                            hpp_jianxiong: '奸雄',
                            hpp_jianxiong_info: '当你受到1点伤害时，你可以摸一张牌，并获得对你造成伤害的牌；或摸两张牌。',
                            hpp_hujia: '护驾',
                            hpp_hujia_info: '主公技，其他魏势力角色可以替你使用或打出【闪】。其他魏势力角色若以此法使用或打出【闪】时，可令你摸一张牌，每回合限一张。',
                            hpp_ganning: '甘宁',
                            hpp_qixi: '奇袭',
                            hpp_qixi_info: '出牌阶段开始时，可以选择一名角色，弃置其一张牌。出牌阶段，你可以将一张黑色牌当【过河拆桥】使用。',
                            hpp_fenwei: '奋威',
                            hpp_fenwei_info: '限定技，当一张锦囊牌指定多个目标后，你可以令此牌对其中任意个目标无效，并摸一张牌，当你失去最后一张手牌时，重置本技能。',
                            hpp_guanyu: '关羽',
                            hpp_wusheng: '武圣',
                            hpp_wusheng_info: '回合开始时，你获得一张红色【杀】。你的红色【杀】伤害+1。',
                            hpp_huanggai: '黄盖',
                            hpp_zhaxiang: '诈降',
                            hpp_zhaxiang_info: '锁定技，你使用红色【杀】无距离限制且不能被【闪】响应，且你可以多使用一张【杀】。',
                            hpp_huangzhong: '黄忠',
                            hpp_liegong: '烈弓',
                            hpp_liegong_info: '你的【杀】无视距离。当你使用【杀】指定目标后：若目标角色的手牌数小于等于你，不能使用【闪】；目标体力大于等于你，此【杀】伤害+1。',
                            hpp_liubei: '刘备',
                            hpp_rende: '仁德',
                            hpp_rende_info: '出牌阶段每名角色限一次，你可以将任意张手牌交给一名其他角色,并可以让其无法对你使用红色【杀】直到你的下回合开始。当你给出第二张“仁德”牌时，你可以视为使用一张基本牌或普通锦囊牌。',
                            hpp_jijiang: '激将',
                            hpp_jijiang_info: '主公技，其他蜀势力角色可以在你需要时代替你使用或打出【杀】。若以此法出杀，则你与其各摸一张牌。你的回合外，当其他蜀势力角色使用或打出【杀】时，其可令你摸一张牌，每回合限一张。',
                            hpp_machao: '马超',
                            hpp_yuma: '驭马',
                            hpp_yuma_info: '锁定技，你计算与其他角色的距离-1。当你失去装备区中的坐骑时，你摸两张牌。',
                            hpp_tieji: '铁骑',
                            hpp_tieji_info: '当你使用【杀】指定目标后，你可以令其本回合非锁定技失效，然后你进行判定，若为红色，该角色不能使用【闪】；黑色，你摸两张牌。',
                            hpp_sunquan: '孙权',
                            hpp_zhiheng: '制衡',
                            hpp_zhiheng_info: '出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。若你以此法弃置了所有的手牌，则额外摸一张牌；若你以此法获得的牌不包含延时锦牌，则本同合此技能使用次数+1；若你本回合第二次以此法获得的牌全是基本牌，则本回合此技能使用次数再+1。',
                            hpp_jiuyuan: '救援',
                            hpp_jiuyuan_info: '主公技，其他吴势力角色于其回合内回复体力时，该角色可以改为令你回复1点体力，然后其摸一张牌。当你处于濒死状态时，其他吴势力武将对你使用的【桃】回复的体力+1。',
                            hpp_xiahoudun: '夏侯惇',
                            hpp_qingjian: '清俭',
                            hpp_qingjian_info: '每回合限一次，当你于摸牌阶段外获得牌后，你可以展示任意张牌并交给一名其他角色，然后你摸一张牌。',
                            hpp_xuzhu: '许诸',
                            hpp_luoyi: '裸衣',
                            hpp_luoyi_info: '摸牌阶段，你可以少摸一张牌，然后本回合你使用【杀】或【决斗】造成的伤害+1。',
                            hpp_huchi: '虎痴',
                            hpp_huchi_info: '回合结束时，若你的手牌数小于2，则摸至2张；且当你对目标出杀被闪时，你获得一枚“痴”。出牌阶段限一次，可以弃置所有“痴”，摸同等数量的牌。',
                            hpp_zhangfei: '张飞',
                            hpp_tishen: '替身',
                            hpp_tishen_info: '回合外，获得所有对你使用且未对你造成伤害的【杀】。出牌阶段你使用的杀被闪抵消后，则你本阶段使用的下一张【杀】不可被响应且造成的伤害+1。',
                            hpp_zhangliao: '张辽',
                            hpp_zhengbing: '整兵',
                            hpp_zhengbing_info: '通过〖突袭〗获得的牌不计入手牌上限；且可以被重铸；最后一张突袭牌被重铸时再摸一张牌。',
                            hpp_zhaoyun: '赵云',
                            hpp_yajiao: '涯角',
                            hpp_yajiao_info: '当你于回合外使用或打出手牌时，你可以展示牌堆顶的一张牌并将其交给一名角色；当你于自己回合内使用过【龙胆】，本回合结束阶段摸一张牌。',

                            hpp_shen_luxun: '神陆逊',
                            hpp_junlue: '军略',
                            hpp_junlue_info: '锁定技，当你受到或造成1点伤害后，你获得一个“军略"标记。',
                            hpp_cuike: '摧克',
                            hpp_cuike_info: '出牌阶段开始时，若“军略”数量为奇数，你可以对一名角色造成1点伤害；若“军略”数量为偶数，你可以横置一名角色并弃置其区域里的—张牌。若“军略”数量超过7个，你可以移去全部“军略”标记并对所有其他角色造成1点伤害。',
                            hpp_zhanhuo: '绽火',
                            hpp_zhanhuo_info: '限定技，出牌阶段，你可以移去全部“军略”标记，令至多等量的已横置角色弃置所有装备区里的牌，然后对其中1名角色造成1点火焰伤害。',
                            hpp_shen_zhangjiao: '神张角',
                            hpp_yizhao: '异兆',
                            hpp_yizhao_info: '锁定技，你使用或打出一张牌时，获得等于此牌点数的“黄”标记。每次“黄”的十位数因此变化时，你获得牌堆中一张与变化后十位数点数相同的牌。',
                            hpp_sanshou: '三首',
                            hpp_sanshou_info: '当你受到伤害时，你可以亮出牌堆顶三张牌，若包含本回合未使用过的类型，你防止此伤害。',
                            hpp_sijun: '肆军',
                            hpp_sijun_info: '准备阶段，若“黄”标记数量大于牌堆的牌数，你可以移去所有“黄”，然后从牌堆中随机获得点数之和为36的牌，并洗牌。',
                            hpp_tianjie: '天劫',
                            hpp_tianjie_info: '每个回合结束时，若本回合牌堆洗过牌，你可以选择至多3名其他角色，对这些角色分别造成X点雷电伤害（X为其手牌中【闪】的数量且至少为1）',

                            biao_zhu: '标·主',
                            biao_hu: '标·虎',
                            biao_meng: '标·猛',
                            biao_jiao: '标·娇',
                            biao_wei: '标·威',
                            biao_mou: '标·谋',
                            feng_xiao: '风·骁',
                            feng_li: '风·离',
                            feng_zhi: '风·志',
                            feng_xian: '风·仙',
                            lin_zhi: '林·智',
                            lin_man: '林·蛮',
                            lin_xiong: '林·雄',
                            huo_zhong: '火·忠',
                            huo_yi: '火·义',
                            huo_bi: '火·愎',
                            shan_zhen: '山·贞',
                            shan_si: '山·嗣',
                            shan_liang: '山·良',
                            shan_ce: '山·策',
                            shan_ji: '山·继',
                            ming_shu: '名·淑',
                            ming_ru: '名·儒',
                            ming_cao: '名·曹',
                            ming_han: '名·悍',
                            ming_qi: '名·奇',
                            xian_sp: '限·SP',
                            xian_jin: '限·锦',
                            shen_wei: '神·魏',
                            shen_shu: '神·蜀',
                            shen_wu: '神·吴',
                            shen_qun: '神·群',
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
                lib.config.all.sgscharacters.push('happykill');
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
            intro: "官方作者：《欢乐三国杀》<br/>\
                    扩展作者：捞德一<br/>\
                    代码节选：《活动武将》驴佬",
            // author: "欢乐三国杀(搬运:捞德一)",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        }, files: { "character": [], "card": [], "skill": [] },
        editable: false
    }
})