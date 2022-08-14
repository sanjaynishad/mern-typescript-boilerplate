export function getUrlQueryString(data = {}) {
    const params = new URLSearchParams(data);
    return params.toString();
}

export function getUrlQueryObject() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

export function generateHash(obj: any) {
    const str = JSON.stringify(obj);
    let hash = 0;
    let i
    let chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        /* tslint:disable:no-bitwise */
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
        /* tslint:enable:no-bitwise */
    }

    return hash;
}
