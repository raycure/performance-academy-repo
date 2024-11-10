import { createSlice } from '@reduxjs/toolkit';

const ProgramIdSlice = createSlice({
	name: 'selectedProgramId',
	initialState: {
		id: null,
	},
	reducers: {
		setId: (state, action) => {
			state.id = action.payload;
		},
		clearId: (state) => {
			state.id = null;
		},
	},
});

export const { setId, clearId } = ProgramIdSlice.actions;
export default ProgramIdSlice.reducer;
