start:
	$(info Make: Starting containers.)
	@docker compose up -d

stop:
	$(info Make: Stopping containers.)
	@docker compose stop

restart:
	$(info Make: Restarting containers.)
	@docker compose restart

clean:
	@docker system prune --volumes --force

migration-generate:
	npm run build
	npx typeorm migration:generate -n $(filter-out $@,$(MAKECMDGOALS))

migration-run:
	npm run build
	npx typeorm migration:run
