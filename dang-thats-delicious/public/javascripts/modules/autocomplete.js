function autocomplete(input, latInput, lngInput) {
  if (!input) return; // skip if no address field on the page
  const dropdown = new google.maps.places.Autocomplete(input);
}

export default autocomplete;
