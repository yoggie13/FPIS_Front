var openCreate = true;
var divs;
var globalDiv;

$("#createNew").click(function (event) {
    if (openCreate) {
        document.getElementById("searchResults").style.display = "none";
        document.getElementById("createNewForm").style.display = "flex";
        document.getElementById("createNew").style.color = "#da291c";
        getManufacturers();
    } else {
        document.getElementById("searchResults").style.display = "flex";
        document.getElementById("createNewForm").style.display = "none";
        document.getElementById("createNew").style.color = "#333333";
    }
    openCreate = !openCreate;
});

$("#searchBar").submit(function (event) {
    event.preventDefault();
    var srcRs = $("#searchResults");
    srcRs.html("");

    var searchTerm = $('#searchTerm').val();
    if (searchTerm === null || searchTerm === "" || searchTerm === " ") {
        alert("Niste uneli ništa za pretragu");
        return;
    }

    $.ajax({

        url: "http://localhost:11807/api/Devices/" + searchTerm,
        type: "POST",
        success: function (data) {
            if (data.length === 0) {
                alert("Nema uređaja koji sadrže: " + searchTerm);
                return;
            }

            document.getElementById("searchResults").style.animation = "goUp 1s";
            document.getElementById("searchBarDiv").style.animation = "goUp2 1s";
            changeTheStructure(data);
            writeInfo(data);
        }, error: function (data) {
            alert("Greška na serveru");
        }

    });
});

function changeTheStructure(data) {
    var searchResults = document.getElementById("searchResults");
    var length = Object.keys(data).length;
    var gridTemplateRows = length / 3;
    if (length % 3 > 0)
        gridTemplateRows++;

    searchResults.style.display = "grid";
    searchResults.style.gridTemplateRows = gridTemplateRows;
}

function writeInfo(data) {
    var id = 0;

    data.forEach(element => {
        var div = document.createElement("div");
        div.id = element["ID"];
        div.className = "results";

        var img = document.createElement('img');
        img.src = element['Picture'];

        var h2 = document.createElement('h2');
        h2.innerHTML = element['Name'];

        var icon = document.createElement('i');
        icon.className = "fas fa-edit";

        var span = document.createElement('span');
        span.className = 'span';

        span.append(h2);
        span.append(icon);

        var color = document.createElement('p');
        color.className = "color";
        color.innerHTML = element['Color'];

        var price = document.createElement('p');
        price.className = 'price';
        price.innerHTML = element['Price'] + "$";

        var manufacturer = document.createElement('p');
        manufacturer.className = 'manufacturer';
        manufacturer.innerHTML = element["Manufacturer"]["Manufacturer_Name"];
        manufacturer.id = element["Manufacturer"]["Manufacturer_ID"];

        div.append(img);
        div.append(span);
        div.append(manufacturer);
        div.append(price);
        div.append(color);

        var isItBeingEdited = document.createElement('p');
        isItBeingEdited.innerHTML = 'false';
        isItBeingEdited.hidden = true;

        div.append(isItBeingEdited);

        $("#searchResults").append(div);

        icon.addEventListener("click", function eventFunction(event) {
            event.preventDefault();

            if (divIsBeingEdited === true) {
                closeTheEditingDiv();
            }

            if (icon.parentElement.parentElement.childNodes[5].innerHTML === 'false') {
                globalDiv = icon.parentElement.parentElement;
                openEditableVersionOfDiv();
            }
        });

        var row = Math.floor(id / 3) + 1;
        var column = (id + 1) % 3;

        if (column === 0)
            column = 3;

        div.style.gridRow = row
        div.style.gridColumn = column;

        id++;
    });
}
