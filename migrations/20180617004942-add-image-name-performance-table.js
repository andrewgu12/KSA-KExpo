'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.addColumn('performances', 'image_file', {
    type: 'string',
    defaultValue: ''
  });
};

exports.down = function(db) {
  return db.removeColumn('performances', 'image_file');
};

exports._meta = {
  "version": 1
};
