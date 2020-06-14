import { Reducer } from 'redux';

interface PeopleState {
    readonly loading: boolean;
    readonly posting: boolean;
}

const initialPeopleState: PeopleState = {
    loading: false,
    posting: false,
};

export const peopleReducer: Reducer<PeopleState> = (state = initialPeopleState) => {
    return state;
};
