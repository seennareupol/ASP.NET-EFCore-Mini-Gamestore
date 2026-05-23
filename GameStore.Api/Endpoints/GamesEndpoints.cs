using GameStore.Api.Data;
using GameStore.Api.Dtos;
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Endpoints
{
    public static class GamesEndpoints
    {
        private const string getGameEndpointName = "GetGame";

        public static void MapGamesEndpoints(this WebApplication app)
        {
            var group = app.MapGroup("games");
            // GET /games
            group.MapGet("/", async (GameStoreContext dbContext) => 
                await dbContext.Games
                .Include(game => game.Genre)
                .Select( game => new GameSummaryDto(
                    game.Id,
                    game.Name,
                    game.Genre!.Name,
                    game.Price,
                    game.ReleaseDate
                ))
                .AsNoTracking()
                .ToListAsync());

            // GET /games/{id}
            group.MapGet("/{id}", async (int id, GameStoreContext dbContext) => 
            {
                var game = await dbContext.Games.FindAsync(id);
                if(game is null)
                {
                    return Results.NotFound();
                }
                GameDetailDto gameDto = new (
                    id,
                    game.Name ,
                    game.GenreId,
                    game.Price,
                    game.ReleaseDate
                );
                return game is null ? Results.NotFound() : Results.Ok(
                    gameDto
                );
            }).WithName(getGameEndpointName);

            // POST /games
            group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext) =>
            {
                Game game = new()
                {
                    Name = newGame.Name,
                    GenreId = newGame.GenreId,
                    Price = newGame.Price,
                    ReleaseDate = newGame.ReleaseDate
                };
                
                dbContext.Games.Add(game);
                await dbContext.SaveChangesAsync();
                GameDetailDto gameDto = new (game.Id, newGame.Name, newGame.GenreId, newGame.Price, newGame.ReleaseDate);
                

                return Results.CreatedAtRoute(getGameEndpointName, new { id = gameDto.Id }, gameDto);
            });

            // PUT /games/{id}
            group.MapPut("/{id}", async (int id, UpdateGameDtos updateGame, GameStoreContext dbContext) =>
            {
                var existingGame = await dbContext.Games.FindAsync(id);

                if (existingGame is null)
                {
                    return Results.NotFound();
                }

                existingGame.Name = updateGame.Name;
                existingGame.GenreId = updateGame.GenreId;
                existingGame.Price = updateGame.Price;
                existingGame.ReleaseDate = updateGame.ReleaseDate;

                await dbContext.SaveChangesAsync();

                return Results.NoContent();
            });

            // DELETE /games
            group.MapDelete("/{id}", async (int id, GameStoreContext dbContext) =>
            {
                await dbContext.Games.Where(game => game.Id == id)
                .ExecuteDeleteAsync();

                return Results.NoContent();
            });
        }


    }
}