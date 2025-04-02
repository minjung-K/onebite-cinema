export default async function fetchOneMovie(id: number) {
  const url = `https://onebite-cinema-api-main-bay.vercel.app/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
