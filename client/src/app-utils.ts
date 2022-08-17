
export function isRunningOnLocalhost() {
    return window.location.hostname === "localhost"
        || window.location.hostname === "127.0.0.1";
}

export function getUrlQueryString(data = {}) {
    const params = new URLSearchParams(data);
    return params.toString();
}

export function getUrlQueryObject() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

export function generateHash(obj: any) {
    const str = JSON.stringify(obj);
    var hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }

    return hash;
}

export function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
