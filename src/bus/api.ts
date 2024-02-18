import axios from "axios";
import {TransportData} from "./types";

const api: string = "http://transport.geogps.ge/get-live-bus-stop-time";


export const getRoute = async (routeId: string): Promise<TransportData> => {
		const payload = {routeId};
		const {data} = await axios.post<TransportData>(api, payload);
		return data;
}