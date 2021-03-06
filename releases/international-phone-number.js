// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  angular.module("internationalPhoneNumber", []).directive('internationalPhoneNumber', function($timeout) {
    return {
      restrict: 'A',
      require: '^ngModel',
      scope: true,
      link: function(scope, element, attrs, ctrl) {
        var handleWhatsSupposedToBeAnArray, options, read;
        read = function() {
          return ctrl.$setViewValue(element.val());
        };
        handleWhatsSupposedToBeAnArray = function(value) {
          if (typeof value === "object") {
            return value;
          } else {
            return value.toString().replace(/[ ]/g, '').split(',');
          }
        };
        options = {
          autoFormat: true,
          autoHideDialCode: true,
          defaultCountry: '',
          nationalMode: false,
          numberType: '',
          onlyCountries: void 0,
          preferredCountries: ['us', 'gb'],
          responsiveDropdown: false,
          utilsScript: "",
          keepModelClean: false,
          formatModelWithSpace: false
        };
        angular.forEach(options, function(value, key) {
          var option;
          option = eval("attrs." + key);
          if (angular.isDefined(option)) {
            if (key === 'preferredCountries') {
              return options.preferredCountries = handleWhatsSupposedToBeAnArray(option);
            } else if (key === 'onlyCountries') {
              return options.onlyCountries = handleWhatsSupposedToBeAnArray(option);
            } else if (typeof value === "boolean") {
              return options[key] = option === "true";
            } else {
              return options[key] = option;
            }
          }
        });
        $timeout(function() {
          var newNumber, selectedCountryData;
          element.intlTelInput(options);
          if (options.nationalMode) {
            selectedCountryData = element.intlTelInput('getSelectedCountryData');
            if (!selectedCountryData) {
              return true;
            }
            newNumber = element.val().replace(new RegExp("\\+" + selectedCountryData.dialCode), 0);
            return element.intlTelInput('setNumber', newNumber);
          }
        });
        if (!options.utilsScript) {
          element.intlTelInput('loadUtils', 'bower_components/intl-tel-input/lib/libphonenumber/build/utils.js');
        }
        ctrl.$parsers.push(function(value) {
          var cleanNumber, prefixLength, selectedCountryData;
          if (!value) {
            return value;
          }
          if (options.keepModelClean) {
            return element.intlTelInput('getCleanNumber');
          } else if (options.formatModelWithSpace) {
            selectedCountryData = element.intlTelInput("getSelectedCountryData");
            cleanNumber = element.intlTelInput("getCleanNumber");
            prefixLength = selectedCountryData.dialCode.length + 1;
            return cleanNumber.substring(0, prefixLength) + ' ' + cleanNumber.substring(prefixLength);
          } else {
            return value.replace(/[^\d]/g, '');
          }
        });
        ctrl.$parsers.push(function(value) {
          if (value) {
            ctrl.$setValidity('international-phone-number', element.intlTelInput("isValidNumber"));
          } else {
            value = '';
            ctrl.$setValidity('international-phone-number', true);
          }
          return value;
        });
        element.on('blur keyup change', function(event) {
          return scope.$apply(read);
        });
        return element.on('$destroy', function() {
          return element.off('blur keyup change');
        });
      }
    };
  });

}).call(this);
