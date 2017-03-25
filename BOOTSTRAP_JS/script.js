//---------------------------------------------------------------------------------------
// Data/laikas
var date = new Date();

var year = date.getFullYear();
var month = date.getMonth() + 1;
var formattedMonth = (month.toString().length == 1) ? ("0" + month) : month;
var day = date.getDate();

document.getElementById("dateId").innerHTML = year + " - " + formattedMonth + " - " + day;

var hours = date.getHours();
var minutes = date.getMinutes();

document.getElementById("timeId").innerHTML = hours + " : " + minutes;


//---------------------------------------------------------------------------------------
// Masyvas
var numbers = new Array();

function addToArray(){
  numbers.push(numbers.length + 1);
  document.getElementById("arrayId").innerHTML = numbers;
}

function removeLastFromArray(){
  numbers.pop();
  if (numbers.length === 0){
    document.getElementById("arrayId").innerHTML = "tuðèias";
  }else{
    document.getElementById("arrayId").innerHTML = numbers;
  }
}


//---------------------------------------------------------------------------------------
// Puslapiavimas
function changeWebsite(option){
  switch(option){
    case 1:
      document.getElementById("iframeId").src = "https://www.wikipedia.org/";
      document.getElementById("currentWebsiteId").innerHTML = "Wikipedia";
      break;
    case 2:
      document.getElementById("iframeId").src = "https://www.w3schools.com/";
      document.getElementById("currentWebsiteId").innerHTML = "W3Schools";
      break;
    default:
      document.getElementById("iframeId").src = "https://www.wikipedia.org/";
      document.getElementById("currentWebsiteId").innerHTML = "Wikipedia";
  }
}


//---------------------------------------------------------------------------------------
// Ritinio ploto skaièiavimas
document.getElementById('areaCalculatorFormId').onsubmit= function(e){
  e.preventDefault();
  var radius = document.getElementById("radiusId").value;
  var height = document.getElementById("heightId").value;
  var area = (radius + height) * 2 * radius;
  document.getElementById("resultId").value = area + "?";
};


//---------------------------------------------------------------------------------------
// Këlimas kvadratu
document.getElementById('calculatorFormId').onsubmit= function(e){
  e.preventDefault();
  var input = document.getElementById("inputNumberId").value;
  var result = Math.pow(input, 2);
  document.getElementById("sqrResultId").value = result;
};


//---------------------------------------------------------------------------------------
// Kintanti lentelë
var animalType = Array("Ðuo", "Katë", "Papûga", "Þuvytë", "Þiurkënas", "Gyvatë", "Ðinðila", "Kirstukas");
var animalName = Array("Tipsis", "Burbulas", "Juodis", "Keksas", "Mopsis", "Rumpumpelë", "Tigrius");

function addToTable(){
  var table = document.getElementById("animalTableId");
  var row = table.insertRow();
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  cell1.innerHTML = animalType[Math.floor(Math.random() * animalType.length)];
  cell2.innerHTML = animalName[Math.floor(Math.random() * animalName.length)];
  cell3.innerHTML = Math.floor(Math.random() * (21 - 1) + 1);
}

function removeFromTable(){
  var table = document.getElementById("animalTableId");
  var rowCount = table.rows.length;
  if (rowCount > 1) {
    table.deleteRow(rowCount -1);
  }
}







