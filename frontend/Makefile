.PHONY: help install dev build start clean test lint format docker-build docker-up docker-down docker-logs

# Variables
DOCKER_COMPOSE = docker-compose
DOCKER_COMPOSE_DEV = docker-compose -f docker-compose.yml
DOCKER_COMPOSE_PROD = docker-compose -f docker-compose.prod.yml
NPM = npm

# Colors for output
COLOR_RESET = \033[0m
COLOR_BOLD = \033[1m
COLOR_GREEN = \033[32m
COLOR_YELLOW = \033[33m
COLOR_BLUE = \033[34m

## help: Display this help message
help:
	@echo "$(COLOR_BOLD)Risk-Based Internal Audit - Frontend$(COLOR_RESET)"
	@echo ""
	@echo "$(COLOR_GREEN)Available targets:$(COLOR_RESET)"
	@grep -E '^## ' Makefile | sed 's/## /  /' | column -t -s ':'

## install: Install dependencies
install:
	@echo "$(COLOR_BLUE)Installing dependencies...$(COLOR_RESET)"
	$(NPM) install

## dev: Start development server
dev:
	@echo "$(COLOR_BLUE)Starting development server...$(COLOR_RESET)"
	$(NPM) run dev

## build: Build for production
build:
	@echo "$(COLOR_BLUE)Building for production...$(COLOR_RESET)"
	$(NPM) run build

## start: Start production server
start:
	@echo "$(COLOR_BLUE)Starting production server...$(COLOR_RESET)"
	$(NPM) run preview

## clean: Clean build artifacts and dependencies
clean:
	@echo "$(COLOR_YELLOW)Cleaning build artifacts...$(COLOR_RESET)"
	rm -rf node_modules .nuxt .output dist

## test: Run tests
test:
	@echo "$(COLOR_BLUE)Running tests...$(COLOR_RESET)"
	$(NPM) run test

## test-unit: Run unit tests
test-unit:
	@echo "$(COLOR_BLUE)Running unit tests...$(COLOR_RESET)"
	$(NPM) run test:unit

## test-e2e: Run end-to-end tests
test-e2e:
	@echo "$(COLOR_BLUE)Running e2e tests...$(COLOR_RESET)"
	$(NPM) run test:e2e

## lint: Run linter
lint:
	@echo "$(COLOR_BLUE)Running linter...$(COLOR_RESET)"
	$(NPM) run lint

## lint-fix: Fix linting issues
lint-fix:
	@echo "$(COLOR_BLUE)Fixing linting issues...$(COLOR_RESET)"
	$(NPM) run lint:fix

## format: Format code
format:
	@echo "$(COLOR_BLUE)Formatting code...$(COLOR_RESET)"
	$(NPM) run format

## type-check: Run TypeScript type checking
type-check:
	@echo "$(COLOR_BLUE)Running type check...$(COLOR_RESET)"
	$(NPM) run type-check

## docker-build: Build Docker image
docker-build:
	@echo "$(COLOR_BLUE)Building Docker image...$(COLOR_RESET)"
	docker build -t rbia-frontend:latest .

## docker-build-dev: Build Docker image for development
docker-build-dev:
	@echo "$(COLOR_BLUE)Building Docker image for development...$(COLOR_RESET)"
	docker build -f Dockerfile.dev -t rbia-frontend:dev .

## docker-up: Start Docker containers (development)
docker-up:
	@echo "$(COLOR_BLUE)Starting Docker containers (development)...$(COLOR_RESET)"
	$(DOCKER_COMPOSE_DEV) up -d

## docker-up-prod: Start Docker containers (production)
docker-up-prod:
	@echo "$(COLOR_BLUE)Starting Docker containers (production)...$(COLOR_RESET)"
	$(DOCKER_COMPOSE_PROD) up -d

## docker-down: Stop Docker containers
docker-down:
	@echo "$(COLOR_YELLOW)Stopping Docker containers...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) down

## docker-logs: View Docker logs
docker-logs:
	@echo "$(COLOR_BLUE)Viewing Docker logs...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) logs -f

## docker-restart: Restart Docker containers
docker-restart:
	@echo "$(COLOR_BLUE)Restarting Docker containers...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) restart

## docker-shell: Open shell in Docker container
docker-shell:
	@echo "$(COLOR_BLUE)Opening shell in Docker container...$(COLOR_RESET)"
	docker exec -it rbia-frontend-dev sh

## docker-clean: Remove Docker containers and images
docker-clean:
	@echo "$(COLOR_YELLOW)Removing Docker containers and images...$(COLOR_RESET)"
	$(DOCKER_COMPOSE) down -v --rmi all

## ci: Run CI checks (lint, type-check, test)
ci: lint type-check test
	@echo "$(COLOR_GREEN)All CI checks passed!$(COLOR_RESET)"
