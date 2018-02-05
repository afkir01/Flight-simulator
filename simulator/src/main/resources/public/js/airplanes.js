var tableHelper;
var tableElement;
var selectedId;
var edit = false;

$(document).ready(function () {
    console.log("Airplanes document ready")

    // Load DataTable with data format.
    tableElement = $('#airplanesTable');
    tableHelper =  new DataTableHelper(tableElement, {
        bLengthChange: false,
        rowId: 'id',
        columns: [
           { "data": "type"},
           { "data": "name" }
        ]
    });

    updateTable();

    $('#create').on('click', function(event) {
        $('#airplaneModal .modal-title').html('Creating an airplane');
        $('#airplaneModal').modal('show');
    });
    $('#edit').on('click', function(event) {
        edit = true;
        var airplane = tableHelper.getSelectedRowData();
        console.log(airplane)
        setFormData(airplane);
        $('#airplaneModal .modal-title').html('Editing ' + airplane.name);
        $('#airplaneModal').modal('show');
    });
    $('#remove').on('click', function(event) {
        var airplane = tableHelper.getSelectedRowData();
        bootboxConfirm("Are you sure you want to delete this guest?", function(result){
             if (result == true){
                 removeAirplane(airplane, function() {
                     toastr.success('Removed "' + airplane.name + '" from Airplanes!');
                     updateTable();
                 },
                 handleError);
             }
             else{
                 $('#modal').modal('toggle');
             }
         });
    });
    $('#airplaneForm').submit(function(event) {
        event.preventDefault();
        $('#airplaneModal').modal('hide');
        if (edit) {
            handleEditFormSubmit();
        } else {
            handleCreateFormSubmit();
        }
    });
})

function handleCreateFormSubmit() {
    var data = getFormData();
    createAirplane(data, function(result) {
        toastr.success('Added "' + data.id + '" to Airplanes!');
        $('#airplaneForm').get(0).reset();
        updateTable();
    }, handleError);
}

function handleEditFormSubmit() {
    var airplane = tableHelper.getSelectedRowData();
    var data = getFormData();
    _.extend(airplane, data);
    editAirplane(airplane, function(result) {
        toastr.success('Edited "' + data.id + ' ' + data.name + '"');
        $('#airplaneForm').get(0).reset();
        updateTable();
        edit = false;
    }, handleError);
}
function handleError(error) {
    toastr.error(JSON.parse(error.responseText).message);
    console.log(error);
};

function createAirplane(airplane, successCallback, errorCallback) {
    console.log("Creating airplane..")
    ajaxJsonCall('POST', '/api/airplanes/create', airplane, successCallback, errorCallback);
}

function editAirplane(airplane, successCallback, errorCallback) {
    console.log("Editing airplane..")
    ajaxJsonCall('POST', '/api/airplanes/edit', airplane, successCallback, errorCallback);
}

function removeAirplane(airplane, successCallback, errorCallback) {
    console.log("Removing airplane..")
    ajaxJsonCall('DELETE', '/api/airplanes/delete/' + airplane.id, null, successCallback, errorCallback);
}

function getFormData() {
    return {
        name : $("#name").val(),
        type : $("#type").val()
    };
}

function setFormData(airplane) {
    $('#name').val(airplane.name);
    $('#type').val(airplane.type);
}

function updateTable() {
    console.log("Updating table..");

    $('button.controls').prop('disabled', selectedId === undefined);
    ajaxJsonCall('GET', '/api/airplanes/', null, function(airplanes) {
      tableHelper.dataTable.clear();
      tableHelper.dataTable.rows.add(airplanes);
      tableHelper.dataTable.columns.adjust().draw();
    });
}