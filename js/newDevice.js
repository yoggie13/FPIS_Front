function getManufacturers() {
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
}

$("#addDeviceForm").submit(function (event) {
    event.preventDefault();
    const data = new FormData(event.target);

    var device = {
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
        type: "POST",
        url: "http://localhost:11807/api/Devices",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
            "Accept": "application/json",
        },
        data: jsonDevice,
        success: function (data) {
            alert("Uspelo");
            $("#addDeviceForm").trigger('reset');
        },
        error: function (data) {
            alert("Nije uspelo");
        }
    });
});