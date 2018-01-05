<?php

class LocationMapper extends Mapper {
	
	public function getLocations($json = true){
		$sql = "SELECT * FROM locations";
		$stmt = $this->db->query($sql);
		
		if($stmt->rowCount() > 0){
			$results = [];
			while($row = $stmt->fetch()) {
				$results[] = new LocationEntity($row);
			}
			if($json)
				return json_encode($results);
			else
				return $results;
		}
		return JsonFactory::Error(404, "No events found");
	}
	
	public function getLocationById($location_id, $json = true){
		$sql = "SELECT * from locations WHERE id = :location_id";
		
		$stmt = $this->db->prepare($sql);
		$result = $stmt->execute(["location_id" => $location_id]);
		
		if($stmt->rowCount() > 0){
			if($json)
				return json_encode(new LocationEntity($stmt->fetch()));
			else
				return new LocationEntity($stmt->fetch());
		}
		return JsonFactory::Error(404, "Location not found");
	}
	
	public function save(LocationEntity $location){
		$sql = "INSERT INTO locations
			(title, addressLine1, city, state, postcode, country, latitude, longitude) VALUES 
			(:title, :addressLine1, :city, :state, :postcode, :country, :latitude, :longitude)";
		
		try {
			$stmt = $this->db->prepare($sql);
			$result = $stmt->execute([
				"title" => $location->getTitle(),
				"addressLine1" => $location->getAddressLine1(),
				"city" => $location->getCity(),
				"state" => $location->getState(),
				"postcode" => $location->getPostcode(),
				"country" => $location->getCountry(),
				"latitude" => $location->getLatitude(),
				"longitude" => $location->getLongitude()
			]);
		}
		catch(PDOException $ex){
			return JsonFactory::Error(400, $ex->getMessage());
		}
		return JsonFactory::OK();
	}
	
	public function remove($event_id){
		$sql = "DELETE FROM locations WHERE id = :event_id";
		
		$stmt = $this->db->prepare($sql);
		$result = $stmt->execute(["event_id" => $event_id]);
		
		if($result){
			return JsonFactory::ERROR(200, 'Location deleted');
		}
		return JsonFactory::ERROR(404, 'Event not found');
	}
}

?>