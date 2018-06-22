
window.onload = function(e) {
pCount = 0;
howlerBank = []
playlistUrls = [
  ["/sound/bus-begin.wav", "/sound/3bus2.mp3", "/sound/3bus3.mp3", "/sound/3m.mp3"],
  ["/sound/bus-on.wav", "/sound/21.mp3", "/sound/55.mp3", "/sound/office.mp3"],
  ["/sound/3m.mp3", "/sound/4d.mp3", "/sound/faye.mp3", "/sound/song.mp3"],
  ["/sound/home.mp3", "/sound/faye.mp3", "/sound/office.mp3", "/sound/plow.mp3"],
]
// DEFINITIONS

const mapFunc = (subArray) => {
  const randomIndex = randInt(subArray.length - 1)
  const randomSelection = subArray[randomIndex]
  return randomSelection
}

const randInt = (max) => {
  return Math.floor(Math.random() * max)
}

//EXPRESSIONS
const randomItems = playlistUrls.map((subArray) => {
  return mapFunc(subArray)
})

randomItems.forEach(function(current, i) {
  howlerBank.push(new Howl({
    src: randomItems[i],
    onend: onEnd,
    buffer: true,
    }))
});

howlerBank[pCount].play();
  // playing i+1 audio (= chaining audio files)
var onEnd = function(e) {
  // if (loop === true ) { pCount = (pCount + 1 !== howlerBank.length)? pCount + 1 : 0; }
  pCount = pCount + 1;
  howlerBank[pCount].play();
}
// console.log(randomItems)



}
