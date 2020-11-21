export function getFavouriteSFromLocalStorage(): number[] {
  const favourites = localStorage.getItem('favourites');
  if (!favourites) {
    return [];
  }
  try {
    return JSON.parse(favourites);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export function getFavouriteFromLocalStorage(stockNumber: number): boolean | null {
  const favourites = getFavouriteSFromLocalStorage();
  return favourites.includes(stockNumber);
}

export function saveFavouriteToLocalStorage(stockNumber: number): void {
  const favourites = getFavouriteSFromLocalStorage();
  favourites.push(stockNumber);
  localStorage.setItem('favourites', JSON.stringify(favourites));
}

export function removeFromFavouriteList(stockNumber: number): void {
  const favourites = getFavouriteSFromLocalStorage();
  const filtered = favourites.filter((fav) => fav !== stockNumber);
  localStorage.setItem('favourites', JSON.stringify(filtered));
}
