const characters = {
	// A
	// 艾琳
	hok_ailin: ['female', 'shen', 3, ['hok_lingwu', 'hok_yewu', 'hok_xuanwu', 'hok_yueguishengfang']],
	// 安琪拉
	hok_anqila: ['female', 'shu', 3, ['hok_huoqiu', 'hok_hunhuo', 'hok_chihui']],
	// 敖隐
	hok_aoyin: ['male', 'wu', 3, ['hok_zhanghuo', 'hok_siyu', 'hok_jiafeng', 'hok_qiongxuan']],

	// B
	// 百里守约
	hok_bailishouyue: ['male', 'qun', 3, ['hok_miaozhun', 'hok_miyan', 'hok_kuangju']],
	// 百里玄策
	hok_bailixuance: ['male', 'shu', 4, ['hok_rexue', 'hok_yangou', 'hok_lianshan']],
	// 扁鹊
	hok_bianque: ['male', 'wei', 3, ['hok_eyi', 'hok_eyi_limit', 'hok_jinyao', 'hok_mingzai']],

	// C

	// D
	// 妲己
	hok_daji: ['female', 'qun', 3, ['hok_meixin', 'hok_huhuo']],
	// 大司命
	hok_dasiming: ['male', 'wei', 4, ['hok_mingge', 'hok_hungui']],
	// 东皇太一
	hok_donghuangtaiyi: ['male', 'wei', 5, ['hok_rishi', 'hok_duoqi']],
	// 朵莉亚
	hok_duoliya: ['female', 'wei', 4, ['hok_renyu', 'hok_huange', 'hok_zhulang', 'hok_tianlai']],

	// E
	// F

	// G
	// 高渐离
	hok_gaojianli: ['male', 'jin', 3, ['hok_aige', 'hok_kuangge', 'hok_lige', 'hok_moyin',]],

	// H
	// 海诺
	hok_hainuo: ['male', 'wei', 3, ['hok_mingren', 'hok_zhuimang', 'hok_xuanji', 'hok_xingyou', 'hok_minghui']],
	// 后羿
	hok_houyi: ['male', 'shen', 3, ['hok_chengjiesheji', 'hok_duochongjianshi', 'hok_luoriyuhui', 'hok_zhuorizhishi'], ['qun']],

	// I
	// J
	// 姜子牙
	hok_jiangziya: ['male', 'shen', 3, ['hok_fengshen', 'hok_shenfa', 'hok_tianrenfaze', 'hok_tiandiao'], ['qun'], ['zhu']],
	// hok_jiangziya: {
	// 	sex: "male",
	// 	group: "shen",
	// 	hp: 3,
	// 	maxHp: 3,
	// 	skills: ["hok_fengshen", "hok_shenyin", "hok_shenfa", "hok_tianrenfaze", "hok_tiandiao"],
	// 	groupInGuozhan: "qun",
	// 	isZhugong: true
	// },
	// 金蝉
	hok_jinchan: ['male', 'qun', 4, ['hok_jinlan', 'hok_jingu', 'hok_zhangyin', 'hok_due'], ['zhu']],

	// K
	// 凯
	hok_kai: ['male', 'wei', 4, ['hok_xiuluo', 'hok_jiren', 'hok_moqu']],

	// L
	// 澜
	hok_lan: ['male', 'wei', 4, ['hok_polang', 'hok_duankong', 'hok_chujue'], ['doublegroup:wei:wu']],
	// 兰陵王
	hok_lanlingwang: ['male', 'jin', 4, ['hok_yinni', 'hok_yingshi', 'hok_anxi']],
	// 李信
	hok_lixin: ['male', 'shu', 4, ['hok_guangan', 'hok_huiren', 'hok_qiangzhan', 'hok_tongkuang']],
	// 卢雅那
	hok_luyana: ['female', 'shu', 3, ['hok_shehuan', 'hok_shefen']],

	// M
	// 马可波罗
	hok_makeboluo: ['male', 'qun', 3, ['hok_zuolun', 'hok_qianglin', 'hok_danyu']],
	// 明世隐
	hok_mingshiyin: ['male', 'shu', 4, ['hok_lingua', 'hok_shigua', 'hok_taigua']],
	// 芈月
	hok_miyue: ['female', 'jin', 4, ['hok_shengxue', 'hok_anlian', 'hok_anyue']],
	// 墨子
	hok_mozi: ['male', 'wu', 4, ['hok_jianaifeigong', 'hok_jipao', 'hok_moshouchenggui']],

	// N
	// O
	// P
	// Q
	// R

	// S
	// 少司缘
	hok_shaosiyuan: ['female', 'wu', 4, ['hok_liangyuan', 'hok_yuanyuan'], ['doublegroup:wu:shu']],
	// 司空震
	hok_sikongzhen: ['male', 'qun', 4, ['hok_tianlei', 'hok_benlei', 'hok_leitingwanjun'], ['zhu']],
	// 孙悟空
	hok_sunwukong: ['male', 'shen', 4, ['hok_shengbang', 'hok_hushen', 'hok_douzhan', 'hok_ruyijingu'], ['qun']],

	// T
	// U
	// V

	// W
	// 王昭君
	hok_wangzhaojun: ['female', 'wei', 3, ['hok_bingfeng', 'hok_diaoling', 'hok_hanshuang']],
	// 武则天
	hok_wuzetian: ['female', 'qun', 3, ['hok_dihui', 'hok_diwei', 'hok_shaduo', 'hok_nvdi'], ['zhu']],

	// X
	// 项羽
	hok_xiangyu: ['male', 'qun', 5, ['hok_pofu', 'hok_bawangzhan', 'hok_xianzhen'], ['zhu']],
	// 心魔六耳
	hok_xinmoliuer: ['male', 'qun', 4, ['hok_xinmo', 'hok_chenmie', 'hok_chongxiao', 'hok_jufen']],

	// Y
	// 瑶
	hok_yao: ['female', 'jin', 3, ['hok_shangui', 'hok_bailu']],
	// 亚瑟
	hok_yase: ['male', 'qun', 4, ['hok_shengguang', 'hok_shidun', 'hok_huixuan', 'hok_shengjiancaijue', 'hok_wangzhe'], ['zhu']],
	// 虞姬
	hok_yuji: ['female', 'qun', 3, ['hok_chuge', 'hok_fengyou', 'hok_zhenqianwu']],

	// Z
	// 猪八戒
	hok_zhubajie: ['male', 'qun', 5, ['hok_wushang', 'hok_routan']],

	// SP
	// SP李信
	hok_sp_lixin: ['male', 'shen', 4, ['hok_wangming', 'hok_dengshen',], ['qun']],
	// SP明世隐
	hok_sp_mingshiyin: ['male', 'shu', 4, ['hok_sptaigua', 'hok_minggua', 'hok_biangua']],
};

export default characters;
