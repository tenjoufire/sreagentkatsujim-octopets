FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY backend/Octopets.Backend.csproj backend/
COPY servicedefaults/Octopets.ServiceDefaults.csproj servicedefaults/

RUN dotnet restore backend/Octopets.Backend.csproj

COPY backend/. backend/
COPY servicedefaults/. servicedefaults/

RUN dotnet publish backend/Octopets.Backend.csproj \
    -c Release \
    -o /app/publish \
    /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app

ENV ASPNETCORE_HTTP_PORTS=8080

EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Octopets.Backend.dll"]