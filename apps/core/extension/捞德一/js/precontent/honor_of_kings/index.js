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
	const honor_of_kings = {
		name: 'honor_of_kings',
		connect: true,
		connectBanned: [],
		character: { ...characters },
		characterSort: {
			honor_of_kings: characterSort,
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
	for (let i in honor_of_kings.character) {
		if (Array.isArray(honor_of_kings.character[i])) honor_of_kings.character[i] = get.convertedCharacter(honor_of_kings.character[i]);
		honor_of_kings.character[i].trashBin ??= [];
		if (_status['extension_捞德一_files']) {
			const files = _status['extension_捞德一_files'];
			if (files.image.character.files.includes(`${i}.jpg`)) honor_of_kings.character[i].img = `extension/捞德一/image/character/${i}.jpg`;
			else {
				const skin = honor_of_kings.character[i].trashBin.find(str => str.startsWith('character:'))?.split(':')[1];
				if (skin && files.image.character.files.includes(`${skin}.jpg`)) honor_of_kings.character[i].img = `extension/捞德一/image/character/${skin}.jpg`;
			}
		}
		// if (!honor_of_kings.character[i][4]) honor_of_kings.character[i][4] = [];
		if (honor_of_kings.translate[i]) {
			if (honor_of_kings.translate[i].indexOf('王者SP') == 0) honor_of_kings.translate[i + '_prefix'] = '王者SP';
			else if (honor_of_kings.translate[i].indexOf('王者') == 0) honor_of_kings.translate[i + '_prefix'] = '王者';
		}
		// honor_of_kings.character[i][4].push(((lib.device || lib.node) ? 'ext:' : 'db:extension-') + '捞德一/image/character/' + i + '.jpg');
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
	lib.translate['honor_of_kings_character_config'] = '<span style="font-family: xingkai">王者荣耀</span>';
	return honor_of_kings;
}
export default packs;
