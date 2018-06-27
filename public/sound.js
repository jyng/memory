
window.onload = function(e) {
      //Track Library
      thisTrackNum = 0;
      playlistUrls = [
        //1//
        // ["/sound/2p.mp3",
        // "/sound/lobby.wav",
        // "/sound/airport.mp3",
        // "/sound/3m.mp3",
        // "/sound/party.wav",
        // "/sound/school.mp3",
        // "/sound/bus-begin.wav"],
        //debug
         ["/sound/sin.wav"],
        //2//
        // ["/sound/bus-on.wav",
        // "/sound/plow.mp3",
        // "/sound/21.mp3",
        // "/sound/55.mp3",
        // "/sound/office.mp3",
        // "/sound/park.wav"],
        // debug
        ["/sound/tri.wav"],
        //3//
        // ["/sound/21.mp3",
        // "/sound/3bus.mp3",
        // "/sound/3m.mp3",
        // "/sound/3bus2.mp3",
        // "/sound/3bus3.mp3",
        // "/sound/plow.mp3"],
        // debug
        ["/sound/saw.wav"],
        //4//
        // ["/sound/4d.mp3",
        // "/sound/4dd.ogg",
        // "/sound/song.mp3",
        // "/sound/faye.mp3",
        // "/sound/4dd.ogg",
        // "/sound/waves.mp3"],
        // debug
        ["/sound/sqr.wav"],
      ]
      currentTime = false
      crossFadeStartPoints = []
      startPointPercentage = 0.7
      currentTrackDuration = 0
      timeAfterStartPoint = 0
      timeBeforeStartPoint = 0
      currentTime = 0;
      // var sensor = 0;
      var r;



// DEFINITIONS
    // build up hb:
    // const hb = playlistUrls.map((track, index) => {
    //   return new Howl({
    //     src: [playlistUrls[index]],
    //     onplay: () => currentTrackDuration = hb[thisTrackNum].duration(),
    //     onend: () => updateOnTrackEnd() ,
    //     buffer: true,
    //   })
    // })



    //Randomizer array
    const randMap = (subArray) => {
      const randomIndex = randInt(subArray.length - 1)
      const randomSelection = subArray[randomIndex]
      return randomSelection
    }
    const randInt = (maximumNumber) => {
      return Math.floor(Math.random() * maximumNumber)
    }
    const randomItems = playlistUrls.map((subArray) => {
      return randMap(subArray)
    })
    //add random items into howler bank
    const hb = randomItems.map((track, index) => {
      return new Howl({
        src: randomItems[index],
        onplay: () => currentTrackDuration = hb[thisTrackNum].duration(),
        onend: () => updateOnTrackEnd() ,
        buffer: true,
        })
    });
    // Check if track has started
    var trackStarted = false;
    // var range = 4 < r < 100;
    var socket = io.connect(window.location.origin);
    socket.on('data',function(data) {
      r = data;
      console.log(r);
      if (!trackStarted && r > 9 && r < 15) {
      console.log( "I started")

      // log that track has started
      trackStarted = true;
      setTimeout(() => {
        updateTrackCrossfade();
        hb[thisTrackNum].play();
        setInterval(() => {
          if (isInBounds(thisTrackNum, hb)) {
            currentTime = hb[thisTrackNum].seek();
            progressAfterStartPointInDec = (currentTime - timeBeforeStartPoint) / timeAfterStartPoint
            console.log('vol B:', hb[thisTrackNum+1].volume(), 'vol A:', hb[thisTrackNum].volume())
            if ( currentTime > timeBeforeStartPoint ) {
              if (!hb[thisTrackNum + 1].playing()) {
                hb[thisTrackNum + 1].volume(0);
                hb[thisTrackNum + 1].play();
              }
              crossFade(progressAfterStartPointInDec, thisTrackNum)
              crossFade(1 - progressAfterStartPointInDec, thisTrackNum + 1);
            }
          }
        }, 50); //set interval end
      }, 1000)
    }

    });

  //
  // else {
  //
  // }




    const updateTrackCrossfade = () => {
      currentTrackDuration = hb[thisTrackNum].duration()
      timeAfterStartPoint = currentTrackDuration * (1 - startPointPercentage) // 10s * 0.1 = 9%
      timeBeforeStartPoint = currentTrackDuration - timeAfterStartPoint
    }

    const isInBounds = (idx, arr) => idx < arr.length - 1




// FUNCTIONS

    const crossFade = (percent, pIndex) => {
      var newVal = Math.cos(percent * 0.5*Math.PI)
      // console.log(pIndex, 'minus:', newVal, 'percent:', percent)
      hb[pIndex].volume(newVal)
    }


    const updateOnTrackEnd = () => {
      // Track num has been updated
      if (isInBounds(thisTrackNum, hb)) {
        thisTrackNum = thisTrackNum + 1
        updateTrackCrossfade()
        console.log(thisTrackNum);

      } else {
        console.log("i'm done");
        setTimeout(function () {
          location.reload();
        }, 40 * 1000);
          // window.location.reload(false)
        // console.log(trackStarted);
      }
      //
      // hb[thisTrackNum].volume(0);
      // hb[thisTrackNum].play();
    }

}
