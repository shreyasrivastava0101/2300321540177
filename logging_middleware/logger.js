/**
 * Reusable logging utility
 * Sends logs to the external evaluation service silently.
 * 
 * @param {string} stack - Error stack trace or context
 * @param {string} level - Log level (e.g., 'INFO', 'ERROR', 'WARN')
 * @param {string} packageName - The part of the app generating the log (e.g., 'notification_app_fe')
 * @param {string} message - The actual log message
 */
export const Log = async (stack, level, packageName, message) => {
  try {
    const payload = {
      stack: stack || '',
      level: level || 'INFO',
      package: packageName || 'unknown',
      message: message || '',
      timestamp: new Date().toISOString()
    };

    // Send POST request silently
    fetch('http://4.224.186.213/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(() => {
      // Handle API failure silently (no crash)
      // We intentionally do not use console.log here per requirements
    });
  } catch (error) {
    // Fail silently if anything goes wrong in the logging process itself
  }
};