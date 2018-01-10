var viewModel = function () {
    var self = this;

    self.fieldMetadata = ko.observableArray([]);
    self.searchCriteria = ko.observableArray([]);
    self.searchResults = ko.observableArray([]);
    self.errors = ko.observableArray([]);
    self.selectedPageSize = ko.observable(15);
    self.selectedPageIndex = ko.observable(0);
    self.SearchResultCount = ko.observable(0);
    self.isWorking = ko.observable(false);
    self.destinationCity = ko.observable();
    self.fixedSearchCriteria = ko.observableArray([]);
    self.fixedFieldMetadata = ko.observableArray([]);
    self.minTripStartDate = ko.observable();
    self.maxTripStartDate = ko.observable();

    self.starRatingIsSet = ko.observable(false);
    self.rate1 = ko.observable(false);
    self.rate2 = ko.observable(false);
    self.rate3 = ko.observable(false);
    self.rate4 = ko.observable(false);
    self.rate5 = ko.observable(false);
   
 ///////////////////////////////////Subscribing starRating observables to auto select range between min and max selected starRating //////////////
    self.rate5.subscribe(function (value) {

        if (value) {
            if (self.rate3())
            {
                self.rate4(true);
            };
            if (self.rate2())
            {
                self.rate3(true);
                self.rate4(true);
            };
            if (self.rate1())
            {
                self.rate4(true);
                self.rate3(true);
                self.rate2(true);
            };
        }
    });
    self.rate3.subscribe(function (value) {

        if (value) {
            if (self.rate5())
            {
                self.rate4(true);
            }
            if (self.rate1()) {
                self.rate2(true);
               
            }
           
        }
    });
    self.rate4.subscribe(function (value) {

        if (value) {
            if (self.rate2()) {
                self.rate3(true);
            }
            if (self.rate1()) {
                self.rate2(true);
                self.rate3(true);
            }

        }
    });
    self.rate2.subscribe(function (value) {

        if (value) {
            if (self.rate5())
            {
                self.rate3(true);
                self.rate4(true);
            }
            if (self.rate4()) {
              
                self.rate3(true);
            }

        }
    });
    self.rate1.subscribe(function (value) {

        if (value) {
            if (self.rate5()) {
                self.rate2(true);
                self.rate3(true);
                self.rate4(true);
            }
            if (self.rate4()) {
                self.rate2(true);
                self.rate3(true);
            }
            if (self.rate3()) {
                self.rate2(true);
               
            }
        }
    });

///////////////////////////////////////////////Adding and removing dynamic search lines////////////////////////////////////////////////////////////
    self.addNewSearchLine = function () {
        self.errors.removeAll();
        self.searchCriteria.push(new searchLine());
    };
    self.removeSearchLine = function (item) {
        self.errors.removeAll();
        self.searchCriteria.remove(item);
    };
///////////////////////////////////////////////ValidateSearchCriteria  ,PrepareSearchInput ,and Search functions////////////////////////////////////

    self.prepareSearchInput = function () {
        var searchInput = {
            SearchLines: [],
            PageSize: 10,
            PageIndex: 0
        };
        self.fixedSearchCriteria.removeAll();
        self.searchResults.removeAll();
     
         self.fixedSearchCriteria.push({ selectedField: { fieldName: 'destinationName', fieldDesc: '', fieldType: 1 }, selectedOperator: 'Eq', searchValue: self.destinationCity() });
        
        if (self.minTripStartDate()) {
            self.fixedSearchCriteria.push({ selectedField: { fieldName: 'minTripStartDate', fieldDesc: '', fieldType: 2 }, selectedOperator: 'Eq', searchValue: self.minTripStartDate() });
        }
        if (self.maxTripStartDate()) {
            self.fixedSearchCriteria.push({ selectedField: { fieldName: 'maxTripStartDate', fieldDesc: '', fieldType: 2 }, selectedOperator: 'Eq', searchValue: self.maxTripStartDate() });
        }
      
        var propertyClassValues = "";
        
        if (self.rate1()) {
            propertyClassValues ="1," ;
          
        }
        if (self.rate2()) {
            propertyClassValues = propertyClassValues + "2,"  ;

        }
        if (self.rate3()) {
            propertyClassValues = propertyClassValues + "3,";

        }
        if (self.rate4()) {
            propertyClassValues = propertyClassValues + "4," ;

        }
        if (self.rate5()) {
            propertyClassValues = propertyClassValues + "5," ;
        }
        var lastIndexOfSeparator = propertyClassValues.lastIndexOf(",");
        propertyClassValues = propertyClassValues.substring(0, lastIndexOfSeparator);
        var starsArray = propertyClassValues.split(",");
        if (propertyClassValues) { self.starRatingIsSet(true); }

        if (self.starRatingIsSet()) {
            self.fixedSearchCriteria.push({ selectedField: { fieldName: 'minStarRating', fieldDesc: '', fieldType: 1 }, selectedOperator: 'Eq', searchValue: Math.min.apply(null, starsArray) });
            self.fixedSearchCriteria.push({ selectedField: { fieldName: 'maxStarRating', fieldDesc: '', fieldType: 1 }, selectedOperator: 'Eq', searchValue: Math.max.apply(null, starsArray) });
        }
       
        ///////////////////////////////////////////////////////////////
        for (var i in self.searchCriteria()) {
            searchInput.SearchLines.push(self.searchCriteria()[i]);
        }
        for (var i in self.fixedSearchCriteria()) {
            searchInput.SearchLines.push(self.fixedSearchCriteria()[i]);
        }
      
        return searchInput;
    };
    self.validateSearchCriteria = function ()
    {
        if (self.fixedSearchCriteria().length === 0) { self.errors.push({ message: "Please enter your destination in the field below." }); }
        else {
            for (var i in self.fixedSearchCriteria()) {
                if (self.fixedSearchCriteria()[i].selectedField.fieldName === "destinationName") {
                    if (!self.fixedSearchCriteria()[i].searchValue) {
                        self.errors.push({ message: "Please enter your destination in the field below." });
                    }

                }

            };

        }


        for (var i in self.searchCriteria()) {
            if (!self.searchCriteria()[i].selectedField()) { self.errors.push({ message: "Select a field to search." }); }
            if (!self.searchCriteria()[i].selectedOperator()) { self.errors.push({ message: "Select an operator to search." }); }
            if (!self.searchCriteria()[i].searchValue()) { self.errors.push({ message: "Enter a value to search." }); }
        };

    };
    self.search = function () {
        var searchInputArray = self.prepareSearchInput();
        self.errors.removeAll();
        self.selectedPageIndex(0);
        
        self.validateSearchCriteria();
        
        if (self.errors().length === 0) {


            $.ajax({
                url: 'api/hoteloffers/search',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(searchInputArray),
                success: function (data) {
                  
                    self.searchResults.removeAll();
                    self.SearchResultCount(data.RecordCount);
                    self.maxindex2 = ko.computed(function () {
                        return Math.ceil(self.SearchResultCount() / self.selectedPageSize()) - 1;
                    });
                    self.maxIndex(self.maxindex2());
                    //$.each(data.OffersResult.Hotel, function () {
                    //    var item = this;
                    //    var uri_dec = decodeURIComponent(item.hotelUrls.hotelInfositeUrl);
                    //    item.hotelUrls.hotelInfositeUrl = uri_dec;
                       
                    //    self.searchResults.push(item);
                    //});
                    self.searchResults(data.OffersResult.Hotel);
                }
            }).fail(
                function (xhr, textStatus, err) {
                    self.errors.push({ message: xhr.responseJSON.Message });
                });

        };

    };

  
    /* Paging */

    self.selectedPageSize.subscribe(function (value) {

        if (value) {
            self.pageSize = ko.observable(value);
            self.maxindex = ko.computed(function () {
                return Math.ceil(self.SearchResultCount() / value) - 1;
            });
            self.maxIndex(self.maxindex());
        }
    });


    self.pageSize = ko.observable(self.selectedPageSize());
    self.pageIndex = ko.observable(0);


    self.maxPageIndex = ko.computed(function () {
        return Math.ceil(self.SearchResultCount() / self.selectedPageSize()) - 1;
    });

    self.maxIndex = ko.observable(self.maxPageIndex());
    self.previousPage = function () {
        if (self.selectedPageIndex() > 0) {
            self.selectedPageIndex(self.selectedPageIndex() - 1);
            self.search();
        }
    };

    self.nextPage = function () {
        if (self.selectedPageIndex() < self.maxIndex()) {
            self.selectedPageIndex(self.selectedPageIndex() + 1);
            self.search();
        }
    };

    self.allPages = ko.computed(function () {
        var pages = [];
        for (i = 0; i <= self.maxIndex(); i++) {
            pages.push({ pageNumber: (i + 1) });
        }
        return pages;
    });

    self.moveToPage = function (index) {
        self.selectedPageIndex(index);
        self.search();
    };

};

var searchLine = function () {
    //dynamic search line
    var self = this;
    self.selectedField = ko.observable();
    self.availableOperators = ko.observableArray([]);
    self.selectedOperator = ko.observable();
    self.searchValue = ko.observable();
    self.searchValue2 = ko.observable();
    self.fieldTemplate = ko.observable();
  


    var combinedSubscriber = function (selField, selOperator) {
        if (selField && 'fieldType' in selField) {

            if (selField.fieldType == 0) {
                self.fieldTemplate("numberValueTemplate");
            }
            else if (selField.fieldType == 1) {
                self.fieldTemplate("stringValueTemplate");
            }
            else if (selField.fieldType == 2) {
                self.fieldTemplate("dateValueTemplate");
            }
          
        }
        self.searchValue(null);
        self.searchValue2(null);
    };

    self.selectedField.subscribe(function (value) {
        combinedSubscriber(value, self.selectedOperator());
    });

    self.selectedOperator.subscribe(function (value) {
        combinedSubscriber(self.selectedField(), value);
    });

    self.selectedField.subscribe(function (value) {
        self.availableOperators.removeAll();
        if (value && 'fieldType' in value) {
            if (value.fieldType == 0) {
                self.availableOperators.push("Eq");
              
            }
            else if (value.fieldType == 1) {
                self.availableOperators.push("Eq");
                self.availableOperators.push("Contains");
                self.availableOperators.push("StartsWith");
            }
            else if (value.fieldType == 2) {
                self.availableOperators.push("Eq");
          
            }
          
        }
    });

};


$(function () {

    var _vm = new viewModel();

    _vm.fieldMetadata.push({ fieldName: "lengthOfStay", fieldDesc: "Length Of Stay", fieldType: 0 });
    _vm.fieldMetadata.push({ fieldName: "minGuestRating", fieldDesc: "Guest Rating (min)", fieldType: 0 });
    _vm.fieldMetadata.push({ fieldName: "maxGuestRating", fieldDesc: "Guest Rating (max)", fieldType: 0 });
    _vm.fieldMetadata.push({ fieldName: "minTotalRate", fieldDesc: "Total Rate (min)", fieldType: 0 });
    _vm.fieldMetadata.push({ fieldName: "maxTotalRate", fieldDesc: "Total Rate (max)", fieldType: 0 });

 
    $(document).ajaxSend(function (event, jqxhr, settings, exception) {
        _vm.errors.removeAll();
        _vm.isWorking(true);
    });

    $(document).ajaxComplete(function (event, jqxhr, settings, exception) {
        _vm.isWorking(false);
    });
      
    ko.applyBindings(_vm);

});
