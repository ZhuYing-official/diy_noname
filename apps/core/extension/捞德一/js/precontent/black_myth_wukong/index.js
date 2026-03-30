import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';
import characters from './character.js';
import cards from './card.js';
import pinyins from './pinyin.js';
import skills from './skill.js';
import translates from './translate.js';
import characterIntros from './intro.js';
import characterTitles from './characterTitles.js';
import characterFilters from './characterFilter.js';
import characterReplaces from './characterReplace.js';
import dynamicTranslates from './dynamicTranslate.js';
import perfectPairs from './perfectPairs.js';
import voices from './voices.js';
import { characterSort, characterSortTranslate } from './sort.js';

const packs = function () {
	lib.skill._playAudio = {
		charlotte: true,
		ruleSkill: true,
		forceDie: true,
		trigger: { player: 'phaseBegin' },
		filter(event, player) {
			return player.name.startsWith('wukong_');
		},
		direct: true,
		firstDo: true,
		priority: Infinity,
		content() {
			if (lib.config.background_audio) {
				'step 0'
				game.saveConfig('extension_捞德一_bgm', lib.config.background_music);
				game.saveConfig('background_music', 'ext:捞德一/audio/effect/wukong_bgm01.mp3');
				'step 1'
				game.playBackgroundMusic();
			}
		},
	};
	lib.skill._playDefaultAudio = {
		charlotte: true,
		ruleSkill: true,
		forceDie: true,
		trigger: { player: 'phaseBegin' },
		filter(event, player) {
			return !player.name.startsWith('wukong_') && lib.config.background_music == 'ext:捞德一/audio/effect/wukong_bgm01.mp3';
		},
		direct: true,
		firstDo: true,
		priority: Infinity,
		content() {
			try {
				if (lib.config.extension_捞德一_bgm) {
					game.saveConfig('background_music', lib.config.extension_捞德一_bgm);
				} else {
					game.saveConfig('background_music', 'music_default');
				}
				game.playBackgroundMusic();
			} catch (e) {
				alert(e.message)
			}
		},
	};

	const black_myth_wukong = {
		name: 'black_myth_wukong',
		connect: true,
		connectBanned: [],
		character: { ...characters },
		characterSort: {
			black_myth_wukong: characterSort,
		},
		characterFilter: { ...characterFilters },
		characterTitle: { ...characterTitles },
		dynamicTranslate: { ...dynamicTranslates },
		characterIntro: { ...characterIntros },
		characterReplace: { ...characterReplaces },
		card: { ...cards },
		skill: { ...skills },
		perfectPair: { ...perfectPairs },
		translate: { ...translates, ...voices, ...characterSortTranslate },
		pinyins: { ...pinyins },
	};
	for (var i in black_myth_wukong.character) {
		if (Array.isArray(black_myth_wukong.character[i])) black_myth_wukong.character[i] = get.convertedCharacter(black_myth_wukong.character[i]);
		if (_status['extension_捞德一_files']) {
			const files = _status['extension_捞德一_files'];
			if (files.image.character.files.includes(`${i}.jpg`)) black_myth_wukong.character[i].img = `extension/捞德一/image/character/${i}.jpg`;
		}
		if (black_myth_wukong.translate[i]) {
			if (black_myth_wukong.translate[i].indexOf('神') == 0) black_myth_wukong.translate[i + '_prefix'] = '神';
			else if (black_myth_wukong.translate[i].indexOf('SP') == 0) black_myth_wukong.translate[i + '_prefix'] = 'SP';
			else if (black_myth_wukong.translate[i].indexOf('黑猴：') == 0) black_myth_wukong.translate[i + '_prefix'] = '黑猴：';
		}
	}
	lib.namePrefix.set('黑猴：', {
		color: 'black',
		nature: 'qunmm',
		showName: '黑',
	})
	lib.translate['black_myth_wukong_character_config'] = `<span style='font-family: xingkai;font-size: 20px;'>黑神话: 悟空</span>`;
	return black_myth_wukong;
}
export default packs;
