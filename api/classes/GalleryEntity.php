<?php

class GalleryEntity implements JsonSerializable {
	protected $id;
	protected $title;
	protected $date;
	protected $pictures;
	
	public function __construct(array $data){
		if(isset($data['id'])) { $this->id = $data['id']; }
		
		$this->title = $data['title'];
		$this->date = $data['date'];
		$this->pictures = [];
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
	
	public function setPictures($pictures){
		$this->pictures = $pictures;
	}
	
	public function jsonSerialize(){
		return [
			'id' => $this->id,
			'title' => $this->title,
			'date' => $this->date,
			'pictures' => $this->pictures
		];
	}
	
}

?>