# Notnest

<p>Notnest is MERN stack app to keep track for your notes.</p>

<a target="_blank" href="https://notnest.herokuapp.com/">Demo</a>

> Create your own account or use this account
> > Email: `test@gmail.com`
> >
> > Password: `12345`



#### Features:
* Login/ Sign up

* JWT Authentication

* View Note

* Create Note

* Edit Note

* Delete Note

  

#### Development Setup
> Note: Make sure you have an account in Mongo DB Atlas.
1. Clone the repo ```$ git clone https://github.com/subhendu17620/notnest-mern.git```
2. Make a `.env` file in root. Eg.
``` 
PORT = 5000
MONGO_URL=mongodb+srv://subhendu:subhendu@cluster0.qthyq.mongodb.net/<dbname>?retryWrites=true&w=majority
TOKEN_SECRET = i_am_ironman
```
3. Once you have created `.env` file,  run
```
$ npm run install-all
$ npm run dev
```
4. Voila !!



#### Author

* Subhendu Maji
