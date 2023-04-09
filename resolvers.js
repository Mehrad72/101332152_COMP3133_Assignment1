const Employee = require('./models/employees');
const User = require('./models/users');
const resolvers = {
  Query: {
    getEmployee: async (parent, { id }) => {
        try {
          const employee = await Employee.findById(id);
          if (!employee) {
            throw new Error('Employee not found');
          }
          return employee;
        } catch (err) {
          throw err;
        }
      },
      employees: async () => {
        try {
          const employees = await Employee.find();
          if (!employees) {
            throw new Error('No employees found.');
          }
          return employees;
        } catch (err) {
          throw err;
        }
      },
    login: async (parent, args) => {
        const { username, password } = args;
        const user = await User.findOne({ username, password });
  
        if (!user) {
          throw new Error('Invalid login credentials');
        }
  
        return user;
    },

  },
  Mutation: {
    signup: async (parent, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User with this email already exists');
        }
        const user = new User({
          username,
          email,
          password,
        });
        const savedUser = await user.save();
        return savedUser;
      } catch (err) {
        throw err;
      }
    },
    addEmployee: async (parent, { firstName, lastName, email, gender, salary }) => {
      try {
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
          throw new Error('Employee with this email already exists');
        }
        const employee = new Employee({
          firstName,
          lastName,
          email,
          gender,
          salary,
        });
        const savedEmployee = await employee.save();
        return savedEmployee;
      } catch (err) {
        throw err;
      }
    },
    updateEmployee: async (parent, { id, firstName, lastName, email, gender, salary }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
          firstName,
          lastName,
          email,
          gender,
          salary,
        }, { new: true });
        if (!updatedEmployee) {
          throw new Error('Employee not found');
        }
        return updatedEmployee;
      } catch (err) {
        throw err;
      }
    },
    deleteEmployee: async (parent, { id }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
          throw new Error('Employee not found');
        }
        return deletedEmployee;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = resolvers;
