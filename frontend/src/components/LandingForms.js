export const Login = ({ switchFormHandler }) => {
  return (
    <>
      <input
        required
        name="username"
        class="input"
        type="text"
        placeholder="Username"
      />
      <input
        required
        name="password"
        class="input"
        type="password"
        placeholder="Password"
      />
      <div class="row">
        <input class="btn" type="submit" value="Sign in" />
        <p class="alternate">
          No account? Create one{" "}
          <a href="/" onClick={switchFormHandler}>
            here
          </a>
        </p>
      </div>
    </>
  );
};

export const Register = ({ switchFormHandler }) => {
  return (
    <>
      <input
        required
        name="username"
        class="input"
        type="text"
        placeholder="Username"
      />
      <input
        required
        name="email"
        class="input"
        type="email"
        placeholder="Email"
      />
      <input
        required
        name="password"
        class="input"
        type="password"
        placeholder="Password"
      />
      <input
        required
        name="confirm_password"
        class="input"
        type="password"
        placeholder="Confirm Password"
      />
      <div class="row">
        <input class="btn" type="submit" value="Sign up" />
        <p class="alternate">
          Already have an account?{" "}
          <a href="/" onClick={switchFormHandler}>
            Sign in
          </a>
        </p>
      </div>
    </>
  );
};
