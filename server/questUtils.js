const pushToClient = require('./socketUtils').pushToClient;

let ans = {};
const RESET_TIMER = 1000*40;

const reset = () => {
    for (const ansId in ans) {
        for (const userId in ans[ansId]) {
            clearTimeout(ans[ansId][userId]);
        }
    }
    console.log('reset');
    ans = {};
}

const vote = (ansId, userId) => {
    if (!ans[ansId]) ans[ansId] = {};
    else clearTimeout(ans[ansId][userId]);
    ans[ansId][userId] = setTimeout(()=>delete ans[ansId][userId], RESET_TIMER);
}

const getResults = () => {
    let res = {};
    for (const ansId in ans) {
        res[ansId] = Object.keys(ans[ansId]).length;
    }
    console.log('get results', res)
    pushToClient({type: 'updateVoting', data: res});
    return res;
}

setInterval(()=>getResults(), 500);

module.exports = {
    getResults, reset, vote
}