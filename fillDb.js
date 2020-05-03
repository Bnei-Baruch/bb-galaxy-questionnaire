
const api = require('./server/data').api;

const sleep = m => new Promise(r => setTimeout(r, m))

const init = async ()=>{

    await api({
        url: 'http://localhost:2500/api/reset',
        method: 'post'
    })

    


    for (let i=1; i<2000;i++){
        let vote = Math.floor(Math.random() * 3) + 1  
        if (vote == 3) vote=2;

        await api({
            url: 'http://localhost:2500/api/answer/'+vote,
            method: 'post', 
            data: {
                userId: `U-${i}`
            }
        })
        console.log(`${i} answer ${vote} success`);
    }

    for (let i=1; i<1000;i++){
        await api({
            url: 'http://localhost:2500/api/answer/1',
            method: 'post', 
            data: {
                userId: `U1-${i}`
            }
        })
        console.log(`U1-${i} answer 1 success`);
    }

    for (let i=1; i<1500;i++){
        await api({
            url: 'http://localhost:2500/api/answer/2',
            method: 'post', 
            data: {
                userId: `U2-${i}`
            }
        })
        console.log(`U2-${i} answer 2 success`);
    }

};

init();

