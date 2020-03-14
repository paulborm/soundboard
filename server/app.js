var express = require("express");

var app = express();

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// catch 404 and respond
app.use(function(req, res, next) {
  res.status(404).send('Error 404: Nothing to see here!');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
