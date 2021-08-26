/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('user_tag', {
        id: { type: 'int', notNull: true, primaryKey: true },
        userId: {
            type: 'uuid',
            notNull: true,
            references: 'user_outside',
        },
        tagId: {
            type: 'integer',
            notNull: true,
            references: 'tag',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('user_tag');
};
