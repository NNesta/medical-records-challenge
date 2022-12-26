package com.prophete.user.servlets;

import java.io.IOException;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.prophete.user.models.Admin;
import com.prophete.user.models.User;
import com.prophete.user.utils.ApiResponse;
import com.prophete.user.utils.JsonUtil;
import com.prophete.user.utils.ResponseFormat;

@WebServlet("/user/login")
public class LoginServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
    User user = new JsonUtil().parseBodyJson(req, Admin.class);
    try {
      ApiResponse<User> result = user.login(user.getEmail(), user.getPassword());
      ResponseFormat.response(res, result, HttpServletResponse.SC_OK);
    } catch (AuthenticationException e) {
      e.printStackTrace();
      ResponseFormat.response(res, new ApiResponse<>(e.getMessage(), null), HttpServletResponse.SC_FORBIDDEN);
    }
  }

}
