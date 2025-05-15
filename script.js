window.onload = function () {
    fetch('candidatos.csv')
        .then(function (response) { return response.text(); })
        .then(function (text) {
        var data = parseCSV(text);
        renderData(data);
    })
        .catch(function (error) {
        console.error('Error cargando el CSV:', error);
    });
};
function parseCSV(text) {
    var lines = text.trim().split('\n');
    var headers = lines[0].split(',');
    return lines.slice(1).map(function (line) {
        var values = line.split(',');
        return headers.reduce(function (obj, header, i) {
            var _a, _b;
            obj[header.trim()] = (_b = (_a = values[i]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
            return obj;
        }, {});
    });
}
function renderData(data) {
    // Divide los datos
    var firstHalf = data.slice(0, 50); // 1 - 50
    var secondHalf = data.slice(50, 100); // 51 - 100
    var thirdHalf = data.slice(100, 150); // 1 - 50
    var fourthHalf = data.slice(150, 181); // 51 - 100
    // Renderiza ambos bloques
    renderBlock(firstHalf, "csvContainer1", 1);
    renderBlock(secondHalf, "csvContainer2", 51);
    renderBlock(thirdHalf, "csvContainerHombres1", 101);
    renderBlock(fourthHalf, "csvContainerHombres2", 151);
}
function renderBlock(data, containerId, startIndex) {
    var container = document.getElementById(containerId);
    container.innerHTML = "\n      <div class=\"d-flex px-1\">\n        <span class=\"row-col-3 text-white\" id=\"".concat(containerId, "-col-nro\"></span>\n        <span class=\"row-col-1 subtitulo mx-3\" id=\"").concat(containerId, "-col-propuesto\"></span>\n        <span class=\"row-col-5 bg-white text-uppercase\" id=\"").concat(containerId, "-col-nombre\"></span>\n      </div>\n  ");
    var colNro = document.getElementById("".concat(containerId, "-col-nro"));
    var colOcupacion = document.getElementById("".concat(containerId, "-col-propuesto"));
    var colNombre = document.getElementById("".concat(containerId, "-col-nombre"));
    data.forEach(function (row, index) {
        colNro.innerHTML += "<p>".concat(startIndex + index, "</p>");
        colOcupacion.innerHTML += "<p class=\"bg-white\">".concat(row["Propuesto"], "</p>");
        colNombre.innerHTML += "<p> <a href=\"#\" class=\"text-primary\" onclick='openModal(".concat(JSON.stringify(row), ")'>\n      ").concat(row["Nombre completo"], "\n    </a></p>");
    });
}
function openModal(data) {
    var modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = "\n    <p><strong>Nombre:</strong> ".concat(data["Nombre completo"], "</p>\n    <p><strong>Edad:</strong> ").concat(data["Edad"], "</p>\n    <p><strong>Sexo:</strong> ").concat(data["Sexo"], "</p>\n    <p><strong>Ocupaci\u00F3n:</strong> ").concat(data["Ocupación"], "</p>\n    <p><strong>Nivel de estudios:</strong> ").concat(data["Nivel de estudios"] || 'N/A', "</p>\n  ");
    var modalElement = document.getElementById('infoModal');
    var modal = new bootstrap.Modal(modalElement);
    modal.show();
}
