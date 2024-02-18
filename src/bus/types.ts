export interface BusStop {
		location: [number, number];
		name: string;
		output: { [key: string]: string };
		stop_id: string;
}

export interface Bus {
		c: number;
		id: string;
		lat: number;
		lon: number;
		name: string;
		s: number;
}

export interface TransportData {
		coordinates: [number, number][];
		busStops: BusStop[];
		buses: Bus[];
}

export interface Route {
		id: string;
		name: string;
		number: string;
}
