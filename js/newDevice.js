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
            console.log(data);
        }
    });
}
window.onload = getManufacturers;