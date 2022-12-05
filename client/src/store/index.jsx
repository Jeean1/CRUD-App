import { configureStore } from "@reduxjs/toolkit";
import userSlices from "./slices/user.slices";

export default configureStore({
  reducer: {
    user: userSlices,
  },
});
