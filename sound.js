var sound = new Howl({
  src: ['sound/getting-off-bus.mp3', 'sound/higgs/mp3'],
});
// Play returns a unique Sound ID that can be passed
// into any method on Howl to control that specific sound.
var id1 = sound.play();
var id2 = sound.play();

// Fade out the first sound and speed up the second.
sound.fade(1, 0, 10000, id1);
sound.fade(0,1, 10000, id2);

console.log(id1);
console.log(id2);