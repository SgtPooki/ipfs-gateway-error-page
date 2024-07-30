import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, render_template, request

app = Flask(__name__)

# Configure logging
handler = RotatingFileHandler('error.log', maxBytes=10000, backupCount=1)
handler.setLevel(logging.ERROR)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
app.logger.addHandler(handler)

# Default route
@app.route('/')
def home():
  # Retrieve the cid from query parameters to make for easier debugging
  # NOTE: This should be done via a HEAD request in javascript when hosted on the gateway.
  cid = request.args.get('cid', 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi')

  return render_template('504.html.j2', cid=cid) # , maddr=maddr)

if __name__ == '__main__':
  try:
    app.run(debug=True, host='0.0.0.0', port=5555)
  except Exception as err:
    # Log error
    app.logger.error('An error occurred while running the app', exc_info=err)
