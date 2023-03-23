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
                            'hpp_guanyu',
                            'hpp_huangzhong',
                            'hpp_machao',
                            'hpp_zhangfei',
                            'hpp_zhaoyun',
                        ],
                        //史诗
                        epic: [
                            'hpp_caocao',
                            'hpp_liubei',
                            'hpp_sunquan',
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
                                biao_meng: [],
                                biao_jiao: [],
                                biao_wei: [],
                                biao_mou: [],
                                feng_xiao: [],
                                feng_li: [],
                                feng_zhi: [],
                                feng_xian: [],
                                lin_zhi: [],
                                lin_man: [],
                                lin_xiong: [],
                                huo_zhong: [],
                                huo_yi: [],
                                huo_bi: [],
                                shan_zhen: [],
                                shan_si: [],
                                shan_liang: [],
                                shan_ce: [],
                                shan_ji: [],
                                ming_shu: [],
                                ming_ru: [],
                                ming_cao: [],
                                ming_han: [],
                                ming_qi: [],
                                xian_sp: [],
                                xian_jin: [],
                                shen_wei: [],
                                shen_shu: [],
                                shen_wu: [],
                                shen_qun: [],
                            },
                        },
                        character: {
                            // 欢乐曹操
                            hpp_caocao: ["male", "wei", 4, ["hpp_jianxiong", "hujia"], ['zhu']],
                            // 欢乐关羽
                            hpp_guanyu: ['male', 'shu', 4, ['hpp_wusheng'], []],
                            // 欢乐黄忠
                            hpp_huangzhong: ['male', 'shu', 4, ['hpp_liegong'], []],
                            // 欢乐刘备
                            hpp_liubei: ['male', 'shu', 4, ['rerende', 'hpp_jijiang'], ['zhu']],
                            // 欢乐马超
                            hpp_machao: ['male', 'shu', 4, ['hpp_yuma', 'hpp_tieji'], []],
                            // 欢乐孙权
                            hpp_sunquan: ['male', 'wu', 4, ['rezhiheng', 'hpp_jiuyuan'], ['zhu']],
                            // 欢乐张飞
                            hpp_zhangfei: ['male', 'shu', 4, ['new_repaoxiao', 'hpp_tishen'], []],
                            // 欢乐赵云
                            hpp_zhaoyun: ['male', 'shu', 4, ['ollongdan', 'hpp_yajiao'], []],
                        },
                        characterIntro: {
                        },
                        characterReplace: {
                            caocao: ['hpp_caocao', 're_caocao', 'caocao'],
                            guanyu: ['hpp_guanyu', 're_guanyu', 'guanyu'],
                            huangzhong: ['hpp_huangzhong', 're_huangzhong', 'huangzhong'],
                            machao: ['hpp_machao', 're_machao', 'machao'],
                            liubei: ['hpp_liubei', 're_liubei', 'liubei'],
                            sunquan: ['hpp_sunquan', 're_sunquan', 'sunquan'],
                            zhangfei: ['hpp_zhangfei', 're_zhangfei', 'tw_zhangfei', 'xin_zhangfei', 'old_zhangfei', 'zhangfei'],
                            zhaoyun: ['hpp_zhaoyun', 're_zhaoyun', 'old_zhaoyun', 'zhaoyun'],
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
                                    player.chooseControl('摸一张牌并获得造成伤害的牌','摸两张').set('prompt').set('ai',function(event,player){
                                        var value = 0;
                                        if (get.itemtype(trigger.cards) == 'cards' && get.position(trigger.cards[0], true) == 'o') {
                                            for(i in trigger.cards){
                                                game.log(i);
                                                value+=get.value(i);
                                            }
                                        }
                                        game.log(value);
                                    });
                                    "step 1"
                                    if(result.control=='摸一张牌并获得造成伤害的牌'){
                                        if (get.itemtype(trigger.cards) == 'cards' && get.position(trigger.cards[0], true) == 'o') {
                                            player.gain(trigger.cards, "gain2");
                                        }
                                        player.draw('nodelay');
                                    } else{
                                        player.draw(2,'nodelay');
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

                            // 关羽
                            hpp_wusheng: {
                                frequent: true,
                                audio: 'wusheng',
                                group: 'hpp_wusheng_damage',
                                audioname2: { hpp_guansuo: 'wusheng_guansuo' },
                                trigger: { player: 'phaseZhunbeiBegin' },
                                content: function () {
                                    var card = get.cardPile2(function (cardx) {
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
                            hpp_jiuyuan: {
                                group: 'hpp_jiuyuan_tao',
                                audio: 'rejiuyuan',
                                zhuSkill: true,
                                trigger: { global: 'recoverBefore' },
                                direct: true,
                                filter: function (event, player) {
                                    return player != event.player && event.player.group == 'wu' && player.hp <= event.player.hp &&
                                        event.getParent().name != 'hpp_jiuyuan' && player.hasZhuSkill('hpp_jiuyuan', event.player)
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
                                            return true;
                                        },
                                        content: function () {
                                            trigger.baseDamage++;
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
                        },
                        dynamicTranslate: {
                            /*
                            nzry_longnu:function(player){
                                if(player.hasSkill('nzry_longnu_2')) return '转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。<span class="legendtext">阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。</span>';
                                if(player.hasSkill('nzry_longnu_1')) return '转换技，锁定技，<span class="legendtext">阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。</span>阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。';
                                if(player.storage.nzry_longnu==true) return '转换技，锁定技，阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。<span class="bluetext">阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。</span>';
                                return '转换技，锁定技，<span class="bluetext">阴：出牌阶段开始时，你失去1点体力并摸一张牌，然后本阶段内你的红色手牌均视为火【杀】且无距离限制。</span>阳：出牌阶段开始时，你减1点体力上限并摸一张牌，然后本阶段内你的锦囊牌均视为雷【杀】且无使用次数限制。';
                            },
                            */
                        },
                        characterTitle: {
                            // g绿 b蓝 r红 p粉
                            hpp_caocao: '#g捞德一评级:2.0',
                            hpp_guanyu: '#r捞德一评级:4.2',
                            hpp_huangzhong: '#r捞德一评级:4.0',
                            hpp_liubei: '#b捞德一评级:3.7',
                            hpp_machao: '#r捞德一评级:4.2',
                            hpp_sunquan: '#b捞德一评级:3.1',
                            hpp_zhangfei: '#r捞德一评级:4.3',
                            hpp_zhaoyun: '#r捞德一评级:4.0',
                        },
                        translate: {
                            hpp_caocao: '曹操',
                            hpp_jianxiong: '奸雄',
                            hpp_jianxiong_info: '当你受到1点伤害时，你可以摸一张牌，并获得对你造成伤害的牌；或摸两张牌。',
                            hpp_hujia: '护驾',
                            hpp_hujia_info: '主公技，其他魏势力角色可以替你使用或打出【闪】。其他魏势力角色若以此法使用或打出【闪】时，可令你摸一张牌，每回合限一张。',
                            hpp_guanyu: '关羽',
                            hpp_wusheng: '武圣',
                            hpp_wusheng_info: '回合开始时，你获得一张红色【杀】。你的红色【杀】伤害+1。',
                            hpp_huangzhong: '黄忠',
                            hpp_liegong: '烈弓',
                            hpp_liegong_info: '你的【杀】无视距离。当你使用【杀】指定目标后：若目标角色的手牌数小于等于你，不能使用【闪】；目标体力大于等于你，此【杀】伤害+1。',
                            hpp_liubei: '刘备',
                            hpp_jijiang: '激将',
                            hpp_jijiang_info: '主公技，其他蜀势力角色可以在你需要时代替你使用或打出【杀】。若以此法出杀，则你与其各摸一张牌。',
                            hpp_machao: '马超',
                            hpp_yuma: '驭马',
                            hpp_yuma_info: '锁定技，你计算与其他角色的距离-1。当你失去装备区中的坐骑时，你摸两张牌。',
                            hpp_tieji: '铁骑',
                            hpp_tieji_info: '当你使用【杀】指定目标后，你可以令其本回合非锁定技失效，然后你进行判定，若为红色，该角色不能使用【闪】；黑色，你摸两张牌。',
                            hpp_sunquan: '孙权',
                            hpp_jiuyuan: '救援',
                            hpp_jiuyuan_info: '主公技，锁定技，其他吴势力角色对你使用的【桃】多回复1点体力；其他吴势力角色使用【桃】时，该角色可以改为令你回复1点体力，然后其摸一张牌。',
                            hpp_zhangfei: '张飞',
                            hpp_tishen: '替身',
                            hpp_tishen_info: '回合外，获得所有对你使用且未对你造成伤害的【杀】。出牌阶段你使用的杀被闪抵消后，则你本阶段使用的下一张【杀】不可被响应且造成的伤害+1。',
                            hpp_zhaoyun: '赵云',
                            hpp_yajiao: '涯角',
                            hpp_yajiao_info: '当你于回合外使用或打出手牌时，你可以展示牌堆顶的一张牌并将其交给一名角色；当你于自己回合内使用过【龙胆】，本回合结束阶段摸一张牌。',


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
            intro: "",
            author: "欢乐三国杀(搬运:捞德一)",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        }, files: { "character": [], "card": [], "skill": [] }
    }
})