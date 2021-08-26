exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('user_outside', {
        uid: { type: 'uuid', notNull: true, primaryKey: true },
        email: { type: 'varchar(100)', notNull: true },
        password: { type: 'varchar(100)', notNull: true },
        nickname: { type: 'varchar(30)', notNull: true },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('user');
};
