const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');

class Logger {
  constructor() {
    this.logFilePath = path.join(__dirname, 'api.csv');
    
    // Añadir encabezado al archivo CSV si no existe
    if (!fs.existsSync(this.logFilePath)) {
      const header = 'Hora-Fecha,Equipo,IP,Tipo_Orden\n';
      fs.writeFileSync(this.logFilePath, header);
    }
  }

  log(message, equipo, ip, tipoOrden) {
    const timestamp = moment().tz('America/Santiago').format('YYYY-MM-DD HH:mm:ss.SSS');
    
    // Convertir IPv6 loopback a IPv4 para legibilidad
    const formattedIp = ip === '::1' ? '127.0.0.1' : ip;

    // Asegurar que cada campo esté entre comillas para manejar espacios y caracteres especiales
    const logMessage = `"${timestamp}","${equipo}","${formattedIp}","${tipoOrden}"\n`;
    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Failed to write to log file:', err);
      }
    });
  }
}

module.exports = Logger;
