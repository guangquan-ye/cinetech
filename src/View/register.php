<!-- <form method="POST" action="register" class="regForm">
    <input type="text" name="regLogin" placeholder="Login">
    <input type="password" name="regPwd" placeholder="Password">
    <input type="password" name="regPwdConf" placeholder="Confirm">
    <button type ="submit" name ="regBtn">Submit</button>
</form> -->

<div class="login-box">
  <h2>Register</h2>
  <form action="register" method="POST" class="regForm">
    <div class="user-box">
      <input type="text" name="regLogin" required="">
      <label>Login</label>
    </div>
    <div class="user-box">
      <input type="password" name="regPwd" required="">
      <label>Password</label>
    </div>
    <div class="user-box">
      <input type="password" name="regPwdConf" required="">
      <label>Confirm</label>
    </div>
    <button type="submit" name="regBtn" class="authBtn">Register</button>
  </form>
</div>