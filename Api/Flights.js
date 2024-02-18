import { API_URL,authToken } from "./UrlsConfig";

// remember to add headers cose to fetch any of the flight a user needs to be authenticated, do it in node js first
export const listAllFlights = async () =>{
    try {
      const res = await fetch(`${API_URL}/flights`, {});
      if (res.status === 401) {
        throw new Error("Not authorized, please sign in");
      }
      if (res.status !== 200) {
        throw new Error("Error fetching the trips");
      }
      const data = await res.json();
      const trips = data.flights;
      return trips;
    } catch (error) {
      console.error("An error occurred while fetching trips: ", error);
    }

};

export const getFlight = async (id) => {
    try {
        const res = await fetch(`${API_URL}/flights/${id}`);
        if (res.status === 401) {
          throw new Error("Not authorized, please sign in");
        }
        if (res.status !== 200) {
          throw new Error("Error fetching the trips");
        }
        const data = await res.json();
        const trip = data.flight;
        return trip;
        
      } catch (error) {
        console.error("An error occurred while fetching trips: ", error);
      }
  

}