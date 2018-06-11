const {ipcRenderer} = require('electron');
let $ = require("jquery");

ipcRenderer.on('command:ping', (event, arg) => {
    $("#result").append("<p id=\"ping\">"+arg+"</p>");
    setTimeout(function() {
        $("#ping").fadeOut();
        $("#ping").remove();
    }, 3500);
});


let tpl = `<li><a href="#">Message<span class="pull-right text-COLOR">LEVEL</span></a></li>`;