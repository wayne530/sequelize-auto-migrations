const path = require('path'),
      fs   = require('fs');

module.exports = function(options){
    let sequelizercConfigs = [],
        sequelizercPath = path.join(process.env.PWD, '.sequelizerc');

    if (fs.existsSync(sequelizercPath)){
        sequelizercConfigs = require(sequelizercPath);
    }
    
    if(!process.env.PWD){
        process.env.PWD = process.cwd()
    }
    
    let migrationsDir = path.join(process.env.PWD, 'migrations'),
        modelsDir = path.join(process.env.PWD, 'models'),
        configDir = path.join(process.env.PWD, 'config');
        
    if (options['migrations-path']) {
        migrationsDir = path.join(process.env.PWD, options['migrations-path']);
    } else if (sequelizercConfigs['migrations-path']) {
        migrationsDir = sequelizercConfigs['migrations-path'];
    }
    
    if (options['models-path']) {
        modelsDir = path.join(process.env.PWD, options['models-path']);
    } else if (sequelizercConfigs['models-path']) {
        modelsDir = sequelizercConfigs['models-path'];
    }

    if (options['config-path']) {
        configDir = path.join(process.env.PWD, options['config-path']);
    } else if (sequelizercConfigs['config-path']) {
        configDir = sequelizercConfigs['config-path'];
    }
    
    return {
        migrationsDir: migrationsDir,
        modelsDir: modelsDir,
        configDir: configDir
    }
}