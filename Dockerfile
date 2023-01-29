FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG Configuration=Release

EXPOSE 8080
WORKDIR /app

#restoring dependencies
COPY ./*.sln ./
COPY API/*.csproj ./API/
COPY Application/*.csproj ./Application/
COPY Persistence/*.csproj ./Persistence/
COPY Domain/*.csproj ./Domain/
COPY Infrastructure/*.csproj ./Infrastructure/

RUN dotnet restore

# copying other neccessary data and building application
COPY ./ ./
RUN dotnet publish -c $Configuration -o build

#building a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

COPY --from=build /app/build ./
ENTRYPOINT ["dotnet", "API.dll"]