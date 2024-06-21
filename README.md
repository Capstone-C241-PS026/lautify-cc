
### API Endpoints

### User
| HTTP Method | Endpoints | Action |
| --- | --- | --- |
| POST | /api/users | To store user data into database |
| GET | /api/users | To get all user |
| GET | /api/users/:uid | To get spesific user |
| PUT | /api/users/:uid | To update user data |

### Recipe
| HTTP Method | Endpoints | Action |
| --- | --- | --- |
| POST | /api/recipes/save/:uid | To saved recipe  |
| GET | /api/recipes/save/:uid/:rid | To get spesific saved recipe |
| GET |/api/recipes/save/:uid| To get all saved recipe|
| GET | /api/recipes | To get all recipe from third party api|
| GET | /api/recipes/:rid | To get spesific recipe from third party api |
| GET | /api/recipes/fish/search?query={search}| To search recipe from third party api |
| DELETE | /api/recipes/save/:uid/:rid | To deletec saved recipe |


### Technologies Used
* [NodeJS](https://nodejs.org/) 
* [ExpressJS](https://www.expresjs.org/) 
* [Firebase](https://firebase.google.com/?hl=id)
