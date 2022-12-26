FROM tomcat:9.0

LABEL maintainer="isingizwepro01@gmail.com"

ADD ./target/java_servlet_app.war  /usr/local/tomcat/webapps

EXPOSE 8080

CMD ["catalina.sh", "run"]

