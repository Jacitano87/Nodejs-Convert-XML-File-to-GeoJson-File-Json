/*
Writen by
	Fischetti Antonio (http://antoniofischetti.it)
            GitHub (https://github.com/Jacitano87)
    
The project is released by GPL3 licence 2017.
*/

var http = require('http');
console.log('Open Server...');
console.log('Server running at http://127.0.0.1:4000/');

//Install this library npm (MAC)
//sudo npm install -g libraryName

var mkdirp = require('mkdirp');
var express = require('express');
var server = express();
var parser = require('xml2json');
var path = require('path');
var GeoJSON = require('geojson');
var jsonfile = require('jsonfile');
var parser = require('xml2json');
var fs = require('fs');

//curl -I http://127.0.0.1:4000/fromXMLtoJSON

server.get('/fromXMLtoJSON', function(req,res){

var arrayJson = [];

//Open File in directory
	
	fs.readdir('./', function (err, files){
	if (err) throw err;
	var path_ = "./";
	mkdirp(path_, function(err) {
	});
	
	for (var index in files){

//Ceck and take only xml files

	var ext = path.extname(files[index]||'').split('.');
	var estenzione = ext[ext.length -1];
	if (estenzione =="xml"){
	
	console.log("Name file opened:" + files[index]); 
	
	var filePath_ ="./" + files[index];
	
	
	
	fs.readFile( filePath_, function(err, data) {
	//console.log(data);
	
	var json = parser.toJson(data);
	var jsonContent = JSON.parse(json);
	
	//console.log(jsonContent.ROWSET.chiamata);
	jsonContent.ROWSET.chiamata.forEach(function (item) {
    
     if(item.COORD_X.length == 11){ 
     //This if is used only for my Code
     //Controllo se è una coordinata valida poichè alcune sono degli oggetti nulli.
    
    //Mi creo l'oggetto geoJson in particolare poichè le lat e lon sono stringhe, le faccio diventare dei float perchè la funzione
    //GeoJson.parse vuole la lat e lon di tipo numerico
    var data = [
  { DATA_0: item.******, 
    DATA_1:item.****** , 
    DATA_2: item.******, 
    DATA_3: item.******, 
    DATA_4: "",
    DATA_5: item.NOTE_****** ,
    DATA_6: item.****** ,
    DATA_7: item.****** ,
    DATA_8: item.****** + " " + item.******  ,
    DATA_9: item.****** ,
    lat: parseFloat(item.COORD_X.replace(",",".")), lng: parseFloat(item.COORD_Y.replace(",",".")) },
];
    
    //Costruzione di un geoJson utilizzando un'apposita libreria. I geoJson sono dei Json formattati con opportuni tag (features)
   var geoJson = GeoJSON.parse(data, {Point: ['lat','lng']}); 
     console.log(geoJson.features);
      arrayJson.push(geoJson);

     }
})

//Scrittura del geoJson utilizzando la libreria di scrittura di un file Json. Utilizzabile per qualsiasi Json
   var file = './file.geojson'
   jsonfile.writeFile(file, arrayJson, {spaces: 2}, function(err) {
  console.error(err)
})


	/* Scrittura sul file semplice, ma non memorizza i tag che mi servono per il geoJson
	fs.writeFile('./file.json', json, function (err) {
  if (err) throw err;
  console.log('Salvato');
});
	*/
	});

	  
}
}
});
res.send("Done...");


});


server.listen(4000);











































































