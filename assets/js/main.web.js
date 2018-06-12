const path = require("path"), epw = require(path.resolve('src/ElectronPlusWeb'));
epw.addConfig('LogConfig', {
    INFO: 'blue'
});

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

epw.on('logger', (event, arg) => {
    let color = epw.getConfig('LogConfig')[arg.level];
    let tpl = `<li><a href="#">${arg.message}<span class="pull-right text-${color}">${arg.level}</span></a></li>`;
    $("#log").append(tpl);
});