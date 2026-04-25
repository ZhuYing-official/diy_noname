import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';

const packs = function () {
    lib.translate['honor_of_kings_cards_card_config'] = `<span style='font-family: xingkai'>王者荣耀</span>`;
    return {
        name: 'honor_of_kings_cards',
        connect: true,
        card: {
            hok_ningbingzhixi: {
                fullskin: true,
                type: 'equip',
                subtype: 'equip1',
                distance: { attackFrom: -2 },
                ai: {
                    basic: {
                        equipValue: 2,
                    },
                },
                skills: ['hok_ningbingzhixi_skill'],
                image: 'ext:捞德一/image/card/hok_ningbingzhixi.png',
                fullimage: true,
            },
            hok_chirezhipei: {
                fullskin: true,
                type: 'equip',
                subtype: 'equip1',
                distance: { attackFrom: -3 },
                ai: {
                    basic: {
                        equipValue: 2,
                    },
                },
                skills: ['hok_chirezhipei_skill'],
                image: 'ext:捞德一/image/card/hok_chirezhipei.png',
                fullimage: true,
            },

            hok_monvdoupeng: {
                fullskin: true,
                type: 'equip',
                subtype: 'equip2',
                ai: {
                    basic: {
                        equipValue: 5,
                    },
                },
                skills: ['hok_monvdoupeng_skill'],
                image: 'ext:捞德一/image/card/hok_monvdoupeng.png',
                fullimage: true,
            }
        },
        skill: {
            hok_ningbingzhixi_skill: {
                equipSkill: true,
                trigger: { source: 'damageBegin4' },
                filter: function (event) {
                    if (event.nature) {
                        if (event.player.countCards('h') > 0) return true;
                        if (event.nature == 'ice' && event.player.countCards('he') > 0) return true;
                    }
                    return false;
                },
                forced: true,
                content: function () {
                    if (trigger.nature == 'ice') {
                        var cards = trigger.player.getCards('he', function (card) {
                            return lib.filter.cardDiscardable(card, trigger.player, 'hok_ningbingzhixi_skill');
                        });
                        if (cards.length > 0) trigger.player.discard(cards.randomGet());
                    } else {
                        trigger.player.chooseToDiscard('h', true);
                    }
                },
                ai: {
                    effect: {
                        player: function (card, player, target, current, isLink) {
                            if (
                                card.name == 'sha' &&
                                !isLink &&
                                target.countCards('h') == 0 &&
                                !target.hasSkillTag('filterDamage', null, {
                                    player: player,
                                    card: card,
                                })
                            )
                                return [1, 0, 1, -3];
                        },
                    },
                },
            },
            hok_chirezhipei_skill: {
                equipSkill: true,
                forced: true,
                trigger: { player: 'damageEnd' },
                filter: function (event, player) {
                    return player.hp == 1 && player.countCards('e', { name: 'hok_chirezhipei' }) > 0;
                },
                content: async function (event, trigger, player) {
                    // 弃置装备区的炽热支配者
                    const card = player.getCards('e', { name: 'hok_chirezhipei' })[0];
                    if (card) {
                        await player.discard(card);
                        // 摸3张牌
                        const num = Math.min(player.maxHp, 6);
                        await player.drawTo(num);
                    }
                },
                ai: {
                    effect: {
                        player: function (card, player, target) {
                            // AI评估装备价值
                            if (player.hp == 1) {
                                return [1, 5]; // 体力为1时装备价值很高
                            }
                            return [1, 1];
                        },
                    },
                    threaten: 1.5, // 威胁度
                },
            },

            hok_monvdoupeng_skill: {
                equipSkill: true,
                forced: true,
                usable: 1,
                trigger: { player: 'damageBegin4' },
                filter: function (event, player) {
                    // 每回合限1次
                    if (player.getStat('skill').hok_monvdoupeng_skill >= 1) return false;
                    // 伤害来源是锦囊牌或属性伤害
                    if (event.card && get.type(event.card) === 'trick') return true;
                    if (event.nature) return true;
                    return false;
                },
                check: function (event, player) {
                    // AI判断是否发动技能
                    return event.num > 0;
                },
                content: async function (event, trigger, player) {
                    // 减少伤害值
                    trigger.num--;
                    // 记录技能使用次数
                    player.addTempSkill('hok_monvdoupeng_count', 'phaseJieshuBegin');
                },
                ai: {
                    effect: {
                        target: function (card, player, target, current) {
                            // 评估装备价值
                            if (get.type(card) === 'trick' || card.nature) {
                                return [1, 0.5, 1, -0.5];
                            }
                        },
                    },
                    threaten: 1.2, // 威胁度
                },
                subSkill: {
                    count: {
                        charlotte: true,
                        onremove: true,
                        mark: true,
                        intro: {
                            content: '本回合已发动过魔女斗篷',
                        },
                    },
                },
            },
        },
        translate: {
            hok_ningbingzhixi: '凝冰之息',
            hok_ningbingzhixi_skill: '凝冰之息',
            hok_ningbingzhixi_info: '当你造成属性伤害时，目标角色弃置一张手牌；若为冰属性伤害，目标角色随机弃置一张牌。',

            hok_chirezhipei: '炽热支配',
            hok_chirezhipei_skill: '炽热支配',
            hok_chirezhipei_info: '锁定技。当你受到伤害后时，若你的体力值为1，你可以弃置此牌，防止此次伤害，将手牌摸至体力上限（至多为6）。',

            hok_monvdoupeng: '魔女斗篷',
            hok_monvdoupeng_skill: '魔女斗篷',
            hok_monvdoupeng_info: '锁定技。每回合限1次，你受到的锦囊牌或属性伤害-1。',
        },
        list: [
            ['club', 2, 'hok_ningbingzhixi'],
            ['diamond', 12, 'hok_chirezhipei'],
            ['spade', 10, 'hok_monvdoupeng'],
        ],
    };
}

export default packs;
