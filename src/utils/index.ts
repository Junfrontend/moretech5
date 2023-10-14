import { busyBranchColors } from '../consts';

export const getJSONFromOfficies = (officies: any[]) => {
  return officies.map((office, index) => {
    return {
      "id": index,
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [office.latitude, office.longitude]
      },
      "properties": {
        "iconCaption": busyBranchColors[getRandomInt(3)]
      }
    };
  });
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}
