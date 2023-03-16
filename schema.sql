DROP TABLE IF EXISTS MovieTable;

CREATE TABLE IF NOT EXISTS MovieTable ( 
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255),
    release_date VARCHAR(255) ,
    poster_path VARCHAR (255),
    overview  VARCHAR (1000),
    comment VARCHAR (1000)
);