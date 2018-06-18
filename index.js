$( function() {

  // Set up our Audio Context
  var context = new AudioContext();
  window.context = context;

  // here's where we'll store our sample once it's loaded.
  var sampleBuffer = null;

  var loadCount = 0
  var allLoaded = false
  var sampleBuffers = []

  //Audio array

  const pathsToLoad = [
    '/sound/getting-off-bus.mp3',
    '/sound/higgs.mp3',
    
  ]
  // Promise for audio loading

  const promises = pathsToLoad.map(path => makeRequest('GET', path).then(r =>  context.decodeAudioData(r)))

  Promise.all(promises).then(rs => { sampleBuffers = rs })



  // Jquery UI to play Audio
  $('#play-sample-1').on('click', () => play(0))
  $('#play-sample-2').on('click', () => play(1))

  // Play audio function
  const play = bufferIndex => {
    console.log(sampleBuffers)
    if (sampleBuffers[bufferIndex]) {
      var source = context.createBufferSource();
      // set its buffer to our sampleBuffer
      source.buffer = sampleBuffers[bufferIndex];
      console.log(source)

      // now we can treat it like any audio node
      source.connect(context.destination);
      source.start(0);
    }
  }



});

// Abstraction of Audio input
function makeRequest (method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}


