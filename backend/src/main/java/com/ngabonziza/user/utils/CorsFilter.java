package com.ngabonziza.user.utils;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

@WebFilter(asyncSupported = true, urlPatterns = { "/*" })
public class CorsFilter implements javax.servlet.Filter {

  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
      throws IOException, ServletException {
    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST");
    ((HttpServletResponse) response).addHeader("Access-Control-Allow-Headers", "Content-Type");
    ((HttpServletResponse) response).addHeader("Access-Control-Max-Age", "86400");
    // pass the request along the filter chain
    chain.doFilter(request, response);
  }

  public void init(FilterConfig fConfig) throws ServletException {
    // TODO Auto-generated method stub
  }

  @Override
  public void destroy() {
    // TODO Auto-generated method stub
  }
}
