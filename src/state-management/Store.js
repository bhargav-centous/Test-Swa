
import { configureStore } from '@reduxjs/toolkit';

import getListReducer from './CommonSlice/getListSlice';
import scoringPartnerTypeReducer from './Settings/SettingSlice';

export default configureStore({
    reducer: {
        scoringPartnerType: scoringPartnerTypeReducer,
        list: getListReducer
    },
});
