<?php

class Middleware {
	public function __invoke($request, $response, $next) {
		$response->withHeader('Content-Type', 'application/json');
		$response = $next($request, $response);
		return $response;
	}
}
?>