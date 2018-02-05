var tableHelper;
var tableElement;
var selectedId;
var edit = false;

$(document).ready(function () {
    console.log("Airplanes document ready")

    // Load DataTable with data format.
    tableElement = $('#airportsTable');
    tableHelper =  new DataTableHelper(tableElement, {
        bLengthChange: false,
        rowId: 'id',
        columns: [
           { "data": "name"},
           { "data": "totalAirplanes" }
        ]
    });

    updateTable();

    $('#create').on('click', function(event) {
        $('#airportModal .modal-title').html('Creating an airport');
        $('#airportModal').modal('show');
    });
    $('#edit').on('click', function(event) {
        edit = true;
        var airport = tableHelper.getSelectedRowData();
        console.log(airport)
        setFormData(airport);
        $('#airportModal .modal-title').html('Editing ' + airport.name);
        $('#airportModal').modal('show');
    });
    $('#remove').on('click', function(event) {
        var airport = tableHelper.getSelectedRowData();
        bootboxConfirm("Are you sure you want to delete this guest?", function(result){
             if (result == true){
                 removeAirport(airport, function() {
                     toastr.success('Removed "' + airport.name + '" from Airports!');
                     updateTable();
                 },
                 handleError);
             }
             else{
                 $('#modal').modal('toggle');
             }
         });
    });
    $('#airportForm').submit(function(event) {
        event.preventDefault();
        $('#airportModal').modal('hide');
        if (edit) {
            handleEditFormSubmit();
        } else {
            handleCreateFormSubmit();
        }
    });
})

function handleCreateFormSubmit() {
    var data = getFormData();
    createAirport(data, function(result) {
        toastr.success('Added "' + data.id + '" to Airplanes!');
        $('#airportForm').get(0).reset();
        updateTable();
    }, handleError);
}

function handleEditFormSubmit() {
    var airport = tableHelper.getSelectedRowData();
    var data = getFormData();
    _.extend(airport, data);
    editAirport(airport, function(result) {
        toastr.success('Edited "' + data.id + ' ' + data.name + '"');
        $('#airportForm').get(0).reset();
        updateTable();
        edit = false;
    }, handleError);
}
function handleError(error) {
    toastr.error(JSON.parse(error.responseText).message);
    console.log(error);
};

function createAirport(airport, successCallback, errorCallback) {
    console.log("Creating airport..")
    ajaxJsonCall('POST', '/api/airports/create', airport, successCallback, errorCallback);
}

function editAirport(airport, successCallback, errorCallback) {
    console.log("Editing airport..")
    ajaxJsonCall('POST', '/api/airports/edit', airport, successCallback, errorCallback);
}

function removeAirport(airport, successCallback, errorCallback) {
    console.log("Removing airport..")
    ajaxJsonCall('DELETE', '/api/airports/delete/' + airport.id, null, successCallback, errorCallback);
}

function getFormData() {
    return {
        name : $("#name").val(),
        type : $("#total-of-airports").val()
    };
}

function setFormData(airport) {
    $('#name').val(airport.name);
    $('#total-of-airports').val(airport.totalAirplanes);
}

function updateTable() {
    console.log("Updating table..");

    $('button.controls').prop('disabled', selectedId === undefined);
    ajaxJsonCall('GET', '/api/airports/', null, function(airports) {
      tableHelper.dataTable.clear();
      tableHelper.dataTable.rows.add(airports);
      tableHelper.dataTable.columns.adjust().draw();
    });
}