<?php

class JsonFactory {
	public function __construct(){
		
	}
	
	public static function OK(){
		return json_encode([
			'status' => '200',
			'message' => 'Created'
		]);
	}
	
	public static function ERROR($code, $message){
		return json_encode([
			'status' => $code,
			'message' => $message
		]);
	}
}
?>