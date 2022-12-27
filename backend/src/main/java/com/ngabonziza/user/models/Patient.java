package com.ngabonziza.user.models;

import java.util.regex.Pattern;

import com.ngabonziza.database.Users;
import com.ngabonziza.user.utils.ApiResponse;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Patient extends User {
  @Override
  public ApiResponse<User> signup() throws Exception {
    if (!Pattern.matches("^[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\\.[a-zA-Z0-9]+)*$", getEmail())) {
      throw new Exception("Invalid email address!");
    }
    if (Users.findUser(getEmail()) != null) {
      System.out.println("Patient already exists");
      throw new Exception("User already exists");
    }
    if (!Pattern.matches("^[a-zA-z0-9*!@_\\-#$%^&]{6}$", getPassword())) {
      throw new Exception("Password must be 6 characters!");
    }
    encryptPassword();
    Users.addUser(this);
    return new ApiResponse<>("Patient successfully registered!", Users.findUser(getEmail()));
  }
}
