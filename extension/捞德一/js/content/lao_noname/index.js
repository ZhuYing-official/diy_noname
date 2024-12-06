import { lib, game, ui, get, ai, _status } from '../../../../../noname.js'

const lao_noname = function () {
    // 游戏结束评分
    game.over = function (result, bool) {
        if (_status.over) return;
        if (game.me._trueMe) game.swapPlayer(game.me._trueMe);
        let i, j, k, num, table, tr, td, dialog;
        _status.over = true;
        ui.control.show();
        ui.clear();
        game.stopCountChoose();
        if (ui.time3) {
            clearInterval(ui.time3.interval);
        }
        if ((game.layout == 'long2' || game.layout == 'nova') && !game.chess) {
            ui.arena.classList.add('choose-character');
            ui.me.hide();
            ui.mebg.hide();
            ui.autonode.hide();
            if (lib.config.radius_size != 'off') {
                ui.historybar.style.borderRadius = '0 0 0 4px';
            }
        }
        if (game.online) {
            let dialog = ui.create.dialog();
            dialog.noforcebutton = true;
            dialog.content.innerHTML = result;
            dialog.forcebutton = true;
            let result2 = arguments[1];
            if (result2 == true) {
                dialog.content.firstChild.innerHTML = '战斗胜利';
            } else if (result2 == false) {
                dialog.content.firstChild.innerHTML = '战斗失败';
            }
            ui.update();
            dialog.add(ui.create.div('.placeholder'));
            for (let i = 0; i < game.players.length; i++) {
                let hs = game.players[i].getCards('h');
                if (hs.length) {
                    dialog.add(`<div class='text center'>` + get.translation(game.players[i]) + '</div>');
                    dialog.addSmall(hs);
                }
            }

            for (let j = 0; j < game.dead.length; j++) {
                let hs = game.dead[j].getCards('h');
                if (hs.length) {
                    dialog.add(`<div class='text center'>` + get.translation(game.dead[j]) + '</div>');
                    dialog.addSmall(hs);
                }
            }

            dialog.add(ui.create.div('.placeholder.slim'));
            if (lib.config.background_audio) {
                if (result2 === true) {
                    game.playAudio('effect', 'win');
                } else if (result2 === false) {
                    game.playAudio('effect', 'lose');
                } else {
                    game.playAudio('effect', 'tie');
                }
            }
            if (!ui.exit) {
                ui.create.exit();
            }
            if (ui.giveup) {
                ui.giveup.remove();
                delete ui.giveup;
            }
            if (game.servermode) {
                ui.exit.firstChild.innerHTML = '返回房间';
                setTimeout(function () {
                    ui.exit.firstChild.innerHTML = '退出房间';
                    _status.roomtimeout = true;
                    lib.config.reconnect_info[2] = null;
                    game.saveConfig('reconnect_info', lib.config.reconnect_info);
                }, 10000);
            }
            if (ui.tempnowuxie) {
                ui.tempnowuxie.close();
                delete ui.tempnowuxie;
            }
            if (ui.auto) ui.auto.hide();
            if (ui.wuxie) ui.wuxie.hide();
            if (game.getIdentityList) {
                for (let i = 0; i < game.players.length; i++) {
                    game.players[i].setIdentity();
                }
            }
            return;
        }
        if (lib.config.background_audio) {
            if (result === true) {
                game.playAudio('effect', 'win');
            } else if (result === false) {
                game.playAudio('effect', 'lose');
            } else {
                game.playAudio('effect', 'tie');
            }
        }
        let resultbool = result;
        if (typeof resultbool !== 'boolean') {
            resultbool = null;
        }
        if (result === true) result = '战斗胜利';
        if (result === false) result = '战斗失败';
        if (result == undefined) result = '战斗结束';
        dialog = ui.create.dialog(result);
        dialog.noforcebutton = true;
        dialog.forcebutton = true;
        if (game.addOverDialog) {
            game.addOverDialog(dialog, result);
        }
        if (typeof _status.coin == 'number' && !_status.connectMode) {
            let coeff = Math.random() * 0.4 + 0.8;
            let added = 0;
            let betWin = false;
            if (result == '战斗胜利') {
                if (_status.betWin) {
                    betWin = true;
                    _status.coin += 10;
                }
                _status.coin += 20;
                if (_status.additionalReward) {
                    _status.coin += _status.additionalReward();
                }
                switch (lib.config.mode) {
                    case 'identity': {
                        switch (game.me.identity) {
                            case 'zhu':
                            case 'zhong':
                            case 'mingzhong':
                                if (get.config('enhance_zhu')) {
                                    added = 10;
                                } else {
                                    added = 20;
                                }
                                break;
                            case 'fan':
                                if (get.config('enhance_zhu')) {
                                    added = 16;
                                } else {
                                    added = 8;
                                }
                                break;
                            case 'nei':
                                added = 40;
                                break;
                        }
                        added = (added * (game.players.length + game.dead.length)) / 8;
                        break;
                    }
                    case 'guozhan':
                        if (game.me.identity == 'ye') {
                            added = 8;
                        } else {
                            added = 5 / get.totalPopulation(game.me.identity);
                        }
                        added = added * (game.players.length + game.dead.length);
                        break;
                    case 'versus':
                        if (_status.friend) {
                            added = 5 * (game.players.length + _status.friend.length);
                        }
                        break;
                    default:
                        added = 10;
                }
            } else {
                added = 10;
            }
            if (lib.config.mode == 'chess' && _status.mode == 'combat' && get.config('additional_player')) {
                added = 2;
            }
            _status.coin += added * coeff;
            if (_status.coinCoeff) {
                _status.coin *= _status.coinCoeff;
            }
            _status.coin = Math.ceil(_status.coin);
            dialog.add(ui.create.div('', '获得' + _status.coin + '金'));
            if (betWin) {
                game.changeCoin(20);
                dialog.content.appendChild(document.createElement('br'));
                dialog.add(ui.create.div('', '（下注赢得10金）'));
            }
            game.changeCoin(_status.coin);
        }
        if (get.mode() == 'versus' && _status.ladder) {
            let mmr = _status.ladder_mmr;
            mmr += 10 - get.rank(game.me.name, true) * 2;
            if (result == '战斗胜利') {
                mmr = 20 + Math.round(mmr);
                if (mmr > 40) {
                    mmr = 40;
                } else if (mmr < 10) {
                    mmr = 10;
                }
                dialog.add(ui.create.div('', '获得 ' + mmr + ' 积分'));
            } else {
                mmr = -30 + Math.round(mmr / 2);
                if (mmr > -20) {
                    mmr = -20;
                } else if (mmr < -35) {
                    mmr = -35;
                }
                if (lib.storage.ladder.current < 900) {
                    mmr = Math.round(mmr / 4);
                } else if (lib.storage.ladder.current < 1400) {
                    mmr = Math.round(mmr / 2);
                } else if (lib.storage.ladder.current < 2000) {
                    mmr = Math.round(mmr / 1.5);
                } else if (lib.storage.ladder.current > 2500) {
                    mmr = Math.round(mmr * 1.5);
                }
                dialog.add(ui.create.div('', '失去 ' + -mmr + ' 积分'));
            }
            if (_status.ladder_tmp) {
                lib.storage.ladder.current += 40;
                delete _status.ladder_tmp;
            }
            lib.storage.ladder.current += mmr;
            if (lib.storage.ladder.top < lib.storage.ladder.current) {
                lib.storage.ladder.top = lib.storage.ladder.current;
            }
            game.save('ladder', lib.storage.ladder);
            if (ui.ladder && game.getLadderName) {
                ui.ladder.innerHTML = game.getLadderName(lib.storage.ladder.current);
            }
        }
        // if(true){

        // 捞 总评分
        var laodeyiNum = 0;
        var laodeyiMvp = 0;
        var damageValue = 1.0;
        var damagedValue = 0.45;
        var gainValue = 0.1;
        var useValue = 0.6;
        var killValue = 1.65;
        if (game.players.length) {
            for (i = 0; i < game.players.length; i++) {
                num = 0;
                for (j = 0; j < game.players[i].stat.length; j++) {
                    if (game.players[i].stat[j].damage != undefined) num += game.players[i].stat[j].damage * damageValue;
                    if (game.players[i].stat[j].damaged != undefined) num += game.players[i].stat[j].damaged * damagedValue;
                    if (game.players[i].stat[j].gain != undefined) num += game.players[i].stat[j].gain * gainValue;
                    for (k in game.players[i].stat[j].card) {
                        num += game.players[i].stat[j].card[k] * useValue;
                    }
                    if (game.players[i].stat[j].kill != undefined) num += game.players[i].stat[j].kill * killValue;
                }
                laodeyiMvp = Math.max(laodeyiMvp, num.toFixed(1));
                laodeyiNum += num;
            }
        }
        if (game.dead.length) {
            for (i = 0; i < game.dead.length; i++) {
                num = 0;
                for (j = 0; j < game.dead[i].stat.length; j++) {
                    if (game.dead[i].stat[j].damage != undefined) num += game.dead[i].stat[j].damage * damageValue;
                    if (game.dead[i].stat[j].damaged != undefined) num += game.dead[i].stat[j].damaged * damagedValue;
                    if (game.dead[i].stat[j].gain != undefined) num += game.dead[i].stat[j].gain * gainValue;
                    for (k in game.dead[i].stat[j].card) {
                        num += game.dead[i].stat[j].card[k] * useValue;
                    }
                    if (game.dead[i].stat[j].kill != undefined) num += game.dead[i].stat[j].kill * killValue;
                }
                laodeyiMvp = Math.max(laodeyiMvp, num.toFixed(1));
                laodeyiNum += num;
            }
        }

        if (game.players.length) {
            table = document.createElement('table');
            tr = document.createElement('tr');
            tr.appendChild(document.createElement('td'));
            td = document.createElement('td');
            td.innerHTML = '伤害';
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '受伤';
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '摸牌';
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '出牌';
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '杀敌';
            tr.appendChild(td);
            td = document.createElement('td');
            td.innerHTML = '评分';
            tr.appendChild(td);
            table.appendChild(tr);
            for (i = 0; i < game.players.length; i++) {
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.innerHTML = get.translation(game.players[i]) + (game.players[i].ai.stratagem_camouflage ? '(被伪装)' : '');
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.players[i].stat.length; j++) {
                    if (game.players[i].stat[j].damage != undefined) num += game.players[i].stat[j].damage;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.players[i].stat.length; j++) {
                    if (game.players[i].stat[j].damaged != undefined) num += game.players[i].stat[j].damaged;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.players[i].stat.length; j++) {
                    if (game.players[i].stat[j].gain != undefined) num += game.players[i].stat[j].gain;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.players[i].stat.length; j++) {
                    for (k in game.players[i].stat[j].card) {
                        num += game.players[i].stat[j].card[k];
                    }
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.players[i].stat.length; j++) {
                    if (game.players[i].stat[j].kill != undefined) num += game.players[i].stat[j].kill;
                }
                td.innerHTML = num;
                tr.appendChild(td);

                // 捞德一 评分
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.players[i].stat.length; j++) {
                    if (game.players[i].stat[j].damage != undefined) num += game.players[i].stat[j].damage * damageValue;
                    if (game.players[i].stat[j].damaged != undefined) num += game.players[i].stat[j].damaged * damagedValue;
                    if (game.players[i].stat[j].gain != undefined) num += game.players[i].stat[j].gain * gainValue;
                    for (k in game.players[i].stat[j].card) {
                        num += game.players[i].stat[j].card[k] * useValue;
                    }
                    if (game.players[i].stat[j].kill != undefined) num += game.players[i].stat[j].kill * killValue;
                }
                td.innerHTML = (num / laodeyiNum * 100).toFixed(1);
                if (num.toFixed(1) == laodeyiMvp) {
                    td.innerHTML = `<b style='color:red'>MVP</b>` + (num.toFixed(1) / laodeyiNum * 100).toFixed(1);
                }
                tr.appendChild(td);

                table.appendChild(tr);
            }
            dialog.add(ui.create.div('.placeholder'));
            dialog.content.appendChild(table);
        }
        if (game.dead.length) {
            table = document.createElement('table');
            table.style.opacity = '0.5';
            if (game.players.length == 0) {
                tr = document.createElement('tr');
                tr.appendChild(document.createElement('td'));
                td = document.createElement('td');
                td.innerHTML = '伤害';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '受伤';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '摸牌';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '出牌';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '杀敌';
                tr.appendChild(td);
                td = document.createElement('td');
                td.innerHTML = '评分';
                tr.appendChild(td);
                table.appendChild(tr);
            }
            for (i = 0; i < game.dead.length; i++) {
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.innerHTML = get.translation(game.dead[i]) + (game.dead[i].ai.stratagem_camouflage ? '(被伪装)' : '');
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.dead[i].stat.length; j++) {
                    if (game.dead[i].stat[j].damage != undefined) num += game.dead[i].stat[j].damage;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.dead[i].stat.length; j++) {
                    if (game.dead[i].stat[j].damaged != undefined) num += game.dead[i].stat[j].damaged;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.dead[i].stat.length; j++) {
                    if (game.dead[i].stat[j].gain != undefined) num += game.dead[i].stat[j].gain;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.dead[i].stat.length; j++) {
                    for (k in game.dead[i].stat[j].card) {
                        num += game.dead[i].stat[j].card[k];
                    }
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.dead[i].stat.length; j++) {
                    if (game.dead[i].stat[j].kill != undefined) num += game.dead[i].stat[j].kill;
                }
                td.innerHTML = num;
                tr.appendChild(td);

                // 捞德一 评分
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.dead[i].stat.length; j++) {
                    if (game.dead[i].stat[j].damage != undefined) num += game.dead[i].stat[j].damage * damageValue;
                    if (game.dead[i].stat[j].damaged != undefined) num += game.dead[i].stat[j].damaged * damagedValue;
                    if (game.dead[i].stat[j].gain != undefined) num += game.dead[i].stat[j].gain * gainValue;
                    for (k in game.dead[i].stat[j].card) {
                        num += game.dead[i].stat[j].card[k] * useValue;
                    }
                    if (game.dead[i].stat[j].kill != undefined) num += game.dead[i].stat[j].kill * killValue;
                }
                td.innerHTML = (num / laodeyiNum * 100).toFixed(1);
                if (num.toFixed(1) == laodeyiMvp) {
                    td.innerHTML = `<b style='color:red'>MVP</b>` + (num.toFixed(1) / laodeyiNum * 100).toFixed(1);
                }
                tr.appendChild(td);

                table.appendChild(tr);
            }
            dialog.add(ui.create.div('.placeholder'));
            dialog.content.appendChild(table);
        }
        if (game.additionaldead && game.additionaldead.length) {
            table = document.createElement('table');
            table.style.opacity = '0.5';
            for (i = 0; i < game.additionaldead.length; i++) {
                tr = document.createElement('tr');
                td = document.createElement('td');
                td.innerHTML = get.translation(game.additionaldead[i]);
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                    if (game.additionaldead[i].stat[j].damage != undefined) num += game.additionaldead[i].stat[j].damage;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                    if (game.additionaldead[i].stat[j].damaged != undefined) num += game.additionaldead[i].stat[j].damaged;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                    if (game.additionaldead[i].stat[j].gain != undefined) num += game.additionaldead[i].stat[j].gain;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                    for (k in game.additionaldead[i].stat[j].card) {
                        num += game.additionaldead[i].stat[j].card[k];
                    }
                }
                td.innerHTML = num;
                tr.appendChild(td);
                td = document.createElement('td');
                num = 0;
                for (j = 0; j < game.additionaldead[i].stat.length; j++) {
                    if (game.additionaldead[i].stat[j].kill != undefined) num += game.additionaldead[i].stat[j].kill;
                }
                td.innerHTML = num;
                tr.appendChild(td);
                table.appendChild(tr);
            }
            dialog.add(ui.create.div('.placeholder'));
            dialog.content.appendChild(table);
        }
        // }
        dialog.add(ui.create.div('.placeholder'));

        let clients = game.players.concat(game.dead);
        for (let i = 0; i < clients.length; i++) {
            if (clients[i].isOnline2()) {
                clients[i].send(game.over, dialog.content.innerHTML, game.checkOnlineResult(clients[i]));
            }
        }

        dialog.add(ui.create.div('.placeholder'));

        for (let i = 0; i < game.players.length; i++) {
            if (!_status.connectMode && game.players[i].isUnderControl(true) && game.layout != 'long2') continue;
            let hs = game.players[i].getCards('h');
            if (hs.length) {
                dialog.add(`<div class='text center'>` + get.translation(game.players[i]) + '</div>');
                dialog.addSmall(hs);
            }
        }
        for (let i = 0; i < game.dead.length; i++) {
            if (!_status.connectMode && game.dead[i].isUnderControl(true) && game.layout != 'long2') continue;
            let hs = game.dead[i].getCards('h');
            if (hs.length) {
                dialog.add(`<div class='text center'>` + get.translation(game.dead[i]) + '</div>');
                dialog.addSmall(hs);
            }
        }
        dialog.add(ui.create.div('.placeholder.slim'));
        game.addVideo('over', null, dialog.content.innerHTML);
        let vinum = parseInt(lib.config.video);
        if (!_status.video && vinum && game.getVideoName && window.indexedDB && _status.videoInited) {
            let store = lib.db.transaction(['video'], 'readwrite').objectStore('video');
            let videos = lib.videos.slice(0);
            for (let i = 0; i < videos.length; i++) {
                if (videos[i].starred) {
                    videos.splice(i--, 1);
                }
            }
            for (let deletei = 0; deletei < 5; deletei++) {
                if (videos.length >= vinum) {
                    let toremove = videos.pop();
                    lib.videos.remove(toremove);
                    store.delete(toremove.time);
                } else {
                    break;
                }
            }
            let me = game.me || game.players[0];
            if (!me) return;
            let newvid = {
                name: game.getVideoName(),
                mode: lib.config.mode,
                video: lib.video,
                win: result == '战斗胜利',
                name1: me.name1 || me.name,
                name2: me.name2,
                time: lib.getUTC(new Date()),
            };
            let modecharacters = lib.characterPack['mode_' + get.mode()];
            if (modecharacters) {
                if (get.mode() == 'guozhan') {
                    if (modecharacters[newvid.name1]) {
                        if (newvid.name1.startsWith('gz_shibing')) {
                            newvid.name1 = newvid.name1.slice(3, 11);
                        } else {
                            newvid.name1 = newvid.name1.slice(3);
                        }
                    }
                    if (modecharacters[newvid.name2]) {
                        if (newvid.name2.startsWith('gz_shibing')) {
                            newvid.name2 = newvid.name2.slice(3, 11);
                        } else {
                            newvid.name2 = newvid.name2.slice(3);
                        }
                    }
                } else {
                    if (modecharacters[newvid.name1]) {
                        newvid.name1 = get.mode() + '::' + newvid.name1;
                    }
                    if (modecharacters[newvid.name2]) {
                        newvid.name2 = get.mode() + '::' + newvid.name2;
                    }
                }
            }
            if (newvid.name1 && newvid.name1.startsWith('subplayer_')) {
                newvid.name1 = newvid.name1.slice(10, newvid.name1.lastIndexOf('_'));
            }
            if (newvid.name2 && newvid.name2.startsWith('subplayer_')) {
                newvid.name1 = newvid.name2.slice(10, newvid.name1.lastIndexOf('_'));
            }
            lib.videos.unshift(newvid);
            // 清洗代理对象
            newvid.video = structuredClone(newvid.video);
            store.put(newvid);
            ui.create.videoNode(newvid, true);
        }
        // _status.auto=false;
        if (ui.auto) {
            // ui.auto.classList.remove('glow');
            ui.auto.hide();
        }
        if (ui.wuxie) ui.wuxie.hide();
        if (ui.giveup) {
            ui.giveup.remove();
            delete ui.giveup;
        }

        if (lib.config.test_game && !_status.connectMode) {
            if (typeof lib.config.test_game !== 'string') {
                switch (lib.config.mode) {
                    case 'identity':
                        game.saveConfig('mode', 'guozhan');
                        break;
                    case 'guozhan':
                        game.saveConfig('mode', 'versus');
                        break;
                    case 'versus':
                        game.saveConfig('mode', 'boss');
                        break;
                    case 'boss':
                        game.saveConfig('mode', 'chess');
                        break;
                    case 'chess':
                        game.saveConfig('mode', 'stone');
                        break;
                    case 'stone':
                        game.saveConfig('mode', 'identity');
                        break;
                }
            }
            setTimeout(game.reload, 500);
        }
        if (game.controlOver) {
            game.controlOver();
            return;
        }
        if (!_status.brawl) {
            if (lib.config.mode == 'boss') {
                ui.create.control('再战', function () {
                    let pointer = game.boss;
                    let map = { boss: game.me == game.boss, links: [] };
                    for (let iwhile = 0; iwhile < 10; iwhile++) {
                        pointer = pointer.nextSeat;
                        if (pointer == game.boss) {
                            break;
                        }
                        if (!pointer.side) {
                            map.links.push(pointer.name);
                        }
                    }
                    game.saveConfig('continue_name_boss', map);
                    game.saveConfig('mode', lib.config.mode);
                    localStorage.setItem(lib.configprefix + 'directstart', true);
                    game.reload();
                });
            } else if (lib.config.mode == 'versus') {
                if (_status.mode == 'standard' || _status.mode == 'three') {
                    ui.create.control('再战', function () {
                        game.saveConfig('continue_name_versus' + (_status.mode == 'three' ? '_three' : ''), {
                            friend: _status.friendBackup,
                            enemy: _status.enemyBackup,
                            color: _status.color,
                        });
                        game.saveConfig('mode', lib.config.mode);
                        localStorage.setItem(lib.configprefix + 'directstart', true);
                        game.reload();
                    });
                }
            } else if (!_status.connectMode && get.config('continue_game') && !ui.continue_game && !_status.brawl && !game.no_continue_game) {
                ui.continue_game = ui.create.control('再战', game.reloadCurrent);
            }
        }
        if (!ui.restart) {
            if (game.onlineroom && typeof game.roomId == 'string') {
                ui.restart = ui.create.control('restart', function () {
                    game.broadcastAll(function () {
                        if (ui.exit) {
                            ui.exit.stay = true;
                            ui.exit.firstChild.innerHTML = '返回房间';
                        }
                    });
                    game.saveConfig('tmp_owner_roomId', game.roomId);
                    setTimeout(game.reload, 100);
                });
            } else {
                ui.restart = ui.create.control('restart', game.reload);
            }
        }
        if (ui.tempnowuxie) {
            ui.tempnowuxie.close();
            delete ui.tempnowuxie;
        }

        if (ui.revive) {
            ui.revive.close();
            delete ui.revive;
        }
        if (ui.swap) {
            ui.swap.close();
            delete ui.swap;
        }
        for (let i = 0; i < lib.onover.length; i++) {
            lib.onover[i](resultbool);
        }
        if (game.addRecord) {
            game.addRecord(resultbool);
        }
        if (window.isNonameServer) {
            lib.configOL.gameStarted = false;
            game.saveConfig('pagecfg' + window.isNonameServer, [lib.configOL, game.roomId, _status.onlinenickname, _status.onlineavatar]);
            game.reload();
        } else if (_status.connectMode && !game.online) {
            setTimeout(game.reload, 15000);
        }
    };
};

export default lao_noname;