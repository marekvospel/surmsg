DEFINE TABLE user SCHEMAFULL
  PERMISSIONS
    FOR select,update,delete WHERE id = $auth.id;

DEFINE FIELD password ON TABLE user TYPE string;

DEFINE SCOPE user SESSION 1d
  SIGNIN (
    SELECT * FROM type::thing("user", $username) WHERE crypto::argon2::compare(password, $password)
  )
  SIGNUP (
    CREATE type::thing("user", $username) CONTENT {
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
