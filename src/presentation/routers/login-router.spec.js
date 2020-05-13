class LoginRouter {
  route(httpRequest) {
    if (!httpRequest.body.email) {
      return { statusCode: 400 };
    }
  }
}

describe("Login Router", () => {
  test("Should return 400 if not email is provided", () => {
    const loginRouter = new LoginRouter();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };
    const httpResponse = loginRouter.route(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
