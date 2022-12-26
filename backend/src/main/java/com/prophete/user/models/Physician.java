package com.prophete.user.models;

import java.util.regex.Pattern;

import com.prophete.database.Users;
import com.prophete.user.utils.ApiResponse;

public class Physician extends User {
  @Override
  public ApiResponse<User> signup() throws Exception {
    if (!Pattern.matches("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*$", getEmail())) {
      throw new Exception("Invalid email address!");
    }
    if (Users.findUser(getEmail()) != null) {
      throw new Exception("User already exists");
    }
    if (!Pattern.matches("^[a-zA-z0-9*!@_\\-#$%^&]{8}$", getPassword())) {
      throw new Exception("Password must be 4 characters!");
    }
    encryptPassword();
    Users.addUser(this);
    return new ApiResponse<>("physician successfully registered!", Users.findUser(getEmail()));
  };

}
