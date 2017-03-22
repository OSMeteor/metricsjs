var Meter = require('./meter'),
    Histogram = require('./histogram'),
    ExponentiallyDecayingSample = require('../stats/exponentially_decaying_sample');

/*
*  Basically a timer tracks the rate of events and histograms the durations
*/
var Timer = module.exports = function Timer() {
  this.meter = new Meter();
  this.histogram = new Histogram(new ExponentiallyDecayingSample(1028, 0.015));
  this.clear();
  this.type = 'timer';
}

Timer.prototype.update = function(duration) {
  this.histogram.update(duration);
  this.meter.mark();
}
Timer.prototype.updateInit = function(duration,rate) {
  // this.histogram.update(duration);
  this.histogram.sample.values.content=duration.sample.values.content;
  this.histogram.min = duration.min;
  this.histogram.max = duration.max;;
  this.histogram.sum =duration.sum;
  // this.histogram.variance =duration.variance;
  // this.histogram.mean =duration.mean;
  // this.histogram.std_dev =duration.std_dev;
  this.histogram.varianceM = duration.variance;
  this.histogram.varianceS = duration.variance;
  this.histogram.count = duration.count;
  this.histogram.median =duration.median;
   // this.meter.startTime = (new Date(1997,0,0)).getTime();
    // this.meter.count = rate.count-1;
    //  this.meter.m1Rate.uncounted = rate.count;
    // this.meter.mark(rate.count);
  // this.meter.m1Rate.currentRate = rate.m1*1000;
  // this.meter.m1Rate.uncounted = rate.m1;
  // this.meter.m1Rate.currentRate = rate.m1;
  // this.meter.m5Rate.currentRate = rate.m5*1000;
  // this.meter.m15Rate.currentRate = rate.m15*1000;
  // this.meter.mark(this.meter.count);
  // this.meter.m5 = rate.m5;
  // this.meter.m15 = rate.m15;
  // this.meter.mean = rate.mean
  //  this.meter.mark(this.meter.count);
  // this.meter.mark(rate.count);
  // this.meter.m1Rate = rate.m1;
  // this.meter.m5Rate = rate.m5;
  // this.meter.m15Rate = rate.m15;
  // this.meter.count = rate.count;;
  // this.meter.startTime = (new Date).getTime();

}

// delegate these to histogram
Timer.prototype.clear = function() { return this.histogram.clear(); }
Timer.prototype.count = function() { return this.histogram.count; }
Timer.prototype.min = function() { return this.histogram.min; }
Timer.prototype.max = function() { return this.histogram.max; }
Timer.prototype.mean = function() { return this.histogram.mean(); }
Timer.prototype.stdDev = function() { return this.histogram.stdDev(); }
Timer.prototype.percentiles = function(percentiles) { return this.histogram.percentiles(percentiles); }
Timer.prototype.values = function() { return this.histogram.values(); }

// delegate these to meter
Timer.prototype.oneMinuteRate = function() { return this.meter.oneMinuteRate(); }
Timer.prototype.fiveMinuteRate = function() { return this.meter.fiveMinuteRate(); }
Timer.prototype.fifteenMinuteRate = function() { return this.meter.fifteenMinuteRate(); }
Timer.prototype.meanRate = function() { return this.meter.meanRate(); }
Timer.prototype.tick = function() { this.meter.tick(); } // primarily for testing
Timer.prototype.rates = function() { return this.meter.rates(); }
Timer.prototype.printObj = function() {
  return {type: 'timer'
      , duration: this.histogram.printObj()
      , rate: this.meter.printObj()};
}
Timer.prototype.printInsideObj = function() {
  return {type: 'timer'
    , duration: this.histogram.printInsideObj()
    , rate: this.meter.printInsideObj()};
}
