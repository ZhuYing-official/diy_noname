chooseCharacterPurple: function () {
    var next = game.createEvent('chooseCharacter', false);
    next.setContent(function () {
        "step 0"
        ui.arena.classList.add('choose-character');
        game.no_continue_game = true;
        lib.init.onfree();
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
        players.sortBySeat(game.zhu);
        for (var i = 0; i < players.length; i++) {
            players[i].seatNum = i;
        }
        "step 2"
        var map = {};
        var map_zhu = {};
        var list = [];
        for (var i in lib.character) {
            if (lib.filter.characterDisabled(i)) continue;
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
        if (game.me == game.rZhu || game.me == game.bZhu) {
            event.isZhu = true;
            var list = event.map[event[game.me.identity]].randomGets(4);
            if (event.map_zhu[event[game.me.identity]]) list.addArray(event.map_zhu[event[game.me.identity]].randomGets(2));
            game.me.chooseButton(true, ['请选择您的武将牌', [list, 'character']]);
        }
        "step 5"
        if (event.isZhu) {
            event.map[event[game.me.identity]].remove(result.links[0]);
            game.me.init(result.links[0]);
        }
        if (!game.rZhu.name) {
            var list = event.map[event.rZhu].randomGets(3);
            if (event.map_zhu[event.rZhu]) list.addArray(event.map_zhu[event.rZhu]);
            var character = list.randomGet();
            event.map[event.rZhu].remove(character);
            game.rZhu.init(character);
        }
        if (!game.bZhu.name) {
            var list = event.map[event.bZhu].randomGets(4);
            if (event.map_zhu[event.bZhu]) list.addArray(event.map_zhu[event.bZhu].randomGets(2));
            var character = list.randomGet();
            event.map[event.bZhu].remove(character);
            game.bZhu.init(character);
        }
        game.rZhu.maxHp++;
        game.rZhu.hp++;
        game.rZhu.update();
        game.bZhu.maxHp++;
        game.bZhu.hp++;
        game.bZhu.update();
        if (!event.isZhu) {
            var group = game.me.identity.indexOf('r') == 0 ? event.rZhu : event.bZhu;
            game.me.chooseButton(true, ['请选择您的武将牌', [event.map[group].randomRemove(5), 'character']]);
        }
        "step 6"
        if (!event.isZhu) {
            game.me.init(result.links[0]);
        }
        game.countPlayer(function (current) {
            if (!current.name) {
                var group = current.identity.indexOf('r') == 0 ? event.rZhu : event.bZhu;
                current.init(event.map[group].randomRemove(1)[0]);
            }
        });
        "step 7"
        setTimeout(function () {
            ui.arena.classList.remove('choose-character');
        }, 500);
    });
},