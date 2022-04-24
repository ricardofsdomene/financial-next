app.post("/translate", (req, res) => {
  //wait for new .wav to be in file place
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    file = req.files[0];

    buffer = file.buffer;

    var wstream = fs.createWriteStream("audiofile.wav");
    wstream.write(buffer);

    wstream.end();
    pathToFile = "path/audiofile.wav";

    setTimeout(() => {
      main().then(() => {
        console.log("response to send back" + translatedText);
        res.send(translatedText);
      });
    }, 500);
  });
});
