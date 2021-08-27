/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('user_tag', {
        id: { type: 'serial', notNull: true, primaryKey: true },
        user_id: {
            type: 'uuid',
            notNull: true,
            references: 'user_outside',
        },
        tag_id: {
            type: 'integer',
            notNull: true,
            references: 'tag',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('user_tag');
};
