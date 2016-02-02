if (Meteor.isClient) {

	Template.chatRight.events({
		'click .chatSendButton': function() {

			var options = {
				message: $(".chatText").val(),
				sender: Meteor.userId(),
				receiver: "tqKrESbdw5Qe6SapN",
				// Conversation key will be generated dynamically and used for all conversation messages
				conversation: "rename"
			};

			Meteor.call('sendMessage', options)

			// Clears message input
			$(".chatText").val('');
		}
	});

}