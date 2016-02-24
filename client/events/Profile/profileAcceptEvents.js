if (Meteor.isClient) {

  Template.ModalReceivedAccept.events({
    'click #profileReceivedAccept': function() {

      sweetAlert({
        title: "Offer Accepted",
        html: "true",
        type: "success",
        timer: 2000,
        showConfirmButton: false
      });

      var offerBlock = Session.get('offerSelected');

      options = {
        action: "has accepted your offer",
        listing_title: offerBlock.listing_title,
        date: offerBlock.date,
        location: offerBlock.location,
        offer_creator: offerBlock.creator_id,
        offerprice: offerBlock.offerprice,
        creator_id: offerBlock.creator_id,
        offer_creator_name: offerBlock.creator_name,
        creator_name: Meteor.user().profile.name,
        time: offerBlock.date,
        offer_id: offerBlock._id,
        listingId: offerBlock.listingId,
        listing_creator_id: offerBlock.listing_creator_id,
        destination: [offerBlock.creator_id],
        seller_id: Meteor.userId(),
        buyer_id: offerBlock.creator_id
      }

      Meteor.call('acceptOffer', options);
      Meteor.call('pulseNotify', options);

      // Time Value Scheduling
      // IF Morning 2pm, Afternoon: 7pm, Night 12am

      var original = moment.unix(offerBlock.meetupTime);
      var delayTime = original.diff(moment());

      // Reminder time = - 31 hours hours
      var subtractTime = 1.116 * Math.pow(10, 8);
      var reminderTime = delayTime - subtractTime;


        ////////////////////////////////////////////////////////////////////
      function sendFeedback() {

        var feedbackOptions = {
          action: "Fill out Feedback",
          listing_title: offerBlock.listing_title,
          offerprice: offerBlock.offerprice,
          creator_id: offerBlock.creator_id,
          listingId: offerBlock.listingId,
          destination: [offerBlock.creator_id, Meteor.userId()],
          seller_id: Meteor.userId(),
          buyer_id: offerBlock.creator_id
        }

        Meteor.call('pulseNotify', feedbackOptions);
        Meteor.call('transferListing', feedbackOptions);

      }
      ////////////////////////////////////////////////////////////////////

      function sendReminder() {

            var offerBlock = Session.get('offerSelected');


        reminderOptions = {
          action: "Reminder: you have a meetup scheduled for tommorow",
          listing_title: offerBlock.listing_title,
          offerprice: offerBlock.offerprice,
          creator_id: offerBlock.creator_id,
          time: offerBlock.date,
          offer_id: offerBlock._id,
          listingId: offerBlock.listingId,
          destination: [offerBlock.creator_id, Meteor.userId()],
          seller_id: Meteor.userId(),
          buyer_id: offerBlock.creator_id
        }

        Meteor.call('pulseNotify', reminderOptions);
      }
      ////////////////////////////////////////////////////////////////////

      // Reminder Notification
      Meteor.setTimeout(function() {
        sendReminder();
      }, reminderTime);

      // Feedback Notification
      Meteor.setTimeout(function() {
        sendFeedback();
      }, delayTime);

      console.log(reminderTime);
      console.log(delayTime);

    },
    'click #profileReceivedDecline': function() {
      sweetAlert({
        title: "Offer Declined",
        html: "true",
        type: "error",
        timer: 2000,
        showConfirmButton: false
      });

      var offerBlock = Session.get('offerSelected');

      options = {
        action: "has declined your offer",
        listing_title: offerBlock.listing_title,
        date: offerBlock.date,
        location: offerBlock.location,
        offer_creator: offerBlock.creator_id,
        offer_creator_name: offerBlock.creator_name,
        offerprice: offerBlock.offerprice,
        creator_id: offerBlock.creator_id,
        creator_name: Meteor.user().profile.name,
        time: offerBlock.date,
        offer_id: offerBlock._id,
        listingId: offerBlock.listingId,
        listing_creator_id: offerBlock.listing_creator_id,
        destination: [offerBlock.creator_id],
        seller_id: Meteor.userId(),
        buyer_id: offerBlock.creator_id
      }

      Meteor.call('declineOffer', options);
      Meteor.call('pulseNotify', options);
    }
  });
}