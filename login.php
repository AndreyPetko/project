<?php


$login = $_GET['login'];
$password = $_GET['password'];

$users = [];


$users[] = [
    'login' => 'admin',
    'password' => 1234
];

$success = false;


foreach ($users as $key => $user) {
    if($user['login'] == $login && $user['password'] == $password) {
        $success = true;
        break;
    }
}

echo $success;