from twilio.rest import TwilioRestClient
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/send_sms", methods =['POST'])
def hello():
	account_sid = "AC9445ee82c7dc710745168742c8d3aa78" # My Account SID from www.twilio.com/console
	auth_token  = "42b6698f202fe43f70b29e8bd5e901c6"  # My Auth Token from www.twilio.com/console

	client = TwilioRestClient(account_sid, auth_token)

	message = client.messages.create(
		body = "Photo captured at " + time + " at " + location + ". Please see attached photo below.",
	    to = "+14086031769",  # Valerie's phone number
	    from_ = "+19803524225") # My Twilio number 

	return jsonify(message.sid)

if __name__ == "__main__":
	app.run()