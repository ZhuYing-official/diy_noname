hpp_re_xinsheng: {
    getList() {
        return Object.keys(lib.characterPack.happykill).filter(i => {
            if (!lib.characterPack.happykill[i][4]) return true;
            return !lib.characterPack.happykill[i][4].contains('unseen');
        }).concat(_status.extra_pingjianList || []);
    },
    init(player) {
        player.addSkill('hpp_re_xinsheng_remove');
        if (!player.storage.hpp_re_xinsheng_remove) player.storage.hpp_re_xinsheng_remove = {};
    },
    group: 'hpp_re_xinsheng_use',
    initList() {
        var list = [];
        for (var i in lib.character) {
            var bool = (lib.skill.hpp_re_xinsheng.getList()).contains(i);
            if (!bool || i.indexOf('xushao') != -1 || (i.indexOf('zuoci') != -1 && i != 'hpp_zuoci')) continue;
            if (!list.contains(i)) list.push(i);
        }
        game.countPlayer2(function (current) {
            list.remove(current.name);
            list.remove(current.name1);
            list.remove(current.name2);
        });
        _status.happyList = list;
    },
    audio: 'hppxinsheng',
    trigger: { player: ['damageEnd', 'phaseJieshuBegin', 'phaseBegin'] },
    frequent: true,
    content() {
        'step 0'
        lib.skill.hpp_re_xinsheng.initList();
        var list = [], skills = [], map = [];
        _status.happyList.randomSort();
        var name2 = event.triggername;
        for (var i = 0; i < _status.happyList.length; i++) {
            var name = _status.happyList[i];
            var skills2 = lib.character[name][3];
            for (var j = 0; j < skills2.length; j++) {
                if (player.getStorage('hpp_re_xinsheng').contains(skills2[j])) continue;
                if (skills.contains(skills2[j])) {
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
                    if (!info || !info.trigger || !info.trigger.player || info.silent || info.limited || info.juexingji || info.hiddenSkill ||
                        info.dutySkill || (info.zhuSkill && !player.isZhu2()) || info.groupSkill || (info.priority && typeof info.priority == 'number') || info.firstDo || info.lastDo) continue;
                    if (info.trigger.player == name2 || Array.isArray(info.trigger.player) && info.trigger.player.contains(name2)) {
                        if (/*info.init||info.onChooseToUse||*/info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) continue;
                        if (info.init) info.init(player, list2[k]);
                        if (info.filter) {
                            try {
                                var bool = info.filter(trigger, player, name2);
                                if (!bool) continue;
                            }
                            catch (e) {
                                continue;
                            }
                        }
                        list.add(name);
                        if (!map[name]) map[name] = [];
                        map[name].push(skills2[j]);
                        skills.add(skills2[j]);
                        break;
                    }
                }
            }
            if (list.length > 2) break;
        }
        if (skills.length) player.chooseControl(skills).set('dialog', ['请选择要发动的技能', [list, 'character']]);
        else event.finish();
        'step 1'
        // player.markAuto('hpp_re_xinsheng', [result.control]);
        player.addTempSkill(result.control);
        player.storage.hpp_re_xinsheng_remove[result.control] = (trigger.name == 'damage' ? trigger : 'phaseJieshu');
        if (trigger.name == 'damage' && (lib.translate[result.control + '_info'].indexOf('1点伤害') != -1 || lib.translate[result.control + '_info'].indexOf('一点伤害') != -1)) trigger.num = 1;
    },
},
hpp_re_xinsheng_use: {
    audio: 'hppxinsheng',
    enable: 'phaseUse',
    usable: 1,
    content() {
        'step 0'
        lib.skill.hpp_re_xinsheng.initList();
        var list = [], skills = [], map = [];
        _status.happyList.randomSort();
        for (var i = 0; i < _status.happyList.length; i++) {
            var name = _status.happyList[i];
            var skills2 = lib.character[name][3];
            for (var j = 0; j < skills2.length; j++) {
                if (player.getStorage('hpp_re_xinsheng').contains(skills2[j])) continue;
                var info = lib.translate[skills2[j] + '_info'];
                if (skills.contains(skills2[j]) || (info && info.indexOf('当你于出牌阶段') != -1)) {
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
                    if (!info || !info.enable || info.charlotte || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill || (info.zhuSkill && !player.isZhu2()) || info.groupSkill) continue;
                    if ((info.enable == 'phaseUse' || (Array.isArray(info.enable) && info.enable.contains('phaseUse'))) ||
                        (info.enable == 'chooseToUse' || (Array.isArray(info.enable) && info.enable.contains('chooseToUse')))) {
                        if (/*info.init||info.onChooseToUse||*/info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) continue;
                        var evt = event.getParent(2);
                        if (info.init) info.init(player, list2[k]);
                        if (info.onChooseToUse) info.onChooseToUse(evt);
                        if (info.filter) {
                            try {
                                var bool = info.filter(evt, player);
                                if (!bool) continue;
                            }
                            catch (e) {
                                continue;
                            }
                        }
                        else if (info.viewAs && typeof info.viewAs != 'function') {
                            try {
                                if (evt.filterCard && !evt.filterCard(info.viewAs, player, evt)) continue;
                                if (info.viewAsFilter && info.viewAsFilter(player) == false) continue;
                            }
                            catch (e) {
                                continue;
                            }
                        }
                        list.push(name);
                        if (!map[name]) map[name] = [];
                        map[name].push(skills2[j]);
                        skills.add(skills2[j]);
                        break;
                    }
                }
            }
            if (list.length > 2) break;
        }
        if (skills.length) player.chooseControl(skills).set('dialog', ['请选择要发动的技能', [list, 'character']]);
        else event.finish();
        'step 1'
        // player.markAuto('hpp_re_xinsheng', [result.control]);
        player.addTempSkill(result.control);
        player.storage.hpp_re_xinsheng_remove[result.control] = 'phaseUse';
    },
    ai: {
        order: 12,
        result: { player: 1 },
    },
},
hpp_re_xinsheng_remove: {
    group: 'hpp_re_xinsheng_skill',
    charlotte: true,
    trigger: { player: ['phaseUseEnd', 'damageEnd', 'phaseJieshuBegin'] },
    filter(event, player) {
        return Object.keys(player.storage.hpp_re_xinsheng_remove).find(function (skill) {
            if (event.name != 'damage') return player.storage.hpp_re_xinsheng_remove[skill] == event.name;
            return player.storage.hpp_re_xinsheng_remove[skill] == event;
        });
    },
    direct: true,
    lastDo: true,
    priority: -Infinity,
    content() {
        var skills = Object.keys(player.storage.hpp_re_xinsheng_remove).filter(function (skill) {
            if (trigger.name != 'damage') return player.storage.hpp_re_xinsheng_remove[skill] == trigger.name;
            return player.storage.hpp_re_xinsheng_remove[skill] == trigger;
        });
        player.removeSkill(skills);
        for (var skill of skills) delete player.storage.hpp_re_xinsheng_remove[skill];
    },
},
hpp_re_xinsheng_skill: {
    charlotte: true,
    trigger: { player: ['useSkill', 'logSkillBegin'] },
    filter(event, player) {
        if (get.info(event.skill).charlotte) return false;
        var skill = event.sourceSkill || event.skill;
        return player.storage.hpp_re_xinsheng_remove[skill];
    },
    direct: true,
    firstDo: true,
    priority: Infinity,
    content() {
        var skill = trigger.sourceSkill || trigger.skill;
        player.removeSkill(skill);
        delete player.storage.hpp_re_xinsheng_remove[skill];
    },
},