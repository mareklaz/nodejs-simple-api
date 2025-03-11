import winston from 'winston';

// Definición de colores personalizados (opcional)
winston.addColors({
	error: 'red',
	warn: 'yellow',
	info: 'green',
	verbose: 'cyan',
	debug: 'blue',
	silly: 'magenta',
});

// Función para formatear la fecha y hora
function formatDate() {
	const d = new Date();
	const day = d.getDate().toString().padStart(2, '0');
	const month = (d.getMonth() + 1).toString().padStart(2, '0');
	const year = d.getFullYear();
	const hour = d.getHours().toString().padStart(2, '0');
	const minute = d.getMinutes().toString().padStart(2, '0');
	const second = d.getSeconds().toString().padStart(2, '0');
	return `${day}/${month}/${year} | ${hour}:${minute}:${second}`;
}

// Formato personalizado que incluye la fecha y hora formateada y el campo customTag
const customFormat = winston.format.printf(({ level, message, ...meta }) => {
	const dateStr = formatDate();

	const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
	return `${dateStr} | [${level}]: ${message} ${metaString}`;
});

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		// Se utiliza colorize para consola y customFormat para dar el formato deseado
		winston.format.colorize(),
		customFormat
	),
	transports: [
		// Archivo sin colores y con formato JSON (se mantiene sin la fecha formateada en el mensaje)
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
			format: winston.format.combine(winston.format.json()),
		}),
		new winston.transports.File({
			filename: 'logs/combined.log',
			format: winston.format.combine(winston.format.json()),
		}),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			// En consola se mostrará la fecha, el customTag y los colores
			format: winston.format.combine(winston.format.colorize(), customFormat),
		})
	);
}

logger.stream = {
	write: (message) => {
		logger.info(message.trim());
	},
};

export default logger;
