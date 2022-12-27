package com.ngabonziza.user.models;

import java.util.UUID;

import javax.naming.AuthenticationException;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import com.ngabonziza.user.utils.ApiResponse;
import com.google.gson.annotations.Expose;
import com.ngabonziza.database.Users;
import com.ngabonziza.user.enums.EGender;
import com.ngabonziza.user.enums.ERole;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.mindrot.jbcrypt.*;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public abstract class User {
  private String id;
  @NonNull
  private String firstName;
  @NonNull
  private String lastName;
  @NonNull
  private String email;
  @NonNull
  @Expose(serialize = false)
  protected String password;
  @NonNull
  @Enumerated(EnumType.STRING)
  private EGender gender;
  @NonNull
  private Integer age;
  @NonNull
  private String country;
  @NonNull
  private ERole role;

  public User() {
    id = UUID.randomUUID().toString();
  }

  public abstract ApiResponse<User> signup() throws Exception;

  public void encryptPassword() {
    this.setPassword(BCrypt.hashpw(this.password, BCrypt.gensalt(10)));
  }

  public ApiResponse<User> login(String email, String password) throws AuthenticationException {
    User foundUser = Users.findUser(email);
    if (foundUser == null)
      throw new AuthenticationException("Invalid credentials!❌❌❌❌");
    if (!BCrypt.checkpw(password, foundUser.password))
      throw new AuthenticationException("Invalid credentials!❌❌❌❌");
    return new ApiResponse<>("User successfully loggedIn 😇", foundUser);
  }
}
