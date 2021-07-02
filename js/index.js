$("#searchBar").submit(function (event) {
    event.preventDefault();


    var searchTerm = $('#searchTerm').val();
    if (searchTerm === null || searchTerm === "" || searchTerm === " ") {
        alert("Niste uneli ništa za pretragu");
        return;
    }

    $.ajax({

        url: "http://localhost:11807/api/Devices/" + searchTerm,
        type: "POST",
        success: function (data) {
            console.log(data);

            data.forEach(element => {
                var div = document.createElement("div");
                div.id = element["Name"];
                div.className = "results";

                var h2 = document.createElement('h2');
                h2.innerHTML = element['Name'];

                var color = document.createElement('p');
                color.id = "color";
                color.innerHTML = element['Color'];

                var price = document.createElement('p');
                price.id = 'price';
                price.innerHTML = element['Price'];

                div.append(h2);
                div.append(price);
                div.append(color);

                $("#searchResults").append(div);
            });
        }

    });
});