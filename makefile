build:
	docker build . --build-arg RAILS_MASTER_KEY=${DATEFEED_ENCKEY} -f Dockerfile -t date_feed
run:
	docker run -p 5000:3000 -e RAILS_MASTER_KEY=${DATEFEED_ENCKEY} --rm -ti date_feed:latest
bash:
	docker run -e RAILS_MASTER_KEY=${DATEFEED_ENCKEY} --rm -ti date_feed:latest bash
prod_console:
	ssh Budgetr -t docker run -e RAILS_MASTER_KEY=${DATEFEED_ENCKEY} --rm -ti ericroos13/date_feed:latest bundle exec rails c
new_prod_console:
	ssh Budgetr -t docker-compose run --rm app bundle exec rails c
create_db:
	docker run -e RAILS_MASTER_KEY=${DATEFEED_ENCKEY} --rm -ti date_feed:latest bundle exec rake db:create
migrate_db:
	docker run -e RAILS_MASTER_KEY=${DATEFEED_ENCKEY} --rm -ti date_feed:latest bundle exec rake db:migrate
push_image:
	docker tag date_feed:latest ericroos13/date_feed && docker tag date_feed:latest ericroos13/date_feed && docker push ericroos13/date_feed
deploy:
	ssh Budgetr /home/ec2-user/deploy.sh
circle_ci_deploy:
	ssh ec2-user@54.224.120.0 /home/ec2-user/deploy.sh
deploy_pipeline:
	make build push_image migrate_db deploy
circleci_deploy_pipeline:
	make build push_image migrate_db circle_ci_deploy
edit_prod_secret:
	EDITOR=vim bundle exec rails credentials:edit --environment production

