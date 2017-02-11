const WAMP_SERVER = require('wamp-server');
const {Connection, Session} = require('autobahn');

const realm = 'com.kyivjs.realm';

const SERVER = new WAMP_SERVER({
  port: 8080,
  realms: realm
});

const connection = new Connection({
    realm: realm,
    url: `ws://127.0.0.1:8080/`
});

connection.onopen = session => {
    session.register(
        'com.kyivjs.question',
        data => {
            if (data[0] === 'What is the answer to the Ultimate Question of Life, the Universe, and Everything?') {
                return '42'
            }
        }
    );
};

connection.open();
