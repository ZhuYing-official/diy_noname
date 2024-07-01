import { game } from '../noname.js';
//-------------------------------------------------------
//-------------------------------------------------------------
game.import('character', function (lib, game, ui, get, ai, _status) {
	var happy = {
		name: 'happy',
		connect: true,
		characterSort: {
			happy: {
				correction_history: ['lao_caofang', 'lao_caohuan', 'lao_caoyu', 'lao_cuishi', 'lao_liucong', 'lao_tuanxini', 'lao_tuan', 'lao_xini', 'lao_yanxing', 'lao_sp_wanglang'],
				honor_of_kings_clashlane: ['hok_hainuo', 'hok_lixin', 'hok_miyue', 'hok_sikongzhen', 'hok_sp_lixin'],
				honor_of_kings_jungling: ['hok_bailixuance', 'hok_dasiming', 'hok_lanlingwang', 'hok_sunwukong'],
				honor_of_kings_midlane: ['hok_anqila', 'hok_daji', 'hok_gaojianli', 'hok_wuzetian'],
				honor_of_kings_roaming: ['hok_donghuangtaiyi', 'hok_duoliya', 'hok_mingshiyin', 'hok_yao', 'hok_sp_mingshiyin'],
				honor_of_kings_farmlane: ['hok_ailin', 'hok_aoyin', 'hok_bailishouyue', 'hok_makeboluo'],
				happy_kings: ['shen_caozhi', 'shen_dongzhuo', 'shen_lusu', 'shen_xusheng'],
				hpp_hpp: ['hpp_re_zuoci'],
			},
		},
		character: {
			// 曹芳
			// lao_caofang: ['male', 'wei', 4, ['lao_shouwei', 'lao_shengbai'], ['zhu']],
			// 曹奂
			lao_caohuan: ['male', 'wei', 3, ['lao_zunqian', 'lao_yishan', 'lao_chongjia'], ['zhu']],
			// 曹宇
			// lao_caoyu: ['male', 'wei', 4, ['lao_renlun', 'lao_gongci']],
			// 崔氏
			lao_cuishi: ['female', 'wei', 3, ['reluoshen', 'lao_pianwan', 'lao_huashang']],
			// 刘琮
			lao_liucong: ['male', 'qun', 3, ['decadezongshi', 'lao_tunquan', 'rexianzhou', 'lao_quxiang']],
			// 土安奚泥
			// lao_tuanxini: ['male', 'qun', '8/15', ['lao_tengbing', 'lao_ranwang', 'lao_ranyong']],
			lao_tuanxini: ['male', 'qun', 8, ['lao_tengbing', 'lao_ranwang', 'lao_ranyong']],
			// 土安
			// lao_tuan: ['male', 'qun', '4/8', ['lao_tengbing', 'lao_ranwang']],
			// 奚泥
			// lao_xini: ['male', 'qun', '4/7', ['lao_tengbing', 'lao_ranyong']],
			// 阎行
			lao_yanxing: ['male', 'qun', 4, ['lao_mengjue', 'lao_sudi', 'lao_duanmao']],
			// SP王朗
			lao_sp_wanglang: ['male', 'qun', 3, ['lao_yayu', 'lao_shanshi']],
			// 肉鸽
			lao_roguelike: ['male', 'qun', '4/5', ['lao_roguelike_skill']],

			// 安琪拉
			hok_anqila: ['female', 'shu', 3, ['hok_huoqiu', 'hok_hunhuo', 'hok_chihui']],
			// 艾琳
			hok_ailin: ['female', 'qun', 3, ['hok_lingwu', 'hok_yewu', 'hok_xuanwu', 'hok_yueguishengfang']],
			// 敖隐
			hok_aoyin: ['male', 'wu', 3, ['hok_zhanghuo', 'hok_siyu', 'hok_jiafeng', 'hok_qiongxuan']],
			// 百里守约
			hok_bailishouyue: ['male', 'qun', 3, ['hok_miaozhun', 'hok_miyan', 'hok_kuangju']],
			// 百里玄策
			hok_bailixuance: ['male', 'shu', 4, ['hok_rexue', 'hok_yangou', 'hok_lianshan']],
			// 妲己
			hok_daji: ['female', 'qun', 3, ['hok_meixin', 'hok_huhuo']],
			// 大司命
			hok_dasiming: ['male', 'wei', 4, ['hok_mingge', 'hok_hungui']],
			// 东皇太一
			hok_donghuangtaiyi: ['male', 'wei', 5, ['hok_rishi', 'hok_duoqi']],
			// 朵莉亚
			hok_duoliya: ['female', 'wei', 4, ['hok_renyu', 'hok_huange', 'hok_tianlai']],
			// 高渐离
			hok_gaojianli: ['male', 'jin', 3, ['hok_aige', 'hok_kuangge', 'hok_lige', 'hok_moyin',]],
			// 海诺
			hok_hainuo: ['male', 'wei', 3, ['hok_mingren', 'hok_zhuimang', 'hok_xuanji', 'hok_xingyou', 'hok_minghui']],
			// 兰陵王
			hok_lanlingwang: ['male', 'jin', 4, ['hok_yinni', 'hok_yingshi', 'hok_anxi']],
			// 李信
			hok_lixin: ['male', 'qun', 4, ['hok_guangan', 'hok_huiren', 'hok_qiangzhan', 'hok_tongkuang']],
			// 马可波罗
			hok_makeboluo: ['male', 'qun', 3, ['hok_zuolun', 'hok_qianglin', 'hok_danyu']],
			// 明世隐
			hok_mingshiyin: ['male', 'shu', 4, ['hok_lingua', 'hok_shigua', 'hok_taigua']],
			// 芈月
			hok_miyue: ['female', 'jin', 4, ['hok_shengxue', 'hok_anlian', 'hok_anyue']],
			// 司空震
			hok_sikongzhen: ['male', 'qun', 4, ['hok_tianlei', 'hok_benlei', 'hok_leitingwanjun'], ['zhu']],
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
			// shen_lusu: ['male', 'shen', 3, ['diying', 'lao_fusheng', 'lao_chiyan', 'lao_lianmeng'], ['wu']],
			// 神徐盛
			shen_xusheng: ['male', 'shen', 4, ['kuijun'], ['wu']],

			// 欢杀左慈
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
			lao_xini: '奚泥，小说《三国演义》中的人物。乌戈国国主兀突骨部下的藤甲领兵俘长。曾大败蜀军，后为蜀相诸葛亮施计引入盘蛇谷中，尽烧其众，无所生还。',
			lao_yanxing: '阎行（生卒年不详），字彦明，后改名为阎艳，金城人（今甘肃省兰州市附近），东汉末年人物。初为韩遂部将，建安初，阎行与马超互相攻击，一次，阎行用矛刺马超，矛折断了，接着阎行用断矛击打马超脖子，几乎杀死马超。后与韩遂反目，举兵相攻，不能胜，于是投靠曹操，被封为列侯。',
			lao_sp_wanglang: '王朗（？－228年），本名王严，字景兴。东海郡郯县（今山东省临沂市郯城县）人。汉末至三国曹魏时期重臣、经学家。王朗早年师从太尉杨赐，因通晓经籍而被拜为郎中。后因杨赐去世而弃官服丧，不应孝廉之命。徐州刺史陶谦举其为茂才，拜徐州治中从事。后升任会稽太守，任内获百姓爱戴。建安元年（196年），孙策南攻会稽，王朗率军抵御，终为其所败，并在逃亡途中被孙策擒获，受到礼遇。之后应丞相曹操辟命，被拜为谏议大夫、参司空军事。魏王国建立后，王朗以军祭酒兼领魏郡太守，又任少府、奉常、大理等职。曹丕继王位时，迁御史大夫，封安陵亭侯。曹魏建立后，王朗改任司空，进封乐平乡侯。曹叡继位后，进封王朗为兰陵侯。太和二年（228年），王朗去世。其子王肃袭爵兰陵侯。王朗博学多闻，校注儒家经典，很有名气。王朗有文集三十卷，著有《周易传》《春秋传》《孝经传》等。在魏国朝廷以其所作的《周易传》作为学习《易》学的人必须考核的内容。后世把王朗注解里的思想称为“王学”。',

			hok_ailin: '艾琳是黄金森林的在逃精灵公主，日落圣殿的不速之客。公主艾琳天性机灵活泼，对一切未知充满好奇心与探索欲。然而“继承人”的责任始终压在她的肩膀上，她被要求收起不稳重的一面，遵循精灵族舞蹈的优雅与绝对的秩序，做好一个“真正的公主”。成年仪式前夕，艾琳决定打破族群禁令，逃去森林外的“危险古怪的人类世界”开启一场自由的冒险。旅程却并没有想象中那样顺遂，人类对精灵同样存在“不详邪恶”的重重误解。越是未知，越是有趣，越是困难，越有斗志。她以舞蹈为表达自我的“语言”，与红头发的法师小女孩成为密友，给圣殿严肃守序的骑士团带来了诸多意外麻烦，甚至组成了圣殿小分队在西方大陆的各个地方冒险……',
			hok_anqila: '这具身体，想必一直憧憬仰慕着这位圣骑士。这种仰慕如此强烈，让梅林无法抵御。梅林抓狂了！她才不要刚离开囚笼，就单恋上弱爆了的人类。她果断决定一回到村镇，立刻暗杀这位救命恩人。幸亏，他们所遇到的第一个行人，朝圣骑士打招呼，并叫他“亚瑟”！一瞬间，所有不堪回忆的黑历史都涌到了梅林……哦不，现在名为安琪拉的小女孩脑中：是的，她被称为世界上最伟大和正义的巫师，但这是假象。她是个失败者。天才的她计划要谋夺世界，无耻的家伙践踏了她的自尊心，诅咒了她，让她被迫听命于亚瑟王。什么复兴日落圣殿！她本想毁灭它！亚瑟王死后，她以为自己终于解脱，却又失手被困。如今，命运的诅咒再度生效。小女孩的单相思让眼前这个同样叫亚瑟的圣骑士成为她新的主人。真是倒霉透顶！愤怒焚烧了安琪拉的理智。她召唤出巨大火球。圣骑士反应神速的拔出长剑：“你是谁！”他警惕的问。“请接受我——法师安琪拉的效忠。这是命运安排我们重逢。”小女孩展现出与年龄不符的微笑，“我的陛下……”“知识，就是力量！”',
			hok_aoyin: '“千年，疾光迅影，我们在世人的传说中载沉载浮。”在这世界已难辨析真伪的传说中，古老的龙族诞自天地，是流动的自然之力孕育出的全新生命。直到众神掀开神话的篇章，生命繁衍壮大成族群。龙步入世间，感受这个孕育他的世界正在发生的一切变化——他们与万物同行，倾听天地声息……直到这非凡不朽的一族，不知自哪一段往事中倏然隐去，只在尘世中留下散佚的传说之篇。但在另一个故事里，他们并未离去。古老的巨龙怀恋着这个孕育他们的世界，于是将生命中最深刻丰沛的情感凝结成一枚生命的结晶——期待着有一天，他们的后代与这世界，再次同行。鳞甲冰凉，心中滚烫。剑光辉映一条曲折绵长的路，一个答案震彻远方。“让龙族之名，重昭天地。”',
			hok_bailishouyue: '非人的马贼队伍突袭了人群，集市瞬时陷入火海。如雨的飞箭下，他和同伴们死命撑着城门的支柱。他们关上大门，将贼人的队伍一分为二，守卫军追捕着城内的贼子，乡民们的任务就是守住这扇大门。守住城门，就守住了弟弟。可当四周安静下来，残垣断壁的家中却找不到弟弟的身影。玄策那时候该多么恐惧呀，但自己没有遵守住约定。不久，长城守卫军中多出一个安静的身影，他的射击技术精妙无比。他总朝更远的地方搜寻，越来越远。为了提醒自己，他改名守约。守约，言出必果。',
			hok_bailixuance: '玄策不会忘记那个日子：来历不明的马贼冲破边关的城镇，然而齐心协力的守卫军和民众守住城门。率先进入城镇的马贼走投无路，挟持了无力反抗的老弱们作为逃离的砝码。那时候自己多么害怕啊。可哭喊声刺痛小小男子汉的心灵，他推倒藏身的水缸，冲了出去。之后的记忆已不太清晰……那些不是普通的马贼……他们最后都死于首领之手……哥哥没有赶到，谁也没有赶到。他被首领选中，作为祭品去唤醒某种强大的东西。所有人四散逃窜，在绝望和恐惧中，少年眼睁睁看着无名剑士代替自己卷入邪恶迷雾。直到周围一切归于寂静，圆月安静照耀着亘古不变的戈壁，那个男人带走了他。',
			hok_daji: '关于妲己，历史上的记载非常稀少，只有《史记》和《国语》里有寥寥数语。我们只知道她是商朝最后一个王商纣王的妃子，出自有苏氏。更多的信息，实际上来自明代的小说《封神演义》。在小说里，在纣王身边妲己实际上是狐狸精。她蛊惑纣王干下了种种祸害百姓、残害忠良的倒行逆施，最终断送了商朝的天下。小说中的妲己，就是“女色祸国论”的形象。',
			hok_donghuangtaiyi: '平庸是恶。自己，为何不能成为神？怀抱这这种执念，他孤注一掷，用被云珀改造过的身体强行吞噬了奇迹的力量。他如愿以偿，成为世间第一个接近于神的造物，通过奇迹，掌握了进化以及无穷力量的可能性。他的身体因奇迹中蕴含的能量而产生变化，进化为半神之姿；巫神祝冠其以“叛巫”之名；最尊敬的师父摇头走入森林深处，选择与自己相反的道路……但他深知这一切远非终点——总有一日，他将夺取全部的奇迹之力，成为真正的、唯一的神明。凭借着如同吞天噬日般的“神迹”，一批同样对力量充满渴望的人开始奉“东神”为首领。他们自称“全知者”，以云珀改造自身获得强大的力量，统治着位于森林顶端的云梦城——这里也很快在森民们口中被更名成为了“东神城”。他高居宫殿之中，坦然接受着全知者和森民们无比敬仰的注目。他的真名如何，已无迹可考。但现在，即使是小孩听到他的名字也会止住哭泣：噬灭日蚀——东皇太一。“日蚀亲临，如我之神迹！”',
			hok_duoliya: '小时候，在一次偷溜前往迷雾之海沉船宝藏“寻宝”的途中，朵莉亚用歌声救起了一个遭遇海难的人类小男孩——海都命运家族少主海诺，从此，开始拥有了第一个真正意义上的朋友。 往后的日子里，朵莉亚常常会偷溜到海都去找小海诺玩耍，对于过早失去双亲承受着家族命运孤独的海诺，和鲜有伙伴向往热忱友谊的小人鱼朵莉亚来说，这对两小无猜的“秘密伙伴”彼此早已成为对方最重要的存在。海都一年一度的烟火大会即将举行，然而，不明缘由的污染却加速了海底深渊巨兽的苏醒，情急之中， 为帮朵莉亚找到那首传说中饱含着最真挚情感记忆，能安抚海兽的“人鱼之歌”，海诺用窥探命运的能力，带她去往命运时空里若干年后的未来，在老去的海诺那里，找到用俩人一生回忆谱写的“人鱼之歌”。尽管不愿接受命运的答案，朵莉亚最终还是选择唱出这首“人鱼之歌”，让狂躁的巨兽吞噬掉俩人最美好的情感记忆得到安抚，但这也意味着选择了彼此的遗忘和失去……',
			hok_gaojianli: '高渐离，战国末期的燕国人，音乐家，善击筑（一种古之打击乐）。据《战国策》记载，高渐离与荆轲相友善，饮与市，边击筑边引吭高歌。当燕太子丹招募荆轲谋刺秦王政之际，燕太子丹在易水边为英雄送别，高渐离为之击筑。荆轲刺秦失败之后，传说高渐离隐姓埋名，浪迹天涯，后来得以凭音乐技能混迹于秦宫，为秦始皇击筑，谋刺秦皇，未果而身死。',
			hok_hainuo: '曾经的命运家族，是海都执政者之一，以双眼洞察命运，为海都领航。指引前行的人，却在一场无端的厄运中，沉没深海，至此群星暗淡，再无光芒。海诺幼年时，命运神杖就预言，家族将注定迈向衰亡，所以有人说，海诺就是那厄运之人。他不顾族人“罔顾祖训”的反对，毅然将命运启示殿搬到外城，承接普通民众诉求，为命运家族积累声望，为命运家族保住了最后的基业。众人直到那时才发现，所谓的厄运之人，成为了他们最值得信赖和依靠的存在。“行无穷命途，见万千命运”，海诺坚信，终局亦可逆转。他会让命运的光芒，再次绽放！',
			hok_lanlingwang: '一人敌一国，多么荒诞，又是多么简单。他反复着这样的伎俩，散布死亡。恐惧滋生，长城驻军被玩弄在掌中。直到某个夜晚，另一把剑的锋芒刺穿黑暗。“是你，幽灵！”啊，那个叛徒，还没有离开吗？竟然如此不甘心，而且……女人？兰陵王微笑着。也好，一直都赢，挺无聊的。“刀锋所划之地，便是疆土。”',
			hok_lixin: '李信所守护的是长城，却也不是长城。他是废太子之子，如今丧城丧国的、孤独落魄的王族后裔。长安城已经不是他的长安城，家亦非家。亲情，友情，理想，这些在他看来不过是一些冠冕堂皇的表象。牡丹方士同他许诺以长城换得长安，燃烧着炽热野心的少年因而来到边疆，为了有朝一日能够夺回真正属于自己的"家"而战斗。',
			hok_makeboluo: '马可波罗，中古时期的威尼斯商人。其父亲和叔叔，都曾到东方经商，而他本人，则在元世祖忽必烈的时代，来到中国。他穿越沙漠和帕米尔高原，经河西走廊来到元大都，游历了许多城市，据说还见过忽必烈，接受过元朝的官职。回到威尼斯之后，因带回的东方珍宝而成为巨富。后来参与威尼斯与热那亚的战争中被俘，在狱中，向同牢的作家口述了他的东方见闻，遂成著名的《马可波罗游记》。《马可波罗游记》极大地开拓了欧洲人的东方视野，丰富了他们关于东方的想象，激起了欧洲人向往东方的雄心。但也有人质疑游记的真实性，比如游记没有提到著名的长城，不过，作为一个口述游记，记录长城作用几乎完全消失的元代的事情，缺失长城也是可以理解的。',
			hok_mingshiyin: '明算万物的卦象，摄人心魂的牡丹，风度翩翩的举止……这位突然出现在长安、被尊称牡丹方士的男人仿佛是"神秘"二字的代名词。没有人知道他从何而来，但他对未来的精准预测令人惊叹，甚至连女帝都深信不疑。而面对那位治安官的冷眼与戒备，方士本人仅以一笑付之，深藏心中执念：那座古老巍峨的长城，和其脚下长眠的友人。',
			hok_miyue: '史称芈八子，秦昭襄王时的秦宣太后。在《史记》和《战国策》里都有关于芈月的零星记载，她本是秦惠文王的妃子，惠文王死后，秦武王继位，不久即举鼎而死，芈八子的儿子昭襄王继位，芈八子作为太后辅政。在她辅政期间，秦国得到了长足的发展，但功劳未必都是她一个人的。',
			hok_sikongzhen: '没有人能真正说出雷霆之王司空震究竟是一个怎样的人。他不会半分机关术，却执掌着长安最高的机关机构虞衡司；他对下属极为严苛，却仍被手下的机关师们死心塌地地追随；他从不与百姓亲近，却是百姓心目中最崇拜的英雄，街头巷尾都流传他的话本传说。不过人们至少能说，他是一个冷峻果决，绝不会轻易改变自己想法的人。从踏入长安之初，他便一直在为长安抵御风暴，人们视其为守护神，但他其实也只是一个普通人，只是他的未来更加笃定。因为他坚信，在这个弱肉强食的世界，只有力量，才是守护一切最有效的方式。',
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
					var card = game.createCard2('tengjia', 'spade', 1 + Math.floor(Math.random() * 13));
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
			// 阎行
			lao_mengjue: {
				trigger: {
					player: 'phaseUseBegin',
				},
				filter() {
					return game.hasPlayer(target => {
						return target.getExpansions('lao_mengjue_init').length;
					})
				},
				forced: true,
				async content(event, trigger, player) {
					const mengjuePlayer = await game.filterPlayer(current => {
						return current.getExpansions('lao_mengjue_init').length;
					})[0];
					player.removeSkill('lao_mengjue');
					const { result: { bool: chooseResultBool, targets: chooseTargetResultTargets } } = await player.chooseTarget(true, get.prompt2('lao_mengjue')).set('ai', function (target) {
						var player = _status.event.player;
						return get.attitude(player, target) < 0;
					});
					if (!chooseResultBool) {
						return;
					}
					event.target = chooseTargetResultTargets[0];
					player.logSkill('lao_mengjue', event.target);
					var dialog = ui.create.dialog('猛决', [mengjuePlayer.getExpansions('lao_mengjue_init'), 'blank'], 'hidden');
					const { result: { bool: chooseButtonResultBool, links: chooseButtonResultLinks } } = await event.target.chooseButton(dialog, true);
					if (!chooseButtonResultBool) {
						return;
					}
					await event.target.showCards(chooseButtonResultLinks[0], '猛决');
					if (chooseButtonResultLinks[0].name == 'juedou') {
						event.target.loseHp(event.target.hp);
						mengjuePlayer.loseToDiscardpile(mengjuePlayer.getExpansions('lao_mengjue_init').filter(i => i.name == 'sha'));
					} else {
						event.target.addSkill('lao_mengjue');
					}
					if (event.target != player) {
						event.target.useCard(chooseButtonResultLinks[0], player);
					} else {
						mengjuePlayer.loseToDiscardpile(chooseButtonResultLinks[0]);
						if (chooseButtonResultLinks[0].name != 'juedou') {
							var next = game.createEvent('lao_mengjue_result');
							next.player = player;
							next.setContent(lib.skill.lao_mengjue.content_2);
						}
					}
				},
				async content_2(event, trigger, player) {
					const mengjuePlayer = await game.filterPlayer(current => {
						return current.getExpansions('lao_mengjue_init').length;
					})[0];
					player.removeSkill('lao_mengjue');
					const { result: { bool: chooseResultBool, targets: chooseTargetResultTargets } } = await player.chooseTarget(true, get.prompt2('lao_mengjue')).set('ai', function (target) {
						var player = _status.event.player;
						return get.attitude(player, target) < 0;
					});
					if (!chooseResultBool) {
						return;
					}
					event.target = chooseTargetResultTargets[0];
					player.logSkill('lao_mengjue', event.target);
					var dialog = ui.create.dialog('猛决', [mengjuePlayer.getExpansions('lao_mengjue_init'), 'blank'], 'hidden');
					const { result: { bool: chooseButtonResultBool, links: chooseButtonResultLinks } } = await event.target.chooseButton(dialog, true);
					if (!chooseButtonResultBool) {
						return;
					}
					await event.target.showCards(chooseButtonResultLinks[0], '猛决');
					if (chooseButtonResultLinks[0].name == 'juedou') {
						event.target.loseHp(event.target.hp);
						mengjuePlayer.loseToDiscardpile(mengjuePlayer.getExpansions('lao_mengjue_init').filter(i => i.name == 'sha'));
					} else {
						event.target.addSkill('lao_mengjue');
					}
					if (event.target != player) {
						event.target.useCard(chooseButtonResultLinks[0], player);
					} else {
						mengjuePlayer.loseToDiscardpile(chooseButtonResultLinks[0]);
					}
				},
				group: 'lao_mengjue_init',
				subSkill: {
					init: {
						trigger: {
							global: 'phaseBefore',
							player: 'enterGame',
						},
						forced: true,
						locked: false,
						filter(event, player) {
							return (event.name != 'phase' || game.phaseNumber == 0);
						},
						content() {
							player.storage.cards = [];
							for (let i = 0; i < 5; i++) {
								// let card = get.cardPile(function (card) {
								// 	return card.name == 'sha' && !player.storage.cards.includes(card);
								// });
								let cardRandom = Math.random() * 8;
								let cardSuit = cardRandom < 2 ? (cardRandom < 1 ? 'heart' : 'diamond') : (cardRandom < 6 ? 'club' : 'spade');
								let cardNum = 1 + Math.floor(Math.random() * 13);
								let cardNature = null;
								if (cardRandom < 2) {
									cardNature = Math.random() * 2 < 1 ? 'fire' : null;
								} else {
									cardNature = Math.random() * 3 < 1 ? 'thunder' : null;
								}
								let card = game.createCard('sha', cardSuit, cardNum, cardNature);
								if (card) player.storage.cards.push(card);
							}
							// let card = get.cardPile(function (card) {
							// 	return card.name == 'juedou';
							// });
							let cardRandom = Math.random() * 4;
							let cardSuit = cardRandom < 2 ? (cardRandom < 1 ? 'heart' : 'diamond') : (cardRandom < 3 ? 'club' : 'spade');
							let cardNum = 1 + Math.floor(Math.random() * 13);
							let card = game.createCard('juedou', cardSuit, cardNum);
							if (card) player.storage.cards.push(card);
							player.storage.cards.randomSort();
							player.addToExpansion(player.storage.cards, 'draw').gaintag.add('lao_mengjue_init');
						},
						intro: {
							markcount: 'expansion',
							mark(dialog, content, player) {
								var content = player.getExpansions('lao_mengjue_init');
								// return '还有' + get.cnNumber(content.length) + '张牌';
								return '<div class="text center"><span class=thundertext>杀：' + (content.length - 1) + '张</span><br><span class=firetext>决斗：1张</span></div>'
							},
						},
					}
				},
			},
			lao_sudi: {
				unique: true,
				mark: true,
				skillAnimation: true,
				animationColor: 'gray',
				limited: true,
				intro: {
					content: 'limited'
				},
				enable: 'phaseUse',
				filter(event, player) {
					return player.hasEnabledSlot(1);
				},
				filterTarget(card, player, target) {
					return target != player && target.maxHp <= player.maxHp;
				},
				content() {
					player.awakenSkill('lao_sudi');
					player.disableEquip(1);
					player.addSkill('lao_sudi_wusheng');
					target.clearSkills();
					target.addSkill('lao_mengjue');
					var next = game.createEvent('lao_mengjue_result');
					next.player = target;
					next.setContent(lib.skill.lao_mengjue_init.content);
				},
				subSkill: {
					wusheng: {
						forced: true,
						enable: ['chooseToRespond', 'chooseToUse'],
						filterCard(card, player) {
							if (get.zhu(player, 'shouyue')) return true;
							return get.subtype(card) == 'equip1';
						},
						position: 'hes',
						viewAs: { name: 'sha' },
						viewAsFilter(player) {
							if (get.zhu(player, 'shouyue')) {
								if (!player.countCards('hes')) return false;
							}
							else {
								if (!player.countCards('hes', { subtype: 'equip1' })) return false;
							}
						},
						prompt: '将一张武器牌当杀使用或打出',
						check(card) {
							const val = get.value(card);
							if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
							return 5 - val;
						},
						ai: {
							skillTagFilter(player) {
								if (get.zhu(player, 'shouyue')) {
									if (!player.countCards('hes')) return false;
								}
								else {
									if (!player.countCards('hes', { subtype: 'equip1' })) return false;
								}
							},
							respondSha: true,
						}
					}
				},
				ai: {
					expose: 0.3,
				}
			},
			lao_duanmao: {
				forced: true,
				shaRelated: true,
				preHidden: true,
				trigger: {
					target: 'useCardToTargeted',
				},
				filter(event, player) {
					return event.card.name == 'sha';
				},
				content() {
					player.draw();
					if (!player.hasEnabledSlot(1)) {
						player.chooseToUse(function (card, player, event) {
							if (get.name(card) != 'sha') return false;
							return lib.filter.filterCard.apply(this, arguments);
						}, get.prompt2('lao_duanmao')).set('filterTarget', function (card, player, target) {
							return target == trigger.player;
						});
					}
				},
				subSkill: {
					1: {
						mod: {
							cardUsable(card, player, num) {
								if (card.name == 'sha') return num + 1;
							},
						},
					}
				},
				ai: {
					effect: {
						target(card, player, target) {
							if (card.name == 'sha') return [1, 0.6];
						},
					}
				}
			},
			// SP王朗
			lao_yayu: {
				trigger: { player: 'phaseBegin' },
				filter(event, player) {
					return player.countCards('h') > 0;
				},
				locked: false,
				forced: true,
				*content(event, map) {
					var player = map.player;
					var result = yield player.chooseTarget(get.prompt('lao_yayu'), '', (card, player, target) => {
						return player.canCompare(target);
					}).set('ai', target => {
						var player = _status.event.player;
						return -get.attitude(player, target);
					});
					if (result.bool) {
						var target = result.targets[0];
						player.logSkill('lao_yayu', target);
						var result2 = yield player.chooseToCompare(target);
						if (!result2.tie) {
							var players = [player, target];
							if (result2.bool) players.reverse();
							var win_cards = players[1].getCards('hs');
							if (win_cards != undefined) {
								players[1].discard(win_cards);
							}

							players[0].addTempSkill('fengyin', { player: 'phaseEnd' });
							var lose_num = Math.floor(players[0].countCards('h') / 2);
							if (lose_num > 0) {
								players[0].chooseToDiscard(lose_num, 'h', true);
							}
						} else {
							players[0].addTempSkill('fengyin', { player: 'phaseEnd' });
							var lose_num0 = Math.floor(players[0].countCards('h') / 2);
							if (lose_num0 > 0) {
								players[0].chooseToDiscard(lose_num0, 'h', true);
							}
							players[1].addTempSkill('fengyin', { player: 'phaseEnd' });
							var lose_num1 = Math.floor(players[0].countCards('h') / 2);
							if (lose_num1 > 0) {
								players[0].chooseToDiscard(lose_num1, 'h', true);
							}
						}
					}
				},
				ai: {
					threaten: 0.25,
				}
			},
			lao_shanshi: {
				trigger: { player: 'phaseDrawBegin2' },
				forced: true,
				filter(event, player) {
					return !event.numFixed;
				},
				check(event, player) {
					return (player.countCards('h') + 2 + event.num) <= 5 || game.hasPlayer(function (target) {
						return player !== target && !game.hasPlayer(function (current) {
							return current !== player && current !== target && current.countCards('h') < target.countCards('h');
						}) && get.attitude(player, target) > 0;
					});
				},
				content() {
					trigger.num += 2;
					player.addTempSkill('lao_shanshi_give', 'phaseDrawAfter');
				},
				subSkill: {
					give: {
						trigger: { player: 'phaseDrawEnd' },
						forced: true,
						charlotte: true,
						popup: false,
						filter(event, player) {
							return player.countCards('h') > 5;
						},
						content() {
							'step 0'
							var targets = game.filterPlayer(function (target) {
								return target != player && !game.hasPlayer(function (current) {
									return current != player && current != target && current.countCards('h') < target.countCards('h');
								});
							}), num = Math.floor(player.countCards('h') / 2);
							player.chooseCardTarget({
								position: 'h',
								filterCard: true,
								filterTarget(card, player, target) {
									return _status.event.targets.includes(target);
								},
								targets: targets,
								selectTarget: targets.length == 1 ? -1 : 1,
								selectCard: num,
								prompt: '将' + get.cnNumber(num) + '张手牌交给一名手牌数最少的其他角色',
								forced: true,
								ai1(card) {
									var goon = false, player = _status.event.player;
									for (var i of _status.event.targets) {
										if (get.attitude(i, player) > 0 && get.attitude(player, i) > 0) goon = true; break;
									}
									if (goon) {
										if (!player.hasValueTarget(card) || card.name == 'sha' && player.countCards('h', function (cardx) {
											return cardx.name == 'sha' && !ui.selected.cards.includes(cardx);
										}) > player.getCardUsable('sha')) return 2;
										return Math.max(2, get.value(card) / 4);
									}
									return 1 / Math.max(1, get.value(card));
								},
								ai2(target) {
									return get.attitude(_status.event.player, target);
								},
							});
							'step 1'
							if (result.bool) {
								var target = result.targets[0];
								player.line(target, 'green');
								player.give(result.cards, target);
								player.markAuto('lao_shanshi_help', [target]);
								player.addTempSkill('lao_shanshi_help', { player: 'phaseBeginStart' });
							}
						},
					},
					help: {
						trigger: { target: 'useCardToTargeted' },
						direct: true,
						charlotte: true,
						onremove: true,
						filter(event, player) {
							if (!player.storage.lao_shanshi_help || !player.storage.lao_shanshi_help.length) return false;
							if (event.card.name != 'sha' && get.type(event.card) != 'trick') return false;
							for (var i of player.storage.lao_shanshi_help) {
								if (i.countCards('h') > 0) return true;
							}
							return false;
						},
						content() {
							'step 0'
							if (!event.targets) event.targets = player.storage.lao_shanshi_help.slice(0).sortBySeat();
							event.target = event.targets.shift();
							event.target.chooseCard('h', '好施：是否将一张手牌交给' + get.translation(player) + '？').set('ai', function (card) {
								var player = _status.event.player, target = _status.event.getTrigger().player;
								if (!_status.event.goon) {
									if (get.value(card, player) < 0 || get.value(card, target) < 0) return 1;
									return 0;
								}
								var cardx = _status.event.getTrigger().card;
								if (card.name == 'shan' && get.tag(cardx, 'respondShan') && target.countCards('h', 'shan') < player.countCards('h', 'shan')) return 2;
								if (card.name == 'sha' && (cardx.name == 'juedou' || get.tag(card, 'respondSha') && (target.countCards('h', 'sha') < player.countCards('h', 'sha')))) return 2;
								if (get.value(card, target) > get.value(card, player) || target.getUseValue(card) > player.getUseValue(card)) return 1;
								if (player.hasSkillTag('noh')) return 0.5 / Math.max(1, get.value(card, player));
								return 0;
							}).set('goon', get.attitude(event.target, player) > 0);
							'step 1'
							if (result.bool) {
								target.logSkill('lao_shanshi_help', player);
								target.give(result.cards, player);
							}
							if (targets.length) event.goto(0);
						},
					},
				},
			},
			// 肉鸽
			lao_roguelike_skill: {
				getList: function () {
					const list = Object.keys(lib.characterPack.MiNikill).concat(_status.extra_pingjianList || []);
					return list.filter(i => !get.character(i, 4) || !get.character(i, 4).includes('unseen'));
				},
				Mbaby_characterlist: true,
				trigger: {
					global: ["phaseBefore", 'dying'],
					player: "enterGame",
				},
				filter(event, player) {
					if (event.name == "phase") {
						return game.phaseNumber == 0;
					}
					return true;
				},
				content: function () {
					'step 0'
					var allList = ((!_status.connectMode && lib.config.extension_活动武将_PingJianName) ? lib.config.extension_活动武将_PingJianName : lib.skill.lao_roguelike_skill.getList()).filter(i => lib.character[i]);
					var list = [], skills = [], map = [];
					allList.randomSort();
					for (var i = 0; i < allList.length; i++) {
						var name = allList[i];
						var skills2 = lib.character[name][3];
						for (var j = 0; j < skills2.length; j++) {
							if (player.getStorage('lao_roguelike_skill').includes(skills2[j])) continue;
							if (skills2[j] == 'lao_roguelike_skill') continue;
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
								if (info.silent || info.limited || info.juexingji || info.hiddenSkill || info.dutySkill
									|| (info.zhuSkill && !player.isZhu2()) || info.groupSkill || (info.priority && typeof info.priority == 'number') || info.firstDo || info.lastDo) continue;
								if (/*info.init||info.onChooseToUse||*/info.ai && (info.ai.combo || info.ai.notemp || info.ai.neg)) continue;
								if (info.init) info.init(player, list2[k]);
								list.add(name);
								if (!map[name]) map[name] = [];
								map[name].push(skills2[j]);
								skills.add(skills2[j]);
								break;
							}
						}
						if (list.length > 2) break;
					}
					if (skills.length) player.chooseControl(skills).set('dialog', ['请选择获得的技能', [list, 'character']]);
					else event.finish();
					'step 1'
					player.markAuto('lao_roguelike_skill', [result.control]);
					player.addSkill(result.control);
					player.loseMaxHp();
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
							|| card.name == 'guohe' || card.name == 'shunshou' || card.name == 'juedou' || card.name == 'huogong'
							|| card.name == 'qizhengxiangsheng' || card.name == 'hpp_qizhengxiangsheng') {
							return false;
						}
					}
				},
				trigger: { player: ['useCardAfter', 'respond'] },
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
			// 安琪拉
			hok_huoqiu: {
				usable: 1,
				enable: 'phaseUse',
				enable: ['chooseToRespond', 'chooseToUse'],
				mod: {
					targetInRange(card, player) {
						if (card.name == 'sha' && card.nature == 'fire') return true;
					},
				},
				filterCard(card) {
					return lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay';
				},
				viewAs: { name: 'sha', nature: 'fire' },
				viewAsFilter(player) {
					if (!player.countCards('h', { type: 'trick' }) && !player.countCards('h', { type: 'delay' })) {
						return false;
					}
				},
				position: 'h',
				prompt: '将一张锦囊当火【杀】使用或打出',
				check(card) {
					const val = get.value(card);
					if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
					return 6 - val;
				},
				group: 'hok_huoqiu_damage',
				ai: {
					order() {
						return get.order({ name: "sha" }) + 0.5;
					},
				},
				subSkill: {
					damage: {
						forced: true,
						locked: false,
						trigger: { source: 'damageBegin1' },
						filter(event) {
							return event.card && event.card.name == 'sha' && event.hasNature('fire');
						},
						mod: {
							aiOrder(player, card, num) {
								if (get.itemtype(card) == 'card' && card.name == 'sha' && card.nature) return num + 0.5;
							},
						},
						content() {
							trigger.num++;
						},
					},
				},
			},
			hok_hunhuo: {
				usable: 1,
				enable: 'phaseUse',
				filterTarget(card, player, target) {
					return target != player && target.inRangeOf(player) && target.countCards('h') > 0;
				},
				async content(event, trigger, player) {
					let hunhuoNum = 0;
					const judgeEvent = event.target.judge(card => {
						hunhuoNum = Math.floor(get.number(card) / 5);
						if (hunhuoNum >= 1) {
							return 2;
						} else {
							return -2;
						}
					});
					judgeEvent.judge2 = result => result.bool;
					const { result: { judge } } = await judgeEvent;
					if (judge < 2) {
						return;
					}
					player.line(event.target);
					event.target.chooseToDiscard('h', hunhuoNum, true);
				},
				ai: {
					order: 9.1,
					result: {
						target(player, target) {
							if (target.countCards('h') == 0) {
								return 0;
							}
							return -1;
						},
					}
				}
			},
			hok_chihui: {
				usable: 1,
				enable: 'phaseUse',
				filter(event, player) {
					return game.hasPlayer(function (current) {
						return current.countCards('h') == 0 && current != player;
					});
				},
				filterTarget(card, player, target) {
					return target != player && target.countCards('h') == 0;
				},
				content() {
					player.logSkill('hok_chihui', target);
					target.damage('fire');
					target.damage('fire');
				},
				ai: {
					order: 5.5,
					result: {
						target(player, target) {
							return -get.damageEffect(target, player, player, "fire");
						}
					},
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
			// 敖隐
			hok_zhanghuo: {
				trigger: { player: 'useCardToPlayered' },
				forced: true,
				locked: false,
				usable: 1,
				check(event, player) {
					return get.attitude(player, event.target) <= 0;
				},
				filter(event, player) {
					return event.card.name == 'sha' && event.card.nature == null;
				},
				content() {
					game.setNature(trigger.card, 'fire');
				},
				ai: {
					order() {
						return get.order({ name: 'sha' }) + Math.random() * 0.5;
					},
				},
				group: 'hok_zhanghuo_effect',
				subSkill: {
					effect: {
						forced: true,
						locked: false,
						trigger: { source: 'damageBegin1' },
						filter(event) {
							return event.card && event.card.name == 'sha' && event.hasNature('fire');
						},
						mod: {
							aiOrder(player, card, num) {
								if (get.itemtype(card) == 'card' && card.name == 'sha' && card.nature) return num + 0.1 + Math.random() * 0.4;
							},
						},
						content() {
							trigger.num++;
						},
					},
				},
			},
			hok_siyu: {
				trigger: { player: 'useCardToPlayered' },
				forced: true,
				locked: false,
				usable: 1,
				check(event, player) {
					return get.attitude(player, event.target) <= 0;
				},
				filter(event, player) {
					return event.card.name == 'sha' && event.card.nature == null;
				},
				content() {
					game.setNature(trigger.card, 'thunder');
				},
				ai: {
					order() {
						return get.order({ name: 'sha' }) + Math.random() * 0.5;
					},
				},
				group: 'hok_siyu_effect',
				subSkill: {
					effect: {
						forced: true,
						locked: false,
						trigger: { source: 'damageBegin1' },
						filter(event) {
							return event.card && event.card.name == 'sha' && event.hasNature('thunder');
						},
						mod: {
							aiOrder(player, card, num) {
								if (get.itemtype(card) == 'card' && card.name == 'sha' && card.nature) return num + 0.1 + Math.random() * 0.4;
							},
						},
						content() {
							if (trigger.num > 0) {
								player.recover();
							}
						},
					},
				},
			},
			hok_jiafeng: {
				trigger: { player: 'useCardToPlayered' },
				forced: true,
				locked: false,
				usable: 1,
				check(event, player) {
					return get.attitude(player, event.target) <= 0;
				},
				filter(event, player) {
					return event.card.name == 'sha' && event.card.nature == null;
				},
				mod: {
					aiOrder(player, card, num) {
						if (get.itemtype(card) == 'card' && card.name == 'sha' && card.nature) return num + 0.1 + Math.random() * 0.4;
					},
				},
				content() {
					game.setNature(trigger.card, 'ice');
					trigger.getParent().directHit.add(trigger.target);
				},
				ai: {
					directHit_ai: true,
					order() {
						return get.order({ name: 'sha' }) + Math.random() * 0.5;
					},
				},
			},
			hok_qiongxuan: {
				skillAnimation: true,
				animationColor: 'wood',
				unique: true,
				mark: true,
				limited: true,
				trigger: { player: 'damageBegin4' },
				check(event, player) {
					if (player.hasJudge('lebu')) {
						return 0;
					}
					if (player.hp == 2) {
						return 1;
					}
					if (player.countCards('h', 'sha') == 0) {
						return 0;
					}
					return 1;
				},
				content() {
					player.awakenSkill('hok_qiongxuan');
					player.turnOver();
					player.addTempSkill('hok_qiongxuan_effect', { player: 'phaseBeginStart' });
					player.addSkill('hok_qiongxuan_video');
				},
				subSkill: {
					effect: {
						forced: true,
						firstDo: true,
						mark: true,
						intro: {
							name: '穷玄',
							content: '不能成为牌的目标',
						},
						mod: {
							targetEnabled(card, player, target) {
								return false;
							},
						}
					},
					video: {
						trigger: { player: 'phaseBefore' },
						forced: true,
						firstDo: true,
						content() {
							player.turnOver(false);
							player.removeSkill('hok_qiongxuan_video');
							player.addSkill('hok_qiongxuan_wushuang');
						},
					},
					wushuang: {
						mod: {
							selectTarget(card, player, range) {
								if (card.name == 'sha' && range[1] != -1) range[1]++;
							},
							cardUsable(card, player, num) {
								if (card.name == 'sha') return num + 1;
							},
							attackRange(player, num) {
								return num + 1;
							},
						},
						trigger: { player: 'phaseEnd' },
						forced: true,
						content() {
							player.removeSkill('hok_qiongxuan_wushuang');
						},
					},
				},
			},
			// 百里守约
			hok_miaozhun: {
				derivation: 'hok_yinshen',
				trigger: { player: 'phaseJieshuBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					if (player.countMark('hok_yinshen')) {
						return false;
					}
					if (player.getHistory('skipped').contains('phaseUse')) return true;
					var history = player.getHistory('useCard').concat(player.getHistory('respond'));
					for (var i = 0; i < history.length; i++) {
						if ((history[i].card.name == 'sha' || get.type(history[i].card) == 'trick' || get.type(history[i].card) == "delay") && history[i].isPhaseUsing()) {
							return false;
						}
					}
					return true;
				},
				content() {
					player.addMark('hok_yinshen', 1);
					player.addSkill('hok_yinshen');
				},
				group: 'hok_miaozhun_effect',
				subSkill: {
					effect: {
						mod: {
							attackRange(player, num) {
								return num + 2;
							},
						}
					},
				},
			},
			hok_miyan: {
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
			hok_kuangju: {
				trigger: { player: 'phaseUseBegin' },
				filter(event, player) {
					return game.hasPlayer(target => player.canUse({ name: 'sha' }, target, false, true)) && player.getCards('h', 'sha').length > 0;
				},
				content() {
					'step 0';
					player.chooseToDiscard([1, player.getCards('h', 'sha').length], 'h', '弃置X张杀，视为对该角色使用一张伤害为X的【杀】（不可以触发酒）。', { name: 'sha' })
						.set("ai", (card) => 1 / (get.value(card) || 0.5));
					'step 1';
					if (result.bool) {
						var sum = result.cards.length;
						if (sum > 0) {
							player.storage.hok_kuangju = sum;
						}
					}
					'step 2'
					if (result.bool) {
						player.chooseUseTarget('sha', true, false);
					}
				},
				group: 'hok_kuangju_effect',
				subSkill: {
					effect: {
						forced: true,
						locked: false,
						trigger: { source: 'damageBegin1' },
						filter(event, player) {
							return player.storage.hok_kuangju > 0;
						},
						content() {
							'step 0'
							trigger.num = player.storage.hok_kuangju;
							'step 1'
							player.storage.hok_kuangju = 0;
						},
					}
				}
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
						changeSeat: true,
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
					event.huhuoDamage = (event.huhuoList.length > 4 ? 5 : 3);
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
			// 大司命
			hok_mingge: {
				marktext: '鸣',
				intro: {
					name: '鸣戈',
					content: 'mark',
				},
				trigger: { source: 'damageSource' },
				forced: true,
				filter(event, player) {
					return event.num > 0 && event.card && event.card.name == 'sha';
				},
				content() {
					if (!trigger.player.hasMark('hok_mingge')) {
						trigger.player.addMark('hok_mingge');
					} else {
						var cards = trigger.player.getCards('h', function (card) {
							return lib.filter.cardDiscardable(card, trigger.player, 'hok_mingge');
						});
						if (cards.length > 0) trigger.player.discard(cards.randomGets(2));
					}
					player.storage.clears = player.storage.clears.filter(element => element !== trigger.player);
				},
				group: ['hok_mingge_effect', 'hok_mingge_record', 'hok_mingge_clear'],
				subSkill: {
					effect: {
						mod: {
							attackRange(player, num) {
								if (player.storage._xuanji) return num;
								return num + 1;
							},
						}
					},
					record: {
						trigger: { player: 'phaseBegin' },
						forced: true,
						locked: false,
						filter(event, player) {
							return game.hasPlayer((current) => {
								return current.countMark('hok_mingge');
							});
						},
						content() {
							player.storage.clears = game.filterPlayer((current) => {
								return current.countMark('hok_mingge');
							});
						},
					},
					clear: {
						trigger: { player: 'phaseEnd' },
						forced: true,
						locked: false,
						filter(event, player) {
							if (player.storage.clears != undefined) {
								return player.storage.clears.length > 0;
							}
							return false;
						},
						content() {
							'step 0'
							player.storage.clears.forEach((element) => {
								if (element.hasMark('hok_mingge')) {
									element.removeMark('hok_mingge', 1);
								}
							})
							'step 1'
							player.storage.clears = [];
						},
					}
				}
			},
			hok_hungui: {
				trigger: { source: "damageSource" },
				filter(event, player) {
					return event.player.hp == 1;
				},
				content() {
					player.line(trigger.player, { color: [255, 255, 0] });
					trigger.player.die();
					player.draw(2);
				},
			},
			// 东皇太一
			hok_rishi: {
				marktext: '蚀',
				intro: {
					name: '日蚀',
					content: 'mark',
				},
				trigger: { player: 'phaseZhunbeiBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					if (player.countMark('hok_rishi') < 3) {
						return true;
					}
					return false;
				},
				content() {
					player.addMark('hok_rishi', 1);
				},
				group: 'hok_rishi_biyue',
				subSkill: {
					biyue: {
						trigger: { player: 'phaseJieshuBegin' },
						frequent: true,
						preHidden: true,
						filter(event, player) {
							return player.countMark('hok_rishi') != 0;
						},
						async content(event, trigger, player) {
							if (player.countMark('hok_rishi') < 3) {
								player.draw();
							} else {
								player.draw(2);
							}
						},
					},
				},
			},
			hok_duoqi: {
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					if (player.countMark('hok_rishi') == 3) {
						return true;
					}
					return false;
				},
				filterTarget(card, player, target) {
					return target != player;
				},
				content() {
					player.storage.hok_duoqi = true;
					player.addSkill('hok_duoqi_effect');
					player.addSkill('fengyin');
					player.addMark('hok_duoqi_effect');

					target.addSkill('hok_duoqi_effect');
					target.addSkill('fengyin');
					target.addMark('hok_duoqi_effect');

					player.removeMark('hok_rishi', 3);
					target.damage();
				},
				ai: {
					order: 1,
					result: {
						target(player, target) {
							return -1;
						}
					}
				},
				subSkill: {
					effect: {
						marktext: '堕契',
						intro: {
							name: '堕契',
							content: '锁定技。你的回合开始时你跳过本回合。你不能使用和打出牌。你非锁定技失效。当另一名“堕契”角色受到伤害后，你受到等量的伤害。',
						},
						forced: true,
						trigger: { player: 'phaseBegin' },
						content() {
							trigger.cancel();
							if (player.storage.hok_duoqi) {
								let targets = game.filterPlayer(current => current.hasSkill('hok_duoqi_effect'));
								for (let target of targets) {
									target.removeSkill('hok_duoqi_effect');
									target.removeMark('hok_duoqi_effect');
									target.removeSkill('fengyin');
								}
								player.storage.hok_duoqi = false;
							} else {
								player.storage.hok_duoqi = true;
							}
						},
						group: ['hok_duoqi_xiongluan', 'hok_duoqi_xianfu'],
					},
					xiongluan: {
						mod: {
							cardEnabled2(card, player) {
								if (get.position(card) == 'h' || get.position(card) == 'e' || get.position(card) == 's') return false;
							},
						},
						ai: {
							effect: {
								target(card, player, target) {
									if (get.tag(card, 'damage')) return [0, -999999];
								},
							},
						},
						charlotte: true,
					},
					xianfu: {
						charlotte: true,
						trigger: { player: 'damageEnd' },
						forced: true,
						filter(event, player) {
							if (event.num <= 0 || event.getParent().name == 'hok_duoqi_xianfu' || event.getParent().name == 'hok_duoqi') return false;
							if (event.name == 'damage') return true;
							return player.isDamaged();
						},
						content() {
							let targets = game.filterPlayer(current => {
								return current != player && current.hasSkill('hok_duoqi_xianfu');
							});
							for (var target of targets) {
								target.damage(trigger.num, 'nosource');
							}
						},
					},
				}
			},
			// 朵莉亚
			hok_renyu: {
				trigger: { player: "damageBegin4" },
				filter(event) {
					return event.hasNature("fire");
				},
				forced: true,
				content() {
					trigger.cancel();
				},
				ai: {
					nofire: true,
					effect: {
						target(card, player, target, current) {
							if (get.tag(card, "fireDamage")) return "zerotarget";
						},
					},
				},
			},
			hok_huange: {
				derivation: 'hok_yinshen',
				usable: 1,
				enable: 'phaseUse',
				filterTarget: lib.filter.notMe,
				content() {
					if (target.hasMark('hok_yinshen')) {
						target.removeMark('hok_yinshen', 1);
						target.removeSkill('hok_yinshen');
					}
					if (get.distance(player, target) <= 1) {
						target.chooseToDiscard('h', true).set('ai', function (card) {
							return 6 - get.value(card);
						});
					}
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
			hok_tianlai: {
				trigger: { player: 'phaseUseBegin' },
				content() {
					'step 0'
					var maxThreaten = 0;
					game.filterPlayer(function (target) {
						var att = get.attitude(_status.event.player, target);
						if (att > 0) {
							if (get.threaten(target) > maxThreaten) {
								maxThreaten = get.threaten(target);
							}
						}
						return false;
					});
					player.chooseTarget(get.prompt("hok_tianlai")).set("ai", function (target) {
						var player = _status.event.player,
							att = get.attitude(player, target);
						if (att > 0 && maxThreaten == get.threaten(target)) return att;
						return -1;
					});
					'step 1'
					if (result.bool) {
						var target = result.targets[0];
						target.addSkill('hok_tianlai_effect');
					}
				},
				subSkill: {
					effect: {
						trigger: { player: ["useSkillAfter", "logSkill"] },
						enable: 1,
						filter(event, player) {
							if (lib.skill[event.skill].equipSkill == true) return false;
							if (event.skill != 'hok_tianlai') return true;
							return false;
						},
						content() {
							'step 0'
							player.removeSkill('hok_tianlai_effect');
							'step 1'
							var skillsLength = player.getHistory("useSkill").length;
							if (skillsLength >= 2) {
								var nextSkill = player.getHistory("useSkill")[skillsLength - 2].skill;
								let nextSkillName = nextSkill.toString();
								if (nextSkillName != 'hok_tianlai' && nextSkillName != 'hok_tianlai_effect' && nextSkillName != 'hok_minghui' && nextSkillName != 'miniyoulong') {
									player.useSkill(nextSkill);
								} else if (nextSkillName == 'hok_minghui') {
									player.addTempSkill('hok_minghuitianlai');
								}
							}
						},
					}
				}
			},
			// 高渐离
			hok_aige: {
				marktext: '歌',
				intro: {
					name: '哀歌',
					content: 'mark',
				},
				trigger: { player: "useCardAfter" },
				frequent: true,
				preHidden: true,
				filter(event) {
					return get.tag(event.card, 'damage') || event.card.name == 'sha';
				},
				content() {
					if (player.countMark('hok_aige') < 5) {
						player.addMark('hok_aige');
					}
				},
				group: 'hok_aige_effect',
				subSkill: {
					effect: {
						trigger: { player: 'useCard2' },
						forced: true,
						filter(event, player) {
							return player.countMark('hok_aige') >= 3 && event.card.name == 'sha';
						},
						content() {
							player.removeMark('hok_aige', 3);
							trigger.baseDamage += 1;
						},
					}
				},
			},
			hok_kuangge: {
				usable: 1,
				enable: 'phaseUse',
				enable: ['chooseToRespond', 'chooseToUse'],
				filterCard(card) {
					return lib.card[card.name].type == 'trick' || lib.card[card.name].type == 'delay';
				},
				viewAs: { name: 'sha' },
				viewAsFilter(player) {
					if (!player.countCards('hs', { type: 'trick' }) && !player.countCards('hs', { type: 'delay' })) {
						return false;
					}
				},
				position: 'hs',
				prompt: '将一张锦囊当【杀】使用或打出',
				check(card) {
					const val = get.value(card);
					if (_status.event.name == 'chooseToRespond') return 1 / Math.max(0.1, val);
					return 5.5 - val;
				},
				ai: {
					respondSha: true,
				},
			},
			hok_lige: {
				enable: 'phaseUse',
				filter(event, player) {
					return game.hasPlayer(target => player.canUse({ name: 'sha', nature: 'fire' }, target)) && player.countCards('hes', card => lib.skill.hok_lige.filterCard(card, player));
				},
				position: "hes",
				filterCard(card, player) {
					return get.type(card) == 'equip' && get.subtype(card) == 'equip3';
				},
				filterTarget(card, player, target) {
					return player.canUse({ name: 'sha', nature: 'fire', isCard: true }, target);
				},
				usable: 1,
				check: (card) => 8 - get.value(card),
				prompt: '弃置一张防具马，视为对一名其他角色使用一张不计入次数的火【杀】',
				content() {
					'step 0'
					player.useCard({ name: 'sha', nature: 'fire', isCard: true }, target);
					player.addSkill('hok_lige_paoxiao');
					'step 1'
					var next = player.chooseToUse();
					next.set(
						"openskilldialog",
						`###${get.prompt("hok_kuangge")}###`
					);
					next.set("norestore", true);
					next.set("_backupevent", "hok_kuangge");
					next.set("addCount", false);
					next.set("custom", {
						add: {},
						replace: { window() { } },
					});
					next.backup("hok_kuangge");
					'step 2'
					player.removeSkill('hok_lige_paoxiao');
				},
				subSkill: {
					paoxiao: {
						mod: {
							cardUsable(card, player, num) {
								if (card.name == 'sha') return Infinity;
							}
						},
					},
				},
			},
			hok_moyin: {
				enable: 'phaseUse',
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'thunder',
				filter(event, player) {
					return player.countCards('hes');
				},
				content() {
					player.awakenSkill('hok_moyin');
					player.addTempSkill('hok_moyin_aige');
				},
				subSkill: {
					aige: {
						trigger: { player: "useCard" },
						filter(event, player) {
							if (get.tag(event.card, 'damage') || event.card.name == 'sha')
								return lib.skill.hok_moyin_aige.logTarget(event, player).length;
							return false;
						},
						logTarget(event, player) {
							return game.filterPlayer(current => {
								return current != player && current.inRangeOf(player);
							});
						},
						forced: true,
						content() {
							'step 0'
							event.targets = lib.skill.hok_moyin_aige.logTarget(trigger, player).sortBySeat();
							'step 1'
							var target = event.targets.shift();
							event.target = target;
							target.chooseToDiscard('h', '魔音：弃置一张手牌，或失去1点体力').set('ai', card => {
								var player = _status.event.player;
								if (card.name == 'tao' || card.name == 'jiu') return 0;
								if (player.hasSkill('zhaxiang') && player.hp > 1) return 0;
								return 6 - get.value(card);
							});
							'step 2'
							if (!result.bool) target.loseHp();
							if (event.targets.length) event.goto(1);
						},
					},
				},
			},
			// 海诺
			hok_mingren: {
				marktext: '命',
				intro: {
					name: '命刃',
					content: 'mark',
				},
				trigger: { source: 'damageSource' },
				forced: true,
				filter(event, player) {
					return event.num > 0;
				},
				content() {
					if (!trigger.player.hasMark('hok_mingren') && trigger.player != player) {
						trigger.player.addMark('hok_mingren');
					}
					player.storage.clears = player.storage.clears.filter(element => element !== trigger.player);
				},
				group: ['hok_mingren_record', 'hok_mingren_clear'],
				subSkill: {
					record: {
						trigger: { player: 'phaseBegin' },
						forced: true,
						locked: false,
						filter(event, player) {
							return game.hasPlayer((current) => {
								return current.countMark('hok_mingren');
							});
						},
						content() {
							player.storage.clears = game.filterPlayer((current) => {
								return current.countMark('hok_mingren');
							});
						},
					},
					clear: {
						trigger: { player: 'phaseEnd' },
						forced: true,
						locked: false,
						filter(event, player) {
							if (player.storage.clears != undefined) {
								return player.storage.clears.length > 0;
							}
							return false;
						},
						content() {
							'step 0'
							player.storage.clears.forEach((element) => {
								if (element.hasMark('hok_mingren')) {
									element.removeMark('hok_mingren', 1);
								}
							})
							'step 1'
							player.storage.clears = [];
						},
					}
				}
			},
			hok_zhuimang: {
				trigger: { player: 'useCard2' },
				filter(event, player) {
					if (event.card.name != 'sha') return false;
					if (player.storage._xuanji) return false;
					return game.hasPlayer(function (current) {
						return !event.targets.contains(current) && current.hasMark('hok_mingren') && current != player;
					});
				},
				direct: true,
				content() {
					'step 0'
					player.chooseTarget(get.prompt('hok_zhuimang'), '为' + get.translation(trigger.card) + '增加任意个目标', function (card, player, target) {
						return !_status.event.sourcex.contains(target) && target.hasMark('hok_mingren') && player != target;
					}, [1, Infinity]
					).set('sourcex', trigger.targets).set('ai', function (target) {
						var player = _status.event.player;
						return get.effect(target, _status.event.card, player, player);
					}).set('card', trigger.card);
					'step 1'
					if (result.bool) {
						if (!event.isMine() && !event.isOnline()) game.delayx();
						event.targets = result.targets;
					}
					else {
						event.finish();
					}
					'step 2'
					player.logSkill('hok_zhuimang', event.targets);
					player.line(event.targets, "fire");
					trigger.targets.addArray(event.targets);
				},
				ai: {
					effect: {
						player(card, player, target, current, isLink) {
							if (!isLink && card.name == 'sha') {
								if (player._double) return;
								player._double = true;
								if (get.effect(target, card, player, player) <= 0) {
									delete player._double;
									return;
								}
								if (game.hasPlayer(function (current) {
									return current != target && current.hasMark('hok_mingren') &&
										player.canUse(card, current) && get.effect(current, card, player, player) > 0;
								})) {
									delete player._double;
									return [1, 1];
								}
								delete player._double;
							}
						}
					}
				},
				group: 'hok_zhuimang_effect',
				subSkill: {
					effect: {
						mod: {
							attackRange(player, num) {
								if (player.storage._xuanji) return num;
								return num + 2;
							},
						}
					},
				},
			},
			hok_xuanji: {
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					if (!player.storage._xuanji) return false;
					return game.hasPlayer((current) => {
						return current != player && current.inRangeOf(player);
					});
				},
				content() {
					"step 0";
					if (game.hasPlayer((current) => {
						return current != player && current.hasSkill('hok_minghuitianlai_effect') && current.inRangeOf(player);
					})) {
						player.chooseTarget(
							"对攻击范围内的一名其他角色造成1点伤害",
							function (card, player, target) {
								return target != player && target.hasSkill('hok_minghuitianlai_effect') && target.inRangeOf(player);
							}
						).set("ai", function (target) {
							var player = _status.event.player;
							return get.damageEffect(target, player, player);
						});
					} else {
						player.chooseTarget(
							"对攻击范围内的一名其他角色造成1点伤害",
							function (card, player, target) {
								return target != player && target.inRangeOf(player);
							}
						).set("ai", function (target) {
							var player = _status.event.player;
							return get.damageEffect(target, player, player);
						});
					}
					"step 1";
					if (result.bool) {
						var target = result.targets[0];
						player.line(target, "fire");
						if (target.hasSkill('hok_minghuitianlai_effect')) {
							target.damage(2);
						} else {
							target.damage();
						}
						if (target.hasMark('hok_mingren')) {
							player.recover();
						}
					} else event.finish();
				},
			},
			hok_xingyou: {
				derivation: ['hok_zhuimang', 'hok_xuanji'],
				enable: 'phaseUse',
				usable: 1,
				init(player) {
					player.storage._xuanji = false;
				},
				mark: true,
				intro: {
					name: '行游',
					content(storage, player) {
						if (!player.storage.hok_xingyou) return;
						return '行游记录体力：' + player.storage.hok_xingyou;
					}
				},
				filter(event, player) {
					return player.countCards('h');
				},
				filterCard: lib.filter.cardDiscardable,
				selectCard: 1,
				check(card) {
					var player = _status.event.player;
					if (get.position(card) == 'h' && !player.countCards('h', 'du')) return 1;
					return 6 - get.value(card);
				},
				position: 'h',
				content() {
					'step 0'
					player.discard(cards);
					'step 1'
					if (!player.storage._xuanji) {
						player.storage._xuanji = true;
						player.storage.hok_xingyou = player.hp;
						player.gainMaxHp();
						player.recover();
					} else {
						player.storage._xuanji = false;
						player.loseMaxHp();
						player.draw();
					}
				},
				ai: {
					order: 1,
					result: { player: 1 },
				},
			},
			hok_minghui: {
				derivation: ['hok_minghuitianlai'],
				unique: true,
				mark: true,
				skillAnimation: true,
				animationColor: "water",
				limited: true,
				enable: 'phaseUse',
				filter(event, player) {
					if (player.storage.hok_xingyou && player.storage.hok_xingyou > player.hp) return true;
					return false;
				},
				content() {
					player.awakenSkill("hok_minghui");
					player.recover(player.storage.hok_xingyou - player.hp);
				},
				intro: {
					content: "limited",
				},
				ai: {
					order: 13,
					result: {
						player(player) {
							if (player.hp < 2) {
								return 1;
							}
							return 0;
						}
					},
				},
			},
			hok_minghuitianlai: {
				unique: true,
				mark: true,
				intro: {
					content: "limited",
				},
				skillAnimation: true,
				animationColor: "thunder",
				limited: true,
				enable: 'phaseUse',
				filterTarget(card, player, target) {
					return target != player && target.inRangeOf(player);
				},
				content() {
					player.awakenSkill("hok_minghuitianlai");
					target.addTempSkill('hok_minghuitianlai_effect');
				},
				ai: {
					order: 13,
					result: {
						target(player, target) {
							if (game.hasPlayer((current) => {
								return current != player && current.hasSkill('hok_minghuitianlai_effect') && current.inRangeOf(player);
							})) {
								return -get.damageEffect(target, player, player);
							} else {
								return -get.damageEffect(target, player, player);
							}
						},
					},
				},
				subSkill: {
					effect: {
						charlotte: true,
						mark: true,
						intro: {
							name: '命回·天籁',
							content: '不能使用和打出牌',
						},
						mod: {
							cardEnabled2(card, player) {
								return false;
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
				},
			},
			// 兰陵王
			hok_yinni: {
				derivation: 'hok_yinshen',
				trigger: { player: 'phaseBegin' },
				forced: true,
				locked: false,
				filter(event, player) {
					if (player.countMark('hok_yinshen')) {
						return false;
					}
					return true;
				},
				content() {
					player.addMark('hok_yinshen', 1);
					player.addSkill('hok_yinshen');
				},
				group: 'hok_yinni_effect',
				subSkill: {
					effect: {
						forced: true,
						locked: false,
						trigger: {
							player: 'useCardToPlayered',
						},
						filter(event, player) {
							return event.card.name == 'sha' && player.countMark('hok_yinshen');
						},
						content() {
							trigger.getParent().directHit.add(trigger.target);
						},
					},
				},
			},
			hok_yingshi: {
				enable: 'phaseUse',
				usable: 1,
				filter(event, player) {
					return game.hasPlayer(target => player.canUse({ name: 'sha' }, target, false, true)) && player.getCards('h', 'sha').length > 0;
				},
				filterCard(card) {
					return card.name == 'sha';
				},
				filterTarget(card, player, target) {
					return player.canUse({ name: 'sha', isCard: true }, target, false, true);
				},
				check: (card) => 5.5 - get.value(card),
				prompt: '弃置一张【杀】，视为对场上的一名角色使用一张无距离限制的【杀】，若此【杀】造成伤害，目标角色获得标记“影蚀”，失去一张【闪】',
				content() {
					'step 0'
					game.log(target.getCards('h'))
					player.useCard({ name: 'sha', isCard: true }, target, true);
					'step 1'
					let bool = game.hasPlayer2(function (current) {
						return current.getHistory('damage', function (evt) {
							return evt.getParent('hok_yingshi') == event;
						}).length > 0
					});
					if (bool) {
						target.addMark('hok_yingshi_boom')
						target.addSkill('hok_yingshi_boom')
						var cards = target.getCards('h', function (card) {
							return card.name == 'shan' && lib.filter.cardDiscardable(card, target, 'hok_yingshi');
						});
						if (cards.length > 0) target.discard(cards.randomGet());
					}
				},
				ai: {
					order() {
						return 10;
					},
					result: {
						target(player, target) {
							return get.effect(target, { name: 'sha' }, player, target);
						}
					},
				},
				subSkill: {
					boom: {
						forced: true,
						locked: false,
						marktext: '影蚀',
						intro: {
							name: '影蚀',
							content: '回合结束时，受到1点来自“影蚀”角色的伤害',
						},
						trigger: { player: 'phaseEnd' },
						content() {
							player.storage.source.line(player);
							player.damage(player.storage.source);
							player.removeMark('hok_yingshi_boom');
							player.removeSkill('hok_yingshi_boom');
						},
						init(player) {
							player.storage.source = _status.currentPhase;
						},
					},
				},
			},
			hok_anxi: {
				enable: 'phaseUse',
				unique: true,
				limited: true,
				skillAnimation: true,
				animationColor: 'thunder',
				filter(event, player) {
					return game.hasPlayer(target => player.canUse({ name: 'sha' }, target)) && player.getCards('h', 'sha').length > 0;
				},
				filterCard(card) {
					return card.name == 'sha';
				},
				filterTarget(card, player, target) {
					return player.canUse({ name: 'sha', isCard: true }, target);
				},
				check: (card) => 6 - get.value(card),
				prompt: '弃置一张【杀】，视为对场上的一名角色使用了一张不计入次数的【杀】，此【杀】造成的伤害+1。',
				content() {
					player.awakenSkill('hok_anxi');
					player.useCard({ name: 'sha', isCard: true }, target).set('oncard', card => {
						_status.event.baseDamage = 2;
					});
				},
				ai: {
					order() {
						return get.order({
							name: 'juedou',
							isCard: true,
						}) + 0.1;
					},

					result: {
						target(player, target) {
							return get.effect(target, { name: 'sha' }, player, target);
						}
					},
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
				popup: false,
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
						popup: false,
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
						popup: false,
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
							player.removeSkill('hok_anyue_video');
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
			// 司空震
			hok_tianlei: {
				forced: true,
				zhuSkill: true,
				trigger: { player: 'damageBefore' },
				filter(event) {
					if (event.nature == 'thunder') return true;
				},
				content() {
					trigger.cancel();
				},
				ai: {
					effect: {
						target(card, player, target, current) {
							if (card.name == 'tiesuo') return 0;
							if (get.tag(card, 'thunderDamage')) return 0;
						}
					},
					threaten: 0.5
				},
				group: 'hok_tianlei_shandian',
				subSkill: {
					shandian: {
						forced: true,
						zhuSkill: true,
						trigger: { player: 'phaseBegin' },
						filter(event, player) {
							return player.getCards('j', 'shandian');
						},
						content() {
							let cardRandom = Math.random() * 8;
							let cardSuit = cardRandom < 4 ? 'heart' : 'spade';
							let cardNum = 1 + Math.floor(Math.random() * 13);
							let cardShandian = game.createCard('shandian', cardSuit, cardNum);
							player.chooseUseTarget(cardShandian, true);
						},
					},
				},
			},
			hok_benlei: {
				forced: true,
				trigger: { source: 'damageBefore' },
				content() {
					if (trigger.card.nature == null) {
						game.setNature(trigger, 'thunder');
					}
					if (get.distance(player, trigger.player) <= 1) {
						player.changeHujia(1, null, true);
					}
				},
				group: ['hok_benlei_loseHujia', 'hok_benlei_paoxiao'],
				subSkill: {
					loseHujia: {
						forced: true,
						trigger: { player: 'phaseBegin' },
						filter(event, player) {
							return player.hujia > 0;
						},
						content() {
							player.changeHujia(-player.hujia);
						},
					},
					paoxiao: {
						mod: {
							cardUsable(card, player, num) {
								if (card.name == 'sha') return num + 1;
							}
						},
					},
				},
			},
			hok_leitingwanjun: {
				unique: true,
				limited: true,
				enable: 'phaseUse',
				skillAnimation: true,
				animationColor: 'gray',
				content() {
					player.awakenSkill('hok_leitingwanjun');
					player.addTempSkill('hok_leitingwanjun_effect');
				},
				ai: {
					order: 12,
					result: {
						player(player) {
							if (player.hp == 1) return 1;
							var demages = player.getCards('h').filter(item => get.tag(item, 'damage'));
							if (demages.length < 2) return 0;
							var card = player.getCards('h', 'sha')[0];
							if (!lib.filter.cardEnabled(card, player)) return 0;
							if (!lib.filter.cardUsable(card, player)) return 0;
							if (player.isDamaged() && game.hasPlayer(function (current) {
								return get.damageEffect(current, player, player, 'thunder') > 0;
							})) {
								return 1;
							}
							return 0;
						}
					}
				},
				subSkill: {
					effect: {
						forced: true,
						locked: false,
						trigger: { source: 'damageBegin1' },
						filter(event, player) {
							return event.hasNature('thunder');
						},
						content() {
							trigger.num++;
						},
						group: 'hok_leitingwanjun_effect2',
					},
					effect2: {
						trigger: { source: 'damageSource' },
						forced: true,
						locked: false,
						filter(event, player) {
							return event.num > 0 && event.hasNature('thunder');
						},
						content() {
							if (player.isDamaged()) {
								player.recover(Math.floor(trigger.num / 2));
							}
						},
					}
				},
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
						if (card.name == 'sha' && (card.nature == 'fire' || card.nature == 'thunder')) return true;
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
								|| (card.name == 'sha', card.nature == 'fire');
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
						player.draw(2);
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
				changeSeat: true,
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
					target.chooseToDiscard("h", true);
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
					var cards = target.getCards('h', function (card) {
						return lib.filter.cardDiscardable(card, target, 'hok_shangui');
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
						group: 'hok_bailu_round',
						trigger: { player: 'phaseEnd' },
						forced: true,
						content() {
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
							player.draw(2);
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
					order: 3,
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
							lib.skill.hok_sptongkuang.hok_remove(player, ['renjie', 'kuangbao']);
							break;
						case '狂暴':
							player.addTempSkill('hok_sptongkuang_kuangbao');
							lib.skill.hok_sptongkuang.hok_remove(player, ['tongyu', 'renjie']);
							break;
						default:
							player.addTempSkill('hok_sptongkuang_renjie');
							lib.skill.hok_sptongkuang.hok_remove(player, ['tongyu', 'kuangbao']);
					}
				},
				removeRenjie(player) {
					if (player.hasSkill('pozhu')) {
						player.removeSkill('pozhu');
					}
					if (player.hasSkill('olqingyi')) {
						player.removeSkill('olqingyi');
					}
					if (player.hasSkill('xinfu_zuilun')) {
						player.removeSkill('xinfu_zuilun');
					}
				},
				removeTongyu(player) {
					if (player.hasSkill('reshuishi')) {
						player.removeSkill('reshuishi');
					}
					if (player.hasSkill('lingce')) {
						player.removeSkill('lingce');
					}
					if (player.hasSkill('dinghan')) {
						player.removeSkill('dinghan');
					}
				},
				removeKuangbao(player) {
					if (player.hasSkill('drlt_jieying')) {
						player.removeSkill('drlt_jieying');
					}
					if (player.hasSkill('shencai')) {
						player.removeSkill('shencai');
					}
					if (player.hasSkill('drlt_poxi')) {
						player.removeSkill('drlt_poxi');
					}
				},
				hok_remove(player, arrays) {
					if (arrays.includes('renjie')) {
						lib.skill.hok_sptongkuang.removeRenjie(player);
					}
					if (arrays.includes('tongyu')) {
						lib.skill.hok_sptongkuang.removeTongyu(player);
					}
					if (arrays.includes('kuangbao')) {
						lib.skill.hok_sptongkuang.removeKuangbao(player);
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
				init(player) {
					if (!player.storage.guaList) {
						player.storage.guaList = ['大吉', '中吉', '小吉', '小凶', '中凶', '大凶'];
						player.storage.gua1 = false,
							player.storage.gua2 = false,
							player.storage.gua3 = false,
							player.storage.gua4 = false,
							player.storage.gua5 = false,
							player.storage.gua6 = false;
					}
				},
				content() {
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
					player.popup(str);
					game.log(str);

					if (r < 0.05) {
						// 1
						if (!player.storage.gua6) {
							tar.die();
							trigger.cancel();
						}
					} else if (r < 0.2) {
						// 2
						if (!player.storage.gua5) {
							trigger.num++;
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.5) {
						// 3
						if (!player.storage.gua4) {
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.8) {
						// 4
						if (!player.storage.gua3) {
							tar.draw();
						}
					} else if (r < 0.95) {
						// 5
						if (!player.storage.gua2) {
							trigger.cancel();
							tar.recover(trigger.num);
							tar.draw();
						}
					} else {
						if (!player.storage.gua1) {
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
				},
				mark: true,
				intro: {
					content(storage, player) {
						if (player.storage.gua1 && player.storage.guaList.indexOf('大吉') >= 0) {
							player.storage.guaList.splice(player.storage.guaList.indexOf('大吉'), 1);
						}
						if (player.storage.gua2 && player.storage.guaList.indexOf('中吉') >= 0) {
							player.storage.guaList.splice(player.storage.guaList.indexOf('中吉'), 1);
						}
						if (player.storage.gua3 && player.storage.guaList.indexOf('小吉') >= 0) {
							player.storage.guaList.splice(player.storage.guaList.indexOf('小吉'), 1);
						}
						if (player.storage.gua4 && player.storage.guaList.indexOf('小凶') >= 0) {
							player.storage.guaList.splice(player.storage.guaList.indexOf('小凶'), 1);
						}
						if (player.storage.gua5 && player.storage.guaList.indexOf('中凶') >= 0) {
							player.storage.guaList.splice(player.storage.guaList.indexOf('中凶'), 1);
						}
						if (player.storage.gua6 && player.storage.guaList.indexOf('大凶') >= 0) {
							player.storage.guaList.splice(player.storage.guaList.indexOf('大凶'), 1);
						}
						return '<div class="text center"><span class=thundertext>' + player.storage.guaList + '</span></div>'
					},
				},
			},
			hok_minggua2: {
				forced: true,
				trigger: {
					source: 'damageBegin2',
				},
				content() {
					var r = Math.random();
					var tar = trigger.player;
					var cards = tar.getCards('hej');

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
					player.popup(str);
					game.delay(0.5);
					game.log(str);

					if (r < 0.05) {
						// 1
						if (!player.storage.gua1) {
							tar.die();
							trigger.cancel();
						}
					} else if (r < 0.2) {
						// 2
						if (!player.storage.gua2) {
							trigger.num++;
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.5) {
						// 3
						if (!player.storage.gua3) {
							if (cards.length > 0) {
								tar.discard(cards.randomGet());
							}
						}
					} else if (r < 0.8) {
						// 4
						if (!player.storage.gua4) {
							tar.draw();
						}
					} else if (r < 0.95) {
						// 5
						if (!player.storage.gua5) {
							trigger.cancel();
							tar.recover(trigger.num);
							tar.draw();
						}
					} else {
						if (!player.storage.gua6) {
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
					if (player.storage.gua1 && player.storage.guaList.indexOf('大吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('大吉'), 1);
					}
					if (player.storage.gua2 && player.storage.guaList.indexOf('中吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('中吉'), 1);
					}
					if (player.storage.gua3 && player.storage.guaList.indexOf('小吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('小吉'), 1);
					}
					if (player.storage.gua4 && player.storage.guaList.indexOf('小凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('小凶'), 1);
					}
					if (player.storage.gua5 && player.storage.guaList.indexOf('中凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('中凶'), 1);
					}
					if (player.storage.gua6 && player.storage.guaList.indexOf('大凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('大凶'), 1);
					} else {
						return;
					}
					'step 1'
					player.chooseControl(player.storage.guaList, 'cancel2').set('ai', function (event, player) {
						var goodGua = !player.storage.gua1 + !player.storage.gua2 + !player.storage.gua3;
						var badGua = !player.storage.gua4 + !player.storage.gua5 + !player.storage.gua6;
						if (goodGua <= badGua) {
							if (goodGua == 0) {
								return '取消';
							}
							return player.storage.guaList[0];
						} else {
							if (badGua == 0) {
								return '取消';
							}
							return player.storage.guaList[player.storage.guaList.length - 1];
						}
					});
					'step 2'
					switch (result.control) {
						case '大吉':
							player.storage.gua1 = true;
							break;
						case '中吉':
							player.storage.gua2 = true;
							break;
						case '小吉':
							player.storage.gua3 = true;
							break;
						case '小凶':
							player.storage.gua4 = true;
							break;
						case '中凶':
							player.storage.gua5 = true;
							break;
						case '大凶':
							player.storage.gua6 = true;
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
						var goodGua = (player.storage.gua1 ? 0 : 1) + (player.storage.gua2 ? 0 : 1) + (player.storage.gua3 ? 0 : 1);
						var badGua = (player.storage.gua4 ? 0 : 1) + (player.storage.gua5 ? 0 : 1) + (player.storage.gua6 ? 0 : 1);
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
					target.storage.guaList = player.storage.guaList;
					target.storage.gua1 = player.storage.gua1,
						target.storage.gua2 = player.storage.gua2,
						target.storage.gua3 = player.storage.gua3,
						target.storage.gua4 = player.storage.gua4,
						target.storage.gua5 = player.storage.gua5,
						target.storage.gua6 = player.storage.gua6;
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
						return tar.countMark('hok_biangua2') > 7 && player.storage.guaList.length > 0;
					}
					return false;
				},
				content() {
					'step 0'
					if (player.storage.gua1 && player.storage.guaList.indexOf('大吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('大吉'), 1);
					}
					if (player.storage.gua2 && player.storage.guaList.indexOf('中吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('中吉'), 1);
					}
					if (player.storage.gua3 && player.storage.guaList.indexOf('小吉') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('小吉'), 1);
					}
					if (player.storage.gua4 && player.storage.guaList.indexOf('小凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('小凶'), 1);
					}
					if (player.storage.gua5 && player.storage.guaList.indexOf('中凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('中凶'), 1);
					}
					if (player.storage.gua6 && player.storage.guaList.indexOf('大凶') >= 0) {
						player.storage.guaList.splice(player.storage.guaList.indexOf('大凶'), 1);
					} else {
						return;
					}

					'step 1'
					event.guaTarget = game.filterPlayer(function (target) {
						return target.hasSkill('hok_biangua');
					})[0];
					player.chooseControl(player.storage.guaList, 'cancel2').set('ai', function (event, player) {
						var goodGua = !player.storage.gua1 + !player.storage.gua2 + !player.storage.gua3;
						var badGua = !player.storage.gua4 + !player.storage.gua5 + !player.storage.gua6;
						if (get.attitude(_status.event.player, event.guaTarget) <= 0) {
							if (goodGua == 0) {
								return '取消';
							}
							return player.storage.guaList[0];
						} else {
							if (badGua == 0) {
								return '取消';
							}
							return player.storage.guaList[player.storage.guaList.length - 1];
						}
					});
					'step 2'
					switch (result.control) {
						case '大吉':
							player.storage.gua1 = true;
							break;
						case '中吉':
							player.storage.gua2 = true;
							break;
						case '小吉':
							player.storage.gua3 = true;
							break;
						case '小凶':
							player.storage.gua4 = true;
							break;
						case '中凶':
							player.storage.gua5 = true;
							break;
						case '大凶':
							player.storage.gua6 = true;
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
					return Object.keys(lib.characterPack.MiNikill).filter(i => {
						if (!lib.characterPack.MiNikill[i][4]) return true;
						return !lib.characterPack.MiNikill[i][4].contains('unseen');
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

			// others
			hppxingwu: {
				audio: 2,
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
			},
			hppzhengbing: {
				audio: 1,
			},
			hppqingchuang: {
				audio: 1,
			},
			hpptuodao: {
				audio: 2,
			},
			hppshenglun: {
				audio: 1,
			},
			hppwuchang: {
				audio: 1,
			},
			hppjuezhu: {
				audio: 1,
			},
			hppzjjuxiang: {
				audio: 1,
			},
			hppjinghong: {
				audio: 2,
			},
			hppspluoshen: {
				audio: 2,
			},
			hppmeihun: {
				audio: 2,
			},
			hpphuoxin: {
				audio: 2,
			},
			hppjishi: {
				audio: 2,
			},
			hpptaoxian: {
				audio: 2,
			},
			hppshenzhen: {
				audio: 1,
			},
			hppshenwei: {
				audio: 2,
			},
			hppelai: {
				audio: 2,
			},
			hppquanxue: {
				audio: 1,
			},
			hppdingli: {
				audio: 2,
			},
			hppshuangshu: {
				audio: 2,
			},
			hpppingting: {
				audio: 2,
			},
			hppyizheng: {
				audio: 2,
			},
			hpphuanshu: {
				audio: 2,
			},
			hpphuanhua: {
				audio: 2,
			},
			hpphuanjing: {
				audio: 2,
			},
			// 72变
			hpp72bian: {
				audio: 1,
			},
			// 诗仙
			hppshixian: {
				audio: 2,
			},
			//将进酒
			hppqiangjinjiu: {
				audio: 1,
			},
			//静夜思
			hppjingyesi: {
				audio: 1,
			},
			//侠客行
			hppxiakexing: {
				audio: 1,
			},
			//行路难
			hppxinglunan: {
				audio: 1,
			},
			// 捣药
			hppdaoyao: {
				audio: 2,
			},
			// 奔月
			hppbenyue: {
				audio: 2,
			},
			// 广寒
			hppguanghan: {
				audio: 2,
			},
			// 补天
			hppbutian: {
				audio: 2,
			},
			hpplianshi: {
				audio: 2,
			},
			hpptuantu: {
				audio: 2,
			},
			// 吞星
			hpptunxing: {
				audio: 2,
			},
			// 梦狸
			hppmengli: {
				audio: 2,
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
			// lao_caofang: '#b捞德一评级:3.0',
			lao_caohuan: '#b捞德一评级:3.0',
			// lao_caoyu: '#b捞德一评级:3.5',
			lao_cuishi: '#b捞德一评级:3.3',
			lao_liucong: '#g捞德一评级:2.1',
			lao_tuanxini: '#bUNICRON评级:3.5',
			// lao_tuan: '#b捞德一评级:3.5',
			// lao_xini: '#b捞德一评级:3.0',
			lao_yanxing: '#b捞德一评级:3.7',
			lao_sp_wanglang: '#b捞德一评级:3.7',
			hok_anqila: '#b捞德一评级:3.9',
			hok_ailin: '#b捞德一评级:3.6',
			hok_aoyin: '#r捞德一评级:4.0',
			hok_bailishouyue: '#b捞德一评级:3.7',
			hok_bailixuance: '#b捞德一评级:3.9',
			hok_daji: '#b捞德一评级:3.6',
			hok_dasiming: '#b捞德一评级:3.7',
			hok_donghuangtaiyi: '#b捞德一评级:3.7',
			hok_duoliya: '#b捞德一评级:3.9',
			hok_gaojianli: '#b捞德一评级:3.7',
			hok_hainuo: '#b捞德一评级:3.9',
			hok_lanlingwang: '#b捞德一评级:3.7',
			hok_lixin: '#b捞德一评级:3.8',
			hok_makeboluo: '#b捞德一评级:3.7',
			hok_mingshiyin: '#b捞德一评级:3.8',
			hok_miyue: '#b捞德一评级:3.7',
			hok_sikongzhen: '#b捞德一评级:3.8',
			hok_sunwukong: '#r捞德一评级:4.0',
			hok_wuzetian: '#b捞德一评级:3.8',
			hok_yao: '#b捞德一评级:3.8',
			hok_sp_lixin: '#r捞德一评级:4.0',
			hok_sp_mingshiyin: '#r耀世圣手评级:4.0',
			shen_caozhi: '#r捞德一评级:4.3',
			shen_dongzhuo: '#r捞德一评级:4.2',
			// shen_lusu: '#r捞德一评级:4.4',
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
			// 阎行
			lao_yanxing: '阎行',
			lao_mengjue: '猛决',
			lao_mengjue_info: '游戏开始时，将游戏外1张【决斗】和5张【杀】扣置于你的武将牌上。锁定技，出牌阶段开始时，你令1名角色对你使用一张你的“猛决”牌（选择自己时改为弃置）：若该角色选中【决斗】，其失去全部体力，你弃置所有“猛决”牌并失去该技能；否则，该角色获得此技能。若选择的角色是你，你再执行一次。',
			lao_sudi: '宿敌',
			lao_sudi_info: '限定技，出牌阶段，你可以废除自己的武器栏，然后选择一名体力上限小于等于你的其他角色，令其失去所有技能，然后获得新的“猛决”，你获得锁定技，你可以将一张武器牌当做【杀】使用或打出。',
			lao_duanmao: '断矛',
			lao_duanmao_info: '锁定技，当你成为【杀】的目标后，你摸一张牌，若你的武器栏被废除，你可以对使用者使用一张【杀】（无距离限制，不计入次数限制）。',
			// SP王朗
			lao_sp_wanglang: 'SP王朗',
			lao_yayu: '雅御',
			lao_yayu_info: '回合开始时，你可以和一名其他角色拼点。赢的角色弃置所有手牌，没赢的角色非锁定技失效直到其回合结束并弃置手牌数的一半（向下取整）。',
			lao_shanshi: '善施',
			lao_shanshi_info: '锁定技。摸牌阶段开始时，你可以多摸两张牌。然后摸牌阶段结束时，若你的手牌数大于5，则你将手牌数的一半（向下取整）交给一名手牌最少其他角色并获得如下效果直到你下回合开始：当你成为【杀】或普通锦囊牌的目标后，其可以交给你一张手牌。',
			// 肉鸽
			lao_roguelike: '肉鸽',
			lao_roguelike_skill: '肉鸽',
			lao_roguelike_skill_info: '锁定技，游戏开始时或一名角色进入濒死状态时，你随机获得三张未加入游戏的武将牌，选该武将牌的一项技能获得之，然后减1点体力上限。',

			// 王者公共技
			hok_yinshen: '隐身',
			hok_yinshen_info: '当你拥有此标记时，你不能成为杀和目标数为1的锦囊牌的目标。当你使用或打出【杀】或锦囊牌后，你失去此标记。',
			hok_silie: '撕裂',
			hok_silie_info: '锁定技，当你使用牌时，你弃置一张手牌，否则失去1点体力。',
			hok_temp_hp: '临时体力',
			hok_temp_hp_info: '锁定技，当你受到伤害时，你失去1枚“临时体力”，体力上限-1。当你以其他方式失去“临时体力”时，你失去等量的体力与体力上限。',
			// 安琪拉
			hok_anqila: '王者安琪拉',
			hok_huoqiu: '火球',
			hok_huoqiu_info: '出牌阶段限一次，你可以将1张锦囊牌视为火【杀】使用或打出。你的火【杀】无距离限制且伤害+1。',
			hok_hunhuo: '混火',
			hok_hunhuo_info: '出牌阶段限一次，你选择攻击范围内的一名其他角色进行判定，其弃置X张手牌（X为判定牌点数/5，向下取整）。',
			hok_chihui: '炽辉',
			hok_chihui_info: '出牌阶段限一次，你可以选择一名没有手牌的其他角色，对其造成2次火焰伤害。',
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
			// 敖隐
			hok_aoyin: '王者敖隐',
			hok_zhanghuo: '掌火',
			hok_zhanghuo_info: '每回合限一次，当你使用【杀】指定一名角色为目标后，你令此【杀】改为火【杀】。你的火【杀】伤害+1。',
			hok_siyu: '司雨',
			hok_siyu_info: '每回合限一次，当你使用【杀】指定一名角色为目标后，你令此【杀】改为雷【杀】。你的雷【杀】造成伤害后回复1点体力。',
			hok_jiafeng: '驾风',
			hok_jiafeng_info: '每回合限一次，当你使用【杀】指定一名角色为目标后，你令此【杀】改为冰【杀】。你的冰【杀】不可被响应。',
			hok_qiongxuan: '穷玄',
			hok_qiongxuan_info: '限定技，当你受到伤害时，你可以令你不能成为牌的目标直到你的下个回合开始时，然后获得以下状态直到回合结束时: 1.你的攻击范围+1; 2.【杀】可以额外指定一个目标; 3.使用【杀】的次数+1。',
			// 百里守约
			hok_bailishouyue: '王者百里守约',
			hok_miaozhun: '瞄准',
			hok_miaozhun_info: '锁定技，攻击范围+2。结束阶段，若你本回合没有使用杀或锦囊牌，你获得“隐身”标记。',
			hok_miyan: '谧眼',
			hok_miyan_info: '出牌阶段限一次，你可以选择一名其他角色，令其失去“隐身”标记并弃置1张手牌。',
			hok_kuangju: '狂狙',
			hok_kuangju_info: '出牌阶段开始时，你可以弃置你手牌中X张【杀】，视为使用一张伤害为X的【杀】（不计入次数）。',
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
			hok_huhuo_info: '出牌阶段限一次，当你的“魅心”标记不小于3时，你可以弃置3枚“魅心”标记对攻击范围内的目标随机造成总计至多3点火焰伤害(如果目标大于4改为5点火焰伤害)，你可以减少其中1~3个目标。',
			// 大司命
			hok_dasiming: '王者大司命',
			hok_mingge: '鸣戈',
			hok_mingge_info: '你的攻击范围+1。你的【杀】造成伤害后，目标角色获得标记“鸣戈”直到你的下个回合结束；若你的杀对“鸣戈”标记的角色造成伤害时，其随机弃置两张牌。',
			hok_hungui: '魂归',
			hok_hungui_info: '当你对其他角色造成伤害后，若其体力值为1，你可以直接斩杀之，然后摸2张牌。',
			// 东皇太一
			hok_donghuangtaiyi: '王者东皇太一',
			hok_rishi: '日蚀',
			hok_rishi_info: '准备阶段开始时，若你的“日蚀”标记小于3，你获得1枚“日蚀”标记。结束阶段，若你有“日蚀”标记，你可以摸1张牌（若你的“日蚀”标记数为3，改为摸2张）。',
			hok_duoqi: '堕契',
			hok_duoqi_info: '出牌阶段限一次，若你的“日蚀”标记等于3，你可以选择一名其他角色，对其造成1点伤害，你与其获得“堕契”标记直到你的回合开始前，然后你失去3枚“日蚀”标记。（“堕契”标记：锁定技。你的回合开始时你跳过本回合。你不能使用和打出牌。你非锁定技失效。当另一名“堕契”角色受到伤害后，你受到等量的伤害。）',
			// 朵莉亚
			hok_duoliya: '王者朵莉亚',
			hok_renyu: '人鱼',
			hok_renyu_info: '锁定技，当你受到火属性伤害时，你防止此伤害。',
			hok_huange: '欢歌',
			hok_huange_info: '出牌阶段限一次，你可以选择一名其他角色，令其失去“隐身”标记，若你与其距离为1，其弃置1张手牌。',
			hok_tianlai: '天籁',
			hok_tianlai_info: '出牌阶段开始时，你选择一名角色，令其下一个技能发动后额外结算一次。',
			// 高渐离
			hok_gaojianli: '王者高渐离',
			hok_aige: '哀歌',
			hok_aige_info: '你每使用3张伤害标签的牌，下张【杀】伤害+1。',
			hok_kuangge: '狂歌',
			hok_kuangge_info: '出牌阶段限一次，你可以将1张锦囊牌视为【杀】使用或打出。',
			hok_lige: '离歌',
			hok_lige_info: '出牌阶段限一次，你可以弃置1张防具马，视为使用一张无计入次数限制的火【杀】；然后你可以发动1次“狂歌”。',
			hok_moyin: '魔音',
			hok_moyin_info: '限定技，出牌阶段，你可令你本回合每使用1张伤害标签的牌，你攻击范围内的其他角色需弃置1张手牌，否则流失等量的体力。',
			// 海诺
			hok_hainuo: '王者海诺',
			hok_mingren: '命刃',
			hok_mingren_info: '你造成伤害后，目标角色获得标记“命刃”直到你的下个回合结束。',
			hok_zhuimang: '追芒',
			hok_zhuimang_info: '锁定技，你的攻击范围+2。你使用【杀】时，可以额外指定任意名拥有“命刃”标记的角色。',
			hok_xuanji: '旋击',
			hok_xuanji_info: '出牌阶段，你可以对攻击范围内的一名其他角色造成1点伤害。若其拥有“命刃”标记且因此受到伤害后，你回复1点体力。',
			hok_xingyou: '行游',
			hok_xingyou_info: '出牌阶段限一次，你可以弃置1张手牌，选择：1.将“追芒”切换为“旋击”，记录当前体力值，然后加1点体力上限并恢复1点体力；2.将“旋击”切换为“追芒”，减1点体力上限，然后摸一张牌。',
			hok_minghui: '命回',
			hok_minghui_info: '限定技，出牌阶段，你可以将体力值回复至“行游”记录的体力值。',
			hok_minghuitianlai: '命回·天籁',
			hok_minghuitianlai_info: '限定技，出牌阶段，你可以指定一名其他角色，直到回合结束，你对其使用“旋击”伤害+ 1，其不能使用和打出手牌。',
			// 兰陵王
			hok_lanlingwang: '王者兰陵王',
			hok_yinni: '隐匿',
			hok_yinni_info: '你的回合开始时，若你没有“影身”标记，你可以获得1枚“隐身”标记。若你有“隐身”标记，你使用的【杀】不可被响应。',
			hok_yingshi: '影蚀',
			hok_yingshi_info: '出牌阶段限一次，你可以弃置一张【杀】，视为使用一张无距离限制的【杀】，若此【杀】造成伤害，目标角色获得标记“影蚀”，失去一张【闪】（“影蚀”标记：回合结束时，受到1点来自“影蚀”角色的伤害）。',
			hok_anxi: '暗袭',
			hok_anxi_info: '限定技，出牌阶段限一次，你可以弃置一张【杀】，视为使用一张不计入次数的【杀】，此【杀】造成的伤害+1。',
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
			// 司空震
			hok_sikongzhen: '王者司空震',
			hok_tianlei: '天雷',
			hok_tianlei_info: '锁定技，主公技。你防止即将受到的雷电伤害。你的回合开始时，你使用1张游戏外的【闪电】。',
			hok_benlei: '奔雷',
			hok_benlei_info: '锁定技。你造成的无属性伤害始终为雷属性。每回合可使用的【杀】的次数+1。当你对与你距离为1的角色造成伤害后，你获得1点护甲。你的回合开始时，你失去所有护甲。',
			hok_leitingwanjun: '雷霆万钧',
			hok_leitingwanjun_info: '限定技，本回合你造成的雷属性伤害+1；你每造成2点雷属性伤害，你回复1点体力。',
			// 孙悟空
			hok_sunwukong: '王者孙悟空',
			hok_qitian: '齐天',
			// hok_qitian_fire: '齐天·火',
			// hok_qitian_thunder: '齐天·雷',
			hok_qitian_info: '锁定技，你的属性杀无距离限制，红色锦囊牌可以当做【火杀】，黑色锦囊牌可以当做【雷杀】，你的【火杀】可以当做【闪】。（无色锦囊牌可以当做【刺杀】）',
			hok_shengbang: '圣棒',
			hok_shengbang_info: '锁定技，当你的杀造成伤害时，你可以弃置一张牌进行判定，若为红色，伤害×2（最大为3）；若为黑色，你摸两张牌。',
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
			hok_diwei_info: '出牌阶段限1次，你获得1个标记“曌”，你选择弃置1张手牌然后选择一项：1.选择1名与你座位相邻的角色，令其与同方向下一个角色交换位置并弃置一张牌; 2.直到你的下个回合，你获得技能“飞影”。',
			hok_shaduo: '杀夺',
			hok_shaduo_info: '限定技，出牌阶段，若游戏轮数大于等于4你获得1个标记“曌”，视为你对所有其他角色使用无视距离不计入次数的【杀】，此【杀】命中的目标随机弃置2张牌。',
			hok_nvdi: '女帝',
			hok_nvdi_info: '主公技，结束阶段，若你未于出牌阶段内使用或打出过【杀】和普通锦囊牌，你可以摸X张牌（X为场上存活的群势力角色数）。',
			// 瑶
			hok_yao: '王者瑶',
			hok_shangui: '山鬼',
			hok_shangui_info: '出牌阶段限一次，你可以选择一名其他角色，令其失去“隐身”标记并随机弃置1张手牌。',
			hok_bailu: '白鹿',
			hok_bailu_info: '1.每轮限一次，出牌阶段，若没有角色拥有“白鹿”标记，你可以选择一名其他角色获得“白鹿”标记（获得“白鹿”标记的角色体力上限临时+2并临时回复2点体力，直到该角色累计受到2点伤害，该角色失去此标记，你不可使用此技能直到你的回合结束时）；若有角色拥有“白鹿”标记，你可以摸2张牌令该角色失去“白鹿”标记。2.若有角色拥有“白鹿”标记，你不能成为除【桃】以外牌的目标，你不能使用杀和锦囊牌。',

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
				(大、中、小概率分别为：5% 15% 30%)',
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
			else if (happy.translate[i].indexOf('SP') == 0) happy.translate[i + '_prefix'] = 'SP';
			else if (happy.translate[i].indexOf('王者SP') == 0) happy.translate[i + '_prefix'] = '王者SP';
			else if (happy.translate[i].indexOf('王者') == 0) happy.translate[i + '_prefix'] = '王者';
			else if (happy.translate[i].indexOf('欢杀界') == 0) happy.translate[i + '_prefix'] = '欢杀界';
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
	lib.namePrefix.set('欢杀界', {
		getSpan: (prefix, name) => `${get.prefixSpan('欢杀')}${get.prefixSpan('界')}`,
	});
	return happy;
});
