## Installation (install all dependencies)

```bash
$ npm install
```
## database connection
```bash
# you should have mysql install on you pc 
# in the app.module file you should provide value for username , password , database
$@Module({
$ imports: [TaskModule, AuthModule , TypeOrmModule.forRoot({
$  type: 'mysql', 
$  username: 'YOUR USER NAME',
$  password:'YOUR PASSWORD',
$  database:'YOUR DATABASE NAME',
$  autoLoadEntities:true,
$  synchronize:true,
$  port:3306,
$  host:'localhost'
$    })],
$ controllers: [],
$ providers: [],
$})
```

## Running the app

```bash
# run the app
$ npm run start

```

## Run the server
```bash
# under the src directory inside the frontend open the login.html file and run it on live server
```
## description of the application

```bash
# the app has three pages - login , sing up and task management page
# you can first sign up and then login 
# this will take you to the main page of the application where you can manage your task 
```

