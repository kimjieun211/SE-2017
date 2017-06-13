var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

class rest_api {
	constructor() {
		db.serialize(function(){
			db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='note'",function(error,row){
				if (row !==undefined) {
					console.log("table exists. skipping creation")
				} else{
					console.log("creating table")
					db.run("CREATE TABLE note (id INTEGER PRIMARY KEY AUTOINCREMENT,created TIMESTAMP DEFAULT (DATETIME('now')), content TEXT)",function(error){
						if (error != null) {
							if (error.message.indexOf("already exists")!=-1){
								console.log(error);
							}
						}
					})
				}
			})
		})
	}
	write(req){
		db.serialize(function(){
			var stmt = db.prepare("INSERT INTO note (content) VALUES(?)")
			stmt.run(req.body.content)
			stmt.finalize()
			//db.run('INSERT INTO note (content) VALUES ('+req.body.content+')') 
		})
		return true
	}
	list(req, res){
		return db.serialize(function(){
			var items = [];
			db.each('SELECT id, created, content FROM note', function(err, row){
				items.push({id: row.id, created: row.created, content: row.content}) 
			}, function(){
				console.log(items)
				if (items) {
					res.json({success: true, item: items})
				}
			})
		//db.close()
		})
	}
	rem(req,res){
		var temp = db.run('DELETE FROM note WHERE id=(?)',function(err, row){
			items.remove({row})
		}, function(err, success){
				if(err){
					console.log("error");
						}
				else{
					console.log("Success");
				}
		temp.run(req)
		temp.finalize()
		});
	}	
}
module.exports = rest_api;