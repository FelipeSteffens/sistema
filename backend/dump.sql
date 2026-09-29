	CREATE DATABASE saep_db;

	USE saep_db;

	CREATE TABLE clientes (
	id int auto_increment primary key,
	nome varchar(50) NOT NULL,
	email varchar(144) NOT NULL unique,
	senha varchar(60) NOT NULL
	);

	CREATE TABLE veiculos (
	id int auto_increment primary key,
	modelo varchar(50) NOT NULL,
	cor varchar(50) NOT NULL,
	ano INT NOT NULL,
	placa VARCHAR(7) NOT NULL unique,
	cliente_id INT,
	CONSTRAINT fk_veiculos_clientes 
	FOREIGN KEY (cliente_id) 
	REFERENCES clientes (id)
	);

	CREATE TABLE agendamentos (
	id int auto_increment primary key,
	tipo_servico varchar(100) NOT NULL,
	data_hora datetime NOT NULL,
	cliente_id INT,
	CONSTRAINT fk_agendamentos_clientes 
	FOREIGN KEY (cliente_id) 
	REFERENCES clientes (id),

	veiculo_id INT,
	constraint fk_agendamentos_veiculos
	foreign key (veiculo_id)
	references veiculos (id)
	);


