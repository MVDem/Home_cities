import { createSlice } from '@reduxjs/toolkit';
import { ICords, IinitialState } from '../types/type';

const initialState: IinitialState = {
  data: [],
  viewList: [],
  searchParams: {
    units: 'Fahrenheit',
  },
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (state: IinitialState, action) => {
      for (let key in action.payload) {
        if (action.payload.hasOwnProperty(key)) {
          state.data[+key] = action.payload[key];
          state.viewList[+key] = action.payload[key];
        }
      }
    },

    searchByName: (state: IinitialState, action) => {
      state.searchParams.searchString = action.payload;
      state.viewList = state.data.filter((e) => {
        if (e.name.toLowerCase().search(action.payload.toLowerCase()) !== -1) {
          return e;
        } else if (
          e.country.toLowerCase().search(action.payload.toLowerCase()) !== -1
        ) {
          return e;
        } else if (
          e.continent.toLowerCase().search(action.payload.toLowerCase()) !== -1
        ) {
          return e;
        }
        return null;
      });
    },

    searchByCountryName: (state: IinitialState) => {
      state.viewList = state.data.sort((a, b) => (a.name > b.name ? 1 : -1));
    },

    sortByContinent: (state: IinitialState, action) => {
      console.log('12');
      state.viewList = state.data.filter((e) => {
        if (
          e.continent.toLowerCase().search(action.payload.toLowerCase()) !== -1
        ) {
          return e;
        }
        return null;
      });
    },

    sortByDistance: (state: IinitialState, action) => {
      const distantion = (cordsLocation: ICords, cordsDestination: ICords) => {
        return Math.sqrt(
          Math.pow(cordsLocation.lat - cordsDestination.lat, 2) +
            Math.pow(cordsLocation.lng - cordsDestination.lng, 2)
        );
      };

      const location = state.data.find((e) => {
        return e.name === action.payload;
      });
      if (location) {
        state.viewList = state.data.sort((a, b) =>
          distantion(location!.coords, a!.coords) >
          distantion(location!.coords, b!.coords)
            ? 1
            : -1
        );
      }
    },

    // removeSort(state: IinitialState) {
    //   state.viewList = [];
    //   state.searchParams = {};
    // },

    setUserUnits: (state: IinitialState, action) => {
      state.searchParams.units = action.payload;
    },
  },
});

export const {
  setCities,
  searchByName,
  searchByCountryName,
  sortByContinent,
  sortByDistance,
  // removeSort,
  setUserUnits,
} = citiesSlice.actions;

export default citiesSlice.reducer;
