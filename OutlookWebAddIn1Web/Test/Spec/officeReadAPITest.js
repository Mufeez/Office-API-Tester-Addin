﻿Office.initialize = function (reason) { };

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;




describe("Message Read : office api Test",
    function () {
        beforeAll(function (done) { setTimeout(function () { done(); }, 4000) });

        describe("Office Context", function () {


            it(" Get the display language of Outlook",
                function () {

                    /* Restricted or ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get the display language of Outlook */

                    var displayLanguage = Office.context.displayLanguage;
                    console.log("Display language is " + Office.context.displayLanguage);
                    document.getElementById("displayLanguage").innerHTML = Office.context.displayLanguage;
                   
                    expect(displayLanguage).toBe("en-US");
                 

                });

            it("Get the theme of Outlook",
                function () {


                    /* Restricted or ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get the theme of Outlook */
                    var bodyBackgroundColor = Office.context.officeTheme.bodyBackgroundColor;
                    var bodyForegroundColor = Office.context.officeTheme.bodyForegroundColor;
                    var controlBackgroundColor = Office.context.officeTheme.controlBackgroundColor;
                    var controlForegroundColor = Office.context.officeTheme.controlForegroundColor;
                    console.log("Body:(" + bodyBackgroundColor + "," + bodyForegroundColor + "), Control:(" + controlBackgroundColor + "," + controlForegroundColor + ")");
                    document.getElementById("theme").innerHTML = "Body:(" +
                        bodyBackgroundColor +
                        "," +
                        bodyForegroundColor +
                        "), Control:(" +
                        controlBackgroundColor +
                        "," +
                        controlForegroundColor +
                        ")";
                    expect(bodyBackgroundColor).toBeDefined();
                    expect(bodyForegroundColor).toBeDefined();
                    expect(controlBackgroundColor).toBeDefined();
                    expect(controlForegroundColor).toBeDefined();

                });


            it(" Set and Save roaming settings",
                function (done) {
                    /* Restricted or ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Set and Save roaming settings */

                    var status = "";
                    Office.context.roamingSettings.set("myKey","Hello World!");
                    Office.context.roamingSettings.saveAsync(
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                                status = "failed";
                                document.getElementById("setRoamingSetting").innerHTML =
                                    asyncResult.error.message;
                                done();
                            } else {
                                console.log("Settings saved successfully");
                                document.getElementById("setRoamingSetting").innerHTML =
                                    "Settings saved successfully";
                                status = "passed";

                                done();
                            }

                            expect(status).toBe("passed");
                        }
                    );
                    

                });

            it(" Get roaming settings",
                function () {
                    /* Restricted or ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get roaming settings */
                    var settingsValue = Office.context.roamingSettings.get("myKey");
                    console.log("myKey value is " + settingsValue);
                    document.getElementById("getRoamingsetting").innerHTML = settingsValue;
                    expect(settingsValue).toBe("Hello World!");


                });

            it("Remove roaming settings",
                function (done) {

                    /* Restricted or ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Remove roaming settings */

                    var status;
                    Office.context.roamingSettings.remove("myKey");
                    Office.context.roamingSettings.saveAsync(
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                                document.getElementById("removeRoamingSetting").innerHTML =
                                    "Action failed with error: " + asyncResult.error.message;
                                status = "failed";
                                done();
                            } else {
                                console.log("Settings saved successfully");
                                document.getElementById("removeRoamingSetting").innerHTML =
                                    "Settings saved successfully";
                                status = "passed";
                                done();
                            }
                        }
                    );
                    expect(status).toBe("passed");
                });

           
        });


        describe("Office Context Mailbox", function () {


            it(" Convert to REST ID:applicable in Read only Mode",
                function () {

                    /* Restricted or ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Convert to REST ID */
                    // Get the currently selected item's ID
                    var ewsId = Office.context.mailbox.item.itemId;
                    var restId = Office.context.mailbox.convertToRestId(ewsId, Office.MailboxEnums.RestVersion.v2_0);
                    console.log(restId);
                    document.getElementById("convertToRestId").innerHTML = restId;
                    expect(restId).toBeDefined();

                    
                  

                });

            it("Convert to EWS ID",
                function () {


                    /* Restricted or ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Convert to EWS ID */
                    // Get an item's ID from a REST API
                    var restId = "AAMkAGY4NTY1NDE4LTYwY2UtNGFkMi1iYWM0LTFjNWNlZTRiYzJiZgBGAAAAAADoWq5beaIQS5H0b244q4teBwBBlpJMXmrvRZroKP1QMFD7AAWOIICDAAAyMljtOF9eSIpjBvMLrE1RAADk489TAAA=";
                    var ewsId = Office.context.mailbox.convertToEwsId(restId, Office.MailboxEnums.RestVersion.v2_0);
                    console.log(ewsId);
                    document.getElementById("convertToEwsId").innerHTML = ewsId;
                    expect(ewsId).toBeDefined( );
                  
                });


            it(" Convert to local client time",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Convert to local client time */
                    var localTime = Office.context.mailbox.convertToLocalClientTime(new Date());
                    console.log("LocalTime:" + localTime.date + "/" + (localTime.month + 1) + "/" + localTime.year
                        + " " + localTime.hours + ":" + localTime.minutes + " (+" + localTime.timezoneOffset + ")");

                    document.getElementById("localClientTime").innerHTML = "LocalTime:" +
                        localTime.date +
                        "/" +
                        (localTime.month + 1) +
                        "/" +
                        localTime.year +
                        " " +
                        localTime.hours +
                        ":" +
                        localTime.minutes +
                        " (+" +
                        localTime.timezoneOffset +
                        ")";

                    expect(localTime).toBeDefined();


                });


                

        it("Convert to UTC client time ",
                function () {
                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Convert to UTC client time */
                    var localTime = Office.context.mailbox.convertToLocalClientTime(new Date());
                    var utcClientTime = Office.context.mailbox.convertToUtcClientTime(localTime);
                    console.log("UTC:" + utcClientTime);

                    document.getElementById("utcClientTime").innerHTML = "UTC:" + utcClientTime;
                    expect(utcClientTime).toBeDefined();
                   
                });


        it("Get EWS URL",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get EWS URL */
                    var ewsurl = Office.context.mailbox.ewsUrl;
                    console.log(Office.context.mailbox.ewsUrl);
                    document.getElementById("ewsURL").innerHTML = ewsurl;
                    expect(ewsurl).toBe("https://outlook.office365.com/EWS/Exchange.asmx");
        });


        it("Get callback token async",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get callback token async */

                    
                    Office.context.mailbox.getCallbackTokenAsync(
                        function (asyncResult) {
                           
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                               
                            } else {
                                console.log("Tokens: " + asyncResult.value);
                                
                            }
                            document.getElementById("callbackToken").innerHTML = asyncResult.value;
                            expect(asyncResult.value).toBeDefined();
                            
                        }
                    );

                   
                });

        it("Get user identity token async",
                function () {
                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get user identity token async */
                   
                    Office.context.mailbox.getUserIdentityTokenAsync(
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                            } else {
                                console.log("Tokens: " + asyncResult.value);
                               
                            }
                            document.getElementById("userIdentityToken").innerHTML = asyncResult.value;
                            expect(asyncResult.value).toBeDefined();
                        }
                    );
                   
            });


            it("Make EWS Request",
                function () {
                    /* ReadWriteMailbox */
                    /* EWS request to create and send a new item */
                  
                    var request = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages"' +
                        ' xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                        '  <soap:Header><t:RequestServerVersion Version="Exchange2010" /></soap:Header>' +
                        '  <soap:Body>' +
                        '    <m:CreateItem MessageDisposition="SendAndSaveCopy">' +
                        '      <m:SavedItemFolderId><t:DistinguishedFolderId Id="sentitems" /></m:SavedItemFolderId>' +
                        '      <m:Items>' +
                        '        <t:Message>' +
                        '          <t:Subject>Hello, Outlook!</t:Subject>' +
                        '          <t:Body BodyType="HTML">I sent this message to myself using the Outlook API!</t:Body>' +
                        '          <t:ToRecipients>' +
                        '            <t:Mailbox><t:EmailAddress>' + Office.context.mailbox.userProfile.emailAddress + '</t:EmailAddress></t:Mailbox>' +
                        '          </t:ToRecipients>' +
                        '        </t:Message>' +
                        '      </m:Items>' +
                        '    </m:CreateItem>' +
                        '  </soap:Body>' +
                        '</soap:Envelope>';

                    Office.context.mailbox.makeEwsRequestAsync(request,
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                                document.getElementById("ewsRequest").innerHTML = "Action failed with error: " + asyncResult.error.message;
                            } else {
                                console.log("Message sent! Check your inbox.");
                                document.getElementById("ewsRequest").innerHTML = "Message sent! Check your inbox.";
                            }
                           
                            expect(asyncResult.status).not.toBe("failed");
                        }
                    );

                    
                });


        });


        describe("Office Context Mailbox diagnostics", function () {


            it(" Get host name",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get host name */
                    var hostName = Office.context.mailbox.diagnostics.hostName;
                    console.log(Office.context.mailbox.diagnostics.hostName);
                    document.getElementById("hostName").innerHTML = hostName;
                    expect(hostName).toBe("Outlook");

                });

            it(" Get host version",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get host version */
                    console.log(Office.context.mailbox.diagnostics.hostVersion);
                    document.getElementById("hostVersion").innerHTML = Office.context.mailbox.diagnostics.hostVersion;
                    expect(Office.context.mailbox.diagnostics.hostVersion).toBeDefined();
                });


            it(" Get OWA view (only supported in OWA)",
                function () {
                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get OWA view (only supported in OWA) */
                    console.log(Office.context.mailbox.diagnostics.OWAView);
                    document.getElementById("owaView").innerHTML = Office.context.mailbox.diagnostics.OWAView;
                   
                });

           


        });


        describe("Office Context Mailbox userProfile", function () {


            it(" Get display name",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get display name */
                    var dispalyNameOfUser = Office.context.mailbox.userProfile.displayName;
                    console.log(Office.context.mailbox.userProfile.displayName);
                    document.getElementById("displayName").innerHTML = dispalyNameOfUser;
                    expect(dispalyNameOfUser).toBeDefined();
                });

            it(" Get email address",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get email address */
                    var emailAddressOfUser = Office.context.mailbox.userProfile.emailAddress;
                    console.log(Office.context.mailbox.userProfile.emailAddress);
                    document.getElementById("emailAddress").innerHTML = emailAddressOfUser;
                    expect(emailAddressOfUser).toBeDefined();
                });


            it("Get time zone ",
                function () {
                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get time zone */
                    var timeZone = Office.context.mailbox.userProfile.timeZone;
                    console.log(Office.context.mailbox.userProfile.timeZone);
                    document.getElementById("timeZone").innerHTML = timeZone;
                    expect(timeZone).toBeDefined();

                });




        });


        describe("1.5 API Office Context ", function () {


            it(" close Container :Commented",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* close Container */
                   // Office.context.ui.closeContainer()//;
                    document.getElementById("closeContainer").innerHTML = "Use Read Test Addin ";
                });

            it(" get rest URL",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* get rest URL */

                   
                    console.log(Office.context.mailbox.restUrl);
                    document.getElementById("getRestUrl").innerHTML = Office.context.mailbox.restUrl;
                    expect(Office.context.mailbox.restUrl).toBeDefined();
                });


            xit("inline image - display reply form :Applicable in read only mode ",
                function (done) {
                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* inline image - display reply form */
                    Office.context.mailbox.item.displayReplyForm(
                        {
                            'htmlBody': '<img src = "cid:squirrel.png">',
                            'attachments':
                            [
                                {
                                    'type': Office.MailboxEnums.AttachmentType.File,
                                    'name': 'squirrel.png',
                                    'url': 'http://i.imgur.com/sRgTlGR.jpg',
                                    'isInline': 'true'
                                }
                            ]
                            
                        });
                    done();
                    document.getElementById("inlineImageDisplayReplyForm").innerHTML = "Validate Manually";
                    expect(true).toBe(true);
                });

            xit("inline image - display reply All form :Applicable in read only mode",
                function (done) {
                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* inline image - display reply All form */
                    Office.context.mailbox.item.displayReplyAllForm(
                        {
                            'htmlBody': '<img src = "cid:squirrel.png">',
                            'attachments':
                            [
                                {
                                    'type': Office.MailboxEnums.AttachmentType.File,
                                    'name': 'squirrel.png',
                                    'url': 'http://i.imgur.com/sRgTlGR.jpg',
                                    'isInline': 'true'
                                }
                            ]
                        });
                    done();
                    document.getElementById("inlineImageDisplayReplyAllForm").innerHTML = "Validate Manually";
                    expect(true).toBe(true);
                });


            it("get callback token isrest",
                function () {
                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* get callback token isrest*/
                    var options = {
                        isRest: true,
                        asyncContext: { message: 'Hello World!' }
                    };

                    Office.context.mailbox.getCallbackTokenAsync(options, cb);


                    function cb(asyncResult) {
                        var token = asyncResult.value;
                        console.log(token);
                        expect(token).toBeDefined();
                        document.getElementById("getCallbackTokenIsRest").innerHTML = token;
                    }

                    
                    
                });

            xit("Verify get callback token isrest",
                function () {
                    var itemid = encodeURIComponent(Office.context.mailbox.item.itemId);
                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Verify  get callback token isrest*/
                    var options = {
                        isRest: true,
                        asyncContext: { message: 'Hello World!' }
                    };

                    Office.context.mailbox.getCallbackTokenAsync(options, cb);


                    function cb(asyncResult) {
                        var cred = encodeURIComponent(asyncResult.value);
                        var data = "itemid=" + itemid + "&cred=" + cred;

                        var myurl = "https://testservicejavarestapi.azurewebsites.net/rest/UserService/getsubject";
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', myurl, true);
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                        xhr.onload = function () {
                            console.log(this.responseText);
                        };
                        xhr.send(data);
                    }
                   
                });




        });

        describe("Office Context UI", function () {


            xit("displayDialog",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* displayDialog */
                    var dialogOptions = { height: 80, width: 50, displayInIframe: false, requireHTTPS: false };

                    Office.context.ui.displayDialogAsync("https://trelloaddin.azurewebsites.net/trello/LoginPageIOS.html", dialogOptions, displayDialogCallback);



                    function displayDialogCallback(asyncResult) {

                        console.log(asyncResult.status);

                    }
                    expect(asyncResult.status).toBeDefined();
                });

          

            

        });


        describe("Office Context Mailbox Item", function () {


            it("Get list of attachments",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get list of attachments */
                    var outputString = "";
                    for (i = 0; i < Office.context.mailbox.item.attachments.length; i++) {
                        var _att = Office.context.mailbox.item.attachments[i];
                        outputString += "<BR>" + i + ". Name: ";
                        outputString += _att.name;
                        outputString += "<BR>ID: " + _att.id;
                        outputString += "<BR>contentType: " + _att.contentType;
                        outputString += "<BR>size: " + _att.size;
                        outputString += "<BR>attachmentType: " + _att.attachmentType;
                        outputString += "<BR>isInline: " + _att.isInline;
                    }
                    document.getElementById("attachments").innerHTML = outputString;
                    console.log(outputString);
                    expect(outputString).toBeDefined();
                });

            it("Get body content",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get body content */
                    Office.context.mailbox.item.body.getAsync("text",
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                                document.getElementById("body").innerHTML = "Action failed with error: " + asyncResult.error.message;
                            } else {
                                console.log(asyncResult.value);
                                document.getElementById("body").innerHTML = asyncResult.value;
                               
                            }
                            expect(asyncResult.value).toBeDefined();
                        }
                    );



                });

            it("Get Cc recipients (Applicable only on message)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get Cc recipients (Applicable only on message) */
                    var recipients = "";
                    Office.context.mailbox.item.cc.forEach(function (recipient, index) {
                        recipients = recipients + recipient.displayName + " (" + recipient.emailAddress + ");";
                    });
                    console.log(recipients);
                    document.getElementById("cc").innerHTML = recipients;
                    expect(recipients).toBeDefined();

                });

            it("Get conversation Id (Applicable only on message)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get conversation Id (Applicable only on message) */
                    console.log(Office.context.mailbox.item.conversationId);
                    document.getElementById("conversationId").innerHTML = Office.context.mailbox.item.conversationId;
                    expect(Office.context.mailbox.item.conversationId).toBeDefined();



                });
            it("Get date time created",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get date time created */
                    console.log(Office.context.mailbox.item.dateTimeCreated);
                    document.getElementById("dateTimeCreated").innerHTML = Office.context.mailbox.item.dateTimeCreated;
                    expect(Office.context.mailbox.item.dateTimeCreated).toBeDefined();


                });
            it("Get date time modified",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get date time modified */
                    console.log(Office.context.mailbox.item.dateTimeModified);
                    document.getElementById("dateTimeModified").innerHTML = Office.context.mailbox.item.dateTimeModified;
                    expect(Office.context.mailbox.item.dateTimeModified).toBeDefined();



                });
            xit("Get end time (Applicable only on calendar event",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get end time (Applicable only on calendar event) */
                    console.log(Office.context.mailbox.item.end);




                });
            it("Get from (Applicable only on message)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get from (Applicable only on message) */
                    var from = Office.context.mailbox.item.from;
                    console.log(from.displayName + " (" + from.emailAddress + ");");
                    document.getElementById("from").innerHTML = from.displayName + " (" + from.emailAddress + ");";
                    expect(from.displayName + " (" + from.emailAddress + ");").toBeDefined();


                });
            it("Get internet message Id (Applicable only on message)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get internet message Id (Applicable only on message) */
                    console.log(Office.context.mailbox.item.internetMessageId);
                    document.getElementById("from").innerHTML = Office.context.mailbox.item.internetMessageId;
                    expect(Office.context.mailbox.item.internetMessageId).toBeDefined();


                });
            it("Get item class",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get item class */
                    console.log(Office.context.mailbox.item.itemClass);
                    document.getElementById("itemClass").innerHTML = Office.context.mailbox.item.itemClass;
                    expect(Office.context.mailbox.item.itemClass).toBeDefined();




                });
            it("Get item Id",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get item Id */
                    console.log(Office.context.mailbox.item.itemId);
                    document.getElementById("itemId").innerHTML = Office.context.mailbox.item.itemId;
                    expect(Office.context.mailbox.item.itemId).toBeDefined();



                });
            it("Get item type",
                function () {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get item type */
                    console.log(Office.context.mailbox.item.itemType);
                    document.getElementById("itemType").innerHTML = Office.context.mailbox.item.itemType;
                    expect(Office.context.mailbox.item.itemType).toBeDefined();

                });
           
            it(" Get normalized subject",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get normalized subject */
                    console.log(Office.context.mailbox.item.normalizedSubject);
                    document.getElementById("normalizedSubject").innerHTML = Office.context.mailbox.item.normalizedSubject;
                    expect(Office.context.mailbox.item.normalizedSubject).toBeDefined();


                });
            it("Add notification message async",
                function () {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Add notification message async */
                    Office.context.mailbox.item.notificationMessages.addAsync("foo",
                        {
                            type: "progressIndicator",
                            message: "this operation is in progress",
                        },
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                            } else {
                                console.log("Added a new progress notification message for this item");
                            }

                            expect(asyncResult.status).not.toBe("failed");
                        }
                    );

                    expect(asyncResult.status).not.toBe("failed");

                });

            it("Replace notification message async",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Replace notification message async */
                    Office.context.mailbox.item.notificationMessages.replaceAsync("foo",
                        {
                            type: "informationalMessage",
                            icon: "icon_24",
                            message: "this operation is complete",
                            persistent: false
                        },
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                            } else {
                                console.log("Replaced existing notification with new notification message");
                            }

                            expect(asyncResult.status).not.toBe("failed");
                        }
                    );
                    expect(asyncResult.status).not.toBe("failed");



                });
            it("Get all notification messages async",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get all notification messages async */
                    Office.context.mailbox.item.notificationMessages.getAllAsync(
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                            } else {
                                var outputString = "";
                                asyncResult.value.forEach(
                                    function (noti, index) {
                                        outputString += "<BR>" + index + ". Key: ";
                                        outputString += noti.key;
                                        outputString += "<BR>type: " + noti.type;
                                        outputString += "<BR>icon: " + noti.icon;
                                        outputString += "<BR>message: " + noti.message;
                                        outputString += "<BR>persistent: " + noti.persistent;
                                    }
                                );
                                console.log(outputString);
                            }
                        }
                    );

                    expect(asyncResult.status).not.toBe("failed");


                });
            it(" Remove notification messages async ",
                function () {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Remove notification messages async */
                    Office.context.mailbox.item.notificationMessages.removeAsync("foo",
                        function (asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Action failed with error: " + asyncResult.error.message);
                            } else {
                                console.log("Notification successfully removed");
                            }
                        }
                    );
                    expect(asyncResult.status).not.toBe("failed");


                });
            
            it("Get sender (Applicable only on message)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get sender (Applicable only on message) */
                    var sender = Office.context.mailbox.item.sender;
                    console.log(sender.displayName + " (" + sender.emailAddress + ");");
                    document.getElementById("sender").innerHTML = sender;
                    expect(sender).not.toBeDefined();
                });
           
            it("Get subject",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get subject */
                    console.log(Office.context.mailbox.item.subject);
                    document.getElementById("subject").innerHTML = Office.context.mailbox.item.subject;
                    expect(Office.context.mailbox.item.subject).not.toBeDefined();


                });
            it("Get To recipients (Applicable only on message)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get To recipients (Applicable only on message) */
                    var recipients = "";
                    Office.context.mailbox.item.to.forEach(function (recipient, index) {
                        recipients = recipients + recipient.displayName + " (" + recipient.emailAddress + ");";
                    });
                    console.log(recipients);
                    document.getElementById("to").innerHTML = recipients;
                    expect(recipients).not.toBeDefined();


                });
           
           
            it("Set and save custom property 1",
                function (done) {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Set and save custom property */
                    Office.context.mailbox.item.loadCustomPropertiesAsync(
                        function customPropsCallback(asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Failed to load custom property");
                                document.getElementById("setAndSaveCustomProperty").innerHTML = "Failed to load custom property";
                                done();
                            }
                            else {
                                var customProps = asyncResult.value;
                                customProps.set("myProp1", "value1");
                                customProps.saveAsync(
                                    function (asyncResult) {
                                        if (asyncResult.status == "failed") {
                                            console.log("Failed to save custom property");
                                            document.getElementById("setAndSaveCustomProperty").innerHTML = "Failed to save custom property";
                                        }
                                        else {
                                            console.log("Saved custom property");
                                            document.getElementById("setAndSaveCustomProperty").innerHTML = "Saved custom property";
                                        }
                                        done();
                                    }
                                );
                            }
                        }
                    );




                });

            it("Set and save custom property 2 ",
                function (done) {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Set and save custom property */
                    Office.context.mailbox.item.loadCustomPropertiesAsync(
                        function customPropsCallback(asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Failed to load custom property");
                                document.getElementById("setAndSaveCustomProperty").innerHTML = "Failed to load custom property";
                                done();
                            }
                            else {
                                var customProps = asyncResult.value;
                                customProps.set("myProp2", "value2");
                                customProps.saveAsync(
                                    function (asyncResult) {
                                        if (asyncResult.status == "failed") {
                                            console.log("Failed to save custom property");
                                            document.getElementById("setAndSaveCustomProperty").innerHTML = "Failed to save custom property";
                                        }
                                        else {
                                            console.log("Saved custom property");
                                            document.getElementById("setAndSaveCustomProperty").innerHTML = "Saved custom property";
                                        }
                                        done();
                                    }
                                );
                            }
                        }
                    );




                });

            it("Set and save custom property ",
                function (done) {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Set and save custom property */
                    Office.context.mailbox.item.loadCustomPropertiesAsync(
                        function customPropsCallback(asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Failed to load custom property");
                                document.getElementById("setAndSaveCustomProperty").innerHTML = "Failed to load custom property";
                                done();
                            }
                            else {
                                var customProps = asyncResult.value;
                                customProps.set("myProp", "value");
                                customProps.saveAsync(
                                    function (asyncResult) {
                                        if (asyncResult.status == "failed") {
                                            console.log("Failed to save custom property");
                                            document.getElementById("setAndSaveCustomProperty").innerHTML = "Failed to save custom property";
                                        }
                                        else {
                                            console.log("Saved custom property");
                                            document.getElementById("setAndSaveCustomProperty").innerHTML = "Saved custom property";
                                        }
                                      done();
                                    }
                                );
                            }
                        }
                    );




                });

            it("Get custom property",
                function (done) {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get custom property */
                    Office.context.mailbox.item.loadCustomPropertiesAsync(
                        function customPropsCallback(asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Failed to load custom property");
                                done();
                            }
                            else {
                                var customProps = asyncResult.value;
                                var myProp1 = customProps.get("myProp1");
                                document.getElementById("getCustomProperty").innerHTML = myProp1;
                                console.log(myProp);
                                done();
                            }
                        }
                    );




                });
            it("Remove and save custom property",
                function (done) {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Remove and save custom property */
                    Office.context.mailbox.item.loadCustomPropertiesAsync(
                        function customPropsCallback(asyncResult) {
                            if (asyncResult.status == "failed") {
                                console.log("Failed to load custom property");
                                document.getElementById("removeAndSaveCustomProperty").innerHTML = "Failed to load custom property";
                                done();
                            }
                            else {
                                var customProps = asyncResult.value;
                                customProps.remove("myProp");
                                customProps.saveAsync(
                                    function (asyncResult) {
                                        if (asyncResult.status == "failed") {
                                            console.log("Failed to save custom property");
                                            document.getElementById("removeAndSaveCustomProperty").innerHTML = "Failed to Save custom property";
                                        }
                                        else {
                                            console.log("Saved custom property");
                                            document.getElementById("removeAndSaveCustomProperty").innerHTML = "Saved custom property";
                                        }
                                        done();
                                    }
                                );
                            }
                        }
                    );




                });
            it("Get entities ",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get entities */
                    var emailAddresses = "";
                    Office.context.mailbox.item.getEntities().emailAddresses.forEach(function (emailAddress, index) {
                        emailAddresses = emailAddresses + emailAddress + ";<BR>";
                    });
                    document.getElementById("getEntities").innerHTML = emailAddresses;
                    console.log(emailAddresses);




                });
            it("Get entities by type ",
                function () {



                    /* Restricted or ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get entities by type */
                    var urls = "";
                    Office.context.mailbox.item.getEntitiesByType(Office.MailboxEnums.EntityType.URL).forEach(function (url, index) {
                        urls = urls + url + ";<BR>";
                    });
                  
                    console.log(urls);



                });
            it("Get entities by name",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get entities by name */
                    /* rule in manifest
                    <Rule xsi:type="ItemHasKnownEntity" EntityType="Url" RegExFilter="youtube" FilterName="youtube" IgnoreCase="true"/>
                    */
                    var urls = "";
                    Office.context.mailbox.item.getFilteredEntitiesByName("youtube").forEach(function (url, index) {
                        urls = urls + url + ";<BR>";
                    });
                   
                    console.log(urls);




                });
            it("Get Regex matches",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get Regex matches */
                    /* rule in manifest
                    <Rule xsi:type="ItemHasRegularExpressionMatch" RegExName="fruits" RegExValue="apple|banana|coconut" pPropertyName="BodyAsPlaintext" IgnoreCase="true" />
                    */
                    console.log(Office.context.mailbox.item.getRegExMatches());




                });
            it("Get filtered Regex matches by name ",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get filtered Regex matches by name */
                    /* rule in manifest
                    <Rule xsi:type="ItemHasRegularExpressionMatch" RegExName="fruits" RegExValue="apple|banana|coconut" pPropertyName="BodyAsPlaintext" IgnoreCase="true" />
                    */
                    var fruits = "";
                    Office.context.mailbox.item.getRegExMatchesByName("fruits").forEach(function (fruit, index) {
                        fruits = fruits + fruit + ";<BR>";
                    });
                    console.log(fruits);




                });
            xit("Display a reply form :Applicable in Read only Mode ",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Display a reply form */
                    Office.context.mailbox.item.displayReplyForm(
                        {
                            'htmlBody': 'hi',
                            'attachments': [
                                {
                                    'type': Office.MailboxEnums.AttachmentType.File,
                                    'name': 'squirrel.png',
                                    'url': 'http://i.imgur.com/sRgTlGR.jpg'
                                },
                                {
                                    'type': Office.MailboxEnums.AttachmentType.Item,
                                    'name': 'mymail',
                                    'itemId': Office.context.mailbox.item.itemId
                                }
                            ]
                        }
                    );




                });

            xit("Display a reply all form:Applicable in Read only mode ",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Display a reply all form */
                    Office.context.mailbox.item.displayReplyAllForm("hi");





                });


            xit("Display appointment form:Applicable in Read Only mode",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Display appointment form */
                    // Item ID of current appointment
                    var appointmentId = Office.context.mailbox.item.itemId;
                    Office.context.mailbox.displayAppointmentForm(appointmentId);

                });

            xit("Display message form :Applicable in Read only Mode ",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Display message form */
                    // Item ID of current message
                    var messageId = Office.context.mailbox.item.itemId;
                    Office.context.mailbox.displayMessageForm(messageId);

                });

            xit("Display new appointment form:Applicable in Read Only mode  ",
                function () {

                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Display new appointment form */
                    var start = new Date();
                    var end = new Date();
                    end.setHours(start.getHours() + 1);

                    Office.context.mailbox.displayNewAppointmentForm(
                        {
                            requiredAttendees: ["bob@contoso.com"],
                            optionalAttendees: ["sam@contoso.com"],
                            start: start,
                            end: end,
                            location: "Home",
                            resources: ["projector@contoso.com"],
                            subject: "meeting",
                            body: "Hello World!"
                        });



                });
          

            

            xit("Empty Case",
                function () {







                });





        });


        xdescribe("Applicable for Calendar items :Appointments", function () {


            it("Get optional attendees (Applicable only on calendar event)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get optional attendees (Applicable only on calendar event) */
                    var recipients = "";
                    Office.context.mailbox.item.optionalAttendees.forEach(function (recipient, index) {
                        recipients = recipients + recipient.displayName + " (" + recipient.emailAddress + ");";
                    });
                    console.log(recipients);




                });
            it("Get organizer (Applicable only on calendar event)",
                function () {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get organizer (Applicable only on calendar event) */
                    var organizer = Office.context.mailbox.item.organizer;
                    console.log(organizer.displayName + " (" + organizer.emailAddress + ");");



                });
            it("Get required attendees (Applicable only on calendar event)",
                function () {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get required attendees (Applicable only on calendar event) */
                    var recipients = "";
                    Office.context.mailbox.item.requiredAttendees.forEach(function (recipient, index) {
                        recipients = recipients + recipient.displayName + " (" + recipient.emailAddress + ");";
                    });
                    console.log(recipients);



                });

            it("Get resources (Applicable only on calendar event",
                function () {



                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get resources (Applicable only on calendar event) */
                    var resources = Office.context.mailbox.item.resources;
                    console.log(resources.displayName + " (" + resources.emailAddress + ");");



                });
            it("Get location (Applicable only on calendar event)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get location (Applicable only on calendar event) */
                    console.log(Office.context.mailbox.item.location);




                });
            it("Get start time (Applicable only on calendar event)",
                function () {


                    /* ReadItem or ReadWriteItem or ReadWriteMailbox */
                    /* Get start time (Applicable only on calendar event) */

                    var startTime = Office.context.mailbox.item.start
                    console.log(startTime);




                });





        });


       
    });

