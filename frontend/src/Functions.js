export function genKey() {
    // if(!window.keys) window.keys = [];
    // return window.keys.push(Math.max(...window.keys) + 1);
    return Math.floor(Math.random() * 999999);
}