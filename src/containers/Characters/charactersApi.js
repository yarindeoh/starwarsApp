import Configuration from 'services/configutation';
import { get } from 'services/restUtilsSaga';

function baseUrl(path) {
    const restPrefix = Configuration.get('apiPrefix');
    return `${restPrefix}/${path}`;
}

const Api = {
    getAllCharacters: (url) => {
        return get(`${url}`);
    },
    getSearchedCharacters: (querySearch) => {
        return get(baseUrl(`people/?search=${querySearch}`));
    }
};

export default Api;
