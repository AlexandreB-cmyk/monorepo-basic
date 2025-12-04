import { Button } from "@workspace/ui/components/button";
import { FilmAPI } from "@workspace/imdbapi";

export default async function Page() {
  const test = await FilmAPI.listFilms();
  console.log(test);
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
