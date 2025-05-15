declare var bootstrap: any;

window.onload = () => {
  fetch('candidatos.csv')
    .then(response => response.text())
    .then(text => {
      const data = parseCSV(text);
      renderData(data);
    })
    .catch(error => {
      console.error('Error cargando el CSV:', error);
    });
};

function parseCSV(text: string): any[] {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    return headers.reduce((obj, header, i) => {
      obj[header.trim()] = values[i]?.trim() ?? '';
      return obj;
    }, {} as any);
  });
}

function renderData(data: any[]) {
  // Divide los datos
  const firstHalf = data.slice(0, 50);    // 1 - 50
  const secondHalf = data.slice(50, 100); // 51 - 100
  const thirdHalf = data.slice(100, 150);    // 1 - 50
  const fourthHalf = data.slice(150, 181); // 51 - 100
  // Renderiza ambos bloques
  renderBlock(firstHalf, "csvContainer1", 1);
  renderBlock(secondHalf, "csvContainer2", 51);
  renderBlock(thirdHalf, "csvContainerHombres1", 101);
  renderBlock(fourthHalf, "csvContainerHombres2", 151);
}

function renderBlock(data: any[], containerId: string, startIndex: number) {
  const container = document.getElementById(containerId)!;
  container.innerHTML = `
    <div class="d-flex px-1 w-auto nombre-candidato">
      <div class="row-col-1">
        <span class="text-white" id="${containerId}-col-nro"></span>
      </div>
      <div class="row-col-1 mx-1">
        <span class="subtitulo" id="${containerId}-col-propuesto"></span>
      </div>
      <div class="row-col-6 bg-white ">
          <span class="text-uppercase" id="${containerId}-col-nombre"></span>
      </div>
    </div> 
  `;
  const colNro = document.getElementById(`${containerId}-col-nro`)!;
  const colPropuesto = document.getElementById(`${containerId}-col-propuesto`)!;
  const colNombre = document.getElementById(`${containerId}-col-nombre`)!;
  

  data.forEach((row, index) => {
    colNro.innerHTML += `<p>${startIndex + index}</p>`;
    colPropuesto.innerHTML += `<p class="bg-white">${row["Propuesto"]}</p>`;
    colNombre.innerHTML += `<p> <a href="#" class="text-primary" onclick='openModal(${JSON.stringify(row)})'>
      ${row["Nombre completo"]}
    </a></p>`;
  });
}

function filtrarNombresGlobal(filtro: string): void {
  const nombres = document.querySelectorAll('.nombre-candidato div p');
  let hayCoincidencias = false;

  nombres.forEach(nombreElem => {
    const texto = nombreElem.textContent?.toLowerCase() || '';
    const coincide = texto.includes(filtro.toLowerCase());
    (nombreElem as HTMLElement).style.display = coincide ? '' : 'none';
    if (coincide) hayCoincidencias = true;
  });

  // Mostrar/ocultar mensaje si no hay coincidencias
  const mensaje = document.getElementById('mensajeSinResultados');
  if (mensaje) {
    mensaje.classList.toggle('d-none', hayCoincidencias);
  }
}

document.addEventListener('DOMContentLoaded', () => {

  // Agregar evento al buscador
  const input = document.getElementById('buscarGeneral') as HTMLInputElement;
  input.addEventListener('input', () => {
    filtrarNombresGlobal(input.value);
  });
});


function openModal(data: any) {
  const modalBody = document.getElementById('modalBody')!;
  modalBody.innerHTML = `
    <p><strong>Nombre:</strong> ${data["Nombre completo"]}</p>
    <p><strong>Edad:</strong> ${data["Edad"]}</p>
    <p><strong>Sexo:</strong> ${data["Sexo"]}</p>
    <p><strong>Ocupación:</strong> ${data["Ocupación"]}</p>
    <p><strong>Nivel de estudios:</strong> ${data["Nivel de estudios"] || 'N/A'}</p>
  `;

  const modalElement = document.getElementById('infoModal');
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}
