package com.ngabonziza.user.servlets;

import com.ngabonziza.user.enums.ERole;
import com.ngabonziza.user.models.Admin;
import com.ngabonziza.user.models.Patient;
import com.ngabonziza.user.models.Pharmacist;
import com.ngabonziza.user.models.Physician;
import com.ngabonziza.user.models.User;
import com.ngabonziza.user.utils.ApiResponse;
import com.ngabonziza.user.utils.JsonUtil;
import com.ngabonziza.user.utils.ResponseFormat;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/user/signup")
public class registerServlet extends HttpServlet {

  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    try {
      User user;
      user = new JsonUtil().parseBodyJson(req, Patient.class);
      // VALIDATIONS
      if (user.getFirstName() == null)
        throw new RuntimeException("First Name is required");
      if (user.getLastName() == null)
        throw new RuntimeException("Last Name is required");
      if (user.getEmail() == null)
        throw new RuntimeException("Email is required");
      if (user.getPassword() == null)
        throw new RuntimeException("Password is required");
      if (user.getRole() == null)
        throw new RuntimeException("Role is required");
      if (user.getAge() == null)
        throw new RuntimeException("Age is required");
      if (user.getGender() == null)
        throw new RuntimeException("Gender is required");
      if (user.getCountry() == null || user.getCountry().isEmpty())
        throw new RuntimeException("Country is required");
      User Admin;
      ApiResponse<User> result;

      if (user.getRole() == ERole.Admin) {
        Admin = new Admin();
      } else if (user.getRole() == ERole.Patient) {
        Admin = new Patient();
      } else if (user.getRole() == ERole.Pharmacist) {
        Admin = new Pharmacist();
      } else {
        Admin = new Physician();
      }
      Admin.setFirstName(user.getFirstName());
      Admin.setGender(user.getGender());
      Admin.setCountry(user.getCountry());
      Admin.setEmail(user.getEmail());
      Admin.setRole(user.getRole());
      Admin.setLastName(user.getLastName());
      Admin.setAge(user.getAge());
      Admin.setPassword(user.getPassword());
      result = Admin.signup();
      ResponseFormat.response(resp, result, HttpServletResponse.SC_CREATED);
    } catch (Exception error) {
      error.printStackTrace();
      System.out.println("========>>>>> " + error);
      ResponseFormat.response(resp, new ApiResponse<>(error.getMessage(), null), HttpServletResponse.SC_BAD_REQUEST);
    }
  }

}
