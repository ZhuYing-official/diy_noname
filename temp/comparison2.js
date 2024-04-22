minipingjian: {
    getList: function () {
        const list = Object.keys(lib.characterPack.MiNikill).concat(_status.extra_pingjianList || []);
        return list.filter(i => !get.character(i, 4) || !get.character(i, 4).includes('unseen'));
    },
    Mbaby_characterlist: true,
    init: function (player) {
        player.addSkill('minipingjian_remove');
        if (!player.storage.minipingjian_remove) player.storage.minipingjian_remove = {};
    },
    onremove: function (player) {
        player.removeSkill('minipingjian_remove');
    },
    group: 'minipingjian_use',
    audio: 'pingjian',
    trigger: { player: ['damageEnd', 'phaseJieshuBegin'] },
    frequent: true,
    content: function () {
        'step 0'
        var allList = ((!_status.connectMode && lib.config.extension_活动武将_PingJianName) ? lib.config.extension_活动武将_PingJianName : lib.skill.minipingjian.getList()).filter(i => lib.character[i]);
        var list = [], skills = [], map = [];
        allList.randomSort();
        var name2 = event.triggername;
        for (var i = 0; i < allList.length; i++) {
            var name = allList[i];
            var skills2 = lib.character[name][3];
            for (var j = 0; j < skills2.length; j++) {
                if (player.getStorage('minipingjian').includes(skills2[j])) continue;
                if (skills2[j] == 'minipingjian') continue;
                if (skills.includes(skills2[j])) {
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
                    if (info.trigger.player == name2 || Array.isArray(info.trigger.player) && info.trigger.player.includes(name2)) {
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
        player.markAuto('minipingjian', [result.control]);
        player.addTempSkill(result.control);
        player.storage.minipingjian_remove[result.control] = (trigger.name == 'damage' ? trigger : 'phaseJieshu');
    },
},
minipingjian_use: {
    audio: 'pingjian',
    enable: 'phaseUse',
    usable: 1,
    content: function () {
        'step 0'
        var allList = ((!_status.connectMode && lib.config.extension_活动武将_PingJianName) ? lib.config.extension_活动武将_PingJianName : lib.skill.minipingjian.getList()).filter(i => lib.character[i]);
        var list = [], skills = [], map = [];
        allList.randomSort();
        for (var i = 0; i < allList.length; i++) {
            var name = allList[i];
            var skills2 = lib.character[name][3];
            for (var j = 0; j < skills2.length; j++) {
                if (player.getStorage('minipingjian').includes(skills2[j])) continue;
                if (skills2[j] == 'minipingjian' || get.is.locked(skills2[j], player)) continue;
                var info = lib.translate[skills2[j] + '_info'];
                if (skills.includes(skills2[j]) || (info && info.indexOf('当你于出牌阶段') != -1 && info.indexOf('当你于出牌阶段外') != -1)) {
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
                    if ((info.enable == 'phaseUse' || (Array.isArray(info.enable) && info.enable.includes('phaseUse'))) ||
                        (info.enable == 'chooseToUse' || (Array.isArray(info.enable) && info.enable.includes('chooseToUse')))) {
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
        player.markAuto('minipingjian', [result.control]);
        player.addTempSkill(result.control);
        player.storage.minipingjian_remove[result.control] = 'phaseUse';
    },
    ai: {
        order: 12,
        result: { player: 1 },
    },
},
minipingjian_remove: {
    group: 'minipingjian_skill',
    charlotte: true,
    trigger: { player: ['phaseUseEnd', 'damageEnd', 'phaseJieshuBegin'] },
    filter: function (event, player) {
        return Object.keys(player.storage.minipingjian_remove).find(function (skill) {
            if (event.name != 'damage') return player.storage.minipingjian_remove[skill] == event.name;
            return player.storage.minipingjian_remove[skill] == event;
        });
    },
    direct: true,
    lastDo: true,
    priority: -Infinity,
    content: function () {
        var skills = Object.keys(player.storage.minipingjian_remove).filter(function (skill) {
            if (trigger.name != 'damage') return player.storage.minipingjian_remove[skill] == trigger.name;
            return player.storage.minipingjian_remove[skill] == trigger;
        });
        player.removeSkill(skills);
        for (var skill of skills) delete player.storage.minipingjian_remove[skill];
    },
},
minipingjian_skill: {
    charlotte: true,
    trigger: { player: ['useSkill', 'logSkillBegin'] },
    filter: function (event, player) {
        if (get.info(event.skill).charlotte) return false;
        var skill = event.sourceSkill || event.skill;
        return player.storage.minipingjian_remove[skill];
    },
    direct: true,
    firstDo: true,
    priority: Infinity,
    content: function () {
        var skill = trigger.sourceSkill || trigger.skill;
        player.removeSkill(skill);
        delete player.storage.minipingjian_remove[skill];
    },
},