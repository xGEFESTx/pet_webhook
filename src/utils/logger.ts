import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.timestamp(),                
    winston.format.errors({ stack: true }),    
    winston.format.json()                      
  ),
  defaultMeta: { service: 'webhook-service' }, 
  transports: [

    new winston.transports.File({
      filename: 'logs/webhookLog.log',
    }),

    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),            
        winston.format.printf(({ level, message, timestamp, stack }) => {
          return stack
            ? `[${timestamp}] ${level}: ${message}\n${stack}`
            : `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
  ],
});

export default logger;
