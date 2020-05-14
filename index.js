"use strict";

const express = require("express");
const router = express.Router();

module.exports = () => {
  const router = new SignUpRouter();
  router.post("/signup", new ExpressRouterAdapter.adapt(router));
};

class ExpressRouterAdapter {
  static adapt(router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body,
      };
      const httpResponse = await router.route(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}

// signup-router
// presentation
class SignUpRouter {
  async route(httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body;
    const user = new SignUpUseCase().signUp(email, password, repeatPassword);
    return {
      statusCode: 200,
      body: user,
    };
  }
}

// signup-usecase
// Domain: Use cases and entities
// This layer contains your business logic and defines how the layer outside of it can interact with it.
// Business logic is central to your application.
// In other words, we will have here our use cases representation.
// We can have here a representation of the events who can be fired from this layer.
class SignUpUseCase {
  async signUp(email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password);
    }
  }
}

// Application layer
// This layer orchestrates the use of the entities found in the Domain layer. It also adapts request from the Framework layer to the domain
// layer by isitting between the two.

// add-account-repo
// Infrastructure
// Ports and Adapters: We have here different libraries that we can change for another implementation.
// For example, we could use MongoDB as database but we can choose between Mongoose or MongoDB as driver for connect with the database engine.
const mongoose = require("mongoose");
const AccountModel = mongoose.model("Account");
class AddAccountRepository {
  async add(email, password) {
    const user = await AccountModel.create({ email, password });
    return user;
  }
}

// 1. Ports and Adapters
// 2. Application
