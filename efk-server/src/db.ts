import pg from 'pg';

const pool = new pg.Pool({
  user: 'trtsitznjrihgc',
  password: 'b684c8864f27227a0ecd342b2682b6fe0bb2a17680df545e8da4c0922fe63a29',
  host: 'ec2-54-74-14-109.eu-west-1.compute.amazonaws.com',
  port: 5432,
  database: 'dbtk0eqqf49b38',
});

export default pool;
