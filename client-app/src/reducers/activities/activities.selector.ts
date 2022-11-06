import { createSelector } from "reselect";

const selectCategoryReducer = (state: any) => state.categories;

export const selectActivities = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);
