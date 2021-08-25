/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('tag', {
        id: { type: 'integer', notNull: true, primaryKey: true },
        creator: { type: 'uuid', notNull: true },
        name: { type: 'varchar(40)', notNull: true },
        sortOrder: { type: 'integer', notNull: true, default: 0 },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('tag');
};
