/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('tag', {
        id: { type: 'serial', notNull: true, primaryKey: true },
        creator: { type: 'uuid' },
        name: { type: 'varchar(40)', notNull: true },
        sort_order: { type: 'integer', notNull: true, default: 0 },
    });

    pgm.sql(`
        INSERT INTO tag(id, name, sort_order)
        VALUES
            (1, 'Web', 0),
            (2, 'Nodejs', 1),
            (3, 'React', 2),
            (4, 'Redis', 3),
            (5, 'Redux', 4),
            (6, 'Express', 6),
            (7, 'Docker', 1)`);
};

exports.down = (pgm) => {
    pgm.dropTable('tag');
};
