
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



//Ya veo el método llamado traverserjson es que va a realizar toda la estructura de este JSON
//Creo que método recursivo es el que esta mal
//Abra que dedicar le su tiempo al método para verificaar si el formato lo esta realizando de manera correcta
const traverseJSON = (jsonObject, parentId = null, resultArray = []) => {
  if (Array.isArray(jsonObject)) {
    for (const obj of jsonObject) {
      //Aqui estamos realizando la recursividad
      traverseJSON(obj, null, resultArray);
    }
  } else {
    //Aquí lo que hago es hacer una destructuración del objeto recibido
    const { id, parentId, name, status, children } = jsonObject;
    //Despues de realizar la destructuración, creo una variable en donde hago una llamada
    //Al método formatData, para mandar mis datos destructurados, pero que los reciba en una sola variable.
    //El método se va a encargar de dar ese formato a mi JSON
    const newNode = formatData({ id, parentId, name, status });
    //Por ultimo, menos importante ese json formateado lo voy a meter en mi resultArray 
    resultArray.push(newNode);
    //Una vez que termina de mandar el nuevo formato al arreglo, comprobamos
    //Si es que children es un arreglo, recuerda que children es de las propiedades desctrcuturadas
    //entonces por que hacemos esto, por que si recordamos children dentro de nuestro objeto es un arreglo que almacena más objetos
    //Por eso mismo, estamos volviendo a recorrer children sus propiedades.
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

const dato2 = [
  {
    id: 473,
    parentId: null,
    name: "Asertividad",
    status: "no-empezado",
    children: [
      {//Cuando tengo el mismo parentId, entonces el primero pasa a ser el padre y todos los demas pasan a ser hijos de el
       //Este es el padre
        id: 475,
        parentId: 473,
        name: "Lección 1: Lorem ipsum",
        status: "no-empezado"
      },
      //Este es el hijo
      {
        id: 476,
        parentId: 473,
        name: "Lección 2: Lorem ipsum",
        status: "no-empezado"
      },
      //Este es el padre
      {
        id: 477,
        parentId: 475,
        name: "Lección 1.2: Lorem",
        status: "no-empezado"
      },
      {
        id: 478,
        parentId: 476,
        name: "Lección 1.3: Lorem",
        status: "no-empezado"
      },
      {
        id: 479,
        parentId: 477,
        name: "Lección 1.4: Lorem",
        status: "no-empezado"
      },
      {
        id: 480,
        parentId: 478,
        name: "Lección 1.4: Lorem",
        status: "no-empezado"
      },
      {
        id: 481,
        parentId: 479,
        name: "Lección 1.4: Lorem",
        status: "no-empezado"
      },
    ]
  },
  
];
//Creo que el error esta en los identificadores de padre.
//así que por el momento voy a realizar correciones en el json
//En los identificadores de los "parentId"
const dato3 = [
  {//Aquí este es el padre
    "id": 464,
    "parentId": null,
    "name": "Escucha Activa",
    "status": "no-empezado",
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
        "name": "Lección 3: La escucha y sus elementos.",
        "status": "no-empezado"
      },
      {
        "id": 123,
        "parentId": 466,
        "name": "Lección 3.1: La escucha y sus elementos.",
        "status": "no-empezado"
      },
      {
        "id": 468,
        "parentId": 467,
        "name": "Lección 4: La escucha y sus elementos.",
        "status": "no-empezado"
      },
      {
        "id": 469,
        "parentId": 468,
        "name": "Lección 5: La escucha y sus elementos.",
        "status": "no-empezado"
      }
    ]
          },
          {
            "id": 471,
            "parentId": 464,
            "name": "Lección 2: Lorem ipsum",
            "status": "no-empezado"
          }
        ]
      },
      // {
      //   "id": 465,
      //   "parentId": 464,
      //   "name": "Lección 1.1: No se",
      //   "status": "no-empezado"
      // },
      // {
      //   "id": 465,
      //   "parentId": 464,
      //   "name": "Lección 1.2: Lorem ipsum",
      //   "status": "no-empezado"
      // }
    ]
  }
];
//Este es el arreglo bueno a utilizar el formato correjido con la estructura correcta.
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
    // Set default step function for all animate calls
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
