import axios from 'axios';
import * as cheerio from 'cheerio';
import {Route} from "./types";

const url = 'http://transport.geogps.ge/live-bus-stop-time';

export const parseRoutes = async (): Promise<Route[]> => {
		const routes: Route[] = [];
		try {
				const {data} = await axios.get(url);

				const $ = cheerio.load(data);

				$('li[data-route-id]').each((index, element) => {
						const routeId = $(element).attr('data-route-id')!;
						const routeName = $(element).find('span').text();
						let number = routeName.replace("მარშრუტი ", "");
						//remove leading 0
						number = number.replace(/^0+/, '');

						routes.push({id: routeId, name: routeName, number});
				});

				// sort by number
				routes.sort((a, b) => {
						return parseInt(a.number) - parseInt(b.number);
				});
		} catch (error) {
				console.error(`Error while parsing a page: ${error}`);
		}
		return routes;
};
