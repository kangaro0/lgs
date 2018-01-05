<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';
spl_autoload_register(function ($classname) {
    //require ("../classes/" . $classname . ".php");
	if (is_file('../classes/'.$classname.'.php')) {
        require ('../classes/'.$classname.'.php');
    }
});

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$config['db']['host']   = "localhost";
$config['db']['user']   = "root";
$config['db']['pass']   = "";
$config['db']['dbname'] = "lgs";

$app = new \Slim\App(["settings" => $config]);
$container = $app->getContainer();

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
    $logger->pushHandler($file_handler);
    return $logger;
};

$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO("mysql:host=" . $db['host'] . ";dbname=" . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};

// Middleware, apply Content-Type: application/json for every req, resp
$app->add(new Middleware());

/* Events */
// get all events
$app->get('/events', function(Request $request, Response $response) {
	$this->logger->addInfo("GET Request: /events");
	$mapper = new EventMapper($this->db);
	$result = $mapper->getEvents();
	
	$response->getBody()->write($result);
	return $response;
});
// next event
$app->get('/events/next', function(Request $request, Response $response) {
	$this->logger->addInfo("GET Request: /events/next");
	$mapper = new EventMapper($this->db);
	$result = $mapper->getNext();

	$response->getBody()->write($result);
	return $response;
});
// get event by id
$app->get('/events/{id}', function(Request $request, Response $response, $args) {
	$this->logger->addInfo("Get Request: /events/" . $args["id"]);
	$mapper = new EventMapper($this->db);
	$result = $mapper->getEventById($args["id"]);
	
	$response->getBody()->write($result);
	return $response;
});
// delete event
$app->delete('/events/{id}', function(Request $request, Response $response, $args) {
	$this->logger->addInfo("DELETE Request: /events" . $args["id"]);
	$mapper = new EventMapper($this->db);
	$result = $mapper->remove($args["id"]);
	
	$response->getBody()->write($result);
	return $response;
});
// add Event
$app->post('/events', function(Request $request, Response $response) {
	$data = json_decode($request->getBody(), true);
	if($data === null){
		$response->getBody()->write(JsonFactory::ERROR(400, "Bad Request"));
		return $response;
	}
	
	$event = new EventEntity($data);
	
	$eventMapper = new EventMapper($this->db);
	$result = $eventMapper->save($event);
	
	$response->getBody()->write($result);
	return $response;
});
/* Locations */
// get all locations
$app->get('/locations', function(Request $request, Response $response) {
	$this->logger->addInfo("GET Request: /locations");
	$mapper = new LocationMapper($this->db);
	$result = $mapper->getLocations();
	
	$response->getBody()->write($result);
	return $response;
});
// get location by id
$app->get('/locations/{id}', function(Request $request, Response $response, $args){
	$this->logger->addInfo("Get Request: /locations/" . $args["id"]);
	$mapper = new LocationMapper($this->db);
	$result = $mapper->getLocationById($args["id"]);
	
	$response->getBody()->write($result);
	return $response;
});
// delete location
$app->delete('/locations/{id}', function(Request $request, Response $response, $args){
	$this->logger->addInfo("DELETE Request: /locations/" . $args["id"]);
	$mapper = new LocationMapper($this->db);
	$result = $mapper->remove($args["id"]);
	
	$response->getBody()->write($result);
	return $response;
});
// create location
$app->post('/locations', function(Request $request, Response $response) {
	$data = json_decode($request->getBody(), true);
	if($data === null){
		$response->getBody()->write(JsonFactory::ERROR(400, "Bad Request"));
		return $response;
	}
	
	$location = new LocationEntity($data);
	
	$locationMapper = new LocationMapper($this->db);
	$result = $locationMapper->save($location);
	
	$response->getBody()->write($result);
	return $response;
});
/* Galleries */
// get all galleries
$app->get('/galleries', function(Request $request, Response $response) {
	$this->logger->addinfo("GET Request: /galleries");
	$mapper = new GalleryMapper($this->db);
	$results = $mapper->getGalleries();
	
	$response->getBody()->write($results);
	return $response;
});
// get gallery by id
$app->get('/galleries/{id}', function(Request $request, Response $response, $args){
	$this->logger->addInfo("GET Request: /galleries/" . $args['id']);
	$mapper = new GalleryMapper($this->db);
	$result = $mapper->getGalleryById($args["id"]);
	
	$response->getBody()->write($result);
	return $response;
});
// delete gallery
$app->delete('/galleries/{id}', function(Request $request, Response $response, $args){
	$this->logger->addinfo("DELETE Request: /galleries/" . $args['id']);
	$mapper = new GalleryMapper($this->db);
	$result = $mapper->remove($args["id"]);
	
	$response->getBody()->write($result);
	return $response;
});
// create gallery
$app->post('/galleries', function(Request $request, Response $response){
	$data = json_decode($request->getBody(), true);
	if($data == null){
		$response->getBody()->write(JsonFactory::ERROR(400, 'Bad request'));
		return $response;
	}
	
	$gallery = new GalleryEntity($data);
	$mapper = new GalleryMapper($this->db);
	$result = $mapper->save($gallery);
	
	$response->getBody()->write($result);
	return $response;
});
// picture upload to specific gallery
$app->post('/galleries/{id}/pictures', function(Request $request, Response $response, $args){
	$files = $request->getUploadedFiles();
    if (empty($files['pictures'])) {
        throw new Exception('Expected a newfile');
    }
	
    $pictures = $files['pictures'];
	foreach($pictures as &$picture) {
		if ($picture->getError() === UPLOAD_ERR_OK) {
			// get gallery from db
			$mapper = new GalleryMapper($this->db);
			$gallery = $mapper->getGalleryById($args["id"], false);
			
			$folder = '../storage/galleries/' . $gallery->getTitle() . '/' . $gallery->getDate() . '/';
			if (!file_exists($folder)) {
				mkdir($folder, 0777, true);
			}
			
			$uploadFileName = $picture->getClientFilename();
			$picture->moveTo($folder . $uploadFileName);
		}
	}
	
	$response->getBody()->write(JsonFactory::OK());
	return $response;
});
// std. route
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader("Access-Control-Allow-Origin", "*")
            ->withHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Origin, Authorization, access-control-allow-origin")
            ->withHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");	
});

$app->run();