import {parseRoutes} from "./bus/parse-routes";
import BusController from "./bus";


const run = async () => {
		const routes = await parseRoutes();

		const controller = new BusController(routes.map(route => route.id));
		console.log("Starting update");
		await controller.updateData();

		const buses = await controller.getBusesForRoute(routes[0].id);
		console.log(`Buses for route ${routes[0].number}: ${buses.length}`);
		const stops = await controller.getBusStopsForRoute(routes[0].id);
		console.log(`Stops for route ${routes[0].number}: ${stops.length}`);
}

run();