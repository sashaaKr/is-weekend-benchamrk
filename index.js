const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const moment = require('moment');
const { DateTime } = require('luxon');

function momentRunner() {
  const now = moment();
  if (now.isoWeekday() == 6 || now.isoWeekday() == 7) {}
}

function luxonRunner() {
  const weekday = DateTime.local().weekday;

  if (weekday == 6 || weekday == 7) {}
}

function dateRunner() {
  const dt = new Date();

  if (dt.getDay() == 6 || dt.getDay() == 0) {}
}

suite
  .add('js', dateRunner)
  .add('luxon', luxonRunner)
  .add('moment', momentRunner)
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ 'async': true });
