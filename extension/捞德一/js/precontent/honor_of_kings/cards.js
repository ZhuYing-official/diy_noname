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
                        equipValue: 3,
                    },
                },
                skills: ['hok_ningbingzhixi_skill'],
            },
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
        },
        translate: {
            hok_ningbingzhixi: '凝冰之息',
            hok_ningbingzhixi_skill: '凝冰之息',
            hok_ningbingzhixi_info: '当你造成属性伤害时，目标角色弃置一张手牌；若为冰属性伤害，目标角色随机弃置一张牌。',
        },
        list: [
            ['club', 2, 'hok_ningbingzhixi'],
        ],
    };
}

export default packs;
