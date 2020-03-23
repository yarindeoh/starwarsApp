export const convertArrObjToMap = (arr, property) => {
    const keyValueArr = arr.map((item) => {
        return [item.url, item[property]];
    });
    return new Map(keyValueArr);
};

export const validateURLRequest = (str) => {
    let pattern = new RegExp(
        /https?:\/\/(.+?\.)?swapi\.co\/api(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?/
    );
    return !!pattern.test(str);
};

export const validateURLParam = (item) => {
  
};
