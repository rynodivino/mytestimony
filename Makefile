test:
	./node_modules/mocha/bin/mocha \
		--reporter spec

startapp: 
	bin/start-app.sh 

startappdev: 
	bin/start-app-dev.sh 

stop:
	bin/stop-app.sh

.PHONY: test
