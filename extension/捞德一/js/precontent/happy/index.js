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
	const happy = {
		name: 'happy',
		connect: true,
		connectBanned: [],
		character: { ...characters },
		characterSort: {
			happy: characterSort,
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
	for (var i in happy.character) {
		// if (!happy.character[i][4]) happy.character[i][4] = [];
		if (happy.translate[i]) {
			if (happy.translate[i].indexOf('神') == 0) happy.translate[i + '_prefix'] = '神';
			else if (happy.translate[i].indexOf('SP') == 0) happy.translate[i + '_prefix'] = 'SP';
		}
		// happy.character[i][4].push(((lib.device || lib.node) ? 'ext:' : 'db:extension-') + '捞德一/image/character/' + i + '.jpg');
	}
	lib.translate['happy_character_config'] = '<span style="font-family: xingkai">捞德一</span>';
	return happy;
}
export default packs;
