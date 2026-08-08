# ==========================================
# Multi-Stage Dockerfile for C# Logging Service
# CDAC Project Deployment Standard
# ==========================================

# STAGE 1: Build Phase
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project definition and restore NuGet packages
COPY ["LoggingService.csproj", "./"]
RUN dotnet restore "LoggingService.csproj"

# Copy source code and publish release binaries
COPY . .
RUN dotnet publish "LoggingService.csproj" -c Release -o /app/publish /p:UseAppHost=false

# STAGE 2: Runtime Phase
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Expose port 5020
EXPOSE 5020
ENV ASPNETCORE_URLS=http://+:5020

# Run the compiled ASP.NET Core service
ENTRYPOINT ["dotnet", "LoggingService.dll"]
