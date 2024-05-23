export function getCountries(): string[] {
  const A = 65;
  const Z = 90;
  const countries: string[] = [];
  const countryName = new Intl.DisplayNames(['en'], { type: 'region' });
  for (let i = A; i <= Z; ++i) {
    for (let j = A; j <= Z; ++j) {
      const code = String.fromCharCode(i) + String.fromCharCode(j);
      const name = countryName.of(code);
      if (code !== name && name) {
        countries.push(name);
      }
    }
  }

  return [...new Set(countries)];
}
