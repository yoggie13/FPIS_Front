window.onload = loadData;
var id = 0;

function loadData() {
    $.ajax({
        url: "http://localhost:11807/api/Devices/Manufacturers",
        type: "GET",
        success: function (data) {
            data.forEach(element => {
                var option = document.createElement('option');
                option.id = element["id"];
                option.value = element["id"];
                option.innerHTML = element["name"];

                $("#manufacturerList").append(option);
            });
        },
        error: function (data) {
            alert("Trenutno se ne mogu prikazati proizvođači");
            window.open('index.html');
        }
    });
    id = localStorage.getItem("deviceToEdit");
    $.ajax({
        type: "GET",
        url: "http://localhost:11807/api/Devices/" + id,
        success: function (data) {
            fillTheData(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function fillTheData(data) {
    document.getElementById("name").value = data["name"];
    document.getElementById("model").value = data["model"];
    document.getElementById("color").value = data["color"];
    document.getElementById("price").value = data["price"];

    document.getElementById("manufacturerList").value = data["_Manufacturer"].id;
}

$("#addDeviceForm").submit(function (event) {
    event.preventDefault();
    const data = new FormData(event.target);

    var device = {
        "ID": id,
        "Name": data.get('name'),
        "Model": data.get('model'),
        "Color": data.get('color'),
        "Price": parseFloat(data.get('price')),
        "_Manufacturer": {
            "ID": parseInt(data.get('manufacturer')),
        }
    }

    if (device["Name"] == "" || Number.isNaN(device["Price"])) {
        alert("Morate uneti naziv i cenu!");
        return;
    }

    console.log(device);

    var jsonDevice = JSON.stringify(device);

    $.ajax({
        type: "PUT",
        url: "http://localhost:11807/api/Devices/" + id,
        contentType: "application/json; charset=utf-8",
        headers: {
            "Accept": "application/json",
        },
        data: jsonDevice,
        success: function (data) {
            alert("Uspešno izmenjeno");
        },
        error: function (data) {
            alert("Greška pri čuvanju izmena");
        }
    });
});