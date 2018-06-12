const { epw } = require(require("path").resolve('src/ElectronPlus'));
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
        epw.send('logger', { form:form, message:msg, level:lvl });
    }
});

epw.on('logger', (response) => {
    let arg = response.argument;
    let color = epw.getConfig('LogConfig')[arg.level];
    let tpl = `<li><a href="#">${arg.message}<span class="pull-right text-${color}">${arg.level}</span></a></li>`;
    $("#log").append(tpl);
    response.request({key:'value'}, 'test');
});