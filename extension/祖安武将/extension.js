game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "祖安武将", editable: false, content: function (config, pack) {
            //delete lib.extensionMenu.extension_祖安武将.author;
            //delete lib.extensionMenu.extension_祖安武将.delete;
            //delete lib.extensionMenu.extension_祖安武将.edit;
            // ---------------------------------------开发者模式------------------------------------------//
            if (1 == 0) {
                lib.config['extension_祖安武将_upspeed'] = '0';
                lib.config['extension_祖安武将_newui'] = '4';
                lib.config['extension_祖安武将_helasisy'] = true;
                if (1 == 0) {
                    lib.config['extension_祖安武将_bizhi'] = '3';
                    lib.config['extension_祖安武将_wallpaper'] = '10';
                }
                lib.config['extension_祖安武将_text'] = true;
                lib.config['extension_祖安武将_isPC'] = '1';
            }
            if (lib.config.plays.contains('coin')) {
                if (lib.config.coin != 99999999) game.changeCoin(99999999 - lib.config.coin);
            }

            // ---------------------------------------手机端检测------------------------------------------//
            // ---------------------------------------手机端检测------------------------------------------//
            // ---------------------------------------错误还原------------------------------------------//
            localStorage.setItem("zuanasset", lib.assetURL);
            if (lib.config['extension_祖安武将_startgame']) {
                var itemd = lib.config['extension_祖安武将_startgame'];
                if (itemd.indexOf('next_') != -1) {
                    lib.config['extension_祖安武将_startgame'] = itemd.slice(5);
                }
                localStorage.setItem("zuanstart", lib.config['extension_祖安武将_startgame']);
            } else {
                localStorage.setItem("zuanstart", 'off');
            }
            lib.config.yuanqilist = ['yuanqi_xuexiang', 'yuanqi_qianghua', 'yuanqi_fantan', 'yuanqi_taoyi', 'yuanqi_diaoxiang', 'yuanqi_zhenshang', 'yuanqi_suji', 'yuanqi_nengliang', 'yuanqi_lengque', 'yuanqi_jinzhan', 'yuanqi_bingdun', 'yuanqi_yiwang', 'yuanqi_shangdian', 'yuanqi_xuanze', 'yuanqi_landun', 'yuanqi_huodun', 'yuanqi_dudun', 'yuanqi_cidun', 'yuanqi_xuedun', 'yuanqi_hudun', 'yuanqi_suidun', 'yuanqi_zishou', 'yuanqi_yaoshui', 'yuanqi_xilan', 'yuanqi_xixue', 'yuanqi_xuli', 'yuanqi_xiandan', 'yuanqi_miaozhun', 'yuanqi_jiguang', 'yuanqi_fanshe', 'yuanqi_yuansu', 'yuanqi_chuantou', 'yuanqi_fangyu', 'yuanqi_xiudun', 'yuanqi_leidun', 'yuanqi_shuangwu', 'yuanqi_chongwu', 'yuanqi_guidun', 'yuanqi_shixue', 'yuanqi_kuangbao', 'yuanqi_zhadan', 'yuanqi_jindun'];
            lib.config['extension_祖安武将_informknow'] = '0';
            lib.config['extension_祖安武将_about3'] = '1';
            lib.config['extension_祖安武将_falseedit'] = '0';
            lib.config.zuanboss = 1;
            lib.config.zuanusecardTX = 'none';
            if (parseFloat(lib.config['extension_祖安武将_mode']) != '1' && parseFloat(lib.config['extension_祖安武将_upspeed']) == '0') {
                game.saveConfig('extension_祖安武将_upspeed', '10');
            }
            var wallpaper = parseFloat(lib.config['extension_祖安武将_wallpaper']);
            if (wallpaper == '0' || wallpaper == '2' || wallpaper == '6') lib.config['extension_祖安武将_wallpaper']++;
            var bizhi = parseFloat(lib.config['extension_祖安武将_bizhi']);
            if (bizhi == '0' || bizhi == '2' || bizhi == '5') lib.config['extension_祖安武将_bizhi']++;
            var items = lib.config['extension_祖安武将_zhishixian'];
            if (items.indexOf('next_') != -1) {
                lib.config['extension_祖安武将_zhishixian'] = items.slice(5);
            }
            if (parseFloat(lib.config['extension_祖安武将_zuancoveropacity']) != 'NaN') {
                lib.config.zuancoveropacity = parseFloat(lib.config['extension_祖安武将_zuancoveropacity'] * 0.1);
            } else {
                lib.config.zuancoveropacity = '0.8';
            }
            /*
            if(parseFloat(lib.config['extension_祖安武将_isPC'])=='2') {
                if(parseFloat(lib.config['extension_祖安武将_fun'])=='7') {
                lib.config['extension_祖安武将_fun']='1';
                alert('抱歉！   _(´ཀ`」 ∠)__ \n      目前由于特殊字符的原因，为防止出现错误，元气系统 在电脑端暂不能使用！\n      已为您暂时关闭此 娱乐玩法。\n      再次选择 娱乐玩法 的其他选项后将不会再次出现此弹窗。');
                }
            }
            */
            // ---------------------------------------处理dying显示------------------------------------------//
            game.dyingShow = function (player, newui) {
                'step 0'
                //alert(player.name);
                var rdying = false;
                if (player.hasSkill('zuan_hudun')) {
                    if (player.hp <= 1 && player.countMark('zuan_hudun') < 1) rdying = true;
                } else {
                    if (player.maxHp > 1) {
                        if (player.hp <= 1) rdying = true;
                    } else {
                        if (player.hp <= 0) rdying = true;
                    }
                }

                if (rdying && !player.storage.dyingimgshow) {

                    var translists = ['none', 'tutou', 'shousha', 'zhounian'];
                    player.storage.dyingimgshow = true;
                    game.broadcastAll(function (player) {
                        player.storage.dying_img = document.createElement('div');
                        player.storage.dying_img.style.opacity = lib.config.zuancoveropacity;
                        player.storage.dying_img.style.backgroundSize = 'cover';
                        player.storage.dying_img.style.width = '100%';
                        player.storage.dying_img.style.height = '100%';
                        player.storage.dying_img.style.transform = 'translateY(-200px)';
                        player.node.avatar.appendChild(player.storage.dying_img);
                        ui.refresh(player.storage.dying_img);
                        player.storage.dying_img.style.transform = '';
                    }, player);

                } else if (player.storage.dyingimgshow && !rdying) {

                    player.storage.dyingimgshow = false;
                    game.broadcastAll(function (player) {
                        player.storage.dying_img.style.transform = 'translateY(-200px)';
                        player.storage.dying_img.delete();
                    }, player)

                }
            };
            // ---------------------------------------新播放alive------------------------------------------//
            game.checkWH = function (width, height) {
                var widther = window.innerWidth / width;
                if (height * widther > window.innerHeight) {
                    return 'width: 100%';
                } else {
                    return 'height: 100%';
                }
            }
            window.newaliveusing = false;
            game.newalive = function (file, time, lawer) {
                if (window.newaliveusing || time <= 0.5) return;
                window.newaliveusing = true;
                setTimeout(function () {
                    window.newaliveusing = false;
                }, time * 1000 + 250);
                //('extension/祖安武将/mode/mode_hellfire.gif',3); 
                function zuangif(file, opa, click) {
                    window.zuanalivegif = ui.create.node('img');
                    zuanalivegif.src = lib.assetURL + file;
                    //alert(window.innerWidth);
                    var zuanwid = game.checkWH(zuanalivegif.width, zuanalivegif.height);
                    if (click) {
                        zuanalivegif.style.cssText = 'pointer-events: none;text-align: center;margin: auto;opacity: ' + opa * 0.1 * lawer + ';display: block;position: absolute;background:none;z-index: 999;' + zuanwid + '!important;left: 0;bottom: 0';
                    } else {
                        zuanalivegif.style.cssText = 'text-align: center;margin: auto;opacity: ' + opa * 0.1 * lawer + ';display: block;position: absolute;background:none;z-index: 999;' + zuanwid + '!important;left: 0;bottom: 0';
                    }
                    document.body.appendChild(zuanalivegif);
                }
                function zuanfora(a) {
                    zuangif(file, a, false);
                    setTimeout(function () {
                        if (a < 10) {
                            zuanalivegif.remove();
                            zuanfora(a + 1);
                        } else {
                            setTimeout(function () {
                                zuanalivegif.remove();
                                zuanforb(a - 1);
                            }, time * 1000 - 500);
                        }
                    }, 25);
                }
                function zuanforb(b) {
                    zuangif(file, b, true);
                    setTimeout(function () {
                        zuanalivegif.remove();
                        if (b > 0) {
                            zuanforb(b - 1);
                        }
                    }, 25);
                }
                zuanfora(0);
                /*setTimeout(function () {
                    zuanalivegif.remove();
                }, time*1000);*/
            };
            window.newaudiousing = false;
            game.newaudio = function (file, time) {
                if (window.newaudiousing) return;
                window.newaudiousing = true;
                setTimeout(function () {
                    window.newaudiousing = false;
                }, time * 1000 + 250);
                var mp3 = lib.assetURL + file;
                var mp3 = new Audio(mp3);
                mp3.volume = lib.config.volumn_audio / 8;//mp3 的音量
                mp3.play(); //播放 mp3这个音频对象
                setTimeout(function () {
                    zuanaud(10);
                }, time * 1000);
                function zuanaud(x) {
                    if (x < 0) {
                        mp3.remove();
                        return;
                    }
                    mp3.volume = lib.config.volumn_audio * x * 0.1 / 8;
                    setTimeout(function () {
                        zuanaud(x - 1);
                    }, 200);
                }

            };
            game.expRevive = function (dd) {
                if (parseFloat(lib.config['extension_祖安武将_audio']) >= '2') game.playAudio('..', 'extension', '祖安武将', 'audio', 'revive.ogg');
                dd.revive(dd.maxHp);
                game.addVideo('revive', dd);
                dd.draw(Math.ceil(dd.storage._levelskill * 0.5));
                dd.storage.relife = Math.ceil(dd.storage._levelskill * 0.4 + 0.1);
                dd.markSkill('_expskill');
                dd.syncStorage('_expskill');
                dd.markSkill('_levelskill');
                dd.syncStorage('_levelskill');
                if (dd.hasSkill('zuan_hudun')) {
                    dd.storage.zuan_hudun = dd.storage.zuan_maxhujia;
                    dd.markSkill('zuan_hudun');
                    dd.syncStorage('zuan_hudun');
                }
                dd.update();
                dd.$damagepop('重生');
                game.log(dd, '<span class=\"zuantext\" style=\"color: #7CFC00\">获得了重生</span>');
                return get.translation(dd.name);
            };
            game.zuanExp = function (player, exp) {
                if (parseFloat(lib.config['extension_祖安武将_upspeed']) != '0') {
                    var speed = 0.1 * parseFloat(lib.config['extension_祖安武将_upspeed']);
                } else {
                    var speed = 1;
                }
                var adds = Math.ceil(exp * speed);
                player.addMark('_expskill', adds, false);
                if (lib.config['extension_祖安武将_levelsay']) player.say('获得了' + adds + '点经验');
                var maxexp = 20 + 2 * player.storage._levelskill;
                if (player.storage._expskill >= maxexp && player.storage._levelskill < 10) {
                    if (parseFloat(lib.config['extension_祖安武将_audio']) >= '4') {
                        if (parseFloat(lib.config['extension_祖安武将_audio']) == '4') {
                            var versons = 'shousha';
                        } else {
                            var versons = 'ten';
                        }
                        game.playAudio('..', 'extension', '祖安武将', 'audio', versons, 'level.mp3');
                    } else if (parseFloat(lib.config['extension_祖安武将_audio']) >= '2') game.playAudio('..', 'extension', '祖安武将', 'audio', 'level.ogg');
                    player.removeMark('_expskill', maxexp, false);
                    player.addMark('_levelskill', 1, false);
                    game.log(player, '提升了一个<span class=\"zuantext\" style=\"color: #FFFF00\">等级</span>');
                    if (!lib.config['extension_祖安武将_balance']) player.draw();
                    if (player.storage._levelskill == 4) {
                        if (parseFloat(lib.config['extension_祖安武将_mode']) == '6') {
                            var skillget = ['hongyan', 'lianhuan', 'tiandu'].randomGet();
                            if (player.hasSkill('lianhuan')) var skillget = ['hongyan', 'tiandu'].randomGet();
                            if (player.hasSkill('tiandu')) var skillget = ['hongyan', 'lianhuan'].randomGet();
                            if (player.hasSkill('hongyan')) var skillget = ['lianhuan', 'tiandu'].randomGet();
                            player.addSkill(skillget);
                        }
                    }
                    if (player.storage._levelskill == 8) {
                        if (parseFloat(lib.config['extension_祖安武将_mode']) == '6') {
                            var skillget = ['guanxing', 'kanpo', 'guicai'].randomGet();
                            if (player.hasSkill('guanxing')) var skillget = ['kanpo', 'guicai'].randomGet();
                            if (player.hasSkill('kanpo')) var skillget = ['guanxing', 'guicai'].randomGet();
                            if (player.hasSkill('guicai')) var skillget = ['guanxing', 'kanpo'].randomGet();
                            player.addSkill(skillget);
                        }
                    }
                    if (lib.config['extension_祖安武将_levelstrong'] == 'old') {
                        if (player.storage._levelskill == 4) {
                            player.changeHujia();
                        }
                        //if(player.storage._levelskill==7) player.addSkill('plusdistance');
                        if (player.storage._levelskill == 8) {
                            player.gainMaxHp();
                        }
                        //if(player.storage._levelskill==10) player.addSkill('maxlevel');
                    } else if (lib.config['extension_祖安武将_levelstrong'] == 'new') {
                        if (player.storage._levelskill == 8) {
                            player.gainMaxHp();
                        }
                    }
                    if (lib.config['extension_祖安武将_levelsay']) player.say('提升了一个等级');
                    player.storage.relife = Math.ceil(player.storage._levelskill * 0.4 + 0.1);
                    if (parseFloat(lib.config['extension_祖安武将_mode']) == '7' && player.group != 'western' && Math.ceil(player.storage._levelskill * 0.5) != player.storage._levelskill * 0.5) {
                        player.logSkill('huanhai');
                        var list = [];
                        var list2 = [];
                        var players = game.players.concat(game.dead);
                        for (i = 0; i < players.length; i++) {
                            list2.add(players[i].name);
                            list2.add(players[i].name1);
                            list2.add(players[i].name2);
                        }
                        for (var i in lib.character) {
                            if (lib.character[i][1] != player.group) continue;
                            if (lib.character[i][3].length < 1) continue;
                            if (lib.character[i][4].contains('forbidai')) continue;
                            if (lib.character[i][4].contains('boss')) continue;
                            if (lib.character[i][4].contains('minskin')) continue;
                            if (player.storage.huanhai.contains(i)) continue;
                            if (list2.contains(i)) continue;
                            list.push(i);
                        }
                        var name = list.randomGet();
                        player.storage.huanhai.push(name);
                        player.markSkill('huanhai');
                        var skills = lib.character[name][3];
                        player.addSkill(skills.randomGet());
                        game.delay();
                    }
                }
                if (player.storage._levelskill >= 10) player.removeMark('_expskill', player.storage._expskill);
                return player.storage._levelskill;
            };
            game.strengthPlayer = function (player) {
                'step 0'
                game.sthpla = [];
                game.sthpla.oldhp = player.hp;
                game.sthpla.oldmaxhp = player.maxHp;
                //game.sthpla.oldstorage=player.storage;
                lib.characterPackSsr = {
                    "mode_extension_祖安武将": lib.characterPack["mode_extension_祖安武将"]
                }
                if (player.name.indexOf('unknown') == -1 || player.name == player.name1) {
                    game.sthpla.hisname = "name";
                } else {
                    game.sthpla.hisname = "name1";
                }
                game.sthpla.num = 1;
                'step 1'
                game.sthpla.changehp = false;
                game.sthpla.namelist = ['fazheng', 'xin_fazheng', 'yuanshu', 're_yuanshu', 'yiji', 'xf_yiji', 'yuanshao', 're_yuanshao', 'yuji', 're_yuji', 'lusu', 're_lusu', 'zhangliang', 're_zhangliang', 'xuhuang', 're_xuhuang', 'xiahouyuan', 're_xiahouyuan', 'xushu', 're_xushu'];
                //alert(player.name);
                game.sthpla.myname1 = player[game.sthpla.hisname];
                if (player.name2) {
                    game.sthpla.myname2 = player.name2;
                } else {
                    game.sthpla.myname2 = 'none';
                }
                game.sthpla.sklists = [];
                var oldlist = lib.character[game.sthpla.myname1][3];
                if (game.sthpla.myname2 != 'none') {
                    oldlist = oldlist.concat(lib.character[game.sthpla.myname2][3]);
                }
                var sklist = player.skills;
                for (i = 0; i < sklist.length; i++) {
                    if (!oldlist.contains(sklist[i])) {
                        game.sthpla.sklists.push(sklist[i]);
                    }
                }
                game.sthpla.changehpnum = 0;
                var str = '' + lib.character[game.sthpla.myname1][2];
                var index = str.indexOf('/');
                var myhp = str.substr(index + 1, str.length);
                'step 2'
                if (game.sthpla.myname1 == 're_sunben') game.sthpla.myname1 = 're_sunce';
                if (game.sthpla.myname2 == 're_sunben') game.sthpla.myname2 = 're_sunce';
                if (game.sthpla.myname1.indexOf('ssr_') != -1) {
                    var inited = false;
                    for (p = 0; p * 2 < game.sthpla.namelist.length; p++) {
                        if (game.sthpla.myname1 == 'ssr_' + game.sthpla.namelist[p * 2]) {
                            if (game.sthpla.myname2 != 'none') {
                                player.init(game.sthpla.namelist[p * 2 + 1]);
                            } else {
                                player.init(game.sthpla.namelist[p * 2 + 1], game.sthpla.myname2);
                            }
                            game.sthpla.changehp = true;
                            inited = true;
                            break;
                        }
                    }
                    if (!inited) {
                        if (game.sthpla.myname2 != 'none') {
                            player.init(game.sthpla.myname1.slice(4));
                        } else {
                            player.init(game.sthpla.myname1.slice(4), game.sthpla.myname2);
                        }
                        game.sthpla.changehp = true;
                    }
                }
                if (game.sthpla.myname2 != 'none' && game.sthpla.myname2.indexOf('ssr_') != -1) {
                    var inited = false;
                    for (p = 0; p * 2 < game.sthpla.namelist.length; p++) {
                        if (game.sthpla.myname2 == 'ssr_' + game.sthpla.namelist[p]) {
                            player.init(player[game.sthpla.hisname], game.sthpla.namelist[p + 1]);
                            game.sthpla.changehp = true;
                            inited = true;
                            break;
                        }
                    }
                    if (!inited) {
                        player.init(player[game.sthpla.hisname], player.name2.slice(4));
                        game.sthpla.changehp = true;
                    }
                }
                'step 3'
                game.sthpla.skill = 'none';
                for (var a in lib.characterPackSsr) {
                    for (var b in lib.characterPackSsr[a]) {
                        var role = lib.characterPackSsr[a][b];
                        if (game.sthpla.myname1.indexOf(b.slice(4)) != -1 && (!(player[game.sthpla.hisname].indexOf('yujin') != -1 && b == 'ssr_yuji')) && (!(player[game.sthpla.hisname].indexOf('zhangheng') != -1 && b == 'ssr_zhanghe'))) {
                            var lists = lib.character[player[game.sthpla.hisname]][3];
                            for (i = 0; i < lists.length; i++) {
                                if (player.hasSkill(lists[i])) {
                                    player.removeSkill(lists[i]);
                                }
                            }
                            player.addSkill(role[3].slice(0));
                        }
                        if (game.sthpla.myname2.indexOf(b.slice(4)) != -1 && (!(player.name2.indexOf('yujin') != -1 && b == 'ssr_yuji')) && (!(player.name2.indexOf('zhangheng') != -1 && b == 'ssr_zhanghe'))) {
                            var lists = lib.character[player.name2][3];
                            for (i = 0; i < lists.length; i++) {
                                if (player.hasSkill(lists[i])) {
                                    player.removeSkill(lists[i]);
                                }
                            }
                            player.addSkill(role[3].slice(0));
                        }
                        player.update();
                    }
                }
                'step 4'
                for (i = 0; i < game.sthpla.sklists.length; i++) {
                    player.addSkill(game.sthpla.sklists[i]);
                }
                player.hp = game.sthpla.oldhp;
                player.maxHp = game.sthpla.oldmaxhp;
                //player.storage=game.sthpla.oldstorage;
                player.update();
                return 'Finished.';
            };
           
            // ---------------------------------------壁纸栏------------------------------------------//
            // ---------------------------------------前置背景------------------------------------------//
            lib.config.standardbackground = ui.background.style.backgroundImage;
            lib.config.zuanexwallpaper = 'off';
            var bizhi = parseFloat(lib.config['extension_祖安武将_bizhi']);
            if (bizhi == '3') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/gif_chunri.jpg");
            if (bizhi == '5') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/chunri.jpg");
            if (bizhi == '6') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/xiahe.jpg");
            if (bizhi == '7') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/yueye.jpg");
            if (bizhi == '8') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/qinbing.jpg");
            if (bizhi == '9') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/caojiegarden.jpg");
            if (bizhi == '10') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/shengong.jpg");
            if (bizhi == '11') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/yuanxi.jpg");
            if (bizhi == '12') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/canglong.jpg");
            if (bizhi == '13') game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/menu/posui.jpg");
            if (lib.config['extension_祖安武将_exwallpaper']) {
                if (lib.config.mode == 'boss') {
                    lib.config.zuanexwallpaper = 'on';
                    game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/boss/menu.jpg");
                }
                if (lib.config.mode == 'chess' || lib.config.mode == 'tafang' || lib.config.mode == 'stone') {
                    lib.config.zuanexwallpaper = 'on';
                    game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/chess/chess.jpg");
                }
                if (lib.config.mode == 'versus' || lib.config.mode == 'single') {
                    lib.config.zuanexwallpaper = 'on';
                    game.broadcastAll() + ui.background.setBackgroundImage("extension/祖安武将/wallpaper/versus/menu.jpg");
                }
            }
            if (1 == 0) {
                alert("最后：\n给你呈现一张壁纸，它是来自作者的广告\n你可以在拓展页面中“前置壁纸”选项中关闭！\n（本弹窗只会弹出一次）");
            }



            // ---------------------------------------指示线------------------------------------------//

            var jianqiLineAnim = {
                "time": 1200,
                "position": "screen",
                "width": "256px",
                "height": "128px",
                "backgroundSize": "100% 100%",
                "opacity": 1,
                "show": "none",
                "fade": true,
                "pause": false,
                "rate_zhen": 18,
                "jump_zhen": false,
                "qianzhui": "",
                "liang": false,
                "isLine": true,
                "cycle": true,
                "style": {},
                "skills": [],
                "cards": [],
                "forbid": false,
                "image": "jianqilinexy"
            };
            game.zsPlayLineAnimation = function (name, node, fake, points) {
                var animation = jianqiLineAnim;
                animation["image"] = name;
                if (lib.config.zsGuideTime) {
                    animation["time"] = parseInt(lib.config.zsGuideTime);
                }
                if (animation == undefined) return;
                if (animation.time <= 100000) {
                    if (animation.pause != false && !_status.paused2 && !_status.nopause) {
                        _status.zhx_onAnimationPause = true;
                        game.pause2();
                    };
                    if (_status.zhx_onAnimation == undefined) _status.zhx_onAnimation = 0;
                    _status.zhx_onAnimation++;
                };
                var src;
                if (animation.image != undefined) src = 'extension/祖安武将/pointer/' + animation.image + '?' + new Date().getTime();
                var finish = function () {
                    var animationID;
                    var timeoutID;
                    var interval;
                    var div = ui.create.div();
                    if (fake == true) {
                        ui.window.appendChild(div);
                    } else {
                        if (node == undefined || node == false) {
                            ui.window.appendChild(div);
                        } else {
                            node.appendChild(div);
                        };
                    };
                    if (animation.style != undefined) {
                        for (var i in animation.style) {
                            if (i == 'innerHTML') continue;
                            div.style[i] = animation.style[i];
                        };
                    };
                    var judgeStyle = function (style) {
                        if (animation.style == undefined) return false;
                        if (animation.style != undefined && animation.style[style] != undefined) return true;
                        return false;
                    };
                    if (judgeStyle('innerHTML')) div.innerHTML = animation.style.innerHTML;
                    if (judgeStyle('width') == false) div.style.width = animation.width;
                    if (judgeStyle('height') == false) div.style.height = animation.height;
                    if (judgeStyle('backgroundSize') == false && judgeStyle('background-size') == false) div.style.backgroundSize = animation.backgroundSize;
                    if (judgeStyle('opacity') == false) div.style.opacity = animation.opacity;
                    if (judgeStyle('zIndex') == false && judgeStyle('z-index') == false) div.style.zIndex = 1001;
                    if (judgeStyle('borderRadius') == false && judgeStyle('border-radius') == false) div.style.borderRadius = '5px';
                    if (judgeStyle('pointer-events') == false && judgeStyle('pointerEvents') == false) div.style['pointer-events'] = 'none';
                    if (src != undefined) {
                        if (animation.image.indexOf('.') != -1) {
                            div.setBackgroundImage(src);
                        } else {
                            var type_frame1 = 0;
                            var type_frame = '.jpg';
                            var num_frame = 1;
                            type_frame = '.png';
                            num_frame = 8;
                            var folder_frame = lib.assetURL + 'extension/祖安武将/pointer/' + animation.image + '/';
                            var div1 = ui.create.div();
                            div1.style.height = '100%';
                            div1.style.width = '100%';
                            div1.style.top = '0px';
                            div1.style.left = '0px';
                            div1.style.opacity = '0.7';
                            div.appendChild(div1);
                            var canvas = document.createElement("canvas");
                            canvas.width = div1.offsetWidth;
                            canvas.height = div1.offsetHeight;
                            div1.appendChild(canvas);
                            var context = canvas.getContext("2d");
                            var start;
                            var imgs = [];
                            var imgs_num = 0;
                            for (i = 0; i < num_frame; i++) {
                                var img = new Image();
                                img.src = folder_frame + (animation.qianzhui == undefined ? '' : animation.qianzhui) +
                                    (animation.liang == true ? (i < 10 ? '0' + i : i) : i) + type_frame;
                                if (i >= num_frame - 1) img.zhx_final = true;
                                img.onload = function () {
                                    imgs.push(this);
                                    if (this.zhx_final == true) start();
                                };
                                img.onerror = function () {
                                    if (this.zhx_final == true) start();
                                };
                            };
                            start = function () {
                                var play = function () {
                                    if (imgs_num >= imgs.length) return;
                                    var img = imgs[imgs_num];
                                    context.clearRect(0, 0, img.width, img.height);
                                    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, div1.offsetWidth, div1.offsetHeight);
                                    imgs_num++;
                                    if (animation.jump_zhen == true && imgs[imgs_num + 1] != undefined) imgs.remove(imgs_num + 1);
                                    if (imgs_num >= imgs.length) {
                                        if (animation.cycle == true) {
                                            imgs_num = 0;
                                        } else {
                                            if (interval != undefined) clearInterval(interval);
                                            if (timeoutID != undefined) clearTimeout(timeoutID);
                                            if (animationID != undefined) cancelAnimationFrame(animationID);
                                        };
                                    };
                                };
                                interval = setInterval(play, animation.rate_zhen == undefined ? 45 : (1000 / animation.rate_zhen));
                            };


                        };
                    };
                    if (points == undefined) {
                        if (fake == true) {
                            div.style.top = (top - div.offsetHeight / 2) + 'px';
                            div.style.left = (left - div.offsetWidth / 2) + 'px';
                        } else {
                            if (judgeStyle('top') == false) div.style.top = 'calc(50% - ' + (div.offsetHeight / 2) + 'px)';
                            if (judgeStyle('left') == false) div.style.left = 'calc(50% - ' + (div.offsetWidth / 2) + 'px)';
                        };
                    } else {
                        div.style.top = (points[0][1] - div.offsetHeight / 2) + 'px';
                        div.style.left = (points[0][0]) + 'px';
                    };
                    if (points != undefined) {
                        var timeS = ((animation.fade == true ? animation.time - 450 : animation.time - 100) / 1000) / 2;
                        var getAngle = function (x1, y1, x2, y2, bool) {
                            var x = x1 - x2;
                            var y = y1 - y2;
                            var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
                            var cos = y / z;
                            var radina = Math.acos(cos);
                            var angle = 180 / (Math.PI / radina);
                            if (x2 > x1 && y2 === y1) angle = 0;
                            if (x2 > x1 && y2 < y1) angle = angle - 90;
                            if (x2 === x1 && y1 > y2) angle = -90;
                            if (x2 < x1 && y2 < y1) angle = 270 - angle;
                            if (x2 < x1 && y2 === y1) angle = 180;
                            if (x2 < x1 && y2 > y1) angle = 270 - angle;
                            if (x2 === x1 && y2 > y1) angle = 90;
                            if (x2 > x1 && y2 > y1) angle = angle - 90;
                            if (bool == true && angle > 90) angle -= 180;
                            return angle;
                        };
                        var p1 = points[0];
                        var p2 = points[1];
                        var x0 = p1[0];
                        var y0 = p1[1];
                        var x1 = p2[0];
                        var y1 = p2[1];
                        div.style.transition = 'all 0s';
                        div.style.transform = 'rotate(' + getAngle(x0, y0, x1, y1, true) + 'deg)' + (x0 > x1 ? '' : ' rotateY(180deg)');
                        div.style['transform-origin'] = '0 50%';
                        var div2 = ui.create.div();
                        div2.style.zIndex = 1000;
                        div2.style['pointer-events'] = 'none';
                        div2.style.height = '20px';
                        div2.style.width = (Math.pow(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2), 0.5) + 2) + 'px';
                        div2.style.left = (x0) + 'px';
                        div2.style.top = (y0 - 10) + 'px';
                        div2.style.transform = 'rotate(' + getAngle(x0, y0, x1, y1) + 'deg) scaleX(0)';
                        div2.style['transform-origin'] = '0 50%';
                        div2.style.transition = 'all ' + (timeS * 4 / 3) + 's';
                        if (src != undefined && animation.image.indexOf('.') == -1) {
                            div2.style.backgroundSize = '100% 100%';
                            div2.style.opacity = '0.7';
                            div2.setBackgroundImage('extension/祖安武将/pointer/' + animation.image + '/line.png');
                        } else {
                            div2.style.background = '#ffffff';
                        };
                        setTimeout(function () {
                            div.style.transition = 'all ' + (timeS * 4 / 3) + 's';
                            div.style.transform += ' translateX(' + (-(Math.pow(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2), 0.5) + 2)) + 'px)';
                            div2.style.transform = 'rotate(' + getAngle(x0, y0, x1, y1) + 'deg) scaleX(1)';
                        }, 50);
                        setTimeout(function () {
                            div2.style.transition = 'all ' + (timeS * 2 / 3) + 's';
                            div2.style.transform = 'rotate(' + getAngle(x0, y0, x1, y1) + 'deg) translateX(' +
                                (Math.pow(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2), 0.5) + 2 -
                                    Math.pow(Math.pow(div.offsetHeight / 2, 2) + Math.pow(div.offsetWidth / 2, 2), 0.5)) + 'px) scaleX(0.01)';
                        }, 50 + timeS * 4 / 3 * 1000);
                        node.appendChild(div2);
                    };
                    if (animation.time <= 100000) {
                        if (animation.fade == true) {
                            if (div2 != undefined) {
                                setTimeout(function () {
                                    div2.hide();
                                }, animation.time - 350);
                                setTimeout(function () {
                                    div.hide();
                                }, animation.time - 400);
                            } else {
                                setTimeout(function () {
                                    div.hide();
                                }, animation.time - 350);
                            };
                        };
                        setTimeout(function () {
                            if (interval != undefined) clearInterval(interval);
                            if (timeoutID != undefined) clearTimeout(timeoutID);
                            if (animationID != undefined) cancelAnimationFrame(animationID);
                            if (fake == true) {
                                ui.window.removeChild(div);
                            } else {
                                if (node == undefined || node == false) {
                                    ui.window.removeChild(div);
                                } else {
                                    node.removeChild(div);
                                };
                            };
                            if (div2 != undefined) node.removeChild(div2);
                            _status.zhx_onAnimation--;
                            if (_status.zhx_onAnimationPause == true && _status.zhx_onAnimation == 0) {
                                delete _status.zhx_onAnimationPause;
                                game.resume2();
                            };
                        }, animation.time);
                    };
                };
                if (animation.delay != undefined) {
                    setTimeout(finish, animation.delay);
                } else {
                    finish();
                };
            };
            game.zsOriginLineXy = game.linexy;
            game.zsShuimoLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                var total = typeof arguments[1] === 'number' ? arguments[1] : lib.config.duration * 2;
                var opacity = 0.85;
                r = Math.floor(Math.random() * 256); //随机生成256以内r值
                g = Math.floor(Math.random() * 256); //随机生成256以内g值
                b = Math.floor(Math.random() * 256); //随机生成256以内b值
                var color = [r, g, b];
                var dashed = false;
                var drag = false;
                if (typeof arguments[1] == 'object') {
                    for (var i in arguments[1]) {
                        switch (i) {
                            case 'opacity': opacity = arguments[1][i]; break;
                            case 'color': color = arguments[1][i]; break;
                            case 'dashed': dashed = arguments[1][i]; break;
                            case 'duration': total = arguments[1][i]; break;
                        }
                    }
                }
                else if (arguments[1] == 'fire' || arguments[1] == 'thunder' || arguments[1] == 'green') {
                    color = arguments[1];
                }
                total *= 2;
                var longtou = ui.create.div('.zhx-longtou');
                ui.create.div('.zhx-longtou-image', longtou);
                color = [r, g, b];
                var node;
                if (arguments[1] == 'drag') {
                    color = [r, g, b];
                    drag = true;
                    if (arguments[2]) {
                        node = arguments[2]
                    }
                    else {
                        node = ui.create.div('.linexy.drag');
                        ui.create.div('.zhx-shuimo-line', node);
                        node.style.left = from[0] + 'px';
                        node.style.top = from[1] + 'px';
                        node.style.opacity = 0.7;
                        longtou.style.left = from[0] + 'px';
                        longtou.style.top = from[1] + 'px';
                        longtou.style.opacity = 0;
                        node.style.background = 'linear-gradient(transparent,rgba(' + color.toString() + ',' + opacity + '),rgba(' + color.toString() + ',' + opacity + '))';
                        if (game.chess) {
                            ui.chess.appendChild(node);
                            ui.chess.appendChild(longtou);
                        }
                        else {
                            ui.arena.appendChild(node);
                            ui.arena.appendChild(longtou);
                        }
                    }
                }
                else {
                    node = ui.create.div('.linexy.hidden');
                    ui.create.div('.zhx-shuimo-line', node);
                    node.style.left = from[0] + 'px';
                    node.style.top = from[1] + 'px';
                    node.style.opacity = 0.7;
                    node.style.background = 'linear-gradient(transparent,rgba(' + color.toString() + ',' + opacity + '),rgba(' + color.toString() + ',' + opacity + '))';
                    if (lib.config.zsGuideTime) {
                        node.style.transitionDuration = (parseInt(lib.config.zsGuideTime) / 1000) + 's';
                    } else {
                        node.style.transitionDuration = (1200 / 1000) + 's';
                    }
                    longtou.style.left = from[0] + 'px';
                    longtou.style.top = from[1] + 'px';
                    longtou.style.opacity = 0;
                    if (lib.config.zsGuideTime) {
                        longtou.style.transitionDuration = (parseInt(lib.config.zsGuideTime) / 1000) + 's';
                    } else {
                        longtou.style.transitionDuration = (1200 / 1000) + 's';
                    }
                }
                var dy = to[1] - from[1];
                var dx = to[0] - from[0];
                var deg = Math.atan(Math.abs(dy) / Math.abs(dx)) / Math.PI * 180;
                if (dx >= 0) {
                    if (dy <= 0) {
                        deg += 90;
                    }
                    else {
                        deg = 90 - deg;
                    }
                }
                else {
                    if (dy <= 0) {
                        deg = 270 - deg;
                    }
                    else {
                        deg += 270;
                    }
                }
                if (drag) {
                    node.style.transform = 'rotate(' + (-deg) + 'deg)';
                    node.style.height = get.xyDistance(from, to) + 'px';

                    longtou.style.transform = 'rotate(' + (-deg) + 'deg)';
                    longtou.style.opacity = 0.7;
                }
                else {
                    node.style.transform = 'rotate(' + (-deg) + 'deg) scaleY(0)';
                    node.style.height = get.xyDistance(from, to) + 'px';

                    longtou.style.transform = 'rotate(' + (-deg) + 'deg) translate(0,0)';
                    if (game.chess) {
                        ui.chess.appendChild(node);
                        ui.chess.appendChild(longtou);
                    }
                    else {
                        ui.arena.appendChild(node);
                        ui.arena.appendChild(longtou);
                    }
                    ui.refresh(node);
                    node.show();
                    node.style.transform = 'rotate(' + (-deg) + 'deg) scaleY(1)';
                    ui.refresh(longtou);
                    longtou.show();
                    longtou.style.transform = 'rotate(' + (-deg) + 'deg) translate(0,' + get.xyDistance(from, to) + 'px)';
                    longtou.style.opacity = 0.7;
                    node.listenTransition(function () {
                        setTimeout(function () {
                            if (node.classList.contains('removing')) return;
                            node.delete();
                        }, total / 3);
                    });
                    longtou.listenTransition(function () {
                        //setTimeout(function(){
                        if (longtou.classList.contains('removing')) return;
                        longtou.delete();
                        //},total/3);
                    });
                }
                return node;
            };
            //借鉴了极光的扩展OL，以及玄武江湖。
            //先攻指示线
            game.zsXiangongLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('jianqilinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('jianqilinexy', ui.arena, false, [from, to]);
                };
            };

            //竹杖指示线
            game.zsZhuzhangLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('zhuzhanglinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('zhuzhanglinexy', ui.arena, false, [from, to]);
                };
            };

            //神剑指示线
            game.zsShenjianLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('shenjianlinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('shenjianlinexy', ui.arena, false, [from, to]);
                };
            };

            //御剑指示线
            game.zsYujianLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('yujianlinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('yujianlinexy', ui.arena, false, [from, to]);
                };
            };

            //暗黑指示线
            game.zsAnheiLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('anheilinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('anheilinexy', ui.arena, false, [from, to]);
                };
            };

            //魔爪指示线
            game.zsMozhuaLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('mozhualinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('mozhualinexy', ui.arena, false, [from, to]);
                };
            };

            //剑锋指示线
            game.zsJianfengLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('jianfenglinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('jianfenglinexy', ui.arena, false, [from, to]);
                };
            };

            //金箭指示线
            game.zsJinjianLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('jinjianlinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('jinjianlinexy', ui.arena, false, [from, to]);
                };
            };

            //金龙指示线
            game.zsJinlongLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('jinlonglinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('jinlonglinexy', ui.arena, false, [from, to]);
                };
            };

            //落英指示线
            game.zsLuoyingLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('luoyinglinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('luoyinglinexy', ui.arena, false, [from, to]);
                };
            };

            //星蝶指示线
            game.zsXingdieLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('xingdielinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('xingdielinexy', ui.arena, false, [from, to]);
                };
            };

            //月仙指示线
            game.zsYuexianLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('yuexianlinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('yuexianlinexy', ui.arena, false, [from, to]);
                };
            };

            //蛇杖指示线
            game.zsShezhangLineXy = function (path) {
                var from = [path[0], path[1]];
                var to = [path[2], path[3]];
                if (game.chess) {
                    game.zsPlayLineAnimation('shezhanglinexy', ui.chess, false, [from, to]);
                } else {
                    game.zsPlayLineAnimation('shezhanglinexy', ui.arena, false, [from, to]);
                };
            };

            if (lib.config.zuanzhishixian && lib.config.zuanzhishixian !== 'moren') {
                game.saveConfig('extension_十周年UI_playerLineEffect', false);
                if (window.decadeUI) decadeUI.config.playerLineEffect = false;
                game.linexy = game['zs' + lib.config.zuanzhishixian + 'LineXy'];
            }

            game.saveConfig('zuanzhishixian', lib.config['extension_祖安武将_zhishixian']);
            game.saveConfig('extension_十周年UI_playerLineEffect', lib.config['extension_祖安武将_zhishixian']);
            if (window.decadeUI) decadeUI.config.playerLineEffect = lib.config['extension_祖安武将_zhishixian'];
            if (lib.config['extension_祖安武将_zhishixian'] == 'moren') {
                game.linexy = game.zsOriginLineXy;
            } else {
                game.linexy = game['zs' + lib.config['extension_祖安武将_zhishixian'] + 'LineXy'];
            }
            // ---------------------------------------指示线------------------------------------------//




            // ---------------------------------------砸花送蛋------------------------------------------//
            lib.skill._zuan_damageSendEgg = {
                forced: true,
                popup: false,
                priority: -98,
                trigger: {
                    global: 'damageEnd',
                },
                filter: function (event, player) {
                    var evt = event.getParent();
                    return lib.config['extension_祖安武将_zuanemotion'] && !player.isUnderControl(true) && player.throwEmotion && get.attitude(player, event.player) > 0 && game.xwGetPhasePlayer() == event.player;
                },
                content: function () {
                    'step 0'
                    if (Math.random() >= 0.8) {
                        player.throwEmotion(trigger.player, ['egg', 'shoe'].randomGet());
                    }
                }
            };
            lib.element.player.zuanLikeMe = function (tar, rate) {
                if (!rate) {
                    rate = 1;
                }
                if (!lib.config['extension_祖安武将_zuanemotion']) {
                    return;
                }
                if (!this.throwEmotion) {
                    return;
                }
                if (tar === 'friend') {
                    tar = game.filterPlayer(function (current) {
                        return current != this && get.attitude(current, this) > 0 && get.attitude(this, current) > 0;
                    });
                } else if (tar === 'enemy') {
                    tar = game.filterPlayer(function (current) {
                        return current != this && get.attitude(current, this) < 0 && get.attitude(this, current) < 0;
                    });
                } else if (!Array.isArray(tar)) {
                    tar = [tar];
                }
                tar.randomSort();
                for (var p of tar) {
                    if (Math.random() <= rate) {
                        p.throwEmotion(this, 'flower');
                    }
                }
            };

            lib.element.player.zuanHateMe = function (tar, rate) {
                if (!rate) {
                    rate = 1;
                }
                if (!lib.config['extension_祖安武将_zuanemotion']) {
                    return;
                }
                if (!this.throwEmotion) {
                    return;
                }
                if (tar === 'friend') {
                    tar = game.filterPlayer(function (current) {
                        return current != this && get.attitude(current, this) > 0 && get.attitude(this, current) > 0;
                    });
                } else if (tar === 'enemy') {
                    tar = game.filterPlayer(function (current) {
                        return current != this && get.attitude(current, this) < 0 && get.attitude(this, current) < 0;
                    });
                } else if (!Array.isArray(tar)) {
                    tar = [tar];
                }
                tar.randomSort();
                for (var p of tar) {
                    if (Math.random() <= rate) {
                        p.throwEmotion(this, ['egg', 'shoe'].randomGet());
                    }
                }
            };
            lib.skill._zuan_sendWine = {
                forced: true,
                popup: false,
                priority: -45,
                trigger: {
                    global: ['phaseUseBegin', 'useCard'],
                },
                filter: function (event, player) {
                    if (event.name == 'useCard') {
                        if (event.card.name != 'jiu') return false;
                        if (event.player.hp == 1) return false;
                        if (event.player == player) return false;
                        if (player.isUnderControl(true)) return false;
                        if (event.player.hp <= 0) return false;
                        return lib.config['extension_祖安武将_zuanemotion'] && get.attitude(player, event.player) > 0 && get.attitude(event.player, player) > 0;
                    }
                    return get.attitude(player, event.player) > 0 && get.attitude(event.player, player) > 0 && event.player.countCards('h') > 5 && lib.config['extension_祖安武将_zuanemotion'] && !player.isUnderControl(true) && player.throwEmotion;
                },
                content: function () {
                    if (trigger.name == 'useCard') {
                        if (Math.random() > 0.3) {
                            player.throwEmotion(trigger.player, 'wine');
                        }
                        return;
                    }
                    if (Math.random() < trigger.player.countCards('h') / 15 && trigger.player != player) {
                        player.throwEmotion(trigger.player, 'wine');
                    }
                }
            };
            lib.skill._zuan_damageSendEgg = {
                forced: true,
                popup: false,
                priority: -998,
                trigger: {
                    player: 'damageSource',
                },
                filter: function (event, player) {
                    return !player.hasSkillTag('maixie') && !player.hasSkillTag('maixie_hp') && event.source && get.attitude(player, event.source) > 0 && lib.config['extension_祖安武将_zuanemotion'] && !player.isUnderControl(true) && player.throwEmotion;
                },
                content: function () {
                    'step 0'
                    if (Math.random() > 0.5) {
                        player.throwEmotion(trigger.source, ['shoe', 'egg'].randomGet());
                    }
                }
            };
            lib.skill._zuan_damageSendFlower = {
                forced: true,
                popup: false,
                priority: -3,
                trigger: {
                    global: 'damageSource',
                },
                filter: function (event, player) {
                    return event.source && event.num > 1 && get.attitude(player, event.player) < 0 && get.attitude(player, event.source) > 0 && lib.config['extension_祖安武将_zuanemotion'] && !player.isUnderControl(true) && player.throwEmotion;
                },
                content: function () {
                    'step 0'
                    if (Math.random() > 1 / trigger.num && trigger.source != player) {
                        player.throwEmotion(trigger.source, 'flower');
                    }
                }
            };
            lib.skill._zuan_killSendFlower = {
                forced: true,
                popup: false,
                priority: -23,
                trigger: {
                    global: 'dieBegin',
                },
                filter: function (event, player) {
                    return get.attitude(player, event.player) < 0 && lib.config['extension_祖安武将_zuanemotion'] && !player.isUnderControl(true) && player.throwEmotion;
                },
                content: function () {
                    'step 0'
                    event.killer = event.source;
                    if (!event.killer || get.attitude(player, event.killer) <= 0) {
                        var evt = trigger.getParent(3);
                        event.killer = evt.player;
                    }
                    if (event.killer && event.killer != player && get.attitude(player, event.killer) > 0) {
                        if (Math.random() > 0.2) {
                            player.throwEmotion(event.killer, 'flower');
                        }
                    }
                }
            };




            // ---------------------------------------游戏音效------------------------------------------//
            //if(false) {
            lib.skill._extraphaseskill = {//回合开始音效//
                trigger: {
                    player: ["phaseBefore"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'phase.mp3');
                },
            }
            lib.skill._extradieskill = {//死亡音效//
                trigger: {
                    player: ["die"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'die.mp3');
                },
            }
            lib.skill._extraturnoverskill = {//翻面音效//
                trigger: {
                    player: ["trunOverBefore"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'turnover.mp3');
                },
            }
            lib.skill._extradamageskill = {//伤害音效//
                trigger: {
                    player: ["damageBefore"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    if (!trigger.nature) {
                        var nature = '_basic';
                    } else {
                        var nature = '_' + trigger.nature;
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'damage' + nature + '.mp3');
                },
            }
            lib.skill._extradlosehpskill = {//流失音效//
                trigger: {
                    player: ["loseHpBefore"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'damage_water.mp3');
                },
            }
            lib.skill._extraloseskill = {//移出游戏音效//
                trigger: {
                    global: ["loseAfter", "addCardToStorage", "loseAsyncAfter"],
                },
                filter: function (event, player, name) {
                    if (name != 'addCardToStorage') return event.toStorage == true;
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                forced: true,
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'common.mp3');
                },
            }
            lib.skill._extragainskill = {//获得牌音效//
                trigger: {
                    player: ["gainBefore", "loseBefore"],
                },
                forced: true,
                filter: function (event) {
                    if (name == 'addCardToStorage' || event.toStorage == true) return false;
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'draw.mp3');
                },
            }
            lib.skill._extracompareskill = {//拼点音效//
                trigger: {
                    player: ["chooseToCompareBefore"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var verson = '_ten'; var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') game.playAudio('..', 'extension', '祖安武将', 'audio', 'shousha', 'compare.mp3');
                    if (cho == '5') game.playAudio('..', 'extension', '祖安武将', 'audio', 'ten', 'compare.mp3');
                },
            }
            lib.skill._extrauseskill = {//用牌音效//
                trigger: {
                    player: ["useCardBefore", "respondBefore"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'use.mp3');
                },
            }
            lib.skill._extrajudgeskill = {//判定音效//
                trigger: {
                    player: ["judgeBefore"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'judge.mp3');
                },
            }
            lib.skill._extralinkskill = {//横置音效//
                trigger: {
                    player: ["linkBefore"],
                },
                forced: true,
                filter: function (event) {
                    return (parseFloat(lib.config['extension_祖安武将_audio']) >= '4');
                },
                content: function () {
                    var cho = parseFloat(lib.config['extension_祖安武将_audio']);
                    if (cho == '4') {
                        var verson = 'shousha';
                    } else {
                        var verson = 'ten';
                    }
                    if (player.isLinked) {
                        var during = '_false';
                    } else {
                        var during = '_true';
                    }
                    game.playAudio('..', 'extension', '祖安武将', 'audio', verson, 'link' + during + '.mp3');
                },
            }
            //}
            // ---------------------------------------游戏音效------------------------------------------//
            if (parseFloat(lib.config['extension_祖安武将_audio']) <= '3') {
                lib.skill._comparesayskill = {
                    trigger: {
                        player: ["chooseToCompareBefore"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_audio']) >= '2');
                    },
                    content: function () {
                        game.playAudio('..', 'extension', '祖安武将', 'audio', 'compare.ogg');
                    },
                }
                lib.skill._equipuseskill = {
                    trigger: {
                        player: ["useCard"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (get.type(event.card) == 'equip' && parseFloat(lib.config['extension_祖安武将_audio']) >= '3');
                    },
                    content: function () {
                        game.playAudio('..', 'extension', '祖安武将', 'audio', 'pdd_equip.mp3');
                    },
                }
                lib.skill._damsayskill = {
                    trigger: {
                        player: ["damageBegin"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_audio']) >= '3');
                    },
                    content: function () {
                        game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_damage.mp3');
                    },
                }
                lib.skill._saveskill = {
                    trigger: {
                        player: ["dying"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_audio']) >= '3');
                    },
                    content: function () {
                        game.playAudio('..', 'extension', '祖安武将', 'audio', 'pdd_save.mp3');
                    },
                }
                lib.skill._dieskill = {
                    trigger: {
                        player: ["die"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (get.type(event.card) == 'equip' && parseFloat(lib.config['extension_祖安武将_audio']) >= '3');
                    },
                    content: function () {
                        game.playAudio('..', 'extension', '祖安武将', 'audio', 'lyl_die.mp3');
                    },
                }
                lib.skill._shanskill = {
                    trigger: {
                        player: ["respond"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (event.card.name == 'equip' && parseFloat(lib.config['extension_祖安武将_audio']) >= '3');
                    },
                    content: function () {
                        game.playAudio('..', 'extension', '祖安武将', 'audio', 'pdd_shan.mp3');
                    },
                }
                lib.skill._useCardsayskill = {
                    trigger: {
                        player: ["useCard"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_audio']) >= '2');
                    },
                    content: function () {
                        if (parseFloat(lib.config['extension_祖安武将_audio']) >= '2') game.playAudio('..', 'extension', '祖安武将', 'audio', 'use.mp3');
                        if (parseFloat(lib.config['extension_祖安武将_audio']) >= '3') {
                            if (get.name(trigger.card) == 'sha') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lyl_sha.mp3');
                            }
                            if (get.name(trigger.card) == 'juedou') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'pdd_sha.mp3');
                            }
                            if (get.name(trigger.card) == 'guohe') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'pdd_guohe.mp3');
                            }
                            if (get.name(trigger.card) == 'wuxie') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lyl_wuxie.mp3');
                            }
                            if (get.name(trigger.card) == 'nanman') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'pdd_wanjian.mp3');
                            }
                            if (get.name(trigger.card) == 'wanjian') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_wanjian.mp3');
                            }
                            if (get.name(trigger.card) == 'tao') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'pdd_tao.mp3');
                            }
                            if (get.name(trigger.card) == 'jiedao') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_jiedao.mp3');
                            }
                            if (get.name(trigger.card) == 'shunshou') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'pdd_shunshou.mp3');
                            }
                            if (get.name(trigger.card) == 'taoyuan') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_wugu.mp3');
                            }
                            if (get.name(trigger.card) == 'wugu') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lyl_wugu.mp3');
                            }
                            if (get.name(trigger.card) == 'wuzhong') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_draw.mp3');
                            }
                            if (get.name(trigger.card) == 'jiu') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lyl_jiu.mp3');
                            }
                            if (get.name(trigger.card) == 'huogong') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_jiu.mp3');
                            }
                            if (get.name(trigger.card) == 'tiesuo') {
                                game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_jiu.mp3');
                            }
                        }
                    },
                }
                lib.skill._phasebeginskill = {
                    trigger: {
                        player: ["phaseBegin"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_audio']) >= '2');
                    },
                    content: function () {
                        if (parseFloat(lib.config['extension_祖安武将_audio']) >= '3') {
                            game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_phase.mp3');
                        } else {
                            game.playAudio('..', 'extension', '祖安武将', 'audio', 'phase.mp3');
                        }
                    },
                }
                lib.skill._phaseendskill = {
                    trigger: {
                        player: ["phaseEnd"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_audio']) >= '2');
                    },
                    content: function () {
                        if (parseFloat(lib.config['extension_祖安武将_audio']) >= '3') {
                            game.playAudio('..', 'extension', '祖安武将', 'audio', 'lbw_end.mp3');
                        } else {
                            game.playAudio('..', 'extension', '祖安武将', 'audio', 'end.ogg');
                        }
                    },
                }
                lib.skill._judgeskill = {
                    trigger: {
                        player: ["judgeBegin"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_audio']) >= '2');
                    },
                    content: function () {
                        game.playAudio('..', 'extension', '祖安武将', 'audio', 'judge.ogg');
                    },
                }
                lib.skill._linkskill = {
                    trigger: {
                        player: ["linkAfter"],
                    },
                    forced: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_audio']) >= '2');
                    },
                    content: function () {
                        game.playAudio('..', 'extension', '祖安武将', 'audio', 'link.ogg');
                    },
                }
            }
            // ---------------------------------------指示线确认------------------------------------------//
            lib.skill._zuanattacklinecheck = {
                trigger: {
                    global: ['gameDrawBefore'],
                    player: "enterGame",
                },
                direct: true,
                priority: 105,
                filter: function (event, player) {
                    return player == game.me;
                },
                content: function () {
                    game.saveConfig('zuanzhishixian', lib.config['extension_祖安武将_zhishixian']);
                    game.saveConfig('extension_十周年UI_playerLineEffect', lib.config['extension_祖安武将_zhishixian']);
                    if (window.decadeUI) decadeUI.config.playerLineEffect = lib.config['extension_祖安武将_zhishixian'];
                    if (lib.config['extension_祖安武将_zhishixian'] == 'moren') {
                        game.linexy = game.zsOriginLineXy;
                    } else {
                        game.linexy = game['zs' + lib.config['extension_祖安武将_zhishixian'] + 'LineXy'];
                    }
                },
            }




            // ---------------------------------------边框美化------------------------------------------//
            if (parseFloat(lib.config['extension_祖安武将_biankuang']) != '0' || parseFloat(lib.config['extension_祖安武将_qiankuang']) != '0') {
                lib.skill._newbiankuang = {
                    trigger: {
                        global: ['gameDrawBefore'],
                        player: "enterGame",
                    },
                    direct: true,
                    priority: 15,
                    filter: function (event, player) {
                        return player == game.me;
                    },
                    content: function () {
                        'step 0'
                        // ---------------------------------------背景------------------------------------------//
                        event.count = 0;
                        event.background = 'none';
                        if (parseFloat(lib.config['extension_祖安武将_biankuang']) == '1') {
                            event.back = 'guozhan';
                            if (player.group == 'wei' || player.group == 'jin') event.back = 'xuanwu';
                            if (player.group == 'shu') event.back = 'zhuque';
                            if (player.group == 'wu') event.back = 'qinglong';
                            if (player.group == 'qun' || player.group == 'xi') event.back = 'baihu';
                        }
                        if (parseFloat(lib.config['extension_祖安武将_biankuang']) == '2') event.back = ['qinglong', 'baihu', 'zhuque', 'xuanwu'].randomGet();
                        if (parseFloat(lib.config['extension_祖安武将_biankuang']) == '3') event.back = 'zhulu';
                        if (parseFloat(lib.config['extension_祖安武将_biankuang']) == '4') event.back = 'guozhan';
                        event.biankuang = "extension/祖安武将/handcard/Handcard_background_" + event.back + '.png';
                        //event.biankuang='extension/祖安武将/handcard/Handcard_background.png';

                        // ---------------------------------------前景------------------------------------------//
                        event.cover = 'none';
                        if (parseFloat(lib.config['extension_祖安武将_qiankuang']) == '1') event.cover = ['donghai', 'beimo', 'tianshan'].randomGet();
                        if (parseFloat(lib.config['extension_祖安武将_qiankuang']) == '2') event.cover = 'donghai';
                        if (parseFloat(lib.config['extension_祖安武将_qiankuang']) == '3') event.cover = 'beimo';
                        if (parseFloat(lib.config['extension_祖安武将_qiankuang']) == '4') event.cover = 'tianshan';
                        event.qiankuang = "extension/祖安武将/handcard/Handcard_cover_" + event.cover + '.png';

                        if (parseFloat(lib.config['extension_祖安武将_isPC']) == '1') {
                            event.width = 617;
                            event.height = 128;
                            event.top = 380;
                            event.left = 165;
                            event.lefts = event.width * 0.5 + 40;
                            event.bottom = 6;
                        }
                        if (parseFloat(lib.config['extension_祖安武将_isPC']) == '2') {
                            event.width = 582;
                            event.height = 120;
                            event.top = 490;
                            event.left = 160;
                            event.lefts = event.width * 0.5 + 20;
                            event.bottom = 8;
                        }
                        if (parseFloat(lib.config['extension_祖安武将_isPC']) == '3') {
                            event.width = 882;
                            event.height = 128;
                            event.top = 500;
                            event.left = 160;
                            event.lefts = event.width * 0.5 + 30;
                            event.bottom = 8;
                        }

                        'step 1'
                        event.count++;
                        var windows = localStorage.getItem("zuanwindow");
                        if (parseFloat(lib.config['extension_祖安武将_isPC']) == '1') {
                            //手机 95%
                            //卡牌背景
                            if (parseFloat(lib.config['extension_祖安武将_biankuang']) != '0') {
                                if (event.biankuangs) event.biankuangs.remove();
                                event.biankuangs = ui.create.node('img');
                                event.biankuangs.src = lib.assetURL + event.biankuang;
                                event.biankuangs.style.cssText = 'pointer-events: none;opacity: ' + 0.08 * event.count + ';display: block;width: 75.5%;height: 29%;position: absolute;bottom: 0.5%;left: 8.3%;background:none;z-index:-1;margin: 0 0 0 0';
                                document.body.appendChild(event.biankuangs);
                            }
                            //卡牌层景
                            if (parseFloat(lib.config['extension_祖安武将_qiankuang']) != '0') {
                                if (event.qiankuangs) event.qiankuangs.remove();
                                event.qiankuangs = ui.create.node('img');
                                event.qiankuangs.src = lib.assetURL + event.qiankuang;
                                event.qiankuangs.style.cssText = 'pointer-events: none;opacity: ' + 0.08 * event.count + ';display: block;width: 75.5%;height: 29%;position: absolute;bottom: 0.5%;left: 8.3%;background:none;z-index:4;margin: 0 0 0 0';
                                document.body.appendChild(event.qiankuangs);
                            }
                        } else if (parseFloat(lib.config['extension_祖安武将_isPC']) == '2') {
                            //手机 模拟 80%
                            //卡牌背景
                            if (parseFloat(lib.config['extension_祖安武将_biankuang']) != '0') {
                                if (event.biankuangs) event.biankuangs.remove();
                                event.biankuangs = ui.create.node('img');
                                event.biankuangs.src = lib.assetURL + event.biankuang;
                                event.biankuangs.style.cssText = 'pointer-events: none;opacity: ' + 0.08 * event.count + ';display: block;width: 73.5%;height: 24%;position: absolute;bottom: 0.5%;left: 6%;background:none;z-index:-1;margin: 0 0 0 0';
                                document.body.appendChild(event.biankuangs);
                            }
                            //卡牌层景
                            if (parseFloat(lib.config['extension_祖安武将_qiankuang']) != '0') {
                                if (event.qiankuangs) event.qiankuangs.remove();
                                event.qiankuangs = ui.create.node('img');
                                event.qiankuangs.src = lib.assetURL + event.qiankuang;
                                event.qiankuangs.style.cssText = 'pointer-events: none;opacity: ' + 0.08 * event.count + ';display: block;width: 73.5%;height: 24%;position: absolute;bottom: 0.5%;left: 6%;background:none;z-index:4;margin: 0 0 0 0';
                                document.body.appendChild(event.qiankuangs);
                            }
                        } else {
                            //电脑 大 120%
                            //卡牌背景
                            if (parseFloat(lib.config['extension_祖安武将_biankuang']) != '0') {
                                if (event.biankuangs) event.biankuangs.remove();
                                event.biankuangs = ui.create.node('img');
                                event.biankuangs.src = lib.assetURL + event.biankuang;
                                event.biankuangs.style.cssText = 'pointer-events: none;opacity: ' + 0.08 * event.count + ';display: block;width: 73.5%;height: 24%;position: absolute;bottom: 0.5%;left: 7%;background:none;z-index:-1;margin: 0 0 0 0';
                                document.body.appendChild(event.biankuangs);
                            }
                            //卡牌层景
                            if (parseFloat(lib.config['extension_祖安武将_qiankuang']) != '0') {
                                if (event.qiankuangs) event.qiankuangs.remove();
                                event.qiankuangs = ui.create.node('img');
                                event.qiankuangs.src = lib.assetURL + event.qiankuang;
                                event.qiankuangs.style.cssText = 'pointer-events: none;opacity: ' + 0.08 * event.count + ';display: block;width: 73.5%;height: 24%;position: absolute;bottom: 0.5%;left: 7%;background:none;z-index:4;margin: 0 0 0 0';
                                document.body.appendChild(event.qiankuangs);
                            }
                        }
                        'step 2'
                        if (event.count < 10) {
                            game.delay(0.07);
                            event.goto(1);
                        }
                    },
                }
            }
            // ---------------------------------------动态背景------------------------------------------//  
            if (parseFloat(lib.config['extension_祖安武将_wallpaper']) != '1' || lib.config['extension_祖安武将_exwallpaper']) {
                lib.skill._newBackground = {
                    trigger: {
                        player: ['phaseBefore', 'judgeAfter', 'dieAfter'],
                    },
                    direct: true,
                    priority: 20,
                    filter: function (event, player) {
                        if (lib.config.zuanchoose == 'none') return false;
                        if (lib.config['extension_祖安武将_texiao']) {
                            if (parseFloat(lib.config['extension_祖安武将_wallpaper']) == '1' && !lib.config['extension_祖安武将_exwallpaper']) return false;
                            return (player == game.me && event.card && event.card.name);
                        }
                    },
                    content: function () {
                        'step 0'
                        //ui.background.style.backgroundImage=lib.config.standardbackground;
                        if ((parseFloat(lib.config['extension_祖安武将_wallpaper']) != '1' || (lib.config['extension_祖安武将_exwallpaper'] && lib.config.zuanexwallpaper == 'on')) && parseFloat(lib.config['extension_祖安武将_isPC']) != '0') {
                            if (trigger.card.name == 'shandian') game.delay(1);
                            if (trigger.card.name == 'huoshan') game.delay(2.5);
                            if (trigger.card.name == 'hongshui') game.delay(2.5);
                            if (trigger.card.name == 'fulei') game.delay(1);
                        }
                        // ---------------------------------------动态壁纸刷新
                        'step 1'
                        game.broadcastAll() + ui.background.setBackgroundImage(lib.config.zuanbackground);
                        // ---------------------------------------动态壁纸刷新
                    },
                }
                lib.skill._newBackgroundAtart = {
                    trigger: {
                        global: ['gameDrawAfter'],
                        player: "enterGame",
                    },
                    direct: true,
                    priority: 120,
                    filter: function (event, player) {
                        if (parseFloat(lib.config['extension_祖安武将_wallpaper']) == '1' && !lib.config['extension_祖安武将_exwallpaper']) return false;
                        return player == game.me;
                    },
                    content: function () {
                        'step 0'
                        var off = lib.config['extension_祖安武将_helasisy'];
                        if (!off) {
                            game.delay(2.5);
                        }
                        // ---------------------------------------壁纸栏------------------------------------------//
                        'step 1'
                        //ui.background.style.backgroundImage=lib.config.standardbackground;
                        // ---------------------------------------动态壁纸刷新
                        'step 2'
                        // ---------------------------------------动态背景·选定------------------------------------------//
                        var backnum = parseFloat(lib.config['extension_祖安武将_wallpaper']);
                        lib.config.zuanchoose = 'none';
                        if (backnum == '8') {
                            // ---------------------------------------梦幻壁纸
                            event.pack = 'menghuan';
                            event.list = [];
                            for (var i = 1; i < 98; i++) {
                                event.list.push(i);
                            }
                            lib.config.zuanchoose = event.list.randomGet();
                            // ---------------------------------------壁纸结束
                        }
                        if (backnum == '12') {
                            // ---------------------------------------羊皮画卷
                            event.pack = 'yangpi';
                            event.list = [];
                            for (var i = 1; i < 16; i++) {
                                event.list.push(i);
                            }
                            lib.config.zuanchoose = event.list.randomGet();
                            // ---------------------------------------壁纸结束
                        }
                        if (backnum == '13') {
                            // ---------------------------------------OL背景
                            event.pack = 'ol';
                            event.list = [];
                            for (var i = 1; i < 26; i++) {
                                event.list.push(i);
                            }
                            lib.config.zuanchoose = event.list.randomGet();
                            // ---------------------------------------壁纸结束
                        }
                        if (backnum == '14') {
                            // ---------------------------------------决战京城
                            event.pack = 'juezhan';
                            event.list = [];
                            for (var i = 1; i < 17; i++) {
                                event.list.push(i);
                            }
                            lib.config.zuanchoose = event.list.randomGet();
                            // ---------------------------------------壁纸结束
                        }
                        lib.config.zuanbackground = "extension/祖安武将/wallpaper/background/" + event.pack + "/" + lib.config.zuanchoose + ".jpg";
                        if (lib.config['extension_祖安武将_exwallpaper']) {
                            if (lib.config.mode == 'boss') {
                                var gui = ['boss_hundun', 'boss_qiongqi', 'boss_taotie', 'boss_taowu', 'boss_xiangliu', 'boss_zhuyan', 'boss_bifang', 'boss_yingzhao', 'boss_nianshou'];
                                var god = ['boss_lvbu1', 'boss_lvbu2', 'boss_lvbu3', 'boss_caocao', 'boss_guojia', 'boss_zhangchunhua', 'boss_zhenji', 'boss_liubei', 'boss_zhugeliang', 'boss_huangyueying', 'boss_pangtong', 'boss_zhouyu', 'boss_caiwenji', 'boss_zhangjiao', 'boss_zuoci', 'boss_diaochan', 'boss_huatuo', 'boss_dongzhuo', 'boss_sunce'];
                                for (i = 0; i < game.players.length; i++) {
                                    game.log(game.players[i], game.players[i].identity);
                                    if (game.players[i].identity == 'zhu') {
                                        if (gui.includes(game.players[i].name)) {
                                            lib.config.zuanboss = "gui";
                                        }
                                        if (god.includes(game.players[i].name)) {
                                            lib.config.zuanboss = "god";
                                        }
                                    }
                                }
                                lib.config.zuanchoose = 'boss';
                                lib.config.zuanbackground = "extension/祖安武将/wallpaper/boss/" + lib.config.zuanboss + ".jpg";
                            }
                            if (lib.config.mode == 'chess' || lib.config.mode == 'tafang' || lib.config.mode == 'stone') {
                                lib.config.zuanchoose = 'chess';
                                lib.config.zuanbackground = "extension/祖安武将/wallpaper/chess/chess.jpg";
                            }
                            if (lib.config.mode == 'single') {
                                lib.config.zuanchoose = 'versus';
                                lib.config.zuanbackground = "extension/祖安武将/wallpaper/versus/versus.jpg";
                            }
                            if (lib.config.mode == 'versus') {
                                lib.config.zuanchoose = 'versus';
                                lib.config.zuanbackground = "extension/祖安武将/wallpaper/versus/versus2.jpg";
                            }
                        }
                        if (lib.config.zuanchoose != 'none') game.broadcastAll() + ui.background.setBackgroundImage(lib.config.zuanbackground);
                        // ---------------------------------------动态壁纸刷新
                    },
                }
                lib.skill._zuanboss = {
                    trigger: {
                        player: ['dieBegin'],
                    },
                    direct: true,
                    priority: 15,
                    filter: function (event, player) {
                        if (lib.config['extension_祖安武将_exwallpaper']) {
                            return (lib.config.mode == 'boss' && player.identity == 'zhu');
                        }
                    },
                    content: function () {
                        'step 0'
                        //ui.background.style.backgroundImage=lib.config.standardbackground;
                        if (lib.config.zuanboss != 'god' && lib.config.zuanboss != 'gui' && parseFloat(lib.config.zuanboss) < 3) lib.config.zuanboss++;
                        'step 1'
                        lib.config.zuanbackground = "extension/祖安武将/wallpaper/boss/" + lib.config.zuanboss + ".jpg";
                        // ---------------------------------------动态壁纸刷新
                        'step 2'
                        game.broadcastAll() + ui.background.setBackgroundImage(lib.config.zuanbackground);
                        // ---------------------------------------动态壁纸刷新
                    },
                }
            }
            // ---------------------------------------祖安对话------------------------------------------//   
            if (parseFloat(lib.config['extension_祖安武将_zuan']) != '1') {
                // ---------------------------------------回血播报------------------------------------------//   
                lib.skill._recoversay = {
                    trigger: {
                        global: "recoverEnd",
                    },
                    filter: function (event, player) {
                        return true;
                    },
                    forced: true,
                    silent: true,
                    content: function () {
                        "step 0"
                        var say = 0;
                        if (get.attitude(player, trigger.player) > 0) {
                            if (trigger.player == player) {
                                if (trigger.player.hp <= 1 || trigger.num >= 2) {
                                    if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                        var chat = ['好险吖O.O', '呼呼..还好T.T', 'TwT', '耶QvQ', '好耶~', '太棒啦！OvO'].randomGet()
                                    } else {
                                        var chat = ['快哉！快哉！', '岂不美哉？', '赞啊~赞啊~', '先吃先吃！', '爽啊', '真香~唉', '好险...还好没死', '大难不死必有后福', '濒死挣扎一番！', '我还没那么容易死！', '不屈', '桃一下'].randomGet()
                                    }
                                    var say = 1;
                                } else {
                                    if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                        var chat = ['棒棒哒~', '*v*回来啦', '开心~', 'OvO', '好耶', '嘿嘿^w^'].randomGet()
                                    } else {
                                        var chat = ['干饭干饭~', '真香', '恢复一下元气。', '养精蓄锐', '舒服了！', '桃一下', '死不了~', '就这？', '九折？'].randomGet()
                                    }
                                    var say = 1;
                                }
                            } else if (parseFloat(lib.config['extension_祖安武将_zuan']) == '3') {
                                if (trigger.player.hp <= 1 || trigger.num >= 2) {
                                    if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                        var chat = ['哇@v@好厉害~', '耶~好棒好棒！', 'QuQ哈哈'].randomGet()
                                    } else {
                                        var chat = ['八月正午的阳光都没你耀眼', '岂不美哉？', '这个彬彬就是逊啦~', '极限回血，强啊', '我们三个真是太强了', '我们队友是杀不死的哦！', 'Nice'].randomGet()
                                    }
                                    var say = 1;
                                } else {
                                    if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                        var chat = ['欧耶~', '（^v^）', '0v0仙女表扬~', '了不起！', '哇~', 'wow'].randomGet()
                                    } else {
                                        var chat = ['滴滴清纯的蒸馏水', '岂不美哉？', 'That’s good♂', '我们队友真强', '哈哈对面是不是输不起', '来来来，砍我们', '高，实在是高'].randomGet()
                                    }
                                    var say = 1;
                                }
                            }
                        } else if (parseFloat(lib.config['extension_祖安武将_zuan']) == '3' && trigger.player != player) {
                            if (trigger.player.hp <= 1 || trigger.num >= 2) {
                                if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                    var chat = ['<_<这都可以..', '（V_V）可恶~', '哎...', '可惜啦。。', '#吐血#吐血'].randomGet()
                                } else {
                                    var chat = ['这个彬彬真的太逊了！', '靠，狗货', '你给凉企氪金了？', '这老不死的。', '狗屎。。', '这。。'].randomGet()
                                }
                                var say = 1;
                            } else {
                                if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                    var chat = ['>_>啊这..', '不好..~_~', '哎.', '可惜x_x', '#吐血'].randomGet()
                                } else {
                                    var chat = ['我从未见过，有如此厚颜无耻之人！', '一只王八', '一只兲', '好烦，对面老是回血', '没事，很快把他们打到残血', '就不信你们还能再回？', '切！', '靠，有桃'].randomGet()
                                }
                                var say = 1;
                            }
                        }
                        if (Math.random() * 100 > parseFloat(lib.config['extension_祖安武将_ransay'])) var say = 0;
                        if (say == 1) {
                            player.say(chat);
                        }
                    },
                }
                // ---------------------------------------受伤播报------------------------------------------//   
                lib.skill._damagesay = {
                    trigger: {
                        global: ["damageEnd", "loseHpEnd"],
                    },
                    filter: function (event, player) {
                        return true;
                    },
                    forced: true,
                    silent: true,
                    content: function () {
                        "step 0"
                        var say = 0;
                        if (get.attitude(player, trigger.player) > 0) {
                            if (trigger.player == player) {
                                if (trigger.player.hp <= 1 || trigger.num >= 2) {
                                    if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                        var chat = ['呜呜..快死了', 'QAQ疼疼', 'TwT哭哭', '放过我叭...', '哭哭~不行了', '(;w;)哇~'].randomGet()
                                    } else {
                                        var chat = ['阿伟，我面包还你', '阿伟，阿伟，你干嘛！', '杰哥~不要啦~', '饼将军救我...', '54320', '痛啊', '我一定会回来的！！！', '我还能挺一会。。', '快死啦~快死啦~', '好痛'].randomGet()
                                    }
                                    var say = 1;
                                } else {
                                    if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                        var chat = ['>_<讨厌..', '疼疼', '55555', '讨厌你..', '#生气', '不要不要', 'T_T', 'TwT', '不喜欢你O_O', '可怕~'].randomGet()
                                    } else {
                                        var chat = ['你只王八', '你只兲', '小几把还挺会玩', '来来来，继续？', '我血厚着呢。', '继续砍我！来！！', '哎哟，不错哟', '这点伤痛算得了什么~', 'Tnnd，跟我玩音的是吧！', '焯！'].randomGet()
                                    }
                                    var say = 1;
                                }
                            } else if (parseFloat(lib.config['extension_祖安武将_zuan']) == '3') {
                                if (trigger.player.hp <= 1 || trigger.num >= 2) {
                                    if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                        var chat = ['>_<..心疼', '555...别死啊TwT', '好可怕啊XwX', '不要啊TwT', '放过TA可以嘛QwQ', '别打TA呀QwQ', '可怜~~~'].randomGet()
                                    } else {
                                        var chat = ['吔屎啦，梁非凡~', '年轻人不要太气盛！', '是个狼灭', '是个狼人', '噢...心疼', '坚持住啊~~~', '挺住！！', '对面过分了！', '药丸药丸', '狗屎', '顶得住吗？'].randomGet()
                                    }
                                    var say = 1;
                                } else {
                                    if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                        var chat = ['>_<心疼', '疼不疼~QwQ', '不要！O_O', '不~X^X', '不要这样~', '别打TA呀。。'].randomGet()
                                    } else {
                                        var chat = ['吔屎啦，梁非凡~', '年轻人不要太气盛！', '你是来找茬是吧', 'What’s up', 'wtf', '我会替TA报仇的！', '难过QAQ', '我有桃放心', '您妈买菜必涨价。', '小心被集火哦', '不哭不哭'].randomGet()
                                    }
                                    var say = 1;
                                }
                            }
                        } else if (parseFloat(lib.config['extension_祖安武将_zuan']) == '3' && trigger.player != player) {
                            if (trigger.player.hp <= 1 || trigger.num >= 2) {
                                if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                    var chat = ['>_<哇，不忍心看下去耶', '好棒好棒', '好暴力吖QvQ', '太残忍啦~QvQ', 'O_O这么厉害'].randomGet()
                                } else {
                                    var chat = ['不气盛叫年轻人吗？', '我的很大♂，你忍一下~', '华强，爱华强！', '另外你说的，这瓜要是生的你自己吞进去啊', '你瓜没拿', '吸铁石', '杀爆TA！', '谁来补最后一刀？', '加油，我们能赢', '对面的你们药丸', '搞TA！', '高，实在是高！', '快死了快死了！爽', '直接来..吧！'].randomGet()
                                }
                                var say = 1;
                            } else {
                                if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                    var chat = ['对面疼不疼？>v<', '好耶好耶', 'QvQ', '耶QvQ', '欺负TA欺负TA~'].randomGet()
                                } else {
                                    var chat = ['年轻人不要太年轻！', '不气盛叫年轻人吗', '我的很大♂，你忍一下~', '另外你说的，这瓜要是生的你自己吞进去啊', '吸铁石', '大快人心！', '砍TA', '干得漂亮', '可以可以', '继续继续', '痛快！'].randomGet()
                                }
                                var say = 1;
                            }
                        }
                        if (Math.random() * 100 > parseFloat(lib.config['extension_祖安武将_ransay'])) var say = 0;
                        if (say == 1) {
                            player.say(chat);
                        }
                    },
                }
                // ---------------------------------------全场死亡播报------------------------------------------//   
                lib.skill._diesay = {
                    trigger: {
                        global: "die",
                    },
                    silent: true,
                    silent: true,
                    frequent: true,
                    filter: function (event) {
                        return (parseFloat(lib.config['extension_祖安武将_zuan']) == '3');
                    },
                    content: function () {
                        if (get.attitude(player, trigger.player) > 0) {
                            if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                var chat = ['呜呜呜呜呜TTwTT', '别走啊...XwX', '我的队友。。。V^V', '桑心透了Q_Q', '#擦眼泪', '#哭#哭#哭', '怎么可以这样？！Q^Q'].randomGet()
                            } else {
                                var chat = ['是不是说，没有做完的梦最痛~', '在一起叫梦，分开了叫痛', '就算这次做错也只是怕错过', '如果早知道，我就不会去他那里了..', '都是你害的啦~', '死了啦，拜托~', '外卖杀人啊', '杀人啦~杀人啦~', '章鱼哥~章鱼哥~', '萨日朗！萨日朗！！', '其实我是怕你吃太多桃噎着。', '小几把还挺会玩。', '玩游戏之前能不能带点脑子', '彻底玩蛋了...', '怎么没有投翔按钮？', '完蛋。。。', '下局再来', '十八年后。。。又是一条好汉', '你却让我输得，这么彻底~', '我好不容易心动一次', '不要停下来啊啊啊啊'].randomGet()
                            }
                            var say = 1;
                        } else {
                            if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                var chat = ['对面好可怜QvQ', '献上花环QvQ', '我会缅怀您的！嘻嘻', '再见啦~#告别', '安息叭。。', '哎呀QvQ一不小心就886'].randomGet()
                            } else {
                                var chat = ['小盆友你是否有很多问号？', '分开了叫痛~', '我晒干了沉默~', '这个彬彬就是逊啦', '这个彬彬真的太逊了~', '我只希望你能够好好用功读书', '来来来，继续口嗨啊？！#阴险', '我们的游戏正在蒸蒸日上哦~#微笑', '对面投翔吧！！！', '对面没了，我们快赢了', '对面好菜鸡啊，快输了吧？！', '菜，哈哈哈哈', 'TA是谁啊？', '让TA自己说去', '我滴任务...完成辣！', '我的任务..完成啦！', '啊哈哈哈哈！'].randomGet()
                            }
                            var say = 1;
                        }
                        if (Math.random() * 100 > parseFloat(lib.config['extension_祖安武将_ransay'])) var say = 0;
                        if (say == 1) {
                            player.say(chat);
                        }
                    },
                }
                // ---------------------------------------全场被指定播报------------------------------------------//   
                lib.skill._tosay = {
                    trigger: {
                        global: "useCardToPlayered",
                    },
                    silent: true,
                    silent: true,
                    frequent: true,
                    filter: function (event) {
                        return true;
                    },
                    content: function () {
                        var say = 0;
                        if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {

                            if (trigger.target == player) {
                                if (get.attitude(player, trigger.player) > 0) {
                                    if (get.name(trigger.card) == 'wu') {
                                        var chat = ['无'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'sha') {
                                        var chat = ['别打我~是朋友呀QAQ', '不不不，不是我~QwQ', '天哪！我是你的队友~OoO', '为什么要这么做吖？'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guohe') {
                                        var chat = ['没搞懂耶~', '你想干什么Q_Q', '不要啦QvQ', '再见啦我的牌@v@'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'shunshou') {
                                        var chat = ['没搞懂耶~', '你想干什么Q_Q', '不要啦QvQ', '你想要就给你好啦~@A@'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'juedou') {
                                        var chat = ['没搞懂耶~', '你想干什么Q_Q', '不要啦QvQ', '对我温和点呀', '轻点，疼>w<'].randomGet()
                                        var say = 1;
                                    }
                                } else {
                                    if (get.name(trigger.card) == 'sha') {
                                        var chat = ['哼U_U，你过分', 'U^U欺负弱小', '别打头555Q^Q', '讨厌你~', '不想理你了~Q^Q', '我有闪的~O^O', '我不怕你！Q^Q', '哼！V_V'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guohe') {
                                        var chat = ['不要拆我QaQ', '你想干嘛QwQ', '你好过分！X^X', '讨厌你U^U'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'shunshou') {
                                        var chat = ['不要顺我QaQ', '你想干嘛QwQ', '你好过分！X^X', '讨厌你U^U', '给你就是了，哼U^U'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'juedou') {
                                        var chat = ['你不让着女生嘛Q。Q', '你欺负弱小！0^0', '欺负女生。。呜呜', '讨厌死你了'].randomGet()
                                        var say = 1;
                                    }
                                }
                            } else if (parseFloat(lib.config['extension_祖安武将_zuan']) == '3') {
                                if (get.attitude(player, trigger.player) > 0) {
                                    if (get.name(trigger.card) == 'sha') {
                                        var chat = ['你别欺负TA！#生气', '#生气#生气', '过分U^U', '哼。。。', '不高兴。。U_U', '你觉得这样好嘛U_U'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guohe') {
                                        var chat = ['过分~O_o', '不要拆我队友555', '不要~', '哇，过分耶~O_o', 'O^o', '不开森。。'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'shunshou') {
                                        var chat = ['过分~O_o', '不要偷我队友555', '不要~', '哇，过分耶~O_o', 'O^o', '不开森。。'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'juedou') {
                                        var chat = ['队友加油！O^o打死TA！', '队友加油！O^o', '你打不过我队友哒Q^Q'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'huogong') {
                                        var chat = ['不要玩火>w<', '消防蜀黍快来！！！', '不要中吖不要中吖'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'jiedao') {
                                        var chat = ['Owo', 'X_x'].randomGet()
                                        var say = 1;
                                    }
                                } else {
                                    if (get.name(trigger.card) == 'sha') {
                                        var chat = ['哇^_^', '打TA打TA！^_^', '队友加油！QvQ', '我队友最腻害了！#Happy'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guohe') {
                                        var chat = ['哦耶', '对面要没牌了耶~QvQ', '嘿嘿，好爽^A^'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'shunshou') {
                                        var chat = ['哦耶', '对面要没牌了耶~QvQ', '嘿嘿，好爽^A^'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'juedou') {
                                        var chat = ['哇^_^', '打TA打TA！^_^', '队友加油！QvQ', '我队友最腻害了！#Happy', 'QvQ吃瓜ing'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'huogong') {
                                        var chat = ['烧烧烧~', '哇GvG', '烫死TA！...#偷笑#偷笑'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'jiedao') {
                                        var chat = ['没收TA的武器！Q.Q', '拿走拿走！^v^', '缴枪不杀！^v^'].randomGet()
                                        var say = 1;
                                    }
                                }
                            }



                        } else {
                            if (trigger.target == player) {
                                if (get.attitude(player, trigger.player) > 0) {
                                    if (get.name(trigger.card) == 'wu') {
                                        var chat = ['无'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'sha') {
                                        var chat = ['吔屎啦你~', '我面包还你~', '阿伟，你干嘛？', '干嘛~呃哼哼~', '你还真杀我？！', '小几把还挺会玩。', '昏君啊~', '你搞错人啦', '会不会玩...', '屑司令..你不会相信王大队长..胡说八道吧？', '王大队张..你又要陷害我是吧？', '谁又要陷害我~？'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guohe') {
                                        var chat = ['随便拿~随便拿', '来来来，这些都可以拿', '呃，这...', '你想干嘛？', '反正我也不要了...'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'shunshou') {
                                        var chat = ['随便拿~随便拿', '来来来，这些都可以拿', '呃，这...', '你想干嘛？', '拿走拿走别客气~', '零元购'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'juedou') {
                                        var chat = ['我面包还你~', '阿伟，你干嘛？', '干嘛~呃哼哼~', '同学之间就不要打架斗殴了吧？', '咱们来摔♂跤吧', '你决斗我干嘛', '你搞错人了。。', '屑司令..你不会相信王大队长..胡说八道吧？', '王大队张..你又要陷害我是吧？', '谁又要陷害我~？'].randomGet()
                                        var say = 1;
                                    }
                                } else {
                                    if (get.name(trigger.card) == 'sha') {
                                        var chat = ['诸葛村夫，你敢！', '我赌你断杀。', '我会复仇的！', '杀我对你有什么好处', '来来来，继续？', '你当我没闪？', '怕你？', '九折？'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guohe') {
                                        var chat = ['辽宁拆迁队长？', '过分了啊', '你好贱', '反正我也不需要~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'shunshou') {
                                        var chat = ['辽宁拆迁队长？', '过分了啊', '你好贱', '反正我也不需要~', '零元购是吧？'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'juedou') {
                                        var chat = ['来我房里，有好康的', '身材不错哦~蛮结实的啊', 'Solo就Solo', '我手牌有杀我怕你？', '来！你别怂！', '怕你不成？'].randomGet()
                                        var say = 1;
                                    }
                                }
                            } else if (parseFloat(lib.config['extension_祖安武将_zuan']) == '3') {
                                if (get.attitude(player, trigger.player) > 0) {
                                    if (get.name(trigger.card) == 'sha') {
                                        var chat = ['你个禽兽你住手！', '有什么事冲我来！', '敢弄我队友？你完蛋了', '不，别。', '过分', 'Oh~No~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guohe') {
                                        var chat = ['你这算什么好汉？', '直接杀啊，拆啥', '很烦这张牌诶。', '过河拆桥？追！', '希望拆不到好牌', '你能拆啥。。'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'shunshou') {
                                        var chat = ['你这算什么好汉？', '直接杀啊，偷牌干什么啥', '很烦这张牌诶。', '给你毒你要不要', '白嫖党滚粗。', '赌你摸到一张毒'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'juedou') {
                                        var chat = ['你打不过我队友的', '就你这实力还想Solo？', '看我队友反杀你'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'huogong') {
                                        var chat = ['小心东风不与周郎便哦！', '等着玩火烧身吧', '放弃吧，你没有这张花色的'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'jiedao') {
                                        var chat = ['祖传屠龙宝刀要被借走了..', '兄弟，刀呢'].randomGet()
                                        var say = 1;
                                    }
                                } else {
                                    if (get.name(trigger.card) == 'sha') {
                                        var chat = ['做得好', '待会一人给TA一刀', '请继续', '淦就完事了'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guohe') {
                                        var chat = ['哟呵，好爽', '对面要没牌了哦~', '人不贱则不立'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'shunshou') {
                                        var chat = ['呵呵，好爽', '对面被摸空了哈哈哈', '人不贱则不立'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'juedou') {
                                        var chat = ['吃瓜ing', '来看掐架了', '现场武术指导，我方必胜', '我们手牌多，不怕'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'huogong') {
                                        var chat = ['烧死TA！', '借你东风。', '对面怕火'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'jiedao') {
                                        var chat = ['刀TA', '干得漂亮', '你刀没了！'].randomGet()
                                        var say = 1;
                                    }
                                }
                            }

                        }

                        if (Math.random() * 100 > parseFloat(lib.config['extension_祖安武将_ransay'])) var say = 0;
                        if (say == 1) {
                            player.say(chat);
                        }
                    },
                }
                // ---------------------------------------全场用卡播报------------------------------------------//   
                lib.skill._fromsay = {
                    trigger: {
                        global: "useCard",
                    },
                    silent: true,
                    frequent: true,
                    filter: function (event) {
                        return true;
                    },
                    content: function () {
                        var say = 0;
                        if (parseFloat(lib.config['extension_祖安武将_zuan']) == '3') {
                            if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {


                                if (get.attitude(player, trigger.player) > 0) {
                                    if (get.name(trigger.card) == 'tao') {
                                        var chat = ['桃子桃子QvQ', '我也想吃桃子~~~', '可可爱爱的桃子诶~', '耶QvQ', '^v^好吃嘛？'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'jiu') {
                                        var chat = ['我想要香槟O.o', '干杯嘛？', '我也醉啦~~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wuxie') {
                                        var chat = ['仙女无懈！0.0', '我拒绝X.X', '这就对了嘛~~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'taoyuan') {
                                        var chat = ['蟹蟹', '开心（QvQ）', '开开心心', '开森~~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wugu') {
                                        var chat = ['蟹蟹', '开心（QvQ）', '开开心心', '开森~~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'nanman') {
                                        var chat = ['能打到我嘛？Q,Q', '我没杀耶..Q,Q', '我有杀哦@v@', '我...！！！'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wanjian') {
                                        var chat = ['能打到我嘛？Q,Q', '我没闪耶..Q,Q', '我有闪哦@v@', '我...！！！'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wuzhong') {
                                        var chat = ['哦耶！', '好耶！', '摸摸~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'tiesuo') {
                                        var chat = ['连起来~', '绑住绑住~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip1') {
                                        var chat = ['$v$有武器辣~', '欧耶，是武器！', '打打打~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip2') {
                                        var chat = ['是盾牌嘛？', '是护盾耶！', '哇哦~QvQ'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip4') {
                                        var chat = ['哦，这是马O.o', '是马耶~o.O', '有马啦，杀杀杀~Q.Q'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip3') {
                                        var chat = ['哦，这是马O.o', '是马耶~o.O', '有马啦，杀杀杀~Q.Q'].randomGet()
                                        var say = 1;
                                    }
                                } else {
                                    if (get.name(trigger.card) == 'tao') {
                                        var chat = ['哇，是桃U_U', '又是桃耶。。讨厌', '为什么我没有。。Q^Q'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'jiu') {
                                        var chat = ['TA醉了TA醉了>_<', '阔怕。。', '不准喝酒！>^<'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wuxie') {
                                        var chat = ['不要无懈吖！', '为什么拒绝？·.·', '哼'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'taoyuan') {
                                        var chat = ['白嫖快乐！！>v<', '欧耶', '回血回血~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wugu') {
                                        var chat = ['白嫖快乐！！>v<', '欧耶', '白嫖~白嫖~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'nanman') {
                                        var chat = ['别别别', '我的上帝呀TwT', '我怕怕QwQ', '不要酱紫啦~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wanjian') {
                                        var chat = ['别别别', '我的上帝呀TwT', '我怕怕QwQ', '不要酱紫啦~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wuzhong') {
                                        var chat = ['对面手气太好了。。QwQ', '好多无中生有啊www', '对面好多牌牌'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'tiesuo') {
                                        var chat = ['不要连我~', '不不不T_T'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip1') {
                                        var chat = ['U_U欧，又是武器~', '快跑，TA有武器！', 'Oh不Q^Q'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip2') {
                                        var chat = ['不要这个盾牌~', '穿好多衣服T^T', 'x^X呃。。'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip4') {
                                        var chat = ['对面好多马呀', '我不喜欢这些马马了。。', '小马要跑不动啦！！！UwU'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip3') {
                                        var chat = ['对面好多马呀', '我不喜欢这些马马了。。', '小马要跑不动啦！！！UwU'].randomGet()
                                        var say = 1;
                                    }
                                }

                            } else {


                                if (get.attitude(player, trigger.player) > 0) {
                                    if (get.name(trigger.card) == 'tao') {
                                        var chat = ['辛得诸君出手相救！', '最爱吃桃子', 'Nice!', '桃子，桃子！', '舒服了！', '这鸡汤..十分滴珍贵', '行..我喝..喝！', '啧啧..这喝汤..多是一件美事啊', '不咸不淡，味道真是好极了！', '三点几啦，饮茶先啦！'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'jiu') {
                                        var chat = ['哈哈你们完了', '斗酒十千！', '喝车不开酒', '酒逢知己千杯少！'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wuxie') {
                                        var chat = ['无懈！', '你休想！', '不，你不想', '你想都别想', '这就对了'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'taoyuan') {
                                        var chat = ['谢谢老板！', '多多益善', '蟠桃会赴会了~'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wugu') {
                                        var chat = ['谢谢老板！', '多多益善！', '我拿走了', '谢谢兄弟，滑稽', '喝碗鸡汤算得了什么呀'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'nanman') {
                                        var chat = ['别误伤队友了哦。', '男人♂入侵', '我没杀..', '我有杀哦', '我也...'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wanjian') {
                                        var chat = ['别误伤队友了哦。', '别乱放箭啊', '我有闪', '我没...', '我没闪', '我也...'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wuzhong') {
                                        var chat = ['你好，我是你的朋友。', '哟吼', '摸摸摸', '多好啊'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'tiesuo') {
                                        var chat = ['连TA', '捆绑play', '绑住TA！'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'zhuge') {
                                        var chat = ['扫六合席卷八荒说的难道就是宁？', '杀遍全场了', '哈哈，AK出来了'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guding') {
                                        var chat = ['就问你怕不怕？', '捅对面菊花~', '对面，保护好你们的菊花'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'tengjia') {
                                        var chat = ['小心点，别沾上火', '还行'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'bagua') {
                                        var chat = ['这是进口的八卦阵！', '刚去学了太极？'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip4') {
                                        var chat = ['Nice，是减一马', '哈哈哈，又是马', '有马啦，杀杀杀！'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip3') {
                                        var chat = ['Good，是加一马', '哈哈哈，又是马', '你砍不到我队友啦~'].randomGet()
                                        var say = 1;
                                    }
                                } else {
                                    if (get.name(trigger.card) == 'tao') {
                                        var chat = ['哟，居然有桃', '我猴子偷桃~', '哎哟'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'jiu') {
                                        var chat = ['啊，别', '我好害怕', '还怕', '酒驾拘捕', '别动♂蕉警来查酒驾了'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wuxie') {
                                        var chat = ['无懈？', '不，你不想！', '哎哟，有脾气了'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'taoyuan') {
                                        var chat = ['白嫖快乐！！', 'YE', '拿走了不谢'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wugu') {
                                        var chat = ['白嫖快乐！！', '白嫖党的胜利', '鸡汤来咯！', '你要是不喝...说明你真下毒了'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'nanman') {
                                        var chat = ['我吐了', '好恶心', '爷好怕~', '我有杀', '不怕'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wanjian') {
                                        var chat = ['你是大嘴附体？！', '爷好怕', '我有闪呵呵', '没用的', '我有闪'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'wuzhong') {
                                        var chat = ['狗托？', '我玩十年了不比你强？', '祝你摸到一手烂牌'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'tiesuo') {
                                        var chat = ['别连我~', '你好邪恶', '切，难道你有火攻吗'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'zhuge') {
                                        var chat = ['糟了AK出现了！', '闪不太够啊', '赶紧拆掉TA'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'guding') {
                                        var chat = ['是大名鼎鼎的菊花刀', '哈哈，我有牌不怕'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'tengjia') {
                                        var chat = ['穿寿衣是想来送人头？', '疼甲你也穿呵呵', '我有火攻哦'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.name(trigger.card) == 'bagua') {
                                        var chat = ['国产八卦阵来了。', '劣质的没用', '赶紧拆掉'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip4') {
                                        var chat = ['好烦，又是减一马', '这马怎么这么多', '猎马弓在哪里？'].randomGet()
                                        var say = 1;
                                    }
                                    if (get.subtype(trigger.card) == 'equip3') {
                                        var chat = ['好烦，又是加一马', '这马怎么这么多', '猎马弓在哪里？'].randomGet()
                                        var say = 1;
                                    }
                                }

                            }
                        }
                        if (Math.random() * 100 > parseFloat(lib.config['extension_祖安武将_ransay'])) var say = 0;
                        if (say == 1) {
                            player.say(chat);
                        }
                    },
                }
                lib.skill._selfsay = {
                    trigger: {
                        player: "useCard",
                    },
                    silent: true,
                    forced: true,
                    filter: function (event) {
                        return true;
                    },
                    content: function () {
                        var say = 0;
                        if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {


                            if (get.name(trigger.card) == 'sha') {
                                var chat = ['@v@杀一下~', '打你一下~', '小拳拳捶你胸~U^U', '打屎你！Q^Q', '讨厌你讨厌你', '捶你锤你', 'Q^Q沙屎你个臭撒币~'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'shan') {
                                var chat = ['跑跑', '闪闪~', '躲躲~', '886QvQ', '打不到我噢#高兴', '哦耶', '@v@闪一下~'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'juedou') {
                                var chat = ['@v@打一下~', '打你打你', '捶你胸~O^U', '打屎你！Q^Q', '讨厌你讨厌你', '捶你锤你', 'Q^Q打屎你个臭撒币~'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'guohe') {
                                var chat = ['拆啦拆啦', '别怪我QvQ', '你不需要叭？', '再见啦牌牌~', '牌牌不喜欢你'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'wuxie') {
                                var chat = ['无懈一下下@v@', '不要拒绝我嘛#卖萌', '不许你这样子做~', '不行不行！', '不可以酱紫~'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'nanman') {
                                var chat = ['入侵啦', '南蛮入侵~QoQ', '好恐怖耶@v@', 'QvQ打屎你们HAHAHA'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'wanjian') {
                                var chat = ['放箭啦', '万箭齐发~QoQ', '好恐怖耶@v@', 'QvQ打屎你们HAHAHA'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'tao') {
                                var chat = ['吃桃桃~$v$', '好吃好吃$v$', '好幸福~', '好香吖', 'emmmmm好柒！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'jiedao') {
                                var chat = ['借一下好嘛QwQ', '可以给我嘛QwQ？', '不要拿着它嘛~'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'shunshou') {
                                var chat = ['我拿走啦~', '别怪我QvQ', '你不需要叭？', '再见啦牌牌~', '牌牌不喜欢你'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'taoyuan') {
                                var chat = ['大家都来吃桃子叭~QwQ', '大家一起吖QaQ', '一起Happy嘛？$v$'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'wugu') {
                                var chat = ['大家都来拿牌叭~QwQ', '大家一起吖QaQ', '一起Happy嘛？$v$'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'wuzhong') {
                                var chat = ['拿两张牌！$v$', '无中生友？朋友在哪里？@v@', '摸摸摸！$v$', '我听说...'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'jiu') {
                                var chat = ['稍微喝一下没问题叭？', '就一口，就一口@v@', '啊~醉了。。。', '这是香槟！@v@', '好喝>v<'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'huogong') {
                                var chat = ['烧你！！V-V', '火焰攻击~', '烧屎你~OvO'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'tiesuo') {
                                var chat = ['连起来叭', '连一下下哈~'].randomGet()
                                var say = 1;
                            }
                            if (get.subtype(trigger.card) == 'equip1') {
                                var chat = ['$v$我有武器辣！', '欧耶，是武器耶！$v$', '我喜欢这个$v$'].randomGet()
                                var say = 1;
                            }
                            if (get.subtype(trigger.card) == 'equip2') {
                                var chat = ['换个衣服··^v^··', '穿个衣服先哈·。·', '别偷看我换衣服噢~'].randomGet()
                                var say = 1;
                            }
                            if (get.subtype(trigger.card) == 'equip4') {
                                var chat = ['哦，是小马$.$', '小马耶~$v$', '小马小马~'].randomGet()
                                var say = 1;
                            }
                            if (get.subtype(trigger.card) == 'equip3') {
                                var chat = ['哦，是小马$.$', '小马耶~$v$', '小马小马~'].randomGet()
                                var say = 1;
                            }

                        } else {


                            if (get.name(trigger.card) == 'sha') {
                                var chat = ['吔屎啦你~', '我TM劈你', '跟我刘华强拼你有这个实力吗？', '哥们你这瓜保熟吗', '杀一下~', '杀！！！', '看我的厉害！', '砍我杀穿你', '不杀你几刀你也不知道爷的厉害', '鲨！', '沙屎你个臭撒币~', 'Tnnd，为什么不喝！', '不喝..不喝我就炸死你！', '都怕死是吧？', '都bei想活着！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'shan') {
                                var chat = ['你TM劈我瓜是吧？', '好我再给你一次机会', '给你机会你不中用啊~', '你TM劈我', '你瓜没拿', '你是故意找茬是吧？', '我闪！', '我躲~', '杀不到~', '累吖累吖', '嘿嘿', '砍不到我~砍不到我~', '我有闪哦', '大伙都不敢吃..说是有人在鸡汤里下了毒', '我..我不打扰，我走了啊~', '嘿咻咻'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'juedou') {
                                var chat = ['诸葛亮下来战书', '我TM跟你拼了', '还能教你，登dua郎哦~', '挑一个', '来我房里，有好康的', '身材不错哦~蛮结实的啊', '来啊，Solo啊', '敢不敢来Solo？', '一挑一！', '咱们来♂摔跤', '单挑，敢不敢？', '来，搞一下♂（坏笑）'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'guohe') {
                                var chat = ['杰哥，这些都可以拿嘛', '拆你的牌！！！', '你别想要', '看你也不需要', '这牌对你没用', '拆了拆了！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'wuxie') {
                                var chat = ['吸铁石。', '秀发，无屑可击~', '哈哈，你休想！！', '你甚至想都别想', '无shit可击~', '无泄可击！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'nanman') {
                                var chat = ['欢迎你们来我家玩', '我家的房子还蛮大♂的', '男人♂入侵！！！', '冲冲冲！', '杀——', '直接来...吧！', 'Tnnd，为什么不喝！', '不喝..不喝我就炸死你们！', '都怕死是吧？', '都bei想活着！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'wanjian') {
                                var chat = ['欢迎你们来我家玩', '我家的房子还蛮大♂的', '全都去死HAHAHA', '大嘴附体！', '放箭！放箭！！', '看我乱杀！', '直接来...吧！', 'Tnnd，为什么不喝！', '不喝..不喝我就炸死你们！', '都怕死是吧？', '都bei想活着！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'tao') {
                                var chat = ['香香的烤面筋，可带劲啦', '吃颗桃子', '好吃', '香♂', '嗯，真香', '我在想Peach..', '这鸡汤..十分滴珍贵', '行..我喝..喝！', '啧啧..这喝汤..多是一件美事啊', '不咸不淡，味道真是好极了！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'jiedao') {
                                var chat = ['借下你的杀猪刀。', '你不是很能刀么？', '可惜下一秒就是我的了'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'shunshou') {
                                var chat = ['杰哥，这些都可以拿嘛', '拿来！', '取你牌来！', '取你的牌！', '呵呵，我拿走了', '可惜下一秒就是我的了'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'taoyuan') {
                                var chat = ['来干饭，来干饭', '来来来，这些都可以拿~', '大家都来吃桃子叭~', '来来大家一起', '一人一口酥'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'wugu') {
                                var chat = ['来来来，这些都可以拿~', '别多拿，别少拿', '发牌了发牌了！', '来来，人人都有', '多少张呢？数一下', '开仓济贫！', '喝碗鸡汤算得了什么呀'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'wuzhong') {
                                var chat = ['无中生友。', '你强个jb。', '摸两个朋友', '摸摸摸！', '我有两个朋友？'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'jiu') {
                                var chat = ['杰哥，酒~', '酒肉穿肠过，佛祖心中留！', '酒过愁肠，化作相思泪', '温酒斩华雄', '煮酒论英雄', '举杯消愁', '对酒当歌，人生几何！', '纯度挺高的', '下次换香槟？', '好喝'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'huogong') {
                                var chat = ['烈火焚天！', '焚城！', '烧你丫的', '让我火上浇油！', '烧死你'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'tiesuo') {
                                var chat = ['就差一把火了！', '把你变成连体婴儿', '要死你们也一起死啊对吧'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'zhuge') {
                                var chat = ['看我杀遍全场！', '看我乱杀！', '杀杀杀', '冲冲冲'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'guding') {
                                var chat = ['菊花残，满地伤...', '小心菊花不保'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'tengjia') {
                                var chat = ['球球您们来烧我~', '其实一点也不疼', '疼甲！', '有火杀嘛', '放箭放箭！南蛮也OK啦~'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'bagua') {
                                var chat = ['杀我！！！', '刚学了太极', '牌堆顶都是红色的哦', '有点八卦', '奇门八甲'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'qilin') {
                                var chat = ['没想到还有这种要求！滑稽', '你的马没了', '你马没了（真的是那个马别误会）', '猎马弓~'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'cixiong') {
                                var chat = ['男女剑！', '人妖剑~', '我来搞一下男女关系'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'fangtian') {
                                var chat = ['以一挑三！！！', '杀！！！', '武神之戟', '奉先附体！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'guanshi') {
                                var chat = ['强杀斧', '命中！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'qinggang') {
                                var chat = ['破甲剑到手', '玄德助我！', '你的防具没用了！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'zhangba') {
                                var chat = ['刷牌机器', '翼德！！！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'renwang') {
                                var chat = ['获得技能 毅重', '黑杀砍我！', '仁王，人中之王'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'zhuque') {
                                var chat = ['藤甲，哪里有藤甲？', '烧烧烧！', '诸葛村夫，你敢？！'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'baiyin') {
                                var chat = ['拆了拆了', '求酒杀~~', '拿走我的。'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'muniu') {
                                var chat = ['什么木流牛马？', '屯牌了兄弟们', '木流牛马，哈哈哈'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'du') {
                                var chat = ['毒死我蒜了。。', '我疯了', '自杀自杀'].randomGet()
                                var say = 1;
                            }
                            if (get.name(trigger.card) == 'jinchan') {
                                var chat = ['拜拜', '溜溜溜', '三十六计，走为上计'].randomGet()
                                var say = 1;
                            }
                            if (get.subtype(trigger.card) == 'equip4') {
                                var chat = ['减一马！', '手够长啦', '顺手牵羊我来啦~', '距离够了！', '攻击马。', '进攻马！'].randomGet()
                                var say = 1;
                            }
                            if (get.subtype(trigger.card) == 'equip3') {
                                var chat = ['加一马！', '砍不到我', '嘿嘿，距离不够！', '防御马。', '防御马！'].randomGet()
                                var say = 1;
                            }

                        }
                        if (Math.random() * 100 > parseFloat(lib.config['extension_祖安武将_ransay'])) var say = 0;
                        if (say == 1) {
                            player.say(chat);
                        }
                    },
                }

                // ---------------------------------------全场开始游戏播报------------------------------------------//   
                lib.skill._startgamesay = {
                    trigger: {
                        player: "enterGame",
                        global: "gameDrawAfter",
                    },
                    silent: true,
                    forced: true,
                    filter: function (event, player) {
                        if (parseFloat(lib.config['extension_祖安武将_zuan']) == '2') {
                            return player == game.me;
                        } else {
                            return true;
                        }
                    },
                    content: function () {
                        var say = 0;
                        if (parseFloat(lib.config['extension_祖安武将_zuan']) != '1') {
                            if (player.identity == 'zhu') {
                                var chat = ['大家直接明了吧！', '这把要好好玩噢', '忠臣别乱来啊~', '辅助我就对了！', '我是主公。', '内奸你别乱来', '大家好好玩', '内奸别跳反。'].randomGet()
                            } else {
                                var chat = ['收到！！', '这把好好玩', '大家配合一下', '懂的懂的', '懂的都懂——', '我明了', '大家好！', '不乱玩不乱玩', 'OK', 'Ojbk', '开了开了', '这把看我乱杀', '别砍我，球球你们', '潜水ing', '打酱油的', '再集火我就托管了啊', '对我友好些，好么？', '多多互相帮助啊', '呵呵..啊哈哈哈哈哈', '鸡汤来啰~'].randomGet()
                            }
                            var ds = new Date();
                            var month = ds.getMonth() + 1;
                            var date = ds.getDate();
                            var year = ds.getFullYear();
                            var birmon = parseFloat(lib.config['extension_祖安武将_birthdaymonth']);
                            var birday = parseFloat(lib.config['extension_祖安武将_birthdaydate']);
                            if (month == birmon && date == birday) {
                                if (player == game.me) {
                                    var chat = ['谢谢大家~', '感动ing', '我要吹蜡烛', '好耶', '今天我生日', '嗯呢', '哈哈好', '今天是我生日捏', '快祝我生日快乐！'].randomGet();
                                } else {
                                    var chat = ['生日快乐', '生日快乐噢', '生日快乐！', '祝你生日快乐~', '祝贺祝贺！', '又大了一岁啊', '来来来，吹蜡烛', '快许个愿！'].randomGet();
                                }
                            }
                            if (lib.config['extension_祖安武将_girlspeak'] && player.sex == 'female') {
                                var chat2 = [' 加油>v<', ' QvQ！', ' QwQ..', ' 我会努力哒！嘻嘻OvO'].randomGet()
                                var chat = chat + chat2;
                            }
                            var say = 1;
                        }
                        if (Math.random() * 100 > parseFloat(lib.config['extension_祖安武将_ransay'])) var say = 0;
                        if (say == 1) {
                            player.say(chat);
                        }
                    },
                }

            }

        }, precontent: function () {
            // ---------------------------------------启动代码·预加载------------------------------------------//


            function resize_window(long, high) {
                // move the window to 0,0 (X,Y)
                window.moveTo(0, 0);
                // resize the window to 800x600
                window.resizeTo(long, high);
            }
            var zuancheckWH = function (width, height) {
                var widther = window.innerWidth / width;
                if (height * widther > window.innerHeight) {
                    return 'width: 100%';
                } else {
                    return 'height: 100%';
                }
            };
            var windows = localStorage.getItem("zuanwindow");
            if (windows == "1") {
                resize_window(720, 480);
            }
            if (windows == "2") {
                resize_window(800, 600);
            }
            if (windows == "3") {
                resize_window(1280, 720);
            }
            if (windows == "4") {
                resize_window(1440, 960);
            }
            if (windows == "5") {
                resize_window(1600, 1200);
            }
            if (windows == "6") {
                resize_window(1920, 1080);
            }
            if (windows == "7") {
                resize_window(1090, 570);
            }
           
            //开始界面
            /*
                            "0":"◈关闭———",
                            "1":"关闭壁纸",
                            "2":"◈多张———",
                            "3":"原画图集",yuanhua,87
                            "5":"羊皮画卷",yangpi,33
                            "6":"◈单张———",
                            "7":"青铜龙纹",qingtong
                            "9":"潭水桃花",taohua
                            "10":"战火硝烟",zhanhuo
                            "11":"深宫殿堂",shengong
                            "12":"SCL联赛",scl
                            "13":"Online",online
                                game.saveConfig('extension_祖安武将_jiemian',items);
                                localStorage.setItem("gamestartjiemian",items);
            */
            var jiemian = localStorage.getItem("gamestartjiemian");
            if (jiemian) {
                if (jiemian == "0") jiemian = "1";
                if (jiemian == "2") jiemian = "3";
                if (jiemian == "6") jiemian = "7";
            } else {
                jiemian = "1";
            }
            if (jiemian != "1") {
                var jiemianopen = 'no';
                if (jiemian == "3") {
                    var numsum = [];
                    for (i = 1; i < 88; i++) {
                        numsum.push(i);
                    }
                    jiemianopen = 'yuanhua/' + numsum.randomGet() + '.png';
                }
                if (jiemian == "4") {
                    var numsum = [];
                    for (i = 1; i < 21; i++) {
                        numsum.push(i);
                    }
                    jiemianopen = 'shihai/' + numsum.randomGet() + '.jpg';
                }
                if (jiemian == "5") {
                    var numsum = [];
                    for (i = 1; i < 34; i++) {
                        numsum.push(i);
                    }
                    jiemianopen = 'yangpi/' + numsum.randomGet() + '.jpg';
                }
                if (jiemian == "7") jiemianopen = 'qingtong.jpg';
                if (jiemian == "9") jiemianopen = 'taohua.jpg';
                if (jiemian == "10") jiemianopen = 'zhanhuo.jpg';
                if (jiemian == "11") jiemianopen = 'shengong.jpg';
                if (jiemian == "12") jiemianopen = 'scl.jpg';
                if (jiemian == "13") jiemianopen = 'online.png';
                //alert(jiemianopen);
                //var zuanwid=game.checkWH(zuanalivegif.width,zuanalivegif.height);
                function movebackgroundbasic() {
                    window.movepaperbasic = ui.create.node('img');
                    movepaperbasic.src = asset + 'extension/祖安武将/wallpaper/startgame/' + jiemianopen;
                    movepaperbasic.style.cssText = 'pointer-events: none;text-align: center;margin: auto;opacity: 1;display: block;position: absolute;background:none;z-index:-2;width: 100%!important;height: 100%!important;left: 0;bottom: 0';
                    document.body.appendChild(movepaperbasic);
                }
                function movebackground(s) {
                    var enlarge = 0.25;
                    window.movepaper = ui.create.node('img');
                    movepaper.src = asset + 'extension/祖安武将/wallpaper/startgame/' + jiemianopen;
                    movepaper.style.cssText = 'pointer-events: none;text-align: center;margin: auto;opacity: ' + (0.8 - s * 0.02) + ';display: block;position: absolute;background:none;z-index:-1;width: ' + (100 + s * enlarge) + '%!important;height: ' + (100 + s * enlarge) + '%!important;left: ' + (-s * enlarge * 0.5) + '%!important;bottom: ' + (-s * enlarge * 0.5) + '%!important';
                    document.body.appendChild(movepaper);
                }
            }
            window.forunderlinefinish = false;
            function forunderlinea(a) {
                if (forunderlinefinish) {
                    backunderline.remove();
                    return;
                } else {
                    underline(a);
                    if (a < 1) {
                        setTimeout(function () {
                            backunderline.remove();
                            forunderlineb(0);
                        }, 200);
                    } else {
                        setTimeout(function () {
                            backunderline.remove();
                            forunderlinea(a - 1);
                        }, 60);
                    }
                }
            }
            function forunderlineb(b) {
                if (forunderlinefinish) {
                    backunderline.remove();
                    return;
                } else {
                    underline(b);
                    if (b > 19) {
                        setTimeout(function () {
                            backunderline.remove();
                            forunderlinea(20);
                        }, 200);
                    } else {
                        setTimeout(function () {
                            backunderline.remove();
                            forunderlineb(b + 1);
                        }, 60);
                    }
                }
            }
            function formovepaper(i) {
                if (formovepaperfinish) {
                    movepaper.remove();
                    return;
                } else {
                    movebackground(i);
                    setTimeout(function () {
                        movepaper.remove();
                        if (i < 40) {
                            formovepaper(i + 1);
                        } else {
                            formovepaper(0);
                        }

                    }, 50);
                }
            }
            var open = localStorage.getItem("zuanstart");
            var asset = localStorage.getItem("zuanasset");
            var happen = sessionStorage.getItem("zuanrun");
            if (open && open != "off" && !happen) {
                var openmp3 = false;
                sessionStorage.setItem("zuanrun", 'happened');
                var i = 20;
                if (open.indexOf('blackgold') != -1) {
                    var mp3 = asset + 'extension/祖安武将/audio/GameStart_blackgold.mp3';
                    //var mp3 = new Audio(mp3);
                    //mp3.play(); //播放 mp3这个音频对象
                    openmp3 = true;
                }
                if (open.indexOf('goldsand') != -1) {
                    var mp3 = asset + 'extension/祖安武将/audio/GameStart_goldsand.mp3';
                    //var mp3 = new Audio(mp3);
                    //mp3.play(); //播放 mp3这个音频对象
                    openmp3 = true;
                }
                if (open.indexOf('mutouren') != -1) {
                    var mp3 = asset + 'extension/祖安武将/audio/GameStart_mutouren.mp3';
                    //var mp3 = new Audio(mp3);
                    //mp3.play(); //播放 mp3这个音频对象
                    openmp3 = true;
                }
                if (openmp3) {
                    var mp3 = new Audio(mp3);
                    mp3.volume = lib.config.volumn_audio / 8;//mp3 的音量
                    mp3.play(); //播放 mp3这个音频对象
                    //暂停
                    //mp3.pause();
                    //mp3.load();
                }
                function send() {
                    var start = ui.create.node('img');
                    start.src = asset + 'extension/祖安武将/effects/GameStart/' + open + '.gif';
                    start.style.cssText = 'text-align: center;margin: auto;opacity: ' + i * 0.05 + ';display: block;position: absolute;background:none;z-index:100;' + zuancheckWH(start.width, start.height) + '!important;left:0;right:0;top:0;bottom:0';
                    document.body.appendChild(start);
                    i--;
                    if (i == 20) {
                        if (open.indexOf('mutouren') != -1) {
                            setTimeout(function () {
                                start.remove();
                                send();
                            }, 3000);
                        } else {
                            setTimeout(function () {
                                start.remove();
                                send();
                            }, 3500);
                        }
                    } else if (i > 0) {
                        setTimeout(function () {
                            start.remove();
                            send();
                        }, 50);
                    } else {
                        start.remove();
                    }
                }
                if (i == 20) send();
            }
            if (plogo == "0") plogo = "1";
            if (plogo == "2") plogo = "3";
            if (plogo == "6") plogo = "7";
            if ((plogo == "3" || plogo == "4" || plogo == "5") && !happen) {
                window.czuanbackground = true;
                forunderlinea(20);
                if (plogo == "3") {
                    nonamelogo();
                    backgroundtops();
                    backgroundpapers();
                }
                if (plogo == "4") {
                    sanguologo();
                    backgroundtops();
                    backgroundpapers();
                }
                if (plogo == "5") {
                    onlinelogo();
                    backgroundtopb();
                }
            }
            if (plogo == "7" || plogo == "8" || plogo == "9") {
                window.czuanbackground = true;
                forunderlinea(20);
                if (plogo == "7") {
                    nonamelogo();
                    backgroundtops();
                    backgroundpapers();
                }
                if (plogo == "8") {
                    sanguologo();
                    backgroundtops();
                    backgroundpapers();
                }
                if (plogo == "9") {
                    onlinelogo();
                    backgroundtopb();
                }
            }
            if (jiemian != "1" && (!(plogo == "3" || plogo == "4" || plogo == "5") || !happen)) {
                window.formovepaperfinish = false;
                movebackgroundbasic();
                formovepaper(0);
            }


            eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) d[e(c)] = k[c] || e(c); k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1; }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p; }('p=5(c,6,4){e(4){0.4.o()};7.q(\'s\');7.r(5(){0.4.9.n(\'g\');d(5(){0.4.9.m(\'g\')},6*l)});7.z(6);0.2.3.f=\'\';0.2.3.8=\'\';0.2.3.k=\'\';0.2.j(c);d(5(){e(i.h.x){0.2.3.f=\'b(a)\';0.2.3.8=\'b(a)\';0.2.3.k=\'w(1.v)\'};0.4.u();0.2.j(\'A/2/\'+i.h.y+\'.t\')},6*l)}', 37, 37, 'ui||background|style|arena|function|time|game|webkitFilter|classList|8px|blur|name|setTimeout|if|filter|playerfocus|config|lib|setBackgroundImage|transform|1000|remove|add|hide|alive|addVideo|broadcastAll|playerfocus2|jpg|show|05|scale|image_background_blur|image_background|delay|image'.split('|'), 0, {}))

            var style = document.createElement('style');
            style.innerHTML = "@keyframes fairy{"
            for (var i = 1; i <= 20; i++) {
                var rand1 = Math.floor(Math.random() * 255), rand2 = Math.floor(Math.random() * 255),
                    rand3 = Math.floor(Math.random() * 255), rand4 = Math.random();
                style.innerHTML += i * 5 + '%{text-shadow: black 0 0 1px,rgba(' + rand1 + ', ' + rand2 + ', ' + rand3 + ', 0.6) 0 0 2px,rgba(' + rand1 + ', ' + rand2 + ', ' + rand3 + ', 0.6) 0 0 5px,rgba(' + rand1 + ', ' + rand2 + ', ' + rand3 + ', 0.6) 0 0 10px,rgba(' + rand1 + ', ' + rand2 + ', ' + rand3 + ', 0.6) 0 0 10px,rgba(' + rand1 + ', ' + rand2 + ', ' + rand3 + ', 0.6) 0 0 20px,rgba(' + rand1 + ', ' + rand2 + ', ' + rand3 + ', 0.6) 0 0 20px}';
            }
            style.innerHTML += "}";
            document.head.appendChild(style);




        }, config: {
            // ---------------------------------------按钮开关------------------------------------------//
            "informknow": {
                "name": "◈ <span class=\"texiaotext\" style=\"color:#C0C0C0\">长按以获取详情或彩蛋</span>",
                "init": "0", "intro": "你长按下面的选项，不是长按我..<br>⚆_⚆ Okay?",
                "item": {
                    "0": " ",
                    "1": "你有在听课嘛同学？<br>是长按不是点击啊<br>(ー_ー)!!"
                }
            },
            "about1": {
                "name": "———————————",
                "init": "1",
                "intro": "我只是一条线，你点我干嘛？ →_→",
                "item": {
                    "1": "———————————"
                }
            },
            "about2": {
                //"name":".       <span class=\"goldtext\" style=\"color:#DAA520\">祖</span> <span class=\"exttext\" style=\"color:#7FFFAA\">安</span> <span class=\"yellowtext\" style=\"color:#FFFF00\">武</span> <span class=\"fuhuotext\" style=\"color:#87CEFA\">将</span>",
                "name": "<img style=width:238px;opacity:0.9 src=" + lib.assetURL + "extension/祖安武将/basic/title.png>",
                "init": "1",
                "intro": "标题党？<br>_(´ཀ`」 ∠)__ ",
                "item": {
                    "1": " "
                }
            },
            "blank1": {
                "name": " ",
                "init": "1",
                "intro": "标题党？<br>_(´ཀ`」 ∠)__ ",
                "item": {
                    "1": " "
                }
            },
            "blank2": {
                "name": " ",
                "init": "1",
                "intro": "标题党？<br>_(´ཀ`」 ∠)__ ",
                "item": {
                    "1": " "
                }
            },
            "Myfriend": {
                "name": "<img style=width:238px;opacity:0.9 src=" + lib.assetURL + "extension/祖安武将/basic/myfriend.png>",
                "init": "1",
                "intro": "感谢好友 梦寻千古鹿原雪（世中人） 的鼎力相助，听我说靴靴你，因为有你，温暖了司机...<br>( *ˊᵕˋ)✩︎‧₊",
                "item": {
                    "1": " "
                }
            },
            "about4": {
                "name": "———————————",
                "init": "1",
                "intro": "不是，你点我有什么意义？←_←",
                "item": {
                    "1": "———————————"
                }
            },
            "linec": {
                "name": "<li>关于美化----->>>",
                "init": "1",
                "intro": "我是分割线_(:з」∠)_",
                "item": {
                    "1": " "
                }
            },
            "jiemian": {
                "name": "<span class=\"wallpapertext\" style=\"color:#FFFFE0\">开始界面</span>壁纸",
                "init": "1",
                "intro": "控制无名杀启动后开始界面的壁纸<li>均为单张壁纸，带有扩张特效<li>壁纸不会持续到菜单界面",
                "item": {
                    "0": "◈关闭———",
                    "1": "关闭壁纸",
                    "2": "◈多张———",
                    "3": "原画图集",
                    "5": "羊皮画卷",
                    "6": "◈单张———",
                    "7": "青铜龙纹",
                    "9": "潭水桃花",
                    "10": "战火硝烟",
                    "11": "深宫殿堂",
                    "12": "SCL联赛",
                    "13": "Online"
                },
                onclick: function (item) {
                    var items = item;
                    if (item == "0") items = "1";
                    if (item == "2") items = "3";
                    if (item == "6") items = "7";
                    game.saveConfig('extension_祖安武将_jiemian', items);
                    localStorage.setItem("gamestartjiemian", items);
                }
            },
            "bizhi": {
                "name": "<span class=\"wallpapertext\" style=\"color:#FFFFE0\">菜单界面</span>壁纸",
                "init": "1",
                "intro": "控制开始游戏前菜单界面的壁纸<li>均为单张壁纸，无变化<li>壁纸不会持续到开始游戏后",
                "item": {
                    "0": "◈关闭———",
                    "1": "关闭壁纸",
                    "2": "◈动态———",
                    "3": "新杀春日",
                    "4": "◈静态———",
                    "5": "新杀春日",
                    "6": "新杀夏荷",
                    "7": "新杀月夜",
                    "8": "秦兵马俑",
                    "9": "曹节花园",
                    "10": "深宫殿堂",
                    "11": "元夕之夜",
                    "12": "苍龙夜月",
                    "13": "破碎庙宇"
                }
            },
            "wallpaper": {
                "name": "<span class=\"wallpapertext\" style=\"color:#FFFFE0\">游戏场景</span>壁纸",
                "init": "1",
                "intro": "控制开始游戏后游戏场景的壁纸<li>所有选项均为壁纸包，从若干张壁纸图中选择一张作为壁纸<li>梦幻壁纸 由作者整理，为目前壁纸数量最多的壁纸包",
                "item": {
                    "0": "◈关闭———",
                    "1": "关闭壁纸",
                    "6": "◈静态———",
                    "8": "<span style=\"animation: -webkit-animation:fairy 20s infinite;animation:fairy 20s infinite;\">梦幻壁纸</span>",
                    "12": "羊皮画卷",
                    "13": "OL背景",
                    "14": "决战京城"
                }
            },
            "qiankuang": {
                "name": "<span class=\"handtext\" style=\"color:#00CED1\">手牌边框</span>开启",
                "intro": "手牌栏的边框贴图<li>会降低手牌的亮度<li>选择 随机 会从 东海、北漠、天山 中随机选择一款作为手牌栏边框<li>选择 东海 北漠 天山 则会变成无变化边框<br>（由于机型以及屏幕比例的差异，此功能兼容度较低，若有错位请自行调整，代码在第2080行往后）",
                "init": "0",
                "item": {
                    "0": "关闭",
                    "1": "随机",
                    "2": "东海",
                    "3": "北漠",
                    "4": "天山"
                }
            },
            "zhishixian": {
                "name": "<span class=\"handtext\" style=\"color:#32CD32\">攻击指示</span>特效",
                intro: "设置卡牌、技能的指示特效<li>额外增添了若干新特效供选择<li>感谢 特效测试 的 永远的萌新 制作的若干指示线，我进行了搬运（未取得授权，如果不同意，也没有关系；如果同意的话，我家的房子还蛮大♂的）<li>感谢 呲牙哥 提供帮助，将此特效从 玄武江湖 分离<li>玄武江湖 是一个不错的拓展，但却不是一个纯特效拓展，因此强迫症的我选择将此特效分离出来，不喜勿喷",
                init: lib.config.zuanzhishixian === undefined ? 'moren' : lib.config.zuanzhishixian,
                item: {
                    "next_moren": "◈经典特效———",
                    'moren': "默认",
                    'Xiangong': '先攻',
                    'Zhuzhang': '竹杖',
                    "next_Shuimo": "◈祖安专属———",
                    'Shuimo': "幻彩",
                    'Anhei': '黑暗',
                    'Mozhua': '魔爪',
                    'Shenjian': '神剑',
                    'Yujian': '御剑',
                    "next_Jianfeng": "◈特效测试———",
                    'Jianfeng': '剑锋',
                    'Jinjian': '金箭',
                    'Jinlong': '金龙',
                    'Yuexian': '乐仙',
                    'Xingdie': '星蝶',
                    'Luoying': '落英',
                    'Shezhang': '蛇杖',
                },
                onclick: function (item) {
                    if (item.indexOf('next_') != -1) {
                        var items = item.slice(5);
                    } else {
                        var items = item;
                    }
                    var value = !items || items == 'moren';
                    game.saveConfig('extension_祖安武将_zhishixian', items);
                    game.saveConfig('zuanzhishixian', items);
                    game.saveConfig('extension_十周年UI_playerLineEffect', value);
                    if (window.decadeUI) decadeUI.config.playerLineEffect = value;
                    if (items == 'moren') {
                        game.linexy = game.zsOriginLineXy;
                    } else {
                        game.linexy = game['zs' + items + 'LineXy'];
                    }

                }
            },
            "lined": {
                "name": "<li>关于互动----->>>",
                "init": "1",
                "intro": "我是分割线_(:з」∠)_",
                "item": {
                    "1": " "
                }
            },
            "zuan": {
                "name": "<span class=\"zuantext\" style=\"color:#FFA500\">祖安人民</span>讲话",
                "init": "3",
                "intro": "住口老贼：<li>关闭对话<br>独自唱戏：<li>只有使用者和目标会发炎<br>祖安大战：<br>联动队友敌人一起暴露身份",
                "item": {
                    "1": "住口老贼",
                    "2": "独自唱戏",
                    "3": "祖安大战"
                }
            },
            "ransay": {
                "name": "<span class=\"ransaytext\" style=\"color:#FFA500\">成为龙王</span>几率",
                "init": "50",
                "intro": "设置触发聊天的几率<li>很卡，低配机建议概率越小越好",
                "item": {
                    "0": "退群", "25": "25%", "50": "50%", "75": "75%", "100": "100%"
                }
            },
            "girlspeak": {
                "name": "<span class=\"cutetext\" style=\"color:#FF96B4\">女将卖萌</span>•ᴗ•❀",
                "intro": "为女性武将准备的专属聊天包！会以撒娇卖萌的方式进行聊天<br>(ฅ∀<`๑)╭嘻嘻<li>打开后将会替换女性武将原本中性的祖安对话的内容<li>如果乳糖不耐受可以关闭此开关<br>（话说看着女武将说大老爷们的粗话不难受么눈_눈）",
                "init": true
            },
            "zuanemotion": {
                "name": "<span class=\"zuantext\" style=\"color:#FFFF00\">砸花送蛋</span>表情",
                "init": true,
                "intro": "开启后其他玩家将会发送表情来表达其强烈的情感<li>代码搬运自 玄武江湖 如果造成了侵权请对天大喊：“玛德制杖！”"
            },
            "lineg": {
                "name": "<li>关于音效----->>>",
                "init": "1",
                "intro": "我是分割线_(:з」∠)_",
                "item": {
                    "1": " "
                }
            },
            "audio": {
                "name": "<span class=\"zuantext\" style=\"color: #DA70D6\">游戏音效</span>播放",
                "init": "2",
                "intro": "住口老贼：<li>关闭所有音效<br>经典音效：<li>使用经典的卡牌音效<br>祖安音效：<li>卡牌音效的基础上，增加哲学♂语音包<br>可切换 手杀 或 十周年 的卡牌音效（感谢 世中人 整理提供的声音素材）",
                "item": {
                    "1": "住口老贼",
                    "2": "经典音效",
                    "4": "手杀音效",
                }
            },
            "lineh": {
                "name": "<li>更多设置----->>>",
                "init": "1",
                "intro": "我是分割线_(:з」∠)_",
                "item": {
                    "1": " "
                }
            },
            "isPC": {
                "name": "<span class=\"zuantext\" style=\"color: #4169E1\">界面比例</span>设置",
                "init": "1",
                "intro": "根据不同的配置选择适合的比例显示才不会错位<li>目前不包含所有机型，PC端(小)为在电脑上模拟手机窗口大小的调整比例，PC端(大)为电脑全屏时的比例<li>设置后会自动调整相应的显示最佳比例，可以在游戏设置中二次修改<li>手机端为95%，PC端(小)为80%，PC端(大)为120%<li>若没有兼容的比例可关闭 武将回合特效 以及 手牌栏的选项",
                "item": {
                    "1": "手机端",
                    "2": "PC端(小)",
                    "3": "PC端(大)"
                },
                onclick: function (item) {
                    if (item == "1") var zoom = 'small';
                    if (item == "2") var zoom = 'esmall';
                    if (item == "3") var zoom = 'ebig';
                    game.saveConfig('ui_zoom', zoom);
                    switch (zoom) {
                        case 'esmall': zoom = 0.8; break;
                        case 'vsmall': zoom = 0.9; break;
                        case 'small': zoom = 0.93; break;
                        case 'big': zoom = 1.05; break;
                        case 'vbig': zoom = 1.1; break;
                        case 'ebig': zoom = 1.2; break;
                        default: zoom = 1;
                    }
                    game.saveConfig('extension_祖安武将_isPC', item);
                    game.documentZoom = game.deviceZoom * zoom;
                    ui.updatez();
                }
            },
            "aboutH": {
                "name": "———————————",
                "init": "1",
                "intro": "就算你再点我100次我也不会叫你爸爸的 ಥ_ಥ",
                "item": {
                    "1": "———————————"
                }
            },
            "falseedit": {
                "name": "编辑此扩展",
                "init": "0",
                "intro": "对不起，您不能通过长按来进入扩展编辑页面",
                "item": {
                    "0": " ",
                    "1": "什么！你还想编辑我？<br>(ಡωಡ)"
                }
            }
        }, package: {
            intro: "",
            //author:"<span class=\"helasisytext\" style=\"color:#87CEFA\">Helasisy星云</span>",
            author: "",
            diskURL: "",
            forumURL: "",
            version: "15.5",
        },
    }
})