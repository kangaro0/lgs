<?php

class EventMapper extends Mapper {
	
	public function getEvents($json = true){
		$sql = "SELECT * FROM events";
		$stmt = $this->db->query($sql);
		
		if($stmt->rowCount() > 0){
			$results = [];
			while($row = $stmt->fetch()) {
				$event = new EventEntity($row);
				$results[] = $event;
			}
			if($json)
				return json_encode($results);
			else
				return $results;
		}
		return JsonFactory::ERROR(404, "No events found");
	}
	
	public function getEventById($event_id, $json = true){
		$sql = "SELECT * from events WHERE id = :event_id";
		
		$stmt = $this->db->prepare($sql);
		$result = $stmt->execute(["event_id" => $event_id]);
		
		if($stmt->rowCount() > 0){
			if($json)
				return json_encode(new EventEntity($stmt->fetch()));
			else 
				return new EventEntity($stmt->fetch());
		}
		return JsonFactory::ERROR(404, "Event not found");
	}

	public function getNext( $json = true ){
		$events = $this->getEvents( false );
		$length = sizeof( $events );

		$next = $events[0];
		for( $i = 1 ; $i < $length ; $i++ ){
			if( strtotime( $next->getDate() ) < strtotime( $events[ $i ]->getDate() ) )
				$next = $events[ $i ];
		}

		if( $json )
			return json_encode( $next );
		return $next;
	}
	
	public function save(EventEntity $event){
		$sql = "INSERT INTO events
			(title, date, location, organizer) VALUES
			(:title, :date, :location, :organizer)";
		try {
			$stmt = $this->db->prepare($sql);
			$result = $stmt->execute([
				"title" => $event->getTitle(),
				"date" => $event->getDate(),
				"location" => $event->getLocation(),
				"organizer" => $event->getOrganizer()
			]);
		}
		catch(PDOException $ex){
			return JsonFactory::ERROR(400, $ex->getMessage());
		}
		return JsonFactory::OK();
	}
	
	public function remove($event_id){
		$sql = "DELETE FROM events WHERE id = :event_id";
		
		$stmt = $this->db->prepare($sql);
		$result = $stmt->execute(["event_id" => $event_id]);
		
		if($result){
			return JsonFactory::ERROR(200, 'Event deleted');
		}
		return JsonFactory::ERROR(404, 'Event not found');
	}
	
	
}
?>