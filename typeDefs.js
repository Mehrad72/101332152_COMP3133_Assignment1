const {gql} = require('apollo-server-express');

const typeDefs = gql`
enum Gender {
    male
    female
    other
  }
    type User {
        username: String!
        email: String!
        password: String!
    }
    type Employee {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        gender: Gender!
        salary: Float!
      }
    type Query {
        login(username: String!, password: String!): User
        getEmployee(id: ID!): Employee
        employees: [Employee]
    }
    type Mutation {
        signup(username: String!, email: String!, password: String!): User
        addEmployee(firstName: String!, lastName: String!, email: String!, gender: String!, salary: Float!): Employee
        updateEmployee(id: ID!, firstName: String, lastName: String, email: String, gender: Gender, salary: Float): Employee
        deleteEmployee(id: ID!): Employee
}
`;
module.exports = typeDefs;