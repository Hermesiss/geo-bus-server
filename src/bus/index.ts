import {getRoute} from "./api";
import {Bus, BusStop} from "./types";

export default class BusController {
		constructor(routes: string[]) {
				this.routes = routes;
		}

		readonly routes: string[];

		private readonly buses = new Map<string, Bus[]>();
		private readonly busStopsForRoute = new Map<string, BusStop[]>();
		private readonly busStopsById = new Map<string, BusStop>();
		private readonly busPath = new Map<string, [number, number][]>();

		private lastUpdateTime: number = 0;

		async getBusesForRoute(route: string): Promise<Bus[]> {
				await this.updateData();
				return this.buses.get(route) || [];
		}

		async getBusStopsForRoute(route: string): Promise<BusStop[]> {
				await this.updateData();
				return this.busStopsForRoute.get(route) || [];
		}

		async getBusStopById(stopId: string): Promise<BusStop | undefined> {
				await this.updateData();
				return this.busStopsById.get(stopId);
		}

		async getBusPath(route: string): Promise<[number, number][]> {
				await this.updateData();
				return this.busPath.get(route) || [];
		}

		updateData = async () => {
				const now = Date.now();
				// update no more than once per 10 seconds
				if (now - this.lastUpdateTime < 10000) {
						return;
				}

				for (let route of this.routes) {
						const routeData = await getRoute(route);
						if (!this.buses.has(route)) {
								this.buses.set(route, []);
						}
						if (!this.busStopsForRoute.has(route)) {
								this.busStopsForRoute.set(route, []);
						}

						for (let bus of routeData.buses) {
								this.buses.get(route)!.push(bus);
						}
						for (let stop of routeData.busStops) {
								this.busStopsForRoute.get(route)!.push(stop);
								if (!this.busStopsById.has(stop.stop_id)) {
										this.busStopsById.set(stop.stop_id, stop);
								}
						}
						if (!this.busPath.has(route)) {
								this.busPath.set(route, routeData.coordinates);
						}
				}

				this.lastUpdateTime = Date.now();
		}
}




