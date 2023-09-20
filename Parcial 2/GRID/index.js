const grid = new gridjs.Grid({
    columns:['ID', 'Nombre', 'Descripcion', 'Foto'],
    server: {
      url: 'http://localhost:8080/api/acciones',
      then: data => data.map(acciones => [acciones.ID, acciones.Nombre,acciones.Descripcion, acciones.Foto])
    }
  }).render(document.getElementById("wrapper"));