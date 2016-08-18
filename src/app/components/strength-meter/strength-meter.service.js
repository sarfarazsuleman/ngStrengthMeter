(function(ng){
  'use strict';

  ng.module('ngStrengthMeter').service('StrengthMeterService',StrengthMeterService);

  /**
   * Strength Meter Service
   * @ngInject
   * @return {Object} PublicAPI Contract
   */
  function StrengthMeterService() {
    //Public API Contract Object
    var publicApi = {
      getStrength:getStrength
    };

    return publicApi;

    ///////////////////

    /**
     * Get the strength of the password on a 1-4 scale
     * @param  {String} password
     * @return {Integer}
     */
    function getStrength(password) {
      //Return lowest strength if null
      if(password === null) {
        return 1;
      }

      var counter = _makeCounter(password);

      var hash = _makeHash(counter);

      return _calcStrength(password, hash, counter);
    }

    /**
     * Analyze the password and create appropriate counters
     * @param  {String} password
     * @return {Object} Counter Object
     */
    function _makeCounter(password) {
      //Counter Variables
      var counter = {
        lowerAlphaCount:0,
        upperAlphaCount:0,
        alphaCount:0,
        numCount:0,
        symbCount:0,
      };

      //Current Character Holder
      var currChar;

      //Inspect each character and increment correct
      //Counter variable based on char type
      for (var i=0; i<password.length; i++) {
        currChar = password.charCodeAt(i);

        if (currChar >= 97 && currChar <= 122) { //ASCII Lower Alpha Range
          counter.lowerAlphaCount++;
          counter.alphaCount++;
        } else if (currChar >= 65 && currChar <= 90) { //ASCII Upper Alpha Range
          counter.upperAlphaCount++;
          counter.alphaCount++;
        } else if (currChar >= 48 && currChar <= 57) { //ASCII Numeric Range
          counter.numCount++;
        } else {
          counter.symbCount++;
        }
      }

      return counter;
    }

    /**
     * Create a Hash String to be analyzed by the strength calculator
     * @param  {Object} counter
     * @return {String} Hash String
     */
    function _makeHash(counter) {
      var hash = "";

      hash += (counter.alphaCount >= 2)?"2":(counter.alphaCount === 0)?"0":"1";
      hash += (counter.lowerAlphaCount >= 2)?"2":(counter.lowerAlphaCount === 0)?"0":"1";
      hash += (counter.upperAlphaCount >= 2)?"2":(counter.upperAlphaCount === 0)?"0":"1";
      hash += (counter.numCount >= 2)?"2":(counter.numCount === 0)?"0":"1";
      hash += (counter.symbCount >= 2)?"2":(counter.symbCount === 0)?"0":"1";

      return hash;
    }

    /**
     * Calculate the correct strenght based on
     * password, hash and counter
     * @param  {String} password
     * @param  {String} hash
     * @param  {Object} counter
     * @return {Integer}
     */
    function _calcStrength(password, hash, counter) {

      //Excellent Strength Hashes
      var excellent = [
        '22222', //At least 2 lower, 2 upper, 2 num & 2 symb
        '21222', //At least 1 lower, 2 upper, 2 num & 2 symb
        '22122', //At least 2 lower, 1 upper, 2 num & 2 symb
        '21221', //At least 1 lower, 2 upper, 2 num & 1 symb
        '22121', //At least 2 lower, 1 upper, 2 num & 1 symb
        '22221', //At least 2 lower, 2 upper, 2 num & 1 symb
        '21122', //At least 1 lower, 1 upper, 2 num & 2 symb
        '22212', //At least 2 lower, 2 upper, 1 num & 2 symb
        '22112', //At least 2 lower, 1 upper, 1 num & 2 symb
        '21212', //At least 1 lower, 2 upper, 1 num & 2 symb
      ];

      //Good Strength Hashes
      var good = [
        '21111', //At least 1 lower, 1 upper, 1 num & 1 symb
        '21112', //At least 1 lower, 1 upper, 1 num & 2 symb
        '21121', //At least 1 lower, 1 upper, 2 num & 1 symb
        '21211', //At least 1 lower, 2 upper, 1 num & 1 symb
        '22111', //At least 2 lower, 1 upper, 1 num & 1 symb
        '22211', //At least 2 lower, 2 upper, 1 num & 1 symb
      ];

      //Determine Hash Strength
      if (password.length >= 8 && excellent.indexOf(hash) !== -1) {
        return 4;
      } else if(password.length >= 8 && good.indexOf(hash) !== -1) {
        return 3;
      } else if (counter.alphaCount >= 2 || counter.numCount === 1) {
        return 2;
      } else {
        return 1;
      }
    }
  }
})(angular);