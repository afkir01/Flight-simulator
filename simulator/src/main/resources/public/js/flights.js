var tableHelper;
var tableElement;
var selectedId;
var edit = false;

$(document).ready(function () {
    console.log("Flights document ready")

    // Load DataTable with data format.
    tableElement = $('#flightsTable');
    tableHelper =  new DataTableHelper(tableElement, {
        bLengthChange: false,
        rowId: 'id',
        columns: [
           { "data": "flightNumber"},
           { "data": "flightOrigin" },
           { "data": "flightDestination" }
        ]
    });

    updateTable();

    $('#create').on('click', function(event) {
        $('#flightModal .modal-title').html('Creating an flight');
        $('#flightModal').modal('show');
        console.log("Opening the Modal!!");
    });
    $('#edit').on('click', function(event) {
        edit = true;
        var flight = tableHelper.getSelectedRowData();
        console.log(flight)
        setFormData(flight);
        $('#flightModal .modal-title').html('Editing ' + flight.number);
        $('#flightModal').modal('show');
    });
     $('#remove').on('click', function(event) {
         var flight = tableHelper.getSelectedRowData();
         bootboxConfirm("Are you sure you want to delete this guest?", function(result){
             if (result == true){
                 removeFlight(flight, function() {
                     toastr.success('Removed "' + flight.id + ' ' + flight.flightNumber + '" from Flights!');
                     updateTable();
                 },
                 handleError);
             }
             else{
                 $('#modal').modal('toggle');
             }
         });
     });
    $('#flightForm').submit(function(event) {
        event.preventDefault();
        $('#flightModal').modal('hide');
        if (edit) {
            handleEditFormSubmit();
        } else {
            handleCreateFormSubmit();
        }
    });
})

function handleCreateFormSubmit() {
    var data = getFormData();
    createFlight(data, function(result) {
        toastr.success('Added "' + data.id + '" to flights!');
        $('#flightForm').get(0).reset();
        updateTable();
    }, handleError);
}

function handleEditFormSubmit() {
    var flight = tableHelper.getSelectedRowData();
    var data = getFormData();
    _.extend(flight, data);
    editFlight(flight, function(result) {
        toastr.success('Edited "' + data.id + ' ' + data.number + '"');
        $('#flightForm').get(0).reset();
        updateTable();
        edit = false;
    }, handleError);
}
function handleError(error) {
    toastr.error(JSON.parse(error.responseText).message);
    console.log(error);
};

function createFlight(flight, successCallback, errorCallback) {
    console.log("Creating flight..")
    ajaxJsonCall('POST', '/api/flights/create', flight, successCallback, errorCallback);
}

function editFlight(flight, successCallback, errorCallback) {
    console.log("Editing flight..")
    ajaxJsonCall('POST', '/api/flights/edit', flight, successCallback, errorCallback);
}

function removeFlight(flight, successCallback, errorCallback) {
    console.log("Removing flight..")
    ajaxJsonCall('DELETE', '/api/flights/delete/' + flight.id, null, successCallback, errorCallback);
}

function getFormData() {
    return {
        name : $("#flightNumber").val(),
        type : $("#flightOrigin").val(),
        type : $("#flightDestination").val()
    };
}

function setFormData(flight) {
    $('#flightNumber').val(flight.flightNumber);
    $('#flightOrigin').val(flight.flightOrigin);
     $('#flightDestination').val(flight.flightDestination);
}

function updateTable() {
    console.log("Updating table..");

    $('button.controls').prop('disabled', selectedId === undefined);
    ajaxJsonCall('GET', '/api/flights/', null, function(flights) {
      tableHelper.dataTable.clear();
      tableHelper.dataTable.rows.add(flights);
      tableHelper.dataTable.columns.adjust().draw();
    });
}