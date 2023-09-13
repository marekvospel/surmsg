DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select,update,delete WHERE id = $auth.id;

DEFINE FIELD username ON TABLE user TYPE string;
DEFINE FIELD password ON TABLE user TYPE string;

DEFINE INDEX username ON user FIELDS username UNIQUE;

DEFINE SCOPE user SESSION 1d
  SIGNIN (
    SELECT * FROM user WHERE username = $username AND crypto::argon2::compare(password, $password)
  )
  SIGNUP (
    CREATE user CONTENT {
      username: $username,
      password: crypto::argon2::generate($password)
    }
  );

DEFINE TABLE message SCHEMAFULL
  PERMISSIONS
    FOR select WHERE true,
    FOR create,delete WHERE author = $auth.id;

DEFINE FIELD content ON TABLE message TYPE string;
DEFINE FIELD created ON TABLE message TYPE datetime;
DEFINE FIELD author ON TABLE message TYPE record();
