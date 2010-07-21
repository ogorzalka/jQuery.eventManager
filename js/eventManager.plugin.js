;(function($) {
  // Event Manager lets you organize your javascript events by using the power of the delegate method
  $.fn.eventManager = function(events,options) {
    var opts = $.extend({}, { debug:false }, options);
     
    // private function for debugging
    function debug($obj) {
      if (window.console && window.console.log) { window.console.log($obj); }
    }
    
    var eventList = {}, // yeah this is the event list array
        $global = $(this); // the object container of the event list
    
    // okay it's time to sort!
    for (globalSelector in events) {
      for (eventType in events[globalSelector]) {
        // we sort by events :)
        if (typeof eventList[eventType] == 'undefined') {
          eventList[eventType] = globalSelector;
        } else {
          eventList[eventType] += ', '+globalSelector;
        }
      }
    }

    for (eventType in eventList) {
      $global.delegate(eventList[eventType], eventType, function(e){
        for (globalSelector_p in events) {
          if ($(this).is(globalSelector_p)) {
            var selectors = events[globalSelector_p][e.type];
            if (typeof selectors == 'function') {
              if (opts.debug) { 
                 debug("    selector : $('"+globalSelector_p+"')\n"
                         + "event called : "+e.type+"\n"
                         + "      action : "+ events[globalSelector_p][e.type]);
              }
              if (selectors.apply(this, [e, $global]) === false) {
                 return false;
              }
            } else {
              for (selector_p in selectors) {
                if (($(this).is(selector_p) || selector_p == 'default') && typeof selectors[selector_p] != 'undefined') {
                  if (opts.debug) { 
                      debug("    selector : $('"+globalSelector_p+"').filter('"+selector_p+"')\n"
                              + "called event : "+e.type+"\n"
                              + "      action : "+ events[globalSelector_p][e.type][selector_p]);
                  }
                  if (selectors[selector_p].apply(this, [e, $global]) === false) {
                     return false;
                  }
                }
              }
            }
          }
        }
      });
    }
    return this; // no I won't break the chain!
  };
})(jQuery);