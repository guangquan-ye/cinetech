<!-- <form action="login" method="POST" class="logForm">
    <input type="text" name="logLogin" placeholder="Login">
    <input type="password" name="logPwd" placeholder="Password">
    <button type="submit" name="logBtn">Login</button>
</form> -->

<div class="login-box">

  <h2>Login</h2>
  <form action="login" method="POST" class="logForm">
    <div class="user-box">
      <input type="text" name="logLogin" required="">
      <label>Login</label>
    </div>
    <div class="user-box">
      <input type="password" name="logPwd" required="">
      <label>Password</label>
    </div>
    <button type="submit" name="logBtn" class="authBtn">Login</button>
  </form>
</div>