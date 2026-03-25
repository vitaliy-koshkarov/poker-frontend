const brokerURL = "ws://localhost:8080/ws/game";
const brokerDestinationPrefix = "topic";
const currentDestination = "gameTable"; // TODO: rename to something more appropriate
const appDestinationPrefix = "kv-poker-game";
const publishMessageName = "table" // TODO: rename to something more appropriate

const playerActionPath = '/' + appDestinationPrefix + '/' + publishMessageName;

export {brokerURL, brokerDestinationPrefix, currentDestination, appDestinationPrefix, publishMessageName, playerActionPath};