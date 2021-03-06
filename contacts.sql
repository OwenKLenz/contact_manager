CREATE TABLE contacts (
  id serial NOT NULL,
  full_name text NOT NULL,
  phone_number int,
  email text,
  tags text,
	PRIMARY KEY (id)
  );

INSERT INTO contacts
  (full_name, phone_number, email, tags)
  VALUES
  ('Owen Lenz', '1234567890', 'owen@kevra.lenz', 'one, two, three');
