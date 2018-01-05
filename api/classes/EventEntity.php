<?php

class EventEntity implements JsonSerializable {
	protected $id;
	protected $title;
	protected $date;
	protected $time;
	protected $organizer;
	protected $location;
	
	public function __construct(array $data) {
		if(isset($data['id'])) { $this->id = $data['id']; }
		
		$this->title = $data['title'];
		$this->date = $data['date'];
		$this->organizer = $data['organizer'];
		$this->location = $data['location'];
	}
	
	public function getId(){
		return $this->id;
	}
	
	public function getTitle(){
		return $this->title;
	}
	
	public function getDate(){
		return $this->date;
	}
	
	public function getLocation(){
		return $this->location;
	}
	
	public function getOrganizer(){
		return $this->organizer;
	}
	
	public function jsonSerialize(){
		return [
			'id' => $this->id,
			'title' => $this->title,
			'date' => $this->date,
			'organizer' => $this->organizer,
			'location' => "http://" . $_SERVER["SERVER_NAME"] . "/lgs1/api/public/locations/" . $this->location
		];
	}
}
?>