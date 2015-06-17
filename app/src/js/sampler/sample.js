var sample = {

  source: [],
  contexts: [],
  buff: {},

  delay: [],
  feedback: [],
  volume: [],

  // Default BPM
  bpm: 0,

  isRandomOneSituation: false,

  /**
   * Get folder name
   *
   * @param {Integer} pad num
   * @return {String} folder name
   */
  getFolderName: function(num) {
    "use strict";

    var $pad = $('.pad');

    return $pad.eq(num).data('folder');
  },

  /**
   * Get how many samples in sample folder
   *
   * @param {Integer} folder num
   * @return {Integer} samples in folder
   */
  getSamplesInFolder: function(num) {
    "use strict";

    var folder = this.getFolderName(num);

    return samples[folder];
  },

  /**
   * Set random sample
   *
   * @param {Integer} max files in folder
   */
  setRandomSample: function(max) {
    "use strict";

    return (Math.random() * (max - 1) + 1).toFixed(0);
  },

  /**
   * Set sample
   */
  setSample: function(i) {
    "use strict";

    var sampleNum = i + 1,
      req = [],
      folderName = '',
      maxSamplesInFolder = 0,
      randomSample = 0;

    folderName = sample.getFolderName(i);
    maxSamplesInFolder = sample.getSamplesInFolder(i);
    randomSample = sample.setRandomSample(maxSamplesInFolder);

    req[i] = new XMLHttpRequest();
    req[i].soundName = sampleNum;
    req[i].open('GET', 'assets/sounds/' + folderName + '/' + randomSample + '.mp3', true);
    req[i].responseType = 'arraybuffer';

    req[i].addEventListener('load', function(e) {
      sample.setBuffer(e, sampleNum);
    }, false);

    req[i].send();
  },

  /**
   * Set all samples
   */
  setAllSamples: function() {
    "use strict";

    $('.pad').each(function(i) {
      sample.setSample(i);
    });
  },

  /**
   * Set buffer
   *
   * @param {Object} Request
   * @param {Integer} Number of context
   */
  setBuffer: function(e, i) {
    "use strict";

    var req = e.target;

    sample.buff[req.soundName] = sample.contexts[i].createBuffer(req.response, false);
  },

  /**
   * Set audio options
   *
   * @param {Integer} Number of array
   */
  setOptions: function(n) {
    "use strict";

    var
      vol = this.contexts[n].createGainNode(),

      index = 0,

      // Effects
      delay = 0,
      feedback = 0,
      volume = 0.9,
      repeat = 0,

      // Current pad delay attribute
      padDelay = $('.pads .pad').eq(n - 1).attr('data-delay'),

      // Current pad repeat attribute
      padRepeat = $('.pads .pad').eq(n - 1).attr('data-repeat'),

      // Current pad volume attribute
      padVolume = $('.pads .pad').eq(n - 1).attr('data-volume');

    // Set volume if attribute true
    if (padVolume === 'true') {
      volume = +$('.setVolume').val();
    }

    // Set volume
    vol.gain.value = volume;


    // Set delay effect if attribute true
    if (padDelay === 'true') {
      delay = +$('.setDelay').val();
      feedback = +$('.setDelayFeedback').val();

      // Create delay line effect for each context
      this.delay[n] = this.contexts[n].createDelay();
      this.delay[n].delayTime.value = delay;

      // Create feedback for delay
      this.feedback[n] = this.contexts[n].createGain();
      this.feedback[n].gain.value = feedback;

      this.delay[n].connect(this.feedback[n]);

      this.feedback[n].connect(this.delay[n]);
      this.feedback[n].connect(vol);

      this.source[n] = this.contexts[n].createBufferSource();
      this.source[n].buffer = this.buff[n];

      this.source[n].connect(this.delay[n]);
    } else {
      this.source[n] = this.contexts[n].createBufferSource();
      this.source[n].buffer = this.buff[n];
    }

    // Set volume if attribute true
    if (padRepeat === 'true') {
      repeat = +$('.setVolume').val();
    }

    this.source[n].connect(vol);

    vol.connect(this.contexts[n].destination);
  },

  repeatModeOn: function() {
    $('.pads .pad').each(function() {
      if ($(this).attr('data-repeat') === 'true') {
        // Current pad num
        pad = $(this).index() + 1;
        // Play
        sample.play(pad);
        // Repeat
        sample.repeat();
      }
    });
  },

  repeatTimer: 0,
  repeat: function() {
    "use strict";

    // Set bpm
    var bpm = 60 / this.bpm * 1000;

    // console.log(bpm)
    this.repeatTimer = setTimeout(function() {
      // Clear timer
      clearTimeout(sample.repeatTimer);
      // Repeat sample/s or not
      sample.repeatModeOn();

    }, bpm);
  },

  /**
   * Play audio
   *
   * @param {Integer} pad num
   */
  play: function(n) {
    "use strict";

    setTimeout(function() {
      sample.setOptions(n);
      sample.source[n].noteOn(0);
    }, 10);
  },

  /**
   * Shuffle sample on the pad
   *
   * @param {Integer} pad num
   */
  randomOnePad: function(n) {
    "use strict";

    this.setSample(n - 1);

    setTimeout(function() {
      sample.play(n);
    }, 700);
  },

  /**
   * Create WebkitAudioContext
   *
   * @param {Integer} Number of array
   */
  createAudioContexts: function(i) {
    "use strict";

    sample.contexts[i + 1] = new webkitAudioContext();
  },

  init: (function() {
    "use strict";

    $(document).ready(function() {

      $('.pad').each(function(i) {
        sample.createAudioContexts(i);
      });

      sample.setAllSamples();
      sample.repeat();

    });
  }())
};
