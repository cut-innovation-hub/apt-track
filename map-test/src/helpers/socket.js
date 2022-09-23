import io from 'socket.io-client'
export const sokcetUrl = 'https://cut-buses.herokuapp.com/'

export const socket = io(sokcetUrl, {
    transports: ['websockets'],
    forceNew: true
})