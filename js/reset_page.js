'use strict';

(function () {
  window.resetPage = function () {
    var noticeForm = document.querySelector('.ad-form');
    var noticeFormFields = noticeForm.querySelectorAll('fieldset');
    var noticeFilterForm = document.querySelector('.map__filters');
    var noticeFilters = noticeFilterForm.querySelectorAll('select, fieldset');
    window.pageDefault.setFieldsDisabled(noticeFormFields);
    window.pageDefault.setFieldsDisabled(noticeFilters);
    window.pageDefault.deactivate();
  };
})();
