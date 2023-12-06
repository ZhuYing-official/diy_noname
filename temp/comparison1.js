chooseCharacterPurpleOL: function () {
    var next = game.createEvent('chooseCharacter', false);
    next.setContent(function () {
        "step 0"
        ui.arena.classList.add('choose-character');
        "step 1"
        var list = ['rZhu', 'rZhong', 'rNei', 'rYe'];
        var list2 = ['bZhu', 'bZhong', 'bNei', 'bYe'];
        list.randomSort();
        list2.randomSort();
        var identityList = list.concat(list2);
        var num = get.rand(0, 7);
        var players = game.players.slice(0);
        for (var i = 0; i < num; i++) {
            players.push(players.shift());
        }
        game.broadcastAll(function (players, identityList, list) {
            _status.mode = 'purple';
            if (game.online) ui.arena.classList.add('choose-character');
            for (var i = 0; i < players.length; i++) {
                players[i].node.identity.classList.add('guessing');
                players[i].identity = identityList[i];
                players[i].setIdentity(list.contains(identityList[i]) ? 'cai2' : 'cai');
                if (['rZhu', 'bZhu'].contains(identityList[i])) {
                    game[identityList[i]] = players[i];
                    players[i].setIdentity(identityList[i]);
                    players[i].identityShown = true;
                    players[i].node.identity.classList.remove('guessing');
                }
            }
            game.zhu = game.rZhu;
            game.rZhu.isZhu = true;
            game.bZhu.isZhu = true;
            game.me.setIdentity();
            game.me.node.identity.classList.remove('guessing');
        }, players, identityList, list);
        players.sortBySeat(game.zhu);
        for (var i = 0; i < players.length; i++) {
            players[i].seatNum = i;
        }
        "step 2"
        var map = {};
        var map_zhu = {};
        event.mapNum = {};
        var list = [];
        var libCharacter = {};
        for (var i = 0; i < lib.configOL.characterPack.length; i++) {
            var pack = lib.characterPack[lib.configOL.characterPack[i]];
            for (var j in pack) {
                if (j == 'zuoci') continue;
                if (lib.character[j]) libCharacter[j] = pack[j];
            }
        }
        for (var i in libCharacter) {
            if (lib.filter.characterDisabled(i, libCharacter)) continue;
            if (i.indexOf('lingju') != -1 || get.is.double(i)) continue;
            var group = lib.character[i][1];
            if (group == 'shen') continue;
            if (!map[group]) {
                map[group] = [];
                list.push(group);
            }
            map[group].push(i);
            if (lib.character[i][4] && lib.character[i][4].contains('zhu')) {
                if (!map_zhu[group]) {
                    map_zhu[group] = [];
                }
                map_zhu[group].push(i);
            }
        }
        for (var i in map) {
            if (map[i].length < 12) {
                delete map[i];
                list.remove(i);
            }
            else event.mapNum[i] = map[i].length > 15 ? 5 : 3;
        }
        list.sort(function (a, b) {
            return lib.group.indexOf(a) - lib.group.indexOf(b);
        });
        event.list = list;
        event.map = map;
        event.map_zhu = map_zhu;
        game.bZhu.chooseControl(list).set('prompt', '请选择冷方武将势力').set('ai', function () {
            return _status.event.choice;
        }).set('choice', event.list.randomGet());
        "step 3"
        event.bZhu = result.control;
        event.list.remove(event.bZhu);
        game.rZhu.chooseControl(event.list).set('prompt', '请选择暖方武将的势力').set('ai', function () {
            return _status.event.choice;
        }).set('choice', event.list.randomGet());
        "step 4"
        event.rZhu = result.control;
        var players = [game.rZhu, game.bZhu];
        var list = [];
        for (var i = 0; i < players.length; i++) {
            if (true) {
                var group = event[players[i].identity];
                var str = '选择角色';
                var list2 = event.map[group].randomGets(4);
                if (event.map_zhu[group]) list2.addArray(event.map_zhu[group].randomGets(2));
                event.map[players[i].playerid] = list2;
                list.push([players[i], [str, [list2, 'character']], true]);
            }
        }
        game.me.chooseButtonOL(list, function (player, result) {
            if (game.online || player == game.me) {
                player.init(result.links[0]);
                player.hp++;
                player.maxHp++;
                player.update();
                alert(1);
            }
        });
        "step 5"
        for (var i in result) {
            if (result[i] == 'ai' || !result[i] || !result[i].links) {
                result[i] = event.map[i].randomGet();
            }
            else {
                result[i] = result[i].links
            }
            var group = lib.character[result[i][0]][1];
            event.map[group].remove(result[i][0]);
            if (!lib.playerOL[i].name) {
                lib.playerOL[i].init(result[i][0]);
            }
        }
        game.broadcast(function (result) {
            for (var i in result) {
                if (!lib.playerOL[i].name) {
                    lib.playerOL[i].init(result[i][0], result[i][1]);
                    lib.playerOL[i].hp++;
                    lib.playerOL[i].maxHp++;
                    lib.playerOL[i].update();
                }
            }
        }, result);

        var list = [];
        var players = game.players.slice(0);
        players.removeArray([game.rZhu, game.bZhu]);
        for (var i = 0; i < players.length; i++) {
            if (true) {
                var group = event[players[i].identity.slice(0, 1) + 'Zhu'];
                var str = '选择角色';
                var list2 = event.map[group].randomRemove(event.mapNum[group]);
                event.map[players[i].playerid] = list2;
                list.push([players[i], [str, [list2, 'character']], true]);
            }
        }
        game.me.chooseButtonOL(list, function (player, result) {
            if (game.online || player == game.me) {
                player.init(result.links[0]);
            }
        });
        "step 6"
        for (var i in result) {
            if (result[i] == 'ai' || !result[i] || !result[i].links) {
                result[i] = event.map[i].randomGet();
            }
            else {
                result[i] = result[i].links
            }
            var group = lib.character[result[i][0]][1];
            event.map[group].remove(result[i][0]);
            if (!lib.playerOL[i].name) {
                lib.playerOL[i].init(result[i][0]);
            }
        }
        game.broadcast(function (result) {
            for (var i in result) {
                if (!lib.playerOL[i].name) {
                    lib.playerOL[i].init(result[i][0], result[i][1]);
                }
            }
            setTimeout(function () {
                ui.arena.classList.remove('choose-character');
            }, 500);
        }, result);
        setTimeout(function () {
            ui.arena.classList.remove('choose-character');
        }, 500);
    });
},
