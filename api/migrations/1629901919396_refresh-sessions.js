/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('refresh_sessions', {
        id: 'uuid',
        refreshToken: 'uuid',
        expiresIn: 'date',
        id_user: 'uuid',
        createdAt: 'date',
    });
};

exports.down = (pgm) => {
    pgm.dropTable('refresh_sessions');
};
