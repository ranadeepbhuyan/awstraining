// Support routines for automatically reporting user timing for splunk and new relic
var navigation = function () {

    var newrelic = newrelic || {};
    var xhttp = new XMLHttpRequest();
    this.freshpageLoad = true;
    this.bandwidth = 0; //bandwidth
    this.lastBandwidthNotedTime = Date.now();  //milliseconds.
    var self = this;
    this.resourceTimings = [];

    var postDataToServer = function(path, data){
      xhttp.open("POST", path, true);
      xhttp.send(JSON.stringify(data));
    };

    window.sendData = function () {
        try {
            if (!window.performance) {
                return;
            }
            if (nav) {
                nav.reportRUM();
                //clear all previous marks & measures when a link is clicked.
                window.performance.clearMarks();
                window.performance.clearResourceTimings();
                var iframe = document.querySelector('#iframecres');
                if ((iframe) && (iframe.nodeName == 'IFRAME') && (iframe.contentWindow) && (iframe.contentWindow.performance)) {
                    iframe.contentWindow.performance.clearResourceTimings();
                }
            }
        } catch (e) { }
    };

    //get duration from last click of link if possible
    this.getTheMarkedLinkClicked = function () {
        var duration = 0;
        var marker = null;
        var markers = window.performance.getEntriesByType("mark");
        for (i = 0; i < markers.length; i++) {
            if (markers[i].name.indexOf("link_") != -1) {
                marker = markers[i];
            }
        }
        return marker;
    };

    //get duration from last click of link if possible
    this.getTheRouteChanged = function () {
        var duration = 0;
        var marker = null;
        var markers = window.performance.getEntriesByType("mark");
        for (i = 0; i < markers.length; i++) {
            if (markers[i].name.indexOf("route_") != -1) {
                if (markers[i].name != "route_,") {
                    marker = markers[i];
                }
            }
        }
        return marker;
    };

    this.logTimings = function (t, m) {
        t = Math.round(t);
        var t1 = -1;
        var t2 = -1;
        var markedLink = this.getTheMarkedLinkClicked();
        var markedRoute = this.getTheRouteChanged();
        if (markedLink) {
            t1 = t - markedLink.startTime;
        }
        if (markedRoute) {
            t2 = t - markedRoute.startTime;
        }
        var resourceTimings = "";
        resourceTimings = this.getResourceTimings();

        if ((t1 >= 0 && t1 < 3600000) || (t2 >= 0 && t2 < 3600000) || (t >= 0 && t < 3600000)) {
            if (markedLink) {
                var message = 'TIME FOR LINK:' + markedLink.name + " TO LOAD:" + t1 + " MILLISECONDS with bandwidth:" + this.bandwidth + " mbps";
                message = message + this.getMarkers(m, markedLink.startTime);
                message = message + " AND THE BROWSER USER AGENT IS: " + navigator.userAgent + ", resourceTimings:" + resourceTimings;
                //send data
                postDataToServer("/server/log", { Message: message})
            }
            else if (this.freshpageLoad) {
                var message = 'FRESH PAGE LOAD:' + window.location.pathname + ', TIME TAKEN:' + t + " MILLISECONDS with bandwidth:" + this.bandwidth + " mbps";
                message = message + this.getMarkers(m, 0);
                message = message + " AND THE BROWSER USER AGENT IS: " + navigator.userAgent + ", resourceTimings:" + resourceTimings;
                //call imweblogger
                postDataToServer("/server/log", { Message: message})
                this.freshpageLoad = false;
            }
            else
                if (markedRoute) {
                    var message = 'TIME FOR ROUTE:' + markedRoute.name + " TO LOAD:" + t2 + " MILLISECONDS with bandwidth:" + this.bandwidth + " mbps";
                    message = message + this.getMarkers(m, markedRoute.startTime);
                    message = message + " AND THE BROWSER USER AGENT IS: " + navigator.userAgent + ", resourceTimings:" + resourceTimings;
                    //call imweblogger
                    postDataToServer("/server/log", { Message: message})
                }
        }
        //schedule next bandwidth call.
        if (window.requestIdleCallback) {
            requestIdleCallback(self.calculateBandwidth);
        }
    };

    //get the markers
    this.getMarkers = function (m, startTime) {
        var message = " ";
        message = " WITH MARKERS: ";
        var markers = [];
        for (i = 0; i < m.length; i++) {
            var markerDuration = parseInt(m[i].startTime - startTime);
            var marker = { n: m[i].name, st: markerDuration };
            markers.push(marker);
        }
        message = message + JSON.stringify(markers);
        return message;
    }
    this.reportRUM = function () {
        var markers = window.performance.getEntriesByType("mark");
        var lastMarker = {};
        g = 'usertiming';
        for (i = 0; i < markers.length; i++) {
            if (lastMarker[g] == undefined || markers[i].startTime > lastMarker[g])
                lastMarker[g] = markers[i].startTime;
        }
        this.logTimings(lastMarker[g], markers);
    };

    //add resources to json object
    this.getResourcesJSON = function (resources, isIFrame) {
        var markedLink = this.getTheMarkedLinkClicked();
        var markedRoute = this.getTheRouteChanged();
        var markedStartTime = 0; //start time
        var iframe = document.querySelector('#iframecres');
        if (!this.freshpageLoad) {
            //if a marked link is clicked
            if (markedLink) {
                markedStartTime = markedLink.startTime;
            }
            else if (markedRoute) {
                //else if a route change happened for not a marked link
                markedStartTime = markedRoute.startTime;
            }
        }
        if (resources == null) return;
        for (var i = 0; i < resources.length; i++) {
            //if markedStartTime is 0 then its a fresh page load
            var startTime = parseInt(resources[i].startTime - markedStartTime);
            var duration = parseInt(resources[i].duration);
            var shortName = this.getShortName(resources[i].name);
            if (isIFrame) {
                startTime = parseInt(resources[i].startTime); //should happen close to route change in parent window. done for lack of a better estimate.
                var duration = parseInt(resources[i].duration);
                var shortName = this.getShortName(resources[i].name);
            }
            var resource = { n: shortName, st: startTime, d: duration };
            this.resourceTimings.push(resource);
        }
    };
    //get the short name of the url without the querystring
    this.getShortName = function (url) {
        var indexOfQuery = url.indexOf('?');
        if (indexOfQuery != -1) {
            url = url.slice(0, indexOfQuery);
        }
        var shortname = url.slice(0, 20) + '...' + url.slice(-20);
        return shortname;
    };
    //get all the resource timings from page or if application iframe exists
    this.getResourceTimings = function () {
        this.resourceTimings = [];
        var resources = window.performance.getEntriesByType("resource");
        this.getResourcesJSON(resources, false);

        var iframe = document.querySelector('#iframecres');
        if ((iframe) && (iframe.nodeName == 'IFRAME') && (iframe.contentWindow) && (iframe.contentWindow.performance)) {
            resources = iframe.contentWindow.performance.getEntriesByType('resource');
            this.getResourcesJSON(resources, true);
        }

        if (JSON) {
            return JSON.stringify(this.resourceTimings);
        }
        else {
            return 'no resources';
        }
    };

    //
    this.calculateBandwidth = function (deadline) {
        var currentTime = Date.now();
        var timeLapsed = currentTime - self.lastBandwidthNotedTime;
        if (deadline.timeRemaining() > 0) {
            if ((timeLapsed > 1000000) || (self.bandwidth == 0)) {
                //calculate bandwidth using xhr request.
                var start = Date.now();
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                       // Typical action to be performed when the document is ready:
                       var size = xmlhttp.getResponseHeader('Content-Length');
                       var timeTaken = Date.now() - start;
                       self.bandwidth = (size * 8) / (1000 * timeTaken); //mbps
                       self.lastBandwidthNotedTime = Date.now();
                    }
                };
                xmlhttp.open("GET", '/images/a.jpg?id=_'+Date.now(), true);
                xmlhttp.send();
            }

        }


    };

    /*
    Strategically place:
    markUserTime('some event');
    Through your code to get measurements for when various activities complete.  It
    will also generate timeline events so you can see them in Chrome's dev tools.
    A good use case is to add them inline to sections of your site that are
    above-the fold (right after the menu, right after the main story, etc) and also
    in the onload handler for any critical above-the-fold images.
    */
    var w = typeof window != 'undefined' ? window : exports,
        marks = [];
    w.performance || (w.performance = {});
    w.performance.now || (
      w.performance.now = performance.now || performance.webkitNow ||
                               performance.msNow || performance.mozNow);
    if (!w.performance.now) {
        var s = Date.now ? Date.now() : +(new Date());
        if (performance.timing && performance.timing)
            s = performance.timing.navigationStart
        w.performance.now = (function () {
            var n = Date.now ? Date.now() : +(new Date());
            return n - s;
        });
    }
    w.performance.mark || (
    w.performance.mark =
      w.performance.webkitMark ? w.performance.webkitMark :
      (function (l) {
          marks.push({ 'name': l, 'entryType': 'mark', 'startTime': w.performance.now(), 'duration': 0 });
      }));
    w.performance.getEntriesByType || (
    w.performance.getEntriesByType =
      w.performance.webkitGetEntriesByType ? w.performance.webkitGetEntriesByType :
      (function (t) {
          return t == 'mark' ? marks : undefined;
      }));

    w.performance.clearMarks || (
    w.performance.clearMarks =
    (function () {
        marks = [];
    }));
};

var nav = new navigation();

if (window.requestIdleCallback) {
    requestIdleCallback(nav.calculateBandwidth);
}

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozKitMutationObserver;
var node = document.querySelector("html");
// var observer = new MutationObserver(function (mutations) {
//     mutations.forEach(function (mutation) {
//         if (mutation.type == 'childList') {
//             mutation.addedNodes.forEach(function (node) {
//                 console.log('mutation type:' + mutation.type + ',name:' + node.nodeName);
//             });
//         }
//     });
// });

//observer.observe(node, { childList: true, subtree: true });
