var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1, maximum-scale=1";
document.getElementsByTagName('head')[0].appendChild(meta);


data = [];
dataLimitMax = 20;

function loadData() {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
           if (http.status == 200) {
               if (data.length >= dataLimitMax)
               {
                   data.splice(0, data.length - dataLimitMax);
               }

                dataObj = JSON.parse(http.responseText);
               
               updateDom(dataObj);
               
               data.push(dataObj);
           }
        }
    };

    http.open("GET", "data", true);
    http.send();
}

function updateDom(dataObj){
    document.querySelector('.reading_avg_temp').innerText = dataObj.t.avg || "-";
    document.querySelector('.reading_avg_hum').innerText = dataObj.h.avg || "-";
    
    document.querySelector('.reading_i_temp--0').innerText = dataObj.t.readings[0] || "-";
    document.querySelector('.reading_i_hum--0').innerText = dataObj.h.readings[0] || "-";
    
    document.querySelector('.reading_i_temp--1').innerText = dataObj.t.readings[1] || "-";
    document.querySelector('.reading_i_hum--1').innerText = dataObj.h.readings[1] || "-";
    
    document.querySelector('.reading_i_temp--2').innerText = dataObj.t.readings[2] || "-";
    document.querySelector('.reading_i_hum--2').innerText = dataObj.h.readings[2] || "-";
    
    document.querySelector('.reading_i_temp--3').innerText = dataObj.t.readings[3] || "-";
    document.querySelector('.reading_i_hum--3').innerText = dataObj.h.readings[3] || "-";
}

function updateEverything()
{
    loadData();
}

setInterval(function() {
    updateEverything();
}, 3000);
