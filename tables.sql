create table users (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(50),
	email VARCHAR(150),
	password VARCHAR(150),
	phone_number VARCHAR(50) NOT NULL,
	rating DECIMAL(3,2)
);

create table drivers (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	user_id INT NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users (id),
	car_color VARCHAR(50) NOT NULL,
	car_model VARCHAR(50) NOT NULL,
	car_number VARCHAR(50) NOT NULL,
	order_id INT,
	FOREIGN KEY (order_id) REFERENCES orders (id),
	rating DECIMAL(3,2)
);

create table orders (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	customer_id INT NOT NULL,
	FOREIGN KEY (customer_id) REFERENCES users (id),
	driver_id INT NOT NULL,
	FOREIGN KEY (driver_id) REFERENCES drivers (id),
	created_at DATE NOT NULL,
  date_of_ride DATE,
	last_update DATE,
	to VARCHAR(150) NOT NULL,
	from VARCHAR(150) NOT NULL,
	price VARCHAR(50) NOT NULL,
	car_type VARCHAR(7) NOT NULL,
	status VARCHAR(10) NOT NULL,
	extra_services text,
  payment_type text,
  status text
);

create table feedbacks (
	id BIGSERIAL NOT NULL PRIMARY KEY,
  text TEXT,
  rating DECIMAL,
  created_by user_id,
  about_who user_id,
	created_at DATE NOT NULL
);

create table credit_cards (
	id BIGSERIAL NOT NULL PRIMARY KEY,
  number BIGINT,
  date_of_expiration DATE NOT NULL,
  client_id DECIMAL
);

create table favourite_places (
	id BIGSERIAL NOT NULL PRIMARY KEY,
  title TEXT,
  location TEXT,
  client_id DECIMAL
);
