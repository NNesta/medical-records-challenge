package com.ngabonziza.user.servlets;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ngabonziza.database.Users;
import com.ngabonziza.user.models.User;
import com.ngabonziza.user.utils.ApiResponse;
import com.ngabonziza.user.utils.ResponseFormat;

@WebServlet("/users/single")
@WebInitParam(name = "email", value = "Not provided")
public class GetUserServlet extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		try {
			String email = req.getParameter("email");
			if (email == null)
				throw new RuntimeException("No email specified");
			User user = Users.findUser(email);
			if (user == null)
				throw new RuntimeException("User not found");
			System.out.println("Dataaaaaaa===>>>> " + user.getEmail());
			ResponseFormat.response(res, new ApiResponse<User>("User retrieved successfully", user),
					HttpServletResponse.SC_OK);
		} catch (Exception e) {
			e.printStackTrace();
			ResponseFormat.response(res, new ApiResponse<>(e.getMessage(), null),
					HttpServletResponse.SC_FORBIDDEN);
		}
	}
}
