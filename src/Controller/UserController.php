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
    

    public function createUsers($login, $password, $passwordConf)
    {

        if($password == $passwordConf){
            
            if($this->user->verifyExist($login)){

            }else{
                $this->user->insert($login, $password);
                header('Location: /cinetech');
            }
        }
    }
    public function ifExist($login)
    {
        return $this->user->ifLoginExist($login);
    }

    public function connect($login, $password){

        $result = $this->ifExist($login);
         if($result["password"] == $password){
          $_SESSION["user"] = [
              "id" => $result["id"],
              "login" => $result["login"]
          ];
          header('Location: /cinetech');
         }
      }

      public function logout(){
        session_destroy();
        header('Location: /cinetech');
      }
    
    
}
?>