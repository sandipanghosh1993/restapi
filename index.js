var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var id = 0;

var student = function(id,name) {
	this.sid=id;
	this.sname=name;
}

var arr=[];

app.get("/", function(req, res) {
	res.send(arr);
});


app.get("/:id", function(req, res) {

	arr.forEach(function(entry) {

		if(entry.sid == req.params.id) {
			res.send(entry);
		}
	});
});

app.post("/", function(req, res) {

	console.log(req.body.name);

	var name = req.body.name;

	var std = new student(id++,name);

	arr.push(std);

	res.send("Done!");

});

app.put("/:id/:name", function(req, res) {

	arr.forEach(function(entry) {

		if(entry.sid == req.params.id) {
			entry.sname = req.params.name;
		}
	});

	res.end("Updated!");

});

app.delete("/:id", function(req, res) {

	arr.forEach(function(entry) {

		if(entry.sid == req.params.id) {
			arr.splice(arr.indexOf(entry),1);
		}
	});

	res.end("Deleted!");
});

app.listen(8000);