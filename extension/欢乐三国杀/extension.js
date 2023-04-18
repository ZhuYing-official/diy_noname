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
                            'hpp_shen_caocao',
                            'hpp_shen_luxun',
                            'hpp_shen_zhaoyun',
                            'hpp_shen_zhangjiao',

                            'hpp_caocao',
                            'hpp_caoren',
                            'hpp_daqiao',
                            'hpp_dongzhuo',
                            'hpp_ganning',
                            'hpp_gongsunzan',
                            'hpp_guanyu',
                            'hpp_guohuai',
                            'hpp_guojia',
                            'hpp_huanggai',
                            'hpp_huangzhong',
                            'hpp_huaxiong',
                            'hpp_jiaxu',
                            'hpp_liaohua',
                            'hpp_liubiao',
                            'hpp_liubei',
                            'hpp_liuyan',
                            'hpp_lusu',
                            'hpp_luxun',
                            'hpp_lvbu',
                            'hpp_lvmeng',
                            'hpp_machao',
                            'hpp_masu',
                            'hpp_pangde',
                            'hpp_pangtong',
                            'hpp_simayi',
                            'hpp_sunce',
                            'hpp_sunjian',
                            'hpp_sunliang',
                            'hpp_sunquan',
                            'hpp_wangping',
                            'hpp_weiyan',
                            'hpp_xiahoudun',
                            'hpp_xiaoqiao',
                            'hpp_xuzhu',
                            'hpp_yuji',
                            'hpp_zhangfei',
                            'hpp_zhangjiao',
                            'hpp_zhangliao',
                            'hpp_zhangsong',
                            'hpp_zhangzhaozhanghong',
                            'hpp_zhaoyun',
                            'hpp_zhenji',
                            'hpp_zhongyao',
                            'hpp_zhouyu',
                            'hpp_zhugeliang',
                            'hpp_zuoci',
                            'hpp_sp_pangtong',
                            'hpp_sp_zhaoyun',
                        ],
                        //史诗
                        epic: [
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
                                biao_meng: ['hpp_xuzhu', 'hpp_huanggai', 'hpp_xiahoudun', 'hpp_zhangliao', 'hpp_ganning'],
                                biao_jiao: ['hpp_daqiao', 'hpp_xiaoqiao', 'hpp_diaochan', 'hpp_sunshangxiang', 'hpp_zhenji'],
                                biao_wei: ['hpp_huaxiong', 'hpp_liaohua', 'hpp_pangde', 'hpp_huatuo', 'hpp_lvbu'],
                                biao_mou: ['hpp_lvmeng', 'hpp_simayi', 'hpp_guojia', 'hpp_zhugeliang', 'hpp_pangtong'],
                                feng_xiao: ['hpp_caoren', 'hpp_guohuai', 'hpp_weiyan', 'hpp_xiahouyuan'],
                                feng_li: ['hpp_liubiao', 'hpp_caifuren',],
                                feng_zhi: ['hpp_sunce', 'hpp_zhoutai', 'hpp_zhouyu',],
                                feng_xian: ['hpp_zhangjiao', 'hpp_yuji', 'hpp_zuoci'],
                                lin_zhi: ['hpp_zhangsong', 'hpp_zhongyao', 'hpp_masu', 'hpp_huangyueying', 'hpp_luxun', 'hpp_lusu', 'hpp_jiaxu'],
                                lin_man: ['hpp_huaman', 'hpp_shamoke', 'hpp_zhurong', 'hpp_menghuo',],
                                lin_xiong: ['hpp_sunliang', 'hpp_sunjian', 'hpp_gongsunzan', 'hpp_dongzhuo', 'hpp_liuyan'],
                                huo_zhong: ['hpp_zhangzhaozhanghong', 'hpp_wangping', 'hpp_dianwei', 'hpp_jiangwei', 'hpp_xunyu', 'hpp_dongyun', 'hpp_zumao'],
                                huo_yi: ['hpp_taishici', 'hpp_luji', 'hpp_lingtong', 'hpp_xusheng', 'hpp_gaoshun', 'hpp_zhuran', 'hpp_zhuzhi',],
                                huo_bi: ['hpp_zhonghui', 'hpp_liuxie', 'hpp_panfeng', 'hpp_quyi', 'hpp_yanliangwenchou', 'hpp_yuanshao', 'hpp_xuyou', 'hpp_yuanshu'],
                                shan_zhen: ['hpp_fuhuanghou', 'hpp_mayunlu', 'hpp_xuhsi', 'hpp_dufuren', 'hpp_caiwenji', 'hpp_wangyi', 'hpp_zhangchunhua', 'hpp_bulianshi'],
                                shan_si: ['hpp_liushan', 'hpp_zhugezhan', 'hpp_gaunping', 'hpp_liufen', 'hpp_zhangxingcai', 'hpp_gaunyinpin', 'hpp_zhaoxiang'],
                                shan_liang: ['hpp_xuhuang', 'hpp_dengai', 'hpp_zhanghe', 'hpp_yujin', 'hpp_lidian'],
                                shan_ce: ['hpp_wolongzhuge', 'hpp_xunyou', 'hpp_jianyong', 'hpp_buzhi', 'hpp_yangxiu'],
                                shan_ji: ['hpp_lukang', 'hpp_zhugeguo', 'hpp_sunhao', 'hpp_zhugeke', 'hpp_xiahouba', 'hpp_luyusheng',],
                                ming_shu: ['hpp_zhoufei', 'hpp_wuguotai', 'hpp_sunluban', 'hpp_xiahoushi', 'hpp_wuxian', 'hpp_guohuanghou', 'hpp_xinxianying', 'hpp_dongbai', 'hpp_sunluyu'],
                                ming_ru: ['hpp_fazheng', 'hpp_chengong', 'hpp_liru', 'hpp_jushou', 'hpp_zhugejin', 'hpp_qinmi', 'hpp_xushu', 'hpp_liuzhang'],
                                ming_cao: ['hpp_caopi', 'hpp_caozhi', 'hpp_caozhang', 'hpp_caocong', 'hpp_caozhen', 'hpp_caorui', 'hpp_caoxiu', 'hpp_caoang', 'hpp_caoying'],
                                ming_han: ['hpp_haozhao', 'hpp_zhangxiu', 'hpp_madai', 'hpp_chenpu', 'hpp_handang', 'hpp_wuyi', 'hpp_xurong', 'hpp_lijue', 'hpp_zhangji', 'hpp_chunyuqiong'],
                                ming_qi: ['hpp_xizhicai', 'hpp_zhangliang', 'hpp_zhangbao', 'hpp_beimihu'],
                                xian_sp: ['hpp_sp_jiangwei', 'hpp_sp_haungyueying', 'hpp_sp_taishici', 'hpp_sp_machao', 'hpp_sp_daqiao', 'hpp_sp_zhaoyun', 'hpp_sp_sunshangxiang', 'hpp_sp_caiwenji', 'hpp_sp_xiaoqiao', 'hpp_sp_diaochan'],
                                xian_sp2: ['hpp_sp_pangtong', 'hpp_sp_pangde'],
                                xian_jin: ['hpp_guansuo', 'hpp_baosanniang', 'hpp_liuzan', 'hpp_guozhao', 'hpp_fanyufeng', 'hpp_panshu', 'hpp_lvqiling', 'hpp_zhangchangpu', 'hpp_zhangqiying', 'hpp_puyuan', 'hpp_xushao'],
                                shen_wei: ['hpp_shen_caocao', 'hpp_shen_simayi', 'hpp_shen_zhangliao', 'hpp_shen_dianwei', 'hpp_shen_guojia'],
                                shen_shu: ['hpp_shen_guanyu', 'hpp_shen_zhugeliang', 'hpp_shen_zhaoyun', 'hpp_shen_liubei'],
                                shen_wu: ['hpp_shen_lvmeng', 'hpp_shen_zhouyu', 'hpp_shen_luxun', 'hpp_shen_ganning', 'hpp_shen_sunquan', 'hpp_shen_sunce'],
                                shen_qun: ['hpp_shen_lvbu', 'hpp_shen_huatuo', 'hpp_shen_zhenji', 'hpp_shen_zhangjiao'],
                            },
                        },
                        character: {
                            // 欢乐曹操
                            hpp_caocao: ["male", "wei", 4, ["hpp_jianxiong", "hpp_hujia"], ['zhu']],
                            // 欢乐曹仁
                            hpp_caoren: ['male', 'wei', 4, ['hpp_jushou', 'xinjiewei'], []],
                            // 欢乐大乔
                            hpp_daqiao: ['female', 'wu', 3, ['hpp_wanrong', 'hpp_guose', 'hpp_liuli'], []],
                            // 欢乐董卓
                            hpp_dongzhuo: ['male', 'qun', 8, ['hpp_jiuchi', 'hpp_roulin', 'hpp_benghuai', 'hpp_baonue'], ['zhu']],
                            // 欢乐甘宁
                            hpp_ganning: ['male', 'wu', 4, ['hpp_qixi', 'hpp_fenwei'], []],
                            // 欢乐公孙瓒
                            hpp_gongsunzan: ['male', 'qun', 4, ['hpp_qiaomeng', 'hpp_yicong'], []],
                            // 欢乐关羽
                            hpp_guanyu: ['male', 'shu', 4, ['hpp_wusheng'], []],
                            // 欢乐郭淮
                            hpp_guohuai: ['male', 'wei', 4, ['hpp_jingce'], []],
                            // 欢乐郭嘉
                            hpp_guojia: ['male', 'wei', 3, ['hpp_tiandu', 'hpp_yiji'], []],
                            // 欢乐黄盖
                            hpp_huanggai: ['male', 'wu', 4, ['kurou', 'hpp_zhaxiang'], []],
                            // 欢乐黄忠
                            hpp_huangzhong: ['male', 'shu', 4, ['hpp_liegong'], []],
                            // 欢乐华雄
                            hpp_huaxiong: ['male', 'qun', 6, ['hpp_yaowu', 'hpp_yangwei'], []],
                            // 欢乐贾诩
                            hpp_jiaxu: ['male', 'qun', 3, ['hpp_wansha', 'luanwu', 'weimu'], []],
                            // 欢乐廖化
                            hpp_liaohua: ['male', 'shu', 4, ['hpp_dangxian', 'hpp_fuli'], []],
                            // 欢乐刘表
                            hpp_liubiao: ['male', 'qun', 3, ['hpp_zishou', 'hpp_zongshi'], []],
                            // 欢乐刘备
                            hpp_liubei: ['male', 'shu', 4, ['hpp_rende', 'hpp_jijiang'], ['zhu']],
                            // 欢乐刘焉
                            hpp_liuyan: ['male', 'qun', 3, ['xinfu_tushe', 'xinfu_limu'], []],
                            // 欢乐鲁肃
                            hpp_lusu: ['male', 'wu', 3, ['hpp_haoshi', 'hpp_dimeng'], []],
                            // 欢乐陆逊
                            hpp_luxun: ['male', 'wu', 3, ['hpp_qianxun', 'lianying'], []],
                            // 欢乐吕布
                            hpp_lvbu: ['male', 'qun', 5, ['wushuang'], []],
                            // 欢乐吕蒙
                            hpp_lvmeng: ['male', 'wu', 4, ['hpp_keji', 'hpp_qinxue'], []],
                            // 欢乐马超
                            hpp_machao: ['male', 'shu', 4, ['hpp_yuma', 'hpp_tieji'], []],
                            // 欢乐马谡
                            hpp_masu: ['male', 'shu', 3, ['hpp_sanyao', 'rezhiman'], []],
                            // 欢乐庞德
                            hpp_pangde: ['male', 'qun', 4, ['mashu', 'hpp_jianchu'], []],
                            // 欢乐庞统
                            hpp_pangtong: ['male', 'shu', 3, ['hpp_lianhuan', 'hpp_niepan'], []],
                            // 欢乐司马懿
                            hpp_simayi: ['male', 'wei', 3, ['hpp_fankui', 'hpp_guicai'], []],
                            // 欢乐孙策
                            hpp_sunce: ['male', 'wu', 4, ['hpp_jiang', 'hpp_hunzi', 'hpp_zhiba'], ['zhu']],
                            // 欢乐孙坚
                            hpp_sunjian: ['male', 'wu', 4, ['hpp_yinghun', 'hpp_wulie'], []],
                            // 欢乐孙亮
                            hpp_sunliang: ['male', 'wu', 3, ['hpp_kuizhu', 'hpp_chezheng', 'hpp_lijun'], ['zhu']],
                            // 欢乐孙权
                            hpp_sunquan: ['male', 'wu', 4, ['hpp_zhiheng', 'hpp_jiuyuan'], ['zhu']],
                            // 欢乐王平
                            hpp_wangping: ['male', 'shu', 4, ['hpp_feijun', 'hpp_binglue'], []],
                            // 欢乐魏延
                            hpp_weiyan: ['male', 'shu', 4, ['hpp_kuanggu', 'hpp_qimou'], []],
                            // 欢乐夏侯惇
                            hpp_xiahoudun: ['male', 'wei', 4, ['reganglie', 'hpp_qingjian'], []],
                            // 欢乐小乔
                            hpp_xiaoqiao: ['female', 'wu', 3, ['hpp_tianxiang', 'hpp_hongyan'], []],
                            // 欢乐许诸
                            hpp_xuzhu: ['male', 'wei', 4, ['hpp_luoyi', 'hpp_huchi'], []],
                            // 欢乐于吉
                            hpp_yuji: ['male', 'qun', 4, ['hpp_guhuo'], []],
                            // 欢乐张飞
                            hpp_zhangfei: ['male', 'shu', 4, ['new_repaoxiao', 'hpp_tishen'], []],
                            // 欢乐张角
                            hpp_zhangjiao: ['male', 'qun', 3, ['hpp_leiji', 'hpp_guidao', 'hpp_huangtian'], ['zhu']],
                            // 欢乐张辽
                            hpp_zhangliao: ['male', 'wei', 4, ['new_retuxi', 'hpp_zhengbing'], []],
                            // 欢乐张松
                            hpp_zhangsong: ['male', 'shu', 3, ['qiangzhi', 'hpp_xiantu'], []],
                            // 欢乐张昭张纮
                            hpp_zhangzhaozhanghong: ['male', 'wu', 3, ['hpp_zhijian', 'hpp_guzheng'], []],
                            // 欢乐赵云
                            hpp_zhaoyun: ['male', 'shu', 4, ['hpp_longdan', 'hpp_yajiao'], []],
                            // 欢乐甄姬
                            hpp_zhenji: ['female', 'wei', 3, ['hpp_luoshen', 'qingguo'], []],
                            // 欢乐钟繇
                            hpp_zhongyao: ['male', 'wei', 3, ['hpp_huomo', 'hpp_zuoding'], []],
                            // 欢乐周瑜
                            hpp_zhouyu: ['male', 'wu', 3, ['hpp_yingzi', 'hpp_fanjian'], []],
                            // 欢乐诸葛亮
                            hpp_zhugeliang: ['male', 'shu', 3, ['hpp_guanxing', 'hpp_kongcheng'], []],
                            // 欢乐左慈
                            hpp_zuoci: ['male', 'qun', 3, ['hpp_shendao', 'hpp_xinsheng'], ['die_audio']],

                            // 欢乐SP庞统
                            hpp_sp_pangtong: ['male', 'wu', 3, ['hpp_guolun', 'hpp_songsang', 'hpp_zhanji'], []],
                            // 欢乐SP赵云
                            hpp_sp_zhaoyun: ['male', 'qun', 3, ['hpp_longdan', 'hpp_chongzhen'], []],

                            // 神曹操
                            hpp_shen_caocao: ['male', 'shen', 3, ['hpp_guixin', 'feiying'], ['die_audio', 'wei']],
                            // 神陆逊
                            hpp_shen_luxun: ["male", "shen", 4, ["hpp_junlue", "hpp_cuike", "hpp_zhanhuo"], ["wu"]],
                            // 神赵云
                            hpp_shen_zhaoyun: ['male', 'shen', 2, ['hpp_juejing', 'hpp_longhun'], ['die_audio', 'shu']],
                            // 神张角
                            hpp_shen_zhangjiao: ['male', 'shen', 3, ['hpp_yizhao', 'hpp_sanshou', 'hpp_sijun', 'hpp_tianjie'], ['qun']],
                        },
                        characterIntro: {
                            hpp_sp_pangtong: "庞统，字士元，襄阳（治今湖北襄阳）人。三国时刘备帐下谋士，官拜军师中郎将。才智与诸葛亮齐名，人称“凤雏”。在进围雒县时，统率众攻城，不幸被流矢击中去世，时年三十六岁。追赐统为关内侯，谥曰靖侯。庞统死后，葬于落凤庞统墓坡。",
                            hpp_shen_caocao: '魏武帝曹操，字孟德，小名阿瞒、吉利，沛国谯人。精兵法，善诗歌，乃治世之能臣，乱世之奸雄也。',
                            hpp_shen_luxun: '本名陆议，字伯言，吴郡吴县人。历任东吴大都督、丞相。吴大帝孙权兄孙策之婿，世代为江东大族。以谦逊之书麻痹关羽，夺取荆州，又有火烧连营大破蜀军。',
                            hpp_shen_zhaoyun: '字子龙，常山真定人。身长八尺，姿颜雄伟。长坂坡单骑救阿斗，先主云：“子龙一身都是胆也。”',
                            hpp_shen_zhangjiao: '乱世的开始，黄巾起义军首领，太平道创始人。张角早年信奉黄老学说，对在汉代十分流行的谶纬之学也深有研究，对民间医术 、巫术也很熟悉。',
                        },
                        characterReplace: {
                            // C
                            caocao: ['hpp_caocao', 're_caocao', 'caocao'],
                            caoren: ['hpp_caoren', 'caoren', 'new_caoren', 'old_caoren'],
                            // D
                            daqiao: ['hpp_daqiao', 're_daqiao', 'daqiao'],
                            dongzhuo: ['hpp_dongzhuo', 'ol_dongzhuo', 'sp_dongzhuo', 're_dongzhuo', 'dongzhuo'],
                            // G
                            ganning: ['hpp_ganning', 're_ganning', 'ganning'],
                            gongsunzan: ['hpp_gongsunzan', 'dc_gongsunzan', 're_gongsunzan', 'xin_gongsunzan', 'gongsunzan'],
                            guanyu: ['hpp_guanyu', 're_guanyu', 'guanyu'],
                            guohuai: ['hpp_guohuai', 'guohuai', 'tw_guohuai', 're_guohuai', 'xin_guohuai', 'ol_guohuai'],
                            guojia: ['hpp_guojia', 're_guojia', 'guojia'],
                            // H
                            huanggai: ['hpp_huanggai', 're_huanggai', 'huanggai'],
                            huangzhong: ['hpp_huangzhong', 'ol_huangzhong', 're_huangzhong', 'huangzhong'],
                            huaxiong: ['hpp_huaxiong', 're_huaxiong', 'old_huaxiong', 'huaxiong', 'ol_huaxiong'],
                            // J
                            jiaxu: ['hpp_jiaxu', 're_jiaxu', 'jiaxu', 'ns_jiaxu'],
                            // L
                            liaohua: ['hpp_liaohua', 'xin_liaohua', 're_liaohua', 'liaohua'],
                            liubiao: ['hpp_liubiao', 're_liubiao', 'xin_liubiao', 'liubiao', 'oldre_liubiao', 'old_liubiao'],
                            liubei: ['hpp_liubei', 're_liubei', 'liubei', 'junk_liubei'],
                            liuyan: ['hpp_liuyan', 'liuyan'],
                            ol_lusu: ['hpp_lusu', 'ol_lusu', 're_lusu'],
                            luxun: ['hpp_luxun', 're_luxun', 'luxun'],
                            lvbu: ['hpp_lvbu', 're_lvbu', 'lvbu'],
                            lvmeng: ['hpp_lvmeng', 're_lvmeng', 'lvmeng'],
                            // M
                            machao: ['hpp_machao', 're_machao', 'machao'],
                            masu: ['hpp_masu', 'xin_masu', 're_masu', 'masu'],
                            // P
                            pangde: ['hpp_pangde', 'ol_pangde', 're_pangde', 'pangde'],
                            pangtong: ['hpp_pangtong', 'ol_pangtong', 're_pangtong', 'pangtong'],
                            // S
                            simayi: ['hpp_simayi', 're_simayi', 'simayi'],
                            sunce: ['hpp_sunce', 're_sunben', 're_sunce', 'sunce'],
                            sunjian: ['hpp_sunjian', 'ol_sunjian', 're_sunjian', 'sunjian'],
                            sunliang: ['hpp_sunliang', 'sunliang'],
                            sunquan: ['hpp_sunquan', 're_sunquan', 'sunquan'],
                            // W
                            wangping: ['hpp_wangping', 'wangping'],
                            weiyan: ['hpp_weiyan', 'ol_weiyan', 're_weiyan', 'weiyan'],
                            // X
                            xiahoudun: ['hpp_xiahoudun', 're_xiahoudun', 'xin_xiahoudun', 'xiahoudun'],
                            xiaoqiao: ['hpp_xiaoqiao', 'ol_xiaoqiao', 're_xiaoqiao', 'xiaoqiao'],
                            xuzhu: ['hpp_xuzhu', 're_xuzhu', 'xuzhu'],
                            // Y
                            yuji: ['hpp_yuji', 'xin_yuji', 're_yuji', 'yuji'],
                            // Z
                            zhangfei: ['hpp_zhangfei', 're_zhangfei', 'tw_zhangfei', 'xin_zhangfei', 'old_zhangfei', 'zhangfei'],
                            zhangjiao: ['hpp_zhangjiao', 're_zhangjiao', 'sp_zhangjiao', 'zhangjiao'],
                            zhangliao: ['hpp_zhangliao', 're_zhangliao', 'zhangliao'],
                            zhangsong: ['hpp_zhangsong', 'zhangsong'],
                            zhangzhang: ['re_zhangzhaozhanghong', 're_zhangzhang', 'zhangzhang'],
                            zhaoyun: ['hpp_zhaoyun', 're_zhaoyun', 'old_zhaoyun', 'zhaoyun'],
                            zhenji: ['hpp_zhenji', 're_zhenji', 'zhenji'],
                            zhongyao: ['hpp_zhongyao', 'zhongyao'],
                            zhouyu: ['hpp_zhouyu', 're_zhouyu', 'zhouyu'],
                            zhugeliang: ['hpp_zhugeliang', 're_zhugeliang', 'zhugeliang'],
                            zuoci: ['hpp_zuoci', 're_zuoci', 'zuoci'],
                            // SP
                            re_jsp_pangtong: ['hpp_sp_pangtong', 're_jsp_pangtong', 'sp_pangtong'],
                            sp_zhaoyun: ['hpp_sp_zhaoyun', 'sp_zhaoyun', 'jsp_zhaoyun'],
                            // 神
                            shen_caocao: ['hpp_shen_caocao', 'shen_caocao'],
                            shen_luxun: ['hpp_shen_luxun', 'shen_luxun'],
                            shen_zhaoyun: ['hpp_shen_zhaoyun', 'shen_zhaoyun', 'boss_zhaoyun'],
                            shen_zhangjiao: ['hpp_shen_zhangjiao', 'shen_zhangjiao'],
                        },
                        characterFilter: {
                        },
                        card: {
                            hpp_yanxiao_card: {
                                type: 'delay',
                                judge: 0,
                                effect: function () { },
                                ai: {
                                    basic: {
                                        order: 1,
                                        useful: 1,
                                        value: 8,
                                    },
                                    result: {
                                        target: 1
                                    },
                                }
                            },
                            hpp_lingren_basic: {
                                image: 'ext:欢乐三国杀/image/card/lingren_basic.png',
                                fullimage: true,
                            },
                            hpp_lingren_trick: {
                                image: 'ext:欢乐三国杀/image/card/lingren_trick.png',
                                fullimage: true,
                            },
                            hpp_lingren_equip: {
                                image: 'ext:欢乐三国杀/image/card/lingren_equip.png',
                                fullimage: true,
                            },
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
                                    event.count = trigger.num;
                                    'step 1'
                                    event.count--;
                                    player.chooseControl('摸一张牌并获得造成伤害的牌', '摸两张').set('prompt').set('ai', function (event, player) {
                                        var value = 0;
                                        if (get.itemtype(trigger.cards) == 'cards' && get.position(trigger.cards[0], true) == 'o') {
                                            for (i of trigger.cards) {
                                                value += get.value(i);
                                            }
                                        }
                                        if (value > 3) {
                                            return '摸一张牌并获得造成伤害的牌';
                                        } else {
                                            return '摸两张';
                                        }
                                    });
                                    "step 2"
                                    if (result.control == '摸一张牌并获得造成伤害的牌') {
                                        if (get.itemtype(trigger.cards) == 'cards' && get.position(trigger.cards[0], true) == 'o') {
                                            player.gain(trigger.cards, "gain2");
                                        }
                                        player.draw('nodelay');
                                    } else {
                                        player.draw(2, 'nodelay');
                                    }
                                    'step 3'
                                    if (event.count > 0) {
                                        event.goto(1);
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
                            hpp_hujia: {
                                audio: 'hujia',
                                inherit: 'hujia',
                                filter: function (event, player) {
                                    if (event.responded) return false;
                                    if (player.storage.hujiaing) return false;
                                    if (!player.hasZhuSkill('hpp_hujia')) return false;
                                    if (!event.filterCard({ name: 'shan' }, player, event)) return false;
                                    return game.hasPlayer(function (current) {
                                        return current != player && current.group == 'wei';
                                    });
                                },
                                ai: {
                                    respondShan: true,
                                    skillTagFilter: function (player) {
                                        if (player.storage.hujiaing) return false;
                                        if (!player.hasZhuSkill('hpp_hujia')) return false;
                                        return game.hasPlayer(function (current) {
                                            return current != player && current.group == 'wei';
                                        });
                                    },
                                },
                                group: 'hpp_hujia_draw',
                                subSkill: {
                                    draw: {
                                        trigger: { global: ['useCard', 'respond'] },
                                        usable: 1,
                                        direct: true,
                                        filter: function (event, player) {
                                            return event.getParent(2).name == 'hpp_hujia' && event.card.name == 'shan' && event.player != player &&
                                                event.player.group == 'wei' && event.player.isIn() && player.hasZhuSkill('hpp_hujia');
                                        },
                                        content: function () {
                                            'step 0'
                                            trigger.player.chooseBool('护驾：是否令' + get.translation(player) + '摸一张牌？').set('ai', function () {
                                                var evt = _status.event;
                                                return get.attitude(evt.player, evt.getParent().player) > 0;
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                player.logSkill('hpp_hujia');
                                                trigger.player.line(player, 'fire');
                                                player.draw();
                                            }
                                            else player.storage.counttrigger.hpp_hujia_draw--;
                                        },
                                    },
                                },
                            },

                            // 曹仁
                            hpp_jushou: {
                                audio: 'xinjushou',
                                trigger: { player: 'phaseJieshuBegin' },
                                content: function () {
                                    'step 0'
                                    player.turnOver();
                                    player.draw(4);
                                    'step 1'
                                    player.chooseToUse(function (card) {
                                        if (!lib.filter.cardEnabled(card, _status.event.player, _status.event)) return false;
                                        return get.type(card) == 'equip';
                                    }, '据守：是否使用一张装备牌？');
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (card.name == 'guiyoujie') return [0, 1];
                                        },
                                    },
                                },
                            },

                            // 大乔
                            hpp_wanrong: {
                                enable: 'phaseUse',
                                usable: 1,
                                discard: false,
                                lose: false,
                                delay: false,
                                filter: function (event, player) {
                                    return player.countCards('hes', { suit: 'diamond' }) > 0;
                                },
                                position: 'hes',
                                filterCard: { suit: 'diamond' },
                                filterTarget: function (card, player, target) {
                                    if (get.position(ui.selected.cards[0]) != 's' && lib.filter.cardDiscardable(ui.selected.cards[0], player, 'reguose') && target.hasJudge('lebu')) return true;
                                    if (player == target) return false;
                                    if (!game.checkMod(ui.selected.cards[0], player, 'unchanged', 'cardEnabled2', player)) return false;
                                    return player.canUse({ name: 'lebu', cards: ui.selected.cards }, target);
                                },
                                check: function (card) {
                                    return 7 - get.value(card);
                                },
                                content: function () {
                                    if (target.hasJudge('lebu')) {
                                        player.discard(cards);
                                        target.discard(target.getJudge('lebu'));
                                    }
                                    else player.useCard({ name: 'lebu' }, target, cards).audio = false;
                                },
                                ai: {
                                    result: {
                                        target: function (player, target) {
                                            if (target.hasJudge('lebu')) return -get.effect(target, { name: 'lebu' }, player, target);
                                            return get.effect(target, { name: 'lebu' }, player, target);
                                        },
                                    },
                                    order: 9,
                                },
                            },
                            hpp_guose: {
                                audio: 'reguose',
                                frequent: true,
                                trigger: { player: ['useCard', 'loseAfter'] },
                                filter: function (event, player) {
                                    if (event.name != 'lose') {
                                        return get.suit(event.card) == 'diamond';
                                    }
                                    if (event.type != 'discard') {
                                        return false;
                                    }
                                    for (var card of event.cards2) {
                                        if (get.suit(card) == 'diamond') {
                                            return true;
                                        }
                                    }
                                    return false;
                                },
                                content: function () {
                                    player.draw();
                                },
                            },
                            hpp_liuli: {
                                audio: 'liuli',
                                audioname: ['re_daqiao', 'daxiaoqiao'],
                                trigger: { target: 'useCardToTarget' },
                                direct: true,
                                preHidden: true,
                                filter: function (event, player) {
                                    if (event.card.name != 'sha') return false;
                                    if (player.countCards('he') == 0) return false;
                                    return game.hasPlayer(function (current) {
                                        return player.inRange(current) && current != event.player &&
                                            current != player && lib.filter.targetEnabled(event.card, event.player, current);
                                    });
                                },
                                content: function () {
                                    "step 0"
                                    var next = player.chooseCardTarget({
                                        position: 'he',
                                        filterCard: lib.filter.cardDiscardable,
                                        filterTarget: function (card, player, target) {
                                            var trigger = _status.event;
                                            if (player.inRange(target) && target != trigger.source) {
                                                if (lib.filter.targetEnabled(trigger.card, trigger.source, target)) return true;
                                            }
                                            return false;
                                        },
                                        ai1: function (card) {
                                            return get.unuseful(card) + 9;
                                        },
                                        ai2: function (target) {
                                            if (_status.event.player.countCards('h', 'shan')) {
                                                return -get.attitude(_status.event.player, target);
                                            }
                                            if (get.attitude(_status.event.player, target) < 5) {
                                                return 6 - get.attitude(_status.event.player, target);
                                            }
                                            if (_status.event.player.hp == 1 && player.countCards('h', 'shan') == 0) {
                                                return 10 - get.attitude(_status.event.player, target);
                                            }
                                            if (_status.event.player.hp == 2 && player.countCards('h', 'shan') == 0) {
                                                return 8 - get.attitude(_status.event.player, target);
                                            }
                                            return -1;
                                        },
                                        prompt: get.prompt('hpp_liuli'),
                                        prompt2: '弃置一张牌，将此【杀】转移给攻击范围内的一名其他角色',
                                        source: trigger.player,
                                        card: trigger.card,
                                    }).setHiddenSkill(event.name);
                                    "step 1"
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.logSkill(event.name, target);
                                        player.discard(result.cards);
                                        var evt = trigger.getParent();
                                        evt.triggeredTargets2.remove(player);
                                        evt.targets.remove(player);
                                        evt.targets.push(target);
                                    }
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (target.countCards('he') == 0) return;
                                            if (card.name != 'sha') return;
                                            var min = 1;
                                            var friend = get.attitude(player, target) > 0;
                                            var vcard = { name: 'shacopy', nature: card.nature, suit: card.suit };
                                            var players = game.filterPlayer();
                                            for (var i = 0; i < players.length; i++) {
                                                if (player != players[i] &&
                                                    get.attitude(target, players[i]) < 0 &&
                                                    target.canUse(card, players[i])) {
                                                    if (!friend) return 0;
                                                    if (get.effect(players[i], vcard, player, player) > 0) {
                                                        if (!player.canUse(card, players[0])) {
                                                            return [0, 0.1];
                                                        }
                                                        min = 0;
                                                    }
                                                }
                                            }
                                            return min;
                                        }
                                    }
                                }
                            },

                            // 董卓
                            hpp_jiuchi: {
                                audio: 'jiuchi',
                                enable: 'chooseToUse',
                                filterCard: function (card) {
                                    return get.color(card) == 'black';
                                },
                                viewAs: { name: 'jiu' },
                                viewAsFilter: function (player) {
                                    if (!player.countCards('hs', { color: 'black' })) return false;
                                    return true;
                                },
                                prompt: '将一张黑色手牌当酒使用',
                                check: function (card) {
                                    if (_status.event.type == 'dying') return 1 / Math.max(0.1, get.value(card));
                                    return 4 - get.value(card);
                                },
                            },
                            hpp_roulin: {
                                audio: 'roulin',
                                trigger: { player: 'useCardToPlayered', target: 'useCardToTargeted' },
                                forced: true,
                                filter: function (event, player) {
                                    if (event.card.name != 'sha') return false;
                                    if (player == event.player) {
                                        return event.target.hasSex('female');
                                    }
                                    return event.player.hasSex('female');
                                },
                                check: function (event, player) {
                                    return player == event.player;
                                },
                                content: function () {
                                    var id = (player == trigger.player ? trigger.target : player).playerid;
                                    var map = trigger.getParent().customArgs;
                                    if (!map[id]) map[id] = {};
                                    if (typeof map[id].shanRequired == 'number') {
                                        map[id].shanRequired++;
                                    }
                                    else {
                                        map[id].shanRequired = 2;
                                    }
                                },
                                ai: {
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (arg.card.name != 'sha' || !arg.target.hasSex('female') || arg.target.countCards('h', 'shan') > 1) return false;
                                    },
                                },
                            },
                            hpp_benghuai: {
                                audio: 'benghuai',
                                trigger: { player: 'phaseJieshuBegin' },
                                forced: true,
                                filter: function (event, player) {
                                    return !player.isMinHp() && !player.hasSkill('rejiuchi_air') && !player.hasSkill('oljiuchi_air');
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseControl('hpp_benghuai_hp', 'hpp_benghuai_maxHp', function (event, player) {
                                        if (player.isDamaged()) return 'hpp_benghuai_maxHp';
                                        return 'hpp_benghuai_hp';
                                    }).set('prompt', '崩坏：失去1点体力或减1点体力上限，并摸一张牌');
                                    'step 1'
                                    if (result.control == 'hpp_benghuai_hp') player.loseHp();
                                    else player.loseMaxHp();
                                    player.draw();
                                },
                                ai: {
                                    threaten: 0.7,
                                    neg: true,
                                },
                            },
                            hpp_baonue: {
                                unique: true,
                                group: 'hpp_baonue2',
                                audioname: ['re_dongzhuo'],
                                audio: 'baonue2',
                                zhuSkill: true,
                            },
                            hpp_baonue2: {
                                audio: 'baonue2',
                                audioname: ['re_dongzhuo'],
                                trigger: { global: 'damageSource' },
                                filter: function (event, player) {
                                    if (player == event.source || !event.source || event.source.group != 'qun') return false;
                                    return player.hasZhuSkill('hpp_baonue', event.source);
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    trigger.source.chooseBool('是否对' + get.translation(player) + '发动【暴虐】？').set('choice', get.attitude(trigger.source, player) > 0);
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_baonue');
                                        trigger.source.line(player, 'green')
                                        trigger.source.judge(function (card) {
                                            if (get.suit(card) == 'spade') return 4;
                                            return 0;
                                        }).judge2 = function (result) {
                                            return result.bool ? true : false;
                                        };
                                    }
                                    else {
                                        event.finish();
                                    }
                                    'step 2'
                                    if (result.suit == 'spade') {
                                        player.recover();
                                    }
                                }
                            },

                            // 甘宁
                            hpp_qixi: {
                                group: 'qixi',
                                audio: 'qixi',
                                trigger: { player: 'phaseUseBegin' },
                                direct: true,
                                filter: function (event, player) {
                                    return game.hasPlayer(function (target) {
                                        return target.countDiscardableCards(player, 'he');
                                    });
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_qixi'), '弃置一名角色的一张牌', function (card, player, target) {
                                        return target.countDiscardableCards(player, 'he');
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        return get.effect(target, { name: 'guohe_copy2' }, player, player);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_qixi', result.targets);
                                        player.discardPlayerCard(result.targets[0], 'he', true);
                                    }
                                },
                            },
                            hpp_fenwei: {
                                audio: 'fenwei',
                                skillAnimation: true,
                                animationColor: 'wood',
                                unique: true,
                                mark: true,
                                limited: true,
                                trigger: { global: 'useCardToPlayered' },
                                filter: function (event, player) {
                                    if (event.getParent().triggeredTargets3.length > 1) return false;
                                    if (get.type(event.card) != 'trick') return false;
                                    if (get.info(event.card).multitarget) return false;
                                    if (event.targets.length < 2) return false;
                                    return true;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_fenwei'), '令' + get.translation(trigger.card) + '对任意名角色无效', [1, trigger.targets.length], function (card, player, target) {
                                        return _status.event.targets.contains(target);
                                    }).set('ai', function (target) {
                                        var trigger = _status.event.getTrigger();
                                        return -get.effect(target, trigger.card, trigger.player, _status.event.player);
                                    }).set('targets', trigger.targets);
                                    'step 1'
                                    if (result.bool) {
                                        player.addSkill('hpp_fenwei_huifu');
                                        player.logSkill('hpp_fenwei', result.targets);
                                        player.awakenSkill('hpp_fenwei');
                                        trigger.getParent().excluded.addArray(result.targets);
                                    }
                                    else event.finish();
                                    'step 2'
                                    player.draw();
                                },
                                subSkill: {
                                    huifu: {
                                        charlotte: true,
                                        trigger: {
                                            player: 'loseAfter',
                                            global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
                                        },
                                        filter: function (event, player) {
                                            if (player.countCards('h')) return false;
                                            if (!player.awakenedSkills.contains('hpp_fenwei')) return false;
                                            var evt = event.getl(player);
                                            return evt && evt.player == player && evt.hs && evt.hs.length > 0;
                                        },
                                        direct: true,
                                        firstDo: true,
                                        content: function () {
                                            player.removeSkill('hpp_fenwei_huifu');
                                            player.restoreSkill('hpp_fenwei');
                                            game.log(player, '复原了技能', '#g【奋威】');
                                        },
                                    },
                                },
                            },

                            // 公孙瓒
                            hpp_yicong: {
                                mod: {
                                    globalFrom: function (from, to, current) {
                                        return current - Math.max(0, from.hp);
                                    },
                                    globalTo: function (from, to, current) {
                                        return current + Math.max(0, to.getDamagedHp());
                                    },
                                },
                                ai: { threaten: 0.8 },
                            },
                            hpp_qiaomeng: {
                                audio: 'qiaomeng',
                                trigger: { source: 'damageBegin1' },
                                direct: true,
                                filter: function (event, player) {
                                    if (event._notrigger.contains(event.player)) return false;
                                    return event.card && event.card.name == 'sha' && event.player.countGainableCards(player, 'hej');
                                },
                                content: function () {
                                    'step 0'
                                    player.gainPlayerCard(get.prompt('hpp_qiaomeng', trigger.player), 'hej', trigger.player).set('logSkill', ['hpp_qiaomeng', trigger.player]);
                                    'step 1'
                                    if (result.bool) {
                                        var card = result.cards[0];
                                        if (get.subtype(card) == 'equip3' || get.subtype(card) == 'equip4') trigger.num++;
                                    }
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
                                    var card = get.cardPile(function (cardx) {
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

                            // 郭淮
                            hpp_jingce: {
                                audio: 'jingce',
                                trigger: { player: 'phaseJieshuBegin' },
                                frequent: true,
                                content: function () {
                                    var list = [];
                                    player.getHistory('useCard', function (evt) {
                                        list.add(get.suit(evt.card));
                                    });
                                    player.getHistory('respond', function (evt) {
                                        list.add(get.suit(evt.card));
                                    });
                                    player.draw(Math.min(list.length + 1, 3));
                                },
                            },

                            // 郭嘉
                            tiandu_re_guojia: { audio: 2 },
                            tiandu_xizhicai: { audio: 2 },
                            hpp_tiandu: {
                                audio: 'tiandu',
                                audioname2: {
                                    hpp_guojia: 'tiandu_re_guojia',
                                    WU_sunce: 'tiandu_xizhicai',
                                },
                                trigger: { player: 'judgeEnd' },
                                preHidden: true,
                                frequent: function (event) {
                                    if (event.result.card.name == 'du') return false;
                                    return true;
                                },
                                check: function (event) {
                                    if (event.result.card.name == 'du') return false;
                                    return true;
                                },
                                filter: function (event, player) {
                                    return get.position(event.result.card, true) == 'o';
                                },
                                content: function () {
                                    player.gain(trigger.result.card, 'gain2');
                                }
                            },
                            hpp_yiji: {
                                audio: 'reyiji',
                                trigger: { player: 'damageEnd' },
                                frequent: true,
                                filter: function (event) {
                                    return (event.num > 0)
                                },
                                content: function () {
                                    'step 0'
                                    event.count = trigger.num;
                                    'step 1'
                                    event.count--;
                                    event.cards = game.cardsGotoOrdering(get.cards(2)).cards;
                                    if (_status.connectMode) game.broadcastAll(function () { _status.noclearcountdown = true });
                                    event.given_map = {};
                                    'step 2'
                                    if (event.cards.length > 1) {
                                        player.chooseCardButton('遗计：请选择要分配的牌', true, event.cards, [1, event.cards.length]).set('ai', function (button) {
                                            if (ui.selected.buttons.length == 0) return 1;
                                            return 0;
                                        });
                                    }
                                    else if (event.cards.length == 1) {
                                        event._result = { links: event.cards.slice(0), bool: true };
                                    }
                                    else {
                                        event.finish();
                                    }
                                    'step 3'
                                    if (result.bool) {
                                        event.cards.removeArray(result.links);
                                        event.togive = result.links.slice(0);
                                        player.chooseTarget('选择一名角色获得' + get.translation(result.links), true).set('ai', function (target) {
                                            var att = get.attitude(_status.event.player, target);
                                            if (_status.event.enemy) {
                                                return -att;
                                            }
                                            else if (att > 0) {
                                                return att / (1 + target.countCards('h'));
                                            }
                                            else {
                                                return att / 100;
                                            }
                                        }).set('enemy', get.value(event.togive[0], player, 'raw') < 0);
                                    }
                                    'step 4'
                                    if (result.targets.length) {
                                        var id = result.targets[0].playerid, map = event.given_map;
                                        if (!map[id]) map[id] = [];
                                        map[id].addArray(event.togive);
                                    }
                                    if (cards.length > 0) event.goto(2);
                                    'step 5'
                                    if (_status.connectMode) {
                                        game.broadcastAll(function () { delete _status.noclearcountdown; game.stopCountChoose() });
                                    }
                                    var list = [];
                                    for (var i in event.given_map) {
                                        var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
                                        player.line(source, 'green');
                                        list.push([source, event.given_map[i]]);
                                    }
                                    game.loseAsync({
                                        gain_list: list,
                                        giver: player,
                                        animate: 'draw',
                                    }).setContent('gaincardMultiple');
                                    if (event.count <= 0) event.finish();
                                    'step 6'
                                    player.chooseBool(get.prompt2(event.name)).set('frequentSkill', event.name);
                                    'step 7'
                                    if (result.bool) {
                                        player.logSkill(event.name);
                                        event.goto(1);
                                    }
                                },
                                ai: {
                                    maixie: true,
                                    maixie_hp: true,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (get.tag(card, 'damage')) {
                                                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                                if (!target.hasFriend()) return;
                                                var num = 1;
                                                if (get.attitude(player, target) > 0) {
                                                    if (player.needsToDiscard()) {
                                                        num = 0.7;
                                                    }
                                                    else {
                                                        num = 0.5;
                                                    }
                                                }
                                                if (target.hp >= 4) return [1, num * 2];
                                                if (target.hp == 3) return [1, num * 1.5];
                                                if (target.hp == 2) return [1, num * 0.5];
                                            }
                                        }
                                    }
                                }
                            },

                            // 黄盖
                            hpp_zhaxiang: {
                                mod: {
                                    targetInRange: function (card, player, target, now) {
                                        if (card.name == 'sha' && get.color(card) == 'red') return true;
                                    },
                                    cardUsable: function (card, player, num) {
                                        if (card.name == 'sha') return num + 1;
                                    }
                                },
                                audio: 'zhaxiang',
                                trigger: { player: 'useCard' },
                                forced: true,
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && get.color(event.card) == 'red';
                                },
                                content: function () {
                                    trigger.directHit.addArray(game.players);
                                },
                                ai: {
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        return arg.card.name == 'sha' && get.color(arg.card) == 'red';
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

                            // 华雄
                            hpp_yaowu: {
                                audio: 'new_reyaowu',
                                trigger: { player: 'damageBegin3' },
                                filter: function (event, player) {
                                    if (event.card && (event.card.name == 'sha')) {
                                        if (get.color(event.card) == 'nocolor') return false;
                                        return true;
                                    }
                                    return false;
                                },
                                forced: true,
                                content: function () {
                                    if (get.color(trigger.card) == 'red') trigger.source.draw();
                                    else {
                                        player.draw();
                                    }
                                    if (get.itemtype(trigger.cards) == 'cards' && get.position(trigger.cards[0], true) == 'o') {
                                        player.gain(trigger.cards, 'gain2', 'log');
                                    }
                                },
                            },
                            hpp_yangwei: {
                                mod: {
                                    cardUsable: function (card, player, num) {
                                        if (typeof card == 'object' && player == _status.currentPhase) {
                                            var cardx = player.storage.hpp_yangwei_mark;
                                            if (cardx && cardx.name == 'sha' && get.name(card) == 'sha' && get.color(cardx) != 'none' && get.color(card) != 'none' && get.color(cardx) != get.color(card)) {
                                                return Infinity;
                                            }
                                        }
                                    },
                                    aiOrder: function (player, card, num) {
                                        if (typeof card == 'object' && player == _status.currentPhase) {
                                            var evt = player.getLastUsed();
                                            if (evt && evt.card && evt.card.name == 'sha' && card.name == 'sha' && get.color(evt.card) != 'none' && get.color(card) != 'none' && get.color(evt.card) != get.color(card)) {
                                                return num + 10;
                                            }
                                        }
                                    },
                                },
                                group: ['hpp_yangwei_phase', 'hpp_yangwei_count'],
                                audio: 'yangwei',
                                audioname2: { hpp_huaxiong: 'sbyangwei' },
                                trigger: { player: 'phaseUseEnd' },
                                forced: true,
                                filter: function (event, player) {
                                    return player.isDamaged() && player.getHistory('useCard', function (evt) {
                                        return evt.card && evt.card.name == 'sha';
                                    }).length > 2;
                                },
                                locked: false,
                                content: function () {
                                    player.recover();
                                },
                                subSkill: {
                                    mark: { charlotte: true, onremove: true },
                                    count: {
                                        trigger: { player: 'useCard1' },
                                        filter: function (event, player) {
                                            var card = player.storage.hpp_yangwei_mark;
                                            return card && card.name == 'sha' && get.name(event.card) == 'sha' && get.color(card) != 'none' && get.color(event.card) != 'none' && get.color(card) != get.color(event.card);
                                        },
                                        direct: true,
                                        firstDo: true,
                                        content: function () {
                                            trigger.addCount = false;
                                            if (player.stat[player.stat.length - 1].card.sha > 0) player.stat[player.stat.length - 1].card.sha--;
                                        },
                                    },
                                    phase: {
                                        charlotte: true,
                                        trigger: { player: 'useCard' },
                                        filter: function (event, player) {
                                            return player.isPhaseUsing() && event.card.name == 'sha';
                                        },
                                        direct: true,
                                        priority: -15,
                                        content: function () {
                                            player.addTempSkill('hpp_yangwei_mark', 'phaseUseAfter');
                                            player.storage.hpp_yangwei_mark = trigger.card;
                                        },
                                    },
                                },
                            },

                            // 贾诩
                            hpp_wansha: {
                                audio: 'wansha',
                                global: 'hpp_wansha2',
                                trigger: { global: 'dying' },
                                forced: true,
                                preHidden: true,
                                filter: function (event, player, name) {
                                    return _status.currentPhase == player && event.player != player;
                                },
                                content: function () { },
                            },
                            hpp_wansha2: {
                                mod: {
                                    cardSavable: function (card, player) {
                                        if (!_status.currentPhase) return;
                                        if (_status.currentPhase.isAlive() && _status.currentPhase.hasSkill('hpp_wansha') && _status.currentPhase != player) {
                                            if (card.name == 'tao') return false;
                                        }
                                    },
                                    cardEnabled: function (card, player) {
                                        if (!_status.currentPhase) return;
                                        if (_status.currentPhase.isAlive() && _status.currentPhase.hasSkill('hpp_wansha') && _status.currentPhase != player) {
                                            if (card.name == 'tao') return false;
                                        }
                                    },
                                },
                            },

                            // 廖化
                            hpp_dangxian: {
                                audio: 'dangxian',
                                audioname2: { hpp_guansuo: 'dangxian_guansuo' },
                                trigger: { player: 'phaseBegin' },
                                forced: true,
                                locked: false,
                                content: function () {
                                    var next = player.phaseUse();
                                    event.next.remove(next);
                                    trigger.next.push(next);
                                    var card = get.cardPile(function (card) {
                                        return card.name == 'sha';
                                    });
                                    if (card) {
                                        player.gain(card, 'draw');
                                        game.log(player, '摸了一张【杀】');
                                    }
                                    game.updateRoundNumber();
                                },
                            },
                            hpp_fuli: {
                                audio: 'fuli',
                                skillAnimation: true,
                                animationColor: 'soil',
                                unique: true,
                                limited: true,
                                enable: 'chooseToUse',
                                mark: true,
                                filter: function (event, player) {
                                    if (event.type != 'dying') return false;
                                    if (player != event.dying) return false;
                                    return true;
                                },
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_fuli');
                                    event.num = game.countGroup();
                                    player.recover(event.num - player.hp);
                                    'step 1'
                                    var num2 = num - player.countCards('h');
                                    if (num2) player.draw(num2);
                                    'step 2'
                                    if (num > 3) player.turnOver();
                                    player.storage.hpp_fuli = true;
                                },
                                ai: {
                                    save: true,
                                    skillTagFilter: function (player, arg, target) {
                                        return player == target;
                                    },
                                    result: {
                                        player: 10
                                    },
                                },
                                intro: { content: 'limited' },
                            },

                            // 刘表
                            hpp_zishou: {
                                audio: 'zishou',
                                audioname: ['re_liubiao'],
                                trigger: { player: 'phaseDrawBegin2' },
                                check: function (event, player) {
                                    return player.countCards('h') <= (player.hasSkill('zongshi') ? player.maxHp : (player.hp - 2)) || player.skipList.contains('phaseUse') || !player.countCards('h', function (card) {
                                        return get.tag(card, 'damage') && player.hasUseTarget(card);
                                    });
                                },
                                filter: function (event, player) {
                                    return !event.numFixed;
                                },
                                content: function () {
                                    trigger.num += game.countGroup();
                                    player.addTempSkill('hpp_zishou2');
                                },
                                ai: {
                                    threaten: 1.5
                                }
                            },
                            hpp_zishou2: {
                                audio: 'rezishou',
                                trigger: {
                                    source: 'damageBegin2',
                                },
                                forced: true,
                                filter: function (event, player) {
                                    if (event.name == 'damage') return event.player != player;
                                    if (player.getHistory('skipped').contains('phaseUse')) return false;
                                    return player.getHistory('useCard', function (evt) {
                                        if (evt.targets && evt.targets.length && evt.isPhaseUsing()) {
                                            var targets = evt.targets.slice(0);
                                            while (targets.contains(player)) targets.remove(player);
                                            return targets.length > 0;
                                        }
                                        return false;
                                    }).length == 0;
                                },
                                popup: false,
                                content: function () {
                                    'step 0'
                                    if (trigger.name == 'damage') {
                                        player.logSkill('hpp_zishou', trigger.player);
                                        trigger.cancel();
                                        event.finish();
                                        return;
                                    }
                                    else {
                                        var filterTarget = function (card, player, target) {
                                            return target != player && target.countCards('e', function (card) {
                                                return player.isEmpty(get.subtype(card));
                                            });
                                        }
                                        if (game.hasPlayer(function (current) {
                                            return filterTarget(null, player, current)
                                        })) player.chooseTarget(filterTarget, '是否将一名其他角色装备区内的一张牌移动到自己的装备区？').set('ai', function (target) {
                                            var player = _status.event.player;
                                            var att = get.attitude(player, target);
                                            if (att > 0 && !target.hasSkillTag('noe')) return 0;
                                            var num = 0;
                                            target.countCards('e', function (card) {
                                                if (player.isEmpty(get.subtype(card))) {
                                                    var eff = get.effect(player, card, player, player);
                                                    if (eff > num) num = eff;
                                                }
                                            });
                                            if (num <= 0) return 0;
                                            if (att < 0) return num * -att;
                                            return 1 / num;
                                        });
                                        else event.finish();
                                    }
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        event.target = target;
                                        player.logSkill('hpp_zishou', target);
                                        player.choosePlayerCard(target, 'e', '将一张装备牌移至你的装备区').set('filterButton', function (button) {
                                            return _status.event.player.isEmpty(get.subtype(button.link));
                                        });
                                    }
                                    else event.finish();
                                    "step 2"
                                    if (result && result.links && result.links.length) {
                                        game.delay(2);
                                        target.$give(result.links[0], player, false);
                                        player.equip(result.links[0]);
                                        player.addExpose(0.2);
                                    }
                                },
                                ai: {
                                    effect: {
                                        player: function (card, player, target) {
                                            if (get.tag(card, 'damage')) return 'zeroplayertarget';
                                        },
                                    },
                                },
                            },
                            hpp_zongshi: {
                                audio: 'decadezongshi',
                                mod: {
                                    maxHandcard: function (player, num) {
                                        return num + game.countGroup();
                                    },
                                },
                                trigger: { player: 'phaseZhunbeiBegin' },
                                forced: true,
                                filter: function (event, player) {
                                    return player.countCards('h') > player.hp;
                                },
                                content: function () {
                                    player.addTempSkill('hpp_zongshi_shainfinity');
                                },
                                subSkill: {
                                    shainfinity: {
                                        audio: 'hpp_zongshi',
                                        mod: {
                                            cardUsable: function (card, player, num) {
                                                if (card.name == 'sha') return Infinity;
                                            }
                                        },
                                        ai: {
                                            unequip: true,
                                            skillTagFilter: function (player, tag, arg) {
                                                if (arg && arg.name == 'sha') return true;
                                                return false;
                                            }
                                        }
                                    }
                                }
                            },

                            // 刘备
                            hpp_rende: {
                                audio: 'rerende',
                                audioname: ['gz_jun_liubei', 'shen_caopi'],
                                enable: 'phaseUse',
                                filterCard: true,
                                selectCard: [1, Infinity],
                                discard: false,
                                lose: false,
                                delay: false,
                                group: 'hpp_rende_draw',
                                filterTarget: function (card, player, target) {
                                    if (player.storage.hpp_rende2 && player.storage.hpp_rende2.contains(target)) return false;
                                    return player != target;
                                },
                                onremove: ['hpp_rende', 'hpp_rende2'],
                                check: function (card) {
                                    if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') return 0;
                                    if (!ui.selected.cards.length && card.name == 'du') return 20;
                                    var player = get.owner(card);
                                    if (ui.selected.cards.length >= Math.max(2, player.countCards('h') - player.hp)) return 0;
                                    if (player.hp == player.maxHp || player.storage.hpp_rende < 0 || player.countCards('h') <= 1) {
                                        var players = game.filterPlayer();
                                        for (var i = 0; i < players.length; i++) {
                                            if (players[i].hasSkill('haoshi') &&
                                                !players[i].isTurnedOver() &&
                                                !players[i].hasJudge('lebu') &&
                                                get.attitude(player, players[i]) >= 3 &&
                                                get.attitude(players[i], player) >= 3) {
                                                return 11 - get.value(card);
                                            }
                                        }
                                        if (player.countCards('h') > player.hp) return 10 - get.value(card);
                                        if (player.countCards('h') > 2) return 6 - get.value(card);
                                        return -1;
                                    }
                                    return 10 - get.value(card);
                                },
                                content: function () {
                                    'step 0'
                                    var evt = _status.event.getParent('phaseUse');
                                    if (evt && evt.name == 'phaseUse' && !evt.hpp_rende) {
                                        var next = game.createEvent('hpp_rende_clear');
                                        _status.event.next.remove(next);
                                        evt.after.push(next);
                                        evt.hpp_rende = true;
                                        next.player = player;
                                        next.setContent(lib.skill.hpp_rende1.content);
                                    }
                                    if (!Array.isArray(player.storage.hpp_rende2)) {
                                        player.storage.hpp_rende2 = [];
                                    }
                                    player.storage.hpp_rende2.push(target);
                                    player.give(cards, target);
                                    if (cards.length > 0) {
                                        player.addTempSkill('hpp_rende_effect', { player: 'phaseBefore' });
                                        target.storage.hpp_rende_disable_mark = player;
                                        target.addSkill('hpp_rende_disable');
                                        target.addSkill('hpp_rende_disable_mark');
                                    }
                                    if (typeof player.storage.hpp_rende != 'number') {
                                        player.storage.hpp_rende = 0;
                                    }
                                    if (player.storage.hpp_rende >= 0) {
                                        player.storage.hpp_rende += cards.length;
                                        if (player.storage.hpp_rende >= 2) {
                                            var list = [];
                                            if (lib.filter.cardUsable({ name: 'sha' }, player, event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                return player.canUse('sha', current);
                                            })) {
                                                list.push(['基本', '', 'sha']);
                                            }
                                            for (var i of lib.inpile_nature) {
                                                if (lib.filter.cardUsable({ name: 'sha', nature: i }, player, event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                    return player.canUse({ name: 'sha', nature: i }, current);
                                                })) {
                                                    list.push(['基本', '', 'sha', i]);
                                                }
                                            }
                                            if (lib.filter.cardUsable({ name: 'tao' }, player, event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                return player.canUse('tao', current);
                                            })) {
                                                list.push(['基本', '', 'tao']);
                                            }
                                            if (lib.filter.cardUsable({ name: 'jiu' }, player, event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                return player.canUse('jiu', current);
                                            })) {
                                                list.push(['基本', '', 'jiu']);
                                            }
                                            for (var i of lib.inpile) {
                                                if (get.type(i) == 'trick') {
                                                    if (lib.filter.filterCard({ name: i }, player, _status.event.getParent('chooseToUse')) && game.hasPlayer(function (current) {
                                                        return player.canUse(i, current);
                                                    })) {
                                                        list.push(['锦囊', '', i]);
                                                    }
                                                }
                                            }
                                            if (list.length) {
                                                player.chooseButton(['是否视为使用一张基本或普通锦囊牌？', [list, 'vcard']]).set('ai', function (button) {
                                                    var player = _status.event.player;
                                                    var card = { name: button.link[2], nature: button.link[3] };
                                                    if (card.name == 'tao') {
                                                        if (player.hp == 1 || (player.hp == 2 && !player.hasShan()) || player.needsToDiscard()) {
                                                            return 5;
                                                        }
                                                        return 1;
                                                    }
                                                    if (card.name == 'sha') {
                                                        if (game.hasPlayer(function (current) {
                                                            return player.canUse(card, current) && get.effect(current, card, player, player) > 0
                                                        })) {
                                                            if (card.nature == 'fire') return 2.95;
                                                            if (card.nature == 'thunder' || card.nature == 'ice') return 2.92;
                                                            return 2.9;
                                                        }
                                                        return 0;
                                                    }
                                                    if (card.name == 'jiu') {
                                                        return 0.5;
                                                    }
                                                    return _status.event.player.getUseValue({ name: card.name, isCard: true });;
                                                });
                                            }
                                            else {
                                                event.finish();
                                            }
                                            player.storage.hpp_rende = -1;
                                        }
                                        else {
                                            event.finish();
                                        }
                                    }
                                    else {
                                        event.finish();
                                    }
                                    'step 1'
                                    if (result && result.bool && result.links[0]) {
                                        var card = { name: result.links[0][2], nature: result.links[0][3] };
                                        player.chooseUseTarget(card, true);
                                    }
                                },
                                ai: {
                                    fireAttack: true,
                                    order: function (skill, player) {
                                        if (player.hp < player.maxHp && player.storage.hpp_rende < 2 && player.countCards('h') > 1) {
                                            return 10;
                                        }
                                        return 4;
                                    },
                                    result: {
                                        target: function (player, target) {
                                            if (target.hasSkillTag('nogain')) return 0;
                                            if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                                                if (target.hasSkillTag('nodu')) return 0;
                                                return -10;
                                            }
                                            if (target.hasJudge('lebu')) return 0;
                                            var nh = target.countCards('h');
                                            var np = player.countCards('h');
                                            if (player.hp == player.maxHp || player.storage.hpp_rende < 0 || player.countCards('h') <= 1) {
                                                if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
                                            }
                                            return Math.max(1, 5 - nh);
                                        }
                                    },
                                    effect: {
                                        target: function (card, player, target) {
                                            if (player == target && get.type(card) == 'equip') {
                                                if (player.countCards('e', { subtype: get.subtype(card) })) {
                                                    if (game.hasPlayer(function (current) {
                                                        return current != player && get.attitude(player, current) > 0;
                                                    })) {
                                                        return 0;
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    threaten: 0.8
                                },
                                subSkill: {
                                    draw: {
                                        trigger: { global: ['useCard', 'respond'] },
                                        usable: 1,
                                        direct: true,
                                        filter: function (event, player) {
                                            return event.card.name == 'sha' && player != _status.currentPhase && event.player != player && event.player.group == 'shu' && player.hasZhuSkill('hpp_rende');
                                        },
                                        content: function () {
                                            'step 0'
                                            trigger.player.chooseBool('仁德：是否令' + get.translation(player) + '摸一张牌？').set('ai', function () {
                                                var evt = _status.event;
                                                return get.attitude(evt.player, evt.getParent().player) > 0;
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                player.logSkill('hpp_rende');
                                                trigger.player.line(player, 'fire');
                                                player.draw();
                                            }
                                            else player.storage.counttrigger.rehujia_draw--;
                                        },
                                    },
                                    effect: {
                                        forced: true,
                                    },
                                    disable: {
                                        // group:'hpp_rende_disable_mark',
                                        mod: {
                                            playerEnabled: function (card, player, target) {
                                                if (card.name == 'sha' && get.color(card) == 'red' && target.hasSkill('hpp_rende_effect')) {
                                                    return false;
                                                }
                                            },
                                        },
                                        intro: {
                                            content: "你无法对$使用红色【杀】直到$的下回合开始",
                                        },
                                    },
                                    disable_mark: {
                                        mark: 'character',
                                        intro: {
                                            content: '你无法对$使用红色【杀】直到$的下回合开始',
                                        },
                                        onremove: function (player) {
                                            delete player.storage.hpp_rende_disable_mark;
                                            player.removeSkill('hpp_rende_disable');
                                        },
                                        trigger: { global: 'phaseBeginStart' },
                                        firstDo: true,
                                        charlotte: true,
                                        silent: true,
                                        filter: function (event, player) {
                                            return event.player == player.storage.hpp_rende_disable_mark;
                                        },
                                        content: function () {
                                            player.removeSkill('hpp_rende_disable_mark');
                                        }
                                    }
                                }
                            },
                            hpp_rende1: {
                                trigger: { player: 'phaseUseBegin' },
                                silent: true,
                                content: function () {
                                    player.storage.hpp_rende = 0;
                                    player.storage.hpp_rende2 = [];
                                }
                            },
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

                            // 鲁肃
                            hpp_haoshi: {
                                audio: 'olhaoshi',
                                trigger: { player: 'phaseDrawBegin2' },
                                filter: function (event, player) {
                                    return !event.numFixed;
                                },
                                preHidden: true,
                                check: function (event, player) {
                                    if (player.countCards('h') <= 1) return true;
                                    return game.hasPlayer(function (current) {
                                        return current != player && current.isMinHandcard() && get.attitude(player, current) > 0;
                                    });
                                },
                                content: function () {
                                    trigger.num += 2;
                                    player.addSkill('hpp_haoshi2');
                                },
                                ai: {
                                    noh: true,
                                    skillTagFilter: function (player, tag) {
                                        if (tag == 'noh') {
                                            if (player.countCards('h') != 2) return false;
                                        }
                                    },
                                },
                            },
                            hpp_haoshi2: {
                                trigger: { player: 'phaseDrawEnd' },
                                forced: true,
                                popup: false,
                                audio: false,
                                content: function () {
                                    'step 0'
                                    player.removeSkill('hpp_haoshi2');
                                    if (player.countCards('h') <= 5) {
                                        event.finish();
                                        return;
                                    }
                                    else player.chooseCardTarget({
                                        selectCard: Math.floor(player.countCards('h') / 2),
                                        filterTarget: function (card, player, target) {
                                            return target.isMinHandcard();
                                        },
                                        selectTarget: [0, 1],
                                        prompt: '好施：将一半的手牌交给场上手牌数最少的一名角色或弃置一半的手牌',
                                        forced: true,
                                        ai2: function (target) {
                                            return get.attitude(_status.event.player, target);
                                        }
                                    });
                                    'step 1'
                                    if (result.targets && result.targets[0]) result.targets[0].gain(result.cards, player, 'giveAuto');
                                    else player.discard(result.cards);
                                },
                            },
                            hpp_dimeng: {
                                audio: 'oldimeng',
                                enable: 'phaseUse',
                                usable: 1,
                                position: 'he',
                                filterCard: function () {
                                    var targets = ui.selected.targets;
                                    if (targets.length == 2) {
                                        if (Math.abs(targets[0].countCards('h') - targets[1].countCards('h')) <= ui.selected.cards.length) return false;
                                    }
                                    return true;
                                },
                                selectCard: [0, Infinity],
                                selectTarget: 2,
                                complexCard: true,
                                filterTarget: function (card, player, target) {
                                    if (player == target) return false;
                                    return true;
                                },
                                filterOk: function () {
                                    var targets = ui.selected.targets;
                                    if (targets.length != 2) return false;
                                    return (Math.abs(targets[0].countCards('h') - targets[1].countCards('h')) == ui.selected.cards.length);
                                },
                                multitarget: true,
                                multiline: true,
                                content: function () {
                                    targets[0].swapHandcards(targets[1]);
                                },
                                check: function (card) {
                                    var list = [], player = _status.event.player;
                                    var num = player.countCards('he');
                                    var count;
                                    var players = game.filterPlayer();
                                    for (var i = 0; i < players.length; i++) {
                                        if (players[i] != player && get.attitude(player, players[i]) > 3) list.push(players[i]);
                                    }
                                    list.sort(function (a, b) {
                                        return a.countCards('h') - b.countCards('h');
                                    });
                                    if (list.length == 0) return -1;
                                    var from = list[0];
                                    list.length = 0;

                                    for (var i = 0; i < players.length; i++) {
                                        if (players[i] != player && get.attitude(player, players[i]) < 1) list.push(players[i]);
                                    }
                                    if (list.length == 0) return -1;
                                    list.sort(function (a, b) {
                                        return b.countCards('h') - a.countCards('h');
                                    });
                                    if (from.countCards('h') >= list[0].countCards('h')) return -1;
                                    for (var i = 0; i < list.length && from.countCards('h') < list[i].countCards('h'); i++) {
                                        if (list[i].countCards('h') - from.countCards('h') <= num) {
                                            count = list[i].countCards('h') - from.countCards('h'); break;
                                        }
                                    }
                                    if (count < 2 && from.countCards('h') >= 2) return -1;
                                    if (ui.selected.cards.length < count) return 11 - get.value(card);
                                    return -1;
                                },
                                ai: {
                                    order: 6,
                                    threaten: 2.8,
                                    expose: 0.9,
                                    result: {
                                        target: function (player, target) {
                                            var list = [];
                                            var num = player.countCards('he');
                                            var players = game.filterPlayer();
                                            if (ui.selected.targets.length == 0) {
                                                for (var i = 0; i < players.length; i++) {
                                                    if (players[i] != player && get.attitude(player, players[i]) > 3) list.push(players[i]);
                                                }
                                                list.sort(function (a, b) {
                                                    return a.countCards('h') - b.countCards('h');
                                                });
                                                if (target == list[0]) return get.attitude(player, target);
                                                return -get.attitude(player, target);
                                            }
                                            else {
                                                var from = ui.selected.targets[0];
                                                for (var i = 0; i < players.length; i++) {
                                                    if (players[i] != player && get.attitude(player, players[i]) < 1) list.push(players[i]);
                                                }
                                                list.sort(function (a, b) {
                                                    return b.countCards('h') - a.countCards('h');
                                                });
                                                if (from.countCards('h') >= list[0].countCards('h')) return -get.attitude(player, target);
                                                for (var i = 0; i < list.length && from.countCards('h') < list[i].countCards('h'); i++) {
                                                    if (list[i].countCards('h') - from.countCards('h') <= num) {
                                                        var count = list[i].countCards('h') - from.countCards('h');
                                                        if (count < 2 && from.countCards('h') >= 2) return -get.attitude(player, target);
                                                        if (target == list[i]) return get.attitude(player, target);
                                                        return -get.attitude(player, target);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },

                            // 陆逊
                            hpp_qianxun: {
                                audio: 'reqianxun',
                                trigger: { target: 'useCardToBegin' },
                                filter: function (event, player) {
                                    if (event.targets && event.targets.length > 1) return false;
                                    return event.card && (get.type(event.card) == 'trick' || get.type(event.card) == 'delay');
                                },
                                forced: true,
                                content: function () {
                                    'step 0'
                                    player.draw();
                                    player.chooseCardTarget({
                                        prompt: '谦逊：是否将一张手牌交给一名其他角色？',
                                        filterCard: true,
                                        filterTarget: lib.filter.notMe,
                                        ai1: function (card) {
                                            if (card.name == 'du') return 10;
                                            var player = _status.event.player;
                                            if (!game.hasPlayer(function (current) {
                                                return get.attitude(player, current) > 0 && !current.hasSkillTag('nogain');
                                            })) return 0;
                                            return 1 / Math.max(0.1, get.value(card));
                                        },
                                        ai2: function (target) {
                                            var player = _status.event.player, att = get.attitude(player, target);
                                            if (ui.selected.cards[0].name == 'du') return -att;
                                            if (target.hasSkillTag('nogain')) att /= 6;
                                            return att;
                                        },
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.line(result.targets[0]);
                                        result.targets[0].gain(result.cards, player, 'giveAuto');
                                    }
                                },
                            },

                            // 吕蒙
                            hpp_keji: {
                                audio: 'keji',
                                trigger: { player: 'phaseDiscardBefore' },
                                frequent: true,
                                filter: function (event, player) {
                                    if (player.getHistory('skipped').contains('phaseUse')) return true;
                                    var history = player.getHistory('useCard').concat(player.getHistory('respond'));
                                    for (var i = 0; i < history.length; i++) {
                                        if (history[i].card.name == 'sha' && history[i].isPhaseUsing()) return false;
                                    }
                                    return true;
                                },
                                content: function () {
                                    trigger.cancel();
                                    player.draw();
                                },
                            },
                            hpp_qinxue: {
                                skillAnimation: true,
                                animationColor: 'wood',
                                audio: 'qinxue',
                                unique: true,
                                juexingji: true,
                                derivation: 'hpp_gongxin',
                                trigger: { player: 'phaseJieshuBegin' },
                                forced: true,
                                filter: function (event, player) {
                                    return player.countCards('h') >= player.hp * 3;
                                },
                                content: function () {
                                    var num = player.maxHp - player.hp;
                                    player.awakenSkill('hpp_qinxue');
                                    if (num > 0) player.loseMaxHp(num);
                                    player.removeSkill('hpp_keji');
                                    player.addSkillLog('hpp_gongxin');
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

                            // 马谡
                            hpp_sanyao: {
                                audio: 'sanyao',
                                enable: 'phaseUse',
                                usable: 1,
                                selectCard: function () {
                                    var player = _status.event.player;
                                    return [Math.max(1, ui.selected.targets.length), Math.min(4, game.players.length - 1)];
                                },
                                selectTarget: function () {
                                    return ui.selected.cards.length;
                                },
                                filterTarget: lib.filter.notMe,
                                check: function (card) {
                                    var player = _status.event.player;
                                    if (game.countPlayer(function (target) {
                                        return target != player && get.effect(target, 'sanyao', player, player) > 0;
                                    }) <= ui.selected.cards.length) return 0;
                                    return 7 - get.value(card);
                                },
                                position: 'he',
                                filterCard: true,
                                content: function () {
                                    target.damage('nocard');
                                },
                                ai: {
                                    result: {
                                        target: function (player, target) {
                                            var disbool = false;
                                            if (player.hasSkill('rezhiman')) {
                                                if (target.countCards('j') && get.attitude(player, target) > 0) {
                                                    return 1;
                                                }
                                                if (target.countCards('he', function (card) {
                                                    return card.name == 'tengjia' || get.value(card) > 0;
                                                })) {
                                                    disbool = true;
                                                }
                                            }
                                            var damage = get.damageEffect(target, player);
                                            if (disbool && get.attitude(player, target) < 0) return Math.min(-1, damage);
                                            return damage;
                                        },
                                    },
                                    order: 7,
                                },
                            },

                            // 庞德
                            hpp_jianchu: {
                                shaRelated: true,
                                audio: 'jianchu',
                                trigger: { player: 'useCardToPlayered' },
                                filter: function (event, player) {
                                    return event.card.name == 'sha' && event.target.countDiscardableCards(player, 'he') > 0;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.discardPlayerCard(trigger.target, get.prompt('hpp_jianchu', trigger.target)).set('ai', function (button) {
                                        if (!_status.event.att) return 0;
                                        if (get.position(button.link) == 'e') {
                                            if (get.subtype(button.link) == 'equip2') return 2 * get.value(button.link);
                                            return get.value(button.link);
                                        }
                                        return 1;
                                    }).set('logSkill', ['hpp_jianchu', trigger.target]).set('att', get.attitude(player, trigger.target) <= 0);
                                    'step 1'
                                    if (result.bool && result.links && result.links.length) {
                                        if (get.type(result.links[0], null, result.links[0].original == 'h' ? player : false) != 'basic') {
                                            player.draw();
                                            trigger.getParent().directHit.add(trigger.target);
                                        }
                                        else {
                                            trigger.addCount = false;
                                            if (player.stat[player.stat.length - 1].card.sha > 0) {
                                                player.stat[player.stat.length - 1].card.sha--;
                                            }
                                        }
                                    }
                                },
                                ai: {
                                    unequip_ai: true,
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (tag == 'directHit_ai') return arg.card.name == 'sha' && arg.target.countCards('e', function (card) {
                                            return get.value(card) > 1;
                                        }) > 0;
                                        if (arg && arg.name == 'sha' && arg.target.getEquip(2)) return true;
                                        return false;
                                    }
                                },
                            },

                            // 庞统
                            hpp_lianhuan: {
                                audio: 'xinlianhuan',
                                trigger: { player: 'phaseUseBegin' },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt2('hpp_lianhuan'), [1, 2]).set('ai', function (target) {
                                        var player = _status.event.player, eff = get.effect(target, { name: 'tiesuo' }, player, player);
                                        if (target == player) return eff + 5;
                                        return eff;
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        result.targets.sortBySeat()
                                        player.logSkill('hpp_lianhuan', result.targets);
                                        for (var target of result.targets) target.link();
                                        if (result.targets.contains(player)) player.draw();
                                    }
                                },
                            },
                            hpp_niepan: {
                                audio: 'olniepan',
                                unique: true,
                                enable: 'chooseToUse',
                                mark: true,
                                skillAnimation: true,
                                animationStr: '涅盘',
                                limited: true,
                                animationColor: 'orange',
                                init: function (player) {
                                    player.storage.hpp_niepan = false;
                                },
                                filter: function (event, player) {
                                    if (player.storage.hpp_niepan) return false;
                                    if (event.type == 'dying') {
                                        if (player != event.dying) return false;
                                        return true;
                                    }
                                    return false;
                                },
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_niepan');
                                    player.storage.hpp_niepan = true;
                                    player.discard(player.getCards('hej'));
                                    'step 1'
                                    player.link(false);
                                    'step 2'
                                    player.turnOver(false);
                                    'step 3'
                                    player.draw(3);
                                    'step 4'
                                    if (player.hp < 3) {
                                        player.recover(3 - player.hp);
                                    }
                                },
                                ai: {
                                    order: 1,
                                    skillTagFilter: function (player, arg, target) {
                                        if (player != target || player.storage.hpp_niepan) return false;
                                    },
                                    save: true,
                                    result: {
                                        player: function (player) {
                                            if (player.hp <= 0) return 10;
                                            if (player.hp <= 2 && player.countCards('he') <= 1) return 10;
                                            return 0;
                                        }
                                    },
                                    threaten: function (player, target) {
                                        if (!target.storage.hpp_niepan) return 0.6;
                                    }
                                },
                                intro: {
                                    content: 'limited'
                                }
                            },

                            // 司马懿
                            hpp_fankui: {
                                audio: 'fankui',
                                trigger: { player: 'damageEnd' },
                                frequent: true,
                                content: function () {
                                    'step 0'
                                    event.count = trigger.num;
                                    'step 1'
                                    event.count--;
                                    player.judge();
                                    'step 2'
                                    if (!game.hasPlayer(function (current) {
                                        return current.countGainableCards(player, 'he');
                                    })) {
                                        event.goto(4);
                                        return;
                                    }
                                    if (result.suit != 'heart' && (!trigger.source || !trigger.source.countCards('he'))) {
                                        event.goto(4);
                                        return;
                                    }
                                    if (result.suit != 'heart') result.targets = [trigger.source];
                                    else player.chooseTarget('请选择【反馈】的目标', '获得一名角色的一张牌', true, function (card, player, target) {
                                        return target.countGainableCards(player, 'he');
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        return get.effect(target, { name: 'guohe_copy2' }, player, player);
                                    });
                                    'step 3'
                                    if (result.targets) {
                                        var target = result.targets[0];
                                        player.line(target);
                                        player.gainPlayerCard(target, 'he', true);
                                    }
                                    else event.finish();
                                    'step 4'
                                    if (event.count > 0) player.chooseBool(get.prompt2('hpp_fankui')).set('frequentSkill', 'hpp_fankui');
                                    else event.finish();
                                    'step 5'
                                    if (result.bool) {
                                        player.logSkill('hpp_fankui');
                                        event.goto(1);
                                    }
                                },
                                ai: {
                                    maixie_defend: true,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (player.countCards('he') > 1 && get.tag(card, 'damage')) {
                                                if (player.hasSkillTag('jueqing', false, target)) return [1, -1.5];
                                                if (get.attitude(target, player) < 0) return [1, 1];
                                            }
                                        },
                                    },
                                },
                            },
                            hpp_guicai: {
                                audio: 'guicai',
                                trigger: { global: 'judge' },
                                filter: function (event, player) {
                                    return player.countCards('hes');
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
                                        get.translation(trigger.player.judging[0]) + '，' + get.prompt('hpp_guicai'), 'hes', function (card) {
                                            var player = _status.event.player;
                                            var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                                            if (mod2 != 'unchanged') return mod2;
                                            var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
                                            if (mod != 'unchanged') return mod;
                                            return true;
                                        }).set('ai', function (card) {
                                            var trigger = _status.event.getTrigger();
                                            var player = _status.event.player;
                                            var judging = _status.event.judging;
                                            var result = trigger.judge(card) - trigger.judge(judging);
                                            var attitude = get.attitude(player, trigger.player);
                                            if (attitude == 0) {
                                                if (player.isDamaged() && get.suit(card, player) == 'heart') return 10;
                                                if (get.suit(card, player) == 'club') return 8;
                                                return 0;
                                            }
                                            if (attitude > 0) {
                                                if (result == 0) {
                                                    if (player.isDamaged() && get.suit(card, player) == 'heart') return 10;
                                                    if (get.suit(card, player) == 'club') return 8;
                                                    return 0;
                                                }
                                                return result - get.value(card) / 2;
                                            }
                                            else {
                                                if (result == 0) {
                                                    if (player.isDamaged() && get.suit(card) == 'heart') return 10;
                                                    if (get.suit(card) == 'club') return 8;
                                                    return 0;
                                                }
                                                return -result - get.value(card) / 2;
                                            }
                                        }).set('judging', trigger.player.judging[0]);
                                    'step 1'
                                    if (result.bool) {
                                        player.respond(result.cards, 'hpp_guicai', 'highlight', 'noOrdering');
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (result.bool) {
                                        if (trigger.player.judging[0].clone) {
                                            trigger.player.judging[0].clone.classList.remove('thrownhighlight');
                                            game.broadcast(function (card) {
                                                if (card.clone) {
                                                    card.clone.classList.remove('thrownhighlight');
                                                }
                                            }, trigger.player.judging[0]);
                                            game.addVideo('deletenode', player, get.cardsInfo([trigger.player.judging[0].clone]));
                                        }
                                        game.cardsDiscard(trigger.player.judging[0]);
                                        trigger.player.judging[0] = result.cards[0];
                                        trigger.orderingCards.addArray(result.cards);
                                        game.log(trigger.player, '的判定牌改为', result.cards[0]);
                                        game.delay(2);
                                        event.card = result.cards[0];
                                    }
                                    else event.finish();
                                    'step 3'
                                    if (get.suit(card, player) == 'heart') player.recover();
                                    if (get.suit(card, player) == 'club') player.draw(2);
                                },
                                ai: {
                                    rejudge: true,
                                    tag: { rejudge: 1 },
                                },
                            },

                            // 孙策
                            hpp_jiang: {
                                audio: 'jiang',
                                shaRelated: true,
                                preHidden: true,
                                filter: function (event, player) {
                                    return event.card.name == 'sha' || event.card.name == 'juedou';
                                },
                                trigger: {
                                    player: 'useCardToPlayered',
                                    target: 'useCardToTargeted',
                                },
                                frequent: true,
                                content: function () {
                                    player.draw();
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (card.name == 'sha') return [1, 0.6];
                                        },
                                        player: function (card, player, target) {
                                            if (card.name == 'sha') return [1, 1];
                                        }
                                    }
                                }
                            },
                            hpp_hunzi: {
                                derivation: ['hpp_yingzi', 'hpp_yinghun'],
                                unique: true,
                                audio: 'hunzi',
                                trigger: { player: ['changeHp', 'enterGame'], global: 'phaseBefore' },
                                filter: function (event, player) {
                                    if (player.hp != 1) return false;
                                    return event.name != 'phase' || game.phaseNumber == 0;
                                },
                                juexingji: true,
                                forced: true,
                                skillAnimation: true,
                                animationColor: 'wood',
                                content: function () {
                                    player.loseMaxHp();
                                    player.addSkillLog('hpp_yingzi');
                                    player.addSkillLog('hpp_yinghun');
                                    player.awakenSkill('hpp_hunzi');
                                },
                                ai: {
                                    threaten: function (player, target) {
                                        if (target.hp == 1) return 2;
                                        return 0.5;
                                    },
                                    maixie: true,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (!target.hasFriend()) return;
                                            if (get.tag(card, 'damage') == 1 && target.hp == 2 && !target.isTurnedOver() &&
                                                _status.currentPhase != target && get.distance(_status.currentPhase, target, 'absolute') <= 3) return [0.5, 1];
                                        }
                                    }
                                }
                            },
                            hpp_zhiba: {
                                unique: true,
                                audio: 'zhiba2',
                                global: 'hpp_zhiba2',
                                zhuSkill: true,
                            },
                            hpp_zhiba2: {
                                audio: 'zhiba2',
                                enable: 'phaseUse',
                                discard: false,
                                lose: false,
                                delay: false,
                                line: true,
                                direct: true,
                                clearTime: true,
                                prepare: function (cards, player, targets) {
                                    targets[0].logSkill('hpp_zhiba');
                                },
                                prompt: function () {
                                    var player = _status.event.player;
                                    var list = game.filterPlayer(function (target) {
                                        return target != player && target.hasZhuSkill('hpp_zhiba', player);
                                    });
                                    var str = '将一张【决斗】或【杀】交给' + get.translation(list);
                                    if (list.length > 1) str += '中的一人';
                                    return str;
                                },
                                filter: function (event, player) {
                                    if (player.group != 'wu' || player.hasSkill('hpp_zhiba3')) return false;
                                    if (player.countCards('h', function (card) {
                                        return card.name == 'juedou' || card.name == 'sha';
                                    }) <= 0) return false;
                                    return game.hasPlayer(function (target) {
                                        return target != player && target.hasZhuSkill('hpp_zhiba', player);
                                    });
                                },
                                filterCard: function (card) {
                                    return card.name == 'juedou' || card.name == 'sha';
                                },
                                log: false,
                                visible: true,
                                filterTarget: function (card, player, target) {
                                    return target != player && target.hasZhuSkill('hpp_zhiba', player);
                                },
                                content: function () {
                                    player.addTempSkill('hpp_zhiba3', 'phaseUseAfter');
                                    target.gain(cards, player, 'give');
                                },
                                ai: {
                                    expose: 0.3,
                                    order: 10,
                                    result: {
                                        target: 5,
                                    },
                                },
                            },
                            hpp_zhiba3: { charlotte: true },

                            // 孙坚
                            yinghun_ol_sunjian: { audio: 2 },
                            yinghun_sunce: { audio: 2 },
                            hpp_yinghun: {
                                audio: 'yinghun',
                                audioname2: {
                                    hpp_sunjian: 'yinghun_ol_sunjian',
                                    hpp_sunce: 'yinghun_sunce',
                                },
                                trigger: { player: 'phaseZhunbeiBegin' },
                                direct: true,
                                preHidden: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt2('hpp_yinghun'), lib.filter.notMe).set('ai', function (target) {
                                        var player = _status.event.player, att = get.attitude(player, target);
                                        if (get.attitude(player, target) > 0) return 10 + att;
                                        if (player.getDamagedHp() > 1) return -att;
                                        return -1;
                                    }).setHiddenSkill('hpp_yinghun');
                                    'step 1'
                                    if (result.bool) {
                                        var num = player.getDamagedHp();
                                        event.num = num;
                                        var target = result.targets[0];
                                        event.target = target;
                                        player.logSkill('hpp_yinghun', target);
                                        if (num == 0) {
                                            target.draw();
                                            event.finish();
                                            return;
                                        }
                                        else {
                                            var str1 = '摸' + get.cnNumber(num, true) + '张牌';
                                            var str2 = '摸一弃' + get.cnNumber(num, true);
                                            player.chooseControl(str1, str2, function (event, player) {
                                                if (player.isHealthy()) return 1 - _status.event.choice;
                                                return _status.event.choice;
                                            }).set('choice', (get.attitude(player, event.target) > 0) ? 0 : 1);
                                            event.str = str1;
                                        }
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (result.control == event.str) {
                                        if (num > 0) target.draw(num);
                                    }
                                    else {
                                        event.target.draw();
                                        if (num > 0) target.chooseToDiscard(num, true, 'he');
                                    }
                                },
                            },
                            hpp_wulie: {
                                trigger: { player: 'phaseBefore' },
                                audio: 'wulie',
                                direct: true,
                                limited: true,
                                skillAnimation: true,
                                animationColor: 'wood',
                                unique: true,
                                filter: function (event, player) {
                                    return player.hp > 0;
                                },
                                content: function () {
                                    'step 0'
                                    var num = player.hp - 1;
                                    if (player.countCards('hs', { name: ['tao', 'jiu'] })) {
                                        num = player.hp;
                                    }
                                    var map = {};
                                    var list = [];
                                    for (var i = 1; i <= player.hp; i++) {
                                        var cn = get.cnNumber(i, true);
                                        map[cn] = i;
                                        list.push(cn);
                                    }
                                    list.push('cancel2');
                                    event.map = map;
                                    player.chooseControl(list).set('prompt', get.prompt2('hpp_wulie')).set('ai', function () {
                                        if (player.getFriends(true).length < game.countPlayer(function (current) {
                                            return get.attitude(player, target) > 0
                                        }) - 1) return 'cancel2';
                                        return get.cnNumber(_status.event.goon, true);
                                    }).set('goon', num);
                                    'step 1'
                                    if (result.control != 'cancel2') {
                                        var num = event.map[result.control] || 1;
                                        player.logSkill('hpp_wulie');
                                        player.awakenSkill('hpp_wulie');
                                        player.loseHp(num);
                                        player.addSkill('hpp_wulie2');
                                        player.addMark('hpp_wulie2', num);
                                        player.chooseTarget([1, num], '是否令至多' + get.cnNumber(num) + '名其他角色各获得1枚「烈」标记？', lib.filter.notMe).set('ai', function (target) {
                                            var player = _status.event.player;
                                            return get.attitude(player, target);
                                        });
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (result.bool) {
                                        var targets = result.targets.sortBySeat();
                                        player.line(targets);
                                        for (var i of targets) {
                                            i.addSkill('hpp_wulie2');
                                            i.addMark('hpp_wulie2', 1);
                                        }
                                    }
                                },
                            },
                            hpp_wulie2: {
                                marktext: '烈',
                                intro: { name2: '烈', content: 'mark' },
                                trigger: { player: 'damageBegin3' },
                                content: function () {
                                    trigger.cancel();
                                    player.removeMark('hpp_wulie2', 1);
                                    if (!player.storage.hpp_wulie2) player.removeSkill('hpp_wulie2');
                                },
                            },

                            // 孙亮
                            hpp_kuizhu: {
                                audio: 'nzry_kuizhu',
                                trigger: { player: 'phaseDiscardEnd' },
                                filter: function (event, player) {
                                    var cards = [];
                                    player.getHistory('lose', function (evt) {
                                        if (evt.type == 'discard' && evt.getParent('phaseDiscard') == event) cards.addArray(evt.cards2);
                                    });
                                    return cards.length > 0;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var cards = [];
                                    player.getHistory('lose', function (evt) {
                                        if (evt.type == 'discard' && evt.getParent('phaseDiscard') == trigger) cards.addArray(evt.cards2);
                                    });
                                    event.num = cards.length;
                                    event.str1 = '令至多' + event.num + '名角色摸一张牌';
                                    event.str2 = '对任意名体力值之和不大于' + event.num + '的角色造成一点伤害';
                                    player.chooseControl('cancel2').set('ai', function () {
                                        if (game.countPlayer(function (current) { return get.attitude(player, current) < 0 && current.hp <= event.num }) > 0) return 1;
                                        return 0;
                                    }).set('choiceList', [event.str1, event.str2]).set('prompt', get.prompt2('hpp_kuizhu'));
                                    'step 1'
                                    if (result.control == 'cancel2') event.finish();
                                    event.control = [event.str1, event.str2][result.index];
                                    'step 2'
                                    var num = event.num, str = (event.control == event.str1 ? '令至多' + num + '名角色摸一张牌' : '对任意名体力值之和不大于' + num + '的角色各造成1点伤害');
                                    player.chooseTarget('请选择〖溃诛〗的目标', str, [0, Infinity], function (card, player, target) {
                                        var num = _status.event.num;
                                        switch (event.control) {
                                            case event.str1:
                                                return ui.selected.targets.length < num;
                                                break;
                                            case event.str2:
                                                if (!ui.selected.targets.length) return target.hp <= num;
                                                var summer = 0;
                                                for (var i of ui.selected.targets) summer += i.hp;
                                                return summer + target.hp <= num;
                                                break;
                                        }
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        switch (event.control) {
                                            case event.str1:
                                                return get.attitude(player, target);
                                                break;
                                            case event.str2:
                                                return get.damageEffect(target, player, player);
                                                break;
                                        }
                                    }).set('num', num);
                                    'step 3'
                                    if (result.bool) {
                                        var targets = result.targets.sortBySeat();
                                        player.logSkill('hpp_kuizhu', targets);
                                        if (event.control == event.str1) game.asyncDraw(targets);
                                        else for (var target of targets) target.damage();
                                    }
                                },
                            },
                            hpp_chezheng: {
                                audio: 'nzry_zhizheng',
                                mod: {
                                    playerEnabled: function (card, player, target) {
                                        if (target != player && card.name == 'sha' && player.isPhaseUsing() && !target.inRange(player)) return false;
                                    },
                                },
                                trigger: { player: 'phaseUseEnd' },
                                forced: true,
                                content: function () {
                                    var num = game.countPlayer(function (current) {
                                        if (current == player) return false;
                                        return !current.inRange(player);
                                    });
                                    player.draw(Math.max(2, num));
                                },
                            },
                            hpp_lijun: {
                                unique: true,
                                audio: 'nzry_lijun1',
                                trigger: { global: 'useCardAfter' },
                                filter: function (event, player) {
                                    if (event.card.name != 'sha' || event.player.group != 'wu') return false;
                                    if (!event.player.isPhaseUsing() || event.player == player) return false;
                                    if (player.hasSkill('hpp_lijun_used')) return false;
                                    return player.hasZhuSkill('hpp_lijun');
                                },
                                zhuSkill: true,
                                forced: true,
                                locked: false,
                                content: function () {
                                    'step 0'
                                    player.addTempSkill('hpp_lijun_used', 'phaseUseAfter');
                                    player.draw();
                                    player.chooseBool().set('prompt', '立军：是否令' + get.translation(trigger.player) + '摸一张牌？').set('choice', get.attitude(player, trigger.player) > 0);
                                    'step 1'
                                    if (result.bool) {
                                        player.line(trigger.player);
                                        trigger.player.draw();
                                    }
                                },
                                subSkill: { used: { charlotte: true } },
                            },

                            // 孙权
                            hpp_zhiheng: {
                                audio: 'rezhiheng',
                                audioname: ['shen_caopi'],
                                enable: 'phaseUse',
                                usable: 3,
                                filter: function (event, player) {
                                    if (player.getStat('skill').hpp_zhiheng == 1) {
                                        return !player.storage.zhihengDelay;
                                    } else if (player.getStat('skill').hpp_zhiheng == 2) {
                                        return !player.storage.zhihengNotBasic;
                                    } else {
                                        player.storage.zhihengDelay = false;
                                        player.storage.zhihengNotBasic = false;
                                    }
                                    return true;
                                },
                                position: 'he',
                                filterCard: lib.filter.cardDiscardable,
                                discard: false,
                                lose: false,
                                delay: false,
                                selectCard: [1, Infinity],
                                check: function (card) {
                                    var player = _status.event.player;
                                    if (get.position(card) == 'h' && !player.countCards('h', 'du') && (player.hp > 2 || !player.countCards('h', function (card) {
                                        return get.value(card) >= 8;
                                    }))) {
                                        return 1;
                                    }
                                    return 6 - get.value(card)
                                },
                                content: function () {
                                    'step 0'
                                    player.discard(cards);
                                    event.num = 1;
                                    var hs = player.getCards('h');
                                    if (!hs.length) event.num = 0;
                                    for (var i = 0; i < hs.length; i++) {
                                        if (!cards.contains(hs[i])) {
                                            event.num = 0; break;
                                        }
                                    }
                                    'step 1'
                                    player.draw(event.num + cards.length);
                                    'step 2'
                                    if (player.getStat('skill').hpp_zhiheng != undefined) {
                                        if (player.getStat('skill').hpp_zhiheng == 1) {
                                            player.storage.zhihengDelay = false;
                                            player.storage.zhihengNotBasic = false;
                                            for (i of result) {
                                                if (get.type(i) == 'delay') {
                                                    player.storage.zhihengDelay = true;
                                                    player.storage.zhihengNotBasic = false;
                                                }
                                            }
                                        } else if (player.getStat('skill').hpp_zhiheng == 2) {
                                            player.storage.zhihengDelay = false;
                                            player.storage.zhihengNotBasic = false;
                                            for (i of result) {
                                                if (get.type(i) != 'basic') {
                                                    player.storage.zhihengNotBasic = true;
                                                    player.storage.zhihengDelay = false;
                                                }
                                            }
                                        }
                                    }
                                },
                                subSkill: {
                                },
                                ai: {
                                    order: 1,
                                    result: {
                                        player: 1
                                    },
                                    threaten: 2.55
                                },
                            },
                            hpp_jiuyuan: {
                                group: 'hpp_jiuyuan_tao',
                                audio: 'rejiuyuan',
                                zhuSkill: true,
                                trigger: { global: 'recoverBefore' },
                                direct: true,
                                filter: function (event, player) {
                                    return event.player.group == 'wu' && event.getParent().name != 'hpp_jiuyuan' && player != event.player
                                        && player.hasZhuSkill('hpp_jiuyuan', event.player) && event.player == _status.currentPhase;
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
                                            if (!player.isDying()) return false;
                                            return true;
                                        },
                                        content: function () {
                                            trigger.baseDamage++;
                                        },
                                    },
                                },
                            },

                            // 王平
                            hpp_feijun: {
                                intro: { content: '已对$发动过〖飞军〗' },
                                audio: 'nzry_feijun',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    if (!player.countCards('he')) return false;
                                    return game.hasPlayer(function (current) {
                                        if (current == player) return false;
                                        return current.countCards('he');
                                    });
                                },
                                usable: 1,
                                chooseButton: {
                                    dialog: function (event, player) {
                                        var dialog = ui.create.dialog('飞军：弃置一张牌，然后…', 'hidden');
                                        dialog.add([[
                                            ['give', '令一名有牌的其他角色交给你一张牌'],
                                            ['discard', '令一名装备区有牌的其他角色弃置一张装备区里的牌']
                                        ], 'textbutton']);
                                        return dialog;
                                    },
                                    /*
                                    //手搓一个框用来对比一下
                                    dialog:function(event,player){
                                    var list=[
                                    '令一名有牌的其他角色交给你一张牌',
                                    '令一名装备区有牌的其他角色弃置一张装备区里的牌',
                                    ];
                                    var buttons=['give','discard'];
                                    var choiceList=ui.create.dialog('飞军：弃置一张牌，然后…','forcebutton','hidden');
                                    for(var i=0;i<list.length;i++){
                                    var str='<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                                    var bool=lib.skill.hpp_feijun.chooseButton.filter({link:buttons[i]},player);
                                    if(!bool) str+='<div style="opacity:0.5">';
                                    str+=list[i];
                                    if(!bool) str+='</div>';
                                    str+='</div>';
                                    var next=choiceList.add(str);
                                    next.firstChild.addEventListener(lib.config.touchscreen?'touchend':'click',ui.click.button);
                                    next.firstChild.link=buttons[i];
                                    for(var j in lib.element.button){
                                    next[j]=lib.element.button[j];
                                    }
                                    choiceList.buttons.add(next.firstChild);
                                    }
                                    return choiceList;
                                    },
                                    */
                                    filter: function (button, player) {
                                        if (button.link == 'discard') return game.hasPlayer(function (current) {
                                            if (current == player) return false;
                                            return current.countCards('e');
                                        });
                                        return true;
                                    },
                                    check: function (button, player) {
                                        if (button.link == 'discard') return 1;
                                        return 2;
                                    },
                                    backup: function (links) {
                                        return get.copy(lib.skill['hpp_feijun_' + links[0]]);
                                    },
                                    prompt: () => '',
                                    prompt: function (links) {
                                        if (links[0] == 'damage') return '弃置一张牌，令一名有牌的其他角色交给你一张牌';
                                        return '弃置一张牌，令一名装备区有牌的其他角色弃置一张装备区的牌';
                                    },
                                },
                                ai: {
                                    order: 9,
                                    result: { player: 1 },
                                },
                                subSkill: {
                                    backup: { audio: 'nzry_feijun' },
                                    give: {
                                        audio: 'nzry_feijun',
                                        filterTarget: function (card, player, target) {
                                            if (target == player) return false;
                                            return target.countCards('he');
                                        },
                                        filterCard: true,
                                        position: 'he',
                                        content: function () {
                                            'step 0'
                                            if (!player.getStorage('hpp_feijun').contains(target)) event._wechatbinglve = true;
                                            if (player.hasSkill('hpp_binglue')) {
                                                player.logSkill('hpp_binglue');
                                                player.draw();
                                                var list = player.getStorage('hpp_feijun');
                                                if (!list.contains(target)) {
                                                    player.draw(list.filter(function (i) {
                                                        return i.isAlive();
                                                    }).length + 1);
                                                }
                                            }
                                            'step 1'
                                            player.markAuto('hpp_feijun', [target]);
                                            target.chooseCard('he', true, '飞军：请交给' + get.translation(player) + '一张牌').set('ai', function (card) {
                                                return -get.value(card);
                                            });
                                            'step 2'
                                            if (result.bool) player.gain(result.cards, target, 'giveAuto');
                                        },
                                        ai: {
                                            result: {
                                                player: function (player, target) {
                                                    var list = player.getStorage('hpp_feijun');
                                                    return get.effect(target, { name: 'shunshou_copy2' }, player, player) * (list.contains(target) ? 1 : 3);
                                                },
                                            },
                                        },
                                    },
                                    discard: {
                                        audio: 'nzry_feijun',
                                        filterTarget: function (card, player, target) {
                                            if (target == player) return false;
                                            return target.countCards('e');
                                        },
                                        filterCard: true,
                                        position: 'he',
                                        content: function () {
                                            'step 0'
                                            if (!player.getStorage('hpp_feijun').contains(target)) event._wechatbinglve = true;
                                            if (player.hasSkill('hpp_binglue')) {
                                                player.logSkill('hpp_binglue');
                                                player.draw();
                                                var list = player.getStorage('hpp_feijun');
                                                if (!list.contains(target)) {
                                                    player.draw(list.filter(function (i) {
                                                        return i.isAlive();
                                                    }).length + 1);
                                                }
                                            }
                                            'step 1'
                                            player.markAuto('hpp_feijun', [target]);
                                            target.chooseToDiscard('e', true, '飞军：请弃置一张装备区的牌');
                                        },
                                        ai: {
                                            result: {
                                                player: function (player, target) {
                                                    var list = player.getStorage('hpp_feijun');
                                                    return get.effect(target, { name: 'guohe_copy2' }, player, player) * (list.contains(target) ? 1 : 3);
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            hpp_binglue: {
                                audio: 'nzry_binglve',
                                locked: true,
                                ai: { combo: 'hpp_feijun' },
                            },

                            // 魏延
                            hpp_kuanggu: {
                                audio: 'kuanggu',
                                trigger: { source: 'damageSource' },
                                frequent: true,
                                content: function () {
                                    'step 0'
                                    event.count = trigger.num;
                                    'step 1'
                                    event.count--;
                                    player.chooseDrawRecover(true);
                                    'step 2'
                                    if (event.count > 0) event.goto(1);
                                },
                            },
                            hpp_qimou: {
                                unique: true,
                                limited: true,
                                audio: 'qimou',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return !player.storage.hpp_qimou;
                                },
                                init: function (player) {
                                    player.storage.hpp_qimou = false;
                                },
                                mark: true,
                                intro: { content: 'limited' },
                                skillAnimation: true,
                                animationColor: 'orange',
                                content: function () {
                                    'step 0'
                                    var shas = player.getCards('h', 'sha');
                                    var num;
                                    if (player.hp >= 4 && shas.length >= 3) {
                                        num = 3;
                                    }
                                    else if (player.hp >= 3 && shas.length >= 2) {
                                        num = 2;
                                    }
                                    else {
                                        num = 1
                                    }
                                    var map = {};
                                    var list = [];
                                    for (var i = 1; i <= player.hp; i++) {
                                        var cn = get.cnNumber(i, true);
                                        map[cn] = i;
                                        list.push(cn);
                                    }
                                    event.map = map;
                                    player.awakenSkill('hpp_qimou');
                                    player.storage.hpp_qimou = true;
                                    player.chooseControl(list, function () {
                                        return get.cnNumber(_status.event.goon, true);
                                    }).set('prompt', '奇谋：选择失去任意点体力').set('goon', num);
                                    'step 1'
                                    var num = event.map[result.control] || 1;
                                    player.storage.hpp_qimou2 = num;
                                    player.loseHp(num);
                                    player.draw();
                                    player.addTempSkill('hpp_qimou2');
                                },
                                ai: {
                                    order: 2,
                                    result: {
                                        player: function (player) {
                                            if (player.hp == 1) return 0;
                                            var shas = player.getCards('h', 'sha');
                                            if (!shas.length) return 0;
                                            var card = shas[0];
                                            if (!lib.filter.cardEnabled(card, player)) return 0;
                                            if (lib.filter.cardUsable(card, player)) return 0;
                                            var mindist;
                                            if (player.hp >= 4 && shas.length >= 3) {
                                                mindist = 4;
                                            }
                                            else if (player.hp >= 3 && shas.length >= 2) {
                                                mindist = 3;
                                            }
                                            else {
                                                mindist = 2;
                                            }
                                            if (game.hasPlayer(function (current) {
                                                return (current.hp <= mindist - 1 &&
                                                    get.distance(player, current, 'attack') <= mindist &&
                                                    player.canUse(card, current, false) &&
                                                    get.effect(current, card, player, player) > 0);
                                            })) {
                                                return 1;
                                            }
                                            return 0;
                                        }
                                    }
                                }
                            },
                            hpp_qimou2: {
                                onremove: true,
                                mod: {
                                    cardUsable: function (card, player, num) {
                                        if (typeof player.storage.hpp_qimou2 == 'number' && card.name == 'sha') {
                                            return num + player.storage.hpp_qimou2;
                                        }
                                    },
                                    globalFrom: function (from, to, distance) {
                                        if (typeof from.storage.hpp_qimou2 == 'number') {
                                            return distance - from.storage.hpp_qimou2;
                                        }
                                    },
                                },
                            },

                            // 夏侯惇
                            hpp_qingjian: {
                                audio: 'qingjian',
                                trigger: { player: 'gainAfter' },
                                direct: true,
                                usable: 1,
                                filter: function (event, player) {
                                    if (event.parent.parent.name == 'phaseDraw') return false;
                                    return event.cards && event.cards.length > 0
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseCardTarget({
                                        position: 'he',
                                        filterCard: true,
                                        selectCard: [1, Infinity],
                                        filterTarget: lib.filter.notMe,
                                        ai1: function (card) {
                                            if (get.attitude(_status.event.player, _status.currentPhase) < 0 && _status.currentPhase.needsToDiscard() && card.name != 'du') return -1;
                                            for (var i = 0; i < ui.selected.cards.length; i++) {
                                                if (get.type(ui.selected.cards[i]) == get.type(card) || (ui.selected.cards[i].name == 'du' && card.name != 'du')) return -1;
                                            };
                                            if (card.name == 'du') return 20;
                                            return (_status.event.player.countCards('h') - _status.event.player.hp);
                                        },
                                        ai2: function (target) {
                                            if (get.attitude(_status.event.player, _status.currentPhase) < 0) return -1;
                                            var att = get.attitude(_status.event.player, target);
                                            if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
                                                if (target.hasSkillTag('nodu')) return 0;
                                                return 1 - att;
                                            }
                                            if (target.countCards('h') > _status.event.player.countCards('h')) return 0;
                                            return att - 4;
                                        },
                                        prompt: get.prompt2('hpp_qingjian'),
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0], cards = result.cards;
                                        player.logSkill('hpp_qingjian', target);
                                        target.gain(cards, player, 'giveAuto');
                                        player.draw();
                                    }
                                    else player.storage.counttrigger.hpp_qingjian--;
                                },
                                ai: { expose: 0.3 },
                            },

                            // 小乔
                            hpp_tianxiang: {
                                audio: 'tianxiang',
                                trigger: { player: 'damageBegin3' },
                                direct: true,
                                filter: function (event, player) {
                                    return player.countCards('h', { suit: 'heart' }) > 0 && event.num > 0;
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseCardTarget({
                                        filterCard: function (card, player) {
                                            return get.suit(card) == 'heart' && lib.filter.cardDiscardable(card, player);
                                        },
                                        filterTarget: lib.filter.notMe,
                                        ai1: function (card) {
                                            return 10 - get.value(card);
                                        },
                                        ai2: function (target) {
                                            var att = get.attitude(_status.event.player, target);
                                            return -att;
                                        },
                                        prompt: get.prompt2('hpp_tianxiang')
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill(event.name, result.targets);
                                        trigger.player = result.targets[0];
                                        player.addSkill('hpp_tianxiang2');
                                        player.storage.hpp_tianxiang2 = trigger.player;
                                        player.discard(result.cards[0]);
                                        event.trigger('hpp_tianxiangLose');
                                    }
                                },
                                ai: {
                                    maixie_defend: true,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (player.hasSkillTag('jueqing', false, target)) return;
                                            if (get.tag(card, 'damage') && target.countCards('h') > 1) return 0.7;
                                        },
                                    },
                                    threaten: function (player, target) {
                                        if (target.countCards('h') == 0) return 2;
                                    },
                                },
                            },
                            hpp_tianxiang2: {
                                charlotte: true,
                                onremove: true,
                                trigger: { global: ['damageAfter', 'damageCancelled', 'damageZero'] },
                                filter: function (event, player) {
                                    return event.player == player.storage.hpp_tianxiang2;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var target = player.storage.hpp_tianxiang2;
                                    event.target = target;
                                    player.removeSkill('hpp_tianxiang2');
                                    player.chooseControl().set('choiceList', [
                                        '令' + get.translation(target) + '摸一张牌',
                                        '令' + get.translation(target) + '摸' + get.cnNumber(Math.min(5, target.getDamagedHp())) + '张牌']).set('ai', function () {
                                            return (get.attitude(player, target) > 0 && target.isDamaged()) ? 1 : 0;
                                        });
                                    'step 1'
                                    player.line(target);
                                    target.draw(result.index == 0 ? 1 : Math.min(5, target.getDamagedHp()));
                                },
                            },
                            hpp_hongyan: {
                                audio: 'rehongyan',
                                forced: true,
                                mod: {
                                    suit: function (card, suit) {
                                        if (suit == 'spade') return 'heart';
                                    },
                                    maxHandcardBase: function (player, num) {
                                        if (player.countCards('e', function (card) {
                                            return get.suit(card, player) == 'heart';
                                        })) return player.maxHp;
                                    },
                                },
                            },

                            // 许诸
                            hpp_luoyi: {
                                audio: 'reluoyi',
                                trigger: { player: 'phaseDrawBegin2' },
                                check: function (event, player) {
                                    if (player.countCards('h') < 3) return false;
                                    if (!player.hasSha()) return false;
                                    return game.hasPlayer(function (current) {
                                        return get.attitude(player, current) < 0 && player.canUse('sha', current);
                                    });
                                },
                                preHidden: true,
                                filter: function (event, player) {
                                    return !event.numFixed && event.num > 0;
                                },
                                content: function () {
                                    player.addTempSkill('hpp_luoyi2');
                                    trigger.num--;
                                }
                            },
                            hpp_luoyi2: {
                                trigger: { source: 'damageBegin1' },
                                filter: function (event) {
                                    return event.card && (event.card.name == 'sha' || event.card.name == 'juedou') && event.notLink();
                                },
                                forced: true,
                                content: function () {
                                    trigger.num++;
                                },
                                ai: {
                                    damageBonus: true
                                }
                            },
                            hpp_huchi: {
                                group: ['hpp_huchi_miss', 'hpp_huchi_draw'],
                                audio: 'hpphuchi',
                                trigger: { player: 'phaseJieshuBegin' },
                                frequent: true,
                                prompt: '是否发动【虎痴】，将手牌摸至两张？',
                                filter: function (event, player) {
                                    return player.countCards('h') < 2;
                                },
                                content: function () {
                                    player.drawTo(2);
                                },
                                marktext: '痴',
                                intro: { name: '虎痴', name2: '痴', content: 'mark' },
                                subSkill: {
                                    miss: {
                                        shaRelated: true,
                                        audio: 'hpp_huchi',
                                        trigger: { player: 'shaMiss' },
                                        forced: true,
                                        locked: false,
                                        content: function () {
                                            player.addMark('hpp_huchi', 1);
                                        },
                                    },
                                    draw: {
                                        audio: 'hpp_huchi',
                                        enable: 'phaseUse',
                                        filter: function (event, player) {
                                            return player.countMark('hpp_huchi');
                                        },
                                        usable: 1,
                                        content: function () {
                                            var num = player.countMark('hpp_huchi');
                                            player.removeMark('hpp_huchi', num);
                                            player.draw(num);
                                        },
                                        ai: {
                                            order: 1,
                                            result: { player: 1 },
                                        },
                                    },
                                },
                            },

                            // 于吉
                            hpp_guhuo: {
                                audio: 'guhuo_guess',
                                trigger: { player: 'useCardAfter' },
                                frequent: true,
                                filter: function (event, player) {
                                    var bool = game.hasPlayer(function (current) {
                                        return current.getHistory('damage', function (evt) {
                                            return evt.card && evt.card == event.card;
                                        }).length;
                                    });
                                    if (bool && player.hasSkill('hpp_guhuo_silent')) return false;
                                    if (get.type(event.card) != 'trick' && event.card.name != 'sha') return false;
                                    if (!get.tag(event.card, 'damage')) return false;
                                    return true;
                                },
                                content: function () {
                                    var bool = game.hasPlayer(function (current) {
                                        return current.getHistory('damage', function (evt) {
                                            return evt.card && evt.card == trigger.card;
                                        }).length;
                                    }), cards = trigger.cards.filterInD();
                                    if (!bool && cards.length) {
                                        player.addTempSkill('hpp_guhuo_card', { player: 'hpp_guhuo_cardAfter' });
                                        game.cardsGotoSpecial(cards);
                                        player.storage.hpp_guhuo_card.addArray(cards);
                                        game.log(player, '将', trigger.cards, '移出了游戏');
                                    }
                                    else player.addTempSkill('hpp_guhuo_silent');
                                    player.draw();
                                },
                                subSkill: {
                                    silent: { charlotte: true },
                                    card: {
                                        charlotte: true,
                                        init: function (player) {
                                            if (!player.storage.hpp_guhuo_card) player.storage.hpp_guhuo_card = [];
                                        },
                                        onremove: true,
                                        audio: 'guhuo_guess',
                                        trigger: { global: 'phaseEnd' },
                                        filter: function (event, player) {
                                            return player.storage.hpp_guhuo_card.length;
                                        },
                                        forced: true,
                                        content: function () {
                                            'step 0'
                                            var cards = player.storage.hpp_guhuo_card;
                                            player.gain(cards);
                                            player.$gain2(cards, false);
                                            game.log(cards, '重新加入游戏');
                                            'step 1'
                                            player.storage.hpp_guhuo_card = [];
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

                            // 张角
                            hpp_leiji: {
                                mod: {
                                    maxHandcard: function (player, num) {
                                        return num + 2;
                                    },
                                },
                                audio: 'releiji',
                                trigger: { player: ['useCard'] },
                                filter: function (event, player) {
                                    return event.card.name == 'shan' || event.card.name == 'shandian';
                                },
                                direct: true,
                                content: function () {
                                    'step 0';
                                    player.chooseTarget(get.prompt('hpp_leiji'), '令一名其他角色进行判定', lib.filter.notMe).set('ai', function (target) {
                                        if (target.hasSkill('hongyan')) return 0;
                                        return get.damageEffect(target, _status.event.player, _status.event.player);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_leiji', result.targets);
                                        event.target = result.targets[0];
                                        event.target.judge(function (card) {
                                            var suit = get.suit(card);
                                            if (suit == 'spade') return -4;
                                            if (suit == 'club') return -2;
                                            return 0;
                                        }).judge2 = function (result) {
                                            return result.bool == false ? true : false;
                                        };
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (result.suit == 'club') {
                                        target.damage();
                                        player.recover();
                                    }
                                    else if (result.suit == 'spade') target.damage(2);
                                },
                                ai: {
                                    useShan: true,
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (get.tag(card, 'respondShan') && !player.hasSkillTag('directHit_ai', true, {
                                                target: target,
                                                card: card,
                                            }, true)) {
                                                var hastarget = game.hasPlayer(function (current) {
                                                    return get.attitude(target, current) < 0;
                                                });
                                                var be = target.countCards('e', { color: 'black' });
                                                if (target.countCards('h', 'shan') && be) {
                                                    if (!target.hasSkill('hpp_guidao')) return 0;
                                                    return [0, hastarget ? target.countCards('he') / 2 : 0];
                                                }
                                                if (target.countCards('h', 'shan') && target.countCards('h') > 2) {
                                                    if (!target.hasSkill('hpp_guidao')) return 0;
                                                    return [0, hastarget ? target.countCards('h') / 4 : 0];
                                                }
                                                if (target.countCards('h') > 3 || (be && target.countCards('h') >= 2)) {
                                                    return [0, 0];
                                                }
                                                if (target.countCards('h') == 0) {
                                                    return [1.5, 0];
                                                }
                                                if (target.countCards('h') == 1 && !be) {
                                                    return [1.2, 0];
                                                }
                                                if (!target.hasSkill('hpp_guidao')) return [1, 0.05];
                                                return [1, Math.min(0.5, (target.countCards('h') + be) / 4)];
                                            }
                                        },
                                    },
                                },
                            },
                            hpp_guidao: {
                                audio: 'xinguidao',
                                trigger: { global: 'judge' },
                                filter: function (event, player) {
                                    return player.countCards('hes', { color: 'black' }) > 0;
                                },
                                direct: true,
                                content: function () {
                                    "step 0"
                                    player.chooseCard(get.translation(trigger.player) + '的' + (trigger.judgestr || '') + '判定为' +
                                        get.translation(trigger.player.judging[0]) + '，' + get.prompt('hpp_guidao'), 'hes', function (card) {
                                            if (get.color(card) != 'black') return false;
                                            var player = _status.event.player;
                                            var mod2 = game.checkMod(card, player, 'unchanged', 'cardEnabled2', player);
                                            if (mod2 != 'unchanged') return mod2;
                                            var mod = game.checkMod(card, player, 'unchanged', 'cardRespondable', player);
                                            if (mod != 'unchanged') return mod;
                                            return true;
                                        }).set('ai', function (card) {
                                            var trigger = _status.event.getTrigger();
                                            var player = _status.event.player;
                                            var judging = _status.event.judging;
                                            var result = trigger.judge(card) - trigger.judge(judging);
                                            var attitude = get.attitude(player, trigger.player);
                                            if (attitude == 0 || result == 0) {
                                                if (trigger.player != player) return 0;
                                                if (game.hasPlayer(function (current) {
                                                    return get.attitude(player, current) < 0;
                                                })) {
                                                    var checkx = lib.skill.xinleiji.judgeCheck(card, true) - lib.skill.xinleiji.judgeCheck(judging);
                                                    if (checkx > 0) return checkx;
                                                }
                                                return 0;
                                            };
                                            if (attitude > 0) {
                                                return result;
                                            }
                                            else {
                                                return -result;
                                            }
                                        }).set('judging', trigger.player.judging[0]);
                                    "step 1"
                                    if (result.bool) {
                                        player.respond(result.cards, 'highlight', 'hpp_guidao', 'noOrdering');
                                    }
                                    else {
                                        event.finish();
                                    }
                                    "step 2"
                                    if (result.bool) {
                                        player.$gain2(trigger.player.judging[0]);
                                        player.gain(trigger.player.judging[0]);
                                        var card = result.cards[0];
                                        if (get.suit(card) == 'spade' && get.number(card) > 1 && get.number(card) < 10) player.draw('nodelay');
                                        trigger.player.judging[0] = result.cards[0];
                                        trigger.orderingCards.addArray(result.cards);
                                        game.log(trigger.player, '的判定牌改为', result.cards[0]);
                                    }
                                    "step 3"
                                    game.delay(2);
                                },
                                ai: {
                                    rejudge: true,
                                    tag: {
                                        rejudge: 1
                                    }
                                }
                            },
                            hpp_huangtian: {
                                audio: 'huangtian2',
                                unique: true,
                                zhuSkill: true,
                                global: 'hpp_huangtian2',
                                group: 'hpp_huangtian4',
                            },
                            hpp_huangtian2: {
                                audio: 'huangtian2',
                                enable: 'phaseUse',
                                discard: false,
                                lose: false,
                                delay: false,
                                line: true,
                                direct: true,
                                clearTime: true,
                                prepare: function (cards, player, targets) {
                                    targets[0].logSkill('hpp_huangtian');
                                },
                                prompt: function () {
                                    var player = _status.event.player;
                                    var list = game.filterPlayer(function (target) {
                                        return target != player && target.hasZhuSkill('hpp_huangtian', player);
                                    });
                                    var str = '将一张【闪】或【闪电】或黑桃手牌交给' + get.translation(list);
                                    if (list.length > 1) str += '中的一人';
                                    return str;
                                },
                                filter: function (event, player) {
                                    if (player.group != 'qun') return false;
                                    if (player.countCards('h', { name: ['shan', 'shandian'] }) + player.countCards('h', { suit: 'spade' }) == 0) return false;
                                    return game.hasPlayer(function (target) {
                                        return target != player && target.hasZhuSkill('hpp_huangtian', player) && !target.hasSkill('hpp_huangtian3');
                                    });
                                },
                                filterCard: function (card) {
                                    return card.name == 'shan' || card.name == 'shandian' || get.suit(card) == 'spade';
                                },
                                log: false,
                                visible: true,
                                filterTarget: function (card, player, target) {
                                    return target != player && target.hasZhuSkill('hpp_huangtian', player) && !target.hasSkill('hpp_huangtian3');
                                },
                                content: function () {
                                    target.gain(cards, player, 'giveAuto');
                                    target.addTempSkill('hpp_huangtian3', 'phaseUseEnd');
                                },
                                ai: {
                                    expose: 0.3,
                                    order: 10,
                                    result: { target: 1 },
                                },
                            },
                            hpp_huangtian3: {},
                            hpp_huangtian4: {
                                audio: 'huangtian2',
                                frequent: true,
                                trigger: { global: ['useCardAfter', 'responseAfter'] },
                                filter: function (event, player) {
                                    return event.player != player && event.card.isCard && event.card.name == 'shan' && event.cards.filterInD().length > 0 && event.player.group == 'qun' && player.hasZhuSkill('hpp_huangtian');
                                },
                                prompt2: function (event, player) {
                                    return '获得' + get.translation(event.cards.filterInD());
                                },
                                usable: 1,
                                logTarget: 'player',
                                content: function () {
                                    player.gain(trigger.cards.filterInD(), 'gain2');
                                },
                            },

                            // 张辽
                            hpp_zhengbing: {
                                audio: 'hppzhengbing',
                                mod: {
                                    ignoredHandcard: function (card, player) {
                                        if (card.hasGaintag('hpp_zhengbing')) return true;
                                    },
                                    cardDiscardable: function (card, player, name) {
                                        if (name == 'phaseDiscard' && card.hasGaintag('hpp_zhengbing')) return false;
                                    },
                                },
                                group: 'hpp_zhengbing_mark',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('h', function (card) {
                                        return card.hasGaintag('hpp_zhengbing');
                                    });
                                },
                                filterCard: function (card) {
                                    return card.hasGaintag('hpp_zhengbing');
                                },
                                check: function (card) {
                                    return 7 - get.value(card);
                                },
                                prepare: function (cards, player) {
                                    player.$throw(cards, 1000);
                                    game.log(player, '将', cards, '置入了弃牌堆');
                                },
                                discard: false,
                                loseTo: 'discardPile',
                                visible: true,
                                delay: 0.5,
                                content: function () {
                                    player.draw(player.countCards('h', function (card) {
                                        return card.hasGaintag('hpp_zhengbing');
                                    }) ? 1 : 2);
                                },
                                ai: {
                                    order: 10,
                                    result: { player: 1 },
                                },
                                subSkill: {
                                    mark: {
                                        charlotte: true,
                                        trigger: { player: 'gainBegin' },
                                        filter: function (event, player) {
                                            return lib.translate[event.getParent(3).name] == '突袭';
                                        },
                                        direct: true,
                                        firstDo: true,
                                        content: function () {
                                            trigger.gaintag.add('hpp_zhengbing');
                                        },
                                    },
                                },
                            },

                            // 张松
                            hpp_xiantu: {
                                audio: 'xiantu1',
                                trigger: { global: 'phaseUseBegin' },
                                filter: function (event, player) {
                                    return event.player != player;
                                },
                                logTarget: 'player',
                                check: function (event, player) {
                                    if (get.attitude(player, event.player) < 3) return false;
                                    if (event.player.getStat('damage')) return true;
                                    if (player.maxHp - player.hp >= 2) return false;
                                    return true;
                                },
                                content: function () {
                                    'step 0'
                                    player.draw(2);
                                    'step 1'
                                    player.chooseCard(2, 'he', true, '交给' + get.translation(trigger.player) + '两张牌').set('ai', function (card) {
                                        if (ui.selected.cards.length && card.name == ui.selected.cards[0].name) return -1;
                                        if (get.tag(card, 'damage')) return 1;
                                        if (get.type(card) == 'equip') return 1;
                                        return 0;
                                    });
                                    'step 2'
                                    trigger.player.gain(result.cards, player, 'giveAuto');
                                    var evt = _status.event.getParent('phaseUse');
                                    if (evt && evt.name == 'phaseUse' && !evt.hpp_xiantu) {
                                        var next = game.createEvent('hpp_xiantu_clear');
                                        _status.event.next.remove(next);
                                        evt.after.push(next);
                                        evt.hpp_xiantu = true;
                                        next.player = player;
                                        next.target = trigger.player;
                                        next.setContent(function () {
                                            if (player.isAlive() && !target.getStat('damage')) {
                                                player.logSkill('xiantu2');
                                                player.loseHp();
                                            }
                                        });
                                    }
                                },
                                ai: { expose: 0.3 },
                            },

                            // 张昭张纮
                            hpp_zhijian: {
                                audio: 'zhijian',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('h', { type: 'equip' }) > 0;
                                },
                                filterCard: function (card) {
                                    return get.type(card) == 'equip';
                                },
                                check: function (card) {
                                    var player = _status.currentPhase;
                                    if (player.countCards('he', { subtype: get.subtype(card) }) > 1) {
                                        return 11 - get.equipValue(card);
                                    }
                                    return 6 - get.value(card);
                                },
                                filterTarget: function (card, player, target) {
                                    if (target.isMin()) return false;
                                    var type = get.subtype(card);
                                    // return player!=target&&target.isEmpty(type);
                                    return player != target;
                                },
                                content: function () {
                                    target.equip(cards[0]);
                                    player.draw();
                                },
                                discard: false,
                                prepare: function (cards, player, targets) {
                                    player.$give(cards, targets[0], false);
                                },
                                ai: {
                                    basic: {
                                        order: 10
                                    },
                                    result: {
                                        target: function (player, target) {
                                            var card = ui.selected.cards[0];
                                            if (card) return get.effect(target, card, target, target);
                                            return 0;
                                        },
                                    },
                                    threaten: 1.3
                                }
                            },
                            hpp_guzheng: {
                                audio: 'guzheng',
                                trigger: { global: 'phaseDiscardAfter' },
                                filter: function (event, player) {
                                    if (event.player != player && event.player.isIn()) {
                                        return event.player.getHistory('lose', function (evt) {
                                            return evt.type == 'discard' && evt.getParent('phaseDiscard') == event && evt.hs.filterInD('d').length > 0;
                                        }).length > 0;
                                    }
                                    return false;
                                },
                                checkx: function (event, player, cards, cards2) {
                                    if (cards.length > 2 || get.attitude(player, event.player) > 0) return true;
                                    for (var i = 0; i < cards2.length; i++) {
                                        if (get.value(cards2[i], event.player, 'raw') < 0) return true;
                                    }
                                    return false;
                                },
                                direct: true,
                                preHidden: true,
                                content: function () {
                                    'step 0'
                                    var cards = [];
                                    var cards2 = [];
                                    game.getGlobalHistory('cardMove', function (evt) {
                                        if (evt.name == 'cardsDiscard' && evt.getParent('phaseDiscard') == trigger) cards.addArray(evt.cards.filterInD('d'));
                                    });
                                    game.countPlayer2(function (current) {
                                        current.getHistory('lose', function (evt) {
                                            if (evt.type != 'discard' || evt.getParent('phaseDiscard') != trigger) return;
                                            cards.addArray(evt.cards.filterInD('d'));
                                            if (current == trigger.player) cards2.addArray(evt.hs.filterInD('d'));
                                        })
                                    });
                                    event.cards = cards;
                                    var check = lib.skill.hpp_guzheng.checkx(trigger, player, cards, cards2);
                                    player.chooseCardButton(cards, '固政：选择令' + get.translation(trigger.player) + '收回的牌').set('ai', function (button) {
                                        if (_status.event.check) {
                                            return 20 - get.value(button.link, _status.event.getTrigger().player);
                                        }
                                        return 0;
                                    }).set('check', check).set('cards', cards2).set('filterButton', function (button) {
                                        return _status.event.cards.contains(button.link);
                                    }).setHiddenSkill(event.name);
                                    'step 1'
                                    if (result.bool) {
                                        game.delay(0.5);
                                        player.logSkill('hpp_guzheng', trigger.player);
                                        trigger.player.gain(result.links[0]);
                                        trigger.player.$gain2(result.links[0]);
                                        game.log(trigger.player, '收回了', result.links[0]);
                                        event.cards.remove(result.links[0]);
                                        if (event.cards.length) {
                                            player.gain(event.cards);
                                            player.$gain2(event.cards);
                                            game.log(player, '收回了', event.cards);
                                        }
                                        else player.draw();
                                        game.delay();
                                    }
                                },
                                ai: { expose: 0.2 },
                            },

                            // 赵云
                            hpp_longdan: {
                                audio: 'longdan_sha',
                                audioname: ['re_zhaoyun'],
                                group: ['hpp_longdan_sha', 'hpp_longdan_shan', 'hpp_longdan_draw'],
                                subSkill: {
                                    draw: {
                                        trigger: { player: ['useCard', 'respond'] },
                                        forced: true,
                                        popup: false,
                                        filter: function (event, player) {
                                            if (!get.zhu(player, 'shouyue')) return false;
                                            return event.skill == 'hpp_longdan_sha' || event.skill == 'hpp_longdan_shan';
                                        },
                                        content: function () {
                                            player.draw();
                                            player.storage.fanghun2++;
                                        }
                                    },
                                    sha: {
                                        audio: 'longdan_sha',
                                        audioname: ['re_zhaoyun'],
                                        enable: ['chooseToUse', 'chooseToRespond'],
                                        filterCard: { name: 'shan' },
                                        viewAs: { name: 'sha' },
                                        viewAsFilter: function (player) {
                                            if (!player.countCards('hs', 'shan')) return false;
                                        },
                                        position: 'hs',
                                        prompt: '将一张闪当杀使用或打出',
                                        check: function () { return 1 },
                                        ai: {
                                            effect: {
                                                target: function (card, player, target, current) {
                                                    if (get.tag(card, 'respondSha') && current < 0) return 0.6
                                                }
                                            },
                                            respondSha: true,
                                            skillTagFilter: function (player) {
                                                if (!player.countCards('hs', 'shan')) return false;
                                            },
                                            order: function () {
                                                return get.order({ name: 'sha' }) + 0.1;
                                            },
                                            useful: -1,
                                            value: -1
                                        }
                                    },
                                    shan: {
                                        audio: 'longdan_sha',
                                        audioname: ['re_zhaoyun'],
                                        enable: ['chooseToRespond', 'chooseToUse'],
                                        filterCard: { name: 'sha' },
                                        viewAs: { name: 'shan' },
                                        prompt: '将一张杀当闪使用或打出',
                                        check: function () { return 1 },
                                        position: 'hs',
                                        viewAsFilter: function (player) {
                                            if (!player.countCards('hs', 'sha')) return false;
                                        },
                                        ai: {
                                            respondShan: true,
                                            skillTagFilter: function (player) {
                                                if (!player.countCards('hs', 'sha')) return false;
                                            },
                                            effect: {
                                                target: function (card, player, target, current) {
                                                    if (get.tag(card, 'respondShan') && current < 0) return 0.6
                                                }
                                            },
                                            order: 4,
                                            useful: -1,
                                            value: -1
                                        }
                                    }
                                }
                            },
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
                                        // forced: true,
                                        // charlotte: true,
                                        // onremove: true,
                                        frequent: true,
                                        content: function () {
                                            player.draw();
                                        },
                                    },
                                },
                            },

                            // 甄姬
                            hpp_luoshen: {
                                audio: 'luoshen',
                                trigger: { player: 'phaseZhunbeiBegin' },
                                frequent: true,
                                content: function () {
                                    'step 0'
                                    var next = player.judge(function (card) {
                                        if (get.color(card) == 'black') return 1;
                                        return -1;
                                    });
                                    next.set('callback', function () {
                                        if (get.position(card, true) == 'o') player.gain(card, 'gain2');
                                    });
                                    'step 1'
                                    if (result.judge > 0) player.chooseBool('是否再次发动【洛神】？').set('frequentSkill', 'hpp_luoshen');
                                    else event.finish();
                                    'step 2'
                                    if (result.bool) event.goto(0);
                                },
                            },

                            // 钟繇
                            hpp_huomo: {
                                audio: 'huomo',
                                enable: 'chooseToUse',
                                hiddenCard: function (player, name) {
                                    return get.type(name) == 'basic' && player.hasCard(function (card) {
                                        return get.color(card) == 'black' && get.type(card) != 'basic';
                                    }, 'he');
                                },
                                filter: function (event, player) {
                                    for (var i of lib.inpile) {
                                        if (get.type(i) != 'basic') continue;
                                        if (event.filterCard({ name: i }, player, event)) {
                                            return player.hasCard(function (card) {
                                                return get.color(card) == 'black' && get.type(card) != 'basic';
                                            }, 'he');
                                        }
                                    }
                                    return false;
                                },
                                usable: 2,
                                chooseButton: {
                                    dialog: function (event, player) {
                                        var list = [];
                                        for (var i of lib.inpile) {
                                            if (get.type(i) != 'basic') continue;
                                            if (event.filterCard({ name: i }, player, event)) {
                                                list.push(['基本', '', i]);
                                                if (i == 'sha') for (var j of lib.inpile_nature) list.push(['基本', '', i, j]);
                                            }
                                        }
                                        return ui.create.dialog('活墨', [list, 'vcard'], 'hidden');
                                    },
                                    check: function (button) {
                                        var player = _status.event.player;
                                        var card = { name: button.link[2], nature: button.link[3] };
                                        if (game.hasPlayer(function (current) {
                                            return player.canUse(card, current) && get.effect(current, card, player, player) > 0;
                                        })) {
                                            switch (button.link[2]) {
                                                case 'tao': return 5;
                                                case 'jiu': return 3.01;
                                                case 'shan': return 3.01;
                                                case 'sha':
                                                    if (button.link[3] == 'fire') return 2.95;
                                                    else if (button.link[3] == 'fire') return 2.92;
                                                    else return 2.9;
                                            }
                                        }
                                        return 0;
                                    },
                                    backup: function (links, player) {
                                        return {
                                            check: function (card) {
                                                return 1 / Math.max(0.1, get.value(card));
                                            },
                                            filterCard: function (card) {
                                                return get.type(card) != 'basic' && get.color(card) == 'black';
                                            },
                                            viewAs: {
                                                name: links[0][2],
                                                nature: links[0][3],
                                                suit: 'none',
                                                number: null,
                                                isCard: true,
                                            },
                                            position: 'he',
                                            popname: true,
                                            ignoreMod: true,
                                            precontent: function () {
                                                'step 0'
                                                player.logSkill('hpp_huomo');
                                                var card = event.result.cards[0];
                                                event.card = card;
                                                player.$throw(card, 1000);
                                                game.log(player, '将', card, '置于牌堆顶');
                                                event.result.card = { name: event.result.card.name, nature: event.result.card.nature };
                                                event.result.cards = [];
                                                player.lose(card, ui.cardPile, 'visible', 'insert');
                                                'step 1'
                                                game.delay();
                                            },
                                        }
                                    },
                                    prompt: function (links, player) {
                                        return '将一张黑色非基本牌置于牌堆顶并视为使用一张' + get.translation(links[0][3] || '') + get.translation(links[0][2]);
                                    }
                                },
                                ai: {
                                    order: function () {
                                        var player = _status.event.player;
                                        var event = _status.event;
                                        if (event.filterCard({ name: 'jiu' }, player, event) && get.effect(player, { name: 'jiu' }) > 0) {
                                            return 3.1;
                                        }
                                        return 2.9;
                                    },
                                    respondSha: true,
                                    fireAttack: true,
                                    respondShan: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (player.hasCard(function (card) {
                                            return get.color(card) == 'black' && get.type(card) != 'basic';
                                        }, 'he')) {
                                            if (tag == 'respondSha' || tag == 'respondShan') {
                                                if (arg != 'use') return false;
                                            }
                                            return true;
                                        }
                                        else return false;
                                    },
                                    result: {
                                        player: 1
                                    },
                                },
                            },
                            hpp_zuoding: {
                                audio: 'zuoding',
                                trigger: { global: 'useCardToPlayered' },
                                filter: function (event, player) {
                                    if (event.getParent().triggeredTargets3.length > 1) return false;
                                    return get.suit(event.card) == 'spade' && _status.currentPhase == event.player && event.targets && event.targets.length && game.countPlayer2(function (current) {
                                        return current.getHistory('damage').length > 0;
                                    }) == 0;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_zuoding'), '令一名目标角色摸一张牌', function (card, player, target) {
                                        return _status.event.targets.contains(target);
                                    }).set('ai', function (target) {
                                        return get.attitude(_status.event.player, target);
                                    }).set('targets', trigger.targets);
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_zuoding', result.targets);
                                        result.targets[0].draw();
                                        if (result.targets[0] != player) player.addExpose(0.2);
                                    }
                                },
                            },

                            // 周瑜
                            reyingzi_re_sunce: { audio: 2 },
                            reyingzi_re_heqi: { audio: 2 },
                            reyingzi_gexuan: { audio: 2 },
                            hpp_yingzi: {
                                audio: 'reyingzi',
                                audioname2: {
                                    hpp_sunce: 'reyingzi_re_sunce',
                                    hpp_heqi: 'reyingzi_re_heqi',
                                    hpp_gexuan: 'reyingzi_gexuan',
                                },
                                trigger: { player: 'phaseDrawBegin2' },
                                forced: true,
                                preHidden: true,
                                filter: function (event, player) {
                                    return !event.numFixed;
                                },
                                content: function () {
                                    trigger.num++;
                                },
                                ai: {
                                    threaten: 1.5
                                },
                                mod: {
                                    maxHandcardBase: function (player, num) {
                                        return player.maxHp;
                                    }
                                }
                            },
                            hpp_fanjian: {
                                audio: 'refanjian',
                                trigger: { player: 'phaseUseBegin' },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt2('hpp_fanjian'), lib.filter.notMe).ai = function (target) {
                                        return get.damageEffect(target, player, player);
                                    };
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.logSkill('hpp_fanjian', target);
                                        target.draw();
                                        target.damage();
                                    }
                                },
                            },

                            // 诸葛亮
                            hpp_guanxing: {
                                audio: 'guanxing',
                                audioname2: { hpp_jiangwei: 'guanxing_ol_jiangwei' },
                                trigger: { player: ['phaseZhunbeiBegin', 'phaseJieshuBegin'] },
                                frequent: true,
                                preHidden: true,
                                content: function () {
                                    var num = Math.min(game.countPlayer() == 2 ? 3 : 5);
                                    player.chooseToGuanxing(num);
                                },
                            },
                            hpp_kongcheng: {
                                mod: {
                                    targetEnabled: function (card, player, target, now) {
                                        if (target.countCards('h') == 0) {
                                            if (card.name == 'sha' || card.name == 'juedou' || card.name == 'shunshou') return false;
                                        }
                                    },
                                },
                                audio: 'kongcheng1',
                                trigger: { player: 'loseEnd' },
                                forced: true,
                                firstDo: true,
                                filter: function (event, player) {
                                    if (player.countCards('h')) return false;
                                    for (var i = 0; i < event.cards.length; i++) {
                                        if (event.cards[i].original == 'h') return true;
                                    }
                                    return false;
                                },
                                content: function () { },
                                ai: {
                                    noh: true,
                                    skillTagFilter: function (player, tag) {
                                        return player.countCards('h') == 1;
                                    },
                                },
                            },

                            // 左慈
                            hpp_shendao: {
                                audio: 'hppshendao',
                                trigger: { player: 'judge' },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var str = '你的' + (trigger.judgestr || '') + '判定牌为' + get.translation(trigger.player.judging[0]) + '，是否修改判定花色？';
                                    player.chooseControl('spade', 'heart', 'diamond', 'club', 'cancel2').set('prompt', str).set('ai', function () {
                                        var judging = _status.event.judging;
                                        var trigger = _status.event.getTrigger();
                                        var res1 = trigger.judge(judging);
                                        var list = lib.suit.slice(0);
                                        var attitude = get.attitude(player, trigger.player);
                                        if (attitude == 0) return 0;
                                        var getj = function (suit) {
                                            return trigger.judge({
                                                name: get.name(judging),
                                                nature: get.nature(judging),
                                                suit: suit,
                                                number: get.number(judging),
                                            })
                                        };
                                        list.sort(function (a, b) {
                                            return (getj(b) - getj(a)) * get.sgn(attitude);
                                        });
                                        if ((getj(list[0]) - res1) * attitude > 0) return list[0];
                                        return 'cancel2';
                                    }).set('judging', trigger.player.judging[0]);
                                    'step 1'
                                    if (result.control != 'cancel2') {
                                        player.logSkill('hpp_shendao');
                                        player.popup(result.control + 2);
                                        game.log(player, '将判定结果改为了', '#y' + get.translation(result.control + 2));
                                        trigger.fixedResult = {
                                            suit: result.control,
                                            color: get.color({ suit: result.control }),
                                        };
                                    }
                                },
                                ai: {
                                    rejudge: true,
                                    tag: {
                                        rejudge: 0.3,
                                    },
                                },
                            },
                            hpp_xinsheng: {
                                audio: 'hppxinsheng',
                                trigger: { player: 'damageEnd' },
                                frequent: true,
                                content: function () {
                                    'step 0'
                                    event.cards = get.cards(3);
                                    game.cardsGotoOrdering(event.cards);
                                    event.videoId = lib.status.videoId++;
                                    game.broadcastAll(function (player, id, cards) {
                                        var str;
                                        if (player == game.me && !_status.auto) str = '新生：获得花色不同的牌各一张';
                                        else str = '新生';
                                        var dialog = ui.create.dialog(str, cards);
                                        dialog.videoId = id;
                                    }, player, event.videoId, event.cards);
                                    event.time = get.utc();
                                    game.addVideo('showCards', player, ['新生', get.cardsInfo(event.cards)]);
                                    game.addVideo('delay', null, 2);
                                    'step 1'
                                    var next = player.chooseButton([0, 3], true);
                                    next.set('dialog', event.videoId);
                                    next.set('filterButton', function (button) {
                                        for (var i = 0; i < ui.selected.buttons.length; i++) {
                                            if (get.suit(ui.selected.buttons[i].link) == get.suit(button.link)) return false;
                                        }
                                        return true;
                                    });
                                    next.set('ai', function (button) {
                                        return get.value(button.link, _status.event.player);
                                    });
                                    'step 2'
                                    if (result.bool && result.links) event.cards2 = result.links;
                                    else event.finish();
                                    var time = 1000 - (get.utc() - event.time);
                                    if (time > 0) game.delay(0, time);
                                    'step 3'
                                    game.broadcastAll('closeDialog', event.videoId);
                                    var cards2 = event.cards2;
                                    player.gain(cards2, 'gain2');
                                    'step 4'
                                    var card = get.cardPile(function (card) {
                                        if (name == 'tao') return ['tao', 'zong'].contains(card.name);
                                        if (name == 'jiu') return ['jiu', 'xionghuangjiu'].contains(card.name);
                                        if (name == 'wuzhong') return ['wuzhong', 'zengbin', 'sadouchengbing', 'dongzhuxianji', 'tongzhougongji'].contains(card.name);
                                        return card.name == name;
                                    });
                                    if (card) player.gain(card, 'gain2');
                                },
                            },

                            // SP庞统
                            hpp_guolun: {
                                audio: 'xinfu_guolun',
                                enable: 'phaseUse',
                                usable: 1,
                                filter: function (event, player) {
                                    return player.countCards('h');
                                },
                                filterTarget: function (card, player, target) {
                                    return target != player && target.countCards('h');
                                },
                                content: function () {
                                    'step 0'
                                    player.choosePlayerCard(target, true, 'h');
                                    'step 1'
                                    event.cardt = result.cards[0];
                                    target.showCards(event.cardt);
                                    player.chooseCard('he').set('ai', function (card) {
                                        var event = _status.event.getParent(), player = event.player;
                                        var numt = get.number(event.cardt);
                                        var att = get.attitude(player, target);
                                        var value = get.value(event.cardt);
                                        var num = get.number(card);
                                        if (num < numt || att > 2) return value + 6 - get.value(card);
                                        else if (num == numt) return value - get.value(card);
                                        return -1;
                                    });
                                    'step 2'
                                    if (!result.bool) event.finish();
                                    else {
                                        player.showCards(result.cards);
                                        event.cardp = result.cards[0];
                                    }
                                    'step 3'
                                    var nump = get.number(event.cardp, player);
                                    var numt = get.number(event.cardt, target);
                                    if (nump < numt) {
                                        player.swapHandcards(target, [event.cardp], [event.cardt]);
                                        player.draw(2);
                                    }
                                    else if (nump > numt) {
                                        player.swapHandcards(target, [event.cardp], [event.cardt]);
                                        target.draw();
                                        player.recover();
                                    }
                                },
                                ai: {
                                    order: 8,
                                    result: {
                                        player: function (player, target) {
                                            if (get.attitude(player, target) > 0) return 1.5;
                                            return 0.5;
                                        },
                                    },
                                },
                            },
                            hpp_songsang: {
                                audio: 'xinfu_songsang',
                                trigger: { global: 'dieAfter' },
                                content: function () {
                                    player.gainMaxHp();
                                    player.recover();
                                },
                                ai: {
                                    threaten: 1.5
                                }
                            },
                            hpp_zhanji: {
                                audio: 'xinfu_zhanji',
                                trigger: {
                                    player: "gainAfter",
                                },
                                forced: true,
                                filter: function (event, player) {
                                    if (!player.isPhaseUsing()) return false;
                                    return event.getParent().name == 'draw' && event.getParent(2).name != 'hpp_zhanji';
                                },
                                content: function () {
                                    player.draw('nodelay');
                                },
                            },

                            // SP赵云
                            hpp_chongzhen: {
                                group: ['hpp_chongzhen1', 'hpp_chongzhen2'],
                                audio: 'chongzhen1',
                                ai: {
                                    combo: 'hpp_longdan',
                                    mingzhi: false,
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (get.tag(card, 'respondShan') || get.tag(card, 'respondSha')) {
                                                if (get.attitude(target, player) <= 0) {
                                                    if (current > 0) return;
                                                    if (target.countCards('h') == 0) return 1.6;
                                                    if (target.countCards('h') == 1) return 1.2;
                                                    if (target.countCards('h') == 2) return [0.8, 0.2, 0, -0.2];
                                                    return [0.4, 0.7, 0, -0.7];
                                                }
                                            }
                                        },
                                    },
                                }
                            },
                            hpp_chongzhen1: {
                                audio: 'chongzhen1',
                                trigger: { player: 'useCard' },
                                filter: function (event, player) {
                                    if (event.skill != 'hpp_longdan_shan' && event.skill != 'hpp_longdan_sha' && event.skill != 'fanghun_shan'
                                        && event.skill != 'fanghun_sha' && event.skill != 'hpp_longdan') return false;
                                    var target = lib.skill.hpp_chongzhen1.logTarget(event, player);
                                    return target && target.countGainableCards(player, 'h') > 0;
                                },
                                logTarget: function (event, player) {
                                    if (event.card.name == 'sha') return event.targets[0];
                                    return event.respondTo[0];
                                },
                                prompt2: '当你发动【龙胆】时，你可以获得对方的一张手牌。',
                                content: function () {
                                    var target = lib.skill.hpp_chongzhen1.logTarget(trigger, player);
                                    player.gainPlayerCard(target, 'h', true);
                                }
                            },
                            hpp_chongzhen2: {
                                audio: 'chongzhen2',
                                trigger: { player: 'respond' },
                                filter: function (event, player) {
                                    if (event.skill != 'hpp_longdan_shan' && event.skill != 'hpp_longdan_sha' &&
                                        event.skill != 'fanghun_shan' && event.skill != 'fanghun_sha' && event.skill != 'hpp_longdan') return false;
                                    return event.source && event.source.countGainableCards(player, 'h') > 0;
                                },
                                logTarget: 'source',
                                prompt2: '当你发动【龙胆】时，你可以获得对方的一张手牌。',
                                content: function () {
                                    player.gainPlayerCard(trigger.source, 'h', true);
                                }
                            },

                            // 神曹操
                            hpp_guixin: {
                                audio: 'guixin',
                                trigger: { player: 'damageEnd' },
                                check: function (event, player) {
                                    if (player.isTurnedOver() || event.num > 1 || (game.countPlayer() - 1 < 5 && game.countPlayer(function (current) {
                                        return get.attitude(player, current) <= 0 && current.countGainableCards(player, 'hej') > 0;
                                    }) >= game.countPlayer(function (currentx) {
                                        return get.attitude(player, currentx) > 0 && currentx.countGainableCards(player, 'hej') > 0;
                                    }))) return true;
                                    var num = game.countPlayer(function (current) {
                                        if (current.countCards('he') && current != player && get.attitude(player, current) <= 0) return true;
                                        if (current.countCards('j') && current != player && get.attitude(player, current) > 0) return true;
                                    });
                                    return num >= 2;
                                },
                                content: function () {
                                    'step 0'
                                    var targets = game.filterPlayer();
                                    targets.remove(player);
                                    targets.sort(lib.sort.seat);
                                    event.targets = targets;
                                    event.count = trigger.num;
                                    'step 1'
                                    event.count--;
                                    event.num = 0;
                                    event.numx = 0;
                                    player.line(targets, 'green');
                                    player.chooseControl('手牌区', '装备区', '判定区').set('ai', function () {
                                        if (game.hasPlayer(function (current) {
                                            return current.countCards('j') && current != player && get.attitude(player, current) > 0;
                                        })) return 2;
                                        return Math.floor(Math.random() * 3);
                                    }).set('prompt', '请选择优先获得的区域');
                                    'step 2'
                                    event.range = {
                                        手牌区: ['h', 'e', 'j'],
                                        装备区: ['e', 'h', 'j'],
                                        判定区: ['j', 'h', 'e'],
                                    }[result.control || '手牌区'];
                                    'step 3'
                                    if (num < event.targets.length) {
                                        var target = event.targets[num];
                                        var range = event.range;
                                        for (var i = 0; i < range.length; i++) {
                                            var cards = target.getCards(range[i]);
                                            if (cards.length) {
                                                var card = cards.randomGet();
                                                event.numx++;
                                                player.gain(card, target, 'giveAuto', 'bySelf');
                                                break;
                                            }
                                        }
                                        event.num++;
                                    }
                                    'step 4'
                                    if (num < event.targets.length) event.goto(3);
                                    'step 5'
                                    if (event.numx > 4 && !player.isTurnedOver()) player.turnOver();
                                    'step 6'
                                    if (event.count > 0) player.chooseBool(get.prompt2('new_guixin')).ai = function () {
                                        return lib.skill.hpp_guixin.check({ num: event.count }, player);
                                    };
                                    else event.finish();
                                    'step 7'
                                    if (event.count && result.bool) event.goto(1);
                                },
                                ai: {
                                    maixie: true,
                                    maixie_hp: true,
                                    threaten: function (player, target) {
                                        if (target.hp == 1) return 2.5;
                                        return 1;
                                    },
                                    effect: {
                                        target: function (card, player, target) {
                                            if (get.tag(card, 'damage')) {
                                                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                                if (target.hp == 1) return 0.8;
                                                if (target.isTurnedOver()) return [0, 3];
                                                var num = game.countPlayer(function (current) {
                                                    if (current.countCards('he') && current != player && get.attitude(player, current) <= 0) {
                                                        return true;
                                                    }
                                                    if (current.countCards('j') && current != player && get.attitude(player, current) > 0) {
                                                        return true;
                                                    }
                                                });
                                                if (num > 2) return [0, 1];
                                                if (num == 2) return [0.5, 1];
                                            }
                                        },
                                    },
                                },
                            },

                            // 神陆逊
                            hpp_junlue: {
                                audio: 'nzry_junlve',
                                //marktext:"军",
                                intro: {
                                    content: '当前有#个标记',
                                },
                                //mark:true,
                                trigger: {
                                    player: "damageAfter",
                                    source: "damageSource",
                                },
                                forced: true,
                                content: function () {
                                    player.addMark('hpp_junlue', trigger.num);
                                },
                            },
                            hpp_cuike: {
                                audio: 'nzry_cuike',
                                trigger: {
                                    player: "phaseUseBegin",
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    if (player.countMark('hpp_junlue') % 2 == 1) {
                                        player.chooseTarget('是否发动【摧克】，对一名角色造成一点伤害？').ai = function (target) {
                                            return -get.attitude(player, target);
                                        };
                                    }
                                    else {
                                        player.chooseTarget('是否发动【摧克】，横置一名角色并弃置其区域内的一张牌？').ai = function (target) {
                                            return -get.attitude(player, target);
                                        };
                                    }
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_cuike', result.targets);
                                        if (player.countMark('hpp_junlue') % 2 == 1) {
                                            result.targets[0].damage();
                                        }
                                        else {
                                            result.targets[0].link(true);
                                            player.discardPlayerCard(result.targets[0], 1, 'hej', true);
                                        };
                                    };
                                    'step 2'
                                    if (player.countMark('hpp_junlue') > 7) {
                                        player.chooseBool().set('ai', function () {
                                            return true;
                                        }).set('prompt', '是否弃置所有“军略”标记并对所有其他角色造成一点伤害？');
                                    } else {
                                        event.finish();
                                    };
                                    'step 3'
                                    if (result.bool) {
                                        var players = game.players.slice(0).sortBySeat();
                                        player.line(players);
                                        player.removeMark('hpp_junlue', player.countMark('hpp_junlue'));
                                        for (var i = 0; i < players.length; i++) {
                                            if (players[i] != player) players[i].damage();
                                        };
                                    };
                                },
                            },
                            hpp_zhanhuo: {
                                audio: 'nzry_dinghuo',
                                limited: true,
                                init: function (player) {
                                    player.storage.hpp_zhanhuo = false;
                                },
                                intro: {
                                    content: "limited",
                                },
                                unique: true,
                                mark: true,
                                skillAnimation: true,
                                animationColor: 'metal',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return !player.storage.hpp_zhanhuo && player.countMark('hpp_junlue') > 0;
                                },
                                check: function (event, player) {
                                    var num = game.countPlayer(function (current) { return get.attitude(player, current) < 0 && current.isLinked() });
                                    return player.storage.hpp_junlue >= num && num == game.countPlayer(function (current) { return get.attitude(player, current) < 0 });
                                },
                                filterTarget: function (card, player, target) {
                                    return target.isLinked();
                                },
                                selectTarget: function () {
                                    return [1, _status.event.player.countMark('hpp_junlue')];
                                },
                                multiline: true,
                                multitarget: true,
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_zhanhuo');
                                    player.storage.hpp_zhanhuo = true;
                                    'step 1'
                                    player.removeMark('hpp_junlue', player.countMark('hpp_junlue'));
                                    for (var i = 0; i < targets.length; i++) {
                                        targets[i].discard(targets[i].getCards('e'));
                                    }
                                    player.chooseTarget(true, '对一名目标角色造成1点火焰伤害', function (card, player, target) {
                                        return _status.event.targets.contains(target);
                                    }).set('targets', targets).ai = function () { return 1 };
                                    'step 2'
                                    if (result.bool) {
                                        result.targets[0].damage('fire', 'nocard');
                                    }
                                },
                                ai: {
                                    order: 1,
                                    fireAttack: true,
                                    result: {
                                        target: function (player, target) {
                                            if (target.hasSkillTag('nofire')) return 0;
                                            if (lib.config.mode == 'versus') return -1;
                                            if (player.hasUnknown()) return 0;
                                            return get.damageEffect(target, player) - target.countCards('e');
                                        }
                                    }
                                }
                            },

                            // 神吕蒙
                            hpp_gongxin: {
                                audio: 'gongxin',
                                audioname2: { hpp_lvmeng: 'gongxin_re_lvmeng' },
                                trigger: { player: 'useCardToPlayered', target: 'useCardToTargeted' },
                                filter: function (event, player) {
                                    if (event.targets.length != 1) return false;
                                    if (event.player == event.target && event.player != player) return false;
                                    return (player == event.player ? event.target : event.player).countCards('h');
                                },
                                logTarget: function (event, player) {
                                    return player == event.player ? event.target : event.player;
                                },
                                check: function (event, player) {
                                    return get.attitude(player, player == event.player ? event.target : event.player) <= 0;
                                },
                                usable: 1,
                                content: function () {
                                    'step 0'
                                    var target = (player == trigger.player ? trigger.target : trigger.player);
                                    event.target = target;
                                    event.videoId = lib.status.videoId++;
                                    var cards = target.getCards('h');
                                    if (player.isOnline2()) {
                                        player.send(function (cards, id) {
                                            ui.create.dialog('攻心', cards).videoId = id;
                                        }, cards, event.videoId);
                                    }
                                    event.dialog = ui.create.dialog('攻心', cards);
                                    event.dialog.videoId = event.videoId;
                                    if (!event.isMine()) {
                                        event.dialog.style.display = 'none';
                                    }
                                    player.chooseButton().set('filterButton', function (button) {
                                        return get.color(button.link) == 'red';
                                    }).set('dialog', event.videoId).set('ai', function (button) {
                                        return get.value(button.link);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        event.card = result.links[0];
                                        var func = function (card, id) {
                                            var dialog = get.idDialog(id);
                                            if (dialog) {
                                                for (var i = 0; i < dialog.buttons.length; i++) {
                                                    if (dialog.buttons[i].link == card) {
                                                        dialog.buttons[i].classList.add('selectedx');
                                                    }
                                                    else {
                                                        dialog.buttons[i].classList.add('unselectable');
                                                    }
                                                }
                                            }
                                        }
                                        if (player.isOnline2()) {
                                            player.send(func, event.card, event.videoId);
                                        }
                                        else if (event.isMine()) {
                                            func(event.card, event.videoId);
                                        }
                                        player.chooseControl('获得此牌', '置于牌堆顶');
                                    }
                                    else {
                                        if (player.isOnline2()) {
                                            player.send('closeDialog', event.videoId);
                                        }
                                        event.dialog.close();
                                        event.finish();
                                    }
                                    'step 2'
                                    if (player.isOnline2()) {
                                        player.send('closeDialog', event.videoId);
                                    }
                                    event.dialog.close();
                                    var card = event.card;
                                    if (result.control == '置于牌堆顶') {
                                        player.showCards(card, '置于牌堆顶');
                                        target.lose(card, ui.cardPile, 'insert', 'visible');
                                        game.log(player, '将', event.card, '置于牌堆顶');
                                    }
                                    else player.gain(card, target, 'give');
                                },
                                ai: { expose: 0.25 },
                            },

                            // 神赵云
                            hpp_juejing: {
                                mod: {
                                    maxHandcard: function (player, num) {
                                        return num + 3;
                                    },
                                },
                                audio: 'xinjuejing',
                                trigger: { player: ['dying', 'dyingAfter'] },
                                forced: true,
                                content: function () {
                                    player.draw();
                                }
                            },
                            hpp_longhun: {
                                audio: 'relonghun',
                                enable: ['chooseToUse', 'chooseToRespond'],
                                prompt: '将♦牌当作火杀，♥牌当作桃，♣牌当作闪，♠牌当作无懈可击使用或打出',
                                viewAs: function (cards, player) {
                                    var name = false;
                                    var nature = null;
                                    switch (get.suit(cards[0], player)) {
                                        case 'club': name = 'shan'; break;
                                        case 'diamond': name = 'sha'; nature = 'fire'; break;
                                        case 'spade': name = 'wuxie'; break;
                                        case 'heart': name = 'tao'; break;
                                    }
                                    if (name) return { name: name, nature: nature };
                                    return null;
                                },
                                check: function (card) {
                                    if (ui.selected.cards.length) return 0;
                                    var player = _status.event.player;
                                    if (_status.event.type == 'phase') {
                                        var max = 0;
                                        var name2;
                                        var list = ['sha', 'tao'];
                                        var map = { sha: 'diamond', tao: 'heart' }
                                        for (var i = 0; i < list.length; i++) {
                                            var name = list[i];
                                            if (player.countCards('hes', function (card) {
                                                return (name != 'sha' || get.value(card) < 5) && get.suit(card, player) == map[name];
                                            }) > 0 && player.getUseValue({ name: name, nature: name == 'sha' ? 'fire' : null }) > 0) {
                                                var temp = get.order({ name: name, nature: name == 'sha' ? 'fire' : null });
                                                if (temp > max) {
                                                    max = temp;
                                                    name2 = map[name];
                                                }
                                            }
                                        }
                                        if (name2 == get.suit(card, player)) return (name2 == 'diamond' ? (5 - get.value(card)) : 20 - get.value(card));
                                        return 0;
                                    }
                                    return 1;
                                },
                                selectCard: [1, 2],
                                complexCard: true,
                                position: 'hes',
                                filterCard: function (card, player, event) {
                                    if (ui.selected.cards.length) return get.suit(card, player) == get.suit(ui.selected.cards[0], player);
                                    event = event || _status.event;
                                    var filter = event._backup.filterCard;
                                    var name = get.suit(card, player);
                                    if (name == 'club' && filter({ name: 'shan', cards: [card] }, player, event)) return true;
                                    if (name == 'diamond' && filter({ name: 'sha', cards: [card], nature: 'fire' }, player, event)) return true;
                                    if (name == 'spade' && filter({ name: 'wuxie', cards: [card] }, player, event)) return true;
                                    if (name == 'heart' && filter({ name: 'tao', cards: [card] }, player, event)) return true;
                                    return false;
                                },
                                filter: function (event, player) {
                                    var filter = event.filterCard;
                                    if (filter({ name: 'sha', nature: 'fire' }, player, event) && player.countCards('hes', { suit: 'diamond' })) return true;
                                    if (filter({ name: 'shan' }, player, event) && player.countCards('hes', { suit: 'club' })) return true;
                                    if (filter({ name: 'tao' }, player, event) && player.countCards('hes', { suit: 'heart' })) return true;
                                    if (filter({ name: 'wuxie' }, player, event) && player.countCards('hes', { suit: 'spade' })) return true;
                                    return false;
                                },
                                ai: {
                                    respondSha: true,
                                    respondShan: true,
                                    skillTagFilter: function (player, tag) {
                                        var name;
                                        switch (tag) {
                                            case 'respondSha': name = 'diamond'; break;
                                            case 'respondShan': name = 'club'; break;
                                            case 'save': name = 'heart'; break;
                                        }
                                        if (!player.countCards('hes', { suit: name })) return false;
                                    },
                                    order: function (item, player) {
                                        if (player && _status.event.type == 'phase') {
                                            var max = 0;
                                            var list = ['sha', 'tao'];
                                            var map = { sha: 'diamond', tao: 'heart' }
                                            for (var i = 0; i < list.length; i++) {
                                                var name = list[i];
                                                if (player.countCards('hes', function (card) {
                                                    return (name != 'sha' || get.value(card) < 5) && get.suit(card, player) == map[name];
                                                }) > 0 && player.getUseValue({ name: name, nature: name == 'sha' ? 'fire' : null }) > 0) {
                                                    var temp = get.order({ name: name, nature: name == 'sha' ? 'fire' : null });
                                                    if (temp > max) max = temp;
                                                }
                                            }
                                            max /= 1.1;
                                            return max;
                                        }
                                        return 2;
                                    },
                                },
                                hiddenCard: function (player, name) {
                                    if (name == 'wuxie' && _status.connectMode && player.countCards('hs') > 0) return true;
                                    if (name == 'wuxie') return player.countCards('hes', { suit: 'spade' }) > 0;
                                    if (name == 'tao') return player.countCards('hes', { suit: 'heart' }) > 0;
                                },
                                group: ['hpp_longhun_num', 'hpp_longhun_gain'],
                                subSkill: {
                                    num: {
                                        charlotte: true,
                                        trigger: { player: 'useCard' },
                                        filter: function (event, player) {
                                            var evt = event;
                                            return ['sha', 'tao'].contains(evt.card.name) && evt.skill == 'hpp_longhun' && evt.cards && evt.cards.length == 2;
                                        },
                                        forced: true,
                                        popup: false,
                                        content: function () {
                                            trigger.baseDamage++;
                                            player.draw();
                                        },
                                    },
                                    gain: {
                                        charlotte: true,
                                        trigger: { player: ['useCardAfter', 'respondAfter'] },
                                        autodelay: function (event) {
                                            return event.name == 'respond' ? 0.5 : false;
                                        },
                                        filter: function (event, player) {
                                            return ['shan', 'wuxie'].contains(event.card.name) && event.skill && event.skill == 'hpp_longhun' && event.cards && event.cards.length == 2 && _status.currentPhase && _status.currentPhase != player && _status.currentPhase.countGainableCards(player, 'he');
                                        },
                                        logTarget: () => _status.currentPhase,
                                        forced: true,
                                        popup: false,
                                        content: function () {
                                            player.line(_status.currentPhase, 'green');
                                            player.gainPlayerCard(_status.currentPhase, 'he', true);
                                        },
                                    },
                                },
                            },

                            // 神张角
                            hpp_yizhao: {
                                audio: 'yizhao',
                                trigger: {
                                    player: ['useCard', 'respond']
                                },
                                forced: true,
                                filter: function (event, player) {
                                    return typeof get.number(event.card) == 'number';
                                },
                                marktext: '黄',
                                intro: {
                                    name: '黄(异兆/肆军)',
                                    name2: '黄',
                                    content: 'mark',
                                    markcount: function (storage, player) {
                                        return (storage || 0).toString().slice(-2);
                                    },
                                },
                                content: function () {
                                    'step 0'
                                    event.num = player.countMark('hpp_yizhao');
                                    player.addMark('hpp_yizhao', get.number(trigger.card));
                                    'step 1'
                                    var num = Math.floor(num / 10) % 10, num2 = Math.floor(player.countMark('hpp_yizhao') / 10) % 10;
                                    if (num != num2) {
                                        var card = get.cardPile2(card => {
                                            return get.number(card, false) == num2;
                                        });
                                        if (card) player.gain(card, 'gain2');
                                    }
                                },
                                mod: {
                                    aiOrder: function (player, card, num) {
                                        if (Math.floor((get.number(card) + player.countMark('hpp_yizhao') % 10) / 10) == 1) return num + 10;
                                    },
                                },
                                ai: {
                                    threaten: 1.5,
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 0.1];
                                        }
                                    }
                                }
                            },
                            hpp_sanshou: {
                                audio: 'sanshou',
                                trigger: { player: 'damageBegin4' },
                                check: function (event, player) {
                                    return get.damageEffect(player, event.source, player, event.nature) <= 0;
                                },
                                content: function () {
                                    'step 0'
                                    var cards = game.cardsGotoOrdering(get.cards(3)).cards;
                                    event.cards = cards;
                                    player.showCards(cards, get.translation(player) + '发动了【三首】');
                                    'step 1'
                                    var types = [];
                                    types.addArray(game.getGlobalHistory('useCard').map(evt => get.type2(evt.card)));
                                    if (cards.filter(card => !types.contains(get.type2(card))).length) {
                                        trigger.cancel();
                                    }
                                    game.delayx();
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (card.name == 'shandian' || card.name == 'fulei') return [0, 0.1];
                                            if (!get.tag(card, 'damage')) return;
                                            var types = [], bool = 0;
                                            types.addArray(game.getGlobalHistory('useCard').map(evt => get.type2(evt.card)));
                                            if (!types.contains(get.type2(card))) bool = 1;
                                            if (types.length < 2) return Math.min(1, 0.4 + (types.length + bool) * 0.2);
                                        }
                                    }
                                },
                            },
                            hpp_sijun: {
                                audio: 'sijun',
                                trigger: { player: 'phaseZhunbeiBegin' },
                                filter: function (event, player) {
                                    return player.countMark('hpp_yizhao') > ui.cardPile.childNodes.length;
                                },
                                check: () => true,
                                content: function () {
                                    'step 0'
                                    player.removeMark('hpp_yizhao', player.countMark('hpp_yizhao'));
                                    var cards = get.cards(ui.cardPile.childElementCount + 1);
                                    for (var i = 0; i < cards.length; i++) {
                                        ui.cardPile.insertBefore(cards[i], ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
                                    }
                                    game.updateRoundNumber();
                                    'step 1'
                                    var pile = Array.from(ui.cardPile.childNodes);
                                    if (pile.length < 3) return;
                                    var bool = false, max = Math.pow(2, Math.min(100, pile.length)), index;
                                    for (var i = 0; i < max; i++) {
                                        var num = 0;
                                        index = i.toString(2);
                                        while (index.length < pile.length) {
                                            index = ('0' + index);
                                        }
                                        for (var k = 0; k < index.length; k++) {
                                            if (index[k] == '1') num += get.number(pile[k]);
                                            if (num > 36) break;
                                        }
                                        if (num == 36) {
                                            bool = true;
                                            break;
                                        }
                                    }
                                    if (bool) {
                                        var cards = [];
                                        for (var k = 0; k < index.length; k++) {
                                            if (index[k] == '1') cards.push(pile[k]);
                                        }
                                        player.gain(cards, 'gain2');
                                    }
                                }
                            },
                            hpp_tianjie: {
                                audio: 'tianjie',
                                trigger: { global: 'phaseEnd' },
                                direct: true,
                                filter: function (event, player) {
                                    return player.hasSkill('hpp_tianjie_shuffled');
                                },
                                group: 'hpp_tianjie_effect',
                                skillAnimation: true,
                                animationColor: 'metal',
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_tianjie'), '选择至多三名其他角色，依次对这些角色造成X点雷电伤害（X为其手牌中【闪】的数量，至少为1）', [1, 3]).set('ai', target => {
                                        var player = _status.event.player;
                                        return get.damageEffect(target, player, player, 'thunder') * Math.sqrt(Math.max(1, target.countCards('h', 'shan')));
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var targets = result.targets;
                                        targets.sortBySeat();
                                        player.logSkill('hpp_tianjie', targets);
                                        for (var target of targets) {
                                            var num = Math.max(1, target.countCards('h', 'shan'));
                                            target.damage(num, 'thunder');
                                        }
                                    }
                                },
                                subSkill: {
                                    effect: {
                                        trigger: { global: 'washCard' },
                                        forced: true,
                                        silent: true,
                                        charlotte: true,
                                        content: function () {
                                            player.addTempSkill('hpp_tianjie_shuffled');
                                        },
                                    },
                                    shuffled: { charlotte: true },
                                }
                            },
                        },
                        dynamicTranslate: {
                        },
                        characterTitle: {
                            // g绿 b蓝 r红 p粉
                            // C
                            hpp_caocao: '#b捞德一评级:3.0',
                            hpp_caoren: '#b捞德一评级:3.0',
                            // D
                            hpp_daqiao: '#b捞德一评级:3.6',
                            hpp_dongzhuo: '#g捞德一评级:2.5',
                            // G
                            hpp_ganning: '#b捞德一评级:3.8',
                            hpp_gongsunzan: '#b捞德一评级:3.8',
                            hpp_guanyu: '#r捞德一评级:4.1',
                            hpp_guohuai: '#r捞德一评级:4.1',
                            hpp_guojia: '捞德一评级1.2',
                            // H
                            hpp_huanggai: '#r捞德一评级:4.2',
                            hpp_huangzhong: '#g捞德一评级:2.8',
                            hpp_huaxiong: '#b捞德一评级:3.1',
                            // J
                            hpp_jiaxu: '#g捞德一评级:2.2',
                            // L
                            hpp_liaohua: '#b捞德一评级:3.2',
                            hpp_liubiao: '#b捞德一评级:3.7',
                            hpp_liubei: '#b捞德一评级:3.8',
                            hpp_liuyan: '#r捞德一评级:4.0',
                            hpp_lusu: '捞德一评级1.6',
                            hpp_luxun: '捞德一评级1.4',
                            hpp_lvbu: '#g捞德一评级:2.0',
                            hpp_lvmeng: '#b捞德一评级:3.2',
                            // M
                            hpp_machao: '#r捞德一评级:4.1',
                            hpp_masu: '#r捞德一评级4.2',
                            // P
                            hpp_pangde: '#r捞德一评级:4.1',
                            hpp_pangtong: '#g捞德一评级:2.5',
                            // S
                            hpp_simayi: '#r捞德一评级:4.0',
                            hpp_sunce: '#b捞德一评级:3.7',
                            hpp_sunjian: '#r捞德一评级:4.1',
                            hpp_sunliang: '#b捞德一评级:3.9',
                            hpp_sunquan: '#r捞德一评级:4.3',
                            // W
                            hpp_wangping: '#b捞德一评级3.6',
                            hpp_weiyan: '#g捞德一评级2.9',
                            // X
                            hpp_xiahoudun: '#g捞德一评级2.3',
                            hpp_xiaoqiao: '#g捞德一评级2.2',
                            hpp_xuzhu: '#b捞德一评级3.3',
                            // Y
                            hpp_yuji: '#b捞德一评级3.7',
                            // Z
                            hpp_zhangfei: '#r捞德一评级:4.0',
                            hpp_zhangjiao: '#b捞德一评级:3.8',
                            hpp_zhangliao: '#b捞德一评级:3.9',
                            hpp_zhangsong: '#b捞德一评级:3.6',
                            hpp_zhangzhaozhanghong: '#g捞德一评级:2.6',
                            hpp_zhaoyun: '#b捞德一评级:3.1',
                            hpp_zhenji: '#b捞德一评级:3.0',
                            hpp_zhongyao: '#b捞德一评级:3.0',
                            hpp_zhouyu: '#b捞德一评级:3.0',
                            hpp_zhugeliang: '#b捞德一评级:3.3',
                            hpp_zuoci: '#b捞德一评级:3.4',
                            // SP
                            hpp_sp_pangtong: '#r捞德一评级:4.1',
                            hpp_sp_zhaoyun: '#g捞德一评级:2.2',
                            // 神
                            hpp_shen_caocao: '#r捞德一评级:4.2',
                            hpp_shen_luxun: '#r捞德一评级:4.2',
                            hpp_shen_zhaoyun: '#r捞德一评级:4.2',
                            hpp_shen_zhangjiao: '#r捞德一评级4.6',
                        },
                        translate: {
                            // C
                            hpp_caocao: '曹操',
                            hpp_jianxiong: '奸雄',
                            hpp_jianxiong_info: '当你受到1点伤害时，你可以摸一张牌，并获得对你造成伤害的牌；或摸两张牌。',
                            hpp_hujia: '护驾',
                            hpp_hujia_info: '主公技，其他魏势力角色可以替你使用或打出【闪】。其他魏势力角色若以此法使用或打出【闪】时，可令你摸一张牌，每回合限一张。',
                            hpp_caoren: '曹仁',
                            hpp_jushou: '据守',
                            hpp_jushou_info: '结束阶段，你可以翻面，若如此做，你摸四张牌，然后你可以使用一张装备牌。',
                            // D
                            hpp_daqiao: '大乔',
                            hpp_wanrong: '婉容',
                            hpp_wanrong_info: '出牌阶段限一次，你可以将一张方块牌当“乐不思蜀”使用，或者弃一张方片花色牌并弃置场上的一张“乐不思蜀”。',
                            hpp_guose: '国色',
                            hpp_guose_info: '当你使用或弃置方块牌时，摸1张牌。',
                            hpp_liuli: '流离',
                            hpp_liuli_info: '你被【杀】时，可以弃一张牌转移给你攻击范围内的一名其他角色。',
                            hpp_dongzhuo: '董卓',
                            hpp_jiuchi: '酒池',
                            hpp_jiuchi_info: '你可以将一张黑色手牌当【酒】使用。',
                            hpp_roulin: '肉林',
                            hpp_roulin_info: '锁定技。你对女性角色使用的【杀】和女性角色对你使用的【杀】均需使用两张【闪】才能抵消。',
                            hpp_benghuai: '崩坏',
                            hpp_benghuai_hp: '体力',
                            hpp_benghuai_maxHp: '体力上限',
                            hpp_benghuai_info: '锁定技，结束阶段，若你不是体力值最小的角色，你失去1点体力或减1点体力上限，并摸一张牌。',
                            hpp_baonue: '暴虐',
                            hpp_baonue2: '暴虐',
                            hpp_baonue_info: '主公技，当其他群雄势力角色造成伤害后，其可以进行判定，若结果为黑桃，你回复1点体力。',
                            // G
                            hpp_ganning: '甘宁',
                            hpp_qixi: '奇袭',
                            hpp_qixi_info: '出牌阶段开始时，可以选择一名角色，弃置其一张牌。出牌阶段，你可以将一张黑色牌当【过河拆桥】使用。',
                            hpp_fenwei: '奋威',
                            hpp_fenwei_info: '限定技，当一张锦囊牌指定多个目标后，你可以令此牌对其中任意个目标无效，并摸一张牌，当你失去最后一张手牌时，重置本技能。',
                            hpp_gongsunzan: '公孙瓒',
                            hpp_yicong: '义从',
                            hpp_yicong_info: '锁定技，你计算与其他角色的距离-X（X为你的体力值）；其他角色计算与你的距离+Y（Y为你的已损失的体力值）。',
                            hpp_qiaomeng: '趫猛',
                            hpp_qiaomeng_info: '当你使用【杀】对一名角色造成伤害后，你可以获得其区域内的1张牌。若此牌为坐骑牌，则此伤害+1。',
                            hpp_guanyu: '关羽',
                            hpp_wusheng: '武圣',
                            hpp_wusheng_info: '回合开始时，你获得一张红色【杀】。你的红色【杀】伤害+1。',
                            hpp_guohuai: '郭淮',
                            hpp_jingce: '精策',
                            hpp_jingce_info: '结束阶段开始时，你可以摸X张牌（X为本回合你出牌的花色数+1，至多为3）。',
                            hpp_guojia: '郭嘉',
                            hpp_tiandu: '天妒',
                            hpp_tiandu_info: '当你的判定牌生效后，你可以获得此牌。',
                            hpp_yiji: '遗计',
                            hpp_yiji_info: '当你受到1点伤害后，你可以观看牌堆顶的两张牌，然后交给任意角色。',
                            // H
                            hpp_huanggai: '黄盖',
                            hpp_zhaxiang: '诈降',
                            hpp_zhaxiang_info: '锁定技，你使用红色【杀】无距离限制且不能被【闪】响应，且你可以多使用一张【杀】。',
                            hpp_huangzhong: '黄忠',
                            hpp_liegong: '烈弓',
                            hpp_liegong_info: '你的【杀】无视距离。当你使用【杀】指定目标后：若目标角色的手牌数小于等于你，不能使用【闪】；目标体力大于等于你，此【杀】伤害+1。',
                            hpp_huaxiong: '华雄',
                            hpp_yaowu: '耀武',
                            hpp_yaowu_info: '你受到红色【杀】的伤害时，伤害来源摸一张牌；你受到黑色【杀】的伤害时，你摸一张牌。获得对你造成伤害的所有【杀】。',
                            hpp_yangwei: '扬威',
                            hpp_yangwei_info: '使用红杀后，可继续使用黑杀；使用黑杀后，可继续使用红杀。出牌阶段结束时，若本回合出杀次数大于2，则你回复1点体力。',
                            // J
                            hpp_jiaxu: '贾诩',
                            hpp_wansha: '完杀',
                            hpp_wansha_info: '锁定技，你的回合内，只有你才能使用【桃】。',
                            // L
                            hpp_liaohua: '廖化',
                            hpp_dangxian: '当先',
                            hpp_dangxian_info: '回合开始时你进行一个额外的出牌阶段并摸一张【杀】。',
                            hpp_fuli: '伏枥',
                            hpp_fuli_info: '限定技，当你处于濒死状态时，你可以将体力回复至X点且手牌摸至X张（X为全场势力数），然后若X大于3，你翻面。',
                            hpp_liubiao: '刘表',
                            hpp_zishou: '自守',
                            hpp_zishou_info: '摸牌阶段，你可以多摸X张牌（X为全场势力数），然后当你本回合对其他角色造成伤害时，防止此伤害。',
                            hpp_zongshi: '宗室',
                            hpp_zongshi_info: '锁定技，你的手牌上限+X（X为全场势力函数）；准备阶段，若你的手牌数大于你的体力值，则你本回合使用【杀】无次数限制。',
                            hpp_liubei: '刘备',
                            hpp_rende: '仁德',
                            hpp_rende_info: '出牌阶段每名角色限一次，你可以将任意张手牌交给一名其他角色,并可以让其无法对你使用红色【杀】直到你的下回合开始。当你给出第二张“仁德”牌时，你可以视为使用一张基本牌或普通锦囊牌。',
                            hpp_jijiang: '激将',
                            hpp_jijiang_info: '主公技，其他蜀势力角色可以在你需要时代替你使用或打出【杀】。若以此法出杀，则你与其各摸一张牌。你的回合外，当其他蜀势力角色使用或打出【杀】时，其可令你摸一张牌，每回合限一张。',
                            hpp_liuyan: '刘焉',
                            hpp_lusu: '鲁肃',
                            hpp_haoshi: '好施',
                            hpp_haoshi_info: '摸牌阶段，你可以多摸两张牌，然后若你的手牌数大于5，则你将一半的手牌交给手牌最少的一名其他角色或弃置。',
                            hpp_dimeng: '缔盟',
                            hpp_dimeng_info: '出牌阶段限一次，你可以选择两名其他角色并弃置X张牌（X为这两名角色手牌数的差），然后令这两名角色交换手牌。',
                            hpp_luxun: '陆逊',
                            hpp_qianxun: '谦逊',
                            hpp_qianxun_info: '锁定技，当你成为锦囊的唯一目标时，你摸一张牌，然后可以将一张手牌交给其他角色。',
                            hpp_lvbu: '吕布',
                            hpp_lvmeng: '吕蒙',
                            hpp_keji: '克己',
                            hpp_keji_info: '若你未于出牌阶段内使用或打出过【杀】，你可以跳过弃牌阶段并摸1张牌。',
                            hpp_qinxue: '勤学',
                            hpp_qinxue_info: '觉醒技，结束阶段，若你的手牌数大于等于你的体力值的3倍，将体力上限减少至当前体力值，然后用“攻心”替换“克己”。',
                            // M
                            hpp_machao: '马超',
                            hpp_yuma: '驭马',
                            hpp_yuma_info: '锁定技，你计算与其他角色的距离-1。当你失去装备区中的坐骑时，你摸两张牌。',
                            hpp_tieji: '铁骑',
                            hpp_tieji_info: '当你使用【杀】指定目标后，你可以令其本回合非锁定技失效，然后你进行判定，若为红色，该角色不能使用【闪】；黑色，你摸两张牌。',
                            hpp_masu: '马谡',
                            hpp_sanyao: '散谣',
                            hpp_sanyao_info: '出牌阶段限一次，你可以弃置X张牌（X最多为4），然后对等量其他角色造成1点伤害。',
                            // P
                            hpp_pangde: '庞德',
                            hpp_jianchu: '鞬出',
                            hpp_jianchu_info: '当你使用【杀】指定一个目标后，你弃置其一张牌，若以此法被弃置的牌：不为基本牌，你摸一张牌，且该角色不能使用【闪】；为基本牌，此杀不计入出杀次数。',
                            hpp_pangtong: '庞统',
                            hpp_lianhuan: '连环',
                            hpp_lianhuan_info: '出牌阶段开始时，你可以选择最多2名角色横置或重置，如果选择自己，你额外摸一张牌。',
                            hpp_niepan: '涅槃',
                            hpp_niepan_info: '限定技，当你处于濒死状态时，你可以弃置你的区域里的所有牌，然后复原你的武将牌，摸三张牌，将体力回复至3点。',
                            // S
                            hpp_simayi: '司马懿',
                            hpp_fankui: '反馈',
                            hpp_fankui_info: '当你受到1点伤害后，你可以进行判定，红桃，你获得场上任意其他角色的一张牌；其他花色，你获得伤害来源的一张牌。',
                            hpp_guicai: '鬼才',
                            hpp_guicai_info: '任何判定牌生效前，你可以打出一张牌代替之，然后若此牌为，红桃，你回复1点体力，若此牌为梅花，你摸两张牌。',
                            hpp_sunce: '孙策',
                            hpp_jiang: '激昂',
                            hpp_jiang_info: '当你使用【决斗】或【杀】指定目标后，或成为【决斗】或【杀】的指定目标后，你可以摸一张牌。',
                            hpp_hunzi: '魂姿',
                            hpp_hunzi_info: '觉醒技，若你的体力值为1，你减1点体力上限，然后获得“英姿”和“英魂”。',
                            hpp_zhiba: '制霸',
                            hpp_zhiba2: '制霸',
                            hpp_zhiba_info: '主公技，其他吴势力角色可以交给你一张【决斗】或【杀】。',
                            hpp_sunjian: '孙坚',
                            hpp_yinghun: '英魂',
                            hpp_yinghun_info: '准备阶段，你可以选择一名其他角色并选择一项：1.令其摸X张牌；2.令其摸一张牌，然后弃置X张牌（X为你已损失的体力值）。',
                            hpp_wulie: '武烈',
                            hpp_wulie_info: '限定技，你的回合开始前，你可以失去任意点体力，自己获得等量的“烈”标记，然后至多令等量的其他角色各获得1枚“烈”标记；当有“烈”标记的角色受到伤害时，可以弃置1枚标记并防止该伤害。',
                            hpp_wulie2: '武烈',
                            hpp_wulie2_info: '移去1枚「烈」，然后防止此伤害',
                            hpp_sunliang: '孙亮',
                            hpp_kuizhu: '溃诛',
                            hpp_kuizhu_info: '弃牌阶段结束后，你可以选择一项：令至多X名角色各摸一张牌；对任意名体力值之和≤X的角色各造成1点伤害（X为你此阶段弃置的牌数）。',
                            hpp_chezheng: '掣政',
                            hpp_chezheng_info: '锁定技，你的出牌阶段内，攻击范围内不包含你的角色不能成为你【杀】的目标。出牌阶段结束时，你摸与这些角色数相同的牌且至少为2。',
                            hpp_lijun: '立军',
                            hpp_lijun_info: '主公技，每个出牌阶段限一次，其他吴势力角色于其出牌阶段使用【杀】结算结束后，你摸一张牌，然后你可以令其摸一张牌。',
                            hpp_sunquan: '孙权',
                            hpp_zhiheng: '制衡',
                            hpp_zhiheng_info: '出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。若你以此法弃置了所有的手牌，则额外摸一张牌；若你以此法获得的牌不包含延时锦牌，则本同合此技能使用次数+1；若你本回合第二次以此法获得的牌全是基本牌，则本回合此技能使用次数再+1。',
                            hpp_jiuyuan: '救援',
                            hpp_jiuyuan_info: '主公技，其他吴势力角色于其回合内回复体力时，该角色可以改为令你回复1点体力，然后其摸一张牌。当你处于濒死状态时，其他吴势力武将对你使用的【桃】回复的体力+1。',
                            // W
                            hpp_wangping:'王平',
                            hpp_feijun: '飞军',
                            hpp_feijun_info: '出牌阶段限一次，你可以弃置一张牌，然后选择一项：令一名其他角色交给你一张牌；或令一名其他角色弃置一张装备区的牌。',
                            hpp_binglue: '兵略',
                            hpp_binglue_info: '锁定技，当你发动“飞军”时，摸1张牌，若目标与你之前指定的目标均不相同，则你再摸X张牌（X为场上成为过你发动“飞军”目标的存活角色数）。',
                            hpp_weiyan: '魏延',
                            hpp_kuanggu: '狂骨',
                            hpp_kuanggu_info: '当你对一名角色造成1点伤害后，你可以回复1点体力或摸一张牌。',
                            hpp_qimou: '奇谋',
                            hpp_qimou_info: '限定技，出牌阶段，你可以失去任意点体力，摸1张牌，然后本回合你计算与其他角色的距离-X且你可以多使用X张【杀】（X为你以此法失去的体力数）。',
                            // X
                            hpp_xiahoudun: '夏侯惇',
                            hpp_qingjian: '清俭',
                            hpp_qingjian_info: '每回合限一次，当你于摸牌阶段外获得牌后，你可以展示任意张牌并交给一名其他角色，然后你摸一张牌。',
                            hpp_xiaoqiao: '小乔',
                            hpp_tianxiang: '天香',
                            hpp_tianxiang2: '天香',
                            hpp_tianxiang_info: '当你受到伤害时，可以弃置一张红桃手牌，选择一名角色代替你承受此伤害，若如此做，你选择一项：1.其摸一张牌；2.令其摸X张牌（X为其损失的体力值且至多为5）。',
                            hpp_hongyan: '红颜',
                            hpp_hongyan_info: '锁定技，你的黑桃牌视为红桃牌，若你的装备区有红桃牌，你的手牌上限等于体力上限。',
                            hpp_xuzhu: '许诸',
                            hpp_luoyi: '裸衣',
                            hpp_luoyi_info: '摸牌阶段，你可以少摸一张牌，然后本回合你使用【杀】或【决斗】造成的伤害+1。',
                            hpp_huchi: '虎痴',
                            hpp_huchi_info: '回合结束时，若你的手牌数小于2，则摸至2张；且当你对目标出杀被闪时，你获得一枚“痴”。出牌阶段限一次，可以弃置所有“痴”，摸同等数量的牌。',
                            // Y
                            hpp_yuji: '于吉',
                            hpp_guhuo: '蛊惑',
                            hpp_guhuo_info: '你使用的【杀】或伤害锦囊牌结算后，若没有造成伤害，则将此牌移出游戏，你摸一张牌，并在回合结束后将此牌归还；若造成伤害，你摸一张牌，每回合限一次。',
                            // Z
                            hpp_zhangfei: '张飞',
                            hpp_tishen: '替身',
                            hpp_tishen_info: '回合外，获得所有对你使用且未对你造成伤害的【杀】。出牌阶段你使用的杀被闪抵消后，则你本阶段使用的下一张【杀】不可被响应且造成的伤害+1。',
                            hpp_zhangjiao: '张角',
                            hpp_leiji: '雷击',
                            hpp_leiji_info: '当你使用【闪】或【闪电】时，你可以令一名其他角色判定，若结果为：黑桃，你对其造成2点伤害；梅花，你回复1点体力，然后对其造成1点伤害。你的手牌上限+2。',
                            hpp_guidao: '鬼道',
                            hpp_guidao_info: '当一名角色的判定牌生效前，你可以打出一张黑色牌替换之；若你打出的牌是黑桃2~9，则你摸一张牌。',
                            hpp_huangtian: '黄天',
                            hpp_huangtian2: '黄天',
                            hpp_huangtian4: '黄天',
                            hpp_huangtian_info: '主公技。其他群势力角色的出牌阶段限一次，该角色可以将一张【闪】、【闪电】或黑桃手牌交给你；你获得其他群势力角色使用或打出的闪，每回合限一次。',
                            hpp_zhangliao: '张辽',
                            hpp_zhengbing: '整兵',
                            hpp_zhengbing_info: '通过〖突袭〗获得的牌不计入手牌上限；且可以被重铸；最后一张突袭牌被重铸时再摸一张牌。',
                            hpp_zhangsong: '张松',
                            hpp_xiantu: '献图',
                            hpp_xiantu_info: '其他角色的出牌阶段开始时，你可以摸两张牌，然后将两张牌交给该角色。此阶段结束时，若其没有造成过伤害，则你失去1点体力。',
                            hpp_zhangzhaozhanghong: '张昭张纮',
                            hpp_zhijian: '直谏',
                            hpp_zhijian_info: '出牌阶段，你可以将手牌中的一张装备牌置于其他角色的装备区里，然后摸一张牌。',
                            hpp_guzheng: '固政',
                            hpp_guzheng_info: '其他角色的弃牌阶段结束时，你可以令其获得弃牌中的一张曾是于此阶段内弃置的【手牌】，然后你可以获得其余的弃牌。如果其有弃牌且你没有通过此法获得牌，则你摸一张牌。',
                            hpp_zhaoyun: '赵云',
                            hpp_longdan: '龙胆',
                            hpp_longdan_info: '你可以将一张【杀】当【闪】、【闪】当【杀】使用或打出。',
                            hpp_yajiao: '涯角',
                            hpp_yajiao_info: '当你于回合外使用或打出手牌时，你可以展示牌堆顶的一张牌并将其交给一名角色；当你于自己回合内使用过【龙胆】，本回合结束阶段摸一张牌。',
                            hpp_zhenji: '甄姬',
                            hpp_luoshen: '洛神',
                            hpp_luoshen_info: '准备阶段，你可以进行判定，若结果为黑色，你获得此牌，然后你可以重复此流程；红色，获得此牌，然后结束此流程。',
                            hpp_zhongyao: '钟繇',
                            hpp_huomo: '活墨',
                            hpp_huomo_info: '当你需要使用基本牌时，你可以将一张不为基本牌的黑色牌置于牌堆顶。若如此做，你视为使用此基本牌，每回合限两次。',
                            hpp_zuoding: '佐定',
                            hpp_zuoding_info: '任意角色在其出牌阶段内使用黑桃牌时，若没有角色受到过伤害，你可以令其中的一个目标角色摸一张牌。',
                            hpp_zhouyu: '周瑜',
                            hpp_yingzi: '英姿',
                            hpp_yingzi_info: '锁定技，摸牌阶段，你多摸一张牌；你的手牌上限等于你的体力上限。',
                            hpp_fanjian: '反间',
                            hpp_fanjian_info: '出牌阶段开始时，你可以选择一名其他角色，令其摸一张牌然后对其造成1点伤害。',
                            hpp_zhugeliang: '诸葛亮',
                            hpp_guanxing: '观星',
                            hpp_guanxing_info: '准备阶段和结束阶段，你可以观看牌堆顶的五张牌（仅2人是改为三），然后放置于牌堆顶或牌堆底。',
                            hpp_kongcheng: '空城',
                            hpp_kongcheng_info: '锁定技，若你没有手牌，你不能成为【杀】、【决斗】或【顺手牵羊】的目标。',
                            hpp_zuoci: '左慈',
                            hpp_shendao: '神道',
                            hpp_shendao_info: '你的判定牌生效前，你可以将判定结果修改为任意花色。',
                            hpp_xinsheng: '新生',
                            hpp_xinsheng_info: '当你受到伤害后，你可以亮出牌堆顶三张牌，然后获得其中花色不同的牌各一张。',
                            // SP
                            hpp_sp_pangtong: 'SP庞统',
                            hpp_guolun: '过论',
                            hpp_guolun_info: '出牌阶段限一次，你可展示一名其他角色的一张手牌。然后你可选择你的一张牌。若其选择的牌点数小，你与其交换这两张牌，其摸一张牌，你回复1点体力；若你选择的牌点数小，你与其交互这两张牌，你摸两张牌。',
                            hpp_songsang: '送丧',
                            hpp_songsang_info: '当其他角色死亡时，你可加1点体力上限并回复1点体力。',
                            hpp_zhanji: "展骥",
                            hpp_zhanji_info: "锁定技，当你于出牌阶段内因摸牌且并非因发动此技能而得到牌时，你摸一张牌。",
                            hpp_sp_zhaoyun: 'SP赵云',
                            hpp_chongzhen: '冲阵',
                            hpp_chongzhen1: '冲阵',
                            hpp_chongzhen2: '冲阵',
                            hpp_chongzhen_info: '当你发动〖龙胆〗时，你可以获得对方的一张手牌。',
                            // 神
                            hpp_shen_caocao: '神曹操',
                            hpp_guixin: '归心',
                            hpp_guixin_info: '当你受到1点伤害后，你可以随机获得每名其他角色区域里的一张牌，如果获得牌大于4张且你为正面，则翻面。',
                            hpp_shen_luxun: '神陆逊',
                            hpp_junlue: '军略',
                            hpp_junlue_info: '锁定技，当你受到或造成1点伤害后，你获得一个“军略"标记。',
                            hpp_cuike: '摧克',
                            hpp_cuike_info: '出牌阶段开始时，若“军略”数量为奇数，你可以对一名角色造成1点伤害；若“军略”数量为偶数，你可以横置一名角色并弃置其区域里的—张牌。若“军略”数量超过7个，你可以移去全部“军略”标记并对所有其他角色造成1点伤害。',
                            hpp_zhanhuo: '绽火',
                            hpp_zhanhuo_info: '限定技，出牌阶段，你可以移去全部“军略”标记，令至多等量的已横置角色弃置所有装备区里的牌，然后对其中1名角色造成1点火焰伤害。',
                            hpp_shen_lvmeng: '神吕蒙',
                            hpp_gongxin: '攻心',
                            hpp_gongxin_info: '当你使用牌指定唯一目标或成为其他角色使用牌的唯一目标后，你可观看目标角色的手牌，然后你可以展示其中一张红色牌，获得此牌或将此牌置于牌堆顶（每回合限触发一次）。',
                            hpp_shen_zhaoyun: '神赵云',
                            hpp_juejing: '绝境',
                            hpp_juejing_info: '锁定技，你的手牌上限+3；当你进入或脱离濒死状态时，你摸一张牌。',
                            hpp_longhun: '龙魂',
                            hpp_longhun_info: '你可以将至多两张同花色的牌按以下规则使用或打出：红桃当【桃】；方块当火【杀】；梅花当【闪】；黑桃当【无懈可击】。若你以此法使用了两张红色牌，则此牌回复值或伤害值+1，且你摸一张牌。若你以此法使用了两张黑色牌，则你获得当前回合角色一张牌。',
                            hpp_shen_zhangjiao: '神张角',
                            hpp_yizhao: '异兆',
                            hpp_yizhao_info: '锁定技，你使用或打出一张牌时，获得等于此牌点数的“黄”标记。每次“黄”的十位数因此变化时，你获得牌堆中一张与变化后十位数点数相同的牌。',
                            hpp_sanshou: '三首',
                            hpp_sanshou_info: '当你受到伤害时，你可以亮出牌堆顶三张牌，若包含本回合未使用过的类型，你防止此伤害。',
                            hpp_sijun: '肆军',
                            hpp_sijun_info: '准备阶段，若“黄”标记数量大于牌堆的牌数，你可以移去所有“黄”，然后从牌堆中随机获得点数之和为36的牌，并洗牌。',
                            hpp_tianjie: '天劫',
                            hpp_tianjie_info: '每个回合结束时，若本回合牌堆洗过牌，你可以选择至多3名其他角色，对这些角色分别造成X点雷电伤害（X为其手牌中【闪】的数量且至少为1）',

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
                            xian_sp2: '限·SP2',
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
            intro: "官方作者：《欢乐三国杀》<br/>\
                    扩展作者：捞德一<br/>\
                    代码节选：《活动武将》萌新",
            // author: "欢乐三国杀(搬运:捞德一)",
            diskURL: "",
            forumURL: "",
            version: "1.0",
        }, files: { "character": [], "card": [], "skill": [] },
        editable: false
    }
})