var id = 0;
var divIsBeingEdited = false;

function openEditableVersionOfDiv(div) {
    divIsBeingEdited = true;
    globalDiv.childNodes[5].innerHTML = 'true';
    changeTheStructureOfTheDivToEdit();
}
function closeTheEditingDiv() {

    globalDiv.childNodes[6].remove();

    for (let i = 0; i < 5; i++) {
        globalDiv.childNodes[i].style.display = 'block';
    }
    globalDiv.childNodes[5].innerHTML = 'false';

}

function changeTheStructureOfTheDivToEdit() {
    var editableDiv = globalDiv;
    var height = editableDiv.offsetHeight;
    var width = editableDiv.offsetWidth;

    var children = editableDiv.childNodes;

    var form = document.createElement('form');
    form.id = "editDeviceForm";
    form.style.maxHeight = height + "px";
    form.style.maxWidth = width + "px";

    var name = document.createElement('input');
    name.type = "text";
    name.id = "name";
    name.name = "name";
    name.value = children[1].innerHTML;

    var manufacturer = document.createElement('select');
    manufacturer.id = "manufacturerList";
    manufacturer.name = "manufacturerList";
    manufacturer.value = children[1].innerHTML;

    var price = document.createElement('input');
    price.type = "number";
    price.id = "price";
    price.name = "price";
    price.value = parseFloat(children[3].innerHTML.replace('$', ''));

    var color = document.createElement('input');
    color.type = "text";
    color.id = "color";
    color.name = "color";
    color.value = (children[4].childNodes)[0].innerHTML;

    var submitEdit = document.createElement('input');
    submitEdit.type = "submit";
    submitEdit.id = "submitEdit";
    submitEdit.value = "Sačuvaj promene";

    form.append(name);
    form.append(manufacturer);
    form.append(price);
    form.append(color);
    form.append(submitEdit);

    loadData();
    children.forEach(element => {
        element.style.display = "none";
    });
    form.style.display = "flex";
    editableDiv.append(form);
}

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
}

$("#editDeviceForm").submit(function (event) {
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