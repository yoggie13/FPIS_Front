$("#createNew").click(function (event) {

    window.open("newDevice.html", target = "_blank");
});

$("#searchBar").submit(function (event) {
    event.preventDefault();
    $("#searchResults").html("");

    var searchTerm = $('#searchTerm').val();
    if (searchTerm === null || searchTerm === "" || searchTerm === " ") {
        alert("Niste uneli ništa za pretragu");
        return;
    }

    $.ajax({

        url: "http://localhost:11807/api/Devices/" + searchTerm,
        type: "POST",
        success: function (data) {
            changeTheStructure(data);
            writeInfo(data);
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
        div.id = element["Name"];
        div.className = "results";

        var img = document.createElement('img');
        img.src = element['Picture'];

        var h2 = document.createElement('h2');
        h2.innerHTML = element['Name'];

        var color = document.createElement('p');
        color.id = "color";
        color.innerHTML = element['Color'];

        var price = document.createElement('p');
        price.id = 'price';
        price.innerHTML = element['Price'];

        div.append(img);
        div.append(h2);
        div.append(price);
        div.append(color);

        $("#searchResults").append(div);

        var row = Math.floor(element / 3) + 1;
        var column = (id + 1) % 3;

        if (column === 0)
            column = 3;

        div.style.gridRow = row
        div.style.gridColumn = column;

        id++;
    });
}
