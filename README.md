`https://github.com/ridhwaans/chat_app`

- [Simple chat application](#simple-chat-application)
  * [technologies used](#technologies-used)
  * [questions and answers](#questions-and-answers)
  * [next steps](#next-steps)
  * [installation instructions](#installation-instructions)
  * [testing](#testing)
    + [running instructions](#running-instructions)

# Simple chat application

## technologies used

ruby 3.0.0  
rails 6.1.1  
postgres 12  
react 17  

## questions and answers

Q) How do you know if your code works?  
A) I like to automate testing such as unit tests, integration and end-to-end tests if any that verify the functionality of the features & pieces of the code. I feel safe and confident as a developer to ship working code that is backed by a test suite. Also, code reviews should be enforced which promotes code maintainability for all stakeholders. See [testing](#testing) for more information.  

Q) How are you going to teach new users how to use the application?  
A) The majority of the project time was spent setting up the environment, the intended technologies and test feedback loop. Keep the application well-documented at every level with inline comments and design docs before checking in, it helps with the flow, usability, and identifies edge cases or specific uses which may not be clearly apparent.  

Q) What assumptions did you make?  
A) The chat front-end and api are decoupled to run on different ports to allow for multiple clients on the same chat server. The database used is for persisting the user profiles, messages & channels.  
Websockets should be used when you need real-time interactions, such as propagating the same message to multiple users (group messaging) in a chat app. Websockets are based on TCP connections (two-way communication), whereas RESTful APIs are stateless server-side and map resources to the app.   
It is a good practice to introduce a continuous integration & continuous deployment system across the project. With continuous delivery, new users will be able to use the latest version of the application, get notified of upcoming updates and rollback any changes if necessary.  

## next steps

Q) Possible next steps if you had more time.  
A) If I had more time, I will:  
1) prioritize the core functionality of the application to meet the front-end and back-end requirements  
2) contribute more test cases to achieve an above 90% test coverage across the application  
3) work on setting up a live demo instance using a platform as a service such as Heroku. As a result, it will eliminate setup & installation times  
4) containerize the application to reduce installation complexity and system depedencies. Using Docker or similar   orchestration, one can setup service discovery and provide runnable images that help with platform independence  
5) refactor SOLID/design patterns, cleanup any unnecessary code or dependencies, invest in more automation tooling such as selenium/jest for front-end testing, test factories, code coverage tooling, CI/CD  
6) add screenshots, more notes on assumptions, tradeoffs in design & implementation  
  
## installation instructions

1) Make sure git is installed by running `git --version`, if not installed, see the following:  
a) if on Mac,
```
brew update
brew tap homebrew/versions
brew upgrade --all
brew install git
```
if on Linux Ubuntu
```
apt update
apt install git
```
Other Linux package managers include pacman, yum, rpm etc  

2) Install PostgreSQL, NPM and Ruby on Rails. It is *recommended* to install a Ruby version manager such as `rbenv` to manage application environments.  
a) if on Mac or Linux Ubuntu, in Terminal  
```
$ brew install postgresql
- OR -
$ apt install postgresql postgresql-contrib
``` 
```
$ brew install node
- OR -
$ apt install nodejs
```
```
$ cd ~/dotfiles
$ git init
$ git submodule add -f git@github.com:rbenv/rbenv.git .rbenv
$ cd .rbenv
$ git submodule add -f git@github.com:rbenv/ruby-build.git plugins/ruby-build
$ git submodule add -f git@github.com:jf/rbenv-gemset.git plugins/rbenv-gemset
$ cd plugins/ruby-build
$ git pull 
$
$ rbenv install --list
$ rbenv install <ruby_version> 
$ rbenv global <ruby_version>
$ gem install rails
$ gem install bundler
```  
notes:  
`<ruby_version>` used is `3.0.0`. `rbenv` can set shell, local, global versions  
for web installers, visit `https://www.ruby-lang.org/en/`, `https://www.postgresql.org/download/`, `https://nodejs.org/en/`  

3) if on Windows, get Linux and Windows Terminal
```
GET Windows Subsystem for Linux https://docs.microsoft.com/en-us/windows/wsl/install-win10#update-to-wsl-2
GET Ubuntu 20.04 LTS (Focal Fossa) from the Microsoft Store
GET Windows Terminal https://docs.microsoft.com/en-us/windows/terminal/get-started
```
Follow the installation instructions for Linux Ubuntu from step 2 previously  

4) Download the project and setup the environment  
a) Database
- In terminal, run `sudo service postgresql start` to start the postgres database server. Check using `pg_lsclusters`  
- PostgreSQL server should be running on port `5432`  
- Create the user we specified in `chat_app_api/config/database.yml`'s development section:  
```
$ sudo -u postgres createuser -s developer
$ sudo -u postgres psql
postgres=# \password developer
Enter and confirm the password. Then exit the PostgreSQL client
postgres=# \q
```
b) In terminal, clone the `chat_app` GitHub repository using the provided HTTPS or SSH URL  
c) `cd` to the `chat_app` directory containing the front-end client and back-end API projects  

d) Back-end  
- `cd` to the `chat_app_api` subdirectory  
- run `bundle install`  
- after the postgres server is running, run `rake db:migrate` to migrate the application database  
- run `rails s` to start the API on port `3000`  
- open `localhost:3000` in the browser  

e) Front-end  
- `cd` to the `chat_app_client` subdirectory  
- run `npm install`  
- run `yarn start` to start the client on port `3001`  
- open `localhost:3001` in the browser  

f) Exit the server(s) `ctrl-c or ^C`  

## testing

### running instructions
- if not already, setup the environment following [installation instructions](#installation-instructions)  
- `cd` to the `chat_app/chat_app_api` subdirectory  
- run `rspec spec/models/user_spec.rb` for the user tests  
- User base cases, edge cases described in `chat_app/chat_app_api/spec/models/user_spec.rb`  

Due to brevity of time, full test coverage is due to be completed. Unit tests are for demonstration purposes.
While I have a working functional solution, I have yet to produce the full test coverage and documentation to meet the high bar & expectation I was aiming for.  

Additional test cases to do include:  

Back-End Features  
1. Test if I can persist my chat messages  
2. Test if I can persist messages in specific channels I join  
3. Test if I can see the list of all the available channels  
4. Test if I can receive gif suggestions  
5. Test if I can look up other users and channels  
6. Test if I can see chat statistics of users and channels  

Front-End Features  
1. Test if I can see a list of all the channels  
2. Test if I can join a channel and see the history of it  
3. Test if I can send messages to a channel after I have joined it  
4. Test if I can edit my previous messages  
5. Test if I can delete my messages  
6. Test if I can search for my previous messages  
7. Test if I can interact with received messages in a channel and reply to them  