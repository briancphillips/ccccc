export function Timer(callbacks, step) {
  var last = 0,
    acc = 0,
    tick = 0,
    inc = step || 1 / 60,
    frameId;
  window.step = inc;

  function onFrame(time) {
    if (last !== null) {
      acc = acc + (time - last) / 1000;
      while (acc > inc) {
        callbacks.update(inc, tick);
        tick = tick + 1;
        acc = acc - inc;
      }
    }

    last = time;

    //console.log(last)
    callbacks.render();
    frameId = requestAnimationFrame(onFrame);
  }

  function start() {
    last = null;
    frameId = requestAnimationFrame(onFrame);
  }

  function stop() {
    cancelAnimationFrame(frameId);
  }

  return {
    start: start,
    stop: stop,
  };
}

//module.exports = Timer;
