package com.ngabonziza.user.models;

import java.util.regex.*;

import com.ngabonziza.database.Users;
import com.ngabonziza.user.utils.ApiResponse;

public class Admin extends User {
  @Override
  public ApiResponse<User> signup() throws Exception {
    if (!Pattern.matches("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*$", getEmail())) {
      throw new Exception("Invalid email address!");
    }
    if (Users.findUser(getEmail()) != null) {
      throw new Exception("User already exists");
    }
    if (!Pattern.matches("^[a-zA-z0-9*!@_\\-#$%^&]{10}$", getPassword())) {
      throw new Exception("Password must be 10 characters!");
    }
    encryptPassword();
    Users.addUser(this);
    return new ApiResponse<>("Admin successfully registered!", Users.findUser(getEmail()));
  }
}
