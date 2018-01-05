<?php

class GalleryMapper extends Mapper {
	
	public function getGalleries($json = true){
		$sql = "SELECT * FROM galleries";
		$stmt = $this->db->query($sql);
		
		if($stmt->rowCount() > 0){
			$results = [];
			while($row = $stmt->fetch()) {
				$gallery = new GalleryEntity($row);
				$gallery->setPictures($this->getPictures($gallery));
				$results[] = $gallery;
			}
			if($json)
				return json_encode($results);
			else {
				return $results;
			}
		}
		return JsonFactory::ERROR(404, "No galleries found");
	}
	
	public function getGalleryById($gallery_id, $json = true){
		$sql = "SELECT * FROM galleries WHERE id = :gallery_id";
		
		$stmt = $this->db->prepare($sql);
		$result = $stmt->execute(["gallery_id" => $gallery_id]);
		
		if($stmt->rowCount() > 0){
			$gallery = new GalleryEntity($stmt->fetch());
			$gallery->setPictures($this->getPictures($gallery));
			if($json)
				return json_encode($gallery);
			else
				return $gallery;
		}
		return JsonFactory::ERROR(404, 'Gallery not found');
	}
	
	public function save(GalleryEntity $gallery){
		$sql = "INSERT INTO galleries
			(title, date) VALUES
			(:title, :date)";
		try{
			$stmt = $this->db->prepare($sql);
			$result = $stmt->execute([
				'title' => $gallery->getTitle(),
				'date' => $gallery->getDate()
			]);
		}
		catch(PDOException $ex){
			return JsonFactory::ERROR(400, $ex->getMessage());
		}
		return JsonFactory::OK();
			
	}
	
	public function remove($gallery_id){
		$sql = "DELETE FROM galleries WHERE id = :gallery_id";
		
		$stmt = $this->db->prepare($sql);
		$result = $stmt->execute(['gallery_id' => $gallery_id]);
		
		if($result){
			return JsonFactory::ERROR(200, 'Event deleted');
		}
		return JsonFactory::ERROR(404, 'Event not found');
	}
	
	function getPictures(GalleryEntity $gallery){
		$folder = '../storage/galleries/' . $gallery->getTitle() . '/' . $gallery->getDate() . '/';
		if(is_dir($folder)){
			$files = scandir($folder);
		
			$arrToRet = [];
			foreach($files as &$picture){
				if(!is_dir($picture))
					array_push($arrToRet, $picture);
			}
			
			return $arrToRet;
		}
		return [];
	}
}

?>