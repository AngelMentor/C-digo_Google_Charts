
//En el método termine de poner los casos de los posibles estados Jorge
const formatData = (obj) => {
  let status_info = '';
  switch (obj.status.toString()) {
    case "terminado":
      status_info = '<div class="round-icon finish"> <i class="fa fa-check-circle"></i> Terminado </div>';
      break;
    case "en-progreso":
      status_info = '<div class="progressrad">En progreso</div>';
      break;
    case "no-empezado":
      status_info = '<div class="round-icon not-started"> <i class="fa fa-times-circle"></i></div>';
      break;
    default:
      status_info = '<div class="round-icon"> <i class="fa fa-pencil-alt"></i> Pendiente </div>';
  }
  const parent_info = obj.parentId != null ? obj.parentId.toString() : "";
  const format = [{ v: obj.id.toString(), f: `${status_info} ${obj.name}` }, parent_info];

  return format;
};



const traverseJSON = (jsonObject, parentId = null, resultArray = []) => {
  if (Array.isArray(jsonObject)) {
    for (const obj of jsonObject) {
      traverseJSON(obj, null, resultArray);
    }
  } else {
    const { id, parentId, name, status, children } = jsonObject;
    const newNode = formatData({ id, parentId, name, status });
    resultArray.push(newNode);
    if (Array.isArray(children)) {
      for (const child of children) {
        traverseJSON(child, id, resultArray);
      }
    }
  }

  return resultArray;
};
//Objeto inicial que Jorge tenia dentro del código esta mal estructurado
const dato = [
  {//Este es nuestro padre
  "id":451,
  "parentId":null,
  "name":"Asertividad",
  "status":"no-empezado",
  "children":[//Ahora el padre tuvo un hijo y ese hijo tuvo mucho hijos
    {//El es el padre de todos los demas objetos por el mismo parentID.
      "id":758,
      "parentId":451,
      "name":"Lección 1: ¿Qué es la asertividad?",
      "status":"no-empezado"
    },
    {//Hijo
      "id":760,
      "parentId":451,
      "name":"Lección 2 : Derechos básicos de la asertividad.",
      "status":"no-empezado"
    },
    {//Hijo
      "id":774,
      "parentId":451,
      "name":"Lección 3: Características de las personas asertivas.",
      "status":"no-empezado"
    },
    {//Hijo
      "id":776,
      "parentId":451,
      "name":"Lección 4: ¿Por qué aplicar asertividad en el área laboral?",
      "status":"no-empezado"
    },
    {//Hijo
      "id":778,
      "parentId":451,
      "name":"Lección 5: Test: ¿Cuál es tu grado de asertividad?",
      "status":"no-empezado"
    },
    {//Hijo
      "id":849,
      "parentId":451,
      "name":"Lección 6: Estilos de comunicación.",
      "status":"no-empezado"
    },
    {//Hijo
      "id":852,
      "parentId":451,
      "name":"Lección 7: Herramientas para desarrollar la asertividad.",
      "status":"no-empezado"
    },
    {//Hijo
      "id":925,
      "parentId":451,
      "name":"Lección 8: Recomendaciones",
      "status":"no-empezado"
    }
  ]
}
];
//Este es el arreglo bueno a utilizar el formato correjido con la estructura correcta.
//Hola Jorge tu Error se generaraba  debido a los parentID, despues de estar buscando el error en el código recursivo
//El error es la estrucutra json que tenias al inicio ya que se generaba error si te das cuenta en tu arreglo inicial
//los parentID son todos iguales que quiere decir esto que entonces estos siempre van a ser hijos por eso no se lograba tu estructura
//Y se veía de la manera inicial en la que me mostraste.
const dato4 = [
     {//Aquí este es el padre
      "id": 464,
      "parentId": null,
      "name": "Escucha Activa",
      "status": "en-progreso",
      "children": [ //Este pasa a convertirse en un hijo
        {
          "id": 465,
          "parentId": 464,
          "name": "Lección 1: La escucha y sus elementos.",
          "status": "no-empezado",
          "children": [
        {
          "id": 466,
          "parentId": 465,
          "name": "Lección 2: La escucha y sus elementos.",
          "status": "no-empezado",
          "children": [
            {
              "id": 467,
              "parentId": 466,
              "name": "Lección 2.1: La escucha y sus elementos.",
              "status": "no-empezado"
            },
            {
              "id": 468,
              "parentId": 466,
              "name": "Lección 2.2: La escucha y sus elementos.",
              "status": "no-empezado"
            },
            {
              "id": 469,
              "parentId": 466,
              "name": "Lección 2.3: La escucha y sus elementos.",
              "status": "no-empezado"
            }
          ]
        },
        {
          "id": 470,
          "parentId": 467,
          "name": "Lección 3: La escucha y sus elementos.",
          "status": "no-empezado",
          "children": [
            {
              "id": 471,
              "parentId": 470,
              "name": "Lección 3.1: La escucha y sus elementos.",
              "status": "no-empezado"
            },
            {
              "id": 472,
              "parentId": 470,
              "name": "Lección 3.1: La escucha y sus elementos.",
              "status": "no-empezado"
            }
          ]
        },
        {
          "id": 473,
          "parentId": 471,
          "name": "Lección 4: La escucha y sus elementos.",
          "status": "no-empezado"
        },
        
            {
              "id": 474,
              "parentId": 464,
              "name": "Lección 2: Lorem ipsum",
              "status": "no-empezado"
            }
          ]
        },
      ]
    }
  ];


google.charts.load("current", { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawChart);
//Este es el método para hacer la el circulo de progreso!!
function progressRad() {
  var bar = new ProgressBar.Circle(document.querySelector(".progressrad"), {
    color: "#FFEA82",
    trailColor: "#eee",
    trailWidth: 1,
    duration: 1400,
    easing: "bounce",
    strokeWidth: 6,
    from: { color: "#FFEA82", a: 0 },
    to: { color: "#ED6A5A", a: 1 },
    step: function (state, circle) {
      circle.path.setAttribute("stroke", state.color);
    }
  });
  bar.animate(0.5);
}
//Este el método el cual dibuja nuestra estructura de nuestro JSON!!
function drawChart() {
  //Aquí estamos creando
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Foo");
  data.addColumn("string", "Bar");

  var data2 = new google.visualization.DataTable();
  data2.addColumn("string", "Foo");
  data2.addColumn("string", "Bar");

  // For each orgchart box, provide the name, manager, and tooltip to show.
  //Para cada cuadro de organigrama, proporcione el nombre, el administrador y la información sobre herramientas que se mostrará.
  data.addRows([
    [
      {
        v: "Parent_1",
        f:
          '<div class="round-icon finish"> <i class="fa-solid fa-check"></i> </div>'
      },
      ""
    ],
    [
      {
        v: "Child1",
        f: '<div class="progressrad"></div>'
      },
      "Parent_1"
    ],
    [
      {
        v: "Child2",
        f: '<div class="round-icon"> <i class="fa-solid fa-pencil"></i> Leccion 1 </div>'
      },
      "Child1"
    ],
    [
      {
        v: "Child2.1",
        f: '<div class="round-icon"> <i class="fa-solid fa-pencil"></i> </div>'
      },
      "Child2"
    ],
    [
      {
        v: "Child2.2",
        f: '<div class="round-icon"> <i class="fa-solid fa-pencil"></i> </div>'
      },
      "Child2"
    ],
    [
      {
        v: "Child3",
        f: '<div class="round-icon"> <i class="fa-solid fa-pencil"></i> </div>'
      },
      "Child2.1"
    ],
    [
      {
        v: "Child4",
        f: '<div class="round-icon"> <i class="fa-solid fa-pencil"></i> </div>'
      },
      "Child3"
    ]
  ]);

  const formattedData = traverseJSON(dato4);
  console.log('Formatted data for Google Charts:', formattedData);
  data2.addRows(formattedData);
  // Crea el gráfico(Tabla)
  var chart = new google.visualization.OrgChart(
    document.getElementById("chart_div")
  );

  google.visualization.events.addListener(chart, "ready", chartRender);

  // Dibuje el gráfico y establezca la opción enableHtml en verdadero para la información sobre herramientas.
  chart.draw(data, {
    allowHtml: true,
    size: "large",
    nodeClass: "nodo"
  });

  //google.visualization.events.removeAllListeners(chart)
  google.visualization.events.addListener(chart, "select", selectHandler);

  function selectHandler() {
    alert("Un nodo ha sido seleccionado");
  }

  function chartRender() {
    console.log("La grafica se ha cargado");

    progressRad();
  }


  const cambiaruta = document.querySelector("button.cambiaruta").addEventListener("click", () => {
    chart.draw(data2, {
      allowHtml: true,
      size: "large",
      nodeClass: "nodo"
    });
  });
}
