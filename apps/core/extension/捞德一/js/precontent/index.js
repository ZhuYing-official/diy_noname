import { lib, game, ui, get, ai, _status } from '../../../../noname.js';
import happy from './happy/index.js';
import honor_of_kings from './honor_of_kings/index.js';
import honor_of_kings_cards from './honor_of_kings/cards.js';
import black_myth_wukong from './black_myth_wukong/index.js';

export async function precontent(捞德一) {
    // 存储捞德一扩展的文件和文件夹分布
    _status['extension_捞德一_files'] = await(async () => {
        const getFileList = async function (path = 'extension/捞德一') {
            const [folders, files] = await game.promises.getFileList(path);
            const map = { files };
            if (Array.isArray(folders) && folders.length > 0) {
                for (const folder of folders) map[folder] = await getFileList(`${path}/${folder}`);
            }
            return map;
        };
        return await getFileList();
    })();

    //武将包和卡包
    if (捞德一.enable) {
        //--------------------武将包--------------------//
        // 捞德一
        game.import('character', happy);
        //王者荣耀
        game.import('character', honor_of_kings);
        // 黑神话：悟空
        game.import('character', black_myth_wukong);
        //--------------------卡牌包--------------------//
        // 王者荣耀
        game.import('card', honor_of_kings_cards);
    }

}