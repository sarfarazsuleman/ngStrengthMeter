(function(ng){
  'use strict';

  ng.module('ngStrengthMeter').directive('strengthMeter', strengthMeter);

  /**
   * Strength Meter Directive Object
   * @param  {String} TEMPLATE_PREFIX
   * @param  {Service} StrengthMeterService
   * @return {Directive}
   *
   * @ngInject
   */
  function strengthMeter(TEMPLATE_PREFIX, StrengthMeterService) {
    //Directive Contract
    var directive = {
      link: link,
      templateUrl: TEMPLATE_PREFIX + 'app/components/strength-meter/strength-meter.html',
      restrict: 'E',
      scope: {
        password: '@'
      }
    };

    //Return Directive
    return directive;

    //////////////////////

    /**
     * Directive Link Function
     * @param  {Object} scope Scope Object
     * @param  {Object} el    Element
     * @param  {Object} attr  Attributes
     */
    function link(scope, el, attr){
      //Watch for password change, then calculate strength
      scope.$watch('password', function _getStrength(){
        scope.strength = StrengthMeterService.getStrength(scope.password);
      });

    }
  }
})(angular);