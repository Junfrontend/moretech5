export const getJSONFromOfficies = (officies: any[]) => {
  return officies.map((office, index) => {
    return {
      "id": index,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [office.latitude, office.longitude]},
    }
  });
};
