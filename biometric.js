// biometricService.js
const ZKJUBAER = require('zk-jubaer');

async function runMachine() {
  let obj = new ZKJUBAER('192.168.1.106', 4370, 5200, 5000);
  try {
    await obj.createSocket();
    const logs = await obj.getAttendances();
    console.log(logs);
    await obj.disconnect();
  } catch (e) {
    console.log(e);
  }
}

module.exports = { runMachine };
