/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/results/day/:day/part/:part/file/:file/times/:times", async (ctx) => {
  const { default: SolversController } = await import("App/Controllers/Http/SolversController");
  return new SolversController().results(ctx);
})
  .where("day", Route.matchers.number())
  .where("part", Route.matchers.number())
  .where("file", Route.matchers.number())
  .where("times", Route.matchers.number());
