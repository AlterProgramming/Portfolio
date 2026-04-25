'use strict';

exports.port = 8000;
exports.bindaddress = '0.0.0.0';
exports.serverid = 'showdown';
exports.servername = 'Alter Showdown';
exports.lazysockets = false;
exports.proxyip = [
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
];

exports.routes = {
  root: 'jakpakoun.com',
  client: 'battle.jakpakoun.com',
  dex: 'dex.pokemonshowdown.com',
  replays: 'replay.pokemonshowdown.com',
};

exports.crashguard = true;
exports.reportjoins = false;
exports.nofswriting = false;
exports.watchconfig = false;
exports.logchallenges = false;
exports.logchat = false;
