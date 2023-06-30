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
                            'hpp_shen_guojia',
                            'hpp_shen_luxun',
                            'hpp_shen_lvbu',
                            'hpp_shen_lvmeng',
                            'hpp_shen_zhaoyun',
                            'hpp_shen_zhangjiao',
                            'hpp_shen_zhugeliang',

                            'hpp_bulianshi',
                            'hpp_caiwenji',
                            'hpp_caoang',
                            'hpp_caocao',
                            'hpp_caochong',
                            'hpp_caopi',
                            'hpp_caoren',
                            'hpp_caorui',
                            'hpp_caoxiu',
                            'hpp_caoying',
                            'hpp_caozhang',
                            'hpp_caozhen',
                            'hpp_caozhi',
                            'hpp_chendao',
                            'hpp_chengpu',
                            'hpp_chunyuqiong',
                            'hpp_daqiao',
                            'hpp_dengai',
                            'hpp_dianwei',
                            'hpp_diaochan',
                            'hpp_dongbai',
                            'hpp_dongyun',
                            'hpp_dongzhuo',
                            'hpp_dufuren',
                            'hpp_fuhuanghou',
                            'hpp_ganning',
                            'hpp_gaoshun',
                            'hpp_gongsunzan',
                            'hpp_guanping',
                            'hpp_guanyinping',
                            'hpp_guanyu',
                            'hpp_guohuai',
                            'hpp_guohuanghou',
                            'hpp_guojia',
                            'hpp_handang',
                            'hpp_haozhao',
                            'hpp_huaman',
                            'hpp_huanggai',
                            'hpp_huangzhong',
                            'hpp_huaxiong',
                            'hpp_jiangwei',
                            'hpp_jiaxu',
                            'hpp_liaohua',
                            'hpp_lidian',
                            'hpp_lijue',
                            'hpp_lingtong',
                            'hpp_liubiao',
                            'hpp_liubei',
                            'hpp_liufeng',
                            'hpp_liushan',
                            'hpp_liuxie',
                            'hpp_liuyan',
                            'hpp_liyan',
                            'hpp_luji',
                            'hpp_lukang',
                            'hpp_lusu',
                            'hpp_luxun',
                            'hpp_luyusheng',
                            'hpp_lvbu',
                            'hpp_lvlingqi',
                            'hpp_lvmeng',
                            'hpp_machao',
                            'hpp_madai',
                            'hpp_masu',
                            'hpp_mayunlu',
                            'hpp_menghuo',
                            'hpp_panfeng',
                            'hpp_pangde',
                            'hpp_pangtong',
                            'hpp_quyi',
                            'hpp_shamoke',
                            'hpp_simayi',
                            'hpp_sunce',
                            'hpp_sunhao',
                            'hpp_sunjian',
                            'hpp_sunliang',
                            'hpp_sunluban',
                            'hpp_sunluyu',
                            'hpp_sunquan',
                            'hpp_sunshangxiang',
                            'hpp_taishici',
                            'hpp_wangping',
                            'hpp_wangyi',
                            'hpp_weiyan',
                            'hpp_wuyi',
                            'hpp_xiahouba',
                            'hpp_xiahoudun',
                            'hpp_xiahoulingnv',
                            'hpp_xiaoqiao',
                            'hpp_xinxianying',
                            'hpp_xuhuang',
                            'hpp_xurong',
                            'hpp_xusheng',
                            'hpp_xunyu',
                            'hpp_xushi',
                            'hpp_xuyou',
                            'hpp_xuzhu',
                            'hpp_yanliangwenchou',
                            'hpp_yanyan',
                            'hpp_yuanshao',
                            'hpp_yuanshu',
                            'hpp_yuji',
                            'hpp_yujin',
                            'hpp_zhangchunhua',
                            'hpp_zhangfei',
                            'hpp_zhanghe',
                            'hpp_zhangji',
                            'hpp_zhangjiao',
                            'hpp_zhangliao',
                            'hpp_zhangsong',
                            'hpp_zhangxingcai',
                            'hpp_zhangxiu',
                            'hpp_zhangzhaozhanghong',
                            'hpp_zhaoxiang',
                            'hpp_zhaoyun',
                            'hpp_zhenji',
                            'hpp_zhonghui',
                            'hpp_zhongyao',
                            'hpp_zhouyu',
                            'hpp_zhugeguo',
                            'hpp_zhugeke',
                            'hpp_zhugeliang',
                            'hpp_zhugezhan',
                            'hpp_zhuhuan',
                            'hpp_zhuran',
                            'hpp_zhuzhi',
                            'hpp_zumao',
                            'hpp_zuoci',
                            'hpp_sp_caiwenji',
                            'hpp_sp_daqiao',
                            'hpp_sp_diaochan',
                            'hpp_sp_jiangwei',
                            'hpp_sp_machao',
                            'hpp_sp_pangde',
                            'hpp_sp_pangtong',
                            'hpp_sp_sunshangxiang',
                            'hpp_sp_taishici',
                            'hpp_sp_xiaoqiao',
                            'hpp_sp_zhaoyun',

                            'hpp_sunwukong',
                        ],
                        //史诗
                        epic: [
                            'hpp_xiahouyuan',
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
                                lin_zhi: ['hpp_wangji', 'hpp_zhangsong', 'hpp_zhongyao', 'hpp_masu', 'hpp_huangyueying', 'hpp_luxun', 'hpp_lusu', 'hpp_jiaxu'],
                                lin_man: ['hpp_huaman', 'hpp_shamoke', 'hpp_zhurong', 'hpp_menghuo',],
                                lin_xiong: ['hpp_sunliang', 'hpp_sunjian', 'hpp_gongsunzan', 'hpp_dongzhuo', 'hpp_liuyan'],
                                huo_zhong: ['hpp_zhangzhaozhanghong', 'hpp_yanyan', 'hpp_wangping', 'hpp_chendao', 'hpp_dianwei', 'hpp_jiangwei', 'hpp_xunyu', 'hpp_dongyun', 'hpp_zumao'],
                                huo_yi: ['hpp_taishici', 'hpp_luji', 'hpp_lingtong', 'hpp_xusheng', 'hpp_gaoshun', 'hpp_zhuran', 'hpp_zhuhuan', 'hpp_zhuzhi',],
                                huo_bi: ['hpp_zhonghui', 'hpp_liuxie', 'hpp_panfeng', 'hpp_quyi', 'hpp_yanliangwenchou', 'hpp_yuanshao', 'hpp_xuyou', 'hpp_yuanshu'],
                                huo_yong: ['hpp_xiahoujie'],
                                shan_zhen: ['hpp_fuhuanghou', 'hpp_mayunlu', 'hpp_xushi', 'hpp_dufuren', 'hpp_xiahoulingnv', 'hpp_wangrong', 'hpp_caiwenji', 'hpp_wangyi', 'hpp_zhangchunhua', 'hpp_bulianshi'],
                                shan_si: ['hpp_liushan', 'hpp_zhugezhan', 'hpp_guanping', 'hpp_liufeng', 'hpp_zhangxingcai', 'hpp_guanyinping', 'hpp_zhaoxiang'],
                                shan_liang: ['hpp_xuhuang', 'hpp_dengai', 'hpp_zhanghe', 'hpp_yujin', 'hpp_lidian'],
                                shan_ce: ['hpp_wolongzhuge', 'hpp_xunyou', 'hpp_jianyong', 'hpp_buzhi', 'hpp_yanjun', 'hpp_yangxiu'],
                                shan_ji: ['hpp_lukang', 'hpp_liuchen', 'hpp_zhugeguo', 'hpp_sunhao', 'hpp_zhugeke', 'hpp_xiahouba', 'hpp_luyusheng',],
                                ming_shu: ['hpp_zhoufei', 'hpp_wuguotai', 'hpp_sunluban', 'hpp_xiahoushi', 'hpp_wuxian', 'hpp_guohuanghou', 'hpp_xinxianying', 'hpp_dongbai', 'hpp_sunluyu', 'hpp_wanniangongzhu'],
                                ming_ru: ['hpp_fazheng', 'hpp_chengong', 'hpp_liru', 'hpp_jushou', 'hpp_zhugejin', 'hpp_qinmi', 'hpp_xushu', 'hpp_liuzhang'],
                                ming_cao: ['hpp_caopi', 'hpp_caozhi', 'hpp_caozhang', 'hpp_caochong', 'hpp_caozhen', 'hpp_caorui', 'hpp_caoxiu', 'hpp_caoang', 'hpp_caoying'],
                                ming_han: ['hpp_haozhao', 'hpp_zhangxiu', 'hpp_madai', 'hpp_chengpu', 'hpp_handang', 'hpp_wuyi', 'hpp_liyan', 'hpp_xurong', 'hpp_lijue', 'hpp_zhangji', 'hpp_chunyuqiong'],
                                ming_qi: ['hpp_xizhicai', 'hpp_zhangliang', 'hpp_zhangbao', 'hpp_beimihu'],
                                ming_jue: ['hpp_hetaihou'],
                                xian_sp: ['hpp_sp_jiangwei', 'hpp_sp_haungyueying', 'hpp_sp_taishici', 'hpp_sp_machao', 'hpp_sp_daqiao', 'hpp_sp_zhaoyun', 'hpp_sp_sunshangxiang', 'hpp_sp_caiwenji', 'hpp_sp_xiaoqiao', 'hpp_sp_diaochan'],
                                xian_sp2: ['hpp_sp_pangtong', 'hpp_sp_pangde'],
                                xian_jin: ['hpp_guansuo', 'hpp_baosanniang', 'hpp_wenyang', 'hpp_liuzan', 'hpp_guozhao', 'hpp_fanyufeng', 'hpp_panshu', 'hpp_lvlingqi', 'hpp_zhangchangpu', 'hpp_zhangqiying', 'hpp_puyuan', 'hpp_xushao'],
                                xian_xiu: ['hpp_zhouyi', 'hpp_fengyu', 'hpp_tenggongzhu'],
                                shen_wei: ['hpp_shen_caocao', 'hpp_shen_simayi', 'hpp_shen_zhangliao', 'hpp_shen_dianwei', 'hpp_shen_guojia'],
                                shen_shu: ['hpp_shen_guanyu', 'hpp_shen_zhugeliang', 'hpp_shen_zhaoyun', 'hpp_shen_liubei'],
                                shen_wu: ['hpp_shen_lvmeng', 'hpp_shen_zhouyu', 'hpp_shen_luxun', 'hpp_shen_ganning', 'hpp_shen_sunquan', 'hpp_shen_sunce', 'shen_daxiaoqiao'],
                                shen_qun: ['hpp_shen_lvbu', 'hpp_shen_huatuo', 'hpp_shen_zhenji', 'hpp_shen_zhangjiao', 'shen_diaochan'],
                                doudizhu: ['hpp_sunwukong'],
                            },
                        },
                        character: {
                            // 欢乐步练师
                            hpp_bulianshi: ['female', 'wu', 3, ['hpp_anxu', 'zhuiyi'], []],
                            // 欢乐蔡文姬
                            hpp_caiwenji: ['female', 'qun', 3, ['hpp_beige', 'duanchang'], []],
                            // 欢乐曹昂
                            hpp_caoang: ['male', 'wei', 4, ['hpp_kangkai'], []],
                            // 欢乐曹操
                            hpp_caocao: ["male", "wei", 4, ["hpp_jianxiong", "hpp_hujia"], ['zhu']],
                            // 欢乐曹冲
                            hpp_caochong: ['male', 'wei', 3, ['hpp_chengxiang', 'renxin'], []],
                            // 欢乐曹丕
                            hpp_caopi: ['male', 'wei', 3, ['hpp_xingshang', 'hpp_fangzhu', 'songwei'], ['zhu']],
                            // 欢乐曹仁
                            hpp_caoren: ['male', 'wei', 4, ['hpp_jushou', 'xinjiewei'], []],
                            // 欢乐曹叡
                            hpp_caorui: ['male', 'wei', 3, ['huituo', 'hpp_mingjian', 'hpp_xingshuai'], ['zhu']],
                            // 欢乐曹休
                            hpp_caoxiu: ['male', 'wei', 4, ['qianju', 'hpp_qingxi'], []],
                            // 欢乐曹婴
                            hpp_caoying: ['female', 'wei', 4, ['hpp_lingren', 'hpp_fujian'], []],
                            // 欢乐曹彰
                            hpp_caozhang: ['male', 'wei', 4, ['hpp_jiangchi'], []],
                            // 欢乐曹真
                            hpp_caozhen: ['male', 'wei', 4, ['hpp_sidi'], []],
                            // 欢乐曹植
                            hpp_caozhi: ['male', 'wei', 3, ['hpp_luoying', 'hpp_jiushi'], []],
                            // 欢乐陈到
                            hpp_chendao: ['male', 'shu', 4, ['hpp_wanglie'], []],
                            // 欢乐程普
                            hpp_chengpu: ['male', 'wu', 4, ['hpp_lihuo', 'hpp_chunlao'], []],
                            // 欢乐淳于琼
                            hpp_chunyuqiong: ['male', 'qun', 4, ['minicangchu', 'miniliangying', 'minishishou'], []],
                            // 欢乐大乔
                            hpp_daqiao: ['female', 'wu', 3, ['hpp_wanrong', 'hpp_guose', 'hpp_liuli'], []],
                            // 欢乐邓艾
                            hpp_dengai: ['male', 'wei', 4, ['hpp_tuntian', 'zaoxian'], []],
                            // 欢乐典韦
                            hpp_dianwei: ['male', 'wei', 4, ['hpp_qiangxi'], []],
                            // 欢乐貂蝉
                            hpp_diaochan: ['female', 'qun', 3, ['hpp_lijian', 'hpp_biyue'], []],
                            // 欢乐董白
                            hpp_dongbai: ['female', 'qun', 3, ['hpp_lianzhu', 'hpp_xiahui'], []],
                            // 欢乐董允
                            hpp_dongyun: ['male', 'shu', 3, ['hpp_bingzheng', 'sheyan'], []],
                            // 欢乐董卓
                            hpp_dongzhuo: ['male', 'qun', 8, ['hpp_jiuchi', 'hpp_roulin', 'hpp_benghuai', 'hpp_baonue'], ['zhu']],
                            // 欢乐杜夫人
                            hpp_dufuren: ['female', 'wei', 3, ['hpp_yise', 'hpp_shunshi'], []],
                            // 欢乐伏皇后
                            hpp_fuhuanghou: ['female', 'qun', 3, ['hpp_zhuikong', 'hpp_qiuyuan'], []],
                            // 欢乐甘宁
                            hpp_ganning: ['male', 'wu', 4, ['hpp_qixi', 'hpp_fenwei'], []],
                            // 欢乐高顺
                            hpp_gaoshun: ['male', 'qun', 4, ['hpp_xianzhen', 'hpp_jinjiu'], []],
                            // 欢乐公孙瓒
                            hpp_gongsunzan: ['male', 'qun', 4, ['hpp_qiaomeng', 'hpp_yicong'], []],
                            // 欢乐关平
                            hpp_guanping: ['male', 'shu', 4, ['jiezhong', 'hpp_longyin'], []],
                            // 欢乐关银屏
                            hpp_guanyinping: ['female', 'shu', 3, ['hpp_xuehen', 'hpp_huxiao', 'hpp_wuji'], []],
                            // 欢乐关羽
                            hpp_guanyu: ['male', 'shu', 4, ['hpp_wusheng'], []],
                            // 欢乐郭淮
                            hpp_guohuai: ['male', 'wei', 4, ['hpp_jingce'], []],
                            // 欢乐郭皇后
                            hpp_guohuanghou: ['female', 'wei', 3, ['hpp_jiaozhao', 'hpp_danxin'], []],
                            // 欢乐郭嘉
                            hpp_guojia: ['male', 'wei', 3, ['hpp_tiandu', 'hpp_yiji'], []],
                            // 欢乐韩当
                            hpp_handang: ['male', 'wu', 4, ['xingongji', 'xinjiefan'], []],
                            // 欢乐郝昭
                            hpp_haozhao: ['male', 'wei', 4, ['drlt_zhenggu'], []],
                            // 欢乐花鬘
                            hpp_huaman: ['female', 'shu', 4, ['hmmanyi', 'mansi', 'hpp_souying', 'hpp_zhanyuan'], []],
                            // 欢乐黄盖
                            hpp_huanggai: ['male', 'wu', 4, ['kurou', 'hpp_zhaxiang'], []],
                            // 欢乐黄忠
                            hpp_huangzhong: ['male', 'shu', 4, ['hpp_liegong'], []],
                            // 欢乐华雄
                            hpp_huaxiong: ['male', 'qun', 6, ['hpp_yaowu', 'hpp_yangwei'], []],
                            // 欢乐姜维
                            hpp_jiangwei: ['male', 'shu', 4, ['hpp_tiaoxin', 'hpp_zhiji'], []],
                            // 欢乐贾诩
                            hpp_jiaxu: ['male', 'qun', 3, ['hpp_wansha', 'luanwu', 'weimu'], []],
                            // 欢乐廖化
                            hpp_liaohua: ['male', 'shu', 4, ['hpp_dangxian', 'hpp_fuli'], []],
                            // 欢乐李典
                            hpp_lidian: ['male', 'wei', 3, ['hpp_xunxun', 'wangxi'], []],
                            // 欢乐李傕
                            hpp_lijue: ['male', 'qun', '5/6', ['xinfu_langxi', 'xinfu_yisuan'], []],
                            // 欢乐凌统
                            hpp_lingtong: ['male', 'wu', 4, ['hpp_xuanfeng', 'hpp_yongjin'], []],
                            // 欢乐刘表
                            hpp_liubiao: ['male', 'qun', 3, ['hpp_zishou', 'hpp_zongshi'], []],
                            // 欢乐刘备
                            hpp_liubei: ['male', 'shu', 4, ['hpp_rende', 'hpp_jijiang'], ['zhu']],
                            // 欢乐刘封
                            hpp_liufeng: ['male', 'shu', 4, ['hpp_xiansi'], []],
                            // 欢乐刘禅
                            hpp_liushan: ['male', 'shu', 4, ['xiangle', 'hpp_fangquan', 'hpp_ruoyu'], ['zhu']],
                            // 欢乐刘协
                            hpp_liuxie: ['male', 'qun', 3, ['hpp_tianming', 'hpp_mizhao'], []],
                            // 欢乐刘焉
                            hpp_liuyan: ['male', 'qun', 3, ['xinfu_tushe', 'xinfu_limu'], []],
                            // 欢乐李严
                            hpp_liyan: ['male', 'shu', 4, ['hpp_duliang', 'fulin'], []],
                            // 欢乐陆绩
                            hpp_luji: ['male', 'wu', 3, ['nzry_huaiju', 'nzry_yili', 'nzry_zhenglun'], []],
                            // 欢乐陆抗
                            hpp_lukang: ['male', 'wu', 4, ['drlt_qianjie', 'hpp_jueyan', 'hpp_huairou'], []],
                            // 欢乐鲁肃
                            hpp_lusu: ['male', 'wu', 3, ['hpp_haoshi', 'hpp_dimeng'], []],
                            // 欢乐陆逊
                            hpp_luxun: ['male', 'wu', 3, ['hpp_qianxun', 'lianying'], []],
                            // 欢乐陆郁生
                            hpp_luyusheng: ['female', 'wu', 3, ['hpp_zhente', 'hpp_zhiwei'], []],
                            // 欢乐吕布
                            hpp_lvbu: ['male', 'qun', 5, ['wushuang'], []],
                            // 欢乐吕玲绮
                            hpp_lvlingqi: ['female', 'qun', 4, ['guowu', 'zhuangrong'], []],
                            // 欢乐吕蒙
                            hpp_lvmeng: ['male', 'wu', 4, ['hpp_keji', 'hpp_qinxue'], []],
                            // 欢乐马超
                            hpp_machao: ['male', 'shu', 4, ['hpp_yuma', 'hpp_tieji'], []],
                            // 欢乐马岱
                            hpp_madai: ['male', 'shu', 4, ['hpp_qianxi', 'mashu'], []],
                            // 欢乐马谡
                            hpp_masu: ['male', 'shu', 3, ['hpp_sanyao', 'rezhiman'], []],
                            // 欢乐马云禄
                            hpp_mayunlu: ['female', 'shu', 4, ['hpp_fengpo', 'mashu'], []],
                            // 欢乐孟获
                            hpp_menghuo: ['male', 'shu', 5, ['hpp_huoshou', 'zaiqi'], []],
                            // 欢乐潘凤
                            hpp_panfeng: ['male', 'qun', 4, ['hpp_kuangfu'], []],
                            // 欢乐庞德
                            hpp_pangde: ['male', 'qun', 4, ['mashu', 'hpp_jianchu'], []],
                            // 欢乐庞统
                            hpp_pangtong: ['male', 'shu', 3, ['hpp_lianhuan', 'hpp_niepan'], []],
                            // 欢乐麴义
                            hpp_quyi: ['male', 'qun', 4, ['hpp_fuqi', 'hpp_jiaozi'], []],
                            // 欢乐沙摩柯
                            hpp_shamoke: ['male', 'shu', 4, ['hpp_jili'], []],
                            // 欢乐司马懿
                            hpp_simayi: ['male', 'wei', 3, ['hpp_fankui', 'hpp_guicai'], []],
                            // 欢乐孙策
                            hpp_sunce: ['male', 'wu', 4, ['hpp_jiang', 'hpp_hunzi', 'hpp_zhiba'], ['zhu']],
                            // 欢乐孙皓
                            hpp_sunhao: ['male', 'wu', 5, ['hpp_canshi', 'hpp_chouhai', 'guiming'], ['zhu']],
                            // 欢乐孙坚
                            hpp_sunjian: ['male', 'wu', 4, ['hpp_yinghun', 'hpp_wulie'], []],
                            // 欢乐孙亮
                            hpp_sunliang: ['male', 'wu', 3, ['hpp_kuizhu', 'hpp_chezheng', 'hpp_lijun'], ['zhu']],
                            // 欢乐孙鲁班
                            hpp_sunluban: ['female', 'wu', 3, ['hpp_zenhui', 'hpp_jiaojin'], []],
                            // 欢乐孙鲁育
                            hpp_sunluyu: ['female', 'wu', 3, ['hpp_meibu', 'remumu'], []],
                            // 欢乐孙权
                            hpp_sunquan: ['male', 'wu', 4, ['hpp_zhiheng', 'hpp_jiuyuan'], ['zhu']],
                            // 欢乐孙尚香
                            hpp_sunshangxiang: ['female', 'wu', 3, ['hpp_jieyi', 'xiaoji'], []],
                            // 欢乐太史慈
                            hpp_taishici: ['male', 'wu', 4, ['hpp_tianyi'], []],
                            // 欢乐王平
                            hpp_wangping: ['male', 'shu', 4, ['hpp_feijun', 'hpp_binglue'], []],
                            // 欢乐魏延
                            hpp_weiyan: ['male', 'shu', 4, ['hpp_kuanggu', 'hpp_qimou'], []],
                            // 欢乐王异
                            hpp_wangyi: ['female', 'wei', 4, ['hpp_zhenlie', 'hpp_miji'], []],
                            // 欢乐吴懿
                            hpp_wuyi: ['male', 'shu', 4, ['xinbenxi'], ['clan:陈留吴氏']],
                            // 欢乐夏侯霸
                            hpp_xiahouba: ['male', 'shu', 4, ['hpp_baobian'], []],
                            // 欢乐夏侯惇
                            hpp_xiahoudun: ['male', 'wei', 4, ['reganglie', 'hpp_qingjian'], []],
                            // 欢乐夏侯令女
                            hpp_xiahoulingnv: ['female', 'wei', 4, ['fuping', 'hpp_weilie'], []],
                            // 欢乐夏侯渊
                            hpp_xiahouyuan: ['male', 'wei', 4, ['hpp_shensu'], ['unseen']],
                            // 欢乐小乔
                            hpp_xiaoqiao: ['female', 'wu', 3, ['hpp_tianxiang', 'hpp_hongyan'], []],
                            // 欢乐辛宪英
                            hpp_xinxianying: ['female', 'wei', 3, ['hpp_zhongjian', 'hpp_caishi'], []],
                            // 欢乐徐晃
                            hpp_xuhuang: ['male', 'wei', 4, ['hpp_duanliang', 'hpp_jiezi'], []],
                            // 欢乐荀彧
                            hpp_xunyu: ['male', 'wei', 3, ['hpp_quhu', 'hpp_jieming'], []],
                            // 欢乐徐荣
                            hpp_xurong: ['male', 'qun', 4, ['xinfu_shajue', 'xinfu_xionghuo'], []],
                            // 欢乐徐盛
                            hpp_xusheng: ['male', 'wu', 4, ['hpp_pojun'], []],
                            // 欢乐徐氏
                            hpp_xushi: ['female', 'wu', 3, ['hpp_wengua', 'hpp_fuzhu'], []],
                            // 欢乐许攸
                            hpp_xuyou: ['male', 'qun', 3, ['hpp_chenglve', 'nzry_shicai', 'nzry_cunmu'], []],
                            // 欢乐许诸
                            hpp_xuzhu: ['male', 'wei', 4, ['hpp_luoyi', 'hpp_huchi'], []],
                            // 欢乐颜良文丑
                            hpp_yanliangwenchou: ['male', 'qun', 4, ['hpp_shuangxiong'], []],
                            // 欢乐严颜
                            hpp_yanyan: ['male', 'shu', 4, ['hpp_juzhan'], []],
                            // 欢乐袁绍
                            hpp_yuanshao: ['male', 'qun', 4, ['hpp_luanji', 'hpp_xueyi'], ['zhu']],
                            // 欢乐袁术
                            hpp_yuanshu: ['male', 'qun', 4, ['yongsi', 'hpp_weidi'], []],
                            // 欢乐于吉
                            hpp_yuji: ['male', 'qun', 4, ['hpp_guhuo'], []],
                            // 欢乐于禁
                            hpp_yujin: ['male', 'wei', 4, ['hpp_yizhong', 'decadezhenjun'], []],
                            // 欢乐张春华
                            hpp_zhangchunhua: ['female', 'wei', 3, ['hpp_jueqing', 'hpp_shangshi'], []],
                            // 欢乐张飞
                            hpp_zhangfei: ['male', 'shu', 4, ['new_repaoxiao', 'hpp_tishen'], []],
                            // 欢乐张郃
                            hpp_zhanghe: ['male', 'wei', 4, ['hpp_qiaobian'], []],
                            // 欢乐张济
                            hpp_zhangji: ['male', 'qun', 4, ['minilveming', 'minitunjun'], []],
                            // 欢乐张角
                            hpp_zhangjiao: ['male', 'qun', 3, ['hpp_leiji', 'hpp_guidao', 'hpp_huangtian'], ['zhu']],
                            // 欢乐张辽
                            hpp_zhangliao: ['male', 'wei', 4, ['new_retuxi', 'hpp_zhengbing'], []],
                            // 欢乐张松
                            hpp_zhangsong: ['male', 'shu', 3, ['qiangzhi', 'hpp_xiantu'], []],
                            // 欢乐张星彩
                            hpp_zhangxingcai: ['female', 'shu', 3, ['shenxian', 'hpp_qiangwu'], []],
                            // 欢乐张绣
                            hpp_zhangxiu: ['male', 'qun', 4, ['drlt_xiongluan', 'drlt_congjian'], []],
                            // 欢乐张昭张纮
                            hpp_zhangzhaozhanghong: ['male', 'wu', 3, ['hpp_zhijian', 'hpp_guzheng'], []],
                            // 欢乐赵襄
                            hpp_zhaoxiang: ['female', 'shu', 4, ['hpp_fanghun', 'hpp_fuhan'], []],
                            // 欢乐赵云
                            hpp_zhaoyun: ['male', 'shu', 4, ['hpp_longdan', 'hpp_yajiao'], []],
                            // 欢乐甄姬
                            hpp_zhenji: ['female', 'wei', 3, ['hpp_luoshen', 'qingguo'], []],
                            // 欢乐钟会
                            hpp_zhonghui: ['male', 'wei', 3, ['hpp_quanji', 'hpp_paiyi'], []],
                            // 欢乐钟繇
                            hpp_zhongyao: ['male', 'wei', 3, ['hpp_huomo', 'hpp_zuoding'], []],
                            // 欢乐周瑜
                            hpp_zhouyu: ['male', 'wu', 3, ['hpp_yingzi', 'hpp_fanjian'], []],
                            // 欢乐诸葛果
                            hpp_zhugeguo: ['female', 'shu', 3, ['hpp_qirang', 'hpp_yuhua'], []],
                            // 欢乐诸葛恪
                            hpp_zhugeke: ['male', 'wu', 3, ['hpp_aocai', 'hpp_duwu'], []],
                            // 欢乐诸葛亮
                            hpp_zhugeliang: ['male', 'shu', 3, ['hpp_guanxing', 'hpp_kongcheng'], []],
                            // 欢乐诸葛瞻
                            hpp_zhugezhan: ['male', 'shu', 3, ['hpp_zuilun', 'xinfu_fuyin'], []],
                            // 欢乐朱桓
                            hpp_zhuhuan: ['male', 'wu', 4, ['hpp_fenli', 'hpp_pingkou'], []],
                            // 欢乐朱然
                            hpp_zhuran: ['male', 'wu', 4, ['hpp_danshou'], []],
                            // 欢乐朱治
                            hpp_zhuzhi: ['male', 'wu', 4, ['hpp_anguo'], []],
                            // 欢乐祖茂
                            hpp_zumao: ['male', 'wu', 4, ['hpp_yinbing', 'hpp_juedi'], []],
                            // 欢乐左慈
                            hpp_zuoci: ['male', 'qun', 3, ['hpp_shendao', 'hpp_xinsheng'], ['die_audio']],

                            // 欢乐SP蔡文姬
                            hpp_sp_caiwenji: ['female', 'wei', 3, ['hpp_chenqing', 'hpp_mozhi'], []],
                            // 欢乐SP大乔
                            hpp_sp_daqiao: ['female', 'wu', 3, ['hpp_yanxiao', 'hpp_guose', 'hpp_anxian'], []],
                            // 欢乐SP貂蝉
                            hpp_sp_diaochan: ['female', 'qun', 3, ['hpp_lihun', 'hpp_pianyi'], []],
                            // 欢乐SP姜维
                            hpp_sp_jiangwei: ['male', 'wei', 4, ['hpp_kunfen', 'hpp_fengliang'], []],
                            // 欢乐SP马超
                            hpp_sp_machao: ['male', 'qun', 4, ['hpp_zhuiji', 'hpp_shichou'], []],
                            // 欢乐SP庞德
                            hpp_sp_pangde: ['male', 'wei', 4, ['hpp_juesi', 'hpp_yuma'], []],
                            // 欢乐SP庞统
                            hpp_sp_pangtong: ['male', 'wu', 3, ['hpp_guolun', 'hpp_songsang', 'hpp_zhanji'], []],
                            // 欢乐SP孙尚香
                            hpp_sp_sunshangxiang: ['female', 'shu', 3, ['hpp_liangzhu', 'hpp_fanxiang'], []],
                            // 欢乐SP太史慈
                            hpp_sp_taishici: ['male', 'qun', 4, ['hpp_jixu'], []],
                            // 欢乐SP小乔
                            hpp_sp_xiaoqiao: ['female', 'wu', 3, ['hpp_xingwu', 'hpp_luoyan', 'hpp_huimou'], []],
                            // 欢乐SP赵云
                            hpp_sp_zhaoyun: ['male', 'qun', 3, ['hpp_longdan', 'hpp_chongzhen'], []],

                            // 神曹操
                            hpp_shen_caocao: ['male', 'shen', 3, ['hpp_guixin', 'feiying'], ['wei']],
                            // 神郭嘉
                            hpp_shen_guojia: ['male', 'shen', 3, ['reshuishi', 'hpp_gjtianyi', 'hpp_huishi'], ['wei']],
                            // 神陆逊
                            hpp_shen_luxun: ["male", "shen", 4, ["hpp_junlue", "hpp_cuike", "hpp_zhanhuo"], ["wu"]],
                            // 神吕布
                            hpp_shen_lvbu: ['male', 'shen', 6, ['hpp_wuqian', 'hpp_shenfen'], ['qun']],
                            // 神吕蒙
                            hpp_shen_lvmeng: ['male', 'shen', 3, ['hpp_shelie', 'hpp_gongxin'], ['wu']],
                            // 神赵云
                            hpp_shen_zhaoyun: ['male', 'shen', 2, ['hpp_juejing', 'hpp_longhun'], ['shu']],
                            // 神张角
                            hpp_shen_zhangjiao: ['male', 'shen', 3, ['hpp_yizhao', 'hpp_sanshou', 'hpp_sijun', 'hpp_tianjie'], ['qun']],
                            // 神诸葛亮
                            hpp_shen_zhugeliang: ['male', 'shen', 3, ['hpp_qixing', 'hpp_kuangfeng', 'hpp_dawu'], ['shu']],

                            // 孙悟空
                            hpp_sunwukong: ['male', 'qun', 4, ['hpp_72bian', 'hpp_ruyi', 'hpp_qitian'], []],
                        },
                        characterIntro: {
                            hpp_lidian: '字曼成，曹操麾下将领。李典深明大义，不与人争功，崇尚学习与高贵儒雅，尊重博学之士，在军中被称为长者。李典有长者之风，官至破虏将军，三十六岁去世。魏文帝曹丕继位后追谥号为愍侯。',
                            hpp_zhangzhaozhanghong: '张昭，字子布，彭城人，三国时期吴国重臣，善丹青。拜辅吴将军，班亚三司，改封娄侯。年八十一卒，谥曰文侯。<br/>张纮，字子纲，广陵人。东吴谋士，和张昭一起合称“二张”。孙策平定江东时亲自登门邀请，张纮遂出仕为官。张纮后来建议孙权迁都秣陵，孙权正在准备时张纮病逝，其年六十岁。孙权为之流涕。',
                            hpp_yanliangwenchou: '东汉末年河北袁绍部下武将，素有威名。颜良与文丑一起作为袁绍军队的勇将而闻名。建安四年（199），袁绍以颜良、文丑为将，率精卒十万，准备攻许都；次年，兵进黎阳，遣颜良攻白马。终均亡于关羽刀下。',
                            hpp_sp_caiwenji: '名琰，原字昭姬，晋时避司马昭讳，改字文姬，东汉末年陈留圉（今河南开封杞县）人，东汉大文学家蔡邕的女儿，是中国历史上著名的才女和文学家，精于天文数理，既博学能文，又善诗赋，兼长辩才与音律。代表作有《胡笳十八拍》、《悲愤诗》等 。',
                            hpp_sp_daqiao: '庐江皖县人，为乔公长女，孙策之妻，小乔之姊。与小乔并称为“江东二乔”，容貌国色流离。',
                            hpp_sp_diaochan: '中国古代四大美女之一，有闭月羞花之貌。司徒王允之义女，由王允授意施行连环计，离间董卓、吕布，借布手除卓。后貂蝉成为吕布的妾。',
                            hpp_sp_jiangwei: '字伯约，天水冀人。三国时期蜀汉著名将领、军事统帅。原为曹魏天水郡的中郎将，后降蜀汉，官至凉州刺史、大将军。诸葛亮去世后继承诸葛亮的遗志，继续率领蜀汉军队北伐曹魏，与曹魏名将陈泰、郭淮、邓艾等多次交手。',
                            hpp_sp_machao: '字孟起，扶风茂陵人。面如冠玉，目如流星，虎体猿臂，彪腹狼腰，声雄力猛。因衣着讲究，举止非凡，故人称“锦马超”。麾铁骑，捻金枪。',
                            hpp_sp_pangde: '字令明，东汉末年雍州南安郡狟道县（今甘肃天水市武山县四门镇）人。曹操部下重要将领。官至立义将军，拜关门亭侯。谥曰壮侯。有一子庞会。',
                            hpp_sp_pangtong: "庞统，字士元，襄阳（治今湖北襄阳）人。三国时刘备帐下谋士，官拜军师中郎将。才智与诸葛亮齐名，人称“凤雏”。在进围雒县时，统率众攻城，不幸被流矢击中去世，时年三十六岁。追赐统为关内侯，谥曰靖侯。庞统死后，葬于落凤庞统墓坡。",
                            hpp_sp_sunshangxiang: '孙夫人，乃孙权之妹。刘备定荆州，孙权进妹与其结姻，重固盟好。孙夫人才捷刚猛，有诸兄之风。后人为其立庙，号曰“枭姬庙”。',
                            hpp_sp_taishici: '太史慈，字子义，东莱黄县（今山东龙口东黄城集）人。东汉末年武将，守言应诺，恪遵信义，始终如一，弭息诽论。官至建昌都尉。弓马熟练，箭法精良。原为刘繇部下，后被孙策收降，于赤壁之战前病逝，死时才四十一岁。',
                            hpp_sp_xiaoqiao: '庐江皖县人也。父桥国老德尊于时。小乔国色流离，资貌绝伦。建安三年，周瑜协策攻皖，拔之。娶小乔为妻。后人谓英雄美女，天作之合。',
                            hpp_sp_zhaoyun: '字子龙，常山真定人。身长八尺，姿颜雄伟。长坂坡单骑救阿斗，先主云：“子龙一身都是胆也。”',
                            hpp_shen_caocao: '魏武帝曹操，字孟德，小名阿瞒、吉利，沛国谯人。精兵法，善诗歌，乃治世之能臣，乱世之奸雄也。',
                            hpp_shen_guojia: '字奉孝，颍川阳翟人，官至军师祭酒。惜天妒英才，英年早逝。有诗云：“良计环环不遗策，每临制变满座惊”。',
                            hpp_shen_luxun: '本名陆议，字伯言，吴郡吴县人。历任东吴大都督、丞相。吴大帝孙权兄孙策之婿，世代为江东大族。以谦逊之书麻痹关羽，夺取荆州，又有火烧连营大破蜀军。',
                            hpp_shen_lvbu: '字奉先，五原郡九原县人。三国第一猛将，曾独力战刘关张三人，其武力世之无双。时人语曰：“人中有吕布，马中有赤兔。”',
                            hpp_shen_zhaoyun: '字子龙，常山真定人。身长八尺，姿颜雄伟。长坂坡单骑救阿斗，先主云：“子龙一身都是胆也。”',
                            hpp_shen_zhangjiao: '乱世的开始，黄巾起义军首领，太平道创始人。张角早年信奉黄老学说，对在汉代十分流行的谶纬之学也深有研究，对民间医术 、巫术也很熟悉。',
                            hpp_shen_zhugeliang: '字孔明、号卧龙，汉族，琅琊阳都人，三国时期蜀汉丞相、杰出的政治家、军事家、发明家、文学家。在世时被封为武乡侯，死后追谥忠武侯，后来东晋政权推崇诸葛亮军事才能，特追封他为武兴王。诸葛亮为匡扶蜀汉政权，呕心沥血、鞠躬尽瘁、死而后已。其代表作有《前出师表》、《后出师表》、《诫子书》等。曾发明木牛流马等，并改造连弩，可一弩十矢俱发。于234年在宝鸡五丈原逝世。',
                            hpp_sunwukong: '狗卡桌游《自在西游》联动角色',
                        },
                        characterReplace: {
                            // B
                            bulianshi: ['hpp_bulianshi', 're_bulianshi', 'dc_bulianshi', 'bulianshi', 'old_bulianshi'],
                            // C
                            caiwenji: ['hpp_caiwenji', 'ol_caiwenji', 're_caiwenji', 'caiwenji'],
                            caoang: ['hpp_caoang', 'caoang', 'yj_caoang', 'tw_caoang'],
                            caocao: ['hpp_caocao', 're_caocao', 'caocao'],
                            caochong: ['hpp_caochong', 'caochong', 'old_caochong'],
                            caopi: ['hpp_caopi', 'caopi', 're_caopi', 'ps_caopi'],
                            caoren: ['hpp_caoren', 'caoren', 'new_caoren', 'old_caoren'],
                            caorui: ['hpp_caorui', 'caorui', 'old_caorui'],
                            caoxiu: ['hpp_caoxiu', 're_caoxiu', 'tw_caoxiu', 'xin_caoxiu', 'caoxiu', 'old_caoxiu'],
                            caoying: ['hpp_caoying', 'caoying'],
                            caozhang: ['hpp_caozhang', 're_caozhang', 'xin_caozhang', 'caozhang'],
                            caozhen: ['hpp_caozhen', 're_caozhen', 'xin_caozhen', 'caozhen', 'old_caozhen'],
                            caozhi: ['hpp_caozhi', 're_caozhi', 'dc_caozhi', 'caozhi', 'ps_caozhi'],
                            chendao: ['hpp_chendao', 'chendao', 'old_chendao', 'ns_chendao'],
                            chengpu: ['hpp_chengpu', 're_chengpu', 'tw_chengpu', 'ns_chengpu', 'chengpu', 'xin_chengpu'],
                            chunyuqiong: ['hpp_chunyuqiong', 'chunyuqiong', 're_chunyuqiong'],
                            // D
                            daqiao: ['hpp_daqiao', 're_daqiao', 'daqiao'],
                            dengai: ['hpp_dengai', 're_dengai', 'ol_dengai', 'dengai'],
                            dianwei: ['hpp_dianwei', 'ol_dianwei', 're_dianwei', 'dianwei'],
                            diaochan: ['hpp_diaochan', 're_diaochan', 'diaochan'],
                            dongbai: ['hpp_dongbai', 're_dongbai', 'dongbai', 'jsrg_dongbai'],
                            dongyun: ['hpp_dongyun', 'dongyun'],
                            dongzhuo: ['hpp_dongzhuo', 'ol_dongzhuo', 'sp_dongzhuo', 're_dongzhuo', 'dongzhuo'],
                            dufuren: ['hpp_dufuren', 'dufuren'],
                            // F
                            fuhuanghou: ['hpp_fuhuanghou', 're_fuhuanghou', 'xin_fuhuanghou', 'fuhuanghou', 'old_fuhuanghou'],
                            // G
                            ganning: ['hpp_ganning', 're_ganning', 'ganning'],
                            gaoshun: ['hpp_gaoshun', 'xin_gaoshun', 're_gaoshun', 'gaoshun', 'old_gaoshun'],
                            gongsunzan: ['hpp_gongsunzan', 'dc_gongsunzan', 're_gongsunzan', 'xin_gongsunzan', 'gongsunzan'],
                            guanping: ['hpp_guanping', 're_guanping', 'guanping'],
                            guanyinping: ['hpp_guanyinping', 'guanyinping'],
                            guanyu: ['hpp_guanyu', 're_guanyu', 'guanyu'],
                            guohuai: ['hpp_guohuai', 'guohuai', 'tw_guohuai', 're_guohuai', 'xin_guohuai', 'ol_guohuai'],
                            guohuanghou: ['hpp_guohuanghou', 're_guohuanghou', 'guohuanghou'],
                            guojia: ['hpp_guojia', 're_guojia', 'guojia'],
                            // H
                            handang: ['hpp_handang', 'tw_handang', 'xin_handang', 're_handang', 'handang', 'old_handang'],
                            haozhao: ['hpp_haozhao', 'haozhao'],
                            huaman: ['hpp_huaman', 'huaman', 'sp_huaman'],
                            huanggai: ['hpp_huanggai', 're_huanggai', 'huanggai'],
                            huangzhong: ['hpp_huangzhong', 'ol_huangzhong', 're_huangzhong', 'huangzhong'],
                            huaxiong: ['hpp_huaxiong', 're_huaxiong', 'old_huaxiong', 'huaxiong', 'ol_huaxiong'],
                            // J
                            jiangwei: ['hpp_jiangwei', 'ol_jiangwei', 're_jiangwei', 'jiangwei'],
                            jiaxu: ['hpp_jiaxu', 're_jiaxu', 'jiaxu', 'ns_jiaxu'],
                            // L
                            liaohua: ['hpp_liaohua', 'xin_liaohua', 're_liaohua', 'liaohua'],
                            re_lidian: ['hpp_lidian', 're_lidian', 'old_re_lidian', 'junk_lidian'],
                            lijue: ['hpp_lijue', 'lijue', 'ns_lijue'],
                            lingtong: ['hpp_lingtong', 'xin_lingtong', 're_lingtong', 'lingtong', 'old_lingtong'],
                            liubiao: ['hpp_liubiao', 're_liubiao', 'xin_liubiao', 'liubiao', 'oldre_liubiao', 'old_liubiao'],
                            liubei: ['hpp_liubei', 're_liubei', 'liubei', 'junk_liubei'],
                            liufeng: ['hpp_liufeng', 're_liufeng', 'liufeng'],
                            liushan: ['hpp_liushan', 'ol_liushan', 're_liushan', 'liushan'],
                            liuxie: ['hpp_liuxie', 'liuxie'],
                            liuyan: ['hpp_liuyan', 'liuyan'],
                            liyan: ['hpp_liyan', 'liyan', 'old_liyan'],
                            ol_lusu: ['hpp_lusu', 'ol_lusu', 're_lusu'],
                            luji: ['hpp_luji', 'luji'],
                            lukang: ['hpp_lukang', 'lukang'],
                            luxun: ['hpp_luxun', 're_luxun', 'luxun'],
                            ol_lusu: ['hpp_lusu', 'ol_lusu', 're_lusu'],
                            luyusheng: ['hpp_luyusheng', 'luyusheng'],
                            lvbu: ['hpp_lvbu', 're_lvbu', 'lvbu'],
                            lvlingqi: ['hpp_lvlingqi', 'lvlingqi'],
                            lvmeng: ['hpp_lvmeng', 're_lvmeng', 'lvmeng'],
                            // M
                            machao: ['hpp_machao', 're_machao', 'machao'],
                            madai: ['hpp_madai', 'tw_madai', 're_madai', 'old_madai', 'madai'],
                            masu: ['hpp_masu', 'xin_masu', 're_masu', 'masu'],
                            mayunlu: ['hpp_mayunlu', 'tw_mayunlu', 'mayunlu'],
                            menghuo: ['hpp_menghuo', 're_menghuo', 'menghuo'],
                            // P
                            panfeng: ['hpp_panfeng', 're_panfeng', 'panfeng'],
                            pangde: ['hpp_pangde', 'ol_pangde', 're_pangde', 'pangde'],
                            pangtong: ['hpp_pangtong', 'ol_pangtong', 're_pangtong', 'pangtong'],
                            // Q
                            quyi: ['hpp_quyi', 'quyi', 're_quyi'],
                            // S
                            shamoke: ['hpp_shamoke', 'shamoke'],
                            simayi: ['hpp_simayi', 're_simayi', 'simayi'],
                            sunce: ['hpp_sunce', 're_sunben', 're_sunce', 'sunce'],
                            sunhao: ['hpp_sunhao', 'sunhao'],
                            sunjian: ['hpp_sunjian', 'ol_sunjian', 're_sunjian', 'sunjian'],
                            sunliang: ['hpp_sunliang', 'sunliang'],
                            sunluban: ['hpp_sunluban', 're_sunluban', 'xin_sunluban', 'sunluban'],
                            sunluyu: ['hpp_sunluyu', 'sunluyu', 're_sunluyu'],
                            sunquan: ['hpp_sunquan', 're_sunquan', 'sunquan'],
                            sunshangxiang: ['hpp_sunshangxian', 're_sunshangxiang', 'sunshangxiang'],
                            // T
                            taishici: ['hpp_taishici', 're_taishici', 'taishici'],
                            // W
                            wangping: ['hpp_wangping', 'wangping'],
                            weiyan: ['hpp_weiyan', 'ol_weiyan', 're_weiyan', 'weiyan'],
                            wangyi: ['hpp_wangyi', 're_wangyi', 'wangyi', 'old_wangyi'],
                            wuyi: ['hpp_wuyi', 're_wuyi', 'xin_wuyi', 'wuyi'],
                            // X
                            xiahouba: ['hpp_xiahouba', 'xiahouba', 'tw_xiahouba'],
                            xiahoudun: ['hpp_xiahoudun', 're_xiahoudun', 'xin_xiahoudun', 'xiahoudun'],
                            xiahoulingnv: ['hpp_xiahoulingnv', 'xiahoulingnv'],
                            xiahouyuan: ['hpp_xiahouyuan', 'ol_xiahouyuan', 're_xiahouyuan', 'xiahouyuan'],
                            xiaoqiao: ['hpp_xiaoqiao', 'ol_xiaoqiao', 're_xiaoqiao', 'xiaoqiao'],
                            xinxianying: ['hpp_xinxianying', 're_xinxianying', 'xinxianying', 'ol_xinxianying', 'sp_xinxianying'],
                            xuhuang: ['hpp_xuhuang', 'ol_xuhuang', 're_xuhuang', 'xuhuang'],
                            xurong: ['hpp_xurong', 'xurong'],
                            xusheng: ['hpp_xusheng', 'xin_xusheng', 're_xusheng', 'xusheng', 'old_xusheng'],
                            xushi: ['hpp_xushi', 'xushi'],
                            xunyu: ['hpp_xunyu', 'ol_xunyu', 're_xunyu', 'xunyu'],
                            xuyou: ['hpp_xuyou', 'sp_xuyou', 'xuyou'],
                            xuzhu: ['hpp_xuzhu', 're_xuzhu', 'xuzhu'],
                            // Y
                            yanwen: ['hpp_yanliangwenchou', 're_yanwen', 'yanwen'],
                            yanyan: ['hpp_yanyan', 'yanyan'],
                            re_yuanshao: ['hpp_yuanshao', 'ol_yuanshao', 're_yuanshao', 'xin_yuanshao'],
                            yuanshu: ['hpp_yuanshu', 'yl_yuanshu', 'yuanshu', 're_yuanshu', 'old_yuanshu', 'ol_yuanshu'],
                            yuji: ['hpp_yuji', 'xin_yuji', 're_yuji', 'yuji'],
                            yujin: ['hpp_yujin', 'yujin_yujin', 'ol_yujin', 'xin_yujin', 'yujin'],
                            // Z
                            zhangchunhua: ['hpp_zhangchunhua', 're_zhangchunhua', 'zhangchunhua', 'mini_zhangchunhua'],
                            zhangfei: ['hpp_zhangfei', 're_zhangfei', 'tw_zhangfei', 'xin_zhangfei', 'old_zhangfei', 'zhangfei'],
                            zhanghe: ['hpp_zhanghe', 're_zhanghe', 'zhanghe'],
                            zhangji: ['zhangji', 'ns_zhangji'],
                            zhangjiao: ['hpp_zhangjiao', 're_zhangjiao', 'sp_zhangjiao', 'zhangjiao'],
                            zhangliao: ['hpp_zhangliao', 're_zhangliao', 'zhangliao'],
                            zhangsong: ['hpp_zhangsong', 'zhangsong'],
                            zhangxingcai: ['hpp_zhangxingcai', 'zhangxingcai', 'old_zhangxingcai'],
                            zhangxiu: ['hpp_zhangxiu', 'zhangxiu'],
                            zhangzhang: ['hpp_zhangzhaozhanghong', 're_zhangzhang', 'zhangzhang'],
                            zhaoxiang: ['hpp_zhaoxiang', 'zhaoxiang', 'tw_zhaoxiang'],
                            zhaoyun: ['hpp_zhaoyun', 're_zhaoyun', 'old_zhaoyun', 'zhaoyun'],
                            zhenji: ['hpp_zhenji', 're_zhenji', 'zhenji'],
                            zhonghui: ['hpp_zhonghui', 're_zhonghui', 'xin_zhonghui', 'zhonghui', 'old_zhonghui'],
                            zhongyao: ['hpp_zhongyao', 'zhongyao'],
                            zhouyu: ['hpp_zhouyu', 're_zhouyu', 'zhouyu'],
                            zhugeguo: ['hpp_zhugeguo', 'tw_zhugeguo', 'zhugeguo'],
                            zhugeke: ['hpp_zhugeke', 'zhugeke'],
                            zhugeliang: ['hpp_zhugeliang', 're_zhugeliang', 'zhugeliang'],
                            zhugezhan: ['hpp_zhugezhan', 'zhugezhan', 'old_zhugezhan'],
                            zhuhuan: ['hpp_zhuhuan', 're_zhuhuan', 'xin_zhuhuan', 'zhuhuan', 'old_zhuhuan'],
                            zhuran: ['hpp_zhuran', 're_zhuran', 'xin_zhuran', 'zhuran', 'old_zhuran'],
                            zhuzhi: ['hpp_zhuhzi', 're_zhuzhi', 'zhuzhi', 'xin_zhuzhi', 'old_zhuzhi'],
                            zumao: ['hpp_zumao', 'zumao', 'tw_zumao'],
                            zuoci: ['hpp_zuoci', 're_zuoci', 'zuoci'],
                            // SP
                            sp_caiwenji: ['hpp_sp_caiwenji', 'sp_caiwenji'],
                            sp_daqiao: ['hpp_sp_daqiao', 'sp_daqiao'],
                            sp_diaochan: ['hpp_sp_diaochan', 'sp_diaochan'],
                            sp_jiangwei: ['hpp_sp_jiangwei', 'sp_jiangwei'],
                            sp_machao: ['hpp_sp_machao', 'sp_machao', 'old_machao'],
                            sp_pangde: ['hpp_sp_pangde', 'sp_pangde'],
                            re_jsp_pangtong: ['hpp_sp_pangtong', 're_jsp_pangtong', 'sp_pangtong'],
                            sp_sunshangxiang: ['hpp_sp_sunshangxiang', 'sp_sunshangxiang'],
                            sp_taishici: ['hpp_sp_taishici', 're_sp_taishici', 'sp_taishici'],
                            sp_zhaoyun: ['hpp_sp_zhaoyun', 'sp_zhaoyun', 'jsp_zhaoyun'],
                            // 神
                            shen_caocao: ['hpp_shen_caocao', 'shen_caocao'],
                            shen_guojia: ['hpp_shen_guojia', 'shen_guojia'],
                            shen_luxun: ['hpp_shen_luxun', 'shen_luxun'],
                            shen_lvbu: ['hpp_shen_lvbu', 'shen_lvbu'],
                            shen_lvmeng: ['hpp_shen_lvmeng', 'tw_shen_lvmeng', 'shen_lvmeng'],
                            shen_zhaoyun: ['hpp_shen_zhaoyun', 'shen_zhaoyun', 'boss_zhaoyun'],
                            shen_zhangjiao: ['hpp_shen_zhangjiao', 'shen_zhangjiao'],
                            shen_zhugeliang: ['hpp_shen_zhugelaing', 'shen_zhugeliang'],
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
                            hpp_ruyijingubang: {
                                derivation: 'hpp_sunwukong',
                                type: 'equip',
                                subtype: 'equip1',
                                ai: { basic: { equipValue: 4399 } },
                                skills: ['hpp_ruyijingubang', 'hpp_ruyijingubang2'],
                            },
                        },
                        skill: {
                            // 步练师
                            hpp_anxu: {
                                audio: 'anxu',
                                trigger: { player: ['phaseUseBegin', 'phaseUseEnd'] },
                                direct: true,
                                filter: function (event, player) {
                                    return game.hasPlayer(function (current) {
                                        return current != player /* && current.isMaxHandcard() */ && current.countCards('h');
                                    });
                                },
                                content: function () {
                                    'step 0'
                                    event.notMeMaxHand = 0;
                                    for (var i = 0; i < game.players.length; i++) {
                                        if (game.players[i].isOut() || game.players[i] == player) continue;
                                        event.notMeMaxHand = game.players[i].countCards('h') > event.notMeMaxHand ? game.players[i].countCards('h') : event.notMeMaxHand;
                                    }
                                    'step 1'
                                    player.chooseTarget(get.prompt2('hpp_anxu'), function (card, player, target) {
                                        game.log(target, ' ', target != player && target.countCards('h') && target.countCards('h') == event.notMeMaxHand);
                                        game.log('target != player', target != player);
                                        game.log("target.countCards('h')", target.countCards('h'));
                                        game.log("event.notMeMaxHand", event.notMeMaxHand);
                                        return target != player && target.countCards('h') && target.countCards('h') == event.notMeMaxHand;
                                        // return target.isMaxHandcard() && target.countCards('h') && player != target;
                                    }).set('ai', function (target) {
                                        var att = get.attitude(_status.event.player, target);
                                        if (target.hasSkill('tuntian')) return att / 10;
                                        return -att;
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        event.target = target;
                                        player.logSkill('hpp_anxu', target);
                                        player.gainPlayerCard(target, 'h', true);
                                    }
                                    else {
                                        event.finish();
                                    }
                                    'step 3'
                                    if (get.suit(result.cards[0]) == 'spade') {
                                        player.line(target);
                                        target.draw();
                                    }
                                },
                            },

                            // 蔡文姬
                            hpp_beige: {
                                audio: 'beige',
                                trigger: { global: 'damageEnd' },
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && event.source && event.player.isAlive() && player.countCards('he');
                                },
                                direct: true,
                                preHidden: true,
                                content: function () {
                                    'step 0'
                                    player.chooseToDiscard('he', get.prompt2('hpp_beige', trigger.player)).set('ai', function (card) {
                                        var player = _status.event.player;
                                        var target = _status.event.list[0];
                                        var source = _status.event.list[1];
                                        var att1 = get.attitude(player, target);
                                        var att2 = get.attitude(player, source);
                                        switch (get.suit(card)) {
                                            case 'heart': case 'diamond':
                                                if (att1 > 0) return 10 - get.value(card);
                                                return 0;
                                                break;
                                            case 'club':
                                                if (att2 < 0) return (7 - get.value(card)) * (source.countCards('he') ? 1 : 0);
                                                return 0;
                                                break;
                                            case 'spade':
                                                if (att2 > 0 && source.isTurnedOver()) return 20 - get.value(card);
                                                if (att2 < 0 && !source.isTurnedOver()) return 10 - get.value(card);
                                                return 0;
                                                break;
                                        }
                                    }).setHiddenSkill('hpp_beige').set('list', [trigger.player, trigger.source]).logSkill = 'hpp_beige';
                                    'step 1'
                                    if (result.bool) {
                                        switch (get.suit(result.cards[0])) {
                                            case 'heart': case 'diamond':
                                                player.line(trigger.player);
                                                trigger.player.recover();
                                                trigger.player.draw(2);
                                                break;
                                            case 'club':
                                                player.line(trigger.source);
                                                trigger.source.chooseToDiscard('he', 2, true);
                                                break;
                                            case 'spade':
                                                player.line(trigger.source);
                                                trigger.source.turnOver();
                                                break;
                                        }
                                    }
                                },
                                ai: { expose: 0.25 },
                            },

                            // 曹昂
                            hpp_kangkai: {
                                audio: 'kaikang',
                                trigger: { global: 'useCardToTargeted' },
                                filter: function (event, player) {
                                    return event.card.name == 'sha' && get.distance(player, event.target) <= 1;
                                },
                                forced: true,
                                content: function () {
                                    'step 0'
                                    player.draw();
                                    if (trigger.target != player && player.countMark('hpp_kangkai') < 2) {
                                        player.chooseCard('he', '慷忾：是否交给' + get.translation(trigger.target) + '一张牌？').set('ai', function (card) {
                                            if (get.position(card) == 'e') return -1;
                                            if (card.name == 'shan' && get.attitude(player, trigger.target) > 0) return 1;
                                            if (get.type(card) == 'equip' && get.attitude(player, trigger.target) > 0) return 0.5;
                                            if (card.name == 'du' && get.attitude(player, trigger.target) < 0) return 5;
                                            return 0;
                                        });
                                    }
                                    else event.finish();
                                    'step 1'
                                    if (result.bool) {
                                        player.addTempSkill('hpp_kangkai2');
                                        player.addMark('hpp_kangkai2', 1, false);
                                        trigger.target.gain(result.cards, player, 'give');
                                        game.delayx();
                                        event.card = result.cards[0];
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (trigger.target.getCards('h').contains(card) && get.type(card) == 'equip') trigger.target.chooseUseTarget(card);
                                },
                            },
                            hpp_kangkai2: {
                                charlotte: true,
                                onremove: true,
                            },

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

                            // 曹冲
                            hpp_chengxiang: {
                                trigger: { player: 'damageEnd' },
                                forced: true,
                                audio: 'chengxiang',
                                content: function () {
                                    "step 0"
                                    event.cards = get.cards(4);
                                    game.cardsGotoOrdering(event.cards);
                                    event.videoId = lib.status.videoId++;
                                    game.broadcastAll(function (player, id, cards, num) {
                                        var str;
                                        if (player == game.me && !_status.auto) {
                                            str = '称象：选择任意张点数不大于' + num + '的牌';
                                        }
                                        else {
                                            str = '称象';
                                        }
                                        var dialog = ui.create.dialog(str, cards);
                                        dialog.videoId = id;
                                    }, player, event.videoId, event.cards, event.name == 'hpp_chengxiang' ? 13 : 12);
                                    event.time = get.utc();
                                    game.addVideo('showCards', player, ['称象', get.cardsInfo(event.cards)]);
                                    game.addVideo('delay', null, 2);
                                    "step 1"
                                    var next = player.chooseButton([0, 4]);
                                    next.set('dialog', event.videoId);
                                    next.set('filterButton', function (button) {
                                        var num = 0
                                        for (var i = 0; i < ui.selected.buttons.length; i++) {
                                            num += get.number(ui.selected.buttons[i].link);
                                        }
                                        return (num + get.number(button.link) <= _status.event.maxNum);
                                    });
                                    next.set('maxNum', event.name == 'hpp_chengxiang' ? 13 : 12);
                                    next.set('ai', function (button) {
                                        return get.value(button.link, _status.event.player);
                                    });
                                    "step 2"
                                    if (result.bool && result.links) {
                                        var cards2 = [];
                                        for (var i = 0; i < result.links.length; i++) {
                                            cards2.push(result.links[i]);
                                            cards.remove(result.links[i]);
                                        }
                                        event.cards2 = cards2;
                                    }
                                    else {
                                        event.finish();
                                    }
                                    var time = 1000 - (get.utc() - event.time);
                                    if (time > 0) {
                                        game.delay(0, time);
                                    }
                                    "step 3"
                                    game.broadcastAll('closeDialog', event.videoId);
                                    var cards2 = event.cards2;
                                    player.gain(cards2, 'log', 'gain2');
                                },
                                ai: {
                                    maixie: true,
                                    maixie_hp: true,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (get.tag(card, 'damage')) {
                                                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                                if (!target.hasFriend()) return;
                                                if (target.hp >= 4) return [1, 2];
                                                if (target.hp == 3) return [1, 1.5];
                                                if (target.hp == 2) return [1, 0.5];
                                            }
                                        }
                                    }
                                }
                            },

                            // 曹丕
                            hpp_xingshang: {
                                audio: 'xingshang',
                                audioname2: { WEI_caoying: 'lingren_xingshang' },
                                trigger: { global: 'die' },
                                preHidden: true,
                                content: function () {
                                    if (trigger.player.countCards('he')) player.gain(trigger.player.getCards('he'), trigger.player, 'giveAuto');
                                    player.draw();
                                },
                            },
                            hpp_fangzhu: {
                                audio: 'fangzhu',
                                trigger: { player: 'damageEnd' },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_fangzhu'), '令一名其他角色将武将牌翻面并摸一张牌', lib.filter.notMe).ai = function (target) {
                                        if (target.hasSkillTag('noturn')) return 0;
                                        var player = _status.event.player, att = get.attitude(player, target);
                                        if (att < 0 && target.isTurnedOver()) return 0;
                                        if (att > 2 && target.isTurnedOver()) return att * 10;
                                        return -att;
                                    }
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_fangzhu', result.targets[0]);
                                        result.targets[0].turnOver();
                                        result.targets[0].draw();
                                    }
                                    else event.finish();
                                },
                                ai: {
                                    maixie: true,
                                    maixie_hp: true,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (get.tag(card, 'damage')) {
                                                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                                if (target.hp <= 1) return;
                                                if (!target.hasFriend()) return;
                                                var hastarget = false;
                                                var turnfriend = false;
                                                var players = game.filterPlayer();
                                                for (var i = 0; i < players.length; i++) {
                                                    if (get.attitude(target, players[i]) < 0 && !players[i].isTurnedOver()) {
                                                        hastarget = true;
                                                    }
                                                    if (get.attitude(target, players[i]) > 0 && players[i].isTurnedOver()) {
                                                        hastarget = true;
                                                        turnfriend = true;
                                                    }
                                                }
                                                if (get.attitude(player, target) > 0 && !hastarget) return;
                                                if (turnfriend || target.hp == target.maxHp) return [0.5, 1];
                                                if (target.hp > 1) return [1, 0.5];
                                            }
                                        }
                                    }
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

                            // 曹叡
                            hpp_mingjian: {
                                audio: 'mingjian',
                                enable: 'phaseUse',
                                usable: 1,
                                filterTarget: lib.filter.notMe,
                                filter: function (event, player) {
                                    return player.countCards('h');
                                },
                                filterCard: true,
                                selectCard: [1, Infinity],
                                check: () => 1,
                                discard: false,
                                lose: false,
                                delay: false,
                                content: function () {
                                    target.gain(cards, player, 'giveAuto');
                                    target.addTempSkill('hpp_mingjian2', { player: 'phaseAfter' });
                                    target.storage.hpp_mingjian2++;
                                    target.updateMarks('hpp_mingjian2');
                                },
                                ai: {
                                    order: 1,
                                    result: {
                                        target: function (player, target) {
                                            if (target.hasSkillTag('nogain')) return 0;
                                            if (player.countCards('h') == player.countCards('h', 'du')) return -1;
                                            if (target.hasJudge('lebu')) return 0;
                                            if (get.attitude(player, target) > 3) {
                                                var basis = get.threaten(target);
                                                if (player == get.zhu(player) && player.hp <= 2 && player.countCards('h', 'shan') && !game.hasPlayer(function (current) {
                                                    return get.attitude(current, player) > 3 && current.countCards('h', 'tao') > 0;
                                                })) return 0;
                                                if (target.countCards('h') + player.countCards('h') > target.hp + 2) return basis * 0.8;
                                                return basis;
                                            }
                                            return 0;
                                        },
                                    },
                                },
                            },
                            hpp_mingjian2: {
                                charlotte: true,
                                mark: true,
                                marktext: '鉴',
                                intro: { content: '手牌上限+#，出杀次数+#' },
                                init: function (player, skill) {
                                    if (!player.storage[skill]) player.storage[skill] = 0;
                                },
                                onremove: true,
                                mod: {
                                    maxHandcard: function (player, num) {
                                        return num + player.storage.hpp_mingjian2;
                                    },
                                    cardUsable: function (card, player, num) {
                                        if (card.name == 'sha') return num + player.storage.hpp_mingjian2;
                                    },
                                },
                            },
                            hpp_xingshuai: {
                                skillAnimation: true,
                                animationColor: 'thunder',
                                audio: 'xingshuai',
                                trigger: { player: 'dying' },
                                zhuSkill: true,
                                filter: function (event, player) {
                                    if (player.storage.hpp_xingshuai) return false;
                                    if (player.hp > 0) return false;
                                    if (!player.hasZhuSkill('hpp_xingshuai')) return false;
                                    return game.hasPlayer(function (current) {
                                        return current != player && current.group == 'wei';
                                    });
                                },
                                init: function (player) {
                                    if (player.hasZhuSkill('hpp_xingshuai')) {
                                        player.markSkill('hpp_xingshuai');
                                        player.storage.hpp_xingshuai = false;
                                    }
                                },
                                intro: { content: 'limited' },
                                unique: true,
                                limited: true,
                                mark: false,
                                content: function () {
                                    'step 0'
                                    player.storage.hpp_xingshuai = true;
                                    player.awakenSkill('hpp_xingshuai');
                                    var targets = game.filterPlayer();
                                    targets.remove(player);
                                    event.targets = targets;
                                    event.damages = [];
                                    'step 1'
                                    if (event.targets.length) {
                                        var current = event.targets.shift();
                                        if (current.group == 'wei') {
                                            current.chooseBool('是否令' + get.translation(player) + '回复1点体力？').set('ai', function () {
                                                return get.attitude(_status.event.player, _status.event.target) > 2;
                                            }).set('target', player);
                                            event.current = current;
                                        }
                                        else event.redo();
                                    }
                                    else event.goto(3);
                                    'step 2'
                                    if (result.bool) {
                                        event.damages.push(event.current);
                                        event.current.line(player, 'green');
                                        game.log(event.current, '令', player, '回复1点体力');
                                        player.recover();
                                    }
                                    if (event.targets.length) event.goto(1);
                                    'step 3'
                                    if (event.damages.length) {
                                        var next = game.createEvent('hpp_xingshuai_next');
                                        event.next.remove(next);
                                        trigger.after.push(next);
                                        next.targets = event.damages;
                                        next.setContent(function () {
                                            for (var target of targets) {
                                                target.damage();
                                                target.draw();
                                            }
                                        });
                                    }
                                },
                            },

                            // 曹休
                            hpp_qingxi: {
                                audio: 'qingxi',
                                inherit: 'reqingxi',
                            },
                            _hpp_qingxi_draw: {
                                charlotte: true,
                                trigger: { global: 'judgeAfter' },
                                filter: function (event, player) {
                                    return event.result.color == 'black' && event.getParent().name == 'hpp_qingxi' && event.getParent().player == player;
                                },
                                lastDo: true,
                                direct: true,
                                content: function () {
                                    player.draw(2);
                                },
                            },

                            // 曹婴
                            hpp_lingren: {
                                derivation: ['hpp_jianxiong', 'hpp_xingshang'],
                                audio: 'xinfu_lingren',
                                trigger: { player: 'useCardToPlayered' },
                                filter: function (event, player) {
                                    if (event.getParent().triggeredTargets3.length > 1) return false;
                                    if (!player.isPhaseUsing()) return false;
                                    if (!['basic', 'trick'].contains(get.type(event.card))) return false;
                                    if (get.tag(event.card, 'damage')) return true;
                                    return false;
                                },
                                usable: 1,
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_lingren'), '选择一名目标角色并猜测其手牌构成', function (card, player, target) {
                                        return _status.event.targets.contains(target);
                                    }).set('ai', function (target) {
                                        return 2 - get.attitude(_status.event.player, target);
                                    }).set('targets', trigger.targets);
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        event.target = target;
                                        player.logSkill('hpp_lingren', target);
                                        var list = ['hpp_lingren_basic', 'hpp_lingren_trick', 'hpp_lingren_equip'];
                                        player.chooseButton(['###' + '凌人：猜测' + get.translation(target) + '的手牌组成类型' + '###' + '请选出你认为' + get.translation(target) + '有的手牌类型', [list, 'vcard']], [0, 3]).set('ai', function (button) {
                                            var name = button.link[2];
                                            switch (name) {
                                                case 'hpp_lingren_basic':
                                                    var A = 0.95;
                                                    if (!target.countCards('h', { type: ['basic'] })) A = 0.05;
                                                    if (!target.countCards('h')) A = 0;
                                                    return Math.random() < A ? 1 : -1;
                                                    break;
                                                case 'hpp_lingren_trick':
                                                    var B = 0.9;
                                                    if (!target.countCards('h', { type: ['trick', 'delay'] })) B = 0.1;
                                                    if (!target.countCards('h')) B = 0;
                                                    return Math.random() < B ? 1 : -1;
                                                    break;
                                                case 'hpp_lingren_equip':
                                                    var C = 0.75;
                                                    if (!target.countCards('h', { type: ['equip'] })) C = 0.25;
                                                    if (!target.countCards('h')) C = 0;
                                                    return Math.random() < C ? 1 : -1;
                                                    break;
                                            }
                                        });
                                    }
                                    else {
                                        player.storage.counttrigger.hpp_lingren--;
                                        event.finish();
                                    }
                                    'step 2'
                                    event.num = 0;
                                    var list1 = [], list2 = [];
                                    if (result.links) for (var name of result.links) list1.push(name[2].slice(12));
                                    if (target.countCards('h')) for (var card of target.getCards('h')) if (!list2.contains(get.type2(card))) list2.push(get.type2(card));
                                    for (var type of ['basic', 'trick', 'equip']) if ((list1.contains(type) && list2.contains(type)) || (!list1.contains(type) && !list2.contains(type))) event.num++;
                                    if (!event.isMine() && !event.isOnline()) game.delayx();
                                    'step 3'
                                    player.popup('猜对' + get.cnNumber(event.num) + '项');
                                    game.log(player, '猜对了' + get.cnNumber(event.num) + '项');
                                    if (event.num > 0) {
                                        target.addTempSkill('hpp_lingren_adddamage');
                                        target.storage.hpp_lingren = {
                                            card: trigger.card,
                                        };
                                    }
                                    if (event.num > 1) player.draw(2);
                                    if (event.num > 2) {
                                        player.addTempSkill('hpp_jianxiong', { player: 'phaseBegin' });
                                        player.addTempSkill('hpp_xingshang', { player: 'phaseBegin' });
                                    }
                                },
                            },
                            hpp_lingren_adddamage: {
                                charlotte: true,
                                onremove: true,
                                trigger: { player: 'damageBegin3' },
                                filter: function (event, player) {
                                    var info = player.storage.hpp_lingren;
                                    return event.card && event.card == info.card;
                                },
                                silent: true,
                                popup: false,
                                forced: true,
                                content: function () {
                                    trigger.num++;
                                },
                            },
                            hpp_fujian: {
                                audio: 'xinfu_fujian',
                                trigger: { player: 'phaseJieshuBegin' },
                                filter: function (event, player) {
                                    return game.hasPlayer(function (current) {
                                        return current != player && current.countCards('h');
                                    });
                                },
                                direct: true,
                                locked: true,
                                content: function () {
                                    var target = game.filterPlayer(function (target) {
                                        return player != target && target.countCards('h');
                                    }).randomGet();
                                    var cards = target.getCards('h').randomGets(1);
                                    player.logSkill('hpp_fujian', target);
                                    var content = [get.translation(target) + '的一张手牌', cards];
                                    game.log(player, '观看了', target, '的一张手牌');
                                    player.chooseControl('ok').set('dialog', content);
                                },
                            },

                            // 曹彰
                            hpp_jiangchi: {
                                audio: 'jiangchi',
                                trigger: { player: 'phaseUseBegin' },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var list = [
                                        '摸三张牌，本回合内不能使用或打出【杀】且手牌上限+2',
                                        '摸一张牌，直到你的下个回合开始，受到伤害后摸一张牌',
                                        '本回合可以多使用一张【杀】且无距离限制',
                                    ];
                                    player.chooseControl('cancel2').set('prompt', get.prompt('xinjiangchi')).set('choiceList', list).set('ai', function () {
                                        var player = _status.event.player;
                                        var num = player.countCards('hs', function (card) {
                                            return get.name(card) == 'sha' && player.hasValueTarget(card, false);
                                        });
                                        if (num == 0) return 0;
                                        if (num > 1) return 2;
                                        return 1;
                                    });
                                    'step 1'
                                    if (result.control != 'cancel2') {
                                        player.logSkill('hpp_jiangchi');
                                        switch (result.index) {
                                            case 0: {
                                                player.draw(3);
                                                player.addTempSkill('xinjiangchi_less');
                                                player.addTempSkill('hpp_jiangchi_hand');
                                                break;
                                            }
                                            case 1: {
                                                player.draw();
                                                player.addTempSkill('hpp_jiangchi_draw', { player: 'phaseBegin' });
                                                break;
                                            }
                                            case 2: {
                                                player.addTempSkill('xinjiangchi_more');
                                                break;
                                            }
                                        }
                                    }
                                },
                                subSkill: {
                                    draw: {
                                        charlotte: true,
                                        audio: 'jiangchi',
                                        trigger: { player: 'damageEnd' },
                                        forced: true,
                                        content: function () {
                                            player.draw();
                                        },
                                    },
                                    hand: {
                                        charlotte: true,
                                        mod: {
                                            maxHandcard: function (player, num) {
                                                return num + 2;
                                            },
                                        },
                                    },
                                },
                            },

                            // 曹真
                            hpp_sidi: {
                                audio: 'sidi',
                                trigger: { player: 'phaseJieshuBegin' },
                                filter: function (event, player) {
                                    return player.countCards('he', function (card) {
                                        if (_status.connectMode) return true;
                                        return get.type(card) != 'basic';
                                    }) > 0;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseCard('he', get.prompt('hpp_sidi'), [1, 2], '将至多两张非基本牌置于武将牌上作为“司”', function (card, player) {
                                        return get.type(card) != 'basic';
                                    }).set('ai', function (card) {
                                        if (get.position(card) == 'e') return 5 + player.hp - get.value(card);
                                        return 7 - get.value(card);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_sidi');
                                        player.addToExpansion(result.cards, 'give', player).gaintag.add('hpp_sidi');
                                    }
                                },
                                intro: {
                                    content: 'expansion',
                                    markcount: 'expansion',
                                },
                                onremove: function (player, skill) {
                                    var cards = player.getExpansions(skill);
                                    if (cards.length) player.loseToDiscardpile(cards);
                                },
                                group: 'hpp_sidi_push',
                                ai: { notemp: true },
                                subSkill: {
                                    push: {
                                        trigger: { global: 'phaseUseBegin' },
                                        direct: true,
                                        filter: function (event, player) {
                                            return event.player != player && player.getExpansions('hpp_sidi').length > 0;
                                        },
                                        content: function () {
                                            'step 0'
                                            player.chooseButton([get.prompt('hpp_sidi', trigger.player), player.getExpansions('hpp_sidi')]).set('ai', function (button) {
                                                var player = _status.event.player;
                                                var target = _status.event.getTrigger().player;
                                                if (get.attitude(player, target) > -1) return 0;
                                                var card = button.link;
                                                var color = get.color(button.link, false);
                                                var eff = target.countCards('h', function (card) {
                                                    return get.color(card, target) == color && target.hasValueTarget(card);
                                                });
                                                if (!target.countCards('h', function (card) {
                                                    return get.color(card, target) == color && get.name(card, target) == 'sha' && target.hasValueTarget(card);
                                                })) eff += 1.5;
                                                if (!target.countCards('h', function (card) {
                                                    return get.color(card, target) == color && get.type2(card, target) == 'trick' && target.hasValueTarget(card);
                                                })) eff += 1.5;
                                                return eff - 1;
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                if (!trigger.residi) trigger.residi = [];
                                                trigger.residi.push(player);
                                                var card = result.links[0];
                                                var target = trigger.player;
                                                player.logSkill('hpp_sidi', target);
                                                player.loseToDiscardpile(card);
                                                var color = get.color(card, false);
                                                if (!target.storage.residi2) target.storage.residi2 = [];
                                                target.storage.residi2.add(color);
                                                target.addTempSkill('residi2', 'phaseUseAfter');
                                                target.markSkill('residi2');
                                                player.addTempSkill('residi3', 'phaseUseAfter');
                                            }
                                        },
                                    },
                                },
                            },

                            // 曹植
                            hpp_luoying: {
                                mod: {
                                    ignoredHandcard: function (card, player) {
                                        if (get.suit(card) == 'club') return true;
                                    },
                                    cardDiscardable: function (card, player, name) {
                                        if (name == 'phaseDiscard' && get.suit(card) == 'club') return false;
                                    },
                                },
                                audio: 'reluoying',
                                group: ['hpp_luoying_discard', 'hpp_luoying_judge'],
                                subfrequent: ['judge'],
                                subSkill: {
                                    discard: {
                                        trigger: { global: 'loseAfter' },
                                        filter: function (event, player) {
                                            if (event.type != 'discard') return false;
                                            if (event.player == player) return false;
                                            for (var i = 0; i < event.cards2.length; i++) {
                                                if (get.suit(event.cards2[i], event.player) == 'club' && get.position(event.cards2[i], true) == 'd') return true;
                                            }
                                            return false;
                                        },
                                        direct: true,
                                        content: function () {
                                            'step 0'
                                            if (trigger.delay == false) game.delay();
                                            'step 1'
                                            var cards = [];
                                            for (var i = 0; i < trigger.cards2.length; i++) {
                                                if (get.suit(trigger.cards2[i], trigger.player) == 'club' && get.position(trigger.cards2[i], true) == 'd') {
                                                    cards.push(trigger.cards2[i]);
                                                }
                                            }
                                            if (cards.length) {
                                                player.chooseButton(['落英：选择要获得的牌', cards], [1, cards.length]).set('ai', function (button) {
                                                    return get.value(button.link, _status.event.player, 'raw');
                                                });
                                            }
                                            else event.finish();
                                            'step 2'
                                            if (result.bool) {
                                                player.logSkill('hpp_luoying');
                                                player.gain(result.links, 'gain2');
                                            }
                                        },
                                    },
                                    judge: {
                                        trigger: { global: 'cardsDiscardAfter' },
                                        filter: function (event, player) {
                                            var evt = event.getParent().relatedEvent;
                                            if (!evt || evt.name != 'judge') return;
                                            if (evt.player == player) return false;
                                            if (get.position(event.cards[0], true) != 'd') return false;
                                            return (get.suit(event.cards[0]) == 'club');
                                        },
                                        direct: true,
                                        content: function () {
                                            'step 0'
                                            player.chooseButton(['落英：选择要获得的牌', trigger.cards], [1, trigger.cards.length]).set('ai', function (button) {
                                                return get.value(button.link, _status.event.player, 'raw');
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                player.logSkill('hpp_luoying');
                                                player.gain(result.links, 'gain2');
                                            }
                                        },
                                    },
                                },
                            },
                            hpp_jiushi: {
                                audio: 'rejiushi',
                                group: ['hpp_jiushi1', 'hpp_jiushi2', 'hpp_jiushi3', 'hpp_jiushi_gain'],
                                subfrequent: ['gain'],
                                subSkill: {
                                    gain: {
                                        audio: 'rejiushi',
                                        trigger: { player: 'turnOverAfter' },
                                        frequent: true,
                                        prompt: '是否发动【酒诗】，获得牌堆中的一张锦囊牌？',
                                        content: function () {
                                            var card = get.cardPile2(function (card) {
                                                return get.type2(card) == 'trick';
                                            });
                                            if (card) player.gain(card, 'gain2', 'log');
                                        },
                                    },
                                },
                            },
                            hpp_jiushi1: {
                                hiddenCard: function (player, name) {
                                    if (name == 'jiu') return !player.isTurnedOver();
                                    return false;
                                },
                                audio: 'rejiushi',
                                enable: 'chooseToUse',
                                filter: function (event, player) {
                                    if (player.classList.contains('turnedover')) return false;
                                    return event.filterCard({ name: 'jiu', isCard: true }, player, event);
                                },
                                content: function () {
                                    if (_status.event.getParent(2).type == 'dying') {
                                        event.dying = player;
                                        event.type = 'dying';
                                    }
                                    player.turnOver();
                                    player.useCard({ name: 'jiu', isCard: true }, player);
                                },
                                ai: {
                                    order: 5,
                                    result: {
                                        player: function (player) {
                                            if (_status.event.parent.name == 'phaseUse') {
                                                if (player.countCards('h', 'jiu') > 0) return 0;
                                                if (player.getEquip('zhuge') && player.countCards('h', 'sha') > 1) return 0;
                                                if (!player.countCards('h', 'sha')) return 0;
                                                var targets = [];
                                                var target;
                                                var players = game.filterPlayer();
                                                for (var i = 0; i < players.length; i++) {
                                                    if (get.attitude(player, players[i]) < 0) {
                                                        if (player.canUse('sha', players[i], true, true)) {
                                                            targets.push(players[i]);
                                                        }
                                                    }
                                                }
                                                if (targets.length) {
                                                    target = targets[0];
                                                }
                                                else {
                                                    return 0;
                                                }
                                                var num = get.effect(target, { name: 'sha' }, player, player);
                                                for (var i = 1; i < targets.length; i++) {
                                                    var num2 = get.effect(targets[i], { name: 'sha' }, player, player);
                                                    if (num2 > num) {
                                                        target = targets[i];
                                                        num = num2;
                                                    }
                                                }
                                                if (num <= 0) return 0;
                                                var e2 = target.getEquip(2);
                                                if (e2) {
                                                    if (e2.name == 'tengjia') {
                                                        if (!player.countCards('h', { name: 'sha', nature: 'fire' }) && !player.getEquip('zhuque')) return 0;
                                                    }
                                                    if (e2.name == 'renwang') {
                                                        if (!player.countCards('h', { name: 'sha', color: 'red' })) return 0;
                                                    }
                                                    if (e2.name == 'baiyin') return 0;
                                                }
                                                if (player.getEquip('guanshi') && player.countCards('he') > 2) return 1;
                                                return target.countCards('h') > 3 ? 0 : 1;
                                            }
                                            if (player == _status.event.dying || player.isTurnedOver()) return 3;
                                        }
                                    },
                                    effect: {
                                        target: function (card, player, target) {
                                            if (card.name == 'guiyoujie') return [0, 0.5];
                                            if (target.isTurnedOver()) {
                                                if (get.tag(card, 'damage')) {
                                                    if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                                    if (target.hp == 1) return;
                                                    return [1, target.countCards('h') / 2];
                                                }
                                            }
                                        },
                                    },
                                },
                            },
                            hpp_jiushi2: {
                                trigger: { player: 'damageBegin3' },
                                silent: true,
                                firstDo: true,
                                filter: function (event, player) {
                                    return player.classList.contains('turnedover');
                                },
                                content: function () {
                                    trigger.hpp_jiushi = true;
                                },
                            },
                            hpp_jiushi3: {
                                audio: 'rejiushi',
                                trigger: { player: 'damageEnd' },
                                check: function (event, player) {
                                    return player.isTurnedOver();
                                },
                                filter: function (event, player) {
                                    return event.hpp_jiushi;
                                },
                                prompt: '是否发动【酒诗】，将武将牌翻面？',
                                content: function () {
                                    delete trigger.hpp_jiushi;
                                    player.turnOver();
                                },
                            },

                            // 陈到
                            hpp_wanglie: {
                                mod: {
                                    targetInRange: function (card, player, target, now) {
                                        if (player.isPhaseUsing()) return true;
                                    },
                                },
                                audio: 'drlt_wanglie',
                                trigger: { player: 'useCard' },
                                filter: function (event, player) {
                                    return player.isPhaseUsing() && (event.card.name == 'sha' || get.type(event.card) == 'trick');
                                },
                                preHidden: true,
                                check: function (event, player) {
                                    if (['wuzhong', 'kaihua', 'dongzhuxianji'].contains(event.card.name)) return false;
                                    player._wanglie_temp = true;
                                    var eff = 0;
                                    for (var i of event.targets) {
                                        eff += get.effect(i, event.card, player, player);
                                    }
                                    delete player._wanglie_temp;
                                    if (eff < 0) return true;
                                    if (!player.countCards('h', function (card) {
                                        return player.hasValueTarget(card, null, true);
                                    })) return true;
                                    if (get.tag(event.card, 'damage') && !player.needsToDiscard() && !player.countCards('h', function (card) {
                                        return get.tag(card, 'damage') && player.hasValueTarget(card, null, true);
                                    })) return true;
                                    return false;
                                },
                                prompt2: function (event) {
                                    return '令' + get.translation(event.card) + '不能被响应，回合结束时摸等同于此牌造成的伤害数的牌，然后本回合不能再使用牌';
                                },
                                locked: false,
                                content: function () {
                                    trigger.nowuxie = true;
                                    trigger.directHit.addArray(game.players);
                                    player.addTempSkill('hpp_wanglie2');
                                    trigger.card.hpp_wanglie = true;
                                },
                                ai: {
                                    pretao: true,
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (tag == 'pretao') return true;
                                        if (player._wanglie_temp) return false;
                                        player._wanglie_temp = true;
                                        var bool = function () {
                                            if (['wuzhong', 'kaihua', 'dongzhuxianji'].contains(arg.card.name)) return false;
                                            if (get.attitude(player, arg.target) > 0 || !player.isPhaseUsing()) return false;
                                            var cards = player.getCards('h', function (card) {
                                                return card != arg.card && (!arg.card.cards || !arg.card.cards.contains(card));
                                            });
                                            var sha = player.getCardUsable('sha');
                                            if (arg.card.name == 'sha') sha--;
                                            cards = cards.filter(function (card) {
                                                if (card.name == 'sha' && sha <= 0) return false;
                                                return player.hasValueTarget(card, null, true);
                                            });
                                            if (!cards.length) return true;
                                            if (!get.tag(arg.card, 'damage')) return false;
                                            if (!player.needsToDiscard() && !cards.filter(function (card) {
                                                return get.tag(card, 'damage');
                                            }).length) return true;
                                            return false;
                                        }();
                                        delete player._wanglie_temp;
                                        return bool;
                                    },
                                },
                            },
                            hpp_wanglie2: {
                                charlotte: true,
                                group: 'drlt_wanglie2',
                                getNum: function (player) {
                                    var num = 0;
                                    player.getHistory('sourceDamage', function (evt) {
                                        if (evt.card && evt.card.hpp_wanglie) num += evt.num;
                                    });
                                    return num;
                                },
                                trigger: { player: 'phaseEnd' },
                                filter: function (event, player) {
                                    return lib.skill.hpp_wanglie2.getNum(player) > 0;
                                },
                                forced: true,
                                content: function () {
                                    player.draw(lib.skill.hpp_wanglie2.getNum(player));
                                },
                            },

                            // 程普
                            hpp_lihuo: {
                                group: ['hpp_lihuo_target', 'hpp_lihuo_draw'],
                                trigger: { player: 'useCard1' },
                                filter: function (event, player) {
                                    if (event.card.name == 'sha' && !event.card.nature) return true;
                                    return false;
                                },
                                audio: 'lihuo',
                                check: function (event, player) {
                                    if (player.hp > 2) return true;
                                    return false;
                                },
                                content: function () {
                                    trigger.card.nature = 'fire';
                                    var next = game.createEvent('hpp_lihuo_clear');
                                    next.player = player;
                                    next.card = trigger.card;
                                    event.next.remove(next);
                                    next.forceDie = true;
                                    trigger.after.push(next);
                                    next.setContent(function () {
                                        var num = 0;
                                        player.getHistory('sourceDamage', function (evt) {
                                            if (evt.card == card) num += evt.num;
                                        });
                                        if (num > 1) player.loseHp();
                                        delete card.nature;
                                    });
                                },
                                subSkill: {
                                    target: {
                                        trigger: { player: 'useCard2' },
                                        filter: function (event, player) {
                                            if (event.card.name != 'sha' || get.nature(event.card) != 'fire') return false;
                                            return game.hasPlayer(function (current) {
                                                return !event.targets.contains(current) && player.canUse(event.card, current);
                                            });
                                        },
                                        direct: true,
                                        content: function () {
                                            'step 0'
                                            player.chooseTarget(get.prompt('hpp_lihuo'), '为' + get.translation(trigger.card) + '增加一个目标', function (card, player, target) {
                                                return !_status.event.sourcex.contains(target) && player.canUse(_status.event.card, target);
                                            }).set('sourcex', trigger.targets).set('card', trigger.card).set('ai', function (target) {
                                                var player = _status.event.player;
                                                return get.effect(target, _status.event.card, player, player);
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                if (!event.isMine() && !_status.connectMode) game.delayx();
                                                event.target = result.targets[0];
                                            }
                                            else event.finish();
                                            'step 2'
                                            player.logSkill('hpp_lihuo', event.target);
                                            trigger.targets.push(event.target);
                                        },
                                    },
                                    draw: {
                                        audio: 'lihuo',
                                        trigger: { source: 'damageSource' },
                                        filter: function (event, player) {
                                            return event.card && event.card.name == 'sha' && get.nature(event.card) == 'fire';
                                        },
                                        forced: true,
                                        locked: false,
                                        usable: 1,
                                        content: function () {
                                            player.draw();
                                        },
                                    },
                                },
                            },
                            hpp_chunlao: {
                                audio: 'chunlao',
                                trigger: { player: 'phaseJieshuBegin' },
                                filter: function (event, player) {
                                    return player.countCards('h') > 0 && (_status.connectMode || player.countCards('h', 'sha') > 0) && !player.getExpansions('hpp_chunlao').length;
                                },
                                intro: {
                                    content: 'expansion',
                                    markcount: 'expansion',
                                },
                                onremove: function (player, skill) {
                                    var cards = player.getExpansions(skill);
                                    if (cards.length) player.loseToDiscardpile(cards);
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseCard([1, Math.max(1, player.countCards('h', 'sha'))], get.prompt('hpp_chunlao'), '将任意张【杀】置于武将牌上作为“醇”', { name: 'sha' }).set('ai', function () {
                                        return 1;
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_chunlao');
                                        player.addToExpansion('gain2', result.cards).gaintag.add('hpp_chunlao');
                                    }
                                },
                                group: 'hpp_chunlao2'
                            },
                            hpp_chunlao2: {
                                enable: 'chooseToUse',
                                filter: function (event, player) {
                                    return event.type == 'dying' && event.dying && event.dying.hp <= 0 && player.getExpansions('hpp_chunlao').length > 0;
                                },
                                filterTarget: function (card, player, target) {
                                    return target == _status.event.dying;
                                },
                                direct: true,
                                delay: false,
                                selectTarget: -1,
                                content: function () {
                                    'step 0'
                                    player.chooseCardButton(get.translation('hpp_chunlao'), player.getExpansions('hpp_chunlao'), true);
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_chunlao');
                                        event.type = 'dying';
                                        player.loseToDiscardpile(result.links);
                                        target.useCard({ name: 'jiu', isCard: true }, target);
                                        var nature = get.color(result.links[0]);
                                        if (nature == 'red') player.recover();
                                        if (nature == 'black') player.draw(2);
                                    }
                                },
                                ai: {
                                    order: 6,
                                    skillTagFilter: function (player) {
                                        return player.getExpansions('hpp_chunlao').length > 0;
                                    },
                                    save: true,
                                    result: {
                                        target: 3
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
                                trigger: { player: 'loseEnd' },
                                filter: function (event, player) {
                                    for (var card of event.cards2) {
                                        if (get.suit(card) == 'diamond') return true;
                                    }
                                    return false;
                                },
                                forced: true,
                                locked: true,
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

                            // 邓艾
                            hpp_tuntian: {
                                audio: 'tuntian',
                                subSkill: {
                                    tuntian: {
                                        audio: 'tuntian',
                                        inherit: 'tuntian',
                                    },
                                },
                                group: ['hpp_tuntian_tuntian', 'tuntian_dist'],
                                trigger: { player: 'phaseEnd' },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseToDiscard('h', get.prompt('hpp_tuntian'), '弃置一张牌并进行“田”判定').set('ai', function (card) {
                                        var player = _status.event.player;
                                        return 7 - get.value(card, player);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_tuntian');
                                        var next = game.createEvent('hpp_tuntian');
                                        next.player = player;
                                        next.setContent(lib.skill.tuntian.content);
                                    }
                                },
                            },

                            // 典韦
                            hpp_qiangxi: {
                                group: 'hpp_qiangxi_qiangxi',
                                audio: 'qiangxi',
                                trigger: { global: 'damageBegin2' },
                                filter: function (event, player) {
                                    return event.player != player && player.countCards('he', { type: 'equip' }) > 0;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseToDiscard('he', get.prompt('hpp_qiangxi', trigger.player), '弃置一张装备牌并令此伤害+1', function (card) {
                                        return get.type(card) == 'equip';
                                    }).set('goon', get.damageEffect(trigger.player, player, player) > 0).set('ai', function (card) {
                                        if (trigger.player.getEquip(2) != undefined && trigger.player.getEquip(2) == 'baiyin') {
                                            return 0;
                                        }
                                        if (_status.event.goon) return 12 - get.value(card);
                                        return 0;
                                    }).logSkill = ['hpp_qiangxi', trigger.player];
                                    'step 1'
                                    if (result.bool) trigger.num++;
                                },
                                ai: { expose: 0.25 },
                                subSkill: {
                                    qiangxi: {
                                        audio: 'qiangxi',
                                        enable: 'phaseUse',
                                        filter: function (event, player) {
                                            return game.hasPlayer(function (target) {
                                                return player.inRange(target) && !target.hasSkill('hpp_qiangxi_off');
                                            });
                                        },
                                        filterTarget: function (card, player, target) {
                                            if (player == target) return false;
                                            if (target.hasSkill('hpp_qiangxi_off')) return false;
                                            return player.inRange(target);
                                        },
                                        prompt: '失去1点体力并摸一张牌，对一名其他角色造成1点伤害',
                                        content: function () {
                                            'step 0'
                                            player.loseHp();
                                            player.draw();
                                            'step 1'
                                            target.addTempSkill('hpp_qiangxi_off');
                                            target.damage();
                                        },
                                        ai: {
                                            order: 8.5,
                                            result: {
                                                target: function (player, target) {
                                                    var bool = (lib.translate[player.identity] == '主' || lib.translate[player.identity] == '内' || (get.mode() == 'identity' && player.hasSkill('olzaowang2') && lib.translate[player.identity] != 'nei'));
                                                    if (bool && target.hp - player.hp > 1) return 0;
                                                    if (!bool && player.hp < 2 && !player.countCards('hs', { name: ['tao', 'jiu'] })) return 0;
                                                    return -1;
                                                },
                                            },
                                        },
                                    },
                                    off: { charlotte: true },
                                },
                            },

                            // 貂蝉
                            hpp_lijian: {
                                onChooseToUse: function (event) {
                                    if (event.type == 'phase' && !game.online) {
                                        var evtx = event.getParent('phaseUse');
                                        var list = [], player = event.player;
                                        for (var target of game.filterPlayer2()) {
                                            if (target.getHistory('damage', function (evt) {
                                                return evt.card && evt.card.name == 'juedou' && evt.getParent(3).name == 'hpp_lijian' && evt.getParent(3).player == player;
                                            }).length) list.push(target);
                                        }
                                        event.set('hpp_lijian_targets', list);
                                    }
                                },
                                audio: 'lijian',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return game.hasPlayer(function (target) {
                                        if (_status.event.hpp_lijian_targets.contains(target)) return false;
                                        return game.hasPlayer(function (current) {
                                            if (_status.event.hpp_lijian_targets.contains(current)) return false;
                                            return current != target && current.canUse({ name: 'juedou' }, target);
                                        });
                                    });
                                },
                                filterTarget: function (card, player, target) {
                                    if (_status.event.hpp_lijian_targets.contains(target)) return false;
                                    if (ui.selected.targets.length) return target.canUse({ name: 'juedou' }, ui.selected.targets[0]);
                                    return game.hasPlayer(function (current) {
                                        return current.canUse({ name: 'juedou' }, target);
                                    });
                                },
                                selectTarget: 2,
                                targetprompt: ['先出杀', '后出杀'],
                                multitarget: true,
                                filterCard: true,
                                check: function (card) {
                                    return 10 - get.value(card);
                                },
                                position: 'he',
                                usable: 2,
                                content: function () {
                                    targets[1].useCard({ name: 'juedou', isCard: true }, 'nowuxie', targets[0], 'noai').animate = false;
                                    game.delay(0.5);
                                },
                                ai: {
                                    order: 8,
                                    expose: 0.4,
                                    threaten: 4.8,
                                    result: {
                                        target: function (player, target) {
                                            if (!ui.selected.targets.length) return -3;
                                            return get.effect(target, { name: 'juedou' }, ui.selected.targets[0], target);
                                        },
                                    },
                                },
                            },
                            hpp_biyue: {
                                audio: 'biyue',
                                trigger: { player: 'phaseJieshuBegin' },
                                forced: true,
                                locked: false,
                                content: function () {
                                    player.draw(1 + player.getHistory('useSkill', function (evt) {
                                        return evt.skill == 'hpp_lijian';
                                    }).length);
                                },
                            },

                            // 董白
                            hpp_lianzhu: {
                                audio: 'lianzhu',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('he');
                                },
                                filterTarget: lib.filter.notMe,
                                filterCard: true,
                                check: function (card) {
                                    var num = get.value(card);
                                    if (get.color(card) == 'black') {
                                        if (num >= 6) return 0;
                                        return 9 - num;
                                    }
                                    else return 7 - num;
                                },
                                usable: 1,
                                discard: false,
                                lose: false,
                                delay: false,
                                position: 'he',
                                content: function () {
                                    'step 0'
                                    player.showCards(cards, '连珠展示的牌');
                                    game.delay();
                                    player.give(cards, target);
                                    'step 1'
                                    if (get.color(cards[0], player) == 'red') {
                                        player.chooseDrawRecover(2, true);
                                        event.finish();
                                    }
                                    else {
                                        target.chooseToDiscard('he', 2, '弃置两张牌，或令' + get.translation(player) + '摸两张牌').set('ai', function (card) {
                                            if (!_status.event.goon) return -get.value(card);
                                            return 6 - get.value(card);
                                        }).set('goon', get.attitude(target, player) <= 0);
                                    }
                                    'step 2'
                                    if (!result.bool) player.draw(2);
                                },
                                ai: {
                                    order: 3,
                                    expose: 0.2,
                                    result: {
                                        target: function (player, target) {
                                            if (ui.selected.cards.length && get.color(ui.selected.cards[0]) == 'red') {
                                                var att = get.attitude(player, target);
                                                return 2 + get.sgn(att) + att / 114514;
                                            }
                                            return -1;
                                        },
                                    },
                                },
                            },
                            hpp_xiahui: {
                                audio: 'xiahui',
                                mod: {
                                    ignoredHandcard: function (card, player) {
                                        if (get.color(card, player) == 'black') return true;
                                    },
                                    cardDiscardable: function (card, player, name) {
                                        if (name == 'phaseDiscard' && get.color(card, player) == 'black') return false;
                                    },
                                },
                                trigger: { global: 'phaseEnd' },
                                forced: true,
                                logTarget: 'player',
                                filter: function (event, player) {
                                    var target = event.player;
                                    return target != player && target.getHistory('lose', function (evt) {
                                        for (var i in evt.gaintag_map) {
                                            if (evt.gaintag_map[i].contains('hpp_xiahui')) return true;
                                        }
                                    }).length;
                                },
                                content: function () {
                                    trigger.player.loseHp();
                                },
                                group: 'hpp_xiahui_gain',
                                subSkill: {
                                    gain: {
                                        trigger: { global: 'gainEnd' },
                                        forced: true,
                                        popup: false,
                                        filter: function (event, player) {
                                            if (player == event.player) return false;
                                            var evt = event.getl(player);
                                            return evt && evt.cards2 && evt.cards2.filter(function (card) {
                                                return get.color(card, player) == 'black';
                                            }).length > 0;
                                        },
                                        content: function () {
                                            trigger.player.addSkill('hpp_xiahui_block');
                                            var cards = trigger.getl(player).cards2.filter(function (card) {
                                                return get.color(card, player) == 'black';
                                            });
                                            trigger.player.addGaintag(cards, 'hpp_xiahui');
                                        },
                                    },
                                    block: {
                                        mod: {
                                            cardEnabled2: function (card) {
                                                if (get.itemtype(card) == 'card' && card.hasGaintag('hpp_xiahui')) return false;
                                            },
                                            cardDiscardable: function (card) {
                                                if (card.hasGaintag('hpp_xiahui')) return false;
                                            },
                                        },
                                        charlotte: true,
                                        forced: true,
                                        popup: false,
                                        trigger: { player: 'changeHp' },
                                        filter: function (event, player) {
                                            return event.num < 0;
                                        },
                                        content: function () {
                                            player.removeSkill('hpp_xiahui_block');
                                        },
                                        onremove: function (player) {
                                            player.removeGaintag('hpp_xiahui');
                                        },
                                    },
                                },
                            },

                            // 董允
                            hpp_bingzheng: {
                                audio: 'bingzheng',
                                trigger: { player: 'phaseUseEnd' },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt2('hpp_bingzheng')).set('ai', function (target) {
                                        var player = _status.event.player;
                                        var att = get.attitude(player, target);
                                        var nh = target.countCards('h');
                                        if (att > 0) {
                                            if (nh == target.hp - 1) {
                                                if (player == target) return att + 1;
                                                return att + 2;
                                            }
                                            if (player == target && player.needsToDiscard()) return att / 3;
                                            return att;
                                        }
                                        else {
                                            if (nh == target.hp + 1) return -att;
                                            if (nh == 0) return 0;
                                            return -att / 2;
                                        }
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_bingzheng', result.targets);
                                        event.target = result.targets[0];
                                        if (event.target.countCards('h')) {
                                            player.chooseControl(function (event, player) {
                                                var target = event.target;
                                                if (get.attitude(player, target) < 0) return 1;
                                                return 0;
                                            }).set('choiceList', [
                                                '令' + get.translation(event.target) + '摸一张牌',
                                                '令' + get.translation(event.target) + '弃置一张手牌'
                                            ]);
                                        }
                                        else event.directfalse = true;
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (event.directfalse || result.index == 0) event.target.draw();
                                    else event.target.chooseToDiscard('h', true);
                                    'step 3'
                                    if (event.target.countCards('h') == event.target.hp) {
                                        player.draw();
                                        if (event.target == player) {
                                            event.finish();
                                            return;
                                        }
                                        var next = player.chooseCard('是否交给' + get.translation(event.target) + '一张牌？', 'he');
                                        next.set('ai', function (card) {
                                            if (get.position(card) != 'h') return 0;
                                            if (_status.event.shan && card.name == 'shan') {
                                                return 11;
                                            }
                                            if (_status.event.goon) {
                                                return 10 - get.value(card);
                                            }
                                            return -get.value(card, _status.event.player, 'raw');
                                        });
                                        if (get.attitude(player, event.target) > 1 &&
                                            player.countCards('h', 'shan') > 1 && player.countCards('h') > event.target.countCards('h')) {
                                            next.set('shan', true);
                                        }
                                        if (get.attitude(player, event.target) > 0 && player.needsToDiscard()) {
                                            next.set('goon', true);
                                        }
                                    }
                                    else event.finish();
                                    'step 4'
                                    if (result.bool) event.target.gain(result.cards, player, 'giveAuto');
                                },
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

                            // 杜夫人
                            hpp_yise: {
                                audio: 'yise',
                                trigger: { global: 'gainAfter', player: 'loseAsyncAfter' },
                                filter: function (event, player) {
                                    if (event.name == 'loseAsync') {
                                        if (event.type != 'gain') return false;
                                    }
                                    var cards = event.getl(player).cards2;
                                    return game.hasPlayer(function (current) {
                                        if (current == player) return false;
                                        var cardsx = event.getg(current);
                                        for (var i of cardsx) {
                                            if (cards.contains(i)) return true;
                                        }
                                        return false;
                                    });
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var cards = trigger.getl(player).cards2;
                                    event.cards = cards;
                                    event.targets = game.filterPlayer(function (current) {
                                        if (current == player) return false;
                                        var cardsx = trigger.getg(current);
                                        for (var i of cardsx) {
                                            if (cards.contains(i)) return true;
                                        }
                                        return false;
                                    }).sortBySeat();
                                    'step 1'
                                    var target = targets.shift();
                                    var cardsx = trigger.getg(target);
                                    var next = game.createEvent('hpp_yise_insert');
                                    next.player = player;
                                    next.target = target;
                                    next.cards = cardsx;
                                    next.setContent(lib.skill.hpp_yise.contentx);
                                    if (targets.length > 0) event.redo();
                                },
                                contentx: function () {
                                    'step 0'
                                    event.logged = false;
                                    for (var i of cards) {
                                        event[get.color(i, player)] = true;
                                        if (event.red && event.black) break;
                                    }
                                    if (event.red) {
                                        var list = ['摸牌'], choiceList = [
                                            '令自己摸一张牌',
                                            '令' + get.translation(target) + '回复1点体力'
                                        ];
                                        if (target.isDamaged()) list.push('回复体力');
                                        else choiceList[1] = '<span style="opacity:0.5">' + choiceList[1] + '</span>';
                                        list.push('cancel2');
                                        player.chooseControl(list).set('prompt', get.prompt('hpp_yise', target)).set('ai', function () {
                                            if (list.contains('回复体力') && get.recoverEffect(_status.event.getParent().target, _status.event.player, _status.event.player) > 0) return '回复体力';
                                            return '摸牌';
                                        }).set('choiceList', choiceList);
                                    }
                                    'step 1'
                                    if (event.red && result.control != 'cancel2') {
                                        event.logged = true;
                                        player.logSkill('hpp_yise', target);
                                        if (result.control == '摸牌') player.draw();
                                        else target.recover();
                                    }
                                    if (!event.black) event.finish();
                                    'step 2'
                                    player.chooseBool(get.prompt('hpp_yise', target), '令' + get.translation(target) + '下次受到【杀】造成的伤害+1').set('choice', get.attitude(player, target) < 0);
                                    'step 3'
                                    if (result.bool) {
                                        if (!event.logged) player.logSkill('hpp_yise', target);
                                        else player.line(target);
                                        target.addMark('yise_damage', 1, false);
                                        target.addSkill('yise_damage');
                                    }
                                },
                            },
                            hpp_shunshi: {
                                audio: 'shunshi',
                                trigger: { player: ['damageEnd', 'phaseZhunbeiBegin'] },
                                filter: function (event, player) {
                                    if (event.name == 'damage' && player == _status.currentPhase) {
                                        return false;
                                    }
                                    return player.countCards('he');
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseCardTarget({
                                        prompt: get.prompt2('hpp_shunshi'),
                                        filterTarget: lib.filter.notMe,
                                        filterCard: true,
                                        position: 'he',
                                        ai1: function (card) {
                                            var player = _status.event.player;
                                            if (player.hasSkill('hpp_yise')) {
                                                if (get.color(card, player) == 'red' && game.hasPlayer(function (current) {
                                                    return current != player && current.isDamaged() && get.recoverEffect(current, player, player) > 0;
                                                })) return 10 - get.value(card);
                                                if (get.color(card, player) == 'black') return 4 - get.value(card);
                                            }
                                            return 8 - get.value(card);
                                        },
                                        ai2: function (target) {
                                            var player = _status.event.player, card = ui.selected.cards[0];
                                            var att = get.attitude(player, target);
                                            if (player.hasSkill('hpp_yise')) {
                                                if (get.color(card) == 'red' && target.isDamaged()) return 2 * get.recoverEffect(target, player, player) + get.sgn(att);
                                                if (get.color(card) == 'black') return -att;
                                            }
                                            if (get.value(card, target) < 0) return -att;
                                            if (get.value(card, target) < 1) return 0.01 * -att;
                                            return Math.max(1, get.value(card, target) - get.value(card, player)) * att;
                                        },
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.logSkill('hpp_shunshi', target);
                                        player.give(result.cards, target);
                                        for (var phase of ['phaseDraw', 'phaseUse', 'phaseDiscard']) {
                                            player.addTempSkill('hpp_shunshi_' + phase, { player: phase + 'After' });
                                            player.addMark('hpp_shunshi_' + phase, 1, false);
                                        }
                                    }
                                },
                                subSkill: {
                                    phaseDraw: {
                                        charlotte: true,
                                        onremove: true,
                                        mark: true,
                                        marktext: '摸',
                                        intro: { content: '下个摸牌阶段多摸#张牌' },
                                        trigger: { player: 'phaseDrawBegin2' },
                                        filter: function (event, player) {
                                            return !event.numFixed;
                                        },
                                        direct: true,
                                        content: function () {
                                            trigger.num += player.countMark('hpp_shunshi_phaseDraw');
                                        },
                                    },
                                    phaseUse: {
                                        charlotte: true,
                                        onremove: true,
                                        mark: true,
                                        marktext: '出',
                                        intro: { content: '下个出牌阶段使用【杀】的次数上限+#，且使用【杀】无视防具' },
                                        mod: {
                                            cardUsable: function (card, player, num) {
                                                if (player.isPhaseUsing() && card.name == 'sha') return num + player.countMark('hpp_shunshi_phaseUse');
                                            },
                                        },
                                        ai: {
                                            unequip: true,
                                            skillTagFilter: function (player, tag, arg) {
                                                if (!arg || !arg.card || arg.card.name != 'sha' || !player.isPhaseUsing()) return false;
                                            },
                                        },
                                    },
                                    phaseDiscard: {
                                        charlotte: true,
                                        onremove: true,
                                        mark: true,
                                        marktext: '弃',
                                        intro: { content: '下个弃牌阶段手牌上限+#' },
                                        mod: {
                                            maxHandcard: function (player, num) {
                                                if (player.hasSkill('hpp_shunshi_phaseDiscard2')) return num + player.countMark('hpp_shunshi_phaseDiscard');
                                            },
                                        },
                                        trigger: { player: 'phaseDiscardBefore' },
                                        direct: true,
                                        content: function () {
                                            player.addTempSkill('hpp_shunshi_phaseDiscard2', { player: 'phaseDiscardAfter' });
                                        },
                                    },
                                    phaseDiscard2: { charlotte: true },
                                },
                            },

                            // 伏皇后
                            hpp_zhuikong: {
                                audio: 'rezhuikong',
                                trigger: { global: 'phaseBegin' },
                                check: function (event, player) {
                                    if (get.attitude(player, event.player) < -2) {
                                        var cards = player.getCards('h');
                                        if (cards.length > player.hp) return true;
                                        for (var i = 0; i < cards.length; i++) {
                                            var useful = get.useful(cards[i]);
                                            if (useful < 5) return true;
                                            if (get.number(cards[i]) > 9 && useful < 7) return true;
                                        }
                                    }
                                    return false;
                                },
                                filter: function (event, player) {
                                    return player.canCompare(event.player);
                                },
                                logTarget: 'player',
                                content: function () {
                                    'step 0'
                                    player.chooseToCompare(trigger.player);
                                    'step 1'
                                    if (result.bool) trigger.player.addTempSkill('zishou2');
                                    else {
                                        trigger.player.addTempSkill('hpp_zhuikong_distance');
                                        trigger.player.storage.hpp_zhuikong_distance.push(player);
                                    }
                                },
                                subSkill: {
                                    distance: {
                                        init: function (player) {
                                            player.storage.hpp_zhuikong_distance = [];
                                        },
                                        charlotte: true,
                                        onremove: true,
                                        mod: {
                                            globalFrom: function (from, to, distance) {
                                                if (from.storage.hpp_zhuikong_distance.contains(to)) return -Infinity;
                                            },
                                        },
                                    },
                                },
                            },
                            hpp_qiuyuan: {
                                audio: 'qiuyuan',
                                trigger: { target: 'useCardToTarget' },
                                filter: function (event, player) {
                                    return event.card.name == 'sha' && game.players.length > 2;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt2('hpp_qiuyuan'), [1, 3], function (card, player, target) {
                                        return target != player && !_status.event.targets.contains(target) && _status.event.playerx.canUse('sha', target, false);
                                    }).set('ai', function (target) {
                                        var trigger = _status.event.getTrigger();
                                        var player = _status.event.player;
                                        return get.effect(target, trigger.card, trigger.player, player);
                                    }).set('targets', trigger.targets).set('playerx', trigger.player);
                                    'step 1'
                                    if (result.bool) {
                                        var targets = result.targets.sortBySeat();
                                        event.targets = targets;
                                        player.logSkill('hpp_qiuyuan', targets);
                                        event.num = 0;
                                        event.list = [];
                                    }
                                    else event.finish();
                                    'step 2'
                                    var target = targets[num];
                                    event.target = target;
                                    target.chooseCard({ name: 'shan' }, '交给' + get.translation(player) + '一张闪，或成为' + get.translation(trigger.card) + '的额外目标并弃置一张牌');
                                    'step 3'
                                    if (result.bool) player.gain(result.cards, target, 'giveAuto');
                                    else {
                                        trigger.getParent().targets.push(target);
                                        trigger.getParent().triggeredTargets2.push(target);
                                        game.log(target, '成为了', trigger.card, '的额外目标');
                                        target.chooseToDiscard('he', true);
                                    }
                                    if (event.num < event.targets.length - 1) {
                                        event.num++;
                                        event.goto(2);
                                    }
                                    'step 4'
                                    game.delayx();
                                },
                                ai: {
                                    expose: 0.2,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (card.name != 'sha') return;
                                            var players = game.filterPlayer();
                                            if (get.attitude(player, target) <= 0) {
                                                for (var i = 0; i < players.length; i++) {
                                                    var target2 = players[i];
                                                    if (player != target2 && target != target2 && player.canUse(card, target2, false) &&
                                                        get.effect(target2, { name: 'shacopy', nature: card.nature, suit: card.suit }, player, target) > 0 &&
                                                        get.effect(target2, { name: 'shacopy', nature: card.nature, suit: card.suit }, player, player) < 0) {
                                                        if (target.hp == target.maxHp) return 0.3;
                                                        return 0.6;
                                                    }
                                                }
                                            }
                                            else {
                                                for (var i = 0; i < players.length; i++) {
                                                    var target2 = players[i];
                                                    if (player != target2 && target != target2 && player.canUse(card, target2, false) &&
                                                        get.effect(target2, { name: 'shacopy', nature: card.nature, suit: card.suit }, player, player) > 0) {
                                                        if (player.canUse(card, target2)) return;
                                                        if (target.hp == target.maxHp) return [0, 1];
                                                        return [0, 0];
                                                    }
                                                }
                                            }
                                        },
                                    },
                                },
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

                            // 高顺
                            hpp_xianzhen: {
                                group: 'hpp_xianzhen_miss',
                                audio: 'xianzhen',
                                usable: 1,
                                trigger: { source: 'damageBegin1' },
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && event.notLink();
                                },
                                forced: true,
                                content: function () {
                                    trigger.num++;
                                },
                                subSkill: {
                                    miss: {
                                        audio: 'xianzhen',
                                        usable: 1,
                                        trigger: { player: 'shaMiss' },
                                        filter: function (event, player) {
                                            return player.countUsed('sha', true) == 1;
                                        },
                                        forced: true,
                                        content: function () {
                                            player.draw();
                                        },
                                    },
                                },
                            },
                            hpp_jinjiu: {
                                mod: {
                                    cardname: function (card, player) {
                                        if (card.name == 'jiu') return 'sha';
                                    },
                                },
                                ai: {
                                    respondSha: true,
                                    skillTagFilter: function (player) {
                                        if (!player.countCards('h', 'jiu')) return false;
                                    },
                                },
                                group: 'hpp_jinjiu_gain',
                                global: 'hpp_jinjiu_usejiu',
                                audio: 'jinjiu',
                                popup: false,
                                silent: true,
                                firstDo: true,
                                trigger: { player: 'useCard1' },
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && event.addCount !== false && event.cards &&
                                        event.cards.length == 1 && event.cards[0].name == 'jiu';
                                },
                                forced: true,
                                content: function () {
                                    trigger.addCount = false;
                                    if (player.stat[player.stat.length - 1].card.sha > 0) {
                                        player.stat[player.stat.length - 1].card.sha--;
                                    }
                                },
                                subSkill: {
                                    gain: {
                                        trigger: { global: 'useCardAfter' },
                                        forced: true,
                                        audio: 'jinjiu',
                                        filter: function (event, player) {
                                            return event.player != player && event.card.isCard && event.card.name == 'jiu' && event.cards.filterInD().length > 0;
                                        },
                                        logTarget: 'player',
                                        content: function () {
                                            player.gain(trigger.cards.filterInD(), 'gain2');
                                        },
                                    },
                                    usejiu: {
                                        mod: {
                                            cardEnabled: function (card, player) {
                                                if (card.name == 'jiu' && _status.currentPhase && _status.currentPhase != player && _status.currentPhase.hasSkill('hpp_jinjiu')) return false;
                                            },
                                            cardSavable: function (card, player) {
                                                if (card.name == 'jiu' && _status.currentPhase && _status.currentPhase != player && _status.currentPhase.hasSkill('hpp_jinjiu')) return false;
                                            },
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

                            // 关银屏
                            hpp_xuehen: {
                                audio: 'xueji',
                                enable: 'phaseUse',
                                usable: 1,
                                filter: function (event, player) {
                                    return player.countCards('he', { color: 'red' }) > 0;
                                },
                                filterTarget: true,
                                selectTarget: function () {
                                    var player = _status.event.player
                                    return [1, Math.max(1, player.getDamagedHp())];
                                },
                                position: 'he',
                                filterCard: { color: 'red' },
                                check: function (card) {
                                    return 8 - get.value(card);
                                },
                                multitarget: true,
                                multiline: true,
                                line: 'fire',
                                content: function () {
                                    'step 0'
                                    event.delay = false;
                                    for (var i = 0; i < targets.length; i++) {
                                        if (!targets[i].isLinked()) {
                                            targets[i].link(true);
                                            event.delay = true;
                                        }
                                    }
                                    'step 1'
                                    if (event.delay) {
                                        game.delay();
                                    }
                                    'step 2'
                                    targets[0].damage('fire', 'nocard');
                                },
                                ai: {
                                    damage: true,
                                    fireAttack: true,
                                    threaten: 1.5,
                                    order: 7,
                                    result: {
                                        target: function (player, target) {
                                            var eff = get.damageEffect(target, player, target, 'fire');
                                            if (target.isLinked()) {
                                                return eff / 10;
                                            }
                                            else {
                                                return eff;
                                            }
                                        }
                                    },
                                }
                            },
                            hpp_huxiao: {
                                audio: 'huxiao',
                                trigger: { source: 'damageSource' },
                                forced: true,
                                filter: function (event, player) {
                                    if (event._notrigger.contains(event.player)) return false;
                                    return event.nature == 'fire';
                                },
                                logTarget: 'player',
                                content: function () {
                                    if (!player.storage.hpp_huxiao2) player.storage.hpp_huxiao2 = [];
                                    player.storage.hpp_huxiao2.add(trigger.player);
                                    player.addTempSkill('hpp_huxiao2');
                                },
                            },
                            hpp_huxiao2: {
                                onremove: true,
                                charlotte: true,
                                mark: true,
                                intro: { content: 'players' },
                                mod: {
                                    cardUsableTarget: function (card, player, target) {
                                        if (player.storage.hpp_huxiao2 && player.storage.hpp_huxiao2.contains(target)) return true;
                                    },
                                },
                            },
                            hpp_wuji: {
                                skillAnimation: true,
                                animationColor: 'orange',
                                audio: 'wuji',
                                trigger: { player: 'phaseJieshuBegin' },
                                forced: true,
                                unique: true,
                                juexingji: true,
                                filter: function (event, player) {
                                    return player.getStat('damage') >= 3 && !player.storage.hpp_wuji;
                                },
                                content: function () {
                                    player.gainMaxHp();
                                    player.recover();
                                    player.awakenSkill('hpp_wuji');
                                    player.storage.hpp_wuji = true;
                                    var card = get.cardPile('qinglong', 'field');
                                    if (card) player.gain(card, 'gain2', 'log');
                                },
                            },

                            // 关平
                            hpp_longyin: {
                                audio: 'relongyin',
                                shaRelated: true,
                                trigger: { global: 'useCard' },
                                direct: true,
                                filter: function (event, player) {
                                    return event.card.name == 'sha' && player.countCards('he') && event.player.isPhaseUsing();
                                },
                                content: function () {
                                    'step 0'
                                    game.delayx();
                                    var go = false;
                                    if (get.attitude(player, trigger.player) > 0) {
                                        if (get.color(trigger.card) == 'red') {
                                            go = true;
                                        }
                                        else if (trigger.addCount === false || !trigger.player.isPhaseUsing()) go = false;
                                        else if (!trigger.player.hasSkill('paoxiao') &&
                                            !trigger.player.hasSkill('tanlin3') &&
                                            !trigger.player.hasSkill('zhaxiang2') &&
                                            !trigger.player.hasSkill('fengnu') &&
                                            !trigger.player.getEquip('zhuge')) {
                                            var nh = trigger.player.countCards('h');
                                            if (player == trigger.player) {
                                                go = (player.countCards('h', 'sha') > 0);
                                            }
                                            else if (nh >= 4) {
                                                go = true;
                                            }
                                            else if (player.countCards('h', 'sha')) {
                                                if (nh == 3) {
                                                    go = Math.random() < 0.8;
                                                }
                                                else if (nh == 2) {
                                                    go = Math.random() < 0.5;
                                                }
                                            }
                                            else if (nh >= 3) {
                                                if (nh == 3) {
                                                    go = Math.random() < 0.5;
                                                }
                                                else if (nh == 2) {
                                                    go = Math.random() < 0.2;
                                                }
                                            }
                                        }
                                    }
                                    var next = player.chooseToDiscard(get.prompt('hpp_longyin'), '弃置一张牌' + (get.color(trigger.card) == 'red' ? '并摸一张牌' : '') + '，令' + get.translation(trigger.player) + '本次使用的【杀】不计入使用次数', 'he');
                                    next.logSkill = ['hpp_longyin', trigger.player];
                                    next.set('ai', function (card) {
                                        if (_status.event.go) {
                                            return 6 - get.value(card);
                                        }
                                        return 0;
                                    });
                                    next.set('go', go);
                                    'step 1'
                                    if (result.bool) {
                                        if (trigger.addCount !== false) {
                                            trigger.addCount = false;
                                            trigger.player.getStat().card.sha--;
                                        }
                                        if (get.color(trigger.card) == 'red') {
                                            player.draw();
                                        }
                                        if (get.suit(result.cards[0], player) == get.suit(trigger.card)) player.restoreSkill('jiezhong');
                                    }
                                },
                                ai: { expose: 0.2 },
                            },

                            // 关羽
                            hpp_wusheng: {
                                forced: true,
                                audio: 'wusheng',
                                group: 'hpp_wusheng_damage',
                                audioname2: { hpp_guansuo: 'wusheng_guansuo' },
                                trigger: { player: 'phaseBegin' },
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

                            // 郭皇后
                            hpp_jiaozhao: {
                                derivation: ['hpp_jiaozhao_2', 'hpp_jiaozhao_3'],
                                audio: 'jiaozhao',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    if (!player.countCards('h', function (card) {
                                        return lib.skill.hpp_jiaozhao.filterCard(card, player);
                                    })) return false;
                                    var num = player.getStat('skill').hpp_jiaozhao;
                                    return !num || num < player.countMark('hpp_danxin') + 1;
                                },
                                filterCard: function (card, player) {
                                    if (!player.hasSkill('hpp_jiaozhao_1')) return true;
                                    return !player.storage.hpp_jiaozhao_1[0].contains(card);
                                },
                                discard: false,
                                lose: false,
                                delay: false,
                                check: function (card) {
                                    return 7 - get.value(card);
                                },
                                content: function () {
                                    'step 0'
                                    player.addTempSkill('hpp_jiaozhao_1', { player: 'phaseUseAfter' });
                                    player.showCards(cards, get.translation(player) + '发动了【矫诏】');
                                    'step 1'
                                    var list = [];
                                    var storage1 = player.storage.hpp_jiaozhao_1[2];
                                    var storage2 = player.storage.hpp_jiaozhao_1[3];
                                    for (var name of lib.inpile) {
                                        var card = { name: name };
                                        if (get.type(card) != 'basic' && get.type(card) != 'trick') continue;
                                        if (player.countMark('hpp_danxin') == 1 && storage1.contains(get.type(card))) continue;
                                        if (player.countMark('hpp_danxin') == 2 && storage2.contains(name)) continue;
                                        list.push([get.type(card), '', name]);
                                        if (name == 'sha') {
                                            for (var nature of lib.inpile_nature) list.push([get.type(card), '', name, nature]);
                                        }
                                    }
                                    var list2 = list.filter(function (link) {
                                        return player.hasUseTarget({ name: link[2], nature: link[3], storage: { hpp_jiaozhao_1: true } });
                                    });
                                    if (!list2.length) {
                                        player.chat('无牌可用了吗？');
                                        game.log('但是', player, '没有可以转化使用的牌了！');
                                        event.finish();
                                        return;
                                    }
                                    var str = '###矫诏(' + (player.countMark('hpp_danxin') + 1) + '级)';
                                    str += '###请选择并声明' + get.translation(cards[0]) + '视为的牌';
                                    if (player.countMark('hpp_danxin') < 2) str += '，且此牌不能指定你为目标';
                                    // player.chooseButton([str, [list, 'vcard']], true).set('filterButton', function (button) {
                                    //     return _status.event.list2.contains(button.link);
                                    // }).set('ai', function (button) {
                                    //     var player = _status.event.player;
                                    //     return player.getUseValue({ name: button.link[2], nature: button.link[3] });
                                    // }).set('list2', list2);
                                    player.chooseButton([str, [list2, 'vcard']], true).set('ai', function (button) {
                                        var player = _status.event.player;
                                        return player.getUseValue({ name: button.link[2], nature: button.link[3] });
                                    }).set('list2', list2);
                                    'step 2'
                                    var card = { name: result.links[0][2], nature: result.links[0][3] };
                                    player.storage.hpp_jiaozhao_1[0].push(cards[0]);
                                    player.storage.hpp_jiaozhao_1[1].push(card);
                                    if (player.hasMark('hpp_danxin')) player.storage.hpp_jiaozhao_1[player.countMark('hpp_danxin') + 1].push(get[player.countMark('hpp_danxin') < 2 ? 'type' : 'name'](card));
                                    var chosen = result.links[0][2];
                                    var nature = result.links[0][3];
                                    player.addGaintag(cards, 'hpp_jiaozhao_1');
                                    player.showCards(game.createCard({
                                        name: chosen,
                                        nature: nature,
                                        suit: cards[0].suit,
                                        number: cards[0].number,
                                    }), get.translation(player) + '声明了' + (get.translation(nature) || '') + get.translation(chosen));
                                },
                                ai: {
                                    order: 8,
                                    result: { player: 1 },
                                },
                            },
                            hpp_jiaozhao_1: {
                                init: function (player) {
                                    if (!player.storage.hpp_jiaozhao_1) player.storage.hpp_jiaozhao_1 = [[], [], [], []];
                                },
                                onremove: function (player) {
                                    player.removeGaintag('hpp_jiaozhao_1');
                                    delete player.storage.hpp_jiaozhao_1;
                                },
                                getOriginalCard: function (player, card) {
                                    var storage = player.storage.hpp_jiaozhao_1;
                                    return storage[0][storage[1].indexOf(storage[1].filter(function (cardx) {
                                        return get.name(cardx) == get.name(card) && (!get.nature(cardx) || get.nature(cardx) == get.nature(card));
                                    })[0])];
                                },
                                mod: {
                                    playerEnabled: function (card, player, target) {
                                        if (target != player || player.countMark('hpp_danxin') >= 2) return;
                                        if (card.storage && card.storage.hpp_jiaozhao_1) return false;
                                    },
                                    /*
                                    cardname:function(card,player,name){
                                    var storage=player.storage.hpp_jiaozhao_1;
                                    if(storage[0].contains(card)) return get.name(storage[1][storage[0].indexOf(card)]);
                                    },
                                    cardnature:function(card,player){
                                    var storage=player.storage.hpp_jiaozhao_1;
                                    if(storage[0].contains(card)) return get.nature(storage[1][storage[0].indexOf(card)]);
                                    },
                                    */
                                },
                                charlotte: true,
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('h', function (card) {
                                        return player.storage.hpp_jiaozhao_1[0].contains(card);
                                    });
                                },
                                chooseButton: {
                                    dialog: function (event, player) {
                                        var storage = player.storage.hpp_jiaozhao_1;
                                        var cards = player.getCards('h').slice(0).filter(function (card) {
                                            return storage[0].contains(card);
                                        }), list = [];
                                        for (var card of cards) {
                                            var cardx = storage[1][storage[0].indexOf(card)];
                                            list.push([get.translation(get.type2(cardx)), '', get.name(cardx), get.nature(cardx)]);
                                        }
                                        return ui.create.dialog('矫诏', [list, 'vcard'], 'hidden');
                                    },
                                    filter: function (button, player) {
                                        return lib.filter.filterCard({ name: button.link[2], nature: button.link[3] }, player, _status.event.getParent());
                                    },
                                    check: function (button) {
                                        return _status.event.player.getUseValue({ name: button.link[2], nature: button.link[3] });
                                    },
                                    backup: function (links, player) {
                                        return {
                                            audio: 'jiaozhao',
                                            filterCard: lib.skill.hpp_jiaozhao_1.getOriginalCard(player, { name: links[0][2], nature: links[0][3] }),
                                            selectCard: -1,
                                            popname: true,
                                            viewAs: { name: links[0][2], nature: links[0][3], storage: { hpp_jiaozhao_1: true } },
                                        }
                                    },
                                    prompt: function (links, player) {
                                        var name = links[0][2], nature = links[0][3];
                                        var card = lib.skill.hpp_jiaozhao_1.getOriginalCard(player, { name: links[0][2], nature: links[0][3] });
                                        return '将' + get.translation(card) + '当作' + (get.translation(nature) || '') + get.translation(name) + '使用';
                                    }
                                },
                                ai: {
                                    order: 7.9,
                                    result: { player: 1 },
                                },
                                subSkill: { backup: {} },
                            },
                            hpp_danxin: {
                                audio: 'danxin',
                                trigger: { player: 'damageEnd' },
                                frequent: true,
                                content: function () {
                                    player.draw();
                                    if (player.countMark('hpp_danxin') < 2) {
                                        player.addMark('hpp_danxin', 1, false);
                                        game.log(player, '升级了技能', '#g【矫诏】')
                                    }
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

                            // 花鬘
                            hpp_souying: {
                                audio: 'souying',
                                trigger: { player: 'useCardToPlayered', target: 'useCardToTargeted' },
                                filter: function (event, player) {
                                    if (!player.countCards('he')) return false;
                                    if (!event.targets || event.targets.length != 1 || event.player == event.target) return false;
                                    return event.player != event.target;
                                },
                                direct: true,
                                usable: 1,
                                content: function () {
                                    'step 0'
                                    var next = player.chooseToDiscard('he'), prompt;
                                    if (event.triggername == 'useCardToTargeted') {
                                        event.target = trigger.player;
                                        prompt = '令' + get.translation(trigger.card) + '对你无效';
                                        next.set('goon', -get.effect(player, trigger.card, trigger.player, player));
                                    }
                                    else {
                                        event.target = trigger.targets[0];
                                        prompt = '弃置一张牌，并获得' + get.translation(trigger.cards.filterInD());
                                        next.set('goon', get.value(trigger.cards.filterInD()));
                                    }
                                    next.set('prompt', get.prompt('hpp_souying', event.target));
                                    next.set('prompt2', prompt)
                                    next.set('ai', function (card) {
                                        return _status.event.goon - get.value(card);
                                    });
                                    next.set('logSkill', ['hpp_souying', event.target]);
                                    'step 1'
                                    if (result.bool) {
                                        if (event.triggername == 'useCardToPlayered') player.gain(trigger.cards.filterInD(), 'gain2');
                                        else trigger.excluded.add(player);
                                    }
                                    else player.storage.counttrigger.hpp_souying--;
                                },
                            },
                            hpp_zhanyuan: {
                                unique: true,
                                derivation: 'hmxili',
                                audio: 'zhanyuan',
                                trigger: { player: 'mansiAfter' },
                                filter: function (event, player) {
                                    return _status.currentPhase && _status.currentPhase == player && player.countMark('mansi') > 7;
                                },
                                skillAnimation: true,
                                animationColor: 'soil',
                                forced: true,
                                juexingji: true,
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_zhanyuan');
                                    'step 1'
                                    player.chooseTarget('战缘：是否选择一名其他角色？', '令一名其他角色和自己一同获得技能〖系力〗，然后失去技能〖蛮嗣〗', lib.filter.notMe).set('ai', function (target) {
                                        var player = _status.event.player;
                                        return get.attitude(player, target);
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.line(target, 'fire');
                                        player.addSkillLog('hmxili');
                                        target.addSkillLog('hmxili');
                                        player.removeSkill('mansi');
                                    }
                                },
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

                            // 姜维
                            tiaoxin_ol_jiangwei: { audio: 2 },
                            tiaoxin_sp_jiangwei: { audio: 2 },
                            tiaoxin_xiahouba: { audio: 2 },
                            guanxing_ol_jiangwei: { audio: 2 },
                            hpp_tiaoxin: {
                                audio: 'tiaoxin_ol_jiangwei',
                                audioname2: {
                                    hpp_sp_jiangwei: 'tiaoxin_sp_jiangwei',
                                    hpp_xiahouba: 'tiaoxin_xiahouba',
                                },
                                trigger: { player: 'phaseUseBegin' },
                                filter: function (event, player) {
                                    return game.hasPlayer(function (current) {
                                        return current.countCards('h') && current != _status.event.player;
                                    });
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt2('hpp_tiaoxin'), function (card, player, target) {
                                        return target.countCards('h') && target != _status.event.player;
                                    }, function (target) {
                                        var player = _status.event.player;
                                        if (target.countDiscardableCards(player, 'h') >= 2) return get.effect(target, { name: 'guohe_copy2' }, player, player) * 2;
                                        return get.effect(target, { name: 'guohe_copy2' }, player, player);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.logSkill('hpp_tiaoxin', target);
                                        player.discardPlayerCard(target, 'h', [1, 2], true);
                                    }
                                    else event.finish();
                                    'step 2'
                                    var bool = false;
                                    for (var i of result.cards) {
                                        if (i.name == 'sha') bool = true;
                                    }
                                    if (bool && player.countCards('he')) player.chooseToDiscard(true, 'he');
                                },
                            },
                            hpp_zhiji: {
                                derivation: 'hpp_guanxing',
                                audio: 'olzhiji',
                                unique: true,
                                juexingji: true,
                                trigger: { player: 'phaseZhunbeiBegin' },
                                forced: true,
                                filter: function (event, player) {
                                    return player.countCards('h') == 0;
                                },
                                skillAnimation: true,
                                animationColor: 'fire',
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_zhiji');
                                    player.chooseDrawRecover(2, true);
                                    'step 1'
                                    player.loseMaxHp();
                                    player.addSkill('hpp_guanxing');
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

                            // 李典
                            hpp_xunxun: {
                                audio: 'xunxun',
                                inherit: 'xunxun',
                                group: 'hpp_xunxun_biyue',
                                subSkill: {
                                    biyue: {
                                        audio: 'xunxun',
                                        trigger: { player: 'phaseJieshuBegin' },
                                        forced: true,
                                        locked: false,
                                        content: function () {
                                            var cards = get.bottomCards(2);
                                            if (cards.length) {
                                                player.gain(cards);
                                                player.$draw(cards.length);
                                                game.log(player, '从牌堆底获得了' + get.cnNumber(cards.length) + '张牌');
                                            }
                                        },
                                    },
                                },
                            },

                            // 凌统
                            hpp_xuanfeng: {
                                audio: 'xuanfeng',
                                audioname: ['re_heqi', 'xin_lingtong'],
                                trigger: {
                                    player: ['loseAfter', 'phaseDiscardEnd'],
                                    global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
                                },
                                direct: true,
                                filter: function (event, player) {
                                    // if (_status.dying.length) return false;
                                    if (event.name == 'phaseDiscard') {
                                        var cards = [];
                                        player.getHistory('lose', function (evt) {
                                            if (evt && evt.type == 'discard' && evt.getParent('phaseDiscard') == event && evt.hs) cards.addArray(evt.hs);
                                        });
                                        return cards.length > 1;
                                    }
                                    else {
                                        var evt = event.getl(player);
                                        return evt && evt.es && evt.es.length > 0;
                                    }
                                },
                                content: function () {
                                    "step 0"
                                    event.count = 2;
                                    event.targets = [];
                                    event.logged = false;
                                    "step 1"
                                    event.count--;
                                    player.chooseTarget(get.prompt('hpp_xuanfeng'), '弃置一名其他角色的一张牌', function (card, player, target) {
                                        if (player == target) return false;
                                        return target.countDiscardableCards(player, 'he');
                                    }).set('ai', function (target) {
                                        return -get.attitude(_status.event.player, target);
                                    });
                                    "step 2"
                                    if (result.bool) {
                                        if (!event.logged) {
                                            player.logSkill('hpp_xuanfeng', result.targets);
                                            event.logged = true;
                                        }
                                        else player.line(result.targets[0], 'green');
                                        targets.add(result.targets[0]);
                                        player.discardPlayerCard(result.targets[0], 'he', true);
                                    }
                                    else if (!targets.length) event.finish();
                                    "step 3"
                                    if (event.count) event.goto(1);
                                    else if (player == _status.currentPhase) {
                                        player.chooseTarget('是否对其中一名角色造成1点伤害', function (card, player, target) {
                                            return _status.event.targets.contains(target);
                                        }).set('targets', targets).set('ai', function (target) {
                                            var player = _status.event.player;
                                            return get.damageEffect(target, player, player);
                                        });
                                    }
                                    else event.finish();
                                    "step 4"
                                    if (result.bool) {
                                        player.line(result.targets[0], 'thunder');
                                        result.targets[0].damage();
                                    }
                                },
                                ai: {
                                    effect: {
                                        player_use: function (card, player, target) {
                                            if (player == target && get.type(card) == 'equip' && player.countCards('hes', function (cardx) {
                                                return card != cardx && (!card.cards || !card.cards.contains(cardx)) && (player.hasSkill('hpp_yongjin') || get.subtype(card) == get.subtype(cardx)) && (get.position(cardx) == 'e' || player.canUse(cardx, player));
                                            }) > 0) return;
                                            if (!game.hasPlayer(function (current) {
                                                return get.attitude(player, current) < 0 && current.countDiscardableCards(player, 'he') > 0 && get.damageEffect(current, player, player) > 0;
                                            })) return;
                                            if (typeof card == 'object' && player.isPhaseUsing() &&
                                                player.needsToDiscard() == 2 && card.cards && card.cards.filter(function (i) {
                                                    return get.position(i) == 'h';
                                                }).length > 0 && !get.tag(card, 'draw') && !get.tag(card, 'gain') && !(get.tag(card, 'discard') && target == player && player.countCards('e') > 0)) return 'zeroplayertarget';
                                        },
                                        target: function (card, player, target, current) {
                                            if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 3];
                                            if (get.tag(card, 'damage') && target.hp > 2) {
                                                var num1 = target.countCards('h'), num2 = target.getHandcardLimit();
                                                if (num1 > num2) return [1, 1];
                                                if (num1 == num2) return [1.1, _status.event.player == target ? 3 : 0.5];
                                                if (num1 == num2 - 1) return [0.1, _status.event.player == target ? 4.5 : 0.1];
                                            }
                                            if (typeof card == 'object' && (card.name == 'shunshou' || card.name == 'guohe' || card.name == 'zhujinqiyuan') && target.countCards('h') > 0 && get.attitude(player, target) < 0) return [1, -1];
                                        }
                                    },
                                    reverseEquip: true,
                                    noe: true,
                                    expose: 0.2,
                                }
                            },
                            hpp_yongjin: {
                                audio: 'yongjin',
                                audioname: ['xin_lingtong'],
                                unique: true,
                                limited: true,
                                skillAnimation: true,
                                animationColor: 'wood',
                                enable: 'phaseUse',
                                filter: function (event, player, cards) {
                                    return game.hasPlayer(function (current) {
                                        var es = current.getCards('e', function (card) {
                                            // return !cards || !cards.contains(card);
                                            return true;
                                        });
                                        for (var i = 0; i < es.length; i++) {
                                            if (game.hasPlayer(function (current2) {
                                                return current != current2 && !current2.isMin() && current2.isEmpty(get.subtype(es[i]));
                                            })) {
                                                return true;
                                            }
                                        }
                                    });
                                },
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_yongjin');
                                    event.count = 3;
                                    // event.cards = [];
                                    'step 1'
                                    event.count--;
                                    if (!lib.skill.hpp_yongjin.filter(null, player, cards)) {
                                        event.finish();
                                        return;
                                    };
                                    var next = player.chooseTarget(2, function (card, player, target) {
                                        if (ui.selected.targets.length) {
                                            var from = ui.selected.targets[0];
                                            if (target.isMin()) return false;
                                            var es = from.getCards('e', function (card) {
                                                // return !_status.event.cards.contains(card);
                                                return true;
                                            });
                                            for (var i = 0; i < es.length; i++) {
                                                if (target.isEmpty(get.subtype(es[i]))) return true;
                                            }
                                            return false;
                                        }
                                        else {
                                            return target.countCards('e', function (card) {
                                                // return !_status.event.cards.contains(card);
                                                return true;
                                            }) > 0;
                                        }
                                    });
                                    next.set('ai', function (target) {
                                        var player = _status.event.player;
                                        var att = get.attitude(player, target);
                                        var sgnatt = get.sgn(att);
                                        if (ui.selected.targets.length == 0) {
                                            if (target == player && player.hasSkill('hpp_xuanfeng')) {
                                                if (player.countCards('e', function (card) {
                                                    // return !_status.event.cards.contains(card) && game.hasPlayer(function (current) {
                                                    return game.hasPlayer(function (current) {
                                                        return current != target && current.isEmpty(get.subtype(card)) && get.effect(current, card, player, player) < 0;
                                                    });
                                                }) > 0) return 18;
                                                return 7;
                                            }
                                            else if (att > 0) {
                                                if (target.countCards('e', function (card) {
                                                    // return get.value(card, target) < 0 && !_status.event.cards.contains(card) && game.hasPlayer(function (current) {
                                                    return get.value(card, target) < 0 && game.hasPlayer(function (current) {
                                                        return current != target && current.isEmpty(get.subtype(card)) && get.effect(current, card, player, player) < 0;
                                                    });
                                                }) > 0) return 9;
                                            }
                                            else if (att < 0) {
                                                if (game.hasPlayer(function (current) {
                                                    if (current != target && get.attitude(player, current) > 0) {
                                                        var es = target.getCards('e', function (card) {
                                                            // return !_status.event.cards.contains(card);
                                                            return true;
                                                        });
                                                        for (var i = 0; i < es.length; i++) {
                                                            if (get.value(es[i], target) > 0 && current.isEmpty(get.subtype(es[i])) && get.effect(current, es[i], player, current) > 0) return true;
                                                        }
                                                    }
                                                })) {
                                                    return -att;
                                                }
                                            }
                                            return 0;
                                        }
                                        var es = ui.selected.targets[0].getCards('e', function (card) {
                                            // return !_status.event.cards.contains(card);
                                            return true;
                                        });
                                        var i;
                                        var att2 = get.sgn(get.attitude(player, ui.selected.targets[0]));
                                        for (i = 0; i < es.length; i++) {
                                            if (ui.selected.targets[0] == player && player.hasSkill('hpp_xuanfeng')) {
                                                var bool = game.hasPlayer(function (current) {
                                                    return get.attitude(player, current) < 0 && current.countDiscardableCards(player, 'he') > 0 && get.damageEffect(current, player, player) > 0;
                                                });
                                                if (bool && player.countCards('e', function (card) {
                                                    // return !_status.event.cards.contains(card) && target.isEmpty(get.subtype(card)) && get.effect(target, card, player, player) > 0;
                                                    return target.isEmpty(get.subtype(card)) && get.effect(target, card, player, player) > 0;
                                                })) return 2.5 * Math.abs(att);
                                                else if (bool) return 1 / Math.max(1, Math.abs(att));
                                                else return get.damageEffect(target, player, player);
                                            }
                                            if (sgnatt != 0 && att2 != 0 && sgnatt != att2 &&
                                                get.sgn(get.value(es[i], ui.selected.targets[0])) == -att2 &&
                                                get.sgn(get.effect(target, es[i], player, target)) == sgnatt &&
                                                target.isEmpty(get.subtype(es[i]))) {
                                                return Math.abs(att);
                                            }
                                        }
                                        if (i == es.length) {
                                            return 0;
                                        }
                                        return -att * get.attitude(player, ui.selected.targets[0]);
                                    });
                                    next.set('multitarget', true);
                                    next.set('cards', cards);
                                    next.set('targetprompt', ['被移走', '移动目标']);
                                    next.set('prompt', '移动场上的一张装备牌');
                                    'step 2'
                                    if (result.bool) {
                                        player.line2(result.targets, 'green');
                                        event.targets = result.targets;
                                    }
                                    else {
                                        event.finish();
                                    }
                                    'step 3'
                                    game.delay();
                                    'step 4'
                                    if (targets.length == 2) {
                                        player.choosePlayerCard('e', true, function (button) {
                                            var player = _status.event.player;
                                            var targets0 = _status.event.targets0;
                                            var targets1 = _status.event.targets1;
                                            if (get.attitude(player, targets0) > 0 && get.attitude(player, targets1) < 0) {
                                                if (get.value(button.link, targets0) < 0 && get.effect(targets1, button.link, player, targets1) > 0) return 10;
                                                return 0;
                                            }
                                            else {
                                                return get.value(button.link) * get.effect(targets1, button.link, player, player);
                                            }
                                        }, targets[0]).set('nojudge', event.nojudge || false).set('targets0', targets[0]).set('targets1', targets[1]).set('filterButton', function (button) {
                                            // if (_status.event.cards.contains(button.link)) return false;
                                            var targets1 = _status.event.targets1;
                                            return targets1.isEmpty(get.subtype(button.link));
                                        }).set('cards', cards);
                                    }
                                    else {
                                        event.finish();
                                    }
                                    'step 5'
                                    if (result.bool && result.links.length) {
                                        var link = result.links[0];
                                        cards.add(link);
                                        event.targets[1].equip(link);
                                        event.targets[0].$give(link, event.targets[1])
                                        game.delay();
                                    }
                                    else event.finish();
                                    'step 6'
                                    if (event.count > 0) event.goto(1);
                                },
                                ai: {
                                    order: 7,
                                    result: {
                                        player: function (player) {
                                            var num = 0;
                                            var friends = game.filterPlayer(function (current) {
                                                return get.attitude(player, current) >= 4;
                                            });
                                            var vacancies = {
                                                equip1: 0,
                                                equip2: 0,
                                                equip3: 0,
                                                equip4: 0,
                                                equip5: 0
                                            };
                                            for (var i = 0; i < friends.length; i++) {
                                                for (var j = 1; j <= 5; j++) {
                                                    if (friends[i].isEmpty(j)) {
                                                        vacancies['equip' + j]++;
                                                    }
                                                }
                                            }
                                            var sources = game.filterPlayer(function (current) {
                                                return ((current == player && current.hasSkill('hpp_xuanfeng')) || get.attitude(player, current) < 0) && current.countCards('e');
                                            });
                                            for (var i = 0; i < sources.length; i++) {
                                                var es = sources[i].getCards('e');
                                                for (var j = 0; j < es.length; j++) {
                                                    var type = get.subtype(es[j]);
                                                    if (sources[i] == player || vacancies[type] > 0 && get.value(es[j]) > 0) {
                                                        num++;
                                                        if (sources[i] == player && vacancies[type] && game.hasPlayer(function (current) {
                                                            return get.attitude(player, current) < 0 && current.countDiscardableCards(player, 'he') > 0 && get.damageEffect(current, player, player) > 0;
                                                        })) num += 0.5;
                                                        if (num >= 3) {
                                                            return 1;
                                                        }
                                                        vacancies[type]--;
                                                    }
                                                }
                                            }
                                            if (num && player.hp == 1) {
                                                return 0.5;
                                            }
                                            return 0;
                                        }
                                    }
                                }
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
                                    if (trigger.name == 'damage') {
                                        player.logSkill('hpp_zishou', trigger.player);
                                        trigger.cancel();
                                        event.finish();
                                        return;
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
                                            // unequip: true,
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
                                group: ['hpp_jijiang1', 'hpp_jijiang_draw'],
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
                                subSkill: {
                                    draw: {
                                        trigger: { global: ['useCard', 'respond'] },
                                        usable: 1,
                                        direct: true,
                                        filter: function (event, player) {
                                            return event.card.name == 'sha' && player != _status.currentPhase && event.player != player && event.player.group == 'shu' && player.hasZhuSkill('hpp_jijiang');
                                        },
                                        content: function () {
                                            'step 0'
                                            trigger.player.chooseBool('激将：是否令' + get.translation(player) + '摸一张牌？').set('ai', function () {
                                                var evt = _status.event;
                                                return get.attitude(evt.player, evt.getParent().player) > 0;
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                player.logSkill('hpp_jijiang');
                                                trigger.player.line(player, 'fire');
                                                player.draw();
                                            }
                                            else player.storage.counttrigger.rehujia_draw--;
                                        },
                                    },
                                },
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

                            // 刘封
                            hpp_xiansi: {
                                audio: 'xiansi',
                                trigger: { player: 'phaseZhunbeiBegin' },
                                filter: function (event, player) {
                                    return game.hasPlayer(function (current) {
                                        return current != player && current.countCards('he');
                                    });
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    event.bilibili = false;
                                    player.chooseTarget(get.prompt2('hpp_xiansi'), [1, 2], function (card, player, target) {
                                        return target != player && target.countCards('he');
                                    }).set('ai', function (target) {
                                        var num = 1, player = _status.event.player;
                                        if (!target.inRange(player)) num = 3;
                                        return get.effect(target, { name: 'guohe_copy2' }, player, player);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        if (result.targets.length == 1) event.bilibili = true;
                                        result.targets.sortBySeat();
                                        player.logSkill('hpp_xiansi', result.targets);
                                        event.targets = result.targets;
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (event.targets.length) {
                                        var target = event.targets.shift();
                                        event.current = target;
                                        player.discardPlayerCard(target, 'he', true);
                                    }
                                    else event.goto(4);
                                    'step 3'
                                    if (result.bool) {
                                        if (result.cards[0].original == 'e' && event.current.inRange(player)) event.current.useCard({ name: 'sha', isCard: true }, player, false);
                                        event.goto(2);
                                    }
                                    'step 4'
                                    if (event.bilibili) player.draw();
                                },
                            },

                            // 刘禅
                            hpp_fangquan: {
                                audio: 'fangquan',
                                trigger: { player: 'phaseUseBefore' },
                                filter: function (event, player) {
                                    return !player.hasSkill('hpp_fangquan2');
                                },
                                direct: true,
                                preHidden: true,
                                content: function () {
                                    'step 0'
                                    var fang = player.countMark('hpp_fangquan2') == 0 && player.hp >= 2 && player.countCards('h') <= player.hp + 1;
                                    player.chooseBool(get.prompt2('hpp_fangquan')).set('ai', function () {
                                        if (!_status.event.fang) return false;
                                        return game.hasPlayer(function (target) {
                                            if (target.hasJudge('lebu') || target == player) return false;
                                            if (get.attitude(player, target) > 4) {
                                                return (get.threaten(target) / Math.sqrt(target.hp + 1) / Math.sqrt(target.countCards('h') + 1) > 0);
                                            }
                                            return false;
                                        });
                                    }).set('fang', fang).setHiddenSkill(event.name);
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_fangquan');
                                        trigger.cancel();
                                        player.addTempSkill('hpp_fangquan2');
                                    }
                                },
                            },
                            hpp_fangquan2: {
                                trigger: { player: 'phaseEnd' },
                                forced: true,
                                popup: false,
                                audio: false,
                                onremove: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget('放权：请选择进行额外回合的目标角色', lib.filter.notMe).ai = function (target) {
                                        if (target.hasJudge('lebu')) return -1;
                                        if (get.attitude(player, target) > 4) {
                                            return get.threaten(target) / Math.sqrt(target.hp + 1) / Math.sqrt(target.countCards('h') + 1);
                                        }
                                        return -1;
                                    };
                                    'step 1'
                                    var target = result.targets[0];
                                    player.line(target, 'fire');
                                    target.markSkillCharacter('hpp_fangquan', player, '放权', '进行一个额外回合');
                                    target.insertPhase();
                                    target.addSkill('hpp_fangquan3');
                                }
                            },
                            hpp_fangquan3: {
                                trigger: { player: ['phaseAfter', 'phaseCancelled'] },
                                forced: true,
                                popup: false,
                                audio: false,
                                content: function () {
                                    player.unmarkSkill('hpp_fangquan');
                                    player.removeSkill('hpp_fangquan3');
                                },
                            },
                            hpp_ruoyu: {
                                unique: true,
                                keepSkill: true,
                                derivation: 'hpp_jijiang',
                                audio: 'ruoyu',
                                trigger: { player: 'phaseZhunbeiBegin' },
                                filter: function (event, player) {
                                    return player.hasZhuSkill('hpp_ruoyu') && player.isMinHp();
                                },
                                forced: true,
                                juexingji: true,
                                zhuSkill: true,
                                skillAnimation: true,
                                animationColor: 'fire',
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_ruoyu');
                                    player.gainMaxHp();
                                    'step 1'
                                    player.recover();
                                    player.addSkillLog('hpp_jijiang');
                                    if (!player.isZhu) player.storage.zhuSkill_hpp_ruoyu = ['rejijiang'];
                                    else event.trigger('zhuUpdate');
                                },
                            },

                            // 刘协
                            hpp_tianming: {
                                audio: 'tianming',
                                trigger: { target: 'useCardToTargeted' },
                                filter: function (event, player) {
                                    return event.card.name == 'sha';
                                },
                                check: function (event, player) {
                                    var cards = player.getCards('he');
                                    if (cards.length <= 2) {
                                        for (var i = 0; i < cards.length; i++) {
                                            if (cards[i].name == 'shan' || cards[i].name == 'tao') return false;
                                        }
                                    }
                                    return true;
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseToDiscard(2, true, 'he');
                                    player.draw(2);
                                    'step 1'
                                    player.chooseTarget('是否令一名角色弃置两张牌，然后摸两张牌？').set('ai', function (target) {
                                        var cards = target.getCards('he');
                                        if (cards.length <= 2) {
                                            for (var i = 0; i < cards.length; i++) {
                                                if (cards[i].name == 'shan' || cards[i].name == 'tao') return 0;
                                            }
                                        }
                                        return get.attitude(player, target) * (target == player ? 1.2 : 1);
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.logSkill('hpp_tianming', target);
                                        target.chooseToDiscard(2, true, 'he');
                                        target.draw(2);
                                    }
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (card.name == 'sha') return [1, 0.5];
                                        },
                                    },
                                },
                            },
                            hpp_mizhao: {
                                audio: 'mizhao',
                                enable: 'phaseUse',
                                usable: 1,
                                filter: function (event, player) {
                                    return player.countCards('h');
                                },
                                check: function (card) {
                                    var player = _status.event.player;
                                    if (ui.selected.cards.length && !game.hasPlayer(function (current) {
                                        return get.attitude(player, current) > 0;
                                    })) return -1;
                                    return 1 / (get.value(card) || 0.5);
                                },
                                filterCard: true,
                                selectCard: [1, Infinity],
                                filterTarget: lib.filter.notMe,
                                discard: false,
                                lose: false,
                                delay: false,
                                complexCard: true,
                                content: function () {
                                    'step 0'
                                    event.target1 = targets[0];
                                    targets[0].gain(cards, player, 'giveAuto');
                                    'step 1'
                                    if (!game.hasPlayer(function (current) {
                                        return current != player && target.canCompare(current);
                                    })) event.finish();
                                    'step 2'
                                    player.chooseTarget(true, '选择拼点目标', function (card, player, target) {
                                        return _status.event.target1.canCompare(target) && target != player;
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        var eff = get.effect(target, { name: 'sha' }, _status.event.target1, player);
                                        var att = get.attitude(player, target);
                                        if (att > 0) {
                                            return eff - 10;
                                        }
                                        return eff;
                                    }).set('target1', event.target1).set('forceDie', true);
                                    'step 3'
                                    if (result.bool) {
                                        event.target2 = result.targets[0];
                                        event.target1.line(event.target2);
                                        event.target1.chooseToCompare(event.target2);
                                    }
                                    else event.finish();
                                    'step 4'
                                    if (!result.tie) {
                                        var list = [event.target1, event.target2];
                                        if (!result.bool) list.reverse();
                                        if (list[0].canUse({ name: 'sha', isCard: true }, list[1], false)) list[0].useCard({ name: 'sha', isCard: true }, list[1], false);
                                    }
                                },
                                ai: {
                                    order: 1,
                                    result: {
                                        player: function (player, target) {
                                            var num1 = game.countPlayer(function (current) {
                                                return get.attitude(player, current) > 0;
                                            }), num2 = game.countPlayer(function (current) {
                                                return get.attitude(player, current) < 0;
                                            });
                                            if (target.hasSkillTag('nogain')) return 0;
                                            if (num1 > 0 && num2 > 0) return 1;
                                            if (num1 == 0 && num2 > 1) return -1;
                                            return 0;
                                        },
                                    },
                                },
                            },

                            //李严
                            hpp_duliang: {
                                audio: 'duliang',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return game.hasPlayer(function (target) {
                                        return lib.skill.hpp_duliang.filterTarget(null, player, target);
                                    });
                                },
                                filterTarget: function (card, player, target) {
                                    return player != target && target.countCards('h');
                                },
                                usable: 1,
                                content: function () {
                                    'step 0'
                                    player.gainPlayerCard(target, 'h', true);
                                    'step 1'
                                    var name = get.translation(target);
                                    player.chooseControl(function () {
                                        return '选项二';
                                    }).set('prompt', '督粮：请选择一项').set('choiceList', [
                                        '你观看牌堆顶的两张牌，然后令' + name + '获得其中的基本牌和装备牌',
                                        '令' + name + '于下个摸牌阶段额外摸一张牌，然后其交给你一张牌'
                                    ]);
                                    'step 2'
                                    if (result.control == '选项一') {
                                        var cards = get.cards(2);
                                        event.cards = cards;
                                        target.viewCards('督粮', cards);
                                        game.cardsGotoOrdering(cards);
                                        event.cardx = cards.filter(function (card) {
                                            var type = get.type(card);
                                            return type == 'basic' || type == 'equip';
                                        });
                                        if (!event.cardx.length) event.goto(4);
                                    }
                                    else {
                                        target.addTempSkill('hpp_duliang2', { player: 'phaseDrawAfter' });
                                        target.addMark('hpp_duliang2', 1, false);
                                        player.addSkill('hpp_duliang3');
                                        if (!player.storage.hpp_duliang3[target.playerid]) player.storage.hpp_duliang3[target.playerid] = 0;
                                        player.storage.hpp_duliang3[target.playerid]++;
                                        event.finish();
                                    }
                                    'step 3'
                                    var cardx = event.cardx;
                                    target.gain(cardx, 'draw');
                                    game.log(target, '获得了' + get.cnNumber(cardx.length) + '张牌');
                                    cards.removeArray(cardx);
                                    cards.reverse();
                                    'step 4'
                                    for (var i = 0; i < cards.length; i++) {
                                        ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
                                    }
                                    game.updateRoundNumber();
                                },
                                ai: {
                                    order: 4,
                                    result: {
                                        target: -1,
                                        player: 0.1
                                    },
                                },
                            },
                            hpp_duliang2: {
                                charlotte: true,
                                onremove: true,
                                marktext: '粮',
                                intro: {
                                    content: function (storage, player) {
                                        var str = '<li>下回合的摸牌阶段额外摸' + storage + '张牌<br><li>摸牌阶段结束时须交给：';
                                        for (var target of game.filterPlayer2()) {
                                            if (target.storage.hpp_duliang3 && target.storage.hpp_duliang3[player.playerid]) str += '<br>→' + get.translation(target) + '：' + get.translation(target.storage.hpp_duliang3[player.playerid]) + '张牌';
                                        }
                                        return str;
                                    },
                                },
                                trigger: { player: 'phaseDrawBegin' },
                                forced: true,
                                content: function () {
                                    trigger.num += player.countMark('hpp_duliang2');
                                },
                            },
                            hpp_duliang3: {
                                init: function (player) {
                                    if (!player.storage.hpp_duliang3) player.storage.hpp_duliang3 = {};
                                },
                                charlotte: true,
                                trigger: { global: 'phaseDrawEnd' },
                                filter: function (event, player) {
                                    if (!event.player.countCards('he')) return false;
                                    return player.storage.hpp_duliang3[event.player.playerid];
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var num = player.storage.hpp_duliang3[trigger.player.playerid];
                                    delete player.storage.hpp_duliang3[trigger.player.playerid];
                                    var cards = trigger.player.getCards('he');
                                    if (!cards.length) event.finish();
                                    else if (cards.length <= num) event._result = { bool: true, cards: cards };
                                    else trigger.player.chooseCard('he', '督粮：将' + get.cnNumber(num) + '张牌交给' + get.translation(player), num, function (card) {
                                        return trigger.cards.contains(card);
                                    });
                                    'step 1'
                                    if (result.bool) player.gain(result.cards, trigger.player, 'giveAuto');
                                },
                            },

                            // 陆抗
                            hpp_jueyan: {
                                derivation: 'rejizhi',
                                audio: 'drlt_jueyan',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    for (var i = 1; i < 4; i++) {
                                        if (!player.isDisabled('equip' + i)) return true;
                                    }
                                    return false;
                                },
                                usable: 1,
                                content: function () {
                                    'step 0'
                                    var list = [];
                                    for (var i = 1; i < 4; i++) {
                                        if (!player.isDisabled('equip' + i)) {
                                            var subtype = ('equip' + ((i == 3 || i == 4) ? 6 : i));
                                            if (!list.contains(subtype)) list.push(subtype);
                                        }
                                    }
                                    player.chooseControl(list).set('ai', function () {
                                        var player = _status.event.player;
                                        if (list.contains('equip2')) return 'equip2';
                                        if (list.contains('equip1') && (player.countCards('h', function (card) {
                                            return get.name(card, player) == 'sha' && player.hasUseTarget(card);
                                        }) - player.getCardUsable('sha')) > 1) return 'equip1';
                                        if (list.contains('equip6') && player.countCards('h', function (card) {
                                            return get.type2(card, player) == 'trick' && player.hasUseTarget(card, false);
                                        }) > 1) return 'equip6';
                                    }).set('prompt', '决堰：请选择你要废除的装备栏');
                                    'step 1'
                                    if (result.control == 'equip6') {
                                        player.disableEquip('equip3');
                                        player.disableEquip('equip4');
                                        player.recover();
                                        player.addTempSkill('rejizhi');
                                    }
                                    else player.disableEquip(result.control);
                                    if (result.control == 'equip2') player.draw(3);
                                    var list1 = ['equip1', 'equip2', 'equip6'], list2 = ['drlt_jueyan1', 'drlt_jueyan3', 'drlt_jueyan2'];
                                    player.addTempSkill(list2[list1.indexOf(result.control)]);
                                },
                                ai: {
                                    order: 13,
                                    result: {
                                        player: function (player) {
                                            if (!player.isDisabled('equip2')) return 1;
                                            if (!player.isDisabled('equip1') && (player.countCards('h', function (card) {
                                                return get.name(card, player) == 'sha' && player.hasValueTarget(card);
                                            }) - player.getCardUsable('sha')) > 1) return 1;
                                            if ((!player.isDisabled('equip3') || !player.isDisabled('equip4')) && player.countCards('h', function (card) {
                                                return get.type2(card, player) == 'trick' && player.hasUseTarget(card, false);
                                            }) > 1) return 1;
                                            return -1;
                                        },
                                    },
                                },
                            },
                            rejizhi_lukang: { audio: 2 },
                            hpp_huairou: {
                                audio: 'drlt_huairou',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    var list = [], bool = false;
                                    for (var i = 1; i < 5; i++) {
                                        if (player.isDisabled('equip' + i)) list.push('equip' + i);
                                    }
                                    for (var name of lib.inpile) {
                                        if (get.type(name) != 'basic' && get.type2(name) != 'trick') continue;
                                        var storage = player.storage.hpp_huairou2 || [];
                                        if (!storage.contains(name)) {
                                            bool = true;
                                            break;
                                        }
                                    }
                                    return bool && player.countCards('he', function (card) {
                                        return list.contains(get.subtype(card));
                                    });
                                },
                                filterCard: function (card, player) {
                                    var list = [];
                                    for (var i = 1; i < 5; i++) {
                                        if (player.isDisabled('equip' + i)) list.push('equip' + i);
                                    }
                                    return get.type(card) == 'equip' && list.contains(get.subtype(card));
                                },
                                check: function (card) {
                                    var player = _status.event.player;
                                    if (player.isDisabled(get.subtype(card))) return 5;
                                    return 6 - get.value(card);
                                },
                                position: 'he',
                                discard: false,
                                visible: true,
                                loseTo: 'discardPile',
                                delay: 0.5,
                                prepare: function (cards, player) {
                                    player.addTempSkill('hpp_huairou2');
                                    player.$throw(cards, 1000);
                                    game.log(player, '将', cards, '置入了弃牌堆');
                                },
                                content: function () {
                                    'step 0'
                                    var list = [];
                                    for (var name of lib.inpile) {
                                        if (get.type(name) != 'basic' && get.type2(name) != 'trick') continue;
                                        var storage = player.storage.hpp_huairou2;
                                        if (!storage.contains(name)) {
                                            list.push([get.translation(get.type2({ name: name })), '', name]);
                                            if (name == 'sha') {
                                                for (var nature of lib.inpile_nature) list.push(['基本', '', name, nature]);
                                            }
                                        }
                                    }
                                    player.chooseButton(['怀柔：选择获得一种基本牌或锦囊牌', [list, 'vcard']], true);
                                    'step 1'
                                    player.storage.hpp_huairou2.push(result.links[0][2]);
                                    var card = get.cardPile2(function (card) {
                                        return card.name == result.links[0][2] && (get.nature(card) == result.links[0][3] || !result.links[0][3]);
                                    });
                                    if (!card) {
                                        card = get.discardPile(function (card) {
                                            return card.name == result.links[0][2] && (get.nature(card) == result.links[0][3] || !result.links[0][3]);
                                        });
                                    }
                                    if (card) player.gain(card, 'gain2');
                                    else {
                                        player.chat('杯具');
                                        game.log('但是牌堆中已经没有', '#y' + get.translation(result.links[0][2]), '了！')
                                    }
                                },
                                ai: {
                                    order: 10,
                                    result: {
                                        player: 1,
                                    },
                                },
                            },
                            hpp_huairou2: {
                                charlotte: true,
                                onremove: true,
                                init: function (player) {
                                    player.storage.hpp_huairou2 = [];
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

                            // 陆郁生
                            hpp_zhente: {
                                audio: 'zhente',
                                trigger: { target: 'useCardToTargeted' },
                                filter: function (event, player) {
                                    var color = get.color(event.card);
                                    if (player == event.player || event.player.isDead() || color == 'none') return false;
                                    var type = get.type(event.card);
                                    return type == 'basic' || type == 'trick';
                                },
                                check: function (event, player) {
                                    return !event.excluded.contains(player) && get.effect(player, event.card, event.player, player) < 0;
                                },
                                logTarget: 'player',
                                preHidden: true,
                                content: function () {
                                    'step 0'
                                    trigger.player.chooseControl().set('choiceList', [
                                        '本回合内不能再使用' + get.translation(get.color(trigger.card)) + '牌',
                                        '令' + get.translation(trigger.card) + '对' + get.translation(player) + '无效',
                                    ]).set('prompt', get.translation(player) + '发动了【贞特】，请选择一项').set('ai', function () {
                                        var player = _status.event.player;
                                        var target = _status.event.getParent().player;
                                        var card = _status.event.getTrigger().card, color = get.color(card);
                                        if (get.effect(target, card, player, player) <= 0) return 1;
                                        var hs = player.countCards('h', function (card) {
                                            return get.color(card, player) == color && player.hasValueTarget(card, null, true);
                                        });
                                        if (!hs.length) return 0;
                                        if (hs > 1) return 1;
                                        return Math.random() > 0.5 ? 0 : 1;
                                    });
                                    'step 1'
                                    if (result.index == 0) {
                                        trigger.player.addTempSkill('zhente2');
                                        trigger.player.storage.zhente2.add(get.color(trigger.card));
                                        trigger.player.markSkill('zhente2');
                                    }
                                    else trigger.excluded.add(player);
                                },
                            },
                            hpp_zhiwei: {
                                audio: 'zhiwei',
                                trigger: { global: 'phaseBefore', player: ['enterGame', 'phaseZhunbeiBegin'] },
                                filter: function (event, player, name) {
                                    return (name != 'phaseBefore' || game.phaseNumber == 0) && !player.hasSkill('hpp_zhiwei2');
                                },
                                forced: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget('请选择【至微】的目标', '选择一名其他角色。该角色造成伤害后，你摸一张牌，该角色受到伤害后，你可以交给其一张牌。你弃牌阶段弃置的牌可以交给该角色。', true, lib.filter.notMe).set('ai', function (target) {
                                        var att = get.attitude(_status.event.player, target);
                                        if (att > 0) return 1 + att;
                                        return Math.random();
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.line('hpp_zhiwei', target);
                                        player.storage.hpp_zhiwei2 = target;
                                        player.addSkill('hpp_zhiwei2');
                                    }
                                },
                            },
                            hpp_zhiwei2: {
                                group: ['hpp_zhiwei2_draw', 'hpp_zhiwei2_discard', 'hpp_zhiwei2_gain', 'hpp_zhiwei2_clear'],
                                charlotte: true,
                                onremove: true,
                                mark: 'character',
                                intro: { content: '$造成伤害后你摸一张牌；$受到伤害后你可以交给其一张牌；你于弃牌阶段弃置牌后可以交给$' },
                                subSkill: {
                                    draw: {
                                        audio: 'zhiwei',
                                        trigger: { global: 'damageSource' },
                                        filter: function (event, player) {
                                            return event.source == player.storage.hpp_zhiwei2;
                                        },
                                        forced: true,
                                        logTarget: 'source',
                                        content: function () {
                                            player.draw();
                                        },
                                    },
                                    discard: {
                                        trigger: { global: 'damageEnd' },
                                        filter: function (event, player) {
                                            return event.player == player.storage.hpp_zhiwei2 && player.countCards('h');
                                        },
                                        direct: true,
                                        content: function () {
                                            'step 0'
                                            var target = player.storage.hpp_zhiwei2;
                                            event.target = target;
                                            player.chooseCard('h', '至微：是否将一张手牌交给' + get.translation(target) + '？').set('ai', function (card) {
                                                if (_status.event.goon) return 5 - get.value(card);
                                                return -get.value(card);
                                            }).set('goon', get.attitude(player, target) > 0);
                                            'step 1'
                                            if (result.bool) {
                                                player.logSkill('hpp_zhiwei', target);
                                                target.gain(result.cards, player, 'giveAuto');
                                            }
                                        },
                                    },
                                    gain: {
                                        audio: 'zhiwei',
                                        trigger: { player: 'loseAfter', global: 'loseAsyncAfter' },
                                        filter: function (event, player) {
                                            if (event.type != 'discard' || event.getlx === false || event.getParent('phaseDiscard').player != player || !player.storage.hpp_zhiwei2 || !player.storage.hpp_zhiwei2.isIn()) return false;
                                            var evt = event.getl(player);
                                            return evt && evt.cards2.filterInD('d').length > 0;
                                        },
                                        logTarget: function (event, player) {
                                            return player.storage.hpp_zhiwei2;
                                        },
                                        check: function (event, player) {
                                            return get.attitude(player, player.storage.hpp_zhiwei2) > 0;
                                        },
                                        prompt: (event, player) => '是否对' + get.translation(player.storage.hpp_zhiwei2) + '发动【至微】？',
                                        prompt2: (event, player) => '将' + get.translation(event.getl(player).cards2.filterInD('d')) + '交给' + get.translation(player.storage.hpp_zhiwei2),
                                        content: function () {
                                            if (trigger.delay === false) game.delay();
                                            player.storage.hpp_zhiwei2.gain(trigger.getl(player).cards2.filterInD('d'), 'gain2');
                                        },
                                    },
                                    clear: {
                                        audio: 'zhiwei',
                                        trigger: { global: 'die' },
                                        filter: function (event, player) {
                                            return event.player == player.storage.hpp_zhiwei2;
                                        },
                                        forced: true,
                                        content: function () {
                                            player.removeSkill('hpp_zhiwei2');
                                        },
                                    },
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

                            // 马岱
                            hpp_qianxi: {
                                audio: 'qianxi',
                                trigger: { player: 'phaseZhunbeiBegin' },
                                preHidden: true,
                                content: function () {
                                    'step 0'
                                    player.draw(2).gaintag = ['hpp_qianxi'];
                                    player.chooseToDiscard('hes', true, function (card, player) {
                                        return card.hasGaintag('hpp_qianxi');
                                    });
                                    'step 1'
                                    player.removeGaintag('hpp_qianxi');
                                    if (!result.bool) {
                                        event.finish();
                                        return;
                                    }
                                    event.color = get.color(result.cards[0]);
                                    player.chooseTarget(function (card, player, target) {
                                        return player != target && get.distance(player, target) <= 1;
                                    }, true).set('ai', function (target) {
                                        return -get.attitude(_status.event.player, target);
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.line(target, 'green');
                                        game.log(player, '选择了', target);
                                        target.storage.hpp_qianxi2 = event.color;
                                        target.addTempSkill('hpp_qianxi2');
                                        //game.addVideo('storage',target,['hpp_qianxi2',event.color]);
                                    }
                                },
                                ai: {
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (!arg.target.hasSkill('hpp_qianxi2')) return false;
                                        if (arg.card.name == 'sha') return arg.target.storage.hpp_qianxi2 == 'red' && (!arg.target.getEquip('bagua') || player.hasSkillTag('unequip', false, {
                                            name: arg.card ? arg.card.name : null,
                                            target: arg.target,
                                            card: arg.card
                                        }) || player.hasSkillTag('unequip_ai', false, {
                                            name: arg.card ? arg.card.name : null,
                                            target: arg.target,
                                            card: arg.card
                                        }));
                                        return arg.target.storage.hpp_qianxi2 == 'black';
                                    }
                                },
                            },
                            hpp_qianxi2: {
                                forced: true,
                                mark: true,
                                audio: false,
                                content: function () {
                                    player.removeSkill('hpp_qianxi2');
                                    delete player.storage.hpp_qianxi2;
                                },
                                mod: {
                                    cardEnabled2: function (card, player) {
                                        if (get.color(card) == player.storage.hpp_qianxi2 && get.position(card) == 'h') return false;
                                    },
                                },
                                intro: {
                                    content: function (color) {
                                        return '不能使用或打出' + get.translation(color) + '手牌';
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

                            // 马云禄
                            hpp_fengpo: {
                                shaRelated: true,
                                audio: 'fengpo',
                                trigger: { player: 'useCardToPlayered' },
                                filter: function (event, player) {
                                    if (!['sha', 'juedou'].contains(event.card.name)) return false;
                                    if (player != _status.currentPhase) return false;
                                    return player.getHistory('useCard', function (evt) {
                                        return ['sha', 'juedou'].contains(evt.card.name);
                                    }).indexOf(event.getParent()) == 0;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseControl('摸牌', '加伤', 'cancel2').set('prompt', get.prompt2('hpp_fengpo'));
                                    'step 1'
                                    if (result.control != 'cancel2') {
                                        player.logSkill('hpp_fengpo', trigger.target);
                                        var num = Math.min(4, trigger.target.countCards('h', { color: 'red' }));
                                        if (result.control == '摸牌') player.draw(num);
                                        else {
                                            var trigger2 = trigger.getParent();
                                            if (typeof trigger2.baseDamage != 'number') trigger2.baseDamage = 1;
                                            trigger2.baseDamage += num;
                                        }
                                    }
                                },
                            },

                            // 孟获
                            hpp_huoshou: {
                                group: ['huoshou1', 'hpp_huoshou2'],
                                audio: 'huoshou1',
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (card.name == 'nanman') return 0;
                                        },
                                    },
                                },
                            },
                            hpp_huoshou2: {
                                audio: 'huoshou1',
                                trigger: { global: 'useCard' },
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'nanman' && event.player != player;
                                },
                                forced: true,
                                content: function () {
                                    trigger.customArgs.default.customSource = player;
                                    player.draw();
                                },
                            },

                            // 潘凤
                            hpp_kuangfu: {
                                audio: 'xinkuangfu',
                                enable: 'phaseUse',
                                usable: 1,
                                delay: false,
                                filterTarget: function (card, player, target) {
                                    if (player == target) return player.countCards('e', function (card) {
                                        return lib.filter.cardDiscardable(card, player);
                                    }) > 0;
                                    return target.countDiscardableCards(player, 'e') > 0;
                                },
                                filter: function (event, player) {
                                    return game.hasPlayer(function (current) {
                                        return current.countCards('e');
                                    });
                                },
                                content: function () {
                                    'step 0'
                                    if (player == target) player.chooseToDiscard('e', true);
                                    else player.discardPlayerCard(target, 'e', true);
                                    'step 1'
                                    player.chooseUseTarget('sha', true, false, 'nodistance');
                                    'step 2'
                                    var bool = game.hasPlayer2(function (current) {
                                        return current.getHistory('damage', function (evt) {
                                            return evt.getParent(4) == event;
                                        }).length > 0
                                    });
                                    if (bool) player.draw(2);
                                },
                                ai: {
                                    order: function () {
                                        return get.order({ name: 'sha' }) - 0.3;
                                    },
                                    result: {
                                        target: function (player, target) {
                                            var att = get.attitude(player, target);
                                            if (att < 0) return -2;
                                            if (target == player) return 1;
                                            return 0;
                                        },
                                    },
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

                            // 麴义
                            hpp_fuqi: {
                                audio: 'fuqi',
                                forced: true,
                                group: 'hpp_fuqi_tieji',
                                trigger: { player: 'useCard' },
                                filter: function (event, player) {
                                    return event.card && (get.type(event.card) == 'trick' || get.type(event.card) == 'basic' && !['shan', 'tao', 'jiu', 'du'].contains(event.card.name)) && game.hasPlayer(function (current) {
                                        return current != player && get.distance(current, player) <= 2;
                                    });
                                },
                                content: function () {
                                    var targets = game.filterPlayer(function (current) {
                                        return current != player && get.distance(current, player) <= 2;
                                    });
                                    for (var target of targets) target.popup('无法响应');
                                    trigger.directHit.addArray(targets);
                                },
                                ai: {
                                    ignoreSkill: true,
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (tag == 'directHit_ai') return get.distance(arg.target, player) <= 2;
                                        if (!arg || arg.isLink || !arg.card || !get.tag(arg.card, 'damage')) return false;
                                        if (!arg.skill || !lib.skill[arg.skill] || lib.skill[arg.skill].charlotte || get.is.locked(arg.skill) || !arg.target.getSkills(true, false).contains(arg.skill)) return false;
                                    },
                                },
                                subSkill: {
                                    tieji: {
                                        audio: 'fuqi',
                                        trigger: { source: 'damageSource' },
                                        filter: function (event, player) {
                                            return event.player != player && event.player.isAlive();
                                        },
                                        forced: true,
                                        logTarget: 'player',
                                        content: function () {
                                            trigger.player.addTempSkill('fengyin');
                                        },
                                    },
                                },
                            },
                            hpp_jiaozi: {
                                audio: 'jiaozi',
                                trigger: { source: 'damageBegin1' },
                                filter: function (event, player) {
                                    return player.isMaxHandcard();
                                },
                                forced: true,
                                content: function () {
                                    trigger.num++;
                                },
                                ai: { presha: true },
                            },

                            // 沙摩柯
                            hpp_jili: {
                                audio: 'gzjili',
                                inherit: 'gzjili',
                                group: 'hpp_jili_zhiheng',
                                subSkill: {
                                    zhiheng: {
                                        trigger: { player: 'phaseEnd' },
                                        filter: function (event, player) {
                                            return player.countCards('he');
                                        },
                                        direct: true,
                                        content: function () {
                                            'step 0'
                                            player.chooseToDiscard('he', get.prompt('hpp_jili'), '弃置一张牌并摸一张牌').set('ai', lib.skill.zhiheng.check).set('complexCard', true).logSkill = 'hpp_jili';
                                            'step 1'
                                            if (result.bool) player.draw();
                                        },
                                    },
                                },
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

                            // 孙皓
                            hpp_canshi: {
                                audio: 'canshi',
                                trigger: { player: 'phaseDrawBegin2' },
                                check: function (event, player) {
                                    if (player.skipList.contains('phaseUse') || !player.countCards('h', function (card) {
                                        return get.type(card, 'trick') == 'trick' && player.hasUseTarget(card);
                                    })) return true;
                                    var num = game.countPlayer(function (current) {
                                        if (player.hasZhuSkill('guiming') && current.group == 'wu') return true;
                                        return current.isDamaged();
                                    });
                                    return num > 1;
                                },
                                prompt: function (event, player) {
                                    var num = game.countPlayer(function (current) {
                                        if (player.hasZhuSkill('guiming') && current.group == 'wu' && current != player) return true;
                                        return current.isDamaged();
                                    });
                                    return get.prompt('hpp_canshi') + '（可多摸' + get.cnNumber(num) + '张牌，且本回合使用【杀】须弃置一张牌）';
                                },
                                filter: function (event, player) {
                                    return !event.numFixed && game.hasPlayer(function (current) {
                                        if (player.hasZhuSkill('guiming') && current.group == 'wu' && current != player) return true;
                                        return current.isDamaged();
                                    });
                                },
                                content: function () {
                                    var num = game.countPlayer(function (current) {
                                        if (player.hasZhuSkill('guiming') && current.group == 'wu' && current != player) return true;
                                        return current.isDamaged();
                                    });
                                    if (num > 0) trigger.num += num;
                                    player.addTempSkill('hpp_canshi2');
                                },
                            },
                            hpp_canshi2: {
                                trigger: { player: 'useCard' },
                                filter: function (event, player) {
                                    if (!player.countCards('he')) return false;
                                    return event.card.name == 'sha';
                                },
                                forced: true,
                                autodelay: true,
                                content: function () {
                                    player.chooseToDiscard(true, 'he');
                                },
                            },
                            hpp_chouhai: {
                                audio: 'chouhai',
                                trigger: { player: 'damageBegin3' },
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && !player.countCards('he');
                                },
                                forced: true,
                                content: function () {
                                    trigger.num++;
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (card.name == 'sha' && !target.countCards('he')) return [1, -2];
                                        },
                                    },
                                },
                            },

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
                                unique: true,
                                audio: 'wulie',
                                trigger: { player: 'phaseBegin' },
                                mark: true,
                                limited: true,
                                filter: function (event, player) {
                                    return player.hp > 0;
                                },
                                direct: true,
                                priority: 10,
                                skillAnimation: true,
                                animationColor: 'wood',
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
                                    return cards.length;
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
                                    var num = event.num, str = event.control;
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

                            // 孙鲁班
                            hpp_zenhui: {
                                audio: 'chanhui',
                                usable: 1,
                                trigger: { player: 'useCardToPlayer' },
                                filter: function (event, player) {
                                    if (_status.currentPhase != player) return false;
                                    if (event.targets.length > 1) return false;
                                    var card = event.card;
                                    if (card.name == 'sha' || get.type(card) == 'trick') return true;
                                    return false;
                                },
                                check: function (event, player) {
                                    return get.attitude(player, event.target) < 0;
                                },
                                logTarget: 'target',
                                content: function () {
                                    'step 0'
                                    trigger.target.chooseCard('he', '谮毁：交给' + get.translation(player) + '一张牌，或失去1点体力').set('ai', function (card) {
                                        return 7 - get.value(card);
                                    });
                                    'step 1'
                                    if (result.bool) player.gain(result.cards, trigger.target, 'giveAuto');
                                    else trigger.target.loseHp();
                                },
                            },
                            hpp_jiaojin: {
                                audio: 'jiaojin',
                                trigger: { target: 'useCardToTargeted' },
                                filter: function (event, player) {
                                    return (event.card.name == 'sha' || get.type(event.card) == 'trick');
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var next = player.chooseToDiscard('h', '骄矜：是否弃置一张手牌令' + get.translation(trigger.card) + '对你无效？');
                                    next.set('ai', function (card) {
                                        if (_status.event.goon2) {
                                            return 3 + _status.event.val - get.value(card);
                                        }
                                        return 0;
                                    });
                                    next.set('val', get.value(trigger.cards.filterInD()));
                                    next.set('goon2', get.effect(player, trigger.card, trigger.player, player) < 0)
                                    next.logSkill = ['hpp_jiaojin', trigger.player];
                                    'step 1'
                                    if (result.bool) trigger.excluded.push(player);
                                },
                            },

                            // 孙鲁育
                            hpp_meibu: {
                                audio: 'meibu',
                                trigger: { global: 'phaseUseBegin' },
                                filter: function (event, player) {
                                    return event.player != player && event.player.isAlive() && player.countCards('he');
                                },
                                direct: true,
                                derivation: 'rezhixi',
                                checkx: function (event, player) {
                                    if (get.attitude(player, event.player) >= 0) return false;
                                    return event.player.countCards('h') > event.player.hp;
                                },
                                content: function () {
                                    'step 0'
                                    var check = lib.skill.new_meibu.checkx(trigger, player);
                                    player.chooseToDiscard(get.prompt2('hpp_meibu', trigger.player), 'he').set('ai', function (card) {
                                        if (_status.event.check) return 6 - get.value(card);
                                        return 0;
                                    }).set('check', check).set('logSkill', ['hpp_meibu', trigger.player]);
                                    'step 1'
                                    if (result.bool) {
                                        var target = trigger.player;
                                        player.line(target, 'green');
                                        player.addTempSkill('hpp_meibu_gain');
                                        target.addTempSkill('rezhixi');
                                    }
                                },
                                ai: { expose: 0.2 },
                                subSkill: {
                                    gain: {
                                        trigger: { global: 'loseAfter' },
                                        forced: true,
                                        charlotte: true,
                                        popup: false,
                                        onremove: true,
                                        filter: function (event, player) {
                                            return event.getParent(3).name == 'rezhixi' && get.position(event.cards[0]) == 'd';
                                        },
                                        content: function () {
                                            player.gain(trigger.cards[0], 'gain2');
                                        },
                                    },
                                },
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
                                        if (get.attitude(evt.player, evt.getParent().player) > 0) {
                                            if ((evt.getParent().player.hp > 2 && evt.player.hp < evt.getParent().player.hp) || (!evt.getParent().player.isDamaged() && evt.player.isDamaged())) {
                                                return false;
                                            }
                                            return true;
                                        } else {
                                            return false;
                                        }
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

                            // 孙尚香
                            hpp_jieyi: {
                                audio: 'rejieyin',
                                enable: 'phaseUse',
                                filterCard: true,
                                usable: 1,
                                position: 'he',
                                filter: function (event, player) {
                                    return player.countCards('he');
                                },
                                check: function (card) {
                                    var player = _status.event.player;
                                    if (get.position(card) == 'e') {
                                        var subtype = get.subtype(card);
                                        if (!game.hasPlayer(function (current) {
                                            return current != player && current.hp != player.hp && get.attitude(player, current) > 0 && !current.countCards('e', { subtype: subtype });
                                        })) {
                                            return 0;
                                        }
                                        if (player.countCards('h', { subtype: subtype })) return 20 - get.value(card);
                                        return 10 - get.value(card);
                                    }
                                    else {
                                        if (player.countCards('e')) return 0;
                                        if (player.countCards('h', { type: 'equip' })) return 0;
                                        return 8 - get.value(card);
                                    }
                                },
                                filterTarget: function (card, player, target) {
                                    var card = ui.selected.cards[0];
                                    if (!card) return false;
                                    if (get.position(card) == 'e' && target.countCards('e', { subtype: get.subtype(card) })) return false;
                                    return true;
                                },
                                discard: false,
                                delay: 0,
                                lose: false,
                                content: function () {
                                    'step 0'
                                    if (get.position(cards[0]) == 'e') {
                                        player.$give(cards, target);
                                        target.equip(cards[0]);
                                    }
                                    else player.give(cards, target, true);
                                    'step 1'
                                    player.recover();
                                    player.draw();
                                    'step 2'
                                    if (target.hp < player.hp && target.isHealthy()) { event.finish(); return; }
                                    player.chooseBool('结谊：是否令' + get.translation(target) + (target.hp < player.hp ? '回复1点体力' : '摸一张牌') + '？').set('choice', get.attitude(player, target) > 0);
                                    'step 3'
                                    if (result.bool) {
                                        player.line(target);
                                        target[target.hp < player.hp ? 'recover' : 'draw']();
                                    }
                                },
                                ai: {
                                    order: function () {
                                        var player = _status.event.player;
                                        var es = player.getCards('e');
                                        for (var i = 0; i < es.length; i++) {
                                            if (player.countCards('h', { subtype: get.subtype(es[i]) })) return 10;
                                        }
                                        return 2;
                                    },
                                    result: {
                                        target: function (player, target) {
                                            var goon = function () {
                                                var es = player.getCards('e');
                                                for (var i = 0; i < es.length; i++) {
                                                    if (player.countCards('h', { subtype: get.subtype(es[i]) })) return true;
                                                }
                                                return false;
                                            }
                                            if (player.hp < target.hp) {
                                                if (player.isHealthy()) {
                                                    if (!player.needsToDiscard(1) || goon()) return 0.1;
                                                    return 0;
                                                }
                                                return 1.5;
                                            }
                                            if (player.hp > target.hp) {
                                                if (target.isHealthy()) {
                                                    if (!player.needsToDiscard(1) || goon()) return 0.1;
                                                    return 0;
                                                }
                                                return 1;
                                            }
                                            return 0;
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
                                        if (links[0] == 'give') return '弃置一张牌，令一名有牌的其他角色交给你一张牌';
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

                            // 王异
                            hpp_zhenlie: {
                                audio: 'zhenlie',
                                filter: function (event, player) {
                                    return event.player != player && event.card && (event.card.name == 'sha' || get.type(event.card) == 'trick');
                                },
                                logTarget: 'player',
                                check: function (event, player) {
                                    if (event.getParent().excluded.contains(player)) return false;
                                    if (get.attitude(player, event.player) > 0) {
                                        return false;
                                    }
                                    if (get.tag(event.card, 'respondSha')) {
                                        if (player.countCards('h', { name: 'sha' }) == 0) {
                                            return true;
                                        }
                                    }
                                    else if (get.tag(event.card, 'respondShan')) {
                                        if (player.countCards('h', { name: 'shan' }) == 0) {
                                            return true;
                                        }
                                    }
                                    else if (get.tag(event.card, 'damage')) {
                                        if (event.card.name == 'shuiyanqijunx') return player.countCards('e') == 0;
                                        return true;
                                    }
                                    else if ((event.card.name == 'shunshou' || (event.card.name == 'zhujinqiyuan' && (event.card.yingbian || get.distance(event.player, player) < 0))) && player.hp > 2) {
                                        return true;
                                    }
                                    return false;
                                },
                                trigger: { target: 'useCardToTargeted' },
                                content: function () {
                                    "step 0"
                                    player.loseHp();
                                    "step 1"
                                    trigger.getParent().excluded.add(player);
                                    "step 2"
                                    if (trigger.player.countCards('he')) {
                                        player.discardPlayerCard(trigger.player, 'he', true);
                                    }
                                },
                                ai: {
                                    expose: 0.3
                                }
                            },
                            hpp_miji: {
                                audio: 'miji',
                                trigger: { player: 'phaseJieshuBegin' },
                                filter: function (event, player) {
                                    return player.hp < player.maxHp;
                                },
                                content: function () {
                                    "step 0"
                                    event.num = player.getDamagedHp();
                                    player.draw(event.num);
                                    "step 1"
                                    var check = player.countCards('h') - event.num;
                                    player.chooseCardTarget({
                                        selectCard: event.num,
                                        filterTarget: function (card, player, target) {
                                            return player != target;
                                        },
                                        ai1: function (card) {
                                            var player = _status.event.player;
                                            if (player.maxHp - player.hp == 1 && card.name == 'du') return 30;
                                            var check = _status.event.check;
                                            if (check < 1) return 0;
                                            if (player.hp > 1 && check < 2) return 0;
                                            return get.unuseful(card) + 9;
                                        },
                                        ai2: function (target) {
                                            var att = get.attitude(_status.event.player, target);
                                            if (ui.selected.cards.length == 1 && ui.selected.cards[0].name == 'du') return 1 - att;
                                            return att - 2;
                                        },
                                        prompt: '将' + get.cnNumber(event.num) + '张手牌交给一名其他角色',
                                    }).set('check', check);
                                    "step 2"
                                    if (result.bool) {
                                        player.give(result.cards, result.targets[0]);
                                        player.line(result.targets, 'green');
                                    }
                                },
                                ai: {
                                    threaten: function (player, target) {
                                        if (target.hp == 1) return 3;
                                        if (target.hp == 2) return 1.5;
                                        return 0.5;
                                    },
                                    effect: {
                                        target: function (card, player, target) {
                                            if (get.tag(card, 'recover') && player.hp >= player.maxHp - 1) return [0, 0];
                                        }
                                    }
                                }
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

                            // 太史慈
                            hpp_tianyi: {
                                audio: 'tianyi',
                                trigger: { player: 'phaseUseBegin' },
                                check: function (event, player) {
                                    return true;
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseControl().set('choiceList', [
                                        '本回合使用出杀次数+1，杀造成伤害后回复1点体力',
                                        '摸一张牌，本回合杀无距离限制且无视防具'
                                    ]).set('ai', function () {
                                        if ((player.countCards('h', function (card) {
                                            return get.name(card, player) == 'sha' && player.hasUseTarget(card);
                                        }) - player.getCardUsable('sha')) > 1) return 0;
                                        return 1;
                                    });
                                    'step 1'
                                    player.popup('选项' + get.cnNumber(result.index + 1, true));
                                    game.log(player, '选择了', '#g【天义】', '的选项' + get.cnNumber(result.index + 1, true));
                                    if (result.index == 1) player.draw();
                                    player.addTempSkill('hpp_tianyi_' + result.index);
                                },
                                subSkill: {
                                    '0': {
                                        charlotte: true,
                                        mod: {
                                            cardUsable: function (card, player, num) {
                                                if (card.name == 'sha') return num + 1;
                                            },
                                        },
                                        trigger: { source: 'damageSource' },
                                        filter: function (event, player) {
                                            return player.isDamaged() && event.card && event.card.name == 'sha';
                                        },
                                        direct: true,
                                        content: function () {
                                            player.recover();
                                        },
                                    },
                                    '1': {
                                        charlotte: true,
                                        mod: {
                                            targetInRange: function (card, player, target, now) {
                                                if (card.name == 'sha') return true;
                                            },
                                        },
                                        trigger: { player: 'useCardToPlayered' },
                                        filter: function (event, player) {
                                            return event.card.name == 'sha';
                                        },
                                        direct: true,
                                        content: function () {
                                            trigger.target.addTempSkill('qinggang2');
                                            trigger.target.storage.qinggang2.add(trigger.card);
                                        },
                                        ai: {
                                            unequip_ai: true,
                                            skillTagFilter: function (player, tag, arg) {
                                                if (arg && arg.name == 'sha') return true;
                                                return false;
                                            },
                                        },
                                    },
                                },
                            },

                            // 夏侯霸
                            hpp_baobian: {
                                derivation: ['hpp_tiaoxin', 'new_repaoxiao', 'hpp_shensu'],
                                audio: 'baobian',
                                trigger: { player: 'damageEnd' },
                                filter: function (event, player) {
                                    for (var i of lib.skill.hpp_baobian.derivation) {
                                        if (!player.hasSkill(i, null, null, false)) return true;
                                    }
                                    return false;
                                },
                                forced: true,
                                content: function () {
                                    for (var i of lib.skill.hpp_baobian.derivation) {
                                        if (!player.hasSkill(i, null, null, false)) {
                                            player.addSkillLog(i);
                                            break;
                                        }
                                    }
                                },
                                ai: {
                                    maixie: true,
                                    effect: {
                                        target: function (card, player, target) {
                                            if (get.tag(card, 'damage') && !target.hasSkill('hpp_tiaoxin', null, null, false)) {
                                                if (!target.hasFriend()) return;
                                                if (target.hp >= 4) return [0, 1];
                                            }
                                        },
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

                            // 夏侯令女
                            hpp_weilie: {
                                audio: 'weilie',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countMark('hpp_weilie') <= player.getStorage('fuping').length && player.countCards('he') && game.hasPlayer(function (current) {
                                        return lib.skill.hpp_weilie.filterTarget(null, player, current);
                                    });
                                },
                                filterCard: true,
                                position: 'he',
                                filterTarget: function (card, player, target) {
                                    return target.isDamaged();
                                },
                                check: function (card) {
                                    return 8 - get.value(card);
                                },
                                content: function () {
                                    player.addMark('hpp_weilie', 1, false);
                                    target.recover();
                                    target.draw();
                                },
                                onremove: true,
                                ai: {
                                    order: 1,
                                    result: {
                                        player: function (player, target) {
                                            var eff = get.recoverEffect(target, player, player);
                                            if (target.getDamagedHp() > 1) eff += get.effect(target, { name: 'wuzhong' }, player, player) / 2;
                                            return eff;
                                        },
                                    },
                                },
                            },

                            // 夏侯渊
                            shensu1_ol_xiahouyuan: { audio: 2 },
                            shensu1_xiahouba: { audio: 2 },
                            hpp_shensu: {
                                audio: 'shensu1',
                                audioname2: {
                                    hpp_xiahouyuan: 'shensu1_ol_xiahouyuan',
                                    hpp_xiahouba: 'shensu1_xiahouba',
                                },
                                trigger: { player: ['phaseJudgeBefore', 'phaseUseBefore', 'phaseDiscardBefore'] },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var check;
                                    switch (event.triggername) {
                                        case 'phaseJudgeBefore': check = player.countCards('h') > 2; break;
                                        case 'phaseUseBefore': check = player.needsToDiscard(); break;
                                        case 'phaseDiscardBefore': check = player.needsToDiscard() || player.isTurnedOver() || (player.hasSkill('shebian') && player.canMoveCard(true, true)); break;
                                    }
                                    var str = ['判定阶段和摸牌', '出牌', '弃牌'][lib.skill.hpp_shensu.trigger.player.indexOf(event.triggername)];
                                    player.chooseTarget(get.prompt('hpp_shensu'), '跳过' + str + '阶段并视为对一名其他角色使用一张【杀】', function (card, player, target) {
                                        if (player == target) return false;
                                        return player.canUse({ name: 'sha' }, target, false);
                                    }).set('check', check).set('ai', function (target) {
                                        if (!_status.event.check) return 0;
                                        return get.effect(target, { name: 'sha' }, _status.event.player);
                                    }).setHiddenSkill('hpp_shensu');
                                    'step 1'
                                    if (result.bool) {
                                        trigger.cancel();
                                        if (event.triggername == 'phaseJudgeBefore') player.skip('phaseDraw');
                                        player.logSkill('hpp_shensu', result.targets);
                                        if (event.triggername == 'phaseDiscardBefore') player.turnOver();
                                        player.useCard({ name: 'sha', isCard: true }, result.targets[0], false).audio = false;
                                    }
                                },
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

                            // 辛宪英
                            hpp_zhongjian: {
                                enable: 'phaseUse',
                                audio: 'zhongjian',
                                usable: 2,
                                filter: function (event, player) {
                                    if (player.getStat().skill.hpp_zhongjian && !player.hasSkill('recaishi2')) return false;
                                    return game.hasPlayer(function (current) {
                                        return lib.skill.hpp_zhongjian.filterTarget(null, player, current);
                                    });
                                },
                                filterTarget: function (card, player, target) {
                                    if (!player.storage.rezhongjian2) return true;
                                    return !player.storage.rezhongjian2[0].contains(target) && !player.storage.rezhongjian2[1].contains(target);
                                },
                                content: function () {
                                    'step 0'
                                    player.chooseControl().set('prompt', '忠鉴：为' + get.translation(target) + '选择获得一项效果').set('choiceList', [
                                        '该角色下次造成伤害后弃置两张牌',
                                        '该角色下次受到伤害后摸两张牌',
                                    ]).set('ai', function () {
                                        return get.attitude(_status.event.player, _status.event.getParent().target) > 0 ? 1 : 0;
                                    });
                                    'step 1'
                                    player.addSkill('rezhongjian2');
                                    var str = ['造成伤害弃牌', '受到伤害摸牌'][result.index];
                                    player.popup(str, ['fire', 'wood'][result.index]);
                                    game.log(player, '选择了', '#y' + str)
                                    player.storage.rezhongjian2[result.index].push(target);
                                    player.markSkill('rezhongjian2');
                                },
                                ai: {
                                    order: 10,
                                    expose: 0,
                                    result: {
                                        player: function (player, target) {
                                            if (get.attitude(player, target) == 0) return false;
                                            var sgn = get.sgn((get.realAttitude || get.attitude)(player, target));
                                            if (game.countPlayer(function (current) {
                                                return get.sgn((get.realAttitude || get.attitude)(player, current)) == sgn;
                                            }) <= game.countPlayer(function (current) {
                                                return get.sgn((get.realAttitude || get.attitude)(player, current)) != sgn;
                                            })) return 1;
                                            return 0.9;
                                        },
                                    },
                                },
                            },
                            hpp_caishi: {
                                trigger: { player: 'phaseDrawEnd' },
                                direct: true,
                                isSame: function (event) {
                                    var cards = [];
                                    event.player.getHistory('gain', function (evt) {
                                        if (evt.getParent().name == 'draw' && evt.getParent('phaseDraw') == event) cards.addArray(evt.cards);
                                    });
                                    if (!cards.length) return 'nogain';
                                    var list = [];
                                    for (var i = 0; i < cards.length; i++) {
                                        list.add(get.suit(cards[i]));
                                    }
                                    if (list.length == 1) return true;
                                    if (list.length == cards.length) return false;
                                    return 'nogain';
                                },
                                filter: function (event, player) {
                                    var isSame = lib.skill.hpp_caishi.isSame(event);
                                    if (isSame == 'nogain') return false;
                                    return (isSame && !player.hasSkill('recaishi2')) || player.isDamaged();
                                },
                                content: function () {
                                    'step 0'
                                    if (lib.skill.hpp_caishi.isSame(trigger)) {
                                        if (!player.hasSkill('recaishi2')) {
                                            player.logSkill('hpp_caishi');
                                            player.addTempSkill('recaishi2');
                                            lib.skill.recaishi2.charlotte = true;
                                            game.log(player, '修改了技能', '#g【忠鉴】');
                                            event.finish();
                                            return;
                                        }
                                    }
                                    else if (player.isDamaged()) player.chooseToDiscard(get.prompt('hpp_caishi'), '弃置一张牌并回复1点体力').set('ai', function (card) {
                                        return 7 - get.value(card);
                                    }).logSkill = 'hpp_caishi';
                                    else event.finish();
                                    'step 1'
                                    if (result.bool) player.recover();
                                },
                            },

                            // 徐晃
                            hpp_duanliang: {
                                audio: 'duanliang1',
                                group: ['hpp_duanliang1', 'hpp_duanliang3'],
                                ai: {
                                    threaten: 1.2
                                }
                            },
                            hpp_duanliang1: {
                                audio: 2,
                                audioname: ['re_xuhuang'],
                                enable: 'chooseToUse',
                                filterCard: function (card) {
                                    if (get.type(card) != 'basic' && get.type(card) != 'equip') return false;
                                    return get.color(card) == 'black';
                                },
                                filter: function (event, player) {
                                    return player.countCards('hes', { type: ['basic', 'equip'], color: 'black' })
                                },
                                position: 'hes',
                                viewAs: { name: 'bingliang' },
                                prompt: '将一黑色的基本牌或装备牌当兵粮寸断使用',
                                check: function (card) { return 6 - get.value(card) },
                                ai: {
                                    order: 9
                                }
                            },
                            hpp_duanliang2: {
                                mod: {
                                    targetInRange: function (card, player, target) {
                                        if (card.name == 'bingliang') {
                                            if (get.distance(player, target) <= 2) return true;
                                        }
                                    }
                                }
                            },
                            hpp_duanliang3: {
                                mod: {
                                    targetInRange: function (card, player, target) {
                                        if (card.name == 'bingliang') {
                                            if (target.countCards('h') >= player.countCards('h')) return true;
                                        }
                                    }
                                }
                            },
                            hpp_jiezi: {
                                audio: 'jiezi',
                                trigger: { global: ['phaseDrawSkipped', 'phaseDrawCancelled'] },
                                filter: function (event, player) {
                                    return event.player != player && player.countMark('hpp_jiezi_silent') < 2;
                                },
                                forced: true,
                                logTarget: 'player',
                                content: function () {
                                    player.addTempSkill('hpp_jiezi_silent', 'roundStart');
                                    player.addMark('hpp_jiezi_silent', 1, false);
                                    player.draw(2);
                                },
                                subSkill: { silent: { onremove: true, charlotte: true } },
                            },

                            // 荀彧
                            hpp_quhu: {
                                audio: 'quhu',
                                enable: 'phaseUse',
                                usable: 1,
                                chooseButton: {
                                    dialog: function (event, player) {
                                        var list = [
                                            '弃置两张手牌，对一名其他角色造成1点伤害',
                                            '对自己造成1点伤害，然后摸一张牌',
                                        ];
                                        var choiceList = ui.create.dialog('驱虎：请选择一项', 'forcebutton', 'hidden');
                                        for (var i = 0; i < list.length; i++) {
                                            var str = '<div class="popup text" style="width:calc(100% - 10px);display:inline-block">';
                                            var bool = lib.skill.hpp_quhu.chooseButton.filter({ link: i }, player);
                                            if (!bool) str += '<div style="opacity:0.5">';
                                            str += list[i];
                                            if (!bool) str += '</div>';
                                            str += '</div>';
                                            var next = choiceList.add(str);
                                            next.firstChild.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.button);
                                            next.firstChild.link = i;
                                            for (var j in lib.element.button) {
                                                next[j] = lib.element.button[j];
                                            }
                                            choiceList.buttons.add(next.firstChild);
                                        }
                                        return choiceList;
                                    },
                                    filter: function (button, player) {
                                        return true;
                                    },
                                    check: function (button) {
                                        var player = _status.event.player;
                                        if (game.hasPlayer([
                                            function (target) {
                                                return get.damageEffect(target, player, player) > 0;
                                            },
                                            function (target) {
                                                if (!target.hasSkill('jieming') && !target.hasSkill('hpp_jieming')) return 0;
                                                return target.hp > 2 && game.hasPlayer(function (current) {
                                                    return get.attitude(current, player) > 0 && current.countCards('h') < current.maxHp - 1;
                                                });
                                            },
                                        ][button.link])) return 1 + button.link;
                                        return 0;
                                    },
                                    backup: function (links) {
                                        return {
                                            audio: 'quhu',
                                            filterTarget: [
                                                function (card, player, target) {
                                                    return target != player;
                                                },
                                                function (card, player, target) {
                                                    return target == player;
                                                },
                                            ][links[0]],
                                            index: links[0],
                                            filterCard: true,
                                            selectCard: [2, 0][links[0]],
                                            check: function (card) {
                                                return 7 - get.value(card);
                                            },
                                            position: 'h',
                                            content: function () {
                                                target.damage('nocard');
                                                if (target == player) player.draw();
                                            },
                                            ai: {
                                                order: 7,
                                                tag: { damage: 1.5 },
                                                result: { target: -1 },
                                            },
                                        }
                                    },
                                    prompt: function (links) {
                                        if (links[0] == 0) return '弃置两张手牌，对一名其他角色造成1点伤害';
                                        return '对自己造成1点伤害，然后摸一张牌';
                                    },
                                },
                                ai: {
                                    order: 7,
                                    result: { player: 1 },
                                },
                            },
                            hpp_jieming: {
                                audio: 'jieming',
                                trigger: { player: 'damageEnd' },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    event.count = trigger.num;
                                    'step 1'
                                    event.count--;
                                    player.chooseTarget(get.prompt2('hpp_jieming')).set('ai', function (target) {
                                        var att = get.attitude(_status.event.player, target);
                                        if (target.countCards('h') >= Math.min(target.maxHp, 4)) return -1;
                                        if (target.hasSkillTag('nogain')) att /= 6;
                                        if (att > 0) return Math.min(4, target.maxHp) - target.countCards('h');
                                        return -1;
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.logSkill('hpp_jieming', target);
                                        target.drawTo(Math.min(4, target.maxHp));
                                    }
                                    else event.finish();
                                    'step 3'
                                    if (event.count > 0) event.goto(1);
                                },
                                ai: {
                                    maixie: true,
                                    maixie_hp: true,
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (get.tag(card, 'damage') && target.hp > 1) {
                                                if (player.hasSkillTag('jueqing', false, target)) return [1, -2];
                                                var max = 0;
                                                var players = game.filterPlayer();
                                                for (var i = 0; i < players.length; i++) {
                                                    if (get.attitude(target, players[i]) > 0) {
                                                        max = Math.max(Math.min(4, players[i].hp) - players[i].countCards('h'), max);
                                                    }
                                                }
                                                switch (max) {
                                                    case 0: return 2;
                                                    case 1: return 1.5;
                                                    case 2: return [1, 2];
                                                    default: return [0, max];
                                                }
                                            }
                                            if ((card.name == 'tao' || card.name == 'caoyao') &&
                                                target.hp > 1 && target.countCards('h') <= target.hp) return [0, 0];
                                        },
                                    },
                                },
                            },

                            // 徐盛
                            hpp_pojun: {
                                shaRelated: true,
                                audio: 'decadepojun',
                                trigger: { player: 'useCardToPlayered' },
                                direct: true,
                                filter: function (event, player) {
                                    return event.card.name == 'sha' && event.target.hp > 0 && event.target.countCards('he');
                                },
                                content: function () {
                                    'step 0'
                                    var next = player.choosePlayerCard(trigger.target, 'he', [1, Math.min(trigger.target.hp, trigger.target.countCards('he'))], get.prompt('hpp_pojun', trigger.target));
                                    next.set('ai', function (button) {
                                        if (!_status.event.goon) return 0;
                                        var val = get.value(button.link);
                                        if (button.link == _status.event.target.getEquip(2)) return 2 * (val + 3);
                                        return val;
                                    });
                                    next.set('goon', get.attitude(player, trigger.target) <= 0);
                                    next.set('forceAuto', true);
                                    'step 1'
                                    if (result.bool) {
                                        event.cards = result.cards;
                                        var target = trigger.target;
                                        player.logSkill('hpp_pojun', trigger.target);
                                        target.addSkill('hpp_pojun2');
                                        target.addToExpansion(result.cards, 'giveAuto', target).gaintag.add('hpp_pojun2');
                                        // game.cardsGotoSpecial(event.cards);
                                        // target.storage.hpp_pojun_cards.addArray(event.cards);
                                        game.log(player, '将', event.cards, '移出了游戏');
                                    }
                                    else event.finish();
                                    'step 2'
                                    var discard = false, draw = false;
                                    for (var i of cards) {
                                        var type = get.type2(i);
                                        if (type == 'equip') discard = true;
                                        if (i.name == 'shan') draw = true;
                                    }
                                    if (discard) {
                                        event.equip = true;
                                        player.chooseButton(['选择一张装备牌置入弃牌堆', cards.filter(function (card) {
                                            return get.type(card) == 'equip';
                                        })], true).set('ai', function (button) {
                                            return get.value(button.link, _status.event.getTrigger().target);
                                        });
                                    }
                                    if (draw) event.draw = true;
                                    'step 3'
                                    if (event.equip && result.links && result.links.length) trigger.target.loseToDiscardpile(result.links);
                                    if (event.draw) player.draw();
                                },
                                ai: {
                                    unequip_ai: true,
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (get.attitude(player, arg.target) > 0) return false;
                                        if (tag == 'directHit_ai') return arg.target.hp >= Math.max(1, arg.target.countCards('h') - 1);
                                        if (arg && arg.name == 'sha' && arg.target.getEquip(2)) return true;
                                        return false;
                                    }
                                },
                            },
                            hpp_pojun2: {
                                trigger: { global: 'phaseEnd' },
                                forced: true,
                                popup: false,
                                charlotte: true,
                                // init: function (player) {
                                //     if (!player.storage.hpp_pojun_cards) player.storage.hpp_pojun_cards = [];
                                // },
                                filter: function (event, player) {
                                    return player.getExpansions('hpp_pojun2').length > 0;
                                    // return player.storage.hpp_pojun_cards.length;
                                },
                                content: function () {
                                    'step 0'
                                    var cards = player.getExpansions('hpp_pojun2');
                                    // var cards = player.storage.hpp_pojun_cards;
                                    player.gain(cards, 'draw');
                                    game.log(player, '收回了' + get.cnNumber(cards.length) + '张〖破军〗牌');
                                    'step 1'
                                    player.removeSkill('hpp_pojun2');
                                },
                                intro: {
                                    markcount: 'expansion',
                                    mark: function (dialog, storage, player) {
                                        var cards = player.getExpansions('hpp_pojun2');
                                        // var cards = player.storage.hpp_pojun_cards;
                                        if (player.isUnderControl(true)) dialog.addAuto(cards);
                                        else return '共有' + get.cnNumber(cards.length) + '张牌';
                                    },
                                },
                            },

                            //许劭
                            hpp_pingjian: {
                                getList: function () {
                                    return Object.keys(lib.characterPack.happykill).filter(function (i) {
                                        if (!lib.characterPack.happykill[i][4]) return true;
                                        return !lib.characterPack.happykill[i][4].contains('forbidai') && !lib.characterPack.happykill[i][4].contains('unseen')/*&&!lib.filter.characterDisabled(i)*/;
                                    });
                                },
                                init: function (player) {
                                    if (!player.storage.hpp_pingjian) player.storage.hpp_pingjian = [];
                                },
                                group: 'hpp_pingjian_use',
                                initList: function () {
                                    var list = [];
                                    for (var i in lib.character) {
                                        var bool = (lib.config.extension_活动武将_PingJianName || lib.skill.hpp_pingjian.getList()).contains(i);
                                        if (!bool || i.indexOf('xushao') != -1 || (i.indexOf('zuoci') != -1 && i != 'hpp_zuoci')) continue;
                                        if (!list.contains(i)) list.push(i);
                                    }
                                    game.countPlayer2(function (current) {
                                        list.remove(current.name);
                                        list.remove(current.name1);
                                        list.remove(current.name2);
                                    });
                                    _status.HppList = list;
                                },
                                audio: 'pingjian',
                                trigger: { player: ['damageEnd', 'phaseJieshuBegin'] },
                                frequent: true,
                                content: function () {
                                    'step 0'
                                    lib.skill.hpp_pingjian.initList();
                                    var list = [], skills = [], map = [];
                                    _status.HppList.randomSort();
                                    var name2 = event.triggername;
                                    for (var i = 0; i < _status.HppList.length; i++) {
                                        var name = _status.HppList[i];
                                        var skills2 = lib.character[name][3];
                                        for (var j = 0; j < skills2.length; j++) {
                                            if (player.storage.hpp_pingjian.contains(skills2[j])) continue;
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
                                                    info.dutySkill || info.groupSkill || (info.priority && typeof info.priority == 'number') || info.firstDo || info.lastDo) continue;
                                                if (info.trigger.player == name2 || Array.isArray(info.trigger.player) && info.trigger.player.contains(name2)) {
                                                    if (/*info.init||info.onChooseToUse||*/info.ai && (info.ai.combo/*||info.ai.notemp||info.ai.neg*/)) continue;
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
                                    player.storage.hpp_pingjian.add(result.control);
                                    player.addTempSkill(result.control, event.triggername == 'damageEnd' ? 'damageAfter' : 'phaseJieshu');
                                    if (trigger.name == 'damage' && (lib.translate[result.control + '_info'].indexOf('1点伤害') != -1 || lib.translate[result.control + '_info'].indexOf('一点伤害') != -1)) trigger.num = 1;
                                },
                            },
                            hpp_pingjian_use: {
                                audio: 'pingjian',
                                enable: 'phaseUse',
                                usable: 1,
                                content: function () {
                                    'step 0'
                                    lib.skill.hpp_pingjian.initList();
                                    var list = [], skills = [], map = [];
                                    _status.HppList.randomSort();
                                    for (var i = 0; i < _status.HppList.length; i++) {
                                        var name = _status.HppList[i];
                                        var skills2 = lib.character[name][3];
                                        for (var j = 0; j < skills2.length; j++) {
                                            if (player.storage.hpp_pingjian.contains(skills2[j])) continue;
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
                                                if (!info || !info.enable || info.charlotte || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill || info.groupSkill) continue;
                                                if ((info.enable == 'phaseUse' || (Array.isArray(info.enable) && info.enable.contains('phaseUse'))) ||
                                                    (info.enable == 'chooseToUse' || (Array.isArray(info.enable) && info.enable.contains('chooseToUse')))) {
                                                    if (/*info.init||info.onChooseToUse||*/info.ai && (info.ai.combo/*||info.ai.notemp||info.ai.neg*/)) continue;
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
                                                    if (info.viewAs && typeof info.viewAs != 'function') {
                                                        if (evt.filterCard && !evt.filterCard(info.viewAs, player, evt)) continue;
                                                        if (info.viewAsFilter && info.viewAsFilter(player) == false) continue;
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
                                    player.storage.hpp_pingjian.add(result.control);
                                    player.addTempSkill(result.control, 'phaseUseAfter');
                                    player.addTempSkill('hpp_pingjian_temp', 'phaseUseAfter');
                                    player.storage.hpp_pingjian_temp = result.control;
                                },
                                ai: {
                                    order: 12,
                                    result: { player: 1 },
                                },
                            },
                            hpp_pingjian_temp: {
                                charlotte: true,
                                onremove: true,
                                trigger: { player: ['useSkillBegin', 'useCard1', 'respond'] },
                                filter: function (event, player) {
                                    var skill = (event._bol_useSkillTemp ? event._bol_useSkillTemp : (event.sourceSkill || event.skill));
                                    if (!skill) return false;
                                    var info = lib.skill[skill];
                                    if (skill == player.storage.hpp_pingjian_temp) return true;
                                    if (info.sourceSkill && info.sourceSkill == player.storage.hpp_pingjian_temp) return true;
                                    if (info.group) {
                                        if (info.group == player.storage.hpp_pingjian_temp) return true;
                                        if (Array.isArray(info.group) && info.group.contains(player.storage.hpp_pingjian_temp)) return true;
                                    }
                                    var info2 = lib.skill[player.storage.hpp_pingjian_temp];
                                    if (info2.sourceSkill && info2.sourceSkill == skill) return true;
                                    if (info2.group) {
                                        if (info2.group == skill) return true;
                                        if (Array.isArray(info2.group) && info2.group.contains(skill)) return true;
                                    }
                                    return false;
                                },
                                silent: true,
                                firstDo: true,
                                content: function () {
                                    player.removeSkill(player.storage.hpp_pingjian_temp);
                                    player.removeSkill('hpp_pingjian_temp');
                                },
                            },

                            // 徐氏
                            hpp_wengua: {
                                global: 'hpp_wengua2',
                                audio: 'wengua',
                            },
                            hpp_wengua2: {
                                audio: 'wengua',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    if (player.hasSkill('hpp_wengua3')) return false;
                                    return player.countCards('he') && game.hasPlayer(function (current) {
                                        return current.hasSkill('hpp_wengua');
                                    });
                                },
                                direct: true,
                                delay: false,
                                filterCard: true,
                                discard: false,
                                lose: false,
                                position: 'he',
                                prompt: function () {
                                    var player = _status.event.player;
                                    var list = game.filterPlayer(function (current) {
                                        return current.hasSkill('hpp_wengua');
                                    });
                                    if (list.length == 1 && list[0] == player) return '将一张牌置于牌堆顶或是牌堆底';
                                    var str = '将一张牌交给' + get.translation(list);
                                    if (list.length > 1) str += '中的一人';
                                    return str;
                                },
                                check: function (card) {
                                    var list = game.filterPlayer(function (current) {
                                        return current.hasSkill('hpp_wengua');
                                    });
                                    list.sort(function (a, b) {
                                        var p = _status.event.player;
                                        return get.attitude(p, b) - get.attitude(p, a);
                                    });
                                    if (get.type2(card) == 'trick' && (list[0].isDamaged() || list[0].maxHp < 5)) return 10;
                                    if (card.name == 'sha') return 5;
                                    return 8 - get.value(card);
                                },
                                content: function () {
                                    'step 0'
                                    var targets = game.filterPlayer(function (current) {
                                        return current.hasSkill('hpp_wengua');
                                    });
                                    if (targets.length == 1) {
                                        event.target = targets[0];
                                        event.goto(2);
                                    }
                                    else if (targets.length > 0) {
                                        player.chooseTarget(true, '请选择【问卦】的目标', function (card, player, target) {
                                            return _status.event.list.contains(target);
                                        }).set('list', targets).set('ai', function (target) {
                                            var player = _status.event.player;
                                            return get.attitude(player, target);
                                        });
                                    }
                                    else event.finish();
                                    'step 1'
                                    if (result.bool && result.targets.length) {
                                        event.target = result.targets[0];
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (target) {
                                        player.logSkill('hpp_wengua', target);
                                        player.addTempSkill('hpp_wengua3', 'phaseUseAfter');
                                        event.card = cards[0];
                                        player.showCards(cards, '问卦的牌');
                                        game.delay();
                                        if (target != player) player.give(cards, target);
                                        if (get.type2(event.card) == 'trick') {
                                            if (target.maxHp < 5) target.gainMaxHp();
                                            target.recover();
                                        }
                                    }
                                    else event.finish();
                                    delete _status.noclearcountdown;
                                    game.stopCountChoose();
                                    'step 3'
                                    if (target.getCards('he').contains(event.card)) {
                                        target.chooseControlList('问卦', '将' + get.translation(event.card) + '置于牌堆顶', '将' + get.translation(event.card) + '置于牌堆底', target == player, function () {
                                            if (get.attitude(target, player) < 0) return 2;
                                            return 1;
                                        });
                                    }
                                    else event.finish();
                                    'step 4'
                                    event.index = result.index;
                                    if (event.index == 0 || event.index == 1) {
                                        var next = target.lose(event.card, ui.cardPile);
                                        if (event.index == 0) next.insert_card = true;
                                        game.broadcastAll(function (player) {
                                            var cardx = ui.create.card();
                                            cardx.classList.add('infohidden');
                                            cardx.classList.add('infoflip');
                                            player.$throw(cardx, 1000, 'nobroadcast');
                                        }, target);
                                    }
                                    else event.finish();
                                    'step 5'
                                    game.delayx();
                                    'step 6'
                                    if (event.index == 1) {
                                        game.log(target, '将获得的牌置于牌堆底');
                                        game.asyncDraw([player, target], null, null);
                                    }
                                    else {
                                        game.log(target, '将获得的牌置于牌堆顶');
                                        game.asyncDraw([player, target], null, null, true);
                                    }
                                },
                                ai: {
                                    order: 2,
                                    result: {
                                        player: function (player, target) {
                                            var target = game.findPlayer(function (current) {
                                                return current.hasSkill('hpp_wengua');
                                            });
                                            if (target) return get.attitude(player, target);
                                        },
                                    },
                                },
                            },
                            hpp_wengua3: { charlotte: true },
                            hpp_fuzhu: {
                                audio: 'fuzhu',
                                trigger: { global: 'phaseJieshuBegin' },
                                filter: function (event, player) {
                                    return event.player != player && ui.cardPile.childElementCount <= player.maxHp * 10;
                                },
                                check: function (event, player) {
                                    return get.attitude(player, event.player) < 0 && get.effect(event.player, { name: 'sha' }, player, player) > 0;
                                },
                                logTarget: 'player',
                                skillAnimation: true,
                                animationColor: 'wood',
                                onWash: function () {
                                    _status.event.getParent('hpp_fuzhu').washed = false;
                                    return 'remove';
                                },
                                content: function () {
                                    'step 0'
                                    event.washed = false;
                                    lib.onwash.push(lib.skill.hpp_fuzhu.onWash);
                                    event.total = game.players.length + game.dead.length;
                                    'step 1'
                                    event.total--;
                                    var card = get.cardPile2(function (card) {
                                        return card.name == 'sha' && player.canUse(card, trigger.player, false);
                                    });
                                    if (card) {
                                        card.remove();
                                        game.updateRoundNumber();
                                        player.useCard(card, trigger.player, false);
                                    }
                                    'step 2'
                                    if (event.total > 0 && !event.washed && ui.cardPile.childElementCount <= player.hp * 10 && trigger.player.isAlive()) event.goto(1);
                                    'step 3'
                                    lib.onwash.remove(lib.skill.hpp_fuzhu.onWash);
                                    var cards = get.cards(ui.cardPile.childElementCount + 1);
                                    for (var i = 0; i < cards.length; i++) {
                                        ui.cardPile.insertBefore(cards[i], ui.cardPile.childNodes[get.rand(ui.cardPile.childElementCount)]);
                                    }
                                    game.updateRoundNumber();
                                },
                            },

                            // 许攸
                            hpp_chenglve: {
                                enable: 'phaseUse',
                                usable: 1,
                                audio: 'nzry_chenglve',
                                content: function () {
                                    'step 0'
                                    player.draw();
                                    player.chooseToDiscard('h', true);
                                    'step 1'
                                    if (result.bool) {
                                        player.addTempSkill('hpp_chenglve_use');
                                        player.storage.hpp_chenglve_use.push(get.suit(result.cards[0], player));
                                        player.storage.hpp_chenglve_use.sort(function (a, b) {
                                            return lib.suit.indexOf(b) - lib.suit.indexOf(a);
                                        });
                                        if (game.HasExtension('十周年UI')) {
                                            game.broadcastAll(function (player) {
                                                var str = '成略';
                                                for (var suit of player.getStorage('hpp_chenglve_use')) str += get.translation(suit);
                                                if (player.marks.hpp_chenglve_use) player.marks.hpp_chenglve_use.firstChild.innerHTML = str;
                                            }, player);
                                        }
                                    }
                                },
                                ai: {
                                    order: 10,
                                    result: { player: 1 },
                                },
                                subSkill: {
                                    use: {
                                        init: function (player) {
                                            if (!player.storage.hpp_chenglve_use) player.storage.hpp_chenglve_use = [];
                                        },
                                        charlotte: true,
                                        onremove: true,
                                        mark: true,
                                        intro: {
                                            markcount: () => undefined,
                                            content: '使用$花色的牌无距离和次数限制',
                                        },
                                        mod: {
                                            cardUsable: function (card, player) {
                                                var suits = player.storage.hpp_chenglve_use;
                                                if (suits.contains(get.suit(card))) return Infinity;
                                            },
                                            targetInRange: function (card, player) {
                                                var suits = player.storage.hpp_chenglve_use;
                                                if (suits.contains(get.suit(card))) return true;
                                            },
                                        },
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
                                trigger: { player: 'phaseEnd' },
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

                            // 颜良文丑
                            hpp_shuangxiong: {
                                audio: 'shuangxiong',
                                trigger: { player: 'phaseDrawBegin1' },
                                group: 'hpp_shuangxiong2',
                                filter: function (event, player) {
                                    return !event.numFixed;
                                },
                                content: function () {
                                    'step 0'
                                    trigger.changeToZero();
                                    event.cards = get.cards(3);
                                    event.videoId = lib.status.videoId++;
                                    game.broadcastAll(function (player, id, cards) {
                                        var str;
                                        if (player == game.me && !_status.auto) str = '【双雄】选择获得其中一种颜色的牌';
                                        else str = '双雄';
                                        var dialog = ui.create.dialog(str, cards);
                                        dialog.videoId = id;
                                    }, player, event.videoId, event.cards);
                                    event.time = get.utc();
                                    game.addVideo('showCards', player, ['双雄', get.cardsInfo(event.cards)]);
                                    game.addVideo('delay', null, 2);
                                    'step 1'
                                    var next = player.chooseControl('红色', '黑色');
                                    //next.set('dialog',event.videoId);
                                    next.set('ai', function () {
                                        var player = _status.event.player;
                                        var n1 = 0, n2 = 0;
                                        for (var i of event.cards) {
                                            if (get.color(i, player) == 'red') n1++;
                                            else n2++;
                                        }
                                        if (n1 >= n2) return '红色';
                                        return '黑色';
                                    });
                                    'step 2'
                                    game.broadcastAll('closeDialog', event.videoId);
                                    event.cardsx = [];
                                    var color = (result.control == '红色' ? 'red' : 'black');
                                    for (var j of event.cards) {
                                        if (color == get.color(j)) event.cardsx.push(j);
                                        else game.cardsDiscard(j);
                                    }
                                    var time = 1000 - (get.utc() - event.time);
                                    if (time > 0) game.delay(0, time);
                                    'step 3'
                                    player.gain(event.cardsx, 'gain2', 'log');
                                    player.addTempSkill('shuangxiong2');
                                    player.storage.shuangxiong = get.color(event.cardsx[0]);
                                },
                            },
                            hpp_shuangxiong2: {
                                trigger: { player: 'damageEnd' },
                                direct: true,
                                usable: 3,
                                filter: function (event, player) {
                                    var evt = event.getParent();
                                    return (evt && evt.name == 'juedou' && evt[player == evt.player ? 'targetCards' : 'playerCards'].length) > 0;
                                },
                                content: function () {
                                    'step 0'
                                    var evt = trigger.getParent();
                                    var cards = evt[player == evt.player ? 'targetCards' : 'playerCards'].slice(0);
                                    for (var i = 0; i < cards.length; i++) {
                                        if (get.position(cards[i]) != 'd') cards.remove(cards[i--]);
                                    }
                                    if (!cards.length) event.finish();
                                    else {
                                        event.cards = cards;
                                        player.chooseBool(get.prompt('hpp_shuangxiong'), '获得' + get.translation(event.cards)).ai = function () {
                                            return true;
                                        };
                                    }
                                    'step 1'
                                    if (result.bool) {
                                        var skill = ['hpp_shuangxiong', 'shuangxiong2'].randomGet();
                                        player.logSkill(skill);
                                        player.gain(cards, 'gain2', 'log');
                                    }
                                    else player.storage.counttrigger.hpp_shuangxiong2--;
                                },
                            },

                            // 严颜
                            hpp_juzhan: {
                                group: 'hpp_juzhan_gain',
                                audio: 'nzry_juzhan_1',
                                trigger: { target: 'useCardToTargeted' },
                                prompt2: '当你成为其他角色【杀】的目标后，你可以与其各摸一张牌，然后其本回合内不能再对你使用牌。',
                                filter: function (event, player) {
                                    return event.card.name == 'sha';
                                },
                                logTarget: 'player',
                                content: function () {
                                    'step 0'
                                    game.asyncDraw([player, trigger.player]);
                                    trigger.player.addTempSkill('hpp_juzhan_use1');
                                    trigger.player.storage.hpp_juzhan_use1.push(player);
                                    'step 1'
                                    game.delayx();
                                },
                                subSkill: {
                                    gain: {
                                        audio: 'nzry_juzhan_1',
                                        trigger: { player: 'useCardToPlayered' },
                                        prompt2: '当你使用【杀】指定一名角色为目标后，你可以获得其一张牌，然后你本回合内不能再对其使用红色【杀】',
                                        filter: function (event, player) {
                                            return event.card.name == 'sha' && event.target.countGainableCards(player, 'he');
                                        },
                                        check: function (event, player) {
                                            return get.effect(event.target, { name: 'guohe_copy2' }, player, player) > 0;
                                        },
                                        logTarget: 'target',
                                        content: function () {
                                            player.gainPlayerCard(trigger.target, 'he', true);
                                            player.addTempSkill('hpp_juzhan_use2');
                                            player.storage.hpp_juzhan_use2.push(trigger.target);
                                        },
                                    },
                                    use1: {
                                        charlotte: true,
                                        onremove: true,
                                        init: function (player) {
                                            if (!player.storage.hpp_juzhan_use1) player.storage.hpp_juzhan_use1 = [];
                                        },
                                        mark: true,
                                        marktext: '拒',
                                        intro: { content: '不能对$使用牌' },
                                        mod: {
                                            playerEnabled: function (card, player, target) {
                                                if (player.storage.hpp_juzhan_use1.contains(target)) return false;
                                            },
                                        },
                                    },
                                    use2: {
                                        charlotte: true,
                                        onremove: true,
                                        init: function (player) {
                                            if (!player.storage.hpp_juzhan_use2) player.storage.hpp_juzhan_use2 = [];
                                        },
                                        mark: true,
                                        marktext: '战',
                                        intro: { content: '不能对$使用红色【杀】' },
                                        mod: {
                                            playerEnabled: function (card, player, target) {
                                                if (player.storage.hpp_juzhan_use2.contains(target) && get.name(card) == 'sha' && get.color(card) == 'red') return false;
                                            },
                                        },
                                    },
                                },
                            },

                            // 袁绍
                            hpp_luanji: {
                                audio: 'reluanji',
                                enable: 'phaseUse',
                                viewAs: { name: 'wanjian' },
                                filterCard: function (card, player) {
                                    if (!player.storage.hpp_luanji) return true;
                                    return !player.storage.hpp_luanji.contains(get.suit(card));
                                },
                                position: 'hs',
                                selectCard: 2,
                                check: function (card) {
                                    var player = _status.event.player;
                                    var targets = game.filterPlayer(function (current) {
                                        return player.canUse('wanjian', current);
                                    });
                                    var num = 0;
                                    for (var i = 0; i < targets.length; i++) {
                                        var eff = get.sgn(get.effect(targets[i], { name: 'wanjian' }, player, player));
                                        if (targets[i].hp == 1) {
                                            eff *= 1.5;
                                        }
                                        num += eff;
                                    }
                                    if (!player.needsToDiscard(-1)) {
                                        if (targets.length >= 7) {
                                            if (num < 2) return 0;
                                        }
                                        else if (targets.length >= 5) {
                                            if (num < 1.5) return 0;
                                        }
                                    }
                                    return 6 - get.value(card);
                                },
                                ai: {
                                    basic: {
                                        order: 8.9
                                    }
                                },
                                group: ['hpp_luanji_count', 'hpp_luanji_reset', 'hpp_luanji_damage', 'hpp_luanji_draw'],
                                subSkill: {
                                    reset: {
                                        trigger: { player: 'phaseAfter' },
                                        silent: true,
                                        content: function () {
                                            delete player.storage.hpp_luanji;
                                            delete player.storage.hpp_luanji2;
                                        }
                                    },
                                    count: {
                                        trigger: { player: 'useCard' },
                                        silent: true,
                                        filter: function (event) {
                                            return event.skill == 'hpp_luanji';
                                        },
                                        content: function () {
                                            player.storage.hpp_luanji2 = trigger.card;
                                            if (!player.storage.hpp_luanji) {
                                                player.storage.hpp_luanji = [];
                                            }
                                            for (var i = 0; i < trigger.cards.length; i++) {
                                                player.storage.hpp_luanji.add(get.suit(trigger.cards[i]));
                                            }
                                        }
                                    },
                                    damage: {
                                        trigger: { source: 'damage' },
                                        forced: true,
                                        silent: true,
                                        popup: false,
                                        filter: function (event, player) {
                                            return player.storage.hpp_luanji2 && event.card == player.storage.hpp_luanji2;
                                        },
                                        content: function () {
                                            delete player.storage.hpp_luanji2;
                                        },
                                    },
                                    wanjianDamage: {
                                        trigger: { source: 'damage' },
                                        forced: true,
                                        silent: true,
                                        popup: false,
                                        filter: function (event, player) {
                                            return event.card.name == 'wanjian' && player.storage.hpp_luanji2 == undefined;
                                        },
                                        content: function () {
                                            player.storage.hpp_luanji3 = true;
                                        },
                                    },
                                    draw: {
                                        trigger: { player: 'useCardAfter' },
                                        forced: true,
                                        silent: true,
                                        popup: false,
                                        filter: function (event, player) {
                                            return (player.storage.hpp_luanji2 && event.card == player.storage.hpp_luanji2) || player.storage.hpp_luanji3;
                                        },
                                        content: function () {
                                            player.draw(trigger.targets.length);
                                            delete player.storage.hpp_luanji2;
                                            player.storage.hpp_luanji3 = false;
                                        },
                                    },
                                }
                            },
                            hpp_xueyi: {
                                audio: 'xueyi',
                                trigger: { global: 'phaseBefore' },
                                forced: true,
                                zhuSkill: true,
                                unique: true,
                                filter: function (event, player) {
                                    return !player.storage.hpp_xueyi_inited && player.hasZhuSkill('hpp_xueyi');
                                },
                                content: function () {
                                    player.storage.hpp_xueyi_inited = true;
                                    var num = game.countPlayer(function (current) {
                                        return current.group == 'qun';
                                    });
                                    if (num) player.addMark('hpp_xueyi', num);
                                },
                                marktext: '裔',
                                intro: {
                                    name2: '裔',
                                    content: 'mark',
                                },
                                mod: {
                                    maxHandcard: function (player, num) {
                                        if (player.hasZhuSkill('hpp_xueyi')) return num + (player.countMark('hpp_xueyi') * 2);
                                    },
                                },
                                group: 'hpp_xueyi_draw',
                                subSkill: {
                                    draw: {
                                        audio: 'xueyi',
                                        enable: 'chooseToUse',
                                        filter: function (event, player) {
                                            if (!player.hasZhuSkill('hpp_xueyi') || !player.hasMark('hpp_xueyi')) return false;
                                            if (event.type == 'dying') {
                                                if (player != event.dying) return false;
                                                return true;
                                            }
                                            else if (event.parent.name == 'phaseUse') {
                                                return true;
                                            }
                                            return false;
                                        },
                                        content: function () {
                                            player.removeMark('hpp_xueyi', 1);
                                            player.recover();
                                            player.draw();
                                        },
                                        ai: {
                                            order: 7,
                                            save: true,
                                            skillTagFilter: function (player, tag, target) {
                                                if (player != target || !player.hasZhuSkill('hpp_xueyi') || !player.hasMark('hpp_xueyi')) return false;
                                            },
                                            result: {
                                                player: function (player) {
                                                    return player.isDamaged() ? 1 : -1;
                                                },
                                            },
                                        },
                                    }
                                },
                            },
                            /*hpp_xueyi_draw: {
                                audio: 'xueyi',
                                enable: 'chooseToUse',
                                filter: function (event, player) {
                                    if (!player.hasZhuSkill('hpp_xueyi') || !player.hasMark('hpp_xueyi')) return false;
                                    if (event.type == 'dying') {
                                        if (player != event.dying) return false;
                                        return true;
                                    }
                                    else if (event.parent.name == 'phaseUse') {
                                        game.log('phaseUse***')
                                        return true;
                                    }
                                    return false;
                                },
                                content: function () {
                                    player.removeMark('hpp_xueyi', 1);
                                    player.recover();
                                    player.draw();
                                },
                                ai: {
                                    order: 7,
                                    save: true,
                                    skillTagFilter: function (player, tag, target) {
                                        if (player != target || !player.hasZhuSkill('hpp_xueyi') || !player.hasMark('hpp_xueyi')) return false;
                                    },
                                    result: {
                                        player: function (player) {
                                            return player.isDamaged() ? 1 : -1;
                                        },
                                    },
                                },
                            },*/

                            // 袁术
                            hpp_weidi: {
                                audio: 'weidi',
                                preHidden: true,
                                trigger: { player: 'phaseDiscardEnd' },
                                filter: function (event, player) {
                                    var cards = [];
                                    game.getGlobalHistory('cardMove', function (evt) {
                                        if (evt.name == 'cardsDiscard' && evt.getParent('phaseDiscard') == event) cards.addArray(evt.cards.filterInD('d'));
                                    });
                                    game.countPlayer2(function (current) {
                                        current.getHistory('lose', function (evt) {
                                            if (evt.type != 'discard' || evt.getParent('phaseDiscard') != event) return;
                                            cards.addArray(evt.cards.filterInD('d'));
                                        })
                                    });
                                    return cards.length;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var cards = [];
                                    game.getGlobalHistory('cardMove', function (evt) {
                                        if (evt.name == 'cardsDiscard' && evt.getParent('phaseDiscard') == trigger) cards.addArray(evt.cards.filterInD('d'));
                                    });
                                    game.countPlayer2(function (current) {
                                        current.getHistory('lose', function (evt) {
                                            if (evt.type != 'discard' || evt.getParent('phaseDiscard') != trigger) return;
                                            cards.addArray(evt.cards.filterInD('d'));
                                        })
                                    });
                                    player.chooseCardButton(cards, '伪帝：是否将一张牌交给一名其他角色？').set('ai', function (button) {
                                        var player = _status.event.player;
                                        if (game.hasPlayer(function (current) {
                                            return current != player && get.attitude(player, current) > 0;
                                        })) return get.value(button.link);
                                        return 0;
                                    }).set('cards', cards).set('filterButton', function (button) {
                                        return _status.event.cards.contains(button.link);
                                    }).setHiddenSkill('hpp_weidi');
                                    'step 1'
                                    if (result.bool) {
                                        event.card = result.links[0];
                                        player.chooseTarget('将' + get.translation(event.card) + '交给一名其他角色', lib.filter.notMe, true).set('ai', function (target) {
                                            var player = _status.event.player;
                                            return get.attitude(player, target) * get.value(event.card, target) * (target.hasSkillTag('nogain') ? 0.1 : 1);
                                        });
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.logSkill('hpp_weidi', target);
                                        target.gain(card, 'gain2');
                                    }
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

                            // 于禁
                            hpp_yizhong: {
                                audio: 'yizhong',
                                trigger: { target: 'shaBefore' },
                                filter: function (event, player) {
                                    if (player.getEquip(2)) return false;
                                    return event.card.name == 'sha' && get.suit(event.card) == 'club';
                                },
                                forced: true,
                                content: function () {
                                    trigger.cancel();
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (player == target && get.subtype(card) == 'equip2') {
                                                if (get.equipValue(card) <= 5.5) return 0;
                                            }
                                            if (target.getEquip(2)) return;
                                            if (card.name == 'sha' && get.suit(card) == 'club') return 'zerotarget';
                                        },
                                    },
                                },
                            },

                            // 张春华
                            hpp_jueqing: {
                                trigger: { source: 'damageBefore' },
                                forced: true,
                                audio: 'jueqing',
                                check: function () { return false; },
                                content: function () {
                                    trigger.cancel();
                                    trigger.player.loseHp(trigger.num);
                                },
                                ai: {
                                    jueqing: true
                                }
                            },
                            hpp_shangshi: {
                                audio: 'shangshi',
                                trigger: {
                                    player: ['loseAfter', 'changeHp', 'gainMaxHpAfter', 'loseMaxHpAfter', 'enterGame'],
                                    global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter', 'phaseBefore'],
                                },
                                filter: function (event, player) {
                                    return player.countCards('h') < Math.max(player.getDamagedHp(), 1) && (event.name != 'phase' || game.phaseNumber == 0);
                                },
                                prompt2: function (event, player) {
                                    return '将手牌摸至' + get.cnNumber(Math.max(player.getDamagedHp(), 1)) + '张';
                                },
                                frequent: true,
                                content: function () {
                                    player.draw(Math.max(player.getDamagedHp(), 1) - player.countCards('h'));
                                },
                                ai: {
                                    noh: true,
                                    skillTagFilter: function (player, tag) {
                                        if (tag == 'noh' && Math.max(player.getDamagedHp(), 1) < player.countCards('h')) return false;
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

                            // 张郃
                            hpp_qiaobian: {
                                audio: 'qiaobian',
                                group: ['hpp_qiaobian1', 'qiaobian2', 'qiaobian3', 'hpp_qiaobian4'],
                                trigger: { player: 'phaseEnd' },
                                filter: function (event, player) {
                                    return player.getHistory('skipped').length >= 3;
                                },
                                forced: true,
                                locked: false,
                                content: function () {
                                    player.draw(2);
                                },
                            },
                            hpp_qiaobian1: {
                                trigger: { player: 'phaseJudgeBefore' },
                                filter: function (event, player) {
                                    return player.countCards('h');
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseToDiscard(get.prompt('hpp_qiaobian'), '弃置一张手牌并跳过判定阶段').set('ai', function (card) {
                                        var player = _status.event.player, list = player.getHistory('skipped'), num = list.length + 1;
                                        if (player.countCards('j')) return 10 - get.useful(card);
                                        if (num >= 3) return -1;
                                        if (player.countCards('h') > 1) {
                                            if (!list.contains('phaseDraw')) {
                                                var check1 = function () {
                                                    var i, num = 0, num2 = 0, players = game.filterPlayer();
                                                    for (i = 0; i < players.length; i++) {
                                                        if (player != players[i] && players[i].countCards('h')) {
                                                            var att = get.attitude(player, players[i]);
                                                            if (att <= 0) num++;
                                                            if (att < 0) num2++;
                                                        }
                                                    }
                                                    return num >= 2 && num2 > 0;
                                                };
                                                if (check1()) num++;
                                            }
                                            if (!list.contains('phaseUse')) {
                                                var check;
                                                if (!player.canMoveCard(true)) check = false;
                                                else {
                                                    check = game.hasPlayer(function (current) {
                                                        return get.attitude(player, current) > 0 && current.countCards('j');
                                                    });
                                                    if (!check) {
                                                        if (player.countCards('h') > player.hp + 1) check = false;
                                                        else if (player.countCards('h', { name: ['wuzhong'] })) check = false;
                                                        else check = true;
                                                    }
                                                }
                                                if (check) num++;
                                            }
                                            if (num == 2 && !list.contains('phaseDiscard')) num++;
                                        }
                                        if (num == 3) return 10 - get.useful(card);
                                        return -1;
                                    }).set('logSkill', 'hpp_qiaobian').setHiddenSkill('hpp_qiaobian');
                                    'step 1'
                                    if (result.bool) trigger.cancel();
                                },
                            },
                            hpp_qiaobian4: {
                                trigger: { player: 'phaseDiscardBefore' },
                                filter: function (event, player) {
                                    return player.countCards('h');
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var next = player.chooseToDiscard(get.prompt('hpp_qiaobian'), '弃置一张手牌并跳过弃牌阶段').set('ai', function (card) {
                                        if (discard) return 100 - get.useful(card);
                                        return -1;
                                    }).set('logSkill', 'hpp_qiaobian').setHiddenSkill('hpp_qiaobian').set('bool', player.needsToDiscard() || player.getHistory('skipped').length == 2);
                                    'step 1'
                                    if (result.bool) trigger.cancel();
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
                                trigger: { player: ['useCard', 'respond'] },
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
                                        target.damage('thunder');
                                        player.recover();
                                    }
                                    else if (result.suit == 'spade') target.damage(2, 'thunder');
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
                                check: function (event, player) {
                                    /*
                                    if(get.attitude(player,event.player)<3) return false;
                                    if(event.player.getStat('damage')) return true;
                                    if(player.maxHp-player.hp>=2) return false;
                                    return true;
                                    */
                                    return get.attitude(player, event.player) > 0;
                                },
                                logTarget: 'player',
                                content: function () {
                                    'step 0'
                                    player.draw(2);
                                    player.addTempSkill('hpp_xiantu2', 'phaseUseAfter');
                                    'step 1'
                                    player.chooseCard(2, 'he', true, '交给' + get.translation(trigger.player) + '两张牌').set('ai', function (card) {
                                        if (ui.selected.cards.length && card.name == ui.selected.cards[0].name) return -1;
                                        if (get.tag(card, 'damage')) return 1;
                                        if (get.type(card) == 'equip') return 1;
                                        return 0;
                                    });
                                    'step 2'
                                    trigger.player.gain(result.cards, player, 'giveAuto');
                                },
                                ai: {
                                    expose: 0.3,
                                    threaten: 3,
                                },
                            },
                            hpp_xiantu2: {
                                charlotte: true,
                                audio: 'xiantu2',
                                trigger: { global: 'phaseUseEnd' },
                                filter: function (event, player) {
                                    return !event.player.getHistory('sourceDamage', function (evt) {
                                        return evt.getParent(4) == event;
                                    }).length;
                                },
                                forced: true,
                                content: function () {
                                    player.loseHp();
                                },
                            },

                            // 张星彩
                            hpp_qiangwu: {
                                audio: 'qiangwu',
                                enable: 'phaseUse',
                                usable: 1,
                                content: function () {
                                    'step 0'
                                    player.judge();
                                    'step 1'
                                    if (get.position(result.card, true) == 'd') player.gain(result.card, 'gain2');
                                    player.storage.qiangwu = result.number;
                                    player.addTempSkill('qiangwu3', 'phaseUseAfter');
                                },
                                ai: {
                                    order: 11,
                                    result: { player: 1 },
                                },
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

                            // 赵襄
                            hpp_fanghun: {
                                audio: 'fanghun',
                                mod: {
                                    aiValue: function (player, card, num) {
                                        if (card.name != 'sha' && card.name != 'shan') return;
                                        var geti = function () {
                                            var cards = player.getCards('hs', function (card) {
                                                return card.name == 'sha' || card.name == 'shan';
                                            });
                                            if (cards.contains(card)) {
                                                return cards.indexOf(card);
                                            }
                                            return cards.length;
                                        };
                                        return Math.max(num, [7, 5, 5, 3][Math.min(geti(), 3)]);
                                    },
                                },
                                frequent: true,
                                trigger: {
                                    player: 'useCard',
                                    target: 'useCardToTargeted',
                                },
                                filter: function (event) {
                                    return event.card && event.card.name == 'sha';
                                },
                                content: function () {
                                    player.addMark('fanghun', trigger.num || 1);
                                    player.addMark('fanghun2', trigger.num || 1, false);
                                },
                                group: ['hpp_fanghun_sha', 'hpp_fanghun_draw'],
                                subSkill: {
                                    draw: {
                                        trigger: { player: ['useCardAfter', 'respondAfter'] },
                                        forced: true,
                                        popup: false,
                                        filter: function (event) {
                                            return event.skill == 'fanghun_sha' || event.skill == 'fanghun_shan';
                                        },
                                        content: function () {
                                            player.draw();
                                        }
                                    },
                                    sha: {
                                        audio: 'fanghun',
                                        enable: ['chooseToUse', 'chooseToRespond'],
                                        prompt: '弃置一枚【梅影】标记，将杀当做闪，或将闪当做杀',
                                        viewAs: function (cards, player) {
                                            var name = false;
                                            switch (get.name(cards[0], player)) {
                                                case 'sha': name = 'shan'; break;
                                                case 'shan': name = 'sha'; break;
                                            }
                                            if (name) return { name: name };
                                            return null;
                                        },
                                        position: 'hs',
                                        check: function (card) {
                                            var player = _status.event.player;
                                            if (_status.event.type == 'phase') {
                                                var max = 0;
                                                var name2;
                                                var list = ['sha'];
                                                var map = { sha: 'shan' }
                                                for (var i = 0; i < list.length; i++) {
                                                    var name = list[i];
                                                    if (player.countCards('hs', map[name]) > 0 && player.getUseValue({ name: name }) > 0) {
                                                        var temp = get.order({ name: name });
                                                        if (temp > max) {
                                                            max = temp;
                                                            name2 = map[name];
                                                        }
                                                    }
                                                }
                                                if (name2 == get.name(card, player)) return 1;
                                                return 0;
                                            }
                                            return 1;
                                        },
                                        filterCard: function (card, player, event) {
                                            event = event || _status.event;
                                            var filter = event._backup.filterCard;
                                            var name = get.name(card, player);
                                            if (name == 'sha' && filter({ name: 'shan', cards: [card] }, player, event)) return true;
                                            if (name == 'shan' && filter({ name: 'sha', cards: [card] }, player, event)) return true;
                                            return false;
                                        },
                                        filter: function (event, player) {
                                            if (!player.storage.fanghun || player.storage.fanghun <= 0) return false;
                                            var filter = event.filterCard;
                                            if (filter({ name: 'sha' }, player, event) && player.countCards('hs', 'shan')) return true;
                                            if (filter({ name: 'shan' }, player, event) && player.countCards('hs', 'sha')) return true;
                                            return false;
                                        },
                                        onrespond: function () { return this.onuse.apply(this, arguments) },
                                        onuse: function (result, player) {
                                            player.removeMark('fanghun', 1);
                                        },
                                        ai: {
                                            respondSha: true,
                                            respondShan: true,
                                            skillTagFilter: function (player, tag) {
                                                if (!player.storage.fanghun || player.storage.fanghun < 0) return false;
                                                var name;
                                                switch (tag) {
                                                    case 'respondSha': name = 'shan'; break;
                                                    case 'respondShan': name = 'sha'; break;
                                                }
                                                if (!player.countCards('hs', name)) return false;
                                            },
                                            order: function (item, player) {
                                                if (player && _status.event.type == 'phase') {
                                                    var max = 0;
                                                    var list = ['sha'];
                                                    var map = { sha: 'shan' }
                                                    for (var i = 0; i < list.length; i++) {
                                                        var name = list[i];
                                                        if (player.countCards('hs', map[name]) > 0 && player.getUseValue({ name: name }) > 0) {
                                                            var temp = get.order({ name: name });
                                                            if (temp > max) max = temp;
                                                        }
                                                    }
                                                    if (max > 0) max += ((player.storage.refuhan || player.storage.twfuhan) ? 0.3 : -0.3);
                                                    return max;
                                                }
                                                if (!player) player = _status.event.player;
                                                return (player.storage.refuhan || player.storage.twfuhan) ? 4 : 1;
                                            },
                                        },
                                    },
                                }
                            },
                            hpp_fuhan: {
                                inherit: 'refuhan',
                                content: function () {
                                    'step 0'
                                    if (player.storage.fanghun) player.draw(player.storage.fanghun);
                                    player.removeMark('fanghun', player.storage.fanghun);
                                    player.awakenSkill('hpp_fuhan');
                                    'step 1'
                                    var list = [];
                                    for (var i in lib.character) {
                                        if (!(lib.skill.hpp_pingjian.getList()).contains(i)) continue;
                                        if (lib.character[i][1] == 'shu') list.push(i);
                                    }
                                    game.countPlayer2(function (current) {
                                        list.remove(current.name);
                                        list.remove(current.name1);
                                        list.remove(current.name2);
                                    });
                                    var players = game.players.concat(game.dead);
                                    for (var i = 0; i < players.length; i++) {
                                        list.remove(players[i].name);
                                        list.remove(players[i].name1);
                                        list.remove(players[i].name2);
                                    }
                                    list = list.randomGets(Math.max(4, game.countPlayer()));
                                    var skills = [];
                                    for (var i of list) {
                                        skills.addArray((lib.character[i][3] || []).filter(function (skill) {
                                            var info = get.info(skill);
                                            return info && !info.zhuSkill && !info.limited && !info.juexingji && !info.hiddenSkill && !info.charlotte && !info.dutySkill;
                                        }));
                                    }
                                    if (!list.length || !skills.length) { event.finish(); return; }
                                    if (player.isUnderControl()) {
                                        game.swapPlayerAuto(player);
                                    }
                                    var switchToAuto = function () {
                                        _status.imchoosing = false;
                                        event._result = {
                                            bool: true,
                                            skills: skills.randomGets(2),
                                        };
                                        if (event.dialog) event.dialog.close();
                                        if (event.control) event.control.close();
                                    };
                                    var chooseButton = function (list, skills) {
                                        var event = _status.event;
                                        if (!event._result) event._result = {};
                                        event._result.skills = [];
                                        var rSkill = event._result.skills;
                                        var dialog = ui.create.dialog('请选择获得至多两个技能', [list, 'character'], 'hidden');
                                        event.dialog = dialog;
                                        var table = document.createElement('div');
                                        table.classList.add('add-setting');
                                        table.style.margin = '0';
                                        table.style.width = '100%';
                                        table.style.position = 'relative';
                                        for (var i = 0; i < skills.length; i++) {
                                            var td = ui.create.div('.shadowed.reduce_radius.pointerdiv.tdnode');
                                            td.link = skills[i];
                                            table.appendChild(td);
                                            td.innerHTML = '<span>' + get.translation(skills[i]) + '</span>';
                                            td.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function () {
                                                if (_status.dragged) return;
                                                if (_status.justdragged) return;
                                                _status.tempNoButton = true;
                                                setTimeout(function () {
                                                    _status.tempNoButton = false;
                                                }, 500);
                                                var link = this.link;
                                                if (!this.classList.contains('bluebg')) {
                                                    if (rSkill.length >= 2) return;
                                                    rSkill.add(link);
                                                    this.classList.add('bluebg');
                                                }
                                                else {
                                                    this.classList.remove('bluebg');
                                                    rSkill.remove(link);
                                                }
                                            });
                                        }
                                        dialog.content.appendChild(table);
                                        dialog.add('　　');
                                        dialog.open();

                                        event.switchToAuto = function () {
                                            event.dialog.close();
                                            event.control.close();
                                            game.resume();
                                            _status.imchoosing = false;
                                        };
                                        event.control = ui.create.control('ok', function (link) {
                                            event.dialog.close();
                                            event.control.close();
                                            game.resume();
                                            _status.imchoosing = false;
                                        });
                                        for (var i = 0; i < event.dialog.buttons.length; i++) {
                                            event.dialog.buttons[i].classList.add('selectable');
                                        }
                                        game.pause();
                                        game.countChoose();
                                    };
                                    if (event.isMine()) {
                                        chooseButton(list, skills);
                                    }
                                    else if (event.isOnline()) {
                                        event.player.send(chooseButton, list, skills);
                                        event.player.wait();
                                        game.pause();
                                    }
                                    else {
                                        switchToAuto();
                                    }
                                    'step 2'
                                    var map = event.result || result;
                                    if (map && map.skills && map.skills.length) {
                                        for (var i of map.skills) player.addSkillLog(i);
                                    }
                                    game.broadcastAll(function (list) {
                                        game.expandSkills(list);
                                        for (var i of list) {
                                            var info = lib.skill[i];
                                            if (!info) continue;
                                            if (!info.audioname2) info.audioname2 = {};
                                            info.audioname2.old_yuanshu = 'weidi';
                                        }
                                    }, map.skills);
                                    'step 3'
                                    if (player.isMinHp()) player.recover();
                                },
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

                            // 钟会
                            hpp_quanji: {
                                group: 'hpp_quanji_phase',
                                audio: 'requanji',
                                trigger: { player: 'damageEnd' },
                                filter: function (event, player) {
                                    return event.num > 0;
                                },
                                frequent: true,
                                prompt2: '摸两张牌',
                                content: function () {
                                    'step 0'
                                    event.count = trigger.num;
                                    'step 1'
                                    event.count--;
                                    player.draw(2);
                                    'step 2'
                                    if (event.count > 0) player.chooseBool(get.prompt('hpp_quanji'), '摸两张牌').set('frequentSkill', 'hpp_quanji');
                                    else event.finish();
                                    'step 3'
                                    if (result.bool) {
                                        player.logSkill('hpp_quanji');
                                        event.goto(1);
                                    }
                                },
                                onremove: function (player, skill) {
                                    var cards = player.getExpansions('quanji');
                                    if (cards.length) player.loseToDiscardpile(cards);
                                },
                                mod: {
                                    maxHandcard: function (player, num) {
                                        return num + Math.min(5, player.getExpansions('quanji').length);
                                    },
                                },
                                subSkill: {
                                    phase: {
                                        audio: 'requanji',
                                        enable: 'phaseUse',
                                        filter: function (event, player) {
                                            return player.countCards('h');
                                        },
                                        prompt: '将任意张手牌置于武将牌上',
                                        selectCard: [1, Infinity],
                                        filterCard: true,
                                        delay: 0,
                                        discard: false,
                                        lose: false,
                                        delay: false,
                                        check: function (card) {
                                            var player = _status.event.player, num = player.needsToDiscard();
                                            if (!player.getExpansions('quanji').length || num - ui.selected.cards.length - Math.min(5, player.getExpansions('quanji').length + ui.selected.cards.length) > 0) return 5 - get.value(card);
                                            return -1;
                                        },
                                        content: function () {
                                            player.addToExpansion(cards, player, 'give').gaintag.add('quanji');
                                        },
                                        ai: {
                                            order: 5,
                                            result: { player: 1 },
                                        },
                                    },
                                },
                            },
                            hpp_paiyi: {
                                enable: 'phaseUse',
                                usable: 1,
                                audio: 'xinpaiyi',
                                audioname: ['re_zhonghui'],
                                filter: function (event, player) {
                                    return player.getExpansions('quanji').length > 0;
                                },
                                chooseButton: {
                                    dialog: function (event, player) {
                                        return ui.create.dialog('排异', player.getExpansions('quanji'), 'hidden')
                                    },
                                    backup: function (links, player) {
                                        return {
                                            audio: 'xinpaiyi',
                                            audioname: ['re_zhonghui'],
                                            filterTarget: true,
                                            filterCard: function () { return false },
                                            selectCard: -1,
                                            card: links[0],
                                            delay: false,
                                            content: lib.skill.hpp_paiyi.contentx,
                                            ai: {
                                                order: 10,
                                                result: {
                                                    target: function (player, target) {
                                                        if (player != target) return 0;
                                                        if (player.hasSkill('requanji') || (player.countCards('h') + 2 <= player.hp + player.getExpansions('quanji').length)) return 1;
                                                        return 0;
                                                    }
                                                },
                                            },
                                        }
                                    },
                                    prompt: function () { return '请选择〖排异〗的目标' },
                                },
                                contentx: function () {
                                    "step 0"
                                    var card = lib.skill.hpp_paiyi_backup.card;
                                    player.loseToDiscardpile(card);
                                    "step 1"
                                    target.draw(2);
                                    "step 2"
                                    if (target.countCards('h') > player.countCards('h')) {
                                        target.damage();
                                    }
                                },
                                ai: {
                                    order: 1,
                                    combo: 'quanji',
                                    result: {
                                        player: 1,
                                    }
                                }
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

                            // 诸葛果
                            hpp_qirang: {
                                group: 'hpp_qirang_gain',
                                subfrequent: ['gain'],
                                audio: 'qirang',
                                trigger: { player: 'useCard2' },
                                filter: function (event, player) {
                                    if (get.type(event.card) != 'trick') return false;
                                    if (!event.targets || event.targets.length != 1) return false;
                                    var info = get.info(event.card);
                                    if (info.allowMultiple == false) return false;
                                    if (event.targets && !info.multitarget) {
                                        if (game.hasPlayer(function (current) {
                                            return !event.targets.contains(current) && lib.filter.targetEnabled2(event.card, player, current) && lib.filter.targetInRange(event.card, player, current);
                                        })) return true;
                                    }
                                    return false;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_qirang'), '为' + get.translation(trigger.card) + '增加一个目标', function (card, player, target) {
                                        var player = _status.event.player;
                                        return lib.filter.targetEnabled2(_status.event.card, player, target) && lib.filter.targetInRange(_status.event.card, player, target);
                                    }).set('ai', function (target) {
                                        var trigger = _status.event.getTrigger();
                                        var player = _status.event.player;
                                        return get.effect(target, trigger.card, player, player) * (_status.event.targets.contains(target) ? -1 : 1);
                                    }).set('targets', trigger.targets).set('card', trigger.card);
                                    'step 1'
                                    if (result.bool) {
                                        if (!event.isMine() && !event.isOnline()) game.delayx();
                                        event.targets = result.targets;
                                    }
                                    else event.finish();
                                    'step 2'
                                    if (targets) {
                                        player.logSkill('hpp_qirang', targets);
                                        trigger.targets.addArray(targets);
                                    }
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (get.type(card) == 'equip' && !get.cardtag(card, 'gifts')) return [1, 3];
                                        },
                                    },
                                },
                                subSkill: {
                                    gain: {
                                        audio: 'qirang',
                                        trigger: { player: 'useCard' },
                                        filter: function (event, player) {
                                            return get.type(event.card) == 'equip';
                                        },
                                        frequent: true,
                                        content: function () {
                                            var card = get.cardPile(function (card) {
                                                return get.type(card, 'trick') == 'trick';
                                            });
                                            if (card) player.gain(card, 'gain2');
                                        },
                                    },
                                },
                            },
                            hpp_yuhua: {
                                mod: {
                                    ignoredHandcard: function (card, player) {
                                        if (get.type(card) != 'basic') return true;
                                    },
                                    cardDiscardable: function (card, player, name) {
                                        if (name == 'phaseDiscard' && get.type(card) != 'basic') return false;
                                    },
                                },
                                audio: 'yuhua',
                                trigger: { player: 'phaseJieshuBegin' },
                                forced: true,
                                locked: false,
                                content: function () {
                                    'step 0'
                                    var cards = get.cards(2);
                                    game.cardsGotoOrdering(cards);
                                    var next = player.chooseToMove();
                                    next.set('list', [
                                        ['牌堆顶', cards],
                                        ['牌堆底'],
                                        ['自己获得'],
                                    ]);
                                    next.set('prompt', '羽化：将一张牌移动到牌堆顶或牌堆底，然后获得另一张牌');
                                    next.set('filterOk', function (moved) {
                                        return moved[2].length == 1;
                                    });
                                    next.set('processAI', function (list) {
                                        var cards = list[0][1], player = _status.event.player;
                                        var target = (_status.event.getTrigger().name == 'phaseZhunbei') ? player : player.next;
                                        var att = get.sgn(get.attitude(player, target));
                                        var top = [];
                                        var judges = target.getCards('j');
                                        var stopped = false;
                                        if (player != target || !target.hasWuxie()) {
                                            for (var i = 0; i < judges.length; i++) {
                                                var judge = get.judge(judges[i]);
                                                cards.sort(function (a, b) {
                                                    return (judge(b) - judge(a)) * att;
                                                });
                                                if (judge(cards[0]) * att < 0) {
                                                    stopped = true; break;
                                                }
                                                else {
                                                    top.unshift(cards.shift());
                                                }
                                            }
                                        }
                                        var bottom;
                                        if (!stopped) {
                                            cards.sort(function (a, b) {
                                                return (get.value(b, player) - get.value(a, player)) * att;
                                            });
                                            while (cards.length) {
                                                if ((get.value(cards[0], player) <= 5) == (att > 0)) break;
                                                top.unshift(cards.shift());
                                            }
                                        }
                                        bottom = cards;
                                        var TempCards1 = top.slice(0);
                                        var TempCards2 = bottom.slice(0);
                                        var gain = TempCards1.addArray(TempCards2)[TempCards1.addArray(TempCards2).length - 1];
                                        top.remove(gain);
                                        bottom.remove(gain);
                                        return [top, bottom, [gain]];
                                    });
                                    'step 1'
                                    var top = result.moved[0];
                                    var bottom = result.moved[1];
                                    var gain = result.moved[2];
                                    top.reverse();
                                    for (var i = 0; i < top.length; i++) {
                                        ui.cardPile.insertBefore(top[i], ui.cardPile.firstChild);
                                    }
                                    for (i = 0; i < bottom.length; i++) {
                                        ui.cardPile.appendChild(bottom[i]);
                                    }
                                    player.popup(get.cnNumber(top.length) + '上' + get.cnNumber(bottom.length) + '下');
                                    game.log(player, '将' + get.cnNumber(top.length) + '张牌置于牌堆顶');
                                    game.updateRoundNumber();
                                    player.gain(gain, 'draw');
                                    game.log(player, '获得了一张牌');
                                },
                            },

                            // 诸葛恪
                            hpp_aocai: {
                                audio: 'aocai',
                                enable: ['chooseToUse', 'chooseToRespond'],
                                hiddenCard: function (player, name) {
                                    if (player != _status.currentPhase && get.type(name) == 'basic' && lib.inpile.contains(name)) return true;
                                },
                                filter: function (event, player) {
                                    if (event.responded || player == _status.currentPhase || event.hpp_aocai) return false;
                                    for (var i of lib.inpile) {
                                        if (get.type(i) == 'basic' && event.filterCard({ name: i }, player, event)) return true;
                                    }
                                    return false;
                                },
                                delay: false,
                                content: function () {
                                    'step 0'
                                    var evt = event.getParent(2), aozhan = player.hasSkill('aozhan');
                                    evt.set('hpp_aocai', true);
                                    var cards = get.cards(player.countCards('h') == 0 ? 4 : 3);
                                    for (var i = cards.length - 1; i >= 0; i--) {
                                        ui.cardPile.insertBefore(cards[i].fix(), ui.cardPile.firstChild);
                                    }
                                    player.chooseButton(['傲才：选择要' + (evt.name == 'chooseToUse' ? '使用' : '打出') + '的牌', cards]).set('filterButton', function (button) {
                                        return _status.event.cards.contains(button.link);
                                    }).set('cards', cards.filter(function (card) {
                                        if (aozhan && card.name == 'tao') return false;
                                        return evt.filterCard(card, evt.player, evt);
                                    })).set('ai', function (button) {
                                        var evt = _status.event.getParent(3);
                                        if (evt && evt.ai) {
                                            var tmp = _status.event;
                                            _status.event = evt;
                                            var result = (evt.ai || event.ai1)(button.link, _status.event.player, evt);
                                            _status.event = tmp;
                                            return result;
                                        }
                                        return 1;
                                    });
                                    'step 1'
                                    var evt = event.getParent(2);
                                    if (result.bool && result.links && result.links.length) {
                                        var name = result.links[0].name;
                                        if (evt.name == 'chooseToUse') {
                                            game.broadcastAll(function (result, name) {
                                                lib.skill.aocai_backup.viewAs = { name: name, cards: [result], isCard: true };
                                                lib.skill.aocai_backup.prompt = '请选择' + get.translation(result) + '的目标';
                                            }, result.links[0], name);
                                            evt.set('_backupevent', 'aocai_backup');
                                            evt.backup('aocai_backup');
                                        }
                                        else {
                                            delete evt.result.skill;
                                            delete evt.result.used;
                                            evt.result.card = get.autoViewAs(result.links[0]);
                                            if (aozhan) evt.result.card.name = name;
                                            evt.result.cards = [result.links[0]];
                                            evt.redo();
                                            return;
                                        }
                                    }
                                    evt.goto(0);
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target, effect) {
                                            if (get.tag(card, 'respondShan')) return 0.7;
                                            if (get.tag(card, 'respondSha')) return 0.7;
                                        },
                                    },
                                    order: 11,
                                    respondShan: true,
                                    respondSha: true,
                                    result: {
                                        player: function (player) {
                                            if (_status.event.dying) return get.attitude(player, _status.event.dying);
                                            return 1;
                                        },
                                    },
                                },
                            },
                            hpp_duwu: {
                                audio: 'duwu',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return !player.hasSkill('hpp_duwu2') && game.hasPlayer(function (current) {
                                        return current.hp > 0 && current.hp <= player.countCards('he') && player.inRange(current);
                                    });
                                },
                                filterCard: function () {
                                    if (ui.selected.targets.length) return false;
                                    return true;
                                },
                                position: 'he',
                                selectCard: [1, Infinity],
                                complexSelect: true,
                                complexCard: true,
                                filterTarget: function (card, player, target) {
                                    return target != player && target.hp > 0 && player.inRange(target) && ui.selected.cards.length == target.hp;
                                },
                                check: function (card) {
                                    var player = _status.event.player;
                                    if (game.hasPlayer(function (current) {
                                        return current != player && current.hp > 0 && player.inRange(current) && ui.selected.cards.length == current.hp && get.damageEffect(current, player, player) > 0;
                                    })) return 0;
                                    switch (ui.selected.cards.length) {
                                        case 0: return 8 - get.value(card);
                                        case 1: return 6 - get.value(card);
                                        case 2: return 3 - get.value(card);
                                        default: return 0;
                                    }
                                },
                                content: function () {
                                    player.addTempSkill('hpp_duwu3');
                                    target.damage('nocard');
                                },
                                ai: {
                                    expose: 0.3,
                                    damage: true,
                                    order: 2,
                                    result: {
                                        target: function (player, target) {
                                            return get.damageEffect(target, player);
                                        },
                                    },
                                },
                            },
                            hpp_duwu2: { charlotte: true },
                            hpp_duwu3: {
                                trigger: { global: 'dyingAfter' },
                                charlotte: true,
                                filter: function (event, player) {
                                    return event.player.isAlive() && event.reason && event.reason.getParent().name == 'hpp_duwu';
                                },
                                forced: true,
                                popup: false,
                                content: function () {
                                    player.draw();
                                    player.addTempSkill('hpp_duwu2');
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

                            // 诸葛瞻
                            hpp_zuilun: {
                                audio: 'xinfu_zuilun',
                                trigger: { player: 'phaseEnd' },
                                check: function (event, player) {
                                    var num = 0;
                                    if (player.hasHistory('lose', function (evt) {
                                        return evt.type == 'discard';
                                    })) num++;
                                    if (!player.isMinHandcard()) num++;
                                    if (!player.getStat('damage')) num++;
                                    if (num == 0) return player.hp >= 2;
                                    return true;
                                },
                                prompt: function (event, player) {
                                    var num = 3;
                                    if (player.hasHistory('lose', function (evt) {
                                        return evt.type == 'discard';
                                    })) num--;
                                    if (!player.isMinHandcard()) num--;
                                    if (!player.getStat('damage')) num--;
                                    return get.prompt('hpp_zuilun') + '（可获得' + get.cnNumber(num) + '张牌）';
                                },
                                content: function () {
                                    'step 0'
                                    event.num = 0;
                                    event.cards = get.cards(4);
                                    game.cardsGotoOrdering(cards);
                                    if (!player.hasHistory('lose', function (evt) {
                                        return evt.type == 'discard';
                                    })) event.num++;
                                    if (player.isMinHandcard()) event.num++;
                                    if (player.getStat('damage')) event.num++;
                                    'step 1'
                                    var prompt = '罪论：将' + get.cnNumber(4 - num) + '牌置于牌堆顶';
                                    if (num > 0) prompt += '，并获得其余的牌';
                                    var next = player.chooseToMove(prompt, true);
                                    if (num > 0) {
                                        next.set('list', [
                                            ['牌堆顶', cards],
                                            ['获得'],
                                        ]);
                                        next.set('filterMove', function (from, to, moved) {
                                            if (to == 1 && moved[0].length <= 4 - _status.event.num) return false;
                                            return true;
                                        });
                                        next.set('filterOk', function (moved) {
                                            return moved[0].length == 4 - _status.event.num;
                                        });
                                    }
                                    else {
                                        next.set('list', [
                                            ['牌堆顶', cards],
                                        ]);
                                    }
                                    next.set('num', num);
                                    next.set('processAI', function (list) {
                                        var check = function (card) {
                                            var player = _status.event.player;
                                            var next = player.next;
                                            var att = get.attitude(player, next);
                                            var judge = next.getCards('j')[tops.length];
                                            if (judge) return get.judge(judge)(card) * att;
                                            return next.getUseValue(card) * att;
                                        }
                                        var cards = list[0][1].slice(0), tops = [];
                                        while (tops.length < 4 - _status.event.num) {
                                            list.sort(function (a, b) {
                                                return check(b) - check(a);
                                            });
                                            tops.push(cards.shift());
                                        }
                                        return [tops, cards];
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        var list = result.moved[0];
                                        var num = list.length - 1;
                                        for (var i = 0; i < list.length; i++) {
                                            event.cards.remove(list[num - i]);
                                            ui.cardPile.insertBefore(list[num - i], ui.cardPile.firstChild);
                                        }
                                    }
                                    'step 3'
                                    game.updateRoundNumber();
                                    if (event.cards.length) {
                                        player.gain(event.cards, 'draw');
                                        game.log(player, '获得了' + get.cnNumber(event.cards.length) + '张牌');
                                        event.finish();
                                    }
                                    else {
                                        player.chooseTarget('请选择一名角色，与其一同失去1点体力', true, lib.filter.notMe).set('ai', function (target) {
                                            return -get.attitude(_status.event.player, target);
                                        });
                                    }
                                    'step 4'
                                    if (result.bool) {
                                        player.line(result.targets[0], 'fire');
                                        player.loseHp();
                                        result.targets[0].loseHp();
                                    }
                                },
                            },

                            // 朱桓
                            hpp_fenli: {
                                audio: 'fenli',
                                trigger: { player: ['phaseJudgeBefore', 'phaseUseBefore', 'phaseDiscardBefore'] },
                                filter: function (event, player) {
                                    switch (event.name) {
                                        case 'phaseJudge': return player.isMaxHandcard(); break;
                                        case 'phaseUse': return player.isMaxHp(); break;
                                        case 'phaseDiscard': return player.isMaxEquip(); break;
                                    }
                                    return false;
                                },
                                check: function (event, player) {
                                    switch (event.name) {
                                        case 'phaseJudge': {
                                            if (player.hasJudge('lebu') || player.hasJudge('bingliang')) return true;
                                            if (player.getHistory('skipped').length > 0) return false;
                                            return game.hasPlayer(function (current) {
                                                return get.attitude(player, current) < 0 && current.hp == 1 && get.damageEffect(current, player, player) > 0;
                                            });
                                            break;
                                        }
                                        case 'phaseUse': {
                                            if (!player.needsToDiscard() || (player.countCards('e') && player.isMaxEquip())) return true;
                                            if (player.getHistory('skipped').length > 0) return false;
                                            return game.hasPlayer(function (current) {
                                                return get.attitude(player, current) < 0 && current.hp == 1 && get.damageEffect(current, player, player) > 0;
                                            });
                                            break;
                                        }
                                        case 'phaseDiscard': {
                                            return true;
                                            break;
                                        }
                                    }
                                    return false;
                                },
                                prompt: function (event, player) {
                                    return get.prompt('hpp_fenli') + '（可跳过' + get.translation(event.name) + (event.name == 'phaseJudge' ? '和摸牌阶段' : '') + '）';
                                },
                                content: function () {
                                    trigger.cancel();
                                    game.log(player, '跳过了', '#y' + get.translation(trigger.name));
                                    if (trigger.name == 'phaseJudge') {
                                        player.skip('phaseDraw');
                                        game.log(player, '跳过了', '#y摸牌阶段');
                                    }
                                },
                            },
                            hpp_pingkou: {
                                audio: 'pingkou',
                                trigger: { player: 'phaseEnd' },
                                filter: function (event, player) {
                                    return player.getHistory('skipped').length;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget([1, player.getHistory('skipped').length], get.prompt2('hpp_pingkou'), lib.filter.notMe).set('ai', function (target) {
                                        var player = _status.event.player;
                                        return get.damageEffect(target, player, player) * (target.countCards('e') ? 2 : 1);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var targets = result.targets.sortBySeat();
                                        event.targets = targets;
                                        player.logSkill('hpp_pingkou', targets);
                                        for (var i of targets) i.damage();
                                        if (targets.length == player.getHistory('skipped').length || !game.hasPlayer(function (current) {
                                            return current.countGainableCards(player, 'e') && targets.contains(current);
                                        })) event.finish();
                                    }
                                    else event.finish();
                                    'step 2'
                                    player.chooseTarget('请选择一名目标角色，获得其装备区中的一张牌', true, function (card, player, target) {
                                        return target.countGainableCards(player, 'e') && _status.event.targets.contains(target);
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        return 1 + Math.random() - get.attitude(player, target);
                                    }).set('targets', targets);
                                    'step 3'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.line(target);
                                        player.gainPlayerCard(target, 'e', true);
                                    }
                                },
                                ai: {
                                    combo: 'hpp_fenli',
                                    effect: {
                                        target: function (card) {
                                            if (card.name == 'lebu' || card.name == 'bingliang') return 0.5;
                                        },
                                    },
                                },
                            },

                            // 朱然
                            hpp_danshou: {
                                audio: 'xindanshou',
                                trigger: {
                                    global: 'phaseJieshuBegin',
                                    target: 'useCardToTargeted',
                                },
                                direct: true,
                                filter: function (event, player, name) {
                                    return ((name == 'phaseJieshuBegin' && event.player != player && player.countCards('he') >= event.player.countCards('h')) ||
                                        (event.targets && event.targets.contains(player) && ['basic', 'trick'].contains(get.type(event.card, 'trick'))))
                                        && !player.hasSkill('hpp_danshou_as');
                                },
                                content: function () {
                                    'step 0'
                                    if (event.triggername == 'phaseJieshuBegin') {
                                        var num = trigger.player.countCards('h');
                                        if (num > 0) player.chooseToDiscard(get.prompt('hpp_danshou', trigger.player), num, '弃置' + get.cnNumber(num) + '张牌并对' + get.translation(trigger.player) + '造成1点伤害', 'he').set('logSkill', ['hpp_danshou', trigger.player]).set('ai', function (card) {
                                            if (get.damageEffect(_status.event.getTrigger().player, _status.event.player, _status.event.player) > 0) return Math.max(5.5, 8 - _status.event.selectTarget) - get.value(card);
                                            return -1;
                                        });
                                        else player.chooseBool(get.prompt('hpp_danshou', trigger.player), '对' + get.translation(trigger.player) + '造成1点伤害').ai = function () {
                                            return get.damageEffect(trigger.player, player, player) > 0
                                        };
                                    }
                                    else {
                                        var num = 0;
                                        game.countPlayer2(function (current) {
                                            var history = current.getHistory('useCard');
                                            for (var j = 0; j < history.length; j++) {
                                                // if (['basic', 'trick'].contains(get.type(history[j].card, 'trick')) && history[j].targets && history[j].targets.contains(player)) num++;
                                                if (history[j].targets && history[j].targets.contains(player)) num++;
                                            }
                                        });
                                        event.num = num;
                                        player.chooseBool(get.prompt('hpp_danshou') + '（可摸' + get.cnNumber(num) + '张牌）', get.translation('hpp_danshou_info')).set('ai', function () {
                                            return _status.event.choice;
                                        }).set('choice', function () {
                                            if (player.isPhaseUsing()) {
                                                if (player.countCards('h', function (card) {
                                                    return ['basic', 'trick'].contains(get.type(card, 'trick')) && player.canUse(card, player, null, true) && get.effect(player, card, player) > 0 && player.getUseValue(card, null, true) > 0;
                                                })) return false;
                                                return true;
                                            }
                                            if (num > 2) return true;
                                            var card = trigger.card;
                                            if (get.tag(card, 'damage') && player.hp <= trigger.getParent().baseDamage && (!get.tag(card, 'respondShan') || !player.hasShan()) && (!get.tag(card, 'respondSha') || !player.hasSha())) return true;
                                            var source = _status.currentPhase, todis = (source.countCards('h') - Math.max(0, source.needsToDiscard()));
                                            if (todis <= Math.max(Math.min(2 + (source.hp <= 1 ? 1 : 0), player.countCards('he', function (card) {
                                                return get.value(card, player) < Math.max(5.5, 8 - todis)
                                            })), player.countCards('he', function (card) {
                                                return get.value(card, player) <= 0;
                                            })) && get.damageEffect(source, player, player) > 0) return false;
                                            if (!source.isPhaseUsing() || get.attitude(player, source) > 0) return true;
                                            if (card.name == 'sha' && !source.getCardUsable('sha')) return true;
                                            return Math.random() < num / 3;
                                        }());
                                    }
                                    'step 1'
                                    if (result.bool) {
                                        if (!result.cards || !result.cards.length) {
                                            player.logSkill('hpp_danshou', trigger.player);
                                        }
                                        if (event.triggername == 'useCardToTargeted') {
                                            player.draw(num);
                                            player.addTempSkill('hpp_danshou_as');
                                        }
                                        else {
                                            trigger.player.damage('nocard');
                                        }
                                    }
                                },
                                subSkill: { as: { sub: true } },
                                ai: {
                                    threaten: 0.6,
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (typeof card != 'object' || target.hasSkill('hpp_danshou_as') || !['basic', 'trick'].contains(get.type(card, 'trick'))) return;
                                            var num = 0;
                                            game.countPlayer2(function (current) {
                                                var history = current.getHistory('useCard');
                                                for (var j = 0; j < history.length; j++) {
                                                    if (['basic', 'trick'].contains(get.type(history[j].card, 'trick')) && history[j].targets && history[j].targets.contains(player)) num++;
                                                }
                                            });
                                            if (player == target && current > 0) return [1.1, num];
                                            return [0.9, num];
                                        },
                                    },
                                },
                            },

                            // 朱治
                            hpp_anguo: {
                                audio: 'anguo',
                                enable: 'phaseUse',
                                usable: 1,
                                filterTarget: true,
                                content: function () {
                                    'step 0'
                                    if (target.isMinHandcard()) {
                                        target.draw();
                                        event.h = true;
                                    }
                                    'step 1'
                                    if (target.isMinHp() && target.isDamaged()) {
                                        target.recover();
                                        event.hp = true;
                                    }
                                    'step 2'
                                    var equip = get.cardPile(function (card) {
                                        return get.type(card) == 'equip' && target.hasUseTarget(card);
                                    });
                                    if (target.isMinEquip() && equip) {
                                        target.chooseUseTarget(equip, 'nothrow', 'nopopup', true);
                                        event.e = true;
                                    }
                                    'step 3'
                                    game.updateRoundNumber();
                                    if (!event.h && player.isMinHandcard()) {
                                        player.draw();
                                    }
                                    'step 4'
                                    if (!event.hp && player.isMinHp() && player.isDamaged()) {
                                        player.recover();
                                    }
                                    'step 5'
                                    if (!event.e && player.isMinEquip()) {
                                        var equip = get.cardPile(function (card) {
                                            return get.type(card) == 'equip' && player.hasUseTarget(card);
                                        });
                                        if (equip) player.chooseUseTarget(equip, 'nothrow', 'nopopup', true);
                                    }
                                    'step 6'
                                    game.updateRoundNumber();
                                },
                                ai: {
                                    order: 9,
                                    result: {
                                        player: function (player, target) {
                                            if (get.attitude(player, target) <= 0) {
                                                if (target.isMinHandcard() || target.isMinEquip() || target.isMinHp()) return -1;
                                            }
                                            var num = 0;
                                            if (player.isMinHandcard() || target.isMinHandcard()) num++;
                                            if (player.isMinEquip() || target.isMinEquip()) num++;
                                            if ((player.isMinHp() && player.isDamaged()) || (target.isMinHp() && target.isDamaged())) num += 2.1;
                                            return num;
                                        },
                                    },
                                },
                            },

                            // 祖茂
                            hpp_yinbing: {
                                group: 'hpp_yinbing_discard',
                                audio: 'yinbing',
                                trigger: { player: 'phaseDiscardBefore' },
                                direct: true,
                                filter: function (event, player) {
                                    return player.countCards('he', { type: 'basic' }) < player.countCards('he');
                                },
                                marktext: '引兵',
                                content: function () {
                                    'step 0'
                                    player.chooseCard([1, player.countCards('he') - player.countCards('he', { type: 'basic' })], 'he', get.prompt('hpp_yinbing'), function (card) {
                                        return get.type(card) != 'basic';
                                    }).set('ai', function (card) {
                                        return 6 - get.value(card);
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        player.logSkill('hpp_yinbing');
                                        player.addToExpansion(result.cards, player, 'give').gaintag.add('hpp_yinbing');
                                    }
                                },
                                onremove: function (player, skill) {
                                    var cards = player.getExpansions(skill);
                                    if (cards.length) player.loseToDiscardpile(cards);
                                },
                                intro: {
                                    content: 'expansion',
                                    markcount: 'expansion',
                                },
                                ai: {
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (card.name == 'sha' && current < 0) return 1.2;
                                        },
                                    },
                                    threaten: function (player, target) {
                                        if (target.getExpansions('hpp_yinbing').length) return 2;
                                        return 1;
                                    }
                                },
                                subSkill: {
                                    discard: {
                                        audio: 'yinbing',
                                        trigger: { player: 'damageEnd' },
                                        forced: true,
                                        filter: function (event, player) {
                                            return event.card && player.getExpansions('hpp_yinbing').length > 0 &&
                                                event.card.name == 'sha';
                                        },
                                        content: function () {
                                            'step 0'
                                            player.chooseCardButton('移去一张引兵牌', player.getExpansions('hpp_yinbing'), true);
                                            'step 1'
                                            if (result.bool) {
                                                player.loseToDiscardpile(result.links);
                                                player.draw();
                                            }
                                        },
                                    },
                                },
                            },
                            hpp_juedi: {
                                audio: 'juedi',
                                trigger: { player: 'phaseZhunbeiBegin' },
                                filter: function (event, player) {
                                    return player.getExpansions('hpp_yinbing').length > 0;
                                },
                                forced: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt2('hpp_juedi'), true, function (card, player, target) {
                                        return player.hp >= target.hp;
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        var att = get.attitude(player, target);
                                        if (att < 2) return att - 10;
                                        var num = att / 10;
                                        if (target == player) {
                                            num += player.maxHp - player.countCards('h') + 0.5;
                                        }
                                        else {
                                            num += _status.event.n2 * 2;
                                            if (target.isDamaged()) {
                                                if (target.hp == 1) {
                                                    num += 3;
                                                }
                                                else if (target.hp == 2) {
                                                    num += 2;
                                                }
                                                else {
                                                    num += 0.5;
                                                }
                                            }
                                        }
                                        if (target.hasJudge('lebu')) {
                                            num /= 2;
                                        }
                                        return num;
                                    }).set('n2', player.getExpansions('hpp_yinbing').length);
                                    'step 1'
                                    if (result.bool) {
                                        player.line(result.targets[0], 'green');
                                        var cards = player.getExpansions('hpp_yinbing');
                                        if (result.targets[0] == player) {
                                            player.loseToDiscardpile(cards);
                                            var num = player.maxHp - player.countCards('h') + 1;
                                            if (num > 0) player.draw(num);
                                        }
                                        else {
                                            var target = result.targets[0];
                                            target.recover();
                                            target.gain(cards, player, 'give');
                                            target.draw(cards.length);
                                        }
                                    }
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

                            // SP蔡文姬
                            hpp_chenqing: {
                                audio: 'chenqing',
                                trigger: { global: 'dying' },
                                filter: function (event, player) {
                                    return event.player.hp <= 0 && !player.getHistory('useSkill', function (evt) {
                                        return evt.skill == 'hpp_chenqing';
                                    }).length;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt2('hpp_chenqing'), function (card, player, target) {
                                        return target != _status.event.getTrigger().player;
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        var trigger = _status.event.getTrigger();
                                        if (get.attitude(player, trigger.player) > 0) {
                                            var att1 = get.attitude(target, player);
                                            var att2 = get.attitude(target, trigger.player);
                                            var att3 = get.attitude(player, target);
                                            if (att3 < 0) return 0;
                                            return att1 / 2 + att2 + att3;
                                        }
                                        else return 0;
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        event.target = target;
                                        player.logSkill('hpp_chenqing', target);
                                        target.draw(5);
                                    }
                                    else event.finish();
                                    'step 2'
                                    var target = event.target;
                                    var tosave = trigger.player;
                                    var att = get.attitude(target, tosave);
                                    var hastao = target.countCards('h', 'tao');
                                    target.chooseToDiscard(4, true, 'he').set('ai', function (card) {
                                        var hastao = _status.event.hastao;
                                        var att = _status.event.att;
                                        if (!hastao && att > 0) {
                                            var suit = get.suit(card);
                                            for (var i = 0; i < ui.selected.cards.length; i++) {
                                                if (get.suit(ui.selected.cards[i]) == suit) {
                                                    return -4 - get.value(card);
                                                }
                                            }
                                        }
                                        if (att < 0 && ui.selected.cards.length == 3) {
                                            var suit = get.suit(card);
                                            for (var i = 0; i < ui.selected.cards.length; i++) {
                                                if (get.suit(ui.selected.cards[i]) == suit) {
                                                    return -get.value(card);
                                                }
                                            }
                                            return -10 - get.value(card);
                                        }
                                        return -get.value(card);
                                    }).set('hastao', hastao).set('att', att);
                                    'step 3'
                                    if (result.cards && result.cards.length == 4) {
                                        var suits = [];
                                        for (var i = 0; i < result.cards.length; i++) suits.add(get.suit(result.cards[i]));
                                        if (suits.length == 4 && game.checkMod({ name: 'tao', isCard: true }, player, trigger.player, 'unchanged', 'cardSavable', player)) target.useCard({ name: 'tao', isCard: true }, trigger.player);
                                    }
                                },
                                ai: { expose: 0.2 },
                            },
                            hpp_mozhi: {
                                audio: 'mozhi',
                                trigger: { player: 'phaseJieshuBegin' },
                                direct: true,
                                filter: function (event, player) {
                                    return player.getHistory('useCard', function (evt) {
                                        return evt.isPhaseUsing() && ['basic', 'trick'].contains(get.type(evt.card));
                                    }).length > 0 && player.countCards('hs') > 0;
                                },
                                content: function () {
                                    "step 0"
                                    event.count = 2;
                                    event.history = player.getHistory('useCard', function (evt) {
                                        return evt.isPhaseUsing() && ['basic', 'trick'].contains(get.type(evt.card));
                                    })
                                    "step 1"
                                    event._result = {};
                                    if (event.count && event.history.length && player.countCards('hs')) {
                                        event.count--;
                                        var card = event.history.shift().card;
                                        card = { name: card.name, nature: card.nature };
                                        if (lib.filter.cardEnabled(card)) {
                                            if (game.hasPlayer(function (current) {
                                                return player.canUse(card, current);
                                            })) {
                                                lib.skill.hpp_mozhix.viewAs = card;
                                                var next = player.chooseToUse();
                                                if (next.isOnline()) {
                                                    player.send(function (card) {
                                                        lib.skill.hpp_mozhix.viewAs = card;
                                                    }, card)
                                                }
                                                next.logSkill = 'hpp_mozhi';
                                                next.set('openskilldialog', '默识：将一张手牌当' + get.translation(card) + '使用');
                                                next.set('norestore', true);
                                                next.set('_backupevent', 'hpp_mozhix');
                                                next.set('custom', {
                                                    add: {},
                                                    replace: { window: function () { } }
                                                });
                                                next.backup('hpp_mozhix');
                                            }
                                        }
                                    }
                                    "step 2"
                                    if (result && result.bool) event.goto(1);
                                },
                            },
                            hpp_mozhix: {
                                filterCard: function (card) {
                                    return get.itemtype(card) == 'card';
                                },
                                selectCard: 1,
                                position: 'hs',
                                popname: true,
                            },

                            // SP大乔
                            hpp_yanxiao: {
                                audio: 'yanxiao',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('he', { suit: 'diamond' }) && game.hasPlayer(function (target) {
                                        return target.canAddJudge({ name: 'hpp_yanxiao_card' }) && !target.hasJudge('hpp_yanxiao_card');
                                    });
                                },
                                filterTarget: function (card, player, target) {
                                    return target.canAddJudge({ name: 'hpp_yanxiao_card' }) && !target.hasJudge('hpp_yanxiao_card');
                                },
                                filterCard: { suit: 'diamond' },
                                check: function (card) {
                                    return 7 - get.value(card);
                                },
                                position: 'he',
                                discard: false,
                                lose: false,
                                delay: false,
                                prepare: 'give',
                                content: function () {
                                    'step 0'
                                    game.addGlobalSkill('hpp_yanxiao_global');
                                    target.addJudge({ name: 'hpp_yanxiao_card' }, cards);
                                    'step 1'
                                    game.delayx();
                                },
                                ai: {
                                    order: 8,
                                    result: {
                                        target: function (player, target) {
                                            if (target.countCards('j', function (card) {
                                                return get.effect(target, {
                                                    name: card.viewAs || card.name,
                                                    cards: [card],
                                                }, target, target) < 0;
                                            })) return 3;
                                            return 1;
                                        },
                                    },
                                },
                                subSkill: {
                                    global: {
                                        audio: 'yanxiao',
                                        forceaudio: true,
                                        trigger: { player: 'phaseJudgeBegin' },
                                        filter: function (event, player) {
                                            return player.countCards('j') && player.hasJudge('hpp_yanxiao_card');
                                        },
                                        forced: true,
                                        content: function () {
                                            'step 0'
                                            player.gain(player.getCards('j'), 'gain2');
                                            player.judge();
                                            'step 1'
                                            if (result.color == 'red') player.draw();
                                            else player.addTempSkill('hpp_yanxiao_sha');
                                        },
                                        ai: {
                                            effect: {
                                                target: function (card, player, target) {
                                                    if (get.type(card) == 'delay' && target.hasJudge('hpp_yanxiao_card')) return [0, 0, 0, 0.1];
                                                },
                                            },
                                        },
                                    },
                                    sha: {
                                        charlotte: true,
                                        mark: true,
                                        marktext: '+1',
                                        intro: { content: '出【杀】次数+1' },
                                        mod: {
                                            cardUsable: function (card, player, num) {
                                                if (card.name == 'sha') return num + 1;
                                            },
                                        },
                                    },
                                },
                            },
                            hpp_anxian: {
                                audio: 'anxian',
                                group: 'hpp_anxian_target',
                                trigger: { player: 'useCardToPlayer' },
                                filter: function (event, player) {
                                    return event.card.name == 'sha' && event.target.countCards('h') && !event.card.hpp_anxian;
                                },
                                check: function (event, player) {
                                    return get.attitude(player, event.target) <= 0;
                                },
                                prompt2: function (event, player) {
                                    return '令' + get.translation(event.target) + '弃置一张手牌';
                                },
                                logTarget: 'target',
                                content: function () {
                                    trigger.target.chooseToDiscard('h', true);
                                },
                                subSkill: {
                                    target: {
                                        trigger: { target: 'useCardToTarget' },
                                        filter: function (event, player) {
                                            return event.card.name == 'sha' && player.countCards('h');
                                        },
                                        direct: true,
                                        content: function () {
                                            'step 0'
                                            player.chooseToDiscard(get.prompt('hpp_anxian'), '弃置一张手牌令' + get.translation(trigger.card) + '对你无效，然后' + get.translation(trigger.player) + '摸一张牌' + (player.canUse({ name: 'sha', isCard: true }, trigger.player, false) ? '，若你弃置了方片花色的牌，则你视为对' + get.translation(trigger.player) + '使用一张不触发〖安娴〗的【杀】' : '')).set('ai', function (card) {
                                                var player = _status.event.player;
                                                var trigger = _status.event.getTrigger();
                                                if (get.suit(card) == 'diamond' && player.canUse({ name: 'sha', isCard: true }, trigger.player, false)) return get.attitude(player, trigger.player) > 0 ? 0 : 9 - get.value(card);
                                                return 6 - get.value(card);
                                            }).logSkill = ['hpp_anxian', trigger.player];
                                            'step 1'
                                            if (result.bool) {
                                                trigger.player.draw();
                                                trigger.getParent().excluded.push(player);
                                                if (get.suit(result.cards[0], player) == 'diamond') {
                                                    var card = { name: 'sha', isCard: true };
                                                    if (player.canUse(card, trigger.player, false)) player.useCard(card, trigger.player).card.hpp_anxian = true;
                                                }
                                            }
                                        },
                                    },
                                },
                            },

                            // SP貂蝉
                            hpp_lihun: {
                                audio: 'lihun',
                                inherit: 'lihun',
                                filterTarget: lib.filter.notMe,
                                filter: function (event, player) {
                                    return game.hasPlayer(function (current) {
                                        return current != player && current.countCards('h');
                                    });
                                },
                                filterCard: () => false,
                                selectCard: -1,
                            },
                            hpp_pianyi: {
                                audio: 'rebiyue',
                                trigger: { player: 'phaseJieshuBegin' },
                                frequent: true,
                                content: function () {
                                    var num = 1;
                                    if (player.isTurnedOver()) num = 3;
                                    player.draw(num);
                                },
                            },

                            // SP姜维
                            hpp_kunfen: {
                                audio: 'kunfen',
                                trigger: { player: 'phaseJieshuBegin' },
                                check: function (event, player) {
                                    if (player.hp > 3) return true;
                                    if (player.hp == 3 && player.countCards('h') < 3) return true;
                                    if (player.hp == 2 && player.countCards('h') == 0) return true;
                                    return false;
                                },
                                content: function () {
                                    'step 0'
                                    player.loseHp();
                                    'step 1'
                                    player.draw(2);
                                    'step 2'
                                    player.chooseUseTarget('huogong', false);
                                },
                            },
                            hpp_fengliang: {
                                unique: true,
                                derivation: 'hpp_tiaoxin',
                                audio: 'fengliang',
                                trigger: { player: 'dying' },
                                juexingji: true,
                                forced: true,
                                skillAnimation: true,
                                animationColor: 'thunder',
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_fengliang');
                                    'step 1'
                                    player.loseMaxHp();
                                    'step 2'
                                    if (player.hp < 3) player.recover(3 - player.hp);
                                    'step 3'
                                    player.addSkillLog('hpp_tiaoxin');
                                },
                            },

                            // SP马超
                            hpp_zhuiji: {
                                mod: {
                                    globalFrom: function (from, to) {
                                        if (from.hp >= to.hp) return -Infinity;
                                    },
                                },
                                shaRelated: true,
                                trigger: { player: 'useCardToPlayered' },
                                logTarget: 'target',
                                filter: function (event, player) {
                                    if (event.card.name != 'sha') return false;
                                    return event.target.hp >= player.hp;
                                },
                                forced: true,
                                preHidden: true,
                                logTarget: 'target',
                                content: function () {
                                    trigger.getParent().directHit.push(trigger.target);
                                },
                                ai: {
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (arg.card.name != 'sha') return false;
                                        return arg.target.hp > player.hp;
                                    },
                                },
                            },
                            hpp_shichou: {
                                group: ['hpp_shichou2', 'hpp_shichou4'],
                                audio: 'ol_shichou',
                                trigger: { player: 'useCard2' },
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && game.hasPlayer(function (current) {
                                        return !event.targets.contains(current) && lib.filter.filterTarget(event.card, player, current);
                                    });
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    var num = Math.min(player.getDamagedHp() + 1, game.countPlayer(function (current) {
                                        return !trigger.targets.contains(current) && lib.filter.filterTarget(trigger.card, player, current);
                                    }));
                                    player.chooseTarget(get.prompt('hpp_shichou'), '令至多' + get.cnNumber(num) + '名其他角色也成为' + get.translation(trigger.card) + '的目标', [1, num], function (card, player, target) {
                                        var evt = _status.event.getTrigger();
                                        return target != player && !evt.targets.contains(target) && lib.filter.targetEnabled2(evt.card, player, target) && lib.filter.targetInRange(evt.card, player, target);
                                    }).ai = function (target) {
                                        return get.effect(target, { name: 'sha' }, _status.event.player);
                                    };
                                    'step 1'
                                    if (result.bool && result.targets && result.targets.length) {
                                        var targets = result.targets;
                                        player.logSkill('hpp_shichou', targets);
                                        player.line(targets, trigger.card.nature);
                                        trigger.targets.addArray(targets);
                                    }
                                },
                            },
                            hpp_shichou2: {
                                charlotte: true,
                                audio: 'ol_shichou',
                                trigger: { source: 'damageSource' },
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && player.countMark('hpp_shichou3') < 3;
                                },
                                forced: true,
                                locked: false,
                                content: function () {
                                    player.addTempSkill('hpp_shichou3');
                                    var num = Math.min(trigger.num, 3 - player.countMark('hpp_shichou3'));
                                    player.draw(num);
                                    player.addMark('hpp_shichou3', num, false);
                                },
                            },
                            hpp_shichou3: { charlotte: true, onremove: true },
                            hpp_shichou4: {
                                charlotte: true,
                                audio: 'ol_shichou',
                                trigger: { player: 'useCardAfter' },
                                forced: true,
                                locked: false,
                                filter: function (event, player) {
                                    return event.card && event.card.name == 'sha' && !player.getHistory('sourceDamage', function (evt) {
                                        return evt.card == event.card;
                                    }).length;
                                },
                                content: function () {
                                    var card = get.cardPile2(function (card) {
                                        return card.name == 'sha';
                                    });
                                    if (card) player.gain(card, 'gain2');
                                },
                            },

                            // SP庞德
                            hpp_juesi: {
                                audio: 'juesi',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('h', { name: 'sha' });
                                },
                                filterTarget: function (card, player, target) {
                                    return target != player && target.countCards('he') > 0 && player.inRange(target);
                                },
                                filterCard: { name: 'sha' },
                                content: function () {
                                    'step 0'
                                    target.chooseToDiscard('he', true);
                                    'step 1'
                                    if (result.bool) {
                                        if (target.hp >= player.hp && result.cards[0].name != 'sha') player.draw(2);
                                        if (result.cards[0].name == 'sha' && player.canUse({ name: 'juedou', isCard: true }, target, false)) player.useCard({ name: 'juedou', isCard: true }, target, false);
                                    }
                                },
                                ai: {
                                    order: 2,
                                    result: {
                                        target: function (player, target) {
                                            if (get.effect(target, { name: 'juedou' }, player, player) <= 0) {
                                                return 0;
                                            }
                                            if (target.hp < player.hp) {
                                                if (player.countCards('h') > player.hp) return -0.1;
                                                return 0;
                                            }
                                            var hs1 = target.getCards('h', 'sha');
                                            var hs2 = player.getCards('h', 'sha');
                                            if (hs1.length > hs2.length) {
                                                return 0;
                                            }
                                            var hsx = target.getCards('h');
                                            if (hsx.length > 2 && hs2.length <= 1 && hsx[0].number < 6) {
                                                return 0;
                                            }
                                            if (hsx.length > 3 && hs2.length <= 1) {
                                                return 0;
                                            }
                                            if (hs1.length > hs2.length - 1 && hs1.length > 0 && (hs2.length <= 1 || hs1[0].number > hs2[0].number)) {
                                                return 0;
                                            }
                                            return -1;
                                        },
                                    },
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

                            // SP孙尚香
                            hpp_liangzhu: {
                                audio: 'liangzhu',
                                trigger: { global: 'recoverAfter' },
                                direct: true,
                                filter: function (event, player) {
                                    return event.player.isPhaseUsing();
                                },
                                content: function () {
                                    'step 0'
                                    var list = ['摸一张', '摸两张'];
                                    if (trigger.player.getEquip(1)) list.push('拿武器');
                                    list.push('cancel2');
                                    player.chooseControl(list, function () {
                                        if (get.attitude(player, trigger.player) > 3) return '摸两张';
                                        return '摸一张';
                                    }).set('prompt', get.prompt2('hpp_liangzhu'));
                                    'step 1'
                                    if (result.control != 'cancel2') {
                                        player.logSkill('hpp_liangzhu', trigger.player);
                                        switch (result.control) {
                                            case '摸一张':
                                                player.draw();
                                                break;
                                            case '摸两张':
                                                trigger.player.draw(2);
                                                break;
                                            case '拿武器':
                                                player.gain(trigger.player.getEquip(1), trigger.player, 'give');
                                                break;
                                        }
                                    }
                                },
                            },
                            xiaoji_sp_sunshangxiang: { audio: 2 },
                            hpp_fanxiang: {
                                skillAnimation: true,
                                animationColor: 'fire',
                                audio: 'fanxiang',
                                unique: true,
                                juexingji: true,
                                forceunique: true,
                                derivation: ['xiaoji', 'hpp_wujian'],
                                trigger: { player: 'phaseZhunbeiBegin' },
                                filter: function (event, player) {
                                    return player.getAllHistory('useSkill', function (evt) {
                                        return evt.skill == 'hpp_liangzhu';
                                    }).length;
                                },
                                forced: true,
                                content: function () {
                                    player.awakenSkill('hpp_fanxiang');
                                    player.gainMaxHp();
                                    player.recover();
                                    for (var i of lib.skill.hpp_fanxiang.derivation) player.addSkillLog(i);
                                    player.removeSkill('hpp_liangzhu');
                                },
                            },
                            hpp_wujian: {
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('e', function (card) {
                                        return !player.getStorage('hpp_wujian_alka').contains(get.subtype(card));
                                    });
                                },
                                filterTarget: function (card, player, target) {
                                    return target != player && player.canUse({ name: 'sha' }, target);
                                },
                                position: 'e',
                                filterCard: function (card, player) {
                                    return !player.getStorage('hpp_wujian_alka').contains(get.subtype(card));
                                },
                                check: function (card) {
                                    return 1 / (get.value(card) || 0.5);
                                },
                                content: function () {
                                    player.addTempSkill('hpp_wujian_alka');
                                    player.storage.hpp_wujian_alka.push(get.subtype(cards[0]));
                                    player.useCard({ name: 'sha' }, target, false);
                                },
                                ai: {
                                    order: function (item, player) {
                                        return get.order({ name: 'sha' }, player) + 1;
                                    },
                                    result: {
                                        target: function (player, target) {
                                            return get.effect(target, { name: 'sha' }, player, target);
                                        },
                                    },
                                },
                                subSkill: {
                                    alka: {
                                        charlotte: true,
                                        onremove: true,
                                        init: function (player) {
                                            if (!player.storage.hpp_wujian_alka) player.storage.hpp_wujian_alka = [];
                                        },
                                    },
                                },
                            },

                            // SP太史慈
                            hpp_jixu: {
                                audio: 'xinfu_jixu',
                                enable: 'phaseUse',
                                // filter: function (event, player) {
                                //     return player.countCards('h');
                                // },
                                filterTarget: lib.filter.notMe,
                                selectTarget: [1, 4],
                                usable: 1,
                                multitarget: true,
                                multiline: true,
                                content: function () {
                                    'step 0'
                                    targets.sortBySeat();
                                    event.num = 0;
                                    'step 1'
                                    if (!event.caicuolist) event.caicuolist = [];
                                    targets[event.num].chooseBool('是否押杀？').ai = function (event, player) {
                                        var evt = _status.event.getParent();
                                        if (get.attitude(targets[event.num], evt.player) > 0) return evt.player.countCards('h', 'sha') ? false : true;
                                        return Math.random() < 0.5;
                                    };
                                    'step 2'
                                    var target = targets[event.num];
                                    var num1 = result.bool ? 1 : -1;
                                    var num2 = player.countCards('h', 'sha') ? 1 : -1;
                                    if (num1 != num2) {
                                        event.caicuolist.push(target);
                                        target.chat('猜错');
                                        game.log(target, '猜', '#y错', '了');
                                    }
                                    else {
                                        target.chat('猜对');
                                        game.log(target, '猜', '#g对', '了');
                                    }
                                    event.num++;
                                    game.delay();
                                    if (event.num < targets.length) event.goto(1);
                                    'step 3'
                                    if (event.caicuolist.length) {
                                        for (var i of event.caicuolist) {
                                            player.discardPlayerCard(i, 'he', true);
                                            player.useCard({ name: 'sha', isCard: true }, i, false);
                                        }
                                    }
                                    var num = targets.length - event.caicuolist.length + 1;
                                    player.addTempSkill('hpp_jixu_hand');
                                    // player.draw(num);
                                    var cards = [];
                                    while (cards.length < num) {
                                        var card = get.discardPile(function (card) {
                                            return !cards.contains(card);
                                        });
                                        if (card) cards.push(card);
                                        else break;
                                    }
                                    if (cards.length) player.gain(cards, 'gain2');
                                    player.addMark('hpp_jixu_hand', num, false);
                                },
                                ai: {
                                    order: function () {
                                        return get.order({ name: 'sha' }) + 0.6;
                                    },
                                    result: {
                                        target: function (player, target) {
                                            return get.effect(target, { name: 'guohe_copy2' }, player, target);
                                        },
                                    },
                                    expose: 0.25,
                                },
                                subSkill: {
                                    hand: {
                                        charlotte: true,
                                        onremove: true,
                                        mod: {
                                            maxHandcard: function (player, num) {
                                                return num + player.countMark('hpp_jixu_hand');
                                            },
                                        },
                                        intro: { content: '手牌上限+#' },
                                    },
                                },
                            },

                            // SP小乔
                            hpp_xingwu: {
                                audio: 'hppxingwu',
                                enable: 'phaseUse',
                                usable: 1,
                                filter: function (event, player) {
                                    return player.countCards('h');
                                },
                                filterCard: true,
                                filterTarget: lib.filter.notMe,
                                check: function (card) {
                                    return 8 - get.value(card);
                                },
                                contentBefore: function () {
                                    _status.event.player = player;
                                    _status.event.trigger('useXingWu');
                                },
                                content: function () {
                                    'step 0'
                                    player.turnOver();
                                    if (target.countCards('e')) player.discardPlayerCard(target, 'e', true);
                                    'step 1'
                                    var num = 2;
                                    if (target.sex == 'female') num = 1;
                                    target.damage(num);
                                },
                                ai: {
                                    damage: 2,
                                    order: 9,
                                    result: {
                                        target: function (player, target) {
                                            if (get.attitude(player, target) > 0) return 0;
                                            return get.damageEffect(target, player);
                                        },
                                    },
                                },
                            },
                            hpp_luoyan: {
                                audio: 'hppluoyan',
                                derivation: ['hpp_tianxiang', 'hpp_hongyan'],
                                trigger: { player: 'hpp_xingwuAfter' },
                                forced: true,
                                content: function () {
                                    for (var i of lib.skill.hpp_luoyan.derivation) player.addTempSkill(i, { player: 'phaseUseBegin' });
                                },
                            },
                            hpp_huimou: {
                                audio: 'hpphuimou',
                                trigger: { player: ['useCard', 'respond', 'hpp_tianxiangEnd'] },
                                filter: function (event, player) {
                                    if (!game.hasPlayer(function (current) {
                                        return current.isTurnedOver();
                                    })) return false;
                                    if (event.card) return !player.isPhaseUsing() && get.suit(event.card) == 'heart';
                                    return true;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget(get.prompt('hpp_huimou'), '令一名背面朝上的角色翻至正面', function (card, player, target) {
                                        return target.isTurnedOver();
                                    }).set('ai', function (target) {
                                        var player = _status.event.player;
                                        return get.attitude(player, target) - 3;
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.logSkill('hpp_huimou', target);
                                        if (target.isTurnedOver()) target.turnOver();
                                    }
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

                            // 神郭嘉
                            hpp_gjtianyi: {
                                audio: 'stianyi',
                                derivation: 'hpp_zuoxing',
                                trigger: { player: 'phaseZhunbeiBegin' },
                                forced: true,
                                juexingji: true,
                                skillAnimation: true,
                                animationColor: 'gray',
                                filter: function (event, player) {
                                    return !game.hasPlayer(function (current) {
                                        return !current.getAllHistory('damage').length;
                                    });
                                },
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_gjtianyi');
                                    player.gainMaxHp(2);
                                    player.recover();
                                    'step 1'
                                    player.chooseTarget(true, '令一名角色获得技能【佐幸】').set('ai', function (target) {
                                        return get.attitude(_status.event.player, target);
                                    });
                                    'step 2'
                                    if (result.bool) {
                                        var target = result.targets[0];
                                        player.line(target, 'green');
                                        target.storage.hpp_zuoxing = player;
                                        target.addSkillLog('hpp_zuoxing');
                                    }
                                },
                            },
                            hpp_zuoxing: {
                                group: 'hpp_zuoxing_use',
                                audio: 'zuoxing',
                                enable: 'phaseUse',
                                usable: 1,
                                filter: function (event, player) {
                                    if (!player.hasSkill('hpp_zuoxing_2')) return false;
                                    for (var i of lib.inpile) {
                                        if (get.type(i) == 'trick' && event.filterCard({ name: i, isCard: true }, player, event)) return true;
                                    }
                                    return false;
                                },
                                chooseButton: {
                                    dialog: function (event, player) {
                                        var list = [];
                                        for (var i of lib.inpile) {
                                            if (get.type(i) == 'trick' && event.filterCard({ name: i, isCard: true }, player, event)) list.push(['锦囊', '', i]);
                                        }
                                        return ui.create.dialog('佐幸', [list, 'vcard']);
                                    },
                                    check: function (button) {
                                        return _status.event.player.getUseValue({ name: button.link[2], isCard: true });
                                    },
                                    backup: function (links, player) {
                                        return {
                                            audio: 'zuoxing',
                                            viewAs: {
                                                name: links[0][2],
                                                isCard: true,
                                            },
                                            filterCard: () => false,
                                            selectCard: -1,
                                            popname: true,
                                        }
                                    },
                                    prompt: function (links, player) {
                                        return '请选择' + get.translation(links[0][2]) + '的目标';
                                    },
                                },
                                ai: { order: 1, result: { player: 1 } },
                                subSkill: {
                                    '2': { charlotte: true },
                                    use: {
                                        audio: 'zuoxing',
                                        trigger: { player: 'phaseUseBegin' },
                                        filter: function (event, player) {
                                            var target = player.storage.hpp_zuoxing;
                                            // return player.hasSkill('hpp_zuoxing') && target && target.isAlive() && target.maxHp > 1;
                                            return player.name1 == 'hpp_shen_guojia' && target && target.isAlive() && target.maxHp > 1;
                                        },
                                        check: function (event, player) {
                                            var target = player.storage.hpp_zuoxing;
                                            if (get.attitude(player, target) <= 0) return true;
                                            return target.maxHp > 3 && !player.hasJudge('lebu');
                                        },
                                        prompt: function (event, player) {
                                            return get.prompt('hpp_zuoxing') + '（令' + get.translation(player.storage.hpp_zuoxing) + '减少1点体力上限，' + get.translation(player.storage.hpp_zuoxing) + '当前体力上限：' + player.storage.hpp_zuoxing.maxHp + '）';
                                        },
                                        prompt2: () => lib.translate.hpp_zuoxing_info,
                                        content: function () {
                                            player.line(player.storage.hpp_zuoxing, 'fire');
                                            player.storage.hpp_zuoxing.loseMaxHp();
                                            player.addTempSkill('hpp_zuoxing_2');
                                        },
                                    },
                                },
                            },
                            hpp_huishi: {
                                audio: 'sghuishi',
                                enable: 'phaseUse',
                                limited: true,
                                skillAnimation: true,
                                animationColor: 'water',
                                filterTarget: true,
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_huishi');
                                    var list = target.getSkills(null, false, false).filter(function (skill) {
                                        if (target.awakenedSkills.contains(skill)) return false;
                                        var info = lib.skill[skill];
                                        return info && info.juexingji;
                                    });
                                    if (list.length && player.maxHp >= game.players.length) {
                                        // for (var skill of list) {
                                        //     target.logSkill(skill);
                                        //     var next = game.createEvent('hpp_huishi_juexing');
                                        //     next.player = target;
                                        //     next.setContent(lib.skill[skill].content);
                                        // }
                                        if (list.length == 1) {
                                            event._result = { control: list[0] };
                                        }
                                        else {
                                            player.chooseControl(list).set('prompt', '选择一个觉醒技，令' + get.translation(target) + '可无视条件发动该技能');
                                        }
                                    }
                                    if (!list.length && player.maxHp > 2) {
                                        target.draw(4);
                                        event.goto(2);
                                    }
                                    'step 1'
                                    var skill = result.control;
                                    target.logSkill(skill);
                                    var next = game.createEvent('hpp_huishi_juexing');
                                    next.player = target;
                                    next.setContent(lib.skill[skill].content);
                                    'step 2'
                                    player.loseMaxHp(2);

                                },
                                ai: {
                                    order: 0.1,
                                    expose: 0.2,
                                    result: {
                                        target: function (player, target) {
                                            if (player.maxHp < 5) return 0;
                                            var list = target.getSkills(null, false, false).filter(function (skill) {
                                                var info = lib.skill[skill];
                                                return info && info.juexingji;
                                            });
                                            if (list.length && player.maxHp >= game.players.length) return 10 * list.length;
                                            if (target.hasJudge('lebu') || target.hasSkillTag('nogain')) return 0;
                                            if (!list.length && player.maxHp >= 3) return 4;
                                            return 0;
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

                            // 神吕布
                            hpp_wuqian: {
                                derivation: 'wushuang',
                                audio: 'ol_wuqian',
                                trigger: { player: 'useCardToPlayered' },
                                filter: function (event, player) {
                                    if (!_status.currentPhase || player != _status.currentPhase) return false;
                                    if (!['sha', 'juedou'].contains(event.card.name) || !event.isFirstTarget) return false;
                                    return player.getHistory('useCard', function (evt) {
                                        return (evt.card.name == 'sha' || evt.card.name == 'juedou');
                                    }).indexOf(event.getParent()) == 0;
                                },
                                forced: true,
                                logTarget: 'targets',
                                content: function () {
                                    for (var target of trigger.targets) {
                                        target.addTempSkill('qinggang2');
                                        target.storage.qinggang2.add(trigger.card);
                                        if (trigger.card.name == 'sha') {
                                            var id = target.playerid;
                                            var map = trigger.getParent().customArgs;
                                            if (!map[id]) map[id] = {};
                                            if (typeof map[id].shanRequired == 'number') map[id].shanRequired++;
                                            else map[id].shanRequired = 2;
                                        }
                                        else {
                                            var id = target.playerid;
                                            var idt = target.playerid;
                                            var map = trigger.getParent().customArgs;
                                            if (!map[idt]) map[idt] = {};
                                            if (!map[idt].shaReq) map[idt].shaReq = {};
                                            if (!map[idt].shaReq[id]) map[idt].shaReq[id] = 1;
                                            map[idt].shaReq[id]++;
                                        }
                                    }
                                },
                                ai: {
                                    unequip_ai: true,
                                    skillTagfilter: function (player, tag, arg) {
                                        if (arg && arg.card && !player.getHistory('useCard', function (evt) {
                                            return (evt.card.name == 'sha' || evt.card.name == 'juedou');
                                        }).length && ['sha', 'juedou'].contains(arg.card.name)) return true;
                                        return false;
                                    },
                                },
                            },
                            hpp_shenfen: {
                                unique: true,
                                mark: true,
                                limited: true,
                                audio: 'ol_shenfen',
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.hp >= 3;
                                },
                                skillAnimation: true,
                                animationColor: 'metal',
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_shenfen');
                                    player.loseHp(3);
                                    event.delay = false;
                                    event.targets = game.filterPlayer();
                                    event.targets.remove(player);
                                    event.targets.sort(lib.sort.seat);
                                    player.line(event.targets, 'green');
                                    event.targets2 = event.targets.slice(0);
                                    event.targets3 = event.targets.slice(0);
                                    'step 1'
                                    if (event.targets2.length) {
                                        event.targets2.shift().damage('nocard');
                                        event.redo();
                                    }
                                    'step 2'
                                    if (event.targets.length) {
                                        event.current = event.targets.shift()
                                        if (event.current.countCards('e')) event.delay = true;
                                        event.current.discard(event.current.getCards('e')).delay = false;
                                    }
                                    'step 3'
                                    if (event.delay) game.delay(0.5);
                                    event.delay = false;
                                    if (event.targets.length) event.goto(2);
                                    'step 4'
                                    if (event.targets3.length) {
                                        var target = event.targets3.shift();
                                        target.chooseToDiscard(4, 'h', true).delay = false;
                                        if (target.countCards('h')) event.delay = true;
                                    }
                                    'step 5'
                                    if (event.delay) game.delay(0.5);
                                    event.delay = false;
                                    if (event.targets3.length) event.goto(4);
                                },
                                ai: {
                                    order: 10,
                                    result: {
                                        player: function (player) {
                                            if (player.hp < 5 || player.hasUnknown()) return 0;
                                            return game.countPlayer(function (current) {
                                                if (current != player) {
                                                    return get.sgn(get.damageEffect(current, player, player));
                                                }
                                            });
                                        },
                                    },
                                },
                            },

                            // 神吕蒙
                            hpp_shelie: {
                                audio: 'shelie',
                                inherit: 'shelie',
                                forced: true,
                            },
                            gongxin_re_lvmeng: { audio: 2 },
                            hpp_gongxin: {
                                audio: 'gongxin',
                                audioname2: { hpp_lvmeng: 'gongxin_re_lvmeng' },
                                trigger: { player: 'useCardToPlayered', target: 'useCardToTargeted' },
                                filter: function (event, player) {
                                    if (event.player == event.target || event.targets.length != 1) return false;
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
                                inherit: 'relonghun',
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

                            // 神诸葛亮
                            hpp_qixing: {
                                unique: true,
                                audio: 'qixing',
                                trigger: { global: 'phaseBefore', player: 'enterGame' },
                                filter: function (event, player) {
                                    return event.name != 'phase' || game.phaseNumber == 0;
                                },
                                forced: true,
                                content: function () {
                                    player.markAuto('hpp_qixing', game.cardsGotoSpecial(get.cards(7)).cards);
                                },
                                mark: true,
                                intro: {
                                    onunmark: function (storage, player) {
                                        if (storage && storage.length) {
                                            player.$throw(storage, 1000);
                                            game.cardsDiscard(storage);
                                            game.log(storage, '被置入了弃牌堆');
                                            storage.length = 0;
                                        }
                                    },
                                    mark: function (dialog, content, player) {
                                        if (content && content.length) {
                                            if (player == game.me || player.isUnderControl()) {
                                                dialog.addAuto(content);
                                            }
                                            else {
                                                return '共有' + get.cnNumber(content.length) + '张星';
                                            }
                                        }
                                    },
                                    content: function (content, player) {
                                        if (content && content.length) {
                                            if (player == game.me || player.isUnderControl()) {
                                                return get.translation(content);
                                            }
                                            return '共有' + get.cnNumber(content.length) + '张星';
                                        }
                                    }
                                },
                                group: 'hpp_qixing_draw',
                                subSkill: {
                                    draw: {
                                        trigger: { player: 'phaseDrawEnd' },
                                        filter: function (event, player) {
                                            return player.storage.hpp_qixing && player.storage.hpp_qixing.length;
                                        },
                                        direct: true,
                                        content: function () {
                                            'step 0'
                                            var cards = player.getStorage('hpp_qixing');
                                            if (!cards.length || !player.countCards('h')) {
                                                event.finish();
                                                return;
                                            }
                                            var next = player.chooseToMove('七星：是否交换“星”和手牌？');
                                            next.set('list', [
                                                [get.translation(player) + '（你）的星', cards],
                                                ['手牌区', player.getCards('h')],
                                            ]);
                                            next.set('filterMove', function (from, to) {
                                                return typeof to != 'number';
                                            });
                                            next.set('processAI', function (list) {
                                                var player = _status.event.player, cards = list[0][1].concat(list[1][1]).sort(function (a, b) {
                                                    return get.value(a) - get.value(b);
                                                }), cards2 = cards.splice(0, player.storage.hpp_qixing.length);
                                                return [cards2, cards];
                                            });
                                            'step 1'
                                            if (result.bool) {
                                                var pushs = result.moved[0], gains = result.moved[1];
                                                pushs.removeArray(player.storage.hpp_qixing);
                                                gains.removeArray(player.getCards('h'));
                                                if (!pushs.length || pushs.length != gains.length) return;
                                                player.logSkill('hpp_qixing');
                                                player.lose(pushs, ui.special, 'toStorage');
                                                game.log(player, '将', pushs, '作为“星”置于武将牌上');
                                                player.gain(gains, 'gain2', 'log', 'fromStorage');
                                                player.storage.hpp_qixing.addArray(pushs);
                                                player.storage.hpp_qixing.removeArray(gains);
                                                player.markSkill('hpp_qixing');
                                            }
                                        }
                                    },
                                },
                            },
                            hpp_kuangfeng: {
                                audio: 'kuangfeng',
                                trigger: { player: 'phaseUseEnd' },
                                filter: function (event, player) {
                                    return player.storage.hpp_qixing && player.storage.hpp_qixing.length;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseTarget([1, Math.min(game.players.length, player.getStorage('hpp_qixing').length)], get.prompt2('hpp_kuangfeng')).set('ai', function (target) {
                                        var player = _status.event.player;
                                        var eff = get.damageEffect(target, player, player);
                                        if (target.hp == 1 || !ui.selected.targets.length) return eff;
                                        return 0;
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        event.targets = result.targets.sortBySeat();
                                        player.chooseButton(['请选择要移去的“星”', player.getStorage('hpp_qixing')], true, result.targets.length).set('ai', function (button) {
                                            return -get.value(button.link);
                                        });
                                    }
                                    else event.finish();
                                    'step 2'
                                    var cards = result.links;
                                    player.logSkill('hpp_kuangfeng', targets);
                                    player.$throw(cards, 2000);
                                    player.unmarkAuto('hpp_qixing', cards);
                                    game.cardsDiscard(cards);
                                    for (var i of targets) i.damage();
                                },
                            },
                            hpp_dawu: {
                                audio: 'dawu',
                                trigger: { player: 'phaseJieshuBegin' },
                                filter: function (event, player) {
                                    return player.storage.hpp_qixing && player.storage.hpp_qixing.length;
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseButton([get.prompt('hpp_dawu'), player.getStorage('hpp_qixing')]).set('ai', function (button) {
                                        return 1 / Math.max(0.01, get.value(button.link));
                                    });
                                    'step 1'
                                    if (result.bool) {
                                        var cards = result.links;
                                        player.logSkill('hpp_dawu');
                                        player.$throw(cards, 2000);
                                        player.unmarkAuto('hpp_qixing', cards);
                                        game.cardsDiscard(cards);
                                        player.addTempSkill('hpp_dawu_damage', { player: 'phaseBegin' });
                                    }
                                },
                                subSkill: {
                                    damage: {
                                        charlotte: true,
                                        mark: true,
                                        intro: { content: '受到的非属性伤害-1' },
                                        trigger: { player: 'damageBegin3' },
                                        filter: function (event) {
                                            return event.num > 0 && !event.nature;
                                        },
                                        forced: true,
                                        content: function () {
                                            trigger.num--;
                                        },
                                        ai: {
                                            effect: {
                                                target: function (card, player, target) {
                                                    if (player.hasSkillTag('jueqing', false, target)) return;
                                                    if (get.nature(card)) return;
                                                    var num = get.tag(card, 'damage');
                                                    if (num) {
                                                        if (num > 1) return 0.5;
                                                        return 0;
                                                    }
                                                },
                                            },
                                        },
                                    },
                                },
                            },

                            // 孙悟空
                            hpp_72bian: {
                                onChooseToUse: function (event) {
                                    if (event.type == 'phase' && !game.online) {
                                        var evtx = event.getParent('phaseUse');
                                        var list = ['basic', 'trick', 'equip'], player = event.player;
                                        player.getHistory('lose', function (evt) {
                                            if (evt.getParent(2).name == 'hpp_72bian_backup') list.remove(get.type2(evt.cards2[0]));
                                        });
                                        event.set('hpp_72bian_type', list);
                                    }
                                },
                                nobracket: true,
                                enable: 'phaseUse',
                                filter: function (event, player) {
                                    return player.countCards('he', function (card) {
                                        return event['hpp_72bian_type'].contains(get.type2(card));
                                    });
                                },
                                chooseButton: {
                                    dialog: function (event, player) {
                                        return ui.create.dialog('###72变###' + lib.translate['hpp_72bian_info']);
                                    },
                                    chooseControl: function (event, player) {
                                        var list = event['hpp_72bian_type'].slice(0);
                                        list.push('cancel2');
                                        return list.filter(function (control) {
                                            if (control == 'cancel2') return true;
                                            return player.countCards('he', function (card) {
                                                return get.type2(card) == control;
                                            });
                                        });
                                    },
                                    check: function (event, player) {
                                        var map = {};
                                        player.getCards('he').forEach(function (card) {
                                            var type = get.type2(card);
                                            if (!map[type]) map[type] = 0;
                                            map[type]++;
                                        });
                                        var list = Object.keys(map).sort((a, b) => map[b] - map[a]);
                                        return list[0];
                                    },
                                    backup: function (result, player) {
                                        return {
                                            type: result.control,
                                            discard: false,
                                            delay: 0,
                                            content: function () {
                                                var cards = player.getCards('he', function (card) {
                                                    return get.type2(card) == lib.skill['hpp_72bian_backup'].type;
                                                });
                                                player.loseToDiscardpile(cards);
                                                var list = ['basic', 'trick', 'equip'], cardx = [];
                                                var type = list[(list.indexOf(get.type2(cards[0])) + 1) % 3];
                                                for (var i = 0; i < cards.length; i++) {
                                                    var card = get.cardPile2(function (card) {
                                                        return get.type2(card) == type && !cardx.contains(card);
                                                    });
                                                    if (card) cardx.push(card);
                                                    else break;
                                                }
                                                if (cardx.length) player.gain(cardx, 'gain2');
                                            },
                                        }
                                    },
                                },
                                ai: {
                                    order: 1,
                                    result: { player: 1 },
                                },
                            },
                            hpp_ruyi: {
                                locked: true,
                                derivation: 'hpp_ruyijingubang',
                                group: ['hpp_ruyijingubang', 'hpp_ruyijingubang2'],
                                ai: {
                                    effect: {
                                        target: function (card, player, target) {
                                            if (player == target && get.type(card) == 'equip' && get.subtype(card) == 'equip1') {
                                                if (target.getEquip(1)) return;
                                                return 0;
                                            }
                                        },
                                    },
                                },
                            },
                            hpp_ruyijingubang: {
                                init: function (player) {
                                    if (!player.storage.hpp_ruyijingubang) player.storage.hpp_ruyijingubang = 1;
                                },
                                onremove: true,
                                mod: {
                                    attackRange: function (player, num) {
                                        if ((player.getEquip(1) && !player.getEquip('hpp_ruyijingubang')) || player.isDisabled(1)) return;
                                        if (_status.hpp_ruyiCheck) return num + _status.hpp_ruyiCheck - 1;
                                        return num + player.storage.hpp_ruyijingubang - 1;
                                    },
                                },
                                equipSkill: true,
                                trigger: { player: 'phaseBegin' },
                                filter: function (event, player) {
                                    if (player.isDisabled(1)) return false;
                                    return !player.getEquip(1) || player.getEquip('hpp_ruyijingubang');
                                },
                                direct: true,
                                content: function () {
                                    'step 0'
                                    player.chooseControl('1', '2', '3', '4', 'cancel2').set('prompt', get.prompt2('hpp_ruyijingubang')).set('choiceList', [
                                        '将“金箍棒”攻击范围调整为1 → 你使用【杀】不计入次数限制',
                                        '将“金箍棒”攻击范围调整为2 → 你于回合内使用的第一张【杀】造成的伤害+1',
                                        '将“金箍棒”攻击范围调整为3 → 你使用【杀】无法被响应',
                                        '将“金箍棒”攻击范围调整为4 → 你使用【杀】可以额外指定一个目标'
                                    ]).set('ai', function () {
                                        var player = _status.event.player;
                                        if (!player.hasSha()) return '4';
                                        for (var i = 0; i <= 3; i++) {
                                            _status.hpp_ruyiCheck = [2, 1, 3, 4][i];
                                            if (game.hasPlayer(function (current) {
                                                return player.canUse({ name: 'sha' }, current) && get.effect(current, { name: 'sha' }, player, player) > 0;
                                            })) {
                                                delete _status.hpp_ruyiCheck;
                                                return i + 1;
                                            }
                                        }
                                        if (_status.hpp_ruyiCheck) delete _status.hpp_ruyiCheck;
                                        return '4';
                                    });
                                    'step 1'
                                    if (result.control != 'cancel2') {
                                        var num = parseInt(result.control), card = player.getEquip('hpp_ruyijingubang');
                                        player.logSkill('hpp_ruyijingubang');
                                        player.storage.hpp_ruyijingubang = num;
                                        player.popup(num);
                                        game.log(player, '将', '#g' + (card ? get.translation(card) : '如意金箍棒'), '的攻击范围调整为', '#y' + num);
                                    }
                                },
                            },
                            hpp_ruyijingubang2: {
                                mod: {
                                    selectTarget: function (card, player, range) {
                                        if ((player.getEquip(1) && !player.getEquip('hpp_ruyijingubang')) || player.isDisabled(1)) return;
                                        var num = player.storage.hpp_ruyijingubang;
                                        if (card.name == 'sha' && range[1] != -1 && num == 4) range[1]++;
                                    },
                                },
                                equipSkill: true,
                                trigger: { player: 'useCard' },
                                filter: function (event, player) {
                                    var num = player.storage.hpp_ruyijingubang;
                                    if (event.card.name != 'sha' || player.isDisabled(1)) return false;
                                    if (player.getEquip(1) && !player.getEquip('hpp_ruyijingubang')) return false;
                                    if (num == 2) return player.getHistory('useCard', function (evt) {
                                        return evt.card.name == 'sha';
                                    }).indexOf(event) == 0 && _status.currentPhase && player == _status.currentPhase;
                                    return num != 4;
                                },
                                forced: true,
                                locked: false,
                                content: function () {
                                    var num = player.storage.hpp_ruyijingubang;
                                    switch (num) {
                                        case 1:
                                            trigger.addCount = false;
                                            if (player.stat[player.stat.length - 1].card.sha > 0) player.stat[player.stat.length - 1].card.sha--;
                                            game.log(trigger.card, '不计入次数');
                                            break;
                                        case 2:
                                            trigger.baseDamage++;
                                            game.log(trigger.card, '造成的伤害+1');
                                            break;
                                        case 3:
                                            trigger.directHit.addArray(game.players);
                                            game.log(trigger.card, '不可被响应');
                                            break;
                                    }
                                },
                                ai: {
                                    directHit_ai: true,
                                    skillTagFilter: function (player, tag, arg) {
                                        if (player.isDisabled(1) || (player.getEquip(1) && !player.getEquip('hpp_ruyijingubang'))) return false;
                                        return arg.card.name == 'sha' && ((_status.hpp_ruyiCheck && _status.hpp_ruyiCheck == 3) || player.storage.hpp_ruyijingubang == 3);
                                    },
                                },
                            },
                            hpp_qitian: {
                                unique: true,
                                derivation: ['hpp_huoyan', 'hpp_jindouyun'],
                                trigger: { player: ['changeHp', 'enterGame'], global: 'phaseBefore' },
                                filter: function (event, player) {
                                    if (player.hp != 1) return false;
                                    return event.name != 'phase' || game.phaseNumber == 0;
                                },
                                juexingji: true,
                                forced: true,
                                skillAnimation: true,
                                animationColor: 'fire',
                                content: function () {
                                    'step 0'
                                    player.awakenSkill('hpp_qitian');
                                    player.loseMaxHp();
                                    'step 1'
                                    player.addSkillLog('hpp_huoyan');
                                    player.addSkillLog('hpp_jindouyun');
                                },
                            },
                            hpp_huoyan: {
                                locked: true,
                                ai: {
                                    viewHandcard: true,
                                    skillTagFilter: function (player, arg, target) {
                                        return target != player && !_status.auto;
                                    },
                                },
                            },
                            hpp_jindouyun: {
                                nobracket: true,
                                locked: true,
                                mod: {
                                    globalFrom: function (from, to, distance) {
                                        return distance - 1;
                                    },
                                    globalTo: function (from, to, distance) {
                                        return distance + 1;
                                    },
                                },
                            },
                        },
                        dynamicTranslate: {
                            hpp_zhongjian: function (player) {
                                return '出牌阶段限' + (player.hasSkill('recaishi2') ? '两' : '一') + '次，你可以选择一名本回合内未选择过的角色。你令其获得一项效果：①其下次造成伤害后弃置两张牌，然后你摸一张牌。②其下次受到伤害后摸两张牌，然后你摸一张牌。';
                            },
                            hpp_jiaozhao: function (player) {
                                return [lib.translate.hpp_jiaozhao_info, lib.translate.hpp_jiaozhao_2_info, lib.translate.hpp_jiaozhao_3_info][player.countMark('hpp_danxin')];
                            },
                            hpp_pingting: function (player) {
                                return '出牌阶段开始时，你可以选择以下选项中的至多' + get.cnNumber(2 + player.hasSkill('hpp_shuangshu_pingting') ? 1 : 0) + '项：⒈本阶段使用的第一张牌无距离限制。⒉本阶段使用第二张牌指定目标后获得此牌对应的所有实体牌。⒊本阶段使用的第三张牌结算完毕后摸两张牌。⒋本阶段使用的第四张牌额外结算一次。';
                            },
                            hpp_yizheng: function (player) {
                                return '出牌阶段结束时，你可以选择以下选项中的至多' + get.cnNumber(1 + player.hasSkill('hpp_shuangshu_yizheng') ? 1 : 0) + '项：⒈移动场上的一张武器牌。⒉移动场上的一张防具牌。⒊移动场上的一张坐骑牌。然后若你于本次技能结算中移动了：一张牌，你回复1点体力；两张牌，直到你的下回合开始，当你失去一张牌时，摸一张牌。';
                            },
                        },
                        characterTitle: {
                            // g绿 b蓝 r红 p粉
                            // B
                            hpp_bulianshi: '#b捞德一评级:3.7',
                            // C
                            hpp_caiwenji: '#b捞德一评级:3.7',
                            hpp_caoang: '#b捞德一评级:3.5',
                            hpp_caocao: '#b捞德一评级:3.5',
                            hpp_caochong: '#g捞德一评级:2.7',
                            hpp_caopi: '#g捞德一评级:2.9',
                            hpp_caoren: '#g捞德一评级:2.8',
                            hpp_caorui: '#g捞德一评级:2.9',
                            hpp_caoxiu: '#b捞德一评级:3.6',
                            hpp_caoying: '#b捞德一评级:3.7',
                            hpp_caozhang: '#b捞德一评级:3.6',
                            hpp_caozhen: '#g捞德一评级:2.8',
                            hpp_caozhi: '#r捞德一评级:4.3',
                            hpp_chendao: '#b捞德一评级:3.4',
                            hpp_chengpu: '#b捞德一评级:3.4',
                            // D
                            hpp_daqiao: '#b捞德一评级:3.5',
                            hpp_dengai: '#b捞德一评级:3.5',
                            hpp_dianwei: '#b捞德一评级:3.1',
                            hpp_diaochan: '#b捞德一评级:3.5',
                            hpp_dongbai: '#b捞德一评级:3.5',
                            hpp_dongyun: '#g捞德一评级:2.3',
                            hpp_dongzhuo: '#g捞德一评级:2.7',
                            hpp_dufuren: '#b捞德一评级:3.7',
                            // F
                            hpp_fuhuanghou: '#b捞德一评级:3.8',
                            // G
                            hpp_ganning: '#b捞德一评级:3.9',
                            hpp_gaoshun: '#b捞德一评级:3.6',
                            hpp_gongsunzan: '#b捞德一评级:3.7',
                            hpp_guanping: '#g捞德一评级:2.7',
                            hpp_guanyinping: '#b捞德一评级:3.2',
                            hpp_guanyu: '#b捞德一评级:3.5',
                            hpp_guohuai: '#b捞德一评级:3.7',
                            hpp_guohuanghou: '#b捞德一评级:3.8',
                            hpp_guojia: '捞德一评级1.2',
                            // H
                            hpp_handang: '#g捞德一评级:2.5',
                            hpp_haozhao: '#g捞德一评级:2.8',
                            hpp_huaman: '#r捞德一评级:4.3',
                            hpp_huanggai: '#b捞德一评级:3.5',
                            hpp_huangzhong: '#g捞德一评级:2.7',
                            hpp_huaxiong: '#g捞德一评级:2.9',
                            // J
                            hpp_jiangwei: '#b捞德一评级:3.5',
                            hpp_jiaxu: '#g捞德一评级:2.4',
                            // L
                            hpp_liaohua: '#b捞德一评级:3.2',
                            hpp_lidian: '#b捞德一评级:3.5',
                            hpp_lingtong: '#b捞德一评级:3.8',
                            hpp_liubiao: '#b捞德一评级:3.5',
                            hpp_liubei: '#b捞德一评级:3.8',
                            hpp_liufeng: '#b捞德一评级:3.5',
                            hpp_liushan: '#g捞德一评级:2.8',
                            hpp_liuxie: '#b捞德一评级:3.2',
                            hpp_liuyan: '#b捞德一评级:3.7',
                            hpp_liyan: '#b捞德一评级:3.1',
                            hpp_luji: '#g捞德一评级:2.1',
                            hpp_lukang: '#b捞德一评级"3.9',
                            hpp_lusu: '#g捞德一评级:2.4',
                            hpp_luxun: '捞德一评级:1.4',
                            hpp_luyusheng: '#r捞德一评级:4.0',
                            hpp_lvbu: '#g捞德一评级:2.0',
                            hpp_lvlingqi: '#r捞德一评级:4.4',
                            hpp_lvmeng: '#g捞德一评级:2.6',
                            // M
                            hpp_machao: '#b捞德一评级:3.7',
                            hpp_madai: '#g捞德一评级:2.4',
                            hpp_masu: '#b捞德一评级:3.8',
                            hpp_mayunlu: '#b捞德一评级:3.5',
                            hpp_menghuo: '#g捞德一评级:2.7',
                            // P
                            hpp_panfeng: '#b捞德一评级:3.7',
                            hpp_pangde: '#b捞德一评级:3.7',
                            hpp_pangtong: '#g捞德一评级:2.4',
                            // Q
                            hpp_quyi: '#b捞德一评级:3.9',
                            // S
                            hpp_shamoke: '#b捞德一评级:3.5',
                            hpp_simayi: '#r捞德一评级:4.3',
                            hpp_sunce: '#b捞德一评级:3.7',
                            hpp_sunhao: '#b捞德一评级:3.8',
                            hpp_sunjian: '#b捞德一评级:3.7',
                            hpp_sunliang: '#b捞德一评级:3.6',
                            hpp_sunluban: '#b捞德一评级:3.5',
                            hpp_sunluyu: '#b捞德一评级:3.7',
                            hpp_sunquan: '#b捞德一评级:3.8',
                            hpp_sunshangxiang: '#b捞德一评级:3.5',
                            // T
                            hpp_taishici: '#b捞德一评级:3.5',
                            // W
                            hpp_wangping: '#b捞德一评级:3.6',
                            hpp_weiyan: '#b捞德一评级:3.0',
                            hpp_wangyi: '#g捞德一评级:2.2',
                            hpp_wuyi: '#g捞德一评级:2.7',
                            // X
                            hpp_xiahouba: '#b捞德一评级:3.4',
                            hpp_xiahoudun: '#g捞德一评级:2.3',
                            hpp_xiahoulingnv: '#b捞德一评级:3.8',
                            hpp_xiahouyuan: '#g捞德一评级:2.4',
                            hpp_xiaoqiao: '#g捞德一评级:2.2',
                            hpp_xinxianying: '#b捞德一评级:3.7',
                            hpp_xuhuang: '#b捞德一评级:3.7',
                            hpp_xunyu: '#b捞德一评级:3.2',
                            hpp_xurong: '#b捞德一评级:3.0',
                            hpp_xusheng: '#g捞德一评级:2.6',
                            hpp_xushi: '#r捞德一评级:4.5',
                            hpp_xuyou: '#b捞德一评级:3.3',
                            hpp_xuzhu: '#g捞德一评级:2.8',
                            // Y
                            hpp_yanliangwenchou: '#g捞德一评级:2.5',
                            hpp_yanyan: '#b捞德一评级:3.6',
                            hpp_yuanshao: '#b捞德一评级:3.8',
                            hpp_yuanshu: '#g捞德一评级:2.4',
                            hpp_yuji: '#b捞德一评级:3.1',
                            hpp_yujin: '#b捞德一评级:2.8',
                            // Z
                            hpp_zhangchunhua: '#g捞德一评级:2.4',
                            hpp_zhangfei: '#b捞德一评级:3.5',
                            hpp_zhanghe: '#b捞德一评级:3.4',
                            hpp_zhangjiao: '#b捞德一评级:3.9',
                            hpp_zhangliao: '#b捞德一评级:3.7',
                            hpp_zhangsong: '#b捞德一评级:3.2',
                            hpp_zhangxingcai: '#b捞德一评级:3.0',
                            hpp_zhangxiu: '#b捞德一评级:3.0',
                            hpp_zhangzhaozhanghong: '#g捞德一评级:2.8',
                            hpp_zhaoxiang: '#r捞德一评级:4.2',
                            hpp_zhaoyun: '#b捞德一评级:3.7',
                            hpp_zhenji: '#g捞德一评级:2.7',
                            hpp_zhonghui: '#b捞德一评级:3.7',
                            hpp_zhongyao: '#g捞德一评级:2.7',
                            hpp_zhouyu: '#b捞德一评级:3.2',
                            hpp_zhugeguo: '#b捞德一评级:3.6',
                            hpp_zhugeke: '#b捞德一评级:3.7',
                            hpp_zhugeliang: '#b捞德一评级:3.2',
                            hpp_zhugezhan: '#g捞德一评级:2.6',
                            hpp_zhuhuan: '#b捞德一评级:3.5',
                            hpp_zhuran: '#b捞德一评级:3.7',
                            hpp_zhuzhi: '#b捞德一评级:3.6',
                            hpp_zumao: '#b捞德一评级:3.8',
                            hpp_zuoci: '#b捞德一评级:3.4',
                            // SP
                            hpp_sp_caiwenji: '#r捞德一评级:4.0',
                            hpp_sp_daqiao: '#r捞德一评级:4.0',
                            hpp_sp_diaochan: '#b捞德一评级:3.6',
                            hpp_sp_jiangwei: '#b捞德一评级:3.5',
                            hpp_sp_machao: '#b捞德一评级:3.8',
                            hpp_sp_pangde: '#b捞德一评级:3.1',
                            hpp_sp_pangtong: '#b捞德一评级:3.8',
                            hpp_sp_sunshangxiang: '#b捞德一评级:3.8',
                            hpp_sp_taishici: '#r捞德一评级:4.1',
                            hpp_sp_xiaoqiao: '#b捞德一评级:3.8',
                            hpp_sp_zhaoyun: '#g捞德一评级:2.6',
                            // 神
                            hpp_shen_caocao: '#r捞德一评级:4.4',
                            hpp_shen_guojia: '#r捞德一评级:4.1',
                            hpp_shen_luxun: '#r捞德一评级:4.0',
                            hpp_shen_lvbu: '#r捞德一评级:4.0',
                            hpp_shen_lvmeng: '#r捞德一评级:4.0',
                            hpp_shen_zhaoyun: '#r捞德一评级:4.2',
                            hpp_shen_zhangjiao: '#r捞德一评级:4.7',
                            hpp_shen_zhugeliang: '#r捞德一评级:4.0',
                            // 斗地主
                            hpp_sunwukong: '#r地主专属' + '<br/>' + '捞德一评级:4.2',
                        },
                        translate: {
                            phaseZhunber: '准备阶段',
                            phaseJudge: '判定阶段',
                            phaseDraw: '摸牌阶段',
                            phaseUse: '出牌阶段',
                            phaseDiscard: '弃牌阶段',
                            phaseJieshu: '结束阶段',
                            // 牌
                            hpp_yanxiao_card: '言笑',
                            hpp_yanxiao_card_info: '判定阶段开始时，获得此牌和判定区内的所有牌。',
                            hpp_lingren_basic: ' ',
                            hpp_lingren_trick: ' ',
                            hpp_lingren_equip: ' ',

                            // B
                            hpp_bulianshi: '步练师',
                            hpp_anxu: '安恤',
                            hpp_anxu_info: '出牌阶段开始和结束时，你可以获得手牌数最多的其他角色一张手牌。若你获得的牌是黑桃，该角色摸一张牌。',
                            // C
                            hpp_caiwenji: '蔡文姬',
                            hpp_beige: '悲歌',
                            hpp_beige_info: '当一名角色受到【杀】造成的伤害后，你可以弃置一张牌，若弃置的牌为：红色，令其回复1点体力，并摸两张牌；黑桃，伤害来源翻面；梅花，伤害来源弃置2张牌。',
                            hpp_caoang: '曹昂',
                            hpp_kangkai: '慷忾',
                            hpp_kangkai_info: '锁定技，当一名角色成为【杀】的目标后，若你与其距离1以内，则你摸一张牌。然后可以交给其一张牌并展示之（每回合限两次）。若此牌为装备牌，该角色可以使用此牌。',
                            hpp_caocao: '曹操',
                            hpp_jianxiong: '奸雄',
                            hpp_jianxiong_info: '当你受到1点伤害时，你可以摸一张牌，并获得对你造成伤害的牌；或摸两张牌。',
                            hpp_hujia: '护驾',
                            hpp_hujia_info: '主公技，其他魏势力角色可以替你使用或打出【闪】。其他魏势力角色若以此法使用或打出【闪】时，可令你摸一张牌，每回合限一张。',
                            hpp_caochong: '曹冲',
                            hpp_chengxiang: '称象',
                            hpp_chengxiang_info: '锁定技，当你受到伤害后，你可以亮出牌堆顶的四张牌。然后获得其中任意张点数之和小于等于13的牌。',
                            hpp_caopi: '曹丕',
                            hpp_xingshang: '行殇',
                            hpp_xingshang_info: '当其他角色死亡时，你可以获得其所有牌并摸一张牌。',
                            hpp_fangzhu: '放逐',
                            hpp_fangzhu_info: '你受到伤害后，你可以令一名其他角色翻面，然后该角色摸一张牌。',
                            hpp_caoren: '曹仁',
                            hpp_jushou: '据守',
                            hpp_jushou_info: '结束阶段，你可以翻面，若如此做，你摸四张牌，然后你可以使用一张装备牌。',
                            hpp_caorui: '曹叡',
                            hpp_mingjian: '明鉴',
                            hpp_mingjian2: '明鉴',
                            hpp_mingjian_info: '出牌阶段限一次，你可以将任意张手牌交给一名其他角色，然后该角色下回合的手牌上限+1，且出牌阶段内可以多使用一张【杀】。',
                            hpp_xingshuai: '兴衰',
                            hpp_xingshuai_info: '主公技，限定技，当你进入濒死状态时，你可令其他魏势力角色依次选择是否令你回复1点体力。选择是的角色在此次濒死结算结束后受到1点伤害并摸一张牌。',
                            hpp_caoxiu: '曹休',
                            hpp_qingxi: '倾袭',
                            hpp_qingxi_info: '当你使用【杀】或【决斗】指定目标后，你可令其选择一项：1.弃置等同你攻击范围内的人数张手牌（最多为二，若你装备区有武器牌，则改为最多为四），然后弃置你的此武器牌；2.令此牌对其伤害+1且进行一次判定，若结果为红色，此牌不能被该角色响应，若结果为黑色，你摸2张牌。',
                            hpp_caoying: '曹婴',
                            hpp_lingren: '凌人',
                            hpp_lingren_info: '出牌阶段限一次，当你使用【杀】或伤害类锦囊牌指定其他角色为目标后，你可以猜测其中一个目标的手牌是否有基本牌、锦囊牌或装备牌。至少猜对一项则此牌对其伤害+1；至少猜对两项则你摸两张牌；猜对三项则你获得“奸雄”和“行殇”直到你下回合开始。',
                            hpp_fujian: '伏间',
                            hpp_fujian_info: '锁定技，结束阶段，你随机观看一名其他角色的一张手牌。',
                            hpp_caozhang: '曹彰',
                            hpp_jiangchi: '将驰',
                            hpp_jiangchi_info: '出牌阶段开始时，你可以选择一项：1.摸三张牌，本回合不能使用或打出【杀】，且本回合手牌上限+2；2.摸一张牌，然后直到你的下一回合开始，你受到伤害时摸一张牌；3.本回合使用【杀】无距离限制且可以多使用一张【杀】。',
                            hpp_caozhen: '曹真',
                            hpp_sidi: '司敌',
                            hpp_sidi_info: '结束阶段，你可以将至多两张非基本牌置于武将牌上，称为“司”。其他角色的出牌阶段开始时，你可以移去一张“司”。然后该角色此阶段内不能使用或打出与“司”颜色相同的牌。此阶段结束时，若其没有使用【杀】，视为对其使用一张【杀】；若其没有使用锦囊牌，你摸两张牌。',
                            hpp_caozhi: '曹植',
                            hpp_luoying: '落英',
                            hpp_luoying_discard: '落英',
                            hpp_luoying_judge: '落英',
                            hpp_luoying_info: '每当其他角色的梅花牌因弃置或判定而置入弃牌堆时，你可以获得之；弃牌阶段，你的梅花牌不计入手牌上限。',
                            hpp_jiushi: '酒诗',
                            hpp_jiushi1: '酒诗',
                            hpp_jiushi3: '酒诗',
                            hpp_jiushi_info: '你可以将武将牌从正面翻至背面，视为使用一张【酒】；当你受到伤害后，你可以从背面翻至正面；当你翻面时，你获得牌堆中的一张随机锦囊牌。',
                            hpp_chendao: '陈到',
                            hpp_wanglie: '往烈',
                            hpp_wanglie2: '往烈',
                            hpp_wanglie_info: '出牌阶段，你使用的牌无距离限制。当你于出牌阶段内使用一张牌时，你可令此牌不能被响应，回合结束时，你摸X张牌，X为此牌造成的伤害数，若如此做，本回合你不能再使用牌。',
                            hpp_chengpu: '程普',
                            hpp_lihuo: '疠火',
                            hpp_lihuo_info: '当你使用普通【杀】可以改为火【杀】，若此【杀】造成的伤害大于1，你失去1点体力；你使用火【杀】可以多选择一个目标；每回合你的火【杀】首次造成伤害后，摸一张牌。',
                            hpp_chunlao: '醇醪',
                            hpp_chunlao2: '醇醪',
                            hpp_chunlao_info: '结束阶段，若你没有“醇”，你可以将任意张【杀】置于武将牌上，称为“醇”；当一名角色处于濒死状态时，你可以移去一张“醇”，视为该角色使用一张【酒】。若移去的“醇”为红色，则你回复1点体力；若移去的“醇”为黑色，你摸两张牌。',
                            hpp_chunyuqiong: '淳于琼',
                            // D
                            hpp_daqiao: '大乔',
                            hpp_wanrong: '婉容',
                            hpp_wanrong_info: '出牌阶段限一次，你可以将一张方块牌当“乐不思蜀”使用，或者弃一张方片花色牌并弃置场上的一张“乐不思蜀”。',
                            // hpp_guose: '国色',
                            // hpp_guose_info: '当你使用或弃置方块牌时，摸1张牌。',
                            hpp_guose: '国色',
                            hpp_guose_info: '锁定技，当你失去方块牌时，摸1张牌。',
                            hpp_liuli: '流离',
                            hpp_liuli_info: '你被【杀】时，可以弃一张牌转移给你攻击范围内的一名其他角色。',
                            hpp_dengai: '邓艾',
                            hpp_tuntian: '屯田',
                            hpp_tuntian_info: '当你于回合外失去牌后，你可以进行判定，若结果不为红桃，将判定牌置于你的武将牌上，称为“田”；回合结束时，你可以弃置一张手牌并进行一次“田”的判定；你计算与其他角色的距离-X（X为“田”的数量）。',
                            hpp_dianwei: '典韦',
                            hpp_qiangxi: '强袭',
                            hpp_qiangxi_info: '出牌阶段，你可以失去1点体力，并摸1张牌，然后对攻击范围的一名其他角色造成1点伤害（每名角色限一次）；每当其他角色受到伤害时，你可以弃置一张装备牌，然后本次伤害值+1。',
                            hpp_diaochan: '貂蝉',
                            hpp_lijian: '离间',
                            hpp_lijian_info: '出牌阶段限两次，你可以弃置1张牌并选择两名角色，然后令其中一名角色视为对另一名角色使用一张【决斗】（不可被【无懈可击】响应），因该【决斗】失败的角色本回合无法再成为“离间”的目标。',
                            hpp_biyue: '闭月',
                            hpp_biyue_info: '结束阶段开始时，你摸X张牌（X为本回合你发动“离间”的次数+1）。',
                            hpp_dongbai: '董白',
                            hpp_lianzhu: '连诛',
                            hpp_lianzhu_info: '出牌阶段限一次，你可以展示并交给一名其他角色一张牌，若此牌为红色，你选择一项：1、你摸两张牌；2、你回复1点体力；若此牌为黑色，其选择一项：1.你摸两张牌；2.弃置两张牌。',
                            hpp_xiahui: '黠慧',
                            hpp_xiahui_info: '锁定技，你的黑色牌不占用手牌上限；其他角色获得你的黑色牌时，这些牌标记为“黠慧”，其不能使用、打出、弃置“黠慧”牌，其体力值减少时，“黠慧”标记消失；其他角色的回合结束时，若其本回合失去过“黠慧”牌，其失去1点体力。',
                            hpp_dongyun: '董允',
                            hpp_bingzheng: '秉正',
                            hpp_bingzheng_info: '出牌阶段结束时，你可以令一名角色弃置一张手牌或摸一张牌。然后若其手牌数等于体力值，你摸一张牌，且可以交给该角色一张牌。',
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
                            hpp_dufuren: '杜夫人',
                            hpp_yise: '异色',
                            hpp_yise_info: '其他角色获得你的牌后，若此牌为红色，你可摸一张牌或令其回复1点体力；若此牌为黑色，你可令其下次受到【杀】的伤害时，此伤害+1。',
                            hpp_shunshi: '顺世',
                            hpp_shunshi_info: '准备阶段或当你于回合外受到伤害后，你可交给一名其他角色一张牌。如若此做，你获得以下效果：下个摸牌阶段摸牌数+1、下个出牌阶段使用【杀】次数+1且无视防具、下个弃牌阶段手牌上限+1。',
                            // F
                            hpp_fuhuanghou: '伏皇后',
                            hpp_zhuikong: '惴恐',
                            hpp_zhuikong_info: '其他角色的回合开始时，你可以与其拼点：若你赢，本回合该角色只能对自己使用牌；若你没赢，本回合其与你的距离视为1。',
                            hpp_qiuyuan: '求援',
                            hpp_qiuyuan_info: '当你成为【杀】的目标时，你可以令出杀者以外至多3名其他角色，每人交给你一张【闪】，否则也成为此【杀】的目标，并弃置一张牌。',
                            // G
                            hpp_ganning: '甘宁',
                            hpp_qixi: '奇袭',
                            hpp_qixi_info: '出牌阶段开始时，可以选择一名角色，弃置其一张牌。出牌阶段，你可以将一张黑色牌当【过河拆桥】使用。',
                            hpp_fenwei: '奋威',
                            hpp_fenwei_info: '限定技，当一张锦囊牌指定多个目标后，你可以令此牌对其中任意个目标无效，并摸一张牌，当你失去最后一张手牌时，重置本技能。',
                            hpp_gaoshun: '高顺',
                            hpp_xianzhen: '陷阵',
                            hpp_xianzhen_info: '锁定技。回合内使用杀首次造成伤害时伤害+1，且每回合第一张杀被闪后摸一张牌。',
                            hpp_jinjiu: '禁酒',
                            hpp_jinjiu_info: '锁定技，你的【酒】全部视为杀，且不计入【杀】的使用次数，其他角色使用酒结算后，你获得之；你的回合内，其他人不能使用【酒】。',
                            hpp_gongsunzan: '公孙瓒',
                            hpp_yicong: '义从',
                            hpp_yicong_info: '锁定技，你计算与其他角色的距离-X（X为你的体力值）；其他角色计算与你的距离+Y（Y为你的已损失的体力值）。',
                            hpp_qiaomeng: '趫猛',
                            hpp_qiaomeng_info: '当你使用【杀】对一名角色造成伤害后，你可以获得其区域内的1张牌。若此牌为坐骑牌，则此伤害+1。',
                            hpp_guanping: '关平',
                            hpp_longyin: '龙吟',
                            hpp_longyin_info: '当一名角色于其出牌阶段使用【杀】时，你可弃置一张牌，令此【杀】不计入出牌阶段的使用次数，然后若此【杀】为红色，你摸一张牌。若你弃置的牌与此【杀】花色相同，“竭忠”视为未发动过。',
                            hpp_guanyinping: '关银屏',
                            hpp_xuehen: '雪恨',
                            hpp_xuehen_info: '出牌阶段限一次，你可以弃置一张红色牌，然后横置至多X名角色，并对其中一名角色造成1点火焰伤害（X为你已损的体力值数且至少为1）。',
                            hpp_huxiao: '虎啸',
                            hpp_huxiao2: '虎啸',
                            hpp_huxiao_info: '锁定技，当你对一名角色造成火焰伤害后，本回合你对其使用牌没有次数限制。',
                            hpp_wuji: '武继',
                            hpp_wuji_info: '觉醒技，结束阶段，若你本回合造成了3点或更多伤害，你加1点体力上限并回复1点体力，然后获得【青龙偃月刀】。',
                            hpp_guanyu: '关羽',
                            hpp_wusheng: '武圣',
                            hpp_wusheng_info: '回合开始时，你获得一张红色【杀】。你的红色【杀】伤害+1。',
                            hpp_guohuai: '郭淮',
                            hpp_jingce: '精策',
                            hpp_jingce_info: '结束阶段开始时，你可以摸X张牌（X为本回合你出牌的花色数+1，至多为3）。',
                            hpp_guohuanghou: '郭皇后',
                            hpp_jiaozhao: '矫诏',
                            hpp_jiaozhao_1: '矫诏牌',
                            hpp_jiaozhao_info: '出牌阶段限一次，你可以展示一张手牌并声明一种基本牌或普通锦囊牌，本回合你可将此牌当声明的牌使用（不能对自己使用）。',
                            hpp_jiaozhao_2: '矫诏·2级',
                            hpp_jiaozhao_2_info: '出牌阶段，你可以展示一张手牌并声明一种基本牌或普通锦囊牌，本回合你可将此牌当声明的牌使用（每个类型的牌限一次，不能对自己使用）。',
                            hpp_jiaozhao_3: '矫诏·3级',
                            hpp_jiaozhao_3_info: '出牌阶段限，你可以展示一张手牌并声明一种基本牌或普通锦囊牌，本回合你可将此牌当声明的牌使用（每种牌名限一次，每回合限3次）。',
                            hpp_danxin: '殚心',
                            hpp_danxin_info: '当你受到伤害后，你可以摸一张牌，然后修改“矫诏”。',
                            hpp_guojia: '郭嘉',
                            hpp_tiandu: '天妒',
                            hpp_tiandu_info: '当你的判定牌生效后，你可以获得此牌。',
                            hpp_yiji: '遗计',
                            hpp_yiji_info: '当你受到1点伤害后，你可以观看牌堆顶的两张牌，然后交给任意角色。',
                            // H
                            hpp_handang: '韩当',
                            hpp_haozhao: '郝昭',
                            hpp_huaman: '花鬘',
                            hpp_souying: '薮影',
                            hpp_souying_info: '每回合限一次，当你对其他角色（或其他角色对你）使用牌指定唯一目标后，你可以弃置一张牌，将此牌结算后收回手牌（或令此牌对你无效）。',
                            hpp_zhanyuan: '战缘',
                            hpp_zhanyuan_info: '觉醒技，你的回合内，若你因“蛮嗣”累计获得超过七张牌，你可以选择一名其他角色，你与其获得技能“系力”，然后你失去技能“蛮嗣”。',
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
                            hpp_jiangwei: '姜维',
                            hpp_tiaoxin: '挑衅',
                            hpp_tiaoxin_info: '出牌阶段开始时，你可以弃置一名其他角色至多两张手牌。若其中有【杀】，则你需弃置一张牌。',
                            hpp_zhiji: '志继',
                            hpp_zhiji_info: '觉醒技，准备阶段，若你没有手牌，你回复1点体力或摸两张牌，然后减1点体力上限，获得“观星”。',
                            hpp_jiaxu: '贾诩',
                            hpp_wansha: '完杀',
                            hpp_wansha_info: '锁定技，你的回合内，只有你才能使用【桃】。',
                            // L
                            hpp_liaohua: '廖化',
                            hpp_dangxian: '当先',
                            hpp_dangxian_info: '回合开始时你进行一个额外的出牌阶段并摸一张【杀】。',
                            hpp_fuli: '伏枥',
                            hpp_fuli_info: '限定技，当你处于濒死状态时，你可以将体力回复至X点且手牌摸至X张（X为全场势力数），然后若X大于3，你翻面。',
                            hpp_lidian: '李典',
                            hpp_xunxun: '恂恂',
                            hpp_xunxun_info: '摸牌阶段开始时，你可以观看牌堆顶的四张牌，然后将其中的两张牌置于牌堆顶，将其余的牌置于牌堆底，回合结束阶段，你获得牌堆底的两张牌。',
                            hpp_lijue: '李傕',
                            hpp_lingtong: '凌统',
                            hpp_xuanfeng: '旋风',
                            hpp_xuanfeng_info: '当你于弃牌阶段弃置过至少两张牌，或当你失去装备区里的牌后，你可以弃置至多两名其他角色的共计两张牌。然后若此时是你的回合内，你可以对其中一名角色造成1点伤害。',
                            hpp_yongjin: '勇进',
                            hpp_yongjin_info: '限定技，出牌阶段，你可以移动场上的至多三张装备牌。',
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
                            hpp_liufeng: '刘封',
                            hpp_xiansi: '陷嗣',
                            hpp_xiansi_info: '准备阶段开始时，你可以弃置至多两名其他角色区域内的各一张牌。弃置了装备区的牌，且你在其攻击范围内，视为目标对你使用一张【杀】；若陷嗣只弃置一张牌，则你摸一张牌。',
                            hpp_liushan: '刘禅',
                            hpp_fangquan: '放权',
                            hpp_fangquan_info: '你可以跳过出牌阶段，然后此回合结束时，令一名其他角色获得一个额外的回合。',
                            hpp_ruoyu: '若愚',
                            hpp_ruoyu_info: '主公技，觉醒技。准备阶段，若你是体力值最小的角色，你加1点体力上限，回复1点体力，然后获得“激将”。',
                            hpp_liuxie: '刘协',
                            hpp_tianming: '天命',
                            hpp_tianming_info: '当你成为【杀】的目标后，你可以先弃置两张牌再摸两张牌。然后你可以选择一名角色也如此做。',
                            hpp_mizhao: '密诏',
                            hpp_mizhao_info: '出牌阶段限一次，你可以将任意张手牌交给一名其他角色，然后令该角色与另一名角色拼点，拼点赢的角色视为对拼点没赢的角色使用一张【杀】。',
                            hpp_liuyan: '刘焉',
                            hpp_liyan: '李严',
                            hpp_duliang: '督粮',
                            hpp_duliang2: '督粮',
                            hpp_duliang_info: '出牌阶段限一次，你可以获得一名其他角色的一张手牌，然后选择一项：1.令其观看牌堆顶的两张牌，然后获得其中的基本牌和装备牌；2.令其于下个摸牌阶段额外摸一张牌，并从中选一张牌交给你。',
                            hpp_luji: '陆绩',
                            hpp_lukang: '陆抗',
                            hpp_jueyan: '决堰',
                            hpp_jueyan_info: '出牌阶段限一次，你可以废除你装备区里的一种装备栏，然后执行对应的一项：武器栏，本回合你可以多使用三张【杀】；防具栏，摸三张牌，本回合手牌上限+3；2个坐骑栏，回复1点体力，本回合获得技能“集智”，且你使用牌无距离限制。',
                            hpp_huairou: '怀柔',
                            hpp_huairou_info: '出牌阶段，你可以重铸已废除装备栏对应的装备牌，重铸为一张指定的基本牌或锦囊牌（每个牌名每回合限1次）。',
                            hpp_lusu: '鲁肃',
                            hpp_haoshi: '好施',
                            hpp_haoshi_info: '摸牌阶段，你可以多摸两张牌，然后若你的手牌数大于5，则你将一半的手牌交给手牌最少的一名其他角色或弃置。',
                            hpp_dimeng: '缔盟',
                            hpp_dimeng_info: '出牌阶段限一次，你可以选择两名其他角色并弃置X张牌（X为这两名角色手牌数的差），然后令这两名角色交换手牌。',
                            hpp_luxun: '陆逊',
                            hpp_qianxun: '谦逊',
                            hpp_qianxun_info: '锁定技，当你成为锦囊的唯一目标时，你摸一张牌，然后可以将一张手牌交给其他角色。',
                            hpp_luyusheng: '陆郁生',
                            hpp_zhente: '贞特',
                            hpp_zhente_info: '当你成为其他角色使用基本牌或普通锦囊牌的目标后，你可令使用者选择一项：1.本回合不能再使用此颜色的牌；2.此牌对你无效。 ',
                            hpp_zhiwei: '至微',
                            hpp_zhiwei2: '至微',
                            hpp_zhiwei_info: '游戏开始时，你选择一名其他角色。该角色造成伤害后，你摸一张牌，该角色受到伤害后，你可以给予其一张手牌。你弃牌阶段弃置的牌可以给予该角色。若场上没有“至微”角色，则你在准备阶段可重新选择一名其他角色。',
                            hpp_lvbu: '吕布',
                            hpp_lvlingqi: '吕玲绮',
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
                            hpp_madai: '马岱',
                            hpp_qianxi: '潜袭',
                            hpp_qianxi2: '潜袭',
                            hpp_qianxi_info: '准备阶段，你可以摸两张牌。并弃置其中一张牌，然后令距离为1的一名角色本回合不能使用或打出与你弃置牌颜色相同的手牌。',
                            hpp_masu: '马谡',
                            hpp_sanyao: '散谣',
                            hpp_sanyao_info: '出牌阶段限一次，你可以弃置X张牌（X最多为4），然后对等量其他角色造成1点伤害。',
                            hpp_mayunlu: '马云騄',
                            hpp_fengpo: '凤魄',
                            hpp_fengpo_info: '你在回合内使用第一张【杀】或【决斗】指定一个目标后，你可以选择一项：1.摸X张牌；2.此牌造成的伤害+X。（X为其红色手牌数且最大为4）',
                            hpp_menghuo: '孟获',
                            hpp_huoshou: '祸首',
                            hpp_huoshou_info: '锁定技，【南蛮入侵】对你无效；当其他角色使用【南蛮入侵】指定目标后，你代替其成为此牌造成的伤害来源，摸一张牌。',
                            // P
                            hpp_panfeng: '潘凤',
                            hpp_kuangfu: '狂斧',
                            hpp_kuangfu_info: '出牌阶段限一次，你可以弃置场上一张装备牌，然后视为使用一张【杀】（不计入次数，无视距离）。若此【杀】造成了伤害，你摸两张牌。',
                            hpp_pangde: '庞德',
                            hpp_jianchu: '鞬出',
                            hpp_jianchu_info: '当你使用【杀】指定一个目标后，你弃置其一张牌，若以此法被弃置的牌：不为基本牌，你摸一张牌，且该角色不能使用【闪】；为基本牌，此杀不计入出杀次数。',
                            hpp_pangtong: '庞统',
                            hpp_lianhuan: '连环',
                            hpp_lianhuan_info: '出牌阶段开始时，你可以选择最多2名角色横置或重置，如果选择自己，你额外摸一张牌。',
                            hpp_niepan: '涅槃',
                            hpp_niepan_info: '限定技，当你处于濒死状态时，你可以弃置你的区域里的所有牌，然后复原你的武将牌，摸三张牌，将体力回复至3点。',
                            // Q
                            hpp_quyi: '麴义',
                            hpp_fuqi: '伏骑',
                            hpp_fuqi_info: '锁定技，与你距离为2以内的其他角色不能使用或打出牌响应你使用的牌；且被你造成伤害的其他角色的非锁定技失效，到其他角色的回合内解除。',
                            hpp_jiaozi: '骄恣',
                            hpp_jiaozi_info: '锁定技，当你造成伤害时，若你的手牌数为全场最多，则此伤害+1。',
                            // S
                            hpp_shamoke: '沙摩柯',
                            hpp_jili: '蒺藜',
                            hpp_jili_info: '当你于一回合内使用或打出第X张牌时，你可以摸X张牌（X为你的攻击范围）。你的回合结束时，你可以弃一张牌然后摸一张牌。',
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
                            hpp_sunhao: '孙皓',
                            hpp_canshi: '残蚀',
                            hpp_canshi2: '残蚀',
                            hpp_canshi_info: '摸牌阶段，你可以额外摸X张牌（X为已受伤的角色数），然后本回合你使用【杀】时，弃置一张牌。',
                            hpp_chouhai: '仇海',
                            hpp_chouhai_info: '锁定技，当你受到【杀】的伤害时，若你没有手牌和装备，此伤害+1。',
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
                            hpp_sunluban: '孙鲁班',
                            hpp_zenhui: '谮毁',
                            hpp_zenhui_info: '出牌阶段限一次，当你使用【杀】或普通锦囊牌指定唯一目标时，你可令其选择一项：1.交给你一张牌；2.失去1点体力。',
                            hpp_jiaojin: '骄矜',
                            hpp_jiaojin_info: '当你成为【杀】或普通锦囊牌的目标后，你可以弃置一张手牌，然后此牌对你无效。',
                            hpp_sunluyu: '孙鲁育',
                            hpp_meibu: '魅步',
                            hpp_meibu_info: '其他角色的出牌阶段开始时，你可以弃置一张牌，令该角色于本回合内拥有“止息”。你获得其因“止息”弃置的牌。',
                            hpp_sunquan: '孙权',
                            hpp_zhiheng: '制衡',
                            hpp_zhiheng_info: '出牌阶段限一次，你可以弃置任意张牌，然后摸等量的牌。若你以此法弃置了所有的手牌，则额外摸一张牌；若你以此法获得的牌不包含延时锦牌，则本同合此技能使用次数+1；若你本回合第二次以此法获得的牌全是基本牌，则本回合此技能使用次数再+1。',
                            hpp_jiuyuan: '救援',
                            hpp_jiuyuan_info: '主公技，其他吴势力角色于其回合内回复体力时，该角色可以改为令你回复1点体力，然后其摸一张牌。当你处于濒死状态时，其他吴势力武将对你使用的【桃】回复的体力+1。',
                            hpp_sunshangxiang: '孙尚香',
                            hpp_jieyi: '结谊',
                            hpp_jieyi_info: '出牌阶段限一次，选择一名其他角色，给予一张手牌或将一张装备牌置入其装备区，然后自己回复1点体力，并摸一张牌，若其体力小于你，你可令其回复1点体力；反之，可令其摸一张牌。',
                            // T
                            hpp_taishici: '太史慈',
                            hpp_tianyi: '天义',
                            hpp_tianyi_info: '出牌阶段开始时，你可以选择一项效果发动：1、本回合出杀次数+1，杀造成伤害后回复1点体力；2、摸一张牌，本回合杀无距离限制且无视防具。',
                            // W
                            hpp_wangping: '王平',
                            hpp_feijun: '飞军',
                            hpp_feijun_info: '出牌阶段限一次，你可以弃置一张牌，然后选择一项：令一名其他角色交给你一张牌；或令一名其他角色弃置一张装备区的牌。',
                            hpp_binglue: '兵略',
                            hpp_binglue_info: '锁定技，当你发动“飞军”时，摸1张牌，若目标与你之前指定的目标均不相同，则你再摸X张牌（X为场上成为过你发动“飞军”目标的存活角色数）。',
                            hpp_weiyan: '魏延',
                            hpp_kuanggu: '狂骨',
                            hpp_kuanggu_info: '当你对一名角色造成1点伤害后，你可以回复1点体力或摸一张牌。',
                            hpp_qimou: '奇谋',
                            hpp_qimou_info: '限定技，出牌阶段，你可以失去任意点体力，摸1张牌，然后本回合你计算与其他角色的距离-X且你可以多使用X张【杀】（X为你以此法失去的体力数）。',
                            hpp_wangyi: '王异',
                            hpp_zhenlie: '贞烈',
                            hpp_zhenlie_info: '当你成为【杀】或普通锦囊的目标后，你可以失去1点体力使此牌对你无效，然后你弃置使用者一张牌。',
                            hpp_miji: '秘计',
                            hpp_miji_info: '结束阶段，你可以摸X张牌（X为你已损失的体力值），然后你可以将等量的手牌交给其他角色。',
                            hpp_wuyi: '吴懿',
                            // X
                            hpp_xiahouba: '夏侯霸',
                            hpp_baobian: '豹变',
                            hpp_baobian_info: '锁定技，当你受到伤害后，你依次获得以下一个技能：“挑衅”、“咆哮”、“神速”。',
                            hpp_xiahoudun: '夏侯惇',
                            hpp_qingjian: '清俭',
                            hpp_qingjian_info: '每回合限一次，当你于摸牌阶段外获得牌后，你可以展示任意张牌并交给一名其他角色，然后你摸一张牌。',
                            hpp_xiahoulingnv: '夏侯令女',
                            hpp_weilie: '炜烈',
                            hpp_weilie_info: '每局游戏限一次，出牌阶段，你可以弃置一张牌令一名角色回复1点体力，摸一张牌。你每次发动“浮萍”记录牌名时，此技能使用次数+1。',
                            hpp_xiahouyuan: '夏侯渊',
                            hpp_shensu: '神速',
                            hpp_shensu_info: '你可以选择至多三项：1.跳过判定阶段和摸牌阶段；2.跳过出牌阶段；3.跳过弃牌阶段并翻面。你每选择一项，视为你使用一张无距离限制的【杀】。',
                            hpp_xiaoqiao: '小乔',
                            hpp_tianxiang: '天香',
                            hpp_tianxiang2: '天香',
                            hpp_tianxiang_info: '当你受到伤害时，可以弃置一张红桃手牌，选择一名角色代替你承受此伤害，若如此做，你选择一项：1.其摸一张牌；2.令其摸X张牌（X为其损失的体力值且至多为5）。',
                            hpp_hongyan: '红颜',
                            hpp_hongyan_info: '锁定技，你的黑桃牌视为红桃牌，若你的装备区有红桃牌，你的手牌上限等于体力上限。',
                            hpp_xinxianying: '辛宪英',
                            hpp_zhongjian: '忠鉴',
                            hpp_zhongjian_info: '出牌阶段限一次，你可以选择一名没有忠鉴的角色并选择一项：1.该角色下次造成伤害后，其弃置两张牌；2.该角色下次受到伤害后，该角色摸两张牌。忠鉴触发后角色身上的忠鉴效果消失且你摸一张牌。',
                            hpp_caishi: '才识',
                            hpp_caishi_info: '摸牌阶段结束时，若你此阶段的牌花色相同，则“忠鉴”改为“出牌阶段限两次”，但不能选择相同的角色；若花色不同，你可以弃置1张牌回复1点体力。',
                            hpp_xuhuang: '徐晃',
                            hpp_duanliang: '断粮',
                            hpp_duanliang1: '断粮',
                            hpp_duanliang_info: '你可以将一张黑色的基本牌或装备牌当【兵粮寸断】使用；你对手牌数大于等于你的角色使用【兵粮寸断】无距离限制。',
                            hpp_jiezi: '截辎',
                            hpp_jiezi_info: '锁定技，每轮限两次，一名其他角色跳过摸牌阶段后，你摸两张牌。',
                            hpp_xunyu: '荀彧',
                            hpp_quhu: '驱虎',
                            hpp_quhu_backup: '驱虎',
                            hpp_quhu_info: '出牌阶段限一次，你可以选择一项：1、弃置两张手牌，对一名其他角色造成1点伤害；2、对自己造成1点伤害，摸一张牌。',
                            hpp_jieming: '节命',
                            hpp_jieming_info: '当你受到1点伤害后，你可以令一名角色将手牌摸至X张（X为其体力上限且最多为4）。',
                            hpp_xurong: '徐荣',
                            hpp_xusheng: '徐盛',
                            hpp_pojun: '破军',
                            hpp_pojun2: '破军',
                            hpp_pojun_info: '当你使用【杀】指定目标后，你可以将其的至多X张牌（X为其体力值）移出游戏直到回合结束：若其中有装备牌，弃置其中一张；若其中有【闪】，你摸一张牌。',
                            hpp_xushi: '徐氏',
                            hpp_wengua: '问卦',
                            hpp_wengua2: '问卦',
                            hpp_wengua_info: '所有角色出牌阶段限一次，其可以交给你一张牌并展示，若此牌是锦囊你加1点体力上限（你的体力上限最大为5）并回复1点体力，然后你可以将此牌置于牌堆顶或牌堆底，你与其从另一端摸一张牌。',
                            hpp_fuzhu: '伏诛',
                            hpp_fuzhu_info: '一名角色的结束阶段，若牌堆剩余牌数小于等于你体力上限的十倍，则你可以依次对其使用牌堆中所有的【杀】（不能超过游戏人数），然后洗牌。',
                            hpp_xuyou: '许攸',
                            hpp_chenglve: '成略',
                            hpp_chenglve_info: '出牌阶段限一次，你可以摸一张牌，然后弃置一张手牌。若如此做，直到本回合结束，你使用与弃置牌相同花色的牌无距离和次数限制。',
                            hpp_xuzhu: '许诸',
                            hpp_luoyi: '裸衣',
                            hpp_luoyi_info: '摸牌阶段，你可以少摸一张牌，然后本回合你使用【杀】或【决斗】造成的伤害+1。',
                            hpp_huchi: '虎痴',
                            hpp_huchi_info: '回合结束时，若你的手牌数小于2，则摸至2张；且当你对目标出杀被闪时，你获得一枚“痴”。出牌阶段限一次，可以弃置所有“痴”，摸同等数量的牌。',
                            // Y
                            hpp_yanliangwenchou: '颜良文丑',
                            hpp_shuangxiong: '双雄',
                            hpp_shuangxiong_info: '摸牌阶段，你可以改为展示牌堆顶的三张牌，你获得其中相同颜色的牌，然后本回合你可以将与此牌颜色不同的一张手牌当【决斗】使用。每回合限3次；当你因“双雄”受到伤害后，你可以获得此次【决斗】中其他角色打出的【杀】。',
                            hpp_yanyan: '严颜',
                            hpp_juzhan: '拒战',
                            hpp_juzhan_info: '当你成为其他角色【杀】的目标后，你可以与其各摸一张牌，然后其本回合不能再对你使用牌；当你使用【杀】指定一名角色为目标后，你可以获得其一张牌，然后你本回合不能再对其使用红色【杀】。',
                            hpp_yuanshao: '袁绍',
                            hpp_luanji: '乱击',
                            hpp_luanji_info: '你可以将两张手牌当【万箭齐发】使用（不能使用本回合此前发动该技能时已用过的花色）；若没有角色受到你使用的【万箭齐发】的伤害，你摸等同于此【万箭齐发】指定目标数量的牌。',
                            hpp_xueyi: '血裔',
                            hpp_xueyi_draw: '血裔',
                            hpp_xueyi_info: '主公技，游戏开始时，你获得X个“裔”标记（X为群势力角色数）；你的出牌阶段或濒死时，你可以移除1个“裔”，然后回复1点体力并摸一张牌；你的手牌上限+X（X为“裔”数的两倍）。',
                            hpp_yuanshu: '袁术',
                            hpp_weidi: '伪帝',
                            hpp_weidi_info: '弃牌阶段结束时，你可以选择一张弃置的牌交给一名其他角色。',
                            hpp_yuji: '于吉',
                            hpp_guhuo: '蛊惑',
                            hpp_guhuo_info: '你使用的【杀】或伤害锦囊牌结算后，若没有造成伤害，则将此牌移出游戏，你摸一张牌，并在回合结束后将此牌归还；若造成伤害，你摸一张牌，每回合限一次。',
                            hpp_yujin: '于禁',
                            hpp_yizhong: '毅重',
                            hpp_yizhong_info: '锁定技，当你的防具栏为空时，梅花花色的杀对你无效。',
                            // Z
                            hpp_zhangchunhua: '张春华',
                            hpp_jueqing: '绝情',
                            hpp_jueqing_info: '你即将造成的伤害视为失去体力。',
                            hpp_shangshi: '伤逝',
                            hpp_shangshi_info: '当你的手牌数小于X时，你将手牌摸至X张（X为你已损失的体力值且至少为1）。',
                            hpp_zhangfei: '张飞',
                            hpp_tishen: '替身',
                            hpp_tishen_info: '回合外，获得所有对你使用且未对你造成伤害的【杀】。出牌阶段你使用的杀被闪抵消后，则你本阶段使用的下一张【杀】不可被响应且造成的伤害+1。',
                            hpp_zhanghe: '张郃',
                            hpp_qiaobian: '巧变',
                            hpp_qiaobian_info: '你可以弃置一张手牌并跳过一个阶段（准备阶段和结束阶段除外）：若跳过摸牌阶段，你可以获得至多两名角色的各一张手牌；若跳过出牌阶段，你可以移动场上的一张牌。回合结束时，若你跳过了至少三个阶段，则你摸两张牌。',
                            hpp_zhangji: '张济',
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
                            hpp_zhangxingcai: '张星彩',
                            hpp_qiangwu: '枪舞',
                            hpp_qiangwu_info: '出牌阶段限一次，你可以进行判定并获得判定牌，然后本回合你使用点数小于判定结果的【杀】无距离限制，点数大于判定结果的【杀】无次数限制。',
                            hpp_zhangxiu: '张绣',
                            hpp_zhangzhaozhanghong: '张昭张纮',
                            hpp_zhijian: '直谏',
                            hpp_zhijian_info: '出牌阶段，你可以将手牌中的一张装备牌置于其他角色的装备区里，然后摸一张牌。',
                            hpp_guzheng: '固政',
                            hpp_guzheng_info: '其他角色的弃牌阶段结束时，你可以令其获得弃牌中的一张曾是于此阶段内弃置的【手牌】，然后你可以获得其余的弃牌。如果其有弃牌且你没有通过此法获得牌，则你摸一张牌。',
                            hpp_zhaoxiang: '赵襄',
                            hpp_fanghun: '芳魂',
                            hpp_fanghun_info: '当你使用【杀】指定目标后或成为【杀】的目标后，你获得1个“梅影”标记；你可以移去1个“梅影”标记来发动“龙胆”并摸一张牌。',
                            hpp_fuhan: '扶汉',
                            hpp_fuhan_info: '限定技，回合开始时，你可以移去所有“梅影”标记并摸等量的牌，然后从X张（X为存活人数且至少为4）蜀势力武将牌中选择并获得至多两个技能（限定技、觉醒技、隐匿技、使命技、主公技除外）。若此时你是体力值最低的角色，你回复1点体力。',
                            hpp_zhaoyun: '赵云',
                            hpp_longdan: '龙胆',
                            hpp_longdan_info: '你可以将一张【杀】当【闪】、【闪】当【杀】使用或打出。',
                            hpp_yajiao: '涯角',
                            hpp_yajiao_info: '当你于回合外使用或打出手牌时，你可以展示牌堆顶的一张牌并将其交给一名角色；当你于自己回合内使用过【龙胆】，本回合结束阶段摸一张牌。',
                            hpp_zhenji: '甄姬',
                            hpp_luoshen: '洛神',
                            hpp_luoshen_info: '准备阶段，你可以进行判定，若结果为黑色，你获得此牌，然后你可以重复此流程；红色，获得此牌，然后结束此流程。',
                            hpp_zhonghui: '钟会',
                            hpp_quanji: '权计',
                            hpp_quanji_info: '当你受到1点伤害后，你可以摸两张牌；你的出牌阶段，可以将任意张手牌置于武将牌上，称为“权”；你的手牌上限+X（X为“权”的数量且最大为5）。',
                            hpp_paiyi: '排异',
                            hpp_paiyi_backup: '排异',
                            hpp_paiyi_info: '出牌阶段限一次，你可以移去1张“权”，令1名角色摸2张牌。若获得牌的角色手牌比你多，则你对其造成1点伤害。',
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
                            hpp_zhugeguo: '诸葛果',
                            hpp_qirang: '祈禳',
                            hpp_qirang_info: '当你使用一张装备牌时，你可以从牌堆里获得一张锦囊牌，你使用非延时锦囊牌指定唯一目标时，可以额外增加一个目标。',
                            hpp_yuhua: '羽化',
                            hpp_yuhua_info: '锁定技，弃牌阶段，你的锦囊牌和装备牌不计入手牌数。结束阶段，你观看牌堆顶的2张牌，将一张返回牌堆顶或牌堆底，并获得剩余的牌。',
                            hpp_zhugeke: '诸葛恪',
                            hpp_aocai: '傲才',
                            hpp_aocai_info: '你的回合外，当你需要出基本牌时，你可以观看牌堆顶的3张牌（若你没有手牌，改为四张），并且可以出其中的基本牌。',
                            hpp_duwu: '黩武',
                            hpp_duwu_info: '出牌阶段，你可以选择你攻击范围内的一名其他角色并弃置X张牌（X为该角色的体力值），然后对其造成1点伤害。若该角色因此法进入了濒死状态并且被救回，则你摸一张牌，且此技能失效，直到回合结束。',
                            hpp_zhugeliang: '诸葛亮',
                            hpp_guanxing: '观星',
                            hpp_guanxing_info: '准备阶段和结束阶段，你可以观看牌堆顶的五张牌（仅2人是改为三），然后放置于牌堆顶或牌堆底。',
                            hpp_kongcheng: '空城',
                            hpp_kongcheng_info: '锁定技，若你没有手牌，你不能成为【杀】、【决斗】或【顺手牵羊】的目标。',
                            hpp_zhugezhan: '诸葛瞻',
                            hpp_zuilun: '罪论',
                            hpp_zuilun_info: '结束阶段，你可以观看牌堆顶的四张牌，你每满足以下一项便保留一张，然后以任意顺序放回其余的牌：1.你于此回合内造成过伤害；2.你于此回合内未弃置过牌；3.手牌数为全场最少。若均不满足，你与一名其他角色失去1点体力。',
                            hpp_zhuhuan: '朱桓',
                            hpp_fenli: '奋励',
                            hpp_fenli_info: '若你的手牌数为全场最多，你可以跳过判定和摸牌阶段；若你的体力值为全场最多，你可以跳过出牌阶段；若你的装备区的牌数量为全场最多，你可以跳过弃牌阶段。',
                            hpp_pingkou: '平寇',
                            hpp_pingkou_info: '回合结束时，你可以对至多X名其他角色各造成1点伤害（X为你本回合跳过的阶段数）。若你跳过的阶段数大于你选择的角色数，则你获得其中一名角色装备区的一张牌。',
                            hpp_zhuran: '朱然',
                            hpp_danshou: '胆守',
                            hpp_danshou_info: '每个回合限一次，当你成为基本牌或锦囊牌的目标后，你可以摸X张牌（X为你本回合成为牌的目标的次数）；当前回合角色的结束阶段，若你本回合没有以此法摸牌，你可以弃置与其手牌数相同的牌数对其造成1点伤害。',
                            hpp_zhuzhi: '朱治',
                            hpp_anguo: '安国',
                            hpp_anguo_info: '出牌阶段限一次，你可以选择一名角色，若其手牌数为全场最少，其摸一张牌；体力值为全场最低，回复1点体力；装备区内牌数为全场最少，随机使用一张装备牌。然后若该角色有未执行的分支且你满足条件，你执行之。',
                            hpp_zumao: '祖茂',
                            hpp_yinbing: '引兵',
                            hpp_yinbing_info: '弃牌阶段前，你可以将任意张非基本牌置于你的武将牌上；当你受到【杀】造成的伤害后，你移去一张“引兵”牌，并摸一张牌。',
                            hpp_juedi: '绝地',
                            hpp_juedi_info: '锁定技，准备阶段，你选择一项：1.移去“引兵”牌，然后将手牌摸至体力上限+1；2.令体力值小于等于你的一名其他角色获得“引兵”牌，然后回复1点体力并摸等量的牌。',
                            hpp_zuoci: '左慈',
                            hpp_shendao: '神道',
                            hpp_shendao_info: '你的判定牌生效前，你可以将判定结果修改为任意花色。',
                            hpp_xinsheng: '新生',
                            hpp_xinsheng_info: '当你受到伤害后，你可以亮出牌堆顶三张牌，然后获得其中花色不同的牌各一张。',
                            // SP
                            hpp_sp_caiwenji: 'SP蔡文姬',
                            hpp_chenqing: '陈情',
                            hpp_chenqing_info: '每回合限一次，当一名角色进入濒死状态时，你可以令另一名角色摸五张牌，然后弃置四张牌，若花色各不相同，则其视为对处于濒死状态的角色使用一张【桃】。',
                            hpp_mozhi: '默识',
                            hpp_mozhi_info: '结束阶段，你可以将一张手牌当你出牌阶段内使用过的第一张基本牌或普通锦囊牌使用，然后你可以将一张手牌当你出牌阶段使用过的第二张基本牌或普通锦囊牌使用。',
                            hpp_sp_daqiao: 'SP大乔',
                            hpp_yanxiao: '言笑',
                            hpp_yanxiao_info: '出牌阶段，你可以将一张方块牌置于一名角色的判定区内。判定区内有“言笑”牌的角色下个判定阶段开始时，获得其判定区里的所有牌，并进行一次判定，若为红色，其摸一张牌。若为黑色，本回合出杀次数+1。',
                            hpp_anxian: '安娴',
                            hpp_anxian_info: '每当你使用【杀】指定目标时，你可以令其弃置一张手牌；当你成为【杀】的目标时，你可以弃置一张手牌使之无效，然后该【杀】的使用者摸一张牌，若你弃置的是方块牌，则视为对【杀】的来源使用一张【杀】（此杀不能触发安娴）。',
                            hpp_sp_diaochan: 'SP貂蝉',
                            hpp_lihun: '离魂',
                            hpp_lihun_info: '出牌阶段限一次，你可翻面，并获得一名其他角色所有手牌。出牌阶段结束时，你须为该角色每一点体力分配给其一张牌。',
                            hpp_pianyi: '翩仪',
                            hpp_pianyi_info: '回合结束阶段开始时，你可以摸一张牌，如你处于翻面状态，则摸三张牌。',
                            hpp_sp_jiangwei: 'SP姜维',
                            hpp_kunfen: '困奋',
                            hpp_kunfen_info: '结束阶段，你可以失去1点体力，然后摸两张牌，并可以视为对一名角色使用【火攻】。',
                            hpp_fengliang: '逢亮',
                            hpp_fengliang_info: '觉醒技，当你进入濒死状态时，你减1点体力上限并恢复体力值至3点，然后获得“挑衅”。',
                            hpp_sp_machao: 'SP马超',
                            hpp_zhuiji: '追击',
                            hpp_zhuiji_info: '锁定技，你计算与体力值小于等于你的角色的距离视为1，体力值大于等于你的角色无法响应你的【杀】。',
                            hpp_shichou: '誓仇',
                            hpp_shichou2: '誓仇',
                            hpp_shichou4: '誓仇',
                            hpp_shichou_info: '当你使用【杀】指定目标后，你可以多选择至多X名角色成为此【杀】的目标（X为你已损失的体力值+1）；若此【杀】没有造成伤害，你摸一张【杀】，此【杀】每造成1点伤害，你摸1张牌，每回合至多为3。',
                            hpp_sp_pangde: 'SP庞德',
                            hpp_juesi: '决死',
                            hpp_juesi_info: '出牌阶段，你可以弃置一张【杀】并选择你攻击范围内的一名其他角色，该角色弃置一张牌。若其弃置的不是【杀】且你的体力值小于等于该角色，则你可以摸两张牌；若其弃置的是【杀】，则你视为对其使用【决斗】。',
                            hpp_sp_pangtong: 'SP庞统',
                            hpp_guolun: '过论',
                            hpp_guolun_info: '出牌阶段限一次，你可展示一名其他角色的一张手牌。然后你可选择你的一张牌。若其选择的牌点数小，你与其交换这两张牌，其摸一张牌，你回复1点体力；若你选择的牌点数小，你与其交互这两张牌，你摸两张牌。',
                            hpp_songsang: '送丧',
                            hpp_songsang_info: '当其他角色死亡时，你可加1点体力上限并回复1点体力。',
                            hpp_zhanji: "展骥",
                            hpp_zhanji_info: "锁定技，当你于出牌阶段内因摸牌且并非因发动此技能而得到牌时，你摸一张牌。",
                            hpp_sp_sunshangxiang: 'SP孙尚香',
                            hpp_liangzhu: '良助',
                            hpp_liangzhu_info: '当一名角色于其出牌阶段内回复体力后，你可以选择一项：1.摸一张牌；2.令其摸两张牌；3.获得其装备区里的武器牌。',
                            hpp_fanxiang: '返乡',
                            hpp_fanxiang_info: '觉醒技，准备阶段开始时，若你发动过“良助”，则你加1点体力上，然后回复1点体力，失去“良助”并获得“枭姬”和“舞剑”。',
                            hpp_wujian: '舞剑',
                            hpp_wujian_info: '出牌阶段，你可以把装备区的牌当杀使用，每个装备栏限一次，该杀不计入使用次数。',
                            hpp_sp_taishici: 'SP太史慈',
                            hpp_jixu: '击虚',
                            hpp_jixu_info: '出牌阶段限一次，你可令至多四名其他角色各猜测你的手牌区里是否有【杀】。猜错的角色，你弃置其一张牌，然后视为对其使用一张杀；你获得X张牌，且本回合手牌上限+X（X为猜对的角色数+1）。',
                            hpp_sp_xiaoqiao: 'SP小乔',
                            hpp_xingwu: '星舞',
                            hpp_xingwu_info: '出牌阶段限一次，你可以翻面并弃置一张手牌，然后弃置一名其他角色装备区里的一张牌，并对其造成2点伤害（若为女性角色则改为1点伤害）。',
                            hpp_luoyan: '落雁',
                            hpp_luoyan_info: '锁定技，当你发动星舞后，直至你的下个出牌阶段开始前，你拥有“天香”和“红颜”。',
                            hpp_huimou: '回眸',
                            hpp_huimou_info: '当你于回合外使用打出红桃牌或发动天香时，你可以选择一名角色从背面翻至正面。',
                            hpp_sp_zhaoyun: 'SP赵云',
                            hpp_chongzhen: '冲阵',
                            hpp_chongzhen1: '冲阵',
                            hpp_chongzhen2: '冲阵',
                            hpp_chongzhen_info: '当你发动〖龙胆〗时，你可以获得对方的一张手牌。',
                            // 神
                            hpp_shen_caocao: '神曹操',
                            hpp_guixin: '归心',
                            hpp_guixin_info: '当你受到1点伤害后，你可以随机获得每名其他角色区域里的一张牌，如果获得牌大于4张且你为正面，则翻面。',
                            hpp_shen_guojia: '神郭嘉',
                            hpp_gjtianyi: '天翊',
                            hpp_gjtianyi_info: '觉醒技，准备阶段，若全场角色在本局游戏中均受到过伤害，你加2点体力上限，回复1点体力，然后令一名角色获得“佐幸”。',
                            hpp_zuoxing: '佐幸',
                            hpp_zuoxing_info: '出牌阶段开始时，若神郭嘉存活且体力上限大于1，你可令神郭嘉减1点体力上限。然后你可以视为使用一张普通锦囊牌。',
                            hpp_huishi: '辉逝',
                            hpp_huishi_info: '限定技，出牌阶段，你可以选择一名角色。若其：有未触发的觉醒技，且你的体力上限不小于X（X为全场存活角色数），则你选择其中一个觉醒技，然后该角色视为满足觉醒条件；没有未触发的觉醒技，且你的体力上限大于2，则其摸四张牌。若如此做，你减2点体力上限。',
                            hpp_shen_luxun: '神陆逊',
                            hpp_junlue: '军略',
                            hpp_junlue_info: '锁定技，当你受到或造成1点伤害后，你获得一个“军略"标记。',
                            hpp_cuike: '摧克',
                            hpp_cuike_info: '出牌阶段开始时，若“军略”数量为奇数，你可以对一名角色造成1点伤害；若“军略”数量为偶数，你可以横置一名角色并弃置其区域里的—张牌。若“军略”数量超过7个，你可以移去全部“军略”标记并对所有其他角色造成1点伤害。',
                            hpp_zhanhuo: '绽火',
                            hpp_zhanhuo_info: '限定技，出牌阶段，你可以移去全部“军略”标记，令至多等量的已横置角色弃置所有装备区里的牌，然后对其中1名角色造成1点火焰伤害。',
                            hpp_shen_lvbu: '神吕布',
                            hpp_wuqian: '无前',
                            hpp_wuqian_info: '锁定技，每个自己回合使用的第一张杀或决斗，获得“无双”效果且无视目标角色的防具。',
                            hpp_shenfen: '神愤',
                            hpp_shenfen_info: '限定技，出牌阶段，你可以失去3点体力，然后对所有其他角色各造成1点伤害。这些角色弃置装备区里的所有牌，再弃置四张手牌。',
                            hpp_shen_lvmeng: '神吕蒙',
                            hpp_shelie: '涉猎',
                            hpp_shelie_info: '锁定技，摸牌阶段，改为亮出牌堆顶的五张牌，然后获得其中每种花色的牌各一张。',
                            hpp_gongxin: '攻心',
                            hpp_gongxin_info: '当你使用牌指定唯一目标或成为其他角色使用牌的唯一目标后，你可以观看目标角色的手牌，然后你可以展示其中一张红色牌，获得此牌或将此牌置于牌堆顶（每回合限触发一次）。',
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
                            hpp_shen_zhugeliang: '神诸葛亮',
                            hpp_qixing: '七星',
                            hpp_qixing_info: '游戏开始时你多摸七张牌，置于武将牌上，称为“星”。你的每个摸牌阶段结束时，可以用任意张手牌交换等量的“星”。',
                            hpp_kuangfeng: '狂风',
                            hpp_kuangfeng_info: '出牌阶段结束时，你可以移去任意张“星”对等量的角色各造成1点伤害。',
                            hpp_dawu: '大雾',
                            hpp_dawu_info: '结束阶段，你可以移去一张“星”，然后直到你的下回合开始，你受到非属性伤害-1。',
                            // 斗地主
                            hpp_sunwukong: '孙悟空',
                            hpp_72bian: '72变',
                            hpp_72bian_backup: '72变',
                            hpp_72bian_info: '出牌阶段，你可以将基本牌重铸为锦囊牌，锦囊牌重铸为装备牌，装备牌重铸为基本牌，每个类型的牌每回合限1次。',
                            hpp_ruyi: '如意',
                            hpp_ruyi_info: '锁定技，若你的装备区里没有武器牌时，你视为装备着【如意金箍棒】。',
                            hpp_ruyijingubang: '如意金箍棒',
                            hpp_ruyijingubang2: '如意金箍棒',
                            hpp_ruyijingubang_info: '回合开始时，你可以将如意金箍棒攻击范围调整至1-4，并获得对应效果，初始攻击范围默认为1。1.你使用【杀】不计入次数。2.本回合你使用的第一张【杀】伤害+1。3.你使用【杀】无法被响应。4.你使用【杀】可以额外增加一个目标。',
                            hpp_qitian: '齐天',
                            hpp_qitian_info: '觉醒技，若你的体力值为1时，你减1点体力上限，然后获得技能【火眼】和【筋斗云】。',
                            hpp_huoyan: '火眼',
                            hpp_huoyan_info: '锁定技，其他角色的手牌始终对你可见。',
                            hpp_jindouyun: '筋斗云',
                            hpp_jindouyun_info: '锁定技，你计算与其他角色的距离时，始终-1；其他角色计算与你的距离时，始终+1。',

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
                            doudizhu: '斗地主限定',
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