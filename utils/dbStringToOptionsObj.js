/*
assuming input = "mysql://root:trilogy@localhost:3306/avant_db"
output = 
{
  host: "localhost",
  port: 3306,
  user: "root",
  password: "trilogy",
  database: "avant_db"
}
*/
module.exports = function dbStringToOptionsObj(str) {
  var protocol;
  var username;
  var password;
  var host;
  var port;
  var schema;

  var split = str.split("://");
  protocol = split[0];

  // everything after the protocol
  var remainder = split[1];

  // get username
  var endOfUsername = remainder.indexOf(":");
  username = remainder.substring(0, endOfUsername);

  // everything after the username. +1 to get rid of colon
  remainder = remainder.substring(username.length + 1, remainder.length);
  split = remainder.split("@");
  password = split[0];
  remainder = split[1];
  split = remainder.split(":");
  host = split[0];
  remainder = split[1];
  split = remainder.split("/");
  port = split[0];
  schema = split[1];

  return {
    protocol: protocol,
    host: host,
    port: port,
    user: username,
    password: password,
    database: schema
  };
};
