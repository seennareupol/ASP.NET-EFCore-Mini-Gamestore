namespace GameStore.Api.Dtos;

public record GameDetailDto(
    int Id,
    string Name,
    int GenreId,
    decimal Price,
    DateOnly ReleaseDate
);