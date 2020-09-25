FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["FilmesApp/FilmesApp.API/FilmesApp.API.csproj", "FilmesApp.API/"]
COPY ["FilmesApp/FilmesApp.Infrastructure/FilmesApp.Infrastructure.csproj", "FilmesApp.Infrastructure/"]
COPY ["FilmesApp/FilmesApp.Core/FilmesApp.Core.csproj", "FilmesApp.Core/"]
RUN dotnet restore "FilmesApp.API/FilmesApp.API.csproj"
COPY ./FilmesApp .
WORKDIR "/src/FilmesApp.API"
RUN dotnet build "FilmesApp.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FilmesApp.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FilmesApp.API.dll"]