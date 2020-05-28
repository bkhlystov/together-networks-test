Feature: Desktop / Flacky API Test

  Scenario: CRUD oparations with user by api
    Then I "create" user in database by url "http://localhost:8081/users"
    Then I "get" user from database by url "http://localhost:8081/users"
    Then I "update" user in database by url "http://localhost:8081/users"
    Then I "delete" user from database by url "http://localhost:8081/users"