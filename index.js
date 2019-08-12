const app = require("express")();

const options = {};
options.root = process.cwd();

var sendFiles = function(res, files) {
  res.sendFile(files.shift(), options, function(err) {
    if (err) {
      console.log(err);
      console.log(files);
      if(files.length === 0) {
        res.status(err.status).end();
      } else {
        sendFiles(res, files)
      }
    } else {
      console.log("Image Sent");
    }
  });
};

app.get("/getPictures", function(req, res, next) {
  const files = [
    "file-does-not-exist.jpg",
    "file-does-not-exist-also.jpg",
    "file-exists.jpg",
    "file-does-not-exist.jpg"
  ];

  sendFiles(res, files);

});

app.listen(8080);
