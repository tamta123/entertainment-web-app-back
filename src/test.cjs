var Connection = require("tedious").Connection;
var config = {
  server: "108.181.197.184,10052", //update me
  authentication: {
    type: "default",
    options: {
      userName: "tamta", //update me
      password: "Tasia1234@!", //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: "fitness", //update me
  },
};
var connection = new Connection(config);
connection.on("connect", function (err) {
  if (err) {
    console.error("Error connecting to database:", err.message);
    return;
  }
  console.log("Connected");
  executeStatement();
});

function executeStatement() {
  var request = new Request("SELECT * FROM dbo.BLOG;", function (err) {
    if (err) {
      console.log(err);
    }
  });

  request.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
      } else {
        console.log(column.value);
      }
    });
  });

  request.on("done", function (rowCount, more) {
    console.log(rowCount + " rows returned");
    connection.close();
  });

  connection.execSql(request);
}

connection.connect();

var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

function executeStatement() {
  var request = new Request("SELECT * FROM dbo.BLOG;", function (err) {
    if (err) {
      console.log(err);
    }
  });
  var result = "";
  request.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
      } else {
        result += column.value + " ";
      }
    });
    console.log(result);
    result = "";
  });

  request.on("done", function (rowCount, more) {
    console.log(rowCount + " rows returned");
  });

  // Close the connection after the final event emitted by the request, after the callback passes
  request.on("requestCompleted", function (rowCount, more) {
    connection.close();
  });
  connection.execSql(request);
}
