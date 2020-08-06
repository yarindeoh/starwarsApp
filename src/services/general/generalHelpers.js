export const convertArrObjToMap = (arr, property) => {
    const keyValueArr = arr.map((item) => {
        return [item.url, property ? item[property] : item];
    });
    return new Map(keyValueArr);
};

export const validateURLRequest = (str) => {
    let pattern = new RegExp(
        /https?:\/\/(.+?\.)?swapi\.dev\/api(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/
    );
    return !!pattern.test(str);
};
