if (Meteor.isClient) {

    Template.ModalOfferRequest.events({
        'click .offerRequestBtn': function() {
            options = {
                date: options.date,
                meetupTime: options.meetupTime.unix(),
                delayTime: options.delayTime,
                expireKey: Random.id(10),
                hourTime: options.hourTime,
                payment: options.payment,
                timePeriod: options.timePeriod,
                listing_title: $(".listingItemTitle").text(),
                img: $(".slider img:first").attr("src"),
                price: $(".itemMoney").text().replace(/\D/g, ''),
                payment: $("input[name='OfferPayment']:checked").val(),
                offerprice: $("#mroffer").val(),
                location: $("#pac-input").val(),
                listingId: id,
                lat: Session.get("offerlat"),
                lng: Session.get("offerlng"),
                listing_creator_id: Listing.find({_id: id}).fetch()[0].creator_id,
                creator_id: Meteor.userId(),
                creator_name:  Meteor.user().profile.name,
                seller_name: Listing.find({_id: id}).fetch()[0].username,
                creator_image:  Meteor.user().profile.picturesm,
                // By Default
                status: "Pending",
                // Notification flags
                action: "sent you an offer"
            }

            options.destination = [ options.listing_creator_id ];

            function OfferValidate() {

              // ZAP
              if (options.delayTime < 0){
                return false
              }
                var status = true;
                var keys = Object.keys(options);

                // PERMIT leeway
                keys = _.without(keys, "img", "lat", "lng");

                for (i = 0; i < keys.length; i++) {
                    if (!options[keys[i]] || options[keys[i]] == "") {
                        sAlert.error(keys[i] + " field is not properly set");
                        status = false;
                    }
                }
                return status;
            }

            if (OfferValidate()) {
                Meteor.call('addOffer', options);

                function expireOffer(){

                  Offer.remove({expireKey: options.expireKey});
                }

                Meteor.setTimeout(expireOffer, options.delayTime);

                // Notification
                Meteor.call('pulseNotify', options);

                sweetAlert({
                    title: "Offer Created",
                    text: "<span style='font-weight: bold;'>Offer:</span> " + "<span style='color: #f8504b'>" + options.listing_title + "</span>" + "<span> Created </span>",
                    html: "true",
                    type: "success",
                    timer: 3000,
                    showConfirmButton: false
                });

                 Router.go("/");

            };
        }
    });

}