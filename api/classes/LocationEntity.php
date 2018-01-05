<?php

class LocationEntity implements JsonSerializable {
	protected $id;
	protected $title;
	protected $addressLine1;
	protected $city;
	protected $state;
	protected $postcode;
	protected $country;
	protected $latitude;
	protected $longitude;
	
	public function __construct(array $data){
		if(isset($data["id"])) { $this->id = $data["id"]; }
		
		$this->title = $data["title"];
		$this->addressLine1 = $data["addressLine1"];
		$this->city = $data["city"];
		$this->state = $data["state"];
		$this->postcode = $data["postcode"];
		$this->country = $data["country"];
		$this->latitude = $data["latitude"];
		$this->longitude = $data["longitude"];
	}
	
	public function getId(){
		return $this->id;
	}
	
	public function getTitle(){
		return $this->title;
	}
	
	public function getAddressLine1(){
		return $this->addressLine1;
	}
	
	public function getCity(){
		return $this->city;
	}
	
	public function getState(){
		return $this->state;
	}
	
	public function getPostcode(){
		return $this->postcode;
	}
	
	public function getCountry(){
		return $this->country;
	}
	
	public function getLatitude(){
		return $this->latitude;
	}
	
	public function getLongitude(){
		return $this->longitude;
	}
	
	public function jsonSerialize(){
		return [
			'id' => $this->id,
			'title' => $this->title,
			'addressLine1' => $this->addressLine1,
			'city' => $this->city,
			'state' => $this->state,
			'postcode' => $this->postcode,
			'country' => $this->country,
			'latitude' => $this->latitude,
			'longitude' => $this->longitude
		];
	}
}

?>