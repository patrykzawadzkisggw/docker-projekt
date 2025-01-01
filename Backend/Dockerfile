FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build

WORKDIR /app

RUN apk add --no-cache icu-libs

COPY *.csproj ./
RUN dotnet restore

COPY . ./

RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine

WORKDIR /app

RUN apk add --no-cache icu-libs

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false

COPY --from=build /publish ./



ENTRYPOINT ["dotnet", "Backend.dll"]
