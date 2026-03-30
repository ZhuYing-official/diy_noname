import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';

const dynamicTranslates = {
    // 屈降
    lao_quxiang(player) {
        if (player.storage.lao_quxiang_rewrite) return '当你受到伤害时，你可以将所有手牌交给伤害来源来源免疫此伤害，然后其给你一张手牌。';
        return '当你受到伤害时，你可以将所有手牌交给伤害来源免疫此伤害，然后若你给出的手牌大于1其给你2张手牌，否则其给你1张手牌。';
    },
    // 才高
    lao_caigao(player) {
        if (player.storage.lao_caigao_rewrite) return '锁定技，当其他角色于回合外获得牌时，你获得一张梅花牌（每回合限3次）。';
        return '锁定技，当其他角色于回合外获得牌时，你进行判定，你猜测此判定牌的颜色，猜中后你获得一张梅花牌（每回合限3次）。';
    },
};
export default dynamicTranslates;
