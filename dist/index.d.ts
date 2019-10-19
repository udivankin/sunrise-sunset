
declare module 'sunrise-sunset-js' {
  function getSunrise(
    latitude: Number,
    longitude: Number,
    date?: Date,
  ): Date;

  function getSunset(
    latitude: Number,
    longitude: Number,
    date?: Date,
  ): Date;

  export { getSunrise, getSunset };
}
