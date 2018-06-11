const {ipcRenderer} = require('electron');
let LogConfig = {
    INFO: 'blue'
};

$("#createLog").submit(e => {
    e.preventDefault();
    let form = $("#createLog");
    let msg = form.find("[name=message]").val();
    let lvl = form.find("[name=level]").val();
    if(msg === undefined || lvl === undefined | msg === "" || lvl === "") {
        alert("Please fill out your logger information");
    } else {
        ipcRenderer.send('logger', { form:form, message:msg, level:lvl });
    }
});

ipcRenderer.on('logger:response', (event, arg) => {
    let color = LogConfig[arg.level];
    let tpl = `<li><a href="#">${arg.message}<span class="pull-right text-${color}">${arg.level}</span></a></li>`;
    $("#log").append(tpl);
});