<?php
namespace App\Controller;

use App\Model\UserModel;

Class UserController{
    
    public $user;

    public function __construct()
    {
        $this->user = new UserModel();
    }

    public function regFormDisplay(){

        require_once "./src/View/register.php";
    }

    public function logFormDisplay()
    {
        require_once "./src/View/login.php";
    }
    
    public function displayReply()
    {
        require_once "./src/View/comment.php";
    }

    public function createUsers($login, $password, $passwordConf)
    {

        if($password == $passwordConf){
            
            if($this->user->verifyExist($login)){
                echo "Login already exist";
            }else{
                $specialLogin = htmlspecialchars($login);
                $specialPwd = htmlspecialchars($password);
                $hashedPwd = password_hash($specialPwd, PASSWORD_DEFAULT);
                $this->user->insert($specialLogin, $hashedPwd);

                echo "Succesfully Submit";
            }   
            
        }
        else{
            echo "Pwd and confirm do not match";
        }
        
    }
    public function ifExist($login)
    {
        htmlspecialchars($login);
        
        return $this->user->ifLoginExist($login);
    }

    public function connect($login, $password){

        htmlspecialchars($login);
        htmlspecialchars($password);

        $result = $this->ifExist($login);

        if (password_verify($password, $result["password"])) {
          $_SESSION["user"] = [
              "id" => $result["id"],
              "login" => $result["login"]
          ];
          echo "Welcome";
         
         }
        else{
            echo "Wrong login or pwd" ;
        }
      }

      public function logout(){
        session_destroy();
        header('Location: /cinetech');
      }
    
}
?>