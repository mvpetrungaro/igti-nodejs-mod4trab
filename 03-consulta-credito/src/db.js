const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_CONN_STRING,
  {
    dialect: 'postgres',
    logging: false,
  }
);

const clienteModel = (sequelizeCliente, DataTypes) => {
  const Cliente = sequelizeCliente.define('Cliente', {
    CPF: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Cliente;
};

const consultaModel = (sequelizeConsulta, DataTypes) => {
  const Consulta = sequelizeConsulta.define('Consulta', {
    Valor: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    NumPrestacoes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Juros: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Montante: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Prestacoes: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Consulta;
};

const cliente = clienteModel(sequelize, Sequelize.DataTypes);
const consulta = consultaModel(sequelize, Sequelize.DataTypes);

cliente.hasMany(consulta, { as: 'Consultas' });
consulta.belongsTo(cliente);

module.exports = {
  cliente,
  consulta,
  sequelize,
};
