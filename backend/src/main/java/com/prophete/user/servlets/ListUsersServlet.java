package com.prophete.user.servlets;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.prophete.database.Users;
import com.prophete.user.models.User;
import com.prophete.user.utils.ApiResponse;
import com.prophete.user.utils.ResponseFormat;

@WebServlet("/users/all")
@WebInitParam(name = "email", value = "Not provided")
public class ListUsersServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    try {
      List<User> result = Users.getUsers();
      ResponseFormat.response(res, new ApiResponse<List<User>>("Users retrieved", result), HttpServletResponse.SC_OK);
    } catch (Exception e) {
      e.printStackTrace();
      ResponseFormat.response(res, new ApiResponse<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
    }
  }

}
