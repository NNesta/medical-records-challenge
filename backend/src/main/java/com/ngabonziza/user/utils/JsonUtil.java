package com.ngabonziza.user.utils;

import java.io.IOException;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import com.google.gson.*;
import com.google.gson.annotations.Expose;

public class JsonUtil {
  private final Gson gson = new GsonBuilder().addSerializationExclusionStrategy(new ExclusionStrategy() {
    @Override
    public boolean shouldSkipField(FieldAttributes fieldAttributes) {
      final Expose expose = fieldAttributes.getAnnotation(Expose.class);
      return expose != null && !expose.serialize();
    }

    @Override
    public boolean shouldSkipClass(Class<?> aClass) {
      return false;
    }
  }).addDeserializationExclusionStrategy(new ExclusionStrategy() {
    @Override
    public boolean shouldSkipField(FieldAttributes fieldAttributes) {
      final Expose expose = fieldAttributes.getAnnotation(Expose.class);
      return expose != null && !expose.deserialize();
    }

    @Override
    public boolean shouldSkipClass(Class<?> aClass) {
      return false;
    }
  }).create();

  public String toJSon(Object object) {
    if (object == null)
      return null;
    String json = null;
    try {
      json = gson.toJson(object);
    } catch (Exception error) {
      error.printStackTrace();
    }
    return json;
  }

  public <T> T fromJson(String json, Class<T> classOfT) {
    try {
      return this.gson.fromJson(json, classOfT);
    } catch (JsonSyntaxException e) {
      e.printStackTrace();
      throw e;
    }
  }

  public <T> T parseBodyJson(HttpServletRequest req, Class<T> classOfT) throws IOException {
    try {
      String requestBody = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
    return this.fromJson(requestBody, classOfT);
    } catch (Exception e) {
      throw e;
    }

  }
}
