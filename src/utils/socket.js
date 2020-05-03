
import io from 'socket.io-client';
import {fillResults} from 'actions/result';
let socket;

export const connectSocket = (dispatch, getState) => {
    console.log('connecting socket...');
    socket = io(window.location.origin.indexOf('localhost') !== -1 ? 'http://localhost:2500' : window.location.origin);

    socket.on('connect', () => {
        console.log('socket connect');
    });

    socket.on('pushFromServer', async data => {
        console.log('push from server', data);

        switch (data.type) {
            case 'updateVoting':
                console.log('update voting socket recieved');
                dispatch(fillResults(data.data));
                break;
            default:
        }
    });

    socket.on('disconnect', function () {
        console.log('socket DISCONNECT');
    });
}

export const pushToServer = data => {
    socket.emit('pushFromClient', data);
}