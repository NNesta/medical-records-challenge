package com.ngabonziza.database;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.ngabonziza.user.models.User;

import lombok.Getter;

@Getter
public class Users {
  private static Map<String, User> all = new LinkedHashMap<>();

  public static void addUser(User user) {
    all.put(user.getEmail(), user);
  }

  public static User findUser(String email) {
    return all.get(email);
  }

  public static List<User> getUsers() {
    return new ArrayList<>(all.values());
  }

}
