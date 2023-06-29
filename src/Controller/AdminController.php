<?php
namespace App\Controller;
use App\Model\AdminModel;

Class AdminController{
    public $admin;

    public function __construct()
    {
        $this->admin = new AdminModel();
    }

    public function usersPanel(){

        echo json_encode($this->admin->selectUsers());
    }

    public function adminEditLogin($userId ,$login){
        $userId = htmlspecialchars($userId);
        $login = htmlspecialchars($login);
        
       return $this->admin->editLogin($userId, $login);
    }

    public function adminEditPassword($userId ,$password){
        $userId = htmlspecialchars($userId);
        $password = htmlspecialchars($password);
        $hashedPwd = password_hash($password, PASSWORD_DEFAULT);

        return $this->admin->editPassword($userId, $hashedPwd);
    }

    public function adminDeleteUser($userId){
        $userId = htmlspecialchars($userId);

        if($this->admin->ifAdmin($userId)){
            return "You can't delete admin";
        }else{
           return $this->admin->deleteUser($userId);
        }
    }
    
    public function comsPanel(){
        echo json_encode($this->admin->selectComs());
    }
        
    
}
?>