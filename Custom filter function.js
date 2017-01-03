/*
Custom filter function

Neptune v.4.0 og UI5 v.1.32.7.
https://sapui5.hana.ondemand.com/1.32.7/#docs/api/symbols/sap.ui.model.Filter.html
*/
function filterProductList(searchData, tab) {

    var filters = [];
    var binding = tab.getBinding('items');

    if (searchData.SEARCH) {

        // replace * with space
        var value = searchData.SEARCH.replace(/\*/g, ' ');
        var valueTab = value.split(' ');
        var searchTab = [];

        $.each(valueTab, function(i, value) {
            if (value) {
                searchTab.push(value.toUpperCase().replace(/\W/g, '')); //Remove all non alphanumeric characters from string
            }
        });

        // Define filter. Path is the fieldd to be filtered, test is the custom filter function
        var filter = new sap.ui.model.Filter({

            path: 'SEARCH',
            test: function(dbRecord) {

                var found = true;

                $.each(searchTab, function(i, search) {

                    if (dbRecord.indexOf(search) < 0) {
                        found = false;
                    }
                });
                return found;
            }
        });
        filters.push(filter);
    }
    if (searchData.MATKL) {
        filters.push(
            new sap.ui.model.Filter('MATKL', sap.ui.model.FilterOperator.StartsWith, searchData.MATKL)
        );
    }

    binding.filter(filters);
}
/*
Neptune v.3.1 SP01 og UI5 v.1.26.3.
https://sapui5.hana.ondemand.com/1.26.3/#docs/api/symbols/sap.ui.model.Filter.html
 
Gamle måten. De 2 siste parameterne som er definert i filteret må med ('EQ' & true), men brukes ikke i filterfunksjonen som overskrives etterpå. Det er litt irriterende å lese syns jeg:
*/
var binding = myTab.getBinding('items');
var filters = [];
var filter = new sap.ui.model.Filter('VALUE', 'EQ', true);
filter.fnTest: function(value) {
  var found = false;
  $.each(myOtherTab, function(i, data) {
  if (data.VALUE === value) {
  found = true;
  return false;
  }
  });
  return found;
};
filters.push(filter);