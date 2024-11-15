import { createSlice } from '@reduxjs/toolkit';

const CalenderEventSlice = createSlice({
	name: 'calendarSelectedEventId',
	initialState: {
		id: null,
	},
	reducers: {
		setEventId: (state, action) => {
			state.id = action.payload;
		},
		clearEventId: (state) => {
			state.id = null;
		},
	},
});

export const { setEventId, clearId } = CalenderEventSlice.actions;
export default CalenderEventSlice.reducer;
