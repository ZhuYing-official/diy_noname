import { lib, game, ui, get, ai, _status } from '../../../../../noname.js';

const characterFilters = {
    shen_diaochan(mode) {
        return mode == 'identity' || mode == 'doudizhu' || mode == 'single' || (mode == 'versus' && _status.mode != 'standard' && _status.mode != 'three');
    },
};

export default characterFilters;
