$(document).on('change', '.btn-file :file', function() {
    var input = $(this),
    //numFiles = input.get(0).files ? input.get(0).files.length : 1,
    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    //input.trigger('fileselect', [numFiles, label]);
});

function submit() {
    var jsonStr = '{';
    jsonStr = jsonStr + '"Title":"'+$('#title').val()+'",';

    var serving = document.getElementById("serving");
    var strServing = serving.options[serving.selectedIndex].value;    
    jsonStr = jsonStr + '"Serving":' + strServing + ',';
    jsonStr = jsonStr + '"Price":' + $('#price').val() + ',';
    jsonStr = jsonStr + '"Duration":' + $('#duration').val() + ',';
    jsonStr = jsonStr + '"Description":"' + $('#description').val() + '",';
    jsonStr = jsonStr + '"Ingradients":"' + $('#ingradients').val() + '"}';
    alert(jsonStr);
}

function postFood(jsonStr) {
    //code
}