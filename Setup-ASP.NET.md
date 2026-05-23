# ASP.NET Core + EF Core + SQLite Starter Guide

Beginner-friendly setup guide for creating an ASP.NET Core Web API with Entity Framework Core and SQLite.

---

# Extensions (VS Code)

Install these extensions first:

- C# Dev Kit
- C#
- .NET Install Tool

---

# Useful Commands

## Auto Reload (เหมือน nodemon)

```bash
dotnet watch run
```

---

## Auto Test After Edit

```bash
dotnet watch test
```

---

# 1. Create Project

Create ASP.NET Core Web API project:

```bash
dotnet new webapi -n GameStore.Api
```

Enter project folder:

```bash
cd GameStore.Api
```

---

# 2. Install EF Core Packages

## SQLite Provider

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 10.0.8
```

---

## Design Package (For Migrations)

```bash
dotnet add package Microsoft.EntityFrameworkCore.Design --version 10.0.8
```

---

# 3. Install EF CLI Tool

## Check Installed Tools

```bash
dotnet tool list --global
```

---

## Install dotnet-ef

```bash
dotnet tool install --global dotnet-ef --version 10.0.8
```

---

## Update Version (If Wrong Version)

```bash
dotnet tool update --global dotnet-ef --version 10.0.8
```

---

# 4. Create Models

## Folder Structure

```txt
Models/
```

---

## Models/Game.cs

```csharp
namespace GameStore.Api.Models;

public class Game
{
    public int Id { get; set; }

    public string Name { get; set; } = "";
}
```

---

## Models/Genre.cs

```csharp
namespace GameStore.Api.Models;

public class Genre
{
    public int Id { get; set; }

    public string Name { get; set; } = "";
}
```

---

# 5. Create DbContext

## Folder Structure

```txt
Data/
```

---

## Data/GameStoreContext.cs

```csharp
using GameStore.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameStore.Api.Data;

public class GameStoreContext(
    DbContextOptions<GameStoreContext> options
) : DbContext(options)
{
    public DbSet<Game> Games => Set<Game>();

    public DbSet<Genre> Genres => Set<Genre>();
}
```

---

# 6. Register DbContext

## Program.cs

```csharp
using GameStore.Api.Data;

var builder = WebApplication.CreateBuilder(args);

var connString = "Data Source=GameStore.db";

builder.Services.AddSqlite<GameStoreContext>(connString);

var app = builder.Build();

app.Run();
```

---

# 7. Create Migration

```bash
dotnet ef migrations add InitialCreate
```

This creates:

```txt
Migrations/
```

---

# 8. Update Database

```bash
dotnet ef database update
```

This creates:

```txt
GameStore.db
```

---

# 9. Run Project

```bash
dotnet run
```

---

# Common Commands

## Add Migration

```bash
dotnet ef migrations add MigrationName --output-dir Data/Migrations
```

---

## Remove Last Migration

```bash
dotnet ef migrations remove
```

---

## Update Database

```bash
dotnet ef database update
```

---

## Drop Database

```bash
dotnet ef database drop
```

---

# Check Installed Packages

```bash
dotnet list package
```

---

# Check Installed Global Tools

```bash
dotnet tool list --global
```

---

# Important Concepts

| Thing | Meaning |
|---|---|
| DbContext | Database manager |
| DbSet<Game> | Games table |
| Game | One row/entity |
| Migration | Database schema history |
| EF Core | Converts C# ↔ SQL |
| dotnet-ef | EF CLI tool |

---

# Version Rule (IMPORTANT)

Keep EF Core versions aligned.

Example:

| Package | Version |
|---|---|
| EFCore.Sqlite | 10.0.8 |
| EFCore.Design | 10.0.8 |
| dotnet-ef | 10.0.8 |