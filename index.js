const express = require('express');
const mongoose = require('mongoose');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const users = require('./models/users');
const employees = require('./models/employees');    
const {ApolloServer, gql} = require('apollo-server-express');
const { graphql } = require('graphql');
const DB_URL = 'mongodb+srv://mehrad72:yZCk4KpLViZgXQP5@data-base.6fusqhj.mongodb.net/?retryWrites=true&w=majority';


async function startServer() {
    const app = express();
    const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({app, path: '/graphql'});
    mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });
    app.get('/', (req, res) => {
    res.redirect('/graphql');
    });
    app.listen(3000, function() {
    console.log('App listening on port 3000');
    });
}
startServer();