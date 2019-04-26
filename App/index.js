import React from "react";
import AppNavigation from "./navigation";
import { FavoritesProvider } from "./util/ListManager";

export default () => (
  <FavoritesProvider>
    <AppNavigation />
  </FavoritesProvider>
);
