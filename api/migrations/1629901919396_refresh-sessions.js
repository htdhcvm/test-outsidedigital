/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('refresh_sessions', {
        id: 'uuid',
        refresh_token: 'uuid',
        expires_in: 'string',
        user_id: {
            type: 'uuid',
            notNull: true,
            references: 'user_outside',
        },

        created_at: 'date',
    });
};

exports.down = (pgm) => {
    pgm.dropTable('refresh_sessions');
};
