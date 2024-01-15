'use strict';
//-------------------------------------------------------
//SP明世隐
let guaList = ['大吉', '中吉', '小吉', '小凶', '中凶', '大凶'];
let gua1 = false;
let gua2 = false;
let gua3 = false;
let gua4 = false;
let gua5 = false;
let gua6 = false;

//SP李信
function removeRenjie(player) {
	if (player.hasSkill('pozhu')) {
		player.removeSkill('pozhu');
	}
	if (player.hasSkill('olqingyi')) {
		player.removeSkill('olqingyi');
	}
	if (player.hasSkill('xinfu_zuilun')) {
		player.removeSkill('xinfu_zuilun');
	}
};
function removeTongyu(player) {
	if (player.hasSkill('reshuishi')) {
		player.removeSkill('reshuishi');
	}
	if (player.hasSkill('lingce')) {
		player.removeSkill('lingce');
	}
	if (player.hasSkill('dinghan')) {
		player.removeSkill('dinghan');
	}
};
function removeKuangbao(player) {
	if (player.hasSkill('drlt_jieying')) {
		player.removeSkill('drlt_jieying');
	}
	if (player.hasSkill('shencai')) {
		player.removeSkill('shencai');
	}
	if (player.hasSkill('drlt_poxi')) {
		player.removeSkill('drlt_poxi');
	}
};
function hok_remove(player, arrays) {
	if (arrays.includes('renjie')) {
		removeRenjie(player);
	}
	if (arrays.includes('tongyu')) {
		removeTongyu(player);
	}
	if (arrays.includes('kuangbao')) {
		removeKuangbao(player);
	}
};
//-------------------------------------------------------------
game.import('character', function (lib, game, ui, get, ai, _status) {
	var happy = {
		name: 'happy',
		connect: true,
		characterSort: {
			happy: {
				correction_history: ['lao_caofang', 'lao_caohuan', 'lao_caoyu', 'lao_cuishi', 'lao_liucong', 'lao_tuanxini', 'lao_tuan', 'lao_xini'],
				honor_of_kings_clashlane: ['hok_lixin', 'hok_miyue', 'hok_sp_lixin'],
				honor_of_kings_jungling: ['hok_bailixuance', 'hok_sunwukong'],
				honor_of_kings_midlane: ['hok_daji', 'hok_wuzetian'],
				honor_of_kings_roaming: ['hok_mingshiyin', 'hok_yao', 'hok_sp_mingshiyin'],
				honor_of_kings_farmlane: ['hok_ailin', 'hok_makeboluo'],
				happy_kings: ['shen_caozhi', 'shen_dongzhuo', 'shen_lusu', 'shen_xusheng'],
				hpp_hpp: ['hpp_re_zuoci'],
			},
		},
		character: {
			// 曹芳
			lao_caofang: ['male', 'wei', 4, ['lao_shouwei', 'lao_shengbai'], ['zhu']],
			// 曹奂
			lao_caohuan: ['male', 'wei', 3, ['lao_zunqian', 'lao_yishan', 'lao_chongjia'], ['zhu']],
			// 曹宇
			// lao_caoyu: ['male', 'wei', 4, ['lao_renlun', 'lao_gongci']],
			// 崔氏
			lao_cuishi: ['female', 'wei', 3, ['reluoshen', 'lao_pianwan', 'lao_huashang']],
			// 刘琮
			lao_liucong: ['male', 'qun', 3, ['decadezongshi', 'lao_tunquan', 'rexianzhou', 'lao_quxiang']],
			// 土安奚泥
			lao_tuanxini: ['male', 'qun', '8/15', ['lao_tengbing', 'lao_ranwang', 'lao_ranyong']],
			// 土安
			lao_tuan: ['male', 'qun', '4/8', ['lao_tengbing', 'lao_ranwang']],
			// 奚泥
			lao_xini: ['male', 'qun', '4/7', ['lao_tengbing', 'lao_ranyong']],

			// 艾琳
			hok_ailin: ['female', 'qun', 3, ['hok_lingwu', 'hok_yewu', 'hok_xuanwu', 'hok_yueguishengfang']],
			// 百里玄策
			hok_bailixuance: ['male', 'shu', 4, ['hok_rexue', 'hok_yangou', 'hok_lianshan']],
			// 妲己
			hok_daji: ['female', 'qun', 3, ['hok_meixin', 'hok_huhuo']],
			// 李信
			hok_lixin: ['male', 'qun', 4, ['hok_guangan', 'hok_huiren', 'hok_qiangzhan', 'hok_tongkuang']],
			// 马可波罗
			hok_makeboluo: ['male', 'qun', 3, ['hok_zuolun', 'hok_qianglin', 'hok_danyu']],
			// 明世隐
			hok_mingshiyin: ['male', 'shu', 4, ['hok_lingua', 'hok_shigua', 'hok_taigua']],
			// 芈月
			hok_miyue: ['female', 'jin', 4, ['hok_shengxue', 'hok_anlian', 'hok_anyue']],
			// 孙悟空
			hok_sunwukong: ['male', 'shen', 4, ['hok_qitian', 'hok_shengbang', 'hok_houmao', 'hok_naogong'], ['qun']],
			// 武则天
			hok_wuzetian: ['female', 'qun', 3, ['hok_dihui', 'hok_diwei', 'hok_shaduo', 'hok_nvdi'], ['zhu']],
			// 瑶
			hok_yao: ['female', 'wei', 3, ['hok_shangui', 'hok_bailu']],
			// SP李信
			hok_sp_lixin: ['male', 'shen', 4, ['hok_wangming', 'hok_dengshen',], ['qun']],
			// SP明世隐
			hok_sp_mingshiyin: ['male', 'shu', 4, ['hok_sptaigua', 'hok_minggua', 'hok_minggua2', 'hok_biangua']],

			// 神曹植
			shen_caozhi: ['male', 'shen', 3, ['lao_caigao', 'lao_badou', 'lao_qibu', 'lao_chengshi'], ['wei']],
			// 神董卓
			shen_dongzhuo: ['male', 'shen', 5, ['lao_cannue', 'lao_xiehan', 'lao_huidu'], ['qun']],
			// 神鲁肃
			shen_lusu: ['male', 'shen', 3, ['diying', 'lao_fusheng', 'lao_chiyan', 'lao_lianmeng'], ['wu']],
			// 神徐盛
			shen_xusheng: ['male', 'shen', 4, ['kuijun'], ['wu']],

			// 欢杀陆逊
			hpp_re_zuoci: ['male', 'qun', 3, ['hpp_re_xinsheng'], []],
		},
		characterIntro: {
			lao_caofang: '曹芳（232年－274年），字兰卿，沛国谯县（今安徽省亳州市）人。三国时期曹魏第三位皇帝（239年1月22日－254年10月17日在位），疑为魏武帝曹操曾孙，任城威王曹彰之孙，任城王曹楷之子。太和六年（232年），生于任城王府。青龙三年（235年），选为魏明帝曹叡养子，册封齐王。景初三年（239年），立为皇太子，同日魏明帝曹叡病死，曹芳正式即位，由大将军曹爽和太尉司马懿共同辅政。正始十年，经历高平陵之变，曹爽倒台，政权落入司马氏手中。嘉平六年（254年），中书令李丰和光禄大夫张缉图谋废掉司马师，改立夏侯玄为大将军。司马师平定叛乱后，将曹芳废为齐王，拥戴高贵乡公曹髦继位。西晋建立后，册封邵陵县公。泰始十年（274年），曹芳病逝，终年四十三岁，谥号为厉。',
			lao_caohuan: '曹奂（246年～302年），原名曹璜，以名讳难避，改名奂，字景明，三国时期曹魏末代皇帝。魏武帝曹操之孙，燕王曹宇之子，奉魏明帝曹叡之祀。曹奂出生于燕王宫。甘露三年（258年），被封为常道乡公。甘露五年（260年）五月，魏帝曹髦被杀，司马昭与众臣商议，立曹奂为帝，同年六月初二曹奂即皇帝位，改年号为景元。咸熙元年（264年），以曹奂为皇帝的魏国朝廷，宣布废除屯田官，以均政役。次年，司马炎篡夺魏国政权，建立西晋，史称晋武帝，魏国自此灭亡。十一月十七日，晋武帝封曹奂为陈留王。太安元年（302年），曹奂去世，谥号为元。曹奂在任期间，推行了君臣罢屯田均政役，给历时七十年的屯田制度画上了句号，是在新形势下调整统治政策的举措，对缓和当时的社会矛盾，促进经济发展均起到了一定的作用。',
			// lao_caoyu: '曹宇（？－278年），字彭祖，沛国谯县（今安徽亳州）人。三国时期魏国宗室，魏武帝曹操与环夫人之子，邓哀王曹冲同母兄弟。太和六年，封为燕王。魏明帝病危，欲以大将军辅政，不果。其子常道乡公曹奂，是魏国末代皇帝，史称魏元帝。晋朝建立后，降封燕公。咸宁四年（278年），曹宇去世。',
			lao_cuishi: '崔妃（？-？），清河郡东武城县（今河北故城）人，崔妃出身河北高门士族清河崔氏，崔妃的叔叔为名士崔琰。之后出嫁权臣曹操之子曹植为妻。因衣装过于华美，曹操登台看到后，认为她违反了穿着朴素的禁令，回家后崔妃就被赐死了。',
			lao_liucong: '刘琮（？-？），山阳高平（今山东微山两城乡）人。东汉末年荆州牧刘表次子，刘琦之弟。刘表死后继承刘表官爵，当曹操大军南下之时，他在蔡瑁等人的劝说之下举荆州而降，被曹操封为青州刺史，后迁谏议大夫，爵封列侯。',
			lao_tuanxini: '带来洞主曰：“此去东南七百里，有一国，名乌戈国。国主兀突骨，身长丈二，不食五谷，以生蛇恶兽为饭；身有鳞甲，刀箭不能侵。其手下军士，俱穿藤甲；其藤生于山涧之中，盘于石壁之上；国人采取，浸于油中，半年方取出晒之；晒干复浸，凡十余遍，却才造成铠甲；穿在身上，渡江不沉，经水不湿，刀箭皆不能入：因此号为‘藤甲军’。今大王可往求之。若得彼相助，擒诸葛亮如利刀破竹也。”孟获大喜，遂投乌戈国，来见兀突骨。其洞无宇舍，皆居土穴之内。孟获入洞，再拜哀告前事。兀突骨曰：“吾起本洞之兵，与汝报仇。”获欣然拜谢。于是兀突骨唤两个领兵俘长：一名土安，一名奚泥，起三万兵，皆穿藤甲，离乌戈国望东北而来。曾经大败蜀军，后被诸葛施计引入盘蛇谷中，尽烧其众，无所生还。',
			lao_tuan: '土安，《三国演义》里的人物，长乌戈国主兀突骨手下的一个藤甲领兵长，身穿藤甲，后被诸葛施计引入盘蛇谷中阵亡。',
			lao_xini: '小说《三国演义》中的人物。乌戈国国主兀突骨部下的藤甲领兵俘长。曾大败蜀军，后为蜀相诸葛亮施计引入盘蛇谷中，尽烧其众，无所生还。',
			hok_ailin: '艾琳是黄金森林的在逃精灵公主，日落圣殿的不速之客。公主艾琳天性机灵活泼，对一切未知充满好奇心与探索欲。然而“继承人”的责任始终压在她的肩膀上，她被要求收起不稳重的一面，遵循精灵族舞蹈的优雅与绝对的秩序，做好一个“真正的公主”。成年仪式前夕，艾琳决定打破族群禁令，逃去森林外的“危险古怪的人类世界”开启一场自由的冒险。旅程却并没有想象中那样顺遂，人类对精灵同样存在“不详邪恶”的重重误解。越是未知，越是有趣，越是困难，越有斗志。她以舞蹈为表达自我的“语言”，与红头发的法师小女孩成为密友，给圣殿严肃守序的骑士团带来了诸多意外麻烦，甚至组成了圣殿小分队在西方大陆的各个地方冒险……',
			hok_bailixuance: '玄策不会忘记那个日子：来历不明的马贼冲破边关的城镇，然而齐心协力的守卫军和民众守住城门。率先进入城镇的马贼走投无路，挟持了无力反抗的老弱们作为逃离的砝码。那时候自己多么害怕啊。可哭喊声刺痛小小男子汉的心灵，他推倒藏身的水缸，冲了出去。之后的记忆已不太清晰……那些不是普通的马贼……他们最后都死于首领之手……哥哥没有赶到，谁也没有赶到。他被首领选中，作为祭品去唤醒某种强大的东西。所有人四散逃窜，在绝望和恐惧中，少年眼睁睁看着无名剑士代替自己卷入邪恶迷雾。直到周围一切归于寂静，圆月安静照耀着亘古不变的戈壁，那个男人带走了他。',
			hok_daji: '关于妲己，历史上的记载非常稀少，只有《史记》和《国语》里有寥寥数语。我们只知道她是商朝最后一个王商纣王的妃子，出自有苏氏。更多的信息，实际上来自明代的小说《封神演义》。在小说里，在纣王身边妲己实际上是狐狸精。她蛊惑纣王干下了种种祸害百姓、残害忠良的倒行逆施，最终断送了商朝的天下。小说中的妲己，就是“女色祸国论”的形象。',
			hok_lixin: '李信所守护的是长城，却也不是长城。他是废太子之子，如今丧城丧国的、孤独落魄的王族后裔。长安城已经不是他的长安城，家亦非家。亲情，友情，理想，这些在他看来不过是一些冠冕堂皇的表象。牡丹方士同他许诺以长城换得长安，燃烧着炽热野心的少年因而来到边疆，为了有朝一日能够夺回真正属于自己的"家"而战斗。',
			hok_makeboluo: '马可波罗，中古时期的威尼斯商人。其父亲和叔叔，都曾到东方经商，而他本人，则在元世祖忽必烈的时代，来到中国。他穿越沙漠和帕米尔高原，经河西走廊来到元大都，游历了许多城市，据说还见过忽必烈，接受过元朝的官职。回到威尼斯之后，因带回的东方珍宝而成为巨富。后来参与威尼斯与热那亚的战争中被俘，在狱中，向同牢的作家口述了他的东方见闻，遂成著名的《马可波罗游记》。《马可波罗游记》极大地开拓了欧洲人的东方视野，丰富了他们关于东方的想象，激起了欧洲人向往东方的雄心。但也有人质疑游记的真实性，比如游记没有提到著名的长城，不过，作为一个口述游记，记录长城作用几乎完全消失的元代的事情，缺失长城也是可以理解的。',
			hok_mingshiyin: '明算万物的卦象，摄人心魂的牡丹，风度翩翩的举止……这位突然出现在长安、被尊称牡丹方士的男人仿佛是"神秘"二字的代名词。没有人知道他从何而来，但他对未来的精准预测令人惊叹，甚至连女帝都深信不疑。而面对那位治安官的冷眼与戒备，方士本人仅以一笑付之，深藏心中执念：那座古老巍峨的长城，和其脚下长眠的友人。',
			hok_miyue: '史称芈八子，秦昭襄王时的秦宣太后。在《史记》和《战国策》里都有关于芈月的零星记载，她本是秦惠文王的妃子，惠文王死后，秦武王继位，不久即举鼎而死，芈八子的儿子昭襄王继位，芈八子作为太后辅政。在她辅政期间，秦国得到了长足的发展，但功劳未必都是她一个人的。',
			hok_sunwukong: '孙悟空生性桀骜，厌恶被管辖和拘束，更憎恶那些虚伪神灵铐在魔种身上的枷锁。黑暗的时代里，他俨然成为反抗的领袖，带领魔种们为自由奋起。起义以失败告终，神灵以绝对的力量击溃了乌合之众，将他封印在某座山脚……然而他的意志没有熄灭，某位路过的僧侣帮助孙悟空冲破束缚重生，齐天大圣的名号再度威震八方。',
			hok_wuzetian: '武曌[zhào]（624年－705年12月16日），即武则天，并州文水（今山西省文水县）人。唐朝至武周时期政治家，武周开国君主（690年－705年在位），也是中国历史上唯一的正统女皇帝、即位年龄最大（67岁）及寿命最长的皇帝之一（82岁）。',
			hok_yao: '鹿女阿瑶年幼时不小心闯入东神之城的边缘地带，受到那里村民的围攻。村民想杀掉她，同供品一起献祭给东神。东神使者云中君放她离去。当阿瑶再次出现在东神之城，已经是十五六岁的少女，其谎话轻易就能骗过任何一个成人，其恶作剧变幻多端，总是弄哭孩子。然而比起阿瑶引起的恐慌，东神更关注她带来的讯息。原来在连串事件中，她留下的是鬼谷子欲向他传递的符号与密码：楚汉纷争因奇迹异动而加剧，铁骑或许又将践踏至大河流域，寻找失落的力量为己所用。阿瑶对世界的困惑却远不止大人之间谈论的这些事。比起云梦泽的将来，她更关心自己的过去。越接近东神宫殿，如梦般的记忆残片便越是纷涌而来：她是一只幼鹿，与一只同样无所依靠的孤鸟结伴生活，某天，军队与厮杀声涌入森林，它们想要躲避却被席卷其中……一边为东神传递讯息，阿瑶一边试图在宫殿所在找到伙伴的线索，却不明白羁绊就在跟她作对的人手中——云中君是多么讨厌的人啊。幼年时她居然迷恋过他！',
			hok_sp_lixin: 'SP李信所守护的是长城，却也不是长城。他是废太子之子，如今丧城丧国的、孤独落魄的王族后裔。长安城已经不是他的长安城，家亦非家。亲情，友情，理想，这些在他看来不过是一些冠冕堂皇的表象。牡丹方士同他许诺以长城换得长安，燃烧着炽热野心的少年因而来到边疆，为了有朝一日能够夺回真正属于自己的"家"而战斗。',
			hok_sp_mingshiyin: '明算万物的卦象，摄人心魂的牡丹，风度翩翩的举止……这位突然出现在长安、被尊称牡丹方士的男人仿佛是"神秘"二字的代名词。没有人知道他从何而来，但他对未来的精准预测令人惊叹，甚至连女帝都深信不疑。而面对那位治安官的冷眼与戒备，方士本人仅以一笑付之，深藏心中执念：那座古老巍峨的长城，和其脚下长眠的友人。',
			shen_caozhi: '字子建，沛国谯人，三国曹魏著名文学家，建安文学代表人物。魏武帝曹操之子，魏文帝曹丕之弟，生前曾为陈王，去世后谥号“思”，因此又称陈思王。南朝宋文学家谢灵运更有“天下才有一石，曹子建独占八斗”的评价。王士祯尝论汉魏以来二千年间诗家堪称“仙才”者，曹植、李白、苏轼三人耳。',
			shen_dongzhuo: '字仲颖，陇西临洮人。东汉末年少帝、献帝时权臣，西凉军阀。官至太师、郿侯。其为人残忍嗜杀，倒行逆施，招致群雄联合讨伐，但联合军在董卓迁都长安不久后瓦解。后被其亲信吕布所杀。',
		},
		characterReplace: {
			// shen_zhangliao:['shen_zhangliao','ol_zhangliao'],
			jin_simayi: ['jin_simayi', 'jin_zhangchunhua', 'ol_lisu', 'simazhou', 'cheliji', 'ol_huaxin'],
			jin_simashi: ['jin_simashi', 'jin_xiahouhui', 'zhanghuyuechen', 'shibao', 'jin_yanghuiyu', 'chengjichengcui'],
			jin_simazhao: ['jin_simazhao', 'jin_wangyuanji', 'duyu', 'weiguan', 'xuangongzhu'],
			zhongyan: ['zhongyan', 'xinchang', 'jin_jiachong', 'wangxiang'],
			yangyan: ['yangyan', 'yangzhi'],
		},
		characterFilter: {
			shen_diaochan(mode) {
				return mode == 'identity' || mode == 'doudizhu' || mode == 'single' || (mode == 'versus' && _status.mode != 'standard' && _status.mode != 'three');
			},
		},
		skill: {
			// 曹芳
			lao_shouwei: {
				trigger: { player: 'damageAfter' },
				frequent: true,
				filter(event, player) {
					return (event.num > 0);
				},
				content() {
					var drawX = Math.floor(_status.currentPhase.getHp() / 2);
					player.draw(drawX > 2 ? 2 : drawX);
					player.addSkill('lao_shouwei_effect');
				},
				subSkill: {
					effect: {
						forced: true,
						trigger: { global: 'phaseAfter' },
						content() {
							var drawY = trigger.player.getDamagedHp();
							player.draw(drawY > 3 ? 3 : drawY);
							player.removeSkill('lao_shouwei_effect');
						}
					}
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					effect: {
						target(card, player, target) {
							if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
							if (get.tag(card, 'damage')) return [1, 0.55];
						}
					}
				}
			},
			lao_shengbai: {
				skillAnimation: true,
				animationColor: 'thunder',
				trigger: { player: 'dying' },
				zhuSkill: true,
				filter(event, player) {
					if (player.hp > 0) return false;
					if (!player.hasZhuSkill('lao_shengbai')) return false;
					return game.hasPlayer(current => current != player && current.group == 'wei');
				},
				mark: true,
				unique: true,
				limited: true,
				content() {
					'step 0'
					player.awakenSkill('lao_shengbai');
					var targets = game.filterPlayer();
					targets.remove(player);
					event.targets = targets;
					event.damages = [];
					event.lao_shengbai_target = trigger.source;
					'step 1'
					if (event.targets.length) {
						var current = event.targets.shift();
						if (current.group == 'wei' && current.isIn() && event.lao_shengbai_target.isIn()) {
							event.current = current;
							current.chooseBool('是否受到1点伤害，视为对' + get.translation(event.lao_shengbai_target) + '使用杀？').set('ai', function () {
								return get.effect(event.lao_shengbai_target, { name: 'sha' }, current, current) > 1;
							});
						}
						else {
							event.redo();
						}
					}
					else {
						event.goto(3);
					}
					'step 2'
					if (result.bool) {
						event.damages.push(event.current);
						event.current.useCard({ name: 'sha', isCard: true }, event.lao_shengbai_target, false);
					}
					if (event.targets.length) {
						event.goto(1);
					}
					'step 3'
					if (event.damages.length) {
						var next = game.createEvent('lao_shengbai_next');
						trigger.after.push(next);
						next.targets = event.damages;
						next.setContent(function () {
							for (var target of targets) {
								target.damage();
							}
						});
					}
				}
			},
			// 曹奂
			lao_zunqian: {
				trigger: { target: 'useCardToTargeted' },
				check(event, player) {
					var cards = player.getCards('h');
					if (cards.length <= 2) {
						for (var i = 0; i < cards.length; i++) {
							if (cards[i].name == 'shan' || cards[i].name == 'tao') return false;
						}
					}
					return true;
				},
				filter(event, player) {
					return event.card.name == 'sha';
				},
				content() {
					'step 0'
					player.chooseToDiscard(2, true, 'he');
					player.draw(2);
					var players = game.filterPlayer();
					players.sort(function (a, b) {
						return b.countCards('h') - a.countCards('h');
					});
					if (players[0].countCards('h') > players[1].countCards('h') && players[0] != player) {
						players[0].chooseBool(get.prompt2('lao_zunqian'));
						event.player = players[0];
					}
					else {
						event.finish();
					}
					'step 1'
					if (result.bool) {
						player.chooseToDiscard(2, true, 'he');
						player.draw(2);
					}
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (card.name == 'sha') return [1, 0.5];
						}
					}
				}
			},
			lao_yishan: {
				trigger: { player: 'damageAfter' },
				frequent: true,
				filter(event, player) {
					return (event.num > 0) && player.countCards('h', function (card) {
						return card.name == 'sha';
					}) > 0;
				},
				content() {
					'step 0'
					player.chooseBool(get.prompt2('lao_yishan', trigger.source));
					'step 1'
					if (result.bool) {
						var cards = player.getCards('h', function (card) {
							return card.name == 'sha';
						});
						if (cards.length > 0) player.discard(cards);
						trigger.source.draw(cards.length);
						player.draw(cards.length + 1);
					}
				},
			},
			lao_chongjia: {
				skillAnimation: true,
				animationColor: 'thunder',
				unique: true,
				juexingji: true,
				zhuSkill: true,
				keepSkill: true,
				derivation: ['olgongjie', 'twzhuiting'],
				trigger: { player: 'phaseZhunbeiBegin' },
				forced: true,
				filter(event, player) {
					if (!player.hasZhuSkill('lao_chongjia')) return false;
					return player.isMinHp();
				},
				content() {
					'step 0'
					player.awakenSkill('lao_chongjia');
					player.gainMaxHp();
					'step 1'
					if (player.hp < 3) player.recover(3 - player.hp);
					player.addSkillLog('olgongjie');
					player.addSkillLog('twzhuiting');
					'step 2'
					if (player.isZhu2()) event.trigger('zhuUpdate');
				}
			},
			// 曹宇
			lao_renlun: {
				trigger: { player: 'damageAfter' },
				frequent: true,
				filter(event) {
					return (event.num > 0)
				},
				content() {
					'step 0'
					player.draw(2);
					'step 1'
					if (!player.countCards('h')) event.finish();
					else player.showHandcards();
					'step 2'
					player.chooseCardTarget({
						filterCard(card) {
							var num = 0;
							for (var i = 0; i < ui.selected.cards.length; i++) {
								num += get.number(ui.selected.cards[i]);
							}
							return get.number(card) + num <= 13;
						},
						selectCard() {
							var num = 0;
							for (var i = 0; i < ui.selected.cards.length; i++) {
								num += get.number(ui.selected.cards[i]);
							}
							if (num == 13) return ui.selected.cards.length;
							return ui.selected.cards.length + 2;
						},
						filterTarget(card, player, target) {
							return player != target;
						},
						ai1(card) {
							var player = _status.event.player;
							if (player.maxHp - player.hp == 1 && card.name == 'du') return 30;
							var check = _status.event.check;
							if (check < 1) return 0;
							if (player.hp > 1 && check < 2) return 0;
							return get.unuseful(card) + 9;
						},
						ai2(target) {
							var att = get.attitude(_status.event.player, target);
							if (ui.selected.cards.length == 1 && ui.selected.cards[0].name == 'du') return 1 - att;
							return att - 2;
						},
						prompt: '令一名其他角色获得点数之和等于13的牌',
					}).set('check', check);
					'step 3'
					if (result.bool) {
						player.give(result.cards, result.targets[0]);
						player.line(result.targets, 'green');
					}
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					effect: {
						target(card, player, target) {
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
			lao_gongci: {
				trigger: { player: 'phaseDiscardBegin' },
				filter(event, player) {
					return player.countCards('h') > player.getHandcardLimit() - 1;
				},
				content() {
					'step 0'
					player.chooseTarget('恭辞：你可以选择一名其他角色，然后令你本回合手牌上限-1，你此阶段弃置的牌在进入弃牌堆前其获得其中不同花色的牌。', function (card, player, target) {
						return target != player;
					}).set('ai', function (target) {
						var att = get.attitude(_status.event.player, target);
						if (att < 0) {
							return att;
						}
						else if (att > 0) {
							if (target.hasSkill('remingjian') || target.hasSkill('xinfu_falu')) {
								return att;
							}
							return att / target.countCards('h');
						}
						else {
							return att / 100;
						}
					}).set('enemy', get.value(event.togive[0], player, 'raw') < 0);
					'step 1'
					if (result.bool) {
						player.addTempSkill('lao_gongci_effect');
						result.targets[0].addTempSkill('lao_gongci_gain');
					}
				},
				subSkill: {
					effect: {
						mod: {
							maxHandcard(player, num) {
								return num - 1;
							},
						},
					},
					gain: {
						trigger: { global: 'loseAfter' },
						filter(event, player) {
							var evt = event.getParent(3);
							return event.type == 'discard' && evt.name == 'phaseDiscard' && evt.player == event.player && evt.player != player && event.cards2 && event.cards2.filterInD('d').length > 0;
						},
						locked: false,
						forced: true,
						content() {
							"step 0"
							event.cards = trigger.cards2.filterInD('d');
							"step 1"
							var next = player.chooseCardButton('选择获得不同花色的牌', event.cards, [1, event.cards.length]).set('ai', function (button) {
								return get.value(button.link, player);
							}).set('filterButton', function (button) {
								for (var i = 0; i < ui.selected.buttons.length; i++) {
									if (get.suit(ui.selected.buttons[i].link) == get.suit(button.link)) return false;
								}
								return true;
							});
							"step 2"
							if (result.bool) {
								player.gain(result.links, 'gain2', 'log');
							}
						},
					}
				},
			},
			// 崔氏
			lao_huashang: {
				forced: true,
				audio: 2,
				trigger: {
					player: 'phaseJieshu',
				},
				mod: {
					maxHandcard(player, num) {
						return (3 > player.hp) ? 3 : player.hp;
					},
				},
				filter(event, player) {
					let flag = 4;
					if (player.countCards('h', { suit: 'heart' }) === 0) {
						flag -= 1;
					}
					if (flag && player.countCards('h', { suit: 'diamond' }) === 0) {
						flag -= 1;
					}
					if (flag && player.countCards('h', { suit: 'club' }) === 0) {
						flag -= 1;
					}
					if (flag && player.countCards('h', { suit: 'spade' }) === 0) {
						flag -= 1;
					}
					return !player.isEmpty(2) && flag >= 3;
				},
				unique: true,
				juexingji: true,
				skillAnimation: true,
				animationColor: 'water',
				derivation: 'shenfu',
				content() {
					player.awakenSkill(event.name);
					player.maxHp = 3;
					player.removeSkill('reluoshen');
					player.addSkill('shenfu');
				}
			},
			lao_pianwan: {
				audio: 'reqingguo',
				mod: {
					aiValue(player, card, num) {
						if (get.name(card) != 'shan' && get.suit(card) != 'club') return;
						var cards = player.getCards('h', function (card) {
							return get.name(card) == 'shan' || get.suit(card) == 'club';
						});
						cards.sort(function (a, b) {
							return (get.name(b) == 'shan' ? 1 : 2) - (get.name(a) == 'shan' ? 1 : 2);
						});
						var geti = function () {
							if (cards.contains(card)) {
								return cards.indexOf(card);
							}
							return cards.length;
						};
						if (get.name(card) == 'shan') return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6;
						return Math.max(num, [6.5, 4, 3][Math.min(geti(), 2)]);
					},
					aiUseful() {
						return lib.skill.qingguo.mod.aiValue.apply(this, arguments);
					},
				},
				enable: ['chooseToRespond', 'chooseToUse'],
				filterCard(card) {
					return get.suit(card) == 'club';
				},
				viewAs: { name: 'shan' },
				viewAsFilter(player) {
					if (!player.countCards('h', { suit: 'club' })) return false;
				},
				position: 'h',
				prompt: '弃置一张梅花手牌当闪使用或打出',
				check() { return 1 },
				onuse(result, player) {
					player.discard(result.cards);
				},
				ai: {
					order: 3,
					respondShan: true,
					skillTagFilter(player) {
						if (!player.countCards('h', { suit: 'club' })) return false;
					},
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'respondShan') && current < 0) return 0.6
						}
					}
				}
			},
			// 刘琮
			lao_tunquan: {
				audio: 2,
				skillAnimation: true,
				animationColor: 'gray',
				trigger: { player: 'phaseZhunbeiBegin' },
				forced: true,
				unique: true,
				juexingji: true,
				filter(event, player) {
					for (var i = 0; i < game.players.length; i++) {
						var name = game.players[i].name1;
						while (name.indexOf('_') != -1) {
							name = name.slice(name.indexOf('_') + 1);
						}
						if (name.indexOf('caocao') == 0) {
							return true;
						}
					}
					return false;
				},
				content() {
					player.awakenSkill('lao_tunquan');
					player.storage.lao_quxiang_rewrite = true;
				}
			},
			lao_quxiang: {
				audio: 2,
				derivation: 'lao_quxiang_rewrite',
				group: 'lao_quxiang_rewrite',
				usable: 1,
				trigger: { player: 'damageBegin2' },
				filter(event, player) {
					return player.countCards('h') > 0 && !player.storage.lao_quxiang_rewrite == true;
				},
				content() {
					'step 0'
					player.line(trigger.source, 'green');
					player.storage.lao_quxiangCards = player.getCards('h');
					player.give(player.storage.lao_quxiangCards, trigger.source);
					trigger.cancel();
					'step 1'
					var repayCards = player.storage.lao_quxiangCards.length > 1 ? 2 : 1;
					var str = '交给' + get.translation(player) + repayCards + '张手牌';
					trigger.source.chooseCard('h', repayCards, true, str);
					'step 2'
					if (result.cards) {
						trigger.source.give(result.cards, player);
					}
				},
				subSkill: {
					rewrite: {
						audio: 2,
						usable: 1,
						trigger: { player: 'damageBegin4' },
						filter(event, player) {
							return player.countCards('h') > 0 && player.storage.lao_quxiang_rewrite == true;
						},
						content() {
							'step 0'
							player.line(trigger.source, 'green');
							player.give(player.getCards('h'), trigger.source);
							trigger.cancel();
							'step 1'
							var str = '交给' + get.translation(player) + '一张手牌';
							trigger.source.chooseCard('h', true, str);
							'step 2'
							if (result.cards) {
								trigger.source.give(result.cards, player);
							}
						},
					},
				},
			},
			// 土安
			lao_tengbing: {
				trigger: {
					global: 'phaseBefore',
					player: 'enterGame',
				},
				forced: true,
				filter(event, player) {
					return (event.name != 'phase' || game.phaseNumber == 0) && player.hasEquipableSlot(1) && !player.getEquips('tengjia').length;
				},
				content() {
					var card = game.createCard2('tengjia', 'spade', 1 + Math.floor(Math.random() * 12));
					player.$gain2(card, false);
					game.delayx();
					player.equip(card);
				},
				mod: {
					canBeGained(card, source, player) {
						if (player.getEquips('tengjia').contains(card)) return false;
					},
					canBeDiscarded(card, source, player) {
						if (player.getEquips('tengjia').contains(card)) return false;
					},
					canBeReplaced(card, player) {
						if (player.getEquips('tengjia').contains(card)) return false;
					},
					cardname(card) {
						if (get.subtype(card, false) == 'equip2') return 'nanman';
					},
					cardnature(card) {
						if (get.subtypes(card, false).contains('equip2')) return false;
					},
					cardDiscardable(card, player) {
						if (player.getEquips('tengjia').contains(card)) return false;
					},
					cardEnabled2(card, player) {
						if (player.getEquips('tengjia').contains(card)) return false;
					},
				},
				group: ['lao_tengbing_blocker'],
				subSkill: {
					blocker: {
						trigger: { player: ['loseBefore', 'disableEquipBefore'] },
						forced: true,
						filter(event, player) {
							if (event.name == 'disableEquip') return (event.slots.contains('equip2'));
							var cards = player.getEquips('tengjia');
							return event.cards.some(card => cards.contains(card));
						},
						content() {
							if (trigger.name == 'lose') {
								trigger.cards.removeArray(player.getEquips('tengjia'));
							}
							else {
								while (trigger.slots.contains('equip2')) trigger.slots.remove('equip2');
							}
						},
					},
				},
			},
			lao_ranwang: {
				trigger: { player: 'damageBegin4' },
				filter(event, player) {
					return event.hasNature('fire');
				},
				forced: true,
				check() {
					return false;
				},
				content() {
					if (trigger.num > 1) {
						trigger.num--;
					}
					player.loseMaxHp();
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (card.name == 'sha') {
								if (game.hasNature(card, 'fire') || player.hasSkill('zhuque_skill')) return 2;
							}
							if (get.tag(card, 'fireDamage') && current < 0) return 2;
						}
					}
				},
			},
			// 奚泥
			lao_ranyong: {
				trigger: { player: 'damageBegin4' },
				filter(event, player) {
					return event.hasNature('fire');
				},
				forced: true,
				check() {
					return false;
				},
				content() {
					if (trigger.num > 1) {
						trigger.num--;
					}
					if (player.isMaxHp()) {
						trigger.num++;
					} else {
						for (let target of game.players) {
							if (target.isMaxHp() && target != player) {
								trigger.source.line(target);
								target.damage('fire', trigger.source);
								// target.damage('fire');
							}
						}
					}
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (player.isMaxHp()) {
								if (card.name == 'sha') {
									if (game.hasNature(card, 'fire') || player.hasSkill('zhuque_skill')) return 2;
								}
								if (get.tag(card, 'fireDamage') && current < 0) return 2;
							} else {
								if (card.name == 'sha') {
									if (game.hasNature(card, 'fire') || player.hasSkill('zhuque_skill')) return 1.3;
								}
								if (get.tag(card, 'fireDamage') && current < 0) return 1.3;
							}
						}
					}
				},
			},

			// 王者公共技
			hok_yinshen: {
				charlotte: true,
				locked: false,
				forced: true,
				marktext: '隐',
				intro: {
					name: '隐身',
					content: '不能成为【杀】和目标数为1的锦囊牌的目标',
				},
				mod: {
					targetEnabled(card, player, target) {
						if (card.name == 'sha') {
							return false;
						}
						if (card.name == 'wuzhong' || card.name == 'lebu' || card.name == 'bingliang' || card.name == 'shandian'
							|| card.name == 'guohe' || card.name == 'shunshou' || card.name == 'juedou' || card.name == 'huogong' || card.name == 'qizhengxiangsheng') {
							return false;
						}
					}
				},
				trigger: { player: ['useCard', 'respond'] },
				filter(event) {
					return (get.type(event.card) == 'trick' || get.type(event.card) == 'delay' || event.card.name == 'sha');
				},
				content() {
					player.removeMark('hok_yinshen', 1);
					player.removeSkill('hok_yinshen');
				},
			},
			hok_temp_hp: {
				charlotte: true,
				marktext: '体',
				intro: {
					name: '临时体力',
					content: 'mark',
				},
				forced: true,
				trigger: { player: 'damageEnd' },
				content() {
					'step 0'
					event.num = trigger.num;
					'step 1'
					player.removeMark('hok_temp_hp', trigger.num);
					'step 2'
					player.loseMaxHp(trigger.num);
					event.num--;
					if (event.num == 0 || !player.hasMark('hok_temp_hp')) {
						event.finish();
					}
					'step 3'
					event.goto(1);
				}
			},
			// 艾琳
			hok_lingwu: {
				trigger: {
					global: 'phaseBefore',
					player: 'enterGame',
				},
				forced: true,
				filter(event, player) {
					return game.phaseNumber == 0;
				},
				content() {
					player.expandEquip(1);
					var card = get.cardPile(function (card) {
						return get.subtype(card) == 'equip1';
					});
					player.$gain2(card, false);
					game.delayx();
					player.equip(card);
				},
			},
			hok_yewu: {
				derivation: 'hok_yueguishengfang',
				usable: 1,
				enable: 'phaseUse',
				filterTarget(card, player, target) {
					return player != target && target.getCards('h').length != 0;
				},
				content() {
					if (player.countMark('hok_yueguishengfang') < 18) {
						player.addMark('hok_yueguishengfang', 2);
					}
					var cards = target.getCards('h', function (card) {
						return lib.filter.cardDiscardable(card, player, 'hok_yewu');
					});
					if (cards.length > 0) target.discard(cards.randomGet());
				},
				ai: {
					result: {
						target(player, target) {
							return -1;
						}
					},
					threaten: 1,
					order: 9,
					expose: 0.2,
				}
			},
			hok_xuanwu: {
				derivation: 'hok_yueguishengfang',
				locked: false,
				forced: true,
				trigger: {
					player: ['useCardAfter', 'respondAfter'],
				},
				filter(event, player) {
					if (player.hasSkill('hok_xuanwu_turn')) {
						return false;
					}
					return event.card && event.card.name == 'sha';
				},
				content() {
					if (player.countMark('hok_yueguishengfang') < 18) {
						player.addMark('hok_yueguishengfang', 1);
					}
					if (player.getHistory('gain', function (evt) {
						return evt.getParent(2).name == 'hok_xuanwu';
					}).length < 3) {
						player.draw();
					}
				},
				subSkill: {
					turn: { charlotte: true },
				}
			},
			hok_yueguishengfang: {
				marktext: '月',
				intro: {
					name: '月桂',
					content: 'mark',
				},
				usable: 1,
				enable: 'phaseUse',
				filter(event, player) {
					return player.countMark('hok_yueguishengfang') >= 6;
				},
				content() {
					'step 0'
					event.sum = Math.floor(player.countMark('hok_yueguishengfang') / 3);
					event.num = 0;
					player.addSkill('hok_xuanwu_turn');
					'step 1'
					event.num++;
					player.chooseUseTarget({
						name: 'sha',
						nature: 'thunder',
						isCard: true,
					}, '请选择雷【杀】的目标（' + event.num + '/' + event.sum + '）', false);
					'step 2'
					if (result.bool) {
						player.removeMark('hok_yueguishengfang', 3);
					}
					'step 3'
					if (result.bool && event.num < event.sum) {
						event.goto(1);
					}
					'step 4'
					player.removeSkill('hok_xuanwu_turn');
				},
				ai: {
					order() {
						return get.order({
							name: 'sha',
							nature: 'thunder',
							isCard: true,
						});
					},
					result: {
						player(player) {
							if (player.hasValueTarget({
								name: 'sha',
								nature: 'thunder',
								isCard: true,
							})) return 1;
							return 0;
						},
					},
				},
			},
			// 百里玄策
			hok_rexue: {
				trigger: { source: 'dieAfter' },
				forced: true,
				locked: false,
				content() {
					player.draw(2);
				},
			},
			hok_yangou: {
				derivation: 'hok_yangou_lock',
				usable: 1,
				enable: 'phaseUse',
				filterTarget: lib.filter.notMe,
				content() {
					'step 0'
					target.judge(function (card) {
						if (get.number(card) > 4) return 2;
						return -2;
					}).judge2 = function (result) {
						return result.bool;
					};
					'step 1'
					if (result.bool) {
						target.addTempSkill('hok_yangou_effect');
					}
				},
				group: ['hok_yangou_lock'],
				subSkill: {
					effect: {
						charlotte: true,
						mark: true,
						intro: {
							name: '魇钩',
							content: '不能使用和打出【闪】',
						},
						mod: {
							cardEnabled2(card, player) {
								if (card.name == 'shan') return false;
							},
						},
						ai: {
							effect: {
								target(card, player, target) {
									if (get.tag(card, 'damage')) return [0, -999999];
								},
							},
						},
					},
					lock: {
						usable: 1,
						enable: 'phaseUse',
						filter(event, player) {
							return game.hasPlayer(function (current) {
								return current.hasSkill('hok_yangou_effect');
							});
						},
						content() {
							var target = game.filterPlayer(function (current) {
								return current.hasSkill('hok_yangou_effect');
							})[0];
							var playerSeatNum = player.getSeatNum();
							var targetSeatNum = target.getSeatNum();
							var farthestSeatNum = (playerSeatNum + game.countPlayer() / 2) % game.countPlayer();
							var swapPlayer = player;
							if ((playerSeatNum < farthestSeatNum && (targetSeatNum < playerSeatNum || targetSeatNum > farthestSeatNum)) || (playerSeatNum > farthestSeatNum && (targetSeatNum < playerSeatNum && targetSeatNum > farthestSeatNum))) {
								swapPlayer = player.next;
							}
							// if (farthestSeatNum % 1 != 0 && targetSeatNum == farthestSeatNum + 0.5) {
							// swapPlayer = player.next;
							// }
							// game.swapSeat(target, swapPlayer, null, true);
							game.broadcastAll(function (target1, target2) {
								game.swapSeat(target1, target2, null, true);
							}, target, swapPlayer);
							var equip3 = target.getCards('e', { subtype: 'equip3' })
							if (equip3) {
								target.discard(equip3).discarder = player;
							}
						},
						ai: {
							result: { player: 1 },
							order: 11,
						}
					},
				},
				ai: {
					result: { target: -1 },
					threaten: 1.5,
					order: 11.5,
				}
			},
			hok_lianshan: {
				derivation: 'hok_yangou_lock',
				usable: 1,
				enable: 'phaseUse',
				filterTarget(card, player, target) {
					if (target == player) {
						return false;
					}
					return get.distance(player, target) <= 1 || target.hasSkill('hok_yangou_effect');
				},
				content() {
					if (target.hasSkill('hok_yangou_effect')) {
						player.addTempSkill('hok_lianshan_effect');

						var playerSeatNum = player.getSeatNum();
						player.storage.hok_seat = player.next;
						var targetSeatNum = target.getSeatNum();
						var farthestSeatNum = (targetSeatNum + game.countPlayer() / 2) % game.countPlayer();
						var swapPlayer = target;
						if ((targetSeatNum < farthestSeatNum && (playerSeatNum < targetSeatNum || playerSeatNum > farthestSeatNum)) || (targetSeatNum > farthestSeatNum && (playerSeatNum < targetSeatNum && playerSeatNum > farthestSeatNum))) {
							swapPlayer = target.next;
						}
						game.broadcastAll(function (target1, target2) {
							game.swapSeat(target1, target2, null, true);
						}, player, swapPlayer);
						target.damage('nocard');
					} else {
						if (game.hasPlayer(current => {
							return current.hasSkill('hok_yangou_effect');
						})) {
							var tar = game.filterPlayer(current => {
								return current.hasSkill('hok_yangou_effect');
							})[0];
							tar.removeSkill('hok_yangou_effect');
						}
						target.addTempSkill('hok_yangou_effect');
					}
				},
				subSkill: {
					effect: {
						forced: true,
						trigger: { player: 'phaseEnd' },
						content() {
							game.broadcastAll(function (target1, target2) {
								game.swapSeat(target1, target2, null, true);
							}, player, player.storage.hok_seat);
						}
					}
				},
				ai: {
					result: {
						target(player, target) {
							return -1;
						}
					},
					threaten: 1.5,
					order: 11.1,
					expose: 0.3,
				}
			},
			// 妲己
			hok_meixin: {
				enable: 'phaseUse',
				usable: 1,
				marktext: '魅',
				intro: {
					name: '魅心',
					content: 'mark',
				},
				filter(event, player) {
					return player.countCards('h', { color: 'red' }) > 0;
				},
				enable: 'chooseToUse',
				filterCard(card) {
					return get.color(card) == 'red';
				},
				position: 'h',
				viewAs: { name: 'lebu' },
				prompt: '将一张红色手牌当乐不思蜀使用',
				onuse(result, player) {
					if (player.countMark('hok_meixin') < 4) {
						player.addMark('hok_meixin', 1);
					}
				},
				check(card) {
					return 7 - get.value(card);
				},
				ai: {
					result: {
						target(player, target) {
							return get.effect(target, { name: 'lebu' }, player, target);
						}
					},
					order: 9,
				}
			},
			hok_huhuo: {
				audio: 2,
				enable: 'phaseUse',
				usable: 1,
				skillAnimation: true,
				animationColor: 'orange',
				filter(event, player) {
					return player.countMark('hok_meixin') >= 3;
				},
				content() {
					'step 0'
					player.removeMark('hok_meixin', 3);
					'step 1'
					player.chooseTarget('为狐火减少1~3个目标', [1, 3], function (card, player, target) {
						return player.inRange(target);
					}).set('ai', function (target) {
						if (target == player || !player.inRange(target)) {
							return false;
						}
						return get.attitude(_status.event.player, target);
					});
					'step 2'
					event.huhuoList = game.filterPlayer(function (target) {
						return player.inRange(target) && !target.isDead() && target != player;
					});
					event.huhuoDamage = (event.huhuoList.length > 6 ? 5 : 3);
					if (result.bool) {
						for (var i = 0; i < result.targets.length; i++) {
							// event.huhuoList.splice(event.huhuoList.indexOf(result.targets[0]), 1);
							event.huhuoList.splice(event.huhuoList.indexOf(result.targets[i]), 1);
						}
					}
					'step 3'
					for (var i = 0; i < event.huhuoDamage; i++) {
						huhuoTarget = event.huhuoList.randomGet();
						player.line(huhuoTarget, 'fire');
						huhuoTarget.damage('fire');
					}
				},
				ai: {
					order: 1,
					expose: 0.2,
					result: {
						player(player) {
							var list = game.filterPlayer(function (target) {
								return player.inRange(target) && !target.isDead() && target != player && get.attitude(_status.event.player, target) < 0 ? true : false;
							});
							if (list.length >= 1) {
								return 1;
							}
							return 0;
						}
					},
					// effect: {
					// 	target(card, player, target) {
					// 		if (player == target && (get.subtype(card) == 'equip1' || get.subtype(card) == 'equip4')) {
					// 			if (get.equipValue(card) < 5) return 0;
					// 		}
					// 		if (!target.isEmpty(1)) return;
					// 		return 1;
					// 	}
					// }
				},
			},
			// 李信
			hok_guangan: {
				enable: 'phaseUse',
				usable: 1,
				marktext: '信',
				intro: {
					name: '信',
					content: 'mark',
				},
				filter(event, player) {
					if (player.countCards('hes') < 2) {
						return false;
					}
					if (player.storage.hok_tongkuang == '统御' || player.storage.hok_tongkuang == '狂暴') {
						return true;
					}
					return false;
				},
				content() {
					'step 0'
					player.chooseToDiscard(2, 'hes');
					'step 1'
					if (result.bool) {
						if (player.storage.hok_tongkuang == '统御') {
							if (player.hasSkill('hok_liehua')) {
								player.removeSkill('hok_liehua');
							}
							if (player.hasSkill('hok_guangzhan')) {
								player.removeSkill('hok_guangzhan');
							}
							player.addSkill('hok_baochong');
							player.addSkill('hok_cansi');
							player.storage.hok_tongkuang = '狂暴';
							player.popup('狂暴');
						}
						else if (player.storage.hok_tongkuang == '狂暴') {
							if (player.hasSkill('hok_baochong')) {
								player.removeSkill('hok_baochong');
							}
							if (player.hasSkill('hok_cansi')) {
								player.removeSkill('hok_cansi');
							}
							player.addSkill('hok_liehua');
							player.addSkill('hok_guangzhan');
							player.storage.hok_tongkuang = '统御';
							player.popup('统御');
						}
					}
				},
				group: 'hok_guangan_1',
				subSkill: {
					1: {
						trigger: { player: 'phaseBegin' },
						forced: true,
						locked: false,
						filter(event, player) {
							if (player.countMark('hok_guangan') < 3) {
								return true;
							}
							return false;
						},
						content() {
							player.addMark('hok_guangan', 1);
						}
					}
				}
			},
			hok_huiren: {
				trigger: { source: 'damageSource' },
				forced: true,
				filter(event, player) {
					return event.num > 0;
				},
				content() {
					player.addMark('hok_guangan', 1);
				},
			},
			hok_qiangzhan: {
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					return game.hasPlayer(target => player.canUse({ name: 'sha' }, target, false)) && player.countCards('h');
				},
				filterCard: true,
				filterTarget(card, player, target) {
					return player.canUse({ name: 'sha', isCard: true }, target, false);
				},
				check: (card) => 5 - get.value(card),
				prompt: '弃置一张手牌，视为对场上的一名角色使用了一张【杀】（无视距离且不计入次数）',
				content() {
					player.useCard({ name: 'sha', isCard: true }, target, false);
				},
				ai: {
					order() {
						return get.order({
							name: 'sha',
							isCard: true,
						});
					},
					result: {
						player(player) {
							if (player.hasValueTarget({
								name: 'sha',
								isCard: true,
							})) return 1.5;
							return 0.5;
						},
					},
				},
			},
			hok_tongkuang: {
				unique: true,
				limited: true,
				enable: 'phaseUse',
				skillAnimation: true,
				animationColor: 'gray',
				derivation: ['hok_tongyu_faq', 'hok_kuangbao_faq'],
				filter(event, player) {
					return player.countMark('hok_guangan') >= 3;
				},
				content() {
					'step 0'
					player.awakenSkill('hok_tongkuang');
					player.removeSkill('hok_huiren');
					player.removeSkill('hok_qiangzhan');
					'step 1'
					player.chooseControl('统御', '狂暴').set('prompt', '统狂：请选择一项').set('choiceList', [
						'统御<br/>\
						烈华：出牌阶段开始前，你可以跳过出牌阶段，下回合出牌阶段开始时视为使用2张雷杀。<br/>\
						光斩：你的攻击范围+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并跳过出牌阶段，下回合开始时弃置你判定区的牌并选择攻击范围内至多2名其他角色，对每名目标角色造成2点雷电伤害。',
						'狂暴<br/>\
						暴冲：出牌阶段开始前，你可以跳过出牌阶段和弃牌阶段，下回合开始时弃置你判定区的牌并回复1点体力。<br/>\
						残撕：摸牌阶段，你的摸牌数+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并选择攻击范围的其他角色，弃置其2张牌，令你本回合杀的次数+1。'
					]).set('ai', function () {
						return '统御';
					});
					'step 2'
					player.storage.hok_tongkuang = result.control;
					if (player.storage.hok_tongkuang == '统御') {
						player.addSkill('hok_liehua');
						player.addSkill('hok_guangzhan');
						player.popup('统御');
					}
					else {
						player.addSkill('hok_baochong');
						player.addSkill('hok_cansi');
						player.popup('狂暴');
					}
				},
				ai: {
					order: 3,
					result: {
						player: 1,
					},
				}
			},
			hok_liehua: {
				trigger: { player: 'phaseUseBefore' },
				filter(event, player) {
					return !player.hasSkill('hok_liehua_effect') && !player.hasSkill('hok_guangzhan_effect');
				},
				content() {
					trigger.cancel();
					player.addSkill('hok_liehua_effect');
				},
				check(event, player) {
					if (player.countMark('hok_guangan') >= 3) {
						return false;
					}
					let cards = player.getCards('h');
					let sumValue = 0;
					for (let i = 0; i < cards.length; i++) {
						sumValue += get.value(cards[i]);
					}
					if (player.hp > cards.length) {
						return true;
					}
					if (sumValue / cards.length > 7) {
						return false;
					}
					if (player.hp >= cards.length - 2 && sumValue / cards.length <= 5) {
						return true;
					}
					return false;
				},
				subSkill: {
					effect: {
						trigger: { player: 'phaseUseBegin' },
						forced: true,
						locked: false,
						content() {
							'step 0'
							event.num = 0;
							'step 1'
							event.num++;
							player.chooseUseTarget({
								name: 'sha',
								nature: 'thunder',
								isCard: true,
							}, '请选择雷【杀】的目标（' + event.num + '/2）', false);
							'step 2'
							if (result.bool && event.num < 2) event.goto(1);
						},
						group: ['hok_liehua_1', 'hok_liehua_2'],
					},
					1: {
						trigger: { player: 'phaseZhunbeiBegin' },
						forced: true,
						locked: false,
						content() {
							player.storage.hok_liehua_on = true;
						}
					},
					2: {
						trigger: { player: 'phaseJieshuBegin' },
						forced: true,
						locked: false,
						filter(event, player) {
							return player.storage.hok_liehua_on;
						},
						content() {
							player.storage.hok_liehua_on = false;
							player.removeSkill('hok_liehua_effect');
						}
					}
				}
			},
			hok_guangzhan: {
				trigger: { player: 'phaseUseBefore' },
				filter(event, player) {
					if (player.hasSkill('hok_liehua_effect') || player.hasSkill('hok_guangzhan_effect')) {
						return false;
					}
					return player.countMark('hok_guangan') >= 3;
				},
				content() {
					trigger.cancel();
					player.removeMark('hok_guangan', 3);
					player.addSkill('hok_guangzhan_effect');
				},
				group: ['hok_guangzhan_attack'],
				subSkill: {
					effect: {
						trigger: { player: 'phaseBegin' },
						forced: true,
						locked: false,
						content() {
							'step 0'
							player.discard(player.getCards('j'));
							player.chooseTarget(get.prompt('hok_guangzhan'), '选择攻击范围内至多2名其他角色，依次对这些角色造成2点雷电伤害', [1, 2], function (card, player, target) {
								return player.inRange(target);
							}).set('ai', target => {
								var player = _status.event.player;
								if (target == player || !player.inRange(target)) {
									return false;
								}
								return get.damageEffect(target, player, player, 'thunder') * Math.sqrt(2);
							});
							'step 1'
							if (result.bool) {
								var targets = result.targets;
								targets.sortBySeat();
								player.logSkill('hok_guangzhan', targets);
								for (var target of targets) {
									target.damage(2, 'thunder');
								}
							}
						},
						group: ['hok_guangzhan_1', 'hok_guangzhan_2'],
					},
					1: {
						trigger: { player: 'phaseZhunbeiBegin' },
						forced: true,
						locked: false,
						content() {
							player.storage.hok_guangzhan_on = true;
						}
					},
					2: {
						trigger: { player: 'phaseJieshuBegin' },
						forced: true,
						locked: false,
						filter(event, player) {
							return player.storage.hok_guangzhan_on;
						},
						content() {
							player.storage.hok_guangzhan_on = false;
							player.removeSkill('hok_guangzhan_effect');
						}
					},
					attack: {
						mod: {
							attackRange(player, num) {
								return num + 1;
							},
						}
					}
				}
			},
			hok_baochong: {
				trigger: { player: 'phaseUseBefore' },
				filter(event, player) {
					return !player.hasSkill('hok_baochong_effect');
				},
				content() {
					trigger.cancel();
					player.skip('phaseDiscard');
					player.addTempSkill('hok_baochong_effect', { player: 'phaseZhunbeiBegin' });
				},
				subSkill: {
					effect: {
						trigger: { player: 'phaseBegin' },
						forced: true,
						locked: false,
						content() {
							player.discard(player.getCards('j'));
							player.recover();
						}
					}
				}
			},
			hok_cansi: {
				trigger: { player: 'phaseUseBefore' },
				filter(event, player) {
					if (player.hasSkill('hok_baochong_effect')) {
						return false;
					}
					return player.countMark('hok_guangan') >= 3;
				},
				content() {
					'step 0'
					player.removeMark('hok_guangan', 3);
					'step 1'
					player.chooseTarget('选择一名其他角色，弃置其2张牌', function (card, player, target) {
						return player.inRange(target);
					}).set('ai', function (target) {
						if (target == player || !player.inRange(target)) {
							return false;
						}
						return get.attitude(_status.event.player, target);
					});
					'step 2'
					if (result.bool) {
						var target = result.targets[0];
						player.discardPlayerCard(target, 'h', [1, 2], true);
					}
					player.addTempSkill('hok_cansi_effect');
				},
				group: ['hok_cansi_yingzi'],
				subSkill: {
					effect: {
						forced: true,
						locked: false,
						mod: {
							cardUsable(card, player, num) {
								if (card.name == 'sha') return num + 1;
							}
						},
					},
					yingzi: {
						trigger: { player: 'phaseDrawBegin2' },
						forced: true,
						locked: false,
						filter(event, player) {
							return !event.numFixed;
						},
						content() {
							trigger.num++;
						},
						ai: {
							threaten: 1.3
						}
					},
				}
			},
			// 马可波罗
			hok_zuolun: {
				audio: 2,
				marktext: '轮',
				intro: {
					name: '左轮',
					content: 'mark',
				},
				forced: true,
				group: ['hok_zuolun_effect'],
				trigger: {
					source: 'damageSource',
				},
				filter(event) {
					return event.num > 0;
				},
				content() {
					if (trigger.player.countMark('hok_zuolun') < 2) {
						trigger.player.addMark('hok_zuolun', 1);
					}
				},
			},
			hok_zuolun_effect: {
				audio: 2,
				forced: true,
				trigger: {
					global: ['damageBefore'],
				},
				filter(event, player) {
					return event.name == 'damage';
				},
				content() {
					if (trigger.player.countMark('hok_zuolun') >= 2 && trigger.source.hasSkill('hok_zuolun')) {
						trigger.cancel();
						trigger.player.loseHp(trigger.num);
					}
				},
				ai: {
					jueqing: true
				},
			},
			hok_qianglin: {
				audio: 2,
				usable: 1,
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name == 'sha' && player.countCards('h', 'sha') >= 1 && player.isPhaseUsing();
				},
				content() {
					'step 0'
					player.chooseToDiscard(true, 1, 'h', '弃置一张杀，视为对该角色使用两张【雷杀】（不可以触发酒）。', { name: 'sha' });
					player.addSkill('hok_qianglin_draw');
					'step 1'
					trigger.cancel();
					// player.chooseUseTarget({ name: 'sha', nature: 'thunder' }, '视为使用两张【雷杀】');
					for (target of trigger.targets) {
						player.useCard({ name: 'sha', nature: 'thunder' }, target);
						player.useCard({ name: 'sha', nature: 'thunder' }, target);
					}
					'step 2'
					// 'step 3'
					player.removeSkill('hok_qianglin_draw');
				},
				group: ['hok_qianglin_begin'],
				subSkill: {
					draw: {
						trigger: {
							global: ['damageEnd', 'loseHpEnd'],
						},
						forced: true,
						// usable: 1,
						content() {
							player.draw();
						},
					},
					begin: {
						frequent: true,
						trigger: { player: 'phaseUseBegin' },
						content() {
							var card = get.cardPile(function (cardx) {
								return cardx.name == 'sha';
							});
							if (card) player.gain(card, 'gain2', 'log');
						},
					}
				},
				ai: {
					order() {
						return get.order({ name: 'sha' }) - 0.1;
					},
					expose: 0.2,
					threaten: 2,
					result: {
						player(player) {
							var qianglin = game.filterPlayer(function (target) {
								return get.attitude(_status.event.player, target) < 0;
							});
							return qianglin.length > 0 ? 1 : 0;
						},
					},
				},
			},
			hok_danyu: {
				audio: 2,
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					return player.countCards('hs') >= 4;
				},
				filterTarget: lib.filter.notMe,
				selectTarget: [1, 3],
				multitarget: true,
				multiline: true,
				content() {
					'step 0'
					event.danyuCards = player.getCards('hs');
					'step 1'
					if (event.danyuCards != undefined) {
						player.discard(event.danyuCards);
					}
					targets.sortBySeat();
					'step 2'
					for (var target of targets) {
						var r = Math.floor(Math.random() * 2) + 1;
						for (var dan = 0; dan < r; dan++) {
							target.damage(1, 'thunder');
						}
					}
				},
				ai: {
					order() {
						return get.order({ name: 'sha' }) + 0.1;
					},
					expose: 0.2,
					threaten: 2,
					result: {
						target(player, target) {
							var residualBlood = false;
							var list = game.filterPlayer(function (target) {
								var att = get.attitude(_status.event.player, target) <= -1;
								if (att && target.hp <= 2) {
									residualBlood = true;
								}
								return target != player && att || player.hp <= 2;
							});
							if (list.length >= 3 && residualBlood) {
								if (get.attitude(player, target) <= -1) {
									return -1;
								}
							}
							return 0;
						},
					},
				},
			},
			// 明世隐
			hok_lingua: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget: lib.filter.notMe,
				content() {
					player.removeSkill('hok_lingua2');
					player.logSkill('hok_lingua');
					player.line('hok_lingua', target);
					player.storage.hok_lingua2 = target;
					player.addSkill('hok_lingua2');
					if (player.hasSkill('hok_lingua_2') || player.hasSkill('hok_lingua_4')) {
						player.popup('目标弃牌');
					} else {
						player.popup('目标摸牌');
					}
				},
				group: ['hok_lingua_yang', 'hok_lingua_yin'],
				subSkill: {
					yang: {
						trigger: { player: 'logSkill' },
						filter(event, player) {
							if (event.skill != 'hok_lingua') return false;
							return player.storage.hok_lingua1;
						},
						forced: true,
						locked: false,
						content() {
							'step 0'
							if (player.hasSkill('hok_lingua_3')) {
								player.removeSkill('hok_lingua_3');
							}
							if (player.hasSkill('hok_lingua_4')) {
								player.removeSkill('hok_lingua_4');
							}
							player.chooseControl('选项一', '选项二').set('prompt', '临卦：请选择一项').set('choiceList', [
								'目标角色造成伤害后摸1张牌',
								'目标角色造成伤害后随机弃置1张手牌'
							]).set('ai', function () {
								if (get.attitude(player, target) > 0) {
									return '选项一';
								} else {
									return '选项二';
								}
							});
							'step 1'
							if (result.control == '选项一') {
								player.addSkill('hok_lingua_3');
								game.log('目标角色造成伤害后摸1张牌');
								player.popup('目标摸牌');
							}
							else {
								player.addSkill('hok_lingua_4');
								game.log('目标角色造成伤害后随机弃置1张手牌');
								player.popup('目标弃牌');
							}
						}
					},
					yin: {
						trigger: { player: 'logSkill' },
						filter(event, player) {
							if (event.skill != 'hok_lingua') return false;
							return player.storage.hok_lingua1 != true;
						},
						forced: true,
						locked: false,
						content() {
							'step 0'
							if (player.hasSkill('hok_lingua_1')) {
								player.removeSkill('hok_lingua_1');
							}
							if (player.hasSkill('hok_lingua_2')) {
								player.removeSkill('hok_lingua_2');
							}
							player.chooseControl('选项一', '选项二').set('prompt', '临卦：请选择一项').set('choiceList', [
								'你的回合结束时，目标角色摸1张牌',
								'你的回合结束时，目标角色弃置1张牌'
							]).set('ai', function () {
								if (get.attitude(player, target) > 0) {
									return '选项一';
								} else {
									return '选项二';
								}
							});
							'step 1'
							if (result.control == '选项一') {
								player.addSkill('hok_lingua_1');
								game.log(get.translation(player.name) + '回合结束时，目标角色摸1张牌');
								player.popup('目标摸牌');
							}
							else {
								player.addSkill('hok_lingua_2');
								game.log(get.translation(player.name) + '回合结束时，目标角色弃置1张牌');
								player.popup('目标弃牌');
							}
						}
					},
					1: {
						trigger: { player: 'phaseJieshuBegin' },
						forced: true,
						locked: false,
						// charlotte: true,
						content() {
							player.storage.hok_lingua2.draw(1);
						}
					},
					2: {
						trigger: { player: 'phaseJieshuBegin' },
						forced: true,
						locked: false,
						// charlotte: true,
						content() {
							player.storage.hok_lingua2.chooseToDiscard('hes', '弃置1张牌').set('ai', function (card) {
								return 8 - get.value(card);
							});
						}
					},
					3: {
						trigger: { global: 'damageSource' },
						forced: true,
						locked: false,
						// charlotte: true,
						filter(event, player) {
							return event.source == player.storage.hok_lingua2;
						},
						content() {
							player.storage.hok_lingua2.draw(1);
						}
					},
					4: {
						trigger: { global: 'damageSource' },
						forced: true,
						locked: false,
						// charlotte: true,
						filter(event, player) {
							return event.source == player.storage.hok_lingua2;
						},
						content() {
							var cards = player.storage.hok_lingua2.getCards('h', function (card) {
								return lib.filter.cardDiscardable(card, player, 'hok_lingua');
							});
							if (cards.length > 0) player.storage.hok_lingua2.discard(cards.randomGet());
						}
					},
				},
				ai: {
					result: {
						target(player, target) {
							if (target.hasSkillTag('nogain')) return 0;
							if (player.countCards('h') == player.countCards('h', 'du')) return -1;
							if (target.hasJudge('lebu')) return 0;
							if (get.threaten(target) > 3) return get.threaten(target);
							return -1;
						},
					},
					order: 9,
					threaten: 3,
					expose: 0.2,
				}
			},
			hok_lingua2: {
				charlotte: true,
				onremove: true,
				mark: 'character',
				intro: { content: '临卦：$' },
			},
			hok_shigua: {
				enable: 'phaseUse',
				content() {
					player.logSkill('hok_shigua');
					player.storage.hok_lingua1 = (player.storage.hok_lingua1 == true ? true : false);
					player.storage.hok_shigua = player.storage.hok_lingua1;
				},
				group: ['hok_shigua_yang', 'hok_shigua_yin'],
				subSkill: {
					yang: {
						trigger: { player: 'logSkill' },
						filter(event, player) {
							if (event.skill != 'hok_shigua') return false;
							return player.storage.hok_shigua != true;
						},
						forced: true,
						locked: false,
						content() {
							'step 0'
							player.storage.hok_lingua1 = true;
							if (player.hasSkill('hok_lingua_1')) {
								player.removeSkill('hok_lingua_1');
							}
							if (player.hasSkill('hok_lingua_2')) {
								player.removeSkill('hok_lingua_2');
							}
							player.chooseControl('选项一', '选项二').set('prompt', '临卦：请选择一项').set('choiceList', [
								'目标角色造成伤害后摸1张牌',
								'目标角色造成伤害后随机弃置1张手牌'
							]).set('ai', function () {
								if (get.attitude(player, target) > 0) {
									return '选项一';
								} else {
									return '选项二';
								}
							});
							'step 1'
							if (result.control == '选项一') {
								player.addSkill('hok_lingua_3');
								game.log('目标角色造成伤害后摸1张牌');
							}
							else {
								player.addSkill('hok_lingua_4');
								game.log('目标角色造成伤害后随机弃置1张手牌');
							}
						}
					},
					yin: {
						trigger: { player: 'logSkill' },
						filter(event, player) {
							if (event.skill != 'hok_shigua') return false;
							return player.storage.hok_shigua;
						},
						forced: true,
						locked: false,
						content() {
							'step 0'
							player.storage.hok_lingua1 = false;
							if (player.hasSkill('hok_lingua_3')) {
								player.removeSkill('hok_lingua_3');
							}
							if (player.hasSkill('hok_lingua_4')) {
								player.removeSkill('hok_lingua_4');
							}
							player.chooseControl('选项一', '选项二').set('prompt', '临卦：请选择一项').set('choiceList', [
								'你的回合结束时，目标角色摸1张牌',
								'你的回合结束时，目标角色弃置1张牌'
							]).set('ai', function () {
								if (get.attitude(player, target) > 0) {
									return '选项一';
								} else {
									return '选项二';
								}
							});
							'step 1'
							if (result.control == '选项一') {
								player.addSkill('hok_lingua_1');
								game.log(get.translation(player.name) + '回合结束时，目标角色摸1张牌');
							}
							else {
								player.addSkill('hok_lingua_2');
								game.log(get.translation(player.name) + '回合结束时，目标角色弃置1张牌');
							}
						}
					},
				},
				ai: {
					result: {
						target(player, target) {
							if (get.threaten(target) > 5 && !player.storage.hok_lingua1) {
								return 1;
							}
							if (get.threaten(target) <= 5 && player.storage.hok_lingua1) {
								return 1;
							}
							return 0;
						},
					},
					order: 7,
				}
			},
			hok_taigua: {
				unique: true,
				limited: true,
				enable: 'phaseUse',
				skillAnimation: true,
				animationColor: 'soil',
				filter(event, player) {
					if (game.hasPlayer(function (current) {
						return current == player.storage.hok_lingua2;
					})) {
						return true;
					}
					return false;
				},
				content() {
					'step 0'
					player.awakenSkill('hok_taigua');
					if (player.hp <= 2) {
						player.loseHp(player.hp - 1);
					} else {
						player.loseHp(2);
					}
					'step 1'
					player.chooseControl('回复', '受伤').set('prompt', '请选择一种效果').set('ai', function (card) {
						if (get.attitude(player, player.storage.hok_lingua2) > 0 && get.recoverEffect(player.storage.hok_lingua2, player, player) > 0) {
							return '回复';
						}
						return '受伤';
					});
					'step 2'
					if (result.control == '回复') {
						player.storage.hok_lingua2.recover(2);
					} else {
						player.storage.hok_lingua2.damage(2);
					}
					player.addSkill('hok_taigua_recover');
				},
				subSkill: {
					recover: {
						charlotte: true,
						forced: true,
						locked: false,
						trigger: { player: 'phaseBegin' },
						content() {
							player.recover();
							player.removeSkill('hok_taigua_recover');
						}
					}
				},
				ai: {
					order: 8,
					result: {
						player(player) {
							let target = player.storage.hok_lingua2
							if (get.attitude(player, target) > 0) {
								if (target.hp == 1) return 5;
								if (target.maxHp - target.hp > 2 && player.hp <= 2) return 5;
								if (target.maxHp - target.hp >= 2 && player.hp == 1) return 5;
							} else {
								if (target.hp > 2 && player.hp <= 2) return 2;
								if (target.hp > 2 && player.hp == 1) return 3;
								if (target.hp <= 2) return 2;
							}
							return 0;
						}
					},
					threaten: 3,
				}
			},
			// 芈月
			hok_shengxue: {
				trigger: { source: 'damageSource' },
				forced: true,
				locked: false,
				filter(event, player) {
					return event.num > 0;
				},
				marktext: '蝠',
				intro: {
					name: '蝠',
					content: 'mark',
				},
				content() {
					if (player.isDamaged()) {
						player.recover(trigger.num);
					}
					if (player.countMark('hok_shengxue') < 4) {
						player.addMark('hok_shengxue', 1);
					}
				},
			},
			hok_anlian: {
				enable: 'phaseUse',
				usable: 1,
				filterTarget: lib.filter.notMe,
				content() {
					'step 0'
					player.removeSkill('hok_anlian2');
					'step 1'
					player.line('hok_anlian', target);
					player.addSkill('hok_anlian_effect');
					player.storage.hok_anlian2 = target;
					player.addSkill('hok_anlian2');
				},
				subSkill: {
					effect: {
						trigger: { player: 'phaseJieshuBegin' },
						forced: true,
						locked: false,
						filter(event, player) {
							return !player.storage.hok_anlian2.isDead();
						},
						content() {
							if (player.storage.hok_anlian2.countGainableCards(player, 'he') > 0) {
								player.gainPlayerCard(player.storage.hok_anlian2, 'he', true);
							}
							if (player.countMark('hok_shengxue') < 4) {
								player.addMark('hok_shengxue', 1);
							}
						}
					},
				},
				ai: {
					result: {
						target(player, target) {
							return -2;
						}
					},
					order: 9,
				}
			},
			hok_anlian2: {
				charlotte: true,
				onremove: true,
				mark: 'character',
				intro: { content: '暗链：$' },
			},
			hok_anyue: {
				enable: 'phaseUse',
				skillAnimation: true,
				animationColor: 'fire',
				filter(event, player) {
					return player.countMark('hok_shengxue') == 4;
				},
				content() {
					'step 0'
					player.removeMark('hok_shengxue', 4);
					'step 1'
					player.turnOver();
					player.addTempSkill('hok_anyue_effect', { player: 'phaseBeginStart' });
					player.addSkill('hok_anyue_video');
				},
				subSkill: {
					effect: {
						forced: true,
						firstDo: true,
						mark: true,
						intro: {
							name: '暗月',
							content: '不能成为牌的目标',
						},
						mod: {
							targetEnabled(card, player, target) {
								return false;
							}
						}
					},
					video: {
						trigger: { player: 'phaseBefore' },
						forced: true,
						firstDo: true,
						content() {
							player.turnOver(false);
						}
					}
				},
				ai: {
					order: 1,
					result: {
						player: 1,
					},
				}
			},
			// 孙悟空
			hok_qitian: {
				mod: {
					// 	cardname(card, player) {
					// 		if (['trick', 'delay'].contains(lib.card[card.name].type)) return 'sha';
					// 	},
					// 	cardnature(card, player) {
					// 		if (['trick', 'delay'].contains(lib.card[card.name].type) && get.color(card) == 'red') return 'fire';
					// 		if (['trick', 'delay'].contains(lib.card[card.name].type) && get.color(card) == 'black') return 'thunder';
					// 	},
					targetInRange(card, player) {
						if (card.name == 'sha' && (card.hasNature('fire') || card.hasNature('thunder'))) return true;
					},
				},
				group: ['hok_qitian_sha', 'hok_qitian_shan'],
				subSkill: {
					// fire: {
					// 	enable: ['chooseToRespond', 'chooseToUse'],
					// 	filterCard(card) {
					// 		return ((lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay') && get.color(card) == 'red');
					// 	},
					// 	viewAs: { name: 'sha', nature: 'fire' },
					// 	viewAsFilter(player) {
					// 		if ((!player.countCards('h', { suit: 'heart' }) && !player.countCards('h', { suit: 'diamond' }))
					// 			|| (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' }))) {
					// 			return false;
					// 		}
					// 	},
					// 	position: 'h',
					// 	prompt: '将一张红色锦囊当火杀使用或打出',
					// },
					sha: {
						enable: ['chooseToRespond', 'chooseToUse'],
						filterCard(card) {
							return lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay';
						},
						position: 'he',
						viewAs(cards, player) {
							for (let card of cards) {
								if (get.color(card) == 'red') {
									return { name: 'sha', nature: 'fire' };
								} else if (get.color(card) == 'black') {
									return { name: 'sha', nature: 'thunder' };
								} else {
									return { name: 'sha', nature: 'stab' };
								}
							}
						},
						viewAsFilter(player) {
							if (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })) {
								return false;
							}
						},
						prompt: '红色锦囊当火杀、黑色锦囊当雷杀使用或打出',
						check(card) {
							var val = get.value(card);
							if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
							return 5 - val;
						},
						ai: {
							respondSha: true,
							skillTagFilter(player) {
								if (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })) return false;
							},
						},
					},
					shan: {
						enable: ['chooseToRespond', 'chooseToUse'],
						filterCard(card) {
							return ((lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay') && get.color(card) == 'red')
								|| (card.name == 'sha', card.hasNature('fire'));
						},
						viewAs: { name: 'shan' },
						viewAsFilter(player) {
							if ((!player.countCards('h', { suit: 'heart' }) && !player.countCards('h', { suit: 'diamond' })
								|| !player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' }))
								&& !player.countCards('h', { name: 'sha', nature: 'fire' })) {
								return false;
							}
						},
						position: 'h',
						prompt: '将一张火杀当闪使用或打出',
						check() { return 1 },
						ai: {
							order: 3,
							respondShan: true,
							skillTagFilter(player) {
								if (!player.countCards('h', { suit: 'heart' }) && !player.countCards('h', { suit: 'diamond' })
									&& !player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })
									&& !player.countCards('h', { name: 'sha', nature: 'fire' })) {
									return false;
								}
							},
							effect: {
								target(card, player, target, current) {
									if (get.tag(card, 'respondShan') && current < 0) return 0.6
								}
							}
						}
					}
				}
			},
			hok_shengbang: {
				audio: 2,
				locked: true,
				trigger: {
					source: 'damageBefore',
				},
				filter(event, player) {
					if (!event.card || event.card.name != 'sha') return false;
					return event.num > 0 && player.countCards('hes') > 0;
				},
				content() {
					'step 0'
					player.storage.shengbangJudge = false;
					player.chooseToDiscard('hes').set('goon', get.damageEffect(trigger.player, player, player) > 0)
						.set('ai', function (card) {
							if (player.getStat('skill').hok_naogong == 1 && player.countCards('hs') > 1) {
								return 9 - get.value(card);
							}
							return 0;
						});
					'step 1'
					if (result.bool) {
						player.judge(function (card) {
							if (get.color(card) == 'red') {
								player.storage.shengbangJudge = true;
								return 1.5;
							} else {
								player.storage.shengbangJudge = false;
								return -1.5;
							}
						}).judge2 = function (result) {
							return result.bool;
						};
					}
					'step 2'
					if (player.storage.shengbangJudge) {
						trigger.num *= 2;
						if (trigger.num >= 3) {
							trigger.num = 3;
						}
					} else {
						player.draw();
					}
				},
			},
			hok_houmao: {
				audio: 2,
				unique: true,
				mark: true,
				skillAnimation: true,
				animationColor: 'metal',
				limited: true,
				trigger: { player: 'phaseZhunbeiBegin' },
				init(player) {
					player.storage.hok_houmao = false;
				},
				filter(event, player) {
					if (player.storage.hok_houmao) return false;
					if (typeof player.storage.hok_houmao2 == 'number') {
						return player.hp < player.storage.hok_houmao2;
					}
					return player.countCards('j') > 0;
				},
				check(event, player) {
					if (player.hp <= 1) return true;
					return player.hp < player.storage.hok_houmao2 - 1;
				},
				content() {
					player.awakenSkill('hok_houmao');
					player.recover(player.storage.hok_houmao2 - player.hp);
					player.discard(player.getCards('j'));
					var card = get.cardPile(function (card) {
						switch (Math.floor(Math.random() * 2)) {
							case 0: return get.name(card, 'leisha') == 'leisha';
							case 1: return get.name(card, 'huosha') == 'huosha';
						}
					})
					if (card) {
						player.gain(card, 'gain2');
					}
					player.storage.hok_houmao = true;
				},
				intro: {
					mark(dialog, content, player) {
						if (player.storage.hok_houmao) return;
						if (typeof player.storage.hok_houmao2 != 'number') {
							return '上回合体力：无';
						}
						return '上回合体力：' + player.storage.hok_houmao2;
					},
					content: 'limited'
				},
				group: ['hok_houmao2'],
			},
			hok_houmao2: {
				trigger: { player: 'phaseJieshuBegin' },
				priority: -10,
				silent: true,
				content() {
					player.storage.hok_houmao2 = player.hp;
					game.broadcast(function (player) {
						player.storage.hok_houmao2 = player.hp;
					}, player);
					game.addVideo('storage', player, ['hok_houmao2', player.storage.hok_houmao2]);
				},
				intro: {
					content(storage, player) {
						if (player.storage.hok_houmao) return;
						return '上回合体力：' + storage;
					}
				}
			},
			hok_naogong: {
				audio: 2,
				unique: true,
				limited: true,
				enable: 'phaseUse',
				skillAnimation: true,
				animationColor: 'metal',
				content() {
					player.awakenSkill('hok_naogong');
					player.addTempSkill('hok_naogong_effect');
					player.addTempSkill('hok_naogong_discard');
				},
				ai: {
					order() {
						return get.order({ name: 'sha' }) - 0.1;
					},
					expose: 0.2,
					result: {
						player(player) {
							if (player.getEquip(1) != undefined && player.getEquip(1).name == 'zhuge') {
								return 0;
							}
							var qitianTrick = (player.countCards('hs', { type: 'basic' }) - player.countCards('hs', { name: 'sha' })
								- player.countCards('hs', { name: 'shan' })
								- player.countCards('hs', { name: 'tao' })
								- player.countCards('hs', { name: 'jiu' }));
							var natureSha = player.countCards('hs', { type: 'trick' })
								+ qitianTrick;
							if (player.hp < 2 && natureSha >= 1) return 1;
							if (player.countCards('hs') >= 3 && natureSha >= 2 && game.hasPlayer(function (current) {
								return get.effect(current, { name: 'sha' }, player, player) > 0;
							})) {
								return 1;
							}
							return 0;
						}
					}
				},
				subSkill: {
					effect: {
						audio: 2,
						forced: true,
						onremove: true,
						mod: {
							cardUsable(card, player, num) {
								if (card.name == 'sha') return 3;
							}
						},
					},
					discard: {
						trigger: { player: 'phaseUseEnd' },
						forced: true,
						onremove: true,
						filter(event, player) {
							return player.countCards('hs') > 0;
						},
						content() {
							'step 0'
							event.naogongCards = player.getCards('hs');
							'step 1'
							if (event.naogongCards != undefined) {
								player.discard(event.naogongCards);
							}
						},
					},
				}
			},
			// 武则天
			hok_dihui: {
				unique: true,
				mark: true,
				marktext: '曌',
				intro: {
					name: '曌',
					content: 'mark',
				},
				forced: true,
				trigger: { player: ['phaseUseBegin', 'hok_dihui_shaAfter', 'hok_diweiAfter', 'hok_shaduoAfter', 'useCardAfter'] },
				derivation: ['hok_dihui_strengthen'],
				content() {
					if (player.countMark('hok_dihui') >= 2) {
						player.removeMark('hok_dihui', 2);
						player.addTempSkill('hok_dihui_strengthen', 'phaseUseAfter');
					}
					else if (!player.hasSkill('hok_dihui_sha')) {
						player.addTempSkill('hok_dihui_sha', 'phaseUseAfter');
					};
				},
				ai: {
					threaten: 1.0,
				},
				subSkill: {
					sha: {
						usable: 1,
						enable: 'phaseUse',
						// filterTarget: true,
						filterCard: true,
						selectCard: 1,
						viewAs: { name: 'sha', isCard: true },
						onuse(result, player) {
							player.addMark('hok_dihui', 1);
						},
						check(card) {
							return 6 - get.value(card);
						},
						ai: {
							order() {
								return get.order({ name: 'sha' }) + 0.1;
							},
							order: 6,
						}
					},
					strengthen: {
						enable: 'phaseUse',
						group: 'hok_dihui_hanbing',
						filterTarget: true,
						content() {
							'step 0'
							player.useCard({ name: 'sha', isCard: true }, target, false);
							'step 1'
							player.removeSkill('hok_dihui_strengthen');
						},
						ai: {
							order: 4,
							result: {
								target(player, target) {
									return -1;
								},
							},
						}
					},
					hanbing: {
						trigger: { source: 'damageBegin2' },
						forced: true,
						filter(event) {
							return event.card.name == 'sha';
						},
						content() {
							if (trigger.player.countDiscardableCards(trigger.player, 'he')) {
								var cards = trigger.player.getCards('he', (card) => lib.filter.cardDiscardable(card, trigger.player, 'hok_dihui_strengthen'));
								if (cards.length) trigger.player.discard(cards.randomGet());
							}
						}
					}
				}
			},
			hok_diwei: {
				derivation: ['feiying'],
				usable: 1,
				enable: 'phaseUse',
				filterCard: true,
				selectCard: 1,
				content() {
					'step 0'
					player.chooseControl('选择1名与你座位相邻的角色，令其与同方向下一个角色交换位置', '直到你的下个回合，你获得技能“飞影”').set('ai', function (event, player) {
						return '直到你的下个回合，你获得技能“飞影”';
					});
					'step 1'
					player.discard(cards);
					event.feiying = false;
					switch (result.control) {
						case '选择1名与你座位相邻的角色，令其与同方向下一个角色交换位置':
							break;
						case '直到你的下个回合，你获得技能“飞影”':
							event.feiying = true;
							break;
						default:
					}
					'step 2'
					player.addMark('hok_dihui', 1);
					if (event.feiying) {
						player.addTempSkill('feiying', { player: 'phaseBefore' });
						event.finish();
					}
					'step 3'
					player.chooseTarget('选择1名与你座位相邻的角色，令其与同方向下一个角色交换位置', function (card, player, target) {
						return target == player.next || target == player.previous;
					}).set('ai', function (target) {
						if (target == player) {
							return false;
						}
						return get.attitude(_status.event.player, target);
					});
					'step 4'
					var target = result.targets[0];
					var targetSwap = target.next == player ? target.previous : target.next;
					game.broadcastAll(function (target1, target2) {
						game.swapSeat(target1, target2);
					}, target, targetSwap);
				},
				check(card) {
					return (5 - get.value(card)) && _status.event.player.countCards('h') > 2;
				},
				ai: {
					order() {
						return get.order({ name: 'tao' }) - 0.3;
					},
					result: {
						player: 1
					},
				}
			},
			hok_shaduo: {
				enable: 'phaseUse',
				skillAnimation: true,
				animationColor: 'metal',
				limited: true,
				filter(event, player) {
					return game.roundNumber >= 4;
				},
				content() {
					'step 0'
					player.awakenSkill('hok_shaduo');
					player.addTempSkill('hok_shaduo_hanbing');
					player.addMark('hok_dihui', 1);
					'step 1'
					var targets = game.filterPlayer(function (current) {
						return current.isAlive() && current != player;
					})
					player.useCard({ name: 'sha', isCard: true }, targets, false);
					'step 2'
					player.removeSkill('hok_shaduo_hanbing');
				},
				ai: {
					order: 1,
					result: {
						player(player) {
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
								if (get.attitude(player, targets[1]) <= 0) {
									num += targets[1].countCards('hs') > 2 ? -0.5 : 1;
								} else {
									num += targets[1].countCards('hs') > 2 ? 0.5 : -1;
								}
							}
							if (!player.needsToDiscard(-1)) {
								if (targets.length >= 7) {
									if (num < 2) return 0;
								}
								else if (targets.length >= 5) {
									if (num < 1.5) return 0;
								}
							}
							return num;
						}
					}
				},
				subSkill: {
					hanbing: {
						trigger: { source: 'damageBegin2' },
						forced: true,
						filter(event) {
							return event.card.name == 'sha';
						},
						content() {
							if (trigger.player.countDiscardableCards(trigger.player, 'he')) {
								var cards = trigger.player.getCards('he', (card) => lib.filter.cardDiscardable(card, trigger.player, 'hok_dihui_strengthen'));
								if (cards.length) trigger.player.discard(cards.randomGet());
								if (cards.length) trigger.player.discard(cards.randomGet());
							}
						},
					}
				}
			},
			hok_nvdi: {
				trigger: { player: 'phaseJieshuBegin' },
				zhuSkill: true,
				frequent: true,
				filter(event, player) {
					if (!player.hasZhuSkill('hok_nvdi')) return false;
					if (player.getHistory('skipped').contains('phaseUse')) return true;
					var history = player.getHistory('useCard').concat(player.getHistory('respond'));
					for (var i = 0; i < history.length; i++) {
						if ((history[i].card.name == 'sha' || get.type(history[i].card) == 'trick') && history[i].isPhaseUsing()) {
							return false;
						}
					}
					return true;
				},
				content() {
					var num = game.countPlayer(function (current) {
						return current.group == 'qun';
					});
					if (num) {
						player.draw(num);
					}
				},
			},
			// 瑶
			hok_shangui: {
				derivation: 'hok_yinshen',
				usable: 1,
				enable: 'phaseUse',
				filterTarget: lib.filter.notMe,
				content() {
					if (target.hasMark('hok_yinshen')) {
						target.removeMark('hok_yinshen', 1);
						target.removeSkill('hok_yinshen');
					}
					target.chooseToDiscard('h', true).set('ai', function (card) {
						return 6 - get.value(card);
					});
				},
				ai: {
					result: {
						target(player, target) {
							return -1;
						}
					},
					threaten: 1,
					order: 9,
					expose: 0.2,
				}
			},
			hok_bailu: {
				derivation: 'hok_temp_hp',
				usable: 1,
				enable: 'phaseUse',
				filter(event, player) {
					if (player.hasSkill('hok_bailu_round')) {
						return false;
					}
					return !game.hasPlayer(function (current) {
						return current.countMark('hok_bailu_2');
					});
				},
				filterTarget: lib.filter.notMe,
				content() {
					player.addTempSkill('hok_bailu_round', 'roundStart');
					player.addSkill('hok_bailu_effect');
					target.addMark('hok_bailu_2', 1);
					target.addSkill('hok_bailu_2');
					target.maxHp += 2;
					// target.maxHp++;
					target.recover(2);
					target.addMark('hok_temp_hp', 2);
					target.addSkill('hok_temp_hp');
				},
				group: 'hok_bailu_remove',
				subSkill: {
					round: { charlotte: true },
					round2: {
						group:'hok_bailu_round',
						trigger:{player:'phaseEnd'},
						forced:true,
						content(){
							player.removeSkill('hok_bailu_round2')
						}
					},
					effect: {
						forced: true,
						firstDo: true,
						mark: true,
						intro: {
							name: '鹿灵',
							content: '不能成为牌的目标，且不能使用杀和锦囊牌',
						},
						mod: {
							targetEnabled(card, player, target) {
								if (card.name != 'tao') {
									return false;
								}
							},
							cardEnabled(card) {
								if (card.name == 'sha' || get.type(card) == 'trick' || get.type(card) == 'delay') return false;
							}
						}
					},
					2: {
						marktext: '鹿',
						intro: {
							name: '白鹿',
							content: 'mark',
						},
						forced: true,
						trigger: { player: 'damageAfter' },
						filter(event, player) {
							return player.countMark('hok_temp_hp') == 0;
						},
						content() {
							'step 0'
							player.removeMark('hok_bailu_2', 1);
							'step 1'
							player.removeSkill('hok_temp_hp');
							var hok_luling = game.filterPlayer(function (current) {
								return current.hasSkill('hok_bailu_effect');
							})[0];
							hok_luling.removeSkill('hok_bailu_effect');
							hok_luling.addSkill('hok_bailu_round2');
							'step 2'
							player.removeSkill('hok_bailu_2');
						}
					},
					remove: {
						usable: 1,
						enable: 'phaseUse',
						filter(event, player) {
							if (player.hasSkill('hok_bailu_round')) {
								return false;
							}
							return game.hasPlayer(function (current) {
								return current.countMark('hok_bailu_2');
							});
						},
						content() {
							'step 0'
							player.addTempSkill('hok_bailu_round', 'roundStart');
							player.draw();
							player.storage.hok_bailu_target = game.filterPlayer(current => {
								return current.countMark('hok_bailu_2');
							})[0];
							'step 1'
							player.storage.hok_bailu_target.removeMark('hok_bailu_2', 1);
							player.storage.hok_bailu_target.loseHp(player.storage.hok_bailu_target.countMark('hok_temp_hp'));
							'step 2'
							player.storage.hok_bailu_target.loseMaxHp(player.storage.hok_bailu_target.countMark('hok_temp_hp'));
							'step 3'
							player.storage.hok_bailu_target.removeMark('hok_temp_hp', player.storage.hok_bailu_target.countMark('hok_temp_hp'));
							player.storage.hok_bailu_target.removeSkill('hok_temp_hp');
							player.removeSkill('hok_bailu_effect');
							player.storage.hok_bailu_target.removeSkill('hok_bailu_2');
						},
					}
				},
				ai: {
					result: {
						target(player, target) {
							// if (get.threaten(target) > 3 && get.attitude(player, target) > 0) {
							// 	return get.threaten(target);
							// }
							if (get.attitude(player, target) > 0) return 1;
							return 0;
						},
					},
					order: 10,
					threaten: 1,
					expose: 0.25,
				}
			},
			// SP李信
			hok_wangming: {
				audio: 2,
				marktext: '王',
				unique: true,
				trigger: {
					source: 'damageSource',
					player: ['damageEnd', 'enterGame'],
					global: 'phaseBefore',
				},
				forced: true,
				filter(event) {
					return (event.name != 'damage' && (event.name != 'phase' || game.phaseNumber == 0)) || event.num > 0;
				},
				content() {
					if (player.countMark('hok_wangming') < 7) {
						player.addMark('hok_wangming', trigger.name == 'damage' ? 1 : 4);
					}
					if (trigger.name != 'damage') {
						var list = [];
						var zhu = get.zhu(player);
						if (zhu && zhu != player && zhu.skills) {
							for (var i = 0; i < zhu.skills.length; i++) {
								if (lib.skill[zhu.skills[i]] && lib.skill[zhu.skills[i]].zhuSkill) {
									list.push(zhu.skills[i]);
								}
							}
						}
						player.addAdditionalSkill('weidi', list);
						player.storage.zhuSkill_weidi = list;
						game.broadcastAll(function (list) {
							game.expandSkills(list);
							for (var i of list) {
								var info = lib.skill[i];
								if (!info) continue;
								if (!info.audioname2) info.audioname2 = {};
								info.audioname2.yuanshu = 'weidi';
							}
						}, list);
					}
				},
				intro: {
					name: '王命',
					content: 'mark',
				},
			},
			hok_dengshen: {
				audio: 2,
				trigger: { player: 'phaseBegin' },
				forced: true,
				unique: true,
				juexingji: true,
				skillAnimation: true,
				animationColor: 'water',
				derivation: ['hok_sptongkuang', 'pozhu', 'olqingyi', 'xinfu_zuilun', 'reshuishi', 'lingce', 'dinghan', 'shencai', 'drlt_jieying', 'drlt_poxi'],
				filter(event, player) {
					return player.countMark('hok_wangming') >= 5;
				},
				content() {
					player.awakenSkill(event.name);
					player.addSkill('hok_sptongkuang');
					player.addSkill('xinfu_zuilun');
				},
				ai: {
					maixie: true,
					maixie_hp: true,
					threaten(player, target) {
						if (target.hp == 1) return 3.5;
						return 1;
					},
					effect: {
						target(card, player, target) {
							if (player.hasSkillTag('jueqing', false, target)) return [1, -1];
							return 0.8;
						}
					}
				}
			},
			hok_sptongkuang: {
				audio: 2,
				trigger: { player: 'phaseJudgeBefore' },
				forced: true,
				filter(event, player) {
					return player.countMark('hok_wangming') >= 0;
				},
				usable: 1,
				content() {
					'step 0'
					player.chooseControl('人杰', '统御', '狂暴').set('prompt', '选择一个路线');
					'step 1'
					switch (result.control) {
						case '统御':
							player.addTempSkill('hok_sptongkuang_tongyu');
							hok_remove(player, ['renjie', 'kuangbao']);
							break;
						case '狂暴':
							player.addTempSkill('hok_sptongkuang_kuangbao');
							hok_remove(player, ['tongyu', 'renjie']);
							break;
						default:
							player.addTempSkill('hok_sptongkuang_renjie');
							hok_remove(player, ['tongyu', 'kuangbao']);
					}
				},
				subSkill: {
					renjie: {
						audio: 2,
						trigger: { player: 'phaseDiscardBegin' },
						forced: true,
						filter(event, player) {
							return player.countMark('hok_wangming') >= 5;
						},
						usable: 1,
						content() {
							event.lx = ['olqingyi', 'pozhu', 'xinfu_zuilun'];
							if (player.hasSkill('pozhu')) {
								event.lx.splice(event.lx.indexOf('pozhu'), 1)
							}
							if (player.hasSkill('olqingyi')) {
								event.lx.splice(event.lx.indexOf('olqingyi'), 1)
							}
							if (player.hasSkill('xinfu_zuilun')) {
								event.lx.splice(event.lx.indexOf('xinfu_zuilun'), 1)
							}
							'step 0'
							player.chooseControl(event.lx).set('prompt', '选择获得一个技能');
							'step 1'
							player.addSkillLog(result.control);
							player.removeMark('hok_wangming', 5);
							player.syncStorage('hok_wangming');
						}
					},
					tongyu: {
						audio: 2,
						trigger: { player: 'phaseDiscardBegin' },
						forced: true,
						filter(event, player) {
							return player.countMark('hok_wangming') >= 5;
						},
						usable: 1,
						content() {
							event.lx = ['reshuishi', 'lingce', 'dinghan'];
							if (player.hasSkill('reshuishi')) {
								event.lx.splice(event.lx.indexOf('reshuishi'), 1)
							}
							if (player.hasSkill('lingce')) {
								event.lx.splice(event.lx.indexOf('lingce'), 1)
							}
							if (player.hasSkill('dinghan')) {
								event.lx.splice(event.lx.indexOf('dinghan'), 1)
							}
							'step 0'
							player.chooseControl(event.lx).set('prompt', '选择获得一个技能');
							'step 1'
							player.addSkillLog(result.control);
							player.removeMark('hok_wangming', 5);
							player.syncStorage('hok_wangming');
						},
					},
					kuangbao: {
						audio: 2,
						trigger: { player: 'phaseDiscardBegin' },
						forced: true,
						filter(event, player) {
							return player.countMark('hok_wangming') >= 5;
						},
						usable: 1,
						content() {
							event.lx = ['shencai', 'drlt_jieying', 'drlt_poxi'];
							if (player.hasSkill('drlt_jieying')) {
								event.lx.splice(event.lx.indexOf('drlt_jieying'), 1)
							}
							if (player.hasSkill('shencai')) {
								event.lx.splice(event.lx.indexOf('shencai'), 1)
							}
							if (player.hasSkill('drlt_poxi')) {
								event.lx.splice(event.lx.indexOf('drlt_poxi'), 1)
							}
							'step 0'
							player.chooseControl(event.lx).set('prompt', '选择获得一个技能');
							'step 1'
							player.addSkillLog(result.control);
							player.removeMark('hok_wangming', 5);
							player.syncStorage('hok_wangming');
						}
					}
				},
			},
			// SP明世隐
			hok_sptaigua: {
				enable: 'phaseUse',
				usable: 2,
				filterTarget(card, player, target) {
					if (target.hp >= target.maxHp) return false;
					// if(target==player) return false;
					return true;
				},
				content() {
					'step 0'
					player.removeSkill('hok_minggua2');
					'step 1'
					player.damage();
					'step 2'
					player.line(target, 'green');
					target.recover();
					player.addSkill('hok_minggua2');
				},
				ai: {
					order: 2,
					result: {
						target(player, target) {
							if (target.hp == 1 && get.zhu(player) != player) return 5;
							if (target.hp < player.hp) return 5;
							if (player == target && player.countCards('h') > player.hp && player.hp != 1) return 5;
							return 0;
						}
					},
					threaten: 1,
				}
			},
			hok_minggua: {
				forced: true,
				group: ['hok_minggua3'],
				trigger: {
					player: 'damageBegin2',
				},
				content() {
					'step 0'
					var r = Math.random();
					var tar = trigger.player;
					var cards = tar.getCards('hej');

					var str = '';
					if (r < 0.05) {
						// 1
						str += '大凶';
					} else if (r < 0.2) {
						// 2
						str += '中凶';
					} else if (r < 0.5) {
						// 3
						str += '小凶';
					} else if (r < 0.8) {
						// 4
						str += '小吉';
					} else if (r < 0.95) {
						// 5
						str += '中吉';
					} else {
						str += '大吉';
					}
					// event.dialog=ui.create.dialog(str);
					player.popup(str);
					game.log(str);

					if (r < 0.05) {
						// 1
						if (!gua6) {
							tar.die();
							trigger.cancel();
						}
					} else if (r < 0.2) {
						// 2
						if (!gua5) {
							trigger.num++;
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.5) {
						// 3
						if (!gua4) {
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.8) {
						// 4
						if (!gua3) {
							tar.draw();
						}
					} else if (r < 0.95) {
						// 5
						if (!gua2) {
							trigger.cancel();
							tar.recover(trigger.num);
							tar.draw();
						}
					} else {
						if (!gua1) {
							trigger.cancel();
							tar.recover((tar.maxHp - tar.hp));
							tar.draw(4);
						}
					}
					var source = trigger.source;
					if (source) {
						if (tar.hasSkill('hok_biangua')) {
							if (tar.countMark('hok_biangua2') < 8) {
								tar.addMark('hok_biangua2', 1);
							}
						}
					}

					'step 1'
					game.delay(0.5);
					// event.dialog.close();
				},
				mark: true,
				intro: {
					content(storage, player) {
						if (gua1 && guaList.indexOf('大吉') >= 0) {
							guaList.splice(guaList.indexOf('大吉'), 1);
						}
						if (gua2 && guaList.indexOf('中吉') >= 0) {
							guaList.splice(guaList.indexOf('中吉'), 1);
						}
						if (gua3 && guaList.indexOf('小吉') >= 0) {
							guaList.splice(guaList.indexOf('小吉'), 1);
						}
						if (gua4 && guaList.indexOf('小凶') >= 0) {
							guaList.splice(guaList.indexOf('小凶'), 1);
						}
						if (gua5 && guaList.indexOf('中凶') >= 0) {
							guaList.splice(guaList.indexOf('中凶'), 1);
						}
						if (gua6 && guaList.indexOf('大凶') >= 0) {
							guaList.splice(guaList.indexOf('大凶'), 1);
						}
						return '<div class="text center"><span class=thundertext>' + guaList + '</span></div>'
					},
				},
			},
			hok_minggua2: {
				forced: true,
				trigger: {
					source: 'damageBegin2',
				},
				content() {
					'step 0'
					var r = Math.random();
					var tar = trigger.player;
					var cards = tar.getCards('hej');

					// var str=get.translation(player)+'占卜结果为：';
					var str = '';
					if (r < 0.05) {
						// 1
						str += '大吉';
					} else if (r < 0.2) {
						// 2
						str += '中吉';
					} else if (r < 0.5) {
						// 3
						str += '小吉';
					} else if (r < 0.8) {
						// 4
						str += '小凶';
					} else if (r < 0.95) {
						// 5
						str += '中凶';
					} else {
						str += '大凶';
					}
					// event.dialog=ui.create.dialog(str);
					player.popup(str);
					game.delay(0.5);
					game.log(str);

					if (r < 0.05) {
						// 1
						if (!gua1) {
							tar.die();
							trigger.cancel();
						}
					} else if (r < 0.2) {
						// 2
						if (!gua2) {
							trigger.num++;
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.5) {
						// 3
						if (!gua3) {
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.8) {
						// 4
						if (!gua4) {
							tar.draw();
						}
					} else if (r < 0.95) {
						// 5
						if (!gua5) {
							trigger.cancel();
							tar.recover(trigger.num);
							tar.draw();
						}
					} else {
						if (!gua6) {
							trigger.cancel();
							tar.recover((tar.maxHp - tar.hp));
							tar.draw(4);
						}
					}
					if (player.hasSkill('hok_biangua')) {
						if (player.countMark('hok_biangua2') < 8) {
							player.addMark('hok_biangua2', 1);
						}
					}
					'step 1'
					game.delay(0.5);
					// event.dialog.close();
				},
			},
			hok_minggua3: {
				forceDie: true,
				trigger: { player: 'die' },
				skillAnimation: true,
				animationColor: 'gray',
				direct: true,
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return current.maxHp >= player.maxHp;
					});
				},
				content() {
					'step 0'
					if (gua1 && guaList.indexOf('大吉') >= 0) {
						guaList.splice(guaList.indexOf('大吉'), 1);
					}
					if (gua2 && guaList.indexOf('中吉') >= 0) {
						guaList.splice(guaList.indexOf('中吉'), 1);
					}
					if (gua3 && guaList.indexOf('小吉') >= 0) {
						guaList.splice(guaList.indexOf('小吉'), 1);
					}
					if (gua4 && guaList.indexOf('小凶') >= 0) {
						guaList.splice(guaList.indexOf('小凶'), 1);
					}
					if (gua5 && guaList.indexOf('中凶') >= 0) {
						guaList.splice(guaList.indexOf('中凶'), 1);
					}
					if (gua6 && guaList.indexOf('大凶') >= 0) {
						guaList.splice(guaList.indexOf('大凶'), 1);
					} else {
						return;
					}
					'step 1'
					event.guaTarget = game.filterPlayer(function (target) {
						return target.hasSkill('hok_biangua');
					})[0];
					player.chooseControl(guaList, 'cancel2').set('ai', function (event, player) {
						var goodGua = !gua1 + !gua2 + !gua3;
						var badGua = !gua4 + !gua5 + !gua6;
						if (get.attitude(_status.event.player, event.guaTarget) <= 0) {
							if (goodGua == 0) {
								return '取消';
							}
							return guaList[0];
						} else {
							if (badGua == 0) {
								return '取消';
							}
							return guaList[guaList.length - 1];
						}
					});
					'step 2'
					switch (result.control) {
						case '大吉':
							gua1 = true;
							break;
						case '中吉':
							gua2 = true;
							break;
						case '小吉':
							gua3 = true;
							break;
						case '小凶':
							gua4 = true;
							break;
						case '中凶':
							gua5 = true;
							break;
						case '大凶':
							gua6 = true;
							break;
						default:
					}
					result.control = result.control == 'cancel2' ? '取消' : result.control;
					var str = get.translation(player) + '选择了：#y' + result.control;
					// event.dialog = ui.create.dialog(str);
					player.popup(result.control);
					game.log(str);
					player.markSkill('hok_minggua');
					'step 3'
					player.chooseTarget(get.prompt('hok_minggua'), '令一名体力上限大于等于你的其他角色获得〖命卦〗', function (card, player, target) {
						return target.maxHp >= player.maxHp;
					}).set('forceDie', true).set('ai', function (target) {
						var goodGua = (gua1 ? 0 : 1) + (gua2 ? 0 : 1) + (gua3 ? 0 : 1);
						var badGua = (gua4 ? 0 : 1) + (gua5 ? 0 : 1) + (gua6 ? 0 : 1);
						if (get.attitude(_status.event.player, target) > 0 && goodGua > badGua) {
							return 5;
						}
						if (get.attitude(_status.event.player, target) <= 0 && goodGua > badGua) {
							return 0;
						}
						if (get.attitude(_status.event.player, target) > 0 && goodGua <= badGua) {
							return 0;
						}
						return 2;
					});
					'step 4'
					if (result.bool) {
						var target = result.targets[0];
						event.target = target;
						player.logSkill('hok_minggua', target);
					}
					else event.finish();
					'step 5'
					target.addSkillLog('hok_minggua');
					target.addSkill('hok_minggua2');
				},
			},
			hok_biangua: {
				global: ['hok_biangua2', 'hok_biangua3'],
				filter(event, player) {
					let tar = game.filterPlayer(function (target) {
						return target.hasSkill('hok_biangua');
					})[0];
					return tar.isAlive();
				}
			},
			hok_biangua2: {
				mark: true,
				marktext: '卦',
				frequent: true,
				intro: {
					name: '卦象',
					content: 'mark',
				},
			},
			hok_biangua3: {
				usable: 1,
				enable: 'phaseUse',
				filter(event, player) {
					let tar = game.filterPlayer(function (target) {
						return target.hasSkill('hok_biangua');
					})[0];
					if (tar) {
						return tar.countMark('hok_biangua2') > 7 && guaList.length > 0;
					}
					return false;
				},
				content() {
					'step 0'
					if (gua1 && guaList.indexOf('大吉') >= 0) {
						guaList.splice(guaList.indexOf('大吉'), 1);
					}
					if (gua2 && guaList.indexOf('中吉') >= 0) {
						guaList.splice(guaList.indexOf('中吉'), 1);
					}
					if (gua3 && guaList.indexOf('小吉') >= 0) {
						guaList.splice(guaList.indexOf('小吉'), 1);
					}
					if (gua4 && guaList.indexOf('小凶') >= 0) {
						guaList.splice(guaList.indexOf('小凶'), 1);
					}
					if (gua5 && guaList.indexOf('中凶') >= 0) {
						guaList.splice(guaList.indexOf('中凶'), 1);
					}
					if (gua6 && guaList.indexOf('大凶') >= 0) {
						guaList.splice(guaList.indexOf('大凶'), 1);
					} else {
						return;
					}

					'step 1'
					event.guaTarget = game.filterPlayer(function (target) {
						return target.hasSkill('hok_biangua');
					})[0];
					player.chooseControl(guaList, 'cancel2').set('ai', function (event, player) {
						var goodGua = !gua1 + !gua2 + !gua3;
						var badGua = !gua4 + !gua5 + !gua6;
						if (get.attitude(_status.event.player, event.guaTarget) <= 0) {
							if (goodGua == 0) {
								return '取消';
							}
							return guaList[0];
						} else {
							if (badGua == 0) {
								return '取消';
							}
							return guaList[guaList.length - 1];
						}
					});
					'step 2'
					switch (result.control) {
						case '大吉':
							gua1 = true;
							break;
						case '中吉':
							gua2 = true;
							break;
						case '小吉':
							gua3 = true;
							break;
						case '小凶':
							gua4 = true;
							break;
						case '中凶':
							gua5 = true;
							break;
						case '大凶':
							gua6 = true;
							break;
						default:
					}
					result.control = result.control == 'cancel2' ? '取消' : result.control;
					var str = get.translation(player) + '选择了：#y' + result.control;
					// event.dialog = ui.create.dialog(str);
					player.popup(result.control);
					game.log(str);
					if (!player.hasSkill('hok_biangua')) {
						var guaPlayer = game.filterPlayer(function (target) {
							return target.hasSkill('hok_biangua');
						})[0];
						guaPlayer.removeMark('hok_biangua2', 8);
						guaPlayer.markSkill('hok_minggua');
					} else {
						player.removeMark('hok_biangua2', 8);
						player.markSkill('hok_minggua');
					}
					'step 3'
					game.delay(1);
					// event.dialog.close();
				},
				ai: {
					order() {
						return get.order({ name: 'sha' }) + 1;
					},
					result: { player: 1 },
				},
			},

			// 神曹植
			lao_caigao: {
				audio: 'reluoying',
				forced: true,
				unique: true,
				derivation: 'lao_caigao_rewrite',
				group: 'lao_caigao_rewrite',
				trigger: { global: 'gainEnd' },
				filter(event, player) {
					return player != event.player && event.player != _status.currentPhase && !player.storage.lao_caigao_rewrite == true;
				},
				content() {
					'step 0'
					player.chooseControl('红色', '黑色').set('prompt', '猜测判定牌颜色').set('ai', function (event) {
						switch (Math.floor(Math.random() * 5)) {
							case 0: case 2: case 4: return '红色';
							case 1: case 3: return '黑色';
						}
					});
					'step 1'
					event.guess = (result.control === '红色' ? 'red' : 'black');
					'step 2'
					player.judge(function (card) {
						if (get.color(card) == event.guess) return 1.5;
						return -1.5;
					}).judge2 = function (result) {
						return result.bool;
					};
					'step 3'
					if (result.bool) {
						player.popup('猜对');
						var card = get.cardPile(function (card) {
							return get.suit(card) == 'club';
						})
						if (card) {
							player.gain(card, 'gain2');
						}
					} else {
						player.popup('猜错');
						return false;
					}
				},
				subSkill: {
					rewrite: {
						audio: 'reluoying',
						forced: true,
						trigger: { global: 'gainEnd' },
						filter(event, player) {
							return player != event.player && event.player != _status.currentPhase && player.storage.lao_caigao_rewrite == true;
						},
						content() {
							var card = get.cardPile(function (card) {
								return get.suit(card) == 'club';
							})
							if (card) {
								player.gain(card, 'gain2');
							}
						},
					}
				},
			},
			lao_badou: {
				audio: 'rejiushi',
				unique: true,
				group: ['lao_badou2', 'lao_badou3'],
				frequent: true,
				trigger: { player: ['useCard', 'respond'] },
				filter(event, player) {
					return event.card.name == 'jiu';
				},
				content() {
					var card = get.cardPile(function (card) {
						var t = get.type(card, 'trick')
						return t == 'trick' && t != 'delay';
					});
					if (card) {
						player.gain(card, 'gain2');
					}
				},
			},
			lao_badou2: {
				audio: 'rejiushi',
				usable: 1,
				enable: ['chooseToRespond', 'chooseToUse'],
				viewAs: {
					name: 'jiu',
				},
				selectCard: 1,
				position: 'h',
				viewAsFilter(player) {
					return player.countCards('h', { suit: 'club' });
				},
				filterCard(card) {
					return get.suit(card) == 'club';
				},
				prompt: '将一张梅花手牌当酒使用或打出',
			},
			lao_badou3: {
				audio: 'rejiushi',
				mod: {
					cardname(card, player, name) {
						if (card.name == 'zhuge') return 'jiu';
					},
					suit(card) {
						if (card.name == 'zhuge') return 'none';
					},
					cardUsable(card, player, num) {
						if (card.name == 'jiu' && card.suit == 'none') return Infinity;
					},
				},
				trigger: { player: 'useCard' },
				forced: true,
				filter(event, player) {
					return event.card.name == 'zhuge';
				},
				prompt: '将一张诸葛连弩当无色酒使用(无色酒无次数限制)',
				onuse(result, player) {
					var card = get.cardPile(function (card) {
						var t = get.type(card, 'trick')
						return t == 'trick' && t != 'delay';
					});
					if (card) {
						player.gain(card, 'gain2');
					}
				},
			},
			lao_qibu: {
				audio: 2,
				unique: true,
				mark: true,
				marktext: '步',
				frequent: true,
				intro: {
					name: '七步',
					content: 'mark',
				},
				trigger: { player: 'useCard' },
				filter(event, player) {
					let flag = false;
					flag = (get.type(event.card) == 'trick' && event.card.isCard);
					return (flag && player.countMark('lao_qibu') < 7);
				},
				content() {
					player.addMark('lao_qibu', 1);
				},
			},
			lao_chengshi: {
				audio: 'chengzhang',
				trigger: { global: 'phaseUseEnd' },
				forced: true,
				unique: true,
				juexingji: true,
				skillAnimation: true,
				animationColor: 'water',
				filter(event, player) {
					return player.countMark('lao_qibu') >= 7;
				},
				content() {
					'step 0'
					player.awakenSkill(event.name);
					player.removeSkill('lao_qibu');
					player.recover();
					player.addSkill('douqi');
					player.storage.lao_caigao_rewrite = true;

					'step 1'
					var maxValueDou = 0;
					game.filterPlayer(function (target) {
						if (target == player) {
							return false;
						}
						var att = get.attitude(_status.event.player, target);
						var valueDou = 0;
						if (att > 0) {
							if (target.isDamaged()) {
								valueDou += 2;
							}
							if (target.group == 'wei') {
								valueDou += 1;
							}
							valueDou += 1;
							if (valueDou > maxValueDou) {
								maxValueDou = valueDou;
							}
						}
						return false;
					});
					player.chooseTarget('令一名角色回复一点体力并获得“豆”标记', function (card, player, target) {
						return player != target;
					}).set('ai', function (target, targets) {
						if (target == player) {
							return false;
						}
						var att = get.attitude(_status.event.player, target);
						var valueDou = 0;
						if (att > 0) {
							valueDou += 1;
							if (target.isDamaged()) {
								valueDou += 2;
							}
							if (target.group == 'wei') {
								valueDou += 1;
							}
							if (valueDou == maxValueDou) {
								return true;
							}
						}
						return false;
					});

					'step 2'
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, 'green');
						target.storage.douqi = player;
						target.recover();
						target.addSkill('douqi');
					}
				},
			},
			douqi: {
				forced: true,
				mark: true,
				marktext: '豆',
				intro: {
					name: '豆萁',
					content: '手牌上限+1',
				},
				mod: {
					maxHandcard(player, num) {
						return 1 + num;
					}
				},
			},
			// 神董卓
			lao_cannue: {
				audio: 'olbaonue',
				forced: true,
				unique: true,
				group: ['lao_cannue2', 'lao_cannue3', 'lao_cannue4'],
				marktext: '虐',
				trigger: {
					source: 'damageSource',
				},
				filter(event, player) {
					return event.num > 0 && player.countMark('lao_cannue') < 9;
				},
				intro: {
					name: '残虐',
					content: 'mark',
				},
				content() {
					player.addMark('lao_cannue', (trigger.num + player.countMark('lao_cannue') > 9 ? 9 - player.countMark('lao_cannue') : trigger.num));
				},
				ai: {
					threaten: 1,
				}
			},
			lao_cannue2: {
				audio: 2,
				forced: true,
				unique: true,
				mod: {
					cardname(card, player, name) {
						if (card.name == 'wugu') return 'nanman';
					},
				},
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name == 'wugu';
				},
				prompt: '[五谷丰登]视为[南蛮入侵]',
			},
			lao_cannue3: {
				audio: 2,
				forced: true,
				unique: true,
				mod: {
					cardname(card, player, name) {
						if (card.name == 'taoyuan') return 'wanjian';
					},
				},
				trigger: { player: 'useCard' },
				filter(event, player) {
					return event.card.name == 'taoyuan';
				},
				prompt: '[桃园结义]视为[万箭齐发]',
			},
			lao_cannue4: {
				audio: 2,
				trigger: { player: 'useCardToPlayered', target: 'useCardToTargeted' },
				forced: true,
				filter(event, player) {
					return event.card.name == 'sha';
				},
				check(event, player) {
					return player == event.player;
				},
				content() {
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
					skillTagFilter(player, tag, arg) {
						if (arg.card.name != 'sha' || arg.target.countCards('h', 'shan') > 1) return false;
					},
				},
			},
			lao_xiehan: {
				forced: true,
				group: ['lao_xiehan2', 'lao_xiehan3'],
				trigger: { global: 'drawBegin' },
				filter(event, player) {
					return player != event.player && event.player != _status.currentPhase && event.num > 1;
				},
				content() {
					trigger.num--;
				},
				ai: {
					threaten: 1.2
				}
			},
			lao_xiehan2: {
				forced: true,
				trigger: { global: 'dieAfter' },
				filter(event, player) {
					return player.countMark('lao_cannue') >= 1;
				},
				content() {
					player.removeMark('lao_cannue', 1);
					// player.syncStorage('lao_cannue');
					player.gainMaxHp();
					player.draw(2);
					// player.recover();
				},
				ai: {
					threaten: 1.5
				}
			},
			lao_xiehan3: {
				forced: true,
				trigger: { global: 'phaseUseBegin' },
				filter(event, player) {
					return event.player.isAlive() && event.player.hasUseTarget({ name: 'jiu' }, null, true);
				},
				direct: true,
				preHidden: true,
				content() {
					"step 0"
					var controlOne = '1.摸一张牌，神董卓对你造成一点伤害，视为使用了一张【酒】';

					trigger.player.chooseToDiscard('hes', '1.弃置1张牌 或 2.摸一张牌，神董卓对你造成一点伤害，视为使用了一张【酒】').set('ai', function (card) {
						if (ui.selected.cards.length >= _status.event.getParent().num) return -1;
						if (get.damageEffect(trigger.player) > -1 && trigger.player.countCards('hs', 'sha')) return false;
						if (_status.event.res >= 0) return 6 - get.value(card);
						if (get.type(card) != 'basic') {
							return 10 - get.value(card);
						}
						return 8 - get.value(card);
					});
					"step 1"
					if (!result.bool) {
						trigger.player.draw();
						trigger.player.damage();
						trigger.player.chooseUseTarget({ name: 'jiu' }, true, 'noTargetDelay', 'nodelayx');
					}
				},
				ai: {
					threaten: 0,
					effect: {
						target(event, player, target) {
							if (get.tag(event, 'damage')) {
								if (player.hasSkillTag('jueqing', false, target)) return [0, -1];
								if (player.hp == 1) return [0, -1.5];
								if (player.hasSkill('lao_cannue', false, target) && player.hasSkill('lao_xiehan', false, target)) {
									if (player.hp == 2) return [0, -0.5];
									return [0, 2];
								}
								return [0, -1];
							}
						}
					}
				}
			},
			lao_huidu: {
				audio: 'olbaonue',
				forced: true,
				unique: true,
				trigger: { player: 'phaseJieshuEnd' },
				juexingji: true,
				skillAnimation: true,
				animationColor: 'metal',
				filter(event, player) {
					return player.countMark('lao_cannue') >= 6;
				},
				content() {
					player.awakenSkill(event.name);
					player.removeMark('lao_cannue', 6);

					var cards = [];
					while (cards.length < 70) {
						var card = get.cardPile2(function (card) {
							var info = get.info(card, false);
							return !info.notarget && get.type2(card, 'trick') == 'trick';
						});
						if (card) {
							cards.push(card);
							game.cardsGotoOrdering([card]);
							card.remove();
						}
						else break;
					}
					if (!cards.length) event.finish();
					else {
						event.cards = cards;
						// game.cardsGotoOrdering(cards);

						for (var i of cards) {
							var info = lib.card[i.name];
							var list = game.filterPlayer(function (target) {
								return !target.isDead();
							});
							var source = list.randomGet();
							var list2 = Array.from(list);
							list2.splice(list2.indexOf(source), 1);
							var target = list2.randomGet();
							if (info.selectTarget != undefined) {
								if (Array.isArray(info.selectTarget)) {
									if (info.selectTarget[0] < 0) {
										if (i.name == 'shandian') {
											source.useCard(i, source);
										} else {
											source.useCard(i);
										}
										// game.log(source,'使用了',i.name);
									} else {
										var targets = [];
										targets.push(target);
										list2.splice(list2.indexOf(target), 1);
										var target2 = list2.randomGet();
										targets.push(target2);
										source.useCard(i, targets);
									}
									game.delay(0.3);
								}
								else if (info.selectTarget < 0) {
									switch (i.name) {
										case 'wuzhong':
										case 'shandian':
											source.useCard(i, source);
											game.delay(0.3);
											break;
										case 'wugu':
											if (source != player) {
												source.useCard(i, list);
											} else {
												var wunan = i;
												wunan.name = 'nanman';
												source.useCard(wunan, list2);
											}
											game.delay(0.3);
											break;
										case 'taoyuan':
											if (source != player) {
												source.useCard(i, list);
											} else {
												var taowan = i;
												taowan.name = 'wanjian';
												source.useCard(taowan, list2);
											}
											game.delay(0.3);
											break;
										default:
											source.useCard(i, list2);
											game.delay(0.3);
									}
								}
								else if (i.name == 'jiedao') {
									list2.splice(list2.indexOf(target), 1);
									var target2 = list2.randomGet();
									var targets = [];
									targets.push(target);
									targets.push(target2);
									source.useCard(i, targets);
									game.delay(0.3);
								}
								else {
									source.useCard(i, target);
									game.delay(0.3);
								}
							}
						}
					}

					player.loseMaxHp(4);
					game.log('毁都使用了', cards.length, '张锦囊牌，如下：', cards);
				},
			},
			// 神鲁肃
			diying: {
				audio: 'olhaoshi',
				enable: 'phaseUse',
				usable: 1,
				content() {
					'step 0'
					player.chooseTarget('选择一名角色获得〖弘德〗〖弼政〗〖博图〗〖诫训〗〖缔盟〗〖决堰〗中的一个，直到其回合结束。').set('ai', function (target) {
						var att = get.attitude(_status.event.player, target);
						if (att > 0) {
							return true;
						} else if (target == player) {
							return true;
						} else {
							return false;
						}
					});

					'step 1'
					if (result.bool) {
						var list = ['hongde', 'bizheng', 'rebotu', 'jiexun', 'oldimeng', 'drlt_jueyan'];
						var diyingSkill = list.randomGet();
						var target = result.targets[0];
						if (!target.hasSkill(diyingSkill)) {
							target.addTempSkill(diyingSkill, { player: 'phaseAfter' });
							target.popup('获得技能');
							target.popup(diyingSkill);
						} else {
							target.popup('已有技能');
							target.popup(diyingSkill);
						}
					}
				},
				ai: {
					order: 10,
					result: {
						player(player, target) {
							return 5;
						}
					},
					threaten: 1,
				}
			},
			lao_fusheng: {
				audio: 2,
				trigger: { target: 'useCardToBefore' },
				forced: true,
				priority: 15,
				filter(event, player) {
					return event.card && event.card.name == 'sha' && event.card.suit == 'heart';
				},
				content() {
					trigger.cancel();
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (card && card.name == 'sha' && card.suit == 'heart') return 'zerotarget';
						},
					}
				},
			},
			lao_chiyan: {
				audio: 2,
				trigger: { player: 'phaseDiscardEnd' },
				direct: true,
				filter(event, player) {
					var cards = [];
					player.getHistory('lose', function (evt) {
						if (evt.type == 'discard' && evt.getParent('phaseDiscard') == event) cards.addArray(evt.cards2);
					});
					return cards.length >= 2;
				},
				content() {
					"step 0"
					player.chooseTarget(get.prompt('lao_chiyan'), '对一名其他角色造成1点火属性伤害').set('ai', target => {
						var player = _status.event.player;
						return get.damageEffect(target, player, player, 'fire');
					});
					'step 1'
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, 'fire');
						target.damage(1, 'fire');
					}
				},
				ai: {
					expose: 0.2,
					threaten: 2
				}
			},
			lao_lianmeng: {
				audio: 'oldimeng',
				enable: 'phaseUse',
				usable: 1,
				filterCard: true,
				selectCard: 2,
				discard: false,
				lose: false,
				delay: 0,
				filterTarget(card, player, target) {
					return player != target;
				},
				filter(event, player) {
					return player.countCards('h') >= 2;
				},
				check(card) {
					if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') return 0;
					if (!ui.selected.cards.length && card.name == 'du') return 20;
					var player = get.owner(card);
					if (ui.selected.cards.length >= Math.max(2, player.countCards('h') - player.hp)) return 0;
					if (player.hp == player.maxHp || player.countCards('h') <= 1) {
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
						if (player.countCards('h') >= 2) return 8 - get.value(card);
					}
					return 10 - get.value(card);
				},
				content() {
					// player.line(target, 'green');
					player.give(cards, target);
					player.draw(3);
				},
				ai: {
					order(skill, player) {
						if (player.hp < player.maxHp && player.countCards('h') > 1) {
							return 10;
						}
						return 4;
					},
					result: {
						target(player, target) {
							if (target.hasSkillTag('nogain')) return 0;
							if (ui.selected.cards.length && ui.selected.cards[0].name == 'du') {
								if (target.hasSkillTag('nodu')) return 0;
								return -10;
							}
							if (target.hasJudge('lebu')) return 0;
							var nh = target.countCards('h');
							var np = player.countCards('h');
							if (player.hp == player.maxHp || player.countCards('h') <= 1) {
								if (nh >= np - 1 && np <= player.hp && !target.hasSkill('haoshi')) return 0;
							}
							return Math.max(1, 5 - nh);
						}
					},
					effect: {
						target(card, player, target) {
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
			},
			// 神徐盛
			kuijun: {
				audio: 'decadepojun',
				trigger: { player: 'useCardToPlayered' },
				direct: true,
				filter(event, player) {
					return event.card.name == 'sha' && event.target.countCards('h') > 0;
				},
				content() {
					trigger.target.addTempSkill('fengyin');
					trigger.target.showHandcards();
					var cards = trigger.target.getCards('h');
					if (cards.length > player.hp) {
						trigger.directHit.add(trigger.target);
					}
				},
				group: ['kuijun_effect', 'kuijun_double'],
				ai: {
					unequip_ai: true,
					directHit_ai: true,
					threaten: 0.5,
					skillTagFilter(player, tag, arg) {
						if (get.attitude(player, arg.target) > 0) return false;
						if (tag == 'directHit_ai') return player.hp < arg.target.countCards('h');
						return false;
					}
				},
				subSkill: {
					double: {
						trigger: { player: 'useCard2' },
						filter(event, player) {
							if (event.card.name != 'sha') return false;
							return game.hasPlayer(function (current) {
								return !event.targets.contains(current) && current.getEquips(2).length > 0 && current != player;
							});
						},
						direct: true,
						content() {
							'step 0'
							player.chooseTarget(get.prompt('kuijun'), '为' + get.translation(trigger.card) + '增加一个目标', function (card, player, target) {
								return !_status.event.sourcex.contains(target) && target.getEquips(2).length > 0 && player != target;
							}).set('sourcex', trigger.targets).set('ai', function (target) {
								var player = _status.event.player;
								return get.effect(target, _status.event.card, player, player);
							}).set('card', trigger.card);
							'step 1'
							if (result.bool) {
								if (!event.isMine() && !event.isOnline()) game.delayx();
								event.target = result.targets[0];
							}
							else {
								event.finish();
							}
							'step 2'
							player.logSkill('kuijun', event.target);
							trigger.targets.push(event.target);
						},
						ai: {
							effect: {
								player(card, player, target, current, isLink) {
									if (!isLink && card.name == 'sha') {
										if (player._kuijuntmp) return;
										player._kuijuntmp = true;
										if (get.effect(target, card, player, player) <= 0) {
											delete player._kuijuntmp;
											return;
										}
										if (game.hasPlayer(function (current) {
											return current != target && current.getEquips(2).length > 0 &&
												player.canUse(card, current) && get.effect(current, card, player, player) > 0;
										})) {
											delete player._kuijuntmp;
											return [1, 1];
										}
										delete player._kuijuntmp;
									}
								}
							}
						}
					},
					effect: {
						audio: 'repojun',
						trigger: { source: 'damageBegin1' },
						forced: true,
						locked: false,
						logTarget: 'player',
						filter(event, player) {
							var target = event.player;
							return event.getParent().name == 'sha' && target.countCards('h') > 0;
						},
						content() {
							var cards = trigger.player.getCards('h');
							for (let i = 0; i < cards.length; i++) {
								if (get.suit(cards[i], false) == get.suit(trigger.card, false)) {
									if (trigger.num < trigger.player.maxHp) {
										trigger.num++;
									}
								}
							}
						},
					}
				},
			},

			// 欢杀界陆逊
			hpp_lianying: {
				audio: 'relianying',
				trigger: {
					player: 'loseAfter',
					global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
				},
				frequent: true,
				filter(event, player) {
					if (player.countCards('h')) return false;
					var evt = event.getl(player);
					return evt && evt.player == player && evt.hs && evt.hs.length > 0;
				},
				content() {
					player.draw(player.maxHp);
				},
				ai: {
					threaten: 0.8,
					effect: {
						target(card) {
							if (card.name == 'guohe') return 0.4;
						}
					},
					noh: true,
					skillTagFilter(player, tag) {
						if (tag == 'noh') {
							if (player.countCards('h') != 1) return false;
						}
					}
				}
			},
			// 欢杀界吕布
			hpp_reshenwei: {
				audio: 'shenwei',
				unique: true,
				trigger: { player: 'phaseDrawBegin' },
				forced: true,
				content() {
					trigger.num += 2;
				},
				mod: {
					maxHandcard(player, current) {
						return current + 2;
					}
				}
			},
			// 欢杀界左慈
			hpp_re_xinsheng: {
				getList() {
					return Object.keys(lib.characterPack.happykill).filter(function (i) {
						if (!lib.characterPack.happykill[i][4]) return true;
						return !lib.characterPack.happykill[i][4].contains('unseen');
					});
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
				audio: 'pingjian',
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
									info.dutySkill || info.groupSkill || (info.priority && typeof info.priority == 'number') || info.firstDo || info.lastDo) continue;
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
				audio: 'pingjian',
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
								if (!info || !info.enable || info.charlotte || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill || info.groupSkill) continue;
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

			// others
			hppxingwu: {
				audio: 2,
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					return player.countCards('h');
				},
				filterCard: true,
				filterTarget: lib.filter.notMe,
				check(card) {
					return 8 - get.value(card);
				},
				contentBefore() {
					_status.event.player = player;
					_status.event.trigger('useXingWu');
				},
				content() {
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
						target(player, target) {
							if (get.attitude(player, target) > 0) return 0;
							return get.damageEffect(target, player);
						},
					},
				},
			},
			hppluoyan: {
				audio: 1,
				derivation: ['hpp_tianxiang', 'hpp_hongyan'],
				trigger: { player: 'hpp_xingwuAfter' },
				forced: true,
				content() {
					for (var i of lib.skill.hpp_luoyan.derivation) player.addTempSkill(i, { player: 'phaseUseBegin' });
				},
			},
			hpphuimou: {
				audio: 1,
				trigger: { player: ['useCard', 'respond', 'hpp_tianxiangEnd'] },
				filter(event, player) {
					if (!game.hasPlayer(function (current) {
						return current.isTurnedOver();
					})) return false;
					if (event.card) return !player.isPhaseUsing() && get.suit(event.card) == 'heart';
					return true;
				},
				direct: true,
				content() {
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
			hpphuchi: {
				group: ['hpp_huchi_miss', 'hpp_huchi_draw'],
				audio: 1,
				trigger: { player: 'phaseJieshuBegin' },
				frequent: true,
				prompt: '是否发动【虎痴】，将手牌摸至两张？',
				filter(event, player) {
					return player.countCards('h') < 2;
				},
				content() {
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
						content() {
							player.addMark('hpp_huchi', 1);
						},
					},
					draw: {
						audio: 'hpp_huchi',
						enable: 'phaseUse',
						filter(event, player) {
							return player.countMark('hpp_huchi');
						},
						usable: 1,
						content() {
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
			hppshendao: {
				audio: 2,
				trigger: { player: 'judge' },
				direct: true,
				content() {
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
			hppxinsheng: {
				audio: 2,
				trigger: { player: 'damageEnd' },
				frequent: true,
				content() {
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
			hppzhengbing: {
				audio: 1,
				mod: {
					ignoredHandcard(card, player) {
						if (card.hasGaintag('zhengbing')) return true;
					},
					cardDiscardable(card, player, name) {
						if (name == 'phaseDiscard' && card.hasGaintag('zhengbing')) return false;
					},
				},
				group: 'zhengbing_mark',
				enable: 'phaseUse',
				filter(event, player) {
					return player.countCards('h', function (card) {
						return card.hasGaintag('zhengbing');
					});
				},
				filterCard(card) {
					return card.hasGaintag('zhengbing');
				},
				check(card) {
					return 7 - get.value(card);
				},
				prepare(cards, player) {
					player.$throw(cards, 1000);
					game.log(player, '将', cards, '置入了弃牌堆');
				},
				discard: false,
				loseTo: 'discardPile',
				visible: true,
				delay: 0.5,
				content() {
					player.draw(player.countCards('h', function (card) {
						return card.hasGaintag('zhengbing');
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
						filter(event, player) {
							return lib.translate[event.getParent(3).name] == '突袭';
						},
						direct: true,
						firstDo: true,
						content() {
							trigger.gaintag.add('zhengbing');
						},
					},
				},
			},
			hppqingchuang: {
				audio: 1,
				enable: 'phaseUse',
				filter(event, player) {
					if (!player.hasMark('hpp_buqu')) return false;
					return player.countCards('h', card => lib.skill.hpp_qingchuang.filterCard(card, player));
				},
				filterCard(card, player) {
					return get.name(card, player) == 'tao' || get.name(card, player) == 'jiu';
				},
				check(card) {
					var player = _status.event.player;
					return 2 - ['tao', 'jiu'].indexOf(get.name(card, player));
				},
				usable: 1,
				delay: 0,
				content() {
					player.removeMark('hpp_buqu', 1);
					player.draw();
				},
				ai: {
					order: 7,
					result: { player: 1 },
				},
			},
			hpptuodao: {
				audio: 2,
				trigger: { player: ['useCard', 'respond'] },
				filter(event, player) {
					return event.card.name == 'shan';
				},
				forced: true,
				content() {
					player.addSkill('hpp_tuodao_mark');
					player.addMark('hpp_tuodao_mark', 1, false);
					player.when('useCard')
						.filter((event, player) => event.card.name == 'sha')
						.then(() => {
							trigger.baseDamage += player.countMark('hpp_tuodao_mark');
							player.removeSkill('hpp_tuodao_mark');
						});
				},
				subSkill: {
					mark: {
						charlotte: true,
						onremove: true,
						intro: { content: '下一张【杀】的伤害基数+#' },
					},
				},
			},
			hppshenglun: {
				audio: 1,
				enable: 'phaseUse',
				filterTarget: lib.filter.notMe,
				selectTarget: [1, 2],
				usable: 1,
				content() {
					var list = [
						get.sgn(player.hp - target.hp),
						get.sgn(player.countCards('h') - target.countCards('h')),
						get.sgn(player.countCards('e', card => get.subtype(card) == 'equip1') - target.countCards('e', card => get.subtype(card) == 'equip1')),
						get.sgn(player.countCards('e', card => get.subtype(card) == 'equip2') - target.countCards('e', card => get.subtype(card) == 'equip2')),
						get.sgn(player.countCards('e', card => ['equip3', 'equip4'].includes(get.subtype(card))) - target.countCards('e', card => ['equip3', 'equip4'].includes(get.subtype(card)))),
					], num = 0;
					while (num < 5) {
						game.log('第' + get.cnNumber(num + 1, true) + '局', list[num] > 0 ? '#g成功' : '#y失败');
						player.addMark('hpp_shenglun_' + (list[num] > 0 ? 'win' : 'lose'), 1, false);
						if (player.countMark('hpp_shenglun_win') >= 10 || player.countMark('hpp_shenglun_lose') >= 10) {
							var next = game.createEvent('hpp_shenglun_result');
							next.player = player;
							next.setContent(lib.skill.hpp_shenglun.contentx);
						}
						num++;
					}
				},
				ai: {
					order: 1,
					result: {
						target(player, target) {
							var att = get.attitude(player, target);
							var num = get.sgn(att);
							var ref = get.recoverEffect(player, player, player);
							var def = game.filterPlayer.reduce((list, current) => {
								return list.push(get.damageEffect(current, player, player));
							}, []).sort((a, b) => b - a)[0];
							var sum = get.sgn(player.hp - target.hp) + get.sgn(player.countCards('h') - target.countCards('h')) +
								get.sgn(player.countCards('e', card => get.subtype(card) == 'equip1') - target.countCards('e', card => get.subtype(card) == 'equip1')) +
								get.sgn(player.countCards('e', card => get.subtype(card) == 'equip2') - target.countCards('e', card => get.subtype(card) == 'equip2')) +
								get.sgn(player.countCards('e', card => ['equip3', 'equip4'].includes(get.subtype(card))) - target.countCards('e', card => ['equip3', 'equip4'].includes(get.subtype(card))));
							if (((ref - def) * sum) > 0) return 2 * num;
							return num;
						},
					},
				},
				contentx() {
					'step 0'
					if (player.countMark('hpp_shenglun_win') > player.countMark('hpp_shenglun_lose')) {
						player.recover();
						event.goto(2);
					}
					else player.chooseTarget('请选择【胜论】的目标', '对一名角色造成1点伤害', true).set('ai', target => get.damageEffect(target, _status.event.player, _status.event.player));
					'step 1'
					if (result.bool) {
						var target = result.targets[0];
						player.line(target);
						target.damage();
					}
					'step 2'
					player.logSkill('hpp_yiji');
					player.draw(2);
					if (_status.connectMode) game.broadcastAll(function () { _status.noclearcountdown = true });
					event.given_map = {};
					event.num = 2;
					'step 3'
					player.chooseCardTarget({
						filterCard(card) {
							return get.itemtype(card) == 'card' && !card.hasGaintag('reyiji_tag');
						},
						filterTarget: lib.filter.notMe,
						selectCard: [1, event.num],
						prompt: '请选择要分配的卡牌和目标',
						ai1(card) {
							if (!ui.selected.cards.length) return 1;
							return 0;
						},
						ai2(target) {
							var player = _status.event.player, card = ui.selected.cards[0];
							var val = target.getUseValue(card);
							if (val > 0) return val * get.attitude(player, target) * 2;
							return get.value(card, target) * get.attitude(player, target);
						},
					});
					'step 4'
					if (result.bool) {
						var res = result.cards, target = result.targets[0].playerid;
						player.addGaintag(res, 'reyiji_tag');
						event.num -= res.length
						if (!event.given_map[target]) event.given_map[target] = [];
						event.given_map[target].addArray(res);
						if (event.num > 0) event.goto(3);
					}
					else if (event.num == 2) {
						if (_status.connectMode) game.broadcastAll(function () { delete _status.noclearcountdown; game.stopCountChoose() });
						event.goto(6);
					}
					'step 5'
					if (_status.connectMode) game.broadcastAll(function () { delete _status.noclearcountdown; game.stopCountChoose() });
					var map = [], cards = [];
					for (var i in event.given_map) {
						var source = (_status.connectMode ? lib.playerOL : game.playerMap)[i];
						player.line(source, 'green');
						map.push([source, event.given_map[i]]);
						cards.addArray(event.given_map[i]);
					}
					game.loseAsync({
						gain_list: map,
						player: player,
						cards: cards,
						giver: player,
						animate: 'giveAuto',
					}).setContent('gaincardMultiple');
					'step 6'
					if (player.countMark('hpp_shenglun_win') > player.countMark('hpp_shenglun_lose')) {
						player.removeMark('hpp_shenglun_win', player.countMark('hpp_shenglun_win'), false);
					} else {
						player.removeMark('hpp_shenglun_lose', player.countMark('hpp_shenglun_lose'), false);
					}
				},
				subSkill: {
					win: {
						charlotte: true,
						onremove: true,
						marktext: '胜',
						intro: { content: '已胜利#次' },
					},
					lose: {
						charlotte: true,
						onremove: true,
						marktext: '败',
						intro: { content: '已失败#次' },
					},
				},
			},
			hppwuchang: {
				audio: 1,
				trigger: { source: 'damageBegin1' },
				filter(event, player) {
					if (event.player.group != player.group) return false;
					if (event.getParent().type != 'card' || !['sha', 'juedou'].includes(event.card.name)) return false;
					var history = event.player.getHistory('useCard').concat(event.player.getHistory('respond'));
					return !history.some(evt => evt.respondTo && evt.respondTo[1] == event.card);
				},
				logTarget: 'player',
				prompt2: (event, player) => '令即将对' + get.translation(event.player) + '造成的伤害+1，然后你变更至其他势力',
				check: (event, player) => get.attitude(player, event.player) < 0 && get.damageEffect(event.player, player, player) > 0 && !event.player.hasSkillTag('filterDamage', true, { player: player, card: event.card }),
				content() {
					trigger.num++;
					player.addTempSkill('hpp_wuchang_change');
					trigger['hpp_wuchang_' + player.playerid] = trigger.player.group;
				},
				group: 'hpp_wuchang_draw',
				subSkill: {
					change: {
						charlotte: true,
						trigger: { global: ['damageAfter', 'damageZero', 'damageCancelled'] },
						filter(event, player) {
							return event['hpp_wuchang_' + player.playerid];
						},
						forced: true,
						popup: false,
						content() {
							'step 0'
							var list = lib.group.slice();
							list.removeArray([/*'shen',*/trigger['hpp_wuchang_' + player.playerid]]);
							player.chooseControl(list).set('prompt', '无常：请选择你要变更的势力').set('ai', () => {
								var player = _status.event.player;
								var aim = _status.event.getTrigger().player;
								var list = _status.event.list;
								var list2 = list.filter(group => game.hasPlayer(target => target != aim && target.group == group && get.attitude(player, target) < 0));
								if (list2.length) {
									list2.sort((a, b) => game.countPlayer(target => target != aim && target.group == b && get.attitude(player, target) < 0) - game.countPlayer(target => target != aim && target.group == a && get.attitude(player, target) < 0));
									return list2[0];
								}
								else return list.randomGet();
							}).set('list', list);
							'step 1'
							if (result.control) {
								var group = result.control;
								player.popup(group + '2', get.groupnature(group, 'raw'));
								player.changeGroup(group);
							}
						},
					},
					draw: {
						audio: 'hpp_wuchang',
						enable: 'phaseUse',
						filterTarget: lib.filter.notMe,
						prompt: '令一名其他角色摸一张牌，然后你将势力变更至与其相同并从牌堆中获得一张【杀】',
						usable: 1,
						content() {
							'step 0'
							target.draw();
							if (target.group != player.group) player.changeGroup(target.group);
							'step 1'
							var card = get.cardPile2(card => card.name == 'sha');
							if (card) player.gain(card, 'gain2');
						},
						ai: {
							order(item, player) {
								var bool = player.countCards('hs', card => get.name(card) == 'juedou' && player.hasValueTarget(card));
								return get.order({ name: bool ? 'juedou' : 'sha' }, player) + 0.3;
							},
							result: {
								target(player, target) {
									var cards = player.getCards('hs', card => ['sha', 'juedou'].includes(get.name(card)) && player.hasValueTarget(card));
									var att = get.sgn(get.attitude(player, target));
									if (!cards.length) return 1;
									var list = [];
									cards.forEach(card => {
										var bool = (card.name != 'sha' || player.getCardUsable('sha') > 0);
										var targets = game.filterPlayer(current => bool && player.canUse(card, current) && get.effect(current, card, player, player) > 0 && get.attitude(player, current) < 0);
										targets.sort((a, b) => get.effect(b, card, player, player) - get.effect(a, card, player, player));
										list.push([targets[0], get.effect(targets[0], card, player, player)]);
									});
									list.sort((a, b) => b[1] - a[1]);
									if (list[0][0].group != target.group) return get.sgn(att - 0.5) + (att >= 0 ? 1.5 : 0);
									return 3 * (get.sgn(att + 0.5) + (att > 0 ? 1 : 0)) + (list[0][0] == target ? 1 : 0);
								},
							},
						},
					},
				},
			},
			hppjuezhu: {
				audio: 1,
				limited: true,
				enable: 'phaseUse',
				direct: true,
				filter(event, player) {
					return player.hasEnabledSlot(3) || player.hasEnabledSlot(4);
				},
				skillAnimation: true,
				animationColor: 'water',
				content() {
					'step 0'
					player.chooseTarget(get.prompt2('hpp_juezhu'), [1, 2], function (card, player, target) {
						return player != target && !ui.selected.targets.length && !target.hasSkill('feiying');
					}).set('promptbar', 'none').set('ai', function (target) {
						if (player.hasUnknown()) return false;
						return get.attitude(player, target);
					});
					'step 1'
					if (result.bool) {
						event.target = result.targets[0];
						var list = [];
						if (player.hasEnabledSlot(3)) list.push('equip3');
						if (player.hasEnabledSlot(4)) list.push('equip4');
						if (list.length == 1) event._result = { control: list[0] };
						else player.chooseControl(list).set('prompt', '选择废除一个坐骑栏');
					}
					else event.finish();
					'step 2'
					player.logSkill('hpp_juezhu', target);
					player.awakenSkill('hpp_juezhu');
					player.disableEquip(result.control);
					target.disableJudge();
					player.markAuto('hpp_juezhu_restore', [[target, result.control]]);
					player.addSkill('hpp_juezhu_restore');
					target.addSkill('feiying');
				},
				subSkill: {
					restore: {
						trigger: { global: 'die' },
						forced: true,
						charlotte: true,
						filter(event, player) {
							for (var i of player.getStorage('hpp_juezhu_restore')) {
								if (i[0] == event.player && player.hasDisabledSlot(i[1])) return true;
							}
							return false;
						},
						content() {
							var list = [];
							for (var i of player.getStorage('hpp_juezhu_restore')) {
								if (i[0] == trigger.player && player.hasDisabledSlot(i[1])) list.push(i[1]);
							}
							player.enableEquip(list);
							player.addSkill('feiying');
						},
					},
				},
				derivation: 'feiying',
			},
			hppzjjuxiang: {
				audio: 1,
				inherit: 'jsrgjuxiang',
				checkx(event, player) {
					var target = _status.currentPhase;
					if (!target || get.attitude(player, target) <= 0) return false;
					var evt = event.getParent('phaseDiscard'), evt2 = event.getParent('phaseJieshu');
					if (evt && evt.name == 'phaseDiscard' || evt2 && evt.name == 'phaseJieshu') return false;
					if (target.getCardUsable({ name: 'sha' }) >= target.countCards('hs', 'sha')) return false;
					if (!target.hasValueTarget({ name: 'sha' })) return false;
					return true;
				},
				direct: true,
				content() {
					'step 0'
					var target = _status.currentPhase;
					var str = '弃置任意张此次获得的牌';
					if (target && target.isIn()) {
						event.target = target;
						str += '，令' + get.translation(target) + '本回合使用【杀】的次数+X（X为你以此法弃置的花色数）';
					}
					player.chooseToDiscard(get.prompt('hpp_zjjuxiang'), str, (card, player) => _status.event.cards.includes(card)).set('ai', card => {
						if (!_status.event.goon) return 0;
						var player = _status.event.player, target = _status.currentPhase;
						if (ui.selected.cards.some(cardx => get.suit(cardx, player) == get.suit(card, player))) return 0;
						var num = target.countCards('hs', card => card.name == 'sha') - target.getCardUsable({ name: 'sha' });
						if (ui.selected.cards.length < num) return 7 - get.value(card);
						return 0;
					}).set('cards', trigger.getg(player).filter(i => player.getCards('h').includes(i))).set('complexCard', true).set('goon', lib.skill.hpp_zjjuxiang.checkx(trigger, player)).logSkill = 'hpp_zjjuxiang';
					'step 1'
					if (result.bool) {
						if (target && target.isIn()) {
							var num = result.cards.reduce((list, card) => list.add(get.suit(card, player)), []).length;
							target.addTempSkill('jsrgjuxiang_sha');
							target.addMark('jsrgjuxiang_sha', num, false);
							var evt = trigger.getParent('phaseUse');
							if (evt && evt.name == 'phaseUse' && !evt.skill) {
								evt.player.addTempSkill('jsrgjuxiang_buff', 'phaseUseAfter');
								evt.player.addMark('jsrgjuxiang_buff', num, false);
							}
						}
					}
				},
			},
			hppjinghong: {
				audio: 2,
				trigger: { player: 'phaseZhunbeiBegin' },
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return current != player && current.countCards('h');
					});
				},
				direct: true,
				content() {
					'step 0'
					var num = Math.min(game.countPlayer(function (current) {
						return current != player && current.countCards('h');
					}), game.countPlayer() - 1, 4);
					player.chooseTarget(get.prompt2('hpp_jinghong'), [1, num], lib.filter.notMe).set('ai', function (target) {
						var player = _status.event.player;
						if (!target.countCards('h')) return 0;
						return (1 - get.sgn(get.attitude(player, target))) / target.countCards('h');
					});
					'step 1'
					if (result.bool) {
						var targets = result.targets.sortBySeat();
						event.targets = targets;
						player.logSkill('hpp_jinghong', targets);
						player.addTempSkill('hpp_jinghong_effect');
					}
					else event.finish();
					'step 2'
					var target = event.targets.shift();
					event.target = target;
					player.line(target);
					if (!target.countCards('h')) event.redo();
					'step 3'
					var card = target.getCards('h').randomGet();
					player.showCards(card, get.translation(player) + '展示的' + get.translation(target) + '的手牌');
					if (get.color(card, target) == 'black') player.gain(card, target, 'giveAuto', 'bySelf').gaintag.add('hpp_jinghong');
					if (get.color(card, target) == 'red') target.discard(card);
					'step 4'
					if (event.targets.length) event.goto(2);
				},
				subSkill: {
					effect: {
						charlotte: true,
						onremove(player) {
							player.removeGaintag('hpp_jinghong');
						},
						mod: {
							ignoredHandcard(card, player) {
								if (card.hasGaintag('hpp_jinghong')) return true;
							},
							cardDiscardable(card, player, name) {
								if (name == 'phaseDiscard' && card.hasGaintag('hpp_jinghong')) return false;
							},
						},
					},
				},
			},
			hppspluoshen: {
				mod: {
					aiValue(player, card, num) {
						if (get.name(card) != 'shan' && get.color(card) != 'black') return;
						var cards = player.getCards('hs', function (card) {
							return get.name(card) == 'shan' || get.color(card) == 'black';
						});
						cards.sort(function (a, b) {
							return (get.name(b) == 'shan' ? 1 : 2) - (get.name(a) == 'shan' ? 1 : 2);
						});
						var geti = function () {
							if (cards.includes(card)) {
								return cards.indexOf(card);
							}
							return cards.length;
						};
						if (get.name(card) == 'shan') return Math.min(num, [6, 4, 3][Math.min(geti(), 2)]) * 0.6;
						return Math.max(num, [6.5, 4, 3][Math.min(geti(), 2)]);
					},
					aiUseful() {
						return lib.skill.hpp_spluoshen.mod.aiValue.apply(this, arguments);
					},
				},
				audio: 2,
				enable: ['chooseToRespond', 'chooseToUse'],
				filterCard(card) {
					return get.color(card) == 'black';
				},
				frequent: true,
				locked: false,
				position: 'hes',
				viewAs: { name: 'shan' },
				viewAsFilter(player) {
					if (!player.countCards('hes', { color: 'black' })) return false;
				},
				onuse(links, player) {
					player.addTempSkill('hpp_spluoshen_effect');
				},
				onrespond(links, player) {
					player.addTempSkill('hpp_spluoshen_effect');
				},
				prompt: '将一张黑色牌当作【闪】使用或打出',
				check: () => 1,
				ai: {
					order(item, player) {
						if (!player.hasSkill('hpp_spluoshen_used')) return 1145141919810
						return 2;
					},
					respondShan: true,
					skillTagFilter(player) {
						if (!player.countCards('hes', { color: 'black' })) return false;
					},
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, 'respondShan') && current < 0) return 0.6
						},
					},
				},
				subSkill: {
					used: { charlotte: true },
					effect: {
						charlotte: true,
						trigger: { player: ['useCardAfter', 'respondAfter'] },
						filter(event, player) {
							return event.skill == 'hpp_spluoshen' && !player.hasSkill('hpp_spluoshen_used');
						},
						prompt2: '进行一次判定并获得判定牌，若结果为黑色，你可以重复此流程',
						content() {
							'step 0'
							player.addTempSkill('hpp_spluoshen_used', 'roundStart');
							event.cards = [];
							'step 1'
							var next = player.judge(function (card) {
								var color = get.color(card);
								return color == 'black' ? 1 : -1;
							});
							next.judge2 = function (result) {
								return result.bool;
							};
							next.set('callback', function () {
								if (get.position(card, true) == 'o') player.gain(card, 'gain2');
							});
							'step 2'
							if (result.judge > 0) player.chooseBool('是否继续进行【洛神】判定？').set('frequentSkill', 'hpp_spluoshen');
							else event.finish();
							'step 3'
							if (result.bool) event.goto(1);
						},
					},
				},
			},
			hppmeihun: {
				audio: 2,
				trigger: { player: 'phaseJieshuBegin', target: 'useCardToTargeted' },
				filter(event, player) {
					if (event.name != 'phaseJieshu' && game.getGlobalHistory('useCard', function (evt) {
						return evt.card.name == 'sha' && evt.targets.includes(player);
					}).indexOf(event.getParent()) != 0) return false;
					return game.hasPlayer(function (current) {
						return current != player && current.countCards('he');
					});
				},
				direct: true,
				content() {
					'step 0'
					player.chooseTarget(get.prompt2('hpp_meihun'), function (card, player, target) {
						return target != player && target.countCards('he');
					}).set('ai', function (target) {
						var player = _status.event.player;
						return -get.sgn(get.attitude(player, target)) * target.countCards('he');
					});
					'step 1'
					if (result.bool) {
						var target = result.targets[0];
						player.logSkill('hpp_meihun', target);
						event.target = target;
						player.chooseControl(lib.suit.slice(0).reverse()).set('prompt', '请声明一个花色').set('ai', function () {
							var target = _status.event.target, cards = target.getCards('he');
							var suits = lib.suit.slice(0);
							suits.sort(function (a, b) {
								var num = function (suit) {
									return cards.filter(function (card) {
										return get.suit(card) == suit;
									}).length;
								};
								return num(b) - num(a);
							});
							return suits[0];
						}).set('target', target);
					}
					else event.finish();
					'step 2'
					var suit = result.control;
					player.chat(get.translation(suit + 2));
					game.log(player, '选择了', '#y' + get.translation(suit + 2));
					if (target.countCards('he', { suit: suit })) player.gain(target.getCards('he', { suit: suit }), target, 'giveAuto');
					else if (target.countCards('h')) player.gainPlayerCard(target, true, 'h', 'visible');
				},
			},
			hpphuoxin: {
				audio: 2,
				enable: 'phaseUse',
				filter(event, player) {
					return game.hasPlayer(function (target) {
						return lib.skill.hpp_huoxin.filterTarget(null, player, target);
					}) && player.countCards('he');
				},
				filterTarget(card, player, target) {
					if (!ui.selected.targets.length) {
						return game.hasPlayer(function (current) {
							return current != target && target.canCompare(current);
						});
					}
					return ui.selected.targets[0].canCompare(target);
				},
				selectTarget: 2,
				multitarget: true,
				multiline: true,
				targetprompt: ['发起人', '拼点目标'],
				filterCard: true,
				check(card) {
					return 1 / (get.value(card) || 0.5);
				},
				position: 'he',
				usable: 1,
				content() {
					'step 0'
					event.list = [];
					targets[0].chooseToCompare(targets[1]);
					'step 1'
					for (var target of targets) {
						if (result.winner !== target) event.list.push(target);
					}
					event.list.sortBySeat();
					var suits = lib.suit.slice(0).reverse();
					suits.push('cancel2');
					player.chooseControl(suits).set('prompt', get.translation(event.list) + '拼点没赢，是否声明一个花色令其进行选择？').set('ai', function () {
						var currents = _status.event.list, cards = [];
						for (var i of currents) cards.addArray(i.getCards('he'));
						var suits = lib.suit.slice(0);
						suits.sort(function (a, b) {
							var num = function (suit) {
								return cards.filter(function (card) {
									return get.suit(card) == suit;
								}).length;
							};
							return num(b) - num(a);
						});
						return suits[0];
					}).set('list', event.list);
					'step 2'
					var suit = result.control;
					if (suit != 'cancel2') {
						player.chat(get.translation(suit + 2));
						game.log(player, '选择了', '#y' + get.translation(suit + 2));
						event.suit = suit;
					}
					else event.finish();
					'step 3'
					var target = event.list.shift();
					event.target = target;
					player.line(target);
					if (!target.countCards('he', { suit: event.suit })) event._result = { index: 1 };
					else target.chooseControl().set('choiceList', [
						'交给' + get.translation(player) + '所有的' + get.translation(event.suit) + '牌',
						'不能使用或打出' + get.translation(event.suit) + '牌直到你的下个回合结束'
					]).set('ai', () => 1);
					'step 4'
					if (result.index == 0) player.gain(target.getCards('he', { suit: event.suit }), target, 'giveAuto');
					else {
						target.addTempSkill('hpp_huoxin_use', { player: 'phaseEnd' });
						target.markAuto('hpp_huoxin_use', [event.suit]);
					}
					'step 5'
					if (event.list.length) event.goto(3);
				},
				ai: {
					order: 12,
					result: {
						target(player, target) {
							return -target.countCards('h');
						},
					},
				},
				subSkill: {
					use: {
						charlotte: true,
						onremove: true,
						intro: { name: '魅惑', content: '不能使用或打出$花色的牌' },
						mod: {
							cardEnabled2(card, player) {
								if (player.getStorage('hpp_huoxin_use').includes(get.suit(card))) return false;
							},
						},
					},
				},
			},
			hppjishi: {
				mod: {
					maxHandcard(player, num) {
						return num + 3;
					},
				},
				audio: 2,
				group: ['hpp_jishi_recover', 'hpp_jishi_lose'],
				marktext: '药',
				intro: { name2: '药', content: 'mark' },
				trigger: { global: 'phaseBefore', player: 'enterGame' },
				filter(event, player) {
					if (player.countMark('hpp_jishi') >= 3) return false;
					return event.name != 'phase' || game.phaseNumber == 0;
				},
				forced: true,
				locked: false,
				content() {
					player.addMark('hpp_jishi', Math.min(3, 3 - player.countMark('hpp_jishi')));
				},
				ai: { threaten: 10 },
				subSkill: {
					recover: {
						audio: 'hpp_jishi',
						trigger: { global: 'dying' },
						filter(event, player) {
							return event.player.hp <= 0 && player.hasMark('hpp_jishi');
						},
						prompt2(event, player) {
							return '令' + get.translation(event.player) + '回复体力至1点';
						},
						logTarget: 'player',
						check(event, player) {
							return get.recoverEffect(event.player, player, player) > 0;
						},
						content() {
							player.removeMark('hpp_jishi', 1);
							trigger.player.recover(1 - trigger.player.hp);
						},
					},
					lose: {
						audio: 'hpp_jishi',
						trigger: {
							player: 'loseAfter',
							global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
						},
						filter(event, player) {
							var bool = false;
							if (event.name == 'gain' && player == event.player) return false;
							var evt = event.getl(player);
							if (!evt || !evt.cards2 || !evt.cards2.length) return false;
							for (var i of evt.cards2) {
								if (get.color(i, player) == 'red' && i.original == 'h') bool = true;
							}
							if (!bool) return false;
							return player != _status.currentPhase && player.countMark('hpp_jishi') < 3;
						},
						forced: true,
						locked: false,
						content() {
							var num = 0, evt = trigger.getl(player);
							for (var i of evt.cards2) {
								if (get.color(i, player) == 'red' && i.original == 'h' && num < 3 - player.countMark('hpp_jishi')) num++;
							}
							player.addMark('hpp_jishi', num);
						},
					},
				},
			},
			hpptaoxian: {
				group: 'hpp_taoxian_use',
				audio: 2,
				enable: 'chooseToUse',
				filterCard(card) {
					return get.suit(card) == 'heart';
				},
				viewAs: { name: 'tao' },
				viewAsFilter(player) {
					if (!player.countCards('hes', { suit: 'heart' })) return false;
					return true;
				},
				position: 'hes',
				prompt: '将一张红桃牌当作桃使用',
				check(card) {
					if (_status.event.type == 'dying') return 1 / Math.max(0.1, get.value(card));
					return 8 - get.value(card);
				},
				ai: { threaten: 10 },
				subSkill: {
					use: {
						audio: 'hpp_taoxian',
						trigger: { global: 'useCard' },
						filter(event, player) {
							return event.player != player && event.card.name == 'tao';
						},
						forced: true,
						locked: false,
						content() {
							player.draw();
						},
					},
				},
			},
			hppshenzhen: {
				audio: 1,
				trigger: { player: 'phaseZhunbeiBegin' },
				filter(event, player) {
					return player.hasMark('hpp_jishi');
				},
				direct: true,
				content() {
					'step 0'
					var map = {};
					var list = [];
					for (var i = 1; i <= player.countMark('hpp_jishi'); i++) {
						var cn = get.cnNumber(i, true);
						map[cn] = i;
						list.push(cn);
					}
					list.push('cancel2');
					event.map = map;
					player.chooseControl(list).set('prompt', get.prompt2('hpp_shenzhen')).set('ai', function () {
						var player = _status.event.player;
						var num = Math.min(player.countMark('hpp_jishi'), Math.max(game.countPlayer(function (current) {
							return get.attitude(player, current) > 0 && current.isDamaged() && get.recoverEffect(current, player, player) > 0;
						}), game.countPlayer(function (current) {
							return get.attitude(player, current) < 0;
						})));
						if (num > 0) return get.cnNumber(num, true);
						return 'cancel2';
					});
					'step 1'
					if (result.control != 'cancel2') {
						player.logSkill('hpp_shenzhen');
						var num = event.map[result.control] || 1;
						event.num = num;
						player.removeMark('hpp_jishi', num);
						player.chooseControl('回血', '扣血').set('prompt', '请选择一种效果').set('ai', function (card) {
							if (game.countPlayer(function (current) {
								return get.attitude(player, current) > 0 && current.isDamaged() && get.recoverEffect(current, player, player) > 0;
							}) >= game.countPlayer(function (current) {
								return get.attitude(player, current) < 0;
							})) return '回血';
							return '扣血';
						});
					}
					else event.finish();
					'step 2'
					event.control = result.control;
					switch (result.control) {
						case '回血':
							player.chooseTarget('请选择回复体力的目标', [1, Math.min(num, game.countPlayer(function (current) {
								return current.isDamaged();
							}))], true, function (card, player, target) {
								return target.isDamaged();
							}).set('ai', function (target) {
								var player = _status.event.player;
								return get.recoverEffect(target, player, player);
							});
							break;
						case '扣血':
							player.chooseTarget('请选择失去体力的目标', [1, Math.min(num, game.countPlayer())], true).set('ai', function (target) {
								var player = _status.event.player;
								return -get.attitude(player, target);
							});
							break;
					}
					'step 3'
					if (result.bool) {
						result.targets.sortBySeat();
						player.line(result.targets);
						game.log(player, '选择了', result.targets);
						if (event.control == '回血') for (var i of result.targets) i.recover();
						else for (var i of result.targets) i.loseHp();
					}
				},
				ai: {
					threaten: 10,
					combo: 'hpp_jishi',
				},
			},
			hppshenwei: {
				global: 'hpp_shenwei_damage',
				audio: 2,
				trigger: { player: 'phaseBegin' },
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return !current.hasMark('hpp_shenwei');
					});
				},
				direct: true,
				content() {
					'step 0'
					var num = (player.hp == 1 ? [1, 2] : 1);
					player.chooseTarget(get.prompt2('hpp_shenwei'), function (card, player, target) {
						return !target.hasMark('hpp_shenwei');
					}, num).set('ai', function (target) {
						var player = _status.event.player, num = 2;
						if (target == player) num = 1;
						return (get.attitude(player, target) - 4) * num;
					});
					'step 1'
					if (result.bool) {
						var target = result.targets[0];
						player.logSkill('hpp_shenwei', target);
						target.addMark('hpp_shenwei', 1);
					}
				},
				marktext: '卫',
				intro: { name2: '卫', content: 'mark' },
				ai: {
					expose: 0.25,
					threaten: 4.8,
				},
				subSkill: {
					damage: {
						trigger: { player: 'damageBegin4' },
						filter(event, player) {
							return player.hasMark('hpp_shenwei') && game.hasPlayer(function (current) {
								return current.hasSkill('hpp_shenwei');
							});
						},
						direct: true,
						content() {
							'step 0'
							player.chooseTarget(get.prompt('hpp_shenwei'), '将伤害转移给一名拥有〖神卫〗的角色', function (card, player, target) {
								return target.hasSkill('hpp_shenwei');
							}).set('ai', function (target) {
								var player = _status.event.player, att = get.attitude(player, target);
								if (att > 0 && player.hp > 1 && target.hp <= 1) return 0;
								return -att + 114514;
							});
							'step 1'
							if (result.bool) {
								var target = result.targets[0];
								player.logSkill('hpp_shenwei', target);
								player.removeMark('hpp_shenwei', player.countMark('hpp_shenwei'));
								event.trigger('removeShenWei');
								trigger.player = target;
							}
						},
					},
				},
			},
			hppelai: {
				audio: 2,
				trigger: { global: 'removeShenWei' },
				filter(event, player) {
					return player.isDamaged() || game.hasPlayer(function (current) {
						return current != player && player.inRange(current);
					});
				},
				forced: true,
				content() {
					'step 0'
					if (!game.hasPlayer(function (current) {
						return current != player && player.inRange(current);
					})) result.index = 0;
					else if (player.isHealthy()) result.index = 1;
					else player.chooseControl().set('choiceList', [
						'回复1点体力',
						'对攻击范围内的一名其他角色造成1点伤害'
					]).set('ai', function () {
						var num = 3;
						if (player.hasSkill('hpp_kuangxi') && game.hasPlayer(function (current) {
							return current.hasMark('hpp_shenwei');
						})) num--;
						if (player.hp >= num && game.hasPlayer(function (current) {
							return current != player && get.damageEffect(current, player, player) > 0;
						})) return 1;
						return 0;
					});
					'step 1'
					if (result.index == 0) {
						player.recover();
						event.finish();
					}
					else player.chooseTarget('请选择【恶来】的目标', '对一名攻击范围内的一名其他角色造成1点伤害', true, function (card, player, target) {
						return target != player && player.inRange(target);
					}).set('ai', function (target) {
						var player = _status.event.player;
						return get.damageEffect(target, player, player) + 114514;
					});
					'step 2'
					if (result.bool) {
						var target = result.targets[0];
						player.line(target);
						target.damage();
					}
				},
				ai: { combo: 'hpp_shenwei' },
			},
			hppquanxue: {
				marktext: '学',
				intro: { content: 'mark', name2: '学' },
				audio: 1,
				trigger: { player: 'phaseUseBegin' },
				direct: true,
				content() {
					'step 0'
					game.addGlobalSkill('hpp_quanxue_remove');
					player.chooseTarget(get.prompt2('hpp_quanxue'), [1, 2], lib.filter.notMe).set('ai', function (target) {
						return !target.hasMark('hpp_quanxue') && -get.attitude(player, target);
					});
					'step 1'
					if (result.bool) {
						var targets = result.targets.sortBySeat();
						player.logSkill('hpp_quanxue', targets);
						for (var i of targets) i.addMark('hpp_quanxue', 1);
					}
				},
				ai: {
					threaten: 4.5,
					expose: 0.25,
				},
				subSkill: {
					remove: {
						charlotte: true,
						trigger: { player: 'phaseBegin' },
						filter(event, player) {
							return player.hasMark('hpp_quanxue') && game.hasPlayer(function (current) {
								return current.hasSkill('hpp_quanxue');
							});
						},
						forced: true,
						content() {
							'step 0'
							player.removeMark('hpp_quanxue', player.countMark('hpp_quanxue'));
							'step 1'
							player.chooseControl().set('choiceList', [
								'本回合不能对其他角色使用牌',
								'失去1点体力',
							]).set('ai', function () {
								if ((player.countCards('h') < player.getHandcardLimit()) || player.hp <= 2) return 0;
								return 1;
							});
							'step 2'
							if (result.index == 0) player.addTempSkill('hpp_quanxue_block');
							else player.loseHp();
						},
					},
					block: {
						mark: true,
						intro: { content: '不能对其他角色使用牌' },
						mod: {
							playerEnabled(card, player, target) {
								if (player != target) return false;
							},
						},
					},
				},
			},
			hppdingli: {
				audio: 2,
				trigger: { global: 'logSkill' },
				filter(event, player) {
					return event.skill == 'hpp_quanxue_remove' && event.player != player;
				},
				check(event, player) {
					if (event.player.hp >= player.hp && player.isHealthy()) return false;
					return true;
				},
				round: 1,
				logTarget: 'player',
				content() {
					if (trigger.player.hp >= player.hp) player.recover();
					else player.draw(Math.min(2, player.hp - trigger.player.hp));
				},
				ai: { combo: 'hpp_quanxue' },
			},
			hppshuangshu: {
				audio: 2,
				trigger: { player: 'phaseZhunbeiBegin' },
				frequent: true,
				content() {
					var cards = get.cards(2), bool1 = false, bool2 = false;
					game.cardsGotoOrdering(cards);
					player.showCards(cards, get.translation(player) + '发动了【双姝】');
					for (var i of cards) {
						if (get.suit(i, false) == 'diamond') bool1 = true;
						if (get.suit(i, false) == 'heart') bool2 = true;
					}
					if (bool1) {
						game.log(player, '强化了技能', '#g【娉婷】');
						player.addTempSkill('hpp_shuangshu_pingting');
					}
					if (bool2) {
						game.log(player, '强化了技能', '#g【移筝】');
						player.addTempSkill('hpp_shuangshu_yizheng');
					}
					if (!bool1 && !bool2) player.gain(cards, 'gain2');
					else game.cardsDiscard(cards);
				},
				subSkill: {
					pingting: {
						charlotte: true,
						mark: true,
						marktext: '婷',
						intro: { content: '本回合发动【双姝】可多选择一项' },
					},
					yizheng: {
						charlotte: true,
						mark: true,
						marktext: '筝',
						intro: { content: '本回合发动【移筝】可多选择一项' },
					},
				},
			},
			hpppingting: {
				audio: 2,
				trigger: { player: 'phaseUseBegin' },
				direct: true,
				content() {
					'step 0'
					player.chooseButton([
						'###' + get.prompt('hpp_pingting') + '###' + '选择并于本阶段获得下列至多' + get.cnNumber(player.hasSkill('hpp_shuangshu_pingting') ? 3 : 2) + '项效果', [[
							['distance', '本阶段使用的第一张牌无距离限制'],
							['return', '本阶段使用第二张牌指定目标后获得此牌'],
							['draw', '本阶段使用的第三张牌结算完成后摸两张牌'],
							['reuse', '本阶段使用的第四张牌额外结算一次'],
						], 'textbutton']
					]).set('ai', function (button) {
						var player = _status.event.player;
						var num = player.countCards('hs', function (card) {
							return player.hasUseTarget(card) && player.getUseValue(card) > 0;
						});
						switch (button.link) {
							case 'distance': {
								if (game.hasPlayer(function (target) {
									return player.hasCard('hs', function (card) {
										return player.canUse(card, target, false) && player.canUse(card, target) && get.effect(target, card, player, player) > 0;
									});
								})) return 1;
								return 0.5;
								break;
							}
							case 'return': {
								if (num >= 2) return 2;
								return 0.6;
								break;
							}
							case 'draw': {
								if (num >= 3) return 4;
								return 0.7;
								break;
							}
							case 'reuse': {
								if (num >= 4) return 3;
								return 0.8;
								break;
							}
						}
					}).set('selectButton', [1, player.hasSkill('hpp_shuangshu_pingting') ? 3 : 2]);
					'step 1'
					if (result.bool) {
						player.logSkill('hpp_pingting');
						for (var i of result.links) player.addTempSkill('hpp_pingting_' + i, { player: 'phaseUseAfter' });
					}
				},
				subSkill: {
					distance: {
						charlotte: true,
						onremove: true,
						mark: true,
						marktext: '①',
						intro: { content: '本阶段使用的第一张牌无距离限制' },
						//为适配联机进行的代码退化[doge]
						mod: {
							targetInRange(card, player, target) {
								//if(game.online){
								if (!player.storage.hpp_pingting_distance) return true;
								//}
								/*
								else{
								var evt=_status.event.getParent('phaseUse');
								if(evt&&evt.name=='phaseUse'&&!player.getHistory('useCard',function(evt2){
								return evt2.getParent('phaseUse')==evt;
								}).length) return true;
								}
								*/
							},
						},
						trigger: { player: 'useCard1' },
						filter(event, player) {
							return !player.storage.hpp_pingting_distance/*&&player.isOnline()*/;
						},
						direct: true,
						firstDo: true,
						content() {
							player.storage.hpp_pingting_distance = true;
						},
					},
					return: {
						charlotte: true,
						mark: true,
						marktext: '②',
						intro: { content: '本阶段使用第二张牌指定目标后获得此牌' },
						audio: 'hpp_pingting',
						trigger: { player: 'useCardToPlayered' },
						filter(event, player) {
							if (!event.isFirstTarget) return false;
							var evt = event.getParent('phaseUse');
							return evt && evt.player == player && player.getHistory('useCard', function (evt2) {
								return evt2.getParent('phaseUse') == evt;
							}).indexOf(event.getParent()) == 1 && event.cards && event.cards.filterInD().length;
						},
						forced: true,
						content() {
							player.gain(trigger.cards.filterInD(), 'gain2');
						},
						ai: {
							result: {
								player(card, player, target) {
									var evt = _status.event.getParent('phaseUse');
									if (['equip', 'delay'].includes(get.type(card)) && evt && evt.player == player && player.getHistory('useCard', function (evt2) {
										return evt2.getParent('phaseUse') == evt;
									}).length == 1) return 0.3;
								},
							},
						},
					},
					draw: {
						charlotte: true,
						mark: true,
						marktext: '③',
						intro: { content: '本阶段使用的第三张牌结算完成后摸两张牌' },
						audio: 'hpp_pingting',
						trigger: { player: 'useCardAfter' },
						filter(event, player) {
							var evt = event.getParent('phaseUse');
							return evt && evt.player == player && player.getHistory('useCard', function (evt2) {
								return evt2.getParent('phaseUse') == evt;
							}).indexOf(event) == 2;
						},
						forced: true,
						content() {
							player.draw(2);
						},
					},
					reuse: {
						//group:'hpp_pingting_buff',
						charlotte: true,
						mark: true,
						marktext: '④',
						intro: { content: '本阶段使用的第四张牌额外结算一次' },
						audio: 'hpp_pingting',
						trigger: { player: 'useCard' },
						filter(event, player) {
							var evt = event.getParent('phaseUse');
							return evt && evt.player == player && player.getHistory('useCard', function (evt2) {
								return evt2.getParent('phaseUse') == evt;
							}).indexOf(event) == 3 && event.targets/*&&!event.reuse_buff*/;
						},
						forced: true,
						content() {
							//trigger.reuse_buff=player;
							trigger.effectCount++;
							game.log(trigger.card, '额外结算一次');
						},
						ai: {
							result: {
								player(card, player, target) {
									var evt = _status.event.getParent('phaseUse');
									if (card.name == 'tiesuo' && evt && evt.player == player && player.getHistory('useCard', function (evt2) {
										return evt2.getParent('phaseUse') == evt;
									}).length == 3) return 'zerotarget';
								},
							},
						},
					},
					/*
					buff:{
					charlotte:true,
					trigger:{global:'useCardToTargeted'},
					filter:function(event,player){
					return event.parent.reuse_buff==player&&event.targets.length==event.parent.triggeredTargets4.length;
					},
					direct:true,
					lastDo:true,
					content:function(){
					trigger.getParent().targets=trigger.getParent().targets.concat(trigger.targets);
					trigger.getParent().triggeredTargets4=trigger.getParent().triggeredTargets4.concat(trigger.targets);
					},
					},
					*/
				},
			},
			hppyizheng: {
				canMove(type) {
					return game.hasPlayer(function (target) {
						return target.countCards('e', function (card) {
							return game.hasPlayer(function (current) {
								return current != target && current.canEquip(card) && get.subtype(card) == type;
							});
						});
					});
				},
				audio: 2,
				trigger: { player: 'phaseUseEnd' },
				filter(event, player) {
					if (!player.canMoveCard(null, true)) return false;
					return [1, 2, 3, 4].some(num => lib.skill.hpp_yizheng.canMove('equip' + num));
				},
				direct: true,
				content() {
					'step 0'
					var choiceList = [];
					if (lib.skill.hpp_yizheng.canMove('equip1')) choiceList.push(['equip1', '移动一张武器牌']);
					if ([3, 4].some(num => lib.skill.hpp_yizheng.canMove('equip' + num))) choiceList.push(['equip6', '移动一张坐骑牌']);
					if (lib.skill.hpp_yizheng.canMove('equip2')) choiceList.push(['equip2', '移动一张防具牌']);
					player.chooseButton([
						'###' + get.prompt('hpp_yizheng') + '###' + '选择移动至多' + get.cnNumber(player.hasSkill('hpp_shuangshu_yizheng') ? 2 : 1) + '种副类别的装备牌', [choiceList, 'textbutton']
					]).set('ai', function (button) {
						var player = _status.event.player, choice = [];
						for (var i of ['equip2', 'equip6', 'equip1']) {
							if (game.hasPlayer(function (target) {
								return target.countCards('e', function (card) {
									return game.hasPlayer(function (current) {
										return current != target && current.canEquip(card) && get.subtype(card) == type && (get.attitude(player, target) * get.value(card, target) > 0 && get.attitude(player, current) * get.value(card, current) > 0);
									});
								});
							}) && !choice.includes(['equip3', 'equip4'].includes(i) ? 'equip6' : i)) choice.push(['equip3', 'equip4'].includes(i) ? 'equip6' : i);
						}
						if (choice.includes(button.link)) return 3 - choice.indexOf(button.link);
						return -1;
					}).set('selectButton', [1, player.hasSkill('hpp_shuangshu_yizheng') ? 2 : 1]);
					'step 1'
					if (result.bool) {
						result.links.sort(function (a, b) {
							return ['equip1', 'equip2', 'equip6'].indexOf(a) - ['equip1', 'equip2', 'equip6'].indexOf(b);
						});
						player.logSkill('hpp_yizheng');
						event.choiceList = result.links;
						event.count = 0;
						event.list = [];
					}
					else event.finish();
					'step 2'
					var subtype = event.choiceList.shift();
					event.list.push(subtype);
					if (subtype == 'equip6') {
						event.list.addArray(['equip3', 'equip4']);
						event.list.remove('equip6');
					}
					'step 3'
					player.chooseTarget(2, function (card, player, target) {
						if (ui.selected.targets.length) {
							var from = ui.selected.targets[0];
							return target != from && from.countCards('e', card => target.canEquip(card) && _status.event.list.includes(get.subtype(card)));
						}
						return _status.event.list.some(type => lib.skill.hpp_yizheng.canMove(type));
					}).set('ai', function (target) {
						var player = _status.event.player;
						if (!ui.selected.targets.length) {
							var getMoveValue = function (player, types) {
								var cards = player.getCards('e', function (card) {
									return game.hasPlayer(function (current) {
										return current != player && current.canEquip(card) && types.includes(get.subtype(card));
									});
								});
								cards.sort((a, b) => get.value(b, player) - get.value(a, player));
								return get.value(cards[0], player);
							};
							return (1 - get.sgn(get.attitude(player, target))) * getMoveValue(target, _status.event.list);
						}
						var from = ui.selected.targets[0];
						var cards = from.getCards('e', function (card) {
							return game.hasPlayer(function (current) {
								return current != from && current.canEquip(card) && types.includes(get.subtype(card));
							});
						});
						cards.sort((a, b) => get.value(b, from) - get.value(a, from));
						return get.sgn(get.attitude(player, target)) * get.value(cards[0], target);
					}).set('multitarget', true).set('targetprompt', ['被移走', '移动目标']).set('prompt', '请选择移动的目标').set('prompt2', '将一名角色装备区中的' + get.translation(event.list[0]) + '移动到另一名角色的装备区中').set('list', event.list);
					'step 4'
					if (result.bool) {
						player.line2(result.targets, 'green');
						event.targets = result.targets;
					}
					else event.goto(8);
					'step 5'
					game.delay();
					'step 6'
					var cards = targets[0].getCards('e', function (card) {
						return event.list.includes(get.subtype(card)) && targets[1].canEquip(card);
					});
					if (cards.length == 1) event._result = { bool: true, links: cards };
					else player.choosePlayerCard('e', true, targets[0]).set('filterButton', function (button) {
						return _status.event.cards.includes(button.link);
					}).set('ai', function (button) {
						var player = _status.event.player;
						var targets = _status.event.targets;
						var from = targets[0], to = targets[1];
						if (get.sgn(get.attitude(player, from)) * get.value(button.link, from) > 0) return 1 / 114514;
						return get.sgn(get.attitude(player, to)) * get.value(button.link, to);
					}).set('cards', cards).set('targets', result.targets);
					'step 7'
					if (result.bool) {
						var link = result.links[0];
						if (get.position(link) == 'e') {
							event.count++;
							targets[1].equip(link);
							targets[0].$give(link, targets[1], false);
						}
						game.delay();
					}
					'step 8'
					if (event.choiceList.length) {
						event.list = [];
						event.goto(2);
					}
					'step 9'
					switch (event.count) {
						case 1: player.recover(); break;
						case 2: player.addTempSkill('hpp_yizheng_draw', { player: 'phaseBegin' }); break;
					}
				},
				subSkill: {
					draw: {
						charlotte: true,
						mark: true,
						intro: { content: '失去一张牌后，摸一张牌' },
						audio: 'hpp_yizheng',
						trigger: {
							player: 'loseAfter',
							global: ['equipAfter', 'addJudgeAfter', 'gainAfter', 'loseAsyncAfter', 'addToExpansionAfter'],
						},
						filter(event, player) {
							var evt = event.getl(player);
							if (!evt || !evt.cards2 || !evt.cards2.length) return false;
							return true;
						},
						forced: true,
						content() {
							player.draw(trigger.getl(player).cards2.length);
						},
					},
				},
			},
			// 72变
			hpp72bian: {
				onChooseToUse(event) {
					if (event.type == 'phase' && !game.online && !event['hpp_72bian_type']) {
						var evtx = event.getParent('phaseUse');
						var list = ['basic', 'trick', 'equip'], player = event.player;
						player.getHistory('lose', function (evt) {
							var evt2 = evt.getParent();
							if (evt2.name == 'useSkill' && evt2.skill == 'hpp_72bian') list.remove(get.type2(evt.cards2[0]));
						});
						event.set('hpp_72bian_type', list);
					}
				},
				nobracket: true,
				audio: 1,
				enable: 'phaseUse',
				filter(event, player) {
					return player.countCards('he', function (card) {
						return event['hpp_72bian_type'].includes(get.type2(card));
					});
				},
				filterCard(card, player) {
					return _status.event['hpp_72bian_type'].includes(get.type2(card));
				},
				check(card) {
					var player = _status.event.player;
					if (player.hasSkill('hpp_72bian_' + get.type2(card))) return -1;
					return 5 - get.value(card);
				},
				position: 'he',
				prepare(cards, player) {
					player.$throw(cards, 1000);
					game.log(player, '将', cards, '置入了弃牌堆');
				},
				discard: false,
				loseTo: 'discardPile',
				visible: true,
				content() {
					var list = ['basic', 'trick', 'equip'];
					var type = list[(list.indexOf(get.type2(cards[0])) + 1) % 3];
					var card = get.cardPile2(function (card) {
						return get.type2(card) == type;
					});
					if (card) {
						player.gain(card, 'draw');
						game.log(player, '获得了一张', '#g' + get.translation(type) + '牌');
					}
					else {
						player.log('无牌可得了吗？');
						game.log('但是牌堆中已经没有', '#g' + get.translation(type) + '牌', '了！');
						player.addTempSkill('hpp_72bian_' + get.type2(cards[0]), 'washCard');
					}
				},
				ai: {
					order: 1,
					result: { player: 1 },
				},
				subSkill: { basic: { charlotte: true }, trick: { charlotte: true }, equip: { charlotte: true } },
			},
			// 诗仙
			hppshixian: {
				audio: 2,
				derivation: ['qiangjinjiu', 'jingyesi', 'xiakexing', 'xinglunan'],
				trigger: { player: 'phaseBegin' },
				forced: true,
				content() {
					'step 0'
					if (player.additionalSkills.hppshixian) player.removeAdditionalSkill('hppshixian');
					var cards = get.cards(4);
					for (var i = cards.length - 1; i--; i >= 0) {
						ui.cardPile.insertBefore(cards[i], ui.cardPile.firstChild);
					}
					game.updateRoundNumber();
					event.cards = cards;
					player.showCards(cards, get.translation(player) + '发动了【诗仙】');
					'step 1'
					var map = {
						'heart': 'qiangjinjiu',
						'diamond': 'jingyesi',
						'spade': 'xiakexing',
						'club': 'xinglunan'
					}, list = [];
					for (var i in map) {
						if (cards.some(card => get.suit(card, player) == i)) list.push(map[i]);
					}
					if (list.length) player.addAdditionalSkill('hppshixian', list);
					event.cards = cards.filter(function (card) {
						return cards.some(function (cardx) {
							if (cardx == card) return false;
							return get.suit(card, player) == get.suit(cardx, player);
						});
					});
					if (event.cards.length) player.chooseBool('诗仙：是否获得' + get.translation(event.cards) + '？');
					else event.finish();
					'step 2'
					if (result.bool) player.gain(cards, 'gain2');
				},
			},
			//将进酒
			hppqiangjinjiu: {
				audio: 1,
				nobracket: true,
				trigger: { global: 'phaseBegin' },
				filter(event, player) {
					if (event.player == player) return false;
					return player.countCards('h') && event.player.countCards('he');
				},
				direct: true,
				content() {
					'step 0'
					player.chooseToDiscard(get.prompt2('qiangjinjiu', trigger.player)).set('ai', function (card) {
						var player = _status.event.player;
						var target = _status.event.target;
						if (get.attitude(player, target) > 0) return 0;
						return 6 - get.value(card);
					}).set('target', trigger.player).logSkill = ['qiangjinjiu', trigger.player];
					'step 1'
					if (result.bool) {
						if (!trigger.player.countCards('e')) event._result = { bool: true, index: 1 };
						else player.chooseControl().set('choiceList', [
							'弃置' + get.translation(trigger.player) + '装备区里的所有装备牌',
							'获得' + get.translation(trigger.player) + '手牌中的所有【酒】（若其手牌中没有【酒】则改为获得其一张牌）',
						]).set('ai', () => 0);
					}
					else event.finish();
					'step 2'
					if (result.index == 0) {
						trigger.player.discard(trigger.player.getCards('e')).discarder = player;
						var card = get.cardPile2(card => card.name == 'jiu');
						if (card) trigger.player.gain(card, 'gain2');
					}
					else {
						if (trigger.player.countCards('h', { name: 'jiu' })) player.gain(trigger.player.getCards('h', { name: 'jiu' }), trigger.player, 'give');
						else player.gainPlayerCard(trigger.player, 'he', true);
					}
				},
			},
			//静夜思
			hppjingyesi: {
				audio: 1,
				nobracket: true,
				trigger: { player: ['phaseUseEnd', 'phaseDiscardEnd'] },
				direct: true,
				content() {
					'step 0'
					var card = get[trigger.name == 'phaseDiscard' ? 'bottomCards' : 'cards']()[0];
					if (trigger.name == 'phaseDiscard') {
						player.logSkill('jingyesi');
						player.gain(card, 'gain2');
						event.finish();
					}
					else {
						player.chooseControl('ok').set('dialog', ['牌堆顶', [card]]);
						player.chooseUseTarget(card, false).logSkill = 'jingyesi';
					}
				},
			},
			//侠客行
			hppxiakexing: {
				audio: 1,
				nobracket: true,
				trigger: { player: 'useCard', source: 'damageSource' },
				filter(event, player) {
					if (event.name == 'useCard') return get.translation(event.card.name).indexOf('剑') != -1 && player.hasUseTarget(get.autoViewAs({ name: 'wanjian' }, []));
					return event.card && event.card.name == 'sha' && player.getEquip(1) && event.player.isIn() && player.canCompare(event.player);
				},
				direct: true,
				content() {
					'step 0'
					if (trigger.name == 'useCard') {
						player.chooseUseTarget(true, { name: 'wanjian' }, []);
						event.finish();
					}
					else player.chooseBool('是否和' + get.translation(trigger.player) + '拼点？', '若你赢，其减1点体力上限；若你没赢，弃置你装备区里的武器牌').set('choice', player.hasCard(function (card) {
						return get.value(card) <= 5 || get.number(card) > 10;
					}) && (get.attitude(player, trigger.player) <= 0 || trigger.player.countCards('h') >= 4));
					'step 1'
					if (result.bool) {
						player.line(trigger.player);
						player.chooseToCompare(trigger.player);
					}
					else event.finish();
					'step 2'
					if (result.bool) trigger.player.loseMaxHp();
					else {
						var card = player.getEquip(1);
						if (card) player.discard(card);
					}
				},
			},
			//行路难
			hppxinglunan: {
				audio: 1,
				nobracket: true,
				trigger: { global: 'useCardAfter' },
				filter(event, player) {
					if (player == _status.currentPhase || event.card.name != 'sha' || event.player == player) return false;
					return event.targets && event.targets.contains(player);
				},
				forced: true,
				locked: false,
				content() {
					player.addTempSkill('xingluBuff', { player: 'phaseBegin' });
					player.addMark('xingluBuff', 1, false);
				},
			},
			xingluBuff: {
				nobracket: true,
				charlotte: true,
				onremove: true,
				intro: { content: '其他角色计算与你的距离+#' },
				mod: {
					globalTo(from, to, distance) {
						return distance + to.countMark('xingluBuff');
					},
				},
			},
			// 捣药
			hppdaoyao: {
				audio: 2,
				enable: 'phaseUse',
				filter(card, player) {
					return player.countDiscardableCards(player, 'h');
				},
				filterCard: lib.filter.cardDiscardable,
				check(card) {
					return 6 - get.value(card);
				},
				usable: 1,
				content() {
					var card = get.cardPile2(card => card.name == 'tao');
					if (card) player.gain(card, 'gain2');
					player.draw(2 + (card ? 0 : 1));
				},
				ai: {
					order: 9,
					result: { player: 1 },
				},
			},
			// 奔月
			hppbenyue: {
				unique: true,
				derivation: 'hpp_guanghan',
				audio: 2,
				trigger: {
					global: ['loseAsyncAfter'],
					player: ['recoverEnd', 'gainAfter'],
				},
				filter(event, player) {
					if (event.name == 'gain' || event.name == 'loseAsync') {
						if (!event.getg(player).some(card => card.name == 'tao')) return false;
						return player.countCards('h', { name: 'tao' }) >= 3;
					}
					else {
						var num = 0;
						game.getAllGlobalHistory('changeHp', evt => {
							if (evt.getParent().name == 'recover' && evt.player == player) num += evt.num;
						});
						return num >= 3;
					}
				},
				forced: true,
				juexingji: true,
				skillAnimation: true,
				animationColor: 'silver',
				content() {
					player.awakenSkill('hpp_benyue');
					if (player.maxHp < 15) player.gainMaxHp(15 - player.maxHp);
					player.addSkillLog('hpp_guanghan');
				},
			},
			// 广寒
			hppguanghan: {
				audio: 2,
				trigger: { global: 'damageEnd' },
				filter(event, player) {
					if (!event.player.isIn()) return false;
					return lib.skill.hpp_guanghan.logTarget(event, player).length;
				},
				logTarget(event, player) {
					var target = event.player;
					return game.filterPlayer(current => {
						if (current != target.getPrevious() && current != target.getNext()) return false;
						return current != player;
					});
				},
				forced: true,
				content() {
					'step 0'
					event.targets = lib.skill.hpp_guanghan.logTarget(trigger, player).sortBySeat();
					'step 1'
					var target = event.targets.shift();
					event.target = target;
					target.chooseToDiscard('h', '广寒：弃置一张手牌，或失去1点体力').set('ai', card => {
						var player = _status.event.player;
						if (card.name == 'tao' || card.name == 'jiu') return 0;
						if (player.hasSkill('zhaxiang') && player.hp > 1) return 0;
						return 6 - get.value(card);
					});
					'step 2'
					if (!result.bool) target.loseHp(trigger.num);
					if (event.targets.length) event.goto(1);
				},
				ai: { threaten: 5 },
			},
			// 补天
			hppbutian: {
				audio: 2,
				trigger: {
					source: 'damageSource',
					global: ['roundStart', 'phaseBefore'],
					player: ['damageEnd', 'changeHp', 'gainMaxHpEnd', 'loseMaxHpEnd', 'enterGame'],
				},
				filter(event, player, name) {
					var num = Math.floor(player.getDamagedHp() / 5);
					if (name == 'damageEnd') return num > 0;
					if (name == 'roundStart') return game.roundNumber > 1 && num > 0;
					if (name == 'damageSource') return event.player != player && player.isDamaged() && num > 0;
					if (name == 'phaseBefore' && game.phaseNumber > 0) return false;
					return player.isHealthy();
				},
				forced: true,
				content() {
					var num = Math.floor(player.getDamagedHp() / 5);
					var name = event.triggername;
					if (name == 'damageSource') player.recover(num);
					else if (name == 'damageEnd' || name == 'roundStart') player.loseHp(num);
					else if (name == 'damageEnd' || name == 'roundEnd') player.loseHp(num);
					else {
						player.$fullscreenpop('补天', 'fire');
						var targets = game.filterPlayer(current => current != player).sortBySeat();
						if (targets.length) {
							targets.forEach(target => {
								player.line(target);
								target.die();
							});
						}
					}
				},
			},
			hpplianshi: {
				mod: { maxHandcardBase: (player, num) => 5 },
				audio: 2,
				trigger: {
					player: ['useCard', 'respond', 'loseAfter'],
					global: ['loseAsyncAfter'],
				},
				filter(event, player) {
					if (event.name.indexOf('lose') == 0) return event.type == 'discard' && event.getl(player).cards2.filter(card => get.position(card, true) == 'd' && !player.getStorage('hpp_lianshi').includes(get.suit(card, player))).length > 0;
					return event.cards && event.cards.some(card => !player.getStorage('hpp_lianshi').includes(get.suit(card, player)) && lib.suit.includes(get.suit(card, player)));
				},
				forced: true,
				content() {
					'step 0'
					var cards;
					if (trigger.name.indexOf('lose') == 0) cards = trigger.getl(player).cards2.filter(card => get.position(card, true) == 'd');
					else cards = trigger.cards;
					event.cards = cards;
					var suits = cards.reduce((list, card) => list.add(get.suit(card, player)), []);
					suits = suits.filter(suit => !player.getStorage('hpp_lianshi').includes(suit));
					player.markAuto('hpp_lianshi', suits);
					player.storage.hpp_lianshi.sort((a, b) => lib.suit.indexOf(b) - lib.suit.indexOf(a));
					'step 1'
					if (player.getStorage('hpp_lianshi').length >= 4) {
						player.draw();
						if (player.isDamaged()) player.recover(get.number(cards[cards.length - 1], player));
						player.unmarkSkill('hpp_lianshi');
						delete player.storage.hpp_lianshi;
					}
				},
				intro: {
					markcount: (storage) => {
						return storage.length;
					},
					content: '已记录花色：$',
				},
			},
			hpptuantu: {
				audio: 2,
				enable: 'phaseUse',
				filter(event, player) {
					return player.countCards('h') && ui.discardPile.childElementCount > 0;
				},
				usable: 1,
				content() {
					var names = player.getCards('h').reduce((list, card) => list.add(get.name(card)), []);
					var cards = [];
					names.forEach(name => {
						var card = get.discardPile(card => !cards.includes(card) && card.name == name);
						if (card) cards.push(card);
					});
					if (cards.length) player.gain(cards, 'gain2');
					else player.chat('无牌可得？！');
				},
				ai: {
					order(item, player) {
						var names = player.getCards('h').reduce((list, card) => list.add(get.name(card)), []);
						var cards = [];
						names.forEach(name => {
							var card = get.discardPile(card => !cards.includes(card) && card.name == name);
							if (card) cards.push(card);
						});
						return cards.length;
					},
					result: { player: 1 },
				},
			},
		},
		dynamicTranslate: {
			// 屈降
			lao_quxiang(player) {
				if (player.storage.lao_quxiang_rewrite) return '当你受到伤害时，你可以将所有手牌交给伤害来源来源免疫此伤害，然后其给你一张手牌。';
				return '当你受到伤害时，你可以将所有手牌交给伤害来源免疫此伤害，然后若你给出的手牌大于1其给你2张手牌，否则其给你1张手牌。';
			},
			// 才高
			lao_caigao(player) {
				if (player.storage.lao_caigao_rewrite) return '锁定技，当其他角色于回合外获得牌时，你获得一张梅花牌。';
				return '锁定技，当其他角色于回合外获得牌时，你进行判定，你猜测此判定牌的颜色，猜中后你获得一张梅花牌。';
			},
		},
		characterTitle: {
			// g绿 b蓝 r红 p粉
			lao_caofang: '#b捞德一评级:3.0',
			lao_caohuan: '#b捞德一评级:3.0',
			// lao_caoyu: '#b捞德一评级:3.5',
			lao_cuishi: '#b捞德一评级:3.3',
			lao_liucong: '#g捞德一评级:2.1',
			lao_tuanxini: '#rUNICRON评级:4.0',
			lao_tuan: '#b捞德一评级:3.5',
			lao_xini: '#b捞德一评级:3.0',
			hok_ailin: '#b捞德一评级:3.6',
			hok_bailixuance: '#b捞德一评级:3.9',
			hok_daji: '#b捞德一评级:3.7',
			hok_lixin: '#b捞德一评级:3.8',
			hok_makeboluo: '#b捞德一评级:3.7',
			hok_mingshiyin: '#b捞德一评级:3.8',
			hok_miyue: '#b捞德一评级:3.8',
			hok_sunwukong: '#r捞德一评级:4.0',
			hok_wuzetian: '#b捞德一评级:3.8',
			hok_yao: '#b捞德一评级:3.8',
			hok_sp_lixin: '#r捞德一评级:4.0',
			hok_sp_mingshiyin: '#r耀世圣手评级:4.0',
			shen_caozhi: '#r捞德一评级:4.3',
			shen_dongzhuo: '#r捞德一评级:4.2',
			shen_lusu: '#r捞德一评级:4.4',
			shen_xusheng: '#r捞德一评级:4.0',
			hpp_re_zuoci: '#r捞德一评级:4.9',
		},
		translate: {
			// 曹芳
			lao_caofang: '曹芳',
			lao_shouwei: '受位',
			lao_shouwei_info: '当你受到伤害后，摸X张牌（X为当前回合角色体力值/2向下取整，至多为2），你于当前角色回合结束后，摸Y张牌（Y为该角色已损体力值，至多为3）。',
			lao_shengbai: '盛败',
			lao_shengbai_info: '主公技，限定技。当你进入濒死状态时，其他魏势力角色可依次对令你进入濒死的角色使用一张【杀】。',
			// 曹奂
			lao_caohuan: '曹奂',
			lao_zunqian: '遵前',
			lao_zunqian_info: '当你成为【杀】的目标时，你可以弃置两张牌（不足则全弃，无牌则不弃），然后摸两张牌；若此时全场手牌最多的角色仅有一名且不是你，该角色也可以如此做。',
			lao_yishan: '揖禅',
			lao_yishan_info: '当你受到伤害时，你可以弃置手牌中所有的【杀】，伤害来源摸X张牌，你摸X+1张牌（X为你弃置的【杀】的数量）。',
			lao_chongjia: '宠加',
			lao_chongjia_info: '主公技，觉醒技，准备阶段，若你的体力值为全场最少，则你加1点体力上限，将体力回复至3点，然后获得技能“恭节”和“坠廷”。',
			// 曹宇
			lao_caoyu: '曹宇',
			lao_renlun: '仁论',
			lao_renlun_info: '你受到伤害后，你摸2张牌并展示所有手牌。然后可以令一名其他角色获得点数之和等于13的任意张牌。',
			lao_gongci: '恭辞',
			lao_gongci_info: '弃牌阶段开始时，你可以选择一名其他角色，然后令你本回合手牌上限-1，你此阶段弃置的牌在进入弃牌堆前其获得其中不同花色的牌。',
			// 崔氏
			lao_cuishi: '崔氏',
			lao_pianwan: '翩婉',
			lao_pianwan_info: '锁定技，在你的回合外你可以弃置手牌中的一张梅花牌视为打出一张梅花闪。',
			lao_huashang: '华裳',
			lao_huashang_info: '觉醒技，结束阶段时，当你的手牌花色大于等于三种且装备防具时，崔氏获得技能[神赋]，失去技能[洛神]，体力上限改为3。你的手牌上限至少为3。',
			// 刘琮
			lao_liucong: '刘琮',
			lao_tunquan: '豚犬',
			lao_tunquan_info: '觉醒技，准备阶段开始时，当场上有曹操时，你修改屈降。',
			lao_quxiang: '屈降',
			lao_quxiang_info: '当你受到伤害时，你可以将所有手牌交给伤害来源免疫此伤害，然后若你给出的手牌大于1其给你2张手牌，否则其给你1张手牌。',
			lao_quxiang_rewrite: '屈降·改',
			lao_quxiang_rewrite_info: '当你受到伤害时，你可以将所有手牌交给伤害来源来源免疫此伤害，然后其给你1张手牌。',
			// 土安
			lao_tuanxini: '土安奚泥',
			lao_tuan: '土安',
			lao_tengbing: '藤兵',
			lao_tengbing_info: '锁定技。游戏开始时，你将游戏外的一张【藤甲】置入装备区。你手牌区内的防具牌均视为【南蛮入侵】，且你不是防具牌的合法目标。当你即将失去【藤甲】或即将废除防具栏时，取消之。你不能将装备区内的【藤甲】当做其他牌使用或打出。',
			lao_ranwang: '燃亡',
			lao_ranwang_info: '锁定技。当你受到火焰伤害时减少1点火焰伤害（至少受到1点），然后减1点体力上限。',
			// 奚泥
			lao_xini: '奚泥',
			lao_ranyong: '燃勇',
			lao_ranyong_info: '锁定技，当你受到火焰伤害时全场体力值最多的角色（优先自己）分摊1点火焰伤害（至少受到1点）。',

			// 王者公共技
			hok_yinshen: '隐身',
			hok_yinshen_info: '当你拥有此标记时，你不能成为杀和目标数为1的锦囊牌的目标。当你使用或打出杀或锦囊牌时，你失去此标记。',
			hok_silie: '撕裂',
			hok_silie_info: '锁定技，当你使用牌时，你弃置一张手牌，否则失去1点体力。',
			hok_temp_hp: '临时体力',
			hok_temp_hp_info: '锁定技，当你受到伤害时，你失去1枚“临时体力”，体力上限-1。当你以其他方式失去“临时体力”时，你失去等量的体力与体力上限。',
			// 艾琳
			hok_ailin: '王者艾琳',
			hok_lingwu: '灵舞',
			hok_lingwu_info: '锁定技。游戏开始时，你获得一个额外的武器栏，你从牌堆中获得一张武器牌装备之。',
			hok_yewu: '叶舞',
			hok_yewu_info: '出牌阶段限一次，你选择一名有手牌的其他角色，随机弃置其一张手牌，你的“月桂”标记小于18时，你获得2枚“月桂”标记。',
			hok_xuanwu: '旋舞',
			hok_xuanwu_info: '当你使用或打出【杀】后，摸一张牌（每回合限3次）且你的“月桂”标记小于18时，你获得1枚“月桂”标记。',
			hok_yueguishengfang: '月桂盛放',
			hok_yueguishengfang_info: '出牌阶段限一次，当你的“月桂”标记大于等于6时，你可以使用X张不计入次数的雷【杀】（X为“月桂”数/3向下取整，每使用一次失去3枚“月桂”）。',
			// 百里玄策
			hok_bailixuance: '王者百里玄策',
			hok_rexue: '热血',
			hok_rexue_info: '你击杀任意角色时，摸2张牌。',
			hok_yangou: '魇钩',
			hok_yangou_info: '出牌阶段限一次，你可以指定一名其他角色进行判定，若点数大于4：其获得场上唯一的“魇钩”标记，直到回合结束，你解锁“魇钩·锁”。（“魇钩”标记：不能使用和打出【闪】）',
			hok_yangou_lock: '魇钩·锁',
			hok_yangou_lock_info: '出牌阶段限一次，你可以将“魇钩”成功的目标座位移至你座位后，弃置其防具马。',
			hok_lianshan: '镰闪',
			hok_lianshan_info: '出牌阶段限一次，你可以选择：1.“魇钩”标记的角色，你可以将你座位移至其座位后直到回合结束，对其造成一点伤害；2.你距离为1的无“魇钩”标记的角色，令其获得场上唯一的“魇钩”标记，直到回合结束，你解锁“魇钩·锁”。（“魇钩”标记：不能使用和打出手牌）',
			// 妲己
			hok_daji: '王者妲己',
			hok_meixin: '魅心',
			hok_meixin_info: '出牌阶段限一次，你可以将一张红色手牌当做【乐不思蜀】使用，当你使用魅心且你的魅心标记小于4，你获得1枚“魅心”标记。',
			hok_huhuo: '狐火',
			hok_huhuo_info: '出牌阶段限一次，当你的“魅心”标记不小于3时，你可以弃置3枚“魅心”标记对攻击范围内的目标随机造成总计至多3点火焰伤害(如果目标大于6改为5点火焰伤害)，你可以减少其中1~3个目标。',
			// 李信
			hok_lixin: '王者李信',
			hok_guangan: '光暗',
			hok_guangan_info: '你的回合开始时，你的“信”标记小于3时，获得1枚“信”标记。出牌阶段限一次，若你处于“统御”或“狂暴”状态，你可以弃置2张牌然后切换至另一个状态。',
			hok_huiren: '灰刃',
			hok_huiren_info: '锁定技，你造成伤害后，你获得1枚“信”标记。',
			hok_qiangzhan: '强斩',
			hok_qiangzhan_info: '出牌阶段限一次，你弃置一张牌手牌视为使用一张无视距离且不计入次数的杀。',
			hok_tongkuang: '统狂',
			hok_tongkuang_info: '限定技，当你的“信”大于等于3时，你可以失去“灰刃”和“强斩”，选择“统御”或“狂暴”。（统御：烈华、光斩；狂暴：暴冲、残撕）',
			hok_tongyu_faq: '统御',
			hok_tongyu_faq_info: '<br><li>烈华：出牌阶段开始前，你可以跳过出牌阶段，下回合出牌阶段开始时视为使用2张雷杀。<br><li>光斩：你的攻击范围+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并跳过出牌阶段，下回合开始时弃置你判定区的牌并选择攻击范围内至多2名其他角色，对每名目标角色造成2点雷电伤害。',
			hok_kuangbao_faq: '狂暴',
			hok_kuangbao_faq_info: '<br><li>暴冲：出牌阶段开始前，你可以跳过出牌阶段和弃牌阶段，下回合开始时弃置你判定区的牌并回复1点体力。<br><li>残撕：摸牌阶段，你的摸牌数+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并选择攻击范围的其他角色，弃置其2张牌，令你本回合杀的次数+1。',
			hok_liehua: '烈华',
			hok_liehua_info: '出牌阶段开始前，你可以跳过出牌阶段，下回合出牌阶段开始时视为使用2张雷杀。',
			hok_guangzhan: '光斩',
			hok_guangzhan_info: '你的攻击范围+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并跳过出牌阶段，下回合开始时弃置你判定区的牌并选择攻击范围内至多2名其他角色，对每名目标角色造成2点雷电伤害。',
			hok_baochong: '暴冲',
			hok_baochong_info: '出牌阶段开始前，你可以跳过出牌阶段和弃牌阶段，下回合开始时弃置你判定区的牌并回复1点体力。',
			hok_cansi: '残撕',
			hok_cansi_info: '摸牌阶段，你的摸牌数+1。出牌阶段开始前，若你的“信”标记大于等于3，你可以弃置3枚“信”标记并选择攻击范围的其他角色，弃置其2张牌，令你本回合杀的次数+1。',
			// 马克波罗
			hok_makeboluo: '王者马克波罗',
			hok_zuolun: '左轮',
			hok_zuolun_info: '锁定技，当你对其他角色造成伤害且该角色“破防”标记不超过2时，该角色获得1枚“破防”标记，破防标记为2时受到你的伤害视为体力流失。',
			hok_qianglin: '枪林',
			hok_qianglin_info: '出牌阶段开始时，你获得一张【杀】。出牌阶段限1次，当你使用【杀】时，你可以再弃置1张【杀】，视为对目标使用2张无颜色的雷杀（不可以触发酒），若以此法每次令任意角色受到伤害或流失体力，你模1张牌。',
			hok_danyu: '弹雨',
			hok_danyu_info: '出牌阶段限1次，你可以弃置全部手牌（至少4张），选择1至3名目标，对其造成1~2次1点雷电伤害。',
			// 明世隐
			hok_mingshiyin: '王者明世隐',
			hok_lingua: '临卦',
			hok_lingua2: '临卦',
			hok_lingua_info: '出牌阶段限一次，你可以选择一名其他角色。阳：你的回合结束时，目标角色摸1张牌或目标角色弃置1张牌；阴：目标角色造成伤害后摸1张牌或目标角色造成伤害后随机弃置1张手牌。',
			hok_shigua: '师卦',
			hok_shigua_info: '转换技：出牌阶段，你可以切换“临卦”的状态。',
			hok_taigua: '泰卦',
			hok_taigua_info: '限定技，你可以失去2点体力（若你的体力值小于等于2，则你失去体力至1点），令临卦目标角色回复2点体力或受到2点伤害，你的下个回合开始时，你回复1点体力。',
			// 芈月
			hok_miyue: '王者芈月',
			hok_shengxue: '生血',
			hok_shengxue_info: '你造成伤害后，你的“蝠”标记小于4时获得1枚“蝠”标记并回复等量的体力值。',
			hok_anlian: '暗链',
			hok_anlian2: '暗链',
			hok_anlian_info: '出牌阶段限一次，你可以选择一名其他角色，你的回合结束时，你获得目标角色1张牌且你的“蝠”标记小于4时获得1枚“蝠”标记。',
			hok_anyue: '暗月',
			hok_anyue_info: '出牌阶段，你的“蝠”标记等于4时，你可以弃置4枚“蝠”标记令你不能成为牌的目标直到你的下个回合开始时。',
			// 孙悟空
			hok_sunwukong: '王者孙悟空',
			hok_qitian: '齐天',
			// hok_qitian_fire: '齐天·火',
			// hok_qitian_thunder: '齐天·雷',
			hok_qitian_info: '锁定技，你的属性杀无距离限制，红色锦囊牌可以当做【火杀】，黑色锦囊牌可以当做【雷杀】，你的【火杀】可以当做【闪】。（无色锦囊牌可以当做【刺杀】）',
			hok_shengbang: '圣棒',
			hok_shengbang_info: '锁定技，当你的杀造成伤害时，你可以弃置一张牌进行判定，若为红色，伤害×2（最大为3）；若为黑色，你摸一张牌。',
			hok_houmao: '猴毛',
			hok_houmao_info: '限定技，准备阶段开始时，你可以将体力回复至等同于你上回合结束时的体力值，弃置你判定区的牌，随机获得一张雷杀/火杀。',
			hok_naogong: '闹宫',
			hok_naogong_info: '限定技，出牌阶段你可以令你的杀的次数为3，出牌阶段结束时弃置所有手牌。',
			// 武则天
			hok_wuzetian: '王者武则天',
			hok_dihui: '帝辉',
			hok_dihui_info: '出牌阶段限1次，你选择1张手牌视为使用【杀】，你获得1个标记“曌”。当你的“曌”为2时，移去两个“曌”标记，强化你的帝辉并可以使用1次直到回合结束。',
			hok_dihui_sha_info: '你选择1张手牌视为使用【杀】，你获得1个标记“曌”。',
			hok_dihui_strengthen: '帝辉·强化',
			hok_dihui_strengthen_info: '出牌阶段限1次，你选择1名角色，视为对其使用无视距离不计入次数的【杀】，此【杀】命中的目标随机弃置1张牌。',
			hok_diwei: '帝威',
			hok_diwei_info: '出牌阶段限1次，你获得1个标记“曌”，你选择弃置1张手牌然后选择一项：选择1名与你座位相邻的角色，令其与同方向下一个角色交换位置；直到你的下个回合，你获得技能“飞影”。',
			hok_shaduo: '杀夺',
			hok_shaduo_info: '限定技，出牌阶段，若游戏轮数大于等于4你获得1个标记“曌”，视为你对所有其他角色使用无视距离不计入次数的【杀】，此【杀】命中的目标随机弃置2张牌。',
			hok_nvdi: '女帝',
			hok_nvdi_info: '主公技，结束阶段，若你未于出牌阶段内使用或打出过【杀】和锦囊牌，你可以摸X张牌（X为场上存活的群势力角色数）。',
			// 瑶
			hok_yao: '王者瑶',
			hok_shangui: '山鬼',
			hok_shangui_info: '出牌阶段限一次，你可以选择一名其他角色，令其失去“隐身”标记并弃置1张手牌。',
			hok_bailu: '白鹿',
			hok_bailu_info: '1.每轮限一次，出牌阶段，若没有角色拥有“白鹿”标记，你可以选择一名其他角色获得“白鹿”标记（获得“白鹿”标记的角色体力上限临时+2并临时回复2点体力，直到该角色累计受到2点伤害，该角色失去此标记，你不可使用此技能直到你的回合结束时）；若有角色拥有“白鹿”标记，你可以摸一张牌令该角色失去“白鹿”标记。2.若有角色拥有“白鹿”标记，你不能成为除【桃】以外牌的目标，你不能使用杀和锦囊牌。',

			// SP李信
			hok_sp_lixin: '王者SP李信',
			hok_wangming: '王命',
			hok_wangming_info: '锁定技，游戏开始时，你获得4枚「王」标记，你视为拥有当前主公的主公技；锁定技，当你造成/受到伤害且你的「王」标记小于7，你获得一枚「王」标记。',
			hok_dengshen: '登神',
			hok_dengshen_info: '觉醒技，准备阶段，若你武将牌上的「王」数不小于5，则你获得技能[统狂]、[罪论]。',
			hok_sptongkuang: '统狂',
			hok_sptongkuang_info: '判定阶段，你选择[人杰]、[统御]、[狂暴]路线中的一个，失去其他路线的技能；弃牌阶段开始时，你可以弃置5枚「王」标记，获得该路线的一个技能。（人杰：[破竹][清议][罪论]；统御：[慧识][灵策][定汉]；狂暴：[神裁][劫营][魄袭]。）',
			hok_sptongkuang_renjie: '人杰',
			hok_sptongkuang_tongyu: '统御',
			hok_sptongkuang_kuangbao: '狂暴',
			// SP明世隐
			hok_sp_mingshiyin: '王者SP明世隐',
			hok_sptaigua: '泰卦',
			hok_sptaigua_info: '出牌阶段限两次，你对自己造成1点伤害，然后令一名角色回复1点体力。',
			hok_minggua: '命卦',
			hok_minggua_info: '①当你死亡时，你可以将你卦象中的一种效果移除然后选择一名体力上限大于等于你的其他角色获得〖命卦〗。\
				②锁定技，当你造成/受到伤害时，进行一次占卜，根据卦象获得以下效果：<br/>\
				1.大吉/大凶：受到伤害的角色死亡；<br/>\
				2.中吉/中凶：伤害加一，且受到伤害的角色随机弃置一张牌；<br/>\
				3.小吉/小凶：受到伤害的角色随机弃置一张牌；<br/>\
				4.小凶/小吉：受到伤害的角色摸一张牌；<br/>\
				5.中凶/中吉：受到伤害的角色将此伤害改为回复体力并摸一张牌；<br/>\
				6.大凶/大吉：受到伤害的角色回复体力至体力上限并摸四张牌。<br/>\
				(大、中、小概率分别为：2% 16% 32%)',
			hok_biangua: '变卦',
			hok_biangua3: '变卦',
			hok_biangua_info: '当你发动命卦后，获得1个“卦”标记。出牌阶段限一次，当前回合角色可以弃置你的8个“卦”标记将你卦象中的一种效果移除。',

			// 神曹植
			shen_caozhi: '神曹植',
			lao_caigao: '才高',
			lao_caigao_info: '锁定技，当其他角色于回合外获得牌时，你进行判定，你猜测此判定牌的颜色，猜中后你获得一张梅花牌。',
			lao_caigao_rewrite: '才高·觉醒',
			lao_caigao_rewrite_info: '锁定技，当其他角色于回合外获得牌时，你获得一张梅花牌。',
			lao_badou: '八斗',
			lao_badou2: '八斗',
			lao_badou3: '八斗',
			lao_badou_info: '你手牌中的梅花牌可以视为酒，每名角色的回合限一次。当你使用酒时，你获得一张普通锦囊牌。你的诸葛连弩视为无色酒；当你使用无色酒无次数限制，且你额外获得一张普通锦囊牌。',
			lao_qibu: '七步',
			lao_qibu_info: '当你使用普通锦囊牌且你的“七步”标记不超过7时，获得标记“七步”。',
			lao_chengshi: '成诗',
			lao_chengshi_info: '觉醒技，一名角色出牌阶段结束时，当你的“七步”标记为7时，你的“才高”觉醒、回复1点体力并且获得“豆”标记（豆：手牌上限+1），你可以选择一名其他角色获得相同的效果。',
			// 神董卓
			shen_dongzhuo: '神董卓',
			lao_cannue: '残虐',
			lao_cannue_info: '锁定技，你的[五谷丰登]视为[南蛮入侵]，你的[桃园结义]视为[万箭齐发]。当你你的“残虐”标记小于9，你造成1点伤害后，获得1枚“残虐”标记。你对其他角色、其他角色对你使用【杀】时,都需连续多使用一张【闪】才能抵消。',
			lao_xiehan: '挟汉',
			lao_xiehan_info: '锁定技，当其他角色于回合外每次摸牌的数量大于1，你令其此次摸牌数-1。当一名角色死亡后，你的“残虐”标记不小于1，你失去1枚“残虐”，你增加一点体力上限并摸2张牌。一名角色出牌阶段开始时，该角色选择一项：1.摸一张牌，视为使用了一张【酒】，你对其（包括自己）造成一点伤害；2.弃置一张牌。',
			lao_huidu: '毁都',
			lao_huidu_info: '觉醒技，你的回合结束时，当你的“残虐”标记不小于6时，你失去6枚“残虐”，将视为使用牌堆中全部锦囊牌，每一张牌的使用者与目标随机选择，最后你减少4点体力上限。',
			// 神鲁肃
			shen_lusu: '神鲁肃',
			diying: '帝迎',
			diying_info: '出牌阶段限一次，你选择一名角色，令其获得〖弘德〗〖弼政〗〖博图〗〖诫训〗〖缔盟〗〖决堰〗中的一个，直到其回合结束。',
			lao_fusheng: '赴圣',
			lao_fusheng_info: '锁定技，红桃杀对你无效。',
			lao_chiyan: '赤炎',
			lao_chiyan_info: '弃牌阶段结束时，若你于此阶段内弃置过两张或更多的牌，则你可以视为对一名角色造成一点火属性伤害。',
			lao_lianmeng: '联盟',
			lao_lianmeng_info: '出牌阶段限一次，你可以选择两张手牌交给一名其他角色，你摸三张牌。',
			// 神徐盛
			shen_xusheng: '神徐盛',
			kuijun: '溃军',
			kuijun_info: '当你使用【杀】可以多选择一名装备区有防具牌的角色为目标，指定目标后令其非锁定技失效并展示其所有手牌，若其手牌数大于你的体力值，则不可以响应此【杀】，此【杀】伤害+X（X为其与此【杀】花色相同的手牌数，至多为其体力上限）。',

			// 欢杀界
			hpp_re_luxun: '欢杀界陆逊',
			hpp_lianying: '连营',
			hpp_lianying_info: '当你失去最后的手牌时，你可以摸至手牌上限。',
			hpp_re_lvbu: '欢杀界吕布',
			hpp_reshenwei: '神威',
			hpp_reshenwei_info: '锁定技，摸牌阶段，你额外摸2张牌，你的手牌上限+2',
			hpp_re_zuoci: '欢杀界左慈',
			hpp_re_xinsheng: '新生',
			hpp_re_xinsheng_use: '新生',
			hpp_re_xinsheng_info: '你可以于以下时机发动“新生”：回合开始时；出牌阶段限一次；结束阶段开始时；当你受到伤害后。从你的已开通武将中随机出现三张拥有此时机可发动技能的武将牌，你选择其中一个武将并发动其技能。',

			correction_history: '正史',
			honor_of_kings_clashlane: '王者荣耀·对抗',
			honor_of_kings_jungling: '王者荣耀·打野',
			honor_of_kings_midlane: '王者荣耀·中路',
			honor_of_kings_roaming: '王者荣耀·辅助',
			honor_of_kings_farmlane: '王者荣耀·发育',
			happy_kings: '娱乐神将',
			hpp_hpp: '欢乐三国杀·捞',
		},
	};
	for (var i in happy.character) {
		if (happy.translate[i]) {
			if (happy.translate[i].indexOf('神') == 0) happy.translate[i + '_prefix'] = '神';
			else if (happy.translate[i].indexOf('王者SP') == 0) happy.translate[i + '_prefix'] = '王者SP';
			else if (happy.translate[i].indexOf('王者') == 0) happy.translate[i + '_prefix'] = '王者';
			else if (happy.translate[i].indexOf('欢杀') == 0) happy.translate[i + '_prefix'] = '欢杀';
		}
	}
	lib.namePrefix.set('王者', {
		color: '#fdd559',
		nature: 'shenmm',
		showName: '农',
	});
	lib.namePrefix.set('王者SP', {
		color: '#fdd559',
		nature: 'soilmm',
		getSpan: (prefix, name) => `${get.prefixSpan('王者')}${get.prefixSpan('SP')}`,
	});
	return happy;
});
