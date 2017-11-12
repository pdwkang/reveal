var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});
var pg = require('pg');
var conString = "postgres://readonly_user:turner@aws-us-east-1-portal.27.dblayer.com:25183/titles";

var client = new pg.Client(conString);

client.connect();

/* Return all titles */
router.get('/titles', function(req, res, next) {
	client.query("SELECT * FROM title",(error, result)=>{
		if(error) throw error;
		res.json(result);
	});
});

/* Given title_id, return storyline data */
router.get('/storyline/:title_id', function(req, res, next) {
	let title_id = req.params.title_id;
	let query = "SELECT description, type, language " +
		"FROM storyline " +
		"WHERE title_id = '" + title_id + "'";
	client.query(query, (error, result) => {
		if(error) throw error;
		res.json(result);
	});
});

/* Given title_id, return awards data */
router.get('/awards/:title_id', function(req, res, next) {
	let title_id = req.params.title_id;
	let query = "SELECT * " +
		"FROM award " +
		"WHERE title_id = '" + title_id + "'";
	client.query(query, (error, result) => {
		if(error) throw error;
		res.json(result);
	});
});


/* Given title_id, return genre data */
router.get('/genres/:title_id', function(req, res, next) {
	let title_id = req.params.title_id;
	let query = "SELECT name " +
		"FROM title_genre " +
		"LEFT JOIN genre ON title_genre.genre_id = genre.id " +
		"WHERE title_genre.title_id = '" + title_id + "'";
	client.query(query, (error, result) => {
		if(error) throw error;
		res.json(result);
	});
});

/* Return all titles that match user's input string */
router.get('/titles/:id', function(req, res, next) {
	let titleName = decodeURIComponent(req.params.id);
	let otherNameQuery = "SELECT title_id FROM other_name WHERE upper(title_name_sortable) = '" + titleName.toUpperCase() + "'";
	
	/* Check database if other names exist for the given title, and create query string accordingly */
	client.query(otherNameQuery, (error, otherQueryResult) => {
		if(error) throw error;
		if(!otherQueryResult.rows[0]){
			var query = "SELECT * FROM title WHERE upper(title_name) = '" + titleName.toUpperCase() + "'";
		}else{
			var query = "SELECT * FROM title WHERE id = '" + otherQueryResult.rows[0].title_id + "'";
		}
		client.query(query, (error2, result) => {
			if(error2) throw error2;
			res.json(result);
		});
	});
});

/* Return all genres */
router.get('/genres', function(req, res, next) {
	query = "SELECT * FROM genre";
	client.query(query, (error, result) => {
		if(error) throw error;
		res.json(result);
	});
});

/* Given genre_id, return matching title objects */
router.get('/genres/titles/:id', function(req, res, next) {
	let genre_id = req.params.id;
	let query = "SELECT * " +
		"FROM title " +
		"LEFT JOIN title_genre ON title_genre.title_id = title.id " + 
		"WHERE title_genre.genre_id = '" + genre_id + "'";
	client.query(query, (error, result) => {
		if(error) throw error;
		res.json(result);
	});
});

/* Given title_id, return participants data */
router.get('/participants/:title_id', function(req, res, next) {
	let title_id = req.params.title_id;
	let query = "SELECT * " +
		"FROM title_participant " +
		"LEFT JOIN participant ON title_participant.participant_id = participant.id " +
		"WHERE title_participant.title_id = '" + title_id + "'";
	client.query(query, (error, result) => {
		if(error) throw error;
		res.json(result);
	});
});

/* Given participant_id, return matching title objects */
router.get('/participants/titles/:id', function(req, res, next) {
	let participant_id = req.params.id;
	let query = "SELECT * " +
		"FROM title " +
		"LEFT JOIN title_participant ON title_participant.title_id = title.id " + 
		"WHERE title_participant.participant_id = '" + participant_id + "'";
	client.query(query, (error, result) => {
		if(error) throw error;
		res.json(result);
	});
});

module.exports = router;
