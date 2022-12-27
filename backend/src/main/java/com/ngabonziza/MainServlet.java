package com.ngabonziza;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ngabonziza.user.utils.ApiResponse;
import com.ngabonziza.user.utils.ResponseFormat;

import java.io.IOException;

@WebServlet("")
public class MainServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ResponseFormat.response(resp, new ApiResponse<>("Hey Mom >>> This is ngabonziza! 😎", null), HttpServletResponse.SC_OK);
    }
}
